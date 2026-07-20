import { buildWarmupSets, roundToPlates, assignExerciseIds } from '../programmeGenerator';
import type { GeneratedPowerliftingProgram, GeneratedSession, MainLift, PowerliftingProgramConfig } from './types';

const MAIN_LIFT_NOM: Record<MainLift, string> = {
  squat: 'Squat',
  bench: 'Développé Couché',
  deadlift: 'Soulevé de Terre',
};

// Ratios poids de corps prudents, juste pour ancrer une rampe d'échauffement quand AUCUNE perf
// n'est connue — pas une prédiction de charge, d'où le message dans les conseils de la séance.
const NOVICE_TEST_RATIOS: Record<MainLift, { male: number; female: number }> = {
  squat: { male: 0.5, female: 0.4 },
  bench: { male: 0.4, female: 0.25 },
  deadlift: { male: 0.75, female: 0.6 },
};

function createTestSession(
  jour: number,
  lift: MainLift,
  bodyweight: number,
  sex: string,
  dayName: string
): GeneratedSession {
  const nomPrincipal = MAIN_LIFT_NOM[lift];
  const ratio = NOVICE_TEST_RATIOS[lift][sex === 'female' ? 'female' : 'male'];
  const estimatedTop = roundToPlates(bodyweight * ratio);

  const warmup = buildWarmupSets(nomPrincipal, estimatedTop, [
    { pct: 0.4, reps: 8 },
    { pct: 0.6, reps: 5 },
    { pct: 0.8, reps: 3 },
  ]);

  const testSet = {
    nom: `${nomPrincipal} (test — trouvez votre charge de référence)`,
    type: 'travail' as const,
    series: 1,
    reps: '3-5',
    poids: estimatedTop,
    pourcentage: 0,
    repos: '3-4 min',
  };

  const exercises = assignExerciseIds(`test-${jour}`, [...warmup, testSet]);

  return {
    id: `test-${jour}`,
    nom: `Semaine 1 - ${dayName} (TEST)`,
    day: dayName,
    phase: 'Adaptation',
    intensity: 'Modérée',
    duration: exercises.length * 10,
    exercises,
    notes: `Séance TEST — vous n'avez pas encore de ${nomPrincipal.toLowerCase()} enregistré. Montez progressivement (le poids affiché n'est qu'une estimation de départ) et arrêtez-vous sur un set de 3 à 5 répétitions difficile mais techniquement propre. Enregistrez ensuite ce poids dans vos performances (page Stats) : votre programme complet se génère automatiquement dès que les 3 mouvements sont connus.`,
    equipment: ['Barre', 'Disques', 'Rack'],
  };
}

// Semaine 1 dédiée à estimer les mouvements dont on ne connaît aucune vraie perf — une séance de
// test par mouvement manquant, placée sur les premiers jours d'entraînement choisis. Le programme
// complet (Classique/Apprentissage/Spécialisation) ne se génère qu'une fois ces résultats saisis.
export function generateTestWeek(config: PowerliftingProgramConfig, missingLifts: MainLift[]): GeneratedPowerliftingProgram {
  const sessions = missingLifts.map((lift, index) =>
    createTestSession(index + 1, lift, config.bodyweight, config.sex, config.trainingDays[index] || `Jour ${index + 1}`)
  );

  return {
    id: `test-${Date.now()}`,
    nom: 'Semaine de test — estimation de vos charges de référence',
    description: `Avant de générer votre programme, on a besoin de connaître votre ${missingLifts.map((l) => MAIN_LIFT_NOM[l].toLowerCase()).join(', ')}. Cette semaine sert uniquement à ça.`,
    duree: 1,
    sessions,
    type: 'test',
    isTestWeek: true,
  };
}
