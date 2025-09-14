// Mock implementation to resolve build errors
export interface AlimentBlock {
  nom: string;
  calories: number;
  protéines: number;
  glucides: number;
  lipides: number;
  fibres?: number;
  calcium?: number;
  fer?: number;
  vitamine_c?: number;
  catégorie: string;
  saison?: string[];
  origine?: string;
  bio?: boolean;
  moment_de_consommation?: string[];
  classes_nutritionnelles?: string[];
  index_glycémique?: "faible" | "modéré" | "élevé";
  bénéfices_clés?: string[];
  interdit_si?: string[];
}

export const alimentsData: AlimentBlock[] = [
  {
    nom: "Pomme",
    calories: 52,
    protéines: 0.3,
    glucides: 14,
    lipides: 0.2,
    fibres: 2.4,
    catégorie: "Fruits",
    saison: ["automne", "hiver"],
    bio: true,
    moment_de_consommation: ["collation", "petit-déjeuner"],
    index_glycémique: "faible",
    bénéfices_clés: ["antioxydants", "fibres"],
    interdit_si: []
  },
  {
    nom: "Poulet",
    calories: 165,
    protéines: 31,
    glucides: 0,
    lipides: 3.6,
    catégorie: "Viandes",
    moment_de_consommation: ["déjeuner", "dîner"],
    bénéfices_clés: ["protéines", "fer"],
    interdit_si: ["végétarien", "végan"]
  }
];

// Mock repas data for compatibility
export const repasData = [
  {
    nom: "Salade César",
    temps: 15,
    difficulté: "Facile",
    calories: 320,
    ingredients: ["Salade", "Poulet", "Parmesan"]
  }
];

// Mock functions for Developer page
export const saveAliment = (aliment: any) => {
  console.log('Saving aliment:', aliment);
  return Promise.resolve(aliment);
};

export const saveRepas = (repas: any) => {
  console.log('Saving repas:', repas);
  return Promise.resolve(repas);
};

export default repasData;