import type { MainLift, PowerliftingLevel } from '../programmeGenerator';

export type { MainLift, PowerliftingLevel };

// Un nouveau type ne demande qu'une entrée ici + un fichier `programs/xxx.ts` de plus, le reste
// (config, orchestrateur, modal) n'a pas à changer. "Spé" remplace les 3 anciens types rigides
// specialisation-bench/squat/deadlift : la spécialisation devient optionnelle et on peut cibler 1
// OU 2 mouvements à la fois (le(s) mouvement(s) non ciblé(s) reste(nt) en entretien allégé — voir
// `speTargets` sur PowerliftingProgramConfig et programs/specialisation.ts).
export type ProgramType =
  | 'classique'
  | 'apprentissage'
  | 'spe';

export interface UserMaxes {
  squat: number;
  bench: number;
  deadlift: number;
}

export interface PartialMaxes {
  squat: number | null;
  bench: number | null;
  deadlift: number | null;
}

export interface PowerliftingProgramConfig {
  type: ProgramType;
  trainingDays: string[];
  bodyweight: number;
  sex: 'male' | 'female';
  /** Uniquement pour type === 'spe' : 1 ou 2 mouvements à spécialiser (le(s) restant(s) passe(nt) en entretien). */
  speTargets?: MainLift[];
}

export interface GeneratedExercise {
  id?: string;
  nom: string;
  type: 'echauffement' | 'travail' | 'accessoire';
  series: number;
  reps: number | string;
  poids: number;
  pourcentage: number;
  repos: string;
}

export interface GeneratedSession {
  id: string;
  nom: string;
  day: string;
  phase: string;
  intensity: string;
  duration: number;
  exercises: GeneratedExercise[];
  notes: string;
  equipment: string[];
  isRestDay?: boolean;
}

export interface GeneratedPowerliftingProgram {
  id: string;
  nom: string;
  description: string;
  duree: number;
  sessions: GeneratedSession[];
  type: ProgramType | 'test';
  isTestWeek?: boolean;
}

export const PROGRAM_TYPE_LABELS: Record<ProgramType, string> = {
  classique: 'Classique (5/3/1)',
  apprentissage: 'Apprentissage',
  spe: 'Spé (spécialisation optionnelle)',
};

// Nombre de jours d'entraînement autorisé par type de programme (2 à 6 selon la demande).
export const PROGRAM_TYPE_DAY_RANGE: Record<ProgramType, { min: number; max: number }> = {
  classique: { min: 3, max: 6 },
  apprentissage: { min: 2, max: 4 },
  spe: { min: 3, max: 6 },
};
