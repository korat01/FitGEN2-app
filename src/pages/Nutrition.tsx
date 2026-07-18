import React, { useState, Suspense, lazy } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Apple,
  Search,
  Plus,
  Heart,
  Star,
  Target,
  Zap,
  Droplet,
  Clock,
  ChefHat,
  ScanLine,
  Camera,
  ImagePlus,
  Scale,
  X,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MacroStatsGrid } from '@/components/nutrition/MacroStatsGrid';
import { FilterChipRow } from '@/components/nutrition/FilterChipRow';
import { MealPhotoModal } from '@/components/nutrition/MealPhotoModal';
import { useNutritionFavorites } from '@/hooks/useNutritionFavorites';
import { useScannedAliments } from '@/hooks/useScannedAliments';
import { useMealPhotoLog } from '@/hooks/useMealPhotoLog';
import { RECETTES, calculerMacrosRecette } from '@/utils/nutritionData';

// Chargé à la demande : embarque la lib ZXing (décodage code-barres), assez lourde pour ne pas
// vouloir l'inclure dans le chunk partagé des pages tant que l'utilisateur n'a pas cliqué "Scanner".
const BarcodeScannerModal = lazy(() => import('@/components/nutrition/BarcodeScannerModal'));
import { fetchProductByBarcode, ProductNotFoundError } from '@/utils/openFoodFacts';

