// Types pour le système de statistiques
export interface PerformanceRecord {
  id: string;
  userId: string;
  discipline: Discipline;
  value: number;
  units: string;
  date: Date;
  context?: string; // raw, equipped, etc.
  verified?: boolean;
}

export interface Discipline {
  id: string;
  name: string;
  category: 'force' | 'endurance' | 'explosivite' | 'calisthenics';
  units: string;
  isTimeBased?: boolean; // pour inverser le calcul (temps vs distance)
}

export interface StandardReference {
  discipline: string;
  sex: 'male' | 'female';
  weightCategory?: string;
  rankLevel: RankLevel;
  thresholdValue: number;
  source: string; // IPF, FFA, World Athletics, etc.
  ageGroup?: string;
}

export interface NormalizedScore {
  userId: string;
  discipline: string;
  date: Date;
  rawValue: number;
  normalizedScore: number; // 0-1000
  ipfPoints?: number;
  ageAdjusted?: boolean;
  weightAdjusted?: boolean;
}

export interface GlobalScore {
  userId: string;
  date: Date;
  globalScore: number; // 0-1000
  rank: RankLevel;
  breakdown: {
    force: number;
    endurance: number;
    explosivite: number;
    calisthenics: number;
  };
  profile: UserProfile;
}

export type RankLevel = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Nation' | 'World';

export interface UserProfile {
  id: string;
  name: string;
  weights: {
    force: number;
    endurance: number;
    explosivite: number;
    calisthenics: number;
  };
}

// Types pour le système XP et niveaux
export interface XPData {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  totalXP: number;
  streakBonus: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  category: 'workout' | 'nutrition' | 'activity' | 'social';
  icon: string;
  resetTime: Date;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  weeklyHistory: boolean[]; // 7 derniers jours
  streakBonus: number; // 0-100%
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'force' | 'endurance' | 'discipline' | 'special';
  unlocked: boolean;
  unlockedDate?: Date;
  progress: number;
  maxProgress: number;
  xpReward: number;
}

export interface MainStats {
  force: {
    total: number; // Total Wilks/IPF
    wilks: number;
    squat1RM: number;
    bench1RM: number;
    deadlift1RM: number;
    weeklyProgress: number;
    communityRank: string; // "Top 8% régional"
    evolution: number[]; // 4 dernières semaines
    performancePoints: number; // Points basés sur les performances réelles
    performanceLevel: string; // "Débutant", "Intermédiaire", "Avancé", "Expert"
  };
  speed: {
    time100m: number;
    time200m: number;
    maxSpeed: number; // km/h
    weeklyProgress: number;
    communityRank: string;
    evolution: number[];
    performancePoints: number; // Points basés sur les performances réelles
    performanceLevel: string; // "Débutant", "Intermédiaire", "Avancé", "Expert"
  };
  endurance: {
    vo2max: number;
    distance30min: number;
    marathonTime?: number;
    weeklyProgress: number;
    communityRank: string;
    evolution: number[];
    performancePoints: number; // Points basés sur les performances réelles
    performanceLevel: string; // "Débutant", "Intermédiaire", "Avancé", "Expert"
  };
}

export interface GlobalStats {
  totalSessions: number;
  totalVolume: number; // kg soulevés
  totalDistance: number; // km
  totalCalories: number;
  evolution: {
    sessions: number; // +6%
    volume: number; // +3%
    distance: number; // +9%
    calories: number; // +4%
  };
} 