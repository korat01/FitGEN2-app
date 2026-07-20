// Données de nutrition pour l'application FitGEN2
export interface Aliment {
  id: string;
  nom: string;
  categorie: string;
  calories: number;
  proteines: number;
    glucides: number;
    lipides: number;
    fibres: number;
  sodium: number;
  image?: string;
  description?: string;
}

export interface Recette {
  id: string;
  nom: string;
  description: string;
  tempsPreparation: number;
  difficulte: 'facile' | 'moyen' | 'difficile';
  portions: number;
  ingredients: Array<{
    aliment: Aliment;
    quantite: number;
    unite: string;
  }>;
  instructions: string[];
  caloriesParPortion: number;
  image?: string;
  tags: string[];
  emoji: string;
  /** Objectif nutritionnel principal — même classification que Repas.objectif pour un filtrage cohérent. */
  classe: 'Prise de masse' | 'Sèche' | 'Récupération' | 'Anti-inflammatoire' | 'Boost performance' | 'Équilibre';
}

export interface Repas {
  id: string;
  nom: string;
  type: 'petit-dejeuner' | 'dejeuner' | 'diner' | 'collation';
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
  aliments: Array<{
    aliment: Aliment;
    quantite: number;
    unite: string;
  }>;
  date: Date;
}

// Base de données des aliments
export const ALIMENTS: Aliment[] = [
  // Protéines
  {
    id: '1',
    nom: 'Poulet (poitrine)',
    categorie: 'proteines',
    calories: 165,
    proteines: 31,
    glucides: 0,
    lipides: 3.6,
    fibres: 0,
    sodium: 74,
    description: 'Viande maigre riche en protéines' },
  {
    id: '2',
    nom: 'Saumon',
    categorie: 'proteines',
    calories: 208,
    proteines: 25,
    glucides: 0,
    lipides: 12,
    fibres: 0,
    sodium: 44,
    description: 'Poisson riche en oméga-3' },
  {
    id: '3',
    nom: 'Œufs',
    categorie: 'proteines',
    calories: 155,
    proteines: 13,
    glucides: 1.1,
    lipides: 11,
    fibres: 0,
    sodium: 124,
    description: 'Protéines complètes et vitamines' },
  {
    id: '4',
    nom: 'Fromage blanc 0%',
    categorie: 'proteines',
    calories: 52,
    proteines: 10,
    glucides: 3.5,
    lipides: 0.1,
    fibres: 0,
    sodium: 50,
    description: 'Protéines maigres et calcium' },

  // Glucides
  {
    id: '5',
    nom: 'Riz complet',
    categorie: 'glucides',
    calories: 111,
    proteines: 2.6,
    glucides: 23,
    lipides: 0.9,
    fibres: 1.8,
    sodium: 5,
    description: 'Glucides complexes et fibres' },
  {
    id: '6',
    nom: 'Avoine',
    categorie: 'glucides',
    calories: 389,
    proteines: 17,
    glucides: 66,
    lipides: 7,
    fibres: 11,
    sodium: 2,
    description: 'Céréale complète riche en fibres' },
  {
    id: '7',
    nom: 'Patate douce',
    categorie: 'glucides',
    calories: 86,
    proteines: 1.6,
    glucides: 20,
    lipides: 0.1,
    fibres: 3,
    sodium: 4,
    description: 'Glucides complexes et bêta-carotène' },
  {
    id: '8',
    nom: 'Banane',
    categorie: 'glucides',
    calories: 89,
    proteines: 1.1,
    glucides: 23,
    lipides: 0.3,
    fibres: 2.6,
    sodium: 1,
    description: 'Fruit riche en potassium' },

  // Lipides
  {
    id: '9',
    nom: 'Avocat',
    categorie: 'lipides',
    calories: 160,
    proteines: 2,
    glucides: 9,
    lipides: 15,
    fibres: 7,
    sodium: 7,
    description: 'Fruit riche en acides gras monoinsaturés' },
  {
    id: '10',
    nom: 'Amandes',
    categorie: 'lipides',
    calories: 579,
    proteines: 21,
    glucides: 22,
    lipides: 50,
    fibres: 12,
    sodium: 1,
    description: 'Noix riches en vitamine E' },
  {
    id: '11',
    nom: 'Huile d\'olive',
    categorie: 'lipides',
    calories: 884,
    proteines: 0,
    glucides: 0,
    lipides: 100,
    fibres: 0,
    sodium: 2,
    description: 'Huile riche en acides gras monoinsaturés' },

  // Légumes
  {
    id: '12',
    nom: 'Brocoli',
    categorie: 'legumes',
    calories: 34,
    proteines: 2.8,
    glucides: 7,
    lipides: 0.4,
    fibres: 2.6,
    sodium: 33,
    description: 'Légume crucifère riche en vitamines' },
  {
    id: '13',
    nom: 'Épinards',
    categorie: 'legumes',
    calories: 23,
    proteines: 2.9,
    glucides: 3.6,
    lipides: 0.4,
    fibres: 2.2,
    sodium: 79,
    description: 'Légume vert riche en fer et folates' },
  {
    id: '14',
    nom: 'Tomate',
    categorie: 'legumes',
    calories: 18,
    proteines: 0.9,
    glucides: 3.9,
    lipides: 0.2,
    fibres: 1.2,
    sodium: 5,
    description: 'Fruit-légume riche en lycopène' },

  // Compléments et ingrédients pour recettes (petit-déjeuner, post-training, etc.)
  {
    id: '15',
    nom: 'Riz basmati',
    categorie: 'glucides',
    calories: 130,
    proteines: 2.7,
    glucides: 28,
    lipides: 0.3,
    fibres: 0.4,
    sodium: 1,
    description: 'Riz long grain parfumé, digestion rapide' },
  {
    id: '16',
    nom: 'Pâtes complètes',
    categorie: 'glucides',
    calories: 124,
    proteines: 5,
    glucides: 25,
    lipides: 1.1,
    fibres: 3.5,
    sodium: 2,
    description: 'Pâtes complètes cuites, glucides à index modéré' },
  {
    id: '17',
    nom: 'Thon en conserve',
    categorie: 'proteines',
    calories: 116,
    proteines: 25.5,
    glucides: 0,
    lipides: 0.8,
    fibres: 0,
    sodium: 247,
    description: 'Poisson maigre riche en protéines' },
  {
    id: '18',
    nom: 'Dinde (blanc)',
    categorie: 'proteines',
    calories: 135,
    proteines: 30,
    glucides: 0,
    lipides: 1,
    fibres: 0,
    sodium: 70,
    description: 'Viande blanche très maigre et riche en protéines' },
  {
    id: '19',
    nom: 'Protéine en poudre (whey)',
    categorie: 'proteines',
    calories: 380,
    proteines: 80,
    glucides: 8,
    lipides: 4,
    fibres: 0,
    sodium: 150,
    description: 'Concentré protéique, pratique post-entraînement' },
  {
    id: '20',
    nom: 'Lait d\'amande',
    categorie: 'lipides',
    calories: 13,
    proteines: 0.4,
    glucides: 0.3,
    lipides: 1.1,
    fibres: 0.3,
    sodium: 36,
    description: 'Boisson végétale peu calorique' },
  {
    id: '21',
    nom: 'Graines de chia',
    categorie: 'lipides',
    calories: 486,
    proteines: 17,
    glucides: 42,
    lipides: 31,
    fibres: 34,
    sodium: 16,
    description: 'Petites graines très riches en fibres et oméga-3' },
  {
    id: '22',
    nom: 'Yaourt grec nature',
    categorie: 'proteines',
    calories: 59,
    proteines: 10,
    glucides: 3.6,
    lipides: 0.4,
    fibres: 0,
    sodium: 36,
    description: 'Laitage épais riche en protéines' },
  {
    id: '23',
    nom: 'Beurre de cacahuète',
    categorie: 'lipides',
    calories: 588,
    proteines: 25,
    glucides: 20,
    lipides: 50,
    fibres: 6,
    sodium: 17,
    description: 'Purée d\'arachides, calorique et rassasiante' },
  {
    id: '24',
    nom: 'Miel',
    categorie: 'glucides',
    calories: 304,
    proteines: 0.3,
    glucides: 82,
    lipides: 0,
    fibres: 0.2,
    sodium: 4,
    description: 'Sucre naturel à index glycémique élevé' },
  {
    id: '25',
    nom: 'Fromage cottage',
    categorie: 'proteines',
    calories: 98,
    proteines: 11,
    glucides: 3.4,
    lipides: 4.3,
    fibres: 0,
    sodium: 364,
    description: 'Fromage frais riche en caséine (protéines lentes)' },
  {
    id: '26',
    nom: 'Lentilles cuites',
    categorie: 'glucides',
    calories: 116,
    proteines: 9,
    glucides: 20,
    lipides: 0.4,
    fibres: 7.9,
    sodium: 2,
    description: 'Légumineuse riche en protéines végétales et fibres' },

  // Encore plus d'ingrédients, pour varier davantage les recettes
  {
    id: '27',
    nom: 'Pain complet',
    categorie: 'glucides',
    calories: 247,
    proteines: 13,
    glucides: 41,
    lipides: 4.2,
    fibres: 7,
    sodium: 490,
    description: 'Pain à base de farine complète, riche en fibres' },
  {
    id: '28',
    nom: 'Quinoa cuit',
    categorie: 'glucides',
    calories: 120,
    proteines: 4.4,
    glucides: 21.3,
    lipides: 1.9,
    fibres: 2.8,
    sodium: 7,
    description: 'Pseudo-céréale complète, sans gluten' },
  {
    id: '29',
    nom: 'Bœuf haché 5% MG',
    categorie: 'proteines',
    calories: 137,
    proteines: 21,
    glucides: 0,
    lipides: 5,
    fibres: 0,
    sodium: 65,
    description: 'Viande rouge maigre, riche en fer et B12' },
  {
    id: '30',
    nom: 'Crevettes',
    categorie: 'proteines',
    calories: 99,
    proteines: 24,
    glucides: 0,
    lipides: 0.3,
    fibres: 0,
    sodium: 111,
    description: 'Fruit de mer très maigre, riche en protéines' },
  {
    id: '31',
    nom: 'Poivron rouge',
    categorie: 'legumes',
    calories: 31,
    proteines: 1,
    glucides: 6,
    lipides: 0.3,
    fibres: 2.5,
    sodium: 4,
    description: 'Légume croquant très riche en vitamine C' },
  {
    id: '32',
    nom: 'Courgette',
    categorie: 'legumes',
    calories: 17,
    proteines: 1.2,
    glucides: 3.1,
    lipides: 0.3,
    fibres: 1,
    sodium: 8,
    description: 'Légume léger et peu calorique' },
  {
    id: '33',
    nom: 'Myrtilles',
    categorie: 'glucides',
    calories: 57,
    proteines: 0.7,
    glucides: 14,
    lipides: 0.3,
    fibres: 2.4,
    sodium: 1,
    description: 'Petit fruit riche en antioxydants' },
  {
    id: '34',
    nom: 'Riz blanc',
    categorie: 'glucides',
    calories: 130,
    proteines: 2.4,
    glucides: 28,
    lipides: 0.2,
    fibres: 0.4,
    sodium: 1,
    description: 'Glucide simple, digestion rapide' },
  {
    id: '35',
    nom: 'Houmous',
    categorie: 'lipides',
    calories: 166,
    proteines: 8,
    glucides: 14,
    lipides: 10,
    fibres: 6,
    sodium: 380,
    description: 'Purée de pois chiches, riche en fibres et bons gras' },
  {
    id: '36',
    nom: 'Kiwi',
    categorie: 'glucides',
    calories: 61,
    proteines: 1.1,
    glucides: 15,
    lipides: 0.5,
    fibres: 3,
    sodium: 3,
    description: 'Fruit riche en vitamine C' },

  // Ingrédients supplémentaires (pour atteindre 100 recettes avec une vraie variété)
  { id: '37', nom: 'Tofu ferme', categorie: 'proteines', calories: 145, proteines: 15, glucides: 4, lipides: 9, fibres: 2, sodium: 10, description: 'Protéine végétale à base de soja' },
  { id: '38', nom: 'Pois chiches cuits', categorie: 'glucides', calories: 164, proteines: 8.9, glucides: 27, lipides: 2.6, fibres: 8, sodium: 7, description: 'Légumineuse riche en protéines et fibres' },
  { id: '39', nom: 'Champignons', categorie: 'legumes', calories: 22, proteines: 3.1, glucides: 3.3, lipides: 0.3, fibres: 1, sodium: 5, description: 'Légume peu calorique et umami' },
  { id: '40', nom: 'Carotte', categorie: 'legumes', calories: 41, proteines: 0.9, glucides: 10, lipides: 0.2, fibres: 2.8, sodium: 69, description: 'Légume riche en bêta-carotène' },
  { id: '41', nom: 'Chou-fleur', categorie: 'legumes', calories: 25, proteines: 1.9, glucides: 5, lipides: 0.3, fibres: 2, sodium: 30, description: 'Légume crucifère léger' },
  { id: '42', nom: 'Pomme', categorie: 'glucides', calories: 52, proteines: 0.3, glucides: 14, lipides: 0.2, fibres: 2.4, sodium: 1, description: 'Fruit riche en fibres' },
  { id: '43', nom: 'Orange', categorie: 'glucides', calories: 47, proteines: 0.9, glucides: 12, lipides: 0.1, fibres: 2.4, sodium: 0, description: 'Fruit riche en vitamine C' },
  { id: '44', nom: 'Noix de cajou', categorie: 'lipides', calories: 553, proteines: 18, glucides: 30, lipides: 44, fibres: 3.3, sodium: 12, description: 'Fruit à coque crémeux' },
  { id: '45', nom: 'Graines de tournesol', categorie: 'lipides', calories: 584, proteines: 21, glucides: 20, lipides: 51, fibres: 8.6, sodium: 9, description: 'Graines riches en vitamine E' },
  { id: '46', nom: 'Jambon de dinde', categorie: 'proteines', calories: 104, proteines: 17, glucides: 1.5, lipides: 3, fibres: 0, sodium: 1050, description: 'Charcuterie maigre de dinde' },
  { id: '47', nom: 'Feta', categorie: 'proteines', calories: 264, proteines: 14, glucides: 4, lipides: 21, fibres: 0, sodium: 917, description: 'Fromage de brebis affiné' },
  { id: '48', nom: 'Pomme de terre', categorie: 'glucides', calories: 77, proteines: 2, glucides: 17, lipides: 0.1, fibres: 2.2, sodium: 6, description: 'Tubercule riche en potassium' },
  { id: '49', nom: 'Concombre', categorie: 'legumes', calories: 16, proteines: 0.7, glucides: 3.6, lipides: 0.1, fibres: 0.5, sodium: 2, description: 'Légume très hydratant' }
];

