import { BlocExercice } from '@/types/programme';

const STORAGE_KEY = 'blocs_entrainement';

export interface SavedBlocEntrainement extends BlocExercice {
  id: string;
  dateCreation: string;
}

export const saveBlocEntrainement = (bloc: BlocExercice): SavedBlocEntrainement => {
  const savedBloc: SavedBlocEntrainement = {
    ...bloc,
    id: `bloc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    dateCreation: new Date().toISOString()
  };

  const existingBlocs = getSavedBlocsEntrainement();
  existingBlocs.push(savedBloc);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingBlocs));
  return savedBloc;
};

export const getSavedBlocsEntrainement = (): SavedBlocEntrainement[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des blocs d\'entraînement:', error);
    return [];
  }
};

export const deleteBlocEntrainement = (id: string): void => {
  const existingBlocs = getSavedBlocsEntrainement();
  const filteredBlocs = existingBlocs.filter(bloc => bloc.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBlocs));
};

// Fonction pour récupérer tous les blocs (sauvegardés + prédéfinis) pour la génération de programmes
export const getAllBlocsEntrainement = (): BlocExercice[] => {
  const savedBlocs = getSavedBlocsEntrainement();
  const { tousBlocs } = require('./blocsExercices');
  
  // Combiner les blocs sauvegardés et les blocs prédéfinis
  return [...tousBlocs, ...savedBlocs];
};