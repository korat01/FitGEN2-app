// Types pour les blocs nutritionnels
export interface AlimentBlock {
  id: string;
  nom: string;
  catégorie: 'Protéine' | 'Glucide' | 'Lipide' | 'Mixte' | 'Micronutriments';
  calories: number;
  macros: {
    protéines: number;
    glucides: number;
    lipides: number;
    fibres: number;
  };
  quantité_standard: string;
  moment_de_consommation: string[];
  classes_nutritionnelles: string[];
  index_glycémique: 'faible' | 'modéré' | 'élevé';
  bénéfices_clés: string[];
  interdit_si: string[];
}

export interface RepasBlock {
  id: string;
  nom: string;
  type_de_repas: 'petit-déjeuner' | 'déjeuner' | 'dîner' | 'collation' | 'post-training' | 'pré-training';
  objectif_nutritionnel: string[];
  calories_totales: number;
  macros: {
    protéines: number;
    glucides: number;
    lipides: number;
    fibres: number;
  };
  composition: Array<{
    aliment: string;
    quantité: string;
    préparation: string;
  }>;
  indice_satiété: 'faible' | 'moyen' | 'élevé';
  temps_de_préparation: number;
  adaptations_possibles: string[];
  contre_indications: string[];
}

export interface MenuJournalier {
  id: string;
  date: string;
  repas: {
    'petit-déjeuner'?: RepasBlock[];
    'déjeuner'?: RepasBlock[];
    'dîner'?: RepasBlock[];
    'collation'?: RepasBlock[];
  };
}

// Stockage local
const STORAGE_KEYS = {
  ALIMENTS: 'nutrition_aliments',
  REPAS: 'nutrition_repas',
  MENUS: 'nutrition_menus'
};

// Gestion des aliments
export const saveAliment = (aliment: Omit<AlimentBlock, 'id'>): AlimentBlock => {
  const id = Date.now().toString();
  const newAliment = { ...aliment, id };
  
  const existingAliments = getAliments();
  const updatedAliments = [...existingAliments, newAliment];
  
  localStorage.setItem(STORAGE_KEYS.ALIMENTS, JSON.stringify(updatedAliments));
  return newAliment;
};

export const getAliments = (): AlimentBlock[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.ALIMENTS);
  return stored ? JSON.parse(stored) : [];
};

export const deleteAliment = (id: string): void => {
  const aliments = getAliments();
  const filtered = aliments.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ALIMENTS, JSON.stringify(filtered));
};

// Gestion des repas
export const saveRepas = (repas: Omit<RepasBlock, 'id'>): RepasBlock => {
  const id = Date.now().toString();
  const newRepas = { ...repas, id };
  
  const existingRepas = getRepas();
  const updatedRepas = [...existingRepas, newRepas];
  
  localStorage.setItem(STORAGE_KEYS.REPAS, JSON.stringify(updatedRepas));
  return newRepas;
};

export const getRepas = (): RepasBlock[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.REPAS);
  return stored ? JSON.parse(stored) : [];
};

export const deleteRepas = (id: string): void => {
  const repas = getRepas();
  const filtered = repas.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.REPAS, JSON.stringify(filtered));
};

// Gestion des menus journaliers
export const saveMenu = (menu: Omit<MenuJournalier, 'id'>): MenuJournalier => {
  const id = Date.now().toString();
  const newMenu = { ...menu, id };
  
  const existingMenus = getMenus();
  const updatedMenus = [...existingMenus, newMenu];
  
  localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(updatedMenus));
  return newMenu;
};

export const getMenus = (): MenuJournalier[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.MENUS);
  return stored ? JSON.parse(stored) : [];
};

export const getMenuByDate = (date: string): MenuJournalier | null => {
  const menus = getMenus();
  return menus.find(m => m.date === date) || null;
};

export const updateMenu = (menu: MenuJournalier): void => {
  const menus = getMenus();
  const index = menus.findIndex(m => m.id === menu.id);
  
  if (index !== -1) {
    menus[index] = menu;
  } else {
    menus.push(menu);
  }
  
  localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(menus));
};

// Génération de liste de courses
export const generateShoppingList = (menus: MenuJournalier[]): { [key: string]: string[] } => {
  const ingredients: { [key: string]: Set<string> } = {};
  
  menus.forEach(menu => {
    Object.values(menu.repas).forEach(repasArray => {
      repasArray?.forEach(repas => {
        repas.composition.forEach(item => {
          const category = getCategoryFromAliment(item.aliment);
          if (!ingredients[category]) {
            ingredients[category] = new Set();
          }
          ingredients[category].add(`${item.aliment} (${item.quantité})`);
        });
      });
    });
  });
  
  // Convertir les Sets en arrays
  const result: { [key: string]: string[] } = {};
  Object.entries(ingredients).forEach(([category, items]) => {
    result[category] = Array.from(items);
  });
  
  return result;
};

const getCategoryFromAliment = (alimentName: string): string => {
  // Logique simple de catégorisation basée sur le nom
  const lowerName = alimentName.toLowerCase();
  
  if (lowerName.includes('poulet') || lowerName.includes('porc') || lowerName.includes('bœuf') || 
      lowerName.includes('poisson') || lowerName.includes('œuf') || lowerName.includes('thon')) {
    return 'Protéines';
  }
  
  if (lowerName.includes('riz') || lowerName.includes('pâtes') || lowerName.includes('pain') || 
      lowerName.includes('avoine') || lowerName.includes('quinoa')) {
    return 'Féculents';
  }
  
  if (lowerName.includes('légume') || lowerName.includes('salade') || lowerName.includes('brocoli') || 
      lowerName.includes('épinard') || lowerName.includes('tomate')) {
    return 'Légumes';
  }
  
  if (lowerName.includes('pomme') || lowerName.includes('banane') || lowerName.includes('orange') || 
      lowerName.includes('fruit')) {
    return 'Fruits';
  }
  
  if (lowerName.includes('huile') || lowerName.includes('beurre') || lowerName.includes('avocat') || 
      lowerName.includes('noix') || lowerName.includes('amande')) {
    return 'Matières grasses';
  }
  
  return 'Autres';
};

