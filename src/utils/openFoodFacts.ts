// Recherche d'un produit par code-barres via l'API publique Open Food Facts (gratuite, sans clé,
// base collaborative de centaines de milliers de produits alimentaires réels).
// Doc : https://openfoodfacts.github.io/openfoodfacts-server/api/

export interface ScannedProduct {
  barcode: string;
  nom: string;
  marque?: string;
  categorie: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
  fibres: number;
  sodium: number;
  image?: string;
}

interface OpenFoodFactsResponse {
  status: number;
  product?: {
    product_name?: string;
    product_name_fr?: string;
    brands?: string;
    categories?: string;
    image_url?: string;
    image_front_small_url?: string;
    nutriments?: {
      'energy-kcal_100g'?: number;
      proteins_100g?: number;
      carbohydrates_100g?: number;
      fat_100g?: number;
      fiber_100g?: number;
      sodium_100g?: number;
    };
  };
}

export class ProductNotFoundError extends Error {
  constructor(barcode: string) {
    super(`Aucun produit trouvé pour le code-barres ${barcode}`);
    this.name = 'ProductNotFoundError';
  }
}

// Récupère les infos nutritionnelles d'un produit par son code-barres. Lève une erreur explicite
// (produit introuvable vs erreur réseau) plutôt que de retourner silencieusement des valeurs à 0.
export const fetchProductByBarcode = async (barcode: string): Promise<ScannedProduct> => {
  const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`);

  if (!response.ok) {
    throw new Error(`Erreur réseau (${response.status}) lors de la recherche du produit`);
  }

  const data: OpenFoodFactsResponse = await response.json();

  if (data.status !== 1 || !data.product) {
    throw new ProductNotFoundError(barcode);
  }

  const { product } = data;
  const nutriments = product.nutriments || {};

  return {
    barcode,
    nom: product.product_name_fr || product.product_name || `Produit ${barcode}`,
    marque: product.brands,
    categorie: product.categories?.split(',')[0]?.trim() || 'Scanné',
    calories: Math.round(nutriments['energy-kcal_100g'] || 0),
    proteines: Math.round((nutriments.proteins_100g || 0) * 10) / 10,
    glucides: Math.round((nutriments.carbohydrates_100g || 0) * 10) / 10,
    lipides: Math.round((nutriments.fat_100g || 0) * 10) / 10,
    fibres: Math.round((nutriments.fiber_100g || 0) * 10) / 10,
    sodium: Math.round((nutriments.sodium_100g || 0) * 1000), // g -> mg
    image: product.image_front_small_url || product.image_url,
  };
};
