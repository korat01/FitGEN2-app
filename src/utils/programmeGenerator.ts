import { UserProfile } from '../types/profile';
import { calculateIPFGLPoints } from './statsCalculator';

// Types pour le générateur de programme
export interface Exercise {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  type: string;
  difficulte: string;
  muscles: string[];
  equipement: string[];
  instructions: string[];
  conseils: string;
  variations: string[];
  progression: {
    sets: number;
    reps: string;
    poids: string;
    repos: string;
  };
}

export interface Session {
  id: string;
  nom: string;
  day: string;
  exercises: Exercise[];
  duration: number;
  intensity: 'Faible' | 'Modérée' | 'Élevée';
  phase: 'Adaptation' | 'Progression' | 'Spécialisation';
  focus: string[];
  notes: string;
  equipment: string[];
}

export interface Programme {
  id: string;
  nom: string;
  description: string;
  duree: number;
  sessions: Session[];
  phases: {
    adaptation: Session[];
    progression: Session[];
    specialisation: Session[];
  };
  progression: {
    totalSessions: number;
    sessionsParSemaine: number;
    dureeMoyenne: number;
  };
}

export interface ProfileAnalysis {
  sportClass: string;
  level: string;
  trainingDays: string[];
  duration: number;
  focus: string[];
  intensity: string;
}

// Base de données d'exercices étendue
const exercicesDatabase: Exercise[] = [
  // PECTORAUX
  {
    id: 'bench_press',
    nom: 'Développé couché',
    description: 'Exercice de base pour les pectoraux',
    categorie: 'Force',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Pectoraux', 'Triceps', 'Deltoïdes antérieurs'],
    equipement: ['Barre + Banc'],
    instructions: ['Allongez-vous sur le banc', 'Saisissez la barre', 'Descendez vers la poitrine', 'Poussez vers le haut'],
    conseils: 'Gardez les pieds au sol et le dos droit',
    variations: ['Développé incliné', 'Développé décliné'],
    progression: { sets: 3, reps: '8-12', poids: 'Modéré', repos: '2-3 min' }
  },
  {
    id: 'push_ups',
    nom: 'Pompes',
    description: 'Exercice de base pour les pectoraux',
    categorie: 'Calisthenics',
    type: 'Compound',
    difficulte: 'Débutant',
    muscles: ['Pectoraux', 'Triceps', 'Deltoïdes antérieurs'],
    equipement: ['Aucun'],
    instructions: ['Position de planche', 'Descendez en gardant le corps droit', 'Poussez vers le haut'],
    conseils: 'Gardez le corps aligné',
    variations: ['Pompes inclinées', 'Pompes diamant'],
    progression: { sets: 3, reps: '10-20', poids: 'Corps', repos: '1-2 min' }
  },
  {
    id: 'dumbbell_press',
    nom: 'Développé haltères',
    description: 'Exercice pour les pectoraux avec haltères',
    categorie: 'Force',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Pectoraux', 'Triceps', 'Deltoïdes antérieurs'],
    equipement: ['Haltères + Banc'],
    instructions: ['Allongez-vous avec haltères', 'Descendez vers la poitrine', 'Poussez vers le haut'],
    conseils: 'Contrôlez la descente',
    variations: ['Développé incliné haltères'],
    progression: { sets: 3, reps: '8-12', poids: 'Modéré', repos: '2-3 min' }
  },

  // DOS
  {
    id: 'deadlift',
    nom: 'Soulevé de terre',
    description: 'Exercice de base pour le dos',
    categorie: 'Force',
    type: 'Compound',
    difficulte: 'Avancé',
    muscles: ['Erecteurs du rachis', 'Fessiers', 'Ischio-jambiers', 'Trapèzes'],
    equipement: ['Barre'],
    instructions: ['Placez-vous devant la barre', 'Saisissez la barre', 'Gardez le dos droit et soulevez'],
    conseils: 'Ne jamais arrondir le dos',
    variations: ['Soulevé sumo', 'Soulevé roumain'],
    progression: { sets: 3, reps: '5-8', poids: 'Élevé', repos: '3-5 min' }
  },
  {
    id: 'pull_ups',
    nom: 'Tractions',
    description: 'Exercice de base pour le dos',
    categorie: 'Calisthenics',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Grand dorsal', 'Biceps', 'Rhomboides'],
    equipement: ['Barre de traction'],
    instructions: ['Suspendez-vous à la barre', 'Tirez votre corps vers le haut', 'Descendez de manière contrôlée'],
    conseils: 'Gardez le corps droit',
    variations: ['Tractions assistées', 'Tractions lestées'],
    progression: { sets: 3, reps: '5-15', poids: 'Corps', repos: '2-3 min' }
  },
  {
    id: 'bent_over_row',
    nom: 'Rowing penché',
    description: 'Exercice pour le dos',
    categorie: 'Force',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Grand dorsal', 'Rhomboides', 'Trapèzes'],
    equipement: ['Barre'],
    instructions: ['Penchez-vous en avant', 'Tirez la barre vers le ventre', 'Contrôlez la descente'],
    conseils: 'Gardez le dos droit',
    variations: ['Rowing haltères'],
    progression: { sets: 3, reps: '8-12', poids: 'Modéré', repos: '2-3 min' }
  },

  // BRAS
  {
    id: 'bicep_curl',
    nom: 'Curl biceps',
    description: 'Exercice pour les biceps',
    categorie: 'Force',
    type: 'Isolation',
    difficulte: 'Débutant',
    muscles: ['Biceps'],
    equipement: ['Haltères'],
    instructions: ['Debout avec haltères', 'Curl vers les épaules', 'Contrôlez la descente'],
    conseils: 'Gardez les coudes fixes',
    variations: ['Curl barre', 'Curl marteau'],
    progression: { sets: 3, reps: '10-15', poids: 'Léger', repos: '1-2 min' }
  },
  {
    id: 'tricep_dips',
    nom: 'Dips triceps',
    description: 'Exercice pour les triceps',
    categorie: 'Calisthenics',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Triceps', 'Pectoraux'],
    equipement: ['Banc ou barres'],
    instructions: ['Position de dips', 'Descendez en contrôlant', 'Poussez vers le haut'],
    conseils: 'Gardez le corps droit',
    variations: ['Dips assistés', 'Dips lestés'],
    progression: { sets: 3, reps: '8-15', poids: 'Corps', repos: '2-3 min' }
  },

  // ÉPAULES
  {
    id: 'overhead_press',
    nom: 'Développé militaire',
    description: 'Exercice pour les épaules',
    categorie: 'Force',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Deltoïdes', 'Triceps'],
    equipement: ['Barre'],
    instructions: ['Debout avec barre', 'Poussez vers le haut', 'Contrôlez la descente'],
    conseils: 'Gardez le tronc gainé',
    variations: ['Développé haltères', 'Développé assis'],
    progression: { sets: 3, reps: '8-12', poids: 'Modéré', repos: '2-3 min' }
  },
  {
    id: 'lateral_raise',
    nom: 'Élévations latérales',
    description: 'Exercice pour les épaules',
    categorie: 'Force',
    type: 'Isolation',
    difficulte: 'Débutant',
    muscles: ['Deltoïdes'],
    equipement: ['Haltères'],
    instructions: ['Debout avec haltères', 'Élevez sur les côtés', 'Contrôlez la descente'],
    conseils: 'Gardez les bras légèrement fléchis',
    variations: ['Élévations frontales'],
    progression: { sets: 3, reps: '12-15', poids: 'Léger', repos: '1-2 min' }
  },

  // ABDOMINAUX
  {
    id: 'plank',
    nom: 'Planche',
    description: 'Exercice pour les abdominaux',
    categorie: 'Calisthenics',
    type: 'Isolation',
    difficulte: 'Débutant',
    muscles: ['Abdominaux', 'Core'],
    equipement: ['Aucun'],
    instructions: ['Position de planche', 'Gardez le corps droit', 'Maintenez la position'],
    conseils: 'Gardez le tronc gainé',
    variations: ['Planche latérale', 'Planche sur les coudes'],
    progression: { sets: 3, reps: '30-60s', poids: 'Corps', repos: '1 min' }
  },
  {
    id: 'crunches',
    nom: 'Crunchs',
    description: 'Exercice pour les abdominaux',
    categorie: 'Calisthenics',
    type: 'Isolation',
    difficulte: 'Débutant',
    muscles: ['Abdominaux'],
    equipement: ['Aucun'],
    instructions: ['Allongé sur le dos', 'Relevez le buste', 'Contrôlez la descente'],
    conseils: 'Gardez le bas du dos au sol',
    variations: ['Crunchs obliques', 'Crunchs jambes relevées'],
    progression: { sets: 3, reps: '15-25', poids: 'Corps', repos: '1 min' }
  },

  // JAMBES
  {
    id: 'squat',
    nom: 'Squat',
    description: 'Exercice de base pour les jambes',
    categorie: 'Force',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
    equipement: ['Barre + Rack'],
    instructions: ['Placez la barre sur les épaules', 'Descendez en gardant le dos droit', 'Remontez en contractant les fessiers'],
    conseils: 'Gardez les genoux alignés avec les pieds',
    variations: ['Squat goblet', 'Squat bulgare'],
    progression: { sets: 3, reps: '8-12', poids: 'Modéré', repos: '2-3 min' }
  },
  {
    id: 'lunges',
    nom: 'Fentes',
    description: 'Exercice pour les jambes',
    categorie: 'Force',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
    equipement: ['Aucun'],
    instructions: ['Debout', 'Faites un pas en avant', 'Descendez en gardant le buste droit'],
    conseils: 'Gardez le genou arrière proche du sol',
    variations: ['Fentes arrière', 'Fentes marchées'],
    progression: { sets: 3, reps: '10-15', poids: 'Corps', repos: '1-2 min' }
  },

  // FESSIERS
  {
    id: 'hip_thrust',
    nom: 'Hip Thrust',
    description: 'Exercice pour les fessiers',
    categorie: 'Force',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Fessiers', 'Ischio-jambiers'],
    equipement: ['Banc + Barre'],
    instructions: ['Assis sur le banc', 'Placez la barre sur les hanches', 'Poussez les hanches vers le haut'],
    conseils: 'Contractez les fessiers en haut',
    variations: ['Hip Thrust haltères', 'Hip Thrust au sol'],
    progression: { sets: 3, reps: '10-15', poids: 'Modéré', repos: '2-3 min' }
  },
  {
    id: 'glute_bridge',
    nom: 'Pont fessier',
    description: 'Exercice pour les fessiers',
    categorie: 'Calisthenics',
    type: 'Isolation',
    difficulte: 'Débutant',
    muscles: ['Fessiers', 'Ischio-jambiers'],
    equipement: ['Aucun'],
    instructions: ['Allongé sur le dos', 'Relevez les hanches', 'Contractez les fessiers'],
    conseils: 'Gardez les pieds bien ancrés',
    variations: ['Pont fessier surélevé', 'Pont fessier lesté'],
    progression: { sets: 3, reps: '15-20', poids: 'Corps', repos: '1 min' }
  },

  // ENDURANCE
  {
    id: 'running',
    nom: 'Course à pied',
    description: 'Exercice d\'endurance',
    categorie: 'Endurance',
    type: 'Cardio',
    difficulte: 'Débutant',
    muscles: ['Jambes', 'Cardio'],
    equipement: ['Aucun'],
    instructions: ['Échauffement 5 min', 'Course à rythme modéré', 'Récupération 5 min'],
    conseils: 'Gardez un rythme régulier',
    variations: ['Course fractionnée', 'Course longue'],
    progression: { sets: 1, reps: '20-45 min', poids: 'Corps', repos: '5 min' }
  },
  {
    id: 'burpees',
    nom: 'Burpees',
    description: 'Exercice d\'endurance',
    categorie: 'Endurance',
    type: 'Compound',
    difficulte: 'Intermédiaire',
    muscles: ['Tout le corps'],
    equipement: ['Aucun'],
    instructions: ['Squat', 'Planche', 'Pompe', 'Saut'],
    conseils: 'Gardez le rythme régulier',
    variations: ['Burpees sans saut', 'Burpees lestés'],
    progression: { sets: 3, reps: '8-15', poids: 'Corps', repos: '2-3 min' }
  }
];

// NOUVELLE FONCTION : Système 5-3-1 pour Powerlifting
export const generate531Progression = (phase: string, week: number): { sets: number; reps: string; poids: string; repos: string } => {
  const percentages = {
    adaptation: { week1: 65, week2: 70, week3: 75 },
    progression: { week1: 70, week2: 75, week3: 80 },
    specialisation: { week1: 75, week2: 80, week3: 85 }
  };

  const phaseData = percentages[phase as keyof typeof percentages];
  const percentage = phaseData[`week${week}` as keyof typeof phaseData];

  return {
    sets: 3,
    reps: '5-3-1',
    poids: `${percentage}% du max`,
    repos: '3-5 min'
  };
};

// NOUVELLE FONCTION : Programmes inspirés de Panash et Brutus
export const generatePanashBrutusProgram = (exercises: Exercise[], phase: string, level: string): Exercise[] => {
  const programExercises: Exercise[] = [];
  
  // Structure Panash/Brutus : 3 exercices principaux + 2-3 accessoires
  const mainExercises = exercises.filter(ex => ex.type === 'Compound').slice(0, 3);
  const accessoryExercises = exercises.filter(ex => ex.type !== 'Compound').slice(0, 3);

  // Exercices principaux avec progression spécialisée
  mainExercises.forEach(exercise => {
    const progression = generate531Progression(phase, 1);
    programExercises.push({
      ...exercise,
      progression: {
        ...progression,
        sets: level === 'Débutant' ? 3 : level === 'Intermédiaire' ? 4 : 5,
        repos: '3-5 min'
      }
    });
  });

  // Exercices accessoires avec progression classique
  accessoryExercises.forEach(exercise => {
    programExercises.push({
      ...exercise,
      progression: {
        sets: level === 'Débutant' ? 2 : level === 'Intermédiaire' ? 3 : 4,
        reps: level === 'Débutant' ? '8-12' : level === 'Intermédiaire' ? '6-10' : '4-8',
        poids: level === 'Débutant' ? 'Modéré' : level === 'Intermédiaire' ? 'Élevé' : 'Très élevé',
        repos: '2-3 min'
      }
    });
  });

  return programExercises;
};

// NOUVELLE FONCTION : Programmes Crossfit inspirés
export const generateCrossfitProgram = (exercises: Exercise[], phase: string, level: string): Exercise[] => {
  const programExercises: Exercise[] = [];
  
  // Structure Crossfit : WOD + exercices de force
  const wodExercises = exercises.filter(ex => ex.categorie === 'Endurance' || ex.equipement.includes('Aucun'));
  const strengthExercises = exercises.filter(ex => ex.categorie === 'Force');

  // WOD principal
  if (wodExercises.length > 0) {
    const wod = wodExercises[0];
    programExercises.push({
      ...wod,
      progression: {
        sets: 1,
        reps: phase === 'adaptation' ? '10-15 min' : phase === 'progression' ? '15-20 min' : '20-25 min',
        poids: 'Corps',
        repos: '5 min'
      }
    });
  }

  // Exercices de force
  strengthExercises.slice(0, 3).forEach(exercise => {
    programExercises.push({
      ...exercise,
      progression: {
        sets: level === 'Débutant' ? 3 : level === 'Intermédiaire' ? 4 : 5,
        reps: level === 'Débutant' ? '8-12' : level === 'Intermédiaire' ? '6-10' : '4-8',
        poids: level === 'Débutant' ? 'Modéré' : level === 'Intermédiaire' ? 'Élevé' : 'Très élevé',
        repos: '2-3 min'
      }
    });
  });

  return programExercises;
};

