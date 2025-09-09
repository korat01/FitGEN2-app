export interface UserProfile {
  id: string;
  nom: string;
  email: string;
  age: number;
  poids: number;
  taille: number;
  objectif: 'perte_poids' | 'prise_masse' | 'maintien' | 'force' | 'powerlifting';
  niveau: 'debutant' | 'intermediaire' | 'avance';
  frequence: number; // jours par semaine
  focus?: FocusArea[]; // Seulement pour musculation
  focusForce?: ForceFocus[]; // Seulement pour force/powerlifting
  preferences: {
    dureeSeance: number; // minutes
    equipement: string[];
    restrictions: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface FocusArea {
  id: string;
  nom: string;
  pourcentage: number; // Pourcentage d'entraînement dédié
  exercices: string[]; // IDs des exercices associés
  couleur: string;
  icone: string;
}

export interface ForceFocus {
  id: string;
  nom: string;
  exercice: string; // squat, deadlift, bench_press
  priorite: number; // 1-3
  objectif: string; // ex: "Atteindre 2x le poids corporel"
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