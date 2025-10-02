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
  }
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
      { aliment: ALIMENTS[11], quantite: 1, unite: 'c.à.s' }, // Huile d'olive
      { aliment: ALIMENTS[12], quantite: 100, unite: 'g' } // Brocoli
    ],
    instructions: [
      'Cuire le poulet à la poêle',
      'Préparer le riz complet selon les instructions',
      'Cuire le brocoli à la vapeur',
      'Assembler tous les ingrédients dans un bol',
      'Arroser d\'huile d\'olive'
    ],
    caloriesParPortion: 450,
    tags: ['protéines', 'équilibré', 'rapide']
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
      { aliment: ALIMENTS[7], quantite: 1, unite: 'unité' }, // Banane
      { aliment: ALIMENTS[9], quantite: 30, unite: 'g' }, // Amandes
      { aliment: ALIMENTS[13], quantite: 50, unite: 'g' } // Épinards
    ],
    instructions: [
      'Mettre tous les ingrédients dans un mixeur',
      'Mixer jusqu\'à obtenir une texture lisse',
      'Servir immédiatement'
    ],
    caloriesParPortion: 320,
    tags: ['protéines', 'post-entraînement', 'smoothie']
  }
];

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