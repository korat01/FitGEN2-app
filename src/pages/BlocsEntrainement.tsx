import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dumbbell, 
  Target, 
  Clock, 
  AlertTriangle, 
  Star, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  RotateCcw,
  Heart,
  Zap,
  Shield,
  Activity,
  TrendingUp,
  Users,
  BookOpen,
  Timer
} from 'lucide-react';

const BlocsEntrainement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [selectedDifficulty, setSelectedDifficulty] = useState('tous');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedSBD, setSelectedSBD] = useState('tous');

  // Base de données des exercices de musculation (ajout de l'annotation SBD)
  const exercisesDatabase = [
    // EXERCICES - HAUT DU CORPS
    {
      id: 1,
      name: 'Développé couché ⭐',
      category: 'haut-corps',
      difficulty: 'intermediaire',
      calories: 10,
      duration: 45,
      rating: 4.8,
      image: '💪',
      muscleGroups: ['Pectoraux', 'Deltoïdes antérieurs', 'Triceps'],
      equipment: ['Banc plat', 'Barre', 'Disques'],
      instructions: [
        'Allongez-vous sur le banc',
        'Saisissez la barre avec une prise légèrement plus large que les épaules',
        'Descendez la barre jusqu\'à toucher la poitrine',
        'Poussez la barre vers le haut en contractant les pectoraux'
      ],
      tips: [
        'Gardez les pieds bien ancrés au sol',
        'Maintenez une légère cambrure naturelle',
        'Contrôlez la descente sur 2-3 secondes'
      ],
      warnings: [
        'Ne pas décoller les épaules du banc',
        'Éviter les rebonds sur la poitrine'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures au poignet'
      ]
    },
    {
      id: 2,
      name: 'Tractions ⭐',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 8,
      duration: 30,
      rating: 4.6,
      image: '🏋️',
      muscleGroups: ['Dorsaux', 'Biceps', 'Deltoïdes postérieurs'],
      equipment: ['Barre de traction'],
      instructions: [
        'Suspendez-vous à la barre',
        'Tirez votre corps vers le haut',
        'Passez le menton au-dessus de la barre',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez le corps droit',
        'Contractez les omoplates',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas se balancer',
        'Éviter les mouvements saccadés'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures au dos'
      ]
    },
    {
      id: 3,
      name: 'Dips ⭐',
      category: 'haut-corps',
      difficulty: 'intermediaire',
      calories: 9,
      duration: 35,
      rating: 4.7,
      image: '💥',
      muscleGroups: ['Triceps', 'Pectoraux inférieurs', 'Deltoïdes antérieurs'],
      equipment: ['Barres parallèles'],
      instructions: [
        'Saisissez les barres parallèles',
        'Descendez en fléchissant les bras',
        'Poussez vers le haut en contractant les triceps',
        'Maintenez le corps droit'
      ],
      tips: [
        'Gardez les coudes près du corps',
        'Contrôlez la descente',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas descendre trop bas',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures au coude'
      ]
    },
    {
      id: 4,
      name: 'Curl biceps ⭐',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 6,
      duration: 25,
      rating: 4.5,
      image: '💪',
      muscleGroups: ['Biceps', 'Avant-bras'],
      equipment: ['Haltères'],
      instructions: [
        'Tenez les haltères en position debout',
        'Fléchissez les bras en contractant les biceps',
        'Descendez de manière contrôlée',
        'Maintenez les coudes près du corps'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas utiliser l\'élan',
        'Éviter les mouvements saccadés'
      ],
      contraindications: [
        'Blessures au coude',
        'Problèmes de poignet'
      ]
    },
    {
      id: 5,
      name: 'Rowing barre ⭐',
      category: 'haut-corps',
      difficulty: 'intermediaire',
      calories: 9,
      duration: 40,
      rating: 4.7,
      image: '🚣',
      muscleGroups: ['Dorsaux', 'Rhomboides', 'Deltoïdes postérieurs', 'Biceps'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Penchez-vous vers l\'avant',
        'Tirez la barre vers le bas du torse',
        'Contractez les omoplates',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de la traction'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    // EXERCICES - BAS DU CORPS
    {
      id: 6,
      name: 'Squats ⭐',
      category: 'bas-corps',
      difficulty: 'debutant',
      calories: 12,
      duration: 35,
      rating: 4.8,
      image: '️‍♀️',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Ischio-jambiers', 'Mollets'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Placez la barre sur les trapèzes',
        'Descendez en fléchissant les genoux',
        'Remontez en contractant les fessiers',
        'Maintenez le dos droit'
      ],
      tips: [
        'Gardez les pieds écartés de la largeur des épaules',
        'Contrôlez la descente',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les genoux qui rentrent vers l\'intérieur'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de dos'
      ]
    },
    {
      id: 7,
      name: 'Fentes ⭐',
      category: 'bas-corps',
      difficulty: 'debutant',
      calories: 8,
      duration: 30,
      rating: 4.6,
      image: '🚶',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
      equipment: ['Aucun'],
      instructions: [
        'Faites un grand pas en avant',
        'Descendez jusqu\'à ce que le genou arrière touche presque le sol',
        'Remontez en contractant les fessiers',
        'Alternez les jambes'
      ],
      tips: [
        'Gardez le torse droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas laisser le genou dépasser les orteils',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    {
      id: 8,
      name: 'Soulevé de terre ⭐',
      category: 'bas-corps',
      difficulty: 'avance',
      calories: 15,
      duration: 50,
      rating: 4.9,
      image: '️‍♂️',
      muscleGroups: ['Fessiers', 'Ischio-jambiers', 'Dorsaux', 'Trapèzes', 'Core'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Placez la barre au sol devant vous',
        'Saisissez la barre avec une prise en pronation',
        'Redressez-vous en contractant les fessiers',
        'Descendez de manière contrôlée'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de genou'
      ]
    },
    {
      id: 9,
      name: 'Hip Thrust ⭐',
      category: 'bas-corps',
      difficulty: 'intermediaire',
      calories: 7,
      duration: 30,
      rating: 4.7,
      image: '🍑',
      muscleGroups: ['Fessiers', 'Ischio-jambiers', 'Core'],
      equipment: ['Banc', 'Barre', 'Disques'],
      instructions: [
        'Asseyez-vous au sol avec le dos contre le banc',
        'Placez la barre sur les hanches',
        'Poussez les hanches vers le haut',
        'Contractez les fessiers en haut'
      ],
      tips: [
        'Gardez le menton rentré',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas hyperextendre le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de hanche'
      ]
    },
    {
      id: 10,
      name: 'Mollets debout',
      category: 'bas-corps',
      difficulty: 'debutant',
      calories: 5,
      duration: 20,
      rating: 4.4,
      image: '🦵',
      muscleGroups: ['Mollets'],
      equipment: ['Machine à mollets'],
      instructions: [
        'Placez-vous sur la machine',
        'Montez sur la pointe des pieds',
        'Descendez de manière contrôlée',
        'Répétez le mouvement'
      ],
      tips: [
        'Gardez les genoux légèrement fléchis',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas utiliser l\'élan',
        'Éviter les mouvements saccadés'
      ],
      contraindications: [
        'Problèmes de cheville',
        'Blessures de mollet'
      ]
    },
    // EXERCICES - CORE
    {
      id: 11,
      name: 'Planche ⭐',
      category: 'core',
      difficulty: 'debutant',
      calories: 6,
      duration: 30,
      rating: 4.6,
      image: '🛡️',
      muscleGroups: ['Abdominaux', 'Obliques', 'Deltoïdes', 'Fessiers'],
      equipment: ['Aucun'],
      instructions: [
        'Placez-vous en position de pompe',
        'Maintenez la position sur les avant-bras',
        'Gardez le corps droit',
        'Contractez les abdominaux'
      ],
      tips: [
        'Gardez le menton rentré',
        'Maintenez la position',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter de retenir la respiration'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 12,
      name: 'Crunchs ⭐',
      category: 'core',
      difficulty: 'debutant',
      calories: 4,
      duration: 20,
      rating: 4.3,
      image: '💪',
      muscleGroups: ['Abdominaux'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Fléchissez les genoux',
        'Relevez le torse vers les genoux',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas tirer sur la nuque',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de cou'
      ]
    },
    {
      id: 13,
      name: 'Mountain Climbers ⭐',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 8,
      duration: 25,
      rating: 4.5,
      image: '🏔️',
      muscleGroups: ['Abdominaux', 'Obliques', 'Deltoïdes', 'Fessiers'],
      equipment: ['Aucun'],
      instructions: [
        'Placez-vous en position de pompe',
        'Alternez rapidement les genoux vers la poitrine',
        'Maintenez le corps droit',
        'Contractez les abdominaux'
      ],
      tips: [
        'Gardez le menton rentré',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 14,
      name: 'Russian Twists',
      category: 'core',
      difficulty: 'debutant',
      calories: 5,
      duration: 25,
      rating: 4.4,
      image: '🌪️',
      muscleGroups: ['Obliques', 'Abdominaux'],
      equipment: ['Aucun'],
      instructions: [
        'Asseyez-vous avec les genoux fléchis',
        'Penchez-vous légèrement en arrière',
        'Tournez le torse de gauche à droite',
        'Contractez les obliques'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de cou'
      ]
    },
    {
      id: 15,
      name: 'Dead Bug',
      category: 'core',
      difficulty: 'debutant',
      calories: 4,
      duration: 20,
      rating: 4.3,
      image: '🐛',
      muscleGroups: ['Abdominaux', 'Obliques', 'Hip Flexors'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Levez les bras et les genoux à 90°',
        'Descendez lentement un bras et une jambe opposés',
        'Remontez et alternez'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de hanche'
      ]
    },
    // EXERCICES - CARDIO
    {
      id: 16,
      name: 'Burpees ⭐',
      category: 'cardio',
      difficulty: 'intermediaire',
      calories: 15,
      duration: 30,
      rating: 4.7,
      image: '💥',
      muscleGroups: ['Tout le corps'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez debout',
        'Descendez en position de pompe',
        'Faites une pompe',
        'Remontez et sautez'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de cœur',
        'Blessures de genou'
      ]
    },
    {
      id: 17,
      name: 'Jumping Jacks ⭐',
      category: 'cardio',
      difficulty: 'debutant',
      calories: 8,
      duration: 20,
      rating: 4.4,
      image: '🤸',
      muscleGroups: ['Tout le corps'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez debout',
        'Sautez en écartant les jambes',
        'Levez les bras au-dessus de la tête',
        'Revenez à la position de départ'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de cœur',
        'Blessures de genou'
      ]
    },
    {
      id: 18,
      name: 'High Knees ⭐',
      category: 'cardio',
      difficulty: 'debutant',
      calories: 6,
      duration: 20,
      rating: 4.3,
      image: '🏃',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Mollets'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez debout',
        'Courez sur place en montant les genoux',
        'Alternez rapidement les jambes',
        'Maintenez le rythme'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de cœur',
        'Blessures de genou'
      ]
    },
    {
      id: 19,
      name: 'Mountain Climbers ⭐',
      category: 'cardio',
      difficulty: 'intermediaire',
      calories: 10,
      duration: 25,
      rating: 4.6,
      image: '🏔️',
      muscleGroups: ['Tout le corps'],
      equipment: ['Aucun'],
      instructions: [
        'Placez-vous en position de pompe',
        'Alternez rapidement les genoux vers la poitrine',
        'Maintenez le corps droit',
        'Contractez les abdominaux'
      ],
      tips: [
        'Gardez le menton rentré',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 20,
      name: 'Jump Squats ⭐',
      category: 'cardio',
      difficulty: 'intermediaire',
      calories: 12,
      duration: 25,
      rating: 4.7,
      image: '🦘',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Mollets'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez en position de squat',
        'Sautez en étendant les jambes',
        'Atterrissez en position de squat',
        'Répétez le mouvement'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez l\'atterrissage',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    // NOUVEAUX EXERCICES - HAUT DU CORPS
    {
      id: 21,
      name: 'Développé incliné',
      category: 'haut-corps',
      difficulty: 'intermediaire',
      calories: 9,
      duration: 40,
      rating: 4.7,
      image: '📈',
      muscleGroups: ['Pectoraux supérieurs', 'Deltoïdes antérieurs', 'Triceps'],
      equipment: ['Banc incliné', 'Barre', 'Disques'],
      instructions: [
        'Réglez le banc à 30-45°',
        'Allongez-vous sur le banc incliné',
        'Descendez la barre vers le haut de la poitrine',
        'Poussez vers le haut en contractant les pectoraux'
      ],
      tips: [
        'Gardez les pieds bien ancrés',
        'Contrôlez la descente',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas décoller les épaules',
        'Éviter les rebonds'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de poitrine'
      ]
    },
    {
      id: 22,
      name: 'Écarté haltères',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 6,
      duration: 30,
      rating: 4.5,
      image: '🦋',
      muscleGroups: ['Pectoraux', 'Deltoïdes antérieurs'],
      equipment: ['Haltères', 'Banc'],
      instructions: [
        'Allongez-vous sur le banc',
        'Tenez les haltères au-dessus de la poitrine',
        'Écartez les bras en arc de cercle',
        'Ramenez les haltères au centre'
      ],
      tips: [
        'Gardez une légère flexion des coudes',
        'Contrôlez le mouvement',
        'Respirez lors de l\'écartement'
      ],
      warnings: [
        'Ne pas descendre trop bas',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de poitrine'
      ]
    },
    {
      id: 23,
      name: 'Tirage vertical',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 7,
      duration: 35,
      rating: 4.6,
      image: '⬇️',
      muscleGroups: ['Dorsaux', 'Rhomboides', 'Biceps'],
      equipment: ['Machine à tirage'],
      instructions: [
        'Asseyez-vous à la machine',
        'Saisissez la barre large',
        'Tirez vers le bas jusqu\'au cou',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de la traction'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 24,
      name: 'Pompes',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 8,
      duration: 25,
      rating: 4.7,
      image: '💪',
      muscleGroups: ['Pectoraux', 'Triceps', 'Deltoïdes antérieurs'],
      equipment: ['Aucun'],
      instructions: [
        'Placez-vous en position de planche',
        'Descendez jusqu\'à toucher le sol',
        'Poussez vers le haut',
        'Maintenez le corps droit'
      ],
      tips: [
        'Gardez le corps aligné',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de poignet'
      ]
    },
    {
      id: 25,
      name: 'Développé militaire',
      category: 'haut-corps',
      difficulty: 'intermediaire',
      calories: 9,
      duration: 40,
      rating: 4.8,
      image: '🎖️',
      muscleGroups: ['Deltoïdes', 'Triceps', 'Trapèzes'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Debout, pieds écartés',
        'Saisissez la barre à hauteur d\'épaules',
        'Poussez vers le haut',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de dos'
      ]
    },
    {
      id: 26,
      name: 'Élévations latérales',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 5,
      duration: 25,
      rating: 4.4,
      image: '✈️',
      muscleGroups: ['Deltoïdes latéraux'],
      equipment: ['Haltères'],
      instructions: [
        'Tenez les haltères en position debout',
        'Levez les bras sur les côtés',
        'Montez jusqu\'à hauteur d\'épaules',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez les coudes légèrement fléchis',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas utiliser l\'élan',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de coude'
      ]
    },
    {
      id: 27,
      name: 'Élévations frontales',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 5,
      duration: 25,
      rating: 4.3,
      image: '⬆️',
      muscleGroups: ['Deltoïdes antérieurs'],
      equipment: ['Haltères'],
      instructions: [
        'Tenez les haltères en position debout',
        'Levez les bras devant vous',
        'Montez jusqu\'à hauteur d\'épaules',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez les coudes légèrement fléchis',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas utiliser l\'élan',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de coude'
      ]
    },
    {
      id: 28,
      name: 'Oiseau',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 4,
      duration: 20,
      rating: 4.2,
      image: '🐦',
      muscleGroups: ['Deltoïdes postérieurs', 'Rhomboides'],
      equipment: ['Haltères'],
      instructions: [
        'Penchez-vous vers l\'avant',
        'Tenez les haltères',
        'Écartez les bras sur les côtés',
        'Contractez les omoplates'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de l\'écartement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 29,
      name: 'Développé couché prise serrée',
      category: 'haut-corps',
      difficulty: 'intermediaire',
      calories: 8,
      duration: 35,
      rating: 4.6,
      image: '💪',
      muscleGroups: ['Triceps', 'Pectoraux centraux'],
      equipment: ['Banc plat', 'Barre', 'Disques'],
      instructions: [
        'Allongez-vous sur le banc',
        'Saisissez la barre avec une prise serrée',
        'Descendez vers la poitrine',
        'Poussez vers le haut'
      ],
      tips: [
        'Gardez les coudes près du corps',
        'Contrôlez la descente',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas décoller les épaules',
        'Éviter les rebonds'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de poignet'
      ]
    },
    {
      id: 30,
      name: 'Extension triceps',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 5,
      duration: 25,
      rating: 4.4,
      image: '💪',
      muscleGroups: ['Triceps'],
      equipment: ['Haltère'],
      instructions: [
        'Tenez l\'haltère au-dessus de la tête',
        'Descendez derrière la tête',
        'Remontez en contractant les triceps',
        'Maintenez le coude fixe'
      ],
      tips: [
        'Gardez le coude près de l\'oreille',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas utiliser l\'élan',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de coude'
      ]
    },
    // NOUVEAUX EXERCICES - BAS DU CORPS
    {
      id: 31,
      name: 'Squats bulgares',
      category: 'bas-corps',
      difficulty: 'intermediaire',
      calories: 10,
      duration: 35,
      rating: 4.7,
      image: '🏔️',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
      equipment: ['Banc'],
      instructions: [
        'Placez le pied arrière sur le banc',
        'Descendez en fléchissant la jambe avant',
        'Remontez en contractant les fessiers',
        'Alternez les jambes'
      ],
      tips: [
        'Gardez le torse droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas laisser le genou dépasser les orteils',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    {
      id: 32,
      name: 'Goblet Squat',
      category: 'bas-corps',
      difficulty: 'debutant',
      calories: 8,
      duration: 30,
      rating: 4.5,
      image: '🏺',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Core'],
      equipment: ['Haltère'],
      instructions: [
        'Tenez l\'haltère contre la poitrine',
        'Descendez en position de squat',
        'Remontez en contractant les fessiers',
        'Maintenez le dos droit'
      ],
      tips: [
        'Gardez les pieds écartés',
        'Contrôlez la descente',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les genoux qui rentrent'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de dos'
      ]
    },
    {
      id: 33,
      name: 'Step-up',
      category: 'bas-corps',
      difficulty: 'debutant',
      calories: 7,
      duration: 30,
      rating: 4.4,
      image: '📈',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Mollets'],
      equipment: ['Step ou banc'],
      instructions: [
        'Placez-vous devant le step',
        'Montez avec une jambe',
        'Redescendez de manière contrôlée',
        'Alternez les jambes'
      ],
      tips: [
        'Gardez le torse droit',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas utiliser l\'élan',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    {
      id: 34,
      name: 'Wall Sit',
      category: 'bas-corps',
      difficulty: 'debutant',
      calories: 6,
      duration: 30,
      rating: 4.3,
      image: '🧱',
      muscleGroups: ['Quadriceps', 'Fessiers'],
      equipment: ['Mur'],
      instructions: [
        'Placez-vous dos au mur',
        'Descendez en position de chaise',
        'Maintenez la position',
        'Contractez les quadriceps'
      ],
      tips: [
        'Gardez le dos contre le mur',
        'Maintenez la position',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas descendre trop bas',
        'Éviter de retenir la respiration'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de dos'
      ]
    },
    {
      id: 35,
      name: 'Calf Raise',
      category: 'bas-corps',
      difficulty: 'debutant',
      calories: 4,
      duration: 20,
      rating: 4.2,
      image: '🦵',
      muscleGroups: ['Mollets'],
      equipment: ['Aucun'],
      instructions: [
        'Debout, pieds écartés',
        'Montez sur la pointe des pieds',
        'Descendez de manière contrôlée',
        'Répétez le mouvement'
      ],
      tips: [
        'Gardez les genoux légèrement fléchis',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas utiliser l\'élan',
        'Éviter les mouvements saccadés'
      ],
      contraindications: [
        'Problèmes de cheville',
        'Blessures de mollet'
      ]
    },
    {
      id: 36,
      name: 'Pistol Squat',
      category: 'bas-corps',
      difficulty: 'avance',
      calories: 12,
      duration: 40,
      rating: 4.8,
      image: '🔫',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Core'],
      equipment: ['Aucun'],
      instructions: [
        'Debout sur une jambe',
        'Descendez en position de squat',
        'Remontez en contractant les fessiers',
        'Alternez les jambes'
      ],
      tips: [
        'Gardez le torse droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    {
      id: 37,
      name: 'Sumo Squat',
      category: 'bas-corps',
      difficulty: 'debutant',
      calories: 9,
      duration: 35,
      rating: 4.6,
      image: '🥋',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Adducteurs'],
      equipment: ['Aucun'],
      instructions: [
        'Pieds très écartés, pointes vers l\'extérieur',
        'Descendez en position de squat',
        'Remontez en contractant les fessiers',
        'Maintenez le dos droit'
      ],
      tips: [
        'Gardez les genoux alignés avec les orteils',
        'Contrôlez la descente',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les genoux qui rentrent'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de hanche'
      ]
    },
    {
      id: 38,
      name: 'Single Leg Deadlift',
      category: 'bas-corps',
      difficulty: 'intermediaire',
      calories: 8,
      duration: 35,
      rating: 4.7,
      image: '🦵',
      muscleGroups: ['Fessiers', 'Ischio-jambiers', 'Core'],
      equipment: ['Haltères'],
      instructions: [
        'Debout sur une jambe',
        'Penchez-vous vers l\'avant',
        'Levez la jambe arrière',
        'Remontez en contractant les fessiers'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de genou'
      ]
    },
    {
      id: 39,
      name: 'Jump Squats',
      category: 'bas-corps',
      difficulty: 'intermediaire',
      calories: 12,
      duration: 25,
      rating: 4.7,
      image: '🦘',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Mollets'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez en position de squat',
        'Sautez en étendant les jambes',
        'Atterrissez en position de squat',
        'Répétez le mouvement'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez l\'atterrissage',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    {
      id: 40,
      name: 'Lateral Lunges',
      category: 'bas-corps',
      difficulty: 'debutant',
      calories: 7,
      duration: 30,
      rating: 4.5,
      image: '↔️',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Adducteurs'],
      equipment: ['Aucun'],
      instructions: [
        'Faites un grand pas sur le côté',
        'Descendez en fléchissant la jambe',
        'Remontez en contractant les fessiers',
        'Alternez les côtés'
      ],
      tips: [
        'Gardez le torse droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas laisser le genou dépasser les orteils',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de hanche'
      ]
    },
    // NOUVEAUX EXERCICES - CORE
    {
      id: 41,
      name: 'Bicycle Crunches',
      category: 'core',
      difficulty: 'debutant',
      calories: 6,
      duration: 25,
      rating: 4.5,
      image: '🚴',
      muscleGroups: ['Abdominaux', 'Obliques'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Levez les genoux à 90°',
        'Alternez les coudes vers les genoux',
        'Contractez les abdominaux'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas tirer sur la nuque',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de cou'
      ]
    },
    {
      id: 42,
      name: 'Leg Raises',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 7,
      duration: 30,
      rating: 4.6,
      image: '🦵',
      muscleGroups: ['Abdominaux inférieurs', 'Hip Flexors'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Levez les jambes droites',
        'Descendez de manière contrôlée',
        'Contractez les abdominaux'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de hanche'
      ]
    },
    {
      id: 43,
      name: 'Side Plank',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 6,
      duration: 30,
      rating: 4.7,
      image: '🛡️',
      muscleGroups: ['Obliques', 'Deltoïdes', 'Fessiers'],
      equipment: ['Aucun'],
      instructions: [
        'Placez-vous sur le côté',
        'Maintenez la position sur l\'avant-bras',
        'Gardez le corps droit',
        'Contractez les obliques'
      ],
      tips: [
        'Gardez le menton rentré',
        'Maintenez la position',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter de retenir la respiration'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 44,
      name: 'Hollow Hold',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 8,
      duration: 30,
      rating: 4.8,
      image: '🥚',
      muscleGroups: ['Abdominaux', 'Hip Flexors'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Levez les bras et les jambes',
        'Maintenez la position',
        'Contractez les abdominaux'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Maintenez la position',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter de retenir la respiration'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de hanche'
      ]
    },
    {
      id: 45,
      name: 'V-Ups',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 8,
      duration: 25,
      rating: 4.6,
      image: '✈️',
      muscleGroups: ['Abdominaux', 'Hip Flexors'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Levez les bras et les jambes simultanément',
        'Touchez les pieds avec les mains',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de hanche'
      ]
    },
    {
      id: 46,
      name: 'Flutter Kicks',
      category: 'core',
      difficulty: 'debutant',
      calories: 5,
      duration: 25,
      rating: 4.4,
      image: '🦵',
      muscleGroups: ['Abdominaux inférieurs', 'Hip Flexors'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Levez les jambes légèrement',
        'Alternez rapidement les jambes',
        'Contractez les abdominaux'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de hanche'
      ]
    },
    {
      id: 47,
      name: 'Plank Up-Downs',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 8,
      duration: 30,
      rating: 4.7,
      image: '🔄',
      muscleGroups: ['Abdominaux', 'Deltoïdes', 'Triceps'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez en position de planche',
        'Descendez sur les avant-bras',
        'Remontez sur les mains',
        'Répétez le mouvement'
      ],
      tips: [
        'Gardez le corps droit',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 48,
      name: 'Reverse Crunches',
      category: 'core',
      difficulty: 'debutant',
      calories: 5,
      duration: 25,
      rating: 4.3,
      image: '💪',
      muscleGroups: ['Abdominaux inférieurs'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Levez les genoux à 90°',
        'Rapprochez les genoux de la poitrine',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de hanche'
      ]
    },
    {
      id: 49,
      name: 'Superman',
      category: 'core',
      difficulty: 'debutant',
      calories: 4,
      duration: 20,
      rating: 4.2,
      image: '🦸',
      muscleGroups: ['Dorsaux', 'Fessiers', 'Deltoïdes postérieurs'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le ventre',
        'Levez les bras et les jambes',
        'Maintenez la position',
        'Contractez les dorsaux'
      ],
      tips: [
        'Gardez le menton rentré',
        'Maintenez la position',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas hyperextendre le dos',
        'Éviter de retenir la respiration'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de cou'
      ]
    },
    {
      id: 50,
      name: 'Windshield Wipers',
      category: 'core',
      difficulty: 'avance',
      calories: 9,
      duration: 30,
      rating: 4.8,
      image: '🧽',
      muscleGroups: ['Obliques', 'Abdominaux', 'Hip Flexors'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Levez les jambes à 90°',
        'Basculez les jambes de gauche à droite',
        'Contractez les obliques'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de hanche'
      ]
    },
    // NOUVEAUX EXERCICES - HAUT DU CORPS
    {
      id: 51,
      name: 'Pompes diamant ⭐',
      category: 'haut-corps',
      difficulty: 'intermediaire',
      calories: 9,
      duration: 30,
      rating: 4.8,
      image: '💎',
      muscleGroups: ['Triceps', 'Pectoraux centraux'],
      equipment: ['Aucun'],
      instructions: [
        'Placez-vous en position de pompe',
        'Formez un diamant avec les mains',
        'Descendez jusqu\'à toucher le sol',
        'Poussez vers le haut'
      ],
      tips: [
        'Gardez les coudes près du corps',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de poignet'
      ]
    },
    {
      id: 52,
      name: 'Développé Arnold ⭐',
      category: 'haut-corps',
      difficulty: 'intermediaire',
      calories: 8,
      duration: 35,
      rating: 4.7,
      image: '💪',
      muscleGroups: ['Deltoïdes', 'Triceps'],
      equipment: ['Haltères'],
      instructions: [
        'Tenez les haltères à hauteur d\'épaules',
        'Commencez avec les paumes vers vous',
        'Poussez vers le haut en tournant',
        'Finissez avec les paumes vers l\'avant'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de coude'
      ]
    },
    {
      id: 53,
      name: 'Face Pull',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 6,
      duration: 30,
      rating: 4.5,
      image: '🎯',
      muscleGroups: ['Deltoïdes postérieurs', 'Rhomboides'],
      equipment: ['Câble'],
      instructions: [
        'Réglez le câble à hauteur d\'épaules',
        'Tirez vers le visage',
        'Écartez les coudes',
        'Contractez les omoplates'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de la traction'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 54,
      name: 'Développé couché haltères ⭐',
      category: 'haut-corps',
      difficulty: 'intermediaire',
      calories: 9,
      duration: 40,
      rating: 4.7,
      image: '💪',
      muscleGroups: ['Pectoraux', 'Deltoïdes antérieurs', 'Triceps'],
      equipment: ['Haltères', 'Banc'],
      instructions: [
        'Allongez-vous sur le banc',
        'Tenez les haltères au-dessus de la poitrine',
        'Descendez jusqu\'à toucher la poitrine',
        'Poussez vers le haut'
      ],
      tips: [
        'Gardez les pieds bien ancrés',
        'Contrôlez la descente',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas décoller les épaules',
        'Éviter les rebonds'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Blessures de poitrine'
      ]
    },
    {
      id: 55,
      name: 'Tirage horizontal',
      category: 'haut-corps',
      difficulty: 'debutant',
      calories: 7,
      duration: 35,
      rating: 4.6,
      image: '⬅️',
      muscleGroups: ['Dorsaux', 'Rhomboides', 'Biceps'],
      equipment: ['Machine à tirage'],
      instructions: [
        'Asseyez-vous à la machine',
        'Tirez la barre vers le torse',
        'Contractez les omoplates',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez le dos droit',
        'Contrôlez le mouvement',
        'Respirez lors de la traction'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    // NOUVEAUX EXERCICES - BAS DU CORPS
    {
      id: 56,
      name: 'Squats sautés ⭐',
      category: 'bas-corps',
      difficulty: 'intermediaire',
      calories: 12,
      duration: 25,
      rating: 4.8,
      image: '🦘',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Mollets'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez en position de squat',
        'Sautez en étendant les jambes',
        'Atterrissez en position de squat',
        'Répétez rapidement'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez l\'atterrissage',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    {
      id: 57,
      name: 'Fentes sautées',
      category: 'bas-corps',
      difficulty: 'intermediaire',
      calories: 10,
      duration: 30,
      rating: 4.7,
      image: '🚶',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Mollets'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez en position de fente',
        'Sautez en changeant de jambe',
        'Atterrissez en position de fente',
        'Répétez rapidement'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez l\'atterrissage',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    {
      id: 58,
      name: 'Squats avec haltères',
      category: 'bas-corps',
      difficulty: 'intermediaire',
      calories: 11,
      duration: 40,
      rating: 4.6,
      image: '🏋️',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
      equipment: ['Haltères'],
      instructions: [
        'Tenez les haltères à hauteur d\'épaules',
        'Descendez en position de squat',
        'Remontez en contractant les fessiers',
        'Maintenez le dos droit'
      ],
      tips: [
        'Gardez les pieds écartés',
        'Contrôlez la descente',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les genoux qui rentrent'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de dos'
      ]
    },
    {
      id: 59,
      name: 'Fentes avec haltères',
      category: 'bas-corps',
      difficulty: 'intermediaire',
      calories: 9,
      duration: 35,
      rating: 4.7,
      image: '🚶',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
      equipment: ['Haltères'],
      instructions: [
        'Tenez les haltères',
        'Faites un grand pas en avant',
        'Descendez jusqu\'à ce que le genou arrière touche presque le sol',
        'Remontez en contractant les fessiers'
      ],
      tips: [
        'Gardez le torse droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas laisser le genou dépasser les orteils',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    {
      id: 60,
      name: 'Squats sur une jambe',
      category: 'bas-corps',
      difficulty: 'avance',
      calories: 10,
      duration: 35,
      rating: 4.8,
      image: '🦵',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Core'],
      equipment: ['Aucun'],
      instructions: [
        'Debout sur une jambe',
        'Descendez en position de squat',
        'Remontez en contractant les fessiers',
        'Alternez les jambes'
      ],
      tips: [
        'Gardez le torse droit',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    // NOUVEAUX EXERCICES - CORE
    {
      id: 61,
      name: 'Mountain Climbers ⭐',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 10,
      duration: 25,
      rating: 4.8,
      image: '🏔️',
      muscleGroups: ['Abdominaux', 'Obliques', 'Deltoïdes', 'Fessiers'],
      equipment: ['Aucun'],
      instructions: [
        'Placez-vous en position de pompe',
        'Alternez rapidement les genoux vers la poitrine',
        'Maintenez le corps droit',
        'Contractez les abdominaux'
      ],
      tips: [
        'Gardez le menton rentré',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 62,
      name: 'Burpees ⭐',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 15,
      duration: 30,
      rating: 4.9,
      image: '💥',
      muscleGroups: ['Tout le corps'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez debout',
        'Descendez en position de pompe',
        'Faites une pompe',
        'Remontez et sautez'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de cœur',
        'Blessures de genou'
      ]
    },
    {
      id: 63,
      name: 'Plank latéral avec rotation',
      category: 'core',
      difficulty: 'avance',
      calories: 8,
      duration: 30,
      rating: 4.7,
      image: '🔄',
      muscleGroups: ['Obliques', 'Deltoïdes', 'Core'],
      equipment: ['Aucun'],
      instructions: [
        'Placez-vous en planche latérale',
        'Tendez le bras vers le ciel',
        'Tournez le torse vers le sol',
        'Remontez et alternez'
      ],
      tips: [
        'Gardez le corps droit',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    {
      id: 64,
      name: 'Crunchs avec jambes levées',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 6,
      duration: 25,
      rating: 4.5,
      image: '💪',
      muscleGroups: ['Abdominaux', 'Hip Flexors'],
      equipment: ['Aucun'],
      instructions: [
        'Allongez-vous sur le dos',
        'Levez les jambes à 90°',
        'Relevez le torse vers les genoux',
        'Redescendez de manière contrôlée'
      ],
      tips: [
        'Gardez le bas du dos au sol',
        'Contrôlez le mouvement',
        'Respirez lors de la montée'
      ],
      warnings: [
        'Ne pas tirer sur la nuque',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures de cou'
      ]
    },
    {
      id: 65,
      name: 'Plank avec rotation de hanches',
      category: 'core',
      difficulty: 'intermediaire',
      calories: 7,
      duration: 30,
      rating: 4.6,
      image: '🔄',
      muscleGroups: ['Abdominaux', 'Obliques', 'Deltoïdes'],
      equipment: ['Aucun'],
      instructions: [
        'Placez-vous en position de planche',
        'Tournez les hanches d\'un côté',
        'Revenez au centre',
        'Alternez les côtés'
      ],
      tips: [
        'Gardez le corps droit',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas arrondir le dos',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de dos',
        'Blessures d\'épaule'
      ]
    },
    // NOUVEAUX EXERCICES - CARDIO
    {
      id: 66,
      name: 'Jumping Jacks ⭐',
      category: 'cardio',
      difficulty: 'debutant',
      calories: 8,
      duration: 20,
      rating: 4.6,
      image: '🤸',
      muscleGroups: ['Tout le corps'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez debout',
        'Sautez en écartant les jambes',
        'Levez les bras au-dessus de la tête',
        'Revenez à la position de départ'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de cœur',
        'Blessures de genou'
      ]
    },
    {
      id: 67,
      name: 'High Knees ⭐',
      category: 'cardio',
      difficulty: 'debutant',
      calories: 6,
      duration: 20,
      rating: 4.5,
      image: '🏃',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Mollets'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez debout',
        'Courez sur place en montant les genoux',
        'Alternez rapidement les jambes',
        'Maintenez le rythme'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de cœur',
        'Blessures de genou'
      ]
    },
    {
      id: 68,
      name: 'Burpees avec saut ⭐',
      category: 'cardio',
      difficulty: 'avance',
      calories: 18,
      duration: 30,
      rating: 4.9,
      image: '💥',
      muscleGroups: ['Tout le corps'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez debout',
        'Descendez en position de pompe',
        'Faites une pompe',
        'Remontez et sautez en levant les bras'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez le mouvement',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de cœur',
        'Blessures de genou'
      ]
    },
    {
      id: 69,
      name: 'Squats avec saut ⭐',
      category: 'cardio',
      difficulty: 'intermediaire',
      calories: 12,
      duration: 25,
      rating: 4.8,
      image: '🦘',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Mollets'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez en position de squat',
        'Sautez en étendant les jambes',
        'Atterrissez en position de squat',
        'Répétez le mouvement'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez l\'atterrissage',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    {
      id: 70,
      name: 'Fentes avec saut',
      category: 'cardio',
      difficulty: 'intermediaire',
      calories: 10,
      duration: 30,
      rating: 4.7,
      image: '🚶',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Mollets'],
      equipment: ['Aucun'],
      instructions: [
        'Commencez en position de fente',
        'Sautez en changeant de jambe',
        'Atterrissez en position de fente',
        'Répétez rapidement'
      ],
      tips: [
        'Gardez le rythme',
        'Contrôlez l\'atterrissage',
        'Respirez régulièrement'
      ],
      warnings: [
        'Ne pas forcer si fatigué',
        'Éviter les mouvements brusques'
      ],
      contraindications: [
        'Problèmes de genou',
        'Blessures de cheville'
      ]
    },
    // EXERCICES SBD (SQUAT, BENCH, DEADLIFT)
    {
      id: 71,
      name: 'Squat Back ⭐ SBD',
      category: 'force',
      difficulty: 'intermediaire',
      calories: 15,
      duration: 60,
      rating: 4.9,
      image: '🏋️',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Ischio-jambiers', 'Core'],
      equipment: ['Barre', 'Rack à squats', 'Disques'],
      instructions: [
        'Placez la barre sur les trapèzes supérieurs',
        'Écartez les pieds à largeur d\'épaules',
        'Descendez jusqu\'à ce que les cuisses soient parallèles au sol',
        'Remontez en poussant sur les talons',
        'Gardez le dos droit et la poitrine relevée'
      ],
      tips: [
        'Gardez les genoux alignés avec les orteils',
        'Poussez sur les talons',
        'Respirez profondément avant la descente'
      ],
      warnings: [
        'Nécessite un échauffement complet',
        'Attention aux genoux fragiles',
        'Utilisez un spotter pour les charges lourdes'
      ],
      contraindications: [
        'Problèmes de genou sévères',
        'Hernie discale',
        'Problèmes d\'équilibre'
      ]
    },
    {
      id: 72,
      name: 'Bench Press ⭐ SBD',
      category: 'force',
      difficulty: 'intermediaire',
      calories: 12,
      duration: 60,
      rating: 4.9,
      image: '💪',
      muscleGroups: ['Pectoraux', 'Deltoïdes antérieurs', 'Triceps'],
      equipment: ['Banc plat', 'Barre', 'Disques', 'Rack'],
      instructions: [
        'Allongez-vous sur le banc, pieds au sol',
        'Saisissez la barre avec une prise légèrement plus large que les épaules',
        'Descendez la barre vers la poitrine en contrôlant',
        'Poussez la barre vers le haut jusqu\'à extension complète',
        'Maintenez les omoplates serrées'
      ],
      tips: [
        'Gardez les pieds bien ancrés au sol',
        'Ne rebondissez pas sur la poitrine',
        'Respirez en montant, expirez en descendant'
      ],
      warnings: [
        'Nécessite un spotter pour les charges lourdes',
        'Attention aux épaules fragiles',
        'Éviter en cas de douleurs cervicales'
      ],
      contraindications: [
        'Problèmes d\'épaule sévères',
        'Blessures de poitrine',
        'Hypertension non contrôlée'
      ]
    },
    {
      id: 73,
      name: 'Deadlift ⭐ SBD',
      category: 'force',
      difficulty: 'avance',
      calories: 18,
      duration: 75,
      rating: 4.9,
      image: '️‍♂️',
      muscleGroups: ['Fessiers', 'Ischio-jambiers', 'Dorsaux', 'Trapèzes', 'Core'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Placez la barre au sol, pieds à largeur d\'épaules',
        'Saisissez la barre avec une prise en pronation ou mixte',
        'Gardez le dos droit et les épaules au-dessus de la barre',
        'Soulevez en poussant sur les jambes et en contractant les fessiers',
        'Redescendez en contrôlant le mouvement'
      ],
      tips: [
        'Le dos doit rester droit tout au long du mouvement',
        'La barre doit rester proche du corps',
        'Engagez les abdos et respirez correctement'
      ],
      warnings: [
        'Très dangereux si mal exécuté',
        'Nécessite un échauffement complet',
        'Éviter en cas de problèmes de dos'
      ],
      contraindications: [
        'Problèmes de dos sévères',
        'Hernie discale',
        'Problèmes d\'équilibre'
      ]
    },
    {
      id: 74,
      name: 'Squat Front SBD',
      category: 'force',
      difficulty: 'avance',
      calories: 14,
      duration: 60,
      rating: 4.8,
      image: '🏋️',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Core', 'Deltoïdes'],
      equipment: ['Barre', 'Rack à squats', 'Disques'],
      instructions: [
        'Placez la barre sur les deltoïdes antérieurs',
        'Croisez les bras pour maintenir la barre',
        'Descendez en gardant le torse droit',
        'Remontez en poussant sur les talons',
        'Maintenez les coudes hauts'
      ],
      tips: [
        'Gardez les coudes hauts tout au long du mouvement',
        'Le torse doit rester le plus vertical possible',
        'Contrôlez la descente'
      ],
      warnings: [
        'Difficile pour les débutants',
        'Attention aux poignets fragiles',
        'Nécessite de la mobilité des épaules'
      ],
      contraindications: [
        'Problèmes de poignet',
        'Problèmes d\'épaule',
        'Problèmes de genou'
      ]
    },
    {
      id: 75,
      name: 'Overhead Press SBD',
      category: 'force',
      difficulty: 'intermediaire',
      calories: 10,
      duration: 45,
      rating: 4.7,
      image: '🎖️',
      muscleGroups: ['Deltoïdes', 'Triceps', 'Core', 'Trapèzes'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Debout, pieds écartés largeur d\'épaules',
        'Saisissez la barre à hauteur d\'épaules',
        'Poussez la barre vers le haut',
        'Descendez lentement vers les épaules',
        'Gardez le core contracté'
      ],
      tips: [
        'Gardez le core engagé',
        'Ne cambrez pas le dos',
        'Contrôlez la descente'
      ],
      warnings: [
        'Attention aux épaules fragiles',
        'Éviter en cas de douleurs cervicales',
        'Nécessite de la mobilité des épaules'
      ],
      contraindications: [
        'Problèmes d\'épaule sévères',
        'Douleurs cervicales',
        'Problèmes de dos'
      ]
    },
    // EXERCICES FORCE SUPPLÉMENTAIRES
    {
      id: 76,
      name: 'Power Clean',
      category: 'force',
      difficulty: 'avance',
      calories: 16,
      duration: 60,
      rating: 4.8,
      image: '⚡',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Deltoïdes', 'Trapèzes', 'Core'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Commencez avec la barre au sol',
        'Saisissez la barre avec une prise large',
        'Explosez vers le haut en contractant les fessiers',
        'Attrapez la barre à hauteur d\'épaules',
        'Redescendez en contrôlant'
      ],
      tips: [
        'Le mouvement doit être explosif',
        'Gardez la barre proche du corps',
        'Engagez tout le corps'
      ],
      warnings: [
        'Très technique, nécessite un coach',
        'Dangereux si mal exécuté',
        'Nécessite un échauffement complet'
      ],
      contraindications: [
        'Problèmes de dos',
        'Problèmes d\'épaule',
        'Débutants sans supervision'
      ]
    },
    {
      id: 77,
      name: 'Push Press',
      category: 'force',
      difficulty: 'intermediaire',
      calories: 11,
      duration: 45,
      rating: 4.6,
      image: '💥',
      muscleGroups: ['Deltoïdes', 'Triceps', 'Quadriceps', 'Fessiers', 'Core'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Debout, barre à hauteur d\'épaules',
        'Fléchissez légèrement les genoux',
        'Explosez vers le haut en poussant la barre',
        'Redescendez en contrôlant',
        'Utilisez l\'élan des jambes'
      ],
      tips: [
        'Utilisez l\'élan des jambes',
        'Gardez le core engagé',
        'Contrôlez la descente'
      ],
      warnings: [
        'Attention aux épaules fragiles',
        'Nécessite de la coordination',
        'Éviter en cas de problèmes de dos'
      ],
      contraindications: [
        'Problèmes d\'épaule',
        'Problèmes de genou',
        'Problèmes de coordination'
      ]
    },
    {
      id: 78,
      name: 'Rack Pulls',
      category: 'force',
      difficulty: 'intermediaire',
      calories: 13,
      duration: 50,
      rating: 4.7,
      image: '📈',
      muscleGroups: ['Fessiers', 'Ischio-jambiers', 'Dorsaux', 'Trapèzes'],
      equipment: ['Barre', 'Disques', 'Rack'],
      instructions: [
        'Placez la barre sur le rack à hauteur des genoux',
        'Saisissez la barre avec une prise large',
        'Soulevez la barre en contractant les fessiers',
        'Redescendez en contrôlant',
        'Gardez le dos droit'
      ],
      tips: [
        'Gardez le dos droit',
        'Contractez les fessiers',
        'Contrôlez le mouvement'
      ],
      warnings: [
        'Attention au dos fragile',
        'Nécessite un échauffement',
        'Éviter en cas de hernie discale'
      ],
      contraindications: [
        'Problèmes de dos sévères',
        'Hernie discale',
        'Problèmes d\'équilibre'
      ]
    },
    {
      id: 79,
      name: 'Pause Squat',
      category: 'force',
      difficulty: 'avance',
      calories: 16,
      duration: 60,
      rating: 4.8,
      image: '⏸️',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Ischio-jambiers', 'Core'],
      equipment: ['Barre', 'Rack à squats', 'Disques'],
      instructions: [
        'Effectuez un squat normal',
        'Maintenez la position basse pendant 3 secondes',
        'Remontez en poussant sur les talons',
        'Répétez le mouvement',
        'Gardez le dos droit'
      ],
      tips: [
        'Maintenez la tension pendant la pause',
        'Respirez profondément avant la montée',
        'Contrôlez le mouvement'
      ],
      warnings: [
        'Très intense pour les quadriceps',
        'Nécessite une bonne technique',
        'Attention aux genoux fragiles'
      ],
      contraindications: [
        'Problèmes de genou sévères',
        'Problèmes de dos',
        'Débutants'
      ]
    },
    {
      id: 80,
      name: 'Spoto Press',
      category: 'force',
      difficulty: 'avance',
      calories: 11,
      duration: 50,
      rating: 4.7,
      image: '🛑',
      muscleGroups: ['Pectoraux', 'Deltoïdes antérieurs', 'Triceps'],
      equipment: ['Banc plat', 'Barre', 'Disques'],
      instructions: [
        'Allongez-vous sur le banc',
        'Descendez la barre jusqu\'à 2-3 cm de la poitrine',
        'Maintenez la position pendant 1 seconde',
        'Poussez la barre vers le haut',
        'Ne touchez pas la poitrine'
      ],
      tips: [
        'Maintenez la tension pendant la pause',
        'Gardez les omoplates serrées',
        'Contrôlez le mouvement'
      ],
      warnings: [
        'Très intense pour les pectoraux',
        'Nécessite un spotter',
        'Attention aux épaules fragiles'
      ],
      contraindications: [
        'Problèmes d\'épaule sévères',
        'Blessures de poitrine',
        'Débutants'
      ]
    },
    {
      id: 81,
      name: 'Deficit Deadlift',
      category: 'force',
      difficulty: 'avance',
      calories: 17,
      duration: 60,
      rating: 4.8,
      image: '📉',
      muscleGroups: ['Fessiers', 'Ischio-jambiers', 'Dorsaux', 'Trapèzes', 'Core'],
      equipment: ['Barre', 'Disques', 'Plateforme'],
      instructions: [
        'Placez-vous sur une plateforme de 5-10 cm',
        'Saisissez la barre avec une prise large',
        'Soulevez en contractant les fessiers',
        'Redescendez en contrôlant',
        'Gardez le dos droit'
      ],
      tips: [
        'Augmente l\'amplitude de mouvement',
        'Gardez le dos droit',
        'Contrôlez le mouvement'
      ],
      warnings: [
        'Très intense pour le dos',
        'Nécessite une excellente technique',
        'Éviter en cas de problèmes de dos'
      ],
      contraindications: [
        'Problèmes de dos sévères',
        'Hernie discale',
        'Débutants'
      ]
    },
    {
      id: 82,
      name: 'Box Squat',
      category: 'force',
      difficulty: 'intermediaire',
      calories: 13,
      duration: 50,
      rating: 4.6,
      image: '📦',
      muscleGroups: ['Quadriceps', 'Fessiers', 'Ischio-jambiers', 'Core'],
      equipment: ['Barre', 'Rack à squats', 'Box', 'Disques'],
      instructions: [
        'Placez un box derrière vous',
        'Descendez jusqu\'à toucher le box',
        'Maintenez la position 1 seconde',
        'Remontez en poussant sur les talons',
        'Gardez le dos droit'
      ],
      tips: [
        'Utilisez le box comme guide',
        'Poussez sur les talons',
        'Contrôlez le mouvement'
      ],
      warnings: [
        'Attention à la hauteur du box',
        'Nécessite un échauffement',
        'Éviter en cas de problèmes de genou'
      ],
      contraindications: [
        'Problèmes de genou sévères',
        'Problèmes de dos',
        'Problèmes d\'équilibre'
      ]
    },
    {
      id: 83,
      name: 'Close Grip Bench Press',
      category: 'force',
      difficulty: 'intermediaire',
      calories: 10,
      duration: 45,
      rating: 4.6,
      image: '🤏',
      muscleGroups: ['Triceps', 'Pectoraux centraux', 'Deltoïdes antérieurs'],
      equipment: ['Banc plat', 'Barre', 'Disques'],
      instructions: [
        'Allongez-vous sur le banc',
        'Saisissez la barre avec une prise serrée',
        'Descendez vers la poitrine',
        'Poussez vers le haut en contractant les triceps',
        'Gardez les coudes près du corps'
      ],
      tips: [
        'Gardez les coudes près du corps',
        'Contrôlez la descente',
        'Engagez les triceps'
      ],
      warnings: [
        'Attention aux poignets fragiles',
        'Nécessite un spotter',
        'Éviter en cas de problèmes d\'épaule'
      ],
      contraindications: [
        'Problèmes de poignet',
        'Problèmes d\'épaule',
        'Blessures de coude'
      ]
    },
    {
      id: 84,
      name: 'Romanian Deadlift',
      category: 'force',
      difficulty: 'intermediaire',
      calories: 12,
      duration: 50,
      rating: 4.7,
      image: '🇷🇴',
      muscleGroups: ['Ischio-jambiers', 'Fessiers', 'Dorsaux', 'Trapèzes'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Tenez la barre devant vous',
        'Descendez en gardant les jambes tendues',
        'Sentez l\'étirement des ischio-jambiers',
        'Remontez en contractant les fessiers',
        'Gardez le dos droit'
      ],
      tips: [
        'Gardez les jambes légèrement fléchies',
        'Sentez l\'étirement des ischio-jambiers',
        'Contrôlez le mouvement'
      ],
      warnings: [
        'Attention au dos fragile',
        'Nécessite de la mobilité',
        'Éviter en cas de hernie discale'
      ],
      contraindications: [
        'Problèmes de dos sévères',
        'Hernie discale',
        'Problèmes d\'équilibre'
      ]
    },
    {
      id: 85,
      name: 'Sumo Deadlift',
      category: 'force',
      difficulty: 'intermediaire',
      calories: 14,
      duration: 55,
      rating: 4.7,
      image: '🥋',
      muscleGroups: ['Fessiers', 'Ischio-jambiers', 'Adducteurs', 'Dorsaux'],
      equipment: ['Barre', 'Disques'],
      instructions: [
        'Pieds écartés plus large que les épaules',
        'Pointez les pieds vers l\'extérieur',
        'Saisissez la barre entre les jambes',
        'Soulevez en contractant les fessiers',
        'Gardez le dos droit'
      ],
      tips: [
        'Gardez les genoux alignés avec les orteils',
        'Poussez sur les talons',
        'Contrôlez le mouvement'
      ],
      warnings: [
        'Nécessite de la mobilité des hanches',
        'Attention au dos fragile',
        'Éviter en cas de problèmes de hanche'
      ],
      contraindications: [
        'Problèmes de hanche',
        'Problèmes de dos',
        'Problèmes d\'équilibre'
      ]
    }
  ];

  // Filtrer les exercices
  const filteredExercises = exercisesDatabase.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'tous' || exercise.difficulty === selectedDifficulty;
    const matchesSBD = selectedSBD === 'tous' || (selectedSBD === 'sbd' && exercise.name.includes('SBD'));
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesSBD;
  });

  // Obtenir les statistiques
  const getStats = () => {
    const totalExercises = exercisesDatabase.length;
    const totalCalories = exercisesDatabase.reduce((sum, ex) => sum + ex.calories, 0);
    const avgRating = (exercisesDatabase.reduce((sum, ex) => sum + ex.rating, 0) / totalExercises).toFixed(1);
    
    return { totalExercises, totalCalories, avgRating };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Dumbbell className="h-12 w-12 text-purple-400 mr-4" />
            <h1 className="text-4xl font-bold text-white">Entraînement</h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Découvrez notre collection d'exercices de musculation
          </p>
          
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-6 text-center">
                <Activity className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stats.totalExercises}</div>
                <div className="text-sm text-gray-400">Exercices disponibles</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stats.totalCalories}</div>
                <div className="text-sm text-gray-400">Calories totales</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stats.avgRating}</div>
                <div className="text-sm text-gray-400">Note moyenne</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filtres */}
        <Card className="bg-slate-800/50 border-purple-500/20 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-white mb-2 block">Rechercher</Label>
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Nom de l'exercice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              </div>
              <div>
                <Label className="text-white mb-2 block">Catégorie</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Toutes les catégories</SelectItem>
                    <SelectItem value="haut-corps">Haut du corps</SelectItem>
                    <SelectItem value="bas-corps">Bas du corps</SelectItem>
                    <SelectItem value="core">Core</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="force">Force</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <div>
                <Label className="text-white mb-2 block">Difficulté</Label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="tous">Toutes les difficultés</SelectItem>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="avance">Avancé</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <div>
                <Label className="text-white mb-2 block">Type d'exercice</Label>
                <Select value={selectedSBD} onValueChange={setSelectedSBD}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les exercices</SelectItem>
                    <SelectItem value="sbd">Exercices SBD</SelectItem>
                    <SelectItem value="populaires">Exercices populaires ⭐</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des exercices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className="bg-slate-800/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedExercise(exercise)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="text-4xl">{exercise.image}</div>
                  <Badge 
                    variant={exercise.difficulty === 'debutant' ? 'default' : 
                            exercise.difficulty === 'intermediaire' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {exercise.difficulty}
                  </Badge>
                    </div>
                <CardTitle className="text-white text-lg group-hover:text-purple-300 transition-colors">
                    {exercise.name}
                  </CardTitle>
                <CardDescription className="text-gray-400">
                  {exercise.muscleGroups.join(', ')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {exercise.duration}min
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Zap className="h-4 w-4 mr-1" />
                      {exercise.calories} cal
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Star className="h-4 w-4 mr-1" />
                      {exercise.rating}
                  </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {exercise.equipment.map((eq, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-gray-400 border-gray-600">
                        {eq}
                    </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedExercise(exercise);
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Voir les détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal de détails de l'exercice */}
        {selectedExercise && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-slate-800 border-purple-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{selectedExercise.image}</div>
                    <div>
                      <CardTitle className="text-white text-2xl">{selectedExercise.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {selectedExercise.muscleGroups.join(', ')}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedExercise(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informations de base */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{selectedExercise.duration}</div>
                    <div className="text-sm text-gray-400">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{selectedExercise.calories}</div>
                    <div className="text-sm text-gray-400">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{selectedExercise.rating}</div>
                    <div className="text-sm text-gray-400">Note</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{selectedExercise.difficulty}</div>
                    <div className="text-sm text-gray-400">Difficulté</div>
                  </div>
                </div>

                {/* Équipement */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Équipement nécessaire</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExercise.equipment.map((eq, index) => (
                      <Badge key={index} variant="outline" className="text-gray-400 border-gray-600">
                        {eq}
                          </Badge>
                        ))}
                      </div>
                    </div>

                {/* Instructions */}
                    <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                    </div>

                {/* Conseils */}
                      <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Conseils</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {selectedExercise.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                            </div>

                {/* Avertissements */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                    Avertissements
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {selectedExercise.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                        </div>

                {/* Contre-indications */}
                      <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Shield className="h-5 w-5 text-red-400 mr-2" />
                          Contre-indications
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {selectedExercise.contraindications.map((contraindication, index) => (
                      <li key={index}>{contraindication}</li>
                    ))}
                  </ul>
                  </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                      <Play className="h-4 w-4 mr-2" />
                    Commencer l'exercice
                    </Button>
                  <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Ajouter au planning
                    </Button>
                  </div>
                </CardContent>
              </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlocsEntrainement;