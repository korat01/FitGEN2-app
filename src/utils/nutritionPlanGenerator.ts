import { RECETTES, calculerMacrosRecette, type Recette } from './nutritionData';
import type {
  PlanProfile, PlanGoal, PlanPace, MacroTargets, DietType, AllergenKey,
  PlanPreferences, PlanDay, PlanMealSlot, GeneratedMealPlan, SupplementKey,
} from '@/types/nutritionPlan';

// ---------------------------------------------------------------------------
// 1. Calcul des besoins — Mifflin-St Jeor (référence la plus fiable pour le grand public,
//    plus précise que Harris-Benedict) + facteur d'activité dérivé du nombre de jours
//    d'entraînement + ajustement selon le sport pratiqué.
// ---------------------------------------------------------------------------

const calculateBMR = (weight: number, height: number, age: number, sex: 'male' | 'female'): number => {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return sex === 'male' ? base + 5 : base - 161;
};

/** Facteur d'activité NEAT + entraînement — basé sur le nombre de jours d'entraînement/semaine,
    avec un petit bonus pour les sports à forte dépense cardio (marathon/crossfit/sprint) qui
    brûlent davantage par séance qu'une séance de force classique. */
const getActivityMultiplier = (trainingDaysCount: number, sportClass: string): number => {
  const base =
    trainingDaysCount <= 0 ? 1.2 :
    trainingDaysCount <= 2 ? 1.375 :
    trainingDaysCount <= 4 ? 1.55 :
    trainingDaysCount <= 6 ? 1.725 : 1.9;
  const highCardioSports = ['marathon', 'crossfit', 'sprint'];
  return highCardioSports.includes(sportClass) ? base + 0.075 : base;
};

/** Grammes de protéines par kg de poids de corps — plus élevé en déficit/recomposition (préserver
    la masse musculaire) et pour les sports de force, légèrement plus bas pour l'endurance pure où
    les glucides priment. Repères issus des recommandations usuelles en nutrition sportive
    (1.6–2.2 g/kg selon objectif et discipline). */
const getProteinPerKg = (goal: PlanGoal, sportClass: string): number => {
  let base = 1.8;
  if (goal === 'perte_de_poids' || goal === 'recomposition') base += 0.3;
  const strengthSports = ['power', 'streetlifting', 'calisthenics'];
  if (strengthSports.includes(sportClass)) base += 0.2;
  if (sportClass === 'marathon') base -= 0.3;
  return Math.min(Math.max(base, 1.4), 2.4);
};

const PACE_DELTA: Record<PlanPace, { gain: number; loss: number }> = {
  lent: { gain: 250, loss: 300 },
  modere: { gain: 400, loss: 500 },
  rapide: { gain: 600, loss: 750 },
};

export const calculateMacroTargets = (
  profile: PlanProfile,
  goal: PlanGoal,
  pace: PlanPace,
  targetWeight?: number
): MacroTargets => {
  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.sex);
  const tdee = Math.round(bmr * getActivityMultiplier(profile.trainingDaysCount, profile.sportClass));

  let deltaCalories = 0;
  let effectiveGoal: PlanGoal = goal;

  if (goal === 'poids_cible' && targetWeight) {
    // Le poids désiré détermine si c'est une prise ou une perte, et l'ampleur reste pilotée par
    // le rythme choisi ensuite (le delta de poids ne fixe que la direction, pas le calcul calorique).
    effectiveGoal = targetWeight > profile.weight ? 'prise_de_masse' : targetWeight < profile.weight ? 'perte_de_poids' : 'recomposition';
  }

  if (effectiveGoal === 'prise_de_masse') deltaCalories = PACE_DELTA[pace].gain;
  else if (effectiveGoal === 'perte_de_poids') deltaCalories = -PACE_DELTA[pace].loss;
  else if (effectiveGoal === 'recomposition') deltaCalories = -Math.round(PACE_DELTA[pace].loss * 0.4); // léger déficit, la recomp mise sur les protéines + l'entraînement plutôt qu'un gros déficit

  const calories = Math.max(1200, tdee + deltaCalories);

  const proteinesG = Math.round(profile.weight * getProteinPerKg(effectiveGoal, profile.sportClass));
  const proteinesCal = proteinesG * 4;

  const lipidesCal = calories * 0.27; // ~27% des calories en lipides — fourchette usuelle 25-30%
  const lipidesG = Math.round(lipidesCal / 9);

  const glucidesCal = Math.max(calories - proteinesCal - lipidesCal, calories * 0.25);
  const glucidesG = Math.round(glucidesCal / 4);

  return {
    calories: Math.round(calories),
    proteinesG,
    glucidesG,
    lipidesG,
    bmr: Math.round(bmr),
    tdee,
    deltaCalories,
  };
};

