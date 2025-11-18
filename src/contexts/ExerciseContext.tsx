import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuests } from './QuestContext';
import { SoundManager } from '../utils/sounds';

interface ExerciseValidation {
  exerciseId: string;
  sessionId: string;
  date: string;
  success: boolean;
  xp: number;
}

interface XPData {
  currentXP: number;
  totalXP: number;
  level: number;
  xpToNextLevel: number;
}

interface ExerciseContextType {
  validations: ExerciseValidation[];
  xpData: XPData;
  addValidation: (exerciseId: string, sessionId: string, success: boolean) => void;
  getSessionStatus: (sessionId: string, date: string) => 'completed' | 'partial' | 'failed' | 'not-started';
  getExerciseStatus: (exerciseId: string, sessionId: string, date: string) => 'success' | 'failed' | 'not-completed';
  getSessionXP: (sessionId: string, date: string) => number;
  getTotalSessionXP: (sessionId: string, date: string) => number;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const useExerciseValidation = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExerciseValidation must be used within an ExerciseProvider');
  }
  return context;
};

interface ExerciseProviderProps {
  children: React.ReactNode;
}

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({ children }) => {
  const [validations, setValidations] = useState<ExerciseValidation[]>([]);
  const [xpData, setXpData] = useState<XPData>({
    currentXP: 0,
    totalXP: 0,
    level: 1,
    xpToNextLevel: 100
  });
  
  // Hook pour les quêtes (sera disponible via le QuestProvider parent)
  let questsContext: any = null;
  try {
    questsContext = useQuests();
  } catch (error) {
    // Le QuestProvider n'est pas encore disponible, on continue sans
  }

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedValidations = localStorage.getItem('exerciseValidations');
    const savedXP = localStorage.getItem('xpData');
    
    if (savedValidations) {
      try {
        setValidations(JSON.parse(savedValidations));
      } catch (error) {
        console.error('Erreur lors du chargement des validations:', error);
      }
    }
    
    if (savedXP) {
      try {
        setXpData(JSON.parse(savedXP));
      } catch (error) {
        console.error('Erreur lors du chargement des données XP:', error);
      }
    }
  }, []);

  // Sauvegarder les validations
  useEffect(() => {
    localStorage.setItem('exerciseValidations', JSON.stringify(validations));
  }, [validations]);

  // Sauvegarder les données XP
  useEffect(() => {
    localStorage.setItem('xpData', JSON.stringify(xpData));
  }, [xpData]);

  const addValidation = (exerciseId: string, sessionId: string, success: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const xp = success ? 50 : 10;
    
    const newValidation: ExerciseValidation = {
      exerciseId,
      sessionId,
      date: today,
      success,
      xp
    };

    setValidations(prev => {
      // Supprimer l'ancienne validation pour le même exercice le même jour
      const filtered = prev.filter(v => 
        !(v.exerciseId === exerciseId && v.sessionId === sessionId && v.date === today)
      );
      return [...filtered, newValidation];
    });

    // Mettre à jour l'XP
    setXpData(prev => {
      const newTotalXP = prev.totalXP + xp;
      let newCurrentXP = prev.currentXP + xp;
      
      // Calculer le niveau
      let newLevel = prev.level;
      let newXPToNextLevel = prev.xpToNextLevel;
      
      if (newCurrentXP >= prev.xpToNextLevel) {
        newLevel += 1;
        newCurrentXP = newCurrentXP - prev.xpToNextLevel;
        newXPToNextLevel = newLevel * 100; // 100 XP par niveau
        
        // Jouer le son de level-up
        const soundManager = SoundManager.getInstance();
        soundManager.playNotification();
      }
      
      return {
        currentXP: newCurrentXP,
        totalXP: newTotalXP,
        level: newLevel,
        xpToNextLevel: newXPToNextLevel
      };
    });

    // Mettre à jour les quêtes si le contexte est disponible
    if (questsContext) {
      // Progression des quêtes d'exercices
      questsContext.addQuestProgress('exercise', 1);
      
      // Progression des quêtes d'XP
      questsContext.addQuestProgress('xp', xp);
      
      // Vérifier si c'est un exercice réussi pour les quêtes de session
      if (success) {
        questsContext.addQuestProgress('session', 1);
      }
    }
  };

  const getSessionStatus = (sessionId: string, date: string): 'completed' | 'partial' | 'failed' | 'not-started' => {
    const sessionValidations = validations.filter(v => v.sessionId === sessionId && v.date === date);
    
    if (sessionValidations.length === 0) return 'not-started';
    
    const successCount = sessionValidations.filter(v => v.success).length;
    const totalCount = sessionValidations.length;
    
    if (successCount === totalCount && totalCount > 0) return 'completed';
    if (successCount === 0 && totalCount > 0) return 'failed';
    return 'partial';
  };

  const getExerciseStatus = (exerciseId: string, sessionId: string, date: string): 'success' | 'failed' | 'not-completed' => {
    const validation = validations.find(v => 
      v.exerciseId === exerciseId && v.sessionId === sessionId && v.date === date
    );
    
    if (!validation) return 'not-completed';
    return validation.success ? 'success' : 'failed';
  };

  const getSessionXP = (sessionId: string, date: string): number => {
    const sessionValidations = validations.filter(v => v.sessionId === sessionId && v.date === date);
    return sessionValidations.reduce((total, v) => total + v.xp, 0);
  };

  const getTotalSessionXP = (sessionId: string, date: string): number => {
    // Calculer l'XP total possible pour cette session (supposons 3 exercices par session)
    const sessionValidations = validations.filter(v => v.sessionId === sessionId && v.date === date);
    const completedExercises = sessionValidations.length;
    const totalPossibleExercises = 3; // À adapter selon votre logique
    
    return completedExercises * 50; // XP maximum possible
  };

  const value: ExerciseContextType = {
    validations,
    xpData,
    addValidation,
    getSessionStatus,
    getExerciseStatus,
    getSessionXP,
    getTotalSessionXP
  };

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};