// NOUVELLE FONCTION : Programmes Marathon/Endurance
export const generateMarathonProgram = (exercises: Exercise[], phase: string, level: string): Exercise[] => {
  const programExercises: Exercise[] = [];
  
  // Structure Marathon : Cardio principal + renforcement
  const cardioExercises = exercises.filter(ex => ex.categorie === 'Endurance');
  const strengthExercises = exercises.filter(ex => ex.categorie === 'Force');

  // Cardio principal
  if (cardioExercises.length > 0) {
    const cardio = cardioExercises[0];
    programExercises.push({
      ...cardio,
      progression: {
        sets: 1,
        reps: phase === 'adaptation' ? '20-30 min' : phase === 'progression' ? '30-45 min' : '45-60 min',
        poids: 'Corps',
        repos: '5 min'
      }
    });
  }

  // Renforcement musculaire
  strengthExercises.slice(0, 4).forEach(exercise => {
    programExercises.push({
      ...exercise,
      progression: {
        sets: level === 'Débutant' ? 2 : level === 'Intermédiaire' ? 3 : 4,
        reps: level === 'Débutant' ? '12-15' : level === 'Intermédiaire' ? '10-12' : '8-10',
        poids: level === 'Débutant' ? 'Léger' : level === 'Intermédiaire' ? 'Modéré' : 'Élevé',
        repos: '1-2 min'
      }
    });
  });

  return programExercises;
};

// NOUVELLE FONCTION : Programmes Calisthenics
export const generateCalisthenicsProgram = (exercises: Exercise[], phase: string, level: string): Exercise[] => {
  const programExercises: Exercise[] = [];
  
  // Structure Calisthenics : Push/Pull/Legs
  const pushExercises = exercises.filter(ex => ex.muscles.some(m => m.includes('Pectoraux') || m.includes('Triceps')));
  const pullExercises = exercises.filter(ex => ex.muscles.some(m => m.includes('Dos') || m.includes('Biceps')));
  const legExercises = exercises.filter(ex => ex.muscles.some(m => m.includes('Jambes') || m.includes('Fessiers')));

  // Sélection équilibrée
  const selectedExercises = [
    ...pushExercises.slice(0, 2),
    ...pullExercises.slice(0, 2),
    ...legExercises.slice(0, 2)
  ];

  selectedExercises.forEach(exercise => {
    programExercises.push({
      ...exercise,
      progression: {
        sets: level === 'Débutant' ? 3 : level === 'Intermédiaire' ? 4 : 5,
        reps: level === 'Débutant' ? '8-12' : level === 'Intermédiaire' ? '6-10' : '4-8',
        poids: 'Corps',
        repos: '2-3 min'
      }
    });
  });

  return programExercises;
};

// NOUVELLE FONCTION : Génération de noms de séances améliorée
export const generateSessionName = (exercises: Exercise[], sportClass: string, day: string): string => {
  // Identifier les exercices principaux
  const mainExercises = exercises.filter(ex => ex.type === 'Compound');
  const exerciseNames = mainExercises.map(ex => ex.nom.toLowerCase());
  
  // Noms selon le sport avec systèmes spécialisés
  switch (sportClass.toLowerCase()) {
    case 'powerlifting':
    case 'power':
      if (exerciseNames.includes('squat')) return 'Séance Squat 5-3-1';
      if (exerciseNames.includes('développé couché')) return 'Séance Bench 5-3-1';
      if (exerciseNames.includes('soulevé de terre')) return 'Séance Deadlift 5-3-1';
      return 'Séance Force 5-3-1';
      
    case 'marathon':
    case 'endurance':
      if (exerciseNames.includes('course à pied')) return 'Séance Course Longue';
      if (exerciseNames.includes('burpees')) return 'Séance Cardio Intensif';
      return 'Séance Endurance';
      
    case 'crossfit':
      if (exerciseNames.includes('burpees')) return 'Séance WOD Métabolique';
      if (exerciseNames.includes('squat') && exerciseNames.includes('pompes')) return 'Séance WOD Force';
      return 'Séance Crossfit';
      
    case 'calisthenics':
    case 'streetlifting':
      if (exerciseNames.includes('tractions')) return 'Séance Pull Day';
      if (exerciseNames.includes('pompes')) return 'Séance Push Day';
      if (exerciseNames.includes('tractions') && exerciseNames.includes('pompes')) return 'Séance Push/Pull';
      return 'Séance Calisthenics';
      
    default:
      // Noms génériques selon les exercices
      if (exerciseNames.includes('squat')) return 'Séance Jambes';
      if (exerciseNames.includes('développé couché') || exerciseNames.includes('pompes')) return 'Séance Pectoraux';
      if (exerciseNames.includes('soulevé de terre') || exerciseNames.includes('tractions')) return 'Séance Dos';
      if (exerciseNames.includes('développé militaire')) return 'Séance Épaules';
      if (exerciseNames.includes('curl biceps') || exerciseNames.includes('dips triceps')) return 'Séance Bras';
      if (exerciseNames.includes('planche') || exerciseNames.includes('crunchs')) return 'Séance Core';
      
      // Noms selon le jour
      switch (day.toLowerCase()) {
        case 'lundi': return 'Séance Début de Semaine';
        case 'mardi': return 'Séance Force';
        case 'mercredi': return 'Séance Cardio';
        case 'jeudi': return 'Séance Hypertrophie';
        case 'vendredi': return 'Séance Fin de Semaine';
        case 'samedi': return 'Séance Weekend';
        case 'dimanche': return 'Séance Récupération';
        default: return 'Séance Entraînement';
      }
  }
};

// Fonction d'analyse du profil
export const analyzeProfile = (user: UserProfile): ProfileAnalysis => {
  if (!user) {
    return {
      sportClass: 'Classique',
      level: 'Débutant',
      trainingDays: ['lundi', 'mercredi', 'vendredi'],
      duration: 3,
      focus: [],
      intensity: 'Modérée'
    };
  }

  // Extraction des zones de focus
  const focus: string[] = [];
  Object.keys(user).forEach(key => {
    if (key.startsWith('focus_') && user[key as keyof UserProfile]) {
      focus.push(key.replace('focus_', ''));
    }
  });

  return {
    sportClass: user.sportClass || 'classique',
    level: user.generalLevel || 'Débutant',
    trainingDays: user.trainingDays || ['lundi', 'mercredi', 'vendredi'],
    duration: user.trainingMonths || 3,
    focus,
    intensity: 'Modérée'
  };
};

// Fonction de filtrage par classe de sport - AMÉLIORÉE
export const filterBySportClass = (exercises: Exercise[], sportClass: string): Exercise[] => {
  console.log(`🏋️ Filtrage par classe de sport: ${sportClass}`);
  
  switch (sportClass.toLowerCase()) {
    case 'powerlifting':
    case 'power':
      // Powerlifting: Focus sur les 3 mouvements de base + exercices de force avec charges
      const powerExercises = exercises.filter(ex => 
        ['squat', 'bench_press', 'deadlift'].includes(ex.id) ||
        (ex.categorie === 'Force' && ex.type === 'Compound' && 
         !ex.equipement.includes('Aucun') && 
         !ex.nom.toLowerCase().includes('front lever') &&
         !ex.nom.toLowerCase().includes('handstand') &&
         !ex.nom.toLowerCase().includes('muscle up'))
      );
      console.log(`💪 Powerlifting: ${powerExercises.length} exercices sélectionnés`);
      return powerExercises;
      
    case 'marathon':
    case 'endurance':
      // Marathon: Focus sur l'endurance et le cardio
      const enduranceExercises = exercises.filter(ex => 
        ex.categorie === 'Endurance' || 
        ex.type === 'Cardio' ||
        ex.id === 'running' ||
        ex.id === 'burpees'
      );
      console.log(`🏃 Marathon: ${enduranceExercises.length} exercices sélectionnés`);
      return enduranceExercises;
      
    case 'crossfit':
      // Crossfit: Mix de force et endurance, exercices fonctionnels mais sans calisthenics avancés
      const crossfitExercises = exercises.filter(ex => 
        ex.type === 'Compound' || 
        ex.categorie === 'Force' ||
        ex.categorie === 'Endurance' ||
        (ex.equipement.includes('Aucun') && 
         !ex.nom.toLowerCase().includes('front lever') &&
         !ex.nom.toLowerCase().includes('handstand') &&
         !ex.nom.toLowerCase().includes('muscle up'))
      );
      console.log(`🔥 Crossfit: ${crossfitExercises.length} exercices sélectionnés`);
      return crossfitExercises;
      
    case 'calisthenics':
    case 'streetlifting':
      // Calisthenics: Exercices au poids du corps + barres
      const calisthenicsExercises = exercises.filter(ex => 
        ex.categorie === 'Calisthenics' ||
        ex.equipement.includes('Aucun') ||
        ex.equipement.includes('Barre de traction') ||
        ex.equipement.includes('Barre') ||
        ex.nom.toLowerCase().includes('pull') ||
        ex.nom.toLowerCase().includes('dip') ||
        ex.nom.toLowerCase().includes('front lever') ||
        ex.nom.toLowerCase().includes('handstand') ||
        ex.nom.toLowerCase().includes('muscle up')
      );
      console.log(`🤸 Calisthenics: ${calisthenicsExercises.length} exercices sélectionnés`);
      return calisthenicsExercises;
      
    default:
      // Classique: Tous les exercices
      console.log(`🏋️ Classique: ${exercises.length} exercices sélectionnés`);
      return exercises;
  }
};

// Fonction d'adaptation au niveau
export const adaptToLevel = (exercises: Exercise[], level: string): Exercise[] => {
  console.log(`📊 Adaptation au niveau: ${level}`);
  
  switch (level.toLowerCase()) {
    case 'débutant':
      const beginnerExercises = exercises.filter(ex => ex.difficulte === 'Débutant');
      console.log(`🟢 Débutant: ${beginnerExercises.length} exercices sélectionnés`);
      return beginnerExercises;
      
    case 'intermédiaire':
      const intermediateExercises = exercises.filter(ex => 
        ex.difficulte === 'Débutant' || ex.difficulte === 'Intermédiaire'
      );
      console.log(`🟡 Intermédiaire: ${intermediateExercises.length} exercices sélectionnés`);
      return intermediateExercises;
      
    case 'avancé':
      console.log(`🔴 Avancé: ${exercises.length} exercices sélectionnés`);
      return exercises;
      
    default:
      const defaultExercises = exercises.filter(ex => ex.difficulte === 'Débutant');
      console.log(`⚪ Défaut: ${defaultExercises.length} exercices sélectionnés`);
      return defaultExercises;
  }
};

// NOUVELLE FONCTION : Répartition intelligente des exercices selon les focus
export const distributeExercisesByFocus = (exercises: Exercise[], focus: string[]): Exercise[] => {
  if (focus.length === 0) {
    // Pas de focus = répartition équitable
    console.log('🎯 Aucun focus sélectionné - répartition équitable');
    return exercises;
  }

  const focusExercises: Exercise[] = [];
  const otherExercises: Exercise[] = [];

  // Séparer les exercices selon les focus
  exercises.forEach(exercise => {
    const hasFocus = focus.some(f => 
      exercise.muscles.some(muscle => 
        muscle.toLowerCase().includes(f.toLowerCase())
      )
    );
    
    if (hasFocus) {
      focusExercises.push(exercise);
      } else {
      otherExercises.push(exercise);
    }
  });

  // Calculer la répartition selon le nombre de focus
  let focusPercentage: number;
  let otherPercentage: number;

  if (focus.length === 1) {
    focusPercentage = 70;
    otherPercentage = 30;
  } else if (focus.length === 2) {
    focusPercentage = 30; // 30% chacun = 60% total
    otherPercentage = 40;
  } else if (focus.length === 3) {
    focusPercentage = 20; // 20% chacun = 60% total
    otherPercentage = 40;
  } else if (focus.length === 4) {
    focusPercentage = 15; // 15% chacun = 60% total
    otherPercentage = 40;
  } else if (focus.length >= 5) {
    focusPercentage = 12; // 12% chacun = 60% total
    otherPercentage = 40;
      } else {
    focusPercentage = 50;
    otherPercentage = 50;
  }

  // Calculer le nombre d'exercices pour chaque catégorie
  const totalExercises = Math.min(exercises.length, 20); // Limite à 20 exercices max
  const focusCount = Math.floor(totalExercises * focusPercentage / 100);
  const otherCount = totalExercises - focusCount;

  // Sélectionner les exercices focus (priorité aux exercices composés)
  const selectedFocus = focusExercises
    .sort((a, b) => {
      // Priorité aux exercices composés
      if (a.type === 'Compound' && b.type !== 'Compound') return -1;
      if (a.type !== 'Compound' && b.type === 'Compound') return 1;
      return 0;
    })
    .slice(0, focusCount);

  // Sélectionner les autres exercices
  const selectedOther = otherExercises
    .sort((a, b) => {
      if (a.type === 'Compound' && b.type !== 'Compound') return -1;
      if (a.type !== 'Compound' && b.type === 'Compound') return 1;
      return 0;
    })
    .slice(0, otherCount);

  console.log(`🎯 Répartition des exercices: ${focusCount} focus (${focusPercentage}%) + ${otherCount} autres (${otherPercentage}%)`);
  console.log(`📊 Focus sélectionnés: ${selectedFocus.map(e => e.nom).join(', ')}`);
  console.log(`📊 Autres sélectionnés: ${selectedOther.map(e => e.nom).join(', ')}`);

  return [...selectedFocus, ...selectedOther];
};

// Fonction pour sélectionner les exercices pour une séance
function selectExercisesForDay(
  day: string, 
  focusAreas: string[], 
  sportClass: string, 
  level: string,
  phase: string
): Exercise[] {
  const selectedExercises: Exercise[] = [];
  
  // Nombre d'exercices selon la phase et le niveau
  let targetExercises = 0;
  if (phase === 'adaptation') {
    targetExercises = level === 'debutant' ? 4 : level === 'intermediaire' ? 5 : 6;
  } else if (phase === 'progression') {
    targetExercises = level === 'debutant' ? 5 : level === 'intermediaire' ? 6 : 7;
  } else { // specialisation
    targetExercises = level === 'debutant' ? 6 : level === 'intermediaire' ? 7 : 8;
  }

  // 1. Exercices principaux selon la classe
  const mainExercises = getMainExercisesForClass(sportClass, day);
  selectedExercises.push(...mainExercises);

  // 2. Exercices de focus (70% si 1 focus, 30% chacun si 2, etc.)
  const focusExercises = getFocusExercises(focusAreas, day, sportClass);
  selectedExercises.push(...focusExercises);

  // 3. Exercices complémentaires pour atteindre le nombre cible
  const remaining = targetExercises - selectedExercises.length;
  if (remaining > 0) {
    const complementaryExercises = getComplementaryExercises(day, sportClass, remaining);
    selectedExercises.push(...complementaryExercises);
  }

  // 4. Exercices de finition (cardio, étirements, etc.)
  const finishingExercises = getFinishingExercises(sportClass, phase);
  selectedExercises.push(...finishingExercises);

  return selectedExercises.slice(0, targetExercises + 2); // +2 pour les exercices de finition
}

