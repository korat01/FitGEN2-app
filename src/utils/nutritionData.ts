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