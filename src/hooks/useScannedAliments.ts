import { useCallback, useEffect, useState } from 'react';
import type { ScannedProduct } from '@/utils/openFoodFacts';

const SCANNED_ALIMENTS_STORAGE_KEY = 'scannedAliments';

export interface ScannedAliment {
  id: string;
  nom: string;
  categorie: string;
  ig: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
  fibres: number;
  micronutriments: string[];
  classe: string;
  tags: string[];
  emoji: string;
  marque?: string;
  scanne: true;
}

const toScannedAliment = (product: ScannedProduct): ScannedAliment => ({
  id: `scan-${product.barcode}`,
  nom: product.nom,
  categorie: product.categorie,
  ig: 'Inconnu',
  calories: product.calories,
  proteines: product.proteines,
  glucides: product.glucides,
  lipides: product.lipides,
  fibres: product.fibres,
  micronutriments: [],
  classe: 'Scanné',
  tags: product.marque ? [product.marque] : [],
  emoji: '📷',
  marque: product.marque,
  scanne: true,
});

// Aliments ajoutés via le scanner de code-barres — persistés en localStorage pour rester
// disponibles dans la liste après un scan, au lieu de disparaître à la navigation suivante.
export const useScannedAliments = () => {
  const [scannedAliments, setScannedAliments] = useState<ScannedAliment[]>(() => {
    try {
      const saved = localStorage.getItem(SCANNED_ALIMENTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(SCANNED_ALIMENTS_STORAGE_KEY, JSON.stringify(scannedAliments));
  }, [scannedAliments]);

  const addScannedProduct = useCallback((product: ScannedProduct) => {
    const aliment = toScannedAliment(product);
    setScannedAliments((prev) => {
      const withoutDuplicate = prev.filter((a) => a.id !== aliment.id);
      return [aliment, ...withoutDuplicate];
    });
    return aliment;
  }, []);

  const removeScannedAliment = useCallback((id: string) => {
    setScannedAliments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { scannedAliments, addScannedProduct, removeScannedAliment };
};

export default useScannedAliments;