// Fonction pour obtenir les exercices principaux selon la classe
function getMainExercisesForClass(sportClass: string, day: string): Exercise[] {
  const mainExercises: Exercise[] = [];
  
  if (sportClass === 'power') {
    // Système 5-3-1 : 1 exercice principal par séance
    if (day === 'Lundi') {
      mainExercises.push(exercicesDatabase.find(ex => ex.nom === 'Squat')!);
    } else if (day === 'Mercredi') {
      mainExercises.push(exercicesDatabase.find(ex => ex.nom === 'Développé Couché')!);
    } else if (day === 'Vendredi') {
      mainExercises.push(exercicesDatabase.find(ex => ex.nom === 'Soulevé de Terre')!);
    }
  } else if (sportClass === 'crossfit') {
    // Crossfit : 1 exercice métabolique + 1 exercice de force
    if (day === 'Lundi' || day === 'Mercredi' || day === 'Vendredi') {
      mainExercises.push(exercicesDatabase.find(ex => ex.nom === 'Burpees')!);
      mainExercises.push(exercicesDatabase.find(ex => ex.nom === 'Squat')!);
    }
  } else if (sportClass === 'marathon') {
    // Marathon : 1 exercice cardio principal
    if (day === 'Lundi' || day === 'Mercredi' || day === 'Vendredi') {
      mainExercises.push(exercicesDatabase.find(ex => ex.nom === 'Course à Pied')!);
    }
  } else {
    // Classique : 2 exercices principaux
    if (day === 'Lundi' || day === 'Mercredi' || day === 'Vendredi') {
      mainExercises.push(exercicesDatabase.find(ex => ex.nom === 'Squat')!);
      mainExercises.push(exercicesDatabase.find(ex => ex.nom === 'Développé Couché')!);
    }
  }
  
  return mainExercises;
}

// Fonction pour obtenir les exercices de focus
function getFocusExercises(focusAreas: string[], day: string, sportClass: string): Exercise[] {
  const focusExercises: Exercise[] = [];
  
  if (focusAreas.length === 0) return focusExercises;
  
  // Répartition selon le nombre de focus
  const focusCount = focusAreas.length;
  let exercisesPerFocus = 0;
  
  if (focusCount === 1) {
    exercisesPerFocus = 2; // 70% du programme
  } else if (focusCount === 2) {
    exercisesPerFocus = 1; // 30% chacun
  } else if (focusCount === 3) {
    exercisesPerFocus = 1; // 30% chacun
  } else {
    exercisesPerFocus = 1; // 25% chacun
  }
  
  // Sélectionner les exercices selon les focus
  focusAreas.forEach(focus => {
    let exercises = exercicesDatabase.filter(ex => 
      ex.muscles.includes(focus) || ex.categorie === focus
    );
    
    // Filtrer selon la classe de sport pour éviter les exercices inappropriés
    if (sportClass === 'power' || sportClass === 'powerlifting') {
      // Powerlifting : uniquement exercices avec charges
      exercises = exercises.filter(ex => 
        !ex.equipement.includes('Aucun') && 
        !ex.nom.toLowerCase().includes('pull') &&
        !ex.nom.toLowerCase().includes('dip') &&
        !ex.nom.toLowerCase().includes('front lever') &&
        !ex.nom.toLowerCase().includes('handstand') &&
        !ex.nom.toLowerCase().includes('muscle up')
      );
    } else if (sportClass === 'marathon' || sportClass === 'endurance') {
      // Marathon : uniquement exercices d'endurance/cardio
      exercises = exercises.filter(ex => 
        ex.categorie === 'Endurance' || 
        ex.type === 'Cardio' ||
        ex.id === 'running' ||
        ex.id === 'burpees'
      );
    } else if (sportClass === 'calisthenics' || sportClass === 'streetlifting') {
      // Calisthenics : uniquement exercices au poids du corps + barres
      exercises = exercises.filter(ex => 
        ex.categorie === 'Calisthenics' ||
        ex.equipement.includes('Aucun') ||
        ex.equipement.includes('Barre de traction') ||
        ex.equipement.includes('Barre') ||
        ex.nom.toLowerCase().includes('pull') ||
        ex.nom.toLowerCase().includes('dip') ||
        ex.nom.toLowerCase().includes('front lever') ||
        ex.nom.toLowerCase().includes('handstand') ||
        ex.nom.toLowerCase().includes('muscle up')
      );
    }
    
    if (exercises.length > 0) {
      const selected = exercises.slice(0, exercisesPerFocus);
      focusExercises.push(...selected);
    }
  });
  
  return focusExercises;
}

// Fonction pour obtenir les exercices complémentaires
function getComplementaryExercises(day: string, sportClass: string, count: number): Exercise[] {
  const complementaryExercises: Exercise[] = [];
  
  // Exercices complémentaires selon la classe
  if (sportClass === 'power') {
    // Powerlifting : exercices d'assistance avec charges uniquement
    const complementary = [
      'Fentes lestées', 'Presse à Jambes', 'Rowing barre', 'Extensions triceps', 'Curls biceps'
    ];
    complementary.forEach(name => {
      const exercise = exercicesDatabase.find(ex => ex.nom === name);
      if (exercise && !exercise.equipement.includes('Aucun')) {
        complementaryExercises.push(exercise);
      }
    });
  } else if (sportClass === 'crossfit') {
    // Crossfit : exercices fonctionnels mais sans calisthenics avancés
    const complementary = [
      'Mountain Climbers', 'Jumping Jacks', 'Planche', 'Pompes', 'Burpees'
    ];
    complementary.forEach(name => {
      const exercise = exercicesDatabase.find(ex => ex.nom === name);
      if (exercise && 
          !exercise.nom.toLowerCase().includes('front lever') &&
          !exercise.nom.toLowerCase().includes('handstand') &&
          !exercise.nom.toLowerCase().includes('muscle up')) {
        complementaryExercises.push(exercise);
      }
    });
  } else if (sportClass === 'marathon') {
    const complementary = [
      'Squat', 'Fentes', 'Planche', 'Gainage', 'Course à Pied'
    ];
    complementary.forEach(name => {
      const exercise = exercicesDatabase.find(ex => ex.nom === name);
      if (exercise) complementaryExercises.push(exercise);
    });
  } else if (sportClass === 'calisthenics' || sportClass === 'streetlifting') {
    // Calisthenics : exercices au poids du corps uniquement
    const complementary = [
      'Pompes', 'Tractions', 'Dips', 'Muscle-Ups', 'Front Lever', 'Handstand Push-Ups'
    ];
    complementary.forEach(name => {
      const exercise = exercicesDatabase.find(ex => ex.nom === name);
      if (exercise && (exercise.equipement.includes('Aucun') || exercise.equipement.includes('Barre'))) {
        complementaryExercises.push(exercise);
      }
    });
  } else {
    // Classique : exercices variés mais sans calisthenics pur
    const complementary = [
      'Fentes', 'Rowing barre', 'Presse à Jambes', 'Extensions triceps', 'Curls biceps'
    ];
    complementary.forEach(name => {
      const exercise = exercicesDatabase.find(ex => ex.nom === name);
      if (exercise && !exercise.equipement.includes('Aucun')) {
        complementaryExercises.push(exercise);
      }
    });
  }
  
  return complementaryExercises.slice(0, count);
}

// Fonction pour obtenir les exercices de finition
function getFinishingExercises(sportClass: string, phase: string): Exercise[] {
  const finishingExercises: Exercise[] = [];
  
  if (sportClass === 'power') {
    // Powerlifting : étirements et récupération
    finishingExercises.push(exercicesDatabase.find(ex => ex.nom === 'Étirements')!);
  } else if (sportClass === 'crossfit') {
    // Crossfit : cardio léger
    finishingExercises.push(exercicesDatabase.find(ex => ex.nom === 'Course à Pied')!);
  } else if (sportClass === 'marathon') {
    // Marathon : étirements et récupération
    finishingExercises.push(exercicesDatabase.find(ex => ex.nom === 'Étirements')!);
  } else {
    // Classique : étirements
    finishingExercises.push(exercicesDatabase.find(ex => ex.nom === 'Étirements')!);
  }
  
  return finishingExercises;
}

// Fonction d'application de la progression
export const applyProgression = (exercise: Exercise, phase: string, level: string): Exercise => {
  const progression = { ...exercise.progression };
  
  // Correction des poids pour les exercices au poids du corps
  const isBodyweightExercise = exercise.equipement.includes('Aucun') || 
                              exercise.nom.toLowerCase().includes('pull') ||
                              exercise.nom.toLowerCase().includes('dip') ||
                              exercise.nom.toLowerCase().includes('front lever') ||
                              exercise.nom.toLowerCase().includes('handstand') ||
                              exercise.nom.toLowerCase().includes('muscle up');
  
  switch (phase) {
    case 'adaptation':
      progression.sets = Math.max(2, progression.sets - 1);
      progression.repos = '2-3 min';
      if (isBodyweightExercise) {
        progression.poids = 'Corps';
      }
      break;
    case 'progression':
      progression.sets = progression.sets + 1;
      progression.repos = '2-4 min';
      if (isBodyweightExercise) {
        progression.poids = 'Corps + lest';
      }
      break;
    case 'specialisation':
      progression.sets = progression.sets + 2;
      progression.repos = '3-5 min';
      if (isBodyweightExercise) {
        progression.poids = 'Corps + lest lourd';
      }
      break;
  }
    
    return {
    ...exercise,
    progression
  };
};

// Fonction principale de génération de programme - AMÉLIORÉE
// Donne un id STABLE et UNIQUE à chaque exercice d'une séance (index dans la séance), au lieu de
// retomber sur exercise.nom comme c'était le cas partout en aval (ExerciseContext/Programme.tsx font
// `exercise.id || exercise.nom`). Sans ça, les 3 séries de travail d'un même mouvement partagent
// TOUTES le même nom ("Squat" x3) donc le même id : valider "Raté" sur une seule série marquait les
// 3 comme ratées d'un coup (même chose pour les paliers d'échauffement).
function assignExerciseIds(sessionId: string, exercises: any[]): any[] {
  return exercises.map((ex, idx) => ({ ...ex, id: ex.id || `${sessionId}-ex${idx}` }));
}

// Appliqué une seule fois ici, sur le résultat final, pour couvrir tous les sports sans dupliquer
// la logique dans chaque générateur.
function withUniqueExerciseIds(programme: Programme): Programme {
  programme.sessions?.forEach((session: any) => {
    if (!Array.isArray(session.exercises)) return;
    session.exercises = assignExerciseIds(session.id, session.exercises);
  });
  return programme;
}

export const generateProgramme = (user: UserProfile): Programme => {
  console.log('=== GENERATE PROGRAMME ===');
  console.log('User sportClass:', user.sportClass);

  let programme: Programme;

  if (user.sportClass === 'sprint') {
    console.log('✅ Génération programme sprint');
    programme = generateSprintProgramme(user);
  } else if (user.sportClass === 'power' || user.sportClass === 'powerlifter') {
    console.log('✅ Génération programme powerlifting');
    programme = generatePowerliftingProgramme(user); // Utiliser la fonction spécifique powerlifting
  } else if (user.sportClass === 'streetlifting') {
    console.log('✅ Génération programme street lifting');
    programme = generateStreetLiftingProgramme(user);
  } else if (user.sportClass === 'calisthenics') {
    console.log('✅ Génération programme calisthenics');
    programme = generateCalisthenicsProgramme(user);
  } else if (user.sportClass === 'marathon' || user.sportClass === 'runner') {
    console.log('✅ Génération programme marathon');
    programme = generateMarathonProgramme(user);
  } else if (user.sportClass === 'classique' || user.sportClass === 'allround') {
    console.log('✅ Génération programme musculation classique');
    programme = generateMusculationClassiqueProgramme(user);
  } else if (user.sportClass === 'crossfit') {
    console.log('✅ Génération programme crossfit');
    programme = generateCrossfitProgramme(user);
  } else {
    console.log('❌ Classe non supportée:', user.sportClass);
    programme = generateMusculationClassiqueProgramme(user); // Par défaut
  }

  return withUniqueExerciseIds(programme);
};

// Nouvelle fonction pour le sprint
function generateSprintProgramme(user: UserProfile): Programme {
  console.log('=== GENERATE SPRINT PROGRAMME ===');
  console.log('User:', user);
  
  const sessions = [];
  const seancesParSemaine = user.trainingDays?.length || 4;
  const duree = 4;
  const trainingDays = user.trainingDays || ['lundi', 'mercredi', 'vendredi', 'dimanche'];
  
  for (let semaine = 1; semaine <= duree; semaine++) {
    for (let jour = 0; jour < trainingDays.length; jour++) {
      const session = createSprintSession(semaine, jour + 1, user, trainingDays[jour]);
      sessions.push(session);
      console.log(`Session créée: ${semaine}-${jour + 1} (${trainingDays[jour]})`);
    }
  }
  
  const programme: Programme = {
    id: Date.now().toString(),
    nom: `Programme Sprint - ${user.niveau || 'intermediaire'}`,
    description: 'Programme d\'entraînement sprint avec progression sur 4 semaines',
    duree,
    sessions,
    phases: {
      adaptation: [],
      progression: [],
      specialisation: []
    },
    progression: {
      totalSessions: sessions.length,
      sessionsParSemaine: seancesParSemaine,
      dureeMoyenne: sessions.reduce((acc, s) => acc + s.duration, 0) / sessions.length
    }
  };
  
  console.log('Programme sprint final:', programme);
  console.log('Nombre de sessions:', programme.sessions.length);
  
  return programme;
}

function createSprintSession(semaine: number, jour: number, user: UserProfile, dayName?: string) {
  const estDeload = semaine === 4;
  
  // Calculer le mois et la semaine dans le mois
  const mois = Math.ceil(semaine / 4);
  const semaineDansMois = ((semaine - 1) % 4) + 1;
  
  // Progression mensuelle : +5kg pour les exercices avec charges, +2.5kg pour les accessoires
  const progressionMensuelle = (mois - 1) * 5; // +5kg par mois pour les exercices principaux
  const progressionAccessoires = (mois - 1) * 2.5; // +2.5kg par mois pour les accessoires
  
  console.log(`🏃 Mois ${mois}, Semaine ${semaineDansMois} - Progression Sprint: +${progressionMensuelle}kg (principaux), +${progressionAccessoires}kg (accessoires)`);
  
  let exercices = [];
  
  if (jour === 1) {
    // Séance vitesse max
    exercices = [
      { nom: 'Sprints 30m', series: estDeload ? 4 : 6, reps: 1, poids: 0, repos: 120 },
      { nom: 'Sprints 60m', series: estDeload ? 3 : 4, reps: 1, poids: 0, repos: 180 },
      { nom: 'Box jumps', series: estDeload ? 3 : 4, reps: 8, poids: 0, repos: 90 }
    ];
  } else if (jour === 2) {
    // Séance force
    exercices = [
      { nom: 'Back Squat', series: estDeload ? 3 : 5, reps: 5, poids: Math.round((user.weight * 0.8) + progressionMensuelle), repos: 180 },
      { nom: 'Power Clean', series: estDeload ? 3 : 4, reps: 3, poids: Math.round((user.weight * 0.6) + progressionMensuelle), repos: 180 },
      { nom: 'Hip Thrust', series: estDeload ? 3 : 4, reps: 8, poids: Math.round((user.weight * 0.5) + progressionAccessoires), repos: 90 }
    ];
  } else if (jour === 3) {
    // Séance endurance vitesse
    exercices = [
      { nom: 'Sprints 150m', series: estDeload ? 4 : 6, reps: 1, poids: 0, repos: 180 },
      { nom: 'Sprints 400m', series: estDeload ? 2 : 4, reps: 1, poids: 0, repos: 300 },
      { nom: 'Bounding', series: estDeload ? 3 : 4, reps: 20, poids: 0, repos: 90 }
    ];
  } else {
    // Séance technique/accessoires
    exercices = [
      { nom: 'Drills A/B/C', series: 3, reps: 10, poids: 0, repos: 60 },
      { nom: 'Core anti-rotation', series: 3, reps: 12, poids: 0, repos: 60 },
      { nom: 'Nordic hamstring', series: 3, reps: 8, poids: 0, repos: 90 }
    ];
  }
  
  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`}`,
    day: dayName || `Jour ${jour}`,
    exercises: exercices.map(ex => ({
      ...ex,
      progression: {
        sets: 1,
        reps: ex.reps,
        poids: ex.poids,
        repos: ex.repos
      }
    })),
    duration: exercices.length * 15,
    intensity: 'Élevée', // Sprint est généralement plus intense
    phase: 'Progression', // Sprint est généralement dans la phase de progression
    focus: [], // Sprint n'a pas de focus spécifique
    notes: estDeload ? 'Semaine de récupération' : '',
    equipment: []
  };
}

