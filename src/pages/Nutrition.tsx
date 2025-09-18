import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import StatCard from '@/components/StatCard';
import ActionButton from '@/components/ActionButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Apple, 
  Search, 
  Camera, 
  Target,
  Flame,
  Clock,
  Plus,
  TrendingUp,
  Zap,
  Utensils,
  Star,
  ChefHat,
  ArrowLeft
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AlimentDetail from './pages/AlimentDetail';

const Nutrition = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('aliments');

  // Remplacer la section nutritionData par cette version étendue avec tous les aliments
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
      description: "Fruit riche en fibres et vitamine C"
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
      description: "Source de protéines maigres"
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
      description: "Glucides complexes à index glycémique bas"
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
      description: "Riche en acides gras monoinsaturés"
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
      description: "Légume crucifère riche en vitamines"
    },
    {
      id: 6,
      name: "Saumon",
      emoji: "🐟",
      calories: 250,
      protein: 25,
      carbs: 0,
      fat: 15,
      category: "Protéines",
      goal: "Récupération",
      popularity: 90,
      isPopular: true,
      description: "Poisson riche en oméga-3"
    },
    {
      id: 7,
      name: "Patate douce",
      emoji: "🥔",
      calories: 180,
      protein: 4,
      carbs: 41,
      fat: 0.2,
      category: "Glucides",
      goal: "Prise de masse",
      popularity: 87,
      isPopular: true,
      description: "Glucides complexes et bêta-carotène"
    },
    {
      id: 8,
      name: "Amandes",
      emoji: "🌰",
      calories: 160,
      protein: 6,
      carbs: 6,
      fat: 14,
      category: "Lipides",
      goal: "Équilibre",
      popularity: 83,
      isPopular: false,
      description: "Noix riches en vitamine E"
    },
    {
      id: 9,
      name: "Épinards",
      emoji: "🥬",
      calories: 23,
      protein: 3,
      carbs: 4,
      fat: 0.4,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 79,
      isPopular: false,
      description: "Légume vert riche en fer et folates"
    },
    {
      id: 10,
      name: "Œufs",
      emoji: "🥚",
      calories: 140,
      protein: 12,
      carbs: 1,
      fat: 10,
      category: "Protéines",
      goal: "Prise de masse",
      popularity: 91,
      isPopular: true,
      description: "Protéines complètes de haute qualité"
    },
    {
      id: 11,
      name: "Banane",
      emoji: "🍌",
      calories: 89,
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      category: "Fruits",
      goal: "Performance",
      popularity: 88,
      isPopular: true,
      description: "Riche en potassium et énergie"
    },
    {
      id: 12,
      name: "Concombre",
      emoji: "🥒",
      calories: 16,
      protein: 0.7,
      carbs: 4,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 75,
      isPopular: false,
      description: "Légume hydratant et peu calorique"
    },
    {
      id: 13,
      name: "Thon",
      emoji: "��",
      calories: 116,
      protein: 26,
      carbs: 0,
      fat: 0.8,
      category: "Protéines",
      goal: "Perte de poids",
      popularity: 86,
      isPopular: true,
      description: "Poisson maigre riche en protéines"
    },
    {
      id: 14,
      name: "Quinoa",
      emoji: "🌾",
      calories: 120,
      protein: 4.4,
      carbs: 22,
      fat: 1.9,
      category: "Glucides",
      goal: "Équilibre",
      popularity: 84,
      isPopular: true,
      description: "Céréale complète avec protéines complètes"
    },
    {
      id: 15,
      name: "Myrtilles",
      emoji: "🫐",
      calories: 57,
      protein: 0.7,
      carbs: 14,
      fat: 0.3,
      category: "Fruits",
      goal: "Récupération",
      popularity: 89,
      isPopular: true,
      description: "Antioxydants puissants et vitamine C"
    },
    {
      id: 16,
      name: "Tofu",
      emoji: "🥜",
      calories: 76,
      protein: 8,
      carbs: 1.9,
      fat: 4.8,
      category: "Protéines",
      goal: "Équilibre",
      popularity: 78,
      isPopular: false,
      description: "Protéines végétales et isoflavones"
    },
    {
      id: 17,
      name: "Carottes",
      emoji: "🥕",
      calories: 41,
      protein: 0.9,
      carbs: 10,
      fat: 0.2,
      category: "Légumes",
      goal: "Équilibre",
      popularity: 81,
      isPopular: true,
      description: "Riches en bêta-carotène et vitamine A"
    },
    {
      id: 18,
      name: "Noix",
      emoji: "🌰",
      calories: 200,
      protein: 4.3,
      carbs: 3.9,
      fat: 20,
      category: "Lipides",
      goal: "Performance",
      popularity: 87,
      isPopular: true,
      description: "Oméga-3 et vitamine E"
    },
    {
      id: 19,
      name: "Yaourt grec",
      emoji: "🥛",
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      category: "Protéines",
      goal: "Récupération",
      popularity: 85,
      isPopular: true,
      description: "Probiotiques et protéines"
    },
    {
      id: 20,
      name: "Tomates",
      emoji: "🍅",
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 80,
      isPopular: false,
      description: "Lycopène et vitamine C"
    },
    {
      id: 21,
      name: "Framboises",
      emoji: "🫐",
      calories: 52,
      protein: 1.2,
      carbs: 12,
      fat: 0.7,
      category: "Fruits",
      goal: "Récupération",
      popularity: 83,
      isPopular: false,
      description: "Antioxydants et fibres"
    },
    {
      id: 22,
      name: "Graines de chia",
      emoji: "🌱",
      calories: 486,
      protein: 17,
      carbs: 42,
      fat: 31,
      category: "Lipides",
      goal: "Performance",
      popularity: 88,
      isPopular: true,
      description: "Oméga-3 et fibres solubles"
    },
    // NOUVEAUX ALIMENTS
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
      description: "Légume crucifère riche en vitamines et minéraux"
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
      description: "Tubercule riche en glucides complexes et potassium"
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
      description: "Légume vert riche en fer et folates"
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
      description: "Viande maigre riche en protéines complètes"
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
      description: "Poisson gras riche en oméga-3 et protéines"
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
      description: "Céréale raffinée riche en glucides simples"
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
      description: "Pâtes alimentaires riches en glucides complexes"
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
      description: "Pain à base de farine complète riche en fibres"
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
      description: "Produit laitier riche en protéines et calcium"
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
      description: "Boisson lactée riche en protéines et calcium"
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
      description: "Produit laitier fermenté riche en probiotiques"
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
      description: "Matière grasse laitière riche en acides gras saturés"
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
      description: "Huile végétale riche en acides gras monoinsaturés"
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
      description: "Fruit à coque riche en oméga-3 et vitamine E"
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
      description: "Fruit à coque riche en vitamine E et magnésium"
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
      description: "Confiserie riche en antioxydants et magnésium"
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
      description: "Édulcorant naturel riche en antioxydants"
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
      description: "Édulcorant raffiné riche en glucides simples"
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
      description: "Condiment essentiel riche en sodium"
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
      description: "Épice riche en antioxydants et propriétés anti-inflammatoires"
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
      description: "Fruit riche en vitamine C et antioxydants"
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
      description: "Fruit rouge riche en vitamine C et fibres"
    },
    {
      id: 45,
      name: "Poires",
      emoji: "",
      calories: 57,
      protein: 0.4,
      carbs: 15,
      fat: 0.1,
      category: "Fruits",
      goal: "Équilibre",
      popularity: 81,
      isPopular: false,
      description: "Fruit riche en fibres et vitamine K"
    },
    {
      id: 46,
      name: "Raisins",
      emoji: "",
      calories: 62,
      protein: 0.6,
      carbs: 16,
      fat: 0.2,
      category: "Fruits",
      goal: "Performance",
      popularity: 84,
      isPopular: true,
      description: "Fruit riche en antioxydants et énergie rapide"
    },
    {
      id: 47,
      name: "Ananas",
      emoji: "",
      calories: 50,
      protein: 0.5,
      carbs: 13,
      fat: 0.1,
      category: "Fruits",
      goal: "Récupération",
      popularity: 86,
      isPopular: true,
      description: "Fruit tropical riche en bromélaïne et vitamine C"
    },
    {
      id: 48,
      name: "Mangue",
      emoji: "",
      calories: 60,
      protein: 0.8,
      carbs: 15,
      fat: 0.4,
      category: "Fruits",
      goal: "Performance",
      popularity: 88,
      isPopular: true,
      description: "Fruit tropical riche en vitamine A et C"
    },
    {
      id: 49,
      name: "Papaye",
      emoji: "",
      calories: 43,
      protein: 0.5,
      carbs: 11,
      fat: 0.3,
      category: "Fruits",
      goal: "Récupération",
      popularity: 79,
      isPopular: false,
      description: "Fruit tropical riche en papaïne et vitamine C"
    },
    {
      id: 50,
      name: "Grenade",
      emoji: "",
      calories: 83,
      protein: 1.7,
      carbs: 19,
      fat: 1.2,
      category: "Fruits",
      goal: "Récupération",
      popularity: 85,
      isPopular: true,
      description: "Fruit riche en antioxydants et vitamine K"
    },
    {
      id: 51,
      name: "Kiwi",
      emoji: "",
      calories: 41,
      protein: 0.8,
      carbs: 10,
      fat: 0.4,
      category: "Fruits",
      goal: "Récupération",
      popularity: 82,
      isPopular: true,
      description: "Fruit riche en vitamine C et fibres"
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
      description: "Fruit d'été riche en vitamine A et C"
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
      description: "Viande rouge riche en protéines et fer"
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
      description: "Viande riche en protéines et vitamines B"
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
      description: "Viande rouge riche en protéines et zinc"
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
      description: "Viande maigre riche en protéines et sélénium"
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
      description: "Fruits de mer riches en protéines et iode"
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
      description: "Fruits de mer riches en protéines et zinc"
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
      description: "Fruits de mer riches en protéines et vitamine B12"
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
      description: "Fruits de mer riches en zinc et vitamine B12"
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
      description: "Fruits de mer riches en protéines et sélénium"
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
      description: "Fruits de mer riches en protéines et phosphore"
    },
    {
      id: 63,
      name: "Céleri",
      emoji: "��",
      calories: 16,
      protein: 0.7,
      carbs: 3,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 72,
      isPopular: false,
      description: "Légume vert riche en fibres et très peu calorique"
    },
    {
      id: 64,
      name: "Chou",
      emoji: "��",
      calories: 25,
      protein: 1.3,
      carbs: 6,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 74,
      isPopular: false,
      description: "Légume crucifère riche en vitamine C et K"
    },
    {
      id: 65,
      name: "Chou de Bruxelles",
      emoji: "��",
      calories: 43,
      protein: 3.4,
      carbs: 9,
      fat: 0.3,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 68,
      isPopular: false,
      description: "Légume crucifère riche en vitamine C et folates"
    },
    {
      id: 66,
      name: "Radis",
      emoji: "��",
      calories: 16,
      protein: 0.7,
      carbs: 3.4,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 71,
      isPopular: false,
      description: "Légume racine croquant et peu calorique"
    },
    {
      id: 67,
      name: "Navet",
      emoji: "��",
      calories: 28,
      protein: 0.9,
      carbs: 6.4,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 69,
      isPopular: false,
      description: "Légume racine riche en vitamine C et fibres"
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
      description: "Légume racine riche en nitrates et antioxydants"
    },
    {
      id: 69,
      name: "Aubergine",
      emoji: "��",
      calories: 25,
      protein: 1,
      carbs: 6,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 73,
      isPopular: false,
      description: "Légume riche en fibres et antioxydants"
    },
    {
      id: 70,
      name: "Poivron",
      emoji: "��️",
      calories: 31,
      protein: 1,
      carbs: 7,
      fat: 0.3,
      category: "Légumes",
      goal: "Équilibre",
      popularity: 78,
      isPopular: false,
      description: "Légume riche en vitamine C et caroténoïdes"
    },
    {
      id: 71,
      name: "Piment",
      emoji: "��️",
      calories: 40,
      protein: 1.9,
      carbs: 9,
      fat: 0.4,
      category: "Légumes",
      goal: "Performance",
      popularity: 75,
      isPopular: false,
      description: "Légume épicé riche en capsaïcine et vitamine C"
    },
    {
      id: 72,
      name: "Asperge",
      emoji: "��",
      calories: 20,
      protein: 2.2,
      carbs: 4,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 77,
      isPopular: false,
      description: "Légume vert riche en folates et vitamine K"
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
      description: "Légume riche en fibres et antioxydants"
    },
    {
      id: 74,
      name: "Fenouil",
      emoji: "��",
      calories: 31,
      protein: 1.2,
      carbs: 7,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 66,
      isPopular: false,
      description: "Légume aromatique riche en fibres et vitamine C"
    },
    {
      id: 75,
      name: "Endive",
      emoji: "��",
      calories: 17,
      protein: 1.3,
      carbs: 4,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 64,
      isPopular: false,
      description: "Légume feuille croquant et peu calorique"
    },
    {
      id: 76,
      name: "Laitue",
      emoji: "��",
      calories: 15,
      protein: 1.4,
      carbs: 3,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 80,
      isPopular: false,
      description: "Légume feuille riche en vitamine K et folates"
    },
    {
      id: 77,
      name: "Mâche",
      emoji: "��",
      calories: 14,
      protein: 2,
      carbs: 2,
      fat: 0.4,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 62,
      isPopular: false,
      description: "Salade verte riche en vitamine C et fer"
    },
    {
      id: 78,
      name: "Roquette",
      emoji: "��",
      calories: 25,
      protein: 2.6,
      carbs: 4,
      fat: 0.7,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 68,
      isPopular: false,
      description: "Salade épicée riche en vitamine K et folates"
    },
    {
      id: 79,
      name: "Cresson",
      emoji: "��",
      calories: 11,
      protein: 2.3,
      carbs: 1.3,
      fat: 0.1,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 60,
      isPopular: false,
      description: "Salade verte riche en vitamine C et calcium"
    },
    {
      id: 80,
      name: "Chicorée",
      emoji: "��",
      calories: 23,
      protein: 1.7,
      carbs: 5,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 58,
      isPopular: false,
      description: "Légume feuille riche en fibres et vitamine K"
    },
    {
      id: 81,
      name: "Bette",
      emoji: "��",
      calories: 19,
      protein: 1.8,
      carbs: 4,
      fat: 0.2,
      category: "Légumes",
      goal: "Perte de poids",
      popularity: 55,
      isPopular: false,
      description: "Légume feuille riche en vitamine K et magnésium"
    },
    {
      id: 82,
      name: "Pissenlit",
      emoji: "��",
      calories: 45,
      protein: 2.7,
      carbs: 9,
      fat: 0.7,
      category: "Légumes",
      goal: "Équilibre",
      popularity: 52,
      isPopular: false,
      description: "Légume sauvage riche en vitamine A et potassium"
    }
  ];

  // Remplacer la section repasData par cette version étendue avec tous les repas
  const repasData = [
    {
      id: 1,
      name: "Bowl protéiné aux fruits",
      emoji: "🥣",
      category: "Petit-déjeuner",
      goal: "Prise de masse",
      calories: 650,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.7,
      protein: 35,
      carbs: 65,
      fat: 18,
      fiber: 12,
      servings: 1,
      isPopular: true
    },
    {
      id: 2,
      name: "Omelette aux 3 œufs et fromage",
      emoji: "🍳",
      category: "Petit-déjeuner",
      goal: "Prise de masse",
      calories: 520,
      prepTime: 12,
      difficulty: "Facile",
      rating: 4.5,
      protein: 42,
      carbs: 8,
      fat: 35,
      fiber: 2,
      servings: 1,
      isPopular: true
    },
    {
      id: 3,
      name: "Poulet rôti aux patates douces",
      emoji: "🍗",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 720,
      prepTime: 45,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 75,
      fat: 18,
      fiber: 10,
      servings: 2,
      isPopular: true
    },
    {
      id: 4,
      name: "Saumon aux légumes vapeur",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 380,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.5,
      protein: 35,
      carbs: 25,
      fat: 18,
      fiber: 8,
      servings: 1,
      isPopular: false
    },
    {
      id: 5,
      name: "Smoothie récupération",
      emoji: "🥤",
      category: "Collation",
      goal: "Récupération",
      calories: 250,
      prepTime: 5,
      difficulty: "Facile",
      rating: 4.6,
      protein: 20,
      carbs: 35,
      fat: 8,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 6,
      name: "Bowl d'énergie pré-entraînement",
      emoji: "⚡",
      category: "Pre-workout",
      goal: "Performance",
      calories: 320,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 55,
      fat: 8,
      fiber: 8,
      servings: 1,
      isPopular: false
    },
    {
      id: 7,
      name: "Salade de thon aux légumes",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 280,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.3,
      protein: 32,
      carbs: 20,
      fat: 8,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 8,
      name: "Pancakes protéinés",
      emoji: "🥞",
      category: "Petit-déjeuner",
      goal: "Prise de masse",
      calories: 580,
      prepTime: 20,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 38,
      carbs: 45,
      fat: 22,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 9,
      name: "Bowl de quinoa aux légumes",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 420,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 18,
      carbs: 55,
      fat: 12,
      fiber: 10,
      servings: 1,
      isPopular: true
    },
    {
      id: 10,
      name: "Smoothie vert détox",
      emoji: "🥤",
      category: "Collation",
      goal: "Perte de poids",
      calories: 150,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.2,
      protein: 8,
      carbs: 25,
      fat: 4,
      fiber: 8,
      servings: 1,
      isPopular: false
    },
    {
      id: 11,
      name: "Burger de bœuf aux patates douces",
      emoji: "🍔",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 850,
      prepTime: 35,
      difficulty: "Moyen",
      rating: 4.8,
      protein: 45,
      carbs: 65,
      fat: 35,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 12,
      name: "Poisson blanc aux herbes",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 220,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.3,
      protein: 35,
      carbs: 15,
      fat: 5,
      fiber: 8,
      servings: 1,
      isPopular: false
    },
    {
      id: 13,
      name: "Energy balls aux dattes",
      emoji: "🥧",
      category: "Collation",
      goal: "Performance",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.6,
      protein: 6,
      carbs: 25,
      fat: 8,
      fiber: 4,
      servings: 4,
      isPopular: true
    },
    {
      id: 14,
      name: "Pâtes complètes au thon",
      emoji: "🍝",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 480,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.4,
      protein: 30,
      carbs: 65,
      fat: 12,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 15,
      name: "Toast à l'avocat et œufs",
      emoji: "🥑",
      category: "Petit-déjeuner",
      goal: "Performance",
      calories: 380,
      prepTime: 12,
      difficulty: "Facile",
      rating: 4.4,
      protein: 20,
      carbs: 25,
      fat: 25,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 16,
      name: "Soupe de légumes minceur",
      emoji: "🍲",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.2,
      protein: 8,
      carbs: 25,
      fat: 5,
      fiber: 12,
      servings: 2,
      isPopular: false
    },
    {
      id: 17,
      name: "Bowl de riz au poulet teriyaki",
      emoji: "🍱",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 750,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 85,
      fat: 18,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 18,
      name: "Smoothie chocolat-banane",
      emoji: "🥤",
      category: "Post-workout",
      goal: "Récupération",
      calories: 350,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.7,
      protein: 25,
      carbs: 45,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    // NOUVEAUX REPAS
    {
      id: 19,
      name: "Salade de quinoa aux légumes",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 380,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.3,
      protein: 16,
      carbs: 45,
      fat: 14,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 20,
      name: "Smoothie vert détox",
      emoji: "🥤",
      category: "Collation",
      goal: "Perte de poids",
      calories: 150,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.2,
      protein: 8,
      carbs: 25,
      fat: 4,
      fiber: 8,
      servings: 1,
      isPopular: false
    },
    {
      id: 21,
      name: "Burger de bœuf aux patates douces",
      emoji: "🍔",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 850,
      prepTime: 35,
      difficulty: "Moyen",
      rating: 4.8,
      protein: 45,
      carbs: 65,
      fat: 35,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 22,
      name: "Poisson blanc aux herbes",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 220,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.3,
      protein: 35,
      carbs: 15,
      fat: 5,
      fiber: 8,
      servings: 1,
      isPopular: false
    },
    {
      id: 23,
      name: "Energy balls aux dattes",
      emoji: "🥧",
      category: "Collation",
      goal: "Performance",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.6,
      protein: 6,
      carbs: 25,
      fat: 8,
      fiber: 4,
      servings: 4,
      isPopular: true
    },
    {
      id: 24,
      name: "Pâtes complètes au thon",
      emoji: "🍝",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 480,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.4,
      protein: 30,
      carbs: 65,
      fat: 12,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 25,
      name: "Toast à l'avocat et œufs",
      emoji: "🥑",
      category: "Petit-déjeuner",
      goal: "Performance",
      calories: 380,
      prepTime: 12,
      difficulty: "Facile",
      rating: 4.4,
      protein: 20,
      carbs: 25,
      fat: 25,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 26,
      name: "Soupe de légumes minceur",
      emoji: "🍲",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.2,
      protein: 8,
      carbs: 25,
      fat: 5,
      fiber: 12,
      servings: 2,
      isPopular: false
    },
    {
      id: 27,
      name: "Bowl de riz au poulet teriyaki",
      emoji: "🍱",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 750,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 85,
      fat: 18,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 28,
      name: "Smoothie chocolat-banane",
      emoji: "🥤",
      category: "Post-workout",
      goal: "Récupération",
      calories: 350,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.7,
      protein: 25,
      carbs: 45,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 29,
      name: "Wrap protéiné aux légumes",
      emoji: "🌯",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 420,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.5,
      protein: 28,
      carbs: 35,
      fat: 18,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 30,
      name: "Bowl de légumes rôtis",
      emoji: "🥗",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 280,
      prepTime: 35,
      difficulty: "Facile",
      rating: 4.3,
      protein: 12,
      carbs: 45,
      fat: 8,
      fiber: 12,
      servings: 1,
      isPopular: false
    },
    {
      id: 31,
      name: "Smoothie tropical",
      emoji: "🥤",
      category: "Collation",
      goal: "Performance",
      calories: 220,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 35,
      fat: 6,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 32,
      name: "Pizza protéinée",
      emoji: "🍕",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 680,
      prepTime: 25,
      difficulty: "Moyen",
      rating: 4.7,
      protein: 42,
      carbs: 55,
      fat: 28,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 33,
      name: "Salade de fruits frais",
      emoji: "🥗",
      category: "Collation",
      goal: "Récupération",
      calories: 120,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.6,
      protein: 2,
      carbs: 28,
      fat: 0.5,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 34,
      name: "Risotto aux champignons",
      emoji: "🍲",
      category: "Dîner",
      goal: "Équilibre",
      calories: 450,
      prepTime: 40,
      difficulty: "Moyen",
      rating: 4.5,
      protein: 18,
      carbs: 65,
      fat: 12,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 35,
      name: "Granola maison",
      emoji: "🥣",
      category: "Petit-déjeuner",
      goal: "Performance",
      calories: 380,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.6,
      protein: 12,
      carbs: 45,
      fat: 18,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 36,
      name: "Curry de légumes",
      emoji: "🍛",
      category: "Dîner",
      goal: "Équilibre",
      calories: 320,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 55,
      fat: 8,
      fiber: 12,
      servings: 1,
      isPopular: true
    },
    {
      id: 37,
      name: "Muffins protéinés",
      emoji: "🧁",
      category: "Collation",
      goal: "Prise de masse",
      calories: 280,
      prepTime: 25,
      difficulty: "Moyen",
      rating: 4.5,
      protein: 22,
      carbs: 25,
      fat: 12,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 38,
      name: "Tacos aux légumes",
      emoji: "🌮",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 380,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.3,
      protein: 18,
      carbs: 45,
      fat: 15,
      fiber: 10,
      servings: 1,
      isPopular: true
    },
    {
      id: 39,
      name: "Lasagnes végétariennes",
      emoji: "🍝",
      category: "Dîner",
      goal: "Équilibre",
      calories: 520,
      prepTime: 45,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 25,
      carbs: 65,
      fat: 18,
      fiber: 10,
      servings: 1,
      isPopular: true
    },
    {
      id: 40,
      name: "Couscous aux légumes",
      emoji: "🍚",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 380,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 55,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 41,
      name: "Ratatouille",
      emoji: "🍲",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 40,
      difficulty: "Facile",
      rating: 4.3,
      protein: 8,
      carbs: 25,
      fat: 6,
      fiber: 10,
      servings: 1,
      isPopular: false
    },
    {
      id: 42,
      name: "Boulettes de viande",
      emoji: "🥩",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 450,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.5,
      protein: 35,
      carbs: 25,
      fat: 22,
      fiber: 4,
      servings: 1,
      isPopular: true
    },
    {
      id: 43,
      name: "Gratin de légumes",
      emoji: "🍲",
      category: "Dîner",
      goal: "Équilibre",
      calories: 320,
      prepTime: 35,
      difficulty: "Facile",
      rating: 4.4,
      protein: 18,
      carbs: 35,
      fat: 15,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 44,
      name: "Spaghettis bolognaise",
      emoji: "🍝",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 580,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.6,
      protein: 32,
      carbs: 65,
      fat: 18,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 45,
      name: "Chili con carne",
      emoji: "🍲",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 420,
      prepTime: 35,
      difficulty: "Facile",
      rating: 4.5,
      protein: 28,
      carbs: 45,
      fat: 15,
      fiber: 12,
      servings: 1,
      isPopular: true
    },
    {
      id: 46,
      name: "Paella aux fruits de mer",
      emoji: "🍚",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 480,
      prepTime: 40,
      difficulty: "Moyen",
      rating: 4.7,
      protein: 35,
      carbs: 55,
      fat: 12,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 47,
      name: "Ceviche de poisson",
      emoji: "🐟",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 220,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.4,
      protein: 32,
      carbs: 15,
      fat: 5,
      fiber: 4,
      servings: 1,
      isPopular: true
    },
    {
      id: 48,
      name: "Tartare de saumon",
      emoji: "🐟",
      category: "Déjeuner",
      goal: "Récupération",
      calories: 280,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.6,
      protein: 25,
      carbs: 8,
      fat: 18,
      fiber: 2,
      servings: 1,
      isPopular: true
    },
    {
      id: 49,
      name: "Salade niçoise",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 320,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.5,
      protein: 22,
      carbs: 25,
      fat: 15,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 50,
      name: "Gazpacho andalou",
      emoji: "🍲",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 120,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.3,
      protein: 4,
      carbs: 20,
      fat: 3,
      fiber: 4,
      servings: 1,
      isPopular: false
    },
    {
      id: 51,
      name: "Taboulé libanais",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 280,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 8,
      carbs: 45,
      fat: 8,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 52,
      name: "Falafels aux légumes",
      emoji: "🥙",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 380,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 18,
      carbs: 45,
      fat: 15,
      fiber: 10,
      servings: 1,
      isPopular: true
    },
    {
      id: 53,
      name: "Buddha bowl",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 420,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.5,
      protein: 20,
      carbs: 55,
      fat: 12,
      fiber: 12,
      servings: 1,
      isPopular: true
    },
    {
      id: 54,
      name: "Ceviche de crevettes",
      emoji: "🦐",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 25,
      carbs: 12,
      fat: 4,
      fiber: 3,
      servings: 1,
      isPopular: true
    },
    {
      id: 55,
      name: "Poké bowl au saumon",
      emoji: "",
      category: "Déjeuner",
      goal: "Récupération",
      calories: 450,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.7,
      protein: 35,
      carbs: 35,
      fat: 18,
      fiber: 6,
      servings: 1,
      isPopular: true
    },
    {
      id: 56,
      name: "Bowl de légumes grillés",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 250,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.3,
      protein: 12,
      carbs: 35,
      fat: 8,
      fiber: 10,
      servings: 1,
      isPopular: false
    },
    {
      id: 57,
      name: "Salade de quinoa aux fruits",
      emoji: "",
      category: "Collation",
      goal: "Performance",
      calories: 280,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.4,
      protein: 12,
      carbs: 45,
      fat: 8,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 58,
      name: "Wrap aux légumes grillés",
      emoji: "🌯",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 350,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.3,
      protein: 15,
      carbs: 40,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 59,
      name: "Soupe de lentilles",
      emoji: "🍲",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 280,
      prepTime: 35,
      difficulty: "Facile",
      rating: 4.5,
      protein: 18,
      carbs: 45,
      fat: 6,
      fiber: 15,
      servings: 1,
      isPopular: true
    },
    {
      id: 60,
      name: "Salade de chou",
      emoji: "🥗",
      category: "Collation",
      goal: "Perte de poids",
      calories: 120,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.2,
      protein: 3,
      carbs: 20,
      fat: 3,
      fiber: 4,
      servings: 1,
      isPopular: false
    },
    {
      id: 61,
      name: "Bowl de légumes vapeur",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.1,
      protein: 8,
      carbs: 25,
      fat: 5,
      fiber: 8,
      servings: 1,
      isPopular: false
    },
    {
      id: 62,
      name: "Salade de betteraves",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Performance",
      calories: 220,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.3,
      protein: 8,
      carbs: 35,
      fat: 6,
      fiber: 8,
      servings: 1,
      isPopular: true
    },
    {
      id: 63,
      name: "Bowl de légumes crus",
      emoji: "🥗",
      category: "Collation",
      goal: "Perte de poids",
      calories: 150,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.0,
      protein: 6,
      carbs: 25,
      fat: 4,
      fiber: 8,
      servings: 1,
      isPopular: false
    },
    {
      id: 64,
      name: "Salade de fenouil",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.2,
      protein: 6,
      carbs: 25,
      fat: 6,
      fiber: 6,
      servings: 1,
      isPopular: false
    },
    {
      id: 65,
      name: "Bowl de légumes colorés",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 280,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 12,
      carbs: 35,
      fat: 10,
      fiber: 10,
      servings: 1,
      isPopular: true
    },
    {
      id: 66,
      name: "Salade de roquette",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 160,
      prepTime: 12,
      difficulty: "Facile",
      rating: 4.3,
      protein: 8,
      carbs: 15,
      fat: 8,
      fiber: 4,
      servings: 1,
      isPopular: true
    },
    {
      id: 67,
      name: "Bowl de légumes d'hiver",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 320,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 45,
      fat: 10,
      fiber: 12,
      servings: 1,
      isPopular: true
    },
    {
      id: 68,
      name: "Salade de légumes grillés",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 250,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.5,
      protein: 10,
      carbs: 30,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true
    }
  ];

  const stats = {
    totalFoods: nutritionData.length,
    totalRepas: repasData.length,
    popularFoods: nutritionData.filter(food => food.isPopular).length,
    popularRepas: repasData.filter(repas => repas.isPopular).length,
    totalCalories: nutritionData.reduce((sum, food) => sum + food.calories, 0),
    averageCalories: Math.round(nutritionData.reduce((sum, food) => sum + food.calories, 0) / nutritionData.length)
  };

  // Mettre à jour les filtres pour inclure les nouvelles catégories
  const filters = [
    { value: 'all', label: 'Tous', icon: Apple },
    { value: 'popular', label: 'Populaires', icon: Target },
    { value: 'fruits', label: 'Fruits', icon: Apple },
    { value: 'protéines', label: 'Protéines', icon: Target },
    { value: 'glucides', label: 'Glucides', icon: Target },
    { value: 'lipides', label: 'Lipides', icon: Target },
    { value: 'légumes', label: 'Légumes', icon: Apple },
    { value: 'édulcorants', label: 'Édulcorants', icon: Apple },
    { value: 'épices', label: 'Épices', icon: Apple }
  ];

  const repasFilters = [
    { value: 'all', label: 'Tous', icon: Utensils },
    { value: 'popular', label: 'Populaires', icon: Star },
    { value: 'petit-déjeuner', label: 'Petit-déjeuner', icon: Utensils },
    { value: 'déjeuner', label: 'Déjeuner', icon: Utensils },
    { value: 'dîner', label: 'Dîner', icon: Utensils },
    { value: 'collation', label: 'Collation', icon: Utensils },
    { value: 'pre-workout', label: 'Pre-workout', icon: Zap },
    { value: 'post-workout', label: 'Post-workout', icon: Zap }
  ];

  const goalFilters = [
    { value: 'all', label: 'Tous objectifs', icon: Target },
    { value: 'prise-de-masse', label: 'Prise de masse', icon: Target },
    { value: 'perte-de-poids', label: 'Perte de poids', icon: Target },
    { value: 'récupération', label: 'Récupération', icon: Target },
    { value: 'performance', label: 'Performance', icon: Target },
    { value: 'équilibre', label: 'Équilibre', icon: Target }
  ];

  const filteredFoods = nutritionData.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'popular' && food.isPopular) ||
      food.category.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filteredRepas = repasData.filter(repas => {
    const matchesSearch = repas.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'popular' && repas.isPopular) ||
      repas.category.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Difficile': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
      title="Nutrition"
      subtitle="Gérez votre alimentation et vos apports"
      icon={<Apple className="h-6 w-6 text-blue-600" />}
      actions={
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter aliment
        </Button>
      }
    >
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Aliments"
          value={stats.totalFoods}
          icon={Apple}
          color="blue"
        />
        <StatCard
          title="Repas"
          value={stats.totalRepas}
          icon={Utensils}
          color="green"
        />
        <StatCard
          title="Populaires"
          value={stats.popularFoods + stats.popularRepas}
          icon={Target}
          color="orange"
        />
        <StatCard
          title="Moyenne"
          value={`${stats.averageCalories} cal`}
          icon={TrendingUp}
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
                placeholder="Rechercher un aliment ou un repas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 bg-white"
              />
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="aliments" className="flex items-center gap-2">
            <Apple className="h-4 w-4" />
              Aliments ({filteredFoods.length})
            </TabsTrigger>
          <TabsTrigger value="repas" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Repas ({filteredRepas.length})
          </TabsTrigger>
          </TabsList>

        {/* Onglet Aliments */}
        <TabsContent value="aliments" className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <Card 
                key={food.id} 
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/nutrition/${food.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="text-4xl mb-2">{food.emoji}</div>
                    {food.isPopular && (
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        <Target className="h-3 w-3 mr-1" />
                        Populaire
                      </Badge>
                    )}
                      </div>
                  <CardTitle className="text-gray-800 text-xl">{food.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 text-sm">{food.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{food.calories}</div>
                        <div className="text-sm text-gray-600">Calories</div>
                        </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{food.protein}g</div>
                        <div className="text-sm text-gray-600">Protéines</div>
                        </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{food.carbs}g</div>
                        <div className="text-sm text-gray-600">Glucides</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{food.fat}g</div>
                        <div className="text-sm text-gray-600">Lipides</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Catégorie</span>
                      <Badge 
                        variant="outline" 
                        className="border-blue-300 text-blue-700 bg-blue-50"
                      >
                        {food.category}
                        </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Objectif</span>
                      <Badge className={getGoalColor(food.goal)}>
                        {food.goal}
                        </Badge>
                      </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Popularité</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                            style={{ width: `${food.popularity}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{food.popularity}%</span>
                        </div>
                      </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/nutrition/${food.id}`);
                      }}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Ajouter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
          </TabsContent>

        {/* Onglet Repas */}
        <TabsContent value="repas" className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {repasFilters.map((filter) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepas.map((repas) => (
              <Card 
                key={repas.id} 
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/repas/${repas.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="text-4xl mb-2">{repas.emoji}</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">{repas.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-gray-800 text-xl">{repas.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                      {repas.calories} cal
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-500" />
                      {repas.prepTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="h-4 w-4 text-purple-500" />
                      {repas.servings} portion{repas.servings > 1 ? 's' : ''}
                        </div>
                      </div>
                    </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getDifficultyColor(repas.difficulty)}>
                        {repas.difficulty}
                        </Badge>
                      <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                        {repas.category}
                        </Badge>
                      <Badge className={getGoalColor(repas.goal)}>
                        {repas.goal}
                      </Badge>
                      {repas.isPopular && (
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                          <Star className="h-3 w-3 mr-1" />
                          Populaire
                        </Badge>
                      )}
                      </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{repas.protein}g</div>
                        <div className="text-sm text-gray-600">Protéines</div>
                        </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{repas.carbs}g</div>
                        <div className="text-sm text-gray-600">Glucides</div>
                        </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{repas.fat}g</div>
                        <div className="text-sm text-gray-600">Lipides</div>
                        </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{repas.fiber}g</div>
                        <div className="text-sm text-gray-600">Fibres</div>
                        </div>
                      </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/repas/${repas.id}`);
                      }}
                    >
                      <ChefHat className="h-4 w-4 mr-2" />
                      Voir la recette
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
          </TabsContent>
        </Tabs>
    </PageLayout>
  );
};

export default Nutrition;