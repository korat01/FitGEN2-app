import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour les quêtes
export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'exercise' | 'xp' | 'session' | 'streak' | 'time' | 'weight';
  target: number;
  current: number;
  reward: {
    xp: number;
    badge?: string;
    title?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'daily' | 'weekly' | 'special';
  completed: boolean;
  expiresAt: string; // ISO date
  createdAt: string;
}

export interface QuestProgress {
  questId: string;
  progress: number;
  completedAt?: string;
}

export interface QuestContextType {
  dailyQuests: Quest[];
  weeklyQuests: Quest[];
  specialQuests: Quest[];
  completedQuests: Quest[];
  questProgress: QuestProgress[];
  addQuestProgress: (questId: string, progress: number) => void;
  completeQuest: (questId: string) => void;
  generateDailyQuests: () => void;
  generateWeeklyQuests: () => void;
  getQuestReward: (questId: string) => Quest['reward'] | null;
  getTotalDailyXP: () => number;
  getQuestCompletionRate: () => number;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

// Templates de quêtes par type
const QUEST_TEMPLATES = {
  exercise: [
    {
      title: "🏋️ Maître des Exercices",
      description: "Complétez {target} exercices aujourd'hui",
      difficulty: 'easy' as const,
      rewards: { xp: 50, badge: "exercise-master" }
    },
    {
      title: "💪 Défi Intensité",
      description: "Terminez {target} exercices avec succès",
      difficulty: 'medium' as const,
      rewards: { xp: 100, badge: "intensity-warrior" }
    },
    {
      title: "🔥 Marathon d'Exercices",
      description: "Réussissez {target} exercices consécutifs",
      difficulty: 'hard' as const,
      rewards: { xp: 200, badge: "exercise-marathon" }
    }
  ],
  xp: [
    {
      title: "⭐ Collecteur d'XP",
      description: "Gagnez {target} XP aujourd'hui",
      difficulty: 'easy' as const,
      rewards: { xp: 75, badge: "xp-collector" }
    },
    {
      title: "🚀 Boost d'Expérience",
      description: "Accumulez {target} XP en une session",
      difficulty: 'medium' as const,
      rewards: { xp: 150, badge: "xp-booster" }
    },
    {
      title: "💎 Mineur d'XP",
      description: "Récoltez {target} XP total",
      difficulty: 'hard' as const,
      rewards: { xp: 300, badge: "xp-miner" }
    }
  ],
  session: [
    {
      title: "📅 Régularité",
      description: "Complétez votre session d'aujourd'hui",
      difficulty: 'easy' as const,
      rewards: { xp: 100, badge: "consistency" }
    },
    {
      title: "🎯 Session Parfaite",
      description: "Terminez une session sans échec",
      difficulty: 'medium' as const,
      rewards: { xp: 200, badge: "perfect-session" }
    },
    {
      title: "⚡ Session Express",
      description: "Complétez votre session en moins de {target} minutes",
      difficulty: 'hard' as const,
      rewards: { xp: 250, badge: "speed-demon" }
    }
  ],
  streak: [
    {
      title: "🔥 Série de Feu",
      description: "Maintenez une série de {target} jours",
      difficulty: 'easy' as const,
      rewards: { xp: 150, badge: "fire-streak" }
    },
    {
      title: "💪 Détermination",
      description: "Entraînez-vous {target} jours consécutifs",
      difficulty: 'medium' as const,
      rewards: { xp: 300, badge: "determination" }
    },
    {
      title: "🏆 Légende",
      description: "Atteignez {target} jours d'entraînement",
      difficulty: 'hard' as const,
      rewards: { xp: 500, badge: "legend" }
    }
  ],
  time: [
    {
      title: "⏰ Chronomètre",
      description: "Entraînez-vous pendant {target} minutes",
      difficulty: 'easy' as const,
      rewards: { xp: 80, badge: "time-keeper" }
    },
    {
      title: "🕐 Marathon Temporel",
      description: "Cumulez {target} minutes d'entraînement",
      difficulty: 'medium' as const,
      rewards: { xp: 180, badge: "time-marathon" }
    },
    {
      title: "⏳ Maître du Temps",
      description: "Dépassez {target} minutes en une session",
      difficulty: 'hard' as const,
      rewards: { xp: 350, badge: "time-master" }
    }
  ],
  weight: [
    {
      title: "🏋️ Charge Légère",
      description: "Soulevez un total de {target}kg",
      difficulty: 'easy' as const,
      rewards: { xp: 120, badge: "weight-lifter" }
    },
    {
      title: "💪 Défi de Force",
      description: "Cumulez {target}kg en une session",
      difficulty: 'medium' as const,
      rewards: { xp: 250, badge: "strength-challenge" }
    },
    {
      title: "🔥 Titan",
      description: "Atteignez {target}kg total",
      difficulty: 'hard' as const,
      rewards: { xp: 400, badge: "titan" }
    }
  ]
};

export const QuestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dailyQuests, setDailyQuests] = useState<Quest[]>([]);
  const [weeklyQuests, setWeeklyQuests] = useState<Quest[]>([]);
  const [specialQuests, setSpecialQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([]);
  const [questProgress, setQuestProgress] = useState<QuestProgress[]>([]);

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedDailyQuests = localStorage.getItem('dailyQuests');
    const savedWeeklyQuests = localStorage.getItem('weeklyQuests');
    const savedCompletedQuests = localStorage.getItem('completedQuests');
    const savedQuestProgress = localStorage.getItem('questProgress');

    if (savedDailyQuests) {
      setDailyQuests(JSON.parse(savedDailyQuests));
    } else {
      generateDailyQuests();
    }

    if (savedWeeklyQuests) {
      setWeeklyQuests(JSON.parse(savedWeeklyQuests));
    } else {
      generateWeeklyQuests();
    }

    if (savedCompletedQuests) {
      setCompletedQuests(JSON.parse(savedCompletedQuests));
    }

    if (savedQuestProgress) {
      setQuestProgress(JSON.parse(savedQuestProgress));
    }
  }, []);

  // Sauvegarder les données
  useEffect(() => {
    localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
  }, [dailyQuests]);

  useEffect(() => {
    localStorage.setItem('weeklyQuests', JSON.stringify(weeklyQuests));
  }, [weeklyQuests]);

  useEffect(() => {
    localStorage.setItem('completedQuests', JSON.stringify(completedQuests));
  }, [completedQuests]);

  useEffect(() => {
    localStorage.setItem('questProgress', JSON.stringify(questProgress));
  }, [questProgress]);

  // Générer des quêtes quotidiennes
  const generateDailyQuests = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const questTypes: (keyof typeof QUEST_TEMPLATES)[] = ['exercise', 'xp', 'session', 'time'];
    const newQuests: Quest[] = [];

    // Générer 3 quêtes quotidiennes
    for (let i = 0; i < 3; i++) {
      const questType = questTypes[i];
      const templates = QUEST_TEMPLATES[questType];
      const template = templates[Math.floor(Math.random() * templates.length)];
      
      // Définir les cibles selon la difficulté
      let target = 0;
      switch (questType) {
        case 'exercise':
          target = template.difficulty === 'easy' ? 5 : template.difficulty === 'medium' ? 8 : 12;
          break;
        case 'xp':
          target = template.difficulty === 'easy' ? 100 : template.difficulty === 'medium' ? 200 : 400;
          break;
        case 'session':
          target = template.difficulty === 'easy' ? 1 : template.difficulty === 'medium' ? 1 : 1;
          break;
        case 'time':
          target = template.difficulty === 'easy' ? 30 : template.difficulty === 'medium' ? 60 : 90;
          break;
      }

      const quest: Quest = {
        id: `daily-${Date.now()}-${i}`,
        title: template.title,
        description: template.description.replace('{target}', target.toString()),
        type: questType,
        target,
        current: 0,
        reward: template.rewards,
        difficulty: template.difficulty,
        category: 'daily',
        completed: false,
        expiresAt: tomorrow.toISOString(),
        createdAt: today.toISOString()
      };

      newQuests.push(quest);
    }

    setDailyQuests(newQuests);
  };

  // Générer des quêtes hebdomadaires
  const generateWeeklyQuests = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(0, 0, 0, 0);

    const questTypes: (keyof typeof QUEST_TEMPLATES)[] = ['streak', 'weight', 'xp'];
    const newQuests: Quest[] = [];

    // Générer 2 quêtes hebdomadaires
    for (let i = 0; i < 2; i++) {
      const questType = questTypes[i];
      const templates = QUEST_TEMPLATES[questType];
      const template = templates[Math.floor(Math.random() * templates.length)];
      
      let target = 0;
      switch (questType) {
        case 'streak':
          target = template.difficulty === 'easy' ? 3 : template.difficulty === 'medium' ? 5 : 7;
          break;
        case 'weight':
          target = template.difficulty === 'easy' ? 1000 : template.difficulty === 'medium' ? 2000 : 5000;
          break;
        case 'xp':
          target = template.difficulty === 'easy' ? 500 : template.difficulty === 'medium' ? 1000 : 2000;
          break;
      }

      const quest: Quest = {
        id: `weekly-${Date.now()}-${i}`,
        title: template.title,
        description: template.description.replace('{target}', target.toString()),
        type: questType,
        target,
        current: 0,
        reward: template.rewards,
        difficulty: template.difficulty,
        category: 'weekly',
        completed: false,
        expiresAt: nextWeek.toISOString(),
        createdAt: today.toISOString()
      };

      newQuests.push(quest);
    }

    setWeeklyQuests(newQuests);
  };

  // Ajouter du progrès à une quête
  const addQuestProgress = (questId: string, progress: number) => {
    setQuestProgress(prev => {
      const existing = prev.find(p => p.questId === questId);
      if (existing) {
        return prev.map(p => 
          p.questId === questId 
            ? { ...p, progress: Math.min(p.progress + progress, getQuestTarget(questId)) }
            : p
        );
      } else {
        return [...prev, { questId, progress: Math.min(progress, getQuestTarget(questId)) }];
      }
    });

    // Mettre à jour les quêtes
    updateQuestCurrent(questId, progress);
  };

  // Mettre à jour le progrès actuel d'une quête
  const updateQuestCurrent = (questId: string, progress: number) => {
    const allQuests = [...dailyQuests, ...weeklyQuests, ...specialQuests];
    const quest = allQuests.find(q => q.id === questId);
    
    if (quest) {
      const newCurrent = Math.min(quest.current + progress, quest.target);
      
      if (quest.category === 'daily') {
        setDailyQuests(prev => prev.map(q => 
          q.id === questId ? { ...q, current: newCurrent } : q
        ));
      } else if (quest.category === 'weekly') {
        setWeeklyQuests(prev => prev.map(q => 
          q.id === questId ? { ...q, current: newCurrent } : q
        ));
      } else {
        setSpecialQuests(prev => prev.map(q => 
          q.id === questId ? { ...q, current: newCurrent } : q
        ));
      }
    }
  };

  // Obtenir la cible d'une quête
  const getQuestTarget = (questId: string): number => {
    const allQuests = [...dailyQuests, ...weeklyQuests, ...specialQuests];
    const quest = allQuests.find(q => q.id === questId);
    return quest?.target || 0;
  };

  // Compléter une quête
  const completeQuest = (questId: string) => {
    const allQuests = [...dailyQuests, ...weeklyQuests, ...specialQuests];
    const quest = allQuests.find(q => q.id === questId);
    
    if (quest && quest.current >= quest.target) {
      const completedQuest = { ...quest, completed: true };
      
      setCompletedQuests(prev => [...prev, completedQuest]);
      
      // Retirer de la liste active
      if (quest.category === 'daily') {
        setDailyQuests(prev => prev.filter(q => q.id !== questId));
      } else if (quest.category === 'weekly') {
        setWeeklyQuests(prev => prev.filter(q => q.id !== questId));
      } else {
        setSpecialQuests(prev => prev.filter(q => q.id !== questId));
      }

      // Marquer comme complétée dans le progrès
      setQuestProgress(prev => prev.map(p => 
        p.questId === questId 
          ? { ...p, completedAt: new Date().toISOString() }
          : p
      ));
    }
  };

  // Obtenir la récompense d'une quête
  const getQuestReward = (questId: string): Quest['reward'] | null => {
    const allQuests = [...dailyQuests, ...weeklyQuests, ...specialQuests, ...completedQuests];
    const quest = allQuests.find(q => q.id === questId);
    return quest?.reward || null;
  };

  // Obtenir l'XP total des quêtes quotidiennes
  const getTotalDailyXP = (): number => {
    return dailyQuests.reduce((total, quest) => {
      if (quest.completed) {
        return total + quest.reward.xp;
      }
      return total;
    }, 0);
  };

  // Obtenir le taux de completion des quêtes
  const getQuestCompletionRate = (): number => {
    const allActiveQuests = [...dailyQuests, ...weeklyQuests, ...specialQuests];
    const completedCount = allActiveQuests.filter(q => q.completed).length;
    return allActiveQuests.length > 0 ? (completedCount / allActiveQuests.length) * 100 : 0;
  };

  return (
    <QuestContext.Provider
      value={{
        dailyQuests,
        weeklyQuests,
        specialQuests,
        completedQuests,
        questProgress,
        addQuestProgress,
        completeQuest,
        generateDailyQuests,
        generateWeeklyQuests,
        getQuestReward,
        getTotalDailyXP,
        getQuestCompletionRate
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

export const useQuests = () => {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error('useQuests must be used within a QuestProvider');
  }
  return context;
};
