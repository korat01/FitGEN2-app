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