// Nouvelle fonction pour le Powerlifting
// Le mouvement principal qu'un jour logique représente normalement (avant remplacement éventuel
// par une séance TEST) — même correspondance que dans createPowerliftingSession.
function mainLiftForLogicalDay(logicalJour: number): MainLift {
  if (logicalJour === 2 || logicalJour === 4) return 'bench';
  if (logicalJour === 3) return 'deadlift';
  return 'squat';
}

const MAIN_LIFT_NOM: Record<MainLift, string> = { squat: 'Squat', bench: 'Développé Couché', deadlift: 'Soulevé de Terre' };

// Ratios poids de corps prudents pour estimer un point de départ de rampe SANS aucune perf connue —
// juste un point d'ancrage pour l'échauffement, pas une prédiction de charge réelle (d'où le message
// dans les conseils invitant à ajuster selon le ressenti).
const NOVICE_TEST_RATIOS: Record<MainLift, { male: number; female: number }> = {
  squat: { male: 0.5, female: 0.4 },
  bench: { male: 0.4, female: 0.25 },
  deadlift: { male: 0.75, female: 0.6 },
};

// Séance TEST — pour un mouvement dont on ne connaît aucune vraie perf : au lieu de faire tourner
// tout un programme sur un max inventé, on fait d'abord monter progressivement jusqu'à un top set de
// 3-5 répétitions difficile mais propre, à enregistrer ensuite comme performance réelle. Le poids de
// départ n'est qu'une estimation prudente basée sur le poids de corps, pas une vraie prescription %1RM.
function createMaxTestSession(
  semaine: number,
  jour: number,
  lift: MainLift,
  bodyweight: number,
  sex: string,
  dayName?: string
) {
  const nomPrincipal = MAIN_LIFT_NOM[lift];
  const ratio = NOVICE_TEST_RATIOS[lift][sex === 'female' ? 'female' : 'male'];
  const estimatedTop = roundToPlates(bodyweight * ratio);

  const ramp: WarmupStep[] = [{ pct: 0.4, reps: 8 }, { pct: 0.6, reps: 5 }, { pct: 0.8, reps: 3 }];
  const warmup = buildWarmupSets(nomPrincipal, estimatedTop, ramp);

  const testSet = {
    nom: `${nomPrincipal} (test — trouvez votre charge de référence)`,
    type: 'travail',
    series: 1,
    reps: '3-5',
    poids: estimatedTop,
    pourcentage: 0,
    repos: '3-4 min',
  };

  const exercices = [...warmup, testSet];

  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`} (TEST)`,
    day: dayName || `Jour ${jour}`,
    phase: 'Adaptation',
    intensity: 'Modérée',
    duration: exercices.length * 10,
    exercises: exercices,
    notes: `Séance TEST — vous n'avez pas encore de ${nomPrincipal.toLowerCase()} enregistré. Montez progressivement (le poids affiché n'est qu'une estimation de départ) et arrêtez-vous sur un set de 3 à 5 répétitions difficile mais techniquement propre — pas la peine de chercher un vrai max aujourd'hui. Enregistrez ensuite ce poids dans vos performances : le programme se recalibrera automatiquement dessus.`,
    equipment: ['Barre', 'Disques', 'Rack']
  };
}

function generatePowerliftingProgramme(user: UserProfile): Programme {
  const seancesParSemaine = user.trainingDays?.length || 3;
  // 2 cycles de 4 semaines générés d'un coup : la progression entre cycles (cf. cycleBump dans
  // createPowerliftingSession) est ainsi visible dans UN seul programme généré, sans avoir besoin
  // de regénérer pour "voir" le cycle suivant.
  const duree = 8;
  const trainingDays = user.trainingDays || ['lundi', 'mercredi', 'vendredi'];
  const bodyweight = user.weight || 75;
  const sex = user.sex || 'male';

  const { maxSquat, maxBench, maxDeadlift, hasRealMax } = getUserSBDMaxes();

  const level = assessPowerliftingLevel(bodyweight, sex, maxSquat, maxBench, maxDeadlift);
  const weakestLift = findWeakestLift(bodyweight, sex, maxSquat, maxBench, maxDeadlift);
  const hauteFrequence = trainingDays.length >= 4;

  const sessions = [];
  // Créneau spécial de la semaine (combo SBD, puis PR) : le jour qui bascule normalement pour
  // espacer les séances bench (jour 4 en haute fréquence, jour 3 sinon).
  const specialJour = hauteFrequence ? 4 : 3;

  for (let semaine = 1; semaine <= duree; semaine++) {
    // Position dans le cycle de 4 semaines (1-4, se répète à chaque cycle) : le placement des
    // séances spéciales est calé sur cette position relative, pas sur le numéro de semaine absolu,
    // pour se répéter identiquement à chaque cycle plutôt que de n'apparaître que dans le premier.
    const semaineDansCycle = ((semaine - 1) % 4) + 1;
    const cycle = Math.ceil(semaine / 4);
    const { rmSquat, rmBench, rmDeadlift } = computeCycleMaxes(cycle, level, maxSquat, maxBench, maxDeadlift);

    for (let jour = 0; jour < trainingDays.length; jour++) {
      // Échange jour 2 et jour 4 AU NIVEAU CONTENU (pour espacer les 2 séances bench) — uniquement
      // pertinent sur une semaine à 4 séances ; sur 3 séances ou moins ça priverait l'utilisateur
      // de sa séance bench principale (jour 2) au profit du seul jour technique (jour 4).
      const logicalJour = trainingDays.length === 4
        ? ((jour + 1 === 2) ? 4 : (jour + 1 === 4 ? 2 : jour + 1))
        : jour + 1;

      let session;
      const dayMainLift = mainLiftForLogicalDay(logicalJour);

      if (semaine === 1 && !hasRealMax[dayMainLift]) {
        // Pas de vraie perf connue sur ce mouvement : priorité absolue à la séance TEST, avant
        // même les créneaux spéciaux (pas de PR/SBD sur un max qu'on n'a jamais mesuré).
        session = createMaxTestSession(semaine, logicalJour, dayMainLift, bodyweight, sex, trainingDays[jour]);
      } else if (logicalJour === specialJour && semaineDansCycle === 3) {
        // Combo SBD sous-maximal (simulation) : UNE SEULE fois par cycle, juste avant le deload.
        session = createSBDComboSession(semaine, logicalJour, user, maxSquat, maxBench, maxDeadlift, level, trainingDays[jour]);
      } else if (logicalJour === specialJour && semaineDansCycle === 2) {
        // Créneau PR : fréquence et format selon le niveau — un débutant a plus de chances de
        // décrocher un vrai record souvent, donc PR SBD complet ; les autres niveaux, un PR simple
        // sur le mouvement que ce jour représente normalement (bench en haute fréquence, deadlift sinon).
        if (level === 'debutant') {
          session = createPRSBDSession(semaine, logicalJour, rmSquat, rmBench, rmDeadlift, level, trainingDays[jour]);
        } else {
          const prLift: MainLift = hauteFrequence ? 'bench' : 'deadlift';
          const prRm = prLift === 'bench' ? rmBench : rmDeadlift;
          const prNom = prLift === 'bench' ? 'Développé Couché' : 'Soulevé de Terre';
          session = createPRSession(semaine, logicalJour, prRm, level, prLift, prNom, trainingDays[jour]);
        }
      } else if (level === 'debutant' && semaineDansCycle === 1 && (() => {
        const liftRotation: MainLift[] = ['squat', 'bench', 'deadlift'];
        const targetLift = liftRotation[(cycle - 1) % 3];
        const targetJour = targetLift === 'squat' ? 1 : targetLift === 'bench' ? 2 : 3;
        return logicalJour === targetJour;
      })()) {
        // Débutant seulement : un 2e créneau PR en semaine 1, sur un mouvement qui change à chaque
        // cycle (squat puis bench puis deadlift) pour ne pas toujours tester le même.
        const liftRotation: MainLift[] = ['squat', 'bench', 'deadlift'];
        const targetLift = liftRotation[(cycle - 1) % 3];
        const targetRm = targetLift === 'squat' ? rmSquat : targetLift === 'bench' ? rmBench : rmDeadlift;
        const targetNom = targetLift === 'squat' ? 'Squat' : targetLift === 'bench' ? 'Développé Couché' : 'Soulevé de Terre';
        session = createPRSession(semaine, logicalJour, targetRm, level, targetLift, targetNom, trainingDays[jour]);
      } else {
        session = createPowerliftingSession(semaine, logicalJour, user, maxSquat, maxBench, maxDeadlift, level, weakestLift, trainingDays[jour]);
      }

      sessions.push(session);
    }
  }

  const levelLabel = level === 'debutant' ? 'Débutant' : level === 'intermediaire' ? 'Intermédiaire' : 'Avancé';
  const weakLabel = weakestLift === 'squat' ? 'squat' : weakestLift === 'bench' ? 'développé couché' : 'soulevé de terre';

  const programme: Programme = {
    id: Date.now().toString(),
    nom: `Programme Powerlifting - Niveau ${levelLabel}`,
    description: `Basé sur vos 1RM réels (Squat ${maxSquat}kg / Bench ${maxBench}kg / Deadlift ${maxDeadlift}kg) et votre poids de corps (${bodyweight}kg). Échauffement progressif avant chaque mouvement principal, vague de charge ${level === 'debutant' ? 'linéaire' : level === 'avance' ? "d'intensification" : '5/3/1'}, accessoires ciblés sur votre point faible estimé (${weakLabel}), une séance SBD combinée une fois par cycle (semaine 3, avant le deload), et ${level === 'debutant' ? '2 créneaux PR par cycle (un simple, un complet en SBD)' : '1 créneau PR par cycle'} pour tester de vrais records.`,
    duree,
    sessions,
    phases: { adaptation: [], progression: [], specialisation: [] },
    progression: { totalSessions: sessions.length, sessionsParSemaine: seancesParSemaine, dureeMoyenne: 75 }
  };

  return programme;
}

// Récupère les 1RM réels de l'utilisateur depuis le stockage local (valeurs par défaut prudentes
// sinon) — et signale, par mouvement, si cette valeur est une VRAIE perf enregistrée ou juste le
// défaut de secours, pour pouvoir déclencher une séance TEST plutôt que de faire tourner tout un
// programme sur des maxs inventés.
function getUserSBDMaxes(): {
  maxSquat: number; maxBench: number; maxDeadlift: number;
  hasRealMax: Record<MainLift, boolean>;
} {
  let maxSquat = 100;
  let maxBench = 70;
  let maxDeadlift = 120;
  const hasRealMax: Record<MainLift, boolean> = { squat: false, bench: false, deadlift: false };

  const savedPerformances = localStorage.getItem('userPerformances');
  if (!savedPerformances) return { maxSquat, maxBench, maxDeadlift, hasRealMax };

  try {
    const performancesList = JSON.parse(savedPerformances);

    const squatPerformances = performancesList.filter((p: any) => p.discipline?.toLowerCase().includes('squat'));
    const benchPerformances = performancesList.filter((p: any) =>
      p.discipline?.toLowerCase().includes('bench') ||
      p.discipline?.toLowerCase().includes('développé') ||
      p.discipline?.toLowerCase().includes('couché')
    );
    const deadliftPerformances = performancesList.filter((p: any) =>
      p.discipline?.toLowerCase().includes('deadlift') ||
      p.discipline?.toLowerCase().includes('soulevé') ||
      p.discipline?.toLowerCase().includes('terre')
    );

    if (squatPerformances.length > 0) { maxSquat = Math.max(...squatPerformances.map((p: any) => p.value || 0)); hasRealMax.squat = true; }
    if (benchPerformances.length > 0) { maxBench = Math.max(...benchPerformances.map((p: any) => p.value || 0)); hasRealMax.bench = true; }
    if (deadliftPerformances.length > 0) { maxDeadlift = Math.max(...deadliftPerformances.map((p: any) => p.value || 0)); hasRealMax.deadlift = true; }
  } catch (error) {
    console.error('Erreur lors du chargement des performances:', error);
  }

  return { maxSquat, maxBench, maxDeadlift, hasRealMax };
}

type PowerliftingLevel = 'debutant' | 'intermediaire' | 'avance';
type MainLift = 'squat' | 'bench' | 'deadlift';

// Niveau estimé à partir des IPF GL Points (référence officielle IPF, cf. src/utils/statsCalculator.ts)
// calculés sur le total SBD réel et le poids de corps — pas juste un champ "niveau" déclaratif.
function assessPowerliftingLevel(weight: number, sex: string, squat: number, bench: number, deadlift: number): PowerliftingLevel {
  const total = squat + bench + deadlift;
  const glPoints = calculateIPFGLPoints(weight, total, sex === 'male');
  if (glPoints < 40) return 'debutant';
  if (glPoints < 70) return 'intermediaire';
  return 'avance';
}

// Progression entre cycles calibrée par niveau : un débutant progresse naturellement plus vite
// qu'un lifter avancé — on ne peut pas ajouter les mêmes kg à tout le monde indéfiniment.
// Partagé par tous les types de séance (normale, SBD, PR) pour ne calculer ça qu'à un seul endroit.
function computeCycleMaxes(cycle: number, level: PowerliftingLevel, maxSquat: number, maxBench: number, maxDeadlift: number) {
  const cycleBump = level === 'debutant' ? 5 : level === 'intermediaire' ? 2.5 : 1.25;
  return {
    rmSquat: Math.round(maxSquat + (cycle - 1) * cycleBump * 2),
    rmBench: Math.round(maxBench + (cycle - 1) * cycleBump),
    rmDeadlift: Math.round(maxDeadlift + (cycle - 1) * cycleBump * 2),
  };
}

// Standards approximatifs (x poids de corps) pour un lifter raw intermédiaire — sert uniquement à
// repérer lequel des 3 mouvements est proportionnellement en retard par rapport aux 2 autres et au
// poids de corps de l'utilisateur (et pas juste en valeur absolue).
const BODYWEIGHT_STANDARDS = {
  male: { squat: 1.5, bench: 1.0, deadlift: 1.8 },
  female: { squat: 1.2, bench: 0.6, deadlift: 1.5 },
};

function findWeakestLift(weight: number, sex: string, squat: number, bench: number, deadlift: number): MainLift {
  const standards = sex === 'male' ? BODYWEIGHT_STANDARDS.male : BODYWEIGHT_STANDARDS.female;
  const ratios: Record<MainLift, number> = {
    squat: (squat / weight) / standards.squat,
    bench: (bench / weight) / standards.bench,
    deadlift: (deadlift / weight) / standards.deadlift,
  };

  let weakest: MainLift = 'squat';
  let lowest = ratios.squat;
  (['bench', 'deadlift'] as MainLift[]).forEach((lift) => {
    if (ratios[lift] < lowest) {
      lowest = ratios[lift];
      weakest = lift;
    }
  });
  return weakest;
}

