import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useQuests } from './QuestContext';
import { SoundManager } from '../utils/sounds';
import { getTodayLocalKey } from '../utils/weeklyProgress';

interface ExerciseValidation {
  exerciseId: string;
  sessionId: string;
  date: string;
  success: boolean;
  xp: number;
}

interface SessionDifficultyRating {
  sessionId: string;
  date: string;
  rpe: number; // 1 (très facile) à 10 (hardcore)
}

interface XPData {
  currentXP: number;
  totalXP: number;
  level: number;
  xpToNextLevel: number;
}

interface ExerciseContextType {
  validations: ExerciseValidation[];
  sessionRatings: SessionDifficultyRating[];
  xpData: XPData;
  addValidation: (exerciseId: string, sessionId: string, success: boolean) => void;
  getSessionStatus: (sessionId: string, date: string) => 'completed' | 'partial' | 'failed' | 'not-started';
  getExerciseStatus: (exerciseId: string, sessionId: string, date: string) => 'success' | 'failed' | 'not-completed';
  getSessionXP: (sessionId: string, date: string) => number;
  getTotalSessionXP: (sessionId: string, date: string) => number;
  addSessionRating: (sessionId: string, rpe: number) => void;
  getSessionRating: (sessionId: string) => number | null;
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
  const [sessionRatings, setSessionRatings] = useState<SessionDifficultyRating[]>([]);
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
    const savedRatings = localStorage.getItem('sessionDifficultyRatings');
    const savedXP = localStorage.getItem('xpData');

    if (savedValidations) {
      try {
        setValidations(JSON.parse(savedValidations));
      } catch (error) {
        console.error('Erreur lors du chargement des validations:', error);
      }
    }

    if (savedRatings) {
      try {
        setSessionRatings(JSON.parse(savedRatings));
      } catch (error) {
        console.error('Erreur lors du chargement des notes de difficulté:', error);
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

  // Sauvegarder les notes de difficulté (RPE) par séance
  useEffect(() => {
    localStorage.setItem('sessionDifficultyRatings', JSON.stringify(sessionRatings));
  }, [sessionRatings]);

  // Sauvegarder les données XP
  useEffect(() => {
    localStorage.setItem('xpData', JSON.stringify(xpData));
  }, [xpData]);

  const addValidation = useCallback((exerciseId: string, sessionId: string, success: boolean) => {
    const today = getTodayLocalKey();
    const xp = success ? 50 : 10;
    
    const newValidation: ExerciseValidation = {
      exerciseId,
      sessionId,
      date: today,
      success,
      xp
    };

    setValidations(prev => {
      const filtered = prev.filter(v => 
        !(v.exerciseId === exerciseId && v.sessionId === sessionId && v.date === today)
      );
      return [...filtered, newValidation];
    });

    setXpData(prev => {
      const newTotalXP = prev.totalXP + xp;
      let newCurrentXP = prev.currentXP + xp;
      
      let newLevel = prev.level;
      let newXPToNextLevel = prev.xpToNextLevel;
      
      if (newCurrentXP >= prev.xpToNextLevel) {
        newLevel += 1;
        newCurrentXP = newCurrentXP - prev.xpToNextLevel;
        newXPToNextLevel = newLevel * 100;
        
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

    if (questsContext) {
      questsContext.addQuestProgress('exercise', 1);
      questsContext.addQuestProgress('xp', xp);
      if (success) {
        questsContext.addQuestProgress('session', 1);
      }
    }
  }, [questsContext]);

  const getSessionStatus = useCallback((sessionId: string, date: string): 'completed' | 'partial' | 'failed' | 'not-started' => {
    const sessionValidations = validations.filter(v => v.sessionId === sessionId && v.date === date);
    
    if (sessionValidations.length === 0) return 'not-started';
    
    const successCount = sessionValidations.filter(v => v.success).length;
    const totalCount = sessionValidations.length;
    
    if (successCount === totalCount && totalCount > 0) return 'completed';
    if (successCount === 0 && totalCount > 0) return 'failed';
    return 'partial';
  }, [validations]);

  const getExerciseStatus = useCallback((exerciseId: string, sessionId: string, date: string): 'success' | 'failed' | 'not-completed' => {
    const validation = validations.find(v => 
      v.exerciseId === exerciseId && v.sessionId === sessionId && v.date === date
    );
    
    if (!validation) return 'not-completed';
    return validation.success ? 'success' : 'failed';
  }, [validations]);

  const getSessionXP = useCallback((sessionId: string, date: string): number => {
    const sessionValidations = validations.filter(v => v.sessionId === sessionId && v.date === date);
    return sessionValidations.reduce((total, v) => total + v.xp, 0);
  }, [validations]);

  const getTotalSessionXP = useCallback((sessionId: string, date: string): number => {
    const sessionValidations = validations.filter(v => v.sessionId === sessionId && v.date === date);
    const completedExercises = sessionValidations.length;
    return completedExercises * 50;
  }, [validations]);

  const addSessionRating = useCallback((sessionId: string, rpe: number) => {
    const today = getTodayLocalKey();
    const clamped = Math.max(1, Math.min(10, Math.round(rpe)));

    setSessionRatings(prev => {
      const filtered = prev.filter(r => !(r.sessionId === sessionId && r.date === today));
      return [...filtered, { sessionId, date: today, rpe: clamped }];
    });
  }, []);

  const getSessionRating = useCallback((sessionId: string): number | null => {
    // Une séance n'est notée qu'une fois : peu importe la date exacte, on cherche par id de séance.
    const rating = sessionRatings.find(r => r.sessionId === sessionId);
    return rating ? rating.rpe : null;
  }, [sessionRatings]);

  const value = useMemo<ExerciseContextType>(() => ({
    validations,
    sessionRatings,
    xpData,
    addValidation,
    getSessionStatus,
    getExerciseStatus,
    getSessionXP,
    getTotalSessionXP,
    addSessionRating,
    getSessionRating
  }), [
    validations,
    sessionRatings,
    xpData,
    addValidation,
    getSessionStatus,
    getExerciseStatus,
    getSessionXP,
    getTotalSessionXP,
    addSessionRating,
    getSessionRating
  ]);

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};
