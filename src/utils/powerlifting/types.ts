import type { MainLift, PowerliftingLevel } from '../programmeGenerator';

export type { MainLift, PowerliftingLevel };

// Les 5 types de programme demandés — un nouveau type ne demande qu'une entrée ici + un fichier
// `programs/xxx.ts` de plus, le reste (config, orchestrateur, modal) n'a pas à changer.
export type ProgramType =
  | 'classique'
  | 'apprentissage'
  | 'specialisation-bench'
  | 'specialisation-squat'
  | 'specialisation-deadlift';

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
  'specialisation-bench': 'Spécialisation — Bench Press',
  'specialisation-squat': 'Spécialisation — Squat',
  'specialisation-deadlift': 'Spécialisation — Deadlift',
};

// Nombre de jours d'entraînement autorisé par type de programme (2 à 6 selon la demande).
export const PROGRAM_TYPE_DAY_RANGE: Record<ProgramType, { min: number; max: number }> = {
  classique: { min: 3, max: 4 },
  apprentissage: { min: 2, max: 4 },
  'specialisation-bench': { min: 3, max: 6 },
  'specialisation-squat': { min: 3, max: 6 },
  'specialisation-deadlift': { min: 3, max: 6 },
};
