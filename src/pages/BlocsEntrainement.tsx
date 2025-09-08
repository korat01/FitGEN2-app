import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import StatCard from '@/components/StatCard';
import ActionButton from '@/components/ActionButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Dumbbell, 
  Search, 
  Filter, 
  Plus, 
  Star, 
  Clock, 
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlocsEntrainement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // 120 entraînements variés
  const exerciseBlocks = [
    // Push Day
    {
      id: 1,
      name: "Push Day Classique",
      exercises: 4,
      duration: "75 min",
      difficulty: "Intermédiaire",
      category: "Push",
      popularity: 95,
      isPopular: true,
      description: "Développé couché, dips, élévations latérales, développé incliné"
    },
    {
      id: 2,
      name: "Push Day Intensif",
      exercises: 6,
      duration: "90 min",
      difficulty: "Avancé",
      category: "Push",
      popularity: 88,
      isPopular: true,
      description: "Développé couché, développé incliné, dips lestés, élévations, pompes"
    },
    {
      id: 3,
      name: "Push Day Débutant",
      exercises: 3,
      duration: "45 min",
      difficulty: "Débutant",
      category: "Push",
      popularity: 92,
      isPopular: true,
      description: "Développé couché, pompes, élévations latérales"
    },
    {
      id: 4,
      name: "Push Day Volume",
      exercises: 8,
      duration: "105 min",
      difficulty: "Avancé",
      category: "Push",
      popularity: 75,
      isPopular: false,
      description: "Séance haute volume pour la prise de masse"
    },

    // Pull Day
    {
      id: 5,
      name: "Pull Day Classique",
      exercises: 5,
      duration: "80 min",
      difficulty: "Intermédiaire",
      category: "Pull",
      popularity: 94,
      isPopular: true,
      description: "Tractions, rowing, curl biceps, face pull, shrugs"
    },
    {
      id: 6,
      name: "Pull Day Intensif",
      exercises: 7,
      duration: "95 min",
      difficulty: "Avancé",
      category: "Pull",
      popularity: 87,
      isPopular: true,
      description: "Tractions lestées, rowing barre, curl haltères, face pull"
    },
    {
      id: 7,
      name: "Pull Day Débutant",
      exercises: 4,
      duration: "50 min",
      difficulty: "Débutant",
      category: "Pull",
      popularity: 89,
      isPopular: true,
      description: "Tractions assistées, rowing machine, curl biceps"
    },
    {
      id: 8,
      name: "Pull Day Hypertrophie",
      exercises: 6,
      duration: "85 min",
      difficulty: "Intermédiaire",
      category: "Pull",
      popularity: 82,
      isPopular: false,
      description: "Focus sur l'hypertrophie des muscles du dos"
    },

    // Leg Day
    {
      id: 9,
      name: "Leg Day Classique",
      exercises: 6,
      duration: "90 min",
      difficulty: "Avancé",
      category: "Legs",
      popularity: 96,
      isPopular: true,
      description: "Squat, fentes, soulevé de terre, extensions, mollets"
    },
    {
      id: 10,
      name: "Leg Day Intensif",
      exercises: 8,
      duration: "110 min",
      difficulty: "Avancé",
      category: "Legs",
      popularity: 91,
      isPopular: true,
      description: "Squat lourd, fentes lestées, soulevé de terre, extensions"
    },
    {
      id: 11,
      name: "Leg Day Débutant",
      exercises: 4,
      duration: "60 min",
      difficulty: "Débutant",
      category: "Legs",
      popularity: 88,
      isPopular: true,
      description: "Squat, fentes, extensions, mollets"
    },
    {
      id: 12,
      name: "Leg Day Endurance",
      exercises: 5,
      duration: "75 min",
      difficulty: "Intermédiaire",
      category: "Legs",
      popularity: 79,
      isPopular: false,
      description: "Focus sur l'endurance musculaire"
    },

    // Full Body
    {
      id: 13,
      name: "Full Body Classique",
      exercises: 8,
      duration: "60 min",
      difficulty: "Débutant",
      category: "Full Body",
      popularity: 93,
      isPopular: true,
      description: "Squat, développé couché, tractions, fentes, dips"
    },
    {
      id: 14,
      name: "Full Body Intensif",
      exercises: 10,
      duration: "80 min",
      difficulty: "Intermédiaire",
      category: "Full Body",
      popularity: 86,
      isPopular: true,
      description: "Séance complète haute intensité"
    },
    {
      id: 15,
      name: "Full Body Débutant",
      exercises: 6,
      duration: "45 min",
      difficulty: "Débutant",
      category: "Full Body",
      popularity: 90,
      isPopular: true,
      description: "Séance d'initiation complète"
    },
    {
      id: 16,
      name: "Full Body Circuit",
      exercises: 12,
      duration: "70 min",
      difficulty: "Intermédiaire",
      category: "Full Body",
      popularity: 84,
      isPopular: false,
      description: "Entraînement en circuit"
    },

    // Cardio
    {
      id: 17,
      name: "Cardio HIIT",
      exercises: 8,
      duration: "30 min",
      difficulty: "Intermédiaire",
      category: "Cardio",
      popularity: 91,
      isPopular: true,
      description: "Entraînement par intervalles haute intensité"
    },
    {
      id: 18,
      name: "Cardio LISS",
      exercises: 3,
      duration: "45 min",
      difficulty: "Débutant",
      category: "Cardio",
      popularity: 78,
      isPopular: false,
      description: "Cardio en zone aérobie"
    },
    {
      id: 19,
      name: "Cardio Tabata",
      exercises: 4,
      duration: "20 min",
      difficulty: "Avancé",
      category: "Cardio",
      popularity: 85,
      isPopular: true,
      description: "Protocole Tabata 20/10"
    },

    // Spécialisés
    {
      id: 20,
      name: "Upper Body Focus",
      exercises: 7,
      duration: "85 min",
      difficulty: "Intermédiaire",
      category: "Upper",
      popularity: 87,
      isPopular: true,
      description: "Focus sur le haut du corps"
    },
    {
      id: 21,
      name: "Lower Body Focus",
      exercises: 6,
      duration: "80 min",
      difficulty: "Intermédiaire",
      category: "Lower",
      popularity: 83,
      isPopular: false,
      description: "Focus sur le bas du corps"
    },
    {
      id: 22,
      name: "Core & Abs",
      exercises: 8,
      duration: "40 min",
      difficulty: "Intermédiaire",
      category: "Core",
      popularity: 89,
      isPopular: true,
      description: "Renforcement de la ceinture abdominale"
    },
    {
      id: 23,
      name: "Arms Specialized",
      exercises: 6,
      duration: "60 min",
      difficulty: "Intermédiaire",
      category: "Arms",
      popularity: 81,
      isPopular: false,
      description: "Spécialisation bras et avant-bras"
    },
    {
      id: 24,
      name: "Back & Biceps",
      exercises: 8,
      duration: "90 min",
      difficulty: "Intermédiaire",
      category: "Back",
      popularity: 88,
      isPopular: true,
      description: "Focus dos et biceps"
    },
    {
      id: 25,
      name: "Chest & Triceps",
      exercises: 7,
      duration: "85 min",
      difficulty: "Intermédiaire",
      category: "Chest",
      popularity: 86,
      isPopular: true,
      description: "Focus pectoraux et triceps"
    },
    {
      id: 26,
      name: "Shoulders & Traps",
      exercises: 6,
      duration: "70 min",
      difficulty: "Intermédiaire",
      category: "Shoulders",
      popularity: 79,
      isPopular: false,
      description: "Spécialisation épaules et trapèzes"
    },
    {
      id: 27,
      name: "Glutes & Hamstrings",
      exercises: 5,
      duration: "65 min",
      difficulty: "Intermédiaire",
      category: "Glutes",
      popularity: 84,
      isPopular: false,
      description: "Focus fessiers et ischio-jambiers"
    },
    {
      id: 28,
      name: "Functional Training",
      exercises: 9,
      duration: "55 min",
      difficulty: "Intermédiaire",
      category: "Functional",
      popularity: 87,
      isPopular: true,
      description: "Mouvements fonctionnels"
    },
    {
      id: 29,
      name: "Powerlifting",
      exercises: 4,
      duration: "90 min",
      difficulty: "Avancé",
      category: "Powerlifting",
      popularity: 82,
      isPopular: false,
      description: "Squat, développé couché, soulevé de terre"
    },
    {
      id: 30,
      name: "Bodyweight Only",
      exercises: 10,
      duration: "50 min",
      difficulty: "Intermédiaire",
      category: "Bodyweight",
      popularity: 92,
      isPopular: true,
      description: "Entraînement au poids du corps uniquement"
    },

    // NOUVEAUX ENTRAÎNEMENTS (31-60)
    
    // Push Day avancés
    {
      id: 31,
      name: "Push Day Explosif",
      exercises: 5,
      duration: "70 min",
      difficulty: "Avancé",
      category: "Push",
      popularity: 83,
      isPopular: false,
      description: "Mouvements explosifs pour la puissance"
    },
    {
      id: 32,
      name: "Push Day Isolé",
      exercises: 7,
      duration: "85 min",
      difficulty: "Intermédiaire",
      category: "Push",
      popularity: 76,
      isPopular: false,
      description: "Focus sur l'isolation musculaire"
    },
    {
      id: 33,
      name: "Push Day Superset",
      exercises: 6,
      duration: "65 min",
      difficulty: "Intermédiaire",
      category: "Push",
      popularity: 88,
      isPopular: true,
      description: "Entraînement en supersets"
    },

    // Pull Day avancés
    {
      id: 34,
      name: "Pull Day Explosif",
      exercises: 6,
      duration: "75 min",
      difficulty: "Avancé",
      category: "Pull",
      popularity: 81,
      isPopular: false,
      description: "Mouvements explosifs pour le dos"
    },
    {
      id: 35,
      name: "Pull Day Isolé",
      exercises: 8,
      duration: "90 min",
      difficulty: "Intermédiaire",
      category: "Pull",
      popularity: 74,
      isPopular: false,
      description: "Isolation complète du dos"
    },
    {
      id: 36,
      name: "Pull Day Superset",
      exercises: 7,
      duration: "70 min",
      difficulty: "Intermédiaire",
      category: "Pull",
      popularity: 85,
      isPopular: true,
      description: "Supersets pour le dos et biceps"
    },

    // Leg Day avancés
    {
      id: 37,
      name: "Leg Day Explosif",
      exercises: 7,
      duration: "85 min",
      difficulty: "Avancé",
      category: "Legs",
      popularity: 86,
      isPopular: true,
      description: "Mouvements explosifs pour les jambes"
    },
    {
      id: 38,
      name: "Leg Day Isolé",
      exercises: 9,
      duration: "95 min",
      difficulty: "Intermédiaire",
      category: "Legs",
      popularity: 77,
      isPopular: false,
      description: "Isolation complète des jambes"
    },
    {
      id: 39,
      name: "Leg Day Superset",
      exercises: 8,
      duration: "80 min",
      difficulty: "Intermédiaire",
      category: "Legs",
      popularity: 89,
      isPopular: true,
      description: "Supersets pour les jambes"
    },

    // Full Body avancés
    {
      id: 40,
      name: "Full Body Explosif",
      exercises: 9,
      duration: "65 min",
      difficulty: "Avancé",
      category: "Full Body",
      popularity: 84,
      isPopular: false,
      description: "Mouvements explosifs complets"
    },
    {
      id: 41,
      name: "Full Body Isolé",
      exercises: 11,
      duration: "85 min",
      difficulty: "Intermédiaire",
      category: "Full Body",
      popularity: 78,
      isPopular: false,
      description: "Isolation complète du corps"
    },
    {
      id: 42,
      name: "Full Body Superset",
      exercises: 10,
      duration: "75 min",
      difficulty: "Intermédiaire",
      category: "Full Body",
      popularity: 87,
      isPopular: true,
      description: "Supersets complets"
    },

    // Cardio avancés
    {
      id: 43,
      name: "Cardio HIIT Avancé",
      exercises: 10,
      duration: "35 min",
      difficulty: "Avancé",
      category: "Cardio",
      popularity: 89,
      isPopular: true,
      description: "HIIT haute intensité avancé"
    },
    {
      id: 44,
      name: "Cardio CrossFit",
      exercises: 12,
      duration: "50 min",
      difficulty: "Avancé",
      category: "Cardio",
      popularity: 91,
      isPopular: true,
      description: "Entraînement CrossFit style"
    },
    {
      id: 45,
      name: "Cardio Endurance",
      exercises: 6,
      duration: "60 min",
      difficulty: "Intermédiaire",
      category: "Cardio",
      popularity: 82,
      isPopular: false,
      description: "Endurance cardiovasculaire"
    },
    {
      id: 46,
      name: "Cardio Sprint",
      exercises: 8,
      duration: "25 min",
      difficulty: "Avancé",
      category: "Cardio",
      popularity: 86,
      isPopular: true,
      description: "Sprints et intervalles courts"
    },

    // Spécialisés avancés
    {
      id: 47,
      name: "Upper Body Explosif",
      exercises: 8,
      duration: "75 min",
      difficulty: "Avancé",
      category: "Upper",
      popularity: 83,
      isPopular: false,
      description: "Haut du corps explosif"
    },
    {
      id: 48,
      name: "Lower Body Explosif",
      exercises: 7,
      duration: "70 min",
      difficulty: "Avancé",
      category: "Lower",
      popularity: 85,
      isPopular: true,
      description: "Bas du corps explosif"
    },
    {
      id: 49,
      name: "Core & Abs Avancé",
      exercises: 10,
      duration: "50 min",
      difficulty: "Avancé",
      category: "Core",
      popularity: 88,
      isPopular: true,
      description: "Core avancé et complexe"
    },
    {
      id: 50,
      name: "Arms Hypertrophie",
      exercises: 8,
      duration: "70 min",
      difficulty: "Intermédiaire",
      category: "Arms",
      popularity: 84,
      isPopular: false,
      description: "Hypertrophie des bras"
    },
    {
      id: 51,
      name: "Back Hypertrophie",
      exercises: 9,
      duration: "95 min",
      difficulty: "Intermédiaire",
      category: "Back",
      popularity: 87,
      isPopular: true,
      description: "Hypertrophie du dos"
    },
    {
      id: 52,
      name: "Chest Hypertrophie",
      exercises: 8,
      duration: "90 min",
      difficulty: "Intermédiaire",
      category: "Chest",
      popularity: 85,
      isPopular: true,
      description: "Hypertrophie des pectoraux"
    },
    {
      id: 53,
      name: "Shoulders Hypertrophie",
      exercises: 7,
      duration: "75 min",
      difficulty: "Intermédiaire",
      category: "Shoulders",
      popularity: 82,
      isPopular: false,
      description: "Hypertrophie des épaules"
    },
    {
      id: 54,
      name: "Glutes Hypertrophie",
      exercises: 6,
      duration: "70 min",
      difficulty: "Intermédiaire",
      category: "Glutes",
      popularity: 89,
      isPopular: true,
      description: "Hypertrophie des fessiers"
    },
    {
      id: 55,
      name: "Functional Avancé",
      exercises: 11,
      duration: "65 min",
      difficulty: "Avancé",
      category: "Functional",
      popularity: 86,
      isPopular: true,
      description: "Mouvements fonctionnels avancés"
    },
    {
      id: 56,
      name: "Powerlifting Hypertrophie",
      exercises: 6,
      duration: "100 min",
      difficulty: "Avancé",
      category: "Powerlifting",
      popularity: 88,
      isPopular: true,
      description: "Powerlifting pour l'hypertrophie"
    },
    {
      id: 57,
      name: "Bodyweight Avancé",
      exercises: 12,
      duration: "60 min",
      difficulty: "Avancé",
      category: "Bodyweight",
      popularity: 90,
      isPopular: true,
      description: "Poids du corps avancé"
    },
    {
      id: 58,
      name: "Calisthenics",
      exercises: 9,
      duration: "55 min",
      difficulty: "Intermédiaire",
      category: "Bodyweight",
      popularity: 87,
      isPopular: true,
      description: "Calisthénie et mouvements artistiques"
    },
    {
      id: 59,
      name: "Mobility & Flexibility",
      exercises: 15,
      duration: "45 min",
      difficulty: "Débutant",
      category: "Mobility",
      popularity: 83,
      isPopular: false,
      description: "Mobilité et flexibilité"
    },
    {
      id: 60,
      name: "Recovery & Stretching",
      exercises: 12,
      duration: "40 min",
      difficulty: "Débutant",
      category: "Recovery",
      popularity: 85,
      isPopular: true,
      description: "Récupération et étirements"
    },

    // NOUVEAUX ENTRAÎNEMENTS (61-90)
    
    // Entraînements thématiques
    {
      id: 61,
      name: "Morning Energizer",
      exercises: 6,
      duration: "30 min",
      difficulty: "Débutant",
      category: "Morning",
      popularity: 88,
      isPopular: true,
      description: "Séance matinale énergisante"
    },
    {
      id: 62,
      name: "Evening Wind Down",
      exercises: 8,
      duration: "35 min",
      difficulty: "Débutant",
      category: "Evening",
      popularity: 84,
      isPopular: false,
      description: "Séance du soir relaxante"
    },
    {
      id: 63,
      name: "Lunch Break Quickie",
      exercises: 5,
      duration: "20 min",
      difficulty: "Débutant",
      category: "Quick",
      popularity: 91,
      isPopular: true,
      description: "Séance rapide pause déjeuner"
    },
    {
      id: 64,
      name: "Weekend Warrior",
      exercises: 10,
      duration: "120 min",
      difficulty: "Avancé",
      category: "Weekend",
      popularity: 86,
      isPopular: true,
      description: "Séance intensive weekend"
    },

    // Entraînements par objectifs
    {
      id: 65,
      name: "Fat Burner Extreme",
      exercises: 12,
      duration: "45 min",
      difficulty: "Avancé",
      category: "Fat Loss",
      popularity: 93,
      isPopular: true,
      description: "Brûleur de graisse extrême"
    },
    {
      id: 66,
      name: "Muscle Builder",
      exercises: 9,
      duration: "90 min",
      difficulty: "Intermédiaire",
      category: "Muscle Gain",
      popularity: 89,
      isPopular: true,
      description: "Constructeur de muscle"
    },
    {
      id: 67,
      name: "Strength & Power",
      exercises: 6,
      duration: "75 min",
      difficulty: "Avancé",
      category: "Strength",
      popularity: 87,
      isPopular: true,
      description: "Force et puissance"
    },
    {
      id: 68,
      name: "Endurance Builder",
      exercises: 8,
      duration: "60 min",
      difficulty: "Intermédiaire",
      category: "Endurance",
      popularity: 82,
      isPopular: false,
      description: "Constructeur d'endurance"
    },
    {
      id: 69,
      name: "Speed & Agility",
      exercises: 10,
      duration: "40 min",
      difficulty: "Intermédiaire",
      category: "Speed",
      popularity: 85,
      isPopular: true,
      description: "Vitesse et agilité"
    },
    {
      id: 70,
      name: "Balance & Stability",
      exercises: 7,
      duration: "35 min",
      difficulty: "Débutant",
      category: "Balance",
      popularity: 79,
      isPopular: false,
      description: "Équilibre et stabilité"
    },

    // Entraînements par équipement
    {
      id: 71,
      name: "Dumbbells Only",
      exercises: 8,
      duration: "65 min",
      difficulty: "Intermédiaire",
      category: "Dumbbells",
      popularity: 88,
      isPopular: true,
      description: "Haltères uniquement"
    },
    {
      id: 72,
      name: "Barbell Focus",
      exercises: 6,
      duration: "80 min",
      difficulty: "Intermédiaire",
      category: "Barbell",
      popularity: 86,
      isPopular: true,
      description: "Focus barre olympique"
    },
    {
      id: 73,
      name: "Kettlebell Power",
      exercises: 9,
      duration: "50 min",
      difficulty: "Intermédiaire",
      category: "Kettlebell",
      popularity: 84,
      isPopular: false,
      description: "Puissance avec kettlebell"
    },
    {
      id: 74,
      name: "Resistance Bands",
      exercises: 7,
      duration: "40 min",
      difficulty: "Débutant",
      category: "Bands",
      popularity: 81,
      isPopular: false,
      description: "Élastiques de résistance"
    },
    {
      id: 75,
      name: "TRX Suspension",
      exercises: 8,
      duration: "45 min",
      difficulty: "Intermédiaire",
      category: "TRX",
      popularity: 83,
      isPopular: false,
      description: "Entraînement suspension TRX"
    },
    {
      id: 76,
      name: "Machine Circuit",
      exercises: 10,
      duration: "55 min",
      difficulty: "Débutant",
      category: "Machines",
      popularity: 78,
      isPopular: false,
      description: "Circuit sur machines"
    },

    // Entraînements spécialisés
    {
      id: 77,
      name: "Athletic Performance",
      exercises: 11,
      duration: "70 min",
      difficulty: "Avancé",
      category: "Athletic",
      popularity: 87,
      isPopular: true,
      description: "Performance athlétique"
    },
    {
      id: 78,
      name: "Rehabilitation",
      exercises: 6,
      duration: "35 min",
      difficulty: "Débutant",
      category: "Rehab",
      popularity: 80,
      isPopular: false,
      description: "Rééducation et réhabilitation"
    },
    {
      id: 79,
      name: "Prehab & Injury Prevention",
      exercises: 8,
      duration: "40 min",
      difficulty: "Débutant",
      category: "Prehab",
      popularity: 82,
      isPopular: false,
      description: "Prévention des blessures"
    },
    {
      id: 80,
      name: "Posture Correction",
      exercises: 7,
      duration: "30 min",
      difficulty: "Débutant",
      category: "Posture",
      popularity: 85,
      isPopular: true,
      description: "Correction de la posture"
    },
    {
      id: 81,
      name: "Breathing & Core",
      exercises: 9,
      duration: "35 min",
      difficulty: "Débutant",
      category: "Breathing",
      popularity: 83,
      isPopular: false,
      description: "Respiration et core"
    },
    {
      id: 82,
      name: "Mental Toughness",
      exercises: 8,
      duration: "50 min",
      difficulty: "Avancé",
      category: "Mental",
      popularity: 86,
      isPopular: true,
      description: "Résistance mentale"
    },

    // Entraînements créatifs
    {
      id: 83,
      name: "Dance Fitness",
      exercises: 6,
      duration: "45 min",
      difficulty: "Débutant",
      category: "Dance",
      popularity: 89,
      isPopular: true,
      description: "Fitness dansé"
    },
    {
      id: 84,
      name: "Martial Arts Flow",
      exercises: 10,
      duration: "60 min",
      difficulty: "Intermédiaire",
      category: "Martial",
      popularity: 84,
      isPopular: false,
      description: "Flow arts martiaux"
    },
    {
      id: 85,
      name: "Yoga Strength",
      exercises: 12,
      duration: "55 min",
      difficulty: "Intermédiaire",
      category: "Yoga",
      popularity: 87,
      isPopular: true,
      description: "Yoga de force"
    },
    {
      id: 86,
      name: "Pilates Power",
      exercises: 8,
      duration: "40 min",
      difficulty: "Intermédiaire",
      category: "Pilates",
      popularity: 85,
      isPopular: true,
      description: "Pilates puissant"
    },
    {
      id: 87,
      name: "Boxing Workout",
      exercises: 9,
      duration: "50 min",
      difficulty: "Intermédiaire",
      category: "Boxing",
      popularity: 88,
      isPopular: true,
      description: "Entraînement boxe"
    },
    {
      id: 88,
      name: "Swimming Dry Land",
      exercises: 7,
      duration: "45 min",
      difficulty: "Intermédiaire",
      category: "Swimming",
      popularity: 81,
      isPopular: false,
      description: "Préparation natation à sec"
    },

    // Entraînements extrêmes
    {
      id: 89,
      name: "Beast Mode",
      exercises: 15,
      duration: "90 min",
      difficulty: "Avancé",
      category: "Extreme",
      popularity: 92,
      isPopular: true,
      description: "Mode bête - extrême"
    },
    {
      id: 90,
      name: "Iron Will",
      exercises: 12,
      duration: "100 min",
      difficulty: "Avancé",
      category: "Extreme",
      popularity: 90,
      isPopular: true,
      description: "Volonté de fer - ultime"
    }
  ];

  const stats = {
    totalBlocks: exerciseBlocks.length,
    popularBlocks: exerciseBlocks.filter(block => block.isPopular).length,
    totalExercises: exerciseBlocks.reduce((sum, block) => sum + block.exercises, 0),
    averageDuration: Math.round(exerciseBlocks.reduce((sum, block) => sum + parseInt(block.duration), 0) / exerciseBlocks.length)
  };

  const filters = [
    { value: 'all', label: 'Tous', icon: Dumbbell },
    { value: 'popular', label: 'Populaires', icon: Star },
    { value: 'push', label: 'Push', icon: Target },
    { value: 'pull', label: 'Pull', icon: Target },
    { value: 'legs', label: 'Legs', icon: Target },
    { value: 'full body', label: 'Full Body', icon: Target },
    { value: 'cardio', label: 'Cardio', icon: Target },
    { value: 'upper', label: 'Upper', icon: Target },
    { value: 'lower', label: 'Lower', icon: Target },
    { value: 'core', label: 'Core', icon: Target },
    { value: 'arms', label: 'Arms', icon: Target },
    { value: 'back', label: 'Back', icon: Target },
    { value: 'chest', label: 'Chest', icon: Target },
    { value: 'shoulders', label: 'Shoulders', icon: Target },
    { value: 'glutes', label: 'Glutes', icon: Target },
    { value: 'functional', label: 'Functional', icon: Target },
    { value: 'powerlifting', label: 'Powerlifting', icon: Target },
    { value: 'bodyweight', label: 'Bodyweight', icon: Target },
    { value: 'mobility', label: 'Mobility', icon: Target },
    { value: 'recovery', label: 'Recovery', icon: Target },
    { value: 'morning', label: 'Morning', icon: Target },
    { value: 'evening', label: 'Evening', icon: Target },
    { value: 'quick', label: 'Quick', icon: Target },
    { value: 'weekend', label: 'Weekend', icon: Target },
    { value: 'fat loss', label: 'Fat Loss', icon: Target },
    { value: 'muscle gain', label: 'Muscle Gain', icon: Target },
    { value: 'strength', label: 'Strength', icon: Target },
    { value: 'endurance', label: 'Endurance', icon: Target },
    { value: 'speed', label: 'Speed', icon: Target },
    { value: 'balance', label: 'Balance', icon: Target },
    { value: 'dumbbells', label: 'Dumbbells', icon: Target },
    { value: 'barbell', label: 'Barbell', icon: Target },
    { value: 'kettlebell', label: 'Kettlebell', icon: Target },
    { value: 'bands', label: 'Bands', icon: Target },
    { value: 'trx', label: 'TRX', icon: Target },
    { value: 'machines', label: 'Machines', icon: Target },
    { value: 'athletic', label: 'Athletic', icon: Target },
    { value: 'rehab', label: 'Rehab', icon: Target },
    { value: 'prehab', label: 'Prehab', icon: Target },
    { value: 'posture', label: 'Posture', icon: Target },
    { value: 'breathing', label: 'Breathing', icon: Target },
    { value: 'mental', label: 'Mental', icon: Target },
    { value: 'dance', label: 'Dance', icon: Target },
    { value: 'martial', label: 'Martial', icon: Target },
    { value: 'yoga', label: 'Yoga', icon: Target },
    { value: 'pilates', label: 'Pilates', icon: Target },
    { value: 'boxing', label: 'Boxing', icon: Target },
    { value: 'swimming', label: 'Swimming', icon: Target },
    { value: 'extreme', label: 'Extreme', icon: Target }
  ];

  const filteredBlocks = exerciseBlocks.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'popular' && block.isPopular) ||
      block.category.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <PageLayout
      title="Blocs d'entraînement"
      subtitle="Choisissez votre programme d'exercices"
      icon={<Dumbbell className="h-6 w-6 text-blue-600" />}
      actions={
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau bloc
        </Button>
      }
    >
          {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total blocs"
          value={stats.totalBlocks}
          icon={Dumbbell}
          color="blue"
        />
        <StatCard
          title="Populaires"
          value={stats.popularBlocks}
          icon={Star}
          color="orange"
        />
        <StatCard
          title="Exercices"
          value={stats.totalExercises}
          icon={Target}
          color="green"
        />
        <StatCard
          title="Durée moy."
          value={`${stats.averageDuration} min`}
          icon={Clock}
          color="purple"
        />
        </div>

      {/* Recherche et filtres */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-gray-800 text-2xl">
            <div className="bg-blue-100 rounded-full p-2">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            Recherche et filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
              <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                placeholder="Rechercher un bloc d'entraînement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 bg-white"
                />
              </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`flex items-center gap-2 ${
                    selectedFilter === filter.value 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  <filter.icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              ))}
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Liste des blocs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlocks.map((block) => (
            <Card 
            key={block.id} 
            className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate(`/programme/${block.id}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-gray-800 text-xl">{block.name}</CardTitle>
                {block.isPopular && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    <Star className="h-3 w-3 mr-1" />
                    Populaire
                  </Badge>
                )}
                    </div>
              </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">{block.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Exercices</span>
                  <span className="font-semibold text-gray-800">{block.exercises}</span>
                  </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Durée</span>
                  <span className="font-semibold text-gray-800">{block.duration}</span>
        </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Difficulté</span>
                  <Badge 
                    variant="outline" 
                    className={`${
                      block.difficulty === 'Débutant' ? 'border-green-300 text-green-700 bg-green-50' :
                      block.difficulty === 'Intermédiaire' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                      'border-red-300 text-red-700 bg-red-50'
                    }`}
                  >
                    {block.difficulty}
                          </Badge>
                    </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Popularité</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                        style={{ width: `${block.popularity}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{block.popularity}%</span>
                            </div>
                        </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/programme/${block.id}`);
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Commencer
                    </Button>
                  </div>
                </CardContent>
              </Card>
        ))}
          </div>
    </PageLayout>
  );
};

export default BlocsEntrainement;