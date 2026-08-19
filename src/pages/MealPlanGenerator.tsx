import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft, ArrowRight, Sparkles, Weight, Ruler, Calendar, TrendingUp, TrendingDown,
  Scale, Gauge, Beef, Wheat, Droplet, ThumbsDown, Wand2, Check, ChevronRight, Ban, Leaf, Salad, Download,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { RECETTES } from '@/utils/nutritionData';
import { calculateMacroTargets, generateMealPlan, savePlanPreferences, loadPlanPreferences } from '@/utils/nutritionPlanGenerator';
import type {
  PlanGoal, PlanPace, PlanProfile, MacroTargets, PlanPreferences, AllergenKey, SupplementKey,
  GeneratedMealPlan, DietType,
} from '@/types/nutritionPlan';
import { DEFAULT_PREFERENCES } from '@/types/nutritionPlan';

// Le générateur complet (profil -> objectif -> rythme -> régime -> allergies -> résultats) porte
// toutes les contraintes structurantes du plan. Le parcours "j'aime pas" (accessible directement
// depuis Nutrition.tsx) ne garde que les réglages fins et optionnels : plats à exclure, nombre de
// repas/jour, compléments — le régime et les allergies n'en font plus partie (voir retour user).
type Step = 'profile' | 'goal' | 'targetWeight' | 'pace' | 'diet' | 'allergies' | 'results' | 'plan';
type PrefStep = 'dislikes' | 'mealsCount' | 'supplements';

const MAIN_STEP_ORDER: Step[] = ['profile', 'goal', 'pace', 'diet', 'allergies', 'results'];
const stepIndex = (s: Step): number => MAIN_STEP_ORDER.indexOf(s === 'targetWeight' ? 'goal' : s);

const PREF_STEP_ORDER: PrefStep[] = ['dislikes', 'mealsCount', 'supplements'];

const GOAL_OPTIONS: { value: PlanGoal; label: string; desc: string; icon: React.ReactNode }[] = [
  { value: 'prise_de_masse', label: 'Prise de masse', desc: 'Construire du muscle, surplus calorique', icon: <TrendingUp className="w-5 h-5" /> },
  { value: 'perte_de_poids', label: 'Perte de poids', desc: 'Perdre du gras, déficit calorique', icon: <TrendingDown className="w-5 h-5" /> },
  { value: 'recomposition', label: 'Recomposition corporelle', desc: 'Perdre du gras et prendre du muscle en même temps', icon: <Sparkles className="w-5 h-5" /> },
  { value: 'poids_cible', label: 'Choisir mon poids désiré', desc: 'Je te dis mon objectif de poids, on adapte automatiquement', icon: <Scale className="w-5 h-5" /> },
];

const PACE_OPTIONS: { value: PlanPace; label: string; desc: string }[] = [
  { value: 'lent', label: 'Lent', desc: 'Rythme doux, le plus durable (~0,25 kg/semaine)' },
  { value: 'modere', label: 'Modéré', desc: 'Bon compromis vitesse/confort (~0,5 kg/semaine)' },
  { value: 'rapide', label: 'Rapide', desc: 'Résultats plus rapides, plus exigeant (~0,75 kg/semaine)' },
];

const DIET_OPTIONS: { value: DietType; label: string; desc: string; icon: React.ReactNode }[] = [
  { value: 'classique', label: 'Classique', desc: 'Sans restriction particulière', icon: <Beef className="w-5 h-5" /> },
  { value: 'vegetarien', label: 'Végétarien', desc: 'Sans viande ni poisson', icon: <Salad className="w-5 h-5" /> },
  { value: 'vegan', label: 'Végan', desc: 'Sans aucun produit animal', icon: <Leaf className="w-5 h-5" /> },
];

const ALLERGEN_OPTIONS: { value: AllergenKey; label: string }[] = [
  { value: 'gluten', label: 'Gluten' },
  { value: 'lactose', label: 'Lactose' },
  { value: 'fruitsACoque', label: 'Fruits à coque' },
  { value: 'oeufs', label: 'Œufs' },
  { value: 'poissonCrustaces', label: 'Poisson / Crustacés' },
  { value: 'soja', label: 'Soja' },
  { value: 'arachide', label: 'Arachide' },
];

