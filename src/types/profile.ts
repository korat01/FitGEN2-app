export type FocusArea = 'bras' | 'fesses' | 'jambes' | 'dos' | 'pectoraux' | 'epaules' | 'abdos';

export type ForceFocus = 'squat' | 'deadlift' | 'bench_press';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  weight: number;
  age: number;
  sex: 'male' | 'female';
  sportClass: 'powerlifter' | 'runner' | 'allround' | 'calisthenics' | 'crossfit' | 'marathon' | 'streetlifting' | 'sprint' | 'classique';
  phone?: string;
  location?: string;
  height?: number;
  goal?: 'performance' | 'musculation' | 'endurance' | 'sante';
  generalLevel?: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  trainingDays?: string[]; // Jours d'entraînement sélectionnés
  trainingMonths?: number; // Durée d'entraînement en mois
  [key: `focus_${string}`]: boolean | undefined; // For dynamic focus fields
  [key: `muscleGroup_${string}`]: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert' | undefined; // For dynamic muscle group levels
  preferences: {
    dureeSeance: number;
    equipement: string[];
    restrictions: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  // AJOUTER CES CHAMPS
  // sex?: 'male' | 'female';
  // profileType?: 'powerlifter' | 'runner' | 'allround' | 'calisthenics';
  // sportClass?: 'crossfit' | 'power' | 'classique' | 'marathon' | 'calisthenics' | 'yoga' | 'natation' | 'cyclisme';
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