const Nutrition: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('aliments');
  const [searchTerm, setSearchTerm] = useState('');
  // Filtre séparé par onglet : partager un seul état entre onglets faisait qu'une sélection sur un
  // onglet (ex: "Protéines") ne matchait plus rien en changeant d'onglet, sans aucune indication
  // visuelle de pourquoi la liste se retrouvait vide.
  const [alimentFilter, setAlimentFilter] = useState('all');
  const [recetteFilter, setRecetteFilter] = useState('all');
  const [momentFilter, setMomentFilter] = useState('all');
  const { favorites, toggleFavorite } = useNutritionFavorites();
  const { scannedAliments, addScannedProduct, removeScannedAliment } = useScannedAliments();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [scanError, setScanError] = useState<string | null>(null);
  const { entries: photoEntries, addEntry: addPhotoEntry, removeEntry: removePhotoEntry } = useMealPhotoLog();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const handleBarcodeDetected = async (barcode: string) => {
    setIsScannerOpen(false);
    setScanStatus('loading');
    setScanError(null);
    try {
      const product = await fetchProductByBarcode(barcode);
      addScannedProduct(product);
      setScanStatus('idle');
      setActiveTab('aliments');
    } catch (error) {
      setScanStatus('error');
      setScanError(
        error instanceof ProductNotFoundError
          ? 'Produit non reconnu — il n\'est pas encore référencé dans la base Open Food Facts.'
          : 'Erreur réseau pendant la recherche du produit. Réessayez.'
      );
    }
  };

  // Fond géré par PageLayout (VitalForceBackground)

  // Données des aliments - AJOUT DE 20 NOUVEAUX ALIMENTS
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
      micronutriments: ['Vitamine K', 'Folates', 'Potassium'],
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
      micronutriments: ['Oméga-3', 'B12', 'Sélénium'],
      classe: 'Anti-inflammatoire',
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
      micronutriments: ['Fer', 'Magnésium', 'Lysine'],
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
      micronutriments: ['Antioxydants', 'Vitamine C', 'Manganèse'],
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
    },
    {
      id: '50',
      nom: 'Myrtilles',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 57,
      proteines: 0.7,
      glucides: 14,
      lipides: 0.3,
      fibres: 2.4,
      micronutriments: ['Antioxydants', 'Vitamine C', 'Manganèse'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫐'
    },
    {
      id: '53',
      nom: 'Thon',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 144,
      proteines: 30,
      glucides: 0,
      lipides: 1,
      fibres: 0,
      micronutriments: ['Sélénium', 'B12', 'Niacine'],
      classe: 'Sèche',
      tags: [],
      emoji: '🐟'
    },
    {
      id: '56',
      nom: 'Riz brun',
      categorie: 'Glucides',
      ig: 'Modéré',
      calories: 111,
      proteines: 2.6,
      glucides: 23,
      lipides: 0.9,
      fibres: 1.8,
      micronutriments: ['Manganèse', 'Sélénium', 'Magnésium'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍚'
    },
    {
      id: '57',
      nom: 'Mangue',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 60,
      proteines: 0.8,
      glucides: 15,
      lipides: 0.4,
      fibres: 1.6,
      micronutriments: ['Vitamine C', 'Vitamine A', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥭'
    },
    {
      id: '58',
      nom: 'Graines de chia',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 486,
      proteines: 17,
      glucides: 42,
      lipides: 31,
      fibres: 34,
      micronutriments: ['Oméga-3', 'Calcium', 'Fer'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌱'
    },
    {
      id: '59',
      nom: 'Pomme',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 52,
      proteines: 0.3,
      glucides: 14,
      lipides: 0.2,
      fibres: 2.4,
      micronutriments: ['Vitamine C', 'Fibres', 'Antioxydants'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍎'
    },
    {
      id: '60',
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
      id: '62',
      nom: 'Noix',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 654,
      proteines: 15,
      glucides: 14,
      lipides: 65,
      fibres: 6.7,
      micronutriments: ['Oméga-3', 'Vitamine E', 'Manganèse'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜'
    },
    {
      id: '63',
      nom: 'Pommes de terre',
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
      id: '65',
      nom: 'Champignons',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 22,
      proteines: 3.1,
      glucides: 3.3,
      lipides: 0.3,
      fibres: 1,
      micronutriments: ['Sélénium', 'Vitamine D', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍄'
    },
    {
      id: '66',
      nom: 'Gingembre',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 80,
      proteines: 1.8,
      glucides: 18,
      lipides: 0.8,
      fibres: 2,
      micronutriments: ['Gingérol', 'Potassium', 'Magnésium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫚'
    },
    {
      id: '67',
      nom: 'Kiwi',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 61,
      proteines: 1.1,
      glucides: 15,
      lipides: 0.5,
      fibres: 3,
      micronutriments: ['Vitamine C', 'Vitamine K', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥝'
    },
    {
      id: '68',
      nom: 'Maquereau',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 205,
      proteines: 19,
      glucides: 0,
      lipides: 14,
      fibres: 0,
      micronutriments: ['Oméga-3', 'B12', 'Sélénium'],
      classe: 'Anti-inflammatoire',
      tags: [],
      emoji: '🐟'
    },
    {
      id: '69',
      nom: 'Sarrasin',
      categorie: 'Glucides',
      ig: 'Bas',
      calories: 343,
      proteines: 13,
      glucides: 72,
      lipides: 3.4,
      fibres: 10,
      micronutriments: ['Rutine', 'Magnésium', 'Fer'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾'
    },
    {
      id: '70',
      nom: 'Grenade',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 83,
      proteines: 1.7,
      glucides: 19,
      lipides: 1.2,
      fibres: 4,
      micronutriments: ['Antioxydants', 'Vitamine C', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍎'
    },
    {
      id: '71',
      nom: 'Noix de pécan',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 691,
      proteines: 9,
      glucides: 14,
      lipides: 72,
      fibres: 10,
      micronutriments: ['Vitamine E', 'Manganèse', 'Zinc'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜'
    },
    {
      id: '72',
      nom: 'Courgette',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 17,
      proteines: 1.2,
      glucides: 3.4,
      lipides: 0.2,
      fibres: 1,
      micronutriments: ['Vitamine C', 'Potassium', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥒'
    },
    {
      id: '74',
      nom: 'Avoine',
      categorie: 'Glucides',
      ig: 'Bas',
      calories: 389,
      proteines: 17,
      glucides: 66,
      lipides: 7,
      fibres: 11,
      micronutriments: ['Bêta-glucane', 'Magnésium', 'Zinc'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾'
    },
    {
      id: '75',
      nom: 'Cantaloup',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 34,
      proteines: 0.8,
      glucides: 8,
      lipides: 0.2,
      fibres: 0.9,
      micronutriments: ['Vitamine A', 'Vitamine C', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍈'
    },
    {
      id: '76',
      nom: 'Graines de lin',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 534,
      proteines: 18,
      glucides: 29,
      lipides: 42,
      fibres: 28,
      micronutriments: ['Oméga-3', 'Lignanes', 'Magnésium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌱'
    },
    {
      id: '79',
      nom: 'Figues',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 74,
      proteines: 0.8,
      glucides: 19,
      lipides: 0.3,
      fibres: 3,
      micronutriments: ['Calcium', 'Potassium', 'Fer'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍯'
    },
    {
      id: '80',
      nom: 'Graines de tournesol',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 584,
      proteines: 21,
      glucides: 20,
      lipides: 51,
      fibres: 9,
      micronutriments: ['Vitamine E', 'Sélénium', 'Magnésium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌻'
    },
    {
      id: '81',
      nom: 'Carotte',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 41,
      proteines: 0.9,
      glucides: 10,
      lipides: 0.2,
      fibres: 2.8,
      micronutriments: ['Bêta-carotène', 'Vitamine A', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥕'
    },
    {
      id: '82',
      nom: 'Morue',
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
      id: '83',
      nom: 'Concombre',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 16,
      proteines: 0.7,
      glucides: 4,
      lipides: 0.1,
      fibres: 0.5,
      micronutriments: ['Vitamine K', 'Potassium', 'Silice'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥒'
    },
    {
      id: '84',
      nom: 'Raisins',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 67,
      proteines: 0.6,
      glucides: 17,
      lipides: 0.4,
      fibres: 0.9,
      micronutriments: ['Resvératrol', 'Vitamine K', 'Cuivre'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍇'
    },
    {
      id: '85',
      nom: 'Graines de courge',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 559,
      proteines: 30,
      glucides: 11,
      lipides: 49,
      fibres: 6,
      micronutriments: ['Magnésium', 'Zinc', 'Fer'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🎃'
    },
    {
      id: '86',
      nom: 'Ananas',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 50,
      proteines: 0.5,
      glucides: 13,
      lipides: 0.1,
      fibres: 1.4,
      micronutriments: ['Bromélaïne', 'Vitamine C', 'Manganèse'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍍'
    },
    {
      id: '87',
      nom: 'Papaye',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 43,
      proteines: 0.5,
      glucides: 11,
      lipides: 0.3,
      fibres: 1.7,
      micronutriments: ['Papaine', 'Vitamine C', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥭'
    },
    {
      id: '88',
      nom: 'Hareng',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 158,
      proteines: 18,
      glucides: 0,
      lipides: 9,
      fibres: 0,
      micronutriments: ['Oméga-3', 'B12', 'Sélénium'],
      classe: 'Anti-inflammatoire',
      tags: [],
      emoji: '🐟'
    },
    {
      id: '89',
      nom: 'Millet',
      categorie: 'Glucides',
      ig: 'Bas',
      calories: 378,
      proteines: 11,
      glucides: 73,
      lipides: 4.2,
      fibres: 8.5,
      micronutriments: ['Magnésium', 'Phosphore', 'Fer'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾'
    },
    {
      id: '90',
      nom: 'Cassis',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 63,
      proteines: 1.4,
      glucides: 15,
      lipides: 0.4,
      fibres: 4.3,
      micronutriments: ['Antioxydants', 'Vitamine C', 'Anthocyanes'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫐'
    },
    {
      id: '91',
      nom: 'Noix de macadamia',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 718,
      proteines: 8,
      glucides: 14,
      lipides: 76,
      fibres: 9,
      micronutriments: ['Vitamine B1', 'Manganèse', 'Cuivre'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜'
    },
    {
      id: '92',
      nom: 'Aubergine',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 25,
      proteines: 1,
      glucides: 6,
      lipides: 0.2,
      fibres: 3,
      micronutriments: ['Nasunine', 'Potassium', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍆'
    },
    {
      id: '93',
      nom: 'Sardines',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 208,
      proteines: 25,
      glucides: 0,
      lipides: 11,
      fibres: 0,
      micronutriments: ['Oméga-3', 'Calcium', 'B12'],
      classe: 'Anti-inflammatoire',
      tags: [],
      emoji: '🐟'
    },
    {
      id: '94',
      nom: 'Amarante',
      categorie: 'Glucides',
      ig: 'Bas',
      calories: 371,
      proteines: 14,
      glucides: 65,
      lipides: 7,
      fibres: 7,
      micronutriments: ['Lysine', 'Magnésium', 'Fer'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾'
    },
    {
      id: '95',
      nom: 'Mûres',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 43,
      proteines: 1.4,
      glucides: 10,
      lipides: 0.5,
      fibres: 5.3,
      micronutriments: ['Antioxydants', 'Vitamine C', 'Manganèse'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫐'
    },
    {
      id: '96',
      nom: 'Graines de sésame',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 573,
      proteines: 18,
      glucides: 23,
      lipides: 50,
      fibres: 12,
      micronutriments: ['Calcium', 'Fer', 'Magnésium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌱'
    },
    {
      id: '97',
      nom: 'Tomate',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 18,
      proteines: 0.9,
      glucides: 3.9,
      lipides: 0.2,
      fibres: 1.2,
      micronutriments: ['Lycopène', 'Vitamine C', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍅'
    },
    {
      id: '98',
      nom: 'Veau',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 172,
      proteines: 25,
      glucides: 0,
      lipides: 7,
      fibres: 0,
      micronutriments: ['Fer', 'B12', 'Zinc'],
      classe: 'Sèche',
      tags: [],
      emoji: '🥩'
    },
    {
      id: '99',
      nom: 'Prunes',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 46,
      proteines: 0.7,
      glucides: 11,
      lipides: 0.3,
      fibres: 1.4,
      micronutriments: ['Antioxydants', 'Vitamine K', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍇'
    },
    {
      id: '100',
      nom: 'Noix du Brésil',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 659,
      proteines: 14,
      glucides: 12,
      lipides: 67,
      fibres: 8,
      micronutriments: ['Sélénium', 'Magnésium', 'Vitamine E'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜'
    },
    {
      id: '101',
      nom: 'Radis',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 16,
      proteines: 0.7,
      glucides: 3.4,
      lipides: 0.1,
      fibres: 1.6,
      micronutriments: ['Vitamine C', 'Folates', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥕'
    },
    {
      id: '102',
      nom: 'Agneau',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 294,
      proteines: 25,
      glucides: 0,
      lipides: 21,
      fibres: 0,
      micronutriments: ['Fer', 'B12', 'Zinc'],
      classe: 'Sèche',
      tags: [],
      emoji: '🥩'
    },
    {
      id: '103',
      nom: 'Cerises',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 50,
      proteines: 1,
      glucides: 12,
      lipides: 0.3,
      fibres: 1.6,
      micronutriments: ['Antioxydants', 'Vitamine C', 'Mélatonine'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍒'
    },
    {
      id: '104',
      nom: 'Graines de chanvre',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 553,
      proteines: 31,
      glucides: 9,
      lipides: 49,
      fibres: 4,
      micronutriments: ['Oméga-3', 'Magnésium', 'Fer'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌱'
    },
    {
      id: '105',
      nom: 'Betterave',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 43,
      proteines: 1.6,
      glucides: 10,
      lipides: 0.2,
      fibres: 2.8,
      micronutriments: ['Nitrates', 'Folates', 'Potassium'],
      classe: 'Boost performance',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥕'
    },
    {
      id: '106',
      nom: 'Poulet',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 165,
      proteines: 31,
      glucides: 0,
      lipides: 3.6,
      fibres: 0,
      micronutriments: ['Sélénium', 'B3', 'B6'],
      classe: 'Sèche',
      tags: [],
      emoji: '🐔'
    }
  ];

  // Filtres pour aliments
  const alimentFilters = [
    { value: 'all', label: 'Tous', icon: Apple },
    { value: 'protéines', label: 'Protéines', icon: Target },
    { value: 'glucides', label: 'Glucides', icon: Zap },
    { value: 'lipides', label: 'Lipides', icon: Droplet },
    { value: 'micronutriments', label: 'Micronutriments', icon: Star }
  ];

  // Filtres pour recettes (par objectif nutritionnel)
  const recetteFilters = [
    { value: 'all', label: 'Toutes', icon: ChefHat },
    { value: 'prise de masse', label: 'Prise de masse', icon: Target },
    { value: 'sèche', label: 'Sèche', icon: Zap },
    { value: 'récupération', label: 'Récupération', icon: Heart },
    { value: 'anti-inflammatoire', label: 'Anti-inflammatoire', icon: Star },
    { value: 'équilibre', label: 'Équilibre', icon: Scale }
  ];

  // Filtres par moment de la journée (tags) — ce que l'onglet "Repas" offrait avant sa fusion avec
  // les recettes, pour ne pas perdre la possibilité de parcourir par petit-déj/déjeuner/dîner/collation.
  const momentFilters = [
    { value: 'all', label: 'Tous les moments', icon: Clock },
    { value: 'petit-déjeuner', label: 'Petit-déjeuner', icon: Clock },
    { value: 'déjeuner', label: 'Déjeuner', icon: ChefHat },
    { value: 'dîner', label: 'Dîner', icon: ChefHat },
    { value: 'collation', label: 'Collation', icon: Apple },
    { value: 'post-training', label: 'Post-training', icon: Zap }
  ];

  // Filtrer les aliments (base + ceux ajoutés via le scanner de code-barres)
  const allAliments = [...scannedAliments, ...aliments];
  const filteredAliments = allAliments.filter(aliment => {
    const matchesSearch = aliment.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = alimentFilter === 'all' || aliment.categorie.toLowerCase() === alimentFilter;
    return matchesSearch && matchesFilter;
  });

  // Filtrer les recettes
  const filteredRecettes = RECETTES.filter((recette) => {
    const matchesSearch = recette.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = recetteFilter === 'all' || recette.classe.toLowerCase() === recetteFilter;
    const matchesMoment = momentFilter === 'all' || recette.tags.includes(momentFilter);
    return matchesSearch && matchesFilter && matchesMoment;
  });

  // Couleur pour l'index glycémique
  const getIGColor = (ig: string) => {
    switch (ig) {
      case 'Bas': return 'bg-green-500/15 border border-green-500/25 text-green-300';
      case 'Modéré': return 'bg-yellow-500/15 border border-yellow-500/25 text-yellow-300';
      case 'Élevé': return 'bg-red-500/15 border border-red-500/25 text-red-300';
      default: return 'bg-white/5 text-foreground';
    }
  };

  // Couleur pour la classe nutritionnelle
  const getClasseColor = (classe: string) => {
    switch (classe) {
      case 'Prise de masse': return 'bg-blue-500/15 border border-blue-500/25 text-blue-300';
      case 'Sèche': return 'bg-red-500/15 border border-red-500/25 text-red-300';
      case 'Récupération': return 'bg-green-500/15 border border-green-500/25 text-green-300';
      case 'Anti-inflammatoire': return 'bg-purple-500/15 border border-purple-500/25 text-purple-300';
      case 'Boost performance': return 'bg-orange-500/15 border border-orange-500/25 text-orange-300';
      default: return 'bg-white/5 text-foreground';
    }
  };

  return (
    <div className="relative">
      <div className="container mx-auto space-y-4 md:space-y-6 p-4 md:p-6 relative z-10 page-transition">
        <div className="stagger-animation">
      {/* Header VitalForce DA */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-[var(--shadow-glow-purple)] glass-card border border-primary/30">
        <div className="absolute inset-0 gradient-primary opacity-80"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-secondary/20 to-transparent rounded-full -translate-y-24 translate-x-24 animate-pulse-slow"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Apple className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl md:text-4xl font-bold truncate">Nutrition</h1>
              <p className="text-white/80 truncate">Gérez votre alimentation</p>
            </div>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold border border-white/30">
            <Plus className="h-4 w-4 mr-2" />
            Créer un repas
          </Button>
        </div>
      </div>

      {/* Recherche */}
      <Card className="glass-card border-primary/20 border-0 shadow-lg">
        <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/70 h-5 w-5" />
                <Input
                placeholder="Rechercher un aliment ou un repas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-white/10 focus:border-primary glass-card border-primary/20"
              />
            </div>
          </CardContent>
        </Card>

      {/* Journal photo — aide-mémoire visuel, pas d'estimation automatique (voir MealPhotoModal) */}
      <Card className="glass-card border-primary/20 border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Camera className="h-5 w-5 text-secondary" />
              Journal photo des repas
            </CardTitle>
            <Button onClick={() => setIsPhotoModalOpen(true)} variant="outline" size="sm">
              <ImagePlus className="h-4 w-4 mr-2" />
              Ajouter une photo
            </Button>
          </div>
        </CardHeader>
        {photoEntries.length > 0 && (
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {photoEntries.map((entry) => (
                <div key={entry.id} className="relative shrink-0 w-32">
                  <img src={entry.imageDataUrl} alt={entry.nom} className="w-32 h-32 object-cover rounded-xl" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePhotoEntry(entry.id)}
                    className="absolute top-1 right-1 p-1 h-7 w-7 bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                  <p className="text-xs font-medium text-foreground truncate mt-1">{entry.nom}</p>
                  {entry.calories != null && (
                    <p className="text-[10px] text-muted-foreground">{entry.calories} kcal</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="aliments" className="flex items-center gap-2">
            <Apple className="h-4 w-4" />
            Aliments ({filteredAliments.length})
            </TabsTrigger>
          <TabsTrigger value="recettes" className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            Recettes ({filteredRecettes.length})
          </TabsTrigger>
          </TabsList>

        {/* Onglet Aliments */}
        <TabsContent value="aliments" className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <FilterChipRow filters={alimentFilters} selected={alimentFilter} onSelect={setAlimentFilter} />
            <Button
              onClick={() => setIsScannerOpen(true)}
              disabled={scanStatus === 'loading'}
              className="bg-gradient-to-r from-primary to-secondary text-white shrink-0"
            >
              {scanStatus === 'loading' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ScanLine className="h-4 w-4 mr-2" />
              )}
              Scanner un aliment
            </Button>
          </div>

          {scanStatus === 'error' && scanError && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/25 text-sm text-destructive flex items-center justify-between gap-3">
              <span>{scanError}</span>
              <Button variant="ghost" size="sm" onClick={() => setScanStatus('idle')} className="h-7 px-2 text-destructive">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Liste des aliments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAliments.map((aliment) => {
              const isScanned = 'scanne' in aliment && aliment.scanne;
              return (
              <Card
                key={aliment.id}
                className="glass-card border-primary/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => { if (!isScanned) navigate(`/aliment/${aliment.id}`); }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="text-3xl md:text-4xl mb-2">{aliment.emoji}</div>
                    <div className="flex items-center gap-1">
                      {isScanned && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); removeScannedAliment(aliment.id); }}
                          className="p-2 text-muted-foreground/70 hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(aliment.id); }}
                        className={`p-2 ${
                          favorites.includes(aliment.id)
                            ? 'text-red-500'
                            : 'text-muted-foreground/70 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(aliment.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-foreground text-xl">{aliment.nom}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-blue-300 text-blue-300 bg-blue-500/10">
                      {aliment.categorie}
                      </Badge>
                    {isScanned ? (
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        <ScanLine className="h-3 w-3 mr-1" />
                        Scanné
                      </Badge>
                    ) : (
                      <Badge className={getIGColor(aliment.ig)}>
                        IG {aliment.ig}
                      </Badge>
                    )}
                      </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <MacroStatsGrid
                      calories={aliment.calories}
                      proteines={aliment.proteines}
                      glucides={aliment.glucides}
                      lipides={aliment.lipides}
                    />

                    {/* Classe nutritionnelle */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Classe</span>
                      <Badge className={getClasseColor(aliment.classe)}>
                        {aliment.classe}
                        </Badge>
                    </div>

                    {/* Tags */}
                    {aliment.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {aliment.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs text-muted-foreground">
                            {tag}
                        </Badge>
                        ))}
                      </div>
                    )}

                    {/* Micronutriments */}
                    {aliment.micronutriments.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-foreground/90 mb-1">Micronutriments :</p>
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
              );
            })}
              </div>
          </TabsContent>

        {/* Onglet Recettes */}
        <TabsContent value="recettes" className="space-y-4">
          <FilterChipRow filters={recetteFilters} selected={recetteFilter} onSelect={setRecetteFilter} />
          <FilterChipRow filters={momentFilters} selected={momentFilter} onSelect={setMomentFilter} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecettes.map((recette) => {
              const macros = calculerMacrosRecette(recette);
              return (
                <Card
                  key={recette.id}
                  className="glass-card border-primary/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/recette/${recette.id}`)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="text-3xl md:text-4xl mb-2">{recette.emoji}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(recette.id); }}
                        className={`p-2 ${
                          favorites.includes(recette.id)
                            ? 'text-red-500'
                            : 'text-muted-foreground/70 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(recette.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    <CardTitle className="text-foreground text-xl">{recette.nom}</CardTitle>
                    <p className="text-sm text-muted-foreground">{recette.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getClasseColor(recette.classe)}>{recette.classe}</Badge>
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {recette.tempsPreparation} min
                      </Badge>
                      <Badge variant="outline" className="text-xs text-muted-foreground capitalize">
                        {recette.difficulte}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <MacroStatsGrid
                        calories={macros.calories}
                        proteines={macros.proteines}
                        glucides={macros.glucides}
                        lipides={macros.lipides}
                      />

                      <div>
                        <p className="text-sm font-medium text-foreground/90 mb-2">Ingrédients :</p>
                        <div className="space-y-1">
                          {recette.ingredients.map((ing, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{ing.aliment.nom}</span>
                              <span className="font-medium text-foreground">{ing.quantite}{ing.unite}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {recette.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {recette.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-muted-foreground">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold">
                        <ChefHat className="h-4 w-4 mr-2" />
                        Voir la recette
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        </Tabs>
        </div>
      </div>

      {isScannerOpen && (
        <Suspense fallback={null}>
          <BarcodeScannerModal
            onClose={() => setIsScannerOpen(false)}
            onDetected={handleBarcodeDetected}
          />
        </Suspense>
      )}

      {isPhotoModalOpen && (
        <MealPhotoModal
          onClose={() => setIsPhotoModalOpen(false)}
          onSave={addPhotoEntry}
        />
      )}
    </div>
  );
};

export default Nutrition;