// ---------------------------------------------------------------------------
// 2. Classification régime/allergènes — la base RECETTES n'a pas de tags vegan/allergènes fiables
//    sur l'ensemble des 100 recettes (seules les ~20 premières en ont), donc on déduit à partir
//    des noms d'ingrédients réels plutôt que de se fier à des tags manquants.
// ---------------------------------------------------------------------------

const MEAT_FISH_KEYWORDS = ['Poulet', 'Saumon', 'Thon', 'Dinde', 'Bœuf', 'Crevettes', 'Jambon'];
const DAIRY_EGG_HONEY_KEYWORDS = ['Œufs', 'Fromage', 'Yaourt', 'Miel', 'Protéine en poudre'];

const ingredientNames = (recette: Recette): string[] => recette.ingredients.map((i) => i.aliment.nom);

export const classifyRecetteDiet = (recette: Recette): DietType => {
  const names = ingredientNames(recette);
  if (names.some((n) => MEAT_FISH_KEYWORDS.some((kw) => n.includes(kw)))) return 'classique';
  if (names.some((n) => DAIRY_EGG_HONEY_KEYWORDS.some((kw) => n.includes(kw)))) return 'vegetarien';
  return 'vegan';
};

const ALLERGEN_KEYWORDS: Record<AllergenKey, string[]> = {
  gluten: ['Pain complet', 'Pâtes complètes'],
  lactose: ['Fromage blanc', 'Yaourt grec', 'Fromage cottage', 'Feta', 'Protéine en poudre'],
  fruitsACoque: ['Amandes', 'Noix de cajou'],
  oeufs: ['Œufs'],
  poissonCrustaces: ['Saumon', 'Thon', 'Crevettes'],
  soja: ['Tofu'],
  arachide: ['Beurre de cacahuète'],
};

const recetteHasAllergen = (recette: Recette, allergen: AllergenKey): boolean => {
  const names = ingredientNames(recette);
  return names.some((n) => ALLERGEN_KEYWORDS[allergen].some((kw) => n.includes(kw)));
};

/** Une recette "classique" satisfait toujours un régime végétarien/vegan demandé — un végétarien
    peut manger végan, donc on filtre par "niveau de restriction atteint" plutôt qu'égalité stricte. */
const DIET_RANK: Record<DietType, number> = { classique: 0, vegetarien: 1, vegan: 2 };

export const filterEligibleRecettes = (preferences: PlanPreferences): Recette[] =>
  RECETTES.filter((r) => {
    if (preferences.dislikedRecetteIds.includes(r.id)) return false;
    if (DIET_RANK[classifyRecetteDiet(r)] < DIET_RANK[preferences.dietType]) return false;
    if (preferences.allergies.some((a) => recetteHasAllergen(r, a))) return false;
    return true;
  });

// ---------------------------------------------------------------------------
// 3. Génération du plan — répartit les calories/macros cibles sur le nombre de repas choisi.
//    Chaque créneau (Petit-déjeuner/Déjeuner/Dîner/Collation) ne pioche que dans les recettes
//    RÉELLEMENT taguées pour ce moment de la journée (~95 des 100 recettes ont un tag
//    petit-déjeuner/déjeuner/dîner/collation/post-training) — sans ce filtre, un plat de dîner
//    pouvait atterrir au petit-déjeuner juste parce qu'il tombait sur le bon nombre de calories.
//    Une "Dessert" fixe est ajoutée chaque jour (piochée dans les collations sucrées) pour ne pas
//    se limiter aux 3 repas principaux. Variation : parmi les meilleures correspondances
//    caloriques, un choix aléatoire (pas juste "la plus proche") pour ne pas retomber sur les 2-3
//    mêmes recettes tous les jours.
// ---------------------------------------------------------------------------

