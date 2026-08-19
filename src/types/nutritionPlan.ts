// Générateur de plan alimentaire — calculs nutritionnels réels (Mifflin-St Jeor + facteur
// d'activité + ajustement objectif/rythme), pas juste une maquette. Voir utils/nutritionPlanGenerator.ts.

export type PlanGoal = 'prise_de_masse' | 'perte_de_poids' | 'recomposition' | 'poids_cible';
export type PlanPace = 'lent' | 'modere' | 'rapide';
export type DietType = 'classique' | 'vegetarien' | 'vegan';
export type AllergenKey = 'gluten' | 'lactose' | 'fruitsACoque' | 'oeufs' | 'poissonCrustaces' | 'soja' | 'arachide';
export type SupplementKey = 'whey' | 'creatine' | 'bcaa' | 'multivitamines' | 'omega3' | 'caseine';

export interface PlanProfile {
  weight: number;
  height: number;
  age: number;
  sex: 'male' | 'female';
  sportClass: string;
  trainingDaysCount: number;
}

export interface PlanPreferences {
  dietType: DietType;
  allergies: AllergenKey[];
  dislikedRecetteIds: string[];
  mealsPerDay: number;
  supplements: SupplementKey[];
}

export const DEFAULT_PREFERENCES: PlanPreferences = {
  dietType: 'classique',
  allergies: [],
  dislikedRecetteIds: [],
  mealsPerDay: 3,
  supplements: [],
};

export interface MacroTargets {
  calories: number;
  proteinesG: number;
  glucidesG: number;
  lipidesG: number;
  bmr: number;
  tdee: number;
  deltaCalories: number;
}

export interface PlanMealSlot {
  label: string;
  recetteId: string | null;
  nom: string;
  emoji: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
  isSupplement?: boolean;
}

export interface PlanDay {
  jour: string;
  date: string;
  meals: PlanMealSlot[];
  totalCalories: number;
  totalProteines: number;
  totalGlucides: number;
  totalLipides: number;
}

export interface GeneratedMealPlan {
  days: PlanDay[];
  targets: MacroTargets;
}