// Base de données d'aliments prédéfinis (100 aliments)
export const alimentsPredefinis: AlimentBlock[] = [
  // PROTÉINES (25 aliments)
  {
    id: "aliment_1",
    nom: "Poulet grillé",
    catégorie: "Protéine",
    calories: 165,
    macros: { protéines: 31, glucides: 0, lipides: 3.6, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine complète", "faible en gras"],
    index_glycémique: "faible",
    bénéfices_clés: ["construction musculaire", "satiété"],
    interdit_si: ["végétarien", "végétalien"]
  },
  {
    id: "aliment_2",
    nom: "Saumon atlantique",
    catégorie: "Mixte",
    calories: 208,
    macros: { protéines: 25, glucides: 0, lipides: 12, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["oméga-3", "protéine complète"],
    index_glycémique: "faible",
    bénéfices_clés: ["anti-inflammatoire", "santé cardiovasculaire"],
    interdit_si: ["allergie_poisson"]
  },
  {
    id: "aliment_3",
    nom: "Œufs entiers",
    catégorie: "Mixte",
    calories: 155,
    macros: { protéines: 13, glucides: 1, lipides: 11, fibres: 0 },
    quantité_standard: "2 œufs (100g)",
    moment_de_consommation: ["petit-déjeuner", "déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine complète", "choline"],
    index_glycémique: "faible",
    bénéfices_clés: ["construction musculaire", "santé cérébrale"],
    interdit_si: ["allergie_œuf", "végétalien"]
  },
  {
    id: "aliment_4",
    nom: "Thon en conserve",
    catégorie: "Protéine",
    calories: 132,
    macros: { protéines: 30, glucides: 0, lipides: 1, fibres: 0 },
    quantité_standard: "100g égouttés",
    moment_de_consommation: ["déjeuner", "dîner", "collation"],
    classes_nutritionnelles: ["protéine maigre", "pratique"],
    index_glycémique: "faible",
    bénéfices_clés: ["praticité", "haute teneur protéique"],
    interdit_si: ["allergie_poisson"]
  },
  {
    id: "aliment_5",
    nom: "Tofu ferme",
    catégorie: "Protéine",
    calories: 144,
    macros: { protéines: 17, glucides: 3, lipides: 9, fibres: 2 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine végétale", "isoflavones"],
    index_glycémique: "faible",
    bénéfices_clés: ["source végétale", "versatile"],
    interdit_si: ["allergie_soja"]
  },
  {
    id: "aliment_6",
    nom: "Lentilles cuites",
    catégorie: "Mixte",
    calories: 116,
    macros: { protéines: 9, glucides: 20, lipides: 0.4, fibres: 8 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["légumineuse", "fibres"],
    index_glycémique: "faible",
    bénéfices_clés: ["fibres", "fer", "folates"],
    interdit_si: []
  },
  {
    id: "aliment_7",
    nom: "Bœuf maigre",
    catégorie: "Protéine",
    calories: 250,
    macros: { protéines: 26, glucides: 0, lipides: 15, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine complète", "fer héminique"],
    index_glycémique: "faible",
    bénéfices_clés: ["construction musculaire", "fer"],
    interdit_si: ["végétarien", "végétalien"]
  },
  {
    id: "aliment_8",
    nom: "Crevettes",
    catégorie: "Protéine",
    calories: 99,
    macros: { protéines: 24, glucides: 0, lipides: 0.3, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine maigre", "iode"],
    index_glycémique: "faible",
    bénéfices_clés: ["faible en calories", "haute protéine"],
    interdit_si: ["allergie_crustacés"]
  },
  {
    id: "aliment_9",
    nom: "Cottage cheese",
    catégorie: "Protéine",
    calories: 98,
    macros: { protéines: 11, glucides: 3, lipides: 4, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["caséine", "calcium"],
    index_glycémique: "faible",
    bénéfices_clés: ["digestion lente", "calcium"],
    interdit_si: ["intolérance_lactose"]
  },
  {
    id: "aliment_10",
    nom: "Quinoa cuit",
    catégorie: "Mixte",
    calories: 120,
    macros: { protéines: 4.5, glucides: 22, lipides: 1.9, fibres: 2.8 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["pseudo-céréale", "protéine complète"],
    index_glycémique: "modéré",
    bénéfices_clés: ["sans gluten", "minéraux"],
    interdit_si: []
  },
  {
    id: "aliment_11",
    nom: "Haricots noirs",
    catégorie: "Mixte",
    calories: 132,
    macros: { protéines: 9, glucides: 23, lipides: 0.5, fibres: 9 },
    quantité_standard: "100g cuits",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["légumineuse", "antioxydants"],
    index_glycémique: "faible",
    bénéfices_clés: ["fibres", "folates"],
    interdit_si: []
  },
  {
    id: "aliment_12",
    nom: "Tempeh",
    catégorie: "Protéine",
    calories: 190,
    macros: { protéines: 19, glucides: 9, lipides: 11, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["fermenté", "probiotiques"],
    index_glycémique: "faible",
    bénéfices_clés: ["probiotiques", "protéine végétale"],
    interdit_si: ["allergie_soja"]
  },
  {
    id: "aliment_13",
    nom: "Sardines en conserve",
    catégorie: "Mixte",
    calories: 208,
    macros: { protéines: 25, glucides: 0, lipides: 11, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["oméga-3", "calcium"],
    index_glycémique: "faible",
    bénéfices_clés: ["os solides", "anti-inflammatoire"],
    interdit_si: ["allergie_poisson"]
  },
  {
    id: "aliment_14",
    nom: "Yaourt grec nature",
    catégorie: "Protéine",
    calories: 59,
    macros: { protéines: 10, glucides: 4, lipides: 0.4, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["probiotiques", "calcium"],
    index_glycémique: "faible",
    bénéfices_clés: ["digestion", "probiotiques"],
    interdit_si: ["intolérance_lactose"]
  },
  {
    id: "aliment_15",
    nom: "Dinde émincée",
    catégorie: "Protéine",
    calories: 135,
    macros: { protéines: 30, glucides: 0, lipides: 1, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine maigre", "tryptophane"],
    index_glycémique: "faible",
    bénéfices_clés: ["faible en gras", "sélénium"],
    interdit_si: ["végétarien", "végétalien"]
  },
  {
    id: "aliment_16",
    nom: "Pois chiches",
    catégorie: "Mixte",
    calories: 164,
    macros: { protéines: 8, glucides: 27, lipides: 2.6, fibres: 8 },
    quantité_standard: "100g cuits",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["légumineuse", "magnésium"],
    index_glycémique: "faible",
    bénéfices_clés: ["fibres", "versatile"],
    interdit_si: []
  },
  {
    id: "aliment_17",
    nom: "Cabillaud",
    catégorie: "Protéine",
    calories: 82,
    macros: { protéines: 18, glucides: 0, lipides: 0.7, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine maigre", "iode"],
    index_glycémique: "faible",
    bénéfices_clés: ["très faible en gras", "digestible"],
    interdit_si: ["allergie_poisson"]
  },
  {
    id: "aliment_18",
    nom: "Seitan",
    catégorie: "Protéine",
    calories: 370,
    macros: { protéines: 75, glucides: 14, lipides: 1.9, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["gluten", "protéine végétale"],
    index_glycémique: "faible",
    bénéfices_clés: ["très haute protéine", "texture"],
    interdit_si: ["maladie_cœliaque", "intolérance_gluten"]
  },
  {
    id: "aliment_19",
    nom: "Edamame",
    catégorie: "Mixte",
    calories: 121,
    macros: { protéines: 11, glucides: 8, lipides: 5, fibres: 5 },
    quantité_standard: "100g",
    moment_de_consommation: ["collation", "déjeuner"],
    classes_nutritionnelles: ["soja", "folates"],
    index_glycémique: "faible",
    bénéfices_clés: ["complet", "folates"],
    interdit_si: ["allergie_soja"]
  },
  {
    id: "aliment_20",
    nom: "Spiruline",
    catégorie: "Protéine",
    calories: 290,
    macros: { protéines: 57, glucides: 24, lipides: 8, fibres: 4 },
    quantité_standard: "10g",
    moment_de_consommation: ["petit-déjeuner", "post-training"],
    classes_nutritionnelles: ["superaliment", "fer"],
    index_glycémique: "faible",
    bénéfices_clés: ["fer", "B12"],
    interdit_si: ["allergie_algues"]
  },
  {
    id: "aliment_21",
    nom: "Bœuf haché 5%",
    catégorie: "Protéine",
    calories: 137,
    macros: { protéines: 20, glucides: 0, lipides: 5, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine complète", "créatine"],
    index_glycémique: "faible",
    bénéfices_clés: ["fer", "zinc"],
    interdit_si: ["végétarien", "végétalien"]
  },
  {
    id: "aliment_22",
    nom: "Mozzarella light",
    catégorie: "Mixte",
    calories: 254,
    macros: { protéines: 24, glucides: 2, lipides: 16, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner", "collation"],
    classes_nutritionnelles: ["calcium", "protéine"],
    index_glycémique: "faible",
    bénéfices_clés: ["calcium", "goût"],
    interdit_si: ["intolérance_lactose"]
  },
  {
    id: "aliment_23",
    nom: "Protéine de pois",
    catégorie: "Protéine",
    calories: 400,
    macros: { protéines: 80, glucides: 7, lipides: 7, fibres: 6 },
    quantité_standard: "30g",
    moment_de_consommation: ["post-training", "collation"],
    classes_nutritionnelles: ["protéine végétale", "complément"],
    index_glycémique: "faible",
    bénéfices_clés: ["hypoallergénique", "digestible"],
    interdit_si: []
  },
  {
    id: "aliment_24",
    nom: "Anchois",
    catégorie: "Mixte",
    calories: 131,
    macros: { protéines: 20, glucides: 0, lipides: 5, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["oméga-3", "umami"],
    index_glycémique: "faible",
    bénéfices_clés: ["saveur", "oméga-3"],
    interdit_si: ["allergie_poisson"]
  },
  {
    id: "aliment_25",
    nom: "Ricotta",
    catégorie: "Protéine",
    calories: 174,
    macros: { protéines: 11, glucides: 3, lipides: 13, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["lactosérum", "calcium"],
    index_glycémique: "faible",
    bénéfices_clés: ["texture crémeuse", "versatile"],
    interdit_si: ["intolérance_lactose"]
  },

  // GLUCIDES (25 aliments)
  {
    id: "aliment_26",
    nom: "Avoine complète",
    catégorie: "Glucide",
    calories: 389,
    macros: { protéines: 17, glucides: 66, lipides: 7, fibres: 11 },
    quantité_standard: "100g secs",
    moment_de_consommation: ["petit-déjeuner"],
    classes_nutritionnelles: ["fibres solubles", "bêta-glucanes"],
    index_glycémique: "modéré",
    bénéfices_clés: ["satiété durable", "cholestérol"],
    interdit_si: ["intolérance_gluten"]
  },
  {
    id: "aliment_27",
    nom: "Riz basmati complet",
    catégorie: "Glucide",
    calories: 123,
    macros: { protéines: 3, glucides: 25, lipides: 0.9, fibres: 1.8 },
    quantité_standard: "100g cuit",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["céréale complète", "magnésium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["sans gluten", "digestible"],
    interdit_si: []
  },
  {
    id: "aliment_28",
    nom: "Patate douce",
    catégorie: "Glucide",
    calories: 86,
    macros: { protéines: 2, glucides: 20, lipides: 0.1, fibres: 3 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner", "post-training"],
    classes_nutritionnelles: ["bêta-carotène", "potassium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["vitamine A", "antioxydants"],
    interdit_si: []
  },
  {
    id: "aliment_29",
    nom: "Pâtes complètes",
    catégorie: "Glucide",
    calories: 124,
    macros: { protéines: 5, glucides: 25, lipides: 1.1, fibres: 4 },
    quantité_standard: "100g cuites",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["céréale complète", "sélénium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["énergie durable", "fibres"],
    interdit_si: ["maladie_cœliaque"]
  },
  {
    id: "aliment_30",
    nom: "Banane",
    catégorie: "Glucide",
    calories: 89,
    macros: { protéines: 1.1, glucides: 23, lipides: 0.3, fibres: 2.6 },
    quantité_standard: "1 moyenne (120g)",
    moment_de_consommation: ["petit-déjeuner", "collation", "pré-training"],
    classes_nutritionnelles: ["potassium", "vitamine B6"],
    index_glycémique: "modéré",
    bénéfices_clés: ["énergie rapide", "électrolytes"],
    interdit_si: []
  },
  {
    id: "aliment_31",
    nom: "Pain complet",
    catégorie: "Glucide",
    calories: 247,
    macros: { protéines: 13, glucides: 41, lipides: 4.2, fibres: 7 },
    quantité_standard: "100g (4 tranches)",
    moment_de_consommation: ["petit-déjeuner", "déjeuner"],
    classes_nutritionnelles: ["grains entiers", "vitamine B"],
    index_glycémique: "modéré",
    bénéfices_clés: ["fibres", "pratique"],
    interdit_si: ["maladie_cœliaque"]
  },
  {
    id: "aliment_32",
    nom: "Sarrasin",
    catégorie: "Glucide",
    calories: 343,
    macros: { protéines: 13, glucides: 72, lipides: 3.4, fibres: 10 },
    quantité_standard: "100g sec",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["sans gluten", "rutine"],
    index_glycémique: "modéré",
    bénéfices_clés: ["sans gluten", "magnésium"],
    interdit_si: []
  },
  {
    id: "aliment_33",
    nom: "Millet",
    catégorie: "Glucide",
    calories: 378,
    macros: { protéines: 11, glucides: 73, lipides: 4.2, fibres: 8.5 },
    quantité_standard: "100g sec",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["sans gluten", "magnésium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["alcalinisant", "minéraux"],
    interdit_si: []
  },
  {
    id: "aliment_34",
    nom: "Orge perlé",
    catégorie: "Glucide",
    calories: 123,
    macros: { protéines: 2.3, glucides: 28, lipides: 0.4, fibres: 3.8 },
    quantité_standard: "100g cuit",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["bêta-glucanes", "sélénium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["cholestérol", "satiété"],
    interdit_si: ["intolérance_gluten"]
  },
  {
    id: "aliment_35",
    nom: "Pomme de terre",
    catégorie: "Glucide",
    calories: 77,
    macros: { protéines: 2, glucides: 17, lipides: 0.1, fibres: 2.2 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["potassium", "vitamine C"],
    index_glycémique: "élevé",
    bénéfices_clés: ["potassium", "économique"],
    interdit_si: []
  },
  {
    id: "aliment_36",
    nom: "Couscous complet",
    catégorie: "Glucide",
    calories: 112,
    macros: { protéines: 3.8, glucides: 23, lipides: 0.2, fibres: 1.4 },
    quantité_standard: "100g cuit",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["sémoline", "sélénium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["préparation rapide", "versatile"],
    interdit_si: ["maladie_cœliaque"]
  },
  {
    id: "aliment_37",
    nom: "Mangue",
    catégorie: "Glucide",
    calories: 60,
    macros: { protéines: 0.8, glucides: 15, lipides: 0.4, fibres: 1.6 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["vitamine C", "bêta-carotène"],
    index_glycémique: "modéré",
    bénéfices_clés: ["vitamine A", "antioxydants"],
    interdit_si: []
  },
  {
    id: "aliment_38",
    nom: "Amarante",
    catégorie: "Glucide",
    calories: 371,
    macros: { protéines: 14, glucides: 65, lipides: 7, fibres: 7 },
    quantité_standard: "100g sec",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["sans gluten", "lysine"],
    index_glycémique: "modéré",
    bénéfices_clés: ["protéine complète", "fer"],
    interdit_si: []
  },
  {
    id: "aliment_39",
    nom: "Ananas",
    catégorie: "Glucide",
    calories: 50,
    macros: { protéines: 0.5, glucides: 13, lipides: 0.1, fibres: 1.4 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["bromélaïne", "vitamine C"],
    index_glycémique: "modéré",
    bénéfices_clés: ["digestion", "anti-inflammatoire"],
    interdit_si: []
  },
  {
    id: "aliment_40",
    nom: "Figues fraîches",
    catégorie: "Glucide",
    calories: 74,
    macros: { protéines: 0.8, glucides: 19, lipides: 0.3, fibres: 2.9 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["fibres", "potassium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["fibres", "minéraux"],
    interdit_si: []
  },
  {
    id: "aliment_41",
    nom: "Épeautre",
    catégorie: "Glucide",
    calories: 338,
    macros: { protéines: 15, glucides: 70, lipides: 2.4, fibres: 11 },
    quantité_standard: "100g sec",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["céréale ancienne", "magnésium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["digestible", "minéraux"],
    interdit_si: ["maladie_cœliaque"]
  },
  {
    id: "aliment_42",
    nom: "Dattes Medjool",
    catégorie: "Glucide",
    calories: 277,
    macros: { protéines: 1.8, glucides: 75, lipides: 0.2, fibres: 6.7 },
    quantité_standard: "100g",
    moment_de_consommation: ["pré-training", "collation"],
    classes_nutritionnelles: ["énergie rapide", "potassium"],
    index_glycémique: "élevé",
    bénéfices_clés: ["énergie naturelle", "minéraux"],
    interdit_si: []
  },
  {
    id: "aliment_43",
    nom: "Polenta",
    catégorie: "Glucide",
    calories: 85,
    macros: { protéines: 1.4, glucides: 18, lipides: 0.3, fibres: 1.2 },
    quantité_standard: "100g cuite",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["maïs", "sans gluten"],
    index_glycémique: "élevé",
    bénéfices_clés: ["sans gluten", "versatile"],
    interdit_si: []
  },
  {
    id: "aliment_44",
    nom: "Raisins secs",
    catégorie: "Glucide",
    calories: 299,
    macros: { protéines: 3.1, glucides: 79, lipides: 0.5, fibres: 3.7 },
    quantité_standard: "100g",
    moment_de_consommation: ["collation", "pré-training"],
    classes_nutritionnelles: ["énergie concentrée", "potassium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["pratique", "fer"],
    interdit_si: []
  },
  {
    id: "aliment_45",
    nom: "Teff",
    catégorie: "Glucide",
    calories: 367,
    macros: { protéines: 13, glucides: 73, lipides: 2.4, fibres: 8 },
    quantité_standard: "100g sec",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["sans gluten", "fer"],
    index_glycémique: "modéré",
    bénéfices_clés: ["fer", "calcium"],
    interdit_si: []
  },
  {
    id: "aliment_46",
    nom: "Courge butternut",
    catégorie: "Glucide",
    calories: 45,
    macros: { protéines: 1, glucides: 12, lipides: 0.1, fibres: 2 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["bêta-carotène", "potassium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["vitamine A", "faible calorie"],
    interdit_si: []
  },
  {
    id: "aliment_47",
    nom: "Plantain",
    catégorie: "Glucide",
    calories: 122,
    macros: { protéines: 1.3, glucides: 32, lipides: 0.4, fibres: 2.3 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["amidon résistant", "potassium"],
    index_glycémique: "modéré",
    bénéfices_clés: ["satiété", "digestion"],
    interdit_si: []
  },
  {
    id: "aliment_48",
    nom: "Kiwi",
    catégorie: "Glucide",
    calories: 61,
    macros: { protéines: 1.1, glucides: 15, lipides: 0.5, fibres: 3 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["vitamine C", "fibres"],
    index_glycémique: "faible",
    bénéfices_clés: ["vitamine C", "digestion"],
    interdit_si: []
  },
  {
    id: "aliment_49",
    nom: "Papaye",
    catégorie: "Glucide",
    calories: 43,
    macros: { protéines: 0.5, glucides: 11, lipides: 0.3, fibres: 1.7 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["papaïne", "vitamine C"],
    index_glycémique: "modéré",
    bénéfices_clés: ["digestion", "antioxydants"],
    interdit_si: []
  },
  {
    id: "aliment_50",
    nom: "Riz noir",
    catégorie: "Glucide",
    calories: 356,
    macros: { protéines: 8.9, glucides: 75, lipides: 3.2, fibres: 2.2 },
    quantité_standard: "100g sec",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["anthocyanes", "antioxydants"],
    index_glycémique: "modéré",
    bénéfices_clés: ["antioxydants", "sans gluten"],
    interdit_si: []
  },

  // LIPIDES (25 aliments)
  {
    id: "aliment_51",
    nom: "Avocat",
    catégorie: "Lipide",
    calories: 160,
    macros: { protéines: 2, glucides: 9, lipides: 15, fibres: 7 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "déjeuner", "dîner"],
    classes_nutritionnelles: ["monoinsaturés", "potassium"],
    index_glycémique: "faible",
    bénéfices_clés: ["bon gras", "satiété"],
    interdit_si: []
  },
  {
    id: "aliment_52",
    nom: "Huile d'olive extra vierge",
    catégorie: "Lipide",
    calories: 884,
    macros: { protéines: 0, glucides: 0, lipides: 100, fibres: 0 },
    quantité_standard: "1 cuillère à soupe (15ml)",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["monoinsaturés", "vitamine E"],
    index_glycémique: "faible",
    bénéfices_clés: ["anti-inflammatoire", "antioxydants"],
    interdit_si: []
  },
  {
    id: "aliment_53",
    nom: "Amandes",
    catégorie: "Lipide",
    calories: 579,
    macros: { protéines: 21, glucides: 22, lipides: 50, fibres: 12 },
    quantité_standard: "30g (23 amandes)",
    moment_de_consommation: ["collation", "petit-déjeuner"],
    classes_nutritionnelles: ["vitamine E", "magnésium"],
    index_glycémique: "faible",
    bénéfices_clés: ["vitamine E", "satiété"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_54",
    nom: "Noix",
    catégorie: "Lipide",
    calories: 654,
    macros: { protéines: 15, glucides: 14, lipides: 65, fibres: 7 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation", "petit-déjeuner"],
    classes_nutritionnelles: ["oméga-3", "mélatonine"],
    index_glycémique: "faible",
    bénéfices_clés: ["oméga-3 végétal", "cerveau"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_55",
    nom: "Graines de chia",
    catégorie: "Lipide",
    calories: 486,
    macros: { protéines: 17, glucides: 42, lipides: 31, fibres: 34 },
    quantité_standard: "15g (1 cuillère)",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["oméga-3", "fibres"],
    index_glycémique: "faible",
    bénéfices_clés: ["fibres", "oméga-3"],
    interdit_si: []
  },
  {
    id: "aliment_56",
    nom: "Graines de lin",
    catégorie: "Lipide",
    calories: 534,
    macros: { protéines: 18, glucides: 29, lipides: 42, fibres: 27 },
    quantité_standard: "15g (1 cuillère)",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["oméga-3", "lignanes"],
    index_glycémique: "faible",
    bénéfices_clés: ["oméga-3", "hormones"],
    interdit_si: []
  },
  {
    id: "aliment_57",
    nom: "Beurre de cacahuète naturel",
    catégorie: "Lipide",
    calories: 588,
    macros: { protéines: 25, glucides: 20, lipides: 50, fibres: 8 },
    quantité_standard: "2 cuillères (32g)",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["niacine", "magnésium"],
    index_glycémique: "faible",
    bénéfices_clés: ["protéines", "pratique"],
    interdit_si: ["allergie_arachide"]
  },
  {
    id: "aliment_58",
    nom: "Huile de coco",
    catégorie: "Lipide",
    calories: 862,
    macros: { protéines: 0, glucides: 0, lipides: 100, fibres: 0 },
    quantité_standard: "1 cuillère à soupe (15ml)",
    moment_de_consommation: ["cuisson"],
    classes_nutritionnelles: ["MCT", "saturés"],
    index_glycémique: "faible",
    bénéfices_clés: ["stabilité cuisson", "MCT"],
    interdit_si: []
  },
  {
    id: "aliment_59",
    nom: "Graines de tournesol",
    catégorie: "Lipide",
    calories: 584,
    macros: { protéines: 21, glucides: 20, lipides: 51, fibres: 9 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["vitamine E", "sélénium"],
    index_glycémique: "faible",
    bénéfices_clés: ["vitamine E", "économique"],
    interdit_si: []
  },
  {
    id: "aliment_60",
    nom: "Pistaches",
    catégorie: "Lipide",
    calories: 560,
    macros: { protéines: 20, glucides: 28, lipides: 45, fibres: 10 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["potassium", "thiamine"],
    index_glycémique: "faible",
    bénéfices_clés: ["potassium", "contrôle portions"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_61",
    nom: "Huile d'avocat",
    catégorie: "Lipide",
    calories: 884,
    macros: { protéines: 0, glucides: 0, lipides: 100, fibres: 0 },
    quantité_standard: "1 cuillère à soupe (15ml)",
    moment_de_consommation: ["cuisson", "assaisonnement"],
    classes_nutritionnelles: ["monoinsaturés", "point fumée élevé"],
    index_glycémique: "faible",
    bénéfices_clés: ["cuisson haute température", "neutre"],
    interdit_si: []
  },
  {
    id: "aliment_62",
    nom: "Graines de courge",
    catégorie: "Lipide",
    calories: 559,
    macros: { protéines: 19, glucides: 54, lipides: 49, fibres: 6 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["zinc", "magnésium"],
    index_glycémique: "faible",
    bénéfices_clés: ["zinc", "prostate"],
    interdit_si: []
  },
  {
    id: "aliment_63",
    nom: "Noix de cajou",
    catégorie: "Lipide",
    calories: 553,
    macros: { protéines: 18, glucides: 30, lipides: 44, fibres: 3 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["cuivre", "magnésium"],
    index_glycémique: "faible",
    bénéfices_clés: ["texture crémeuse", "cuivre"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_64",
    nom: "Tahini",
    catégorie: "Lipide",
    calories: 595,
    macros: { protéines: 17, glucides: 21, lipides: 54, fibres: 9 },
    quantité_standard: "2 cuillères (32g)",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["calcium", "cuivre"],
    index_glycémique: "faible",
    bénéfices_clés: ["calcium", "versatile"],
    interdit_si: ["allergie_sésame"]
  },
  {
    id: "aliment_65",
    nom: "Graines de sésame",
    catégorie: "Lipide",
    calories: 573,
    macros: { protéines: 17, glucides: 23, lipides: 50, fibres: 12 },
    quantité_standard: "15g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["calcium", "lignanes"],
    index_glycémique: "faible",
    bénéfices_clés: ["calcium", "texture"],
    interdit_si: ["allergie_sésame"]
  },
  {
    id: "aliment_66",
    nom: "Noix de pécan",
    catégorie: "Lipide",
    calories: 691,
    macros: { protéines: 9, glucides: 14, lipides: 72, fibres: 10 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["monoinsaturés", "antioxydants"],
    index_glycémique: "faible",
    bénéfices_clés: ["antioxydants", "goût"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_67",
    nom: "Huile de lin",
    catégorie: "Lipide",
    calories: 884,
    macros: { protéines: 0, glucides: 0, lipides: 100, fibres: 0 },
    quantité_standard: "1 cuillère à soupe (15ml)",
    moment_de_consommation: ["assaisonnement"],
    classes_nutritionnelles: ["oméga-3", "ALA"],
    index_glycémique: "faible",
    bénéfices_clés: ["oméga-3 concentré", "anti-inflammatoire"],
    interdit_si: []
  },
  {
    id: "aliment_68",
    nom: "Noisettes",
    catégorie: "Lipide",
    calories: 628,
    macros: { protéines: 15, glucides: 17, lipides: 61, fibres: 10 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["vitamine E", "folates"],
    index_glycémique: "faible",
    bénéfices_clés: ["vitamine E", "goût"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_69",
    nom: "Olives vertes",
    catégorie: "Lipide",
    calories: 115,
    macros: { protéines: 0.8, glucides: 6, lipides: 11, fibres: 3 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner", "collation"],
    classes_nutritionnelles: ["monoinsaturés", "polyphénols"],
    index_glycémique: "faible",
    bénéfices_clés: ["antioxydants", "goût"],
    interdit_si: []
  },
  {
    id: "aliment_70",
    nom: "Beurre clarifié (ghee)",
    catégorie: "Lipide",
    calories: 900,
    macros: { protéines: 0, glucides: 0, lipides: 100, fibres: 0 },
    quantité_standard: "1 cuillère à soupe (15ml)",
    moment_de_consommation: ["cuisson"],
    classes_nutritionnelles: ["saturés", "vitamine A"],
    index_glycémique: "faible",
    bénéfices_clés: ["point fumée élevé", "goût"],
    interdit_si: ["intolérance_lactose_sévère"]
  },
  {
    id: "aliment_71",
    nom: "Graines de chanvre",
    catégorie: "Lipide",
    calories: 553,
    macros: { protéines: 31, glucides: 9, lipides: 49, fibres: 4 },
    quantité_standard: "30g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["protéine complète", "oméga-3"],
    index_glycémique: "faible",
    bénéfices_clés: ["protéine végétale", "oméga-3"],
    interdit_si: []
  },
  {
    id: "aliment_72",
    nom: "Noix du Brésil",
    catégorie: "Lipide",
    calories: 656,
    macros: { protéines: 14, glucides: 12, lipides: 66, fibres: 8 },
    quantité_standard: "30g (6 noix)",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["sélénium", "magnésium"],
    index_glycémique: "faible",
    bénéfices_clés: ["sélénium extrême", "thyroïde"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_73",
    nom: "Huile de sésame",
    catégorie: "Lipide",
    calories: 884,
    macros: { protéines: 0, glucides: 0, lipides: 100, fibres: 0 },
    quantité_standard: "1 cuillère à soupe (15ml)",
    moment_de_consommation: ["assaisonnement"],
    classes_nutritionnelles: ["lignanes", "vitamine K"],
    index_glycémique: "faible",
    bénéfices_clés: ["goût asiatique", "antioxydants"],
    interdit_si: ["allergie_sésame"]
  },
  {
    id: "aliment_74",
    nom: "Macadamia",
    catégorie: "Lipide",
    calories: 718,
    macros: { protéines: 8, glucides: 14, lipides: 76, fibres: 9 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["monoinsaturés", "thiamine"],
    index_glycémique: "faible",
    bénéfices_clés: ["texture fondante", "bon ratio"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_75",
    nom: "Pignons de pin",
    catégorie: "Lipide",
    calories: 673,
    macros: { protéines: 14, glucides: 13, lipides: 68, fibres: 4 },
    quantité_standard: "30g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine K", "magnésium"],
    index_glycémique: "faible",
    bénéfices_clés: ["goût délicat", "cuisine"],
    interdit_si: ["allergie_fruits_à_coque"]
  },

  // MICRONUTRIMENTS (25 aliments)
  {
    id: "aliment_76",
    nom: "Épinards frais",
    catégorie: "Micronutriments",
    calories: 23,
    macros: { protéines: 2.9, glucides: 3.6, lipides: 0.4, fibres: 2.2 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["fer", "folates", "vitamine K"],
    index_glycémique: "faible",
    bénéfices_clés: ["fer", "folates"],
    interdit_si: []
  },
  {
    id: "aliment_77",
    nom: "Brocoli",
    catégorie: "Micronutriments",
    calories: 34,
    macros: { protéines: 2.8, glucides: 7, lipides: 0.4, fibres: 2.6 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine C", "sulforaphane"],
    index_glycémique: "faible",
    bénéfices_clés: ["antioxydants", "détox"],
    interdit_si: []
  },
  {
    id: "aliment_78",
    nom: "Chou kale",
    catégorie: "Micronutriments",
    calories: 35,
    macros: { protéines: 2.9, glucides: 4.4, lipides: 1.5, fibres: 4.1 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine K", "calcium"],
    index_glycémique: "faible",
    bénéfices_clés: ["superaliment", "calcium"],
    interdit_si: []
  },
  {
    id: "aliment_79",
    nom: "Myrtilles",
    catégorie: "Micronutriments",
    calories: 57,
    macros: { protéines: 0.7, glucides: 14, lipides: 0.3, fibres: 2.4 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["anthocyanes", "vitamine C"],
    index_glycémique: "faible",
    bénéfices_clés: ["mémoire", "antioxydants"],
    interdit_si: []
  },
  {
    id: "aliment_80",
    nom: "Carotte",
    catégorie: "Micronutriments",
    calories: 41,
    macros: { protéines: 0.9, glucides: 10, lipides: 0.2, fibres: 2.8 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner", "collation"],
    classes_nutritionnelles: ["bêta-carotène", "fibres"],
    index_glycémique: "modéré",
    bénéfices_clés: ["vitamine A", "vision"],
    interdit_si: []
  },
  {
    id: "aliment_81",
    nom: "Poivron rouge",
    catégorie: "Micronutriments",
    calories: 31,
    macros: { protéines: 1, glucides: 7, lipides: 0.3, fibres: 2.5 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine C", "capsaïcine"],
    index_glycémique: "faible",
    bénéfices_clés: ["vitamine C extrême", "anti-inflammatoire"],
    interdit_si: []
  },
  {
    id: "aliment_82",
    nom: "Tomates cerises",
    catégorie: "Micronutriments",
    calories: 18,
    macros: { protéines: 0.9, glucides: 3.9, lipides: 0.2, fibres: 1.2 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner", "collation"],
    classes_nutritionnelles: ["lycopène", "potassium"],
    index_glycémique: "faible",
    bénéfices_clés: ["lycopène", "hydratation"],
    interdit_si: []
  },
  {
    id: "aliment_83",
    nom: "Concombre",
    catégorie: "Micronutriments",
    calories: 16,
    macros: { protéines: 0.7, glucides: 4, lipides: 0.1, fibres: 0.5 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner", "collation"],
    classes_nutritionnelles: ["hydratation", "silice"],
    index_glycémique: "faible",
    bénéfices_clés: ["hydratation", "rafraîchissant"],
    interdit_si: []
  },
  {
    id: "aliment_84",
    nom: "Betterave",
    catégorie: "Micronutriments",
    calories: 43,
    macros: { protéines: 1.6, glucides: 10, lipides: 0.2, fibres: 2.8 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["nitrates", "folates"],
    index_glycémique: "modéré",
    bénéfices_clés: ["performance", "circulation"],
    interdit_si: []
  },
  {
    id: "aliment_85",
    nom: "Courgette",
    catégorie: "Micronutriments",
    calories: 17,
    macros: { protéines: 1.2, glucides: 3.1, lipides: 0.3, fibres: 1 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["potassium", "manganèse"],
    index_glycémique: "faible",
    bénéfices_clés: ["versatile", "faible calorie"],
    interdit_si: []
  },
  {
    id: "aliment_86",
    nom: "Chou rouge",
    catégorie: "Micronutriments",
    calories: 31,
    macros: { protéines: 1.4, glucides: 7, lipides: 0.2, fibres: 2.1 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["anthocyanes", "vitamine C"],
    index_glycémique: "faible",
    bénéfices_clés: ["antioxydants", "couleur"],
    interdit_si: []
  },
  {
    id: "aliment_87",
    nom: "Asperges",
    catégorie: "Micronutriments",
    calories: 20,
    macros: { protéines: 2.2, glucides: 3.9, lipides: 0.1, fibres: 2.1 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["folates", "glutathion"],
    index_glycémique: "faible",
    bénéfices_clés: ["détox", "folates"],
    interdit_si: []
  },
  {
    id: "aliment_88",
    nom: "Champignons de Paris",
    catégorie: "Micronutriments",
    calories: 22,
    macros: { protéines: 3.1, glucides: 3.3, lipides: 0.3, fibres: 1 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["sélénium", "potassium"],
    index_glycémique: "faible",
    bénéfices_clés: ["umami", "sélénium"],
    interdit_si: []
  },
  {
    id: "aliment_89",
    nom: "Radis",
    catégorie: "Micronutriments",
    calories: 16,
    macros: { protéines: 0.7, glucides: 3.4, lipides: 0.1, fibres: 1.6 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner", "collation"],
    classes_nutritionnelles: ["vitamine C", "isothiocyanates"],
    index_glycémique: "faible",
    bénéfices_clés: ["détox", "croquant"],
    interdit_si: []
  },
  {
    id: "aliment_90",
    nom: "Chou-fleur",
    catégorie: "Micronutriments",
    calories: 25,
    macros: { protéines: 1.9, glucides: 5, lipides: 0.3, fibres: 2 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine C", "choline"],
    index_glycémique: "faible",
    bénéfices_clés: ["versatile", "substitut"],
    interdit_si: []
  },
  {
    id: "aliment_91",
    nom: "Avocat mariné",
    catégorie: "Micronutriments",
    calories: 35,
    macros: { protéines: 2, glucides: 6, lipides: 0.2, fibres: 3 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["probiotiques", "vitamine K"],
    index_glycémique: "faible",
    bénéfices_clés: ["probiotiques", "digestion"],
    interdit_si: []
  },
  {
    id: "aliment_92",
    nom: "Persil frais",
    catégorie: "Micronutriments",
    calories: 36,
    macros: { protéines: 3, glucides: 6, lipides: 0.8, fibres: 3.3 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine K", "fer"],
    index_glycémique: "faible",
    bénéfices_clés: ["vitamines concentrées", "haleine"],
    interdit_si: []
  },
  {
    id: "aliment_93",
    nom: "Roquette",
    catégorie: "Micronutriments",
    calories: 25,
    macros: { protéines: 2.6, glucides: 3.7, lipides: 0.7, fibres: 1.6 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine K", "nitrates"],
    index_glycémique: "faible",
    bénéfices_clés: ["goût piquant", "nitrates"],
    interdit_si: []
  },
  {
    id: "aliment_94",
    nom: "Endives",
    catégorie: "Micronutriments",
    calories: 17,
    macros: { protéines: 0.9, glucides: 4, lipides: 0.1, fibres: 3.1 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["fibres", "vitamine K"],
    index_glycémique: "faible",
    bénéfices_clés: ["fibres", "croquant"],
    interdit_si: []
  },
  {
    id: "aliment_95",
    nom: "Algues nori",
    catégorie: "Micronutriments",
    calories: 35,
    macros: { protéines: 6, glucides: 5, lipides: 0.3, fibres: 0.3 },
    quantité_standard: "10g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["iode", "vitamine B12"],
    index_glycémique: "faible",
    bénéfices_clés: ["iode", "B12 végétale"],
    interdit_si: ["allergie_algues"]
  },
  {
    id: "aliment_96",
    nom: "Pousses de tournesol",
    catégorie: "Micronutriments",
    calories: 23,
    macros: { protéines: 2.3, glucides: 4.4, lipides: 0.4, fibres: 1.1 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine E", "folates"],
    index_glycémique: "faible",
    bénéfices_clés: ["vitamines concentrées", "texture"],
    interdit_si: []
  },
  {
    id: "aliment_97",
    nom: "Germes de luzerne",
    catégorie: "Micronutriments",
    calories: 23,
    macros: { protéines: 4, glucides: 2.1, lipides: 0.7, fibres: 1.9 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine K", "saponines"],
    index_glycémique: "faible",
    bénéfices_clés: ["enzymes", "fraîcheur"],
    interdit_si: []
  },
  {
    id: "aliment_98",
    nom: "Pousses de brocoli",
    catégorie: "Micronutriments",
    calories: 28,
    macros: { protéines: 3.5, glucides: 5.2, lipides: 0.5, fibres: 1.5 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["sulforaphane", "vitamine C"],
    index_glycémique: "faible",
    bénéfices_clés: ["sulforaphane concentré", "anticancer"],
    interdit_si: []
  },
  {
    id: "aliment_99",
    nom: "Fenouil",
    catégorie: "Micronutriments",
    calories: 31,
    macros: { protéines: 1.2, glucides: 7, lipides: 0.2, fibres: 3.1 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["anéthol", "potassium"],
    index_glycémique: "faible",
    bénéfices_clés: ["digestion", "goût anisé"],
    interdit_si: []
  },
  {
    id: "aliment_100",
    nom: "Cresson",
    catégorie: "Micronutriments",
    calories: 11,
    macros: { protéines: 2.3, glucides: 1.3, lipides: 0.1, fibres: 0.5 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine K", "isothiocyanates"],
    index_glycémique: "faible",
    bénéfices_clés: ["densité nutritionnelle", "goût piquant"],
    interdit_si: []
  },
  // NOUVEAUX ALIMENTS (101-120)
  {
    id: "aliment_101",
    nom: "Quinoa rouge",
    catégorie: "Glucide",
    calories: 368,
    macros: { protéines: 14, glucides: 64, lipides: 6, fibres: 7 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine complète", "sans gluten"],
    index_glycémique: "faible",
    bénéfices_clés: ["énergie durable", "minéraux"],
    interdit_si: []
  },
  {
    id: "aliment_102",
    nom: "Tempeh",
    catégorie: "Protéine",
    calories: 192,
    macros: { protéines: 20, glucides: 8, lipides: 11, fibres: 9 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine végétale", "probiotiques"],
    index_glycémique: "faible",
    bénéfices_clés: ["digestion", "végétarien"],
    interdit_si: ["allergie_soja"]
  },
  {
    id: "aliment_103",
    nom: "Spiruline",
    catégorie: "Micronutriments",
    calories: 290,
    macros: { protéines: 57, glucides: 24, lipides: 8, fibres: 3 },
    quantité_standard: "10g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["vitamine B12", "fer", "antioxydants"],
    index_glycémique: "faible",
    bénéfices_clés: ["énergie", "détox"],
    interdit_si: []
  },
  {
    id: "aliment_104",
    nom: "Graines de chanvre",
    catégorie: "Mixte",
    calories: 553,
    macros: { protéines: 31, glucides: 9, lipides: 49, fibres: 4 },
    quantité_standard: "30g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["oméga-3", "protéine complète"],
    index_glycémique: "faible",
    bénéfices_clés: ["santé cardiovasculaire", "satiété"],
    interdit_si: []
  },
  {
    id: "aliment_105",
    nom: "Chou kale",
    catégorie: "Micronutriments",
    calories: 49,
    macros: { protéines: 4.3, glucides: 8.8, lipides: 0.9, fibres: 3.6 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine K", "vitamine C", "calcium"],
    index_glycémique: "faible",
    bénéfices_clés: ["antioxydants", "santé osseuse"],
    interdit_si: []
  },
  {
    id: "aliment_106",
    nom: "Miso",
    catégorie: "Protéine",
    calories: 199,
    macros: { protéines: 12, glucides: 26, lipides: 6, fibres: 5 },
    quantité_standard: "30g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["probiotiques", "fermentation"],
    index_glycémique: "faible",
    bénéfices_clés: ["digestion", "immunité"],
    interdit_si: ["allergie_soja"]
  },
  {
    id: "aliment_107",
    nom: "Noix du Brésil",
    catégorie: "Lipide",
    calories: 659,
    macros: { protéines: 14, glucides: 12, lipides: 67, fibres: 8 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["sélénium", "magnésium"],
    index_glycémique: "faible",
    bénéfices_clés: ["antioxydants", "santé thyroïdienne"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_108",
    nom: "Patate douce violette",
    catégorie: "Glucide",
    calories: 86,
    macros: { protéines: 1.6, glucides: 20, lipides: 0.1, fibres: 3 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["anthocyanes", "vitamine A"],
    index_glycémique: "moyen",
    bénéfices_clés: ["antioxydants", "santé oculaire"],
    interdit_si: []
  },
  {
    id: "aliment_109",
    nom: "Kéfir",
    catégorie: "Mixte",
    calories: 41,
    macros: { protéines: 3.3, glucides: 4.5, lipides: 1, fibres: 0 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["probiotiques", "calcium"],
    index_glycémique: "faible",
    bénéfices_clés: ["digestion", "immunité"],
    interdit_si: ["intolérance_lactose"]
  },
  {
    id: "aliment_110",
    nom: "Graines de courge",
    catégorie: "Mixte",
    calories: 559,
    macros: { protéines: 30, glucides: 11, lipides: 49, fibres: 6 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["magnésium", "zinc", "oméga-3"],
    index_glycémique: "faible",
    bénéfices_clés: ["santé masculine", "satiété"],
    interdit_si: []
  },
  {
    id: "aliment_111",
    nom: "Champignons shiitake",
    catégorie: "Micronutriments",
    calories: 34,
    macros: { protéines: 2.2, glucides: 7, lipides: 0.2, fibres: 2.5 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine D", "bêta-glucanes"],
    index_glycémique: "faible",
    bénéfices_clés: ["immunité", "santé cardiovasculaire"],
    interdit_si: []
  },
  {
    id: "aliment_112",
    nom: "Açaí",
    catégorie: "Micronutriments",
    calories: 70,
    macros: { protéines: 1, glucides: 16, lipides: 0.5, fibres: 2 },
    quantité_standard: "100g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["anthocyanes", "antioxydants"],
    index_glycémique: "faible",
    bénéfices_clés: ["anti-âge", "énergie"],
    interdit_si: []
  },
  {
    id: "aliment_113",
    nom: "Lentilles corail",
    catégorie: "Protéine",
    calories: 353,
    macros: { protéines: 24, glucides: 60, lipides: 2, fibres: 11 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine végétale", "fer", "folate"],
    index_glycémique: "faible",
    bénéfices_clés: ["énergie durable", "santé cardiovasculaire"],
    interdit_si: []
  },
  {
    id: "aliment_114",
    nom: "Huile de coco vierge",
    catégorie: "Lipide",
    calories: 862,
    macros: { protéines: 0, glucides: 0, lipides: 100, fibres: 0 },
    quantité_standard: "15ml",
    moment_de_consommation: ["petit-déjeuner", "cuisson"],
    classes_nutritionnelles: ["TCM", "acide laurique"],
    index_glycémique: "faible",
    bénéfices_clés: ["énergie rapide", "satiété"],
    interdit_si: []
  },
  {
    id: "aliment_115",
    nom: "Épinards baby",
    catégorie: "Micronutriments",
    calories: 23,
    macros: { protéines: 2.9, glucides: 3.6, lipides: 0.4, fibres: 2.2 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine K", "folate", "fer"],
    index_glycémique: "faible",
    bénéfices_clés: ["santé osseuse", "énergie"],
    interdit_si: []
  },
  {
    id: "aliment_116",
    nom: "Graines de lin",
    catégorie: "Lipide",
    calories: 534,
    macros: { protéines: 18, glucides: 29, lipides: 42, fibres: 28 },
    quantité_standard: "30g",
    moment_de_consommation: ["petit-déjeuner", "collation"],
    classes_nutritionnelles: ["oméga-3", "lignanes"],
    index_glycémique: "faible",
    bénéfices_clés: ["santé hormonale", "digestion"],
    interdit_si: []
  },
  {
    id: "aliment_117",
    nom: "Chou-fleur",
    catégorie: "Micronutriments",
    calories: 25,
    macros: { protéines: 1.9, glucides: 5, lipides: 0.3, fibres: 2 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["vitamine C", "sulforaphane"],
    index_glycémique: "faible",
    bénéfices_clés: ["détox", "santé cellulaire"],
    interdit_si: []
  },
  {
    id: "aliment_118",
    nom: "Noix de cajou",
    catégorie: "Lipide",
    calories: 553,
    macros: { protéines: 18, glucides: 30, lipides: 44, fibres: 3 },
    quantité_standard: "30g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["magnésium", "zinc", "cuivre"],
    index_glycémique: "faible",
    bénéfices_clés: ["santé cardiovasculaire", "satiété"],
    interdit_si: ["allergie_fruits_à_coque"]
  },
  {
    id: "aliment_119",
    nom: "Grenade",
    catégorie: "Micronutriments",
    calories: 83,
    macros: { protéines: 1.7, glucides: 19, lipides: 1.2, fibres: 4 },
    quantité_standard: "100g",
    moment_de_consommation: ["collation"],
    classes_nutritionnelles: ["ellagitanins", "vitamine C"],
    index_glycémique: "faible",
    bénéfices_clés: ["antioxydants", "santé cardiovasculaire"],
    interdit_si: []
  },
  {
    id: "aliment_120",
    nom: "Tofu ferme",
    catégorie: "Protéine",
    calories: 144,
    macros: { protéines: 15, glucides: 4, lipides: 8, fibres: 2 },
    quantité_standard: "100g",
    moment_de_consommation: ["déjeuner", "dîner"],
    classes_nutritionnelles: ["protéine végétale", "isoflavones"],
    index_glycémique: "faible",
    bénéfices_clés: ["santé hormonale", "végétarien"],
    interdit_si: ["allergie_soja"]
  },
  {
    id: "aliment_120",
    nom: "Smoothie détox vert",
    type_de_repas: "collation",
    objectif_nutritionnel: ["détox", "vitamines", "hydratation"],
    calories_totales: 180,
    macros: { protéines: 6, glucides: 30, lipides: 6, fibres: 6 },
    composition: [
      { aliment: "Épinards baby", quantité: "50g", préparation: "mixés" },
      { aliment: "Chou kale", quantité: "30g", préparation: "mixé" },
      { aliment: "Pomme verte", quantité: "1 moyenne", préparation: "mixée" },
      { aliment: "Citron", quantité: "1/2", préparation: "jus" },
      { aliment: "Eau de coco", quantité: "200ml", préparation: "mixée" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 5,
    adaptations_possibles: ["autres légumes verts", "gingembre"],
    contre_indications: []
  },
  // NOUVEAUX REPAS (121-140)
  {
    id: "repas_121",
    nom: "Hummus aux pois chiches",
    type_de_repas: "collation",
    objectif_nutritionnel: ["protéines végétales", "fibres", "satiété"],
    calories_totales: 280,
    macros: { protéines: 12, glucides: 25, lipides: 15, fibres: 8 },
    composition: [
      { aliment: "Pois chiches", quantité: "100g", préparation: "mixés" },
      { aliment: "Tahini", quantité: "20g", préparation: "mélangé" },
      { aliment: "Citron", quantité: "1/2", préparation: "jus" },
      { aliment: "Ail", quantité: "2 gousses", préparation: "écrasé" },
      { aliment: "Huile d'olive", quantité: "10ml", préparation: "mélangée" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 10,
    adaptations_possibles: ["épices", "herbes fraîches"],
    contre_indications: ["allergie_sésame"]
  },
  {
    id: "repas_122",
    nom: "Salade de brocoli et noix",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["vitamines", "antioxydants", "satiété"],
    calories_totales: 320,
    macros: { protéines: 15, glucides: 20, lipides: 22, fibres: 8 },
    composition: [
      { aliment: "Brocoli", quantité: "150g", préparation: "cuit à la vapeur" },
      { aliment: "Noix de Grenoble", quantité: "25g", préparation: "concassées" },
      { aliment: "Graines de sésame", quantité: "10g", préparation: "séchées" },
      { aliment: "Vinaigrette citron", quantité: "20ml", préparation: "mélangée" },
      { aliment: "Roquette", quantité: "30g", préparation: "fraîche" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 15,
    adaptations_possibles: ["autres noix", "herbes fraîches"],
    contre_indications: ["allergie_fruits_à_coque", "allergie_sésame"]
  },
  {
    id: "repas_123",
    nom: "Smoothie aux graines de chia",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["oméga-3", "fibres", "satiété"],
    calories_totales: 350,
    macros: { protéines: 15, glucides: 45, lipides: 18, fibres: 12 },
    composition: [
      { aliment: "Graines de chia noires", quantité: "20g", préparation: "trempées" },
      { aliment: "Banane", quantité: "1 moyenne", préparation: "mixée" },
      { aliment: "Framboises", quantité: "80g", préparation: "mixées" },
      { aliment: "Lait d'amande", quantité: "250ml", préparation: "mixé" },
      { aliment: "Miel", quantité: "15g", préparation: "mélangé" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres fruits", "cannelle"],
    contre_indications: []
  },
  {
    id: "repas_124",
    nom: "Risotto aux champignons de Paris",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["réconfort", "umami", "satiété"],
    calories_totales: 420,
    macros: { protéines: 12, glucides: 60, lipides: 15, fibres: 4 },
    composition: [
      { aliment: "Riz arborio", quantité: "70g", préparation: "cuit" },
      { aliment: "Champignons de Paris", quantité: "120g", préparation: "sautés" },
      { aliment: "Bouillon végétal", quantité: "300ml", préparation: "chaud" },
      { aliment: "Parmesan", quantité: "15g", préparation: "râpé" },
      { aliment: "Huile d'olive", quantité: "15ml", préparation: "ajoutée en fin" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 25,
    adaptations_possibles: ["herbes fraîches", "autres champignons"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_125",
    nom: "Salade de radis et betterave",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["détox", "antioxydants", "couleur"],
    calories_totales: 180,
    macros: { protéines: 6, glucides: 25, lipides: 8, fibres: 6 },
    composition: [
      { aliment: "Radis", quantité: "100g", préparation: "en rondelles" },
      { aliment: "Betterave", quantité: "80g", préparation: "cuite et coupée" },
      { aliment: "Vinaigrette citron", quantité: "15ml", préparation: "mélangée" },
      { aliment: "Persil", quantité: "10g", préparation: "haché" },
      { aliment: "Noix de Grenoble", quantité: "10g", préparation: "concassées" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 12,
    adaptations_possibles: ["autres légumes", "herbes fraîches"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_126",
    nom: "Granola aux graines variées",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["énergie durable", "fibres", "plaisir"],
    calories_totales: 480,
    macros: { protéines: 15, glucides: 50, lipides: 28, fibres: 10 },
    composition: [
      { aliment: "Avoine complète", quantité: "60g", préparation: "mélangée" },
      { aliment: "Graines de tournesol", quantité: "15g", préparation: "mélangées" },
      { aliment: "Graines de pavot", quantité: "10g", préparation: "mélangées" },
      { aliment: "Noix de pécan", quantité: "20g", préparation: "concassées" },
      { aliment: "Huile de coco", quantité: "20ml", préparation: "mélangée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 25,
    adaptations_possibles: ["autres noix", "cannelle"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_127",
    nom: "Courgettes farcies aux légumes",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["légumes", "légèreté", "satiété"],
    calories_totales: 280,
    macros: { protéines: 12, glucides: 25, lipides: 15, fibres: 8 },
    composition: [
      { aliment: "Courgette", quantité: "200g", préparation: "évidée" },
      { aliment: "Champignons de Paris", quantité: "80g", préparation: "sautés" },
      { aliment: "Tomates", quantité: "60g", préparation: "concassées" },
      { aliment: "Basilic", quantité: "10g", préparation: "haché" },
      { aliment: "Huile d'olive", quantité: "15ml", préparation: "mélangée" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 30,
    adaptations_possibles: ["autres légumes", "herbes fraîches"],
    contre_indications: []
  },
  {
    id: "repas_128",
    nom: "Smoothie aux noix de macadamia",
    type_de_repas: "collation",
    objectif_nutritionnel: ["graisses saines", "satiété", "plaisir"],
    calories_totales: 320,
    macros: { protéines: 8, glucides: 25, lipides: 22, fibres: 5 },
    composition: [
      { aliment: "Noix de macadamia", quantité: "25g", préparation: "mixées" },
      { aliment: "Banane", quantité: "1 moyenne", préparation: "mixée" },
      { aliment: "Lait de coco", quantité: "200ml", préparation: "mixé" },
      { aliment: "Cacao en poudre", quantité: "10g", préparation: "mixé" },
      { aliment: "Miel", quantité: "15g", préparation: "mélangé" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres noix", "vanille"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_129",
    nom: "Asperges grillées aux graines",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["détox", "minéraux", "légèreté"],
    calories_totales: 220,
    macros: { protéines: 12, glucides: 15, lipides: 15, fibres: 6 },
    composition: [
      { aliment: "Asperges", quantité: "150g", préparation: "grillées" },
      { aliment: "Graines de citrouille", quantité: "20g", préparation: "séchées" },
      { aliment: "Huile d'olive", quantité: "15ml", préparation: "mélangée" },
      { aliment: "Citron", quantité: "1/2", préparation: "jus" },
      { aliment: "Persil", quantité: "10g", préparation: "haché" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 15,
    adaptations_possibles: ["autres graines", "herbes fraîches"],
    contre_indications: []
  },
  {
    id: "repas_130",
    nom: "Bowl d'aubergine et légumes",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["antioxydants", "légumes", "satiété"],
    calories_totales: 350,
    macros: { protéines: 15, glucides: 35, lipides: 20, fibres: 12 },
    composition: [
      { aliment: "Aubergine", quantité: "150g", préparation: "grillée" },
      { aliment: "Tomates", quantité: "100g", préparation: "concassées" },
      { aliment: "Champignons de Paris", quantité: "80g", préparation: "sautés" },
      { aliment: "Basilic", quantité: "15g", préparation: "haché" },
      { aliment: "Huile d'olive", quantité: "20ml", préparation: "mélangée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 25,
    adaptations_possibles: ["autres légumes", "herbes fraîches"],
    contre_indications: []
  },
  {
    id: "repas_131",
    nom: "Smoothie vert aux épinards",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["vitamines", "détox", "énergie"],
    calories_totales: 250,
    macros: { protéines: 10, glucides: 40, lipides: 8, fibres: 8 },
    composition: [
      { aliment: "Épinards baby", quantité: "60g", préparation: "mixés" },
      { aliment: "Pomme verte", quantité: "1 moyenne", préparation: "mixée" },
      { aliment: "Kiwi", quantité: "1 moyen", préparation: "mixé" },
      { aliment: "Citron", quantité: "1/2", préparation: "jus" },
      { aliment: "Eau de coco", quantité: "200ml", préparation: "mixée" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 6,
    adaptations_possibles: ["autres légumes verts", "gingembre"],
    contre_indications: []
  },
  {
    id: "repas_132",
    nom: "Salade de chou de Bruxelles",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["vitamines", "antioxydants", "satiété"],
    calories_totales: 280,
    macros: { protéines: 12, glucides: 20, lipides: 18, fibres: 8 },
    composition: [
      { aliment: "Chou de Bruxelles", quantité: "150g", préparation: "rôti" },
      { aliment: "Noix de cajou crues", quantité: "20g", préparation: "concassées" },
      { aliment: "Vinaigrette balsamique", quantité: "20ml", préparation: "mélangée" },
      { aliment: "Cranberries", quantité: "20g", préparation: "séchées" },
      { aliment: "Persil", quantité: "10g", préparation: "haché" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 20,
    adaptations_possibles: ["autres noix", "herbes fraîches"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_133",
    nom: "Bowl de haricots verts et légumes",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["légumes", "fibres", "légèreté"],
    calories_totales: 240,
    macros: { protéines: 10, glucides: 25, lipides: 12, fibres: 8 },
    composition: [
      { aliment: "Haricots verts", quantité: "120g", préparation: "cuits à la vapeur" },
      { aliment: "Tomates cerises", quantité: "80g", préparation: "coupées" },
      { aliment: "Concombre", quantité: "60g", préparation: "en rondelles" },
      { aliment: "Vinaigrette citron", quantité: "15ml", préparation: "mélangée" },
      { aliment: "Menthe", quantité: "10g", préparation: "hachée" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 15,
    adaptations_possibles: ["autres légumes", "herbes fraîches"],
    contre_indications: []
  },
  {
    id: "repas_134",
    nom: "Smoothie aux noix de Grenoble",
    type_de_repas: "collation",
    objectif_nutritionnel: ["oméga-3", "santé cérébrale", "satiété"],
    calories_totales: 380,
    macros: { protéines: 12, glucides: 35, lipides: 25, fibres: 6 },
    composition: [
      { aliment: "Noix de Grenoble", quantité: "30g", préparation: "mixées" },
      { aliment: "Banane", quantité: "1 moyenne", préparation: "mixée" },
      { aliment: "Myrtilles", quantité: "60g", préparation: "mixées" },
      { aliment: "Lait d'amande", quantité: "250ml", préparation: "mixé" },
      { aliment: "Cannelle", quantité: "2g", préparation: "mélangée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres fruits", "cacao"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_135",
    nom: "Salade de betterave et noix",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["antioxydants", "performance", "couleur"],
    calories_totales: 320,
    macros: { protéines: 12, glucides: 30, lipides: 20, fibres: 8 },
    composition: [
      { aliment: "Betterave", quantité: "120g", préparation: "cuite et coupée" },
      { aliment: "Noix de Grenoble", quantité: "25g", préparation: "concassées" },
      { aliment: "Roquette", quantité: "50g", préparation: "fraîche" },
      { aliment: "Vinaigrette balsamique", quantité: "20ml", préparation: "mélangée" },
      { aliment: "Chèvre frais", quantité: "30g", préparation: "émietté" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 15,
    adaptations_possibles: ["autres noix", "herbes fraîches"],
    contre_indications: ["allergie_fruits_à_coque", "intolérance_lactose"]
  },
  {
    id: "repas_136",
    nom: "Bowl de noix de coco râpée",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["énergie", "graisses saines", "exotisme"],
    calories_totales: 420,
    macros: { protéines: 8, glucides: 35, lipides: 30, fibres: 8 },
    composition: [
      { aliment: "Noix de coco râpée", quantité: "40g", préparation: "séchée" },
      { aliment: "Avoine complète", quantité: "50g", préparation: "mélangée" },
      { aliment: "Mangue", quantité: "80g", préparation: "coupée" },
      { aliment: "Lait de coco", quantité: "150ml", préparation: "mélangé" },
      { aliment: "Miel", quantité: "20g", préparation: "mélangé" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 10,
    adaptations_possibles: ["autres fruits tropicaux", "cannelle"],
    contre_indications: []
  },
  {
    id: "repas_137",
    nom: "Smoothie aux graines de pavot",
    type_de_repas: "collation",
    objectif_nutritionnel: ["minéraux", "satiété", "originalité"],
    calories_totales: 280,
    macros: { protéines: 10, glucides: 35, lipides: 12, fibres: 8 },
    composition: [
      { aliment: "Graines de pavot", quantité: "15g", préparation: "mixées" },
      { aliment: "Yaourt grec nature", quantité: "150g", préparation: "mixé" },
      { aliment: "Pomme", quantité: "1 moyenne", préparation: "mixée" },
      { aliment: "Cannelle", quantité: "2g", préparation: "mélangée" },
      { aliment: "Miel", quantité: "15g", préparation: "mélangé" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres fruits", "vanille"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_138",
    nom: "Salade de courgette et légumes",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["légumes", "hydratation", "légèreté"],
    calories_totales: 200,
    macros: { protéines: 8, glucides: 20, lipides: 12, fibres: 6 },
    composition: [
      { aliment: "Courgette", quantité: "150g", préparation: "en spirales" },
      { aliment: "Tomates cerises", quantité: "80g", préparation: "coupées" },
      { aliment: "Concombre", quantité: "60g", préparation: "en rondelles" },
      { aliment: "Vinaigrette citron", quantité: "15ml", préparation: "mélangée" },
      { aliment: "Basilic", quantité: "10g", préparation: "haché" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 12,
    adaptations_possibles: ["autres légumes", "herbes fraîches"],
    contre_indications: []
  },
  {
    id: "repas_139",
    nom: "Bowl de noix de cajou crues",
    type_de_repas: "collation",
    objectif_nutritionnel: ["graisses saines", "minéraux", "satiété"],
    calories_totales: 350,
    macros: { protéines: 12, glucides: 25, lipides: 28, fibres: 4 },
    composition: [
      { aliment: "Noix de cajou crues", quantité: "40g", préparation: "concassées" },
      { aliment: "Dattes", quantité: "30g", préparation: "dénoyautées" },
      { aliment: "Cacao en poudre", quantité: "10g", préparation: "mélangé" },
      { aliment: "Huile de coco", quantité: "10ml", préparation: "mélangée" },
      { aliment: "Cannelle", quantité: "2g", préparation: "mélangée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 10,
    adaptations_possibles: ["autres noix", "vanille"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_140",
    nom: "Smoothie aux graines de tournesol",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["vitamine E", "antioxydants", "énergie"],
    calories_totales: 320,
    macros: { protéines: 12, glucides: 40, lipides: 15, fibres: 6 },
    composition: [
      { aliment: "Graines de tournesol", quantité: "20g", préparation: "mixées" },
      { aliment: "Banane", quantité: "1 moyenne", préparation: "mixée" },
      { aliment: "Framboises", quantité: "60g", préparation: "mixées" },
      { aliment: "Lait d'amande", quantité: "250ml", préparation: "mixé" },
      { aliment: "Miel", quantité: "15g", préparation: "mélangé" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres fruits", "cannelle"],
    contre_indications: []
  }
];

// Base de données de repas prédéfinis (100 repas)
export const repasPredefinis: RepasBlock[] = [
  // PETIT-DÉJEUNERS (20 repas)
  {
    id: "repas_1",
    nom: "Bowl d'avoine protéiné",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["énergie durable", "satiété", "récupération"],
    calories_totales: 480,
    macros: { protéines: 25, glucides: 65, lipides: 12, fibres: 8 },
    composition: [
      { aliment: "Avoine complète", quantité: "60g", préparation: "cuite à l'eau" },
      { aliment: "Protéine de pois", quantité: "20g", préparation: "mélangée" },
      { aliment: "Myrtilles", quantité: "80g", préparation: "fraîches" },
      { aliment: "Amandes", quantité: "15g", préparation: "concassées" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 8,
    adaptations_possibles: ["sans protéine en poudre", "autres fruits rouges"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_2",
    nom: "Smoothie vert énergisant",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["détox", "vitamines", "hydratation"],
    calories_totales: 320,
    macros: { protéines: 15, glucides: 45, lipides: 8, fibres: 12 },
    composition: [
      { aliment: "Épinards frais", quantité: "50g", préparation: "mixés" },
      { aliment: "Banane", quantité: "1 moyenne", préparation: "mixée" },
      { aliment: "Avocat", quantité: "30g", préparation: "mixé" },
      { aliment: "Graines de chia", quantité: "10g", préparation: "mixées" },
      { aliment: "Yaourt grec nature", quantité: "100g", préparation: "mixé" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 5,
    adaptations_possibles: ["autres légumes verts", "protéine végétale"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_3",
    nom: "Toast avocat saumon",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["oméga-3", "protéines", "satisfaction"],
    calories_totales: 420,
    macros: { protéines: 28, glucides: 32, lipides: 20, fibres: 8 },
    composition: [
      { aliment: "Pain complet", quantité: "60g", préparation: "grillé" },
      { aliment: "Avocat", quantité: "80g", préparation: "écrasé" },
      { aliment: "Saumon atlantique", quantité: "60g", préparation: "fumé" },
      { aliment: "Roquette", quantité: "20g", préparation: "fraîche" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 6,
    adaptations_possibles: ["sans gluten avec pain adapté", "autres poissons"],
    contre_indications: ["allergie_poisson", "maladie_cœliaque"]
  },
  {
    id: "repas_4",
    nom: "Chia pudding tropical",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["oméga-3", "préparation avancée", "exotique"],
    calories_totales: 350,
    macros: { protéines: 12, glucides: 38, lipides: 18, fibres: 15 },
    composition: [
      { aliment: "Graines de chia", quantité: "25g", préparation: "trempées 4h" },
      { aliment: "Mangue", quantité: "100g", préparation: "coupée" },
      { aliment: "Yaourt grec nature", quantité: "80g", préparation: "mélangé" },
      { aliment: "Noix de coco", quantité: "10g", préparation: "râpée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 5,
    adaptations_possibles: ["lait végétal", "autres fruits tropicaux"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_5",
    nom: "Pancakes protéinés",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["plaisir", "protéines", "weekend"],
    calories_totales: 450,
    macros: { protéines: 30, glucides: 45, lipides: 15, fibres: 6 },
    composition: [
      { aliment: "Avoine complète", quantité: "40g", préparation: "mixée en farine" },
      { aliment: "Œufs entiers", quantité: "2 moyens", préparation: "battus" },
      { aliment: "Cottage cheese", quantité: "100g", préparation: "mélangé" },
      { aliment: "Myrtilles", quantité: "60g", préparation: "garnisent" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 15,
    adaptations_possibles: ["sans œuf avec compote", "autres fruits"],
    contre_indications: ["allergie_œuf"]
  },
  {
    id: "repas_6",
    nom: "Muesli maison croquant",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["fibres", "variété textures", "praticité"],
    calories_totales: 380,
    macros: { protéines: 14, glucides: 55, lipides: 12, fibres: 9 },
    composition: [
      { aliment: "Avoine complète", quantité: "40g", préparation: "crue" },
      { aliment: "Amandes", quantité: "20g", préparation: "émincées" },
      { aliment: "Graines de tournesol", quantité: "10g", préparation: "grillées" },
      { aliment: "Pomme", quantité: "100g", préparation: "râpée" },
      { aliment: "Yaourt grec nature", quantité: "100g", préparation: "ajouté" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 5,
    adaptations_possibles: ["fruits de saison", "lait végétal"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_7",
    nom: "Bowl acaï énergie",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["antioxydants", "instagram", "vitamines"],
    calories_totales: 340,
    macros: { protéines: 8, glucides: 52, lipides: 12, fibres: 11 },
    composition: [
      { aliment: "Banane", quantité: "80g", préparation: "congelée mixée" },
      { aliment: "Myrtilles", quantité: "60g", préparation: "congelées mixées" },
      { aliment: "Granola maison", quantité: "30g", préparation: "parsemé" },
      { aliment: "Graines de chia", quantité: "8g", préparation: "saupoudrées" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres fruits rouges", "garnitures variées"],
    contre_indications: []
  },
  {
    id: "repas_8",
    nom: "Œufs brouillés champignons",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["protéines", "savoureux", "classique"],
    calories_totales: 360,
    macros: { protéines: 26, glucides: 28, lipides: 18, fibres: 6 },
    composition: [
      { aliment: "Œufs entiers", quantité: "3 moyens", préparation: "brouillés" },
      { aliment: "Champignons de Paris", quantité: "100g", préparation: "sautés" },
      { aliment: "Pain complet", quantité: "40g", préparation: "grillé" },
      { aliment: "Épinards frais", quantité: "30g", préparation: "sautés" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 12,
    adaptations_possibles: ["légumes de saison", "fromage ajouté"],
    contre_indications: ["allergie_œuf"]
  },
  {
    id: "repas_9",
    nom: "Quinoa bowl sucré",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["protéines complètes", "sans gluten", "original"],
    calories_totales: 410,
    macros: { protéines: 16, glucides: 62, lipides: 12, fibres: 8 },
    composition: [
      { aliment: "Quinoa cuit", quantité: "80g", préparation: "cuit à l'eau" },
      { aliment: "Banane", quantité: "80g", préparation: "tranchée" },
      { aliment: "Noix", quantité: "20g", préparation: "concassées" },
      { aliment: "Graines de lin", quantité: "8g", préparation: "moulues" },
      { aliment: "Miel", quantité: "15g", préparation: "ajouté" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 10,
    adaptations_possibles: ["sirop d'érable", "autres fruits"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_10",
    nom: "Toast beurre cacahuète",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["simplicité", "énergie", "enfance"],
    calories_totales: 390,
    macros: { protéines: 18, glucides: 35, lipides: 22, fibres: 8 },
    composition: [
      { aliment: "Pain complet", quantité: "60g", préparation: "grillé" },
      { aliment: "Beurre de cacahuète naturel", quantité: "25g", préparation: "étalé" },
      { aliment: "Banane", quantité: "80g", préparation: "tranchée" },
      { aliment: "Graines de chia", quantité: "5g", préparation: "saupoudrées" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 4,
    adaptations_possibles: ["autres beurres de noix", "pain sans gluten"],
    contre_indications: ["allergie_arachide"]
  },
  {
    id: "repas_11",
    nom: "Granola bowl protéiné",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["texture", "satisfaction", "praticité"],
    calories_totales: 420,
    macros: { protéines: 22, glucides: 48, lipides: 16, fibres: 7 },
    composition: [
      { aliment: "Granola maison", quantité: "50g", préparation: "versé" },
      { aliment: "Yaourt grec nature", quantité: "150g", préparation: "base" },
      { aliment: "Kiwi", quantité: "100g", préparation: "tranché" },
      { aliment: "Graines de tournesol", quantité: "10g", préparation: "parsemées" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 3,
    adaptations_possibles: ["granola commercial", "fruits de saison"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_12",
    nom: "Smoothie protéine chocolat",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["post-training", "chocolat", "rapide"],
    calories_totales: 380,
    macros: { protéines: 28, glucides: 42, lipides: 10, fibres: 8 },
    composition: [
      { aliment: "Banane", quantité: "120g", préparation: "congelée" },
      { aliment: "Protéine de pois", quantité: "25g", préparation: "chocolat" },
      { aliment: "Épinards frais", quantité: "30g", préparation: "mixés" },
      { aliment: "Beurre d'amande", quantité: "12g", préparation: "ajouté" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 4,
    adaptations_possibles: ["autres beurres", "cacao pur"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_13",
    nom: "Crêpe protéinée simple",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["plaisir", "simplicité", "protéines"],
    calories_totales: 340,
    macros: { protéines: 25, glucides: 28, lipides: 14, fibres: 4 },
    composition: [
      { aliment: "Œufs entiers", quantité: "2 moyens", préparation: "battus" },
      { aliment: "Avoine complète", quantité: "30g", préparation: "mixée" },
      { aliment: "Cottage cheese", quantité: "80g", préparation: "mélangé" },
      { aliment: "Cannelle", quantité: "2g", préparation: "saupoudrée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 10,
    adaptations_possibles: ["sucrant naturel", "garniture fruits"],
    contre_indications: ["allergie_œuf"]
  },
  {
    id: "repas_14",
    nom: "Porridge sarrasin",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["sans gluten", "digestion", "réconfort"],
    calories_totales: 370,
    macros: { protéines: 12, glucides: 58, lipides: 10, fibres: 7 },
    composition: [
      { aliment: "Sarrasin", quantité: "50g", préparation: "cuit" },
      { aliment: "Pomme", quantité: "100g", préparation: "râpée cuite" },
      { aliment: "Noix", quantité: "15g", préparation: "concassées" },
      { aliment: "Cannelle", quantité: "2g", préparation: "saupoudrée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 12,
    adaptations_possibles: ["autres fruits", "lait végétal"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_15",
    nom: "Bowl tempeh mariné",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["protéines végétales", "probiotiques", "salé"],
    calories_totales: 400,
    macros: { protéines: 22, glucides: 35, lipides: 20, fibres: 8 },
    composition: [
      { aliment: "Tempeh", quantité: "80g", préparation: "grillé mariné" },
      { aliment: "Quinoa cuit", quantité: "60g", préparation: "réchauffé" },
      { aliment: "Avocat", quantité: "50g", préparation: "tranché" },
      { aliment: "Tomates cerises", quantité: "80g", préparation: "coupées" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 8,
    adaptations_possibles: ["tofu à la place", "autres légumes"],
    contre_indications: ["allergie_soja"]
  },
  {
    id: "repas_16",
    nom: "Muffin protéiné myrtilles",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["praticité", "transport", "gourmandise"],
    calories_totales: 320,
    macros: { protéines: 18, glucides: 38, lipides: 12, fibres: 6 },
    composition: [
      { aliment: "Avoine complète", quantité: "40g", préparation: "farine" },
      { aliment: "Œufs entiers", quantité: "1 moyen", préparation: "battu" },
      { aliment: "Myrtilles", quantité: "60g", préparation: "incorporées" },
      { aliment: "Yaourt grec nature", quantité: "80g", préparation: "mélangé" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 25,
    adaptations_possibles: ["autres fruits", "préparation batch"],
    contre_indications: ["allergie_œuf"]
  },
  {
    id: "repas_17",
    nom: "Parfait layered",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["présentation", "textures", "équilibre"],
    calories_totales: 360,
    macros: { protéines: 16, glucides: 45, lipides: 12, fibres: 8 },
    composition: [
      { aliment: "Yaourt grec nature", quantité: "120g", préparation: "couches" },
      { aliment: "Granola maison", quantité: "35g", préparation: "couches" },
      { aliment: "Fruits rouges", quantité: "80g", préparation: "couches" },
      { aliment: "Miel", quantité: "10g", préparation: "coulé" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 5,
    adaptations_possibles: ["confiture maison", "autres fruits"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_18",
    nom: "Omelette légumes",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["légères", "vitamines", "protéines"],
    calories_totales: 320,
    macros: { protéines: 22, glucides: 18, lipides: 18, fibres: 5 },
    composition: [
      { aliment: "Œufs entiers", quantité: "3 moyens", préparation: "battus" },
      { aliment: "Courgette", quantité: "80g", préparation: "dés sautés" },
      { aliment: "Poivron rouge", quantité: "60g", préparation: "lamelles" },
      { aliment: "Épinards frais", quantité: "40g", préparation: "sautés" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 12,
    adaptations_possibles: ["fromage ajouté", "herbes fraîches"],
    contre_indications: ["allergie_œuf"]
  },
  {
    id: "repas_19",
    nom: "Smoothie vert spiruline",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["superaliment", "fer", "énergie"],
    calories_totales: 280,
    macros: { protéines: 15, glucides: 38, lipides: 8, fibres: 9 },
    composition: [
      { aliment: "Spiruline", quantité: "5g", préparation: "mixée" },
      { aliment: "Banane", quantité: "100g", préparation: "mixée" },
      { aliment: "Épinards frais", quantité: "40g", préparation: "mixés" },
      { aliment: "Graines de chia", quantité: "8g", préparation: "mixées" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 5,
    adaptations_possibles: ["autres superaliments", "édulcorant"],
    contre_indications: ["allergie_algues"]
  },
  {
    id: "repas_20",
    nom: "Ricotta toast fruits",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["douceur", "calcium", "fraîcheur"],
    calories_totales: 350,
    macros: { protéines: 16, glucides: 42, lipides: 12, fibres: 7 },
    composition: [
      { aliment: "Pain complet", quantité: "60g", préparation: "grillé" },
      { aliment: "Ricotta", quantité: "80g", préparation: "étalée" },
      { aliment: "Figues fraîches", quantité: "80g", préparation: "tranchées" },
      { aliment: "Miel", quantité: "10g", préparation: "coulé" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 5,
    adaptations_possibles: ["autres fruits", "noix ajoutées"],
    contre_indications: ["intolérance_lactose"]
  },

  // DÉJEUNERS (25 repas)
  {
    id: "repas_21",
    nom: "Bowl quinoa poulet légumes",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["équilibre complet", "satiété", "récupération"],
    calories_totales: 520,
    macros: { protéines: 35, glucides: 52, lipides: 16, fibres: 8 },
    composition: [
      { aliment: "Quinoa cuit", quantité: "100g", préparation: "pilaf" },
      { aliment: "Poulet grillé", quantité: "120g", préparation: "émincé" },
      { aliment: "Brocoli", quantité: "100g", préparation: "vapeur" },
      { aliment: "Avocat", quantité: "50g", préparation: "tranché" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "assaisonnement" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 20,
    adaptations_possibles: ["autres protéines", "légumes de saison"],
    contre_indications: ["végétarien"]
  },
  {
    id: "repas_22",
    nom: "Salade saumon avocat",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["oméga-3", "fraîcheur", "vitamines"],
    calories_totales: 480,
    macros: { protéines: 30, glucides: 18, lipides: 32, fibres: 12 },
    composition: [
      { aliment: "Saumon atlantique", quantité: "100g", préparation: "grillé" },
      { aliment: "Avocat", quantité: "100g", préparation: "cubes" },
      { aliment: "Épinards frais", quantité: "80g", préparation: "base salade" },
      { aliment: "Concombre", quantité: "100g", préparation: "tranché" },
      { aliment: "Huile d'olive extra vierge", quantité: "12ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 15,
    adaptations_possibles: ["saumon fumé", "autres légumes verts"],
    contre_indications: ["allergie_poisson"]
  },
  {
    id: "repas_23",
    nom: "Curry lentilles patate douce",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["végétarien", "fer", "réconfort"],
    calories_totales: 450,
    macros: { protéines: 18, glucides: 68, lipides: 12, fibres: 16 },
    composition: [
      { aliment: "Lentilles cuites", quantité: "150g", préparation: "curry" },
      { aliment: "Patate douce", quantité: "150g", préparation: "cubes mijotés" },
      { aliment: "Épinards frais", quantité: "60g", préparation: "incorporés" },
      { aliment: "Huile de coco", quantité: "8ml", préparation: "cuisson" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 25,
    adaptations_possibles: ["lait de coco", "autres légumineuses"],
    contre_indications: []
  },
  {
    id: "repas_24",
    nom: "Wrap thon avocat",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["praticité", "transport", "protéines"],
    calories_totales: 420,
    macros: { protéines: 32, glucides: 35, lipides: 18, fibres: 8 },
    composition: [
      { aliment: "Tortilla complète", quantité: "60g", préparation: "base" },
      { aliment: "Thon en conserve", quantité: "100g", préparation: "égoutté" },
      { aliment: "Avocat", quantité: "60g", préparation: "écrasé" },
      { aliment: "Tomates cerises", quantité: "80g", préparation: "coupées" },
      { aliment: "Roquette", quantité: "30g", préparation: "fraîche" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres poissons", "wrap sans gluten"],
    contre_indications: ["allergie_poisson"]
  },
  {
    id: "repas_25",
    nom: "Buddha bowl tempeh",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["végétalien", "coloré", "complet"],
    calories_totales: 510,
    macros: { protéines: 25, glucides: 55, lipides: 22, fibres: 14 },
    composition: [
      { aliment: "Tempeh", quantité: "100g", préparation: "grillé mariné" },
      { aliment: "Riz basmati complet", quantité: "80g", préparation: "cuit" },
      { aliment: "Betterave", quantité: "80g", préparation: "râpée crue" },
      { aliment: "Carotte", quantité: "60g", préparation: "julienne" },
      { aliment: "Tahini", quantité: "15g", préparation: "sauce" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 18,
    adaptations_possibles: ["tofu à la place", "autres légumes"],
    contre_indications: ["allergie_soja", "allergie_sésame"]
  },
  {
    id: "repas_26",
    nom: "Poke bowl thon",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["fraîcheur", "oméga-3", "tendance"],
    calories_totales: 490,
    macros: { protéines: 28, glucides: 48, lipides: 20, fibres: 6 },
    composition: [
      { aliment: "Thon cru sashimi", quantité: "100g", préparation: "cubes marinés" },
      { aliment: "Riz sushi", quantité: "80g", préparation: "vinaigré" },
      { aliment: "Avocat", quantité: "60g", préparation: "tranché" },
      { aliment: "Concombre", quantité: "60g", préparation: "julienne" },
      { aliment: "Graines de sésame", quantité: "8g", préparation: "parsemées" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 15,
    adaptations_possibles: ["saumon cru", "légumes variés"],
    contre_indications: ["allergie_poisson", "grossesse"]
  },
  {
    id: "repas_27",
    nom: "Salade César protéinée",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["classique revisité", "satiété", "calcium"],
    calories_totales: 450,
    macros: { protéines: 35, glucides: 25, lipides: 25, fibres: 8 },
    composition: [
      { aliment: "Poulet grillé", quantité: "120g", préparation: "émincé" },
      { aliment: "Chou romain", quantité: "100g", préparation: "feuilles" },
      { aliment: "Parmesan", quantité: "25g", préparation: "copeaux" },
      { aliment: "Croûtons complets", quantité: "30g", préparation: "maison" },
      { aliment: "Anchois", quantité: "15g", préparation: "sauce" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 12,
    adaptations_possibles: ["sans anchois", "végétarien"],
    contre_indications: ["allergie_poisson", "intolérance_lactose"]
  },
  {
    id: "repas_28",
    nom: "Tartine saumon cream cheese",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["élégance", "calcium", "praticité"],
    calories_totales: 380,
    macros: { protéines: 25, glucides: 32, lipides: 18, fibres: 6 },
    composition: [
      { aliment: "Pain de seigle", quantité: "60g", préparation: "grillé" },
      { aliment: "Cream cheese", quantité: "40g", préparation: "étalé" },
      { aliment: "Saumon fumé", quantité: "60g", préparation: "disposé" },
      { aliment: "Aneth frais", quantité: "5g", préparation: "parsemé" },
      { aliment: "Câpres", quantité: "10g", préparation: "garnissent" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 5,
    adaptations_possibles: ["autres herbes", "pain sans gluten"],
    contre_indications: ["allergie_poisson", "intolérance_lactose"]
  },
  {
    id: "repas_29",
    nom: "Chili végétarien",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["réconfort", "fibres", "protéines végétales"],
    calories_totales: 420,
    macros: { protéines: 20, glucides: 65, lipides: 8, fibres: 18 },
    composition: [
      { aliment: "Haricots noirs", quantité: "120g", préparation: "mijotés" },
      { aliment: "Haricots rouges", quantité: "80g", préparation: "mijotés" },
      { aliment: "Tomates concassées", quantité: "150g", préparation: "sauce" },
      { aliment: "Poivron rouge", quantité: "80g", préparation: "dés" },
      { aliment: "Avocat", quantité: "40g", préparation: "garniture" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 30,
    adaptations_possibles: ["riz en accompagnement", "fromage râpé"],
    contre_indications: []
  },
  {
    id: "repas_30",
    nom: "Salade de quinoa méditerranéenne",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["fraîcheur", "voyage", "antioxydants"],
    calories_totales: 460,
    macros: { protéines: 16, glucides: 48, lipides: 22, fibres: 8 },
    composition: [
      { aliment: "Quinoa cuit", quantité: "100g", préparation: "refroidi" },
      { aliment: "Tomates cerises", quantité: "100g", préparation: "coupées" },
      { aliment: "Concombre", quantité: "80g", préparation: "dés" },
      { aliment: "Olives vertes", quantité: "40g", préparation: "dénoyautées" },
      { aliment: "Huile d'olive extra vierge", quantité: "15ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 15,
    adaptations_possibles: ["fromage de chèvre", "herbes fraîches"],
    contre_indications: []
  },
  {
    id: "repas_31",
    nom: "Stir-fry tofu légumes",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["asiatique", "wok", "végétarien"],
    calories_totales: 440,
    macros: { protéines: 22, glucides: 45, lipides: 18, fibres: 8 },
    composition: [
      { aliment: "Tofu ferme", quantité: "120g", préparation: "sauté" },
      { aliment: "Riz basmati complet", quantité: "80g", préparation: "cuit" },
      { aliment: "Brocoli", quantité: "100g", préparation: "sauté" },
      { aliment: "Poivron rouge", quantité: "80g", préparation: "lamelles" },
      { aliment: "Huile de sésame", quantité: "8ml", préparation: "cuisson" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 18,
    adaptations_possibles: ["autres légumes", "nouilles de riz"],
    contre_indications: ["allergie_soja", "allergie_sésame"]
  },
  {
    id: "repas_32",
    nom: "Soupe lentilles légumes",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["réconfort", "hydratation", "fer"],
    calories_totales: 380,
    macros: { protéines: 18, glucides: 55, lipides: 8, fibres: 14 },
    composition: [
      { aliment: "Lentilles cuites", quantité: "120g", préparation: "mijotées" },
      { aliment: "Carotte", quantité: "100g", préparation: "dés" },
      { aliment: "Céleri", quantité: "60g", préparation: "dés" },
      { aliment: "Épinards frais", quantité: "50g", préparation: "ajoutés" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "finition" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 25,
    adaptations_possibles: ["autres légumineuses", "bouillon maison"],
    contre_indications: []
  },
  {
    id: "repas_33",
    nom: "Salade de saumon fumé",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["raffinement", "oméga-3", "légèreté"],
    calories_totales: 420,
    macros: { protéines: 28, glucides: 22, lipides: 26, fibres: 8 },
    composition: [
      { aliment: "Saumon fumé", quantité: "80g", préparation: "lamelles" },
      { aliment: "Roquette", quantité: "60g", préparation: "base" },
      { aliment: "Avocat", quantité: "80g", préparation: "tranché" },
      { aliment: "Pamplemousse", quantité: "100g", préparation: "suprêmes" },
      { aliment: "Huile d'olive extra vierge", quantité: "12ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 10,
    adaptations_possibles: ["autres agrumes", "noix ajoutées"],
    contre_indications: ["allergie_poisson"]
  },
  {
    id: "repas_34",
    nom: "Bowl mexicain",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["épicé", "coloré", "complet"],
    calories_totales: 500,
    macros: { protéines: 28, glucides: 58, lipides: 18, fibres: 16 },
    composition: [
      { aliment: "Haricots noirs", quantité: "100g", préparation: "épicés" },
      { aliment: "Riz basmati complet", quantité: "80g", préparation: "cuit" },
      { aliment: "Poulet grillé", quantité: "80g", préparation: "émincé épicé" },
      { aliment: "Avocat", quantité: "50g", préparation: "guacamole" },
      { aliment: "Tomates cerises", quantité: "80g", préparation: "salsa" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 20,
    adaptations_possibles: ["végétarien", "fromage ajouté"],
    contre_indications: ["végétarien si poulet"]
  },
  {
    id: "repas_35",
    nom: "Risotto champignons",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["réconfort", "crémeux", "umami"],
    calories_totales: 480,
    macros: { protéines: 15, glucides: 68, lipides: 16, fibres: 4 },
    composition: [
      { aliment: "Riz arborio", quantité: "80g", préparation: "risotto" },
      { aliment: "Champignons variés", quantité: "150g", préparation: "sautés" },
      { aliment: "Parmesan", quantité: "30g", préparation: "râpé" },
      { aliment: "Bouillon légumes", quantité: "300ml", préparation: "ajouté" },
      { aliment: "Huile d'olive extra vierge", quantité: "10ml", préparation: "finition" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 35,
    adaptations_possibles: ["autres champignons", "version végétalienne"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_36",
    nom: "Salade thaï crevettes",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["exotique", "fraîcheur", "protéines"],
    calories_totales: 360,
    macros: { protéines: 28, glucides: 25, lipides: 18, fibres: 8 },
    composition: [
      { aliment: "Crevettes", quantité: "120g", préparation: "sautées" },
      { aliment: "Salade verte", quantité: "80g", préparation: "mélangée" },
      { aliment: "Carotte", quantité: "60g", préparation: "julienne" },
      { aliment: "Concombre", quantité: "80g", préparation: "julienne" },
      { aliment: "Huile de sésame", quantité: "10ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 15,
    adaptations_possibles: ["sauce fish", "herbes asiatiques"],
    contre_indications: ["allergie_crustacés", "allergie_sésame"]
  },
  {
    id: "repas_37",
    nom: "Wrap végétarien",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["végétarien", "transport", "coloré"],
    calories_totales: 420,
    macros: { protéines: 18, glucides: 58, lipides: 14, fibres: 12 },
    composition: [
      { aliment: "Tortilla complète", quantité: "60g", préparation: "base" },
      { aliment: "Houmous", quantité: "40g", préparation: "étalé" },
      { aliment: "Avocat", quantité: "50g", préparation: "tranché" },
      { aliment: "Carotte", quantité: "60g", préparation: "râpée" },
      { aliment: "Épinards frais", quantité: "40g", préparation: "feuilles" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres légumes", "fromage végétal"],
    contre_indications: []
  },
  {
    id: "repas_38",
    nom: "Pâtes saumon épinards",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["oméga-3", "réconfort", "fer"],
    calories_totales: 520,
    macros: { protéines: 30, glucides: 55, lipides: 20, fibres: 8 },
    composition: [
      { aliment: "Pâtes complètes", quantité: "80g", préparation: "cuites" },
      { aliment: "Saumon atlantique", quantité: "100g", préparation: "émietté" },
      { aliment: "Épinards frais", quantité: "100g", préparation: "sautés" },
      { aliment: "Crème fraîche", quantité: "30g", préparation: "sauce" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "finition" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 18,
    adaptations_possibles: ["crème végétale", "autres poissons"],
    contre_indications: ["allergie_poisson", "maladie_cœliaque"]
  },
  {
    id: "repas_39",
    nom: "Salade de pois chiches",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["végétarien", "fibres", "méditerranéen"],
    calories_totales: 440,
    macros: { protéines: 18, glucides: 52, lipides: 18, fibres: 14 },
    composition: [
      { aliment: "Pois chiches", quantité: "120g", préparation: "cuits" },
      { aliment: "Tomates cerises", quantité: "100g", préparation: "coupées" },
      { aliment: "Concombre", quantité: "80g", préparation: "dés" },
      { aliment: "Persil frais", quantité: "20g", préparation: "haché" },
      { aliment: "Huile d'olive extra vierge", quantité: "15ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 12,
    adaptations_possibles: ["fromage ajouté", "autres herbes"],
    contre_indications: []
  },
  {
    id: "repas_40",
    nom: "Tartare de thon avocat",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["raffinement", "cru", "oméga-3"],
    calories_totales: 420,
    macros: { protéines: 28, glucides: 32, lipides: 20, fibres: 8 },
    composition: [
      { aliment: "Thon sashimi", quantité: "100g", préparation: "tartare" },
      { aliment: "Avocat", quantité: "80g", préparation: "dés" },
      { aliment: "Pain de seigle", quantité: "50g", préparation: "grillé" },
      { aliment: "Concombre", quantité: "50g", préparation: "brunoise" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "assaisonnement" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 12,
    adaptations_possibles: ["saumon cru", "seasonings variés"],
    contre_indications: ["allergie_poisson", "grossesse"]
  },
  {
    id: "repas_41",
    nom: "Curry tofu coco",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["végétalien", "exotique", "crémeux"],
    calories_totales: 480,
    macros: { protéines: 20, glucides: 45, lipides: 26, fibres: 8 },
    composition: [
      { aliment: "Tofu ferme", quantité: "120g", préparation: "curry" },
      { aliment: "Riz basmati complet", quantité: "80g", préparation: "cuit" },
      { aliment: "Lait de coco", quantité: "100ml", préparation: "sauce" },
      { aliment: "Épinards frais", quantité: "60g", préparation: "incorporés" },
      { aliment: "Huile de coco", quantité: "8ml", préparation: "cuisson" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 22,
    adaptations_possibles: ["autres légumes", "légumineuses"],
    contre_indications: ["allergie_soja"]
  },
  {
    id: "repas_42",
    nom: "Salade de bœuf thaï",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["protéines", "exotique", "fer"],
    calories_totales: 450,
    macros: { protéines: 32, glucides: 28, lipides: 22, fibres: 8 },
    composition: [
      { aliment: "Bœuf maigre", quantité: "100g", préparation: "grillé tranché" },
      { aliment: "Salade verte", quantité: "80g", préparation: "mélangée" },
      { aliment: "Carotte", quantité: "60g", préparation: "julienne" },
      { aliment: "Tomates cerises", quantité: "80g", préparation: "coupées" },
      { aliment: "Huile de sésame", quantité: "12ml", préparation: "vinaigrette épicée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 18,
    adaptations_possibles: ["herbes thaï", "piment"],
    contre_indications: ["végétarien", "allergie_sésame"]
  },
  {
    id: "repas_43",
    nom: "Bol soba légumes",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["asiatique", "sans gluten", "végétarien"],
    calories_totales: 420,
    macros: { protéines: 16, glucides: 68, lipides: 10, fibres: 8 },
    composition: [
      { aliment: "Nouilles soba", quantité: "80g", préparation: "cuites" },
      { aliment: "Edamame", quantité: "80g", préparation: "écossés" },
      { aliment: "Carotte", quantité: "60g", préparation: "julienne" },
      { aliment: "Chou rouge", quantité: "60g", préparation: "émincé" },
      { aliment: "Huile de sésame", quantité: "8ml", préparation: "assaisonnement" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 15,
    adaptations_possibles: ["autres légumes", "sauce soja"],
    contre_indications: ["allergie_soja", "allergie_sésame"]
  },
  {
    id: "repas_44",
    nom: "Gratin courgette chèvre",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["réconfort", "calcium", "végétarien"],
    calories_totales: 380,
    macros: { protéines: 22, glucides: 25, lipides: 22, fibres: 6 },
    composition: [
      { aliment: "Courgette", quantité: "200g", préparation: "tranches" },
      { aliment: "Fromage de chèvre", quantité: "80g", préparation: "émietté" },
      { aliment: "Quinoa cuit", quantité: "60g", préparation: "base" },
      { aliment: "Tomates cerises", quantité: "80g", préparation: "coupées" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "arrosage" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 25,
    adaptations_possibles: ["autres fromages", "herbes de Provence"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_45",
    nom: "Soupe miso tofu",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["probiotiques", "léger", "asiatique"],
    calories_totales: 280,
    macros: { protéines: 18, glucides: 25, lipides: 12, fibres: 4 },
    composition: [
      { aliment: "Miso", quantité: "20g", préparation: "bouillon" },
      { aliment: "Tofu ferme", quantité: "80g", préparation: "cubes" },
      { aliment: "Algues wakamé", quantité: "10g", préparation: "réhydratées" },
      { aliment: "Oignon vert", quantité: "20g", préparation: "émincé" },
      { aliment: "Huile de sésame", quantité: "5ml", préparation: "finition" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 10,
    adaptations_possibles: ["légumes additionnels", "nouilles"],
    contre_indications: ["allergie_soja", "allergie_sésame"]
  },

  // DÎNERS (25 repas)
  {
    id: "repas_46",
    nom: "Saumon grillé brocolis",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["oméga-3", "léger", "vitamines"],
    calories_totales: 420,
    macros: { protéines: 35, glucides: 18, lipides: 24, fibres: 8 },
    composition: [
      { aliment: "Saumon atlantique", quantité: "120g", préparation: "grillé" },
      { aliment: "Brocoli", quantité: "150g", préparation: "vapeur" },
      { aliment: "Quinoa cuit", quantité: "60g", préparation: "pilaf" },
      { aliment: "Huile d'olive extra vierge", quantité: "10ml", préparation: "assaisonnement" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 20,
    adaptations_possibles: ["autres poissons", "légumes verts"],
    contre_indications: ["allergie_poisson"]
  },
  {
    id: "repas_47",
    nom: "Poulet rôti légumes",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["classique", "complet", "réconfort"],
    calories_totales: 480,
    macros: { protéines: 38, glucides: 35, lipides: 20, fibres: 8 },
    composition: [
      { aliment: "Poulet grillé", quantité: "130g", préparation: "rôti" },
      { aliment: "Patate douce", quantité: "120g", préparation: "rôtie" },
      { aliment: "Courgette", quantité: "100g", préparation: "rôtie" },
      { aliment: "Huile d'olive extra vierge", quantité: "12ml", préparation: "cuisson" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 35,
    adaptations_possibles: ["légumes de saison", "herbes fraîches"],
    contre_indications: ["végétarien"]
  },
  {
    id: "repas_48",
    nom: "Tofu sauté asiatique",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["végétarien", "wok", "léger"],
    calories_totales: 380,
    macros: { protéines: 22, glucides: 32, lipides: 18, fibres: 8 },
    composition: [
      { aliment: "Tofu ferme", quantité: "120g", préparation: "sauté" },
      { aliment: "Pak-choï", quantité: "100g", préparation: "sauté" },
      { aliment: "Champignons shiitakés", quantité: "80g", préparation: "sautés" },
      { aliment: "Riz de chou-fleur", quantité: "100g", préparation: "sauté" },
      { aliment: "Huile de sésame", quantité: "10ml", préparation: "cuisson" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 15,
    adaptations_possibles: ["autres légumes", "sauce soja"],
    contre_indications: ["allergie_soja", "allergie_sésame"]
  },
  {
    id: "repas_49",
    nom: "Soupe détox légumes",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["détox", "hydratation", "léger"],
    calories_totales: 220,
    macros: { protéines: 8, glucides: 32, lipides: 6, fibres: 12 },
    composition: [
      { aliment: "Brocoli", quantité: "100g", préparation: "mijoté" },
      { aliment: "Épinards frais", quantité: "80g", préparation: "mijotés" },
      { aliment: "Courgette", quantité: "100g", préparation: "mijotée" },
      { aliment: "Poireau", quantité: "80g", préparation: "mijoté" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "finition" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 25,
    adaptations_possibles: ["bouillon d'os", "herbes fraîches"],
    contre_indications: []
  },
  {
    id: "repas_50",
    nom: "Salade composée légère",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["fraîcheur", "vitamines", "digestion"],
    calories_totales: 320,
    macros: { protéines: 18, glucides: 22, lipides: 18, fibres: 12 },
    composition: [
      { aliment: "Salade verte", quantité: "100g", préparation: "lavée" },
      { aliment: "Tomates cerises", quantité: "100g", préparation: "coupées" },
      { aliment: "Concombre", quantité: "80g", préparation: "tranché" },
      { aliment: "Œuf dur", quantité: "1 moyen", préparation: "coupé" },
      { aliment: "Huile d'olive extra vierge", quantité: "12ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 10,
    adaptations_possibles: ["autres légumes", "graines ajoutées"],
    contre_indications: ["allergie_œuf"]
  },
  {
    id: "repas_51",
    nom: "Omelette épinards fromage",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["protéines", "calcium", "simplicité"],
    calories_totales: 350,
    macros: { protéines: 26, glucides: 8, lipides: 24, fibres: 4 },
    composition: [
      { aliment: "Œufs entiers", quantité: "3 moyens", préparation: "battus" },
      { aliment: "Épinards frais", quantité: "80g", préparation: "sautés" },
      { aliment: "Fromage râpé", quantité: "30g", préparation: "fondu" },
      { aliment: "Salade verte", quantité: "60g", préparation: "accompagnement" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 12,
    adaptations_possibles: ["autres légumes", "herbes fraîches"],
    contre_indications: ["allergie_œuf", "intolérance_lactose"]
  },
  {
    id: "repas_52",
    nom: "Cabillaud papillote",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["léger", "vapeur", "savoureux"],
    calories_totales: 300,
    macros: { protéines: 28, glucides: 18, lipides: 12, fibres: 6 },
    composition: [
      { aliment: "Cabillaud", quantité: "120g", préparation: "papillote" },
      { aliment: "Courgette", quantité: "100g", préparation: "julienne" },
      { aliment: "Tomates cerises", quantité: "80g", préparation: "coupées" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "arrosage" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 25,
    adaptations_possibles: ["autres poissons", "herbes méditerranéennes"],
    contre_indications: ["allergie_poisson"]
  },
  {
    id: "repas_53",
    nom: "Curry végétarien léger",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["végétarien", "épices", "digestion"],
    calories_totales: 380,
    macros: { protéines: 16, glucides: 52, lipides: 12, fibres: 14 },
    composition: [
      { aliment: "Lentilles cuites", quantité: "100g", préparation: "curry" },
      { aliment: "Épinards frais", quantité: "100g", préparation: "incorporés" },
      { aliment: "Tomates", quantité: "120g", préparation: "sauce" },
      { aliment: "Huile de coco", quantité: "8ml", préparation: "cuisson" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 20,
    adaptations_possibles: ["lait de coco", "autres légumineuses"],
    contre_indications: []
  },
  {
    id: "repas_54",
    nom: "Carpaccio betterave chèvre",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["raffinement", "antioxydants", "fraîcheur"],
    calories_totales: 280,
    macros: { protéines: 14, glucides: 20, lipides: 16, fibres: 6 },
    composition: [
      { aliment: "Betterave", quantité: "120g", préparation: "tranches fines" },
      { aliment: "Fromage de chèvre", quantité: "60g", préparation: "émietté" },
      { aliment: "Roquette", quantité: "40g", préparation: "garniture" },
      { aliment: "Noix", quantité: "20g", préparation: "concassées" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "filet" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 15,
    adaptations_possibles: ["vinaigre balsamique", "miel"],
    contre_indications: ["intolérance_lactose", "allergie_fruits_à_coque"]
  },
  {
    id: "repas_55",
    nom: "Soupe miso champignons",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["probiotiques", "umami", "réconfort"],
    calories_totales: 200,
    macros: { protéines: 12, glucides: 18, lipides: 8, fibres: 4 },
    composition: [
      { aliment: "Miso", quantité: "25g", préparation: "bouillon" },
      { aliment: "Champignons shiitakés", quantité: "100g", préparation: "tranchés" },
      { aliment: "Tofu ferme", quantité: "60g", préparation: "cubes" },
      { aliment: "Oignon vert", quantité: "20g", préparation: "émincé" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 12,
    adaptations_possibles: ["algues ajoutées", "nouilles konjac"],
    contre_indications: ["allergie_soja"]
  },
  {
    id: "repas_56",
    nom: "Ratatouille provençale",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["végétarien", "méditerranéen", "antioxydants"],
    calories_totales: 180,
    macros: { protéines: 4, glucides: 28, lipides: 8, fibres: 10 },
    composition: [
      { aliment: "Aubergine", quantité: "100g", préparation: "mijotée" },
      { aliment: "Courgette", quantité: "100g", préparation: "mijotée" },
      { aliment: "Poivron rouge", quantité: "80g", préparation: "mijoté" },
      { aliment: "Tomates", quantité: "120g", préparation: "mijotées" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "cuisson" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 35,
    adaptations_possibles: ["herbes de Provence", "ail"],
    contre_indications: []
  },
  {
    id: "repas_57",
    nom: "Salade tiède lentilles",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["fer", "réconfort", "végétarien"],
    calories_totales: 340,
    macros: { protéines: 18, glucides: 40, lipides: 12, fibres: 12 },
    composition: [
      { aliment: "Lentilles cuites", quantité: "120g", préparation: "tièdes" },
      { aliment: "Épinards frais", quantité: "80g", préparation: "sautés" },
      { aliment: "Tomates cerises", quantité: "100g", préparation: "rôties" },
      { aliment: "Huile d'olive extra vierge", quantité: "10ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 15,
    adaptations_possibles: ["fromage de chèvre", "herbes fraîches"],
    contre_indications: []
  },
  {
    id: "repas_58",
    nom: "Crevettes sautées ail",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["protéines", "méditerranéen", "léger"],
    calories_totales: 250,
    macros: { protéines: 28, glucides: 12, lipides: 10, fibres: 4 },
    composition: [
      { aliment: "Crevettes", quantité: "150g", préparation: "sautées" },
      { aliment: "Courgette", quantité: "100g", préparation: "spirales" },
      { aliment: "Tomates cerises", quantité: "80g", préparation: "sautées" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "cuisson" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 12,
    adaptations_possibles: ["persil frais", "citron"],
    contre_indications: ["allergie_crustacés"]
  },
  {
    id: "repas_59",
    nom: "Velouté courge",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["réconfort", "vitamines", "digestion"],
    calories_totales: 180,
    macros: { protéines: 4, glucides: 28, lipides: 6, fibres: 6 },
    composition: [
      { aliment: "Courge butternut", quantité: "200g", préparation: "velouté" },
      { aliment: "Carotte", quantité: "80g", préparation: "mijotée" },
      { aliment: "Bouillon légumes", quantité: "300ml", préparation: "base" },
      { aliment: "Huile d'olive extra vierge", quantité: "6ml", préparation: "finition" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 30,
    adaptations_possibles: ["crème végétale", "épices"],
    contre_indications: []
  },
  {
    id: "repas_60",
    nom: "Tartare légumes avocat",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["cru", "fraîcheur", "vitamines"],
    calories_totales: 280,
    macros: { protéines: 6, glucides: 22, lipides: 20, fibres: 12 },
    composition: [
      { aliment: "Avocat", quantité: "100g", préparation: "dés" },
      { aliment: "Tomates", quantité: "120g", préparation: "concassées" },
      { aliment: "Concombre", quantité: "80g", préparation: "brunoise" },
      { aliment: "Huile d'olive extra vierge", quantité: "12ml", préparation: "assaisonnement" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 10,
    adaptations_possibles: ["herbes fraîches", "citron vert"],
    contre_indications: []
  },
  {
    id: "repas_61",
    nom: "Omelette champignons",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["protéines", "umami", "rapidité"],
    calories_totales: 300,
    macros: { protéines: 22, glucides: 8, lipides: 20, fibres: 3 },
    composition: [
      { aliment: "Œufs entiers", quantité: "3 moyens", préparation: "battus" },
      { aliment: "Champignons de Paris", quantité: "100g", préparation: "sautés" },
      { aliment: "Persil frais", quantité: "10g", préparation: "haché" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "cuisson" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 10,
    adaptations_possibles: ["autres champignons", "fines herbes"],
    contre_indications: ["allergie_œuf"]
  },
  {
    id: "repas_62",
    nom: "Salade kale massage",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["superaliment", "cru", "détox"],
    calories_totales: 320,
    macros: { protéines: 8, glucides: 25, lipides: 22, fibres: 8 },
    composition: [
      { aliment: "Chou kale", quantité: "100g", préparation: "massé" },
      { aliment: "Avocat", quantité: "80g", préparation: "tranché" },
      { aliment: "Graines de tournesol", quantité: "20g", préparation: "grillées" },
      { aliment: "Huile d'olive extra vierge", quantité: "12ml", préparation: "massage" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres graines", "citron"],
    contre_indications: []
  },
  {
    id: "repas_63",
    nom: "Poisson blanc vapeur",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["léger", "digestion", "protéines"],
    calories_totales: 280,
    macros: { protéines: 30, glucides: 15, lipides: 10, fibres: 6 },
    composition: [
      { aliment: "Cabillaud", quantité: "120g", préparation: "vapeur" },
      { aliment: "Brocoli", quantité: "120g", préparation: "vapeur" },
      { aliment: "Carotte", quantité: "80g", préparation: "vapeur" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "filet" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 18,
    adaptations_possibles: ["autres poissons", "herbes fraîches"],
    contre_indications: ["allergie_poisson"]
  },
  {
    id: "repas_64",
    nom: "Soupe potiron gingembre",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["anti-inflammatoire", "réconfort", "vitamines"],
    calories_totales: 160,
    macros: { protéines: 3, glucides: 24, lipides: 6, fibres: 4 },
    composition: [
      { aliment: "Potiron", quantité: "180g", préparation: "velouté" },
      { aliment: "Gingembre frais", quantité: "10g", préparation: "mijoté" },
      { aliment: "Bouillon légumes", quantité: "300ml", préparation: "base" },
      { aliment: "Huile de coco", quantité: "6ml", préparation: "finition" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 25,
    adaptations_possibles: ["lait de coco", "épices"],
    contre_indications: []
  },
  {
    id: "repas_65",
    nom: "Salade radis roquette",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["croquant", "détox", "piquant"],
    calories_totales: 240,
    macros: { protéines: 8, glucides: 18, lipides: 16, fibres: 8 },
    composition: [
      { aliment: "Radis", quantité: "100g", préparation: "tranches" },
      { aliment: "Roquette", quantité: "80g", préparation: "base" },
      { aliment: "Avocat", quantité: "60g", préparation: "cubes" },
      { aliment: "Graines de tournesol", quantité: "15g", préparation: "parsemées" },
      { aliment: "Huile d'olive extra vierge", quantité: "10ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 8,
    adaptations_possibles: ["fromage de chèvre", "vinaigrette moutarde"],
    contre_indications: []
  },
  {
    id: "repas_66",
    nom: "Gratin aubergine",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["méditerranéen", "réconfort", "végétarien"],
    calories_totales: 220,
    macros: { protéines: 8, glucides: 22, lipides: 12, fibres: 8 },
    composition: [
      { aliment: "Aubergine", quantité: "150g", préparation: "tranches" },
      { aliment: "Tomates", quantité: "100g", préparation: "sauce" },
      { aliment: "Mozzarella light", quantité: "40g", préparation: "fondue" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "arrosage" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 30,
    adaptations_possibles: ["basilic frais", "ail"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_67",
    nom: "Salade endives noix",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["amertume", "oméga-3", "croquant"],
    calories_totales: 280,
    macros: { protéines: 8, glucides: 18, lipides: 20, fibres: 8 },
    composition: [
      { aliment: "Endives", quantité: "120g", préparation: "émincées" },
      { aliment: "Noix", quantité: "30g", préparation: "concassées" },
      { aliment: "Pomme", quantité: "80g", préparation: "julienne" },
      { aliment: "Huile de noix", quantité: "10ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 8,
    adaptations_possibles: ["fromage bleu", "vinaigre cidre"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_68",
    nom: "Courgetti bolognaise végé",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["sans gluten", "végétarien", "italien"],
    calories_totales: 320,
    macros: { protéines: 16, glucides: 28, lipides: 16, fibres: 12 },
    composition: [
      { aliment: "Courgette", quantité: "150g", préparation: "spirales" },
      { aliment: "Lentilles cuites", quantité: "100g", préparation: "bolognaise" },
      { aliment: "Tomates", quantité: "120g", préparation: "sauce" },
      { aliment: "Huile d'olive extra vierge", quantité: "10ml", préparation: "cuisson" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 20,
    adaptations_possibles: ["parmesan râpé", "basilic"],
    contre_indications: []
  },
  {
    id: "repas_69",
    nom: "Salade fenouil orange",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["digestion", "vitamine C", "fraîcheur"],
    calories_totales: 200,
    macros: { protéines: 4, glucides: 28, lipides: 8, fibres: 8 },
    composition: [
      { aliment: "Fenouil", quantité: "120g", préparation: "émincé" },
      { aliment: "Orange", quantité: "150g", préparation: "suprêmes" },
      { aliment: "Olives vertes", quantité: "20g", préparation: "dénoyautées" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 12,
    adaptations_possibles: ["menthe fraîche", "vinaigrette agrumes"],
    contre_indications: []
  },
  {
    id: "repas_70",
    nom: "Papillote saumon asperges",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["oméga-3", "printemps", "vapeur"],
    calories_totales: 350,
    macros: { protéines: 32, glucides: 12, lipides: 20, fibres: 6 },
    composition: [
      { aliment: "Saumon atlantique", quantité: "120g", préparation: "papillote" },
      { aliment: "Asperges", quantité: "120g", préparation: "papillote" },
      { aliment: "Citron", quantité: "30g", préparation: "tranches" },
      { aliment: "Huile d'olive extra vierge", quantité: "10ml", préparation: "arrosage" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 25,
    adaptations_possibles: ["aneth frais", "autres légumes"],
    contre_indications: ["allergie_poisson"]
  },

  // COLLATIONS (15 repas)
  {
    id: "repas_71",
    nom: "Smoothie protéiné",
    type_de_repas: "collation",
    objectif_nutritionnel: ["récupération", "hydratation", "praticité"],
    calories_totales: 280,
    macros: { protéines: 20, glucides: 32, lipides: 8, fibres: 6 },
    composition: [
      { aliment: "Banane", quantité: "100g", préparation: "mixée" },
      { aliment: "Protéine de pois", quantité: "20g", préparation: "mixée" },
      { aliment: "Épinards frais", quantité: "30g", préparation: "mixés" },
      { aliment: "Graines de chia", quantité: "8g", préparation: "mixées" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 5,
    adaptations_possibles: ["autres fruits", "lait végétal"],
    contre_indications: []
  },
  {
    id: "repas_72",
    nom: "Yaourt grec fruits",
    type_de_repas: "collation",
    objectif_nutritionnel: ["probiotiques", "calcium", "satisfaction"],
    calories_totales: 180,
    macros: { protéines: 15, glucides: 20, lipides: 4, fibres: 4 },
    composition: [
      { aliment: "Yaourt grec nature", quantité: "150g", préparation: "base" },
      { aliment: "Myrtilles", quantité: "60g", préparation: "mélangées" },
      { aliment: "Miel", quantité: "8g", préparation: "ajouté" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 2,
    adaptations_possibles: ["autres fruits rouges", "cannelle"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_73",
    nom: "Houmous légumes",
    type_de_repas: "collation",
    objectif_nutritionnel: ["fibres", "croquant", "végétarien"],
    calories_totales: 160,
    macros: { protéines: 8, glucides: 18, lipides: 6, fibres: 8 },
    composition: [
      { aliment: "Houmous", quantité: "40g", préparation: "trempette" },
      { aliment: "Carotte", quantité: "80g", préparation: "bâtonnets" },
      { aliment: "Concombre", quantité: "60g", préparation: "bâtonnets" },
      { aliment: "Poivron rouge", quantité: "40g", préparation: "lamelles" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 5,
    adaptations_possibles: ["autres légumes", "houmous maison"],
    contre_indications: []
  },
  {
    id: "repas_74",
    nom: "Pomme beurre amande",
    type_de_repas: "collation",
    objectif_nutritionnel: ["fibres", "bon gras", "simplicité"],
    calories_totales: 220,
    macros: { protéines: 8, glucides: 25, lipides: 12, fibres: 6 },
    composition: [
      { aliment: "Pomme", quantité: "150g", préparation: "tranches" },
      { aliment: "Beurre d'amande", quantité: "15g", préparation: "trempette" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 3,
    adaptations_possibles: ["autres fruits", "autres beurres"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_75",
    nom: "Mix noix fruits secs",
    type_de_repas: "collation",
    objectif_nutritionnel: ["énergie", "transport", "concentration"],
    calories_totales: 200,
    macros: { protéines: 6, glucides: 18, lipides: 12, fibres: 4 },
    composition: [
      { aliment: "Amandes", quantité: "15g", préparation: "entières" },
      { aliment: "Noix", quantité: "10g", préparation: "cerneaux" },
      { aliment: "Raisins secs", quantité: "20g", préparation: "mélangés" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 1,
    adaptations_possibles: ["autres noix", "fruits secs variés"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_76",
    nom: "Cottage cheese concombre",
    type_de_repas: "collation",
    objectif_nutritionnel: ["protéines", "fraîcheur", "hydratation"],
    calories_totales: 120,
    macros: { protéines: 14, glucides: 8, lipides: 4, fibres: 2 },
    composition: [
      { aliment: "Cottage cheese", quantité: "100g", préparation: "base" },
      { aliment: "Concombre", quantité: "80g", préparation: "dés" },
      { aliment: "Aneth frais", quantité: "5g", préparation: "haché" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 3,
    adaptations_possibles: ["autres herbes", "tomates cerises"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_77",
    nom: "Edamame salé",
    type_de_repas: "collation",
    objectif_nutritionnel: ["protéines végétales", "simplicité", "folates"],
    calories_totales: 90,
    macros: { protéines: 8, glucides: 6, lipides: 4, fibres: 4 },
    composition: [
      { aliment: "Edamame", quantité: "80g", préparation: "cuit salé" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 5,
    adaptations_possibles: ["épices variées", "ail"],
    contre_indications: ["allergie_soja"]
  },
  {
    id: "repas_78",
    nom: "Toast avocat",
    type_de_repas: "collation",
    objectif_nutritionnel: ["bon gras", "satiété", "tendance"],
    calories_totales: 240,
    macros: { protéines: 8, glucides: 25, lipides: 12, fibres: 8 },
    composition: [
      { aliment: "Pain complet", quantité: "40g", préparation: "grillé" },
      { aliment: "Avocat", quantité: "60g", préparation: "écrasé" },
      { aliment: "Graines de tournesol", quantité: "5g", préparation: "parsemées" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 4,
    adaptations_possibles: ["citron", "épices"],
    contre_indications: ["maladie_cœliaque"]
  },
  {
    id: "repas_79",
    nom: "Smoothie bowl mini",
    type_de_repas: "collation",
    objectif_nutritionnel: ["antioxydants", "présentation", "vitamines"],
    calories_totales: 180,
    macros: { protéines: 4, glucides: 32, lipides: 6, fibres: 8 },
    composition: [
      { aliment: "Banane", quantité: "80g", préparation: "congelée mixée" },
      { aliment: "Myrtilles", quantité: "40g", préparation: "congelées mixées" },
      { aliment: "Granola", quantité: "15g", préparation: "garniture" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 5,
    adaptations_possibles: ["autres fruits", "toppings variés"],
    contre_indications: []
  },
  {
    id: "repas_80",
    nom: "Œuf dur épinards",
    type_de_repas: "collation",
    objectif_nutritionnel: ["protéines", "fer", "simplicité"],
    calories_totales: 140,
    macros: { protéines: 12, glucides: 4, lipides: 8, fibres: 2 },
    composition: [
      { aliment: "Œuf dur", quantité: "1 moyen", préparation: "coupé" },
      { aliment: "Épinards frais", quantité: "60g", préparation: "salade" },
      { aliment: "Huile d'olive extra vierge", quantité: "3ml", préparation: "vinaigrette" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 2,
    adaptations_possibles: ["autres légumes verts", "herbes"],
    contre_indications: ["allergie_œuf"]
  },
  {
    id: "repas_81",
    nom: "Ricotta miel",
    type_de_repas: "collation",
    objectif_nutritionnel: ["calcium", "douceur", "protéines"],
    calories_totales: 160,
    macros: { protéines: 10, glucides: 14, lipides: 8, fibres: 0 },
    composition: [
      { aliment: "Ricotta", quantité: "80g", préparation: "base" },
      { aliment: "Miel", quantité: "10g", préparation: "mélangé" },
      { aliment: "Cannelle", quantité: "1g", préparation: "saupoudrée" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 2,
    adaptations_possibles: ["fruits ajoutés", "noix"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_82",
    nom: "Kiwi amandes",
    type_de_repas: "collation",
    objectif_nutritionnel: ["vitamine C", "fibres", "croquant"],
    calories_totales: 150,
    macros: { protéines: 4, glucides: 20, lipides: 6, fibres: 6 },
    composition: [
      { aliment: "Kiwi", quantité: "120g", préparation: "tranché" },
      { aliment: "Amandes", quantité: "10g", préparation: "effilées" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 3,
    adaptations_possibles: ["miel coulé", "autres noix"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_83",
    nom: "Graines courge rôties",
    type_de_repas: "collation",
    objectif_nutritionnel: ["zinc", "croquant", "fait maison"],
    calories_totales: 140,
    macros: { protéines: 6, glucides: 3, lipides: 12, fibres: 2 },
    composition: [
      { aliment: "Graines de courge", quantité: "25g", préparation: "rôties salées" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 15,
    adaptations_possibles: ["épices variées", "sucré-salé"],
    contre_indications: []
  },
  {
    id: "repas_84",
    nom: "Thé vert noix",
    type_de_repas: "collation",
    objectif_nutritionnel: ["antioxydants", "oméga-3", "chaleur"],
    calories_totales: 130,
    macros: { protéines: 3, glucides: 3, lipides: 12, fibres: 2 },
    composition: [
      { aliment: "Thé vert", quantité: "250ml", préparation: "infusé" },
      { aliment: "Noix", quantité: "18g", préparation: "cerneaux" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 5,
    adaptations_possibles: ["miel ajouté", "autres thés"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_85",
    nom: "Mini salade tomates",
    type_de_repas: "collation",
    objectif_nutritionnel: ["hydratation", "lycopène", "fraîcheur"],
    calories_totales: 80,
    macros: { protéines: 2, glucides: 12, lipides: 3, fibres: 4 },
    composition: [
      { aliment: "Tomates cerises", quantité: "120g", préparation: "coupées" },
      { aliment: "Basilic frais", quantité: "5g", préparation: "haché" },
      { aliment: "Huile d'olive extra vierge", quantité: "3ml", préparation: "assaisonnement" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 3,
    adaptations_possibles: ["mozzarella", "vinaigre balsamique"],
    contre_indications: []
  },

  // POST-TRAINING (10 repas)
  {
    id: "repas_86",
    nom: "Shake protéine banane",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["récupération", "réparation musculaire", "glycogène"],
    calories_totales: 350,
    macros: { protéines: 30, glucides: 40, lipides: 8, fibres: 4 },
    composition: [
      { aliment: "Protéine de pois", quantité: "30g", préparation: "mixée" },
      { aliment: "Banane", quantité: "120g", préparation: "mixée" },
      { aliment: "Avoine complète", quantité: "20g", préparation: "mixée" },
      { aliment: "Graines de chia", quantité: "5g", préparation: "mixées" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 3,
    adaptations_possibles: ["lait végétal", "autres fruits"],
    contre_indications: []
  },
  {
    id: "repas_87",
    nom: "Bol quinoa poulet",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["protéines complètes", "glucides", "récupération"],
    calories_totales: 480,
    macros: { protéines: 35, glucides: 45, lipides: 16, fibres: 6 },
    composition: [
      { aliment: "Quinoa cuit", quantité: "80g", préparation: "pilaf" },
      { aliment: "Poulet grillé", quantité: "120g", préparation: "émincé" },
      { aliment: "Patate douce", quantité: "100g", préparation: "rôtie" },
      { aliment: "Avocat", quantité: "40g", préparation: "tranché" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 15,
    adaptations_possibles: ["autres protéines", "légumes variés"],
    contre_indications: ["végétarien"]
  },
  {
    id: "repas_88",
    nom: "Smoothie récupération",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["anti-inflammatoire", "antioxydants", "hydratation"],
    calories_totales: 280,
    macros: { protéines: 15, glucides: 42, lipides: 6, fibres: 8 },
    composition: [
      { aliment: "Myrtilles", quantité: "100g", préparation: "congelées" },
      { aliment: "Épinards frais", quantité: "40g", préparation: "mixés" },
      { aliment: "Yaourt grec nature", quantité: "100g", préparation: "mixé" },
      { aliment: "Banane", quantité: "80g", préparation: "mixée" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 4,
    adaptations_possibles: ["autres fruits rouges", "protéine végétale"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_89",
    nom: "Tartine beurre cacahuète",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["glucides rapides", "protéines", "simplicité"],
    calories_totales: 320,
    macros: { protéines: 15, glucides: 32, lipides: 16, fibres: 6 },
    composition: [
      { aliment: "Pain complet", quantité: "50g", préparation: "grillé" },
      { aliment: "Beurre de cacahuète naturel", quantité: "20g", préparation: "étalé" },
      { aliment: "Banane", quantité: "60g", préparation: "tranchée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 3,
    adaptations_possibles: ["miel ajouté", "autres beurres"],
    contre_indications: ["allergie_arachide"]
  },
  {
    id: "repas_90",
    nom: "Riz thon légumes",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["réapprovisionnement", "oméga-3", "complet"],
    calories_totales: 420,
    macros: { protéines: 28, glucides: 48, lipides: 12, fibres: 4 },
    composition: [
      { aliment: "Riz basmati complet", quantité: "80g", préparation: "cuit" },
      { aliment: "Thon en conserve", quantité: "100g", préparation: "égoutté" },
      { aliment: "Brocoli", quantité: "100g", préparation: "vapeur" },
      { aliment: "Huile d'olive extra vierge", quantité: "8ml", préparation: "assaisonnement" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 12,
    adaptations_possibles: ["autres poissons", "légumes variés"],
    contre_indications: ["allergie_poisson"]
  },
  {
    id: "repas_91",
    nom: "Smoothie chocolat",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["plaisir", "magnésium", "récupération"],
    calories_totales: 300,
    macros: { protéines: 20, glucides: 35, lipides: 8, fibres: 6 },
    composition: [
      { aliment: "Protéine de pois", quantité: "25g", préparation: "chocolat" },
      { aliment: "Banane", quantité: "100g", préparation: "congelée" },
      { aliment: "Épinards frais", quantité: "30g", préparation: "mixés" },
      { aliment: "Cacao pur", quantité: "8g", préparation: "ajouté" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 4,
    adaptations_possibles: ["lait d'amande", "édulcorant"],
    contre_indications: []
  },
  {
    id: "repas_92",
    nom: "Œufs brouillés toast",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["protéines complètes", "glucides", "B12"],
    calories_totales: 380,
    macros: { protéines: 24, glucides: 32, lipides: 18, fibres: 6 },
    composition: [
      { aliment: "Œufs entiers", quantité: "3 moyens", préparation: "brouillés" },
      { aliment: "Pain complet", quantité: "50g", préparation: "grillé" },
      { aliment: "Épinards frais", quantité: "40g", préparation: "sautés" },
      { aliment: "Huile d'olive extra vierge", quantité: "6ml", préparation: "cuisson" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 8,
    adaptations_possibles: ["fromage ajouté", "herbes fraîches"],
    contre_indications: ["allergie_œuf"]
  },
  {
    id: "repas_93",
    nom: "Bowl saumon riz",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["oméga-3", "protéines", "glucides"],
    calories_totales: 460,
    macros: { protéines: 30, glucides: 42, lipides: 18, fibres: 4 },
    composition: [
      { aliment: "Saumon atlantique", quantité: "100g", préparation: "grillé" },
      { aliment: "Riz basmati complet", quantité: "80g", préparation: "cuit" },
      { aliment: "Avocat", quantité: "50g", préparation: "tranché" },
      { aliment: "Concombre", quantité: "60g", préparation: "dés" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 15,
    adaptations_possibles: ["sauce soja", "graines de sésame"],
    contre_indications: ["allergie_poisson"]
  },
  {
    id: "repas_94",
    nom: "Shake spiruline",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["superaliment", "fer", "B12"],
    calories_totales: 250,
    macros: { protéines: 18, glucides: 28, lipides: 6, fibres: 6 },
    composition: [
      { aliment: "Spiruline", quantité: "8g", préparation: "mixée" },
      { aliment: "Banane", quantité: "100g", préparation: "mixée" },
      { aliment: "Ananas", quantité: "80g", préparation: "mixé" },
      { aliment: "Graines de chia", quantité: "5g", préparation: "mixées" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 4,
    adaptations_possibles: ["lait de coco", "autres fruits"],
    contre_indications: ["allergie_algues"]
  },
  {
    id: "repas_95",
    nom: "Wrap tempeh",
    type_de_repas: "post-training",
    objectif_nutritionnel: ["probiotiques", "protéines végétales", "portable"],
    calories_totales: 420,
    macros: { protéines: 22, glucides: 38, lipides: 20, fibres: 8 },
    composition: [
      { aliment: "Tortilla complète", quantité: "60g", préparation: "base" },
      { aliment: "Tempeh", quantité: "80g", préparation: "grillé" },
      { aliment: "Avocat", quantité: "50g", préparation: "écrasé" },
      { aliment: "Carotte", quantité: "60g", préparation: "râpée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 8,
    adaptations_possibles: ["sauce tahini", "légumes variés"],
    contre_indications: ["allergie_soja"]
  },

  // PRÉ-TRAINING (5 repas)
  {
    id: "repas_96",
    nom: "Banane dattes",
    type_de_repas: "pré-training",
    objectif_nutritionnel: ["énergie rapide", "potassium", "digestion"],
    calories_totales: 180,
    macros: { protéines: 2, glucides: 45, lipides: 1, fibres: 6 },
    composition: [
      { aliment: "Banane", quantité: "120g", préparation: "fraîche" },
      { aliment: "Dattes Medjool", quantité: "20g", préparation: "dénoyautées" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 2,
    adaptations_possibles: ["beurre d'amande léger", "cannelle"],
    contre_indications: []
  },
  {
    id: "repas_97",
    nom: "Toast miel",
    type_de_repas: "pré-training",
    objectif_nutritionnel: ["glucides simples", "énergie", "digestible"],
    calories_totales: 160,
    macros: { protéines: 6, glucides: 32, lipides: 2, fibres: 4 },
    composition: [
      { aliment: "Pain complet", quantité: "40g", préparation: "grillé" },
      { aliment: "Miel", quantité: "15g", préparation: "étalé" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 3,
    adaptations_possibles: ["confiture", "cannelle"],
    contre_indications: ["maladie_cœliaque"]
  },
  {
    id: "repas_98",
    nom: "Smoothie léger",
    type_de_repas: "pré-training",
    objectif_nutritionnel: ["hydratation", "vitamines", "énergie"],
    calories_totales: 140,
    macros: { protéines: 3, glucides: 32, lipides: 1, fibres: 4 },
    composition: [
      { aliment: "Banane", quantité: "80g", préparation: "mixée" },
      { aliment: "Ananas", quantité: "100g", préparation: "mixé" },
      { aliment: "Épinards frais", quantité: "20g", préparation: "mixés" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 3,
    adaptations_possibles: ["gingembre", "citron"],
    contre_indications: []
  },
  {
    id: "repas_99",
    nom: "Figues amandes",
    type_de_repas: "pré-training",
    objectif_nutritionnel: ["énergie naturelle", "minéraux", "léger"],
    calories_totales: 150,
    macros: { protéines: 4, glucides: 28, lipides: 4, fibres: 5 },
    composition: [
      { aliment: "Figues fraîches", quantité: "100g", préparation: "entières" },
      { aliment: "Amandes", quantité: "8g", préparation: "effilées" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 2,
    adaptations_possibles: ["miel coulé", "autres noix"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_100",
    nom: "Avoine liquide",
    type_de_repas: "pré-training",
    objectif_nutritionnel: ["glucides complexes", "bêta-glucanes", "digestible"],
    calories_totales: 120,
    macros: { protéines: 4, glucides: 24, lipides: 2, fibres: 3 },
    composition: [
      { aliment: "Avoine complète", quantité: "25g", préparation: "boisson" },
      { aliment: "Banane", quantité: "60g", préparation: "mixée" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 4,
    adaptations_possibles: ["cannelle", "vanille"],
    contre_indications: ["intolérance_gluten"]
  },
  // NOUVEAUX REPAS (101-120)
  {
    id: "repas_101",
    nom: "Bowl quinoa protéiné",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["protéines complètes", "énergie durable", "satiété"],
    calories_totales: 520,
    macros: { protéines: 28, glucides: 65, lipides: 15, fibres: 12 },
    composition: [
      { aliment: "Quinoa rouge", quantité: "80g", préparation: "cuit" },
      { aliment: "Tempeh", quantité: "100g", préparation: "grillé" },
      { aliment: "Avocat", quantité: "60g", préparation: "en tranches" },
      { aliment: "Épinards baby", quantité: "50g", préparation: "frais" },
      { aliment: "Graines de chanvre", quantité: "15g", préparation: "séchées" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 15,
    adaptations_possibles: ["autres légumes verts", "sauce tahini"],
    contre_indications: ["allergie_soja"]
  },
  {
    id: "repas_102",
    nom: "Smoothie spiruline énergisant",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["énergie", "antioxydants", "détox"],
    calories_totales: 280,
    macros: { protéines: 18, glucides: 35, lipides: 8, fibres: 6 },
    composition: [
      { aliment: "Spiruline", quantité: "5g", préparation: "en poudre" },
      { aliment: "Banane", quantité: "1 moyenne", préparation: "mixée" },
      { aliment: "Açaí", quantité: "100g", préparation: "mixé" },
      { aliment: "Lait d'amande", quantité: "200ml", préparation: "mixé" },
      { aliment: "Graines de lin", quantité: "10g", préparation: "mixées" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 5,
    adaptations_possibles: ["autres fruits rouges", "miel"],
    contre_indications: []
  },
  {
    id: "repas_103",
    nom: "Salade kale complète",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["vitamines", "minéraux", "antioxydants"],
    calories_totales: 380,
    macros: { protéines: 22, glucides: 25, lipides: 25, fibres: 8 },
    composition: [
      { aliment: "Chou kale", quantité: "100g", préparation: "massé" },
      { aliment: "Champignons shiitake", quantité: "80g", préparation: "sautés" },
      { aliment: "Noix du Brésil", quantité: "15g", préparation: "concassées" },
      { aliment: "Grenade", quantité: "60g", préparation: "graines" },
      { aliment: "Vinaigrette tahini", quantité: "20ml", préparation: "mélangée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 12,
    adaptations_possibles: ["autres noix", "vinaigrette balsamique"],
    contre_indications: ["allergie_fruits_à_coque"]
  },
  {
    id: "repas_104",
    nom: "Curry de lentilles corail",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["protéines végétales", "épices", "réconfort"],
    calories_totales: 450,
    macros: { protéines: 20, glucides: 55, lipides: 18, fibres: 15 },
    composition: [
      { aliment: "Lentilles corail", quantité: "100g", préparation: "cuites" },
      { aliment: "Lait de coco", quantité: "150ml", préparation: "cuit" },
      { aliment: "Épinards baby", quantité: "80g", préparation: "ajoutés en fin" },
      { aliment: "Riz complet", quantité: "80g", préparation: "cuit" },
      { aliment: "Épices curry", quantité: "5g", préparation: "torréfiées" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 25,
    adaptations_possibles: ["autres légumineuses", "légumes variés"],
    contre_indications: []
  },
  {
    id: "repas_105",
    nom: "Toast avocat tempeh",
    type_de_repas: "petit-déjeuner",
    objectif_nutritionnel: ["protéines végétales", "graisses saines", "satiété"],
    calories_totales: 420,
    macros: { protéines: 24, glucides: 35, lipides: 22, fibres: 8 },
    composition: [
      { aliment: "Pain complet", quantité: "60g", préparation: "grillé" },
      { aliment: "Avocat", quantité: "80g", préparation: "écrasé" },
      { aliment: "Tempeh", quantité: "80g", préparation: "mariné et grillé" },
      { aliment: "Graines de chanvre", quantité: "10g", préparation: "séchées" },
      { aliment: "Roquette", quantité: "20g", préparation: "fraîche" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 10,
    adaptations_possibles: ["sans gluten", "autres légumes verts"],
    contre_indications: ["allergie_soja"]
  },
  {
    id: "repas_106",
    nom: "Bowl açaí protéiné",
    type_de_repas: "collation",
    objectif_nutritionnel: ["antioxydants", "énergie", "plaisir"],
    calories_totales: 320,
    macros: { protéines: 15, glucides: 45, lipides: 12, fibres: 8 },
    composition: [
      { aliment: "Açaí", quantité: "150g", préparation: "mixé" },
      { aliment: "Yaourt grec nature", quantité: "100g", préparation: "mélangé" },
      { aliment: "Granola maison", quantité: "30g", préparation: "sans sucre" },
      { aliment: "Myrtilles", quantité: "50g", préparation: "fraîches" },
      { aliment: "Noix de cajou", quantité: "10g", préparation: "concassées" }
    ],
    indice_satiété: "moyen",
    temps_de_préparation: 8,
    adaptations_possibles: ["autres fruits rouges", "miel"],
    contre_indications: ["intolérance_lactose", "allergie_fruits_à_coque"]
  },
  {
    id: "repas_107",
    nom: "Soupe miso aux légumes",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["réconfort", "probiotiques", "légèreté"],
    calories_totales: 180,
    macros: { protéines: 8, glucides: 25, lipides: 5, fibres: 6 },
    composition: [
      { aliment: "Miso", quantité: "20g", préparation: "dilué" },
      { aliment: "Chou-fleur", quantité: "100g", préparation: "cuit" },
      { aliment: "Champignons shiitake", quantité: "60g", préparation: "cuits" },
      { aliment: "Épinards baby", quantité: "40g", préparation: "ajoutés en fin" },
      { aliment: "Algues wakame", quantité: "5g", préparation: "réhydratées" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 15,
    adaptations_possibles: ["autres légumes", "tofu"],
    contre_indications: ["allergie_soja"]
  },
  {
    id: "repas_108",
    nom: "Salade de patate douce violette",
    type_de_repas: "déjeuner",
    objectif_nutritionnel: ["antioxydants", "glucides complexes", "couleur"],
    calories_totales: 350,
    macros: { protéines: 12, glucides: 45, lipides: 15, fibres: 8 },
    composition: [
      { aliment: "Patate douce violette", quantité: "150g", préparation: "cuite au four" },
      { aliment: "Tofu ferme", quantité: "80g", préparation: "cuit" },
      { aliment: "Chou kale", quantité: "60g", préparation: "massé" },
      { aliment: "Graines de courge", quantité: "15g", préparation: "séchées" },
      { aliment: "Vinaigrette citron", quantité: "20ml", préparation: "mélangée" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 20,
    adaptations_possibles: ["autres légumes", "herbes fraîches"],
    contre_indications: ["allergie_soja"]
  },
  {
    id: "repas_109",
    nom: "Kéfir aux fruits",
    type_de_repas: "collation",
    objectif_nutritionnel: ["probiotiques", "hydratation", "légèreté"],
    calories_totales: 150,
    macros: { protéines: 8, glucides: 20, lipides: 4, fibres: 3 },
    composition: [
      { aliment: "Kéfir nature", quantité: "200ml", préparation: "froid" },
      { aliment: "Grenade", quantité: "50g", préparation: "graines" },
      { aliment: "Graines de lin", quantité: "5g", préparation: "moulues" },
      { aliment: "Miel", quantité: "10g", préparation: "mélangé" }
    ],
    indice_satiété: "faible",
    temps_de_préparation: 3,
    adaptations_possibles: ["autres fruits", "cannelle"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_110",
    nom: "Risotto aux champignons shiitake",
    type_de_repas: "dîner",
    objectif_nutritionnel: ["réconfort", "umami", "satiété"],
    calories_totales: 480,
    macros: { protéines: 18, glucides: 65, lipides: 18, fibres: 6 },
    composition: [
      { aliment: "Riz arborio", quantité: "80g", préparation: "cuit" },
      { aliment: "Champignons shiitake", quantité: "100g", préparation: "sautés" },
      { aliment: "Bouillon végétal", quantité: "300ml", préparation: "chaud" },
      { aliment: "Parmesan", quantité: "20g", préparation: "râpé" },
      { aliment: "Huile d'olive", quantité: "15ml", préparation: "ajoutée en fin" }
    ],
    indice_satiété: "élevé",
    temps_de_préparation: 30,
    adaptations_possibles: ["autres champignons", "herbes fraîches"],
    contre_indications: ["intolérance_lactose"]
  },
  {
    id: "repas_