import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Apple, 
  Utensils, 
  Search, 
  Plus,
  Heart,
  Star,
  Filter,
  Target,
  Zap,
  Clock,
  ChefHat,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Nutrition: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('aliments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Données des aliments - AJOUT DE 10 NOUVEAUX ALIMENTS
  const aliments = [
    {
      id: '1',
      nom: 'Riz basmati',
      categorie: 'Glucides',
      ig: 'Modéré',
      calories: 130,
      proteines: 2.7,
      glucides: 28,
      lipides: 0.3,
      fibres: 1,
      micronutriments: ['Fer', 'Magnésium'],
      classe: 'Prise de masse',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍚'
    },
    {
      id: '2',
      nom: 'Poulet grillé',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 165,
      proteines: 31,
      glucides: 0,
      lipides: 3.6,
      fibres: 0,
      micronutriments: ['Fer', 'Zinc', 'B12'],
      classe: 'Prise de masse',
      tags: ['Halal'],
      emoji: '🍗'
    },
    {
      id: '3',
      nom: 'Brocoli',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 34,
      proteines: 2.8,
      glucides: 7,
      lipides: 0.4,
      fibres: 2.6,
      micronutriments: ['Vitamine C', 'K', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥦'
    },
    {
      id: '4',
      nom: 'Avocat',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 160,
      proteines: 2,
      glucides: 9,
      lipides: 15,
      fibres: 7,
      micronutriments: ['Potassium', 'Folates', 'K'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥑'
    },
    {
      id: '5',
      nom: 'Banane',
      categorie: 'Glucides',
      ig: 'Élevé',
      calories: 89,
      proteines: 1.1,
      glucides: 23,
      lipides: 0.3,
      fibres: 2.6,
      micronutriments: ['Potassium', 'B6'],
      classe: 'Boost performance',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍌'
    },
    {
      id: '6',
      nom: 'Saumon',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 208,
      proteines: 25,
      glucides: 0,
      lipides: 12,
      fibres: 0,
      micronutriments: ['Oméga-3', 'B12', 'D'],
      classe: 'Récupération',
      tags: [],
      emoji: '🐟'
    },
    {
      id: '7',
      nom: 'Œufs entiers',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 155,
      proteines: 13,
      glucides: 1.1,
      lipides: 11,
      fibres: 0,
      micronutriments: ['B12', 'Choline', 'Sélénium'],
      classe: 'Prise de masse',
      tags: [],
      emoji: '🥚'
    },
    {
      id: '8',
      nom: 'Patate douce',
      categorie: 'Glucides',
      ig: 'Modéré',
      calories: 86,
      proteines: 1.6,
      glucides: 20,
      lipides: 0.1,
      fibres: 3,
      micronutriments: ['Bêta-carotène', 'Potassium', 'Vitamine C'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍠'
    },
    {
      id: '9',
      nom: 'Amandes',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 579,
      proteines: 21,
      glucides: 22,
      lipides: 50,
      fibres: 12,
      micronutriments: ['Vitamine E', 'Magnésium', 'Manganèse'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌰'
    },
    {
      id: '10',
      nom: 'Épinards',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 23,
      proteines: 2.9,
      glucides: 3.6,
      lipides: 0.4,
      fibres: 2.2,
      micronutriments: ['Fer', 'Folates', 'Vitamine K', 'Lutéine'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥬'
    },
    {
      id: '11',
      nom: 'Thon en conserve',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 116,
      proteines: 26,
      glucides: 0,
      lipides: 0.8,
      fibres: 0,
      micronutriments: ['Sélénium', 'B12', 'Niacine'],
      classe: 'Sèche',
      tags: [],
      emoji: '🐟'
    },
    {
      id: '12',
      nom: 'Quinoa',
      categorie: 'Glucides',
      ig: 'Bas',
      calories: 120,
      proteines: 4.4,
      glucides: 22,
      lipides: 1.9,
      fibres: 2.8,
      micronutriments: ['Fer', 'Magnésium', 'Phosphore'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾'
    },
    {
      id: '13',
      nom: 'Myrtilles',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 57,
      proteines: 0.7,
      glucides: 14,
      lipides: 0.3,
      fibres: 2.4,
      micronutriments: ['Antioxydants', 'Vitamine C', 'K'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫐'
    },
    {
      id: '14',
      nom: 'Yaourt grec',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 59,
      proteines: 10,
      glucides: 3.6,
      lipides: 0.4,
      fibres: 0,
      micronutriments: ['Probiotiques', 'Calcium', 'B12'],
      classe: 'Récupération',
      tags: [],
      emoji: '🥛'
    },
    {
      id: '15',
      nom: 'Chocolat noir 85%',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 546,
      proteines: 7.8,
      glucides: 46,
      lipides: 31,
      fibres: 11,
      micronutriments: ['Magnésium', 'Fer', 'Antioxydants'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan'],
      emoji: '🍫'
    },
    {
      id: '16',
      nom: 'Graines de chia',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 486,
      proteines: 17,
      glucides: 42,
      lipides: 31,
      fibres: 34,
      micronutriments: ['Oméga-3', 'Calcium', 'Magnésium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌱'
    },
    {
      id: '17',
      nom: 'Flocons d\'avoine',
      categorie: 'Glucides',
      ig: 'Modéré',
      calories: 389,
      proteines: 17,
      glucides: 66,
      lipides: 7,
      fibres: 11,
      micronutriments: ['Magnésium', 'Zinc', 'Fer', 'B1'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾'
    },
    {
      id: '18',
      nom: 'Fromage blanc',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 72,
      proteines: 12,
      glucides: 4,
      lipides: 0.2,
      fibres: 0,
      micronutriments: ['Calcium', 'B12', 'Phosphore'],
      classe: 'Sèche',
      tags: [],
      emoji: '🧀'
    },
    {
      id: '19',
      nom: 'Lentilles',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 116,
      proteines: 9,
      glucides: 20,
      lipides: 0.4,
      fibres: 8,
      micronutriments: ['Fer', 'Folates', 'Magnésium'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫘'
    },
    {
      id: '20',
      nom: 'Pomme',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 52,
      proteines: 0.3,
      glucides: 14,
      lipides: 0.2,
      fibres: 2.4,
      micronutriments: ['Vitamine C', 'K', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍎'
    },
    {
      id: '21',
      nom: 'Noix de cajou',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 553,
      proteines: 18,
      glucides: 30,
      lipides: 44,
      fibres: 3,
      micronutriments: ['Magnésium', 'Zinc', 'Cuivre'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜'
    },
    {
      id: '22',
      nom: 'Poivron rouge',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 31,
      proteines: 1,
      glucides: 7,
      lipides: 0.3,
      fibres: 2.5,
      micronutriments: ['Vitamine C', 'A', 'B6'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫑'
    },
    {
      id: '23',
      nom: 'Crevettes',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 99,
      proteines: 24,
      glucides: 0,
      lipides: 0.3,
      fibres: 0,
      micronutriments: ['Sélénium', 'Iode', 'B12'],
      classe: 'Sèche',
      tags: [],
      emoji: '🦐'
    },
    {
      id: '24',
      nom: 'Mangue',
      categorie: 'Glucides',
      ig: 'Modéré',
      calories: 60,
      proteines: 0.8,
      glucides: 15,
      lipides: 0.4,
      fibres: 1.6,
      micronutriments: ['Vitamine C', 'A', 'Folates'],
      classe: 'Boost performance',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥭'
    },
    {
      id: '25',
      nom: 'Huile de coco',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 862,
      proteines: 0,
      glucides: 0,
      lipides: 100,
      fibres: 0,
      micronutriments: ['Acides gras saturés'],
      classe: 'Boost performance',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥥'
    },
    {
      id: '26',
      nom: 'Chou kale',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 49,
      proteines: 4.3,
      glucides: 9,
      lipides: 0.9,
      fibres: 3.6,
      micronutriments: ['Vitamine K', 'C', 'A', 'Calcium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥬'
    },
    {
      id: '27',
      nom: 'Haricots verts',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 31,
      proteines: 1.8,
      glucides: 7,
      lipides: 0.1,
      fibres: 2.7,
      micronutriments: ['Vitamine K', 'C', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫛'
    },
    {
      id: '28',
      nom: 'Noix de Grenoble',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 654,
      proteines: 15,
      glucides: 14,
      lipides: 65,
      fibres: 6.7,
      micronutriments: ['Oméga-3', 'Vitamine E', 'Magnésium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌰'
    },
    {
      id: '29',
      nom: 'Dinde',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 189,
      proteines: 29,
      glucides: 0,
      lipides: 7,
      fibres: 0,
      micronutriments: ['Sélénium', 'B3', 'B6'],
      classe: 'Sèche',
      tags: ['Halal'],
      emoji: '🦃'
    },
    {
      id: '30',
      nom: 'Pomme de terre',
      categorie: 'Glucides',
      ig: 'Modéré',
      calories: 77,
      proteines: 2,
      glucides: 17,
      lipides: 0.1,
      fibres: 2.2,
      micronutriments: ['Potassium', 'Vitamine C', 'B6'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥔'
    },
    {
      id: '31',
      nom: 'Kiwi',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 41,
      proteines: 0.8,
      glucides: 10,
      lipides: 0.4,
      fibres: 2.1,
      micronutriments: ['Vitamine C', 'K', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥝'
    },
    {
      id: '32',
      nom: 'Café',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 2,
      proteines: 0.3,
      glucides: 0,
      lipides: 0,
      fibres: 0,
      micronutriments: ['Caféine', 'Antioxydants'],
      classe: 'Boost performance',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '☕'
    },
    {
      id: '33',
      nom: 'Thé vert',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 1,
      proteines: 0.2,
      glucides: 0,
      lipides: 0,
      fibres: 0,
      micronutriments: ['Catéchines', 'L-théanine', 'Antioxydants'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍵'
    },
    {
      id: '34',
      nom: 'Miel',
      categorie: 'Glucides',
      ig: 'Élevé',
      calories: 304,
      proteines: 0.3,
      glucides: 82,
      lipides: 0,
      fibres: 0.2,
      micronutriments: ['Antioxydants', 'Enzymes'],
      classe: 'Boost performance',
      tags: ['Vegan'],
      emoji: '🍯'
    },
    {
      id: '35',
      nom: 'Gingembre',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 80,
      proteines: 1.8,
      glucides: 18,
      lipides: 0.8,
      fibres: 2,
      micronutriments: ['Gingérol', 'Antioxydants'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫚'
    },
    {
      id: '36',
      nom: 'Ail',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 149,
      proteines: 6.4,
      glucides: 33,
      lipides: 0.5,
      fibres: 2.1,
      micronutriments: ['Allicine', 'Sélénium', 'Vitamine C'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🧄'
    },
    {
      id: '37',
      nom: 'Céleri',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 16,
      proteines: 0.7,
      glucides: 3,
      lipides: 0.2,
      fibres: 1.6,
      micronutriments: ['Vitamine K', 'Potassium', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥬'
    },
    {
      id: '38',
      nom: 'Pistaches',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 560,
      proteines: 20,
      glucides: 28,
      lipides: 45,
      fibres: 10,
      micronutriments: ['Vitamine B6', 'Thiamine', 'Phosphore'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜'
    },
    {
      id: '39',
      nom: 'Cabillaud',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 82,
      proteines: 18,
      glucides: 0,
      lipides: 0.7,
      fibres: 0,
      micronutriments: ['Sélénium', 'B12', 'Phosphore'],
      classe: 'Sèche',
      tags: [],
      emoji: '🐟'
    },
    {
      id: '40',
      nom: 'Pâtes complètes',
      categorie: 'Glucides',
      ig: 'Modéré',
      calories: 124,
      proteines: 5,
      glucides: 25,
      lipides: 1.1,
      fibres: 3.2,
      micronutriments: ['Fer', 'Magnésium', 'B1'],
      classe: 'Récupération',
      tags: ['Vegan'],
      emoji: '🍝'
    },
    {
      id: '41',
      nom: 'Framboises',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 52,
      proteines: 1.2,
      glucides: 12,
      lipides: 0.7,
      fibres: 6.5,
      micronutriments: ['Vitamine C', 'Manganèse', 'Antioxydants'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫐'
    },
    {
      id: '42',
      nom: 'Cumin',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 375,
      proteines: 18,
      glucides: 44,
      lipides: 22,
      fibres: 11,
      micronutriments: ['Fer', 'Magnésium', 'Calcium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌿'
    },
    {
      id: '43',
      nom: 'Tofu',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 76,
      proteines: 8,
      glucides: 1.9,
      lipides: 4.8,
      fibres: 0.3,
      micronutriments: ['Calcium', 'Fer', 'Isoflavones'],
      classe: 'Équilibre',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🧀'
    },
    {
      id: '44',
      nom: 'Oranges',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 47,
      proteines: 0.9,
      glucides: 12,
      lipides: 0.1,
      fibres: 2.4,
      micronutriments: ['Vitamine C', 'Folates', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍊'
    },
    {
      id: '45',
      nom: 'Curcuma',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 354,
      proteines: 8,
      glucides: 65,
      lipides: 10,
      fibres: 21,
      micronutriments: ['Curcumine', 'Fer', 'Manganèse'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🟡'
    },
    {
      id: '46',
      nom: 'Lait de coco',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 230,
      proteines: 2.3,
      glucides: 6,
      lipides: 24,
      fibres: 2.2,
      micronutriments: ['Manganèse', 'Cuivre', 'Sélénium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥥'
    }
  ];

  // Données des repas - AJOUT DE 10 NOUVEAUX REPAS
  const repas = [
    {
      id: '1',
      nom: 'Bowl Poulet Riz Légumes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Poulet grillé', quantite: '150g' },
        { nom: 'Riz basmati', quantite: '200g' },
        { nom: 'Brocolis vapeur', quantite: '100g' },
        { nom: 'Huile d\'olive', quantite: '10g' }
      ],
      calories: 550,
      proteines: 42,
      glucides: 60,
      lipides: 15,
      objectif: 'Prise de masse',
      etapes: [
        'Cuire le riz basmati',
        'Griller le poulet avec épices',
        'Cuire les brocolis à la vapeur',
        'Assaisonner avec huile d\'olive'
      ],
      emoji: '🍲'
    },
    {
      id: '2',
      nom: 'Smoothie Protéiné',
      categorie: 'Post-training',
      ingredients: [
        { nom: 'Banane', quantite: '1 unité' },
        { nom: 'Protéine en poudre', quantite: '30g' },
        { nom: 'Lait d\'amande', quantite: '250ml' },
        { nom: 'Graines de chia', quantite: '10g' }
      ],
      calories: 320,
      proteines: 35,
      glucides: 35,
      lipides: 8,
      objectif: 'Récupération',
      etapes: [
        'Mixer tous les ingrédients',
        'Ajouter des glaçons',
        'Servir immédiatement'
      ],
      emoji: '🥤'
    },
    {
      id: '3',
      nom: 'Salade de Saumon',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Saumon grillé', quantite: '150g' },
        { nom: 'Avocat', quantite: '1/2 unité' },
        { nom: 'Salade verte', quantite: '100g' },
        { nom: 'Tomates cerises', quantite: '50g' }
      ],
      calories: 380,
      proteines: 28,
      glucides: 15,
      lipides: 25,
      objectif: 'Sèche',
      etapes: [
        'Griller le saumon',
        'Préparer la salade verte',
        'Ajouter avocat et tomates',
        'Arroser de vinaigrette légère'
      ],
      emoji: '🥗'
    },
    {
      id: '4',
      nom: 'Omelette aux épinards',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Œufs entiers', quantite: '3 unités' },
        { nom: 'Épinards frais', quantite: '50g' },
        { nom: 'Fromage râpé', quantite: '20g' },
        { nom: 'Huile d\'olive', quantite: '5g' }
      ],
      calories: 320,
      proteines: 25,
      glucides: 8,
      lipides: 22,
      objectif: 'Prise de masse',
      etapes: [
        'Battre les œufs avec sel et poivre',
        'Faire revenir les épinards dans l\'huile',
        'Verser les œufs battus',
        'Ajouter le fromage râpé',
        'Plier l\'omelette en deux'
      ],
      emoji: '🍳'
    },
    {
      id: '5',
      nom: 'Bowl de quinoa aux légumes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Quinoa', quantite: '150g' },
        { nom: 'Brocolis', quantite: '100g' },
        { nom: 'Carottes', quantite: '80g' },
        { nom: 'Avocat', quantite: '1/2 unité' },
        { nom: 'Graines de chia', quantite: '10g' }
      ],
      calories: 420,
      proteines: 18,
      glucides: 65,
      lipides: 12,
      objectif: 'Équilibre',
      etapes: [
        'Cuire le quinoa dans de l\'eau salée',
        'Cuire les brocolis et carottes à la vapeur',
        'Couper l\'avocat en dés',
        'Mélanger tous les ingrédients',
        'Saupoudrer de graines de chia'
      ],
      emoji: '🥗'
    },
    {
      id: '6',
      nom: 'Smoothie protéiné aux myrtilles',
      categorie: 'Post-training',
      ingredients: [
        { nom: 'Myrtilles', quantite: '100g' },
        { nom: 'Yaourt grec', quantite: '200g' },
        { nom: 'Protéine vanille', quantite: '30g' },
        { nom: 'Amandes', quantite: '15g' },
        { nom: 'Lait d\'amande', quantite: '200ml' }
      ],
      calories: 380,
      proteines: 42,
      glucides: 28,
      lipides: 12,
      objectif: 'Récupération',
      etapes: [
        'Mixer les myrtilles avec le lait',
        'Ajouter le yaourt grec',
        'Incorporer la protéine en poudre',
        'Mixer jusqu\'à obtenir une texture lisse',
        'Saupoudrer d\'amandes concassées'
      ],
      emoji: '🥤'
    },
    {
      id: '7',
      nom: 'Salade de thon aux légumes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Thon en conserve', quantite: '150g' },
        { nom: 'Tomates cerises', quantite: '100g' },
        { nom: 'Concombre', quantite: '80g' },
        { nom: 'Épinards', quantite: '50g' },
        { nom: 'Vinaigrette légère', quantite: '15g' }
      ],
      calories: 280,
      proteines: 35,
      glucides: 12,
      lipides: 8,
      objectif: 'Sèche',
      etapes: [
        'Égoutter le thon en conserve',
        'Couper les tomates en deux',
        'Émincer le concombre',
        'Mélanger tous les légumes',
        'Arroser de vinaigrette légère'
      ],
      emoji: '🥗'
    },
    {
      id: '8',
      nom: 'Patates douces rôties au poulet',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Patates douces', quantite: '200g' },
        { nom: 'Poulet', quantite: '150g' },
        { nom: 'Brocolis', quantite: '100g' },
        { nom: 'Huile d\'olive', quantite: '10g' },
        { nom: 'Herbes de Provence', quantite: '5g' }
      ],
      calories: 480,
      proteines: 38,
      glucides: 45,
      lipides: 16,
      objectif: 'Prise de masse',
      etapes: [
        'Préchauffer le four à 200°C',
        'Couper les patates douces en dés',
        'Assaisonner le poulet avec les herbes',
        'Enfourner 25 minutes',
        'Ajouter les brocolis les 10 dernières minutes'
      ],
      emoji: '🍗'
    },
    {
      id: '9',
      nom: 'Pancakes protéinés',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Œufs', quantite: '2 unités' },
        { nom: 'Protéine vanille', quantite: '30g' },
        { nom: 'Banane', quantite: '1 unité' },
        { nom: 'Yaourt grec', quantite: '100g' },
        { nom: 'Graines de chia', quantite: '10g' }
      ],
      calories: 450,
      proteines: 35,
      glucides: 35,
      lipides: 18,
      objectif: 'Prise de masse',
      etapes: [
        'Écraser la banane',
        'Mélanger avec les œufs et yaourt',
        'Ajouter la protéine en poudre',
        'Incorporer les graines de chia',
        'Cuire à la poêle 3-4 min par côté'
      ],
      emoji: '🥞'
    },
    {
      id: '10',
      nom: 'Bowl d\'énergie pré-entraînement',
      categorie: 'Pre-workout',
      ingredients: [
        { nom: 'Banane', quantite: '1 unité' },
        { nom: 'Myrtilles', quantite: '50g' },
        { nom: 'Amandes', quantite: '20g' },
        { nom: 'Chocolat noir 85%', quantite: '15g' },
        { nom: 'Lait d\'amande', quantite: '100ml' }
      ],
      calories: 320,
      proteines: 8,
      glucides: 45,
      lipides: 14,
      objectif: 'Boost performance',
      etapes: [
        'Couper la banane en rondelles',
        'Mélanger avec les myrtilles',
        'Ajouter les amandes concassées',
        'Râper le chocolat noir',
        'Arroser de lait d\'amande'
      ],
      emoji: '⚡'
    },
    {
      id: '11',
      nom: 'Wrap protéiné aux légumes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Tortilla complète', quantite: '1 unité' },
        { nom: 'Poulet grillé', quantite: '120g' },
        { nom: 'Avocat', quantite: '1/2 unité' },
        { nom: 'Épinards', quantite: '30g' },
        { nom: 'Tomates', quantite: '50g' }
      ],
      calories: 380,
      proteines: 28,
      glucides: 35,
      lipides: 18,
      objectif: 'Équilibre',
      etapes: [
        'Chauffer la tortilla',
        'Étaler l\'avocat écrasé',
        'Ajouter le poulet en lamelles',
        'Garnir avec épinards et tomates',
        'Rouler et couper en deux'
      ],
      emoji: '🌯'
    },
    {
      id: '12',
      nom: 'Soupe de légumes minceur',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Brocolis', quantite: '150g' },
        { nom: 'Épinards', quantite: '100g' },
        { nom: 'Carottes', quantite: '100g' },
        { nom: 'Tomates', quantite: '100g' },
        { nom: 'Bouillon de légumes', quantite: '300ml' }
      ],
      calories: 120,
      proteines: 8,
      glucides: 20,
      lipides: 2,
      objectif: 'Sèche',
      etapes: [
        'Couper tous les légumes en dés',
        'Faire revenir dans une casserole',
        'Ajouter le bouillon de légumes',
        'Laisser mijoter 20 minutes',
        'Mixer jusqu\'à obtenir une texture lisse'
      ],
      emoji: '🍲'
    },
    {
      id: '13',
      nom: 'Energy balls aux amandes',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Amandes', quantite: '50g' },
        { nom: 'Dattes', quantite: '80g' },
        { nom: 'Graines de chia', quantite: '15g' },
        { nom: 'Chocolat noir 85%', quantite: '20g' },
        { nom: 'Cacao en poudre', quantite: '10g' }
      ],
      calories: 280,
      proteines: 8,
      glucides: 35,
      lipides: 14,
      objectif: 'Performance',
      etapes: [
        'Mixer les amandes et dattes',
        'Ajouter les graines de chia',
        'Incorporer le chocolat râpé',
        'Former des boules avec les mains',
        'Rouler dans le cacao en poudre'
      ],
      emoji: '🥧'
    },
    {
      id: '14',
      nom: 'Porridge protéiné',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Flocons d\'avoine', quantite: '50g' },
        { nom: 'Protéine vanille', quantite: '25g' },
        { nom: 'Banane', quantite: '1/2 unité' },
        { nom: 'Amandes', quantite: '10g' },
        { nom: 'Lait d\'amande', quantite: '200ml' }
      ],
      calories: 380,
      proteines: 32,
      glucides: 45,
      lipides: 12,
      objectif: 'Prise de masse',
      etapes: [
        'Faire chauffer le lait d\'amande',
        'Ajouter les flocons d\'avoine',
        'Cuire 5 minutes en remuant',
        'Incorporer la protéine en poudre',
        'Garnir de banane et amandes'
      ],
      emoji: '🥣'
    },
    {
      id: '15',
      nom: 'Salade de lentilles',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Lentilles', quantite: '150g' },
        { nom: 'Tomates', quantite: '100g' },
        { nom: 'Concombre', quantite: '80g' },
        { nom: 'Poivron rouge', quantite: '50g' },
        { nom: 'Vinaigrette', quantite: '15g' }
      ],
      calories: 320,
      proteines: 18,
      glucides: 55,
      lipides: 6,
      objectif: 'Équilibre',
      etapes: [
        'Cuire les lentilles dans l\'eau salée',
        'Couper tous les légumes en dés',
        'Mélanger les lentilles refroidies',
        'Ajouter les légumes',
        'Arroser de vinaigrette'
      ],
      emoji: '🥗'
    },
    {
      id: '16',
      nom: 'Fromage blanc aux fruits',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Fromage blanc', quantite: '200g' },
        { nom: 'Pomme', quantite: '1 unité' },
        { nom: 'Mangue', quantite: '50g' },
        { nom: 'Noix de cajou', quantite: '15g' },
        { nom: 'Miel', quantite: '10g' }
      ],
      calories: 280,
      proteines: 25,
      glucides: 35,
      lipides: 8,
      objectif: 'Récupération',
      etapes: [
        'Couper la pomme et la mangue en dés',
        'Mélanger avec le fromage blanc',
        'Ajouter le miel',
        'Saupoudrer de noix de cajou',
        'Servir frais'
      ],
      emoji: '🍯'
    },
    {
      id: '17',
      nom: 'Crevettes aux légumes sautés',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Crevettes', quantite: '150g' },
        { nom: 'Brocolis', quantite: '100g' },
        { nom: 'Poivron rouge', quantite: '80g' },
        { nom: 'Chou kale', quantite: '50g' },
        { nom: 'Huile de coco', quantite: '10g' }
      ],
      calories: 280,
      proteines: 35,
      glucides: 15,
      lipides: 12,
      objectif: 'Sèche',
      etapes: [
        'Décortiquer les crevettes',
        'Couper les légumes en morceaux',
        'Faire chauffer l\'huile de coco',
        'Sauter les crevettes 3 minutes',
        'Ajouter les légumes et cuire 5 min'
      ],
      emoji: '🍤'
    },
    {
      id: '18',
      nom: 'Smoothie tropical',
      categorie: 'Post-training',
      ingredients: [
        { nom: 'Mangue', quantite: '100g' },
        { nom: 'Banane', quantite: '1 unité' },
        { nom: 'Yaourt grec', quantite: '150g' },
        { nom: 'Lait de coco', quantite: '100ml' },
        { nom: 'Graines de chia', quantite: '10g' }
      ],
      calories: 350,
      proteines: 18,
      glucides: 55,
      lipides: 12,
      objectif: 'Récupération',
      etapes: [
        'Couper la mangue et banane',
        'Ajouter tous les ingrédients',
        'Mixer jusqu\'à texture lisse',
        'Ajouter des glaçons',
        'Servir immédiatement'
      ],
      emoji: '🥤'
    },
    {
      id: '19',
      nom: 'Bowl de légumes rôtis',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Patates douces', quantite: '150g' },
        { nom: 'Brocolis', quantite: '100g' },
        { nom: 'Poivron rouge', quantite: '80g' },
        { nom: 'Chou kale', quantite: '50g' },
        { nom: 'Huile d\'olive', quantite: '15g' }
      ],
      calories: 320,
      proteines: 12,
      glucides: 55,
      lipides: 10,
      objectif: 'Équilibre',
      etapes: [
        'Préchauffer le four à 200°C',
        'Couper tous les légumes',
        'Mélanger avec l\'huile d\'olive',
        'Enfourner 25 minutes',
        'Servir chaud'
      ],
      emoji: '🥗'
    },
    {
      id: '20',
      nom: 'Omelette aux légumes',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Œufs', quantite: '3 unités' },
        { nom: 'Poivron rouge', quantite: '50g' },
        { nom: 'Chou kale', quantite: '30g' },
        { nom: 'Fromage râpé', quantite: '20g' },
        { nom: 'Huile d\'olive', quantite: '5g' }
      ],
      calories: 380,
      proteines: 28,
      glucides: 12,
      lipides: 26,
      objectif: 'Prise de masse',
      etapes: [
        'Couper les légumes finement',
        'Battre les œufs',
        'Faire revenir les légumes',
        'Verser les œufs battus',
        'Ajouter le fromage et plier'
      ],
      emoji: '🍳'
    },
    {
      id: '21',
      nom: 'Salade de fruits énergétique',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Pomme', quantite: '1 unité' },
        { nom: 'Mangue', quantite: '80g' },
        { nom: 'Banane', quantite: '1/2 unité' },
        { nom: 'Myrtilles', quantite: '50g' },
        { nom: 'Noix de cajou', quantite: '15g' }
      ],
      calories: 220,
      proteines: 4,
      glucides: 45,
      lipides: 6,
      objectif: 'Performance',
      etapes: [
        'Couper tous les fruits en dés',
        'Mélanger dans un bol',
        'Ajouter les myrtilles',
        'Saupoudrer de noix de cajou',
        'Servir frais'
      ],
      emoji: '🍓'
    },
    {
      id: '22',
      nom: 'Curry de lentilles',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Lentilles', quantite: '200g' },
        { nom: 'Tomates', quantite: '150g' },
        { nom: 'Oignons', quantite: '50g' },
        { nom: 'Épices curry', quantite: '10g' },
        { nom: 'Huile de coco', quantite: '10g' }
      ],
      calories: 420,
      proteines: 25,
      glucides: 70,
      lipides: 8,
      objectif: 'Équilibre',
      etapes: [
        'Faire revenir les oignons',
        'Ajouter les épices curry',
        'Incorporer les tomates',
        'Ajouter les lentilles et eau',
        'Laisser mijoter 30 minutes'
      ],
      emoji: '🍛'
    },
    {
      id: '23',
      nom: 'Granola maison',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Flocons d\'avoine', quantite: '100g' },
        { nom: 'Amandes', quantite: '30g' },
        { nom: 'Noix de cajou', quantite: '20g' },
        { nom: 'Graines de chia', quantite: '15g' },
        { nom: 'Huile de coco', quantite: '20g' }
      ],
      calories: 580,
      proteines: 18,
      glucides: 65,
      lipides: 28,
      objectif: 'Performance',
      etapes: [
        'Mélanger tous les ingrédients',
        'Ajouter l\'huile de coco fondue',
        'Étaler sur une plaque',
        'Enfourner 20 min à 180°C',
        'Laisser refroidir avant de servir'
      ],
      emoji: '🥣'
    },
    {
      id: '24',
      nom: 'Haricots verts vapeur au saumon',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Saumon', quantite: '150g' },
        { nom: 'Haricots verts', quantite: '200g' },
        { nom: 'Pomme de terre', quantite: '150g' },
        { nom: 'Ail', quantite: '2 gousses' },
        { nom: 'Huile d\'olive', quantite: '10g' }
      ],
      calories: 450,
      proteines: 35,
      glucides: 35,
      lipides: 20,
      objectif: 'Récupération',
      etapes: [
        'Cuire les pommes de terre à l\'eau',
        'Cuire les haricots verts à la vapeur',
        'Griller le saumon avec l\'ail',
        'Assaisonner avec huile d\'olive',
        'Servir chaud'
      ],
      emoji: '🐟'
    },
    {
      id: '25',
      nom: 'Salade de dinde aux noix',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Dinde', quantite: '120g' },
        { nom: 'Salade verte', quantite: '100g' },
        { nom: 'Noix de Grenoble', quantite: '20g' },
        { nom: 'Kiwi', quantite: '1 unité' },
        { nom: 'Vinaigrette', quantite: '15g' }
      ],
      calories: 320,
      proteines: 28,
      glucides: 15,
      lipides: 18,
      objectif: 'Sèche',
      etapes: [
        'Griller la dinde et la découper',
        'Préparer la salade verte',
        'Couper le kiwi en rondelles',
        'Mélanger tous les ingrédients',
        'Arroser de vinaigrette'
      ],
      emoji: '🥗'
    },
    {
      id: '26',
      nom: 'Smoothie vert détox',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Épinards', quantite: '50g' },
        { nom: 'Kiwi', quantite: '1 unité' },
        { nom: 'Gingembre', quantite: '5g' },
        { nom: 'Miel', quantite: '10g' },
        { nom: 'Eau de coco', quantite: '200ml' }
      ],
      calories: 120,
      proteines: 3,
      glucides: 25,
      lipides: 2,
      objectif: 'Anti-inflammatoire',
      etapes: [
        'Laver les épinards',
        'Éplucher et couper le kiwi',
        'Râper le gingembre',
        'Mixer tous les ingrédients',
        'Filtrer et servir frais'
      ],
      emoji: '🥤'
    },
    {
      id: '27',
      nom: 'Curry de légumes aux épices',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Pommes de terre', quantite: '200g' },
        { nom: 'Haricots verts', quantite: '150g' },
        { nom: 'Tomates', quantite: '100g' },
        { nom: 'Ail', quantite: '3 gousses' },
        { nom: 'Épices curry', quantite: '15g' }
      ],
      calories: 280,
      proteines: 8,
      glucides: 55,
      lipides: 4,
      objectif: 'Équilibre',
      etapes: [
        'Couper les légumes en morceaux',
        'Faire revenir l\'ail et les épices',
        'Ajouter les légumes',
        'Laisser mijoter 25 minutes',
        'Servir avec du riz'
      ],
      emoji: '🍛'
    },
    {
      id: '28',
      nom: 'Toast à l\'avocat et œuf',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Pain complet', quantite: '2 tranches' },
        { nom: 'Avocat', quantite: '1/2 unité' },
        { nom: 'Œuf', quantite: '1 unité' },
        { nom: 'Gingembre', quantite: '3g' },
        { nom: 'Huile d\'olive', quantite: '5g' }
      ],
      calories: 380,
      proteines: 18,
      glucides: 35,
      lipides: 22,
      objectif: 'Performance',
      etapes: [
        'Griller le pain complet',
        'Écraser l\'avocat avec le gingembre',
        'Cuire l\'œuf au plat',
        'Étaler l\'avocat sur le pain',
        'Ajouter l\'œuf et servir'
      ],
      emoji: '🥑'
    },
    {
      id: '29',
      nom: 'Thé vert aux fruits',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Thé vert', quantite: '250ml' },
        { nom: 'Kiwi', quantite: '1 unité' },
        { nom: 'Miel', quantite: '5g' },
        { nom: 'Gingembre', quantite: '2g' },
        { nom: 'Citron', quantite: '1/2 unité' }
      ],
      calories: 80,
      proteines: 1,
      glucides: 18,
      lipides: 0.5,
      objectif: 'Anti-inflammatoire',
      etapes: [
        'Infuser le thé vert 3 minutes',
        'Couper le kiwi en dés',
        'Ajouter le gingembre râpé',
        'Mélanger avec le miel',
        'Ajouter le citron et servir'
      ],
      emoji: '🍵'
    },
    {
      id: '30',
      nom: 'Bowl de légumes rôtis aux herbes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Pommes de terre', quantite: '200g' },
        { nom: 'Haricots verts', quantite: '100g' },
        { nom: 'Ail', quantite: '4 gousses' },
        { nom: 'Herbes de Provence', quantite: '10g' },
        { nom: 'Huile d\'olive', quantite: '15g' }
      ],
      calories: 350,
      proteines: 8,
      glucides: 55,
      lipides: 12,
      objectif: 'Équilibre',
      etapes: [
        'Préchauffer le four à 200°C',
        'Couper les légumes en morceaux',
        'Mélanger avec l\'ail et les herbes',
        'Arroser d\'huile d\'olive',
        'Enfourner 30 minutes'
      ],
      emoji: '🥗'
    },
    {
      id: '31',
      nom: 'Café protéiné',
      categorie: 'Pre-workout',
      ingredients: [
        { nom: 'Café', quantite: '200ml' },
        { nom: 'Protéine vanille', quantite: '20g' },
        { nom: 'Miel', quantite: '10g' },
        { nom: 'Lait d\'amande', quantite: '50ml' },
        { nom: 'Cannelle', quantite: '2g' }
      ],
      calories: 150,
      proteines: 18,
      glucides: 15,
      lipides: 2,
      objectif: 'Boost performance',
      etapes: [
        'Préparer le café',
        'Ajouter la protéine en poudre',
        'Mélanger avec le miel',
        'Ajouter le lait d\'amande',
        'Saupoudrer de cannelle'
      ],
      emoji: '☕'
    },
    {
      id: '32',
      nom: 'Salade de fruits aux noix',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Kiwi', quantite: '2 unités' },
        { nom: 'Pomme', quantite: '1 unité' },
        { nom: 'Noix de Grenoble', quantite: '25g' },
        { nom: 'Miel', quantite: '8g' },
        { nom: 'Gingembre', quantite: '3g' }
      ],
      calories: 280,
      proteines: 6,
      glucides: 45,
      lipides: 12,
      objectif: 'Performance',
      etapes: [
        'Couper tous les fruits en dés',
        'Concasser les noix',
        'Mélanger avec le miel',
        'Ajouter le gingembre râpé',
        'Servir frais'
      ],
      emoji: '🍓'
    },
    {
      id: '33',
      nom: 'Dinde aux légumes vapeur',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Dinde', quantite: '150g' },
        { nom: 'Haricots verts', quantite: '100g' },
        { nom: 'Pommes de terre', quantite: '150g' },
        { nom: 'Ail', quantite: '2 gousses' },
        { nom: 'Herbes', quantite: '5g' }
      ],
      calories: 380,
      proteines: 35,
      glucides: 35,
      lipides: 12,
      objectif: 'Sèche',
      etapes: [
        'Assaisonner la dinde avec l\'ail',
        'Cuire les légumes à la vapeur',
        'Griller la dinde 8-10 minutes',
        'Ajouter les herbes fraîches',
        'Servir chaud'
      ],
      emoji: '🦃'
    },
    {
      id: '34',
      nom: 'Soupe de céleri détox',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Céleri', quantite: '200g' },
        { nom: 'Pommes de terre', quantite: '100g' },
        { nom: 'Oignons', quantite: '50g' },
        { nom: 'Ail', quantite: '2 gousses' },
        { nom: 'Bouillon de légumes', quantite: '300ml' }
      ],
      calories: 180,
      proteines: 6,
      glucides: 35,
      lipides: 2,
      objectif: 'Sèche',
      etapes: [
        'Couper tous les légumes en dés',
        'Faire revenir l\'oignon et l\'ail',
        'Ajouter les légumes et le bouillon',
        'Laisser mijoter 20 minutes',
        'Mixer et servir chaud'
      ],
      emoji: '🍲'
    },
    {
      id: '35',
      nom: 'Cabillaud aux pistaches',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Cabillaud', quantite: '150g' },
        { nom: 'Pistaches', quantite: '25g' },
        { nom: 'Haricots verts', quantite: '100g' },
        { nom: 'Citron', quantite: '1/2 unité' },
        { nom: 'Huile d\'olive', quantite: '10g' }
      ],
      calories: 320,
      proteines: 32,
      glucides: 12,
      lipides: 18,
      objectif: 'Sèche',
      etapes: [
        'Assaisonner le cabillaud',
        'Cuire à la vapeur 8 minutes',
        'Faire griller les pistaches',
        'Cuire les haricots verts',
        'Servir avec citron et huile'
      ],
      emoji: '🐟'
    },
    {
      id: '36',
      nom: 'Pâtes complètes au tofu',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Pâtes complètes', quantite: '100g' },
        { nom: 'Tofu', quantite: '100g' },
        { nom: 'Tomates', quantite: '150g' },
        { nom: 'Ail', quantite: '2 gousses' },
        { nom: 'Basilic', quantite: '10g' }
      ],
      calories: 420,
      proteines: 22,
      glucides: 65,
      lipides: 12,
      objectif: 'Équilibre',
      etapes: [
        'Cuire les pâtes al dente',
        'Faire revenir le tofu',
        'Ajouter tomates et ail',
        'Mélanger avec les pâtes',
        'Garnir de basilic frais'
      ],
      emoji: '🍝'
    },
    {
      id: '37',
      nom: 'Smoothie aux framboises',
      categorie: 'Post-training',
      ingredients: [
        { nom: 'Framboises', quantite: '100g' },
        { nom: 'Banane', quantite: '1 unité' },
        { nom: 'Yaourt grec', quantite: '150g' },
        { nom: 'Lait de coco', quantite: '100ml' },
        { nom: 'Miel', quantite: '10g' }
      ],
      calories: 280,
      proteines: 18,
      glucides: 45,
      lipides: 8,
      objectif: 'Récupération',
      etapes: [
        'Laver les framboises',
        'Éplucher la banane',
        'Mixer tous les ingrédients',
        'Ajouter le miel',
        'Servir frais'
      ],
      emoji: '🥤'
    },
    {
      id: '38',
      nom: 'Curry de légumes au curcuma',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Pommes de terre', quantite: '200g' },
        { nom: 'Haricots verts', quantite: '100g' },
        { nom: 'Tofu', quantite: '80g' },
        { nom: 'Curcuma', quantite: '5g' },
        { nom: 'Lait de coco', quantite: '100ml' }
      ],
      calories: 350,
      proteines: 15,
      glucides: 45,
      lipides: 12,
      objectif: 'Anti-inflammatoire',
      etapes: [
        'Couper les légumes en morceaux',
        'Faire revenir avec le curcuma',
        'Ajouter le lait de coco',
        'Incorporer le tofu',
        'Laisser mijoter 20 minutes'
      ],
      emoji: '🍛'
    },
    {
      id: '39',
      nom: 'Salade d\'oranges aux pistaches',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Oranges', quantite: '2 unités' },
        { nom: 'Pistaches', quantite: '20g' },
        { nom: 'Menthe', quantite: '5g' },
        { nom: 'Miel', quantite: '8g' },
        { nom: 'Cumin', quantite: '2g' }
      ],
      calories: 220,
      proteines: 6,
      glucides: 35,
      lipides: 8,
      objectif: 'Anti-inflammatoire',
      etapes: [
        'Éplucher et couper les oranges',
        'Concasser les pistaches',
        'Mélanger avec le miel',
        'Ajouter la menthe et cumin',
        'Servir frais'
      ],
      emoji: '🍊'
    },
    {
      id: '40',
      nom: 'Bowl de légumes aux épices',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Céleri', quantite: '100g' },
        { nom: 'Haricots verts', quantite: '100g' },
        { nom: 'Tofu', quantite: '80g' },
        { nom: 'Cumin', quantite: '5g' },
        { nom: 'Huile d\'olive', quantite: '10g' }
      ],
      calories: 280,
      proteines: 18,
      glucides: 25,
      lipides: 14,
      objectif: 'Équilibre',
      etapes: [
        'Couper tous les légumes',
        'Faire revenir avec cumin',
        'Ajouter le tofu en dés',
        'Assaisonner avec huile',
        'Servir chaud'
      ],
      emoji: '🥗'
    },
    {
      id: '41',
      nom: 'Cabillaud aux légumes vapeur',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Cabillaud', quantite: '150g' },
        { nom: 'Céleri', quantite: '80g' },
        { nom: 'Haricots verts', quantite: '80g' },
        { nom: 'Citron', quantite: '1 unité' },
        { nom: 'Herbes', quantite: '5g' }
      ],
      calories: 250,
      proteines: 28,
      glucides: 15,
      lipides: 8,
      objectif: 'Sèche',
      etapes: [
        'Assaisonner le cabillaud',
        'Cuire les légumes à la vapeur',
        'Griller le poisson 8 minutes',
        'Arroser de citron',
        'Garnir d\'herbes fraîches'
      ],
      emoji: '🐟'
    },
    {
      id: '42',
      nom: 'Smoothie vert aux épices',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Épinards', quantite: '50g' },
        { nom: 'Céleri', quantite: '50g' },
        { nom: 'Curcuma', quantite: '3g' },
        { nom: 'Gingembre', quantite: '5g' },
        { nom: 'Lait de coco', quantite: '150ml' }
      ],
      calories: 150,
      proteines: 4,
      glucides: 12,
      lipides: 10,
      objectif: 'Anti-inflammatoire',
      etapes: [
        'Laver les légumes verts',
        'Ajouter les épices',
        'Mixer avec le lait de coco',
        'Filtrer si nécessaire',
        'Servir frais'
      ],
      emoji: '🥤'
    },
    {
      id: '43',
      nom: 'Tofu aux légumes sautés',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Tofu', quantite: '120g' },
        { nom: 'Haricots verts', quantite: '100g' },
        { nom: 'Céleri', quantite: '80g' },
        { nom: 'Ail', quantite: '2 gousses' },
        { nom: 'Huile de coco', quantite: '10g' }
      ],
      calories: 320,
      proteines: 20,
      glucides: 18,
      lipides: 18,
      objectif: 'Équilibre',
      etapes: [
        'Couper le tofu en dés',
        'Faire revenir dans l\'huile',
        'Ajouter les légumes',
        'Assaisonner avec ail',
        'Servir chaud'
      ],
      emoji: '🧀'
    }
  ];

  // Filtres pour aliments
  const alimentFilters = [
    { value: 'all', label: 'Tous', icon: Apple },
    { value: 'protéines', label: 'Protéines', icon: Target },
    { value: 'glucides', label: 'Glucides', icon: Zap },
    { value: 'lipides', label: 'Lipides', icon: Target },
    { value: 'micronutriments', label: 'Micronutriments', icon: Star }
  ];

  // Filtres pour repas
  const repasFilters = [
    { value: 'all', label: 'Tous', icon: Utensils },
    { value: 'petit-déjeuner', label: 'Petit-déjeuner', icon: Clock },
    { value: 'déjeuner', label: 'Déjeuner', icon: ChefHat },
    { value: 'dîner', label: 'Dîner', icon: Utensils },
    { value: 'post-training', label: 'Post-training', icon: Zap }
  ];

  // Filtrer les aliments
  const filteredAliments = aliments.filter(aliment => {
    const matchesSearch = aliment.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || aliment.categorie.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Filtrer les repas
  const filteredRepas = repas.filter(repas => {
    const matchesSearch = repas.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || repas.categorie.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Toggle favori
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // Couleur pour l'index glycémique
  const getIGColor = (ig: string) => {
    switch (ig) {
      case 'Bas': return 'bg-green-100 text-green-800';
      case 'Modéré': return 'bg-yellow-100 text-yellow-800';
      case 'Élevé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Couleur pour la classe nutritionnelle
  const getClasseColor = (classe: string) => {
    switch (classe) {
      case 'Prise de masse': return 'bg-blue-100 text-blue-800';
      case 'Sèche': return 'bg-red-100 text-red-800';
      case 'Récupération': return 'bg-green-100 text-green-800';
      case 'Anti-inflammatoire': return 'bg-purple-100 text-purple-800';
      case 'Boost performance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Apple className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Nutrition</h1>
            <p className="text-gray-600">Gérez votre alimentation et vos apports</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Créer un repas
        </Button>
        </div>

      {/* Recherche */}
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                placeholder="Rechercher un aliment ou un repas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-green-500 bg-white"
              />
            </div>
          </CardContent>
        </Card>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="aliments" className="flex items-center gap-2">
            <Apple className="h-4 w-4" />
            Aliments ({filteredAliments.length})
            </TabsTrigger>
          <TabsTrigger value="repas" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Repas ({filteredRepas.length})
          </TabsTrigger>
          </TabsList>

        {/* Onglet Aliments */}
        <TabsContent value="aliments" className="space-y-6">
          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            {alimentFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className={`flex items-center gap-2 ${
                  selectedFilter === filter.value 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                }`}
              >
                <filter.icon className="h-4 w-4" />
                {filter.label}
              </Button>
            ))}
                        </div>

          {/* Liste des aliments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAliments.map((aliment) => (
              <Card 
                key={aliment.id} 
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/aliment/${aliment.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="text-4xl mb-2">{aliment.emoji}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(aliment.id)}
                      className={`p-2 ${
                        favorites.includes(aliment.id) 
                          ? 'text-red-500' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(aliment.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <CardTitle className="text-gray-800 text-xl">{aliment.nom}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                      {aliment.categorie}
                      </Badge>
                    <Badge className={getIGColor(aliment.ig)}>
                      IG {aliment.ig}
                    </Badge>
                      </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Valeurs nutritionnelles */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{aliment.calories}</div>
                        <div className="text-sm text-gray-600">Calories</div>
                        </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{aliment.proteines}g</div>
                        <div className="text-sm text-gray-600">Protéines</div>
                        </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{aliment.glucides}g</div>
                        <div className="text-sm text-gray-600">Glucides</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{aliment.lipides}g</div>
                        <div className="text-sm text-gray-600">Lipides</div>
                      </div>
                    </div>
                    
                    {/* Classe nutritionnelle */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Classe</span>
                      <Badge className={getClasseColor(aliment.classe)}>
                        {aliment.classe}
                        </Badge>
                    </div>
                    
                    {/* Tags */}
                    {aliment.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {aliment.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs text-gray-600">
                            {tag}
                        </Badge>
                        ))}
                      </div>
                    )}

                    {/* Micronutriments */}
                    {aliment.micronutriments.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Micronutriments :</p>
                        <div className="flex flex-wrap gap-1">
                          {aliment.micronutriments.map((nutrient, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {nutrient}
                            </Badge>
                          ))}
                        </div>
                        </div>
                    )}

                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter à un repas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
          </TabsContent>

        {/* Onglet Repas */}
        <TabsContent value="repas" className="space-y-6">
          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            {repasFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className={`flex items-center gap-2 ${
                  selectedFilter === filter.value 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                }`}
              >
                <filter.icon className="h-4 w-4" />
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Liste des repas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepas.map((repas) => (
              <Card 
                key={repas.id} 
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/repas/${repas.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="text-4xl mb-2">{repas.emoji}</div>
                    <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                      {repas.categorie}
                    </Badge>
                    </div>
                  <CardTitle className="text-gray-800 text-xl">{repas.nom}</CardTitle>
                  <Badge className={getClasseColor(repas.objectif)}>
                    {repas.objectif}
                  </Badge>
                    </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Valeurs nutritionnelles */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{repas.calories}</div>
                        <div className="text-sm text-gray-600">Calories</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{repas.proteines}g</div>
                        <div className="text-sm text-gray-600">Protéines</div>
                        </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{repas.glucides}g</div>
                        <div className="text-sm text-gray-600">Glucides</div>
                        </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{repas.lipides}g</div>
                        <div className="text-sm text-gray-600">Lipides</div>
                        </div>
                    </div>

                    {/* Ingrédients */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Ingrédients :</p>
                      <div className="space-y-1">
                        {repas.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{ingredient.nom}</span>
                            <span className="font-medium text-gray-800">{ingredient.quantite}</span>
                          </div>
                        ))}
                        </div>
                      </div>

                    {/* Étapes */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Préparation :</p>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {repas.etapes.map((etape, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">{index + 1}.</span>
                            <span>{etape}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter au planning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
          </TabsContent>
        </Tabs>
    </div>
  );
};

export default Nutrition;