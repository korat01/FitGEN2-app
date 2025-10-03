export type FocusAreaId = 'bras' | 'fesses' | 'jambes' | 'dos' | 'pectoraux' | 'epaules' | 'abdos' | 'abdominaux';

export type ForceFocusId = 'squat' | 'deadlift' | 'bench_press';

export interface FocusArea {
  id: string;
  nom: string;
  pourcentage: number;
  exercices: string[];
  couleur: string;
  icone: string;
}

export interface ForceFocus {
  id: string;
  nom: string;
  exercice: string;
  priorite: number;
  objectif: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  weight: number;
  age: number;
  sportClass: 'classique' | 'crossfit' | 'power' | 'powerlifter' | 'allround' | 'runner' | 'marathon' | 'calisthenics' | 'sprint' | 'streetlifting';
  niveau?: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  objectif?: '10k' | 'semi' | 'marathon';
  vma?: number;
  seancesParSemaine?: number;
  sex?: 'male' | 'female';
  phone?: string;
  location?: string;
  height?: number;
  birthDate?: string;
  goal?: 'performance' | 'musculation' | 'endurance' | 'sante';
  focusArea?: FocusAreaId;
  forceFocus?: ForceFocusId;
  globalScore?: number;
  generalLevel?: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  trainingDays?: string[];
  trainingMonths?: number;
  focus_pectoraux?: boolean;
  focus_dos?: boolean;
  focus_bras?: boolean;
  focus_epaules?: boolean;
  focus_abdos?: boolean;
  focus_jambes?: boolean;
  focus_fessiers?: boolean;
  focus_squat?: boolean;
  focus_bench?: boolean;
  focus_deadlift?: boolean;
  focus_endurance?: boolean;
  focus_explosivite?: boolean;
  focus_calisthenics?: boolean;
  createdAt?: string;
}

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'bras',
    nom: 'Bras',
    pourcentage: 0,
    exercices: ['biceps', 'triceps', 'avant_bras'],
    couleur: 'blue',
    icone: '💪'
  },
  {
    id: 'fesses',
    nom: 'Fesses',
    pourcentage: 0,
    exercices: ['squats', 'hip_thrust', 'lunges', 'glute_bridge'],
    couleur: 'pink',
    icone: '🍑'
  },
  {
    id: 'jambes',
    nom: 'Jambes',
    pourcentage: 0,
    exercices: ['squats', 'leg_press', 'leg_curl', 'calf_raises'],
    couleur: 'green',
    icone: '🦵'
  },
  {
    id: 'dos',
    nom: 'Dos',
    pourcentage: 0,
    exercices: ['tractions', 'rows', 'lat_pulldown', 'deadlift'],
    couleur: 'purple',
    icone: '��️'
  },
  {
    id: 'pectoraux',
    nom: 'Pectoraux',
    pourcentage: 0,
    exercices: ['bench_press', 'push_ups', 'dips', 'flyes'],
    couleur: 'red',
    icone: '💪'
  },
  {
    id: 'abdominaux',
    nom: 'Abdominaux',
    pourcentage: 0,
    exercices: ['plank', 'crunches', 'russian_twists', 'mountain_climbers'],
    couleur: 'yellow',
    icone: '🔥'
  }
];

export const FORCE_FOCUS_OPTIONS: ForceFocus[] = [
  {
    id: 'squat',
    nom: 'Squat',
    exercice: 'squat',
    priorite: 1,
    objectif: 'Atteindre 2x le poids corporel'
  },
  {
    id: 'deadlift',
    nom: 'Deadlift',
    exercice: 'deadlift',
    priorite: 1,
    objectif: 'Atteindre 2.5x le poids corporel'
  },
  {
    id: 'bench_press',
    nom: 'Développé couché',
    exercice: 'bench_press',
    priorite: 1,
    objectif: 'Atteindre 1.5x le poids corporel'
  }
]; 