// Ajout de 20 nouveaux aliments
export const aliments = [
  // Protéines
  {
    id: '1',
    nom: 'Poulet (poitrine)',
    categorie: 'proteines',
    calories: 165,
    proteines: 31,
    glucides: 0,
    lipides: 3.6,
    fibres: 0,
    sodium: 74,
    description: 'Viande maigre riche en protéines'
  },
  {
    id: '2',
    nom: 'Saumon',
    categorie: 'proteines',
    calories: 208,
    proteines: 25,
    glucides: 0,
    lipides: 12,
    fibres: 0,
    sodium: 44,
    description: 'Poisson riche en oméga-3'
  },
  {
    id: '3',
    nom: 'Œufs',
    categorie: 'proteines',
    calories: 155,
    proteines: 13,
    glucides: 1.1,
    lipides: 11,
    fibres: 0,
    sodium: 124,
    description: 'Protéines complètes et vitamines'
  },
  {
    id: '4',
    nom: 'Fromage blanc 0%',
    categorie: 'proteines',
    calories: 52,
    proteines: 10,
    glucides: 3.5,
    lipides: 0.1,
    fibres: 0,
    sodium: 50,
    description: 'Protéines maigres et calcium'
  },

  // Glucides
  {
    id: '5',
    nom: 'Riz complet',
    categorie: 'glucides',
    calories: 111,
    proteines: 2.6,
    glucides: 23,
    lipides: 0.9,
    fibres: 1.8,
    sodium: 5,
    description: 'Glucides complexes et fibres'
  },
  {
    id: '6',
    nom: 'Avoine',
    categorie: 'glucides',
    calories: 389,
    proteines: 17,
    glucides: 66,
    lipides: 7,
    fibres: 11,
    sodium: 2,
    description: 'Céréale complète riche en fibres'
  },
  {
    id: '7',
    nom: 'Patate douce',
    categorie: 'glucides',
    calories: 86,
    proteines: 1.6,
    glucides: 20,
    lipides: 0.1,
    fibres: 3,
    sodium: 4,
    description: 'Glucides complexes et bêta-carotène'
  },
  {
    id: '8',
    nom: 'Banane',
    categorie: 'glucides',
    calories: 89,
    proteines: 1.1,
    glucides: 23,
    lipides: 0.3,
    fibres: 2.6,
    sodium: 1,
    description: 'Fruit riche en potassium'
  },

  // Lipides
  {
    id: '9',
    nom: 'Avocat',
    categorie: 'lipides',
    calories: 160,
    proteines: 2,
    glucides: 9,
    lipides: 15,
    fibres: 7,
    sodium: 7,
    description: 'Fruit riche en acides gras monoinsaturés'
  },
  {
    id: '10',
    nom: 'Amandes',
    categorie: 'lipides',
    calories: 579,
    proteines: 21,
    glucides: 22,
    lipides: 50,
    fibres: 12,
    sodium: 1,
    description: 'Noix riches en vitamine E'
  },
  {
    id: '11',
    nom: 'Huile d\'olive',
    categorie: 'lipides',
    calories: 884,
    proteines: 0,
    glucides: 0,
    lipides: 100,
    fibres: 0,
    sodium: 2,
    description: 'Huile riche en acides gras monoinsaturés'
  },

  // Légumes
  {
    id: '12',
    nom: 'Brocoli',
    categorie: 'legumes',
    calories: 34,
    proteines: 2.8,
    glucides: 7,
    lipides: 0.4,
    fibres: 2.6,
    sodium: 33,
    description: 'Légume crucifère riche en vitamines'
  },
  {
    id: '13',
    nom: 'Épinards',
    categorie: 'legumes',
    calories: 23,
    proteines: 2.9,
    glucides: 3.6,
    lipides: 0.4,
    fibres: 2.2,
    sodium: 79,
    description: 'Légume vert riche en fer et folates'
  },
  {
    id: '14',
    nom: 'Tomate',
    categorie: 'legumes',
    calories: 18,
    proteines: 0.9,
    glucides: 3.9,
    lipides: 0.2,
    fibres: 1.2,
    sodium: 5,
    description: 'Fruit-légume riche en lycopène'
  },

  // Nouveaux aliments ajoutés
  {
    id: 'saumon',
    nom: 'Saumon',
    categorie: 'Poissons',
    calories: 208,
    proteines: 25.4,
    glucides: 0,
    lipides: 12.4,
    fibres: 0,
    sodium: 59,
    potassium: 628,
    calcium: 12,
    fer: 0.8,
    vitaminC: 0,
    vitaminA: 58
  },
  {
    id: 'avocat',
    nom: 'Avocat',
    categorie: 'Fruits',
    calories: 160,
    proteines: 2,
    glucides: 8.5,
    lipides: 14.7,
    fibres: 6.7,
    sodium: 7,
    potassium: 485,
    calcium: 12,
    fer: 0.6,
    vitaminC: 10,
    vitaminA: 7
  },
  {
    id: 'quinoa',
    nom: 'Quinoa cuit',
    categorie: 'Céréales',
    calories: 120,
    proteines: 4.4,
    glucides: 21.3,
    lipides: 1.9,
    fibres: 2.8,
    sodium: 7,
    potassium: 172,
    calcium: 17,
    fer: 1.5,
    vitaminC: 0,
    vitaminA: 0
  },
  {
    id: 'amandes',
    nom: 'Amandes',
    categorie: 'Fruits secs',
    calories: 579,
    proteines: 21.2,
    glucides: 21.6,
    lipides: 49.9,
    fibres: 12.5,
    sodium: 1,
    potassium: 733,
    calcium: 269,
    fer: 3.7,
    vitaminC: 0,
    vitaminA: 0
  },
  {
    id: 'brocoli',
    nom: 'Brocoli',
    categorie: 'Légumes',
    calories: 34,
    proteines: 2.8,
    glucides: 7,
    lipides: 0.4,
    fibres: 2.6,
    sodium: 33,
    potassium: 316,
    calcium: 47,
    fer: 0.7,
    vitaminC: 89,
    vitaminA: 31
  },
  {
    id: 'thon',
    nom: 'Thon en conserve',
    categorie: 'Poissons',
    calories: 116,
    proteines: 25.5,
    glucides: 0,
    lipides: 0.8,
    fibres: 0,
    sodium: 247,
    potassium: 237,
    calcium: 7,
    fer: 0.8,
    vitaminC: 0,
    vitaminA: 4
  },
  {
    id: 'patate_douce',
    nom: 'Patate douce',
    categorie: 'Légumes',
    calories: 86,
    proteines: 1.6,
    glucides: 20.1,
    lipides: 0.1,
    fibres: 3,
    sodium: 54,
    potassium: 337,
    calcium: 30,
    fer: 0.6,
    vitaminC: 2.4,
    vitaminA: 709
  },
  {
    id: 'yaourt_grec',
    nom: 'Yaourt grec nature',
    categorie: 'Produits laitiers',
    calories: 59,
    proteines: 10,
    glucides: 3.6,
    lipides: 0.4,
    fibres: 0,
    sodium: 36,
    potassium: 141,
    calcium: 110,
    fer: 0.1,
    vitaminC: 0,
    vitaminA: 2
  },
  {
    id: 'lentilles',
    nom: 'Lentilles cuites',
    categorie: 'Légumineuses',
    calories: 116,
    proteines: 9,
    glucides: 20.1,
    lipides: 0.4,
    fibres: 7.9,
    sodium: 2,
    potassium: 369,
    calcium: 19,
    fer: 3.3,
    vitaminC: 1.5,
    vitaminA: 0
  },
  {
    id: 'epinards',
    nom: 'Épinards frais',
    categorie: 'Légumes',
    calories: 23,
    proteines: 2.9,
    glucides: 3.6,
    lipides: 0.4,
    fibres: 2.2,
    sodium: 79,
    potassium: 558,
    calcium: 99,
    fer: 2.7,
    vitaminC: 28,
    vitaminA: 469
  },
  {
    id: 'noix',
    nom: 'Noix',
    categorie: 'Fruits secs',
    calories: 654,
    proteines: 15.2,
    glucides: 13.7,
    lipides: 65.2,
    fibres: 6.7,
    sodium: 2,
    potassium: 441,
    calcium: 98,
    fer: 2.9,
    vitaminC: 1.3,
    vitaminA: 1
  },
  {
    id: 'tomate',
    nom: 'Tomate',
    categorie: 'Légumes',
    calories: 18,
    proteines: 0.9,
    glucides: 3.9,
    lipides: 0.2,
    fibres: 1.2,
    sodium: 5,
    potassium: 237,
    calcium: 10,
    fer: 0.3,
    vitaminC: 14,
    vitaminA: 42
  },
  {
    id: 'sardines',
    nom: 'Sardines en conserve',
    categorie: 'Poissons',
    calories: 208,
    proteines: 24.6,
    glucides: 0,
    lipides: 11.5,
    fibres: 0,
    sodium: 307,
    potassium: 397,
    calcium: 382,
    fer: 2.9,
    vitaminC: 0,
    vitaminA: 32
  },
  {
    id: 'flocons_avoine',
    nom: 'Flocons d\'avoine',
    categorie: 'Céréales',
    calories: 389,
    proteines: 16.9,
    glucides: 66.3,
    lipides: 6.9,
    fibres: 10.6,
    sodium: 2,
    potassium: 429,
    calcium: 54,
    fer: 4.7,
    vitaminC: 0,
    vitaminA: 0
  },
  {
    id: 'courgette',
    nom: 'Courgette',
    categorie: 'Légumes',
    calories: 17,
    proteines: 1.2,
    glucides: 3.1,
    lipides: 0.3,
    fibres: 1,
    sodium: 8,
    potassium: 261,
    calcium: 16,
    fer: 0.4,
    vitaminC: 17.9,
    vitaminA: 10
  },
  {
    id: 'fromage_blanc',
    nom: 'Fromage blanc 0%',
    categorie: 'Produits laitiers',
    calories: 47,
    proteines: 8,
    glucides: 4,
    lipides: 0.2,
    fibres: 0,
    sodium: 45,
    potassium: 141,
    calcium: 103,
    fer: 0.1,
    vitaminC: 0,
    vitaminA: 1
  },
  {
    id: 'poivron_rouge',
    nom: 'Poivron rouge',
    categorie: 'Légumes',
    calories: 31,
    proteines: 1,
    glucides: 6,
    lipides: 0.3,
    fibres: 2.5,
    sodium: 4,
    potassium: 211,
    calcium: 7,
    fer: 0.4,
    vitaminC: 128,
    vitaminA: 157
  },
  {
    id: 'huile_olive',
    nom: 'Huile d\'olive',
    categorie: 'Matières grasses',
    calories: 884,
    proteines: 0,
    glucides: 0,
    lipides: 100,
    fibres: 0,
    sodium: 2,
    potassium: 1,
    calcium: 1,
    fer: 0.6,
    vitaminC: 0,
    vitaminA: 0
  },
  {
    id: 'concombre',
    nom: 'Concombre',
    categorie: 'Légumes',
    calories: 16,
    proteines: 0.7,
    glucides: 3.6,
    lipides: 0.1,
    fibres: 0.5,
    sodium: 2,
    potassium: 147,
    calcium: 16,
    fer: 0.3,
    vitaminC: 2.8,
    vitaminA: 5
  },
  {
    id: 'miel',
    nom: 'Miel',
    categorie: 'Sucres',
    calories: 304,
    proteines: 0.3,
    glucides: 82.4,
    lipides: 0,
    fibres: 0.2,
    sodium: 4,
    potassium: 52,
    calcium: 6,
    fer: 0.4,
    vitaminC: 0.5,
    vitaminA: 0
  }
];