const MOMENT_TAG_BY_LABEL: Record<string, string> = {
  'Petit-déjeuner': 'petit-déjeuner',
  'Déjeuner': 'déjeuner',
  'Dîner': 'dîner',
  'Collation': 'collation',
  'Dessert': 'collation',
};

const MEAL_LABELS_BY_COUNT: Record<number, string[]> = {
  3: ['Petit-déjeuner', 'Déjeuner', 'Dîner'],
  4: ['Petit-déjeuner', 'Déjeuner', 'Collation', 'Dîner'],
  5: ['Petit-déjeuner', 'Collation', 'Déjeuner', 'Collation', 'Dîner'],
  6: ['Petit-déjeuner', 'Collation', 'Déjeuner', 'Collation', 'Dîner', 'Collation'],
};

const MEAL_SHARE_BY_COUNT: Record<number, number[]> = {
  3: [0.28, 0.37, 0.28],
  4: [0.23, 0.32, 0.13, 0.23],
  5: [0.2, 0.09, 0.28, 0.09, 0.26],
  6: [0.18, 0.08, 0.26, 0.08, 0.2, 0.08],
};

// Part réservée au dessert, prise sur le total du jour plutôt qu'ajoutée par-dessus.
const DESSERT_SHARE = 0.08;

const SUPPLEMENT_META: Record<SupplementKey, { nom: string; emoji: string; calories: number; proteines: number; glucides: number; lipides: number }> = {
  whey: { nom: 'Shaker whey protéine', emoji: '🥤', calories: 120, proteines: 24, glucides: 3, lipides: 1 },
  creatine: { nom: 'Créatine (5g)', emoji: '💊', calories: 0, proteines: 0, glucides: 0, lipides: 0 },
  bcaa: { nom: 'BCAA/EAA', emoji: '💊', calories: 10, proteines: 2, glucides: 0, lipides: 0 },
  multivitamines: { nom: 'Multivitamines', emoji: '💊', calories: 0, proteines: 0, glucides: 0, lipides: 0 },
  omega3: { nom: 'Oméga-3', emoji: '💊', calories: 20, proteines: 0, glucides: 0, lipides: 2 },
  caseine: { nom: 'Caséine (avant coucher)', emoji: '🥛', calories: 110, proteines: 22, glucides: 3, lipides: 1 },
};

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

/** Recettes taguées pour ce moment précis ; si le filtre laisse trop peu de choix (petite base
    après régime/allergies/exclusions), on élargit au pool complet plutôt que de bloquer. */
const candidatesForMoment = (pool: Recette[], label: string): Recette[] => {
  const momentTag = MOMENT_TAG_BY_LABEL[label];
  if (!momentTag) return pool;
  const tagged = pool.filter((r) => r.tags.includes(momentTag));
  return tagged.length >= 4 ? tagged : pool;
};

/** Choisit parmi les meilleures correspondances caloriques (pas systématiquement LA meilleure) et
    évite les recettes déjà servies récemment sur ce créneau — sans ça, le "meilleur" choix
    calorique est déterministe et ressort identique tous les jours. */
const pickVariedRecette = (candidates: Recette[], targetCalories: number, recentIds: Set<string>): Recette => {
  const notRecent = candidates.filter((r) => !recentIds.has(r.id));
  const pool = notRecent.length >= 3 ? notRecent : candidates;
  const ranked = [...pool].sort(
    (a, b) => Math.abs(calculerMacrosRecette(a).calories - targetCalories) - Math.abs(calculerMacrosRecette(b).calories - targetCalories)
  );
  const shortlist = ranked.slice(0, Math.min(5, ranked.length));
  return shortlist[Math.floor(Math.random() * shortlist.length)];
};

