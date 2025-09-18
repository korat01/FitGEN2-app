import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Apple, 
  Target, 
  Flame, 
  Zap, 
  TrendingUp,
  Plus,
  Minus,
  Heart,
  Star,
  Clock,
  Users
} from 'lucide-react';

const AlimentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Données nutritionnelles (même structure que dans Nutrition.tsx)
  const nutritionData = [
    {
    id: 1,
    name: "Pomme",
      emoji: "🍎",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    category: "Fruits",
    goal: "Équilibre",
    popularity: 95,
    isPopular: true,
    description: "Fruit riche en fibres et vitamine C",
      fiber: 4.4,
      sugar: 19,
      sodium: 1,
      potassium: 195,
      vitaminC: 8.4,
      calcium: 6,
      iron: 0.12,
      servingSize: "1 pomme moyenne (182g)",
    benefits: [
        "Riche en fibres pour la digestion",
        "Vitamine C pour l'immunité",
      "Antioxydants naturels",
      "Faible en calories"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 2,
      name: "Poulet grillé",
      emoji: "🍗",
      calories: 200,
      protein: 30,
      carbs: 0,
      fat: 8,
      category: "Protéines",
      goal: "Prise de masse",
      popularity: 92,
      isPopular: true,
      description: "Source de protéines maigres",
      fiber: 0,
      sugar: 0,
      sodium: 74,
      potassium: 256,
      vitaminC: 0,
      calcium: 15,
      iron: 1.04,
      servingSize: "100g",
      benefits: [
        "Protéines complètes",
        "Faible en gras saturés",
        "Riche en vitamines B",
        "Idéal pour la musculation"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 2-3 jours",
      season: "Toute l'année"
    },
    {
      id: 3,
      name: "Riz brun",
      emoji: "🍚",
      calories: 220,
      protein: 5,
      carbs: 45,
      fat: 2,
      category: "Glucides",
      goal: "Prise de masse",
      popularity: 88,
      isPopular: true,
      description: "Glucides complexes à index glycémique bas",
      fiber: 3.5,
      sugar: 0.7,
      sodium: 5,
      potassium: 154,
      vitaminC: 0,
      calcium: 20,
      iron: 0.8,
      servingSize: "1 tasse cuite (195g)",
      benefits: [
        "Glucides complexes",
        "Riche en fibres",
        "Vitamines B",
        "Minéraux essentiels"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Conserver au sec",
      season: "Toute l'année"
    },
    {
      id: 4,
      name: "Avocat",
      emoji: "🥑",
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      category: "Lipides",
      goal: "Équilibre",
      popularity: 85,
      isPopular: true,
      description: "Riche en acides gras monoinsaturés",
      fiber: 7,
      sugar: 0.7,
      sodium: 7,
      potassium: 485,
      vitaminC: 10,
      calcium: 12,
      iron: 0.55,
      servingSize: "1 avocat moyen (150g)",
      benefits: [
        "Acides gras sains",
        "Riche en potassium",
        "Vitamines E et K",
        "Fibres solubles"
      ],
      bestTime: "Petit-déjeuner",
      storage: "Conserver à température ambiante",
      season: "Toute l'année"
    },
    {
      id: 5,
      name: "Brocoli",
      emoji: "🥦",
      calories: 55,
      protein: 4,
      carbs: 11,
      fat: 0.6,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 82,
      isPopular: false,
      description: "Légume crucifère riche en vitamines",
      fiber: 5,
      sugar: 1.5,
      sodium: 33,
      potassium: 316,
      vitaminC: 89,
      calcium: 47,
      iron: 0.73,
      servingSize: "1 tasse (91g)",
      benefits: [
        "Vitamine C et K",
        "Antioxydants puissants",
        "Faible en calories",
        "Riche en fibres"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 3-5 jours",
      season: "Automne/Hiver"
    },
    {
      id: 6,
      name: "Carotte",
      emoji: "��",
      calories: 50,
      protein: 1,
      carbs: 12,
      fat: 0.2,
      category: "Légumes",
      goal: "Équilibre",
      popularity: 80,
      isPopular: true,
      description: "Légume riche en vitamine A et potassium",
      fiber: 3.6,
      sugar: 4.8,
      sodium: 20,
      potassium: 350,
      vitaminC: 12.8,
      calcium: 20,
      iron: 0.4,
      servingSize: "1 carotte moyenne (100g)",
      benefits: [
        "Vitamine A",
        "Potassium",
        "Fibres",
        "Antioxydants"
      ],
      bestTime: "Déjeuner",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 7,
      name: "Tomate",
      emoji: "��",
      calories: 18,
      protein: 1,
      carbs: 4,
      fat: 0.2,
      category: "Fruits",
      goal: "Équilibre",
      popularity: 83,
      isPopular: true,
      description: "Fruit riche en vitamine C et lycopène",
      fiber: 1.2,
      sugar: 3.5,
      sodium: 5,
      potassium: 290,
      vitaminC: 18.3,
      calcium: 18,
      iron: 0.3,
      servingSize: "1 tomate moyenne (100g)",
      benefits: [
        "Vitamine C",
        "Lycopène",
        "Potassium",
        "Antioxydants"
      ],
      bestTime: "Déjeuner",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 8,
      name: "Banane",
      emoji: "��",
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.3,
      category: "Fruits",
      goal: "Équilibre",
      popularity: 90,
      isPopular: true,
      description: "Fruit riche en potassium et vitamine C",
      fiber: 2.6,
      sugar: 14.6,
      sodium: 1,
      potassium: 358,
      vitaminC: 14.6,
      calcium: 10,
      iron: 0.3,
      servingSize: "1 banane moyenne (120g)",
      benefits: [
        "Potassium",
        "Vitamine C",
        "Fibres",
        "Énergie rapide"
      ],
      bestTime: "Petit-déjeuner",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 9,
      name: "Poivron",
      emoji: "��",
      calories: 25,
      protein: 1,
      carbs: 6,
      fat: 0.2,
      category: "Légumes",
      goal: "Équilibre",
      popularity: 78,
      isPopular: false,
      description: "Légume riche en vitamine C et fibres",
      fiber: 1.4,
      sugar: 3.6,
      sodium: 5,
      potassium: 200,
      vitaminC: 60,
      calcium: 15,
      iron: 0.3,
      servingSize: "1 poivron moyen (100g)",
      benefits: [
        "Vitamine C",
        "Fibres",
        "Potassium",
        "Antioxydants"
      ],
      bestTime: "Déjeuner",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 10,
      name: "Oignon",
      emoji: "��",
      calories: 40,
      protein: 1,
      carbs: 9,
      fat: 0.1,
      category: "Légumes",
      goal: "Équilibre",
      popularity: 85,
      isPopular: true,
      description: "Légume riche en vitamine C et fibres",
      fiber: 1.1,
      sugar: 4.2,
      sodium: 5,
      potassium: 100,
      vitaminC: 20,
      calcium: 10,
      iron: 0.2,
      servingSize: "1 oignon moyen (100g)",
      benefits: [
        "Vitamine C",
        "Fibres",
        "Potassium",
        "Antioxydants"
      ],
      bestTime: "Déjeuner",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 11,
      name: "Pomme de terre",
      emoji: "��",
      calories: 77,
      protein: 2,
      carbs: 17,
      fat: 0.1,
      category: "Glucides",
      goal: "Équilibre",
      popularity: 89,
      isPopular: true,
      description: "Tubercule riche en glucides complexes et potassium",
      fiber: 2.2,
      sugar: 0.8,
      sodium: 6,
      potassium: 421,
      vitaminC: 19.7,
      calcium: 12,
      iron: 0.81,
      servingSize: "1 pomme de terre moyenne (150g)",
      benefits: [
        "Riche en potassium",
        "Vitamine C et B6",
        "Glucides complexes",
        "Source d'énergie durable"
      ],
      bestTime: "Déjeuner",
      storage: "Conserver au frais et à l'obscurité",
      season: "Toute l'année"
    },
    {
      id: 12,
      name: "Épinards",
      emoji: "��",
      calories: 23,
      protein: 3,
      carbs: 4,
      fat: 0.4,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 79,
      isPopular: false,
      description: "Légume vert riche en fer et folates",
      fiber: 2.2,
      sugar: 0.4,
      sodium: 79,
      potassium: 558,
      vitaminC: 28.1,
      calcium: 99,
      iron: 2.71,
      servingSize: "1 tasse (30g)",
      benefits: [
        "Riche en fer et folates",
        "Vitamine K et A",
        "Antioxydants",
        "Faible en calories"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 3-5 jours",
      season: "Printemps/Automne"
    },
    {
      id: 13,
      name: "Poulet",
      emoji: "��",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      category: "Protéines",
      goal: "Prise de masse",
      popularity: 94,
      isPopular: true,
      description: "Viande maigre riche en protéines complètes",
      fiber: 0,
      sugar: 0,
      sodium: 74,
      potassium: 256,
      vitaminC: 0,
      calcium: 15,
      iron: 1.04,
      servingSize: "100g",
      benefits: [
        "Protéines complètes",
        "Faible en gras saturés",
        "Riche en vitamines B",
        "Idéal pour la musculation"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 2-3 jours",
      season: "Toute l'année"
    },
    {
      id: 14,
      name: "Saumon",
      emoji: "��",
      calories: 208,
      protein: 25,
      carbs: 0,
      fat: 12,
      category: "Protéines",
      goal: "Récupération",
      popularity: 91,
      isPopular: true,
      description: "Poisson gras riche en oméga-3 et protéines",
      fiber: 0,
      sugar: 0,
      sodium: 44,
      potassium: 363,
      vitaminC: 0,
      calcium: 12,
      iron: 0.8,
      servingSize: "100g",
      benefits: [
        "Riche en oméga-3",
        "Protéines complètes",
        "Vitamine D et B12",
        "Anti-inflammatoire"
      ],
      bestTime: "Dîner",
      storage: "Réfrigérateur 1-2 jours",
      season: "Toute l'année"
    },
    {
      id: 15,
      name: "Riz blanc",
      emoji: "��",
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      category: "Glucides",
      goal: "Prise de masse",
      popularity: 85,
      isPopular: true,
      description: "Céréale raffinée riche en glucides simples",
      fiber: 0.4,
      sugar: 0.1,
      sodium: 1,
      potassium: 35,
      vitaminC: 0,
      calcium: 28,
      iron: 0.8,
      servingSize: "1 tasse cuite (158g)",
      benefits: [
        "Glucides simples",
        "Facile à digérer",
        "Source d'énergie rapide",
        "Faible en fibres"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Conserver au sec",
      season: "Toute l'année"
    },
    {
      id: 16,
      name: "Pâtes",
      emoji: "��",
      calories: 131,
      protein: 5,
      carbs: 25,
      fat: 1.1,
      category: "Glucides",
      goal: "Prise de masse",
      popularity: 87,
      isPopular: true,
      description: "Pâtes alimentaires riches en glucides complexes",
      fiber: 1.8,
      sugar: 0.6,
      sodium: 1,
      potassium: 44,
      vitaminC: 0,
      calcium: 7,
      iron: 1.28,
      servingSize: "1 tasse cuite (140g)",
      benefits: [
        "Glucides complexes",
        "Riche en fer",
        "Source d'énergie durable",
        "Facile à préparer"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Conserver au sec",
      season: "Toute l'année"
    },
    {
      id: 17,
      name: "Pain complet",
      emoji: "��",
      calories: 247,
      protein: 13,
      carbs: 41,
      fat: 4.2,
      category: "Glucides",
      goal: "Équilibre",
      popularity: 82,
      isPopular: true,
      description: "Pain à base de farine complète riche en fibres",
      fiber: 7,
      sugar: 5.7,
      sodium: 681,
      potassium: 230,
      vitaminC: 0,
      calcium: 107,
      iron: 2.5,
      servingSize: "1 tranche (28g)",
      benefits: [
        "Riche en fibres",
        "Vitamines B",
        "Minéraux essentiels",
        "Glucides complexes"
      ],
      bestTime: "Petit-déjeuner",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 18,
      name: "Fromage",
      emoji: "��",
      calories: 113,
      protein: 7,
      carbs: 1,
      fat: 9,
      category: "Protéines",
      goal: "Prise de masse",
      popularity: 88,
      isPopular: true,
      description: "Produit laitier riche en protéines et calcium",
      fiber: 0,
      sugar: 0.1,
      sodium: 621,
      potassium: 28,
      vitaminC: 0,
      calcium: 200,
      iron: 0.1,
      servingSize: "30g",
      benefits: [
        "Riche en calcium",
        "Protéines complètes",
        "Vitamine B12",
        "Phosphore"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Toute l'année"
    },
    {
      id: 19,
      name: "Lait",
      emoji: "��",
      calories: 42,
      protein: 3.4,
      carbs: 5,
      fat: 1,
      category: "Protéines",
      goal: "Récupération",
      popularity: 84,
      isPopular: true,
      description: "Boisson lactée riche en protéines et calcium",
      fiber: 0,
      sugar: 5,
      sodium: 44,
      potassium: 150,
      vitaminC: 0,
      calcium: 113,
      iron: 0.03,
      servingSize: "100ml",
      benefits: [
        "Riche en calcium",
        "Protéines complètes",
        "Vitamine D",
        "Phosphore"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 3-5 jours",
      season: "Toute l'année"
    },
    {
      id: 20,
      name: "Yaourt",
      emoji: "��",
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      category: "Protéines",
      goal: "Récupération",
      popularity: 85,
      isPopular: true,
      description: "Produit laitier fermenté riche en probiotiques",
      fiber: 0,
      sugar: 3.6,
      sodium: 36,
      potassium: 141,
      vitaminC: 0,
      calcium: 110,
      iron: 0.05,
      servingSize: "100g",
      benefits: [
        "Probiotiques",
        "Protéines complètes",
        "Calcium",
        "Vitamine B12"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Toute l'année"
    },
    {
      id: 21,
      name: "Beurre",
      emoji: "��",
      calories: 717,
      protein: 0.9,
      carbs: 0.1,
      fat: 81,
      category: "Lipides",
      goal: "Équilibre",
      popularity: 76,
      isPopular: false,
      description: "Matière grasse laitière riche en acides gras saturés",
      fiber: 0,
      sugar: 0.1,
      sodium: 11,
      potassium: 24,
      vitaminC: 0,
      calcium: 24,
      iron: 0.02,
      servingSize: "1 c.à.s (14g)",
      benefits: [
        "Vitamine A",
        "Vitamine E",
        "Acides gras",
        "Goût riche"
      ],
      bestTime: "Petit-déjeuner",
      storage: "Réfrigérateur 1-2 mois",
      season: "Toute l'année"
    },
    {
      id: 22,
      name: "Huile d'olive",
      emoji: "��",
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      category: "Lipides",
      goal: "Équilibre",
      popularity: 89,
      isPopular: true,
      description: "Huile végétale riche en acides gras monoinsaturés",
      fiber: 0,
      sugar: 0,
      sodium: 2,
      potassium: 1,
      vitaminC: 0,
      calcium: 1,
      iron: 0.56,
      servingSize: "1 c.à.s (14g)",
      benefits: [
        "Acides gras monoinsaturés",
        "Antioxydants",
        "Vitamine E",
        "Anti-inflammatoire"
      ],
      bestTime: "Toute la journée",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 23,
      name: "Chou-fleur",
      emoji: "��",
      calories: 25,
      protein: 2,
      carbs: 5,
      fat: 0.3,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 78,
      isPopular: false,
      description: "Légume crucifère riche en vitamines et minéraux",
      fiber: 2.5,
      sugar: 1.9,
      sodium: 30,
      potassium: 299,
      vitaminC: 48.2,
      calcium: 22,
      iron: 0.42,
      servingSize: "1 tasse (100g)",
      benefits: [
        "Riche en vitamine C et K",
        "Antioxydants puissants",
        "Faible en calories",
        "Riche en fibres"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 3-5 jours",
      season: "Automne/Hiver"
    },
    {
      id: 24,
      name: "Pomme de terre",
      emoji: "��",
      calories: 77,
      protein: 2,
      carbs: 17,
      fat: 0.1,
      category: "Glucides",
      goal: "Équilibre",
      popularity: 89,
      isPopular: true,
      description: "Tubercule riche en glucides complexes et potassium",
      fiber: 2.2,
      sugar: 0.8,
      sodium: 6,
      potassium: 421,
      vitaminC: 19.7,
      calcium: 12,
      iron: 0.81,
      servingSize: "1 pomme de terre moyenne (150g)",
      benefits: [
        "Riche en potassium",
        "Vitamine C et B6",
        "Glucides complexes",
        "Source d'énergie durable"
      ],
      bestTime: "Déjeuner",
      storage: "Conserver au frais et à l'obscurité",
      season: "Toute l'année"
    },
    {
      id: 25,
      name: "Épinards",
      emoji: "��",
      calories: 23,
      protein: 3,
      carbs: 4,
      fat: 0.4,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 79,
      isPopular: false,
      description: "Légume vert riche en fer et folates",
      fiber: 2.2,
      sugar: 0.4,
      sodium: 79,
      potassium: 558,
      vitaminC: 28.1,
      calcium: 99,
      iron: 2.71,
      servingSize: "1 tasse (30g)",
      benefits: [
        "Riche en fer et folates",
        "Vitamine K et A",
        "Antioxydants",
        "Faible en calories"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 3-5 jours",
      season: "Printemps/Automne"
    },
    {
      id: 26,
      name: "Poulet",
      emoji: "��",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      category: "Protéines",
      goal: "Prise de masse",
      popularity: 94,
      isPopular: true,
      description: "Viande maigre riche en protéines complètes",
      fiber: 0,
      sugar: 0,
      sodium: 74,
      potassium: 256,
      vitaminC: 0,
      calcium: 15,
      iron: 1.04,
      servingSize: "100g",
      benefits: [
        "Protéines complètes",
        "Faible en gras saturés",
        "Riche en vitamines B",
        "Idéal pour la musculation"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 2-3 jours",
      season: "Toute l'année"
    },
    {
      id: 27,
      name: "Saumon",
      emoji: "��",
      calories: 208,
      protein: 25,
      carbs: 0,
      fat: 12,
      category: "Protéines",
      goal: "Récupération",
      popularity: 91,
      isPopular: true,
      description: "Poisson gras riche en oméga-3 et protéines",
      fiber: 0,
      sugar: 0,
      sodium: 44,
      potassium: 363,
      vitaminC: 0,
      calcium: 12,
      iron: 0.8,
      servingSize: "100g",
      benefits: [
        "Riche en oméga-3",
        "Protéines complètes",
        "Vitamine D et B12",
        "Anti-inflammatoire"
      ],
      bestTime: "Dîner",
      storage: "Réfrigérateur 1-2 jours",
      season: "Toute l'année"
    },
    {
      id: 28,
      name: "Riz blanc",
      emoji: "��",
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      category: "Glucides",
      goal: "Prise de masse",
      popularity: 85,
      isPopular: true,
      description: "Céréale raffinée riche en glucides simples",
      fiber: 0.4,
      sugar: 0.1,
      sodium: 1,
      potassium: 35,
      vitaminC: 0,
      calcium: 28,
      iron: 0.8,
      servingSize: "1 tasse cuite (158g)",
      benefits: [
        "Glucides simples",
        "Facile à digérer",
        "Source d'énergie rapide",
        "Faible en fibres"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Conserver au sec",
      season: "Toute l'année"
    },
    {
      id: 29,
      name: "Pâtes",
      emoji: "��",
      calories: 131,
      protein: 5,
      carbs: 25,
      fat: 1.1,
      category: "Glucides",
      goal: "Prise de masse",
      popularity: 87,
      isPopular: true,
      description: "Pâtes alimentaires riches en glucides complexes",
      fiber: 1.8,
      sugar: 0.6,
      sodium: 1,
      potassium: 44,
      vitaminC: 0,
      calcium: 7,
      iron: 1.28,
      servingSize: "1 tasse cuite (140g)",
      benefits: [
        "Glucides complexes",
        "Riche en fer",
        "Source d'énergie durable",
        "Facile à préparer"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Conserver au sec",
      season: "Toute l'année"
    },
    {
      id: 30,
      name: "Pain complet",
      emoji: "��",
      calories: 247,
      protein: 13,
      carbs: 41,
      fat: 4.2,
      category: "Glucides",
      goal: "Équilibre",
      popularity: 82,
      isPopular: true,
      description: "Pain à base de farine complète riche en fibres",
      fiber: 7,
      sugar: 5.7,
      sodium: 681,
      potassium: 230,
      vitaminC: 0,
      calcium: 107,
      iron: 2.5,
      servingSize: "1 tranche (28g)",
      benefits: [
        "Riche en fibres",
        "Vitamines B",
        "Minéraux essentiels",
        "Glucides complexes"
      ],
      bestTime: "Petit-déjeuner",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 31,
      name: "Fromage",
      emoji: "��",
      calories: 113,
      protein: 7,
      carbs: 1,
      fat: 9,
      category: "Protéines",
      goal: "Prise de masse",
      popularity: 88,
      isPopular: true,
      description: "Produit laitier riche en protéines et calcium",
      fiber: 0,
      sugar: 0.1,
      sodium: 621,
      potassium: 28,
      vitaminC: 0,
      calcium: 200,
      iron: 0.1,
      servingSize: "30g",
      benefits: [
        "Riche en calcium",
        "Protéines complètes",
        "Vitamine B12",
        "Phosphore"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Toute l'année"
    },
    {
      id: 32,
      name: "Lait",
      emoji: "��",
      calories: 42,
      protein: 3.4,
      carbs: 5,
      fat: 1,
      category: "Protéines",
      goal: "Récupération",
      popularity: 84,
      isPopular: true,
      description: "Boisson lactée riche en protéines et calcium",
      fiber: 0,
      sugar: 5,
      sodium: 44,
      potassium: 150,
      vitaminC: 0,
      calcium: 113,
      iron: 0.03,
      servingSize: "100ml",
      benefits: [
        "Riche en calcium",
        "Protéines complètes",
        "Vitamine D",
        "Phosphore"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 3-5 jours",
      season: "Toute l'année"
    },
    {
      id: 33,
      name: "Yaourt",
      emoji: "��",
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      category: "Protéines",
      goal: "Récupération",
      popularity: 85,
      isPopular: true,
      description: "Produit laitier fermenté riche en probiotiques",
      fiber: 0,
      sugar: 3.6,
      sodium: 36,
      potassium: 141,
      vitaminC: 0,
      calcium: 110,
      iron: 0.05,
      servingSize: "100g",
      benefits: [
        "Probiotiques",
        "Protéines complètes",
        "Calcium",
        "Vitamine B12"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Toute l'année"
    },
    {
      id: 34,
      name: "Beurre",
      emoji: "��",
      calories: 717,
      protein: 0.9,
      carbs: 0.1,
      fat: 81,
      category: "Lipides",
      goal: "Équilibre",
      popularity: 76,
      isPopular: false,
      description: "Matière grasse laitière riche en acides gras saturés",
      fiber: 0,
      sugar: 0.1,
      sodium: 11,
      potassium: 24,
      vitaminC: 0,
      calcium: 24,
      iron: 0.02,
      servingSize: "1 c.à.s (14g)",
      benefits: [
        "Vitamine A",
        "Vitamine E",
        "Acides gras",
        "Goût riche"
      ],
      bestTime: "Petit-déjeuner",
      storage: "Réfrigérateur 1-2 mois",
      season: "Toute l'année"
    },
    {
      id: 35,
      name: "Huile d'olive",
      emoji: "��",
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      category: "Lipides",
      goal: "Équilibre",
      popularity: 89,
      isPopular: true,
      description: "Huile végétale riche en acides gras monoinsaturés",
      fiber: 0,
      sugar: 0,
      sodium: 2,
      potassium: 1,
      vitaminC: 0,
      calcium: 1,
      iron: 0.56,
      servingSize: "1 c.à.s (14g)",
      benefits: [
        "Acides gras monoinsaturés",
        "Antioxydants",
        "Vitamine E",
        "Anti-inflammatoire"
      ],
      bestTime: "Toute la journée",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 36,
      name: "Noix",
      emoji: "��",
      calories: 654,
      protein: 15,
      carbs: 14,
      fat: 65,
      category: "Lipides",
      goal: "Performance",
      popularity: 87,
      isPopular: true,
      description: "Fruit à coque riche en oméga-3 et vitamine E",
      fiber: 6.7,
      sugar: 2.6,
      sodium: 2,
      potassium: 441,
      vitaminC: 1.3,
      calcium: 98,
      iron: 2.91,
      servingSize: "30g",
      benefits: [
        "Oméga-3",
        "Vitamine E",
        "Antioxydants",
        "Protéines végétales"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Automne/Hiver"
    },
    {
      id: 37,
      name: "Amandes",
      emoji: "��",
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      category: "Lipides",
      goal: "Équilibre",
      popularity: 83,
      isPopular: false,
      description: "Fruit à coque riche en vitamine E et magnésium",
      fiber: 12,
      sugar: 4.4,
      sodium: 1,
      potassium: 733,
      vitaminC: 0,
      calcium: 269,
      iron: 3.71,
      servingSize: "30g",
      benefits: [
        "Vitamine E",
        "Magnésium",
        "Protéines végétales",
        "Fibres"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 38,
      name: "Chocolat noir",
      emoji: "��",
      calories: 546,
      protein: 7.8,
      carbs: 46,
      fat: 31,
      category: "Lipides",
      goal: "Performance",
      popularity: 92,
      isPopular: true,
      description: "Confiserie riche en antioxydants et magnésium",
      fiber: 10.9,
      sugar: 24,
      sodium: 6,
      potassium: 559,
      vitaminC: 0,
      calcium: 73,
      iron: 11.9,
      servingSize: "30g",
      benefits: [
        "Antioxydants",
        "Magnésium",
        "Fer",
        "Améliore l'humeur"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 39,
      name: "Miel",
      emoji: "��",
      calories: 304,
      protein: 0.3,
      carbs: 82,
      fat: 0,
      category: "Édulcorants",
      goal: "Performance",
      popularity: 86,
      isPopular: true,
      description: "Édulcorant naturel riche en antioxydants",
      fiber: 0.2,
      sugar: 82,
      sodium: 4,
      potassium: 52,
      vitaminC: 0.5,
      calcium: 6,
      iron: 0.42,
      servingSize: "1 c.à.s (21g)",
      benefits: [
        "Antioxydants",
        "Propriétés antibactériennes",
        "Énergie rapide",
        "Goût naturel"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 40,
      name: "Sucre",
      emoji: "��",
      calories: 387,
      protein: 0,
      carbs: 100,
      fat: 0,
      category: "Édulcorants",
      goal: "Performance",
      popularity: 79,
      isPopular: false,
      description: "Édulcorant raffiné riche en glucides simples",
      fiber: 0,
      sugar: 100,
      sodium: 1,
      potassium: 2,
      vitaminC: 0,
      calcium: 1,
      iron: 0.01,
      servingSize: "1 c.à.s (12g)",
      benefits: [
        "Énergie rapide",
        "Goût sucré",
        "Facile à utiliser",
        "Conservation longue"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Conserver au sec",
      season: "Toute l'année"
    },
    {
      id: 41,
      name: "Sel",
      emoji: "��",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      category: "Épices",
      goal: "Équilibre",
      popularity: 95,
      isPopular: true,
      description: "Condiment essentiel riche en sodium",
      fiber: 0,
      sugar: 0,
      sodium: 38758,
      potassium: 8,
      vitaminC: 0,
      calcium: 24,
      iron: 0.33,
      servingSize: "1 c.à.c (6g)",
      benefits: [
        "Équilibre électrolytique",
        "Goût",
        "Conservation",
        "Digestion"
      ],
      bestTime: "Toute la journée",
      storage: "Conserver au sec",
      season: "Toute l'année"
    },
    {
      id: 42,
      name: "Poivre",
      emoji: "��️",
      calories: 251,
      protein: 10,
      carbs: 64,
      fat: 3.3,
      category: "Épices",
      goal: "Équilibre",
      popularity: 88,
      isPopular: true,
      description: "Épice riche en antioxydants et propriétés anti-inflammatoires",
      fiber: 25,
      sugar: 0.6,
      sodium: 20,
      potassium: 1329,
      vitaminC: 0,
      calcium: 443,
      iron: 9.71,
      servingSize: "1 c.à.c (2g)",
      benefits: [
        "Antioxydants",
        "Anti-inflammatoire",
        "Digestion",
        "Goût"
      ],
      bestTime: "Toute la journée",
      storage: "Conserver au sec",
      season: "Toute l'année"
    },
    {
      id: 43,
      name: "Oranges",
      emoji: "��",
      calories: 47,
      protein: 0.9,
      carbs: 12,
      fat: 0.1,
      category: "Fruits",
      goal: "Récupération",
      popularity: 87,
      isPopular: true,
      description: "Fruit riche en vitamine C et antioxydants",
      fiber: 2.4,
      sugar: 9.4,
      sodium: 0,
      potassium: 181,
      vitaminC: 53.2,
      calcium: 40,
      iron: 0.1,
      servingSize: "1 orange moyenne (154g)",
      benefits: [
        "Riche en vitamine C pour l'immunité",
        "Antioxydants naturels",
        "Fibres pour la digestion",
        "Potassium pour les muscles"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Hiver"
    },
    {
      id: 44,
      name: "Fraises",
      emoji: "��",
      calories: 32,
      protein: 0.7,
      carbs: 8,
      fat: 0.3,
      category: "Fruits",
      goal: "Récupération",
      popularity: 89,
      isPopular: true,
      description: "Fruit rouge riche en vitamine C et fibres",
      fiber: 2,
      sugar: 4.9,
      sodium: 1,
      potassium: 153,
      vitaminC: 58.8,
      calcium: 16,
      iron: 0.41,
      servingSize: "1 tasse (152g)",
      benefits: [
        "Vitamine C pour l'immunité",
        "Antioxydants puissants",
        "Fibres solubles",
        "Faible en calories"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 3-5 jours",
      season: "Printemps/Été"
    },
    {
      id: 45,
      name: "Poires",
      emoji: "��",
      calories: 57,
      protein: 0.4,
      carbs: 15,
      fat: 0.1,
      category: "Fruits",
      goal: "Équilibre",
      popularity: 81,
      isPopular: false,
      description: "Fruit riche en fibres et vitamine K",
      fiber: 3.1,
      sugar: 9.8,
      sodium: 1,
      potassium: 116,
      vitaminC: 4.3,
      calcium: 9,
      iron: 0.18,
      servingSize: "1 poire moyenne (166g)",
      benefits: [
        "Riche en fibres",
        "Vitamine K pour les os",
        "Antioxydants",
        "Faible en calories"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Automne/Hiver"
    },
    {
      id: 46,
      name: "Raisins",
      emoji: "��",
      calories: 62,
      protein: 0.6,
      carbs: 16,
      fat: 0.2,
      category: "Fruits",
      goal: "Performance",
      popularity: 84,
      isPopular: true,
      description: "Fruit riche en antioxydants et énergie rapide",
      fiber: 0.9,
      sugar: 16,
      sodium: 2,
      potassium: 175,
      vitaminC: 3.2,
      calcium: 10,
      iron: 0.36,
      servingSize: "1 tasse (92g)",
      benefits: [
        "Antioxydants puissants",
        "Énergie rapide",
        "Resvératrol",
        "Potassium pour les muscles"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Été/Automne"
    },
    {
      id: 47,
      name: "Ananas",
      emoji: "��",
      calories: 50,
      protein: 0.5,
      carbs: 13,
      fat: 0.1,
      category: "Fruits",
      goal: "Récupération",
      popularity: 86,
      isPopular: true,
      description: "Fruit tropical riche en bromélaïne et vitamine C",
      fiber: 1.4,
      sugar: 9.9,
      sodium: 1,
      potassium: 109,
      vitaminC: 47.8,
      calcium: 13,
      iron: 0.29,
      servingSize: "1 tasse (165g)",
      benefits: [
        "Bromélaïne pour la digestion",
        "Vitamine C",
        "Antioxydants",
        "Enzymes digestives"
      ],
      bestTime: "Après l'entraînement",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 48,
      name: "Mangue",
      emoji: "��",
      calories: 60,
      protein: 0.8,
      carbs: 15,
      fat: 0.4,
      category: "Fruits",
      goal: "Performance",
      popularity: 88,
      isPopular: true,
      description: "Fruit tropical riche en vitamine A et C",
      fiber: 1.6,
      sugar: 13.7,
      sodium: 1,
      potassium: 168,
      vitaminC: 36.4,
      calcium: 11,
      iron: 0.16,
      servingSize: "1 tasse (165g)",
      benefits: [
        "Vitamine A pour la vision",
        "Vitamine C",
        "Antioxydants",
        "Bêta-carotène"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Printemps/Été"
    },
    {
      id: 49,
      name: "Papaye",
      emoji: "��",
      calories: 43,
      protein: 0.5,
      carbs: 11,
      fat: 0.3,
      category: "Fruits",
      goal: "Récupération",
      popularity: 79,
      isPopular: false,
      description: "Fruit tropical riche en papaïne et vitamine C",
      fiber: 1.7,
      sugar: 7.8,
      sodium: 8,
      potassium: 182,
      vitaminC: 60.9,
      calcium: 20,
      iron: 0.25,
      servingSize: "1 tasse (145g)",
      benefits: [
        "Papaïne pour la digestion",
        "Vitamine C",
        "Antioxydants",
        "Enzymes digestives"
      ],
      bestTime: "Après l'entraînement",
      storage: "Conserver au frais",
      season: "Toute l'année"
    },
    {
      id: 50,
      name: "Grenade",
      emoji: "��",
      calories: 83,
      protein: 1.7,
      carbs: 19,
      fat: 1.2,
      category: "Fruits",
      goal: "Récupération",
      popularity: 85,
      isPopular: true,
      description: "Fruit riche en antioxydants et vitamine K",
      fiber: 4,
      sugar: 13.7,
      sodium: 3,
      potassium: 236,
      vitaminC: 10.2,
      calcium: 10,
      iron: 0.3,
      servingSize: "1 tasse (174g)",
      benefits: [
        "Antioxydants puissants",
        "Vitamine K",
        "Anti-inflammatoire",
        "Polyphénols"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Automne/Hiver"
    },
    {
      id: 51,
      name: "Kiwi",
      emoji: "��",
      calories: 41,
      protein: 0.8,
      carbs: 10,
      fat: 0.4,
      category: "Fruits",
      goal: "Récupération",
      popularity: 82,
      isPopular: true,
      description: "Fruit riche en vitamine C et fibres",
      fiber: 2.1,
      sugar: 6.2,
      sodium: 3,
      potassium: 237,
      vitaminC: 64,
      calcium: 23,
      iron: 0.31,
      servingSize: "1 kiwi moyen (69g)",
      benefits: [
        "Vitamine C exceptionnelle",
        "Fibres solubles",
        "Potassium",
        "Antioxydants"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Automne/Hiver"
    },
    {
      id: 52,
      name: "Pêche",
      emoji: "",
      calories: 39,
      protein: 0.9,
      carbs: 10,
      fat: 0.3,
      category: "Fruits",
      goal: "Équilibre",
      popularity: 78,
      isPopular: false,
      description: "Fruit d'été riche en vitamine A et C",
      fiber: 1.5,
      sugar: 8.4,
      sodium: 0,
      potassium: 190,
      vitaminC: 6.6,
      calcium: 6,
      iron: 0.25,
      servingSize: "1 pêche moyenne (150g)",
      benefits: [
        "Vitamine A",
        "Vitamine C",
        "Antioxydants",
        "Faible en calories"
      ],
      bestTime: "Collation",
      storage: "Conserver au frais",
      season: "Été"
    },
    {
      id: 53,
      name: "Bœuf",
      emoji: "��",
      calories: 250,
      protein: 26,
      carbs: 0,
      fat: 17,
      category: "Protéines",
      goal: "Prise de masse",
      popularity: 91,
      isPopular: true,
      description: "Viande rouge riche en protéines et fer",
      fiber: 0,
      sugar: 0,
      sodium: 72,
      potassium: 315,
      vitaminC: 0,
      calcium: 18,
      iron: 2.9,
      servingSize: "100g",
      benefits: [
        "Protéines complètes",
        "Fer héminique",
        "Vitamine B12",
        "Zinc"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 2-3 jours",
      season: "Toute l'année"
    },
    {
      id: 54,
      name: "Porc",
      emoji: "��",
      calories: 242,
      protein: 27,
      carbs: 0,
      fat: 14,
      category: "Protéines",
      goal: "Prise de masse",
      popularity: 87,
      isPopular: true,
      description: "Viande riche en protéines et vitamines B",
      fiber: 0,
      sugar: 0,
      sodium: 62,
      potassium: 363,
      vitaminC: 0,
      calcium: 19,
      iron: 0.87,
      servingSize: "100g",
      benefits: [
        "Protéines complètes",
        "Vitamines B",
        "Sélénium",
        "Phosphore"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 2-3 jours",
      season: "Toute l'année"
    },
    {
      id: 55,
      name: "Agneau",
      emoji: "��",
      calories: 294,
      protein: 25,
      carbs: 0,
      fat: 21,
      category: "Protéines",
      goal: "Prise de masse",
      popularity: 83,
      isPopular: false,
      description: "Viande rouge riche en protéines et zinc",
      fiber: 0,
      sugar: 0,
      sodium: 72,
      potassium: 310,
      vitaminC: 0,
      calcium: 17,
      iron: 2.3,
      servingSize: "100g",
      benefits: [
        "Protéines complètes",
        "Zinc",
        "Vitamine B12",
        "Fer"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 2-3 jours",
      season: "Toute l'année"
    },
    {
      id: 56,
      name: "Dinde",
      emoji: "��",
      calories: 189,
      protein: 29,
      carbs: 0,
      fat: 7,
      category: "Protéines",
      goal: "Perte de poids",
      popularity: 89,
      isPopular: true,
      description: "Viande maigre riche en protéines et sélénium",
      fiber: 0,
      sugar: 0,
      sodium: 103,
      potassium: 288,
      vitaminC: 0,
      calcium: 15,
      iron: 1.4,
      servingSize: "100g",
      benefits: [
        "Protéines maigres",
        "Sélénium",
        "Vitamines B",
        "Faible en gras"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 2-3 jours",
      season: "Toute l'année"
    },
    {
      id: 57,
      name: "Crevettes",
      emoji: "��",
      calories: 99,
      protein: 24,
      carbs: 0,
      fat: 0.3,
      category: "Protéines",
      goal: "Perte de poids",
      popularity: 88,
      isPopular: true,
      description: "Fruits de mer riches en protéines et iode",
      fiber: 0,
      sugar: 0,
      sodium: 111,
      potassium: 259,
      vitaminC: 0,
      calcium: 54,
      iron: 0.52,
      servingSize: "100g",
      benefits: [
        "Protéines maigres",
        "Iode",
        "Sélénium",
        "Vitamine B12"
      ],
      bestTime: "Après l'entraînement",
      storage: "Réfrigérateur 1-2 jours",
      season: "Toute l'année"
    },
    {
      id: 58,
      name: "Crabes",
      emoji: "��",
      calories: 97,
      protein: 20,
      carbs: 0,
      fat: 1.5,
      category: "Protéines",
      goal: "Récupération",
      popularity: 85,
      isPopular: true,
      description: "Fruits de mer riches en protéines et zinc",
      fiber: 0,
      sugar: 0,
      sodium: 293,
      potassium: 262,
      vitaminC: 0,
      calcium: 89,
      iron: 0.74,
      servingSize: "100g",
      benefits: [
        "Protéines maigres",
        "Zinc",
        "Vitamine B12",
        "Phosphore"
      ],
      bestTime: "Dîner",
      storage: "Réfrigérateur 1-2 jours",
      season: "Toute l'année"
    },
    {
      id: 59,
      name: "Moules",
      emoji: "��",
      calories: 86,
      protein: 12,
      carbs: 4,
      fat: 2.2,
      category: "Protéines",
      goal: "Récupération",
      popularity: 81,
      isPopular: false,
      description: "Fruits de mer riches en protéines et vitamine B12",
      fiber: 0,
      sugar: 0,
      sodium: 286,
      potassium: 268,
      vitaminC: 8,
      calcium: 26,
      iron: 3.95,
      servingSize: "100g",
      benefits: [
        "Protéines complètes",
        "Vitamine B12",
        "Fer",
        "Oméga-3"
      ],
      bestTime: "Dîner",
      storage: "Réfrigérateur 1-2 jours",
      season: "Toute l'année"
    },
    {
      id: 60,
      name: "Huîtres",
      emoji: "��",
      calories: 68,
      protein: 7,
      carbs: 4,
      fat: 2.5,
      category: "Protéines",
      goal: "Récupération",
      popularity: 84,
      isPopular: true,
      description: "Fruits de mer riches en zinc et vitamine B12",
      fiber: 0,
      sugar: 0,
      sodium: 90,
      potassium: 168,
      vitaminC: 0,
      calcium: 8,
      iron: 5.11,
      servingSize: "100g",
      benefits: [
        "Zinc exceptionnel",
        "Vitamine B12",
        "Fer",
        "Protéines"
      ],
      bestTime: "Dîner",
      storage: "Réfrigérateur 1-2 jours",
      season: "Toute l'année"
    },
    {
      id: 61,
      name: "Calmars",
      emoji: "��",
      calories: 92,
      protein: 16,
      carbs: 3,
      fat: 1.4,
      category: "Protéines",
      goal: "Récupération",
      popularity: 79,
      isPopular: false,
      description: "Fruits de mer riches en protéines et sélénium",
      fiber: 0,
      sugar: 0,
      sodium: 44,
      potassium: 246,
      vitaminC: 0,
      calcium: 32,
      iron: 0.68,
      servingSize: "100g",
      benefits: [
        "Protéines maigres",
        "Sélénium",
        "Vitamine B12",
        "Phosphore"
      ],
      bestTime: "Dîner",
      storage: "Réfrigérateur 1-2 jours",
      season: "Toute l'année"
    },
    {
      id: 62,
      name: "Homard",
      emoji: "��",
      calories: 89,
      protein: 19,
      carbs: 0,
      fat: 0.9,
      category: "Protéines",
      goal: "Récupération",
      popularity: 86,
      isPopular: true,
      description: "Fruits de mer riches en protéines et phosphore",
      fiber: 0,
      sugar: 0,
      sodium: 296,
      potassium: 261,
      vitaminC: 0,
      calcium: 96,
      iron: 0.31,
      servingSize: "100g",
      benefits: [
        "Protéines maigres",
        "Phosphore",
        "Vitamine B12",
        "Sélénium"
      ],
      bestTime: "Dîner",
      storage: "Réfrigérateur 1-2 jours",
      season: "Toute l'année"
    },
    {
      id: 63,
      name: "Céleri",
      emoji: "🥬",
      calories: 16,
      protein: 0.7,
      carbs: 3,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 72,
      isPopular: false,
      description: "Légume vert riche en fibres et très peu calorique",
      fiber: 1.6,
      sugar: 1.8,
      sodium: 80,
      potassium: 260,
      vitaminC: 3.1,
      calcium: 40,
      iron: 0.2,
      servingSize: "1 branche (40g)",
      benefits: [
        "Très peu calorique",
        "Riche en fibres",
        "Vitamine K",
        "Diurétique naturel"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Toute l'année"
    },
    {
      id: 64,
      name: "Chou",
      emoji: "🥬",
      calories: 25,
      protein: 1.3,
      carbs: 6,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 74,
      isPopular: false,
      description: "Légume crucifère riche en vitamine C et K",
      fiber: 2.5,
      sugar: 3.2,
      sodium: 18,
      potassium: 170,
      vitaminC: 36.6,
      calcium: 40,
      iron: 0.47,
      servingSize: "1 tasse (89g)",
      benefits: [
        "Vitamine C et K",
        "Antioxydants",
        "Faible en calories",
        "Fibres"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Automne/Hiver"
    },
    {
      id: 65,
      name: "Chou de Bruxelles",
      emoji: "🥬",
      calories: 43,
      protein: 3.4,
      carbs: 9,
      fat: 0.3,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 68,
      isPopular: false,
      description: "Légume crucifère riche en vitamine C et folates",
      fiber: 3.8,
      sugar: 2.2,
      sodium: 25,
      potassium: 389,
      vitaminC: 85,
      calcium: 42,
      iron: 1.4,
      servingSize: "1 tasse (88g)",
      benefits: [
        "Vitamine C exceptionnelle",
        "Folates",
        "Antioxydants",
        "Fibres"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Automne/Hiver"
    },
    {
      id: 66,
      name: "Radis",
      emoji: "",
      calories: 16,
      protein: 0.7,
      carbs: 3.4,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 71,
      isPopular: false,
      description: "Légume racine croquant et peu calorique",
      fiber: 1.6,
      sugar: 1.9,
      sodium: 39,
      potassium: 233,
      vitaminC: 14.8,
      calcium: 25,
      iron: 0.34,
      servingSize: "1 tasse (116g)",
      benefits: [
        "Très peu calorique",
        "Vitamine C",
        "Croquant",
        "Diurétique"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 1 semaine",
      season: "Printemps/Été"
    },
    {
      id: 67,
      name: "Navet",
      emoji: "🥬",
      calories: 28,
      protein: 0.9,
      carbs: 6.4,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 69,
      isPopular: false,
      description: "Légume racine riche en vitamine C et fibres",
      fiber: 1.8,
      sugar: 3.8,
      sodium: 67,
      potassium: 233,
      vitaminC: 27.3,
      calcium: 30,
      iron: 0.3,
      servingSize: "1 tasse (130g)",
      benefits: [
        "Vitamine C",
        "Fibres",
        "Faible en calories",
        "Potassium"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 2-3 semaines",
      season: "Automne/Hiver"
    },
    {
      id: 68,
      name: "Betterave",
      emoji: "",
      calories: 43,
      protein: 1.6,
      carbs: 10,
      fat: 0.2,
      category: "Légumes",
      goal: "Performance",
      popularity: 76,
      isPopular: false,
      description: "Légume racine riche en nitrates et antioxydants",
      fiber: 2.8,
      sugar: 7,
      sodium: 78,
      potassium: 325,
      vitaminC: 4.9,
      calcium: 16,
      iron: 0.8,
      servingSize: "1 tasse (136g)",
      benefits: [
        "Nitrates pour la performance",
        "Antioxydants",
        "Folates",
        "Potassium"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Réfrigérateur 2-3 semaines",
      season: "Automne/Hiver"
    },
    {
      id: 69,
      name: "Aubergine",
      emoji: "🍆",
      calories: 25,
      protein: 1,
      carbs: 6,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 73,
      isPopular: false,
      description: "Légume riche en fibres et antioxydants",
      fiber: 3,
      sugar: 3.5,
      sodium: 2,
      potassium: 229,
      vitaminC: 2.2,
      calcium: 9,
      iron: 0.23,
      servingSize: "1 tasse (82g)",
      benefits: [
        "Fibres",
        "Antioxydants",
        "Faible en calories",
        "Potassium"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 1 semaine",
      season: "Été/Automne"
    },
    {
      id: 70,
      name: "Poivron",
      emoji: "🌶️",
      calories: 31,
      protein: 1,
      carbs: 7,
      fat: 0.3,
      category: "Légumes",
      goal: "Équilibre",
      popularity: 78,
      isPopular: false,
      description: "Légume riche en vitamine C et caroténoïdes",
      fiber: 2.5,
      sugar: 4.2,
      sodium: 4,
      potassium: 211,
      vitaminC: 127.7,
      calcium: 7,
      iron: 0.43,
      servingSize: "1 tasse (149g)",
      benefits: [
        "Vitamine C exceptionnelle",
        "Caroténoïdes",
        "Antioxydants",
        "Fibres"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Été/Automne"
    },
    {
      id: 71,
      name: "Piment",
      emoji: "🌶️",
      calories: 40,
      protein: 1.9,
      carbs: 9,
      fat: 0.4,
      category: "Légumes",
      goal: "Performance",
      popularity: 75,
      isPopular: false,
      description: "Légume épicé riche en capsaïcine et vitamine C",
      fiber: 1.5,
      sugar: 5.3,
      sodium: 7,
      potassium: 340,
      vitaminC: 143.7,
      calcium: 14,
      iron: 1.03,
      servingSize: "1 tasse (149g)",
      benefits: [
        "Capsaïcine pour le métabolisme",
        "Vitamine C",
        "Antioxydants",
        "Anti-inflammatoire"
      ],
      bestTime: "Avant l'entraînement",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Été/Automne"
    },
    {
      id: 72,
      name: "Asperge",
      emoji: "",
      calories: 20,
      protein: 2.2,
      carbs: 4,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 77,
      isPopular: false,
      description: "Légume vert riche en folates et vitamine K",
      fiber: 2.1,
      sugar: 1.9,
      sodium: 2,
      potassium: 202,
      vitaminC: 5.6,
      calcium: 24,
      iron: 2.14,
      servingSize: "1 tasse (134g)",
      benefits: [
        "Folates",
        "Vitamine K",
        "Faible en calories",
        "Diurétique"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 3-5 jours",
      season: "Printemps"
    },
    {
      id: 73,
      name: "Artichaut",
      emoji: "",
      calories: 47,
      protein: 3.3,
      carbs: 11,
      fat: 0.2,
      category: "Légumes",
      goal: "Équilibre",
      popularity: 70,
      isPopular: false,
      description: "Légume riche en fibres et antioxydants",
      fiber: 5.4,
      sugar: 0.99,
      sodium: 94,
      potassium: 370,
      vitaminC: 11.7,
      calcium: 44,
      iron: 1.28,
      servingSize: "1 artichaut moyen (128g)",
      benefits: [
        "Fibres exceptionnelles",
        "Antioxydants",
        "Folates",
        "Potassium"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 1 semaine",
      season: "Printemps/Été"
    },
    {
      id: 74,
      name: "Fenouil",
      emoji: "",
      calories: 31,
      protein: 1.2,
      carbs: 7,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 66,
      isPopular: false,
      description: "Légume aromatique riche en fibres et vitamine C",
      fiber: 2.7,
      sugar: 3.9,
      sodium: 52,
      potassium: 414,
      vitaminC: 12,
      calcium: 49,
      iron: 0.73,
      servingSize: "1 tasse (87g)",
      benefits: [
        "Fibres",
        "Vitamine C",
        "Potassium",
        "Aromatique"
      ],
      bestTime: "Déjeuner",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Automne/Hiver"
    },
    {
      id: 75,
      name: "Endive",
      emoji: "",
      calories: 17,
      protein: 1.3,
      carbs: 4,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 64,
      isPopular: false,
      description: "Légume feuille croquant et peu calorique",
      fiber: 3.1,
      sugar: 0.25,
      sodium: 2,
      potassium: 314,
      vitaminC: 2.3,
      calcium: 52,
      iron: 0.83,
      servingSize: "1 tasse (50g)",
      benefits: [
        "Très peu calorique",
        "Fibres",
        "Vitamine K",
        "Croquant"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Automne/Hiver"
    },
    {
      id: 76,
      name: "Laitue",
      emoji: "",
      calories: 15,
      protein: 1.4,
      carbs: 3,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 80,
      isPopular: false,
      description: "Légume feuille riche en vitamine K et folates",
      fiber: 1.3,
      sugar: 0.78,
      sodium: 28,
      potassium: 194,
      vitaminC: 9.2,
      calcium: 36,
      iron: 0.86,
      servingSize: "1 tasse (36g)",
      benefits: [
        "Très peu calorique",
        "Vitamine K",
        "Folates",
        "Hydratant"
      ],
      bestTime: "Toute la journée",
      storage: "Réfrigérateur 1 semaine",
      season: "Toute l'année"
    },
    {
      id: 77,
      name: "Mâche",
      emoji: "",
      calories: 14,
      protein: 2,
      carbs: 2,
      fat: 0.4,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 62,
      isPopular: false,
      description: "Salade verte riche en vitamine C et fer",
      fiber: 1.5,
      sugar: 0.4,
      sodium: 4,
      potassium: 459,
      vitaminC: 38.2,
      calcium: 38,
      iron: 2.18,
      servingSize: "1 tasse (20g)",
      benefits: [
        "Vitamine C",
        "Fer",
        "Très peu calorique",
        "Potassium"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 3-5 jours",
      season: "Printemps/Automne"
    },
    {
      id: 78,
      name: "Roquette",
      emoji: "",
      calories: 25,
      protein: 2.6,
      carbs: 4,
      fat: 0.7,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 68,
      isPopular: false,
      description: "Salade épicée riche en vitamine K et folates",
      fiber: 1.6,
      sugar: 2.1,
      sodium: 27,
      potassium: 369,
      vitaminC: 15,
      calcium: 160,
      iron: 1.46,
      servingSize: "1 tasse (20g)",
      benefits: [
        "Vitamine K",
        "Folates",
        "Calcium",
        "Goût épicé"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 3-5 jours",
      season: "Printemps/Automne"
    },
    {
      id: 79,
      name: "Cresson",
      emoji: "",
      calories: 11,
      protein: 2.3,
      carbs: 1.3,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 60,
      isPopular: false,
      description: "Salade verte riche en vitamine C et calcium",
      fiber: 0.5,
      sugar: 0.2,
      sodium: 14,
      potassium: 330,
      vitaminC: 43,
      calcium: 120,
      iron: 0.2,
      servingSize: "1 tasse (34g)",
      benefits: [
        "Vitamine C",
        "Calcium",
        "Très peu calorique",
        "Antioxydants"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 3-5 jours",
      season: "Printemps/Automne"
    },
    {
      id: 80,
      name: "Chicorée",
      emoji: "",
      calories: 23,
      protein: 1.7,
      carbs: 5,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 58,
      isPopular: false,
      description: "Légume feuille riche en fibres et vitamine K",
      fiber: 3.1,
      sugar: 0.7,
      sodium: 2,
      potassium: 302,
      vitaminC: 2.8,
      calcium: 100,
      iron: 0.7,
      servingSize: "1 tasse (50g)",
      benefits: [
        "Fibres",
        "Vitamine K",
        "Calcium",
        "Goût amer"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 1-2 semaines",
      season: "Automne/Hiver"
    },
    {
      id: 81,
      name: "Bette",
      emoji: "",
      calories: 19,
      protein: 1.8,
      carbs: 4,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 55,
      isPopular: false,
      description: "Légume feuille riche en vitamine K et magnésium",
      fiber: 1.6,
      sugar: 1.1,
      sodium: 213,
      potassium: 379,
      vitaminC: 30,
      calcium: 51,
      iron: 1.8,
      servingSize: "1 tasse (36g)",
      benefits: [
        "Vitamine K",
        "Magnésium",
        "Vitamine C",
        "Fer"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 1 semaine",
      season: "Printemps/Été"
    },
    {
      id: 82,
      name: "Pissenlit",
      emoji: "",
      calories: 45,
      protein: 2.7,
      carbs: 9,
      fat: 0.7,
      category: "Légumes",
      goal: "Équilibre",
      popularity: 52,
      isPopular: false,
      description: "Légume sauvage riche en vitamine A et potassium",
      fiber: 3.5,
      sugar: 0.7,
      sodium: 76,
      potassium: 397,
      vitaminC: 35,
      calcium: 187,
      iron: 3.1,
      servingSize: "1 tasse (55g)",
      benefits: [
        "Vitamine A",
        "Potassium",
        "Calcium",
        "Fer"
      ],
      bestTime: "Collation",
      storage: "Réfrigérateur 3-5 jours",
      season: "Printemps"
    }
  ];

  // Trouver l'aliment par ID
  const aliment = nutritionData.find(food => food.id === parseInt(id || '0'));

  if (!aliment) {
    return (
      <PageLayout
        title="Aliment non trouvé"
        subtitle="L'aliment demandé n'existe pas"
        icon={<Apple className="h-6 w-6 text-red-600" />}
        actions={
          <Button 
            onClick={() => navigate('/nutrition')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la nutrition
          </Button>
        }
      >
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aliment non trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              L'aliment que vous recherchez n'existe pas dans notre base de données.
            </p>
            <Button 
              onClick={() => navigate('/nutrition')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Retour à la nutrition
            </Button>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'Prise de masse': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Perte de poids': return 'bg-red-100 text-red-800 border-red-200';
      case 'Récupération': return 'bg-green-100 text-green-800 border-green-200';
      case 'Performance': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Équilibre': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <PageLayout
      title={aliment.name}
      subtitle="Fiche nutritive détaillée"
      icon={<Apple className="h-6 w-6 text-blue-600" />}
      actions={
        <div className="flex gap-2">
        <Button
          onClick={() => navigate('/nutrition')}
            variant="outline"
            className="flex items-center gap-2"
        >
            <ArrowLeft className="h-4 w-4" />
            Retour
        </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter au repas
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* En-tête de l'aliment */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{aliment.emoji}</div>
                <div>
                  <CardTitle className="text-3xl text-gray-800 mb-2">
                    {aliment.name}
                  </CardTitle>
                  <p className="text-gray-600 text-lg mb-3">
                    {aliment.description}
                  </p>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className="border-blue-300 text-blue-700 bg-blue-50"
                  >
                    {aliment.category}
                  </Badge>
                  <Badge className={getGoalColor(aliment.goal)}>
                    {aliment.goal}
                  </Badge>
                  {aliment.isPopular && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        <Star className="h-3 w-3 mr-1" />
                      Populaire
                    </Badge>
                  )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-800 mb-1">
                  {aliment.calories}
                </div>
                <div className="text-sm text-gray-600">Calories</div>
                <div className="text-sm text-gray-500 mt-2">
                  {aliment.servingSize}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Informations nutritionnelles principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {aliment.protein}g
              </div>
              <div className="text-sm text-gray-600 mb-2">Protéines</div>
              <Progress value={(aliment.protein / 50) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {aliment.carbs}g
              </div>
              <div className="text-sm text-gray-600 mb-2">Glucides</div>
              <Progress value={(aliment.carbs / 100) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {aliment.fat}g
              </div>
              <div className="text-sm text-gray-600 mb-2">Lipides</div>
              <Progress value={(aliment.fat / 30) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {aliment.fiber}g
              </div>
              <div className="text-sm text-gray-600 mb-2">Fibres</div>
              <Progress value={(aliment.fiber / 25) * 100} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Détails nutritionnels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Valeurs nutritionnelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Sucre</span>
                  <span className="font-semibold text-gray-800">{aliment.sugar}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Sodium</span>
                  <span className="font-semibold text-gray-800">{aliment.sodium}mg</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Potassium</span>
                  <span className="font-semibold text-gray-800">{aliment.potassium}mg</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Vitamine C</span>
                  <span className="font-semibold text-gray-800">{aliment.vitaminC}mg</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Calcium</span>
                  <span className="font-semibold text-gray-800">{aliment.calcium}mg</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Fer</span>
                  <span className="font-semibold text-gray-800">{aliment.iron}mg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Heart className="h-5 w-5 text-red-600" />
                Bienfaits pour la santé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aliment.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informations pratiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                Meilleur moment
              </CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-gray-700 font-medium">{aliment.bestTime}</p>
          </CardContent>
        </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
                <Users className="h-5 w-5 text-green-600" />
                Conservation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-medium">{aliment.storage}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
                <Star className="h-5 w-5 text-yellow-600" />
                Saison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-medium">{aliment.season}</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter au repas
          </Button>
              <Button variant="outline" className="border-gray-200 hover:border-gray-300">
                <Minus className="h-4 w-4 mr-2" />
                Retirer du repas
              </Button>
              <Button variant="outline" className="border-gray-200 hover:border-gray-300">
                <Heart className="h-4 w-4 mr-2" />
            Ajouter aux favoris
          </Button>
        </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AlimentDetail; 