// Recettes pré-définies
export const RECETTES: Recette[] = [
  {
    id: '1',
    nom: 'Bowl protéiné',
    description: 'Un repas équilibré riche en protéines',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' }, // Poulet
      { aliment: ALIMENTS[4], quantite: 100, unite: 'g' }, // Riz complet
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }, // Huile d'olive
      { aliment: ALIMENTS[11], quantite: 100, unite: 'g' } // Brocoli
    ],
    instructions: [
      'Cuire le poulet à la poêle',
      'Préparer le riz complet selon les instructions',
      'Cuire le brocoli à la vapeur',
      'Assembler tous les ingrédients dans un bol',
      'Arroser d\'huile d\'olive'
    ],
    caloriesParPortion: 450,
    tags: ['protéines', 'équilibré', 'rapide'],
    emoji: '🍲',
    classe: 'Prise de masse'
  },
  {
    id: '2',
    nom: 'Smoothie protéiné',
    description: 'Boisson énergisante post-entraînement',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[3], quantite: 200, unite: 'g' }, // Fromage blanc
      { aliment: ALIMENTS[7], quantite: 120, unite: 'g' }, // Banane
      { aliment: ALIMENTS[9], quantite: 30, unite: 'g' }, // Amandes
      { aliment: ALIMENTS[12], quantite: 50, unite: 'g' } // Épinards
    ],
    instructions: [
      'Mettre tous les ingrédients dans un mixeur',
      'Mixer jusqu\'à obtenir une texture lisse',
      'Servir immédiatement'
    ],
    caloriesParPortion: 320,
    tags: ['protéines', 'post-entraînement', 'smoothie'],
    emoji: '🥤',
    classe: 'Récupération'
  },
  {
    id: '3',
    nom: 'Œufs brouillés à l\'avocat',
    description: 'Petit-déjeuner riche en bons gras et protéines',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[2], quantite: 150, unite: 'g' }, // Œufs (~3 unités)
      { aliment: ALIMENTS[8], quantite: 80, unite: 'g' }, // Avocat
      { aliment: ALIMENTS[10], quantite: 5, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Battre les œufs et les cuire à feu doux en remuant',
      'Écraser grossièrement l\'avocat',
      'Servir les œufs brouillés avec l\'avocat, arrosé d\'un filet d\'huile d\'olive'
    ],
    caloriesParPortion: 420,
    tags: ['petit-déjeuner', 'sans gluten'],
    emoji: '🍳',
    classe: 'Récupération'
  },
  {
    id: '4',
    nom: 'Saumon, patate douce et épinards',
    description: 'Dîner anti-inflammatoire riche en oméga-3',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[1], quantite: 150, unite: 'g' }, // Saumon
      { aliment: ALIMENTS[6], quantite: 200, unite: 'g' }, // Patate douce
      { aliment: ALIMENTS[12], quantite: 100, unite: 'g' }, // Épinards
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Cuire la patate douce au four ou à la vapeur',
      'Cuire le saumon à la poêle ou au four',
      'Faire tomber les épinards à la poêle avec un filet d\'huile',
      'Assembler et servir chaud'
    ],
    caloriesParPortion: 520,
    tags: ['oméga-3', 'sans gluten'],
    emoji: '🐟',
    classe: 'Anti-inflammatoire'
  },
  {
    id: '5',
    nom: 'Porridge avoine, banane et amandes',
    description: 'Petit-déjeuner énergétique à glucides complexes',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[5], quantite: 60, unite: 'g' }, // Avoine
      { aliment: ALIMENTS[7], quantite: 100, unite: 'g' }, // Banane
      { aliment: ALIMENTS[9], quantite: 20, unite: 'g' } // Amandes
    ],
    instructions: [
      'Cuire l\'avoine dans de l\'eau ou du lait',
      'Couper la banane en rondelles',
      'Ajouter la banane et les amandes sur le porridge'
    ],
    caloriesParPortion: 380,
    tags: ['petit-déjeuner', 'végétarien'],
    emoji: '🥣',
    classe: 'Récupération'
  },
  {
    id: '6',
    nom: 'Salade tomate, avocat et fromage blanc',
    description: 'Repas léger et rafraîchissant',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[13], quantite: 150, unite: 'g' }, // Tomate
      { aliment: ALIMENTS[8], quantite: 100, unite: 'g' }, // Avocat
      { aliment: ALIMENTS[3], quantite: 150, unite: 'g' }, // Fromage blanc
      { aliment: ALIMENTS[10], quantite: 5, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Couper la tomate et l\'avocat en dés',
      'Mélanger avec le fromage blanc',
      'Assaisonner d\'un filet d\'huile d\'olive'
    ],
    caloriesParPortion: 300,
    tags: ['léger', 'sans gluten', 'végétarien'],
    emoji: '🥗',
    classe: 'Sèche'
  },
  {
    id: '7',
    nom: 'Poulet, riz et brocoli renforcé',
    description: 'Repas complet pour prise de masse',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[0], quantite: 200, unite: 'g' }, // Poulet
      { aliment: ALIMENTS[4], quantite: 150, unite: 'g' }, // Riz complet
      { aliment: ALIMENTS[11], quantite: 100, unite: 'g' }, // Brocoli
      { aliment: ALIMENTS[8], quantite: 50, unite: 'g' } // Avocat
    ],
    instructions: [
      'Cuire le poulet à la poêle ou au four',
      'Préparer le riz complet',
      'Cuire le brocoli à la vapeur',
      'Assembler avec l\'avocat en tranches'
    ],
    caloriesParPortion: 650,
    tags: ['protéines', 'prise de masse'],
    emoji: '💪',
    classe: 'Prise de masse'
  },
  {
    id: '8',
    nom: 'Salade d\'œufs et épinards',
    description: 'Encas riche en protéines et fer',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[2], quantite: 100, unite: 'g' }, // Œufs (2 unités)
      { aliment: ALIMENTS[12], quantite: 80, unite: 'g' }, // Épinards
      { aliment: ALIMENTS[13], quantite: 100, unite: 'g' }, // Tomate
      { aliment: ALIMENTS[10], quantite: 5, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Faire cuire les œufs durs, les couper en quartiers',
      'Mélanger avec les épinards et la tomate coupée',
      'Assaisonner d\'huile d\'olive'
    ],
    caloriesParPortion: 280,
    tags: ['léger', 'sans gluten', 'végétarien'],
    emoji: '🥚',
    classe: 'Équilibre'
  },
  {
    id: '9',
    nom: 'Smoothie post-training whey banane',
    description: 'Récupération rapide après l\'entraînement',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[18], quantite: 30, unite: 'g' }, // Protéine whey
      { aliment: ALIMENTS[7], quantite: 120, unite: 'g' }, // Banane
      { aliment: ALIMENTS[19], quantite: 250, unite: 'ml' }, // Lait d'amande
      { aliment: ALIMENTS[20], quantite: 10, unite: 'g' } // Graines de chia
    ],
    instructions: [
      'Mettre tous les ingrédients dans un blender',
      'Mixer jusqu\'à texture lisse',
      'Boire dans les 30 minutes après l\'entraînement'
    ],
    caloriesParPortion: 350,
    tags: ['post-training', 'protéines', 'récupération'],
    emoji: '🥤',
    classe: 'Récupération'
  },
  {
    id: '10',
    nom: 'Porridge chia et miel',
    description: 'Petit-déjeuner riche en fibres et énergie durable',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[5], quantite: 60, unite: 'g' }, // Avoine
      { aliment: ALIMENTS[19], quantite: 200, unite: 'ml' }, // Lait d'amande
      { aliment: ALIMENTS[20], quantite: 15, unite: 'g' }, // Graines de chia
      { aliment: ALIMENTS[23], quantite: 15, unite: 'g' } // Miel
    ],
    instructions: [
      'Faire chauffer le lait d\'amande avec l\'avoine',
      'Laisser épaissir 5 minutes à feu doux',
      'Ajouter les graines de chia et le miel avant de servir'
    ],
    caloriesParPortion: 400,
    tags: ['petit-déjeuner', 'fibres', 'végétarien'],
    emoji: '🥣',
    classe: 'Équilibre'
  },
  {
    id: '11',
    nom: 'Thon, pâtes complètes et tomate',
    description: 'Déjeuner simple et rassasiant',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[16], quantite: 120, unite: 'g' }, // Thon en conserve
      { aliment: ALIMENTS[15], quantite: 150, unite: 'g' }, // Pâtes complètes
      { aliment: ALIMENTS[13], quantite: 100, unite: 'g' }, // Tomate
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Cuire les pâtes complètes selon les instructions',
      'Émietter le thon et couper la tomate en dés',
      'Mélanger le tout et arroser d\'huile d\'olive'
    ],
    caloriesParPortion: 480,
    tags: ['déjeuner', 'protéines', 'rapide'],
    emoji: '🍝',
    classe: 'Équilibre'
  },
  {
    id: '12',
    nom: 'Dinde, riz basmati et brocoli',
    description: 'Dîner complet pour prise de masse',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[17], quantite: 180, unite: 'g' }, // Dinde (blanc)
      { aliment: ALIMENTS[14], quantite: 150, unite: 'g' }, // Riz basmati
      { aliment: ALIMENTS[11], quantite: 100, unite: 'g' }, // Brocoli
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Cuire la dinde à la poêle ou au four',
      'Préparer le riz basmati',
      'Cuire le brocoli à la vapeur',
      'Assembler et arroser d\'huile d\'olive'
    ],
    caloriesParPortion: 560,
    tags: ['dîner', 'protéines', 'prise de masse'],
    emoji: '🦃',
    classe: 'Prise de masse'
  },
  {
    id: '13',
    nom: 'Overnight oats beurre de cacahuète',
    description: 'Petit-déjeuner ou collation à préparer la veille',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[5], quantite: 50, unite: 'g' }, // Avoine
      { aliment: ALIMENTS[22], quantite: 20, unite: 'g' }, // Beurre de cacahuète
      { aliment: ALIMENTS[7], quantite: 100, unite: 'g' }, // Banane
      { aliment: ALIMENTS[19], quantite: 150, unite: 'ml' } // Lait d'amande
    ],
    instructions: [
      'Mélanger l\'avoine et le lait d\'amande dans un bocal',
      'Ajouter le beurre de cacahuète et la banane coupée',
      'Laisser reposer au réfrigérateur toute la nuit'
    ],
    caloriesParPortion: 430,
    tags: ['petit-déjeuner', 'collation', 'végétarien'],
    emoji: '🫙',
    classe: 'Équilibre'
  },
  {
    id: '14',
    nom: 'Lentilles, dinde et épinards',
    description: 'Déjeuner riche en fibres et en fer',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[25], quantite: 200, unite: 'g' }, // Lentilles cuites
      { aliment: ALIMENTS[17], quantite: 120, unite: 'g' }, // Dinde (blanc)
      { aliment: ALIMENTS[12], quantite: 100, unite: 'g' }, // Épinards
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Réchauffer les lentilles cuites',
      'Cuire la dinde à la poêle',
      'Faire tomber les épinards avec un filet d\'huile',
      'Assembler le tout'
    ],
    caloriesParPortion: 470,
    tags: ['déjeuner', 'fibres', 'fer'],
    emoji: '🍛',
    classe: 'Récupération'
  },
  {
    id: '15',
    nom: 'Yaourt grec, banane et amandes',
    description: 'Collation riche en protéines',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[21], quantite: 200, unite: 'g' }, // Yaourt grec nature
      { aliment: ALIMENTS[7], quantite: 100, unite: 'g' }, // Banane
      { aliment: ALIMENTS[9], quantite: 20, unite: 'g' }, // Amandes
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' } // Miel
    ],
    instructions: [
      'Couper la banane en rondelles',
      'Mélanger avec le yaourt grec',
      'Ajouter les amandes concassées et le miel'
    ],
    caloriesParPortion: 340,
    tags: ['collation', 'protéines', 'végétarien'],
    emoji: '🍯',
    classe: 'Récupération'
  },
  {
    id: '16',
    nom: 'Cottage, avocat et tomate',
    description: 'Collation légère et rassasiante',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[24], quantite: 150, unite: 'g' }, // Fromage cottage
      { aliment: ALIMENTS[8], quantite: 50, unite: 'g' }, // Avocat
      { aliment: ALIMENTS[13], quantite: 100, unite: 'g' } // Tomate
    ],
    instructions: [
      'Couper l\'avocat et la tomate en dés',
      'Mélanger avec le fromage cottage',
      'Poivrer selon le goût'
    ],
    caloriesParPortion: 260,
    tags: ['collation', 'léger', 'sans gluten'],
    emoji: '🥑',
    classe: 'Sèche'
  },
  {
    id: '17',
    nom: 'Sandwich poulet avocat',
    description: 'Déjeuner sur le pouce, complet et équilibré',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[26], quantite: 80, unite: 'g' }, // Pain complet
      { aliment: ALIMENTS[0], quantite: 100, unite: 'g' }, // Poulet
      { aliment: ALIMENTS[8], quantite: 30, unite: 'g' }, // Avocat
      { aliment: ALIMENTS[13], quantite: 50, unite: 'g' } // Tomate
    ],
    instructions: [
      'Griller légèrement le pain complet',
      'Garnir de poulet cuit, avocat écrasé et tomate en tranches',
      'Assembler le sandwich'
    ],
    caloriesParPortion: 420,
    tags: ['déjeuner', 'rapide'],
    emoji: '🥪',
    classe: 'Équilibre'
  },
  {
    id: '18',
    nom: 'Bœuf haché, riz et courgette',
    description: 'Dîner riche en fer pour la prise de masse',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[28], quantite: 150, unite: 'g' }, // Bœuf haché 5%
      { aliment: ALIMENTS[33], quantite: 150, unite: 'g' }, // Riz blanc
      { aliment: ALIMENTS[31], quantite: 100, unite: 'g' }, // Courgette
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Cuire le bœuf haché à la poêle',
      'Préparer le riz blanc',
      'Faire sauter la courgette à l\'huile d\'olive',
      'Assembler le tout'
    ],
    caloriesParPortion: 540,
    tags: ['dîner', 'protéines', 'prise de masse'],
    emoji: '🥩',
    classe: 'Prise de masse'
  },
  {
    id: '19',
    nom: 'Crevettes sautées et quinoa',
    description: 'Dîner léger et riche en protéines maigres',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[29], quantite: 150, unite: 'g' }, // Crevettes
      { aliment: ALIMENTS[27], quantite: 150, unite: 'g' }, // Quinoa cuit
      { aliment: ALIMENTS[30], quantite: 80, unite: 'g' }, // Poivron rouge
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Faire sauter les crevettes à la poêle avec l\'huile',
      'Réchauffer le quinoa cuit',
      'Ajouter le poivron émincé et mélanger'
    ],
    caloriesParPortion: 420,
    tags: ['dîner', 'léger', 'sans gluten'],
    emoji: '🍤',
    classe: 'Sèche'
  },
  {
    id: '20',
    nom: 'Houmous et crudités',
    description: 'Collation légère et croquante',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[34], quantite: 100, unite: 'g' }, // Houmous
      { aliment: ALIMENTS[30], quantite: 80, unite: 'g' }, // Poivron rouge
      { aliment: ALIMENTS[31], quantite: 80, unite: 'g' } // Courgette
    ],
    instructions: [
      'Couper le poivron et la courgette en bâtonnets',
      'Servir avec le houmous pour tremper'
    ],
    caloriesParPortion: 260,
    tags: ['collation', 'léger', 'végétarien'],
    emoji: '🥕',
    classe: 'Sèche'
  },
  {
    id: '21',
    nom: 'Bowl yaourt, myrtilles et amandes',
    description: 'Petit-déjeuner riche en antioxydants',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[21], quantite: 200, unite: 'g' }, // Yaourt grec nature
      { aliment: ALIMENTS[32], quantite: 80, unite: 'g' }, // Myrtilles
      { aliment: ALIMENTS[9], quantite: 15, unite: 'g' }, // Amandes
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' } // Miel
    ],
    instructions: [
      'Verser le yaourt grec dans un bol',
      'Ajouter les myrtilles et les amandes concassées',
      'Arroser de miel'
    ],
    caloriesParPortion: 330,
    tags: ['petit-déjeuner', 'protéines', 'végétarien'],
    emoji: '🫐',
    classe: 'Récupération'
  },
  {
    id: '22',
    nom: 'Fromage blanc, kiwi et amandes',
    description: 'Collation fraîche et riche en vitamine C',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[3], quantite: 150, unite: 'g' }, // Fromage blanc 0%
      { aliment: ALIMENTS[35], quantite: 100, unite: 'g' }, // Kiwi
      { aliment: ALIMENTS[9], quantite: 15, unite: 'g' } // Amandes
    ],
    instructions: [
      'Couper le kiwi en tranches',
      'Mélanger avec le fromage blanc',
      'Parsemer d\'amandes concassées'
    ],
    caloriesParPortion: 250,
    tags: ['collation', 'léger', 'végétarien'],
    emoji: '🥝',
    classe: 'Sèche'
  },
  {
    id: '23',
    nom: 'Saumon, quinoa et poivron',
    description: 'Dîner anti-inflammatoire riche en oméga-3',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[1], quantite: 150, unite: 'g' }, // Saumon
      { aliment: ALIMENTS[27], quantite: 150, unite: 'g' }, // Quinoa cuit
      { aliment: ALIMENTS[30], quantite: 80, unite: 'g' }, // Poivron rouge
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Cuire le saumon au four ou à la poêle',
      'Réchauffer le quinoa',
      'Ajouter le poivron émincé et arroser d\'huile d\'olive'
    ],
    caloriesParPortion: 520,
    tags: ['dîner', 'oméga-3', 'sans gluten'],
    emoji: '🐟',
    classe: 'Anti-inflammatoire'
  },
  {
    id: '24',
    nom: 'Toast avocat et œuf',
    description: 'Petit-déjeuner complet et rassasiant',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[26], quantite: 60, unite: 'g' }, // Pain complet
      { aliment: ALIMENTS[8], quantite: 70, unite: 'g' }, // Avocat
      { aliment: ALIMENTS[2], quantite: 100, unite: 'g' } // Œufs
    ],
    instructions: [
      'Griller le pain complet',
      'Écraser l\'avocat dessus',
      'Ajouter un œuf poché ou au plat par-dessus'
    ],
    caloriesParPortion: 380,
    tags: ['petit-déjeuner', 'végétarien'],
    emoji: '🍞',
    classe: 'Équilibre'
  },
  {
    id: '25',
    nom: 'Salade poulet, quinoa et avocat',
    description: 'Déjeuner complet et équilibré',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' }, // Poulet
      { aliment: ALIMENTS[27], quantite: 120, unite: 'g' }, // Quinoa cuit
      { aliment: ALIMENTS[13], quantite: 80, unite: 'g' }, // Tomate
      { aliment: ALIMENTS[8], quantite: 50, unite: 'g' } // Avocat
    ],
    instructions: [
      'Cuire le poulet à la poêle et le couper en morceaux',
      'Mélanger avec le quinoa, la tomate et l\'avocat',
      'Assaisonner selon le goût'
    ],
    caloriesParPortion: 480,
    tags: ['déjeuner', 'protéines', 'sans gluten'],
    emoji: '🥗',
    classe: 'Équilibre'
  },
  {
    id: '26',
    nom: 'Cottage, myrtilles et miel',
    description: 'Collation sucrée-protéinée',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[24], quantite: 150, unite: 'g' }, // Fromage cottage
      { aliment: ALIMENTS[32], quantite: 80, unite: 'g' }, // Myrtilles
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' } // Miel
    ],
    instructions: [
      'Verser le fromage cottage dans un bol',
      'Ajouter les myrtilles et le miel'
    ],
    caloriesParPortion: 260,
    tags: ['collation', 'protéines', 'végétarien'],
    emoji: '🍯',
    classe: 'Récupération'
  },
  {
    id: '27',
    nom: 'Bœuf haché et patate douce',
    description: 'Dîner riche pour la prise de masse',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[28], quantite: 150, unite: 'g' }, // Bœuf haché 5%
      { aliment: ALIMENTS[6], quantite: 200, unite: 'g' }, // Patate douce
      { aliment: ALIMENTS[12], quantite: 80, unite: 'g' }, // Épinards
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Cuire la patate douce au four',
      'Cuire le bœuf haché à la poêle',
      'Faire tomber les épinards avec l\'huile d\'olive',
      'Assembler le tout'
    ],
    caloriesParPortion: 550,
    tags: ['dîner', 'protéines', 'prise de masse'],
    emoji: '🍖',
    classe: 'Prise de masse'
  },
  {
    id: '28',
    nom: 'Smoothie vert récupération',
    description: 'Post-training riche en protéines et fer',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[12], quantite: 50, unite: 'g' }, // Épinards
      { aliment: ALIMENTS[7], quantite: 120, unite: 'g' }, // Banane
      { aliment: ALIMENTS[19], quantite: 200, unite: 'ml' }, // Lait d'amande
      { aliment: ALIMENTS[18], quantite: 20, unite: 'g' } // Protéine whey
    ],
    instructions: [
      'Mettre tous les ingrédients dans un blender',
      'Mixer jusqu\'à obtenir une texture lisse',
      'Boire rapidement après l\'entraînement'
    ],
    caloriesParPortion: 300,
    tags: ['post-training', 'protéines', 'récupération'],
    emoji: '🥬',
    classe: 'Récupération'
  },
  {
    id: '29',
    nom: 'Crevettes et courgette sautées',
    description: 'Déjeuner léger et rapide',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[29], quantite: 150, unite: 'g' }, // Crevettes
      { aliment: ALIMENTS[31], quantite: 150, unite: 'g' }, // Courgette
      { aliment: ALIMENTS[33], quantite: 100, unite: 'g' }, // Riz blanc
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' } // Huile d'olive
    ],
    instructions: [
      'Faire sauter les crevettes et la courgette à l\'huile',
      'Préparer le riz blanc',
      'Assembler et servir chaud'
    ],
    caloriesParPortion: 400,
    tags: ['déjeuner', 'léger', 'sans gluten'],
    emoji: '🦐',
    classe: 'Sèche'
  },
  {
    id: '30',
    nom: 'Wrap poulet, houmous et poivron',
    description: 'Déjeuner facile à emporter',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[26], quantite: 60, unite: 'g' }, // Pain complet
      { aliment: ALIMENTS[0], quantite: 100, unite: 'g' }, // Poulet
      { aliment: ALIMENTS[34], quantite: 30, unite: 'g' }, // Houmous
      { aliment: ALIMENTS[30], quantite: 50, unite: 'g' } // Poivron rouge
    ],
    instructions: [
      'Tartiner le pain de houmous',
      'Garnir de poulet cuit et de poivron émincé',
      'Rouler et couper en deux'
    ],
    caloriesParPortion: 400,
    tags: ['déjeuner', 'rapide'],
    emoji: '🌯',
    classe: 'Équilibre'
  },
  {
    id: '31',
    nom: 'Porridge aux myrtilles',
    description: 'Petit-déjeuner antioxydant et énergisant',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[5], quantite: 60, unite: 'g' }, // Avoine
      { aliment: ALIMENTS[19], quantite: 200, unite: 'ml' }, // Lait d'amande
      { aliment: ALIMENTS[32], quantite: 60, unite: 'g' }, // Myrtilles
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' } // Miel
    ],
    instructions: [
      'Cuire l\'avoine dans le lait d\'amande',
      'Laisser épaissir 5 minutes',
      'Ajouter les myrtilles et le miel avant de servir'
    ],
    caloriesParPortion: 390,
    tags: ['petit-déjeuner', 'fibres', 'végétarien'],
    emoji: '🫐',
    classe: 'Équilibre'
  },
  {
    id: '32',
    nom: 'Thon, avocat et épinards',
    description: 'Déjeuner léger riche en bons gras',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[16], quantite: 120, unite: 'g' }, // Thon en conserve
      { aliment: ALIMENTS[8], quantite: 80, unite: 'g' }, // Avocat
      { aliment: ALIMENTS[13], quantite: 100, unite: 'g' }, // Tomate
      { aliment: ALIMENTS[12], quantite: 50, unite: 'g' } // Épinards
    ],
    instructions: [
      'Émietter le thon',
      'Couper l\'avocat et la tomate en dés',
      'Mélanger le tout avec les épinards frais'
    ],
    caloriesParPortion: 350,
    tags: ['déjeuner', 'léger', 'sans gluten'],
    emoji: '🥑',
    classe: 'Sèche'
  }
