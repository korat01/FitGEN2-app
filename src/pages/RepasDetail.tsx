import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, ChefHat, Plus, Heart, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const RepasDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  // Base de données complète des repas
  const repasDatabase = {
    '1': {
      id: '1',
      nom: 'Bowl Poulet Riz Légumes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Poulet grillé', quantite: '150g', calories: 248, proteines: 46, glucides: 0, lipides: 5 },
        { nom: 'Riz basmati', quantite: '200g', calories: 260, proteines: 5.4, glucides: 56, lipides: 0.6 },
        { nom: 'Brocolis vapeur', quantite: '100g', calories: 34, proteines: 2.8, glucides: 7, lipides: 0.4 },
        { nom: 'Huile d\'olive', quantite: '10g', calories: 88, proteines: 0, glucides: 0, lipides: 10 }
      ],
      calories: 630,
      proteines: 54.2,
      glucides: 63,
      lipides: 16,
      fibres: 3.6,
      objectif: 'Prise de masse',
      emoji: '🍲',
      tempsPreparation: '25 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Un bowl équilibré parfait pour la prise de masse, riche en protéines et glucides complexes.',
      etapes: [
        'Cuire le riz basmati dans de l\'eau salée pendant 15 minutes',
        'Griller le poulet avec épices (paprika, ail, thym) pendant 8-10 minutes',
        'Cuire les brocolis à la vapeur pendant 5-7 minutes',
        'Assaisonner avec huile d\'olive, sel et poivre',
        'Servir chaud dans un bol'
      ],
      conseils: [
        'Préparer le riz en avance pour gagner du temps',
        'Mariner le poulet 30 min avant cuisson pour plus de saveur',
        'Ne pas trop cuire les brocolis pour garder le croquant',
        'Ajouter des herbes fraîches au moment de servir'
      ]
    },
    '2': {
      id: '2',
      nom: 'Smoothie récupération',
      categorie: 'Post-training',
      ingredients: [
        { nom: 'Banane', quantite: '1 unité', calories: 89, proteines: 1.1, glucides: 23, lipides: 0.3 },
        { nom: 'Protéine en poudre', quantite: '30g', calories: 120, proteines: 25, glucides: 2, lipides: 1 },
        { nom: 'Lait d\'amande', quantite: '250ml', calories: 30, proteines: 1, glucides: 2, lipides: 2.5 },
        { nom: 'Graines de chia', quantite: '10g', calories: 49, proteines: 1.7, glucides: 4.2, lipides: 3.1 }
      ],
      calories: 288,
      proteines: 28.8,
      glucides: 31.2,
      lipides: 6.9,
      fibres: 5.2,
      objectif: 'Récupération',
      emoji: '🥤',
      tempsPreparation: '5 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Smoothie parfait pour la récupération post-entraînement avec protéines et glucides.',
      etapes: [
        'Éplucher et couper la banane en rondelles',
        'Ajouter tous les ingrédients dans un blender',
        'Mixer à haute vitesse pendant 30 secondes',
        'Vérifier la consistance et ajuster si nécessaire',
        'Servir immédiatement dans un verre'
      ],
      conseils: [
        'Utiliser une banane bien mûre pour plus de douceur',
        'Ajouter des glaçons pour une texture plus fraîche',
        'Boire dans les 30 minutes après l\'entraînement',
        'Conserver au réfrigérateur maximum 24h'
      ]
    },
    '3': {
      id: '3',
      nom: 'Saumon grillé aux légumes',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Saumon frais', quantite: '150g', calories: 312, proteines: 37.5, glucides: 0, lipides: 18 },
        { nom: 'Brocolis', quantite: '100g', calories: 34, proteines: 2.8, glucides: 7, lipides: 0.4 },
        { nom: 'Carottes', quantite: '100g', calories: 41, proteines: 0.9, glucides: 10, lipides: 0.2 },
        { nom: 'Huile d\'olive', quantite: '10g', calories: 88, proteines: 0, glucides: 0, lipides: 10 }
      ],
      calories: 475,
      proteines: 41.2,
      glucides: 17,
      lipides: 28.6,
      fibres: 4.8,
      objectif: 'Récupération',
      emoji: '🐟',
      tempsPreparation: '20 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Saumon frais avec légumes rôtis, riche en oméga-3 et protéines.',
      etapes: [
        'Préchauffer le four à 200°C',
        'Assaisonner le saumon avec sel, poivre et citron',
        'Couper les légumes en morceaux',
        'Enfourner le saumon et légumes 15 minutes',
        'Arroser d\'huile d\'olive avant de servir'
      ],
      conseils: [
        'Choisir du saumon sauvage si possible',
        'Ne pas trop cuire le saumon pour garder la tendreté',
        'Assaisonner les légumes avec des herbes',
        'Servir avec du citron frais'
      ]
    },
    '4': {
      id: '4',
      nom: 'Omelette aux épinards',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Œufs entiers', quantite: '3 unités', calories: 465, proteines: 39, glucides: 3.3, lipides: 33 },
        { nom: 'Épinards frais', quantite: '50g', calories: 12, proteines: 1.5, glucides: 1.8, lipides: 0.2 },
        { nom: 'Fromage râpé', quantite: '20g', calories: 80, proteines: 5, glucides: 0.6, lipides: 6.4 },
        { nom: 'Huile d\'olive', quantite: '5g', calories: 44, proteines: 0, glucides: 0, lipides: 5 }
      ],
      calories: 601,
      proteines: 45.5,
      glucides: 5.7,
      lipides: 44.6,
      fibres: 1.8,
      objectif: 'Prise de masse',
      emoji: '🍳',
      tempsPreparation: '10 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Omelette protéinée avec épinards et fromage, parfaite pour le petit-déjeuner.',
      etapes: [
        'Battre les œufs avec sel et poivre',
        'Faire revenir les épinards dans l\'huile',
        'Verser les œufs battus sur les épinards',
        'Ajouter le fromage râpé',
        'Plier l\'omelette en deux et servir'
      ],
      conseils: [
        'Utiliser une poêle anti-adhésive',
        'Cuire à feu moyen pour éviter le brunissement',
        'Ajouter les épinards encore humides',
        'Servir immédiatement'
      ]
    },
    '5': {
      id: '5',
      nom: 'Bowl de quinoa aux légumes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Quinoa', quantite: '150g', calories: 180, proteines: 6.6, glucides: 33, lipides: 2.9 },
        { nom: 'Brocolis', quantite: '100g', calories: 34, proteines: 2.8, glucides: 7, lipides: 0.4 },
        { nom: 'Carottes', quantite: '80g', calories: 33, proteines: 0.7, glucides: 8, lipides: 0.2 },
        { nom: 'Avocat', quantite: '1/2 unité', calories: 80, proteines: 1, glucides: 4.5, lipides: 7.5 },
        { nom: 'Graines de chia', quantite: '10g', calories: 49, proteines: 1.7, glucides: 4.2, lipides: 3.1 }
      ],
      calories: 376,
      proteines: 12.8,
      glucides: 57.7,
      lipides: 14.1,
      fibres: 8.2,
      objectif: 'Équilibre',
      emoji: '🥗',
      tempsPreparation: '20 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Bowl végétarien équilibré avec quinoa et légumes colorés.',
      etapes: [
        'Cuire le quinoa dans de l\'eau salée',
        'Cuire les brocolis et carottes à la vapeur',
        'Couper l\'avocat en dés',
        'Mélanger tous les ingrédients dans un bol',
        'Saupoudrer de graines de chia'
      ],
      conseils: [
        'Rincer le quinoa avant cuisson',
        'Ne pas trop cuire les légumes',
        'Ajouter une vinaigrette légère',
        'Servir à température ambiante'
      ]
    },
    '6': {
      id: '6',
      nom: 'Smoothie protéiné aux myrtilles',
      categorie: 'Post-training',
      ingredients: [
        { nom: 'Myrtilles', quantite: '100g', calories: 57, proteines: 0.7, glucides: 14, lipides: 0.3 },
        { nom: 'Yaourt grec', quantite: '200g', calories: 118, proteines: 20, glucides: 7.2, lipides: 0.8 },
        { nom: 'Protéine vanille', quantite: '30g', calories: 120, proteines: 25, glucides: 2, lipides: 1 },
        { nom: 'Amandes', quantite: '15g', calories: 87, proteines: 3.2, glucides: 3.3, lipides: 7.5 },
        { nom: 'Lait d\'amande', quantite: '200ml', calories: 30, proteines: 1, glucides: 2, lipides: 2.5 }
      ],
      calories: 412,
      proteines: 49.9,
      glucides: 28.5,
      lipides: 12.1,
      fibres: 4.2,
      objectif: 'Récupération',
      emoji: '🥤',
      tempsPreparation: '8 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Smoothie antioxydant parfait pour la récupération avec myrtilles et protéines.',
      etapes: [
        'Mixer les myrtilles avec le lait d\'amande',
        'Ajouter le yaourt grec',
        'Incorporer la protéine en poudre',
        'Mixer jusqu\'à obtenir une texture lisse',
        'Saupoudrer d\'amandes concassées'
      ],
      conseils: [
        'Utiliser des myrtilles congelées pour plus de fraîcheur',
        'Ajouter des glaçons si désiré',
        'Boire dans les 30 minutes après l\'entraînement',
        'Conserver au réfrigérateur maximum 24h'
      ]
    },
    '7': {
      id: '7',
      nom: 'Salade de thon aux légumes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Thon en conserve', quantite: '150g', calories: 174, proteines: 39, glucides: 0, lipides: 1.2 },
        { nom: 'Tomates cerises', quantite: '100g', calories: 18, proteines: 0.9, glucides: 3.9, lipides: 0.2 },
        { nom: 'Concombre', quantite: '80g', calories: 13, proteines: 0.6, glucides: 3.2, lipides: 0.1 },
        { nom: 'Épinards', quantite: '50g', calories: 12, proteines: 1.5, glucides: 1.8, lipides: 0.2 },
        { nom: 'Vinaigrette légère', quantite: '15g', calories: 45, proteines: 0, glucides: 1, lipides: 4.5 }
      ],
      calories: 262,
      proteines: 42,
      glucides: 9.9,
      lipides: 7.2,
      fibres: 2.8,
      objectif: 'Sèche',
      emoji: '🥗',
      tempsPreparation: '15 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Salade légère et protéinée, parfaite pour une sèche.',
      etapes: [
        'Égoutter le thon en conserve',
        'Couper les tomates cerises en deux',
        'Émincer le concombre en rondelles',
        'Mélanger tous les légumes',
        'Arroser de vinaigrette légère'
      ],
      conseils: [
        'Choisir du thon au naturel',
        'Ajouter des herbes fraîches',
        'Servir immédiatement',
        'Accompagner de pain complet'
      ]
    },
    '8': {
      id: '8',
      nom: 'Patates douces rôties au poulet',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Patates douces', quantite: '200g', calories: 172, proteines: 3.2, glucides: 40, lipides: 0.2 },
        { nom: 'Poulet', quantite: '150g', calories: 248, proteines: 46, glucides: 0, lipides: 5 },
        { nom: 'Brocolis', quantite: '100g', calories: 34, proteines: 2.8, glucides: 7, lipides: 0.4 },
        { nom: 'Huile d\'olive', quantite: '10g', calories: 88, proteines: 0, glucides: 0, lipides: 10 },
        { nom: 'Herbes de Provence', quantite: '5g', calories: 2, proteines: 0.1, glucides: 0.4, lipides: 0.1 }
      ],
      calories: 544,
      proteines: 52.1,
      glucides: 47.4,
      lipides: 15.7,
      fibres: 6.8,
      objectif: 'Prise de masse',
      emoji: '🍗',
      tempsPreparation: '35 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Repas complet avec patates douces rôties et poulet assaisonné.',
      etapes: [
        'Préchauffer le four à 200°C',
        'Couper les patates douces en dés',
        'Assaisonner le poulet avec les herbes',
        'Enfourner 25 minutes',
        'Ajouter les brocolis les 10 dernières minutes'
      ],
      conseils: [
        'Garder la peau des patates douces',
        'Mariner le poulet 30 min avant',
        'Vérifier la cuisson du poulet',
        'Servir chaud'
      ]
    },
    '9': {
      id: '9',
      nom: 'Pancakes protéinés',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Œufs', quantite: '2 unités', calories: 310, proteines: 26, glucides: 2.2, lipides: 22 },
        { nom: 'Protéine vanille', quantite: '30g', calories: 120, proteines: 25, glucides: 2, lipides: 1 },
        { nom: 'Banane', quantite: '1 unité', calories: 89, proteines: 1.1, glucides: 23, lipides: 0.3 },
        { nom: 'Yaourt grec', quantite: '100g', calories: 59, proteines: 10, glucides: 3.6, lipides: 0.4 },
        { nom: 'Graines de chia', quantite: '10g', calories: 49, proteines: 1.7, glucides: 4.2, lipides: 3.1 }
      ],
      calories: 627,
      proteines: 63.8,
      glucides: 35,
      lipides: 26.8,
      fibres: 4.2,
      objectif: 'Prise de masse',
      emoji: '🥞',
      tempsPreparation: '20 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Pancakes protéinés sans farine, parfaits pour le petit-déjeuner.',
      etapes: [
        'Écraser la banane dans un bol',
        'Mélanger avec les œufs et yaourt',
        'Ajouter la protéine en poudre',
        'Incorporer les graines de chia',
        'Cuire à la poêle 3-4 min par côté'
      ],
      conseils: [
        'Utiliser une poêle anti-adhésive',
        'Cuire à feu moyen',
        'Retourner quand des bulles apparaissent',
        'Servir avec des fruits frais'
      ]
    },
    '10': {
      id: '10',
      nom: 'Bowl d\'énergie pré-entraînement',
      categorie: 'Pre-workout',
      ingredients: [
        { nom: 'Banane', quantite: '1 unité', calories: 89, proteines: 1.1, glucides: 23, lipides: 0.3 },
        { nom: 'Myrtilles', quantite: '50g', calories: 29, proteines: 0.4, glucides: 7, lipides: 0.2 },
        { nom: 'Amandes', quantite: '20g', calories: 116, proteines: 4.3, glucides: 4.4, lipides: 10 },
        { nom: 'Chocolat noir 85%', quantite: '15g', calories: 82, proteines: 1.2, glucides: 6.9, lipides: 4.7 },
        { nom: 'Lait d\'amande', quantite: '100ml', calories: 15, proteines: 0.5, glucides: 1, lipides: 1.3 }
      ],
      calories: 331,
      proteines: 7.5,
      glucides: 42.3,
      lipides: 16.5,
      fibres: 6.8,
      objectif: 'Boost performance',
      emoji: '⚡',
      tempsPreparation: '10 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Bowl énergétique parfait avant l\'entraînement avec glucides et antioxydants.',
      etapes: [
        'Couper la banane en rondelles',
        'Mélanger avec les myrtilles',
        'Ajouter les amandes concassées',
        'Râper le chocolat noir',
        'Arroser de lait d\'amande'
      ],
      conseils: [
        'Manger 30-60 min avant l\'entraînement',
        'Utiliser des fruits frais',
        'Ajouter du miel si besoin',
        'Servir à température ambiante'
      ]
    },
    '11': {
      id: '11',
      nom: 'Wrap protéiné aux légumes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Tortilla complète', quantite: '1 unité', calories: 150, proteines: 5, glucides: 25, lipides: 3 },
        { nom: 'Poulet grillé', quantite: '120g', calories: 198, proteines: 37, glucides: 0, lipides: 4 },
        { nom: 'Avocat', quantite: '1/2 unité', calories: 80, proteines: 1, glucides: 4.5, lipides: 7.5 },
        { nom: 'Épinards', quantite: '30g', calories: 7, proteines: 0.9, glucides: 1.1, lipides: 0.1 },
        { nom: 'Tomates', quantite: '50g', calories: 9, proteines: 0.5, glucides: 2, lipides: 0.1 }
      ],
      calories: 444,
      proteines: 44.4,
      glucides: 36.6,
      lipides: 15.7,
      fibres: 8.2,
      objectif: 'Équilibre',
      emoji: '🌯',
      tempsPreparation: '15 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Wrap équilibré avec protéines et légumes frais.',
      etapes: [
        'Chauffer la tortilla dans une poêle',
        'Étaler l\'avocat écrasé',
        'Ajouter le poulet en lamelles',
        'Garnir avec épinards et tomates',
        'Rouler et couper en deux'
      ],
      conseils: [
        'Utiliser une tortilla complète',
        'Ne pas trop garnir pour éviter les fuites',
        'Servir immédiatement',
        'Accompagner de salade'
      ]
    },
    '12': {
      id: '12',
      nom: 'Soupe de légumes minceur',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Brocolis', quantite: '150g', calories: 51, proteines: 4.2, glucides: 10.5, lipides: 0.6 },
        { nom: 'Épinards', quantite: '100g', calories: 23, proteines: 2.9, glucides: 3.6, lipides: 0.4 },
        { nom: 'Carottes', quantite: '100g', calories: 41, proteines: 0.9, glucides: 10, lipides: 0.2 },
        { nom: 'Tomates', quantite: '100g', calories: 18, proteines: 0.9, glucides: 3.9, lipides: 0.2 },
        { nom: 'Bouillon de légumes', quantite: '300ml', calories: 15, proteines: 1.5, glucides: 3, lipides: 0 }
      ],
      calories: 148,
      proteines: 10.5,
      glucides: 32,
      lipides: 1.4,
      fibres: 8.2,
      objectif: 'Sèche',
      emoji: '🍲',
      tempsPreparation: '30 min',
      portions: 2,
      difficulte: 'Facile',
      description: 'Soupe légère et rassasiante, parfaite pour une sèche.',
      etapes: [
        'Couper tous les légumes en dés',
        'Faire revenir dans une casserole',
        'Ajouter le bouillon de légumes',
        'Laisser mijoter 20 minutes',
        'Mixer jusqu\'à obtenir une texture lisse'
      ],
      conseils: [
        'Utiliser des légumes frais',
        'Assaisonner avec des herbes',
        'Servir chaud',
        'Conserver au réfrigérateur 3 jours'
      ]
    },
    '13': {
      id: '13',
      nom: 'Energy balls aux amandes',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Amandes', quantite: '50g', calories: 290, proteines: 10.7, glucides: 11, lipides: 25 },
        { nom: 'Dattes', quantite: '80g', calories: 240, proteines: 2.2, glucides: 64, lipides: 0.3 },
        { nom: 'Graines de chia', quantite: '15g', calories: 74, proteines: 2.5, glucides: 6.3, lipides: 4.7 },
        { nom: 'Chocolat noir 85%', quantite: '20g', calories: 109, proteines: 1.6, glucides: 9.2, lipides: 6.2 },
        { nom: 'Cacao en poudre', quantite: '10g', calories: 20, proteines: 1.7, glucides: 5, lipides: 0.5 }
      ],
      calories: 733,
      proteines: 18.7,
      glucides: 95.5,
      lipides: 36.7,
      fibres: 12.8,
      objectif: 'Performance',
      emoji: '🥧',
      tempsPreparation: '15 min',
      portions: 4,
      difficulte: 'Facile',
      description: 'Boules énergétiques naturelles sans cuisson, parfaites pour les collations.',
      etapes: [
        'Mixer les amandes et dattes',
        'Ajouter les graines de chia',
        'Incorporer le chocolat râpé',
        'Former des boules avec les mains',
        'Rouler dans le cacao en poudre'
      ],
      conseils: [
        'Utiliser des dattes molles',
        'Réfrigérer 30 min avant consommation',
        'Conserver au réfrigérateur',
        'Servir à température ambiante'
      ]
    },
    '14': {
      id: '14',
      nom: 'Porridge protéiné',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Flocons d\'avoine', quantite: '50g', calories: 195, proteines: 8.5, glucides: 33, lipides: 3.5 },
        { nom: 'Protéine vanille', quantite: '25g', calories: 100, proteines: 20, glucides: 2, lipides: 1 },
        { nom: 'Banane', quantite: '1/2 unité', calories: 45, proteines: 0.6, glucides: 11.5, lipides: 0.2 },
        { nom: 'Amandes', quantite: '10g', calories: 58, proteines: 2.1, glucides: 2.2, lipides: 5 },
        { nom: 'Lait d\'amande', quantite: '200ml', calories: 30, proteines: 1, glucides: 2, lipides: 2.5 }
      ],
      calories: 428,
      proteines: 32.2,
      glucides: 50.7,
      lipides: 12.2,
      fibres: 6.5,
      objectif: 'Prise de masse',
      emoji: '🥣',
      tempsPreparation: '10 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Porridge crémeux et protéiné, parfait pour commencer la journée.',
      etapes: [
        'Faire chauffer le lait d\'amande dans une casserole',
        'Ajouter les flocons d\'avoine et cuire 5 minutes',
        'Incorporer la protéine en poudre hors du feu',
        'Garnir de banane en rondelles',
        'Saupoudrer d\'amandes concassées'
      ],
      conseils: [
        'Remuer constamment pour éviter les grumeaux',
        'Ajouter plus de lait si trop épais',
        'Servir immédiatement',
        'Varier avec d\'autres fruits'
      ]
    },
    '15': {
      id: '15',
      nom: 'Salade de lentilles',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Lentilles', quantite: '150g', calories: 174, proteines: 13.5, glucides: 33, lipides: 3 },
        { nom: 'Tomates', quantite: '100g', calories: 18, proteines: 0.9, glucides: 3.9, lipides: 0.2 },
        { nom: 'Concombre', quantite: '80g', calories: 13, proteines: 0.6, glucides: 3.2, lipides: 0.1 },
        { nom: 'Poivron rouge', quantite: '50g', calories: 31, proteines: 1, glucides: 7, lipides: 0.3 },
        { nom: 'Vinaigrette', quantite: '15g', calories: 45, proteines: 0, glucides: 1, lipides: 4.5 }
      ],
      calories: 320,
      proteines: 18,
      glucides: 55,
      lipides: 6,
      objectif: 'Équilibre',
      emoji: '🥗',
      tempsPreparation: '15 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Salade légère et protéinée, parfaite pour une sèche.',
      etapes: [
        'Cuire les lentilles dans l\'eau salée',
        'Couper tous les légumes en dés',
        'Mélanger les lentilles refroidies',
        'Ajouter les légumes',
        'Arroser de vinaigrette'
      ],
      conseils: [
        'Utiliser des lentilles sèches pour une cuisson plus rapide',
        'Assaisonner avec des herbes',
        'Servir frais',
        'Ajouter des fruits pour plus de saveur'
      ]
    },
    '16': {
      id: '16',
      nom: 'Fromage blanc aux fruits',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Fromage blanc', quantite: '200g', calories: 144, proteines: 24, glucides: 4, lipides: 0.4 },
        { nom: 'Pomme', quantite: '1 unité', calories: 52, proteines: 0.3, glucides: 14, lipides: 0.2 },
        { nom: 'Mangue', quantite: '50g', calories: 60, proteines: 0.8, glucides: 15, lipides: 0.4 },
        { nom: 'Noix de cajou', quantite: '15g', calories: 276, proteines: 6.4, glucides: 30, lipides: 17.5 },
        { nom: 'Miel', quantite: '10g', calories: 39, proteines: 0, glucides: 10, lipides: 0 }
      ],
      calories: 280,
      proteines: 25,
      glucides: 35,
      lipides: 8,
      objectif: 'Récupération',
      emoji: '🍯',
      tempsPreparation: '5 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Fromage blanc léger et fruité, parfait pour une collation.',
      etapes: [
        'Couper la pomme et la mangue en dés',
        'Mélanger avec le fromage blanc',
        'Ajouter le miel',
        'Saupoudrer de noix de cajou',
        'Servir frais'
      ],
      conseils: [
        'Utiliser du fromage blanc à 0% de MG pour une saveur plus légère',
        'Ajouter des fruits frais',
        'Servir à température ambiante',
        'Conserver au réfrigérateur 24h'
      ]
    },
    '17': {
      id: '17',
      nom: 'Crevettes aux légumes sautés',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Crevettes', quantite: '150g', calories: 198, proteines: 39, glucides: 0, lipides: 2 },
        { nom: 'Brocolis', quantite: '100g', calories: 34, proteines: 2.8, glucides: 7, lipides: 0.4 },
        { nom: 'Poivron rouge', quantite: '80g', calories: 31, proteines: 1, glucides: 7, lipides: 0.3 },
        { nom: 'Chou kale', quantite: '50g', calories: 49, proteines: 4.3, glucides: 9, lipides: 0.9 },
        { nom: 'Huile de coco', quantite: '10g', calories: 862, proteines: 0, glucides: 0, lipides: 100 }
      ],
      calories: 280,
      proteines: 35,
      glucides: 15,
      lipides: 12,
      objectif: 'Sèche',
      emoji: '🍤',
      tempsPreparation: '20 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Crevettes sautées avec légumes et huile de coco, riche en oméga-3 et protéines.',
      etapes: [
        'Décortiquer les crevettes',
        'Couper les légumes en morceaux',
        'Faire chauffer l\'huile de coco',
        'Sauter les crevettes 3 minutes',
        'Ajouter les légumes et cuire 5 min'
      ],
      conseils: [
        'Utiliser des crevettes fraîches',
        'Assaisonner avec des herbes',
        'Servir chaud',
        'Conserver au réfrigérateur 24h'
      ]
    },
    '18': {
      id: '18',
      nom: 'Smoothie tropical',
      categorie: 'Post-training',
      ingredients: [
        { nom: 'Mangue', quantite: '100g', calories: 60, proteines: 0.8, glucides: 15, lipides: 0.4 },
        { nom: 'Banane', quantite: '1 unité', calories: 89, proteines: 1.1, glucides: 23, lipides: 0.3 },
        { nom: 'Yaourt grec', quantite: '150g', calories: 118, proteines: 20, glucides: 7.2, lipides: 0.8 },
        { nom: 'Lait de coco', quantite: '100ml', calories: 30, proteines: 1, glucides: 2, lipides: 2.5 },
        { nom: 'Graines de chia', quantite: '10g', calories: 49, proteines: 1.7, glucides: 4.2, lipides: 3.1 }
      ],
      calories: 350,
      proteines: 18,
      glucides: 55,
      lipides: 12,
      objectif: 'Récupération',
      emoji: '🥤',
      tempsPreparation: '8 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Smoothie frais et tropical, parfait pour la récupération.',
      etapes: [
        'Couper la mangue et banane',
        'Ajouter tous les ingrédients',
        'Mixer jusqu\'à texture lisse',
        'Ajouter des glaçons',
        'Servir immédiatement'
      ],
      conseils: [
        'Utiliser des fruits frais',
        'Ajouter des herbes fraîches',
        'Boire dans les 30 minutes après l\'entraînement',
        'Conserver au réfrigérateur 24h'
      ]
    },
    '19': {
      id: '19',
      nom: 'Bowl de légumes rôtis',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Patates douces', quantite: '150g', calories: 172, proteines: 3.2, glucides: 40, lipides: 0.2 },
        { nom: 'Brocolis', quantite: '100g', calories: 34, proteines: 2.8, glucides: 7, lipides: 0.4 },
        { nom: 'Poivron rouge', quantite: '80g', calories: 31, proteines: 1, glucides: 7, lipides: 0.3 },
        { nom: 'Chou kale', quantite: '50g', calories: 49, proteines: 4.3, glucides: 9, lipides: 0.9 },
        { nom: 'Huile d\'olive', quantite: '15g', calories: 132, proteines: 0, glucides: 0, lipides: 15 }
      ],
      calories: 320,
      proteines: 12,
      glucides: 55,
      lipides: 10,
      objectif: 'Équilibre',
      emoji: '🥗',
      tempsPreparation: '20 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Bowl végétarien équilibré avec légumes rôtis.',
      etapes: [
        'Préchauffer le four à 200°C',
        'Couper tous les légumes',
        'Mélanger avec l\'huile d\'olive',
        'Enfourner 25 minutes',
        'Servir chaud'
      ],
      conseils: [
        'Utiliser des légumes frais',
        'Assaisonner avec des herbes',
        'Servir chaud',
        'Conserver au réfrigérateur 24h'
      ]
    },
    '20': {
      id: '20',
      nom: 'Omelette aux légumes',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Œufs', quantite: '3 unités', calories: 310, proteines: 26, glucides: 2.2, lipides: 22 },
        { nom: 'Poivron rouge', quantite: '50g', calories: 31, proteines: 1, glucides: 7, lipides: 0.3 },
        { nom: 'Chou kale', quantite: '30g', calories: 49, proteines: 4.3, glucides: 9, lipides: 0.9 },
        { nom: 'Fromage râpé', quantite: '20g', calories: 80, proteines: 5, glucides: 0.6, lipides: 6.4 },
        { nom: 'Huile d\'olive', quantite: '5g', calories: 44, proteines: 0, glucides: 0, lipides: 5 }
      ],
      calories: 380,
      proteines: 28,
      glucides: 12,
      lipides: 26,
      objectif: 'Prise de masse',
      emoji: '🍳',
      tempsPreparation: '10 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Omelette protéinée avec légumes et fromage, parfaite pour le petit-déjeuner.',
      etapes: [
        'Couper les légumes finement',
        'Battre les œufs',
        'Faire revenir les légumes',
        'Verser les œufs battus',
        'Ajouter le fromage et plier'
      ],
      conseils: [
        'Utiliser une poêle anti-adhésive',
        'Cuire à feu moyen',
        'Ajouter les légumes encore humides',
        'Servir immédiatement'
      ]
    },
    '21': {
      id: '21',
      nom: 'Salade de fruits énergétique',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Pomme', quantite: '1 unité', calories: 52, proteines: 0.3, glucides: 14, lipides: 0.2 },
        { nom: 'Mangue', quantite: '80g', calories: 60, proteines: 0.8, glucides: 15, lipides: 0.4 },
        { nom: 'Banane', quantite: '1/2 unité', calories: 45, proteines: 0.6, glucides: 11.5, lipides: 0.2 },
        { nom: 'Myrtilles', quantite: '50g', calories: 29, proteines: 0.4, glucides: 7, lipides: 0.2 },
        { nom: 'Noix de cajou', quantite: '15g', calories: 276, proteines: 6.4, glucides: 30, lipides: 17.5 }
      ],
      calories: 220,
      proteines: 4,
      glucides: 45,
      lipides: 6,
      objectif: 'Performance',
      emoji: '🍓',
      tempsPreparation: '10 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Salade de fruits énergétique avec pomme, mangue, banane et myrtilles.',
      etapes: [
        'Couper tous les fruits en dés',
        'Mélanger dans un bol',
        'Ajouter les myrtilles',
        'Saupoudrer de noix de cajou',
        'Servir frais'
      ],
      conseils: [
        'Utiliser des fruits frais',
        'Ajouter des herbes fraîches',
        'Servir à température ambiante',
        'Conserver au réfrigérateur 24h'
      ]
    },
    '22': {
      id: '22',
      nom: 'Curry de lentilles',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Lentilles', quantite: '200g', calories: 380, proteines: 25, glucides: 70, lipides: 8 },
        { nom: 'Tomates', quantite: '150g', calories: 18, proteines: 0.9, glucides: 3.9, lipides: 0.2 },
        { nom: 'Oignons', quantite: '50g', calories: 2, proteines: 0.1, glucides: 0.4, lipides: 0.1 },
        { nom: 'Épices curry', quantite: '10g', calories: 2, proteines: 0.1, glucides: 0.4, lipides: 0.1 },
        { nom: 'Huile de coco', quantite: '10g', calories: 862, proteines: 0, glucides: 0, lipides: 100 }
      ],
      calories: 420,
      proteines: 25,
      glucides: 70,
      lipides: 8,
      objectif: 'Équilibre',
      emoji: '🍛',
      tempsPreparation: '30 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Soupe curry de lentilles légère et rassasiante.',
      etapes: [
        'Faire revenir les oignons',
        'Ajouter les épices curry',
        'Incorporer les tomates',
        'Ajouter les lentilles et eau',
        'Laisser mijoter 30 minutes'
      ],
      conseils: [
        'Utiliser des lentilles sèches',
        'Assaisonner avec des épices',
        'Servir chaud',
        'Conserver au réfrigérateur 3 jours'
      ]
    },
    '23': {
      id: '23',
      nom: 'Granola maison',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Flocons d\'avoine', quantite: '100g', calories: 195, proteines: 8.5, glucides: 33, lipides: 3.5 },
        { nom: 'Amandes', quantite: '30g', calories: 174, proteines: 6.4, glucides: 10, lipides: 2 },
        { nom: 'Noix de cajou', quantite: '20g', calories: 276, proteines: 6.4, glucides: 30, lipides: 17.5 },
        { nom: 'Graines de chia', quantite: '15g', calories: 74, proteines: 2.5, glucides: 6.3, lipides: 4.7 },
        { nom: 'Huile de coco', quantite: '20g', calories: 862, proteines: 0, glucides: 0, lipides: 100 }
      ],
      calories: 580,
      proteines: 18,
      glucides: 65,
      lipides: 28,
      objectif: 'Performance',
      emoji: '🥣',
      tempsPreparation: '15 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Granola maison léger et énergétique, parfait pour le petit-déjeuner.',
      etapes: [
        'Mélanger tous les ingrédients',
        'Ajouter l\'huile de coco fondue',
        'Étaler sur une plaque',
        'Enfourner 20 min à 180°C',
        'Laisser refroidir avant de servir'
      ],
      conseils: [
        'Utiliser des flocons d\'avoine séchés',
        'Ajouter des fruits secs',
        'Servir à température ambiante',
        'Conserver au réfrigérateur 24h'
      ]
    },
    '24': {
      id: '24',
      nom: 'Haricots verts vapeur au saumon',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Saumon', quantite: '150g', calories: 312, proteines: 37.5, glucides: 0, lipides: 18 },
        { nom: 'Haricots verts', quantite: '200g', calories: 62, proteines: 3.6, glucides: 14, lipides: 0.2 },
        { nom: 'Pomme de terre', quantite: '150g', calories: 116, proteines: 3, glucides: 26, lipides: 0.2 },
        { nom: 'Ail', quantite: '2 gousses', calories: 9, proteines: 0.4, glucides: 2, lipides: 0 },
        { nom: 'Huile d\'olive', quantite: '10g', calories: 88, proteines: 0, glucides: 0, lipides: 10 }
      ],
      calories: 587,
      proteines: 44.5,
      glucides: 42,
      lipides: 28.4,
      fibres: 6.2,
      objectif: 'Récupération',
      emoji: '🐟',
      tempsPreparation: '25 min',
      portions: 1,
      difficulte: 'Facile',
      description: 'Repas complet avec saumon grillé et légumes vapeur.',
      etapes: [
        'Cuire les pommes de terre à l\'eau 15 minutes',
        'Cuire les haricots verts à la vapeur 5 minutes',
        'Griller le saumon avec l\'ail 8-10 minutes',
        'Assaisonner avec huile d\'olive et herbes',
        'Servir chaud avec les légumes'
      ],
      conseils: [
        'Ne pas trop cuire le saumon',
        'Garder les haricots verts croquants',
        'Assaisonner généreusement',
        'Servir immédiatement'
      ]
    },
    '25': {
      id: '25',
      nom: 'Salade de dinde aux noix',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Dinde', quantite: '120g', calories: 189, proteines: 29, glucides: 0, lipides: 7 },
        { nom: 'Salade verte', quantite: '100g', calories: 23, proteines: 2.9, glucides: 3.6, lipides: 0.4 },
        { nom: 'Noix de Grenoble', quantite: '20g', calories: 130, proteines: 3, glucides: 14, lipides: 12 },
        { nom: 'Kiwi', quantite: '1 unité', calories: 41, proteines: 0.8, glucides: 10, lipides: 0.4 },
        { nom: 'Vinaigrette', quantite: '15g', calories: 45, proteines: 0, glucides: 1, lipides: 4.5 }
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
    '26': {
      id: '26',
      nom: 'Smoothie vert détox',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Épinards', quantite: '50g', calories: 12, proteines: 1.5, glucides: 1.8, lipides: 0.2 },
        { nom: 'Kiwi', quantite: '1 unité', calories: 41, proteines: 0.8, glucides: 10, lipides: 0.4 },
        { nom: 'Gingembre', quantite: '5g', calories: 80, proteines: 1.8, glucides: 18, lipides: 0.8 },
        { nom: 'Miel', quantite: '10g', calories: 304, proteines: 0.3, glucides: 82, lipides: 0 },
        { nom: 'Eau de coco', quantite: '200ml', calories: 30, proteines: 1, glucides: 2, lipides: 2.5 }
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
    '27': {
      id: '27',
      nom: 'Curry de légumes aux épices',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Pommes de terre', quantite: '200g', calories: 172, proteines: 3.2, glucides: 40, lipides: 0.2 },
        { nom: 'Haricots verts', quantite: '150g', calories: 62, proteines: 3.6, glucides: 14, lipides: 0.2 },
        { nom: 'Tomates', quantite: '100g', calories: 18, proteines: 0.9, glucides: 3.9, lipides: 0.2 },
        { nom: 'Ail', quantite: '3 gousses', calories: 9, proteines: 0.4, glucides: 2, lipides: 0 },
        { nom: 'Épices curry', quantite: '15g', calories: 2, proteines: 0.1, glucides: 0.4, lipides: 0.1 }
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
    '28': {
      id: '28',
      nom: 'Toast à l\'avocat et œuf',
      categorie: 'Petit-déjeuner',
      ingredients: [
        { nom: 'Pain complet', quantite: '2 tranches', calories: 150, proteines: 5, glucides: 25, lipides: 3 },
        { nom: 'Avocat', quantite: '1/2 unité', calories: 80, proteines: 1, glucides: 4.5, lipides: 7.5 },
        { nom: 'Œuf', quantite: '1 unité', calories: 189, proteines: 29, glucides: 0, lipides: 7 },
        { nom: 'Gingembre', quantite: '3g', calories: 80, proteines: 1.8, glucides: 18, lipides: 0.8 },
        { nom: 'Huile d\'olive', quantite: '5g', calories: 44, proteines: 0, glucides: 0, lipides: 5 }
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
    '29': {
      id: '29',
      nom: 'Thé vert aux fruits',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Thé vert', quantite: '250ml', calories: 1, proteines: 0.2, glucides: 0, lipides: 0 },
        { nom: 'Kiwi', quantite: '1 unité', calories: 41, proteines: 0.8, glucides: 10, lipides: 0.4 },
        { nom: 'Miel', quantite: '5g', calories: 304, proteines: 0.3, glucides: 82, lipides: 0 },
        { nom: 'Gingembre', quantite: '2g', calories: 80, proteines: 1.8, glucides: 18, lipides: 0.8 },
        { nom: 'Citron', quantite: '1/2 unité', calories: 52, proteines: 0.3, glucides: 14, lipides: 0.2 }
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
    '30': {
      id: '30',
      nom: 'Bowl de légumes rôtis aux herbes',
      categorie: 'Déjeuner',
      ingredients: [
        { nom: 'Pommes de terre', quantite: '200g', calories: 172, proteines: 3.2, glucides: 40, lipides: 0.2 },
        { nom: 'Haricots verts', quantite: '100g', calories: 62, proteines: 3.6, glucides: 14, lipides: 0.2 },
        { nom: 'Ail', quantite: '4 gousses', calories: 9, proteines: 0.4, glucides: 2, lipides: 0 },
        { nom: 'Herbes de Provence', quantite: '10g', calories: 2, proteines: 0.1, glucides: 0.4, lipides: 0.1 },
        { nom: 'Huile d\'olive', quantite: '15g', calories: 132, proteines: 0, glucides: 0, lipides: 15 }
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
    '31': {
      id: '31',
      nom: 'Café protéiné',
      categorie: 'Pre-workout',
      ingredients: [
        { nom: 'Café', quantite: '200ml', calories: 15, proteines: 0.5, glucides: 1, lipides: 1.3 },
        { nom: 'Protéine vanille', quantite: '20g', calories: 100, proteines: 20, glucides: 2, lipides: 1 },
        { nom: 'Miel', quantite: '10g', calories: 304, proteines: 0.3, glucides: 82, lipides: 0 },
        { nom: 'Lait d\'amande', quantite: '50ml', calories: 30, proteines: 1, glucides: 2, lipides: 2.5 },
        { nom: 'Cannelle', quantite: '2g', calories: 2, proteines: 0.3, glucides: 0, lipides: 0 }
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
    '32': {
      id: '32',
      nom: 'Salade de fruits aux noix',
      categorie: 'Collation',
      ingredients: [
        { nom: 'Kiwi', quantite: '2 unités', calories: 89, proteines: 1.1, glucides: 23, lipides: 0.3 },
        { nom: 'Pomme', quantite: '1 unité', calories: 52, proteines: 0.3, glucides: 14, lipides: 0.2 },
        { nom: 'Noix de Grenoble', quantite: '25g', calories: 130, proteines: 3, glucides: 14, lipides: 12 },
        { nom: 'Miel', quantite: '8g', calories: 304, proteines: 0.3, glucides: 82, lipides: 0 },
        { nom: 'Gingembre', quantite: '3g', calories: 80, proteines: 1.8, glucides: 18, lipides: 0.8 }
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
    '33': {
      id: '33',
      nom: 'Dinde aux légumes vapeur',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Dinde', quantite: '150g', calories: 189, proteines: 29, glucides: 0, lipides: 7 },
        { nom: 'Haricots verts', quantite: '100g', calories: 62, proteines: 3.6, glucides: 14, lipides: 0.2 },
        { nom: 'Pommes de terre', quantite: '150g', calories: 116, proteines: 3, glucides: 26, lipides: 0.2 },
        { nom: 'Ail', quantite: '2 gousses', calories: 9, proteines: 0.4, glucides: 2, lipides: 0 },
        { nom: 'Herbes', quantite: '5g', calories: 2, proteines: 0.1, glucides: 0.4, lipides: 0.1 }
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
    '34': {
      id: '34',
      nom: 'Soupe de céleri détox',
      categorie: 'Dîner',
      ingredients: [
        { nom: 'Céleri', quantite: '200g', calories: 32, proteines: 1.4, glucides: 6, lipides: 0.4 },
        { nom: 'Pommes de terre', quantite: '100g', calories: 77, proteines: 2, glucides: 17, lipides: 0.1 },
        { nom: 'Oignons', quantite: '50g', calories: 20, proteines: 0.5, glucides: 4.7, lipides: 0.1 },
        { nom: 'Ail', quantite: '2 gousses', calories: 9, proteines: 0.4, glucides: 2, lipides: 0 },
        { nom: 'Bouillon de légumes', quantite: '300ml', calories: 15, proteines: 1.5, glucides: 3, lipides: 0 }
      ],
      calories: 153,
      proteines: 5.3,
      glucides: 32.7,
      lipides: 0.6,
      fibres: 4.8,
      objectif: 'Sèche',
      emoji: '🍲',
      tempsPreparation: '25 min',
      portions: 2,
      difficulte: 'Facile',
      description: 'Soupe légère et détoxifiante, parfaite pour une sèche.',
      etapes: [
        'Couper tous les légumes en dés',
        'Faire revenir l\'oignon et l\'ail',
        'Ajouter les légumes et le bouillon',
        'Laisser mijoter 20 minutes',
        'Mixer jusqu\'à obtenir une texture lisse'
      ],
      conseils: [
        'Utiliser des légumes frais',
        'Assaisonner avec des herbes',
        'Servir chaud',
        'Conserver au réfrigérateur 3 jours'
      ]
    }
  };

  // Récupérer le repas selon l'ID
  const repas = repasDatabase[id as keyof typeof repasDatabase];

  if (!repas) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Repas non trouvé</h1>
          <Button onClick={() => navigate('/nutrition')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la nutrition
          </Button>
        </div>
      </div>
    );
  }

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

  const getDifficultyColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Facile': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Difficile': return 'bg-red-100 text-red-800';
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
          <div className="text-3xl md:text-4xl">{repas.emoji}</div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 truncate">{repas.nom}</h1>
            <p className="text-gray-600">{'description' in repas ? repas.description : ''}</p>
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
        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Valeurs nutritionnelles */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-green-600" />
                Valeurs nutritionnelles totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-orange-600">{repas.calories}</div>
                  <div className="text-sm text-orange-700">Calories</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">{repas.proteines}g</div>
                  <div className="text-sm text-blue-700">Protéines</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-green-600">{repas.glucides}g</div>
                  <div className="text-sm text-green-700">Glucides</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600">{repas.lipides}g</div>
                  <div className="text-sm text-purple-700">Lipides</div>
                </div>
              </div>
              <div className="mt-4 text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-gray-800">{'fibres' in repas ? repas.fibres : 0}g</div>
                <div className="text-sm text-gray-600">Fibres</div>
              </div>
            </CardContent>
          </Card>

          {/* Ingrédients détaillés */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-blue-600" />
                Ingrédients détaillés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {repas.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{ingredient.nom}</h4>
                      <p className="text-sm text-gray-600">{ingredient.quantite}</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-orange-600">{ingredient.calories}</div>
                        <div className="text-gray-600">cal</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{ingredient.proteines}g</div>
                        <div className="text-gray-600">prot</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">{ingredient.glucides}g</div>
                        <div className="text-gray-600">gluc</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-600">{ingredient.lipides}g</div>
                        <div className="text-gray-600">lip</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Étapes de préparation */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-green-600" />
                Étapes de préparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {repas.etapes.map((etape, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{etape}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Conseils du chef
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {('conseils' in repas ? repas.conseils : []).map((conseil: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">{conseil}</span>
                  </li>
                ))}
              </ul>
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
                <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                  {repas.categorie}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Objectif</span>
                <Badge className={getClasseColor(repas.objectif)}>
                  {repas.objectif}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Difficulté</span>
                <Badge className={getDifficultyColor('difficulte' in repas ? repas.difficulte : 'Facile')}>
                  {'difficulte' in repas ? repas.difficulte : 'Facile'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Temps et portions */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Détails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-800">{'tempsPreparation' in repas ? repas.tempsPreparation : '30 min'}</div>
                  <div className="text-sm text-gray-600">Temps de préparation</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-800">{'portions' in repas ? repas.portions : 1}</div>
                  <div className="text-sm text-gray-600">Portion{('portions' in repas && repas.portions > 1) ? 's' : ''}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter au planning
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Ajouter aux favoris
                </Button>
                <Button variant="outline" className="w-full">
                  <ChefHat className="h-4 w-4 mr-2" />
                  Modifier la recette
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RepasDetail; 