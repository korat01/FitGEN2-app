import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Plus, Star, Target, Zap } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const AlimentDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

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
    }
  };

  // Récupérer l'aliment selon l'ID
  const aliment = alimentsDatabase[id as keyof typeof alimentsDatabase];

  if (!aliment) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Aliment non trouvé</h1>
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
      case 'Bas': return 'bg-green-100 text-green-800';
      case 'Modéré': return 'bg-yellow-100 text-yellow-800';
      case 'Élevé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <div className="text-4xl">{aliment.emoji}</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{aliment.nom}</h1>
            <p className="text-gray-600">{aliment.description}</p>
        </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-2 ${
            isFavorite 
              ? 'text-red-500' 
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Valeurs nutritionnelles */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Valeurs nutritionnelles (pour 100g)
                  </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{aliment.calories}</div>
                  <div className="text-sm text-orange-700">Calories</div>
                  </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{aliment.proteines}g</div>
                  <div className="text-sm text-blue-700">Protéines</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{aliment.glucides}g</div>
                  <div className="text-sm text-green-700">Glucides</div>
              </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{aliment.lipides}g</div>
                  <div className="text-sm text-purple-700">Lipides</div>
                </div>
                </div>
              <div className="mt-4 text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-gray-800">{aliment.fibres}g</div>
                <div className="text-sm text-gray-600">Fibres</div>
              </div>
            </CardContent>
          </Card>

          {/* Avantages */}
          <Card className="bg-white border-0 shadow-lg">
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
                    <span className="text-gray-700">{avantage}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Conseils d'utilisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {aliment.conseils.map((conseil, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">{index + 1}.</span>
                    <span className="text-gray-700">{conseil}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Informations générales */}
          <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
              <CardTitle>Informations</CardTitle>
          </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Catégorie</span>
                <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                  {aliment.categorie}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Index glycémique</span>
                <Badge className={getIGColor(aliment.ig)}>
                  IG {aliment.ig}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Classe</span>
                <Badge className={getClasseColor(aliment.classe)}>
                  {aliment.classe}
                </Badge>
              </div>
          </CardContent>
        </Card>

          {/* Micronutriments */}
          <Card className="bg-white border-0 shadow-lg">
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
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {aliment.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm text-gray-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

        {/* Actions */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                  Ajouter à un repas
          </Button>
                <Button variant="outline" className="w-full">
                <Heart className="h-4 w-4 mr-2" />
            Ajouter aux favoris
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