,
  {
    id: '33',
    nom: 'Omelette champignons et feta',
    description: 'Petit-déjeuner équilibre',
    tempsPreparation: 12,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[2], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[38], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[46], quantite: 30, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire les œufs quelques minutes',
      'Ajouter les champignons, la feta et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🍳',
    classe: 'Équilibre'
  },
  {
    id: '34',
    nom: 'Pancakes avoine et banane',
    description: 'Petit-déjeuner équilibre',
    tempsPreparation: 15,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[5], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[7], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[2], quantite: 100, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire l\'avoine quelques minutes',
      'Ajouter la banane, les œufs et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🥞',
    classe: 'Équilibre'
  },
  {
    id: '35',
    nom: 'Bowl cottage et fruits rouges',
    description: 'Petit-déjeuner récupération',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[24], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[32], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[45], quantite: 15, unite: 'g' }
    ],
    instructions: [
      'Préparer le fromage cottage selon les instructions',
      'Disposer les myrtilles, le jambon de dinde par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🍓',
    classe: 'Récupération'
  },
  {
    id: '36',
    nom: 'Toast houmous et concombre',
    description: 'Petit-déjeuner équilibre',
    tempsPreparation: 8,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[26], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[34], quantite: 40, unite: 'g' },
      { aliment: ALIMENTS[48], quantite: 60, unite: 'g' }
    ],
    instructions: [
      'Griller le pain',
      'Garnir avec le houmous, le concombre',
      'Servir aussitôt'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🥒',
    classe: 'Équilibre'
  },
  {
    id: '37',
    nom: 'Bowl yaourt, banane et kiwi',
    description: 'Petit-déjeuner récupération',
    tempsPreparation: 8,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[21], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[7], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[35], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[20], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préparer le yaourt grec selon les instructions',
      'Disposer la banane, le kiwi, les graines de chia par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🥣',
    classe: 'Récupération'
  },
  {
    id: '38',
    nom: 'Œufs brouillés au jambon de dinde',
    description: 'Petit-déjeuner sèche',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[2], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[45], quantite: 50, unite: 'g' },
      { aliment: ALIMENTS[13], quantite: 80, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire les œufs quelques minutes',
      'Ajouter le jambon de dinde, la tomate et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🍳',
    classe: 'Sèche'
  },
  {
    id: '39',
    nom: 'Porridge pomme et miel',
    description: 'Petit-déjeuner équilibre',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[5], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[19], quantite: 200, unite: 'ml' },
      { aliment: ALIMENTS[41], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préparer l\'avoine selon les instructions',
      'Disposer le lait d\'amande, la pomme, le miel par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🍎',
    classe: 'Équilibre'
  },
  {
    id: '40',
    nom: 'Tartine cottage et tomate',
    description: 'Petit-déjeuner sèche',
    tempsPreparation: 8,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[26], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[24], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[13], quantite: 60, unite: 'g' }
    ],
    instructions: [
      'Griller le pain',
      'Garnir avec le fromage cottage, la tomate',
      'Servir aussitôt'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🍅',
    classe: 'Sèche'
  },
  {
    id: '41',
    nom: 'Yaourt grec, noix de cajou et miel',
    description: 'Petit-déjeuner équilibre',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[21], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[43], quantite: 20, unite: 'g' },
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préparer le yaourt grec selon les instructions',
      'Disposer les noix de cajou, le miel par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🥣',
    classe: 'Équilibre'
  },
  {
    id: '42',
    nom: 'Smoothie orange protéiné',
    description: 'Petit-déjeuner récupération',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[18], quantite: 25, unite: 'g' },
      { aliment: ALIMENTS[42], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[21], quantite: 100, unite: 'g' }
    ],
    instructions: [
      'Mettre la protéine en poudre, l\'orange, le yaourt grec dans un blender',
      'Mixer jusqu\'à obtenir une texture lisse',
      'Servir immédiatement'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'protéines'],
    emoji: '🍊',
    classe: 'Récupération'
  },
  {
    id: '43',
    nom: 'Tartine beurre de cacahuète et banane',
    description: 'Petit-déjeuner équilibre',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[26], quantite: 70, unite: 'g' },
      { aliment: ALIMENTS[22], quantite: 20, unite: 'g' },
      { aliment: ALIMENTS[7], quantite: 100, unite: 'g' }
    ],
    instructions: [
      'Griller le pain',
      'Garnir avec le beurre de cacahuète, la banane',
      'Servir aussitôt'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🍌',
    classe: 'Équilibre'
  },
  {
    id: '44',
    nom: 'Chia pudding aux fruits',
    description: 'Petit-déjeuner équilibre',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[20], quantite: 30, unite: 'g' },
      { aliment: ALIMENTS[19], quantite: 200, unite: 'ml' },
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' },
      { aliment: ALIMENTS[32], quantite: 50, unite: 'g' }
    ],
    instructions: [
      'Préparer les graines de chia selon les instructions',
      'Disposer le lait d\'amande, le miel, les myrtilles par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🍮',
    classe: 'Équilibre'
  },
  {
    id: '45',
    nom: 'Omelette épinards et feta',
    description: 'Petit-déjeuner anti-inflammatoire',
    tempsPreparation: 12,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[2], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[12], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[46], quantite: 30, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire les œufs quelques minutes',
      'Ajouter les épinards, la feta et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🧀',
    classe: 'Anti-inflammatoire'
  },
  {
    id: '46',
    nom: 'Muesli maison',
    description: 'Petit-déjeuner équilibre',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[5], quantite: 50, unite: 'g' },
      { aliment: ALIMENTS[9], quantite: 15, unite: 'g' },
      { aliment: ALIMENTS[43], quantite: 15, unite: 'g' },
      { aliment: ALIMENTS[19], quantite: 150, unite: 'ml' }
    ],
    instructions: [
      'Préparer l\'avoine selon les instructions',
      'Disposer les amandes, les noix de cajou, le lait d\'amande par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['petit-déjeuner', 'équilibré'],
    emoji: '🥣',
    classe: 'Équilibre'
  },
  {
    id: '47',
    nom: 'Salade quinoa et pois chiches',
    description: 'Déjeuner équilibre',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[27], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[37], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[48], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Couper le quinoa, les pois chiches, le concombre, l\'huile d\'olive en morceaux',
      'Mélanger le tout dans un saladier',
      'Assaisonner d\'huile d\'olive et servir frais'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'léger'],
    emoji: '🥗',
    classe: 'Équilibre'
  },
  {
    id: '48',
    nom: 'Wrap dinde et crudités',
    description: 'Déjeuner sèche',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[26], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[17], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[39], quantite: 50, unite: 'g' },
      { aliment: ALIMENTS[48], quantite: 50, unite: 'g' }
    ],
    instructions: [
      'Griller le pain',
      'Garnir avec la dinde, la carotte, le concombre',
      'Servir aussitôt'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🌯',
    classe: 'Sèche'
  },
  {
    id: '49',
    nom: 'Bol riz, poulet et champignons',
    description: 'Déjeuner équilibre',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[4], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[38], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le riz complet quelques minutes',
      'Ajouter le poulet, les champignons, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🍚',
    classe: 'Équilibre'
  },
  {
    id: '50',
    nom: 'Salade grecque feta et concombre',
    description: 'Déjeuner équilibre',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[46], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[13], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[48], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Couper la feta, la tomate, le concombre, l\'huile d\'olive en morceaux',
      'Mélanger le tout dans un saladier',
      'Assaisonner d\'huile d\'olive et servir frais'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'léger'],
    emoji: '🥙',
    classe: 'Équilibre'
  },
  {
    id: '51',
    nom: 'Tofu sauté aux légumes',
    description: 'Déjeuner sèche',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[36], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[11], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[39], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le tofu quelques minutes',
      'Ajouter le brocoli, la carotte, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🌱',
    classe: 'Sèche'
  },
  {
    id: '52',
    nom: 'Sandwich jambon de dinde et avocat',
    description: 'Déjeuner équilibre',
    tempsPreparation: 8,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[26], quantite: 70, unite: 'g' },
      { aliment: ALIMENTS[45], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[8], quantite: 50, unite: 'g' }
    ],
    instructions: [
      'Griller le pain',
      'Garnir avec le jambon de dinde, l\'avocat',
      'Servir aussitôt'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🥪',
    classe: 'Équilibre'
  },
  {
    id: '53',
    nom: 'Salade de pâtes au thon',
    description: 'Déjeuner équilibre',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[15], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[16], quantite: 120, unite: 'g' },
      { aliment: ALIMENTS[13], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Couper les pâtes complètes, le thon, la tomate, l\'huile d\'olive en morceaux',
      'Mélanger le tout dans un saladier',
      'Assaisonner d\'huile d\'olive et servir frais'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'léger'],
    emoji: '🍝',
    classe: 'Équilibre'
  },
  {
    id: '54',
    nom: 'Bol pois chiches et légumes rôtis',
    description: 'Déjeuner sèche',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[37], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[40], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[39], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer les pois chiches, le chou-fleur, la carotte, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🍲',
    classe: 'Sèche'
  },
  {
    id: '55',
    nom: 'Poulet, chou-fleur et riz',
    description: 'Déjeuner équilibre',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[14], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[40], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le poulet quelques minutes',
      'Ajouter le riz basmati, le chou-fleur, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🍛',
    classe: 'Équilibre'
  },
  {
    id: '56',
    nom: 'Salade de lentilles et feta',
    description: 'Déjeuner équilibre',
    tempsPreparation: 12,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[25], quantite: 180, unite: 'g' },
      { aliment: ALIMENTS[46], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[13], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Couper les lentilles, la feta, la tomate, l\'huile d\'olive en morceaux',
      'Mélanger le tout dans un saladier',
      'Assaisonner d\'huile d\'olive et servir frais'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'léger'],
    emoji: '🫘',
    classe: 'Équilibre'
  },
  {
    id: '57',
    nom: 'Dinde, champignons et riz',
    description: 'Déjeuner sèche',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[17], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[38], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[4], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire la dinde quelques minutes',
      'Ajouter les champignons, le riz complet, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🍄',
    classe: 'Sèche'
  },
  {
    id: '58',
    nom: 'Wrap tofu et légumes',
    description: 'Déjeuner sèche',
    tempsPreparation: 10,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[26], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[36], quantite: 120, unite: 'g' },
      { aliment: ALIMENTS[39], quantite: 50, unite: 'g' },
      { aliment: ALIMENTS[48], quantite: 50, unite: 'g' }
    ],
    instructions: [
      'Griller le pain',
      'Garnir avec le tofu, la carotte, le concombre',
      'Servir aussitôt'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🌯',
    classe: 'Sèche'
  },
  {
    id: '59',
    nom: 'Bœuf haché, pâtes et tomate',
    description: 'Déjeuner prise de masse',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[28], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[15], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[13], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le bœuf haché quelques minutes',
      'Ajouter les pâtes complètes, la tomate, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🍝',
    classe: 'Prise de masse'
  },
  {
    id: '60',
    nom: 'Salade de crevettes et avocat',
    description: 'Déjeuner sèche',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[29], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[8], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[48], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Couper les crevettes, l\'avocat, le concombre, l\'huile d\'olive en morceaux',
      'Mélanger le tout dans un saladier',
      'Assaisonner d\'huile d\'olive et servir frais'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'léger'],
    emoji: '🥑',
    classe: 'Sèche'
  },
  {
    id: '61',
    nom: 'Bol saumon, riz basmati et épinards',
    description: 'Déjeuner anti-inflammatoire',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[1], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[14], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[12], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer le saumon, le riz basmati, les épinards, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🐟',
    classe: 'Anti-inflammatoire'
  },
  {
    id: '62',
    nom: 'Pomme de terre, poulet et brocoli',
    description: 'Déjeuner équilibre',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[47], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[11], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer la pomme de terre, le poulet, le brocoli, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🥔',
    classe: 'Équilibre'
  },
  {
    id: '63',
    nom: 'Salade de poulet à l\'orange',
    description: 'Déjeuner sèche',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[42], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[12], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[9], quantite: 15, unite: 'g' }
    ],
    instructions: [
      'Couper le poulet, l\'orange, les épinards, les amandes en morceaux',
      'Mélanger le tout dans un saladier',
      'Assaisonner d\'huile d\'olive et servir frais'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'léger'],
    emoji: '🍊',
    classe: 'Sèche'
  },
  {
    id: '64',
    nom: 'Soupe de lentilles aux légumes',
    description: 'Déjeuner équilibre',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[25], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[39], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[38], quantite: 80, unite: 'g' }
    ],
    instructions: [
      'Faire revenir les lentilles, la carotte, les champignons quelques minutes',
      'Couvrir d\'eau ou de bouillon et laisser mijoter 15 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['déjeuner', 'équilibré'],
    emoji: '🍲',
    classe: 'Équilibre'
  },
  {
    id: '65',
    nom: 'Tofu épicé et chou-fleur',
    description: 'Dîner sèche',
    tempsPreparation: 15,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[36], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[40], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le tofu quelques minutes',
      'Ajouter le chou-fleur, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🌶️',
    classe: 'Sèche'
  },
  {
    id: '66',
    nom: 'Poulet et légumes rôtis',
    description: 'Dîner équilibre',
    tempsPreparation: 30,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[0], quantite: 180, unite: 'g' },
      { aliment: ALIMENTS[47], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[39], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer le poulet, la pomme de terre, la carotte, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🍗',
    classe: 'Équilibre'
  },
  {
    id: '67',
    nom: 'Saumon, riz blanc et épinards',
    description: 'Dîner anti-inflammatoire',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[1], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[33], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[12], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer le saumon, le riz blanc, les épinards, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🐟',
    classe: 'Anti-inflammatoire'
  },
  {
    id: '68',
    nom: 'Bœuf haché, chou-fleur et riz',
    description: 'Dîner prise de masse',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[28], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[40], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[4], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le bœuf haché quelques minutes',
      'Ajouter le chou-fleur, le riz complet, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🥩',
    classe: 'Prise de masse'
  },
  {
    id: '69',
    nom: 'Crevettes, champignons et riz',
    description: 'Dîner sèche',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[29], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[38], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[14], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire les crevettes quelques minutes',
      'Ajouter les champignons, le riz basmati, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🍤',
    classe: 'Sèche'
  },
  {
    id: '70',
    nom: 'Dinde, patate douce et brocoli',
    description: 'Dîner prise de masse',
    tempsPreparation: 30,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[17], quantite: 180, unite: 'g' },
      { aliment: ALIMENTS[6], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[11], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer la dinde, la patate douce, le brocoli, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🦃',
    classe: 'Prise de masse'
  },
  {
    id: '71',
    nom: 'Tofu, quinoa et poivron',
    description: 'Dîner sèche',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[36], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[27], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[40], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préparer le tofu selon les instructions',
      'Disposer le quinoa, le chou-fleur, l\'huile d\'olive par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🌱',
    classe: 'Sèche'
  },
  {
    id: '72',
    nom: 'Thon, pomme de terre et courgette',
    description: 'Dîner sèche',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[16], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[47], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[31], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer le thon, la pomme de terre, la courgette, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🐟',
    classe: 'Sèche'
  },
  {
    id: '73',
    nom: 'Poulet, lentilles et épinards',
    description: 'Dîner récupération',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[25], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[12], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le poulet quelques minutes',
      'Ajouter les lentilles, les épinards, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🍲',
    classe: 'Récupération'
  },
  {
    id: '74',
    nom: 'Bœuf haché, courgette et riz',
    description: 'Dîner prise de masse',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[28], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[31], quantite: 120, unite: 'g' },
      { aliment: ALIMENTS[33], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le bœuf haché quelques minutes',
      'Ajouter la courgette, le riz blanc, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🥩',
    classe: 'Prise de masse'
  },
  {
    id: '75',
    nom: 'Saumon, brocoli et quinoa',
    description: 'Dîner anti-inflammatoire',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[1], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[11], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[27], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer le saumon, le brocoli, le quinoa, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🐟',
    classe: 'Anti-inflammatoire'
  },
  {
    id: '76',
    nom: 'Poulet, champignons et pâtes',
    description: 'Dîner équilibre',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[38], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[15], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le poulet quelques minutes',
      'Ajouter les champignons, les pâtes complètes, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🍝',
    classe: 'Équilibre'
  },
  {
    id: '77',
    nom: 'Tofu, poivron et riz',
    description: 'Dîner sèche',
    tempsPreparation: 18,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[36], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[40], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[4], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le tofu quelques minutes',
      'Ajouter le chou-fleur, le riz complet, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🌱',
    classe: 'Sèche'
  },
  {
    id: '78',
    nom: 'Crevettes, chou-fleur et riz',
    description: 'Dîner sèche',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[29], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[40], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[14], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire les crevettes quelques minutes',
      'Ajouter le chou-fleur, le riz basmati, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🍤',
    classe: 'Sèche'
  },
  {
    id: '79',
    nom: 'Dinde, courgette et pâtes',
    description: 'Dîner équilibre',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[17], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[31], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[15], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire la dinde quelques minutes',
      'Ajouter la courgette, les pâtes complètes, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🦃',
    classe: 'Équilibre'
  },
  {
    id: '80',
    nom: 'Bœuf haché, brocoli et riz',
    description: 'Dîner prise de masse',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[28], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[11], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[33], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le bœuf haché quelques minutes',
      'Ajouter le brocoli, le riz blanc, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🥩',
    classe: 'Prise de masse'
  },
  {
    id: '81',
    nom: 'Saumon, pomme de terre et courgette',
    description: 'Dîner anti-inflammatoire',
    tempsPreparation: 30,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[1], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[47], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[31], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer le saumon, la pomme de terre, la courgette, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🐟',
    classe: 'Anti-inflammatoire'
  },
  {
    id: '82',
    nom: 'Poulet, carotte et riz basmati',
    description: 'Dîner équilibre',
    tempsPreparation: 20,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[39], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[14], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Faire chauffer l\'huile dans une poêle',
      'Faire cuire le poulet quelques minutes',
      'Ajouter la carotte, le riz basmati, l\'huile d\'olive et poursuivre la cuisson',
      'Assaisonner et servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['dîner', 'équilibré'],
    emoji: '🍛',
    classe: 'Équilibre'
  },
  {
    id: '83',
    nom: 'Pomme et beurre de cacahuète',
    description: 'Collation équilibre',
    tempsPreparation: 3,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[41], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[22], quantite: 20, unite: 'g' }
    ],
    instructions: [
      'Préparer la pomme, le beurre de cacahuète',
      'Assembler et déguster'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'léger'],
    emoji: '🍎',
    classe: 'Équilibre'
  },
  {
    id: '84',
    nom: 'Fromage blanc, noix de cajou et miel',
    description: 'Collation récupération',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[3], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[43], quantite: 20, unite: 'g' },
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préparer le fromage blanc selon les instructions',
      'Disposer les noix de cajou, le miel par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'équilibré'],
    emoji: '🥣',
    classe: 'Récupération'
  },
  {
    id: '85',
    nom: 'Houmous, carotte et concombre',
    description: 'Collation sèche',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[34], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[39], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[48], quantite: 60, unite: 'g' }
    ],
    instructions: [
      'Préparer le houmous, la carotte, le concombre',
      'Assembler et déguster'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'léger'],
    emoji: '🥕',
    classe: 'Sèche'
  },
  {
    id: '86',
    nom: 'Orange et amandes',
    description: 'Collation équilibre',
    tempsPreparation: 3,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[42], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[9], quantite: 20, unite: 'g' }
    ],
    instructions: [
      'Préparer l\'orange, les amandes',
      'Assembler et déguster'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'léger'],
    emoji: '🍊',
    classe: 'Équilibre'
  },
  {
    id: '87',
    nom: 'Yaourt grec et graines de tournesol',
    description: 'Collation récupération',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[21], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[44], quantite: 15, unite: 'g' },
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préparer le yaourt grec selon les instructions',
      'Disposer les graines de tournesol, le miel par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'équilibré'],
    emoji: '🥣',
    classe: 'Récupération'
  },
  {
    id: '88',
    nom: 'Feta et concombre',
    description: 'Collation sèche',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[46], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[48], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 5, unite: 'g' }
    ],
    instructions: [
      'Préparer la feta, le concombre, l\'huile d\'olive',
      'Assembler et déguster'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'léger'],
    emoji: '🧀',
    classe: 'Sèche'
  },
  {
    id: '89',
    nom: 'Cottage et pomme',
    description: 'Collation sèche',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[24], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[41], quantite: 100, unite: 'g' }
    ],
    instructions: [
      'Préparer le fromage cottage selon les instructions',
      'Disposer la pomme par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'équilibré'],
    emoji: '🍏',
    classe: 'Sèche'
  },
  {
    id: '90',
    nom: 'Barres maison avoine et miel',
    description: 'Collation équilibre',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[5], quantite: 40, unite: 'g' },
      { aliment: ALIMENTS[23], quantite: 15, unite: 'g' },
      { aliment: ALIMENTS[9], quantite: 20, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer l\'avoine, le miel, les amandes sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'équilibré'],
    emoji: '🍫',
    classe: 'Équilibre'
  },
  {
    id: '91',
    nom: 'Smoothie kiwi et banane léger',
    description: 'Collation équilibre',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[35], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[7], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[19], quantite: 150, unite: 'ml' }
    ],
    instructions: [
      'Mettre le kiwi, la banane, le lait d\'amande dans un blender',
      'Mixer jusqu\'à obtenir une texture lisse',
      'Servir immédiatement'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'protéines'],
    emoji: '🥝',
    classe: 'Équilibre'
  },
  {
    id: '92',
    nom: 'Pois chiches rôtis épicés',
    description: 'Collation sèche',
    tempsPreparation: 25,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[37], quantite: 150, unite: 'g' },
      { aliment: ALIMENTS[10], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer les pois chiches, l\'huile d\'olive sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'équilibré'],
    emoji: '🫘',
    classe: 'Sèche'
  },
  {
    id: '93',
    nom: 'Jambon de dinde et concombre roulés',
    description: 'Collation sèche',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[45], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[48], quantite: 60, unite: 'g' },
      { aliment: ALIMENTS[24], quantite: 40, unite: 'g' }
    ],
    instructions: [
      'Préparer le jambon de dinde, le concombre, le fromage cottage',
      'Assembler et déguster'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'léger'],
    emoji: '🌯',
    classe: 'Sèche'
  },
  {
    id: '94',
    nom: 'Mix noix de cajou et graines',
    description: 'Collation équilibre',
    tempsPreparation: 3,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[43], quantite: 20, unite: 'g' },
      { aliment: ALIMENTS[44], quantite: 20, unite: 'g' },
      { aliment: ALIMENTS[32], quantite: 30, unite: 'g' }
    ],
    instructions: [
      'Préparer les noix de cajou, les graines de tournesol, les myrtilles',
      'Assembler et déguster'
    ],
    caloriesParPortion: 0,
    tags: ['collation', 'léger'],
    emoji: '🥜',
    classe: 'Équilibre'
  },
  {
    id: '95',
    nom: 'Shaker whey et lait d\'amande',
    description: 'Post-training récupération',
    tempsPreparation: 3,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[18], quantite: 30, unite: 'g' },
      { aliment: ALIMENTS[19], quantite: 300, unite: 'ml' }
    ],
    instructions: [
      'Mettre la protéine en poudre, le lait d\'amande dans un blender',
      'Mixer jusqu\'à obtenir une texture lisse',
      'Servir immédiatement'
    ],
    caloriesParPortion: 0,
    tags: ['post-training', 'protéines'],
    emoji: '🥤',
    classe: 'Récupération'
  },
  {
    id: '96',
    nom: 'Riz blanc et poulet post-training',
    description: 'Post-training récupération',
    tempsPreparation: 20,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[33], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[0], quantite: 150, unite: 'g' }
    ],
    instructions: [
      'Préparer le riz blanc selon les instructions',
      'Disposer le poulet par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['post-training', 'équilibré'],
    emoji: '🍚',
    classe: 'Récupération'
  },
  {
    id: '97',
    nom: 'Smoothie whey et myrtilles',
    description: 'Post-training récupération',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[18], quantite: 25, unite: 'g' },
      { aliment: ALIMENTS[32], quantite: 80, unite: 'g' },
      { aliment: ALIMENTS[19], quantite: 200, unite: 'ml' }
    ],
    instructions: [
      'Mettre la protéine en poudre, les myrtilles, le lait d\'amande dans un blender',
      'Mixer jusqu\'à obtenir une texture lisse',
      'Servir immédiatement'
    ],
    caloriesParPortion: 0,
    tags: ['post-training', 'protéines'],
    emoji: '🫐',
    classe: 'Récupération'
  },
  {
    id: '98',
    nom: 'Patate douce et dinde récupération',
    description: 'Post-training récupération',
    tempsPreparation: 25,
    difficulte: 'moyen',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[6], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[17], quantite: 150, unite: 'g' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Disposer la patate douce, la dinde sur une plaque',
      'Cuire 20 à 25 minutes',
      'Servir chaud'
    ],
    caloriesParPortion: 0,
    tags: ['post-training', 'équilibré'],
    emoji: '🍠',
    classe: 'Récupération'
  },
  {
    id: '99',
    nom: 'Smoothie whey, avoine et banane',
    description: 'Post-training récupération',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[18], quantite: 25, unite: 'g' },
      { aliment: ALIMENTS[5], quantite: 40, unite: 'g' },
      { aliment: ALIMENTS[7], quantite: 100, unite: 'g' },
      { aliment: ALIMENTS[19], quantite: 200, unite: 'ml' }
    ],
    instructions: [
      'Mettre la protéine en poudre, l\'avoine, la banane, le lait d\'amande dans un blender',
      'Mixer jusqu\'à obtenir une texture lisse',
      'Servir immédiatement'
    ],
    caloriesParPortion: 0,
    tags: ['post-training', 'protéines'],
    emoji: '🥤',
    classe: 'Récupération'
  },
  {
    id: '100',
    nom: 'Yaourt grec, whey et miel',
    description: 'Post-training récupération',
    tempsPreparation: 5,
    difficulte: 'facile',
    portions: 1,
    ingredients: [
      { aliment: ALIMENTS[21], quantite: 200, unite: 'g' },
      { aliment: ALIMENTS[18], quantite: 15, unite: 'g' },
      { aliment: ALIMENTS[23], quantite: 10, unite: 'g' }
    ],
    instructions: [
      'Préparer le yaourt grec selon les instructions',
      'Disposer la protéine en poudre, le miel par-dessus',
      'Assaisonner et servir'
    ],
    caloriesParPortion: 0,
    tags: ['post-training', 'équilibré'],
    emoji: '🥣',
    classe: 'Récupération'
  }];