const SUPPLEMENT_OPTIONS: { value: SupplementKey; label: string }[] = [
  { value: 'whey', label: 'Protéine whey' },
  { value: 'caseine', label: 'Caséine' },
  { value: 'creatine', label: 'Créatine' },
  { value: 'bcaa', label: 'BCAA / EAA' },
  { value: 'omega3', label: 'Oméga-3' },
  { value: 'multivitamines', label: 'Multivitamines' },
];

const SPORT_LABELS: Record<string, string> = {
  power: 'Powerlifting', marathon: 'Marathon', crossfit: 'Crossfit', calisthenics: 'Calisthéniques',
  streetlifting: 'Streetlifting', sprint: 'Sprint', classique: 'Classique',
};

const DIET_LABEL: Record<DietType, string> = { classique: 'Classique', vegetarien: 'Végétarien', vegan: 'Végan' };

// ---- Composants partagés (un seul système de boutons pour tout l'assistant) -------------------

const StepShell: React.FC<{
  title: string; subtitle?: string; onBack: () => void; children: React.ReactNode;
  progress?: { current: number; total: number };
}> = ({ title, subtitle, onBack, children, progress }) => (
  <div className="space-y-5">
    <div className="flex items-center justify-between gap-3">
      <Button onClick={onBack} variant="ghost" size="sm" className="text-muted-foreground -ml-2">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>
      {progress && (
        <span className="text-xs font-medium text-muted-foreground shrink-0">Étape {progress.current} / {progress.total}</span>
      )}
    </div>
    {progress && <Progress value={(progress.current / progress.total) * 100} size="sm" variant="subtle" />}
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-foreground">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

// Sélection à plat, teintée — pas de dégradé/glow répété sur plusieurs boutons à la fois (ça
// fonctionne pour UN bouton héros, mais ça devient criard dès que plusieurs options actives
// s'affichent ensemble — même leçon que HabitTracker plus tôt dans la session). Bordure nette +
// fond teinté + coche, sans texte blanc-sur-couleur.
const OptionCard: React.FC<{ selected: boolean; onClick: () => void; icon?: React.ReactNode; label: string; desc?: string }> = ({ selected, onClick, icon, label, desc }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors duration-150 ${
      selected ? 'bg-primary/10 border-primary' : 'bg-card border-border hover:border-primary/40'
    }`}
  >
    {icon && (
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
        {icon}
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className={`font-semibold ${selected ? 'text-primary' : 'text-foreground'}`}>{label}</p>
      {desc && <p className="text-xs mt-0.5 text-muted-foreground">{desc}</p>}
    </div>
    {selected && (
      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 text-primary-foreground" />
      </div>
    )}
  </button>
);

/** Bouton pilule réutilisé pour tous les choix courts (allergies, compléments, repas/jour, durée,
    jours du plan généré) — un seul style de "chip" dans tout l'assistant au lieu d'un mélange de
    cases à cocher, de cartes et de boutons pleine largeur. Sélection à plat (bordure + fond
    teinté), pas de dégradé/glow : plusieurs chips peuvent être actifs en même temps ici
    (multi-sélection allergies/compléments), un dégradé répété partout serait criard. */
const Chip: React.FC<{ selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }> = ({ selected, onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-colors duration-150 ${
      selected
        ? 'bg-primary/10 border-primary text-primary font-semibold'
        : 'bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
    } ${className}`}
  >
    {children}
  </button>
);

const PrimaryButton: React.FC<{ onClick: () => void; disabled?: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
  <Button onClick={onClick} disabled={disabled} className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
    {children}
  </Button>
);

