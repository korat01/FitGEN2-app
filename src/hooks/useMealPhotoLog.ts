import { useCallback, useEffect, useState } from 'react';

const MEAL_PHOTO_LOG_STORAGE_KEY = 'mealPhotoLog';

export interface MealPhotoEntry {
  id: string;
  imageDataUrl: string;
  nom: string;
  calories?: number;
  proteines?: number;
  glucides?: number;
  lipides?: number;
  date: string;
}

// Journal photo des repas — PAS d'estimation automatique (aucune IA de vision branchée sur ce
// projet 100% front-end, une clé d'API ne peut pas être planquée côté client en sécurité). C'est un
// simple aide-mémoire visuel : la photo, plus des valeurs saisies à la main si l'utilisateur les connaît.
export const useMealPhotoLog = () => {
  const [entries, setEntries] = useState<MealPhotoEntry[]>(() => {
    try {
      const saved = localStorage.getItem(MEAL_PHOTO_LOG_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(MEAL_PHOTO_LOG_STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Le quota localStorage peut être dépassé si trop de photos volumineuses sont stockées —
      // dans ce cas on abandonne silencieusement la sauvegarde plutôt que de faire planter l'app.
    }
  }, [entries]);

  const addEntry = useCallback((entry: Omit<MealPhotoEntry, 'id' | 'date'>) => {
    const newEntry: MealPhotoEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    return newEntry;
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { entries, addEntry, removeEntry };
};

export default useMealPhotoLog;