// Arrondit au multiple de 2.5kg le plus proche (charges réalistes avec des disques standards)
const roundToPlates = (weight: number) => Math.max(20, Math.round(weight / 2.5) * 2.5);

// Le % affiché doit refléter le poids RÉELLEMENT prescrit (après arrondi aux disques), pas le ratio
// théorique visé avant arrondi — sinon on affiche "70%" pour une charge qui vaut en réalité 68% ou
// 72% du max une fois arrondie à 2.5kg près.
const pctOf = (poids: number, reference: number) => (reference > 0 ? Math.round((poids / reference) * 100) : 0);

interface WarmupStep { pct: number; reps: number; }

// Rampes d'échauffement calibrées par mouvement : le squat demande la rampe la plus longue
// (amplitude/mobilité/gainage à régler), le développé couché une rampe plus courte, et le soulevé
// de terre démarre plus lourd d'entrée (peu utile de tirer très léger à la barre).
const WARMUP_RAMPS: Record<MainLift, WarmupStep[]> = {
  squat: [{ pct: 0.4, reps: 8 }, { pct: 0.55, reps: 5 }, { pct: 0.7, reps: 3 }, { pct: 0.85, reps: 1 }],
  bench: [{ pct: 0.5, reps: 5 }, { pct: 0.7, reps: 3 }, { pct: 0.85, reps: 1 }],
  deadlift: [{ pct: 0.5, reps: 5 }, { pct: 0.75, reps: 2 }],
};

function buildWarmupSets(nom: string, topWeight: number, ramp: WarmupStep[]) {
  return ramp.map((step) => {
    const poids = roundToPlates(topWeight * step.pct);
    return {
      nom: `${nom} (échauffement)`,
      type: 'echauffement',
      series: 1,
      reps: step.reps,
      poids,
      pourcentage: pctOf(poids, topWeight),
      repos: '60-90s',
    };
  });
}

type BlockType = 'intensite' | 'volume';

// Un cycle sur deux bascule en bloc "volume" (plus de reps, %1RM plus modéré, pas de singles) au
// lieu de rejouer indéfiniment la même vague d'intensification — sans ça, le lifter ne voit jamais
// de vrai travail de volume dans le programme.
const getBlockType = (cycle: number): BlockType => (cycle % 2 === 1 ? 'intensite' : 'volume');

// Schéma séries/reps/%1RM par niveau, semaine du cycle et type de bloc — vague progressive façon
// 5/3/1 pour l'intermédiaire en bloc intensité (adoucie pour le débutant, resserrée et plus intense
// pour l'avancé façon pic de compétition), et un vrai bloc volume (plus de reps, %1RM modéré,
// jamais de singles) sur les cycles pairs pour varier le stimulus d'un cycle à l'autre.
function getWaveScheme(
  level: PowerliftingLevel,
  semaineDansCycle: number,
  estDeload: boolean,
  blockType: BlockType = 'intensite'
): Array<{ reps: number | string; pct: number }> {
  if (estDeload) {
    return level === 'avance'
      ? [{ reps: 5, pct: 0.55 }, { reps: 5, pct: 0.6 }]
      : [{ reps: 5, pct: 0.5 }, { reps: 5, pct: 0.55 }, { reps: 5, pct: 0.6 }];
  }

  if (blockType === 'volume') {
    if (level === 'debutant') {
      const pct = [0.6, 0.63, 0.66][semaineDansCycle - 1] ?? 0.66;
      return [{ reps: 8, pct }, { reps: 8, pct }, { reps: 8, pct }];
    }
    if (level === 'avance') {
      if (semaineDansCycle === 1) return [{ reps: 6, pct: 0.65 }, { reps: 6, pct: 0.7 }, { reps: 6, pct: 0.72 }];
      if (semaineDansCycle === 2) return [{ reps: 5, pct: 0.68 }, { reps: 5, pct: 0.73 }, { reps: 5, pct: 0.75 }];
      return [{ reps: 5, pct: 0.7 }, { reps: 5, pct: 0.75 }, { reps: '5+', pct: 0.78 }];
    }
    // Intermédiaire : volume plus haut, jamais au-delà de 80%
    if (semaineDansCycle === 1) return [{ reps: 8, pct: 0.6 }, { reps: 8, pct: 0.65 }, { reps: '8+', pct: 0.7 }];
    if (semaineDansCycle === 2) return [{ reps: 6, pct: 0.65 }, { reps: 6, pct: 0.7 }, { reps: '6+', pct: 0.75 }];
    return [{ reps: 6, pct: 0.7 }, { reps: 5, pct: 0.75 }, { reps: '5+', pct: 0.8 }];
  }

  if (level === 'debutant') {
    const pct = [0.65, 0.7, 0.75][semaineDansCycle - 1] ?? 0.75;
    return [{ reps: 5, pct }, { reps: 5, pct }, { reps: 5, pct }];
  }

  if (level === 'avance') {
    if (semaineDansCycle === 1) return [{ reps: 3, pct: 0.75 }, { reps: 3, pct: 0.82 }, { reps: 3, pct: 0.88 }];
    if (semaineDansCycle === 2) return [{ reps: 3, pct: 0.8 }, { reps: 2, pct: 0.87 }, { reps: 2, pct: 0.93 }];
    return [{ reps: 2, pct: 0.85 }, { reps: 1, pct: 0.92 }, { reps: '1+', pct: 0.97 }];
  }

  // Intermédiaire : vague 5/3/1 classique
  if (semaineDansCycle === 1) return [{ reps: 5, pct: 0.7 }, { reps: 5, pct: 0.8 }, { reps: '5+', pct: 0.9 }];
  if (semaineDansCycle === 2) return [{ reps: 3, pct: 0.75 }, { reps: 3, pct: 0.85 }, { reps: '3+', pct: 0.92 }];
  return [{ reps: 5, pct: 0.8 }, { reps: 3, pct: 0.9 }, { reps: '1+', pct: 0.95 }];
}

function buildMainLiftSets(nom: string, rm: number, scheme: Array<{ reps: number | string; pct: number }>, repos: string) {
  return scheme.map((set) => {
    const poids = roundToPlates(rm * set.pct);
    return {
      nom,
      type: 'travail',
      series: 1,
      reps: set.reps,
      poids,
      pourcentage: pctOf(poids, rm),
      repos,
    };
  });
}

type AccessoryDef = { nom: string; series: number; reps: number; poids: number; pourcentage: number; repos: string; type: string };

// Variantes de l'exercice de spécificité par mouvement — alterne d'un cycle à l'autre plutôt que de
// rejouer indéfiniment la pause : sur un programme de 2 cycles, le lifter voit les deux variantes.
const SPECIFICITY_VARIANTS: Record<MainLift, Array<{ nom: string; ratio: number; reps: number }>> = {
  squat: [
    { nom: 'Squat Pause (3ct)', ratio: 0.54, reps: 5 },
    { nom: 'Squat Tempo (3-2-1)', ratio: 0.6, reps: 5 },
  ],
  bench: [
    { nom: 'Développé Couché Pause (3ct)', ratio: 0.63, reps: 5 },
    { nom: 'Développé Couché Tempo (3-2-1)', ratio: 0.6, reps: 5 },
  ],
  deadlift: [
    { nom: 'Soulevé de Terre Déficit', ratio: 0.63, reps: 5 },
    { nom: 'Soulevé de Terre Pause (2ct)', ratio: 0.58, reps: 5 },
  ],
};

// Accessoires par mouvement principal — la liste complète est TOUJOURS présente. Le premier est
// l'exercice de spécificité compétition, dont la variante change de cycle en cycle (pause, tempo...)
// pour ne pas rejouer indéfiniment le même mouvement. Sur le jour du point faible, il prend une
// série de plus pour appuyer un peu plus fort.
function getAccessoriesForDay(
  mainLift: MainLift,
  weakestLift: MainLift,
  level: PowerliftingLevel,
  rmSquat: number,
  rmBench: number,
  rmDeadlift: number,
  bodyweight: number,
  cycle: number
) {
  const isWeakDay = mainLift === weakestLift;
  const specificitySeries = isWeakDay ? 4 : 3;
  // Un débutant n'est généralement pas encore capable de faire des tractions lestées :
  // on lui garde des tractions assistées, les niveaux au-dessus passent au lest.
  const useWeightedPullups = level !== 'debutant';
  const weightedPullupLoad = level === 'avance' ? bodyweight * 0.25 : bodyweight * 0.15;

  const rmByLift: Record<MainLift, number> = { squat: rmSquat, bench: rmBench, deadlift: rmDeadlift };

  const specificityFor = (lift: MainLift): AccessoryDef => {
    const variants = SPECIFICITY_VARIANTS[lift];
    const variant = variants[(cycle - 1) % variants.length];
    const rm = rmByLift[lift];
    const poids = roundToPlates(rm * variant.ratio);
    return {
      nom: variant.nom,
      type: 'accessoire',
      series: specificitySeries,
      reps: variant.reps,
      poids,
      pourcentage: pctOf(poids, rm),
      repos: lift === 'deadlift' ? '2-3 min' : '2 min',
    };
  };

  const withPct = (nom: string, series: number, reps: number, poids: number, rm: number, repos: string): AccessoryDef => ({
    nom,
    type: 'accessoire',
    series,
    reps,
    poids,
    pourcentage: pctOf(poids, rm),
    repos,
  });

  const pools: Record<MainLift, AccessoryDef[]> = {
    squat: [
      specificityFor('squat'),
      withPct('Fentes lestées', 3, 8, roundToPlates(rmSquat * 0.135), rmSquat, '2 min'),
      withPct('Presse à Jambes', 3, 12, roundToPlates(rmSquat * 1.08), rmSquat, '2 min'),
      withPct('Extensions de Jambes', 3, 15, roundToPlates(rmSquat * 0.36), rmSquat, '1.5 min'),
    ],
    bench: [
      specificityFor('bench'),
      withPct('Développé Prise Serrée', 3, 8, roundToPlates(rmBench * 0.585), rmBench, '2 min'),
      withPct('Développé Incliné', 3, 8, roundToPlates(rmBench * 0.54), rmBench, '2 min'),
      level === 'debutant'
        ? { nom: 'Dips', type: 'accessoire', series: 3, reps: 10, poids: 0, pourcentage: 0, repos: '1.5 min' }
        : { nom: 'Dips lestés', type: 'accessoire', series: 3, reps: 8, poids: roundToPlates(bodyweight * (level === 'avance' ? 0.35 : 0.2)), pourcentage: 0, repos: '1.5 min' },
      withPct('Extensions Triceps', 3, 15, roundToPlates(rmBench * 0.135), rmBench, '1.5 min'),
      { nom: 'Curls Biceps', type: 'accessoire', series: 3, reps: 12, poids: roundToPlates(bodyweight * 0.25), pourcentage: 0, repos: '1 min' },
    ],
    deadlift: [
      specificityFor('deadlift'),
      withPct('Soulevé de Terre Roumain', 3, 8, roundToPlates(rmDeadlift * 0.45), rmDeadlift, '2 min'),
      withPct('Rowing Barre', 3, 8, roundToPlates(rmDeadlift * 0.45), rmDeadlift, '2 min'),
      useWeightedPullups
        ? { nom: 'Tractions Lestées', type: 'accessoire', series: 3, reps: 6, poids: roundToPlates(weightedPullupLoad), pourcentage: 0, repos: '2 min' }
        : { nom: 'Tractions Assistées', type: 'accessoire', series: 3, reps: 8, poids: roundToPlates(bodyweight * 0.3), pourcentage: 0, repos: '2 min' },
      withPct('Shrugs Barre', 3, 12, roundToPlates(rmDeadlift * 0.36), rmDeadlift, '1.5 min'),
    ],
  };

  return pools[mainLift];
}

function createPowerliftingSession(
  semaine: number,
  jour: number,
  user: UserProfile,
  maxSquat: number,
  maxBench: number,
  maxDeadlift: number,
  level: PowerliftingLevel,
  weakestLift: MainLift,
  dayName?: string
) {
  const estDeload = semaine === 4;
  const semaineDansCycle = ((semaine - 1) % 4) + 1;
  const cycle = Math.ceil(semaine / 4);
  const bodyweight = user.weight || 75;

  const { rmSquat, rmBench, rmDeadlift } = computeCycleMaxes(cycle, level, maxSquat, maxBench, maxDeadlift);

  const blockType = getBlockType(cycle);
  const scheme = getWaveScheme(level, semaineDansCycle, estDeload, blockType);

  let mainLift: MainLift = 'squat';
  let rm = rmSquat;
  let nomPrincipal = 'Squat';
  let reposPrincipal = '3-4 min';

  if (jour === 2) {
    mainLift = 'bench'; rm = rmBench; nomPrincipal = 'Développé Couché'; reposPrincipal = '3 min';
  } else if (jour === 3) {
    mainLift = 'deadlift'; rm = rmDeadlift; nomPrincipal = 'Soulevé de Terre'; reposPrincipal = '3-4 min';
  } else if (jour === 4) {
    // 4e jour : développé couché technique/volume — fréquence bench plus élevée façon programmes
    // pro (ex: thepanash va jusqu'à 4 séances bench/semaine), avec l'overhead press en accessoire.
    mainLift = 'bench'; rm = rmBench; nomPrincipal = 'Développé Couché (technique)'; reposPrincipal = '2-3 min';
  }

  // La rampe d'échauffement monte vers le PREMIER set de travail (pas le dernier) : elle doit
  // toujours rester plus légère que le premier set, quelle que soit la forme de la vague ensuite.
  const firstWorkingWeight = roundToPlates(rm * scheme[0].pct);
  const warmup = buildWarmupSets(nomPrincipal, firstWorkingWeight, WARMUP_RAMPS[mainLift]);
  const mainSets = buildMainLiftSets(nomPrincipal, rm, scheme, reposPrincipal);

  let accessories = getAccessoriesForDay(mainLift, weakestLift, level, rmSquat, rmBench, rmDeadlift, bodyweight, cycle);

  if (jour === 4) {
    const rmPress = Math.round(rmBench * 0.65);
    const militairePoids = roundToPlates(rmPress * (estDeload ? 0.55 : 0.7));
    accessories = [
      { nom: 'Développé Militaire', type: 'accessoire', series: 3, reps: 6, poids: militairePoids, pourcentage: pctOf(militairePoids, rmPress), repos: '2 min' },
      ...accessories,
    ];
  }

  const exercices = [...warmup, ...mainSets, ...accessories];

  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`}`,
    day: dayName || `Jour ${jour}`,
    phase: estDeload ? 'Deload' : (semaineDansCycle === 1 ? 'Adaptation' : (semaineDansCycle === 2 ? 'Progression' : 'Spécialisation')),
    intensity: estDeload ? 'Faible' : (semaineDansCycle === 1 ? 'Modérée' : (semaineDansCycle === 2 ? 'Élevée' : 'Maximale')),
    duration: exercices.length * 10,
    exercises: exercices,
    notes: estDeload
      ? 'Semaine de récupération active : intensité réduite, gardez 3-4 répétitions en réserve sur chaque série.'
      : `Bloc ${blockType === 'volume' ? 'Volume' : 'Intensité'} (${level === 'debutant' ? 'progression linéaire' : level === 'avance' ? "d'intensification" : '5/3/1'}) — Cycle ${cycle}${mainLift === weakestLift ? ' — jour prioritaire (point faible)' : ''}`,
    equipment: ['Barre', 'Disques', 'Rack', 'Haltères']
  };
}