const MealPlanGenerator: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  // Accessible directement depuis Nutrition.tsx via le bouton "Aliments/repas que je n'aime pas"
  // (state.standalone) — parcours court : exclusions, repas/jour, compléments. Le régime et les
  // allergies vivent désormais dans l'assistant principal (voir retour user), pas ici.
  const isStandalonePrefs = (location.state as { standalone?: boolean } | null)?.standalone === true;
  // Depuis Coaching.tsx : construire un plan pour quelqu'un qui n'a pas de compte dans l'app (donné
  // ensuite en PDF) — dans ce cas on ne pré-remplit pas avec le poids/taille/âge du coach lui-même.
  const isCoachStandalone = (location.state as { coachStandalone?: boolean } | null)?.coachStandalone === true;
  const savedPrefs = useMemo(() => loadPlanPreferences(), []);

  const [step, setStep] = useState<Step | PrefStep>(isStandalonePrefs ? 'dislikes' : 'profile');
  const [planForName, setPlanForName] = useState('');
  const [profile, setProfile] = useState<PlanProfile>(
    isCoachStandalone
      ? { weight: 70, height: 170, age: 30, sex: 'male', sportClass: 'classique', trainingDaysCount: 3 }
      : {
          weight: user?.weight || 75,
          height: user?.height || 175,
          age: user?.age || 25,
          sex: user?.sex || 'male',
          sportClass: user?.sportClass || 'classique',
          trainingDaysCount: user?.trainingDays?.length || 3,
        }
  );
  const [goal, setGoal] = useState<PlanGoal | null>(null);
  const [targetWeight, setTargetWeight] = useState(profile.weight);
  const [pace, setPace] = useState<PlanPace | null>(null);
  const [preferences, setPreferences] = useState<PlanPreferences>(savedPrefs || DEFAULT_PREFERENCES);
  const [prefsCustomized, setPrefsCustomized] = useState(!!savedPrefs);
  const [dislikeSearch, setDislikeSearch] = useState('');
  const [planDurationWeeks, setPlanDurationWeeks] = useState(1);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedMealPlan | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const targets: MacroTargets | null = useMemo(() => {
    if (!goal || !pace) return null;
    return calculateMacroTargets(profile, goal, pace, goal === 'poids_cible' ? targetWeight : undefined);
  }, [profile, goal, pace, targetWeight]);

  const filteredDislikeRecettes = useMemo(
    () => RECETTES.filter((r) => r.nom.toLowerCase().includes(dislikeSearch.toLowerCase())),
    [dislikeSearch]
  );

  const toggleDislike = (id: string) => {
    setPreferences((prev) => ({
      ...prev,
      dislikedRecetteIds: prev.dislikedRecetteIds.includes(id)
        ? prev.dislikedRecetteIds.filter((x) => x !== id)
        : [...prev.dislikedRecetteIds, id],
    }));
  };

  const toggleAllergen = (a: AllergenKey) => {
    setPreferences((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(a) ? prev.allergies.filter((x) => x !== a) : [...prev.allergies, a],
    }));
  };

  const toggleSupplement = (s: SupplementKey) => {
    setPreferences((prev) => ({
      ...prev,
      supplements: prev.supplements.includes(s) ? prev.supplements.filter((x) => x !== s) : [...prev.supplements, s],
    }));
  };

  const handleGenerate = () => {
    if (!targets) return;
    savePlanPreferences(preferences);
    const plan = generateMealPlan(targets, preferences, planDurationWeeks * 7);
    setGeneratedPlan(plan);
    setSelectedDayIndex(0);
    setStep('plan');
  };

  const finishStandalonePrefs = () => {
    savePlanPreferences(preferences);
    setPrefsCustomized(true);
    toast({ title: 'Préférences enregistrées', description: 'Elles seront utilisées à la prochaine génération de plan.' });
    navigate('/nutrition');
  };

  // Chargé à la demande seulement (jsPDF embarque html2canvas + DOMPurify, ~180 Ko gzip) — pas au
  // chargement de la page, même logique que le scanner de code-barres dans Nutrition.tsx.
  const handleExportPdf = async () => {
    if (!generatedPlan) return;
    const { exportMealPlanToPdf } = await import('@/utils/pdfExport');
    exportMealPlanToPdf(planForName, generatedPlan);
  };

  // ---- Rendu par étape -----------------------------------------------------

  if (step === 'profile') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell
          title={isCoachStandalone ? 'Nouveau plan alimentaire' : 'Générateur de plan alimentaire'}
          subtitle={isCoachStandalone ? "Pour un client qui n'a pas de compte dans l'app — exporté en PDF à la fin." : "On confirme d'abord tes infos de base — modifiables ici sans aller dans ton profil."}
          onBack={() => navigate(isCoachStandalone ? '/coaching' : '/nutrition')}
          progress={{ current: 1, total: MAIN_STEP_ORDER.length }}
        >
          <Card className="glass-card border-primary/20">
            <CardContent className="p-5 space-y-4">
              {isCoachStandalone && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Nom (optionnel, pour l'en-tête du PDF)</label>
                  <Input value={planForName} onChange={(e) => setPlanForName(e.target.value)} placeholder="Ex: Julien" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Weight className="w-3.5 h-3.5" /> Poids (kg)</label>
                  <Input type="number" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) || 0 })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> Taille (cm)</label>
                  <Input type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) || 0 })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Âge</label>
                  <Input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) || 0 })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Sport</label>
                  {isCoachStandalone ? (
                    <Select value={profile.sportClass} onValueChange={(v) => setProfile({ ...profile, sportClass: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(SPORT_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="h-10 px-3 flex items-center rounded-md surface-panel-sm text-sm text-foreground/90">
                      {SPORT_LABELS[profile.sportClass] || profile.sportClass}
                    </div>
                  )}
                </div>
              </div>
              {isCoachStandalone ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Sexe</label>
                  <div className="flex gap-2">
                    <Chip selected={profile.sex === 'male'} onClick={() => setProfile({ ...profile, sex: 'male' })} className="flex-1 text-center">Homme</Chip>
                    <Chip selected={profile.sex === 'female'} onClick={() => setProfile({ ...profile, sex: 'female' })} className="flex-1 text-center">Femme</Chip>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Le sexe, le sport et les jours d'entraînement viennent de ton profil et sont pris en compte automatiquement dans le calcul.</p>
              )}
            </CardContent>
          </Card>
          <PrimaryButton onClick={() => setStep('goal')}>Continuer <ArrowRight className="w-4 h-4 ml-2 inline" /></PrimaryButton>
        </StepShell>
      </div>
    );
  }

  if (step === 'goal') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell title="Quel est ton objectif ?" onBack={() => setStep('profile')} progress={{ current: stepIndex('goal') + 1, total: MAIN_STEP_ORDER.length }}>
          <div className="space-y-2.5">
            {GOAL_OPTIONS.map((o) => (
              <OptionCard key={o.value} selected={goal === o.value} onClick={() => setGoal(o.value)} icon={o.icon} label={o.label} desc={o.desc} />
            ))}
          </div>
          <PrimaryButton onClick={() => setStep(goal === 'poids_cible' ? 'targetWeight' : 'pace')} disabled={!goal}>
            Continuer <ArrowRight className="w-4 h-4 ml-2 inline" />
          </PrimaryButton>
        </StepShell>
      </div>
    );
  }

  if (step === 'targetWeight') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell title="Ton poids désiré ?" subtitle={`Poids actuel : ${profile.weight} kg`} onBack={() => setStep('goal')} progress={{ current: stepIndex('targetWeight') + 1, total: MAIN_STEP_ORDER.length }}>
          <Card className="glass-card border-primary/20">
            <CardContent className="p-5 space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Poids cible (kg)</label>
              <Input type="number" value={targetWeight} onChange={(e) => setTargetWeight(Number(e.target.value) || 0)} className="text-lg font-semibold h-12" />
              <p className="text-xs text-secondary font-medium mt-2">
                {targetWeight > profile.weight ? '→ On part sur une prise de masse.' : targetWeight < profile.weight ? '→ On part sur une perte de poids.' : '→ Poids stable, on part sur une recomposition.'}
              </p>
            </CardContent>
          </Card>
          <PrimaryButton onClick={() => setStep('pace')}>Continuer <ArrowRight className="w-4 h-4 ml-2 inline" /></PrimaryButton>
        </StepShell>
      </div>
    );
  }

  if (step === 'pace') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell title="À quel rythme ?" onBack={() => setStep(goal === 'poids_cible' ? 'targetWeight' : 'goal')} progress={{ current: stepIndex('pace') + 1, total: MAIN_STEP_ORDER.length }}>
          <div className="space-y-2.5">
            {PACE_OPTIONS.map((o) => (
              <OptionCard key={o.value} selected={pace === o.value} onClick={() => setPace(o.value)} icon={<Gauge className="w-5 h-5" />} label={o.label} desc={o.desc} />
            ))}
          </div>
          {pace === 'rapide' && (
            <p className="text-xs text-muted-foreground p-3 surface-panel-sm rounded-lg">
              ⚠️ Un rythme rapide est plus exigeant à tenir et moins durable sur le long terme — à réserver aux périodes courtes.
            </p>
          )}
          <PrimaryButton onClick={() => setStep('diet')} disabled={!pace}>Continuer <ArrowRight className="w-4 h-4 ml-2 inline" /></PrimaryButton>
        </StepShell>
      </div>
    );
  }

  if (step === 'diet') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell title="Type d'alimentation" onBack={() => setStep('pace')} progress={{ current: stepIndex('diet') + 1, total: MAIN_STEP_ORDER.length }}>
          <div className="space-y-2.5">
            {DIET_OPTIONS.map((d) => (
              <OptionCard key={d.value} selected={preferences.dietType === d.value} onClick={() => setPreferences({ ...preferences, dietType: d.value })} icon={d.icon} label={d.label} desc={d.desc} />
            ))}
          </div>
          <PrimaryButton onClick={() => setStep('allergies')}>Continuer <ArrowRight className="w-4 h-4 ml-2 inline" /></PrimaryButton>
        </StepShell>
      </div>
    );
  }

  if (step === 'allergies') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell title="Allergies ou intolérances" subtitle="Ce qui doit être exclu du plan." onBack={() => setStep('diet')} progress={{ current: stepIndex('allergies') + 1, total: MAIN_STEP_ORDER.length }}>
          <div className="flex flex-wrap gap-2">
            <Chip selected={preferences.allergies.length === 0} onClick={() => setPreferences({ ...preferences, allergies: [] })}>
              <Ban className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" /> Aucune
            </Chip>
            {ALLERGEN_OPTIONS.map((a) => (
              <Chip key={a.value} selected={preferences.allergies.includes(a.value)} onClick={() => toggleAllergen(a.value)}>
                {a.label}
              </Chip>
            ))}
          </div>
          <PrimaryButton onClick={() => setStep('results')}>Voir mes besoins <ArrowRight className="w-4 h-4 ml-2 inline" /></PrimaryButton>
        </StepShell>
      </div>
    );
  }

  if (step === 'results' && targets) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell title="Tes besoins nutritionnels" subtitle={`Calculé pour ${SPORT_LABELS[profile.sportClass]} · ${profile.trainingDaysCount} j/semaine`} onBack={() => setStep('allergies')} progress={{ current: stepIndex('results') + 1, total: MAIN_STEP_ORDER.length }}>
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Calories quotidiennes cibles</p>
            <p className="text-4xl font-bold text-foreground">{targets.calories}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Métabolisme de base {targets.bmr} kcal · Dépense totale {targets.tdee} kcal · {targets.deltaCalories >= 0 ? '+' : ''}{targets.deltaCalories} kcal
            </p>
            <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/10">
              <div className="text-center">
                <Beef className="w-4 h-4 mx-auto text-secondary mb-1" />
                <p className="text-lg font-bold text-foreground">{targets.proteinesG}g</p>
                <p className="text-[10px] text-muted-foreground uppercase">Protéines</p>
              </div>
              <div className="text-center">
                <Wheat className="w-4 h-4 mx-auto text-secondary mb-1" />
                <p className="text-lg font-bold text-foreground">{targets.glucidesG}g</p>
                <p className="text-[10px] text-muted-foreground uppercase">Glucides</p>
              </div>
              <div className="text-center">
                <Droplet className="w-4 h-4 mx-auto text-secondary mb-1" />
                <p className="text-lg font-bold text-foreground">{targets.lipidesG}g</p>
                <p className="text-[10px] text-muted-foreground uppercase">Lipides</p>
              </div>
            </div>
          </div>

          {/* Réglages avant génération — un seul bloc, pas une pile de cartes séparées */}
          <Card className="glass-card border-primary/20">
            <CardContent className="p-4 divide-y divide-white/10">
              <div className="flex items-center justify-between gap-3 py-3">
                <span className="text-sm font-medium text-foreground">Régime</span>
                <span className="text-sm text-secondary font-semibold">{DIET_LABEL[preferences.dietType]}</span>
              </div>
              <div className="flex items-center justify-between gap-3 py-3">
                <span className="text-sm font-medium text-foreground">Allergies</span>
                <span className="text-sm text-secondary font-semibold">{preferences.allergies.length === 0 ? 'Aucune' : `${preferences.allergies.length} exclue(s)`}</span>
              </div>
              <button onClick={() => setStep('dislikes')} className="w-full flex items-center justify-between gap-3 py-3 text-left">
                <div className="flex items-center gap-3 min-w-0">
                  <ThumbsDown className="w-4 h-4 text-secondary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">Plats exclus & compléments</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {prefsCustomized ? `${preferences.dislikedRecetteIds.length} plat(s) exclu(s) · ${preferences.mealsPerDay} repas/j` : '3 repas/jour (par défaut)'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>

              <div className="pt-3">
                <p className="text-sm font-medium text-foreground mb-2">Durée du plan</p>
                <div className="flex gap-2">
                  {[1, 2, 4].map((w) => (
                    <Chip key={w} selected={planDurationWeeks === w} onClick={() => setPlanDurationWeeks(w)} className="flex-1 text-center">
                      {w} sem.
                    </Chip>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA principal — nettement plus imposant que les réglages au-dessus pour que
              l'action à faire soit évidente en un coup d'œil. */}
          <button
            onClick={handleGenerate}
            className="w-full rounded-2xl p-5 bg-gradient-to-r from-primary to-secondary text-white shadow-[0_8px_24px_hsl(var(--primary)/0.4)] hover:shadow-[0_8px_32px_hsl(var(--primary)/0.55)] active:scale-[0.99] transition-all duration-200 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Wand2 className="w-6 h-6" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="font-bold text-lg leading-tight">Générer mon plan alimentaire</p>
              <p className="text-xs text-white/80 mt-0.5">{planDurationWeeks} semaine{planDurationWeeks > 1 ? 's' : ''} · {targets.calories} kcal/jour</p>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </button>
        </StepShell>
      </div>
    );
  }

  if (step === 'dislikes') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell
          title="Plats que tu n'aimes pas"
          subtitle="Ils seront exclus de la génération du plan."
          onBack={() => (targets ? setStep('results') : navigate('/nutrition'))}
          progress={{ current: PREF_STEP_ORDER.indexOf('dislikes') + 1, total: PREF_STEP_ORDER.length }}
        >
          <Input placeholder="Rechercher une recette..." value={dislikeSearch} onChange={(e) => setDislikeSearch(e.target.value)} />
          <div className="max-h-[45vh] overflow-y-auto space-y-1.5 -mx-1 px-1">
            {filteredDislikeRecettes.map((r) => {
              const disliked = preferences.dislikedRecetteIds.includes(r.id);
              return (
                <button
                  key={r.id}
                  onClick={() => toggleDislike(r.id)}
                  className={`w-full flex items-center gap-3 h-12 px-3 rounded-xl border text-left transition-colors ${
                    disliked ? 'bg-destructive/10 border-destructive/30' : 'surface-panel-sm border-transparent hover:border-primary/30'
                  }`}
                >
                  <span className="text-lg shrink-0">{r.emoji}</span>
                  <span className={`text-sm truncate flex-1 ${disliked ? 'text-foreground/60 line-through' : 'text-foreground/90'}`}>{r.nom}</span>
                  {disliked && <Ban className="w-4 h-4 text-destructive shrink-0" />}
                </button>
              );
            })}
          </div>
          {preferences.dislikedRecetteIds.length > 0 && (
            <p className="text-xs text-secondary font-medium">{preferences.dislikedRecetteIds.length} recette(s) exclue(s)</p>
          )}
          <PrimaryButton onClick={() => setStep('mealsCount')}>Continuer <ArrowRight className="w-4 h-4 ml-2 inline" /></PrimaryButton>
        </StepShell>
      </div>
    );
  }

  if (step === 'mealsCount') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell title="Combien de repas par jour ?" onBack={() => setStep('dislikes')} progress={{ current: PREF_STEP_ORDER.indexOf('mealsCount') + 1, total: PREF_STEP_ORDER.length }}>
          <div className="grid grid-cols-4 gap-2.5">
            {[3, 4, 5, 6].map((n) => (
              <Chip key={n} selected={preferences.mealsPerDay === n} onClick={() => setPreferences({ ...preferences, mealsPerDay: n })} className="h-14 !rounded-xl text-lg flex items-center justify-center">
                {n}
              </Chip>
            ))}
          </div>
          <PrimaryButton onClick={() => setStep('supplements')}>Continuer <ArrowRight className="w-4 h-4 ml-2 inline" /></PrimaryButton>
        </StepShell>
      </div>
    );
  }

  if (step === 'supplements') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg page-transition">
        <StepShell title="Compléments alimentaires" subtitle="S'il y en a, on les intègre dans le plan." onBack={() => setStep('mealsCount')} progress={{ current: PREF_STEP_ORDER.indexOf('supplements') + 1, total: PREF_STEP_ORDER.length }}>
          <div className="flex flex-wrap gap-2">
            {SUPPLEMENT_OPTIONS.map((s) => (
              <Chip key={s.value} selected={preferences.supplements.includes(s.value)} onClick={() => toggleSupplement(s.value)}>
                {s.label}
              </Chip>
            ))}
          </div>
          <PrimaryButton
            onClick={() => {
              if (isStandalonePrefs || !targets) finishStandalonePrefs();
              else { savePlanPreferences(preferences); setPrefsCustomized(true); setStep('results'); }
            }}
          >
            <Check className="w-4 h-4 mr-2 inline" />
            Enregistrer mes préférences
          </PrimaryButton>
        </StepShell>
      </div>
    );
  }

  if (step === 'plan' && generatedPlan) {
    const day = generatedPlan.days[selectedDayIndex];
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl page-transition">
        <div className="space-y-5">
          <Button onClick={() => setStep('results')} variant="ghost" size="sm" className="text-muted-foreground -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <div className="glass-card rounded-2xl p-5">
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              Ton plan alimentaire
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {generatedPlan.days.length} jours · {targets?.calories} kcal/jour visées · {DIET_LABEL[preferences.dietType]}
            </p>
          </div>

          {/* Sélecteur de jour */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {generatedPlan.days.map((d, i) => (
              <Chip key={d.date} selected={i === selectedDayIndex} onClick={() => setSelectedDayIndex(i)} className="shrink-0 !rounded-xl">
                J{i + 1} · {d.jour.slice(0, 3)}
              </Chip>
            ))}
          </div>

          {/* Totaux du jour */}
          <Card className="glass-card border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">{day.jour}</span>
                <span className="text-sm text-muted-foreground">{day.totalCalories} / {targets?.calories} kcal</span>
              </div>
              <Progress value={Math.min((day.totalCalories / (targets?.calories || 1)) * 100, 100)} size="sm" variant="subtle" />
              <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Beef className="w-3 h-3" /> {day.totalProteines}g</span>
                <span className="flex items-center gap-1"><Wheat className="w-3 h-3" /> {day.totalGlucides}g</span>
                <span className="flex items-center gap-1"><Droplet className="w-3 h-3" /> {day.totalLipides}g</span>
              </div>
            </CardContent>
          </Card>

          {/* Repas du jour */}
          <div className="space-y-2.5">
            {day.meals.map((meal, i) => (
              <Card
                key={i}
                className={`glass-card ${meal.isSupplement ? 'border-secondary/30' : 'border-primary/20'} ${meal.recetteId ? 'cursor-pointer hover:border-primary/40' : ''} transition-colors`}
                onClick={() => meal.recetteId && navigate(`/recette/${meal.recetteId}`)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-2xl shrink-0">{meal.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-secondary font-semibold">{meal.label}</p>
                    <p className="text-sm font-medium text-foreground truncate">{meal.nom}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{meal.calories} kcal · P {meal.proteines}g · G {meal.glucides}g · L {meal.lipides}g</p>
                  </div>
                  {meal.recetteId && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setStep('results')} variant="outline" className="flex-1 border-primary/25">
              <Wand2 className="w-4 h-4 mr-2" />
              Régénérer / ajuster
            </Button>
            <Button
              onClick={handleExportPdf}
              className={isCoachStandalone ? 'flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold' : 'shrink-0'}
              variant={isCoachStandalone ? 'default' : 'outline'}
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MealPlanGenerator;
