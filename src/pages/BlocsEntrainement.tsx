import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { 
  Dumbbell, 
  Clock, 
  Target,
  Flame, 
  Users, 
  Activity,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Star,
  Zap,
  Heart,
  TrendingUp,
  Search,
  Filter,
  List,
  Grid,
  Eye,
  Plus
} from 'lucide-react';

export const BlocsEntrainement: React.FC = () => {
  const { user } = useAuth();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Données des exercices
  const exercices = [
    // Force/Powerlifting
    {
      id: 'squat',
      nom: 'Squat',
      description: 'Exercice de base pour développer la force des jambes et du dos',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers', 'Dos'],
      equipement: 'Barre + Rack',
      image: '🏋️‍♂️',
      couleur: 'from-red-500 to-pink-500',
      bgCouleur: 'from-red-500/10 to-pink-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous sous la barre',
        'Placez la barre sur vos trapèzes',
        'Descendez en gardant le dos droit',
        'Remontez en contractant les jambes'
      ],
      conseils: 'Gardez les genoux alignés avec les pieds',
      variations: ['Squat avant', 'Squat bulgare', 'Squat sumo']
    },
    {
      id: 'bench-press',
      nom: 'Développé Couché',
      description: 'Exercice roi pour développer la force de la poitrine',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Poitrine', 'Triceps', 'Épaules'],
      equipement: 'Barre + Banc',
      image: '💪',
      couleur: 'from-blue-500 to-cyan-500',
      bgCouleur: 'from-blue-500/10 to-cyan-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Allongez-vous sur le banc',
        'Saisissez la barre avec une prise large',
        'Descendez la barre vers la poitrine',
        'Poussez vers le haut avec force'
      ],
      conseils: 'Gardez les pieds bien ancrés au sol',
      variations: ['Développé incliné', 'Développé décliné', 'Développé haltères']
    },
    {
      id: 'deadlift',
      nom: 'Soulevé de Terre',
      description: 'Exercice complet pour développer la force totale du corps',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Avancé',
      muscles: ['Dos', 'Fessiers', 'Ischio-jambiers', 'Trapèzes'],
      equipement: 'Barre',
      image: '🏋️‍♀️',
      couleur: 'from-purple-500 to-violet-500',
      bgCouleur: 'from-purple-500/10 to-violet-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous devant la barre',
        'Saisissez la barre avec une prise mixte',
        'Gardez le dos droit et les jambes fléchies',
        'Soulevez en contractant tout le corps'
      ],
      conseils: 'Ne jamais arrondir le dos',
      variations: ['Deadlift sumo', 'Deadlift roumain', 'Deadlift trap bar']
    },
    {
      id: 'overhead-press',
      nom: 'Développé Militaire',
      description: 'Exercice pour développer la force des épaules',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Épaules', 'Triceps', 'Core'],
      equipement: 'Barre',
      image: '💪',
      couleur: 'from-indigo-500 to-blue-500',
      bgCouleur: 'from-indigo-500/10 to-blue-500/10',
      borderCouleur: 'border-indigo-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Tenez la barre au niveau des épaules',
        'Gardez le dos droit',
        'Poussez la barre vers le haut',
        'Descendez lentement'
      ],
      conseils: 'Gardez le core contracté',
      variations: ['Développé assis', 'Développé haltères', 'Développé poussée']
    },
    {
      id: 'barbell-row',
      nom: 'Rowing Barre',
      description: 'Exercice pour développer la force du dos',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Dos', 'Biceps', 'Épaules'],
      equipement: 'Barre',
      image: '🏋️‍♂️',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-500/10 to-emerald-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Penchez-vous vers l\'avant',
        'Tirez la barre vers le bas du torse',
        'Contractez les omoplates',
        'Descendez lentement'
      ],
      conseils: 'Gardez le dos droit',
      variations: ['Rowing haltères', 'Rowing T-bar', 'Rowing inversé']
    },
    {
      id: 'front-squat',
      nom: 'Squat Avant',
      description: 'Variation du squat avec la barre devant',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Avancé',
      muscles: ['Quadriceps', 'Fessiers', 'Core', 'Épaules'],
      equipement: 'Barre + Rack',
      image: '🏋️‍♀️',
      couleur: 'from-orange-500 to-yellow-500',
      bgCouleur: 'from-orange-500/10 to-yellow-500/10',
      borderCouleur: 'border-orange-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Placez la barre sur les épaules avant',
        'Gardez les coudes hauts',
        'Descendez en squat',
        'Remontez en contractant'
      ],
      conseils: 'Mobilité des épaules requise',
      variations: ['Squat avant haltères', 'Squat avant goblet', 'Squat avant kettlebell']
    },
    {
      id: 'clean-and-jerk',
      nom: 'Épaulé-Jeté',
      description: 'Exercice olympique complet',
      categorie: 'Force',
      type: 'Olympic',
      difficulte: 'Expert',
      muscles: ['Tout le corps'],
      equipement: 'Barre + Plates',
      image: '🏋️‍♂️',
      couleur: 'from-red-500 to-orange-500',
      bgCouleur: 'from-red-500/10 to-orange-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Commencez avec la barre au sol',
        'Tirez la barre vers le haut',
        'Attrapez la barre sur les épaules',
        'Poussez vers le haut'
      ],
      conseils: 'Technique complexe, apprendre progressivement',
      variations: ['Power clean', 'Hang clean', 'Clean pull']
    },
    {
      id: 'snatch',
      nom: 'Arraché',
      description: 'Exercice olympique le plus technique',
      categorie: 'Force',
      type: 'Olympic',
      difficulte: 'Expert',
      muscles: ['Tout le corps'],
      equipement: 'Barre + Plates',
      image: '🏋️‍♀️',
      couleur: 'from-purple-500 to-pink-500',
      bgCouleur: 'from-purple-500/10 to-pink-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Commencez avec la barre au sol',
        'Tirez la barre vers le haut',
        'Attrapez la barre au-dessus de la tête',
        'Stabilisez la position'
      ],
      conseils: 'Mobilité et technique essentielles',
      variations: ['Power snatch', 'Hang snatch', 'Snatch pull']
    },

    // Endurance/Cardio
    {
      id: 'course-5k',
      nom: 'Course 5km',
      description: 'Course de fond pour développer l\'endurance',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Débutant',
      muscles: ['Jambes', 'Cœur', 'Poumons'],
      equipement: 'Chaussures de course',
      image: '🏃‍♂️',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-500/10 to-emerald-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Échauffez-vous 10 minutes',
        'Maintenez un rythme régulier',
        'Respirez profondément',
        'Hydratez-vous régulièrement'
      ],
      conseils: 'Écoutez votre corps et ajustez le rythme',
      variations: ['Course 10km', 'Course 21km', 'Course trail']
    },
    {
      id: 'marathon',
      nom: 'Marathon',
      description: 'Course de longue distance pour l\'endurance maximale',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Expert',
      muscles: ['Jambes', 'Cœur', 'Poumons', 'Mental'],
      equipement: 'Chaussures de course',
      image: '🏃‍♀️',
      couleur: 'from-blue-500 to-indigo-500',
      bgCouleur: 'from-blue-500/10 to-indigo-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Préparez-vous mentalement',
        'Maintenez un rythme de croisière',
        'Gérez votre énergie sur la distance',
        'Terminez fort'
      ],
      conseils: 'Entraînement progressif sur plusieurs mois',
      variations: ['Semi-marathon', 'Ultra-marathon', 'Marathon trail']
    },
    {
      id: 'sprint-100m',
      nom: 'Sprint 100m',
      description: 'Course de vitesse pure',
      categorie: 'Endurance',
      type: 'Sprint',
      difficulte: 'Intermédiaire',
      muscles: ['Jambes', 'Fessiers', 'Core'],
      equipement: 'Chaussures de sprint',
      image: '🏃‍♂️',
      couleur: 'from-yellow-500 to-orange-500',
      bgCouleur: 'from-yellow-500/10 to-orange-500/10',
      borderCouleur: 'border-yellow-200/50',
      icon: <Zap className="w-6 h-6" />,
      instructions: [
        'Échauffez-vous intensément',
        'Position de départ optimale',
        'Explosez au signal',
        'Maintenez la vitesse maximale'
      ],
      conseils: 'Technique de course essentielle',
      variations: ['Sprint 200m', 'Sprint 400m', 'Sprint 60m']
    },
    {
      id: 'natation-libre',
      nom: 'Natation Libre',
      description: 'Nage complète pour l\'endurance',
      categorie: 'Endurance',
      type: 'Aquatique',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Maillot de bain',
      image: '🏊‍♂️',
      couleur: 'from-cyan-500 to-blue-500',
      bgCouleur: 'from-cyan-500/10 to-blue-500/10',
      borderCouleur: 'border-cyan-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Échauffez-vous dans l\'eau',
        'Maintenez un rythme régulier',
        'Respirez de manière coordonnée',
        'Terminez par un retour au calme'
      ],
      conseils: 'Technique de respiration importante',
      variations: ['Crawl', 'Brasse', 'Dos crawlé']
    },
    {
      id: 'cyclisme',
      nom: 'Cyclisme',
      description: 'Sport d\'endurance sur vélo',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Débutant',
      muscles: ['Jambes', 'Cœur', 'Poumons'],
      equipement: 'Vélo',
      image: '🚴‍♂️',
      couleur: 'from-green-500 to-teal-500',
      bgCouleur: 'from-green-500/10 to-teal-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Ajustez la selle à la bonne hauteur',
        'Maintenez un rythme de pédalage',
        'Respirez profondément',
        'Hydratez-vous régulièrement'
      ],
      conseils: 'Position sur le vélo importante',
      variations: ['VTT', 'Route', 'Piste']
    },
    {
      id: 'rameur',
      nom: 'Rameur',
      description: 'Exercice complet sur machine',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Machine rameur',
      image: '🚣‍♂️',
      couleur: 'from-blue-500 to-purple-500',
      bgCouleur: 'from-blue-500/10 to-purple-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Ajustez la résistance',
        'Commencez par les jambes',
        'Tirez avec les bras',
        'Retournez à la position de départ'
      ],
      conseils: 'Séquence jambes-bras-dos importante',
      variations: ['Rameur court', 'Rameur long', 'Rameur intervalle']
    },

    // Calisthéniques
    {
      id: 'tractions',
      nom: 'Tractions',
      description: 'Exercice au poids du corps pour le haut du corps',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Intermédiaire',
      muscles: ['Dos', 'Biceps', 'Épaules'],
      equipement: 'Barre de traction',
      image: '🤸‍♂️',
      couleur: 'from-orange-500 to-yellow-500',
      bgCouleur: 'from-orange-500/10 to-yellow-500/10',
      borderCouleur: 'border-orange-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Suspendez-vous à la barre',
        'Tirez vers le haut jusqu\'au menton',
        'Descendez lentement',
        'Répétez le mouvement'
      ],
      conseils: 'Gardez le corps droit et stable',
      variations: ['Tractions larges', 'Tractions serrées', 'Tractions lestées']
    },
    {
      id: 'dips',
      nom: 'Dips',
      description: 'Exercice au poids du corps pour les triceps et épaules',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Intermédiaire',
      muscles: ['Triceps', 'Épaules', 'Poitrine'],
      equipement: 'Barres parallèles',
      image: '🤸‍♀️',
      couleur: 'from-pink-500 to-rose-500',
      bgCouleur: 'from-pink-500/10 to-rose-500/10',
      borderCouleur: 'border-pink-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous sur les barres',
        'Descendez lentement',
        'Poussez vers le haut',
        'Maintenez la tension'
      ],
      conseils: 'Gardez les coudes près du corps',
      variations: ['Dips inclinés', 'Dips lestés', 'Dips sur banc']
    },
    {
      id: 'planche',
      nom: 'Planche',
      description: 'Exercice isométrique pour le core',
      categorie: 'Calisthéniques',
      type: 'Isométrique',
      difficulte: 'Débutant',
      muscles: ['Abdominaux', 'Dos', 'Épaules'],
      equipement: 'Aucun',
      image: '🧘‍♂️',
      couleur: 'from-indigo-500 to-blue-500',
      bgCouleur: 'from-indigo-500/10 to-blue-500/10',
      borderCouleur: 'border-indigo-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en appui sur les avant-bras',
        'Gardez le corps droit',
        'Contractez les abdominaux',
        'Maintenez la position'
      ],
      conseils: 'Ne pas retenir votre souffle',
      variations: ['Planche latérale', 'Planche sur les mains', 'Planche dynamique']
    },
    {
      id: 'handstand',
      nom: 'Handstand',
      description: 'Équilibre sur les mains',
      categorie: 'Calisthéniques',
      type: 'Équilibre',
      difficulte: 'Avancé',
      muscles: ['Épaules', 'Core', 'Équilibre'],
      equipement: 'Mur (optionnel)',
      image: '🤸‍♂️',
      couleur: 'from-purple-500 to-violet-500',
      bgCouleur: 'from-purple-500/10 to-violet-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Commencez contre un mur',
        'Placez les mains au sol',
        'Montez les jambes',
        'Maintenez l\'équilibre'
      ],
      conseils: 'Force des épaules et équilibre requis',
      variations: ['Handstand contre mur', 'Handstand libre', 'Handstand push-up']
    },
    {
      id: 'muscle-up',
      nom: 'Muscle-Up',
      description: 'Transition traction-dips',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Expert',
      muscles: ['Dos', 'Triceps', 'Épaules', 'Core'],
      equipement: 'Barre de traction',
      image: '🤸‍♀️',
      couleur: 'from-red-500 to-pink-500',
      bgCouleur: 'from-red-500/10 to-pink-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Commencez en traction',
        'Tirez vers le haut',
        'Transition vers les dips',
        'Terminez en position haute'
      ],
      conseils: 'Technique et force combinées',
      variations: ['Muscle-up assisté', 'Muscle-up lesté', 'Muscle-up sur anneaux']
    },
    {
      id: 'pompes',
      nom: 'Pompes',
      description: 'Exercice de base pour la poitrine',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Débutant',
      muscles: ['Poitrine', 'Triceps', 'Épaules'],
      equipement: 'Aucun',
      image: '💪',
      couleur: 'from-blue-500 to-cyan-500',
      bgCouleur: 'from-blue-500/10 to-cyan-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en planche',
        'Descendez vers le sol',
        'Poussez vers le haut',
        'Répétez le mouvement'
      ],
      conseils: 'Gardez le corps droit',
      variations: ['Pompes inclinées', 'Pompes déclinées', 'Pompes diamant']
    },
    {
      id: 'squat-saut',
      nom: 'Squat Sauté',
      description: 'Squat explosif avec saut',
      categorie: 'Calisthéniques',
      type: 'Plyométrique',
      difficulte: 'Intermédiaire',
      muscles: ['Jambes', 'Fessiers', 'Core'],
      equipement: 'Aucun',
      image: '🏃‍♂️',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-500/10 to-emerald-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Zap className="w-6 h-6" />,
      instructions: [
        'Commencez en position debout',
        'Descendez en squat',
        'Explosez vers le haut',
        'Atterrissez en douceur'
      ],
      conseils: 'Contrôlez l\'atterrissage',
      variations: ['Squat sauté lesté', 'Squat sauté sur box', 'Squat sauté alterné']
    },
    {
      id: 'l-sit',
      nom: 'L-Sit',
      description: 'Position assise avec les jambes tendues',
      categorie: 'Calisthéniques',
      type: 'Isométrique',
      difficulte: 'Avancé',
      muscles: ['Core', 'Triceps', 'Épaules'],
      equipement: 'Barres parallèles',
      image: '🧘‍♀️',
      couleur: 'from-indigo-500 to-purple-500',
      bgCouleur: 'from-indigo-500/10 to-purple-500/10',
      borderCouleur: 'border-indigo-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous sur les barres',
        'Soulevez les jambes',
        'Tendez les jambes',
        'Maintenez la position'
      ],
      conseils: 'Force du core et des triceps',
      variations: ['L-sit assisté', 'L-sit sur sol', 'L-sit dynamique']
    },

    // Crossfit
    {
      id: 'burpees',
      nom: 'Burpees',
      description: 'Exercice complet pour le conditionnement métabolique',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '🔥',
      couleur: 'from-red-500 to-orange-500',
      bgCouleur: 'from-red-500/10 to-orange-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Commencez debout',
        'Descendez en position de pompe',
        'Faites une pompe',
        'Remontez et sautez'
      ],
      conseils: 'Maintenez un rythme régulier',
      variations: ['Burpees lestés', 'Burpees avec saut', 'Burpees modifiés']
    },
    {
      id: 'thruster',
      nom: 'Thruster',
      description: 'Exercice combiné squat + développé pour le Crossfit',
      categorie: 'Crossfit',
      type: 'Compound',
      difficulte: 'Avancé',
      muscles: ['Jambes', 'Épaules', 'Triceps'],
      equipement: 'Barre + Plates',
      image: '⚡',
      couleur: 'from-yellow-500 to-orange-500',
      bgCouleur: 'from-yellow-500/10 to-orange-500/10',
      borderCouleur: 'border-yellow-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Commencez avec la barre sur les épaules',
        'Descendez en squat',
        'Remontez en développant la barre',
        'Répétez le mouvement'
      ],
      conseils: 'Synchronisez le mouvement des jambes et des bras',
      variations: ['Thruster haltères', 'Thruster kettlebell', 'Thruster dynamique']
    },
    {
      id: 'kettlebell-swing',
      nom: 'Kettlebell Swing',
      description: 'Mouvement balistique avec kettlebell',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Fessiers', 'Ischio-jambiers', 'Core', 'Épaules'],
      equipement: 'Kettlebell',
      image: '🏋️‍♂️',
      couleur: 'from-orange-500 to-red-500',
      bgCouleur: 'from-orange-500/10 to-red-500/10',
      borderCouleur: 'border-orange-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez la kettlebell à deux mains',
        'Descendez en position de squat',
        'Explosez vers le haut',
        'Balancez la kettlebell'
      ],
      conseils: 'Utilisez la puissance des hanches',
      variations: ['Swing russe', 'Swing américain', 'Swing alterné']
    },
    {
      id: 'box-jump',
      nom: 'Box Jump',
      description: 'Saut sur box pour la puissance',
      categorie: 'Crossfit',
      type: 'Plyométrique',
      difficulte: 'Intermédiaire',
      muscles: ['Jambes', 'Fessiers', 'Core'],
      equipement: 'Box',
      image: '🏃‍♀️',
      couleur: 'from-green-500 to-teal-500',
      bgCouleur: 'from-green-500/10 to-teal-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous devant la box',
        'Descendez en position de squat',
        'Explosez vers le haut',
        'Atterrissez sur la box'
      ],
      conseils: 'Contrôlez l\'atterrissage',
      variations: ['Box jump lesté', 'Box jump alterné', 'Box jump step-down']
    },
    {
      id: 'wall-ball',
      nom: 'Wall Ball',
      description: 'Lancer de medecine ball contre le mur',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Jambes', 'Épaules', 'Core'],
      equipement: 'Medecine Ball',
      image: '⚽',
      couleur: 'from-blue-500 to-indigo-500',
      bgCouleur: 'from-blue-500/10 to-indigo-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez le ballon au niveau de la poitrine',
        'Descendez en squat',
        'Explosez vers le haut',
        'Lancez le ballon contre le mur'
      ],
      conseils: 'Synchronisez le squat et le lancer',
      variations: ['Wall ball lesté', 'Wall ball alterné', 'Wall ball dynamique']
    },
    {
      id: 'double-unders',
      nom: 'Double Unders',
      description: 'Corde à sauter avec double rotation',
      categorie: 'Crossfit',
      type: 'Cardio',
      difficulte: 'Avancé',
      muscles: ['Mollets', 'Épaules', 'Core'],
      equipement: 'Corde à sauter',
      image: '🪢',
      couleur: 'from-purple-500 to-pink-500',
      bgCouleur: 'from-purple-500/10 to-pink-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez la corde à sauter',
        'Sautez en synchronisant',
        'Faites tourner la corde deux fois',
        'Maintenez le rythme'
      ],
      conseils: 'Coordination et timing essentiels',
      variations: ['Single unders', 'Triple unders', 'Double unders alternés']
    },
    {
      id: 'toes-to-bar',
      nom: 'Toes to Bar',
      description: 'Toucher la barre avec les pieds',
      categorie: 'Crossfit',
      type: 'Bodyweight',
      difficulte: 'Avancé',
      muscles: ['Core', 'Épaules', 'Dos'],
      equipement: 'Barre de traction',
      image: '🤸‍♂️',
      couleur: 'from-cyan-500 to-blue-500',
      bgCouleur: 'from-cyan-500/10 to-blue-500/10',
      borderCouleur: 'border-cyan-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Suspendez-vous à la barre',
        'Contractez le core',
        'Levez les jambes',
        'Touchez la barre avec les pieds'
      ],
      conseils: 'Contrôlez le mouvement',
      variations: ['Knees to chest', 'Toes to bar lesté', 'Toes to bar alterné']
    },
    {
      id: 'pistol-squat',
      nom: 'Pistol Squat',
      description: 'Squat sur une jambe',
      categorie: 'Crossfit',
      type: 'Bodyweight',
      difficulte: 'Expert',
      muscles: ['Jambes', 'Fessiers', 'Core', 'Équilibre'],
      equipement: 'Aucun',
      image: '🤸‍♀️',
      couleur: 'from-red-500 to-orange-500',
      bgCouleur: 'from-red-500/10 to-orange-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez-vous sur une jambe',
        'Descendez en squat',
        'Gardez l\'équilibre',
        'Remontez en contractant'
      ],
      conseils: 'Mobilité et force requises',
      variations: ['Pistol squat assisté', 'Pistol squat lesté', 'Pistol squat sur box']
    },

    // Nouveaux exercices Force/Powerlifting
    {
      id: 'incline-bench-press',
      nom: 'Développé Incliné',
      description: 'Développé couché sur banc incliné pour le haut de poitrine',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Poitrine (haut)', 'Épaules', 'Triceps'],
      equipement: 'Barre + Banc incliné',
      image: '💪',
      couleur: 'from-blue-500 to-indigo-500',
      bgCouleur: 'from-blue-500/10 to-indigo-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Réglez le banc à 30-45°',
        'Allongez-vous sur le banc',
        'Saisissez la barre avec une prise large',
        'Descendez vers le haut de la poitrine'
      ],
      conseils: 'Contrôlez la descente',
      variations: ['Développé incliné haltères', 'Développé incliné Smith', 'Développé incliné unilatéral']
    },
    {
      id: 'decline-bench-press',
      nom: 'Développé Décliné',
      description: 'Développé couché sur banc décliné pour le bas de poitrine',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Poitrine (bas)', 'Triceps', 'Épaules'],
      equipement: 'Barre + Banc décliné',
      image: '💪',
      couleur: 'from-purple-500 to-pink-500',
      bgCouleur: 'from-purple-500/10 to-pink-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Réglez le banc à -15°',
        'Allongez-vous sur le banc',
        'Saisissez la barre avec une prise large',
        'Descendez vers le bas de la poitrine'
      ],
      conseils: 'Sécurité importante',
      variations: ['Développé décliné haltères', 'Développé décliné Smith', 'Développé décliné unilatéral']
    },
    {
      id: 'barbell-curl',
      nom: 'Curl Barre',
      description: 'Exercice d\'isolation pour les biceps',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Biceps', 'Avant-bras'],
      equipement: 'Barre',
      image: '💪',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-500/10 to-emerald-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Tenez la barre avec une prise serrée',
        'Gardez les coudes près du corps',
        'Curl la barre vers le haut',
        'Descendez lentement'
      ],
      conseils: 'Contrôlez le mouvement',
      variations: ['Curl haltères', 'Curl marteau', 'Curl concentré']
    },
    {
      id: 'tricep-dips',
      nom: 'Dips Triceps',
      description: 'Exercice pour les triceps sur banc',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Intermédiaire',
      muscles: ['Triceps', 'Épaules'],
      equipement: 'Banc',
      image: '💪',
      couleur: 'from-orange-500 to-yellow-500',
      bgCouleur: 'from-orange-500/10 to-yellow-500/10',
      borderCouleur: 'border-orange-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous sur le banc',
        'Descendez lentement',
        'Poussez vers le haut',
        'Maintenez la tension'
      ],
      conseils: 'Gardez les coudes près du corps',
      variations: ['Dips lestés', 'Dips sur barres', 'Dips assistés']
    },
    {
      id: 'lateral-raise',
      nom: 'Élévation Latérale',
      description: 'Exercice d\'isolation pour les épaules',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Épaules (moyen)', 'Trapèzes'],
      equipement: 'Haltères',
      image: '💪',
      couleur: 'from-cyan-500 to-blue-500',
      bgCouleur: 'from-cyan-500/10 to-blue-500/10',
      borderCouleur: 'border-cyan-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Tenez les haltères à vos côtés',
        'Levez les bras sur les côtés',
        'Montez jusqu\'à l\'horizontale',
        'Descendez lentement'
      ],
      conseils: 'Contrôlez la descente',
      variations: ['Élévation latérale câble', 'Élévation latérale unilatérale', 'Élévation latérale inclinée']
    },
    {
      id: 'rear-delt-fly',
      nom: 'Élévation Postérieure',
      description: 'Exercice pour les deltoïdes postérieurs',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Épaules (postérieur)', 'Trapèzes'],
      equipement: 'Haltères',
      image: '💪',
      couleur: 'from-indigo-500 to-purple-500',
      bgCouleur: 'from-indigo-500/10 to-purple-500/10',
      borderCouleur: 'border-indigo-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Penchez-vous vers l\'avant',
        'Tenez les haltères',
        'Écartez les bras vers l\'arrière',
        'Contractez les omoplates'
      ],
      conseils: 'Gardez le dos droit',
      variations: ['Élévation postérieure câble', 'Élévation postérieure inclinée', 'Élévation postérieure unilatérale']
    },
    {
      id: 'leg-press',
      nom: 'Presse à Jambes',
      description: 'Exercice pour les jambes sur machine',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Débutant',
      muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
      equipement: 'Machine presse',
      image: '🏋️‍♂️',
      couleur: 'from-red-500 to-pink-500',
      bgCouleur: 'from-red-500/10 to-pink-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Asseyez-vous sur la machine',
        'Placez les pieds sur la plateforme',
        'Poussez avec les jambes',
        'Descendez lentement'
      ],
      conseils: 'Contrôlez le mouvement',
      variations: ['Presse à jambes unilatérale', 'Presse à jambes inclinée', 'Presse à jambes lestée']
    },
    {
      id: 'leg-extension',
      nom: 'Extension de Jambes',
      description: 'Exercice d\'isolation pour les quadriceps',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Quadriceps'],
      equipement: 'Machine extension',
      image: '🏋️‍♀️',
      couleur: 'from-blue-500 to-cyan-500',
      bgCouleur: 'from-blue-500/10 to-cyan-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Asseyez-vous sur la machine',
        'Placez les jambes sous les rouleaux',
        'Étendez les jambes',
        'Descendez lentement'
      ],
      conseils: 'Contrôlez la descente',
      variations: ['Extension unilatérale', 'Extension lestée', 'Extension isométrique']
    },
    {
      id: 'leg-curl',
      nom: 'Curl de Jambes',
      description: 'Exercice d\'isolation pour les ischio-jambiers',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Ischio-jambiers'],
      equipement: 'Machine curl',
      image: '🏋️‍♂️',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-500/10 to-emerald-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Allongez-vous sur la machine',
        'Placez les chevilles sous les rouleaux',
        'Curl les jambes vers les fessiers',
        'Descendez lentement'
      ],
      conseils: 'Contrôlez le mouvement',
      variations: ['Curl unilatéral', 'Curl lesté', 'Curl isométrique']
    },
    {
      id: 'calf-raise',
      nom: 'Mollets',
      description: 'Exercice pour les mollets',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Mollets'],
      equipement: 'Machine mollets',
      image: '🏋️‍♀️',
      couleur: 'from-purple-500 to-violet-500',
      bgCouleur: 'from-purple-500/10 to-violet-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous sur la machine',
        'Montez sur la pointe des pieds',
        'Descendez lentement',
        'Répétez le mouvement'
      ],
      conseils: 'Contrôlez la descente',
      variations: ['Mollets debout', 'Mollets assis', 'Mollets unilatéraux']
    },

    // Nouveaux exercices Endurance/Cardio
    {
      id: 'hiit-interval',
      nom: 'HIIT Intervalle',
      description: 'Entraînement par intervalles à haute intensité',
      categorie: 'Endurance',
      type: 'HIIT',
      difficulte: 'Avancé',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '⚡',
      couleur: 'from-red-500 to-orange-500',
      bgCouleur: 'from-red-500/10 to-orange-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Zap className="w-6 h-6" />,
      instructions: [
        'Échauffez-vous 5 minutes',
        'Alternez 30 sec intense / 30 sec récup',
        'Maintenez l\'intensité',
        'Terminez par un retour au calme'
      ],
      conseils: 'Intensité maximale pendant les phases actives',
      variations: ['HIIT 20/10', 'HIIT 45/15', 'HIIT Tabata']
    },
    {
      id: 'elliptical',
      nom: 'Elliptique',
      description: 'Exercice cardio sur machine elliptique',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Débutant',
      muscles: ['Jambes', 'Bras', 'Cœur'],
      equipement: 'Machine elliptique',
      image: '🏃‍♂️',
      couleur: 'from-blue-500 to-indigo-500',
      bgCouleur: 'from-blue-500/10 to-indigo-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Montez sur la machine',
        'Ajustez la résistance',
        'Maintenez un rythme régulier',
        'Utilisez les bras et les jambes'
      ],
      conseils: 'Posture droite et rythme constant',
      variations: ['Elliptique incliné', 'Elliptique en arrière', 'Elliptique intervalle']
    },
    {
      id: 'step-mill',
      nom: 'Step Mill',
      description: 'Escalier mécanique pour le cardio',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Intermédiaire',
      muscles: ['Jambes', 'Fessiers', 'Cœur'],
      equipement: 'Step mill',
      image: '🏃‍♀️',
      couleur: 'from-green-500 to-teal-500',
      bgCouleur: 'from-green-500/10 to-teal-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Montez sur la machine',
        'Ajustez la vitesse',
        'Montez les marches',
        'Maintenez le rythme'
      ],
      conseils: 'Posture droite et pas réguliers',
      variations: ['Step mill lent', 'Step mill rapide', 'Step mill intervalle']
    },
    {
      id: 'treadmill',
      nom: 'Tapis de Course',
      description: 'Course sur tapis roulant',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Débutant',
      muscles: ['Jambes', 'Cœur', 'Poumons'],
      equipement: 'Tapis de course',
      image: '🏃‍♂️',
      couleur: 'from-purple-500 to-pink-500',
      bgCouleur: 'from-purple-500/10 to-pink-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Montez sur le tapis',
        'Ajustez la vitesse',
        'Commencez lentement',
        'Augmentez progressivement'
      ],
      conseils: 'Échauffement et hydratation importants',
      variations: ['Course inclinée', 'Course intervalle', 'Course longue distance']
    },
    {
      id: 'rowing-machine',
      nom: 'Rameur Machine',
      description: 'Exercice complet sur machine rameur',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Machine rameur',
      image: '🚣‍♂️',
      couleur: 'from-cyan-500 to-blue-500',
      bgCouleur: 'from-cyan-500/10 to-blue-500/10',
      borderCouleur: 'border-cyan-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Asseyez-vous sur la machine',
        'Ajustez la résistance',
        'Commencez par les jambes',
        'Tirez avec les bras'
      ],
      conseils: 'Séquence jambes-bras-dos importante',
      variations: ['Rameur court', 'Rameur long', 'Rameur intervalle']
    },
    {
      id: 'spin-bike',
      nom: 'Vélo Spinning',
      description: 'Cyclisme en salle sur vélo spinning',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Intermédiaire',
      muscles: ['Jambes', 'Cœur', 'Poumons'],
      equipement: 'Vélo spinning',
      image: '🚴‍♀️',
      couleur: 'from-orange-500 to-red-500',
      bgCouleur: 'from-orange-500/10 to-red-500/10',
      borderCouleur: 'border-orange-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Ajustez la selle et le guidon',
        'Ajustez la résistance',
        'Maintenez un rythme de pédalage',
        'Variez l\'intensité'
      ],
      conseils: 'Position et résistance importantes',
      variations: ['Spinning lent', 'Spinning rapide', 'Spinning intervalle']
    },

    // Nouveaux exercices Calisthéniques
    {
      id: 'pull-ups',
      nom: 'Tractions Larges',
      description: 'Tractions avec prise large',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Intermédiaire',
      muscles: ['Dos', 'Biceps', 'Épaules'],
      equipement: 'Barre de traction',
      image: '🤸‍♂️',
      couleur: 'from-blue-500 to-cyan-500',
      bgCouleur: 'from-blue-500/10 to-cyan-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Suspendez-vous à la barre',
        'Prise large',
        'Tirez vers le haut',
        'Descendez lentement'
      ],
      conseils: 'Contrôlez le mouvement',
      variations: ['Tractions serrées', 'Tractions lestées', 'Tractions assistées']
    },
    {
      id: 'chin-ups',
      nom: 'Tractions Serrées',
      description: 'Tractions avec prise serrée',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Intermédiaire',
      muscles: ['Biceps', 'Dos', 'Épaules'],
      equipement: 'Barre de traction',
      image: '🤸‍♀️',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-500/10 to-emerald-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Suspendez-vous à la barre',
        'Prise serrée',
        'Tirez vers le haut',
        'Descendez lentement'
      ],
      conseils: 'Focus sur les biceps',
      variations: ['Tractions larges', 'Tractions lestées', 'Tractions assistées']
    },
    {
      id: 'diamond-push-ups',
      nom: 'Pompes Diamant',
      description: 'Pompes avec les mains en diamant',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Avancé',
      muscles: ['Triceps', 'Poitrine', 'Épaules'],
      equipement: 'Aucun',
      image: '💪',
      couleur: 'from-purple-500 to-violet-500',
      bgCouleur: 'from-purple-500/10 to-violet-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en planche',
        'Placez les mains en diamant',
        'Descendez vers le sol',
        'Poussez vers le haut'
      ],
      conseils: 'Focus sur les triceps',
      variations: ['Pompes inclinées', 'Pompes déclinées', 'Pompes lestées']
    },
    {
      id: 'archer-push-ups',
      nom: 'Pompes Archer',
      description: 'Pompes avec déplacement latéral',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Expert',
      muscles: ['Poitrine', 'Triceps', 'Core'],
      equipement: 'Aucun',
      image: '🏹',
      couleur: 'from-red-500 to-orange-500',
      bgCouleur: 'from-red-500/10 to-orange-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en planche',
        'Déplacez le poids sur un bras',
        'Descendez latéralement',
        'Poussez vers le haut'
      ],
      conseils: 'Contrôle et équilibre',
      variations: ['Pompes archer assistées', 'Pompes archer lestées', 'Pompes archer dynamiques']
    },
    {
      id: 'one-arm-push-ups',
      nom: 'Pompes Unilatérales',
      description: 'Pompes sur un seul bras',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Expert',
      muscles: ['Poitrine', 'Triceps', 'Core'],
      equipement: 'Aucun',
      image: '💪',
      couleur: 'from-indigo-500 to-purple-500',
      bgCouleur: 'from-indigo-500/10 to-purple-500/10',
      borderCouleur: 'border-indigo-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en planche',
        'Placez une main au sol',
        'Descendez vers le sol',
        'Poussez vers le haut'
      ],
      conseils: 'Force et équilibre requis',
      variations: ['Pompes unilatérales assistées', 'Pompes unilatérales lestées', 'Pompes unilatérales dynamiques']
    },
    {
      id: 'handstand-push-ups',
      nom: 'Pompes Handstand',
      description: 'Pompes en position handstand',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Expert',
      muscles: ['Épaules', 'Triceps', 'Core'],
      equipement: 'Mur (optionnel)',
      image: '🤸‍♂️',
      couleur: 'from-yellow-500 to-orange-500',
      bgCouleur: 'from-yellow-500/10 to-orange-500/10',
      borderCouleur: 'border-yellow-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en handstand',
        'Descendez vers le sol',
        'Poussez vers le haut',
        'Maintenez l\'équilibre'
      ],
      conseils: 'Force des épaules et équilibre',
      variations: ['Pompes handstand contre mur', 'Pompes handstand assistées', 'Pompes handstand lestées']
    },
    {
      id: 'pike-push-ups',
      nom: 'Pompes Pike',
      description: 'Pompes en position pike',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Avancé',
      muscles: ['Épaules', 'Triceps', 'Core'],
      equipement: 'Aucun',
      image: '🏔️',
      couleur: 'from-cyan-500 to-blue-500',
      bgCouleur: 'from-cyan-500/10 to-blue-500/10',
      borderCouleur: 'border-cyan-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en pike',
        'Placez les mains au sol',
        'Descendez vers le sol',
        'Poussez vers le haut'
      ],
      conseils: 'Focus sur les épaules',
      variations: ['Pompes pike inclinées', 'Pompes pike lestées', 'Pompes pike dynamiques']
    },
    {
      id: 'wall-walk',
      nom: 'Wall Walk',
      description: 'Marche sur le mur',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Avancé',
      muscles: ['Épaules', 'Core', 'Équilibre'],
      equipement: 'Mur',
      image: '🤸‍♂️',
      couleur: 'from-green-500 to-teal-500',
      bgCouleur: 'from-green-500/10 to-teal-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Commencez en position de pompe',
        'Marchez les pieds vers le mur',
        'Montez les mains',
        'Terminez en handstand'
      ],
      conseils: 'Contrôle et équilibre',
      variations: ['Wall walk assisté', 'Wall walk lesté', 'Wall walk dynamique']
    },
    {
      id: 'human-flag',
      nom: 'Human Flag',
      description: 'Drapeau humain',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Expert',
      muscles: ['Core', 'Épaules', 'Dos'],
      equipement: 'Poteau',
      image: '��‍♂️',
      couleur: 'from-red-500 to-pink-500',
      bgCouleur: 'from-red-500/10 to-pink-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Saisissez le poteau',
        'Levez le corps horizontalement',
        'Maintenez la position',
        'Contrôlez la descente'
      ],
      conseils: 'Force du core et des épaules',
      variations: ['Human flag assisté', 'Human flag lesté', 'Human flag dynamique']
    },

    // Nouveaux exercices Crossfit
    {
      id: 'kettlebell-goblet-squat',
      nom: 'Goblet Squat',
      description: 'Squat avec kettlebell en goblet',
      categorie: 'Crossfit',
      type: 'Compound',
      difficulte: 'Débutant',
      muscles: ['Jambes', 'Fessiers', 'Core'],
      equipement: 'Kettlebell',
      image: '🏋️‍♂️',
      couleur: 'from-orange-500 to-yellow-500',
      bgCouleur: 'from-orange-500/10 to-yellow-500/10',
      borderCouleur: 'border-orange-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez la kettlebell en goblet',
        'Descendez en squat',
        'Gardez le dos droit',
        'Remontez en contractant'
      ],
      conseils: 'Contrôlez le mouvement',
      variations: ['Goblet squat lesté', 'Goblet squat dynamique', 'Goblet squat unilatéral']
    },
    {
      id: 'kettlebell-turkish-get-up',
      nom: 'Turkish Get-Up Kettlebell',
      description: 'Turkish Get-Up avec kettlebell',
      categorie: 'Crossfit',
      type: 'Complex',
      difficulte: 'Avancé',
      muscles: ['Tout le corps'],
      equipement: 'Kettlebell',
      image: '🏋️‍♀️',
      couleur: 'from-purple-500 to-violet-500',
      bgCouleur: 'from-purple-500/10 to-violet-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Allongez-vous avec la kettlebell',
        'Levez la kettlebell',
        'Passez par différentes positions',
        'Terminez debout'
      ],
      conseils: 'Mouvement complexe, apprendre progressivement',
      variations: ['TGU assisté', 'TGU lesté', 'TGU dynamique']
    },
    {
      id: 'kettlebell-snatch',
      nom: 'Kettlebell Snatch',
      description: 'Arraché avec kettlebell',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Avancé',
      muscles: ['Tout le corps'],
      equipement: 'Kettlebell',
      image: '🏋️‍♂️',
      couleur: 'from-red-500 to-orange-500',
      bgCouleur: 'from-red-500/10 to-orange-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Commencez avec la kettlebell au sol',
        'Tirez la kettlebell vers le haut',
        'Attrapez la kettlebell au-dessus de la tête',
        'Stabilisez la position'
      ],
      conseils: 'Technique et puissance',
      variations: ['Snatch assisté', 'Snatch lesté', 'Snatch dynamique']
    },
    {
      id: 'kettlebell-clean',
      nom: 'Kettlebell Clean',
      description: 'Épaulé avec kettlebell',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Avancé',
      muscles: ['Tout le corps'],
      equipement: 'Kettlebell',
      image: '🏋️‍♀️',
      couleur: 'from-blue-500 to-cyan-500',
      bgCouleur: 'from-blue-500/10 to-cyan-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Commencez avec la kettlebell au sol',
        'Tirez la kettlebell vers le haut',
        'Attrapez la kettlebell sur l\'épaule',
        'Stabilisez la position'
      ],
      conseils: 'Technique et puissance',
      variations: ['Clean assisté', 'Clean lesté', 'Clean dynamique']
    },
    {
      id: 'kettlebell-farmers-walk',
      nom: 'Kettlebell Farmers Walk',
      description: 'Marche avec kettlebells',
      categorie: 'Crossfit',
      type: 'Carry',
      difficulte: 'Intermédiaire',
      muscles: ['Trapèzes', 'Core', 'Grip'],
      equipement: 'Kettlebells',
      image: '🏋️‍♂️',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-500/10 to-emerald-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez les kettlebells à vos côtés',
        'Gardez le dos droit',
        'Marchez avec des pas courts',
        'Maintenez la tension'
      ],
      conseils: 'Grip et posture importants',
      variations: ['Farmers walk lesté', 'Farmers walk alterné', 'Farmers walk sur distance']
    },
    {
      id: 'kettlebell-suitcase-carry',
      nom: 'Suitcase Carry',
      description: 'Portage unilatéral avec kettlebell',
      categorie: 'Crossfit',
      type: 'Carry',
      difficulte: 'Intermédiaire',
      muscles: ['Core', 'Trapèzes', 'Grip'],
      equipement: 'Kettlebell',
      image: '🎒',
      couleur: 'from-indigo-500 to-purple-500',
      bgCouleur: 'from-indigo-500/10 to-purple-500/10',
      borderCouleur: 'border-indigo-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez la kettlebell d\'un côté',
        'Gardez le dos droit',
        'Marchez avec contrôle',
        'Changez de côté régulièrement'
      ],
      conseils: 'Stabilité du core',
      variations: ['Suitcase carry lesté', 'Suitcase carry alterné', 'Suitcase carry dynamique']
    },
    {
      id: 'kettlebell-windmill',
      nom: 'Kettlebell Windmill',
      description: 'Mouvement de moulin avec kettlebell',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Avancé',
      muscles: ['Core', 'Épaules', 'Hanche'],
      equipement: 'Kettlebell',
      image: '🌪️',
      couleur: 'from-cyan-500 to-blue-500',
      bgCouleur: 'from-cyan-500/10 to-blue-500/10',
      borderCouleur: 'border-cyan-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez la kettlebell au-dessus de la tête',
        'Descendez latéralement',
        'Touchez le sol',
        'Remontez en contractant'
      ],
      conseils: 'Mobilité et contrôle',
      variations: ['Windmill assisté', 'Windmill lesté', 'Windmill dynamique']
    },
    {
      id: 'kettlebell-figure-8',
      nom: 'Kettlebell Figure 8',
      description: 'Mouvement en forme de 8 avec kettlebell',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Core', 'Épaules', 'Hanche'],
      equipement: 'Kettlebell',
      image: '8️⃣',
      couleur: 'from-purple-500 to-pink-500',
      bgCouleur: 'from-purple-500/10 to-pink-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez la kettlebell à deux mains',
        'Créez un mouvement en 8',
        'Maintenez le rythme',
        'Variez les directions'
      ],
      conseils: 'Coordination et rythme',
      variations: ['Figure 8 assisté', 'Figure 8 lesté', 'Figure 8 dynamique']
    },
    {
      id: 'kettlebell-halo',
      nom: 'Kettlebell Halo',
      description: 'Mouvement circulaire avec kettlebell',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Épaules', 'Core', 'Mobilité'],
      equipement: 'Kettlebell',
      image: '🌪️',
      couleur: 'from-yellow-500 to-orange-500',
      bgCouleur: 'from-yellow-500/10 to-orange-500/10',
      borderCouleur: 'border-yellow-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez la kettlebell à deux mains',
        'Créez un mouvement circulaire',
        'Maintenez le rythme',
        'Variez les directions'
      ],
      conseils: 'Mobilité des épaules',
      variations: ['Halo assisté', 'Halo lesté', 'Halo dynamique']
    },
    {
      id: 'kettlebell-bottoms-up',
      nom: 'Kettlebell Bottoms Up',
      description: 'Kettlebell tenu à l\'envers',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Avancé',
      muscles: ['Épaules', 'Core', 'Stabilité'],
      equipement: 'Kettlebell',
      image: '��',
      couleur: 'from-red-500 to-pink-500',
      bgCouleur: 'from-red-500/10 to-pink-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Tenez la kettlebell à l\'envers',
        'Maintenez la stabilité',
        'Effectuez des mouvements',
        'Contrôlez la kettlebell'
      ],
      conseils: 'Stabilité et contrôle',
      variations: ['Bottoms up assisté', 'Bottoms up lesté', 'Bottoms up dynamique']
    },

    // Derniers exercices Force/Powerlifting
    {
      id: 'barbell-shrugs',
      nom: 'Haussements d\'Épaules',
      description: 'Exercice pour les trapèzes avec barre',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Trapèzes', 'Épaules'],
      equipement: 'Barre',
      image: '🏋️‍♂️',
      couleur: 'from-gray-500 to-slate-500',
      bgCouleur: 'from-white/5 to-white/10',
      borderCouleur: 'border-white/10/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Tenez la barre avec les bras tendus',
        'Haussez les épaules vers le haut',
        'Contractez les trapèzes',
        'Descendez lentement'
      ],
      conseils: 'Contrôlez le mouvement',
      variations: ['Haussements haltères', 'Haussements câble', 'Haussements lestés']
    },
    {
      id: 'face-pulls',
      nom: 'Face Pulls',
      description: 'Exercice pour les deltoïdes postérieurs avec câble',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Épaules (postérieur)', 'Trapèzes'],
      equipement: 'Câble',
      image: '💪',
      couleur: 'from-teal-500 to-cyan-500',
      bgCouleur: 'from-teal-500/10 to-cyan-500/10',
      borderCouleur: 'border-teal-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Tenez la corde à hauteur des yeux',
        'Tirez vers le visage',
        'Écartez les bras',
        'Contractez les omoplates'
      ],
      conseils: 'Contrôlez la phase excentrique',
      variations: ['Face pulls haltères', 'Face pulls bande', 'Face pulls lestés']
    },
    {
      id: 'reverse-flyes',
      nom: 'Élévations Postérieures',
      description: 'Exercice pour les deltoïdes postérieurs',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Épaules (postérieur)', 'Trapèzes'],
      equipement: 'Haltères',
      image: '💪',
      couleur: 'from-rose-500 to-pink-500',
      bgCouleur: 'from-rose-500/10 to-pink-500/10',
      borderCouleur: 'border-rose-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Penchez-vous vers l\'avant',
        'Tenez les haltères',
        'Écartez les bras vers l\'arrière',
        'Contractez les omoplates'
      ],
      conseils: 'Gardez le dos droit',
      variations: ['Élévations câble', 'Élévations inclinées', 'Élévations unilatérales']
    },
    {
      id: 'preacher-curl',
      nom: 'Curl Prédicateur',
      description: 'Curl pour les biceps sur banc prédicateur',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Biceps'],
      equipement: 'Banc prédicateur + Barre',
      image: '💪',
      couleur: 'from-emerald-500 to-green-500',
      bgCouleur: 'from-emerald-500/10 to-green-500/10',
      borderCouleur: 'border-emerald-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Asseyez-vous sur le banc',
        'Placez les bras sur le support',
        'Curl la barre vers le haut',
        'Descendez lentement'
      ],
      conseils: 'Contrôlez le mouvement',
      variations: ['Curl prédicateur haltères', 'Curl prédicateur câble', 'Curl prédicateur lesté']
    },
    {
      id: 'hammer-curl',
      nom: 'Curl Marteau',
      description: 'Curl avec prise marteau pour les biceps',
      categorie: 'Force',
      type: 'Isolation',
      difficulte: 'Débutant',
      muscles: ['Biceps', 'Avant-bras'],
      equipement: 'Haltères',
      image: '🔨',
      couleur: 'from-amber-500 to-yellow-500',
      bgCouleur: 'from-amber-500/10 to-yellow-500/10',
      borderCouleur: 'border-amber-200/50',
      icon: <Dumbbell className="w-6 h-6" />,
      instructions: [
        'Tenez les haltères avec prise marteau',
        'Curl vers le haut',
        'Maintenez la prise',
        'Descendez lentement'
      ],
      conseils: 'Contrôlez le mouvement',
      variations: ['Curl marteau alterné', 'Curl marteau lesté', 'Curl marteau unilatéral']
    },

    // Derniers exercices Endurance/Cardio
    {
      id: 'jump-rope',
      nom: 'Corde à Sauter',
      description: 'Exercice cardio avec corde à sauter',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Débutant',
      muscles: ['Mollets', 'Épaules', 'Core'],
      equipement: 'Corde à sauter',
      image: '🪢',
      couleur: 'from-pink-500 to-rose-500',
      bgCouleur: 'from-pink-500/10 to-rose-500/10',
      borderCouleur: 'border-pink-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Tenez la corde à sauter',
        'Sautez en synchronisant',
        'Maintenez le rythme',
        'Variez les patterns'
      ],
      conseils: 'Coordination et rythme',
      variations: ['Saut simple', 'Saut alterné', 'Saut croisé']
    },
    {
      id: 'mountain-climbers',
      nom: 'Mountain Climbers',
      description: 'Exercice cardio au poids du corps',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '🏔️',
      couleur: 'from-slate-500 to-gray-500',
      bgCouleur: 'from-primary/10 to-secondary/10',
      borderCouleur: 'border-slate-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en planche',
        'Alternez les genoux',
        'Maintenez le rythme',
        'Gardez le core contracté'
      ],
      conseils: 'Rythme et contrôle',
      variations: ['Mountain climbers lents', 'Mountain climbers rapides', 'Mountain climbers lestés']
    },
    {
      id: 'jumping-jacks',
      nom: 'Jumping Jacks',
      description: 'Exercice cardio de base',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Débutant',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '🤸‍♂️',
      couleur: 'from-violet-500 to-purple-500',
      bgCouleur: 'from-violet-500/10 to-purple-500/10',
      borderCouleur: 'border-violet-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Commencez debout',
        'Sautez en écartant les jambes',
        'Levez les bras',
        'Retournez à la position de départ'
      ],
      conseils: 'Rythme et coordination',
      variations: ['Jumping jacks lents', 'Jumping jacks rapides', 'Jumping jacks lestés']
    },
    {
      id: 'high-knees',
      nom: 'High Knees',
      description: 'Course sur place avec genoux hauts',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Débutant',
      muscles: ['Jambes', 'Core'],
      equipement: 'Aucun',
      image: '🏃‍♂️',
      couleur: 'from-lime-500 to-green-500',
      bgCouleur: 'from-lime-500/10 to-green-500/10',
      borderCouleur: 'border-lime-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Commencez debout',
        'Courez sur place',
        'Levez les genoux haut',
        'Maintenez le rythme'
      ],
      conseils: 'Rythme et contrôle',
      variations: ['High knees lents', 'High knees rapides', 'High knees lestés']
    },
    {
      id: 'butt-kicks',
      nom: 'Butt Kicks',
      description: 'Course sur place en touchant les fessiers',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Débutant',
      muscles: ['Jambes', 'Fessiers'],
      equipement: 'Aucun',
      image: '🏃‍♀️',
      couleur: 'from-orange-500 to-red-500',
      bgCouleur: 'from-orange-500/10 to-red-500/10',
      borderCouleur: 'border-orange-200/50',
      icon: <Activity className="w-6 h-6" />,
      instructions: [
        'Commencez debout',
        'Courez sur place',
        'Touchez les fessiers',
        'Maintenez le rythme'
      ],
      conseils: 'Rythme et contrôle',
      variations: ['Butt kicks lents', 'Butt kicks rapides', 'Butt kicks lestés']
    },

    // Derniers exercices Calisthéniques
    {
      id: 'dragon-flag',
      nom: 'Dragon Flag',
      description: 'Exercice avancé pour le core',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Expert',
      muscles: ['Core', 'Épaules'],
      equipement: 'Banc',
      image: '🐉',
      couleur: 'from-red-500 to-orange-500',
      bgCouleur: 'from-red-500/10 to-orange-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Allongez-vous sur le banc',
        'Tenez le banc derrière la tête',
        'Levez le corps',
        'Maintenez la position'
      ],
      conseils: 'Force du core requise',
      variations: ['Dragon flag assisté', 'Dragon flag lesté', 'Dragon flag dynamique']
    },
    {
      id: 'front-lever',
      nom: 'Front Lever',
      description: 'Position horizontale suspendue',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Expert',
      muscles: ['Core', 'Dos', 'Épaules'],
      equipement: 'Barre de traction',
      image: '🤸‍♂️',
      couleur: 'from-blue-500 to-cyan-500',
      bgCouleur: 'from-blue-500/10 to-cyan-500/10',
      borderCouleur: 'border-blue-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Suspendez-vous à la barre',
        'Levez le corps horizontalement',
        'Maintenez la position',
        'Contrôlez la descente'
      ],
      conseils: 'Force du core et du dos',
      variations: ['Front lever assisté', 'Front lever lesté', 'Front lever dynamique']
    },
    {
      id: 'back-lever',
      nom: 'Back Lever',
      description: 'Position horizontale suspendue sur le dos',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Expert',
      muscles: ['Core', 'Dos', 'Épaules'],
      equipement: 'Barre de traction',
      image: '🤸‍♀️',
      couleur: 'from-purple-500 to-violet-500',
      bgCouleur: 'from-purple-500/10 to-violet-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Suspendez-vous à la barre',
        'Levez le corps horizontalement',
        'Maintenez la position',
        'Contrôlez la descente'
      ],
      conseils: 'Force du core et du dos',
      variations: ['Back lever assisté', 'Back lever lesté', 'Back lever dynamique']
    },
    {
      id: 'planche-progression',
      nom: 'Planche Progression',
      description: 'Progression de la planche',
      categorie: 'Calisthéniques',
      type: 'Isométrique',
      difficulte: 'Débutant',
      muscles: ['Core', 'Épaules'],
      equipement: 'Aucun',
      image: '‍♂️',
      couleur: 'from-indigo-500 to-blue-500',
      bgCouleur: 'from-indigo-500/10 to-blue-500/10',
      borderCouleur: 'border-indigo-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Commencez sur les genoux',
        'Progressez vers les avant-bras',
        'Puis sur les mains',
        'Maintenez chaque position'
      ],
      conseils: 'Progression graduelle',
      variations: ['Planche genoux', 'Planche avant-bras', 'Planche mains']
    },
    {
      id: 'side-plank',
      nom: 'Planche Latérale',
      description: 'Planche sur le côté',
      categorie: 'Calisthéniques',
      type: 'Isométrique',
      difficulte: 'Intermédiaire',
      muscles: ['Core', 'Épaules'],
      equipement: 'Aucun',
      image: '🧘‍♀️',
      couleur: 'from-teal-500 to-cyan-500',
      bgCouleur: 'from-teal-500/10 to-cyan-500/10',
      borderCouleur: 'border-teal-200/50',
      icon: <Users className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous sur le côté',
        'Appuyez-vous sur l\'avant-bras',
        'Levez les hanches',
        'Maintenez la position'
      ],
      conseils: 'Gardez le corps droit',
      variations: ['Planche latérale genoux', 'Planche latérale mains', 'Planche latérale lestée']
    },

    // Derniers exercices Crossfit
    {
      id: 'devil-press',
      nom: 'Devil Press',
      description: 'Exercice combiné burpee + kettlebell',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Avancé',
      muscles: ['Tout le corps'],
      equipement: 'Kettlebell',
      image: '😈',
      couleur: 'from-red-500 to-pink-500',
      bgCouleur: 'from-red-500/10 to-pink-500/10',
      borderCouleur: 'border-red-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Commencez avec la kettlebell',
        'Faites un burpee',
        'Saisissez la kettlebell',
        'Levez-la au-dessus de la tête'
      ],
      conseils: 'Intensité et technique',
      variations: ['Devil press lesté', 'Devil press alterné', 'Devil press dynamique']
    },
    {
      id: 'man-makers',
      nom: 'Man Makers',
      description: 'Exercice combiné complexe',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Expert',
      muscles: ['Tout le corps'],
      equipement: 'Haltères',
      image: '🏋️‍♂️',
      couleur: 'from-orange-500 to-yellow-500',
      bgCouleur: 'from-orange-500/10 to-yellow-500/10',
      borderCouleur: 'border-orange-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Commencez avec les haltères',
        'Faites un burpee',
        'Faites un rowing',
        'Terminez par un thruster'
      ],
      conseils: 'Technique et endurance',
      variations: ['Man makers lestés', 'Man makers alternés', 'Man makers dynamiques']
    },
    {
      id: 'devil-press-dumbbell',
      nom: 'Devil Press Haltères',
      description: 'Devil Press avec haltères',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Avancé',
      muscles: ['Tout le corps'],
      equipement: 'Haltères',
      image: '😈',
      couleur: 'from-purple-500 to-violet-500',
      bgCouleur: 'from-purple-500/10 to-violet-500/10',
      borderCouleur: 'border-purple-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Commencez avec les haltères',
        'Faites un burpee',
        'Saisissez les haltères',
        'Levez-les au-dessus de la tête'
      ],
      conseils: 'Intensité et technique',
      variations: ['Devil press haltères lestés', 'Devil press haltères alternés', 'Devil press haltères dynamiques']
    },
    {
      id: 'bear-crawl',
      nom: 'Bear Crawl',
      description: 'Marche à quatre pattes',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '🐻',
      couleur: 'from-amber-500 to-orange-500',
      bgCouleur: 'from-amber-500/10 to-orange-500/10',
      borderCouleur: 'border-amber-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous à quatre pattes',
        'Gardez les genoux légèrement décollés',
        'Marchez en avant',
        'Maintenez la position'
      ],
      conseils: 'Contrôle et coordination',
      variations: ['Bear crawl lent', 'Bear crawl rapide', 'Bear crawl lesté']
    },
    {
      id: 'crab-walk',
      nom: 'Crab Walk',
      description: 'Marche en position de crabe',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '🦀',
      couleur: 'from-cyan-500 to-blue-500',
      bgCouleur: 'from-cyan-500/10 to-blue-500/10',
      borderCouleur: 'border-cyan-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en position de crabe',
        'Marchez en arrière',
        'Maintenez la position',
        'Contrôlez le mouvement'
      ],
      conseils: 'Contrôle et coordination',
      variations: ['Crab walk lent', 'Crab walk rapide', 'Crab walk lesté']
    },
    {
      id: 'duck-walk',
      nom: 'Duck Walk',
      description: 'Marche en position accroupie',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Jambes', 'Fessiers', 'Core'],
      equipement: 'Aucun',
      image: '🦆',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-500/10 to-emerald-500/10',
      borderCouleur: 'border-green-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en position accroupie',
        'Marchez en avant',
        'Maintenez la position',
        'Contrôlez le mouvement'
      ],
      conseils: 'Contrôle et coordination',
      variations: ['Duck walk lent', 'Duck walk rapide', 'Duck walk lesté']
    },
    {
      id: 'inchworm',
      nom: 'Inchworm',
      description: 'Mouvement de chenille',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '🐛',
      couleur: 'from-lime-500 to-green-500',
      bgCouleur: 'from-lime-500/10 to-green-500/10',
      borderCouleur: 'border-lime-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Commencez debout',
        'Penchez-vous vers l\'avant',
        'Marchez avec les mains',
        'Revenez à la position de départ'
      ],
      conseils: 'Contrôle et coordination',
      variations: ['Inchworm lent', 'Inchworm rapide', 'Inchworm lesté']
    },
    {
      id: 'spiderman-crawl',
      nom: 'Spider Crawl',
      description: 'Marche en position de spider',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Avancé',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '🕷️',
      couleur: 'from-slate-500 to-gray-500',
      bgCouleur: 'from-primary/10 to-secondary/10',
      borderCouleur: 'border-slate-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en planche',
        'Marchez avec les mains et les pieds',
        'Maintenez la position',
        'Contrôlez le mouvement'
      ],
      conseils: 'Contrôle et coordination',
      variations: ['Spider crawl lent', 'Spider crawl rapide', 'Spider crawl lesté']
    },
    {
      id: 'alligator-crawl',
      nom: 'Alligator Crawl',
      description: 'Marche en position d\'alligator',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Avancé',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '🐊',
      couleur: 'from-emerald-500 to-teal-500',
      bgCouleur: 'from-emerald-500/10 to-teal-500/10',
      borderCouleur: 'border-emerald-200/50',
      icon: <Flame className="w-6 h-6" />,
      instructions: [
        'Positionnez-vous en planche',
        'Marchez en alternant',
        'Maintenez la position',
        'Contrôlez le mouvement'
      ],
      conseils: 'Contrôle et coordination',
      variations: ['Alligator crawl lent', 'Alligator crawl rapide', 'Alligator crawl lesté']
    }
  ];

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'Force', label: 'Force' },
    { value: 'Endurance', label: 'Endurance' },
    { value: 'Calisthéniques', label: 'Calisthéniques' },
    { value: 'Crossfit', label: 'Crossfit' }
  ];

  const filteredExercices = exercices.filter(exercice => {
    const matchesSearch = exercice.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercice.muscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || exercice.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getExercicesBySportClass = (sportClass: string) => {
    switch (sportClass) {
      case 'power': return exercices.filter(e => e.categorie === 'Force');
      case 'marathon': return exercices.filter(e => e.categorie === 'Endurance');
      case 'crossfit': return exercices.filter(e => e.categorie === 'Crossfit');
      case 'calisthenics': return exercices.filter(e => e.categorie === 'Calisthéniques');
      default: return exercices;
    }
  };

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="space-y-8">
          {/* Header Principal - VitalForce DA */}
          <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-[var(--shadow-glow-purple)] glass-card border border-primary/30">
            <div className="absolute inset-0 gradient-primary opacity-80"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-secondary/20 to-transparent rounded-full -translate-y-32 translate-x-32 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-transparent rounded-full translate-y-24 -translate-x-24 animate-float"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <Dumbbell className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold tracking-tight">
                        Exercices d'Entraînement
                      </h1>
                      <p className="text-white/90 text-lg mt-2">Bibliothèque complète d'exercices</p>
                    </div>
        </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-white font-semibold shadow-lg backdrop-blur-sm">
                      <Target className="w-5 h-5" />
                      <span>{exercices.length} exercices</span>
            </div>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-white font-semibold shadow-lg backdrop-blur-sm">
                      <Star className="w-5 h-5" />
                      <span>{categories.length - 1} catégories</span>
                    </div>
                  </div>
                </div>

                <div className="lg:text-right space-y-4">
                  <div className="text-white/90 font-medium">Exercices recommandés</div>
                  <div className="text-2xl font-bold text-white">
                    {getExercicesBySportClass(user?.sportClass || 'classique').length}
                  </div>
                  <div className="text-sm text-white/80">
                    pour {user?.sportClass === 'power' ? 'Powerlifting' : 
                          user?.sportClass === 'marathon' ? 'Marathon' :
                          user?.sportClass === 'crossfit' ? 'Crossfit' :
                          user?.sportClass === 'calisthenics' ? 'Calisthéniques' : 'Votre sport'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filtres et recherche */}
          <Card className="glass-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/70 w-4 h-4" />
                <Input
                      placeholder="Rechercher un exercice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 glass-card border-primary/20 border-2 border-white/15 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 rounded-xl"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48 h-12 glass-card border-primary/20 border-2 border-white/15 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-primary/20 bg-white/10 backdrop-blur-sm border-0 shadow-xl rounded-xl">
                      {categories.map(category => (
                        <SelectItem 
                          key={category.value} 
                          value={category.value}
                          className="hover:bg-blue-500/10 focus:bg-blue-500/10 transition-colors duration-200"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
            
                <div className="flex items-center gap-2">
                <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-10 w-10 p-0 rounded-xl"
                  >
                    <Grid className="w-4 h-4" />
                </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-10 w-10 p-0 rounded-xl"
                  >
                    <List className="w-4 h-4" />
                  </Button>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Liste des exercices */}
          <div className="space-y-6">
            {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercices.map((exercice) => (
            <Card 
                    key={exercice.id} 
                    className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedExercise(exercice.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg bg-gradient-to-r ${exercice.couleur}`}>
                          {exercice.icon}
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-white/5 text-foreground/90">
                            {exercice.difficulte}
                  </Badge>
                          <Badge variant="outline" className="border-blue-200 text-blue-400">
                            {exercice.type}
                          </Badge>
                    </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-blue-400 transition-colors">
                        {exercice.nom}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">{exercice.description}</p>
              </CardHeader>
            <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Target className="w-4 h-4" />
                          <span>{exercice.categorie}</span>
                  </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{exercice.muscles.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Dumbbell className="w-4 h-4" />
                          <span>{exercice.equipement}</span>
                        </div>
        </div>

                      <Button 
                        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExercise(exercice.id);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir les détails
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExercices.map((exercice) => (
                  <Card 
                    key={exercice.id} 
                    className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedExercise(exercice.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-r ${exercice.couleur}`}>
                          {exercice.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-blue-400 transition-colors">
                              {exercice.nom}
                            </h3>
                            <Badge variant="secondary" className="bg-white/5 text-foreground/90">
                              {exercice.difficulte}
                            </Badge>
                            <Badge variant="outline" className="border-blue-200 text-blue-400">
                              {exercice.type}
                          </Badge>
                    </div>
                          <p className="text-muted-foreground mb-3">{exercice.description}</p>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              <span>{exercice.categorie}</span>
                    </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{exercice.muscles.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Dumbbell className="w-4 h-4" />
                              <span>{exercice.equipement}</span>
                        </div>
                          </div>
                        </div>
                <Button 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                            setSelectedExercise(exercice.id);
                  }}
                >
                          <Eye className="w-4 h-4 mr-2" />
                          Voir
                    </Button>
                  </div>
                </CardContent>
              </Card>
        ))}
          </div>
            )}
          </div>

          {/* Modal de détails de l'exercice */}
          {selectedExercise && (() => {
            const exercice = exercices.find(e => e.id === selectedExercise);
            if (!exercice) return null;

            return (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl glass-card border-primary/20 bg-white/10 backdrop-blur-sm border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-r ${exercice.couleur}`}>
                          {exercice.icon}
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-foreground">{exercice.nom}</CardTitle>
                          <p className="text-muted-foreground">{exercice.description}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedExercise(null)}
                        className="h-10 w-10 p-0 rounded-xl"
                      >
                        ×
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Informations générales */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-200/50">
                        <div className="text-sm font-medium text-blue-400 mb-1">Catégorie</div>
                        <div className="text-lg font-bold text-foreground">{exercice.categorie}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-200/50">
                        <div className="text-sm font-medium text-green-400 mb-1">Type</div>
                        <div className="text-lg font-bold text-foreground">{exercice.type}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-2xl border border-purple-200/50">
                        <div className="text-sm font-medium text-purple-400 mb-1">Difficulté</div>
                        <div className="text-lg font-bold text-foreground">{exercice.difficulte}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl border border-orange-200/50">
                        <div className="text-sm font-medium text-orange-600 mb-1">Équipement</div>
                        <div className="text-lg font-bold text-foreground">{exercice.equipement}</div>
                      </div>
                    </div>

                    {/* Muscles travaillés */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Muscles Travaillés
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exercice.muscles.map((muscle, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-500/15 border border-blue-500/25 text-blue-300">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-500" />
                        Instructions
                      </h4>
                      <ol className="space-y-2">
                        {exercice.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-foreground/90">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Conseils */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Conseils
                      </h4>
                      <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-200/50">
                        <p className="text-foreground/90 font-medium">{exercice.conseils}</p>
                      </div>
                    </div>

                    {/* Variations */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-purple-500" />
                        Variations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exercice.variations.map((variation, index) => (
                          <Badge key={index} variant="outline" className="border-purple-200 text-purple-400">
                            {variation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default BlocsEntrainement;