// Séance SBD combinée : les 3 mouvements dans la même séance, façon simulation de passage de
// compétition — intensité modérée-haute, pas d'accessoires, rampe d'échauffement raccourcie sur
// les 2ᵉ/3ᵉ mouvements (déjà chaud grâce aux précédents).
function createSBDComboSession(
  semaine: number,
  jour: number,
  user: UserProfile,
  maxSquat: number,
  maxBench: number,
  maxDeadlift: number,
  level: PowerliftingLevel,
  dayName?: string
) {
  // Le jour SBD ne tombe jamais sur la semaine de deload (cf. generatePowerliftingProgramme).
  const cycle = Math.ceil(semaine / 4);
  const { rmSquat, rmBench, rmDeadlift } = computeCycleMaxes(cycle, level, maxSquat, maxBench, maxDeadlift);

  const scheme = [{ reps: 3, pct: 0.8 }, { reps: 2, pct: 0.87 }];

  const lifts: Array<{ key: MainLift; nom: string; rm: number; repos: string; skipWarmupSteps: number }> = [
    { key: 'squat', nom: 'Squat', rm: rmSquat, repos: '3-4 min', skipWarmupSteps: 0 },
    { key: 'bench', nom: 'Développé Couché', rm: rmBench, repos: '3 min', skipWarmupSteps: 1 },
    { key: 'deadlift', nom: 'Soulevé de Terre', rm: rmDeadlift, repos: '3-4 min', skipWarmupSteps: 1 },
  ];

  const exercices = lifts.flatMap(({ key, nom, rm, repos, skipWarmupSteps }) => {
    const firstWorkingWeight = roundToPlates(rm * scheme[0].pct);
    // Déjà chaud grâce au(x) mouvement(s) précédent(s) : on saute les 1ers échelons les plus légers.
    const warmup = buildWarmupSets(nom, firstWorkingWeight, WARMUP_RAMPS[key].slice(skipWarmupSteps));
    const work = buildMainLiftSets(nom, rm, scheme, repos);
    return [...warmup, ...work];
  });

  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`} (SBD)`,
    day: dayName || `Jour ${jour}`,
    phase: 'Spécialisation',
    intensity: 'Élevée',
    duration: exercices.length * 10,
    exercises: exercices,
    notes: `Séance SBD combinée — simulation de passage de compétition, sans accessoires (Cycle ${cycle}).`,
    equipment: ['Barre', 'Disques', 'Rack']
  };
}

// Pourcentage visé pour le 3e essai ("tentative de record") selon le niveau — un débutant peut
// viser un peu plus large (progrès rapides, marge de sécurité technique moins critique) qu'un
// lifter avancé où chaque kg en plus est plus dur à aller chercher.
const prAttemptPct = (level: PowerliftingLevel) =>
  level === 'debutant' ? 1.05 : level === 'intermediaire' ? 1.03 : 1.02;

// Une séance PR = échauffement puis DIRECTEMENT la tentative de record (pas d'ouverture ni de 2e
// essai façon compétition) — sans accessoires ni volume derrière, tester un vrai max suffit.
function createPRSession(
  semaine: number,
  jour: number,
  maxRm: number,
  level: PowerliftingLevel,
  mainLift: MainLift,
  nomPrincipal: string,
  dayName?: string
) {
  const cycle = Math.ceil(semaine / 4);
  const pct = prAttemptPct(level);
  const prWeight = roundToPlates(maxRm * pct);

  const warmup = buildWarmupSets(nomPrincipal, prWeight, WARMUP_RAMPS[mainLift]);
  const recordAttempt = {
    nom: `${nomPrincipal} (tentative de record)`,
    type: 'travail',
    series: 1,
    reps: 1,
    poids: prWeight,
    pourcentage: pctOf(prWeight, maxRm),
    repos: '5 min',
  };

  const exercices = [...warmup, recordAttempt];

  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`} (PR)`,
    day: dayName || `Jour ${jour}`,
    phase: 'Spécialisation',
    intensity: 'Maximale',
    duration: exercices.length * 12,
    exercises: exercices,
    notes: `Séance PR — tentative de record sur ${nomPrincipal.toLowerCase()}, sans accessoires (Cycle ${cycle}).`,
    equipment: ['Barre', 'Disques', 'Rack']
  };
}

// Séance PR en SBD : les 3 mouvements, chacun échauffement + tentative de record directe — la
// version "mock meet" complète, plus exigeante que le combo SBD sous-maximal (createSBDComboSession).
function createPRSBDSession(
  semaine: number,
  jour: number,
  maxSquat: number,
  maxBench: number,
  maxDeadlift: number,
  level: PowerliftingLevel,
  dayName?: string
) {
  const cycle = Math.ceil(semaine / 4);
  const pct = prAttemptPct(level);

  const lifts: Array<{ key: MainLift; nom: string; rm: number; repos: string; skipWarmupSteps: number }> = [
    { key: 'squat', nom: 'Squat', rm: maxSquat, repos: '5 min', skipWarmupSteps: 0 },
    { key: 'bench', nom: 'Développé Couché', rm: maxBench, repos: '4 min', skipWarmupSteps: 1 },
    { key: 'deadlift', nom: 'Soulevé de Terre', rm: maxDeadlift, repos: '5 min', skipWarmupSteps: 1 },
  ];

  const exercices = lifts.flatMap(({ key, nom, rm, repos, skipWarmupSteps }) => {
    const prWeight = roundToPlates(rm * pct);
    const warmup = buildWarmupSets(nom, prWeight, WARMUP_RAMPS[key].slice(skipWarmupSteps));
    const recordAttempt = {
      nom: `${nom} (tentative de record)`,
      type: 'travail',
      series: 1,
      reps: 1,
      poids: prWeight,
      pourcentage: pctOf(prWeight, rm),
      repos,
    };
    return [...warmup, recordAttempt];
  });

  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`} (PR SBD)`,
    day: dayName || `Jour ${jour}`,
    phase: 'Spécialisation',
    intensity: 'Maximale',
    duration: exercices.length * 12,
    exercises: exercices,
    notes: `Séance PR SBD — tentative de record sur les 3 mouvements, simulation complète de jour de compétition (Cycle ${cycle}).`,
    equipment: ['Barre', 'Disques', 'Rack']
  };
}

// Détecte le mouvement principal d'une séance à partir de son exercice de type 'travail'
// (le nom du 4e jour bench "Développé Couché (technique)" matche bien le préfixe "Développé Couché").
function detectSessionMainLift(session: any): { lift: MainLift; nom: string } | null {
  const mainEx = session?.exercises?.find((e: any) => e.type === 'travail');
  if (!mainEx) return null;
  if (mainEx.nom.startsWith('Squat')) return { lift: 'squat', nom: mainEx.nom };
  if (mainEx.nom.startsWith('Développé Couché')) return { lift: 'bench', nom: mainEx.nom };
  if (mainEx.nom.startsWith('Soulevé de Terre')) return { lift: 'deadlift', nom: mainEx.nom };
  return null;
}

const isTestSession = (session: any): boolean =>
  !!session?.notes && (
    session.notes.includes('Séance PR') ||
    session.notes.includes('PR SBD') ||
    session.notes.includes('SBD combinée') ||
    session.notes.includes('Séance TEST')
  );

// Réajuste une séance de travail normale si le dernier passage sur le MÊME mouvement s'est soldé
// par un échec (validation marquée "non réussie") : au lieu d'enchaîner sur le %1RM prévu par la
// vague (qui peut grimper à 90-95%), on retombe sur un bloc technique modéré et contrôlé en tempo,
// le temps de refiabiliser le mouvement. Ne touche jamais aux séances PR / SBD (jours de test).
// N'altère pas le programme stocké : s'applique à la volée quand une séance est affichée.
export function adaptSessionToRecentFailure(
  session: any,
  allSessions: any[],
  validations: Array<{ exerciseId: string; sessionId: string; success: boolean }>
): any {
  if (!session || session.isRestDay || isTestSession(session)) return session;

  const current = detectSessionMainLift(session);
  if (!current) return session;

  const semaineMatch = session.nom?.match(/Semaine (\d+)/);
  const currentWeek = semaineMatch ? parseInt(semaineMatch[1]) : null;
  if (currentWeek == null) return session;

  // Le dernier passage antérieur (semaine strictement inférieure) sur le même mouvement, hors
  // séances de test — c'est la seule référence qui compte pour décider d'un éventuel allègement.
  const priorSession = allSessions
    .filter((s) => {
      if (s === session || isTestSession(s)) return false;
      const match = s.nom?.match(/Semaine (\d+)/);
      const week = match ? parseInt(match[1]) : null;
      if (week == null || currentWeek == null || week >= currentWeek) return false;
      const detected = detectSessionMainLift(s);
      return detected?.lift === current.lift;
    })
    .sort((a, b) => {
      const wa = parseInt(a.nom.match(/Semaine (\d+)/)[1]);
      const wb = parseInt(b.nom.match(/Semaine (\d+)/)[1]);
      return wb - wa;
    })[0];

  if (!priorSession) return session;

  const priorMain = detectSessionMainLift(priorSession);
  if (!priorMain) return session;

  // Chaque série de travail a maintenant son propre id unique (cf. assignExerciseIds) — on
  // considère la séance précédente en échec si N'IMPORTE LAQUELLE de ses séries de travail sur ce
  // mouvement a été marquée ratée (le id ne colle plus au nom depuis la correction du bug de
  // validations partagées entre séries).
  const priorMainSetIds = new Set(
    (priorSession.exercises || [])
      .filter((e: any) => e.type === 'travail' && e.nom === priorMain.nom)
      .map((e: any) => e.id)
  );
  const failedLastTime = validations.some(
    (v) => v.sessionId === priorSession.id && priorMainSetIds.has(v.exerciseId) && v.success === false
  );
  if (!failedLastTime) return session;

  // Récupère le RM de travail utilisé pour CETTE séance à partir de son propre top set déjà généré
  // (poids / %), pour rester cohérent avec la progression de cycle déjà appliquée à cette séance.
  const mainSets = session.exercises.filter((e: any) => e.type === 'travail');
  const topSet = mainSets.reduce((max: any, e: any) => (e.pourcentage > (max?.pourcentage || 0) ? e : max), null);
  if (!topSet || !topSet.pourcentage) return session;
  const estimatedRm = topSet.poids / (topSet.pourcentage / 100);

  const recoveryScheme = [{ reps: 5, pct: 0.6 }, { reps: 5, pct: 0.65 }, { reps: 5, pct: 0.7 }];
  const adaptedNom = `${current.nom} (tempo contrôlé)`;
  const newMainSets = buildMainLiftSets(adaptedNom, estimatedRm, recoveryScheme, mainSets[0].repos);
  const newFirstWeight = roundToPlates(estimatedRm * recoveryScheme[0].pct);
  const newWarmup = buildWarmupSets(current.nom, newFirstWeight, WARMUP_RAMPS[current.lift]);

  const oldWarmupName = `${current.nom} (échauffement)`;
  const keptExercises = session.exercises.filter(
    (e: any) => !(e.nom === oldWarmupName && e.type === 'echauffement') && !(e.nom === current.nom && e.type === 'travail')
  );

  return {
    ...session,
    exercises: assignExerciseIds(session.id, [...newWarmup, ...newMainSets, ...keptExercises]),
    notes: `⚠️ Séance adaptée : échec du dernier passage sur ${current.nom.toLowerCase()} → charge réduite, travail en tempo contrôlé pour refiabiliser la technique avant de reprendre la progression.\n${session.notes || ''}`.trim(),
  };
}

// RPE (1 = très facile, 10 = hardcore) déclaré après une séance entièrement réussie -> ajustement du
// %1RM appliqué à la PROCHAINE séance sur le même mouvement. Trop facile pousse plus fort que prévu
// par la vague ; hardcore/quasi-max fait lever le pied pour gérer la fatigue. Entre les deux (5-8),
// la séance s'est déroulée comme prévu, on ne touche à rien.
function difficultyAdjustment(rpe: number): number {
  if (rpe <= 2) return 0.08;
  if (rpe <= 4) return 0.04;
  if (rpe <= 8) return 0;
  if (rpe === 9) return -0.03;
  return -0.06; // 10 : hardcore
}

// Réajuste une séance en fonction de la note de difficulté (RPE) donnée par l'utilisateur après le
// dernier passage sur le MÊME mouvement — un curseur qui monte ou baisse le %1RM prévu, pas un
// remplacement de schéma comme adaptSessionToRecentFailure. Ne s'applique jamais aux séances PR/SBD/
// TEST. N'altère pas le programme stocké : s'applique à la volée quand une séance est affichée.
export function adaptSessionToRecentDifficulty(
  session: any,
  allSessions: any[],
  sessionRatings: Array<{ sessionId: string; rpe: number }>
): any {
  if (!session || session.isRestDay || isTestSession(session) || !sessionRatings.length) return session;

  const current = detectSessionMainLift(session);
  if (!current) return session;

  const semaineMatch = session.nom?.match(/Semaine (\d+)/);
  const currentWeek = semaineMatch ? parseInt(semaineMatch[1]) : null;
  if (currentWeek == null) return session;

  const priorSession = allSessions
    .filter((s) => {
      if (s === session || isTestSession(s)) return false;
      const match = s.nom?.match(/Semaine (\d+)/);
      const week = match ? parseInt(match[1]) : null;
      if (week == null || week >= currentWeek) return false;
      const detected = detectSessionMainLift(s);
      return detected?.lift === current.lift;
    })
    .sort((a, b) => parseInt(b.nom.match(/Semaine (\d+)/)[1]) - parseInt(a.nom.match(/Semaine (\d+)/)[1]))[0];

  if (!priorSession) return session;

  const rating = sessionRatings.find((r) => r.sessionId === priorSession.id);
  if (!rating) return session;

  const delta = difficultyAdjustment(rating.rpe);
  if (delta === 0) return session;

  const mainSets = session.exercises.filter((e: any) => e.type === 'travail');
  if (!mainSets.length) return session;

  // On ajuste chaque set de travail à partir de son propre %/poids d'origine (garde les mêmes reps),
  // pas un remplacement complet du schéma comme pour un échec — juste un curseur qui monte ou baisse.
  const adjustedMainSets = mainSets.map((set: any) => {
    if (!set.pourcentage) return set;
    const rm = set.poids / (set.pourcentage / 100);
    const newPct = Math.max(0.3, Math.min(0.98, set.pourcentage / 100 + delta));
    const poids = roundToPlates(rm * newPct);
    return { ...set, poids, pourcentage: pctOf(poids, rm) };
  });

  const oldWarmupName = `${current.nom} (échauffement)`;
  const newWarmup = buildWarmupSets(current.nom, adjustedMainSets[0].poids, WARMUP_RAMPS[current.lift]);
  const keptExercises = session.exercises.filter(
    (e: any) => !(e.nom === oldWarmupName && e.type === 'echauffement') && e.type !== 'travail'
  );

  const message = delta > 0
    ? `💪 Séance ajustée : la dernière séance sur ${current.nom.toLowerCase()} était jugée trop facile (${rating.rpe}/10) → charge augmentée par rapport au programme initial.`
    : `🧊 Séance ajustée : la dernière séance sur ${current.nom.toLowerCase()} était très dure (${rating.rpe}/10) → charge légèrement réduite pour gérer la fatigue.`;

  return {
    ...session,
    exercises: assignExerciseIds(session.id, [...newWarmup, ...adjustedMainSets, ...keptExercises]),
    notes: `${message}\n${session.notes || ''}`.trim(),
  };
}

