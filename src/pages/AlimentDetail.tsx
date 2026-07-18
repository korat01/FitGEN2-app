import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Plus, Star, Target, Zap } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNutritionFavorites } from '@/hooks/useNutritionFavorites';

const AlimentDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useNutritionFavorites();

  // Base de données complète des aliments
  const alimentsDatabase = {
    '1': {
      id: '1',
      nom: 'Riz basmati',
      categorie: 'Glucides',
      ig: 'Modéré',
      calories: 130,
      proteines: 2.7,
      glucides: 28,
      lipides: 0.3,
      fibres: 1,
      micronutriments: ['Fer', 'Magnésium', 'Phosphore'],
      classe: 'Prise de masse',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍚',
      description: 'Riz basmati, une variété de riz à grain long originaire d\'Inde, réputé pour son arôme délicat et sa texture légère.',
      avantages: [
        'Source d\'énergie durable',
        'Facile à digérer',
        'Riche en glucides complexes',
        'Faible en gras'
      ],
      conseils: [
        'Rincer le riz avant la cuisson',
        'Cuire dans un volume d\'eau 1,5 fois supérieur',
        'Laisser reposer 5 minutes après cuisson',
        'Conserver dans un endroit sec et frais'
      ]
    },
    '2': {
      id: '2',
      nom: 'Poulet grillé',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 165,
      proteines: 31,
      glucides: 0,
      lipides: 3.6,
      fibres: 0,
      micronutriments: ['Fer', 'Zinc', 'B12', 'Niacine'],
      classe: 'Prise de masse',
      tags: ['Halal'],
      emoji: '🍗',
      description: 'Viande de poulet grillée, source excellente de protéines complètes et de vitamines B.',
      avantages: [
        'Protéines complètes de haute qualité',
        'Faible en calories',
        'Riche en vitamines B',
        'Facile à digérer'
      ],
      conseils: [
        'Mariner 30 min avant cuisson',
        'Cuire à feu moyen pour éviter le dessèchement',
        'Vérifier la cuisson avec un thermomètre',
        'Laisser reposer avant de découper'
      ]
    },
    '3': {
      id: '3',
      nom: 'Brocoli',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 34,
      proteines: 2.8,
      glucides: 7,
      lipides: 0.4,
      fibres: 2.6,
      micronutriments: ['Vitamine C', 'K', 'Folates', 'Sulforaphane'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥦',
      description: 'Légume crucifère riche en vitamines et composés anti-cancer.',
      avantages: [
        'Riche en vitamine C et K',
        'Composés anti-cancer',
        'Faible en calories',
        'Riche en fibres'
      ],
      conseils: [
        'Cuire à la vapeur 5-7 minutes',
        'Ne pas trop cuire pour garder les nutriments',
        'Conserver au réfrigérateur',
        'Manger cru ou légèrement cuit'
      ]
    },
    '4': {
      id: '4',
      nom: 'Avocat',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 160,
      proteines: 2,
      glucides: 9,
      lipides: 15,
      fibres: 7,
      micronutriments: ['Potassium', 'Folates', 'K', 'Magnésium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥑',
      description: 'Fruit riche en acides gras monoinsaturés et en potassium.',
      avantages: [
        'Acides gras monoinsaturés',
        'Riche en potassium',
        'Fibres solubles',
        'Vitamines liposolubles'
      ],
      conseils: [
        'Choisir un avocat légèrement mou',
        'Conserver à température ambiante',
        'Arroser de citron pour éviter l\'oxydation',
        'Manger rapidement une fois ouvert'
      ]
    },
    '5': {
      id: '5',
      nom: 'Banane',
      categorie: 'Glucides',
      ig: 'Élevé',
      calories: 89,
      proteines: 1.1,
      glucides: 23,
      lipides: 0.3,
      fibres: 2.6,
      micronutriments: ['Potassium', 'B6', 'Vitamine C'],
      classe: 'Boost performance',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍌',
      description: 'Fruit riche en potassium et énergie rapide, idéal avant l\'effort.',
      avantages: [
        'Énergie rapide disponible',
        'Riche en potassium',
        'Facile à transporter',
        'Naturellement sucré'
      ],
      conseils: [
        'Manger mûre pour plus de sucre',
        'Idéal avant l\'entraînement',
        'Conserver à température ambiante',
        'Congeler pour smoothies'
      ]
    },
    '6': {
      id: '6',
      nom: 'Saumon',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 208,
      proteines: 25,
      glucides: 0,
      lipides: 12,
      fibres: 0,
      micronutriments: ['Oméga-3', 'B12', 'D', 'Sélénium'],
      classe: 'Récupération',
      tags: [],
      emoji: '🐟',
      description: 'Poisson gras riche en oméga-3 et protéines de haute qualité.',
      avantages: [
        'Oméga-3 anti-inflammatoires',
        'Protéines complètes',
        'Vitamine D',
        'Sélénium antioxydant'
      ],
      conseils: [
        'Cuire à feu moyen',
        'Ne pas trop cuire pour garder la tendreté',
        'Mariner avec citron et herbes',
        'Choisir du saumon sauvage'
      ]
    },
    '7': {
      id: '7',
      nom: 'Œufs entiers',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 155,
      proteines: 13,
      glucides: 1.1,
      lipides: 11,
      fibres: 0,
      micronutriments: ['B12', 'Choline', 'Sélénium', 'Lutéine'],
      classe: 'Prise de masse',
      tags: [],
      emoji: '🥚',
      description: 'Protéines complètes de référence avec tous les acides aminés essentiels.',
      avantages: [
        'Protéines complètes de référence',
        'Riche en choline',
        'Tous les acides aminés essentiels',
        'Biodisponibilité élevée'
      ],
      conseils: [
        'Cuire à feu doux pour éviter le caoutchouc',
        'Battre avant cuisson pour plus de volume',
        'Conserver au réfrigérateur',
        'Vérifier la fraîcheur dans l\'eau'
      ]
    },
    '8': {
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
      emoji: '🍠',
      description: 'Tubercule riche en bêta-carotène et glucides complexes.',
      avantages: [
        'Bêta-carotène antioxydant',
        'Glucides complexes',
        'Riche en potassium',
        'Index glycémique modéré'
      ],
      conseils: [
        'Cuire avec la peau pour garder les nutriments',
        'Rôtir au four pour plus de saveur',
        'Conserver dans un endroit frais et sombre',
        'Éviter le réfrigérateur'
      ]
    },
    '9': {
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
      emoji: '🌰',
      description: 'Fruit à coque riche en vitamine E et magnésium.',
      avantages: [
        'Vitamine E antioxydante',
        'Magnésium pour les muscles',
        'Acides gras monoinsaturés',
        'Riche en fibres'
      ],
      conseils: [
        'Tremper 4h pour améliorer la digestibilité',
        'Conserver dans un endroit frais',
        'Manger avec la peau',
        'Limiter à une poignée par jour'
      ]
    },
    '10': {
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
      emoji: '🥬',
      description: 'Légume vert riche en fer et folates, excellent pour la santé.',
      avantages: [
        'Riche en fer végétal',
        'Folates pour la division cellulaire',
        'Vitamine K pour les os',
        'Lutéine pour les yeux'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec vitamine C pour l\'absorption du fer',
        'Laver soigneusement',
        'Conserver au réfrigérateur'
      ]
    },
    '11': {
      id: '11',
      nom: 'Thon en conserve',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 116,
      proteines: 26,
      glucides: 0,
      lipides: 0.8,
      fibres: 0,
      micronutriments: ['Sélénium', 'B12', 'Niacine', 'Phosphore'],
      classe: 'Sèche',
      tags: [],
      emoji: '🐟',
      description: 'Poisson maigre en conserve, riche en protéines et pauvre en calories.',
      avantages: [
        'Protéines maigres de qualité',
        'Faible en calories',
        'Riche en sélénium',
        'Facile à conserver'
      ],
      conseils: [
        'Choisir au naturel plutôt qu\'à l\'huile',
        'Égoutter avant utilisation',
        'Conserver au frais après ouverture',
        'Utiliser dans les 2 jours après ouverture'
      ]
    },
    '12': {
      id: '12',
      nom: 'Quinoa',
      categorie: 'Glucides',
      ig: 'Bas',
      calories: 120,
      proteines: 4.4,
      glucides: 22,
      lipides: 1.9,
      fibres: 2.8,
      micronutriments: ['Fer', 'Magnésium', 'Phosphore', 'Manganèse'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾',
      description: 'Céréale complète avec protéines complètes, idéale pour les sportifs.',
      avantages: [
        'Protéines complètes',
        'Sans gluten',
        'Riche en minéraux',
        'Index glycémique bas'
      ],
      conseils: [
        'Rincer avant cuisson pour enlever l\'amertume',
        'Cuire dans un volume d\'eau 2 fois supérieur',
        'Laisser gonfler 15 minutes',
        'Conserver dans un endroit sec'
      ]
    },
    '13': {
      id: '13',
      nom: 'Myrtilles',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 57,
      proteines: 0.7,
      glucides: 14,
      lipides: 0.3,
      fibres: 2.4,
      micronutriments: ['Antioxydants', 'Vitamine C', 'K', 'Manganèse'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫐',
      description: 'Petits fruits riches en antioxydants et composés anti-inflammatoires.',
      avantages: [
        'Antioxydants puissants',
        'Anti-inflammatoire naturel',
        'Faible en calories',
        'Riche en vitamine C'
      ],
      conseils: [
        'Choisir des myrtilles fermes et colorées',
        'Laver juste avant consommation',
        'Conserver au réfrigérateur',
        'Congeler pour smoothies'
      ]
    },
    '14': {
      id: '14',
      nom: 'Yaourt grec',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 59,
      proteines: 10,
      glucides: 3.6,
      lipides: 0.4,
      fibres: 0,
      micronutriments: ['Probiotiques', 'Calcium', 'B12', 'Phosphore'],
      classe: 'Récupération',
      tags: [],
      emoji: '🥛',
      description: 'Yaourt épais et crémeux, riche en protéines et probiotiques.',
      avantages: [
        'Probiotiques pour la flore intestinale',
        'Protéines de qualité',
        'Calcium pour les os',
        'Texture crémeuse'
      ],
      conseils: [
        'Choisir nature sans sucre ajouté',
        'Conserver au réfrigérateur',
        'Utiliser comme base pour smoothies',
        'Ajouter des fruits frais'
      ]
    },
    '15': {
      id: '15',
      nom: 'Chocolat noir 85%',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 546,
      proteines: 7.8,
      glucides: 46,
      lipides: 31,
      fibres: 11,
      micronutriments: ['Magnésium', 'Fer', 'Antioxydants', 'Théobromine'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan'],
      emoji: '🍫',
      description: 'Chocolat riche en cacao avec de nombreux antioxydants et minéraux.',
      avantages: [
        'Antioxydants puissants',
        'Magnésium pour les muscles',
        'Théobromine stimulante',
        'Faible en sucre'
      ],
      conseils: [
        'Choisir minimum 70% de cacao',
        'Conserver dans un endroit frais',
        'Manger avec modération',
        'Éviter le chocolat au lait'
      ]
    },
    '16': {
      id: '16',
      nom: 'Graines de chia',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 486,
      proteines: 17,
      glucides: 42,
      lipides: 31,
      fibres: 34,
      micronutriments: ['Oméga-3', 'Calcium', 'Magnésium', 'Phosphore'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌱',
      description: 'Petites graines riches en oméga-3 et fibres solubles.',
      avantages: [
        'Oméga-3 végétaux',
        'Fibres solubles',
        'Calcium végétal',
        'Gélifiant naturel'
      ],
      conseils: [
        'Tremper 10 minutes avant consommation',
        'Ajouter aux smoothies',
        'Conserver dans un endroit sec',
        'Utiliser comme épaississant'
      ]
    },
    '17': {
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
      emoji: '🌾',
      description: 'Céréale complète riche en fibres et protéines, idéale pour le petit-déjeuner.',
      avantages: [
        'Fibres solubles pour la satiété',
        'Protéines végétales',
        'Bêta-glucanes pour le cholestérol',
        'Énergie durable'
      ],
      conseils: [
        'Cuire dans du lait pour plus de protéines',
        'Ajouter des fruits frais',
        'Conserver dans un endroit sec',
        'Manger chaud ou froid'
      ]
    },
    '18': {
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
      emoji: '🧀',
      description: 'Fromage blanc léger et crémeux, riche en calcium et vitamines B.',
      avantages: [
        'Calcium pour les os',
        'Vitamines B pour la santé',
        'Faible en calories',
        'Texture crémeuse'
      ],
      conseils: [
        'Choisir au naturel sans sucre ajouté',
        'Conserver au réfrigérateur',
        'Utiliser comme base pour smoothies',
        'Ajouter des fruits frais'
      ]
    },
    '19': {
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
      emoji: '🫘',
      description: 'Légumineuse riche en protéines, fer et folates, idéale pour la santé.',
      avantages: [
        'Protéines végétales',
        'Fer pour la formation des globules rouges',
        'Folates pour la santé des cellules',
        'Faible en calories'
      ],
      conseils: [
        'Cuire à la vapeur ou à l\'étouffée',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger cru ou légèrement cuit'
      ]
    },
    '20': {
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
      emoji: '🍎',
      description: 'Fruit riche en vitamine C, potassium et fibres, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Fibres pour la digestion',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru pour les vitamines',
        'Conserver à température ambiante',
        'Arroser de jus de citron',
        'Manger rapidement'
      ]
    },
    '21': {
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
      emoji: '🥜',
      description: 'Noix riche en oméga-3, zinc et cuivre, excellent pour la santé.',
      avantages: [
        'Oméga-3 anti-inflammatoires',
        'Zinc pour la santé des os',
        'Cuivre pour la formation des globules rouges',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou grillé',
        'Conserver dans un endroit frais',
        'Arroser de jus de citron',
        'Manger avec modération'
      ]
    },
    '22': {
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
      emoji: '🫑',
      description: 'Légume riche en vitamine C, A et B6, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'A pour la santé des yeux',
        'B6 pour la santé nerveuse',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '23': {
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
      emoji: '🦐',
      description: 'Poisson riche en protéines, sélénium et vitamine B12, idéal pour la santé.',
      avantages: [
        'Protéines végétales',
        'Sélénium pour la santé des os',
        'Vitamine B12 pour la santé nerveuse',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou grillé',
        'Conserver au réfrigérateur',
        'Arroser de jus de citron',
        'Manger avec modération'
      ]
    },
    '24': {
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
      emoji: '🥭',
      description: 'Fruit riche en vitamine C, A et folates, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'A pour la santé des yeux',
        'Folates pour la santé nerveuse',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '25': {
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
      emoji: '🥥',
      description: 'Huile végétale riche en acides gras saturés, idéale pour la santé.',
      avantages: [
        'Acides gras saturés pour la santé des os',
        'Faible en calories',
        'Texture légère',
        'Utilisation universelle'
      ],
      conseils: [
        'Utiliser comme base pour les plats salés',
        'Mélanger avec des légumes',
        'Conserver au réfrigérateur',
        'Éviter le surchauffe'
      ]
    },
    '26': {
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
      emoji: '🥬',
      description: 'Légume vert riche en vitamine K, C, A et calcium, idéal pour la santé.',
      avantages: [
        'Vitamine K pour la santé des os',
        'Vitamine C pour la santé des os',
        'Vitamine A pour la santé des yeux',
        'Calcium pour la santé des os'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '27': {
      id: '27',
      nom: 'Haricots verts',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 31,
      proteines: 1.8,
      glucides: 7,
      lipides: 0.1,
      fibres: 2.7,
      micronutriments: ['Vitamine K', 'C', 'Folates', 'Manganèse'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫛',
      description: 'Légume vert croquant riche en vitamines et minéraux.',
      avantages: [
        'Riche en vitamine K pour les os',
        'Vitamine C antioxydante',
        'Faible en calories',
        'Fibres pour la digestion'
      ],
      conseils: [
        'Cuire à la vapeur 5-7 minutes',
        'Garder le croquant',
        'Conserver au réfrigérateur',
        'Manger frais de préférence'
      ]
    },
    '28': {
      id: '28',
      nom: 'Noix de Grenoble',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 654,
      proteines: 15,
      glucides: 14,
      lipides: 65,
      fibres: 6.7,
      micronutriments: ['Oméga-3', 'Vitamine E', 'Magnésium', 'Cuivre'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌰',
      description: 'Fruit à coque riche en oméga-3 et vitamine E.',
      avantages: [
        'Oméga-3 pour le cerveau',
        'Vitamine E antioxydante',
        'Magnésium pour les muscles',
        'Protéines végétales'
      ],
      conseils: [
        'Conserver dans un endroit frais',
        'Manger avec la peau',
        'Limiter à une poignée par jour',
        'Éviter les noix salées'
      ]
    },
    '29': {
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
      emoji: '🦃',
      description: 'Viande de dinde riche en protéines et sélénium.',
      avantages: [
        'Protéines complètes',
        'Faible en calories',
        'Riche en sélénium',
        'Facile à digérer'
      ],
      conseils: [
        'Mariner 30 min avant cuisson',
        'Cuire à feu moyen',
        'Vérifier la cuisson',
        'Laisser reposer'
      ]
    },
    '30': {
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
      emoji: '🥔',
      description: 'Tubercule riche en glucides et potassium, idéal pour la santé.',
      avantages: [
        'Glucides complexes',
        'Riche en potassium',
        'Vitamine C pour la santé des os',
        'Faible en calories'
      ],
      conseils: [
        'Cuire avec la peau pour garder les nutriments',
        'Rôtir au four pour plus de saveur',
        'Conserver dans un endroit frais',
        'Éviter le réfrigérateur'
      ]
    },
    '31': {
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
      emoji: '🥝',
      description: 'Fruit riche en vitamine C, potassium et fibres, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Fibres pour la digestion',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru pour les vitamines',
        'Conserver à température ambiante',
        'Arroser de jus de citron',
        'Manger rapidement'
      ]
    },
    '32': {
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
      emoji: '☕',
      description: 'Boisson stimulante riche en caféine et antioxydants.',
      avantages: [
        'Caféine pour l\'énergie',
        'Antioxydants pour la santé',
        'Faible en calories',
        'Utilisation universelle'
      ],
      conseils: [
        'Infuser 1-2 cuillères à café par jour',
        'Éviter le surchauffe',
        'Manger avec modération',
        'Éviter le café au lait'
      ]
    },
    '33': {
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
      emoji: '🍵',
      description: 'Boisson relaxante riche en antioxydants et catéchines.',
      avantages: [
        'Catéchines pour l\'équilibre',
        'L-théanine pour le calme',
        'Antioxydants pour la santé',
        'Faible en calories'
      ],
      conseils: [
        'Infuser 1-2 cuillères à café par jour',
        'Éviter le surchauffe',
        'Manger avec modération',
        'Éviter le thé au lait'
      ]
    },
    '34': {
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
      emoji: '🍯',
      description: 'Sirop naturel riche en antioxydants et enzymes, idéal pour la santé.',
      avantages: [
        'Antioxydants puissants',
        'Enzymes pour la digestion',
        'Faible en calories',
        'Riche en glucides'
      ],
      conseils: [
        'Utiliser 1-2 cuillères à soupe par jour',
        'Éviter le surchauffe',
        'Manger avec modération',
        'Éviter le miel au lait'
      ]
    },
    '35': {
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
      emoji: '🫚',
      description: 'Racine riche en antioxydants et gingérol, idéale pour la santé.',
      avantages: [
        'Antioxydants puissants',
        'Gingérol pour la santé',
        'Faible en calories',
        'Riche en glucides'
      ],
      conseils: [
        'Utiliser 1-2 gousses par jour',
        'Éviter le surchauffe',
        'Manger avec modération',
        'Éviter le gingembre au lait'
      ]
    },
    '36': {
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
      emoji: '🧄',
      description: 'Ail riche en antioxydants, allicine et sélénium, idéal pour la santé.',
      avantages: [
        'Antioxydants puissants',
        'Allicine pour la santé',
        'Sélénium pour la santé des os',
        'Faible en calories'
      ],
      conseils: [
        'Utiliser 1-2 gousses par jour',
        'Éviter le surchauffe',
        'Manger avec modération',
        'Éviter l\'ail au lait'
      ]
    },
    '37': {
      id: '37',
      nom: 'Céleri',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 16,
      proteines: 0.7,
      glucides: 3,
      lipides: 0.2,
      fibres: 1.6,
      micronutriments: ['Vitamine K', 'Potassium', 'Folates', 'Vitamine C'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥬',
      description: 'Légume croquant riche en eau et minéraux, parfait pour la détox.',
      avantages: [
        'Riche en eau pour l\'hydratation',
        'Vitamine K pour les os',
        'Potassium pour les muscles',
        'Très peu calorique'
      ],
      conseils: [
        'Manger cru pour garder les nutriments',
        'Conserver au réfrigérateur',
        'Ajouter aux salades',
        'Utiliser dans les soupes'
      ]
    },
    '38': {
      id: '38',
      nom: 'Pistaches',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 560,
      proteines: 20,
      glucides: 28,
      lipides: 45,
      fibres: 10,
      micronutriments: ['Vitamine B6', 'Thiamine', 'Phosphore', 'Cuivre'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜',
      description: 'Fruit à coque vert riche en protéines et vitamines B.',
      avantages: [
        'Protéines végétales complètes',
        'Vitamines B pour l\'énergie',
        'Phosphore pour les os',
        'Fibres pour la satiété'
      ],
      conseils: [
        'Choisir non salées',
        'Conserver dans un endroit frais',
        'Manger avec modération',
        'Ajouter aux salades'
      ]
    },
    '39': {
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
      emoji: '🐟',
      description: 'Poisson maigre en conserve, riche en protéines et pauvre en calories.',
      avantages: [
        'Protéines maigres de qualité',
        'Faible en calories',
        'Riche en sélénium',
        'Facile à conserver'
      ],
      conseils: [
        'Choisir au naturel plutôt qu\'à l\'huile',
        'Égoutter avant utilisation',
        'Conserver au frais après ouverture',
        'Utiliser dans les 2 jours après ouverture'
      ]
    },
    '40': {
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
      emoji: '🍝',
      description: 'Pâtes complètes riche en fer, magnésium et vitamine B1, idéales pour la santé.',
      avantages: [
        'Protéines végétales',
        'Fer pour la formation des globules rouges',
        'Vitamine B1 pour l\'énergie',
        'Faible en calories'
      ],
      conseils: [
        'Cuire al dente',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger cru ou légèrement cuit'
      ]
    },
    '41': {
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
      emoji: '🫐',
      description: 'Petits fruits riches en antioxydants et vitamine C, idéaux pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Manganèse pour les muscles',
        'Antioxydants pour la santé',
        'Faible en calories'
      ],
      conseils: [
        'Choisir des framboises fermes et colorées',
        'Laver juste avant consommation',
        'Conserver au réfrigérateur',
        'Congeler pour smoothies'
      ]
    },
    '42': {
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
      emoji: '🌿',
      description: 'Épice riche en fer, magnésium et calcium, idéale pour la santé.',
      avantages: [
        'Fer pour la formation des globules rouges',
        'Magnésium pour les muscles',
        'Calcium pour les os',
        'Faible en calories'
      ],
      conseils: [
        'Utiliser 1-2 cuillères à café par jour',
        'Éviter le surchauffe',
        'Manger avec modération',
        'Éviter le cumin au lait'
      ]
    },
    '43': {
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
      emoji: '🧀',
      description: 'Tofu riche en calcium, fer et isoflavones, idéal pour la santé.',
      avantages: [
        'Calcium pour les os',
        'Fer pour la formation des globules rouges',
        'Isoflavones pour l\'équilibre hormonal',
        'Faible en calories'
      ],
      conseils: [
        'Utiliser 1-2 blocs par jour',
        'Éviter le surchauffe',
        'Manger avec modération',
        'Éviter le tofu au lait'
      ]
    },
    '44': {
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
      emoji: '🍊',
      description: 'Fruit riche en vitamine C, folates et potassium, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Folates pour la santé nerveuse',
        'Potassium pour la santé cardiaque',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru pour les vitamines',
        'Conserver à température ambiante',
        'Arroser de jus de citron',
        'Manger rapidement'
      ]
    },
    '45': {
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
      emoji: '🟡',
      description: 'Épice riche en curcumine, fer et manganèse, idéale pour la santé.',
      avantages: [
        'Curcumine pour l\'anti-inflammatoire',
        'Fer pour la formation des globules rouges',
        'Manganèse pour les muscles',
        'Faible en calories'
      ],
      conseils: [
        'Utiliser 1-2 cuillères à café par jour',
        'Éviter le surchauffe',
        'Manger avec modération',
        'Éviter le curcuma au lait'
      ]
    },
    '46': {
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
      emoji: '🥥',
      description: 'Lait végétal riche en manganèse, cuivre et sélénium, idéal pour la santé.',
      avantages: [
        'Manganèse pour les muscles',
        'Cuivre pour la formation des globules rouges',
        'Sélénium pour la santé des os',
        'Faible en calories'
      ],
      conseils: [
        'Utiliser 1-2 cuillères à soupe par jour',
        'Éviter le surchauffe',
        'Manger avec modération',
        'Éviter le lait de coco au lait'
      ]
    },
    '47': {
      id: '47',
      nom: 'Avocat',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 160,
      proteines: 2,
      glucides: 9,
      lipides: 15,
      fibres: 7,
      micronutriments: ['Vitamine K', 'Folates', 'Potassium', 'Vitamine E'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥑',
      description: 'Fruit crémeux riche en graisses monoinsaturées, excellent pour la santé cardiovasculaire.',
      avantages: [
        'Graisses monoinsaturées saines',
        'Riche en fibres pour la satiété',
        'Vitamine K pour les os',
        'Potassium pour la tension artérielle'
      ],
      conseils: [
        'Choisir des avocats mûrs',
        'Conserver au réfrigérateur',
        'Ajouter aux salades',
        'Utiliser en remplacement du beurre'
      ]
    },
    '48': {
      id: '48',
      nom: 'Saumon',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 208,
      proteines: 25,
      glucides: 0,
      lipides: 12,
      fibres: 0,
      micronutriments: ['Oméga-3', 'B12', 'Sélénium', 'Niacine'],
      classe: 'Anti-inflammatoire',
      tags: [],
      emoji: '🐟',
      description: 'Poisson gras riche en oméga-3, excellent pour le cerveau et le cœur.',
      avantages: [
        'Oméga-3 pour le cerveau',
        'Protéines complètes',
        'Vitamine B12 pour les nerfs',
        'Sélénium antioxydant'
      ],
      conseils: [
        'Préférer le saumon sauvage',
        'Cuire à la vapeur ou grillé',
        'Éviter la surcuisson',
        'Consommer 2-3 fois par semaine'
      ]
    },
    '49': {
      id: '49',
      nom: 'Quinoa',
      categorie: 'Glucides',
      ig: 'Bas',
      calories: 120,
      proteines: 4.4,
      glucides: 22,
      lipides: 1.9,
      fibres: 2.8,
      micronutriments: ['Fer', 'Magnésium', 'Lysine', 'Manganèse'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾',
      description: 'Pseudo-céréale complète avec tous les acides aminés essentiels.',
      avantages: [
        'Protéines complètes végétales',
        'Sans gluten naturellement',
        'Riche en fer et magnésium',
        'Index glycémique bas'
      ],
      conseils: [
        'Rincer avant cuisson',
        'Cuire dans l\'eau bouillante',
        'Laisser gonfler 15 minutes',
        'Utiliser comme base de salades'
      ]
    },
    '50': {
      id: '50',
      nom: 'Myrtilles',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 57,
      proteines: 0.7,
      glucides: 14,
      lipides: 0.3,
      fibres: 2.4,
      micronutriments: ['Antioxydants', 'Vitamine C', 'Manganèse', 'Vitamine K'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫐',
      description: 'Petits fruits bleus ultra-riches en antioxydants, excellents pour la mémoire.',
      avantages: [
        'Antioxydants puissants',
        'Protection cognitive',
        'Anti-inflammatoire naturel',
        'Faible en calories'
      ],
      conseils: [
        'Choisir des myrtilles fermes',
        'Conserver au réfrigérateur',
        'Laver juste avant consommation',
        'Ajouter aux smoothies'
      ]
    },
    '51': {
      id: '51',
      nom: 'Amandes',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 579,
      proteines: 21,
      glucides: 22,
      lipides: 50,
      fibres: 12,
      micronutriments: ['Vitamine E', 'Magnésium', 'Calcium', 'Riboflavine'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜',
      description: 'Fruit à coque croquant, riche en vitamine E et magnésium.',
      avantages: [
        'Vitamine E antioxydante',
        'Magnésium pour les muscles',
        'Protéines végétales',
        'Fibres pour la satiété'
      ],
      conseils: [
        'Choisir non salées',
        'Conserver dans un endroit frais',
        'Manger avec modération',
        'Ajouter aux salades'
      ]
    },
    '52': {
      id: '52',
      nom: 'Patate douce',
      categorie: 'Glucides',
      ig: 'Modéré',
      calories: 86,
      proteines: 1.6,
      glucides: 20,
      lipides: 0.1,
      fibres: 3,
      micronutriments: ['Bêta-carotène', 'Vitamine A', 'Potassium'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍠',
      description: 'Tubercule riche en bêta-carotène et glucides complexes.',
      avantages: [
        'Bêta-carotène antioxydant',
        'Glucides complexes',
        'Riche en potassium',
        'Index glycémique modéré'
      ],
      conseils: [
        'Cuire avec la peau pour garder les nutriments',
        'Rôtir au four pour plus de saveur',
        'Conserver dans un endroit frais et sombre',
        'Éviter le réfrigérateur'
      ]
    },
    '53': {
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
      emoji: '🐟',
      description: 'Poisson maigre en conserve, riche en protéines et pauvre en calories.',
      avantages: [
        'Protéines maigres de qualité',
        'Faible en calories',
        'Riche en sélénium',
        'Facile à conserver'
      ],
      conseils: [
        'Choisir au naturel plutôt qu\'à l\'huile',
        'Égoutter avant utilisation',
        'Conserver au frais après ouverture',
        'Utiliser dans les 2 jours après ouverture'
      ]
    },
    '54': {
      id: '54',
      nom: 'Chou kale',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 49,
      proteines: 4.3,
      glucides: 9,
      lipides: 0.9,
      fibres: 3.6,
      micronutriments: ['Vitamine K', 'Vitamine C', 'Calcium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥬',
      description: 'Légume vert riche en vitamine K, C, A et calcium, idéal pour la santé.',
      avantages: [
        'Vitamine K pour la santé des os',
        'Vitamine C pour la santé des os',
        'Vitamine A pour la santé des yeux',
        'Calcium pour la santé des os'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '55': {
      id: '55',
      nom: 'Noix de cajou',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 553,
      proteines: 18,
      glucides: 30,
      lipides: 44,
      fibres: 3.3,
      micronutriments: ['Magnésium', 'Zinc', 'Cuivre'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜',
      description: 'Noix riche en oméga-3, zinc et cuivre, excellent pour la santé.',
      avantages: [
        'Oméga-3 anti-inflammatoires',
        'Zinc pour la santé des os',
        'Cuivre pour la formation des globules rouges',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou grillé',
        'Conserver dans un endroit frais',
        'Arroser de jus de citron',
        'Manger avec modération'
      ]
    },
    '56': {
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
      emoji: '🍚',
      description: 'Riz basmati, une variété de riz à grain long originaire d\'Inde, réputé pour son arôme délicat et sa texture légère.',
      avantages: [
        'Source d\'énergie durable',
        'Facile à digérer',
        'Riche en glucides complexes',
        'Faible en gras'
      ],
      conseils: [
        'Rincer le riz avant la cuisson',
        'Cuire dans un volume d\'eau 1,5 fois supérieur',
        'Laisser reposer 5 minutes après cuisson',
        'Conserver dans un endroit sec et frais'
      ]
    },
    '57': {
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
      emoji: '🥭',
      description: 'Fruit riche en vitamine C, A et folates, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'A pour la santé des yeux',
        'Folates pour la santé nerveuse',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '58': {
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
      emoji: '🌱',
      description: 'Petites graines riches en oméga-3 et fibres solubles.',
      avantages: [
        'Oméga-3 végétaux',
        'Fibres solubles',
        'Calcium végétal',
        'Gélifiant naturel'
      ],
      conseils: [
        'Tremper 10 minutes avant consommation',
        'Ajouter aux smoothies',
        'Conserver dans un endroit sec',
        'Utiliser comme épaississant'
      ]
    },
    '59': {
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
      emoji: '🍎',
      description: 'Fruit riche en vitamine C, potassium et fibres, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Fibres pour la digestion',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru pour les vitamines',
        'Conserver à température ambiante',
        'Arroser de jus de citron',
        'Manger rapidement'
      ]
    },
    '60': {
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
      emoji: '🫘',
      description: 'Légumineuse riche en protéines, fer et folates, idéale pour la santé.',
      avantages: [
        'Protéines végétales',
        'Fer pour la formation des globules rouges',
        'Folates pour la santé des cellules',
        'Faible en calories'
      ],
      conseils: [
        'Cuire à la vapeur ou à l\'étouffée',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger cru ou légèrement cuit'
      ]
    },
    '61': {
      id: '61',
      nom: 'Brocoli',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 34,
      proteines: 2.8,
      glucides: 7,
      lipides: 0.4,
      fibres: 2.6,
      micronutriments: ['Vitamine C', 'Vitamine K', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥦',
      description: 'Légume crucifère riche en vitamines et composés anti-cancer.',
      avantages: [
        'Riche en vitamine C et K',
        'Composés anti-cancer',
        'Faible en calories',
        'Riche en fibres'
      ],
      conseils: [
        'Cuire à la vapeur 5-7 minutes',
        'Ne pas trop cuire pour garder les nutriments',
        'Conserver au réfrigérateur',
        'Manger cru ou légèrement cuit'
      ]
    },
    '62': {
      id: '62',
      nom: 'Noix de Grenoble',
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
      emoji: '🌰',
      description: 'Fruit à coque riche en oméga-3 et vitamine E.',
      avantages: [
        'Oméga-3 pour le cerveau',
        'Vitamine E antioxydante',
        'Magnésium pour les muscles',
        'Protéines végétales'
      ],
      conseils: [
        'Conserver dans un endroit frais',
        'Manger avec la peau',
        'Limiter à une poignée par jour',
        'Éviter les noix salées'
      ]
    },
    '63': {
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
      emoji: '🥔',
      description: 'Tubercule riche en glucides et potassium, idéal pour la santé.',
      avantages: [
        'Glucides complexes',
        'Riche en potassium',
        'Vitamine C pour la santé des os',
        'Faible en calories'
      ],
      conseils: [
        'Cuire avec la peau pour garder les nutriments',
        'Rôtir au four pour plus de saveur',
        'Conserver dans un endroit frais',
        'Éviter le réfrigérateur'
      ]
    },
    '64': {
      id: '64',
      nom: 'Épinards',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 23,
      proteines: 2.9,
      glucides: 3.6,
      lipides: 0.4,
      fibres: 2.2,
      micronutriments: ['Fer', 'Vitamine K', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥬',
      description: 'Légume vert riche en fer et folates, excellent pour la santé.',
      avantages: [
        'Riche en fer végétal',
        'Folates pour la division cellulaire',
        'Vitamine K pour les os',
        'Lutéine pour les yeux'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec vitamine C pour l\'absorption du fer',
        'Laver soigneusement',
        'Conserver au réfrigérateur'
      ]
    },
    '65': {
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
      emoji: '🍄',
      description: 'Champignons réputés pour leur richesse en vitamine D et sélénium.',
      avantages: [
        'Vitamine D pour les os',
        'Sélénium pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '66': {
      id: '66',
      nom: 'Gingembre',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 80,
      proteines: 1.8,
      glucides: 18,
      lipides: 0.8,
      fibres: 2,
      micronutriments: ['Gingérol', 'Potassium', 'Magnésium', 'Vitamine C'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫚',
      description: 'Racine épicée aux propriétés anti-inflammatoires et digestives puissantes.',
      avantages: [
        'Gingérol anti-inflammatoire',
        'Aide à la digestion',
        'Réduit les nausées',
        'Stimule la circulation'
      ],
      conseils: [
        'Utiliser frais de préférence',
        'Râper finement',
        'Ajouter aux thés',
        'Conserver au réfrigérateur'
      ]
    },
    '67': {
      id: '67',
      nom: 'Kiwi',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 61,
      proteines: 1.1,
      glucides: 15,
      lipides: 0.5,
      fibres: 3,
      micronutriments: ['Vitamine C', 'Vitamine K', 'Potassium', 'Actinidine'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥝',
      description: 'Fruit exotique vert riche en vitamine C, excellent pour l\'immunité.',
      avantages: [
        'Vitamine C pour l\'immunité',
        'Enzyme actinidine digestive',
        'Potassium pour les muscles',
        'Faible en calories'
      ],
      conseils: [
        'Choisir des kiwis fermes',
        'Conserver au réfrigérateur',
        'Manger avec la peau si bio',
        'Ajouter aux salades de fruits'
      ]
    },
    '68': {
      id: '68',
      nom: 'Maquereau',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 205,
      proteines: 19,
      glucides: 0,
      lipides: 14,
      fibres: 0,
      micronutriments: ['Oméga-3', 'B12', 'Sélénium', 'Niacine'],
      classe: 'Anti-inflammatoire',
      tags: [],
      emoji: '🐟',
      description: 'Poisson gras riche en oméga-3, excellent pour le cœur et le cerveau.',
      avantages: [
        'Oméga-3 pour le cerveau',
        'Protéines complètes',
        'Vitamine B12 pour les nerfs',
        'Sélénium antioxydant'
      ],
      conseils: [
        'Choisir du maquereau frais',
        'Cuire à la vapeur ou grillé',
        'Éviter la surcuisson',
        'Consommer 2-3 fois par semaine'
      ]
    },
    '69': {
      id: '69',
      nom: 'Sarrasin',
      categorie: 'Glucides',
      ig: 'Bas',
      calories: 343,
      proteines: 13,
      glucides: 72,
      lipides: 3.4,
      fibres: 10,
      micronutriments: ['Rutine', 'Magnésium', 'Fer', 'Lysine'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾',
      description: 'Pseudo-céréale complète riche en rutine, excellente pour la circulation.',
      avantages: [
        'Rutine pour la circulation',
        'Protéines complètes',
        'Sans gluten naturellement',
        'Riche en fibres'
      ],
      conseils: [
        'Rincer avant cuisson',
        'Cuire dans l\'eau bouillante',
        'Laisser gonfler 15 minutes',
        'Utiliser comme base de salades'
      ]
    },
    '70': {
      id: '70',
      nom: 'Grenade',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 83,
      proteines: 1.7,
      glucides: 19,
      lipides: 1.2,
      fibres: 4,
      micronutriments: ['Antioxydants', 'Vitamine C', 'Folates', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍎',
      description: 'Fruit rouge aux graines juteuses, ultra-riche en antioxydants.',
      avantages: [
        'Antioxydants puissants',
        'Protection cardiovasculaire',
        'Anti-inflammatoire naturel',
        'Riche en fibres'
      ],
      conseils: [
        'Choisir des grenades lourdes',
        'Conserver au réfrigérateur',
        'Extraire les graines',
        'Ajouter aux salades'
      ]
    },
    '71': {
      id: '71',
      nom: 'Noix de pécan',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 691,
      proteines: 9,
      glucides: 14,
      lipides: 72,
      fibres: 10,
      micronutriments: ['Vitamine E', 'Manganèse', 'Zinc', 'Cuivre'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜',
      description: 'Fruit à coque crémeux, riche en vitamine E et minéraux.',
      avantages: [
        'Vitamine E antioxydante',
        'Manganèse pour les os',
        'Zinc pour l\'immunité',
        'Graisses monoinsaturées'
      ],
      conseils: [
        'Choisir non salées',
        'Conserver dans un endroit frais',
        'Manger avec modération',
        'Ajouter aux salades'
      ]
    },
    '72': {
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
      emoji: '🥒',
      description: 'Légume riche en vitamine C, potassium et folates, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Folates pour la santé nerveuse',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '73': {
      id: '73',
      nom: 'Crevettes',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 99,
      proteines: 24,
      glucides: 0,
      lipides: 0.3,
      fibres: 0,
      micronutriments: ['Sélénium', 'B12', 'Phosphore'],
      classe: 'Sèche',
      tags: [],
      emoji: '🦐',
      description: 'Poisson riche en protéines, sélénium et vitamine B12, idéal pour la santé.',
      avantages: [
        'Protéines végétales',
        'Sélénium pour la santé des os',
        'Vitamine B12 pour la santé nerveuse',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou grillé',
        'Conserver au réfrigérateur',
        'Arroser de jus de citron',
        'Manger avec modération'
      ]
    },
    '74': {
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
      emoji: '🌾',
      description: 'Céréale complète riche en fibres et protéines, idéale pour le petit-déjeuner.',
      avantages: [
        'Fibres solubles pour la satiété',
        'Protéines végétales',
        'Bêta-glucanes pour le cholestérol',
        'Énergie durable'
      ],
      conseils: [
        'Cuire dans du lait pour plus de protéines',
        'Ajouter des fruits frais',
        'Conserver dans un endroit sec',
        'Manger chaud ou froid'
      ]
    },
    '75': {
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
      emoji: '🍈',
      description: 'Légume riche en vitamine A, C et potassium, idéal pour la santé.',
      avantages: [
        'Vitamine A pour la santé des os',
        'Vitamine C pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '76': {
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
      emoji: '🌱',
      description: 'Petites graines riches en oméga-3 et fibres solubles.',
      avantages: [
        'Oméga-3 végétaux',
        'Fibres solubles',
        'Calcium végétal',
        'Gélifiant naturel'
      ],
      conseils: [
        'Tremper 10 minutes avant consommation',
        'Ajouter aux smoothies',
        'Conserver dans un endroit sec',
        'Utiliser comme épaississant'
      ]
    },
    '77': {
      id: '77',
      nom: 'Poivron rouge',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 31,
      proteines: 1,
      glucides: 7,
      lipides: 0.3,
      fibres: 2.5,
      micronutriments: ['Vitamine C', 'Bêta-carotène', 'Folates'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫑',
      description: 'Légume riche en vitamine C, bêta-carotène et folates, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Bêta-carotène antioxydant',
        'Folates pour la santé nerveuse',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '78': {
      id: '78',
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
      tags: [],
      emoji: '🦃',
      description: 'Viande de dinde riche en protéines et sélénium.',
      avantages: [
        'Protéines complètes',
        'Faible en calories',
        'Riche en sélénium',
        'Facile à digérer'
      ],
      conseils: [
        'Mariner 30 min avant cuisson',
        'Cuire à feu moyen',
        'Vérifier la cuisson',
        'Laisser reposer'
      ]
    },
    '79': {
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
      emoji: '🍯',
      description: 'Fruit riche en calcium, potassium et fer, idéal pour la santé.',
      avantages: [
        'Calcium pour les os',
        'Potassium pour la santé cardiaque',
        'Fer pour l\'immunité',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '80': {
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
      emoji: '🌻',
      description: 'Graines de tournesol riche en vitamine E, sélénium et magnésium, idéales pour la santé.',
      avantages: [
        'Vitamine E antioxydante',
        'Sélénium pour la santé des os',
        'Magnésium pour les muscles',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou grillé',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '81': {
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
      emoji: '🥕',
      description: 'Légume riche en bêta-carotène, vitamine A et potassium, idéal pour la santé.',
      avantages: [
        'Bêta-carotène antioxydant',
        'Vitamine A pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '82': {
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
      emoji: '🐟',
      description: 'Poisson maigre en conserve, riche en protéines et pauvre en calories.',
      avantages: [
        'Protéines maigres de qualité',
        'Faible en calories',
        'Riche en sélénium',
        'Facile à conserver'
      ],
      conseils: [
        'Choisir au naturel plutôt qu\'à l\'huile',
        'Égoutter avant utilisation',
        'Conserver au frais après ouverture',
        'Utiliser dans les 2 jours après ouverture'
      ]
    },
    '83': {
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
      emoji: '🥒',
      description: 'Légume riche en vitamine K, potassium et silice, idéal pour la santé.',
      avantages: [
        'Vitamine K pour les os',
        'Potassium pour les muscles',
        'Silice pour la santé des os',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '84': {
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
      emoji: '🍇',
      description: 'Fruit à coque riche en resvératrol, vitamine K et cuivre, idéal pour la santé.',
      avantages: [
        'Resvératrol pour l\'anti-inflammatoire',
        'Vitamine K pour les os',
        'Cuivre pour l\'immunité',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '85': {
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
      emoji: '🎃',
      description: 'Graines de courge riche en magnésium, zinc et fer, idéales pour la santé.',
      avantages: [
        'Magnésium pour les muscles',
        'Zinc pour l\'immunité',
        'Fer pour la formation des globules rouges',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou grillé',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '86': {
      id: '86',
      nom: 'Ananas',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 50,
      proteines: 0.5,
      glucides: 13,
      lipides: 0.1,
      fibres: 1.4,
      micronutriments: ['Bromélaïne', 'Vitamine C', 'Manganèse', 'Cuivre'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🍍',
      description: 'Fruit tropical sucré contenant de la bromélaïne, enzyme digestive.',
      avantages: [
        'Bromélaïne digestive',
        'Vitamine C pour l\'immunité',
        'Manganèse pour les os',
        'Anti-inflammatoire naturel'
      ],
      conseils: [
        'Choisir des ananas parfumés',
        'Conserver au réfrigérateur',
        'Manger frais de préférence',
        'Ajouter aux smoothies'
      ]
    },
    '87': {
      id: '87',
      nom: 'Papaye',
      categorie: 'Micronutriments',
      ig: 'Modéré',
      calories: 43,
      proteines: 0.5,
      glucides: 11,
      lipides: 0.3,
      fibres: 1.7,
      micronutriments: ['Papaine', 'Vitamine C', 'Folates', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥭',
      description: 'Fruit tropical orange riche en papaine, enzyme digestive naturelle.',
      avantages: [
        'Papaine pour la digestion',
        'Vitamine C pour l\'immunité',
        'Folates pour les cellules',
        'Faible en calories'
      ],
      conseils: [
        'Choisir des papayes mûres',
        'Conserver au réfrigérateur',
        'Manger fraîche de préférence',
        'Ajouter aux smoothies'
      ]
    },
    '88': {
      id: '88',
      nom: 'Hareng',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 158,
      proteines: 18,
      glucides: 0,
      lipides: 9,
      fibres: 0,
      micronutriments: ['Oméga-3', 'B12', 'Sélénium', 'Niacine'],
      classe: 'Anti-inflammatoire',
      tags: [],
      emoji: '🐟',
      description: 'Poisson gras riche en oméga-3, excellent pour le cerveau et le cœur.',
      avantages: [
        'Oméga-3 pour le cerveau',
        'Protéines complètes',
        'Vitamine B12 pour les nerfs',
        'Sélénium antioxydant'
      ],
      conseils: [
        'Choisir du hareng frais',
        'Cuire à la vapeur ou grillé',
        'Éviter la surcuisson',
        'Consommer 2-3 fois par semaine'
      ]
    },
    '89': {
      id: '89',
      nom: 'Millet',
      categorie: 'Glucides',
      ig: 'Bas',
      calories: 378,
      proteines: 11,
      glucides: 73,
      lipides: 4.2,
      fibres: 8.5,
      micronutriments: ['Magnésium', 'Phosphore', 'Fer', 'B6'],
      classe: 'Récupération',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🌾',
      description: 'Céréale ancienne complète, riche en minéraux et sans gluten.',
      avantages: [
        'Sans gluten naturellement',
        'Riche en magnésium',
        'Protéines végétales',
        'Fibres pour la satiété'
      ],
      conseils: [
        'Rincer avant cuisson',
        'Cuire dans l\'eau bouillante',
        'Laisser gonfler 15 minutes',
        'Utiliser comme base de salades'
      ]
    },
    '90': {
      id: '90',
      nom: 'Cassis',
      categorie: 'Micronutriments',
      ig: 'Bas',
      calories: 63,
      proteines: 1.4,
      glucides: 15,
      lipides: 0.4,
      fibres: 4.3,
      micronutriments: ['Antioxydants', 'Vitamine C', 'Anthocyanes', 'Potassium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🫐',
      description: 'Petit fruit noir ultra-riche en antioxydants et vitamine C.',
      avantages: [
        'Antioxydants puissants',
        'Vitamine C pour l\'immunité',
        'Anthocyanes pour les yeux',
        'Anti-inflammatoire naturel'
      ],
      conseils: [
        'Choisir des cassis fermes',
        'Conserver au réfrigérateur',
        'Laver juste avant consommation',
        'Ajouter aux smoothies'
      ]
    },
    '91': {
      id: '91',
      nom: 'Noix de macadamia',
      categorie: 'Lipides',
      ig: 'Bas',
      calories: 718,
      proteines: 8,
      glucides: 14,
      lipides: 76,
      fibres: 9,
      micronutriments: ['Vitamine B1', 'Manganèse', 'Cuivre', 'Magnésium'],
      classe: 'Anti-inflammatoire',
      tags: ['Vegan', 'Sans gluten'],
      emoji: '🥜',
      description: 'Fruit à coque crémeux, riche en graisses monoinsaturées.',
      avantages: [
        'Graisses monoinsaturées',
        'Vitamine B1 pour l\'énergie',
        'Manganèse pour les os',
        'Cuivre pour l\'immunité'
      ],
      conseils: [
        'Choisir non salées',
        'Conserver dans un endroit frais',
        'Manger avec modération',
        'Ajouter aux salades'
      ]
    },
    '92': {
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
      emoji: '🍆',
      description: 'Aubergine riche en minéraux et vitamine C, idéale pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Folates pour la santé nerveuse',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '93': {
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
      emoji: '🐟',
      description: 'Poisson gras riche en oméga-3, excellent pour le cerveau et le cœur.',
      avantages: [
        'Oméga-3 pour le cerveau',
        'Protéines complètes',
        'Vitamine B12 pour les nerfs',
        'Sélénium antioxydant'
      ],
      conseils: [
        'Choisir du sardines frais',
        'Cuire à la vapeur ou grillé',
        'Éviter la surcuisson',
        'Consommer 2-3 fois par semaine'
      ]
    },
    '94': {
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
      emoji: '🌾',
      description: 'Céréale riche en minéraux et vitamine C, idéale pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Folates pour la santé nerveuse',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '95': {
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
      emoji: '🫐',
      description: 'Petits fruits rouges ultra-riches en antioxydants, excellents pour la mémoire.',
      avantages: [
        'Antioxydants puissants',
        'Protection cognitive',
        'Anti-inflammatoire naturel',
        'Faible en calories'
      ],
      conseils: [
        'Choisir des mûres fermes',
        'Conserver au réfrigérateur',
        'Laver juste avant consommation',
        'Ajouter aux smoothies'
      ]
    },
    '96': {
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
      emoji: '🌱',
      description: 'Fruit à coque riche en graisses monoinsaturées, idéal pour la santé.',
      avantages: [
        'Graisses monoinsaturées',
        'Vitamine B1 pour l\'énergie',
        'Manganèse pour les os',
        'Calcium végétal'
      ],
      conseils: [
        'Choisir non salées',
        'Conserver dans un endroit frais',
        'Manger avec modération',
        'Ajouter aux salades'
      ]
    },
    '97': {
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
      emoji: '🍅',
      description: 'Légume riche en lycopène, vitamine C et potassium, idéal pour la santé.',
      avantages: [
        'Lycopène pour la santé des os',
        'Vitamine C pour la santé des os',
        'Potassium pour la santé cardiaque',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '98': {
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
      emoji: '🥩',
      description: 'Viande de veau riche en protéines et sélénium, idéale pour la santé.',
      avantages: [
        'Protéines complètes',
        'Faible en graisses',
        'Sélénium antioxydant',
        'Vitamines B pour l\'énergie'
      ],
      conseils: [
        'Choisir du veau bio',
        'Cuire à la vapeur ou grillé',
        'Éviter la surcuisson',
        'Consommer 3-4 fois par semaine'
      ]
    },
    '99': {
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
      emoji: '🍇',
      description: 'Fruit riche en antioxydants et vitamine K, idéal pour la santé.',
      avantages: [
        'Antioxydants puissants',
        'Vitamine K pour l\'immunité',
        'Potassium pour la santé cardiaque',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '100': {
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
      emoji: '🥜',
      description: 'Fruit à coque riche en graisses monoinsaturées, idéal pour la santé.',
      avantages: [
        'Graisses monoinsaturées',
        'Vitamine E antioxydante',
        'Magnésium pour les os',
        'Calcium végétal'
      ],
      conseils: [
        'Choisir non salées',
        'Conserver dans un endroit frais',
        'Manger avec modération',
        'Ajouter aux salades'
      ]
    },
    '101': {
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
      emoji: '🥕',
      description: 'Légume riche en vitamine C, folates et potassium, idéal pour la santé.',
      avantages: [
        'Vitamine C pour la santé des os',
        'Folates pour la santé nerveuse',
        'Potassium pour la santé cardiaque',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru pour les vitamines',
        'Conserver à température ambiante',
        'Arroser de jus de citron',
        'Manger rapidement'
      ]
    },
    '102': {
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
      emoji: '🥩',
      description: 'Viande de chevre riche en protéines et sélénium, idéale pour la santé.',
      avantages: [
        'Protéines complètes',
        'Faible en graisses',
        'Sélénium antioxydant',
        'Vitamines B pour l\'énergie'
      ],
      conseils: [
        'Choisir du chevre bio',
        'Cuire à la vapeur ou grillé',
        'Éviter la surcuisson',
        'Consommer 3-4 fois par semaine'
      ]
    },
    '103': {
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
      emoji: '🍒',
      description: 'Petits fruits rouges ultra-riches en antioxydants, excellents pour la mémoire.',
      avantages: [
        'Antioxydants puissants',
        'Protection cognitive',
        'Anti-inflammatoire naturel',
        'Faible en calories'
      ],
      conseils: [
        'Choisir des cerises fermes',
        'Conserver au réfrigérateur',
        'Laver juste avant consommation',
        'Ajouter aux smoothies'
      ]
    },
    '104': {
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
      emoji: '🌱',
      description: 'Fruit à coque riche en graisses monoinsaturées, idéal pour la santé.',
      avantages: [
        'Graisses monoinsaturées',
        'Vitamine B1 pour l\'énergie',
        'Manganèse pour les os',
        'Calcium végétal'
      ],
      conseils: [
        'Choisir non salées',
        'Conserver dans un endroit frais',
        'Manger avec modération',
        'Ajouter aux salades'
      ]
    },
    '105': {
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
      emoji: '🥕',
      description: 'Légume riche en nitrates, folates et potassium, idéal pour la santé.',
      avantages: [
        'Nitrates pour la santé cardiaque',
        'Folates pour la santé nerveuse',
        'Potassium pour les muscles',
        'Faible en calories'
      ],
      conseils: [
        'Manger cru ou légèrement cuit',
        'Associer avec des légumes',
        'Conserver au réfrigérateur',
        'Manger rapidement'
      ]
    },
    '106': {
      id: '106',
      nom: 'Poulet',
      categorie: 'Protéines',
      ig: 'Bas',
      calories: 165,
      proteines: 31,
      glucides: 0,
      lipides: 3.6,
      fibres: 0,
      micronutriments: ['Sélénium', 'B3', 'B6', 'Phosphore'],
      classe: 'Sèche',
      tags: [],
      emoji: '🐔',
      description: 'Viande blanche maigre, excellente source de protéines complètes.',
      avantages: [
        'Protéines complètes',
        'Faible en graisses',
        'Sélénium antioxydant',
        'Vitamines B pour l\'énergie'
      ],
      conseils: [
        'Choisir du poulet bio',
        'Cuire à la vapeur ou grillé',
        'Éviter la surcuisson',
        'Consommer 3-4 fois par semaine'
      ]
    }
  };

  // Récupérer l'aliment selon l'ID
  const aliment = alimentsDatabase[id as keyof typeof alimentsDatabase];

  if (!aliment) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">Aliment non trouvé</h1>
          <Button onClick={() => navigate('/nutrition')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la nutrition
          </Button>
        </div>
      </div>
    );
  }

  const getIGColor = (ig: string) => {
    switch (ig) {
      case 'Bas': return 'bg-green-500/15 border border-green-500/25 text-green-300';
      case 'Modéré': return 'bg-yellow-500/15 border border-yellow-500/25 text-yellow-300';
      case 'Élevé': return 'bg-red-500/15 border border-red-500/25 text-red-300';
      default: return 'bg-white/5 text-foreground';
    }
  };

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
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => navigate('/nutrition')}
            variant="outline"
            className="flex items-center gap-2"
        >
            <ArrowLeft className="h-4 w-4" />
            Retour
        </Button>
        <div className="flex items-center gap-3">
          <div className="text-3xl md:text-4xl">{aliment.emoji}</div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground truncate">{aliment.nom}</h1>
            <p className="text-muted-foreground">{aliment.description}</p>
        </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => toggleFavorite(aliment.id)}
          className={`p-2 ${
            isFavorite(aliment.id)
              ? 'text-red-500'
              : 'text-muted-foreground/70 hover:text-red-500'
          }`}
        >
          <Heart className={`h-6 w-6 ${isFavorite(aliment.id) ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Valeurs nutritionnelles */}
        <Card className="glass-card border-primary/20 border-0 shadow-lg">
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-400" />
                Valeurs nutritionnelles (pour 100g)
                  </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/15 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-orange-400">{aliment.calories}</div>
                  <div className="text-sm text-orange-300">Calories</div>
                  </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/15 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-blue-400">{aliment.proteines}g</div>
                  <div className="text-sm text-blue-300">Protéines</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/15 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-green-400">{aliment.glucides}g</div>
                  <div className="text-sm text-green-300">Glucides</div>
              </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/15 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-purple-400">{aliment.lipides}g</div>
                  <div className="text-sm text-purple-300">Lipides</div>
                </div>
                </div>
              <div className="mt-4 text-center p-3 surface-panel-sm">
                <div className="text-xl font-bold text-foreground">{aliment.fibres}g</div>
                <div className="text-sm text-muted-foreground">Fibres</div>
              </div>
            </CardContent>
          </Card>

          {/* Avantages */}
          <Card className="glass-card border-primary/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Avantages nutritionnels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {aliment.avantages.map((avantage, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground/90">{avantage}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card className="glass-card border-primary/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-400" />
                Conseils d'utilisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {aliment.conseils.map((conseil, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">{index + 1}.</span>
                    <span className="text-foreground/90">{conseil}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Informations générales */}
          <Card className="glass-card border-primary/20 border-0 shadow-lg">
          <CardHeader>
              <CardTitle>Informations</CardTitle>
          </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Catégorie</span>
                <Badge variant="outline" className="border-blue-300 text-blue-300 bg-blue-500/10">
                  {aliment.categorie}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Index glycémique</span>
                <Badge className={getIGColor(aliment.ig)}>
                  IG {aliment.ig}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Classe</span>
                <Badge className={getClasseColor(aliment.classe)}>
                  {aliment.classe}
                </Badge>
              </div>
          </CardContent>
        </Card>

          {/* Micronutriments */}
          <Card className="glass-card border-primary/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Micronutriments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {aliment.micronutriments.map((nutrient, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {nutrient}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="glass-card border-primary/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {aliment.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm text-muted-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

        {/* Actions */}
        <Card className="glass-card border-primary/20 border-0 shadow-lg">
          <CardContent className="p-6">
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                  Ajouter à un repas
          </Button>
                <Button variant="outline" className="w-full" onClick={() => toggleFavorite(aliment.id)}>
                <Heart className={`h-4 w-4 mr-2 ${isFavorite(aliment.id) ? 'fill-current text-red-500' : ''}`} />
            {isFavorite(aliment.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </Button>
        </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default AlimentDetail; 