export const generateMealPlan = (
  targets: MacroTargets,
  preferences: PlanPreferences,
  totalDays: number
): GeneratedMealPlan => {
  const eligible = filterEligibleRecettes(preferences);
  const basePool = eligible.length > 0 ? eligible : RECETTES;
  const mealsPerDay = Math.min(Math.max(preferences.mealsPerDay, 3), 6);
  const labels = [...(MEAL_LABELS_BY_COUNT[mealsPerDay] || MEAL_LABELS_BY_COUNT[3]), 'Dessert'];
  const mainShares = MEAL_SHARE_BY_COUNT[mealsPerDay] || MEAL_SHARE_BY_COUNT[3];
  // Les parts des repas principaux sont réduites au prorata pour laisser de la place au dessert.
  const shares = [...mainShares.map((s) => s * (1 - DESSERT_SHARE)), DESSERT_SHARE];

  const startDate = new Date();
  const recentByLabel: Record<string, Set<string>> = {};
  labels.forEach((l) => { recentByLabel[l] = new Set(); });

  const supplementSlots: PlanMealSlot[] = preferences.supplements
    .filter((s) => s !== 'multivitamines' && s !== 'creatine') // celles-ci n'apportent pas de macros notables au repas, juste un rappel — affichées séparément
    .map((s) => {
      const meta = SUPPLEMENT_META[s];
      return {
        label: 'Complément',
        recetteId: null,
        nom: meta.nom,
        emoji: meta.emoji,
        calories: meta.calories,
        proteines: meta.proteines,
        glucides: meta.glucides,
        lipides: meta.lipides,
        isSupplement: true,
      };
    });

  const days: PlanDay[] = [];

  for (let d = 0; d < totalDays; d++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + d);
    const usedToday = new Set<string>();

    const meals: PlanMealSlot[] = labels.map((label, i) => {
      const targetCal = targets.calories * shares[i];
      const momentPool = candidatesForMoment(basePool, label);
      // Évite qu'un même plat serve deux fois le même jour (ex: deux "Collation" identiques).
      const dayPool = momentPool.filter((r) => !usedToday.has(r.id));
      const candidates = dayPool.length > 0 ? dayPool : momentPool;
      const chosen = pickVariedRecette(candidates, targetCal, recentByLabel[label]);
      usedToday.add(chosen.id);
      recentByLabel[label].add(chosen.id);
      if (recentByLabel[label].size > Math.max(1, Math.floor(candidates.length / 2))) {
        recentByLabel[label].clear();
      }
      const macros = calculerMacrosRecette(chosen);
      return {
        label,
        recetteId: chosen.id,
        nom: chosen.nom,
        emoji: chosen.emoji,
        calories: macros.calories,
        proteines: macros.proteines,
        glucides: macros.glucides,
        lipides: macros.lipides,
      };
    });

    const allMeals = [...meals, ...supplementSlots];

    days.push({
      jour: JOURS[date.getDay() === 0 ? 6 : date.getDay() - 1],
      date: date.toISOString().slice(0, 10),
      meals: allMeals,
      totalCalories: allMeals.reduce((acc, m) => acc + m.calories, 0),
      totalProteines: allMeals.reduce((acc, m) => acc + m.proteines, 0),
      totalGlucides: allMeals.reduce((acc, m) => acc + m.glucides, 0),
      totalLipides: allMeals.reduce((acc, m) => acc + m.lipides, 0),
    });
  }

  return { days, targets };
};

// ---------------------------------------------------------------------------
// 4. Persistance des préférences — pour que le bouton "Aliments/repas que je n'aime pas" de la
//    page Nutrition (accessible SANS repasser par tout l'assistant objectif/rythme) partage le
//    même jeu de préférences que le générateur complet.
// ---------------------------------------------------------------------------

const PREFS_STORAGE_KEY = 'nutritionPlanPreferences';

export const savePlanPreferences = (prefs: PlanPreferences) => {
  localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
};

export const loadPlanPreferences = (): PlanPreferences | null => {
  try {
    const raw = localStorage.getItem(PREFS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
