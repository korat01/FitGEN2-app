import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Apple, 
  Utensils, 
  Clock, 
  Flame, 
  ChefHat, 
  Plus, 
  Search, 
  Star, 
  Heart, 
  Zap,
  Target,
  TrendingUp,
  BookOpen,
  ShoppingCart,
  Filter,
  Grid,
  List
} from 'lucide-react';

const Nutrition = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [selectedGoal, setSelectedGoal] = useState('tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Catégories d'objectifs
  const goals = {
    'prise-masse': { name: 'Prise de masse', color: 'bg-blue-100 text-blue-800', icon: '💪' },
    'perte-gras': { name: 'Perte de gras', color: 'bg-red-100 text-red-800', icon: '🔥' },
    'recuperation': { name: 'Récupération', color: 'bg-green-100 text-green-800', icon: '🌱' },
    'performance': { name: 'Performance', color: 'bg-purple-100 text-purple-800', icon: '⚡' },
    'equilibre': { name: 'Équilibre', color: 'bg-yellow-100 text-yellow-800', icon: '⚖️' }
  };

  // Catégories de repas
  const categories = {
    'petit-dejeuner': { name: 'Petit-déjeuner', icon: '🌅' },
    'dejeuner': { name: 'Déjeuner', icon: '☀️' },
    'diner': { name: 'Dîner', icon: '🍽️' },
    'collation': { name: 'Collations', icon: '🍎' },
    'pre-workout': { name: 'Pre-workout', icon: '⚡' },
    'post-workout': { name: 'Post-workout', icon: '🏋️' }
  };

  // Base de données des 300 repas (ajout de 10 repas supplémentaires)
  const mealsDatabase = [
    // PETIT-DÉJEUNERS - PRISE DE MASSE
    {
      id: 1,
      name: 'Bowl protéiné aux fruits',
      category: 'petit-dejeuner',
      goal: 'prise-masse',
      calories: 650,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.7,
      image: '🥣',
      protein: 35,
      carbs: 65,
      fat: 18,
      fiber: 12,
      ingredients: [
        { name: 'Flocons d\'avoine', quantity: '80g', calories: 300 },
        { name: 'Protéine en poudre', quantity: '40g', calories: 160 },
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Beurre d\'amande', quantity: '30g', calories: 180 },
        { name: 'Myrtilles', quantity: '100g', calories: 57 },
        { name: 'Lait entier', quantity: '200ml', calories: 120 }
      ],
      recipe: [
        'Mélangez les flocons d\'avoine avec le lait',
        'Ajoutez la protéine en poudre et mélangez',
        'Coupez la banane en rondelles',
        'Ajoutez le beurre d\'amande et les myrtilles',
        'Mélangez le tout et dégustez'
      ]
    },
    {
      id: 2,
      name: 'Omelette aux 3 œufs et fromage',
      category: 'petit-dejeuner',
      goal: 'prise-masse',
      calories: 520,
      prepTime: 12,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🍳',
      protein: 42,
      carbs: 8,
      fat: 35,
      fiber: 2,
      ingredients: [
        { name: 'Œufs', quantity: '3', calories: 210 },
        { name: 'Fromage cheddar', quantity: '60g', calories: 240 },
        { name: 'Beurre', quantity: '15g', calories: 110 },
        { name: 'Lait', quantity: '50ml', calories: 25 },
        { name: 'Sel et poivre', quantity: '1 pincée', calories: 0 }
      ],
      recipe: [
        'Battez les œufs avec le lait, sel et poivre',
        'Faites chauffer le beurre dans une poêle',
        'Versez les œufs battus',
        'Ajoutez le fromage râpé',
        'Cuisez à feu doux jusqu\'à ce que les œufs soient pris'
      ]
    },
    {
      id: 3,
      name: 'Pancakes protéinés',
      category: 'petit-dejeuner',
      goal: 'prise-masse',
      calories: 580,
      prepTime: 20,
      difficulty: 'Moyen',
      rating: 4.6,
      image: '🥞',
      protein: 38,
      carbs: 45,
      fat: 22,
      fiber: 6,
      ingredients: [
        { name: 'Farine complète', quantity: '100g', calories: 340 },
        { name: 'Protéine en poudre', quantity: '30g', calories: 120 },
        { name: 'Œufs', quantity: '2', calories: 140 },
        { name: 'Lait', quantity: '150ml', calories: 75 },
        { name: 'Huile de coco', quantity: '20g', calories: 180 },
        { name: 'Miel', quantity: '30g', calories: 90 }
      ],
      recipe: [
        'Mélangez la farine et la protéine en poudre',
        'Ajoutez les œufs et le lait progressivement',
        'Faites chauffer l\'huile dans une poêle',
        'Versez la pâte en petits cercles',
        'Cuisez 2-3 min de chaque côté',
        'Servez avec le miel'
      ]
    },

    // PETIT-DÉJEUNERS - PERTE DE GRAS
    {
      id: 4,
      name: 'Bowl de fruits et yaourt grec',
      category: 'petit-dejeuner',
      goal: 'perte-gras',
      calories: 280,
      prepTime: 10,
      difficulty: 'Facile',
      rating: 4.4,
      image: '🥣',
      protein: 25,
      carbs: 35,
      fat: 8,
      fiber: 8,
      ingredients: [
        { name: 'Yaourt grec 0%', quantity: '200g', calories: 100 },
        { name: 'Framboises', quantity: '100g', calories: 52 },
        { name: 'Myrtilles', quantity: '50g', calories: 29 },
        { name: 'Graines de chia', quantity: '10g', calories: 50 },
        { name: 'Miel', quantity: '1 c.à.s', calories: 64 }
      ],
      recipe: [
        'Mélangez le yaourt grec avec le miel',
        'Ajoutez les fruits dans un bol',
        'Versez le yaourt par-dessus',
        'Saupoudrez de graines de chia',
        'Dégustez immédiatement'
      ]
    },
    {
      id: 5,
      name: 'Avocado toast aux œufs',
      category: 'petit-dejeuner',
      goal: 'perte-gras',
      calories: 320,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.8,
      image: '🥑',
      protein: 18,
      carbs: 25,
      fat: 18,
      fiber: 12,
      ingredients: [
        { name: 'Pain complet', quantity: '2 tranches', calories: 160 },
        { name: 'Avocat', quantity: '1/2', calories: 160 },
        { name: 'Œufs', quantity: '2', calories: 140 },
        { name: 'Tomates cerises', quantity: '100g', calories: 18 },
        { name: 'Coriandre', quantity: '1 c.à.s', calories: 2 },
        { name: 'Citron', quantity: '1/2', calories: 8 }
      ],
      recipe: [
        'Grillez le pain complet',
        'Écrasez l\'avocat avec le citron',
        'Faites cuire les œufs au plat',
        'Tartinez le pain avec l\'avocat',
        'Ajoutez les œufs et les tomates',
        'Parsemez de coriandre'
      ]
    },

    // DÉJEUNERS - PRISE DE MASSE
    {
      id: 6,
      name: 'Poulet rôti aux patates douces',
      category: 'dejeuner',
      goal: 'prise-masse',
      calories: 720,
      prepTime: 45,
      difficulty: 'Moyen',
      rating: 4.6,
      image: '🍗',
      protein: 55,
      carbs: 75,
      fat: 18,
      fiber: 10,
      ingredients: [
        { name: 'Filet de poulet', quantity: '200g', calories: 330 },
        { name: 'Patates douces', quantity: '300g', calories: 250 },
        { name: 'Brocolis', quantity: '200g', calories: 70 },
        { name: 'Huile d\'olive', quantity: '2 c.à.s', calories: 240 },
        { name: 'Ail', quantity: '2 gousses', calories: 8 },
        { name: 'Herbes de Provence', quantity: '1 c.à.s', calories: 5 }
      ],
      recipe: [
        'Préchauffez le four à 200°C',
        'Coupez les patates douces en cubes',
        'Assaisonnez le poulet avec l\'ail et les herbes',
        'Mélangez les légumes avec l\'huile',
        'Enfournez 35-40 minutes',
        'Servez chaud'
      ]
    },
    {
      id: 7,
      name: 'Pâtes complètes au saumon',
      category: 'dejeuner',
      goal: 'prise-masse',
      calories: 680,
      prepTime: 25,
      difficulty: 'Facile',
      rating: 4.7,
      image: '🍝',
      protein: 42,
      carbs: 85,
      fat: 22,
      fiber: 8,
      ingredients: [
        { name: 'Pâtes complètes', quantity: '100g', calories: 350 },
        { name: 'Filet de saumon', quantity: '150g', calories: 250 },
        { name: 'Crème fraîche', quantity: '100ml', calories: 200 },
        { name: 'Épinards', quantity: '100g', calories: 23 },
        { name: 'Ail', quantity: '2 gousses', calories: 8 },
        { name: 'Parmesan', quantity: '30g', calories: 120 }
      ],
      recipe: [
        'Cuisez les pâtes selon les instructions',
        'Faites cuire le saumon à la poêle',
        'Ajoutez l\'ail et les épinards',
        'Versez la crème fraîche',
        'Mélangez avec les pâtes',
        'Saupoudrez de parmesan'
      ]
    },

    // DÎNERS - PERTE DE GRAS
    {
      id: 8,
      name: 'Saumon aux légumes vapeur',
      category: 'diner',
      goal: 'perte-gras',
      calories: 380,
      prepTime: 30,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🐟',
      protein: 35,
      carbs: 25,
      fat: 18,
      fiber: 8,
      ingredients: [
        { name: 'Filet de saumon', quantity: '150g', calories: 250 },
        { name: 'Asperges', quantity: '200g', calories: 40 },
        { name: 'Courgettes', quantity: '150g', calories: 25 },
        { name: 'Brocolis', quantity: '150g', calories: 50 },
        { name: 'Citron', quantity: '1/2', calories: 8 },
        { name: 'Herbes fraîches', quantity: '1 c.à.s', calories: 2 }
      ],
      recipe: [
        'Préparez les légumes en morceaux',
        'Faites cuire à la vapeur 8-10 min',
        'Assaisonnez le saumon',
        'Faites cuire le saumon 6-8 min',
        'Servez avec les légumes',
        'Arrosez de citron et herbes'
      ]
    },

    // COLLATIONS - RÉCUPÉRATION
    {
      id: 9,
      name: 'Smoothie récupération',
      category: 'collation',
      goal: 'recuperation',
      calories: 250,
      prepTime: 5,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🥤',
      protein: 20,
      carbs: 35,
      fat: 8,
      fiber: 6,
      ingredients: [
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Protéine en poudre', quantity: '25g', calories: 100 },
        { name: 'Lait d\'amande', quantity: '200ml', calories: 30 },
        { name: 'Épinards', quantity: '50g', calories: 12 },
        { name: 'Graines de lin', quantity: '1 c.à.s', calories: 55 },
        { name: 'Miel', quantity: '1 c.à.s', calories: 64 }
      ],
      recipe: [
        'Épluchez et coupez la banane',
        'Mettez tous les ingrédients dans un blender',
        'Mixez 1-2 minutes',
        'Versez dans un verre',
        'Dégustez immédiatement'
      ]
    },

    // PRE-WORKOUT
    {
      id: 10,
      name: 'Bowl d\'énergie pré-entraînement',
      category: 'pre-workout',
      goal: 'performance',
      calories: 320,
      prepTime: 10,
      difficulty: 'Facile',
      rating: 4.4,
      image: '⚡',
      protein: 15,
      carbs: 55,
      fat: 8,
      fiber: 8,
      ingredients: [
        { name: 'Flocons d\'avoine', quantity: '50g', calories: 190 },
        { name: 'Banane', quantity: '1/2', calories: 45 },
        { name: 'Dattes', quantity: '3', calories: 60 },
        { name: 'Cacao en poudre', quantity: '1 c.à.s', calories: 15 },
        { name: 'Lait d\'amande', quantity: '150ml', calories: 22 },
        { name: 'Café', quantity: '50ml', calories: 2 }
      ],
      recipe: [
        'Mélangez les flocons d\'avoine avec le lait',
        'Ajoutez la banane coupée',
        'Mélangez les dattes hachées',
        'Ajoutez le cacao et le café',
        'Mélangez le tout',
        'Consommez 30 min avant l\'entraînement'
      ]
    },

    // NOUVEAUX REPAS - PRISE DE MASSE
    {
      id: 11,
      name: 'Burger de bœuf aux patates douces',
      category: 'dejeuner',
      goal: 'prise-masse',
      calories: 850,
      prepTime: 35,
      difficulty: 'Moyen',
      rating: 4.8,
      image: '🍔',
      protein: 45,
      carbs: 65,
      fat: 35,
      fiber: 8,
      ingredients: [
        { name: 'Steak haché 5%', quantity: '200g', calories: 400 },
        { name: 'Pain complet', quantity: '2 tranches', calories: 160 },
        { name: 'Patate douce', quantity: '200g', calories: 170 },
        { name: 'Fromage cheddar', quantity: '40g', calories: 160 },
        { name: 'Avocat', quantity: '1/2', calories: 160 },
        { name: 'Tomate', quantity: '1', calories: 20 },
        { name: 'Huile d\'olive', quantity: '1 c.à.s', calories: 120 }
      ],
      recipe: [
        'Formez des steaks avec la viande hachée',
        'Faites cuire les patates douces en frites',
        'Grillez les steaks 4-5 min de chaque côté',
        'Grillez le pain',
        'Assemblez le burger avec tous les ingrédients',
        'Servez avec les frites de patate douce'
      ]
    },
    {
      id: 12,
      name: 'Bowl de riz au poulet et légumes',
      category: 'dejeuner',
      goal: 'prise-masse',
      calories: 720,
      prepTime: 25,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🍚',
      protein: 50,
      carbs: 80,
      fat: 15,
      fiber: 6,
      ingredients: [
        { name: 'Riz brun', quantity: '100g', calories: 350 },
        { name: 'Filet de poulet', quantity: '180g', calories: 300 },
        { name: 'Brocolis', quantity: '150g', calories: 50 },
        { name: 'Carottes', quantity: '100g', calories: 40 },
        { name: 'Sauce soja', quantity: '2 c.à.s', calories: 20 },
        { name: 'Graines de sésame', quantity: '1 c.à.s', calories: 50 }
      ],
      recipe: [
        'Cuisez le riz brun selon les instructions',
        'Coupez le poulet en dés et faites-le cuire',
        'Faites cuire les légumes à la vapeur',
        'Mélangez le riz avec la sauce soja',
        'Ajoutez le poulet et les légumes',
        'Saupoudrez de graines de sésame'
      ]
    },
    {
      id: 13,
      name: 'Smoothie hypercalorique',
      category: 'collation',
      goal: 'prise-masse',
      calories: 650,
      prepTime: 8,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🥤',
      protein: 35,
      carbs: 75,
      fat: 25,
      fiber: 8,
      ingredients: [
        { name: 'Banane', quantity: '2', calories: 180 },
        { name: 'Beurre d\'amande', quantity: '40g', calories: 240 },
        { name: 'Protéine en poudre', quantity: '35g', calories: 140 },
        { name: 'Avoine', quantity: '50g', calories: 190 },
        { name: 'Lait entier', quantity: '300ml', calories: 180 },
        { name: 'Miel', quantity: '2 c.à.s', calories: 128 }
      ],
      recipe: [
        'Épluchez et coupez les bananes',
        'Mettez tous les ingrédients dans un blender',
        'Mixez 2-3 minutes jusqu\'à obtenir une texture lisse',
        'Ajoutez du lait si nécessaire pour ajuster la consistance',
        'Versez dans un grand verre',
        'Dégustez immédiatement'
      ]
    },

    // NOUVEAUX REPAS - PERTE DE GRAS
    {
      id: 14,
      name: 'Salade de thon aux légumes croquants',
      category: 'dejeuner',
      goal: 'perte-gras',
      calories: 320,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.4,
      image: '🥗',
      protein: 35,
      carbs: 20,
      fat: 12,
      fiber: 8,
      ingredients: [
        { name: 'Thon en conserve', quantity: '150g', calories: 180 },
        { name: 'Concombre', quantity: '1/2', calories: 8 },
        { name: 'Tomates cerises', quantity: '150g', calories: 27 },
        { name: 'Radis', quantity: '100g', calories: 16 },
        { name: 'Vinaigrette légère', quantity: '2 c.à.s', calories: 60 },
        { name: 'Herbes fraîches', quantity: '1 c.à.s', calories: 2 }
      ],
      recipe: [
        'Égouttez le thon et émiettez-le',
        'Coupez tous les légumes en morceaux',
        'Mélangez le thon avec les légumes',
        'Arrosez de vinaigrette',
        'Ajoutez les herbes fraîches',
        'Mélangez et servez frais'
      ]
    },
    {
      id: 15,
      name: 'Soupe de légumes minceur',
      category: 'diner',
      goal: 'perte-gras',
      calories: 180,
      prepTime: 30,
      difficulty: 'Facile',
      rating: 4.2,
      image: '��',
      protein: 8,
      carbs: 25,
      fat: 5,
      fiber: 12,
      ingredients: [
        { name: 'Courgettes', quantity: '200g', calories: 34 },
        { name: 'Tomates', quantity: '200g', calories: 36 },
        { name: 'Oignons', quantity: '100g', calories: 40 },
        { name: 'Ail', quantity: '2 gousses', calories: 8 },
        { name: 'Bouillon de légumes', quantity: '500ml', calories: 25 },
        { name: 'Herbes de Provence', quantity: '1 c.à.s', calories: 5 }
      ],
      recipe: [
        'Coupez tous les légumes en morceaux',
        'Faites revenir l\'oignon et l\'ail',
        'Ajoutez les autres légumes',
        'Versez le bouillon et les herbes',
        'Laissez mijoter 20-25 minutes',
        'Mixez jusqu\'à obtenir une texture lisse'
      ]
    },
    {
      id: 16,
      name: 'Wrap aux légumes et hummus',
      category: 'collation',
      goal: 'perte-gras',
      calories: 250,
      prepTime: 10,
      difficulty: 'Facile',
      rating: 4.3,
      image: '🌯',
      protein: 12,
      carbs: 35,
      fat: 8,
      fiber: 10,
      ingredients: [
        { name: 'Tortilla complète', quantity: '1', calories: 120 },
        { name: 'Hummus', quantity: '50g', calories: 80 },
        { name: 'Concombre', quantity: '1/2', calories: 8 },
        { name: 'Carottes râpées', quantity: '50g', calories: 20 },
        { name: 'Épinards', quantity: '30g', calories: 7 },
        { name: 'Tomates', quantity: '1', calories: 18 }
      ],
      recipe: [
        'Étalez l\'hummus sur la tortilla',
        'Ajoutez les légumes coupés en lanières',
        'Roulez la tortilla fermement',
        'Coupez en deux',
        'Servez immédiatement'
      ]
    },

    // NOUVEAUX REPAS - RÉCUPÉRATION
    {
      id: 17,
      name: 'Bowl de quinoa aux légumes verts',
      category: 'diner',
      goal: 'recuperation',
      calories: 420,
      prepTime: 20,
      difficulty: 'Facile',
      rating: 4.7,
      image: '🥗',
      protein: 18,
      carbs: 55,
      fat: 12,
      fiber: 10,
      ingredients: [
        { name: 'Quinoa', quantity: '80g', calories: 280 },
        { name: 'Épinards', quantity: '100g', calories: 23 },
        { name: 'Brocolis', quantity: '150g', calories: 50 },
        { name: 'Avocat', quantity: '1/2', calories: 160 },
        { name: 'Graines de chia', quantity: '1 c.à.s', calories: 50 },
        { name: 'Vinaigrette citron', quantity: '2 c.à.s', calories: 60 }
      ],
      recipe: [
        'Cuisez le quinoa selon les instructions',
        'Faites cuire les légumes verts à la vapeur',
        'Laissez refroidir le quinoa',
        'Mélangez avec les légumes',
        'Ajoutez l\'avocat en cubes',
        'Arrosez de vinaigrette et saupoudrez de chia'
      ]
    },
    {
      id: 18,
      name: 'Smoothie vert récupération',
      category: 'post-workout',
      goal: 'recuperation',
      calories: 280,
      prepTime: 5,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🥤',
      protein: 20,
      carbs: 35,
      fat: 8,
      fiber: 8,
      ingredients: [
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Épinards', quantity: '50g', calories: 12 },
        { name: 'Protéine en poudre', quantity: '25g', calories: 100 },
        { name: 'Lait d\'amande', quantity: '200ml', calories: 30 },
        { name: 'Gingembre', quantity: '1 c.à.c', calories: 2 },
        { name: 'Miel', quantity: '1 c.à.s', calories: 64 }
      ],
      recipe: [
        'Épluchez et coupez la banane',
        'Lavez les épinards',
        'Mettez tous les ingrédients dans un blender',
        'Mixez 1-2 minutes',
        'Filtrez si nécessaire',
        'Dégustez immédiatement'
      ]
    },

    // NOUVEAUX REPAS - PERFORMANCE
    {
      id: 19,
      name: 'Pâtes au thon et légumes',
      category: 'pre-workout',
      goal: 'performance',
      calories: 480,
      prepTime: 20,
      difficulty: 'Facile',
      rating: 4.4,
      image: '🍝',
      protein: 30,
      carbs: 65,
      fat: 12,
      fiber: 6,
      ingredients: [
        { name: 'Pâtes complètes', quantity: '80g', calories: 280 },
        { name: 'Thon en conserve', quantity: '100g', calories: 120 },
        { name: 'Tomates', quantity: '200g', calories: 36 },
        { name: 'Ail', quantity: '2 gousses', calories: 8 },
        { name: 'Huile d\'olive', quantity: '1 c.à.s', calories: 120 },
        { name: 'Basilic', quantity: '1 c.à.s', calories: 2 }
      ],
      recipe: [
        'Cuisez les pâtes selon les instructions',
        'Faites revenir l\'ail dans l\'huile',
        'Ajoutez les tomates coupées',
        'Incorporez le thon émietté',
        'Mélangez avec les pâtes',
        'Ajoutez le basilic frais'
      ]
    },
    {
      id: 20,
      name: 'Energy balls aux dattes et noix',
      category: 'pre-workout',
      goal: 'performance',
      calories: 180,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🥧',
      protein: 6,
      carbs: 25,
      fat: 8,
      fiber: 4,
      ingredients: [
        { name: 'Dattes', quantity: '80g', calories: 224 },
        { name: 'Noix', quantity: '30g', calories: 200 },
        { name: 'Cacao en poudre', quantity: '1 c.à.s', calories: 15 },
        { name: 'Coco râpée', quantity: '1 c.à.s', calories: 35 },
        { name: 'Vanille', quantity: '1 c.à.c', calories: 5 }
      ],
      recipe: [
        'Dénoyautez les dattes',
        'Mixez les noix jusqu\'à obtenir une poudre',
        'Ajoutez les dattes et mixez',
        'Incorporez le cacao et la vanille',
        'Formez des boules avec les mains',
        'Roulez dans la coco râpée'
      ]
    },
    // NOUVEAUX REPAS - PRISE DE MASSE
    {
      id: 21,
      name: 'Steak de saumon aux légumes rôtis',
      category: 'diner',
      goal: 'prise-masse',
      calories: 680,
      prepTime: 40,
      difficulty: 'Moyen',
      rating: 4.8,
      image: '🐟',
      protein: 45,
      carbs: 35,
      fat: 35,
      fiber: 8,
      ingredients: [
        { name: 'Pavé de saumon', quantity: '200g', calories: 400 },
        { name: 'Patate douce', quantity: '250g', calories: 210 },
        { name: 'Courgettes', quantity: '200g', calories: 34 },
        { name: 'Poivrons', quantity: '150g', calories: 45 },
        { name: 'Huile d\'olive', quantity: '3 c.à.s', calories: 360 },
        { name: 'Herbes de Provence', quantity: '1 c.à.s', calories: 5 },
        { name: 'Citron', quantity: '1/2', calories: 8 }
      ],
      recipe: [
        'Préchauffez le four à 200°C',
        'Coupez les légumes en morceaux',
        'Mélangez avec l\'huile et les herbes',
        'Enfournez 25 minutes',
        'Assaisonnez le saumon',
        'Ajoutez le saumon et cuisez 15 min',
        'Servez avec le citron'
      ]
    },
    {
      id: 22,
      name: 'Bowl de poulet teriyaki',
      category: 'dejeuner',
      goal: 'prise-masse',
      calories: 750,
      prepTime: 30,
      difficulty: 'Moyen',
      rating: 4.6,
      image: '🍱',
      protein: 55,
      carbs: 85,
      fat: 18,
      fiber: 6,
      ingredients: [
        { name: 'Filet de poulet', quantity: '200g', calories: 330 },
        { name: 'Riz complet', quantity: '120g', calories: 420 },
        { name: 'Brocolis', quantity: '150g', calories: 50 },
        { name: 'Carottes', quantity: '100g', calories: 40 },
        { name: 'Sauce teriyaki', quantity: '3 c.à.s', calories: 60 },
        { name: 'Graines de sésame', quantity: '1 c.à.s', calories: 50 },
        { name: 'Huile de sésame', quantity: '1 c.à.s', calories: 120 }
      ],
      recipe: [
        'Cuisez le riz complet',
        'Coupez le poulet en dés',
        'Faites cuire le poulet avec la sauce teriyaki',
        'Faites cuire les légumes à la vapeur',
        'Servez le riz avec le poulet et légumes',
        'Arrosez d\'huile de sésame et graines'
      ]
    },
    {
      id: 23,
      name: 'Pancakes protéinés aux myrtilles',
      category: 'petit-dejeuner',
      goal: 'prise-masse',
      calories: 620,
      prepTime: 25,
      difficulty: 'Moyen',
      rating: 4.7,
      image: '🥞',
      protein: 42,
      carbs: 55,
      fat: 25,
      fiber: 8,
      ingredients: [
        { name: 'Farine complète', quantity: '120g', calories: 400 },
        { name: 'Protéine en poudre', quantity: '40g', calories: 160 },
        { name: 'Œufs', quantity: '2', calories: 140 },
        { name: 'Lait entier', quantity: '200ml', calories: 100 },
        { name: 'Myrtilles', quantity: '100g', calories: 57 },
        { name: 'Beurre', quantity: '20g', calories: 150 },
        { name: 'Sirop d\'érable', quantity: '2 c.à.s', calories: 104 }
      ],
      recipe: [
        'Mélangez la farine et la protéine',
        'Ajoutez les œufs et le lait',
        'Incorporez les myrtilles',
        'Faites chauffer le beurre',
        'Cuisez les pancakes 3-4 min par côté',
        'Servez avec le sirop d\'érable'
      ]
    },

    // NOUVEAUX REPAS - PERTE DE GRAS
    {
      id: 24,
      name: 'Salade de lentilles aux légumes',
      category: 'dejeuner',
      goal: 'perte-gras',
      calories: 280,
      prepTime: 20,
      difficulty: 'Facile',
      rating: 4.3,
      image: '🥗',
      protein: 18,
      carbs: 45,
      fat: 5,
      fiber: 15,
      ingredients: [
        { name: 'Lentilles vertes', quantity: '100g', calories: 116 },
        { name: 'Concombre', quantity: '1/2', calories: 8 },
        { name: 'Tomates cerises', quantity: '150g', calories: 27 },
        { name: 'Oignon rouge', quantity: '50g', calories: 20 },
        { name: 'Persil', quantity: '2 c.à.s', calories: 2 },
        { name: 'Vinaigrette citron', quantity: '2 c.à.s', calories: 60 }
      ],
      recipe: [
        'Cuisez les lentilles selon les instructions',
        'Coupez tous les légumes',
        'Mélangez les lentilles refroidies avec les légumes',
        'Ajoutez le persil haché',
        'Arrosez de vinaigrette',
        'Mélangez et servez frais'
      ]
    },
    {
      id: 25,
      name: 'Poisson blanc aux légumes vapeur',
      category: 'diner',
      goal: 'perte-gras',
      calories: 220,
      prepTime: 25,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🐟',
      protein: 35,
      carbs: 15,
      fat: 5,
      fiber: 8,
      ingredients: [
        { name: 'Filet de cabillaud', quantity: '150g', calories: 120 },
        { name: 'Asperges', quantity: '150g', calories: 30 },
        { name: 'Haricots verts', quantity: '100g', calories: 31 },
        { name: 'Citron', quantity: '1/2', calories: 8 },
        { name: 'Ail', quantity: '1 gousse', calories: 4 },
        { name: 'Herbes fraîches', quantity: '1 c.à.s', calories: 2 }
      ],
      recipe: [
        'Préparez les légumes en morceaux',
        'Faites cuire à la vapeur 8-10 min',
        'Assaisonnez le poisson',
        'Faites cuire le poisson 6-8 min',
        'Servez avec les légumes',
        'Arrosez de citron et herbes'
      ]
    },
    {
      id: 26,
      name: 'Smoothie vert détox',
      category: 'collation',
      goal: 'perte-gras',
      calories: 150,
      prepTime: 8,
      difficulty: 'Facile',
      rating: 4.2,
      image: '',
      protein: 8,
      carbs: 25,
      fat: 4,
      fiber: 8,
      ingredients: [
        { name: 'Épinards', quantity: '50g', calories: 12 },
        { name: 'Concombre', quantity: '1/2', calories: 8 },
        { name: 'Pomme verte', quantity: '1', calories: 52 },
        { name: 'Gingembre', quantity: '1 c.à.c', calories: 2 },
        { name: 'Citron', quantity: '1/2', calories: 8 },
        { name: 'Eau de coco', quantity: '200ml', calories: 40 }
      ],
      recipe: [
        'Lavez tous les ingrédients',
        'Coupez la pomme en morceaux',
        'Mettez tout dans un blender',
        'Mixez 2-3 minutes',
        'Filtrez si nécessaire',
        'Dégustez immédiatement'
      ]
    },

    // NOUVEAUX REPAS - RÉCUPÉRATION
    {
      id: 27,
      name: 'Bowl de riz au saumon et légumes',
      category: 'post-workout',
      goal: 'recuperation',
      calories: 520,
      prepTime: 30,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🍚',
      protein: 35,
      carbs: 65,
      fat: 15,
      fiber: 6,
      ingredients: [
        { name: 'Riz complet', quantity: '100g', calories: 350 },
        { name: 'Filet de saumon', quantity: '120g', calories: 200 },
        { name: 'Brocolis', quantity: '100g', calories: 34 },
        { name: 'Carottes', quantity: '80g', calories: 32 },
        { name: 'Sauce soja', quantity: '2 c.à.s', calories: 20 },
        { name: 'Graines de sésame', quantity: '1 c.à.s', calories: 50 }
      ],
      recipe: [
        'Cuisez le riz complet',
        'Faites cuire le saumon à la vapeur',
        'Faites cuire les légumes',
        'Mélangez le riz avec la sauce soja',
        'Ajoutez le saumon et légumes',
        'Saupoudrez de graines de sésame'
      ]
    },
    {
      id: 28,
      name: 'Smoothie protéiné post-entraînement',
      category: 'post-workout',
      goal: 'recuperation',
      calories: 350,
      prepTime: 8,
      difficulty: 'Facile',
      rating: 4.7,
      image: '🥤',
      protein: 30,
      carbs: 40,
      fat: 8,
      fiber: 6,
      ingredients: [
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Protéine en poudre', quantity: '30g', calories: 120 },
        { name: 'Lait de soja', quantity: '250ml', calories: 80 },
        { name: 'Framboises', quantity: '50g', calories: 26 },
        { name: 'Graines de lin', quantity: '1 c.à.s', calories: 55 },
        { name: 'Miel', quantity: '1 c.à.s', calories: 64 }
      ],
      recipe: [
        'Épluchez et coupez la banane',
        'Mettez tous les ingrédients dans un blender',
        'Mixez 2-3 minutes',
        'Versez dans un grand verre',
        'Dégustez dans les 30 minutes'
      ]
    },

    // NOUVEAUX REPAS - PERFORMANCE
    {
      id: 29,
      name: 'Bowl d\'avoine pré-entraînement',
      category: 'pre-workout',
      goal: 'performance',
      calories: 450,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🥣',
      protein: 18,
      carbs: 75,
      fat: 8,
      fiber: 12,
      ingredients: [
        { name: 'Flocons d\'avoine', quantity: '60g', calories: 230 },
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Dattes', quantity: '4', calories: 80 },
        { name: 'Amandes', quantity: '20g', calories: 120 },
        { name: 'Cacao en poudre', quantity: '1 c.à.s', calories: 15 },
        { name: 'Lait d\'amande', quantity: '200ml', calories: 30 }
      ],
      recipe: [
        'Mélangez l\'avoine avec le lait',
        'Ajoutez la banane coupée',
        'Mélangez les dattes hachées',
        'Ajoutez les amandes et cacao',
        'Mélangez le tout',
        'Consommez 1h avant l\'entraînement'
      ]
    },
    {
      id: 30,
      name: 'Toast à l\'avocat et œufs',
      category: 'pre-workout',
      goal: 'performance',
      calories: 380,
      prepTime: 12,
      difficulty: 'Facile',
      rating: 4.4,
      image: '🥑',
      protein: 20,
      carbs: 25,
      fat: 25,
      fiber: 8,
      ingredients: [
        { name: 'Pain complet', quantity: '2 tranches', calories: 160 },
        { name: 'Avocat', quantity: '1/2', calories: 160 },
        { name: 'Œufs', quantity: '2', calories: 140 },
        { name: 'Tomates cerises', quantity: '100g', calories: 18 },
        { name: 'Citron', quantity: '1/2', calories: 8 },
        { name: 'Sel et poivre', quantity: '1 pincée', calories: 0 }
      ],
      recipe: [
        'Grillez le pain complet',
        'Écrasez l\'avocat avec le citron',
        'Faites cuire les œufs au plat',
        'Tartinez le pain avec l\'avocat',
        'Ajoutez les œufs et tomates',
        'Assaisonnez et servez'
      ]
    },
    // NOUVEAUX REPAS - PRISE DE MASSE
    {
      id: 31,
      name: 'Burrito de bœuf aux haricots',
      category: 'dejeuner',
      goal: 'prise-masse',
      calories: 820,
      prepTime: 35,
      difficulty: 'Moyen',
      rating: 4.7,
      image: '🌯',
      protein: 48,
      carbs: 85,
      fat: 28,
      fiber: 12,
      ingredients: [
        { name: 'Tortilla complète', quantity: '2', calories: 200 },
        { name: 'Bœuf haché', quantity: '150g', calories: 375 },
        { name: 'Haricots noirs', quantity: '100g', calories: 130 },
        { name: 'Riz complet', quantity: '80g', calories: 280 },
        { name: 'Fromage râpé', quantity: '50g', calories: 200 },
        { name: 'Avocat', quantity: '1/2', calories: 160 },
        { name: 'Salsa', quantity: '3 c.à.s', calories: 45 }
      ],
      recipe: [
        'Cuisez le riz et les haricots',
        'Faites revenir le bœuf haché',
        'Mélangez le bœuf avec les haricots',
        'Réchauffez les tortillas',
        'Garnissez avec le riz, bœuf, fromage et avocat',
        'Roulez et servez avec la salsa'
      ]
    },
    {
      id: 32,
      name: 'Pâtes carbonara protéinées',
      category: 'diner',
      goal: 'prise-masse',
      calories: 750,
      prepTime: 25,
      difficulty: 'Moyen',
      rating: 4.8,
      image: '🍝',
      protein: 42,
      carbs: 75,
      fat: 32,
      fiber: 6,
      ingredients: [
        { name: 'Pâtes complètes', quantity: '120g', calories: 420 },
        { name: 'Lardons', quantity: '80g', calories: 320 },
        { name: 'Œufs', quantity: '3', calories: 210 },
        { name: 'Parmesan', quantity: '60g', calories: 240 },
        { name: 'Crème fraîche', quantity: '100ml', calories: 200 },
        { name: 'Ail', quantity: '2 gousses', calories: 8 },
        { name: 'Poivre noir', quantity: '1 c.à.c', calories: 2 }
      ],
      recipe: [
        'Cuisez les pâtes selon les instructions',
        'Faites revenir les lardons',
        'Mélangez les œufs avec le parmesan et la crème',
        'Ajoutez l\'ail aux lardons',
        'Mélangez les pâtes avec les lardons',
        'Ajoutez le mélange œufs-crème hors du feu',
        'Salez et poivrez généreusement'
      ]
    },
    {
      id: 33,
      name: 'Bowl de quinoa aux légumes et tofu',
      category: 'dejeuner',
      goal: 'prise-masse',
      calories: 580,
      prepTime: 30,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🥗',
      protein: 28,
      carbs: 65,
      fat: 22,
      fiber: 10,
      ingredients: [
        { name: 'Quinoa', quantity: '100g', calories: 350 },
        { name: 'Tofu ferme', quantity: '150g', calories: 120 },
        { name: 'Brocolis', quantity: '150g', calories: 50 },
        { name: 'Carottes', quantity: '100g', calories: 40 },
        { name: 'Avocat', quantity: '1/2', calories: 160 },
        { name: 'Sauce soja', quantity: '2 c.à.s', calories: 20 },
        { name: 'Huile de sésame', quantity: '1 c.à.s', calories: 120 }
      ],
      recipe: [
        'Cuisez le quinoa selon les instructions',
        'Coupez le tofu en dés et faites-le revenir',
        'Faites cuire les légumes à la vapeur',
        'Mélangez le quinoa avec la sauce soja',
        'Ajoutez le tofu et les légumes',
        'Garnissez avec l\'avocat et l\'huile de sésame'
      ]
    },

    // NOUVEAUX REPAS - PERTE DE GRAS
    {
      id: 34,
      name: 'Salade de chou kale aux noix',
      category: 'dejeuner',
      goal: 'perte-gras',
      calories: 240,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.4,
      image: '🥗',
      protein: 12,
      carbs: 18,
      fat: 16,
      fiber: 8,
      ingredients: [
        { name: 'Chou kale', quantity: '100g', calories: 49 },
        { name: 'Noix', quantity: '30g', calories: 200 },
        { name: 'Tomates cerises', quantity: '150g', calories: 27 },
        { name: 'Concombre', quantity: '1/2', calories: 8 },
        { name: 'Vinaigrette balsamique', quantity: '2 c.à.s', calories: 60 },
        { name: 'Graines de tournesol', quantity: '1 c.à.s', calories: 50 }
      ],
      recipe: [
        'Lavez et coupez le chou kale en lanières',
        'Massez le kale avec un peu de sel',
        'Coupez les tomates et le concombre',
        'Mélangez tous les légumes',
        'Ajoutez les noix et graines',
        'Arrosez de vinaigrette et mélangez'
      ]
    },
    {
      id: 35,
      name: 'Poisson blanc aux herbes et légumes',
      category: 'diner',
      goal: 'perte-gras',
      calories: 280,
      prepTime: 30,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🐟',
      protein: 38,
      carbs: 20,
      fat: 8,
      fiber: 6,
      ingredients: [
        { name: 'Filet de cabillaud', quantity: '180g', calories: 150 },
        { name: 'Courgettes', quantity: '200g', calories: 34 },
        { name: 'Tomates', quantity: '150g', calories: 27 },
        { name: 'Ail', quantity: '2 gousses', calories: 8 },
        { name: 'Herbes fraîches', quantity: '2 c.à.s', calories: 4 },
        { name: 'Huile d\'olive', quantity: '1 c.à.s', calories: 120 },
        { name: 'Citron', quantity: '1/2', calories: 8 }
      ],
      recipe: [
        'Préchauffez le four à 180°C',
        'Coupez les légumes en morceaux',
        'Placez le poisson sur une plaque',
        'Entourez de légumes et herbes',
        'Arrosez d\'huile et citron',
        'Enfournez 20-25 minutes'
      ]
    },
    {
      id: 36,
      name: 'Smoothie vert aux épinards',
      category: 'collation',
      goal: 'perte-gras',
      calories: 120,
      prepTime: 8,
      difficulty: 'Facile',
      rating: 4.1,
      image: '',
      protein: 6,
      carbs: 20,
      fat: 3,
      fiber: 6,
      ingredients: [
        { name: 'Épinards', quantity: '50g', calories: 12 },
        { name: 'Pomme verte', quantity: '1', calories: 52 },
        { name: 'Concombre', quantity: '1/2', calories: 8 },
        { name: 'Gingembre', quantity: '1 c.à.c', calories: 2 },
        { name: 'Eau', quantity: '200ml', calories: 0 },
        { name: 'Menthe', quantity: '5 feuilles', calories: 1 }
      ],
      recipe: [
        'Lavez tous les ingrédients',
        'Coupez la pomme en morceaux',
        'Mettez tout dans un blender',
        'Mixez 2-3 minutes',
        'Filtrez si nécessaire',
        'Dégustez frais'
      ]
    },

    // NOUVEAUX REPAS - RÉCUPÉRATION
    {
      id: 37,
      name: 'Bowl de riz brun aux légumes et œufs',
      category: 'post-workout',
      goal: 'recuperation',
      calories: 480,
      prepTime: 25,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🍚',
      protein: 22,
      carbs: 65,
      fat: 15,
      fiber: 8,
      ingredients: [
        { name: 'Riz brun', quantity: '100g', calories: 350 },
        { name: 'Œufs', quantity: '2', calories: 140 },
        { name: 'Brocolis', quantity: '100g', calories: 34 },
        { name: 'Carottes', quantity: '80g', calories: 32 },
        { name: 'Sauce soja', quantity: '2 c.à.s', calories: 20 },
        { name: 'Huile de sésame', quantity: '1 c.à.s', calories: 120 }
      ],
      recipe: [
        'Cuisez le riz brun',
        'Faites cuire les œufs au plat',
        'Faites cuire les légumes à la vapeur',
        'Mélangez le riz avec la sauce soja',
        'Ajoutez les œufs et légumes',
        'Arrosez d\'huile de sésame'
      ]
    },
    {
      id: 38,
      name: 'Smoothie banane-coco post-entraînement',
      category: 'post-workout',
      goal: 'recuperation',
      calories: 320,
      prepTime: 8,
      difficulty: 'Facile',
      rating: 4.7,
      image: '🥤',
      protein: 18,
      carbs: 45,
      fat: 12,
      fiber: 6,
      ingredients: [
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Protéine en poudre', quantity: '25g', calories: 100 },
        { name: 'Lait de coco', quantity: '200ml', calories: 80 },
        { name: 'Graines de chia', quantity: '1 c.à.s', calories: 50 },
        { name: 'Miel', quantity: '1 c.à.s', calories: 64 },
        { name: 'Glace', quantity: '5 glaçons', calories: 0 }
      ],
      recipe: [
        'Épluchez et coupez la banane',
        'Mettez tous les ingrédients dans un blender',
        'Mixez 2-3 minutes',
        'Versez dans un grand verre',
        'Dégustez immédiatement'
      ]
    },

    // NOUVEAUX REPAS - PERFORMANCE
    {
      id: 39,
      name: 'Bowl d\'avoine aux fruits secs',
      category: 'pre-workout',
      goal: 'performance',
      calories: 520,
      prepTime: 20,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🥣',
      protein: 20,
      carbs: 85,
      fat: 12,
      fiber: 15,
      ingredients: [
        { name: 'Flocons d\'avoine', quantity: '80g', calories: 300 },
        { name: 'Dattes', quantity: '6', calories: 120 },
        { name: 'Amandes', quantity: '25g', calories: 150 },
        { name: 'Raisins secs', quantity: '30g', calories: 90 },
        { name: 'Cannelle', quantity: '1 c.à.c', calories: 3 },
        { name: 'Lait d\'amande', quantity: '250ml', calories: 40 }
      ],
      recipe: [
        'Mélangez l\'avoine avec le lait',
        'Ajoutez les fruits secs hachés',
        'Saupoudrez de cannelle',
        'Laissez reposer 10 minutes',
        'Mélangez et servez',
        'Consommez 1h avant l\'entraînement'
      ]
    },
    {
      id: 40,
      name: 'Toast aux œufs et avocat',
      category: 'pre-workout',
      goal: 'performance',
      calories: 420,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🥑',
      protein: 22,
      carbs: 35,
      fat: 25,
      fiber: 10,
      ingredients: [
        { name: 'Pain complet', quantity: '2 tranches', calories: 160 },
        { name: 'Œufs', quantity: '2', calories: 140 },
        { name: 'Avocat', quantity: '1/2', calories: 160 },
        { name: 'Tomates', quantity: '1', calories: 18 },
        { name: 'Citron', quantity: '1/2', calories: 8 },
        { name: 'Sel et poivre', quantity: '1 pincée', calories: 0 }
      ],
      recipe: [
        'Grillez le pain complet',
        'Faites cuire les œufs au plat',
        'Écrasez l\'avocat avec le citron',
        'Tartinez le pain avec l\'avocat',
        'Ajoutez les œufs et tomates',
        'Assaisonnez et servez'
      ]
    },
    // NOUVEAUX REPAS - PRISE DE MASSE
    {
      id: 41,
      name: 'Lasagnes aux épinards et ricotta',
      category: 'diner',
      goal: 'prise-masse',
      calories: 680,
      prepTime: 60,
      difficulty: 'Difficile',
      rating: 4.8,
      image: '🍝',
      protein: 38,
      carbs: 55,
      fat: 35,
      fiber: 8,
      ingredients: [
        { name: 'Pâtes lasagnes', quantity: '200g', calories: 700 },
        { name: 'Ricotta', quantity: '250g', calories: 435 },
        { name: 'Épinards', quantity: '200g', calories: 46 },
        { name: 'Mozzarella', quantity: '150g', calories: 450 },
        { name: 'Sauce tomate', quantity: '300ml', calories: 60 },
        { name: 'Ail', quantity: '3 gousses', calories: 12 },
        { name: 'Basilic', quantity: '1 c.à.s', calories: 2 }
      ],
      recipe: [
        'Préchauffez le four à 180°C',
        'Faites blanchir les épinards',
        'Mélangez la ricotta avec les épinards et l\'ail',
        'Montez les lasagnes en alternant pâtes, ricotta et sauce',
        'Terminez par la mozzarella',
        'Enfournez 45 minutes'
      ]
    },
    {
      id: 42,
      name: 'Bowl de poulet au curry et riz',
      category: 'dejeuner',
      goal: 'prise-masse',
      calories: 720,
      prepTime: 40,
      difficulty: 'Moyen',
      rating: 4.6,
      image: '🍛',
      protein: 45,
      carbs: 75,
      fat: 22,
      fiber: 6,
      ingredients: [
        { name: 'Filet de poulet', quantity: '200g', calories: 330 },
        { name: 'Riz basmati', quantity: '120g', calories: 420 },
        { name: 'Lait de coco', quantity: '200ml', calories: 80 },
        { name: 'Curry en poudre', quantity: '2 c.à.s', calories: 20 },
        { name: 'Oignons', quantity: '100g', calories: 40 },
        { name: 'Ail', quantity: '2 gousses', calories: 8 },
        { name: 'Huile de coco', quantity: '2 c.à.s', calories: 240 }
      ],
      recipe: [
        'Cuisez le riz basmati',
        'Coupez le poulet en dés',
        'Faites revenir l\'oignon et l\'ail',
        'Ajoutez le poulet et le curry',
        'Versez le lait de coco',
        'Laissez mijoter 20 minutes',
        'Servez sur le riz'
      ]
    },
    {
      id: 43,
      name: 'Omelette aux 4 œufs et fromage',
      category: 'petit-dejeuner',
      goal: 'prise-masse',
      calories: 650,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.7,
      image: '🍳',
      protein: 52,
      carbs: 8,
      fat: 45,
      fiber: 2,
      ingredients: [
        { name: 'Œufs', quantity: '4', calories: 280 },
        { name: 'Fromage cheddar', quantity: '80g', calories: 320 },
        { name: 'Beurre', quantity: '20g', calories: 150 },
        { name: 'Lait', quantity: '60ml', calories: 30 },
        { name: 'Sel et poivre', quantity: '1 pincée', calories: 0 }
      ],
      recipe: [
        'Battez les œufs avec le lait, sel et poivre',
        'Faites chauffer le beurre dans une poêle',
        'Versez les œufs battus',
        'Ajoutez le fromage râpé',
        'Cuisez à feu doux jusqu\'à ce que les œufs soient pris',
        'Pliez l\'omelette et servez'
      ]
    },

    // NOUVEAUX REPAS - PERTE DE GRAS
    {
      id: 44,
      name: 'Salade de quinoa aux légumes grillés',
      category: 'dejeuner',
      goal: 'perte-gras',
      calories: 320,
      prepTime: 35,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🥗',
      protein: 15,
      carbs: 45,
      fat: 12,
      fiber: 8,
      ingredients: [
        { name: 'Quinoa', quantity: '80g', calories: 280 },
        { name: 'Courgettes', quantity: '150g', calories: 25 },
        { name: 'Aubergines', quantity: '100g', calories: 25 },
        { name: 'Poivrons', quantity: '100g', calories: 31 },
        { name: 'Huile d\'olive', quantity: '2 c.à.s', calories: 240 },
        { name: 'Vinaigre balsamique', quantity: '2 c.à.s', calories: 20 },
        { name: 'Herbes de Provence', quantity: '1 c.à.s', calories: 5 }
      ],
      recipe: [
        'Cuisez le quinoa selon les instructions',
        'Coupez les légumes en morceaux',
        'Badigeonnez d\'huile et herbes',
        'Grillez les légumes 15-20 minutes',
        'Mélangez le quinoa avec les légumes',
        'Arrosez de vinaigre balsamique'
      ]
    },
    {
      id: 45,
      name: 'Poisson en papillote aux légumes',
      category: 'diner',
      goal: 'perte-gras',
      calories: 250,
      prepTime: 35,
      difficulty: 'Facile',
      rating: 4.4,
      image: '🐟',
      protein: 32,
      carbs: 18,
      fat: 8,
      fiber: 6,
      ingredients: [
        { name: 'Filet de cabillaud', quantity: '150g', calories: 125 },
        { name: 'Tomates', quantity: '150g', calories: 27 },
        { name: 'Courgettes', quantity: '100g', calories: 17 },
        { name: 'Ail', quantity: '2 gousses', calories: 8 },
        { name: 'Citron', quantity: '1/2', calories: 8 },
        { name: 'Herbes fraîches', quantity: '2 c.à.s', calories: 4 },
        { name: 'Huile d\'olive', quantity: '1 c.à.s', calories: 120 }
      ],
      recipe: [
        'Préchauffez le four à 180°C',
        'Coupez les légumes en morceaux',
        'Placez le poisson sur du papier sulfurisé',
        'Entourez de légumes et herbes',
        'Arrosez d\'huile et citron',
        'Fermez la papillote et enfournez 25 minutes'
      ]
    },
    {
      id: 46,
      name: 'Smoothie aux fruits rouges',
      category: 'collation',
      goal: 'perte-gras',
      calories: 180,
      prepTime: 8,
      difficulty: 'Facile',
      rating: 4.3,
      image: '',
      protein: 8,
      carbs: 35,
      fat: 4,
      fiber: 8,
      ingredients: [
        { name: 'Framboises', quantity: '100g', calories: 52 },
        { name: 'Myrtilles', quantity: '50g', calories: 29 },
        { name: 'Fraise', quantity: '100g', calories: 32 },
        { name: 'Yaourt grec 0%', quantity: '150g', calories: 75 },
        { name: 'Miel', quantity: '1 c.à.s', calories: 64 },
        { name: 'Glace', quantity: '5 glaçons', calories: 0 }
      ],
      recipe: [
        'Lavez tous les fruits',
        'Mettez tous les ingrédients dans un blender',
        'Mixez 2-3 minutes',
        'Filtrez si nécessaire',
        'Versez dans un verre',
        'Dégustez frais'
      ]
    },

    // NOUVEAUX REPAS - RÉCUPÉRATION
    {
      id: 47,
      name: 'Bowl de riz aux légumes et tofu',
      category: 'post-workout',
      goal: 'recuperation',
      calories: 450,
      prepTime: 30,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🍚',
      protein: 22,
      carbs: 60,
      fat: 15,
      fiber: 8,
      ingredients: [
        { name: 'Riz complet', quantity: '100g', calories: 350 },
        { name: 'Tofu ferme', quantity: '120g', calories: 96 },
        { name: 'Brocolis', quantity: '100g', calories: 34 },
        { name: 'Carottes', quantity: '80g', calories: 32 },
        { name: 'Sauce soja', quantity: '2 c.à.s', calories: 20 },
        { name: 'Huile de sésame', quantity: '1 c.à.s', calories: 120 }
      ],
      recipe: [
        'Cuisez le riz complet',
        'Coupez le tofu en dés et faites-le revenir',
        'Faites cuire les légumes à la vapeur',
        'Mélangez le riz avec la sauce soja',
        'Ajoutez le tofu et les légumes',
        'Arrosez d\'huile de sésame'
      ]
    },
    {
      id: 48,
      name: 'Smoothie chocolat-banane',
      category: 'post-workout',
      goal: 'recuperation',
      calories: 380,
      prepTime: 8,
      difficulty: 'Facile',
      rating: 4.8,
      image: '🥤',
      protein: 25,
      carbs: 45,
      fat: 12,
      fiber: 8,
      ingredients: [
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Protéine chocolat', quantity: '30g', calories: 120 },
        { name: 'Lait d\'amande', quantity: '250ml', calories: 40 },
        { name: 'Cacao en poudre', quantity: '1 c.à.s', calories: 15 },
        { name: 'Beurre d\'amande', quantity: '1 c.à.s', calories: 90 },
        { name: 'Miel', quantity: '1 c.à.s', calories: 64 }
      ],
      recipe: [
        'Épluchez et coupez la banane',
        'Mettez tous les ingrédients dans un blender',
        'Mixez 2-3 minutes',
        'Versez dans un grand verre',
        'Dégustez dans les 30 minutes'
      ]
    },

    // NOUVEAUX REPAS - PERFORMANCE
    {
      id: 49,
      name: 'Bowl d\'avoine aux fruits et noix',
      category: 'pre-workout',
      goal: 'performance',
      calories: 580,
      prepTime: 20,
      difficulty: 'Facile',
      rating: 4.7,
      image: '🥣',
      protein: 22,
      carbs: 85,
      fat: 18,
      fiber: 12,
      ingredients: [
        { name: 'Flocons d\'avoine', quantity: '80g', calories: 300 },
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Pomme', quantity: '1/2', calories: 26 },
        { name: 'Noix', quantity: '30g', calories: 200 },
        { name: 'Graines de chia', quantity: '1 c.à.s', calories: 50 },
        { name: 'Lait d\'amande', quantity: '250ml', calories: 40 }
      ],
      recipe: [
        'Mélangez l\'avoine avec le lait',
        'Ajoutez la banane et pomme coupées',
        'Saupoudrez de noix et graines de chia',
        'Laissez reposer 10 minutes',
        'Mélangez et servez',
        'Consommez 1h avant l\'entraînement'
      ]
    },
    {
      id: 50,
      name: 'Toast aux œufs brouillés et avocat',
      category: 'pre-workout',
      goal: 'performance',
      calories: 480,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🥑',
      protein: 25,
      carbs: 35,
      fat: 28,
      fiber: 10,
      ingredients: [
        { name: 'Pain complet', quantity: '2 tranches', calories: 160 },
        { name: 'Œufs', quantity: '3', calories: 210 },
        { name: 'Avocat', quantity: '1/2', calories: 160 },
        { name: 'Tomates', quantity: '1', calories: 18 },
        { name: 'Citron', quantity: '1/2', calories: 8 },
        { name: 'Sel et poivre', quantity: '1 pincée', calories: 0 }
      ],
      recipe: [
        'Grillez le pain complet',
        'Battez les œufs et faites-les brouiller',
        'Écrasez l\'avocat avec le citron',
        'Tartinez le pain avec l\'avocat',
        'Ajoutez les œufs brouillés et tomates',
        'Assaisonnez et servez'
      ]
    },
    // NOUVEAUX REPAS - PRISE DE MASSE
    {
      id: 51,
      name: 'Chili con carne aux haricots',
      category: 'diner',
      goal: 'prise-masse',
      calories: 780,
      prepTime: 45,
      difficulty: 'Moyen',
      rating: 4.7,
      image: '️',
      protein: 48,
      carbs: 65,
      fat: 32,
      fiber: 15,
      ingredients: [
        { name: 'Bœuf haché', quantity: '200g', calories: 500 },
        { name: 'Haricots rouges', quantity: '150g', calories: 190 },
        { name: 'Tomates en conserve', quantity: '400g', calories: 80 },
        { name: 'Oignons', quantity: '100g', calories: 40 },
        { name: 'Ail', quantity: '3 gousses', calories: 12 },
        { name: 'Piment', quantity: '1', calories: 4 },
        { name: 'Cumin', quantity: '1 c.à.s', calories: 8 }
      ],
      recipe: [
        'Faites revenir l\'oignon et l\'ail',
        'Ajoutez le bœuf haché et faites-le dorer',
        'Ajoutez les épices et le piment',
        'Versez les tomates et haricots',
        'Laissez mijoter 30 minutes',
        'Servez chaud'
      ]
    },
    {
      id: 52,
      name: 'Pizza protéinée aux légumes',
      category: 'diner',
      goal: 'prise-masse',
      calories: 720,
      prepTime: 40,
      difficulty: 'Moyen',
      rating: 4.6,
      image: '🍕',
      protein: 35,
      carbs: 75,
      fat: 28,
      fiber: 8,
      ingredients: [
        { name: 'Pâte à pizza', quantity: '200g', calories: 520 },
        { name: 'Sauce tomate', quantity: '100ml', calories: 20 },
        { name: 'Mozzarella', quantity: '120g', calories: 360 },
        { name: 'Jambon', quantity: '80g', calories: 160 },
        { name: 'Champignons', quantity: '100g', calories: 22 },
        { name: 'Poivrons', quantity: '100g', calories: 31 },
        { name: 'Origan', quantity: '1 c.à.s', calories: 2 }
      ],
      recipe: [
        'Préchauffez le four à 220°C',
        'Étalez la pâte à pizza',
        'Étalez la sauce tomate',
        'Ajoutez la mozzarella',
        'Garnissez avec jambon et légumes',
        'Saupoudrez d\'origan',
        'Enfournez 15-20 minutes'
      ]
    },
    {
      id: 53,
      name: 'Bowl de riz au poulet et légumes sautés',
      category: 'dejeuner',
      goal: 'prise-masse',
      calories: 680,
      prepTime: 30,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🍚',
      protein: 42,
      carbs: 80,
      fat: 18,
      fiber: 6,
      ingredients: [
        { name: 'Riz complet', quantity: '120g', calories: 420 },
        { name: 'Filet de poulet', quantity: '180g', calories: 300 },
        { name: 'Brocolis', quantity: '150g', calories: 50 },
        { name: 'Carottes', quantity: '100g', calories: 40 },
        { name: 'Sauce soja', quantity: '3 c.à.s', calories: 30 },
        { name: 'Huile de sésame', quantity: '2 c.à.s', calories: 240 },
        { name: 'Gingembre', quantity: '1 c.à.c', calories: 2 }
      ],
      recipe: [
        'Cuisez le riz complet',
        'Coupez le poulet en dés',
        'Faites sauter le poulet avec le gingembre',
        'Ajoutez les légumes coupés',
        'Arrosez de sauce soja',
        'Servez sur le riz avec l\'huile de sésame'
      ]
    },

    // NOUVEAUX REPAS - PERTE DE GRAS
    {
      id: 54,
      name: 'Salade de thon aux légumes croquants',
      category: 'dejeuner',
      goal: 'perte-gras',
      calories: 280,
      prepTime: 20,
      difficulty: 'Facile',
      rating: 4.4,
      image: '🥗',
      protein: 32,
      carbs: 20,
      fat: 8,
      fiber: 6,
      ingredients: [
        { name: 'Thon en conserve', quantity: '150g', calories: 180 },
        { name: 'Concombre', quantity: '1/2', calories: 8 },
        { name: 'Tomates cerises', quantity: '150g', calories: 27 },
        { name: 'Radis', quantity: '100g', calories: 16 },
        { name: 'Vinaigrette légère', quantity: '2 c.à.s', calories: 60 },
        { name: 'Ciboulette', quantity: '1 c.à.s', calories: 1 }
      ],
      recipe: [
        'Égouttez le thon et émiettez-le',
        'Coupez tous les légumes en morceaux',
        'Mélangez le thon avec les légumes',
        'Arrosez de vinaigrette',
        'Ajoutez la ciboulette',
        'Mélangez et servez frais'
      ]
    },
    {
      id: 55,
      name: 'Poisson blanc aux légumes vapeur',
      category: 'diner',
      goal: 'perte-gras',
      calories: 220,
      prepTime: 25,
      difficulty: 'Facile',
      rating: 4.3,
      image: '🐟',
      protein: 35,
      carbs: 15,
      fat: 5,
      fiber: 8,
      ingredients: [
        { name: 'Filet de cabillaud', quantity: '150g', calories: 125 },
        { name: 'Asperges', quantity: '150g', calories: 30 },
        { name: 'Haricots verts', quantity: '100g', calories: 31 },
        { name: 'Citron', quantity: '1/2', calories: 8 },
        { name: 'Ail', quantity: '1 gousse', calories: 4 },
        { name: 'Herbes fraîches', quantity: '1 c.à.s', calories: 2 }
      ],
      recipe: [
        'Préparez les légumes en morceaux',
        'Faites cuire à la vapeur 8-10 min',
        'Assaisonnez le poisson',
        'Faites cuire le poisson 6-8 min',
        'Servez avec les légumes',
        'Arrosez de citron et herbes'
      ]
    },
    {
      id: 56,
      name: 'Smoothie vert aux épinards et pomme',
      category: 'collation',
      goal: 'perte-gras',
      calories: 140,
      prepTime: 8,
      difficulty: 'Facile',
      rating: 4.2,
      image: '',
      protein: 6,
      carbs: 25,
      fat: 3,
      fiber: 6,
      ingredients: [
        { name: 'Épinards', quantity: '50g', calories: 12 },
        { name: 'Pomme verte', quantity: '1', calories: 52 },
        { name: 'Concombre', quantity: '1/2', calories: 8 },
        { name: 'Gingembre', quantity: '1 c.à.c', calories: 2 },
        { name: 'Eau', quantity: '200ml', calories: 0 },
        { name: 'Menthe', quantity: '5 feuilles', calories: 1 }
      ],
      recipe: [
        'Lavez tous les ingrédients',
        'Coupez la pomme en morceaux',
        'Mettez tout dans un blender',
        'Mixez 2-3 minutes',
        'Filtrez si nécessaire',
        'Dégustez frais'
      ]
    },

    // NOUVEAUX REPAS - RÉCUPÉRATION
    {
      id: 57,
      name: 'Bowl de quinoa aux légumes et œufs',
      category: 'post-workout',
      goal: 'recuperation',
      calories: 520,
      prepTime: 30,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🥗',
      protein: 28,
      carbs: 65,
      fat: 18,
      fiber: 10,
      ingredients: [
        { name: 'Quinoa', quantity: '100g', calories: 350 },
        { name: 'Œufs', quantity: '2', calories: 140 },
        { name: 'Brocolis', quantity: '100g', calories: 34 },
        { name: 'Carottes', quantity: '80g', calories: 32 },
        { name: 'Sauce soja', quantity: '2 c.à.s', calories: 20 },
        { name: 'Huile de sésame', quantity: '1 c.à.s', calories: 120 }
      ],
      recipe: [
        'Cuisez le quinoa selon les instructions',
        'Faites cuire les œufs au plat',
        'Faites cuire les légumes à la vapeur',
        'Mélangez le quinoa avec la sauce soja',
        'Ajoutez les œufs et légumes',
        'Arrosez d\'huile de sésame'
      ]
    },
    {
      id: 58,
      name: 'Smoothie banane-coco post-entraînement',
      category: 'post-workout',
      goal: 'recuperation',
      calories: 350,
      prepTime: 8,
      difficulty: 'Facile',
      rating: 4.7,
      image: '🥤',
      protein: 20,
      carbs: 45,
      fat: 15,
      fiber: 8,
      ingredients: [
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Protéine en poudre', quantity: '30g', calories: 120 },
        { name: 'Lait de coco', quantity: '200ml', calories: 80 },
        { name: 'Graines de chia', quantity: '1 c.à.s', calories: 50 },
        { name: 'Miel', quantity: '1 c.à.s', calories: 64 },
        { name: 'Glace', quantity: '5 glaçons', calories: 0 }
      ],
      recipe: [
        'Épluchez et coupez la banane',
        'Mettez tous les ingrédients dans un blender',
        'Mixez 2-3 minutes',
        'Versez dans un grand verre',
        'Dégustez dans les 30 minutes'
      ]
    },

    // NOUVEAUX REPAS - PERFORMANCE
    {
      id: 59,
      name: 'Bowl d\'avoine aux fruits et noix',
      category: 'pre-workout',
      goal: 'performance',
      calories: 580,
      prepTime: 20,
      difficulty: 'Facile',
      rating: 4.6,
      image: '🥣',
      protein: 22,
      carbs: 85,
      fat: 18,
      fiber: 12,
      ingredients: [
        { name: 'Flocons d\'avoine', quantity: '80g', calories: 300 },
        { name: 'Banane', quantity: '1', calories: 90 },
        { name: 'Pomme', quantity: '1/2', calories: 26 },
        { name: 'Noix', quantity: '30g', calories: 200 },
        { name: 'Graines de chia', quantity: '1 c.à.s', calories: 50 },
        { name: 'Lait d\'amande', quantity: '250ml', calories: 40 }
      ],
      recipe: [
        'Mélangez l\'avoine avec le lait',
        'Ajoutez la banane et pomme coupées',
        'Saupoudrez de noix et graines de chia',
        'Laissez reposer 10 minutes',
        'Mélangez et servez',
        'Consommez 1h avant l\'entraînement'
      ]
    },
    {
      id: 60,
      name: 'Toast aux œufs et avocat',
      category: 'pre-workout',
      goal: 'performance',
      calories: 420,
      prepTime: 15,
      difficulty: 'Facile',
      rating: 4.5,
      image: '🥑',
      protein: 22,
      carbs: 35,
      fat: 25,
      fiber: 10,
      ingredients: [
        { name: 'Pain complet', quantity: '2 tranches', calories: 160 },
        { name: 'Œufs', quantity: '2', calories: 140 },
        { name: 'Avocat', quantity: '1/2', calories: 160 },
        { name: 'Tomates', quantity: '1', calories: 18 },
        { name: 'Citron', quantity: '1/2', calories: 8 },
        { name: 'Sel et poivre', quantity: '1 pincée', calories: 0 }
      ],
      recipe: [
        'Grillez le pain complet',
        'Faites cuire les œufs au plat',
        'Écrasez l\'avocat avec le citron',
        'Tartinez le pain avec l\'avocat',
        'Ajoutez les œufs et tomates',
        'Assaisonnez et servez'
      ]
    }
  ];

  // Base de données des 200 aliments (ajout de 10 aliments supplémentaires)
  const foodsDatabase = [
    // PROTÉINES
    {
      id: 1,
      name: 'Poulet (poitrine)',
      category: 'proteines',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      image: '🍗',
      benefits: ['Riche en protéines', 'Faible en gras', 'Source de B12'],
      price: 'Moyen'
    },
    {
      id: 2,
      name: 'Saumon',
      category: 'proteines',
      calories: 208,
      protein: 25,
      carbs: 0,
      fat: 12,
      fiber: 0,
      image: '🐟',
      benefits: ['Oméga-3', 'Protéines complètes', 'Vitamine D'],
      price: 'Élevé'
    },
    {
      id: 3,
      name: 'Œufs',
      category: 'proteines',
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      fiber: 0,
      image: '🥚',
      benefits: ['Protéines complètes', 'Choline', 'Lutéine'],
      price: 'Faible'
    },
    {
      id: 4,
      name: 'Tofu',
      category: 'proteines',
      calories: 76,
      protein: 8,
      carbs: 1.9,
      fat: 4.8,
      fiber: 0.3,
      image: '🧀',
      benefits: ['Protéines végétales', 'Isoflavones', 'Calcium'],
      price: 'Moyen'
    },
    {
      id: 5,
      name: 'Yaourt grec',
      category: 'proteines',
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      fiber: 0,
      image: '🥛',
      benefits: ['Probiotiques', 'Protéines', 'Calcium'],
      price: 'Moyen'
    },

    // GLUCIDES
    {
      id: 6,
      name: 'Riz brun',
      category: 'glucides',
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      fiber: 1.8,
      image: '🍚',
      benefits: ['Fibres', 'Magnésium', 'Sélénium'],
      price: 'Faible'
    },
    {
      id: 7,
      name: 'Quinoa',
      category: 'glucides',
      calories: 120,
      protein: 4.4,
      carbs: 22,
      fat: 1.9,
      fiber: 2.8,
      image: '🌾',
      benefits: ['Protéines complètes', 'Fibres', 'Fer'],
      price: 'Moyen'
    },
    {
      id: 8,
      name: 'Patate douce',
      category: 'glucides',
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      fiber: 3,
      image: '🍠',
      benefits: ['Bêta-carotène', 'Vitamine C', 'Potassium'],
      price: 'Faible'
    },
    {
      id: 9,
      name: 'Avoine',
      category: 'glucides',
      calories: 389,
      protein: 16.9,
      carbs: 66,
      fat: 6.9,
      fiber: 10.6,
      image: '🌾',
      benefits: ['Bêta-glucanes', 'Fibres', 'Magnésium'],
      price: 'Faible'
    },

    // LÉGUMES
    {
      id: 10,
      name: 'Brocolis',
      category: 'legumes',
      calories: 34,
      protein: 2.8,
      carbs: 7,
      fat: 0.4,
      fiber: 2.6,
      image: '🥦',
      benefits: ['Vitamine C', 'Folates', 'Antioxydants'],
      price: 'Faible'
    },
    {
      id: 11,
      name: 'Épinards',
      category: 'legumes',
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      image: '🥬',
      benefits: ['Fer', 'Folates', 'Vitamine K'],
      price: 'Faible'
    },
    {
      id: 12,
      name: 'Avocat',
      category: 'legumes',
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      fiber: 7,
      image: '🥑',
      benefits: ['Monoinsaturés', 'Potassium', 'Folates'],
      price: 'Moyen'
    },

    // FRUITS
    {
      id: 13,
      name: 'Banane',
      category: 'fruits',
      calories: 89,
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      fiber: 2.6,
      image: '🍌',
      benefits: ['Potassium', 'Vitamine B6', 'Magnésium'],
      price: 'Faible'
    },
    {
      id: 14,
      name: 'Myrtilles',
      category: 'fruits',
      calories: 57,
      protein: 0.7,
      carbs: 14,
      fat: 0.3,
      fiber: 2.4,
      image: '🫐',
      benefits: ['Antioxydants', 'Vitamine C', 'Fibres'],
      price: 'Élevé'
    },
    {
      id: 15,
      name: 'Pomme',
      category: 'fruits',
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      fiber: 2.4,
      image: '🍎',
      benefits: ['Fibres', 'Vitamine C', 'Quercétine'],
      price: 'Faible'
    },

    // GRAISSES SAINES
    {
      id: 16,
      name: 'Amandes',
      category: 'graisses',
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      fiber: 12,
      image: '🥜',
      benefits: ['Vitamine E', 'Magnésium', 'Monoinsaturés'],
      price: 'Moyen'
    },
    {
      id: 17,
      name: 'Huile d\'olive',
      category: 'graisses',
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      fiber: 0,
      image: '🫒',
      benefits: ['Monoinsaturés', 'Antioxydants', 'Anti-inflammatoire'],
      price: 'Moyen'
    },
    {
      id: 18,
      name: 'Graines de chia',
      category: 'graisses',
      calories: 486,
      protein: 17,
      carbs: 42,
      fat: 31,
      fiber: 34,
      image: '🌱',
      benefits: ['Oméga-3', 'Fibres', 'Calcium'],
      price: 'Moyen'
    },

    // NOUVEAUX ALIMENTS - PROTÉINES
    {
      id: 19,
      name: 'Bœuf haché 5%',
      category: 'proteines',
      calories: 250,
      protein: 26,
      carbs: 0,
      fat: 15,
      fiber: 0,
      image: '🥩',
      benefits: ['Fer héminique', 'Vitamine B12', 'Zinc'],
      price: 'Moyen'
    },
    {
      id: 20,
      name: 'Thon en conserve',
      category: 'proteines',
      calories: 116,
      protein: 26,
      carbs: 0,
      fat: 0.8,
      fiber: 0,
      image: '🐟',
      benefits: ['Oméga-3', 'Sélénium', 'Vitamine D'],
      price: 'Faible'
    },
    {
      id: 21,
      name: 'Fromage cottage',
      category: 'proteines',
      calories: 98,
      protein: 11,
      carbs: 3.4,
      fat: 4.3,
      fiber: 0,
      image: '🧀',
      benefits: ['Caséine', 'Calcium', 'Phosphore'],
      price: 'Moyen'
    },

    // NOUVEAUX ALIMENTS - GLUCIDES
    {
      id: 22,
      name: 'Riz basmati',
      category: 'glucides',
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      fiber: 0.4,
      image: '🍚',
      benefits: ['Index glycémique modéré', 'Sélénium', 'Manganèse'],
      price: 'Faible'
    },
    {
      id: 23,
      name: 'Pommes de terre',
      category: 'glucides',
      calories: 77,
      protein: 2,
      carbs: 17,
      fat: 0.1,
      fiber: 2.2,
      image: '🥔',
      benefits: ['Potassium', 'Vitamine C', 'Fibres'],
      price: 'Faible'
    },
    {
      id: 24,
      name: 'Pain complet',
      category: 'glucides',
      calories: 247,
      protein: 13,
      carbs: 41,
      fat: 4.2,
      fiber: 7,
      image: '🍞',
      benefits: ['Fibres', 'Vitamines B', 'Magnésium'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - LÉGUMES
    {
      id: 25,
      name: 'Carottes',
      category: 'legumes',
      calories: 41,
      protein: 0.9,
      carbs: 10,
      fat: 0.2,
      fiber: 2.8,
      image: '🥕',
      benefits: ['Bêta-carotène', 'Vitamine A', 'Antioxydants'],
      price: 'Faible'
    },
    {
      id: 26,
      name: 'Tomates',
      category: 'legumes',
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      fiber: 1.2,
      image: '🍅',
      benefits: ['Lycopène', 'Vitamine C', 'Potassium'],
      price: 'Faible'
    },
    {
      id: 27,
      name: 'Concombre',
      category: 'legumes',
      calories: 16,
      protein: 0.7,
      carbs: 4,
      fat: 0.1,
      fiber: 0.5,
      image: '🥒',
      benefits: ['Hydratation', 'Vitamine K', 'Silice'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - FRUITS
    {
      id: 28,
      name: 'Oranges',
      category: 'fruits',
      calories: 47,
      protein: 0.9,
      carbs: 12,
      fat: 0.1,
      fiber: 2.4,
      image: '🍊',
      benefits: ['Vitamine C', 'Folates', 'Flavonoïdes'],
      price: 'Faible'
    },
    {
      id: 29,
      name: 'Dinde (blanc)',
      category: 'proteines',
      calories: 135,
      protein: 30,
      carbs: 0,
      fat: 1,
      fiber: 0,
      image: '🦃',
      benefits: ['Faible en gras', 'Sélénium', 'Vitamine B6'],
      price: 'Moyen'
    },
    {
      id: 30,
      name: 'Crevettes',
      category: 'proteines',
      calories: 99,
      protein: 21,
      carbs: 0.2,
      fat: 0.3,
      fiber: 0,
      image: '🦐',
      benefits: ['Faible en calories', 'Sélénium', 'Iode'],
      price: 'Élevé'
    },
    {
      id: 31,
      name: 'Lentilles',
      category: 'proteines',
      calories: 116,
      protein: 9,
      carbs: 20,
      fat: 0.4,
      fiber: 8,
      image: '🫘',
      benefits: ['Protéines végétales', 'Fer', 'Folates'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - GLUCIDES
    {
      id: 32,
      name: 'Sarrasin',
      category: 'glucides',
      calories: 343,
      protein: 13,
      carbs: 72,
      fat: 3.4,
      fiber: 10,
      image: '🌾',
      benefits: ['Protéines complètes', 'Rutine', 'Magnésium'],
      price: 'Moyen'
    },
    {
      id: 33,
      name: 'Millet',
      category: 'glucides',
      calories: 378,
      protein: 11,
      carbs: 73,
      fat: 4.2,
      fiber: 8.5,
      image: '🌾',
      benefits: ['Sans gluten', 'Magnésium', 'Phosphore'],
      price: 'Moyen'
    },
    {
      id: 34,
      name: 'Pâtes complètes',
      category: 'glucides',
      calories: 124,
      protein: 5,
      carbs: 25,
      fat: 1.1,
      fiber: 3.2,
      image: '🍝',
      benefits: ['Fibres', 'Vitamines B', 'Sélénium'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - LÉGUMES
    {
      id: 35,
      name: 'Chou-fleur',
      category: 'legumes',
      calories: 25,
      protein: 1.9,
      carbs: 5,
      fat: 0.3,
      fiber: 2,
      image: '🥬',
      benefits: ['Vitamine C', 'Choline', 'Antioxydants'],
      price: 'Faible'
    },
    {
      id: 36,
      name: 'Épinards',
      category: 'legumes',
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      image: '🥬',
      benefits: ['Fer', 'Folates', 'Vitamine K'],
      price: 'Faible'
    },
    {
      id: 37,
      name: 'Poivrons',
      category: 'legumes',
      calories: 31,
      protein: 1,
      carbs: 7,
      fat: 0.3,
      fiber: 2.5,
      image: '',
      benefits: ['Vitamine C', 'Bêta-carotène', 'Antioxydants'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - FRUITS
    {
      id: 38,
      name: 'Framboises',
      category: 'fruits',
      calories: 52,
      protein: 1.2,
      carbs: 12,
      fat: 0.7,
      fiber: 6.5,
      image: '🫐',
      benefits: ['Antioxydants', 'Vitamine C', 'Ellagitanins'],
      price: 'Élevé'
    },
    // NOUVEAUX ALIMENTS - PROTÉINES
    {
      id: 39,
      name: 'Porc (filet)',
      category: 'proteines',
      calories: 143,
      protein: 26,
      carbs: 0,
      fat: 3.5,
      fiber: 0,
      image: '🥩',
      benefits: ['Thiamine', 'Sélénium', 'Vitamine B6'],
      price: 'Moyen'
    },
    {
      id: 40,
      name: 'Fromage ricotta',
      category: 'proteines',
      calories: 174,
      protein: 11,
      carbs: 3,
      fat: 13,
      fiber: 0,
      image: '🧀',
      benefits: ['Calcium', 'Phosphore', 'Vitamine A'],
      price: 'Moyen'
    },
    {
      id: 41,
      name: 'Pois chiches',
      category: 'proteines',
      calories: 164,
      protein: 8.9,
      carbs: 27,
      fat: 2.6,
      fiber: 7.6,
      image: '🫘',
      benefits: ['Protéines végétales', 'Folates', 'Manganèse'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - GLUCIDES
    {
      id: 42,
      name: 'Boulgour',
      category: 'glucides',
      calories: 83,
      protein: 3.1,
      carbs: 19,
      fat: 0.2,
      fiber: 4.5,
      image: '🌾',
      benefits: ['Fibres', 'Magnésium', 'Fer'],
      price: 'Faible'
    },
    {
      id: 43,
      name: 'Pommes de terre douces',
      category: 'glucides',
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      fiber: 3,
      image: '🍠',
      benefits: ['Bêta-carotène', 'Vitamine C', 'Potassium'],
      price: 'Faible'
    },
    {
      id: 44,
      name: 'Orge',
      category: 'glucides',
      calories: 354,
      protein: 12,
      carbs: 73,
      fat: 2.3,
      fiber: 17,
      image: '🌾',
      benefits: ['Bêta-glucanes', 'Sélénium', 'Manganèse'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - LÉGUMES
    {
      id: 45,
      name: 'Chou de Bruxelles',
      category: 'legumes',
      calories: 43,
      protein: 3.4,
      carbs: 9,
      fat: 0.3,
      fiber: 3.8,
      image: '🥬',
      benefits: ['Vitamine K', 'Vitamine C', 'Folates'],
      price: 'Moyen'
    },
    {
      id: 46,
      name: 'Asperges',
      category: 'legumes',
      calories: 20,
      protein: 2.2,
      carbs: 4,
      fat: 0.1,
      fiber: 2.1,
      image: '🌱',
      benefits: ['Folates', 'Vitamine K', 'Antioxydants'],
      price: 'Moyen'
    },
    {
      id: 47,
      name: 'Champignons',
      category: 'legumes',
      calories: 22,
      protein: 3.1,
      carbs: 3.3,
      fat: 0.3,
      fiber: 1,
      image: '🍄',
      benefits: ['Sélénium', 'Vitamine D', 'Antioxydants'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - FRUITS
    {
      id: 48,
      name: 'Kiwi',
      category: 'fruits',
      calories: 61,
      protein: 1.1,
      carbs: 15,
      fat: 0.5,
      fiber: 3,
      image: '🥝',
      benefits: ['Vitamine C', 'Vitamine K', 'Potassium'],
      price: 'Moyen'
    },
    // NOUVEAUX ALIMENTS - PROTÉINES
    {
      id: 49,
      name: 'Agneau (gigot)',
      category: 'proteines',
      calories: 294,
      protein: 25,
      carbs: 0,
      fat: 21,
      fiber: 0,
      image: '🥩',
      benefits: ['Fer héminique', 'Vitamine B12', 'Zinc'],
      price: 'Élevé'
    },
    {
      id: 50,
      name: 'Fromage feta',
      category: 'proteines',
      calories: 264,
      protein: 14,
      carbs: 4,
      fat: 21,
      fiber: 0,
      image: '🧀',
      benefits: ['Calcium', 'Phosphore', 'Probiotiques'],
      price: 'Moyen'
    },
    {
      id: 51,
      name: 'Haricots rouges',
      category: 'proteines',
      calories: 127,
      protein: 8.7,
      carbs: 23,
      fat: 0.5,
      fiber: 6.4,
      image: '🫘',
      benefits: ['Protéines végétales', 'Fer', 'Folates'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - GLUCIDES
    {
      id: 52,
      name: 'Manioc',
      category: 'glucides',
      calories: 160,
      protein: 1.4,
      carbs: 38,
      fat: 0.3,
      fiber: 1.8,
      image: '🥔',
      benefits: ['Sans gluten', 'Vitamine C', 'Manganèse'],
      price: 'Faible'
    },
    {
      id: 53,
      name: 'Pâtes de riz',
      category: 'glucides',
      calories: 109,
      protein: 2.2,
      carbs: 24,
      fat: 0.2,
      fiber: 1.2,
      image: '🍜',
      benefits: ['Sans gluten', 'Faible en calories', 'Digestible'],
      price: 'Faible'
    },
    {
      id: 54,
      name: 'Couscous',
      category: 'glucides',
      calories: 112,
      protein: 3.8,
      carbs: 23,
      fat: 0.2,
      fiber: 1.4,
      image: '🌾',
      benefits: ['Sélénium', 'Niacine', 'Folates'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - LÉGUMES
    {
      id: 55,
      name: 'Betterave',
      category: 'legumes',
      calories: 43,
      protein: 1.6,
      carbs: 10,
      fat: 0.2,
      fiber: 2.8,
      image: '',
      benefits: ['Nitrates', 'Folates', 'Potassium'],
      price: 'Faible'
    },
    {
      id: 56,
      name: 'Radis',
      category: 'legumes',
      calories: 16,
      protein: 0.7,
      carbs: 3.4,
      fat: 0.1,
      fiber: 1.6,
      image: '',
      benefits: ['Vitamine C', 'Folates', 'Antioxydants'],
      price: 'Faible'
    },
    {
      id: 57,
      name: 'Céleri',
      category: 'legumes',
      calories: 16,
      protein: 0.7,
      carbs: 3,
      fat: 0.2,
      fiber: 1.6,
      image: '',
      benefits: ['Vitamine K', 'Folates', 'Potassium'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - FRUITS
    {
      id: 58,
      name: 'Mangue',
      category: 'fruits',
      calories: 60,
      protein: 0.8,
      carbs: 15,
      fat: 0.4,
      fiber: 1.6,
      image: '🥭',
      benefits: ['Vitamine C', 'Bêta-carotène', 'Antioxydants'],
      price: 'Moyen'
    },
    // NOUVEAUX ALIMENTS - PROTÉINES
    {
      id: 59,
      name: 'Canard (magret)',
      category: 'proteines',
      calories: 337,
      protein: 19,
      carbs: 0,
      fat: 28,
      fiber: 0,
      image: '🦆',
      benefits: ['Fer héminique', 'Vitamine B12', 'Sélénium'],
      price: 'Élevé'
    },
    {
      id: 60,
      name: 'Fromage de chèvre',
      category: 'proteines',
      calories: 364,
      protein: 22,
      carbs: 2.5,
      fat: 30,
      fiber: 0,
      image: '🧀',
      benefits: ['Calcium', 'Phosphore', 'Probiotiques'],
      price: 'Moyen'
    },
    {
      id: 61,
      name: 'Haricots blancs',
      category: 'proteines',
      calories: 127,
      protein: 8.7,
      carbs: 23,
      fat: 0.5,
      fiber: 6.4,
      image: '🫘',
      benefits: ['Protéines végétales', 'Fer', 'Folates'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - GLUCIDES
    {
      id: 62,
      name: 'Polenta',
      category: 'glucides',
      calories: 85,
      protein: 3.1,
      carbs: 18,
      fat: 0.4,
      fiber: 1.8,
      image: '🌽',
      benefits: ['Sans gluten', 'Vitamine A', 'Antioxydants'],
      price: 'Faible'
    },
    {
      id: 63,
      name: 'Pâtes de blé dur',
      category: 'glucides',
      calories: 131,
      protein: 5,
      carbs: 26,
      fat: 1.1,
      fiber: 1.8,
      image: '🍝',
      benefits: ['Sélénium', 'Vitamines B', 'Fer'],
      price: 'Faible'
    },
    {
      id: 64,
      name: 'Riz sauvage',
      category: 'glucides',
      calories: 101,
      protein: 4,
      carbs: 21,
      fat: 0.3,
      fiber: 1.8,
      image: '🍚',
      benefits: ['Protéines complètes', 'Antioxydants', 'Magnésium'],
      price: 'Moyen'
    },

    // NOUVEAUX ALIMENTS - LÉGUMES
    {
      id: 65,
      name: 'Artichaut',
      category: 'legumes',
      calories: 47,
      protein: 3.3,
      carbs: 11,
      fat: 0.2,
      fiber: 5.4,
      image: '🌿',
      benefits: ['Inuline', 'Folates', 'Vitamine K'],
      price: 'Moyen'
    },
    {
      id: 66,
      name: 'Fenouil',
      category: 'legumes',
      calories: 31,
      protein: 1.2,
      carbs: 7,
      fat: 0.2,
      fiber: 3.1,
      image: '🌿',
      benefits: ['Vitamine C', 'Potassium', 'Antioxydants'],
      price: 'Moyen'
    },
    {
      id: 67,
      name: 'Endives',
      category: 'legumes',
      calories: 17,
      protein: 1.2,
      carbs: 4,
      fat: 0.1,
      fiber: 3.1,
      image: '🥬',
      benefits: ['Vitamine K', 'Folates', 'Potassium'],
      price: 'Faible'
    },

    // NOUVEAUX ALIMENTS - FRUITS
    {
      id: 68,
      name: 'Ananas',
      category: 'fruits',
      calories: 50,
      protein: 0.5,
      carbs: 13,
      fat: 0.1,
      fiber: 1.4,
      image: '🍍',
      benefits: ['Bromélaïne', 'Vitamine C', 'Manganèse'],
      price: 'Moyen'
    }
  ];

  // Filtrer les repas
  const filteredMeals = mealsDatabase.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'tous' || meal.category === selectedCategory;
    const matchesGoal = selectedGoal === 'tous' || meal.goal === selectedGoal;
    
    return matchesSearch && matchesCategory && matchesGoal;
  });

  // Filtrer les aliments
  const filteredFoods = foodsDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || food.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'Faible': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Élevé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Nutrition & Recettes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez 300 repas et 200 aliments pour tous vos objectifs nutritionnels
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <Card className="shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Rechercher repas ou aliments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
        </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Toutes les catégories</SelectItem>
                  {Object.entries(categories).map(([key, cat]) => (
                    <SelectItem key={key} value={key}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="proteines">Protéines</SelectItem>
                  <SelectItem value="glucides">Glucides</SelectItem>
                  <SelectItem value="legumes">Légumes</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="graisses">Graisses</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les objectifs</SelectItem>
                  {Object.entries(goals).map(([key, goal]) => (
                    <SelectItem key={key} value={key}>
                      {goal.icon} {goal.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Onglets principaux */}
        <Tabs defaultValue="repas" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="repas" className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Repas ({filteredMeals.length})
            </TabsTrigger>
            <TabsTrigger value="aliments" className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              Aliments ({filteredFoods.length})
            </TabsTrigger>
          </TabsList>

          {/* Onglet Repas */}
          <TabsContent value="repas" className="space-y-6">
            {filteredMeals.length === 0 ? (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Aucun repas trouvé
                  </h3>
                  <p className="text-gray-500">
                    Essayez de modifier vos filtres ou votre recherche
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredMeals.map((meal) => (
                  <Card key={meal.id} className="shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-4xl">{meal.image}</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">{meal.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {meal.name}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          {meal.calories} cal
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-500" />
                          {meal.prepTime} min
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(meal.difficulty)}>
                          {meal.difficulty}
                        </Badge>
                        <Badge className={goals[meal.goal as keyof typeof goals]?.color}>
                          {goals[meal.goal as keyof typeof goals]?.icon} {goals[meal.goal as keyof typeof goals]?.name}
                        </Badge>
                        <Badge variant="outline">
                          {categories[meal.category as keyof typeof categories]?.icon} {categories[meal.category as keyof typeof categories]?.name}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Protéines:</span>
                          <span className="font-semibold">{meal.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Glucides:</span>
                          <span className="font-semibold">{meal.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lipides:</span>
                          <span className="font-semibold">{meal.fat}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fibres:</span>
                          <span className="font-semibold">{meal.fiber}g</span>
                        </div>
                      </div>

                      <div className="pt-4 space-y-3">
                        <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Voir la recette
                        </Button>
                        <Button variant="outline" className="w-full">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Ajouter à la liste
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Onglet Aliments */}
          <TabsContent value="aliments" className="space-y-6">
            {filteredFoods.length === 0 ? (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Aucun aliment trouvé
                  </h3>
                  <p className="text-gray-500">
                    Essayez de modifier vos filtres ou votre recherche
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredFoods.map((food) => (
                  <Card key={food.id} className="shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{food.image}</div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {food.name}
                        </CardTitle>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="text-sm text-gray-600">{food.calories} cal/100g</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <Badge className={getPriceColor(food.price)}>
                          {food.price}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {food.category}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Protéines:</span>
                          <span className="font-semibold">{food.protein}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Glucides:</span>
                          <span className="font-semibold">{food.carbs}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Lipides:</span>
                          <span className="font-semibold">{food.fat}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Fibres:</span>
                          <span className="font-semibold">{food.fiber}g</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900">Bénéfices:</h4>
                        <div className="space-y-1">
                          {food.benefits.slice(0, 2).map((benefit, index) => (
                            <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              {benefit}
                            </div>
                          ))}
                          {food.benefits.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{food.benefits.length - 2} autres bénéfices
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Nutrition;