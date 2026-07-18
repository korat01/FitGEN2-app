import { useCallback, useEffect, useState } from 'react';

const FAVORITES_STORAGE_KEY = 'nutritionFavorites';

// Favoris partagés (aliments ET repas, même clé/même liste d'ids) entre la page Nutrition et les
// pages de détail — avant ça, chaque page gérait son propre état local non persisté, donc favoriser
// un aliment depuis sa fiche détail ne se reflétait jamais dans la liste, et se perdait à la navigation.
export const useNutritionFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]));
  }, []);

  return { favorites, isFavorite, toggleFavorite };
};

export default useNutritionFavorites;
