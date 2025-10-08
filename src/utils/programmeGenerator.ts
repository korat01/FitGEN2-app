import { UserProfile } from '../types/profile';

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
export const generateProgramme = (user: UserProfile): Programme => {
  console.log('=== GENERATE PROGRAMME ===');
  console.log('User sportClass:', user.sportClass);
  
  if (user.sportClass === 'sprint') {
    console.log('✅ Génération programme sprint');
    return generateSprintProgramme(user);
  } else if (user.sportClass === 'power' || user.sportClass === 'powerlifter') {
    console.log('✅ Génération programme powerlifting');
    return generatePowerliftingProgramme(user); // Utiliser la fonction spécifique powerlifting
  } else if (user.sportClass === 'streetlifting') {
    console.log('✅ Génération programme street lifting');
    return generateStreetLiftingProgramme(user);
  } else if (user.sportClass === 'calisthenics') {
    console.log('✅ Génération programme calisthenics');
    return generateCalisthenicsProgramme(user);
  } else if (user.sportClass === 'marathon' || user.sportClass === 'runner') {
    console.log('✅ Génération programme marathon');
    return generateMarathonProgramme(user);
  } else if (user.sportClass === 'classique' || user.sportClass === 'allround') {
    console.log('✅ Génération programme musculation classique');
    return generateMusculationClassiqueProgramme(user);
  } else if (user.sportClass === 'crossfit') {
    console.log('✅ Génération programme crossfit');
    return generateCrossfitProgramme(user);
  } else {
    console.log('❌ Classe non supportée:', user.sportClass);
    return generateMusculationClassiqueProgramme(user); // Par défaut
  }
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
function generatePowerliftingProgramme(user: UserProfile): Programme {
  console.log('=== GENERATE POWERLIFTING PROGRAMME ===');
  console.log('User:', user);
  
  const sessions = [];
  const seancesParSemaine = user.trainingDays?.length || 3;
  const duree = 4;
  const trainingDays = user.trainingDays || ['lundi', 'mercredi', 'vendredi']; // 3 séances par semaine
  
  // Récupérer les vraies performances utilisateur depuis localStorage
  const savedPerformances = localStorage.getItem('userPerformances');
  let maxSquat = 150; // Valeurs par défaut
  let maxBench = 120;
  let maxDeadlift = 180;
  
  if (savedPerformances) {
    try {
      const performancesList = JSON.parse(savedPerformances);
      console.log('📊 Performances utilisateur trouvées:', performancesList);
      
      // Debug : afficher toutes les disciplines disponibles
      console.log('🔍 Disciplines disponibles:', performancesList.map((p: any) => p.discipline));
      
      // Chercher les MEILLEURES performances pour chaque discipline
      const squatPerformances = performancesList.filter((p: any) => 
        p.discipline?.toLowerCase().includes('squat')
      );
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
      
      // Prendre la MEILLEURE performance (valeur maximale)
      if (squatPerformances.length > 0) {
        maxSquat = Math.max(...squatPerformances.map((p: any) => p.value || 0));
      }
      if (benchPerformances.length > 0) {
        maxBench = Math.max(...benchPerformances.map((p: any) => p.value || 0));
      }
      if (deadliftPerformances.length > 0) {
        maxDeadlift = Math.max(...deadliftPerformances.map((p: any) => p.value || 0));
      }
      
      console.log('🏋️ 1RM utilisateur:', { maxSquat, maxBench, maxDeadlift });
    } catch (error) {
      console.error('❌ Erreur lors du chargement des performances:', error);
    }
  } else {
    console.log('⚠️ Aucune performance trouvée, utilisation des valeurs par défaut');
  }
  
  console.log('Charges max calculées:', { maxSquat, maxBench, maxDeadlift });
  
  for (let semaine = 1; semaine <= duree; semaine++) {
    for (let jour = 0; jour < trainingDays.length; jour++) {
      // Échange mardi (jour 2) et vendredi (jour 4) AU NIVEAU CONTENU en conservant les labels de jour
      const logicalJour = (jour + 1 === 2) ? 4 : (jour + 1 === 4 ? 2 : jour + 1);
      const session = createPowerliftingSession(
        semaine,
        logicalJour,
        user,
        maxSquat,
        maxBench,
        maxDeadlift,
        trainingDays[jour]
      );
      sessions.push(session);
      console.log(`Session Powerlifting créée: ${semaine}-${logicalJour} (${trainingDays[jour]})`);
    }
  }
  
  const programme: Programme = {
    id: Date.now().toString(),
    nom: `Programme Powerlifting - Basé sur vos 1RM`,
    description: 'Programme d\'entraînement Powerlifting avec progression 5-3-1 basé sur vos performances réelles',
    duree,
    sessions,
    phases: { adaptation: [], progression: [], specialisation: [] },
    progression: { totalSessions: sessions.length, sessionsParSemaine: seancesParSemaine, dureeMoyenne: 90 }
  };
  
  console.log('Programme Powerlifting final:', programme);
  console.log('Nombre de sessions:', programme.sessions.length);
  
  return programme;
}

function createPowerliftingSession(semaine: number, jour: number, user: UserProfile, maxSquat: number, maxBench: number, maxDeadlift: number, dayName?: string) {
  const estDeload = semaine === 4;
  const semaineDansCycle = ((semaine - 1) % 4) + 1;
  const cycle = Math.ceil(semaine / 4);
  
  // Vérifier si c'est un utilisateur expert
  const isExpert = user.niveau === 'expert' || user.niveau === 'avance' || 
                   user.generalLevel === 'Expert' || user.generalLevel === 'Avancé' ||
                   user.level === 'expert' || user.level === 'avance';
  const trainingDays = user.trainingDays?.length || 4;
  
  console.log(`🔄 Cycle ${cycle}, Semaine ${semaineDansCycle} - Expert: ${isExpert}, Niveau: ${user.niveau}, GeneralLevel: ${user.generalLevel}, Level: ${user.level}, Jours: ${trainingDays}`);
  
  // Training Max (TM) = 90% du 1RM + progression du cycle
  const progressionCycle = (cycle - 1) * 2.5; // +2.5kg par cycle pour haut du corps
  const progressionCycleBas = (cycle - 1) * 5; // +5kg par cycle pour bas du corps
  
  const tmSquat = Math.round((maxSquat * 0.9) + progressionCycleBas);
  const tmBench = Math.round((maxBench * 0.9) + progressionCycle);
  const tmDeadlift = Math.round((maxDeadlift * 0.9) + progressionCycleBas);
  
  let exercices = [];
  
  if (isExpert) {
    // SYSTÈME EXPERT : Programme de base + exercice SBD supplémentaire
    exercices = createClassic531Session(semaineDansCycle, jour, tmSquat, tmBench, tmDeadlift, estDeload, user);
    
    // Ajouter un exercice SBD supplémentaire selon le jour
    const exerciceSupplementaire = getAdditionalSBDExercise(jour, tmSquat, tmBench, tmDeadlift, semaineDansCycle, estDeload);
    if (exerciceSupplementaire) {
      exercices.push(exerciceSupplementaire);
      console.log(`✅ Exercice expert ajouté: ${exerciceSupplementaire.nom} - ${exerciceSupplementaire.series}x${exerciceSupplementaire.reps} @ ${exerciceSupplementaire.poids}kg`);
    }
  } else {
    // SYSTÈME CLASSIQUE 5/3/1 pour débutants/intermédiaires
    exercices = createClassic531Session(semaineDansCycle, jour, tmSquat, tmBench, tmDeadlift, estDeload, user);
  }
  
  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - ${dayName || `Jour ${jour}`}`,
    day: dayName || `Jour ${jour}`,
    phase: estDeload ? 'Deload' : (semaineDansCycle === 1 ? 'Adaptation' : (semaineDansCycle === 2 ? 'Progression' : 'Spécialisation')),
    intensity: estDeload ? 'Faible' : (semaineDansCycle === 1 ? 'Modérée' : (semaineDansCycle === 2 ? 'Élevée' : 'Maximale')),
    duration: exercices.length * 12,
    exercises: exercices,
    notes: estDeload ? 'Semaine de récupération active' : `Programme ${isExpert ? 'Expert Modulable' : '5/3/1'} - Cycle ${cycle}`,
    equipment: ['Barre', 'Disques', 'Rack', 'Haltères']
  };
}

// Fonction pour ajouter un exercice SBD supplémentaire pour les experts
function getAdditionalSBDExercise(jour: number, tmSquat: number, tmBench: number, tmDeadlift: number, semaineDansCycle: number, estDeload: boolean) {
  // Calculer les pourcentages pour l'exercice supplémentaire
  let pourcentageSupplementaire;
  if (estDeload) {
    pourcentageSupplementaire = 0.5; // 50% pour deload
  } else if (semaineDansCycle === 1) {
    pourcentageSupplementaire = 0.6; // 60% pour semaine 1
  } else if (semaineDansCycle === 2) {
    pourcentageSupplementaire = 0.65; // 65% pour semaine 2
  } else {
    pourcentageSupplementaire = 0.7; // 70% pour semaine 3
  }
  
  // Ajouter un exercice SBD différent selon le jour
  if (jour === 1) {
    // Jour Squat : ajouter Deadlift léger
    return {
      nom: 'Soulevé de Terre',
      series: 3,
      reps: 5,
      poids: Math.round(tmDeadlift * pourcentageSupplementaire),
      repos: '2-3 min'
    };
  } else if (jour === 2) {
    // Jour Bench : ajouter Squat léger
    return {
      nom: 'Squat',
      series: 3,
      reps: 5,
      poids: Math.round(tmSquat * pourcentageSupplementaire),
      repos: '2-3 min'
    };
  } else if (jour === 3) {
    // Jour Deadlift : ajouter Bench léger
    return {
      nom: 'Développé Couché',
      series: 3,
      reps: 5,
      poids: Math.round(tmBench * pourcentageSupplementaire),
      repos: '2-3 min'
    };
  } else if (jour === 4) {
    // Jour Press : ajouter Squat léger
    return {
      nom: 'Squat',
      series: 3,
      reps: 5,
      poids: Math.round(tmSquat * pourcentageSupplementaire),
      repos: '2-3 min'
    };
  }
  
  return null;
}

// SYSTÈME EXPERT MODULABLE - Dual SBD Adaptatif (ANCIEN - GARDÉ POUR RÉFÉRENCE)
function createExpertPowerliftingSession(semaineDansCycle: number, jour: number, trainingDays: number, tmSquat: number, tmBench: number, tmDeadlift: number, estDeload: boolean, user: UserProfile) {
  let exercices = [];
  
  // Calculer les pourcentages selon la semaine
  let hardPercent, modPercent;
  if (estDeload) {
    hardPercent = [0.75, 0.8, 0.85];
    modPercent = [0.6, 0.65, 0.7];
  } else if (semaineDansCycle === 1) {
    hardPercent = [0.8, 0.85, 0.85];
    modPercent = [0.65, 0.7, 0.7];
  } else if (semaineDansCycle === 2) {
    hardPercent = [0.85, 0.875, 0.875];
    modPercent = [0.7, 0.725, 0.725];
  } else {
    hardPercent = [0.875, 0.9, 0.9];
    modPercent = [0.725, 0.75, 0.75];
  }
  
  if (trainingDays === 3) {
    // 3 JOURS - SBD Rotation
    if (jour === 1) {
      exercices = [
        { nom: 'Squat', series: 5, reps: 3, poids: Math.round(tmSquat * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Squat', series: 1, reps: 3, poids: Math.round(tmSquat * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Squat', series: 1, reps: 3, poids: Math.round(tmSquat * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 4, reps: 6, poids: Math.round(tmBench * modPercent[0]), repos: '2-3 min' },
        { nom: 'Extensions Triceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1.5 min' },
        { nom: 'Curls Biceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1 min' }
      ];
    } else if (jour === 2) {
      exercices = [
        { nom: 'Soulevé de Terre', series: 4, reps: 3, poids: Math.round(tmDeadlift * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 3, poids: Math.round(tmDeadlift * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 3, poids: Math.round(tmDeadlift * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 3, reps: 8, poids: Math.round(tmBench * modPercent[0]), repos: '2-3 min' },
        { nom: 'Rowing Barre', series: 3, reps: 8, poids: Math.round(tmDeadlift * 0.5), repos: '2 min' },
        { nom: 'Shrugs Barre', series: 3, reps: 12, poids: Math.round(tmDeadlift * 0.4), repos: '1.5 min' }
      ];
    } else if (jour === 3) {
      exercices = [
        { nom: 'Squat', series: 4, reps: 5, poids: Math.round(tmSquat * modPercent[0]), repos: '2-3 min' },
        { nom: 'Squat', series: 1, reps: 5, poids: Math.round(tmSquat * modPercent[1]), repos: '2-3 min' },
        { nom: 'Soulevé de Terre', series: 3, reps: 5, poids: Math.round(tmDeadlift * modPercent[0]), repos: '2-3 min' },
        { nom: 'Fentes lestées', series: 3, reps: 8, poids: Math.round(tmSquat * 0.15), repos: '2 min' },
        { nom: 'Presse à Jambes', series: 3, reps: 12, poids: Math.round(tmSquat * 1.2), repos: '2 min' },
        { nom: 'Face Pulls', series: 3, reps: 15, poids: Math.round(tmBench * 0.1), repos: '1 min' }
      ];
    }
  } else if (trainingDays === 4) {
    // 4 JOURS - Upper/Lower Alterné
    if (jour === 1) {
      exercices = [
        { nom: 'Squat', series: 5, reps: 3, poids: Math.round(tmSquat * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Squat', series: 1, reps: 3, poids: Math.round(tmSquat * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Squat', series: 1, reps: 3, poids: Math.round(tmSquat * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 4, reps: 6, poids: Math.round(tmBench * modPercent[0]), repos: '2-3 min' },
        { nom: 'Fentes lestées', series: 3, reps: 8, poids: Math.round(tmSquat * 0.15), repos: '2 min' },
        { nom: 'Presse à Jambes', series: 3, reps: 12, poids: Math.round(tmSquat * 1.2), repos: '2 min' }
      ];
    } else if (jour === 2) {
      exercices = [
        { nom: 'Développé Couché', series: 5, reps: 3, poids: Math.round(tmBench * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 1, reps: 3, poids: Math.round(tmBench * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 1, reps: 3, poids: Math.round(tmBench * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 3, reps: 5, poids: Math.round(tmDeadlift * modPercent[0]), repos: '2-3 min' },
        { nom: 'Développé Incliné', series: 3, reps: 8, poids: Math.round(tmBench * 0.6), repos: '2 min' },
        { nom: 'Extensions Triceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1.5 min' }
      ];
    } else if (jour === 3) {
      exercices = [
        { nom: 'Soulevé de Terre', series: 4, reps: 3, poids: Math.round(tmDeadlift * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 3, poids: Math.round(tmDeadlift * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 3, poids: Math.round(tmDeadlift * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Squat', series: 3, reps: 5, poids: Math.round(tmSquat * modPercent[0]), repos: '2-3 min' },
        { nom: 'Rowing Barre', series: 3, reps: 8, poids: Math.round(tmDeadlift * 0.5), repos: '2 min' },
        { nom: 'Tractions Assistées', series: 3, reps: 8, poids: Math.round(user.weight * 0.3), repos: '2 min' }
      ];
    } else if (jour === 4) {
      exercices = [
        { nom: 'Développé Couché', series: 4, reps: 5, poids: Math.round(tmBench * modPercent[0]), repos: '2-3 min' },
        { nom: 'Développé Couché', series: 1, reps: 5, poids: Math.round(tmBench * modPercent[1]), repos: '2-3 min' },
        { nom: 'Squat', series: 3, reps: 5, poids: Math.round(tmSquat * modPercent[0]), repos: '2-3 min' },
        { nom: 'Curls Biceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1 min' },
        { nom: 'Face Pulls', series: 3, reps: 15, poids: Math.round(tmBench * 0.1), repos: '1 min' },
        { nom: 'Shrugs Barre', series: 3, reps: 12, poids: Math.round(tmDeadlift * 0.4), repos: '1.5 min' }
      ];
    }
  } else if (trainingDays === 5) {
    // 5 JOURS - Dual SBD Standard Compétiteur
    if (jour === 1) {
      exercices = [
        { nom: 'Squat', series: 5, reps: 3, poids: Math.round(tmSquat * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Squat', series: 1, reps: 3, poids: Math.round(tmSquat * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Squat', series: 1, reps: 3, poids: Math.round(tmSquat * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 4, reps: 6, poids: Math.round(tmBench * modPercent[0]), repos: '2-3 min' },
        { nom: 'Fentes lestées', series: 3, reps: 8, poids: Math.round(tmSquat * 0.15), repos: '2 min' },
        { nom: 'Presse à Jambes', series: 3, reps: 12, poids: Math.round(tmSquat * 1.2), repos: '2 min' }
      ];
    } else if (jour === 2) {
      exercices = [
        { nom: 'Soulevé de Terre', series: 4, reps: 3, poids: Math.round(tmDeadlift * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 3, poids: Math.round(tmDeadlift * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 3, poids: Math.round(tmDeadlift * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Squat', series: 3, reps: 5, poids: Math.round(tmSquat * modPercent[0]), repos: '2-3 min' },
        { nom: 'Rowing Barre', series: 3, reps: 8, poids: Math.round(tmDeadlift * 0.5), repos: '2 min' },
        { nom: 'Shrugs Barre', series: 3, reps: 12, poids: Math.round(tmDeadlift * 0.4), repos: '1.5 min' }
      ];
    } else if (jour === 3) {
      exercices = [
        { nom: 'Développé Couché', series: 5, reps: 4, poids: Math.round(tmBench * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 1, reps: 4, poids: Math.round(tmBench * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 1, reps: 4, poids: Math.round(tmBench * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 3, reps: 5, poids: Math.round(tmDeadlift * modPercent[0]), repos: '2-3 min' },
        { nom: 'Développé Incliné', series: 3, reps: 8, poids: Math.round(tmBench * 0.6), repos: '2 min' },
        { nom: 'Extensions Triceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1.5 min' }
      ];
    } else if (jour === 4) {
      exercices = [
        { nom: 'Squat', series: 4, reps: 5, poids: Math.round(tmSquat * modPercent[0]), repos: '2-3 min' },
        { nom: 'Squat', series: 1, reps: 5, poids: Math.round(tmSquat * modPercent[1]), repos: '2-3 min' },
        { nom: 'Développé Couché', series: 5, reps: 3, poids: Math.round(tmBench * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 1, reps: 3, poids: Math.round(tmBench * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Curls Biceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1 min' },
        { nom: 'Face Pulls', series: 3, reps: 15, poids: Math.round(tmBench * 0.1), repos: '1 min' }
      ];
    } else if (jour === 5) {
      exercices = [
        { nom: 'Soulevé de Terre', series: 4, reps: 5, poids: Math.round(tmDeadlift * modPercent[0]), repos: '2-3 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 5, poids: Math.round(tmDeadlift * modPercent[1]), repos: '2-3 min' },
        { nom: 'Squat', series: 3, reps: 5, poids: Math.round(tmSquat * modPercent[0]), repos: '2-3 min' },
        { nom: 'Tractions Assistées', series: 3, reps: 8, poids: Math.round(user.weight * 0.3), repos: '2 min' },
        { nom: 'Extensions de Jambes', series: 3, reps: 15, poids: Math.round(tmSquat * 0.4), repos: '1.5 min' },
        { nom: 'Shrugs Barre', series: 3, reps: 12, poids: Math.round(tmDeadlift * 0.4), repos: '1.5 min' }
      ];
    }
  } else if (trainingDays === 6) {
    // 6 JOURS - Haute Fréquence Élite
    if (jour === 1) {
      exercices = [
        { nom: 'Squat', series: 5, reps: 3, poids: Math.round(tmSquat * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Squat', series: 1, reps: 3, poids: Math.round(tmSquat * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Squat', series: 1, reps: 3, poids: Math.round(tmSquat * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 4, reps: 6, poids: Math.round(tmBench * modPercent[0]), repos: '2-3 min' },
        { nom: 'Fentes lestées', series: 3, reps: 8, poids: Math.round(tmSquat * 0.15), repos: '2 min' },
        { nom: 'Presse à Jambes', series: 3, reps: 12, poids: Math.round(tmSquat * 1.2), repos: '2 min' }
      ];
    } else if (jour === 2) {
      exercices = [
        { nom: 'Soulevé de Terre', series: 4, reps: 5, poids: Math.round(tmDeadlift * modPercent[0]), repos: '2-3 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 5, poids: Math.round(tmDeadlift * modPercent[1]), repos: '2-3 min' },
        { nom: 'Squat', series: 3, reps: 5, poids: Math.round(tmSquat * modPercent[0]), repos: '2-3 min' },
        { nom: 'Rowing Barre', series: 3, reps: 8, poids: Math.round(tmDeadlift * 0.5), repos: '2 min' },
        { nom: 'Face Pulls', series: 3, reps: 15, poids: Math.round(tmBench * 0.1), repos: '1 min' }
      ];
    } else if (jour === 3) {
      exercices = [
        { nom: 'Développé Couché', series: 5, reps: 4, poids: Math.round(tmBench * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 1, reps: 4, poids: Math.round(tmBench * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 1, reps: 4, poids: Math.round(tmBench * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 3, reps: 5, poids: Math.round(tmDeadlift * modPercent[0]), repos: '2-3 min' },
        { nom: 'Développé Incliné', series: 3, reps: 8, poids: Math.round(tmBench * 0.6), repos: '2 min' },
        { nom: 'Extensions Triceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1.5 min' }
      ];
    } else if (jour === 4) {
      // Jour de mobilité/préparation nerveuse
      exercices = [
        { nom: 'Mobilité Épaules', series: 3, reps: '10 min', poids: 'Corps', repos: '1 min' },
        { nom: 'Étirements Dynamiques', series: 2, reps: '15 min', poids: 'Corps', repos: '1 min' },
        { nom: 'Cardio Léger', series: 1, reps: '20 min', poids: 'Corps', repos: '1 min' }
      ];
    } else if (jour === 5) {
      exercices = [
        { nom: 'Squat', series: 4, reps: 5, poids: Math.round(tmSquat * modPercent[0]), repos: '2-3 min' },
        { nom: 'Squat', series: 1, reps: 5, poids: Math.round(tmSquat * modPercent[1]), repos: '2-3 min' },
        { nom: 'Développé Couché', series: 5, reps: 3, poids: Math.round(tmBench * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 1, reps: 3, poids: Math.round(tmBench * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Curls Biceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1 min' },
        { nom: 'Face Pulls', series: 3, reps: 15, poids: Math.round(tmBench * 0.1), repos: '1 min' }
      ];
    } else if (jour === 6) {
      exercices = [
        { nom: 'Soulevé de Terre', series: 4, reps: 3, poids: Math.round(tmDeadlift * hardPercent[0]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 3, poids: Math.round(tmDeadlift * hardPercent[1]), repos: '3-4 min' },
        { nom: 'Soulevé de Terre', series: 1, reps: 3, poids: Math.round(tmDeadlift * hardPercent[2]), repos: '3-4 min' },
        { nom: 'Développé Couché', series: 3, reps: 6, poids: Math.round(tmBench * modPercent[0]), repos: '2-3 min' },
        { nom: 'Tractions Assistées', series: 3, reps: 8, poids: Math.round(user.weight * 0.3), repos: '2 min' },
        { nom: 'Shrugs Barre', series: 3, reps: 12, poids: Math.round(tmDeadlift * 0.4), repos: '1.5 min' }
      ];
    }
  }
  
  return exercices;
}

// SYSTÈME CLASSIQUE 5/3/1 pour débutants/intermédiaires
function createClassic531Session(semaineDansCycle: number, jour: number, tmSquat: number, tmBench: number, tmDeadlift: number, estDeload: boolean, user: UserProfile) {
  let exercices = [];
  
  // Système 5/3/1 classique
  if (jour === 1) {
    // Jour 1 : Squat
    let seriesPrincipales, repsPrincipales, pourcentages;
    
    if (estDeload) {
      seriesPrincipales = 3;
      repsPrincipales = 5;
      pourcentages = [0.4, 0.5, 0.6];
    } else if (semaineDansCycle === 1) {
      seriesPrincipales = 3;
      repsPrincipales = 5;
      pourcentages = [0.65, 0.75, 0.85];
    } else if (semaineDansCycle === 2) {
      seriesPrincipales = 3;
      repsPrincipales = 3;
      pourcentages = [0.7, 0.8, 0.9];
    } else {
      seriesPrincipales = 3;
      repsPrincipales = 1;
      pourcentages = [0.75, 0.85, 0.95];
    }
    
    exercices = [
      { nom: 'Squat', series: seriesPrincipales, reps: repsPrincipales, poids: Math.round(tmSquat * pourcentages[0]), repos: '3-4 min' },
      { nom: 'Squat', series: 1, reps: repsPrincipales === 1 ? '1+' : repsPrincipales, poids: Math.round(tmSquat * pourcentages[1]), repos: '3-4 min' },
      { nom: 'Squat', series: 1, reps: repsPrincipales === 1 ? '1+' : repsPrincipales, poids: Math.round(tmSquat * pourcentages[2]), repos: '3-4 min' },
      { nom: 'Fentes lestées', series: 3, reps: 8, poids: Math.round(tmSquat * 0.15), repos: '2 min' },
      { nom: 'Presse à Jambes', series: 3, reps: 12, poids: Math.round(tmSquat * 1.2), repos: '2 min' },
      { nom: 'Extensions de Jambes', series: 3, reps: 15, poids: Math.round(tmSquat * 0.4), repos: '1.5 min' }
    ];
  } else if (jour === 2) {
    // Jour 2 : Bench Press
    let seriesPrincipales, repsPrincipales, pourcentages;
    
    if (estDeload) {
      seriesPrincipales = 3;
      repsPrincipales = 5;
      pourcentages = [0.4, 0.5, 0.6];
    } else if (semaineDansCycle === 1) {
      seriesPrincipales = 3;
      repsPrincipales = 5;
      pourcentages = [0.65, 0.75, 0.85];
    } else if (semaineDansCycle === 2) {
      seriesPrincipales = 3;
      repsPrincipales = 3;
      pourcentages = [0.7, 0.8, 0.9];
    } else {
      seriesPrincipales = 3;
      repsPrincipales = 1;
      pourcentages = [0.75, 0.85, 0.95];
    }
    
    exercices = [
      { nom: 'Développé Couché', series: seriesPrincipales, reps: repsPrincipales, poids: Math.round(tmBench * pourcentages[0]), repos: '3-4 min' },
      { nom: 'Développé Couché', series: 1, reps: repsPrincipales === 1 ? '1+' : repsPrincipales, poids: Math.round(tmBench * pourcentages[1]), repos: '3-4 min' },
      { nom: 'Développé Couché', series: 1, reps: repsPrincipales === 1 ? '1+' : repsPrincipales, poids: Math.round(tmBench * pourcentages[2]), repos: '3-4 min' },
      { nom: 'Développé Incliné', series: 3, reps: 8, poids: Math.round(tmBench * 0.6), repos: '2 min' },
      { nom: 'Extensions Triceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1.5 min' },
      { nom: 'Curls Biceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1 min' }
    ];
  } else if (jour === 3) {
    // Jour 3 : Deadlift
    let seriesPrincipales, repsPrincipales, pourcentages;
    
    if (estDeload) {
      seriesPrincipales = 3;
      repsPrincipales = 5;
      pourcentages = [0.4, 0.5, 0.6];
    } else if (semaineDansCycle === 1) {
      seriesPrincipales = 3;
      repsPrincipales = 5;
      pourcentages = [0.65, 0.75, 0.85];
    } else if (semaineDansCycle === 2) {
      seriesPrincipales = 3;
      repsPrincipales = 3;
      pourcentages = [0.7, 0.8, 0.9];
    } else {
      seriesPrincipales = 3;
      repsPrincipales = 1;
      pourcentages = [0.75, 0.85, 0.95];
    }
    
    exercices = [
      { nom: 'Soulevé de Terre', series: seriesPrincipales, reps: repsPrincipales, poids: Math.round(tmDeadlift * pourcentages[0]), repos: '3-4 min' },
      { nom: 'Soulevé de Terre', series: 1, reps: repsPrincipales === 1 ? '1+' : repsPrincipales, poids: Math.round(tmDeadlift * pourcentages[1]), repos: '3-4 min' },
      { nom: 'Soulevé de Terre', series: 1, reps: repsPrincipales === 1 ? '1+' : repsPrincipales, poids: Math.round(tmDeadlift * pourcentages[2]), repos: '3-4 min' },
      { nom: 'Rowing Barre', series: 3, reps: 8, poids: Math.round(tmDeadlift * 0.5), repos: '2 min' },
      { nom: 'Tractions Assistées', series: 3, reps: 8, poids: Math.round(user.weight * 0.3), repos: '2 min' },
      { nom: 'Shrugs Barre', series: 3, reps: 12, poids: Math.round(tmDeadlift * 0.4), repos: '1.5 min' }
    ];
  } else if (jour === 4) {
    // Jour 4 : Overhead Press
    let seriesPrincipales, repsPrincipales, pourcentages;
    const tmPress = Math.round(tmBench * 0.7);
    
    if (estDeload) {
      seriesPrincipales = 3;
      repsPrincipales = 5;
      pourcentages = [0.4, 0.5, 0.6];
    } else if (semaineDansCycle === 1) {
      seriesPrincipales = 3;
      repsPrincipales = 5;
      pourcentages = [0.65, 0.75, 0.85];
    } else if (semaineDansCycle === 2) {
      seriesPrincipales = 3;
      repsPrincipales = 3;
      pourcentages = [0.7, 0.8, 0.9];
    } else {
      seriesPrincipales = 3;
      repsPrincipales = 1;
      pourcentages = [0.75, 0.85, 0.95];
    }
    
    exercices = [
      { nom: 'Développé Militaire', series: seriesPrincipales, reps: repsPrincipales, poids: Math.round(tmPress * pourcentages[0]), repos: '3-4 min' },
      { nom: 'Développé Militaire', series: 1, reps: repsPrincipales === 1 ? '1+' : repsPrincipales, poids: Math.round(tmPress * pourcentages[1]), repos: '3-4 min' },
      { nom: 'Développé Militaire', series: 1, reps: repsPrincipales === 1 ? '1+' : repsPrincipales, poids: Math.round(tmPress * pourcentages[2]), repos: '3-4 min' },
      { nom: 'Développé Incliné', series: 3, reps: 8, poids: Math.round(tmBench * 0.6), repos: '2 min' },
      { nom: 'Extensions Triceps', series: 3, reps: 15, poids: Math.round(tmBench * 0.15), repos: '1.5 min' },
      { nom: 'Face Pulls', series: 3, reps: 15, poids: Math.round(tmPress * 0.1), repos: '1 min' }
    ];
  }
  
  return exercices;
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