// Calcule les macros réelles d'une recette PAR PORTION à partir de ses ingrédients (plutôt que de
// se fier à un `caloriesParPortion` saisi à la main, qui peut diverger des ingrédients réels).
export const calculerMacrosRecette = (recette: Recette) => {
  const totaux = recette.ingredients.reduce(
    (acc, { aliment, quantite }) => {
      const macros = calculerMacros(aliment, quantite);
      return {
        calories: acc.calories + macros.calories,
        proteines: acc.proteines + macros.proteines,
        glucides: acc.glucides + macros.glucides,
        lipides: acc.lipides + macros.lipides,
      };
    },
    { calories: 0, proteines: 0, glucides: 0, lipides: 0 }
  );

  const portions = recette.portions || 1;
  return {
    calories: Math.round(totaux.calories / portions),
    proteines: Math.round(totaux.proteines / portions),
    glucides: Math.round(totaux.glucides / portions),
    lipides: Math.round(totaux.lipides / portions),
  };
};

export const getRecetteById = (id: string): Recette | undefined => {
  return RECETTES.find(recette => recette.id === id);
};

// Fonctions utilitaires
export const getAlimentById = (id: string): Aliment | undefined => {
  return ALIMENTS.find(aliment => aliment.id === id);
};

export const getAlimentsByCategorie = (categorie: string): Aliment[] => {
  return ALIMENTS.filter(aliment => aliment.categorie === categorie);
};