// Nouvelle fonction pour le Street Lifting
function generateStreetLiftingProgramme(user: UserProfile): Programme {
  console.log('=== GENERATE STREET LIFTING PROGRAMME ===');
  console.log('User:', user);
  
  const sessions = [];
  const seancesParSemaine = user.trainingDays?.length || 4;
  const duree = 4;
  const trainingDays = user.trainingDays || ['lundi', 'mercredi', 'vendredi', 'dimanche'];
  
  // Calcul des charges maximales basées sur le poids du corps
  const ratioMax = {
    debutant: 0.5,   // 50% PDC en charge externe
    intermediaire: 1.0,
    avance: 1.5
  };
  
  const niveau = user.niveau || 'intermediaire';
  const poidsCorps = user.weight || 70;
  const ratio = ratioMax[niveau as keyof typeof ratioMax] || 1.0;
  
  // Calcul correct : ratio représente le pourcentage du poids du corps qu'on peut ajouter
  // Ex: ratio 0.5 = on peut faire des pull-ups avec 50% de son poids en plus
  const maxPullUp = Math.round(poidsCorps * ratio); // Charge additionnelle pour les pull-ups
  const maxDip = Math.round(poidsCorps * (ratio + 0.2)); // Charge additionnelle pour les dips
  
  for (let semaine = 1; semaine <= duree; semaine++) {
    for (let jour = 0; jour < trainingDays.length; jour++) {
      const session = createStreetLiftingSession(semaine, jour + 1, user, maxPullUp, maxDip, trainingDays[jour]);
      sessions.push(session);
      console.log(`Session Street Lifting créée: ${semaine}-${jour + 1} (${trainingDays[jour]})`);
    }
  }
  
  const programme: Programme = {
    id: Date.now().toString(),
    nom: `Programme Street Lifting - ${niveau}`,
    description: 'Programme d\'entraînement Street Lifting avec progression lestée sur 4 semaines',
    duree,
    sessions,
    phases: { adaptation: [], progression: [], specialisation: [] },
    progression: { totalSessions: sessions.length, sessionsParSemaine: seancesParSemaine, dureeMoyenne: 75 }
  };
  
  console.log('Programme Street Lifting final:', programme);
  console.log('Nombre de sessions:', programme.sessions.length);
  
  return programme;
}

function createStreetLiftingSession(semaine: number, jour: number, user: UserProfile, maxPullUp: number, maxDip: number, dayName?: string) {
  const estDeload = semaine === 4;
  
  // Calculer le mois et la semaine dans le mois
  const mois = Math.ceil(semaine / 4);
  const semaineDansMois = ((semaine - 1) % 4) + 1;
  
  // Progression mensuelle : +2.5kg pour les exercices lestés
  const progressionMensuelle = (mois - 1) * 2.5; // +2.5kg par mois pour les exercices lestés
  
  console.log(`🏋️ Mois ${mois}, Semaine ${semaineDansMois} - Progression Street Lifting: +${progressionMensuelle}kg (lestés)`);
  
  let exercices = [];
  
  if (jour % 2 === 1) {
    // Jour Tirage (Pull-Ups + Accessoires)
    // Calcul correct : pourcentage de la charge additionnelle max + progression mensuelle
    const pourcentageCharge = estDeload ? 0.5 : (0.6 + (0.1 * semaineDansMois)); // 50% deload, sinon 60% à 90%
    const chargePullUp = Math.round((pourcentageCharge * maxPullUp) + progressionMensuelle);
    
    exercices = [
      { 
        nom: 'Pull-Ups lestés', 
        series: estDeload ? 3 : 5, 
        reps: estDeload ? 5 : (semaine === 3 ? 3 : 5), 
        poids: chargePullUp, 
        repos: 180 
      },
      { 
        nom: 'Front Lever Pulls', 
        series: estDeload ? 3 : 4, 
        reps: estDeload ? 8 : (semaine === 3 ? 6 : 8), 
        poids: 0, 
        repos: 120 
      },
      { 
        nom: 'Face Pulls élastique', 
        series: 3, 
        reps: 15, 
        poids: 0, 
        repos: 90 
      },
      { 
        nom: 'Biceps Curls barre', 
        series: 3, 
        reps: 12, 
        poids: Math.round((user.weight * 0.3) + progressionMensuelle), // + progression mensuelle
        repos: 90 
      }
    ];
  } else {
    // Jour Poussée (Dips + Accessoires)
    // Calcul correct : pourcentage de la charge additionnelle max + progression mensuelle
    const pourcentageCharge = estDeload ? 0.5 : (0.6 + (0.1 * semaineDansMois)); // 50% deload, sinon 60% à 90%
    const chargeDip = Math.round((pourcentageCharge * maxDip) + progressionMensuelle);
    
    exercices = [
      { 
        nom: 'Dips lestés', 
        series: estDeload ? 3 : 5, 
        reps: estDeload ? 5 : (semaine === 3 ? 3 : 5), 
        poids: chargeDip, 
        repos: 180 
      },
      { 
        nom: 'Handstand Push-Ups', 
        series: estDeload ? 3 : 4, 
        reps: estDeload ? 6 : (semaine === 3 ? 4 : 6), 
        poids: 0, 
        repos: 120 
      },
      { 
        nom: 'Extensions triceps', 
        series: 3, 
        reps: 12, 
        poids: Math.round(user.weight * 0.2), 
        repos: 90 
      },
      { 
        nom: 'Gainage lesté', 
        series: 3, 
        reps: 30, 
        poids: Math.round(user.weight * 0.1), 
        repos: 60 
      }
    ];
  }
  
  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`} (${jour % 2 === 1 ? 'Tirage' : 'Poussée'})`,
    day: dayName || `Jour ${jour}`,
    exercices,
    duree: exercices.length * 15,
    notes: estDeload ? 'Semaine de récupération' : `Charge max Pull-Up: ${Math.round(maxPullUp)}kg, Dip: ${Math.round(maxDip)}kg`
  };
}

// Nouvelle fonction pour le Calisthenics
function generateCalisthenicsProgramme(user: UserProfile): Programme {
  console.log('=== GENERATE CALISTHENICS PROGRAMME ===');
  console.log('User:', user);
  
  const sessions = [];
  const seancesParSemaine = user.trainingDays?.length || 4;
  const duree = 4;
  const trainingDays = user.trainingDays || ['lundi', 'mercredi', 'vendredi', 'dimanche'];
  
  // Progressions de base par niveau
  const progressions = {
    debutant: { 
      pushUp: "Push-Ups", 
      pullUp: "Australian Pull-Ups",
      dips: "Dips assistés",
      skill: "Plank Hold"
    },
    intermediaire: { 
      pushUp: "Diamond Push-Ups", 
      pullUp: "Pull-Ups stricts",
      dips: "Dips stricts",
      skill: "Handstand Hold"
    },
    avance: { 
      pushUp: "Pseudo Planche Push-Ups", 
      pullUp: "Archer Pull-Ups",
      dips: "Dips lestés",
      skill: "Front Lever Progression"
    },
    expert: { 
      pushUp: "One Arm Push-Ups", 
      pullUp: "One Arm Pull-Ups",
      dips: "Dips lestés lourds",
      skill: "Planche Lean"
    }
  };
  
  const niveau = user.niveau || 'intermediaire';
  const progression = progressions[niveau as keyof typeof progressions] || progressions.intermediaire;
  
  for (let semaine = 1; semaine <= duree; semaine++) {
    for (let jour = 0; jour < trainingDays.length; jour++) {
      const session = createCalisthenicsSession(semaine, jour + 1, user, progression, niveau, trainingDays[jour]);
      sessions.push(session);
      console.log(`Session Calisthenics créée: ${semaine}-${jour + 1} (${trainingDays[jour]})`);
    }
  }

  const programme: Programme = {
    id: Date.now().toString(),
    nom: `Programme Calisthenics - ${niveau}`,
    description: 'Programme d\'entraînement Calisthenics avec progression par niveaux sur 4 semaines',
    duree,
    sessions,
    phases: { adaptation: [], progression: [], specialisation: [] },
    progression: { totalSessions: sessions.length, sessionsParSemaine: seancesParSemaine, dureeMoyenne: 60 }
  };
  
  console.log('Programme Calisthenics final:', programme);
  console.log('Nombre de sessions:', programme.sessions.length);
  
  return programme;
}

function createCalisthenicsSession(semaine: number, jour: number, user: UserProfile, progression: any, niveau: string, dayName?: string) {
  const estDeload = semaine === 4;
  
  // Calculer le mois et la semaine dans le mois
  const mois = Math.ceil(semaine / 4);
  const semaineDansMois = ((semaine - 1) % 4) + 1;
  
  // Progression mensuelle : +1 répétition par mois pour les exercices au poids du corps
  const progressionMensuelle = (mois - 1) * 1; // +1 rep par mois pour les exercices au poids du corps
  
  console.log(`🤸 Mois ${mois}, Semaine ${semaineDansMois} - Progression Calisthenics: +${progressionMensuelle} rep (poids du corps)`);
  
  let exercices = [];
  
  if (jour % 2 === 1) {
    // Push Focus
    const repsPush = Math.max(3, Math.floor((8 + semaineDansMois) * (estDeload ? 0.7 : 1)) + progressionMensuelle);
    const repsDips = Math.max(3, Math.floor((10 + semaineDansMois) * (estDeload ? 0.7 : 1)) + progressionMensuelle);
    const tempsSkill = Math.max(5, Math.floor((20 + semaineDansMois * 5) * (estDeload ? 0.7 : 1)) + progressionMensuelle);
    
    exercices = [
      { 
        nom: progression.pushUp, 
        series: estDeload ? 3 : 4, 
        reps: repsPush, 
        poids: 0, 
        repos: 90 
      },
      { 
        nom: progression.dips, 
        series: estDeload ? 3 : 4, 
        reps: repsDips, 
        poids: 0, 
        repos: 90 
      },
      { 
        nom: progression.skill, 
        series: estDeload ? 2 : 3, 
        reps: tempsSkill, 
        poids: 0, 
        repos: 60 
      },
      { 
        nom: 'Leg Raises', 
        series: 3, 
        reps: Math.max(5, Math.floor((12 + semaineDansMois) * (estDeload ? 0.7 : 1)) + progressionMensuelle), 
        poids: 0, 
        repos: 60 
      }
    ];
  } else {
    // Pull Focus
    const repsPull = Math.max(3, Math.floor((6 + semaineDansMois) * (estDeload ? 0.7 : 1)) + progressionMensuelle);
    const repsLeg = Math.max(5, Math.floor((12 + semaineDansMois) * (estDeload ? 0.7 : 1)) + progressionMensuelle);
    const tempsSkill = Math.max(5, Math.floor((10 + semaineDansMois * 5) * (estDeload ? 0.7 : 1)) + progressionMensuelle);
    
    exercices = [
      { 
        nom: progression.pullUp, 
        series: estDeload ? 3 : 4, 
        reps: repsPull, 
        poids: 0, 
        repos: 120 
      },
      { 
        nom: 'Leg Raises', 
        series: estDeload ? 3 : 4, 
        reps: repsLeg, 
        poids: 0, 
        repos: 60 
      },
      { 
        nom: progression.skill, 
        series: estDeload ? 2 : 3, 
        reps: tempsSkill, 
        poids: 0, 
        repos: 90 
      },
      { 
        nom: 'Hollow Body', 
        series: 3, 
        reps: Math.max(10, Math.floor((15 + semaine) * (estDeload ? 0.7 : 1))), 
        poids: 0, 
        repos: 60 
      }
    ];
  }
  
  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`} (${jour % 2 === 1 ? 'Push' : 'Pull'})`,
    day: dayName || `Jour ${jour}`,
    exercices,
    duree: exercices.length * 12,
    notes: estDeload ? 'Semaine de récupération' : `Niveau: ${niveau}`
  };
}

// Nouvelle fonction pour le Marathon
function generateMarathonProgramme(user: UserProfile): Programme {
  console.log('=== GENERATE MARATHON PROGRAMME ===');
  console.log('User:', user);
  
  const sessions = [];
  const seancesParSemaine = user.trainingDays?.length || 4;
  const duree = 4;
  const trainingDays = user.trainingDays || ['lundi', 'mercredi', 'vendredi', 'dimanche'];
  
  // VMA par défaut si non spécifiée
  const vma = user.vma || 15; // km/h
  const objectif = user.objectif || '10k';
  const niveau = user.niveau || 'intermediaire';
  
  // Allures en fonction de la VMA
  const allure = {
    endurance: vma * 0.6,
    seuil: vma * 0.85,
    fractionne: vma * 1.0,
    marathon: vma * 0.75
  };
  
  console.log('VMA:', vma, 'km/h');
  console.log('Allures:', allure);
  
  for (let semaine = 1; semaine <= duree; semaine++) {
    for (let jour = 0; jour < trainingDays.length; jour++) {
      const session = createMarathonSession(semaine, jour + 1, user, allure, objectif, niveau, trainingDays[jour]);
      sessions.push(session);
      console.log(`Session Marathon créée: ${semaine}-${jour + 1} (${trainingDays[jour]})`);
    }
  }
  
  const programme: Programme = {
    id: Date.now().toString(),
    nom: `Programme Marathon - ${objectif} (${niveau})`,
    description: `Programme d'entraînement marathon pour objectif ${objectif} avec VMA ${vma} km/h`,
    duree,
    sessions,
    phases: { adaptation: [], progression: [], specialisation: [] },
    progression: { totalSessions: sessions.length, sessionsParSemaine: seancesParSemaine, dureeMoyenne: 90 }
  };
  
  console.log('Programme Marathon final:', programme);
  console.log('Nombre de sessions:', programme.sessions.length);
  
  return programme;
}

function createMarathonSession(semaine: number, jour: number, user: UserProfile, allure: any, objectif: string, niveau: string, dayName?: string) {
  const estDeload = semaine === 4;
  
  // Calculer le mois et la semaine dans le mois
  const mois = Math.ceil(semaine / 4);
  const semaineDansMois = ((semaine - 1) % 4) + 1;
  
  // Progression mensuelle : +5 minutes par mois pour les courses longues
  const progressionMensuelle = (mois - 1) * 5; // +5 min par mois pour les courses longues
  
  console.log(`🏃‍♂️ Mois ${mois}, Semaine ${semaineDansMois} - Progression Marathon: +${progressionMensuelle} min (courses longues)`);
  
  let exercices = [];
  
  if (jour === 1) {
    // Endurance fondamentale
    const duree = estDeload ? 30 : (45 + semaineDansMois * 5 + progressionMensuelle);
    exercices = [
      { 
        nom: 'Footing endurance', 
        series: 1, 
        reps: duree, 
        poids: 0, 
        repos: 0,
        details: `Footing ${duree}min à ${allure.endurance.toFixed(1)} km/h (zone 2)`
      },
      { 
        nom: 'Étirements', 
        series: 1, 
        reps: 10, 
        poids: 0, 
        repos: 0,
        details: 'Étirements post-course 10min'
      }
    ];
  } else if (jour === 2) {
    // Fractionné
    const repetitions = estDeload ? 4 : (6 + semaineDansMois + Math.floor(progressionMensuelle / 5)); // +1 rep par mois
    const distance = objectif === 'marathon' ? 1000 : 400;
    exercices = [
      { 
        nom: 'Fractionné', 
        series: repetitions, 
        reps: distance, 
        poids: 0, 
        repos: 60,
        details: `${repetitions}x${distance}m à ${allure.fractionne.toFixed(1)} km/h (R=1min)`
      },
      { 
        nom: 'Récupération active', 
        series: 1, 
        reps: 10, 
        poids: 0, 
        repos: 0,
        details: 'Footing récupération 10min'
      }
    ];
  } else if (jour === 3) {
    // Seuil
    const repetitions = estDeload ? 2 : 3;
    const duree = estDeload ? 8 : (10 + semaine);
    exercices = [
      { 
        nom: 'Seuil', 
        series: repetitions, 
        reps: duree, 
        poids: 0, 
        repos: 120,
        details: `${repetitions}x${duree}min à ${allure.seuil.toFixed(1)} km/h (R=2min)`
      },
      { 
        nom: 'Retour au calme', 
        series: 1, 
        reps: 15, 
        poids: 0, 
        repos: 0,
        details: 'Footing retour au calme 15min'
      }
    ];
  } else {
    // Sortie longue
    const distance = estDeload ? 8 : (12 + semaine * 2);
    const distanceMarathon = estDeload ? 2 : (3 + semaine);
    exercices = [
      { 
        nom: 'Sortie longue', 
        series: 1, 
        reps: distance, 
        poids: 0, 
        repos: 0,
        details: `Sortie ${distance}km dont ${distanceMarathon}km à ${allure.marathon.toFixed(1)} km/h`
      },
      { 
        nom: 'Renforcement', 
        series: 3, 
        reps: 20, 
        poids: 0, 
        repos: 60,
        details: 'Squats, fentes, gainage'
      }
    ];
  }
  
  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`}`,
    day: dayName || `Jour ${jour}`,
    exercices,
    duree: exercices[0].reps + exercices[1].reps,
    notes: estDeload ? 'Semaine de récupération' : `VMA: ${allure.fractionne.toFixed(1)} km/h`
  };
}

