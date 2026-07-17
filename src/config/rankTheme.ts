// Palette de couleurs par rang — pilote à la fois le badge et la teinte globale de l'app
export type RankLevel = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Nation' | 'World';

export interface RankColorPair {
  primary: string;
  secondary: string;
}

export const RANK_COLORS: Record<RankLevel, RankColorPair> = {
  E: { primary: '#6B7280', secondary: '#9CA3AF' },
  D: { primary: '#B87333', secondary: '#CD7F32' },
  C: { primary: '#4A90C4', secondary: '#7EC8E3' },
  B: { primary: '#0090C2', secondary: '#00C2FF' },
  A: { primary: '#7C8BA3', secondary: '#B8C4D9' },
  S: { primary: '#E0263D', secondary: '#FF4D4D' },
  Nation: { primary: '#6B2AFF', secondary: '#00C2FF' },
  World: { primary: '#FFA500', secondary: '#FFD700' },
};

export const getRankColors = (rank: string | undefined): RankColorPair =>
  RANK_COLORS[rank as RankLevel] || RANK_COLORS.D;