export const searchAliments = (query: string): Aliment[] => {
  const queryLower = query.toLowerCase();
  return ALIMENTS.filter(aliment => 
    aliment.nom.toLowerCase().includes(queryLower) ||
    aliment.description?.toLowerCase().includes(queryLower)
  );
};

export const calculerCalories = (aliment: Aliment, quantite: number): number => {
  return Math.round((aliment.calories * quantite) / 100);
};

export const calculerMacros = (aliment: Aliment, quantite: number) => {
  return {
    calories: Math.round((aliment.calories * quantite) / 100),
    proteines: Math.round((aliment.proteines * quantite) / 100),
    glucides: Math.round((aliment.glucides * quantite) / 100),
    lipides: Math.round((aliment.lipides * quantite) / 100),
    fibres: Math.round((aliment.fibres * quantite) / 100),
    sodium: Math.round((aliment.sodium * quantite) / 100)
  };
};

// Objectifs nutritionnels par profil
export const OBJECTIFS_NUTRITION = {
  power: {
    calories: 3000,
    proteines: 200,
    glucides: 300,
    lipides: 100
  },
  marathon: {
    calories: 2500,
    proteines: 120,
    glucides: 400,
    lipides: 80
  },
  crossfit: {
    calories: 2800,
    proteines: 180,
    glucides: 350,
    lipides: 90
  },
  classique: {
    calories: 2200,
    proteines: 150,
    glucides: 250,
    lipides: 70
  }
};

export default {
  ALIMENTS,
  RECETTES,
  getAlimentById,
  getAlimentsByCategorie,
  searchAliments,
  calculerCalories,
  calculerMacros,
  OBJECTIFS_NUTRITION
};