// Nouvelle fonction pour la Musculation Classique
function generateMusculationClassiqueProgramme(user: UserProfile): Programme {
  console.log('=== GENERATE MUSCULATION CLASSIQUE PROGRAMME ===');
  console.log('User:', user);
  
  const sessions = [];
  const seancesParSemaine = user.trainingDays?.length || user.seancesParSemaine || 4;
  const duree = 6; // 6 semaines
  const trainingDays = user.trainingDays || ['lundi', 'mercredi', 'vendredi', 'dimanche'];
  
  // Volume ajusté selon le niveau
  const volume = {
    debutant: { series: 3, reps: [8, 10] },
    intermediaire: { series: 4, reps: [8, 12] },
    avance: { series: 5, reps: [6, 12] }
  };
  
  const niveau = user.niveau || 'intermediaire';
  const volumeConfig = volume[niveau as keyof typeof volume] || volume.intermediaire;
  
  console.log('Niveau:', niveau);
  console.log('Volume:', volumeConfig);
  
  for (let semaine = 1; semaine <= duree; semaine++) {
    for (let jour = 0; jour < trainingDays.length; jour++) {
      const session = createMusculationClassiqueSession(semaine, jour + 1, user, volumeConfig, niveau, trainingDays[jour]);
      sessions.push(session);
      console.log(`Session Musculation Classique créée: ${semaine}-${jour + 1} (${trainingDays[jour]})`);
    }
  }
  
  const programme: Programme = {
    id: Date.now().toString(),
    nom: `Programme Musculation Classique - ${niveau}`,
    description: `Programme d'hypertrophie Push/Pull/Legs avec progression sur ${duree} semaines`,
    duree,
    sessions,
    phases: { adaptation: [], progression: [], specialisation: [] },
    progression: { totalSessions: sessions.length, sessionsParSemaine: seancesParSemaine, dureeMoyenne: 75 }
  };
  
  console.log('Programme Musculation Classique final:', programme);
  console.log('Nombre de sessions:', programme.sessions.length);
  
  return programme;
}

function createMusculationClassiqueSession(semaine: number, jour: number, user: UserProfile, volumeConfig: any, niveau: string, dayName?: string) {
  const estDeload = semaine === 6;
  
  // Calculer le mois et la semaine dans le mois
  const mois = Math.ceil(semaine / 6);
  const semaineDansMois = ((semaine - 1) % 6) + 1;
  
  // Progression mensuelle : +5kg pour les exercices principaux, +2.5kg pour les accessoires
  const progressionMensuelle = (mois - 1) * 5; // +5kg par mois pour les exercices principaux
  const progressionAccessoires = (mois - 1) * 2.5; // +2.5kg par mois pour les accessoires
  
  console.log(`💪 Mois ${mois}, Semaine ${semaineDansMois} - Progression Musculation: +${progressionMensuelle}kg (principaux), +${progressionAccessoires}kg (accessoires)`);
  
  let exercices = [];
  let typeSession = '';
  
  // Détermine le type de session selon le jour
  if (jour % 3 === 1) {
    typeSession = 'Push';
    exercices = [
      { 
        nom: 'Développé couché barre', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaineDansMois - 1), 
        poids: Math.round((user.weight * 0.8) + progressionMensuelle), 
        repos: 120 
      },
      { 
        nom: 'Développé incliné haltères', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round((user.weight * 0.6) + progressionAccessoires), 
        repos: 90 
      },
      { 
        nom: 'Développé militaire', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round((user.weight * 0.5) + progressionAccessoires), 
        repos: 90 
      },
      { 
        nom: 'Dips lestés', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round(user.weight * 0.3), 
        repos: 90 
      }
    ];
  } else if (jour % 3 === 2) {
    typeSession = 'Pull';
    exercices = [
      { 
        nom: 'Tractions pronation', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: 0, 
        repos: 120 
      },
      { 
        nom: 'Rowing barre', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round(user.weight * 0.7), 
        repos: 90 
      },
      { 
        nom: 'Tirage poulie basse', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round((user.weight * 0.6) + progressionAccessoires), 
        repos: 90 
      },
      { 
        nom: 'Curl biceps barre', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round(user.weight * 0.3), 
        repos: 60 
      }
    ];
  } else {
    typeSession = 'Legs';
    exercices = [
      { 
        nom: 'Back Squat', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round((user.weight * 1.2) + progressionMensuelle), 
        repos: 120 
      },
      { 
        nom: 'Soulevé de terre jambes tendues', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round(user.weight * 0.9), 
        repos: 120 
      },
      { 
        nom: 'Fentes marchées', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round((user.weight * 0.4) + progressionAccessoires), 
        repos: 90 
      },
      { 
        nom: 'Mollets debout', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: Math.max(6, volumeConfig.reps[0] + semaine - 1), 
        poids: Math.round((user.weight * 0.6) + progressionAccessoires), 
        repos: 60 
      }
    ];
  }
  
  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`} (${typeSession})`,
    day: dayName || `Jour ${jour}`,
    exercices,
    duree: exercices.length * 15,
    notes: estDeload ? 'Semaine de récupération' : `Niveau: ${niveau}`
  };
}

// Nouvelle fonction pour le CrossFit
function generateCrossfitProgramme(user: UserProfile): Programme {
  console.log('=== GENERATE CROSSFIT PROGRAMME ===');
  console.log('User:', user);
  
  const sessions = [];
  const seancesParSemaine = user.trainingDays?.length || user.seancesParSemaine || 5;
  const duree = 6;
  const trainingDays = user.trainingDays || ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']; // 6 semaines
  
  // Volume force selon le niveau
  const volumeForce = {
    debutant: { series: 3, reps: [8, 10] },
    intermediaire: { series: 4, reps: [5, 8] },
    avance: { series: 5, reps: [3, 6] }
  };
  
  const niveau = user.niveau || 'intermediaire';
  const volumeConfig = volumeForce[niveau as keyof typeof volumeForce] || volumeForce.intermediaire;
  
  console.log('Niveau:', niveau);
  console.log('Volume:', volumeConfig);
  
  for (let semaine = 1; semaine <= duree; semaine++) {
    for (let jour = 0; jour < trainingDays.length; jour++) {
      const session = createCrossfitSession(semaine, jour + 1, user, volumeConfig, niveau, trainingDays[jour]);
      sessions.push(session);
      console.log(`Session CrossFit créée: ${semaine}-${jour + 1} (${trainingDays[jour]})`);
    }
  }
  
  const programme: Programme = {
    id: Date.now().toString(),
    nom: `Programme CrossFit - ${niveau}`,
    description: `Programme CrossFit avec cycles force, WOD et MetCon sur ${duree} semaines`,
    duree,
    sessions,
    phases: { adaptation: [], progression: [], specialisation: [] },
    progression: { totalSessions: sessions.length, sessionsParSemaine: seancesParSemaine, dureeMoyenne: 60 }
  };
  
  console.log('Programme CrossFit final:', programme);
  console.log('Nombre de sessions:', programme.sessions.length);
  
  return programme;
}

function createCrossfitSession(semaine: number, jour: number, user: UserProfile, volumeConfig: any, niveau: string, dayName?: string) {
  const estDeload = semaine === 6;
  
  // Calculer le mois et la semaine dans le mois
  const mois = Math.ceil(semaine / 6);
  const semaineDansMois = ((semaine - 1) % 6) + 1;
  
  // Progression mensuelle : +5kg pour les exercices principaux, +2.5kg pour les accessoires
  const progressionMensuelle = (mois - 1) * 5; // +5kg par mois pour les exercices principaux
  const progressionAccessoires = (mois - 1) * 2.5; // +2.5kg par mois pour les accessoires
  
  console.log(`🔥 Mois ${mois}, Semaine ${semaineDansMois} - Progression CrossFit: +${progressionMensuelle}kg (principaux), +${progressionAccessoires}kg (accessoires)`);
  
  let exercices = [];
  let typeSession = '';
  
  if (jour === 1) {
    // Force Lower Body
    typeSession = 'Force Lower Body';
    exercices = [
      { 
        nom: 'Back Squat', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: estDeload ? Math.max(5, volumeConfig.reps[0] + 2) : volumeConfig.reps[0], 
        poids: Math.round((user.weight * 1.2) + progressionMensuelle), 
        repos: 180 
      },
      { 
        nom: 'Deadlift', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: estDeload ? Math.max(5, volumeConfig.reps[0] + 2) : volumeConfig.reps[0], 
        poids: Math.round((user.weight * 1.3) + progressionMensuelle), 
        repos: 180 
      },
      { 
        nom: 'Front Squat', 
        series: estDeload ? 3 : 4, 
        reps: estDeload ? 8 : 6, 
        poids: Math.round(user.weight * 0.9), 
        repos: 120 
      }
    ];
  } else if (jour === 2) {
    // WOD Court
    typeSession = 'WOD Court';
    exercices = [
      { 
        nom: 'Fran', 
        series: 1, 
        reps: 1, 
        poids: 0, 
        repos: 0,
        details: '21-15-9 Thrusters + Pull-ups (For Time)'
      },
      { 
        nom: 'Grace', 
        series: 1, 
        reps: 1, 
        poids: 0, 
        repos: 0,
        details: '30 Clean & Jerk for time'
      }
    ];
  } else if (jour === 3) {
    // Haltéro + Metcon
    typeSession = 'Haltéro + Metcon';
    exercices = [
      { 
        nom: 'Snatch', 
        series: estDeload ? 4 : 6, 
        reps: estDeload ? 3 : 2, 
        poids: Math.round((user.weight * 0.6) + progressionAccessoires), 
        repos: 120 
      },
      { 
        nom: 'Clean & Jerk', 
        series: estDeload ? 4 : 6, 
        reps: estDeload ? 3 : 2, 
        poids: Math.round(user.weight * 0.7), 
        repos: 120 
      },
      { 
        nom: 'Metcon', 
        series: 1, 
        reps: 1, 
        poids: 0, 
        repos: 0,
        details: '10 min AMRAP: 10 Toes-to-Bar, 15 Wall Balls, 20 Double Unders'
      }
    ];
  } else if (jour === 4) {
    // WOD Long
    typeSession = 'WOD Long';
    exercices = [
      { 
        nom: 'Cindy', 
        series: 1, 
        reps: 1, 
        poids: 0, 
        repos: 0,
        details: '20 min AMRAP: 5 Pull-ups / 10 Push-ups / 15 Air Squats'
      },
      { 
        nom: 'Murph', 
        series: 1, 
        reps: 1, 
        poids: 0, 
        repos: 0,
        details: '1 mile run, 100 pull-ups, 200 push-ups, 300 squats, 1 mile run'
      }
    ];
  } else {
    // Force Haut + Gym
    typeSession = 'Force Haut + Gym';
    exercices = [
      { 
        nom: 'Push Press', 
        series: estDeload ? Math.max(2, Math.floor(volumeConfig.series * 0.7)) : volumeConfig.series, 
        reps: estDeload ? Math.max(5, volumeConfig.reps[0] + 2) : volumeConfig.reps[0], 
        poids: Math.round(user.weight * 0.7), 
        repos: 120 
      },
      { 
        nom: 'Handstand Push-ups', 
        series: estDeload ? 3 : 4, 
        reps: estDeload ? 5 : 8, 
        poids: 0, 
        repos: 90 
      },
      { 
        nom: 'Muscle-ups', 
        series: estDeload ? 3 : 4, 
        reps: estDeload ? 3 : 5, 
        poids: 0, 
        repos: 120 
      },
      { 
        nom: 'Toes-to-bar', 
        series: 3, 
        reps: estDeload ? 8 : 12, 
        poids: 0, 
        repos: 60 
      }
    ];
  }
  
  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`} (${typeSession})`,
    day: dayName || `Jour ${jour}`,
    exercices,
    duree: exercices.length * 20,
    notes: estDeload ? 'Semaine de récupération' : `Niveau: ${niveau}`
  };
}

// Fonctions utilitaires
const calculateSessionDuration = (exercises: Exercise[], level: string): number => {
  const baseTime = exercises.length * 15; // 15 min par exercice
  const levelMultiplier = level === 'Débutant' ? 0.8 : level === 'Intermédiaire' ? 1.0 : 1.2;
  return Math.round(baseTime * levelMultiplier);
};

const calculateIntensity = (phase: string, level: string): 'Faible' | 'Modérée' | 'Élevée' => {
  if (phase === 'adaptation') return 'Faible';
  if (phase === 'progression') return 'Modérée';
  if (phase === 'specialisation') return 'Élevée';
  return 'Modérée';
};

const generatePersonalizedNotes = (analysis: ProfileAnalysis, phase: string): string => {
  const notes = [];
  
  if (analysis.level === 'Débutant') {
    notes.push('Concentrez-vous sur la technique');
  }
  
  if (phase === 'adaptation') {
    notes.push('Phase d\'adaptation - charge légère');
  } else if (phase === 'progression') {
    notes.push('Phase de progression - augmentation progressive');
  } else {
    notes.push('Phase de spécialisation - intensité maximale');
  }
  
  if (analysis.focus.length > 0) {
    notes.push(`Focus sur: ${analysis.focus.join(', ')}`);
  }
  
  if (analysis.sportClass !== 'Classique') {
    notes.push(`Adapté pour ${analysis.sportClass}`);
  }
  
  return notes.join('. ');
};

const getRequiredEquipment = (exercises: Exercise[]): string[] => {
  const equipment = new Set<string>();
  exercises.forEach(ex => {
    ex.equipement.forEach(eq => equipment.add(eq));
  });
  return Array.from(equipment);
};

export default {
  generateProgramme,
  analyzeProfile,
  filterBySportClass,
  adaptToLevel,
  distributeExercisesByFocus,
  applyProgression,
  selectExercisesForDay,
  generateSessionName,
  generate531Progression,
  generatePanashBrutusProgram,
  generateCrossfitProgram,
  generateMarathonProgram,
  generateCalisthenicsProgram,
  generateMusculationClassiqueProgramme
};
