// Palette de couleurs par rang — pilote à la fois le badge et la teinte globale de l'app
export type RankLevel = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Nation' | 'World';

export interface RankColorPair {
  primary: string;
  secondary: string;
}

// Palette pensée pour escalader visuellement avec le rang : chaque palier doit se sentir plus
// "premium" que le précédent (E terne -> World éclatant), donc A (platine) est volontairement plus
// lumineux que B (cyan) au lieu d'un bleu-gris plus terne qui le faisait paraître en retrait.
export const RANK_COLORS: Record<RankLevel, RankColorPair> = {
  E: { primary: '#6B7280', secondary: '#9CA3AF' },
  D: { primary: '#B87333', secondary: '#CD7F32' },
  C: { primary: '#4A90C4', secondary: '#7EC8E3' },
  B: { primary: '#0090C2', secondary: '#00C2FF' },
  A: { primary: '#A9B8CC', secondary: '#F0F5FF' },
  S: { primary: '#E0263D', secondary: '#FF4D4D' },
  Nation: { primary: '#6B2AFF', secondary: '#00C2FF' },
  // World a une aura "shadow-flame" (fumée noire, flammes sombres, cœur bleu glacé — voir
  // RankBadgeAura) : la teinte pilotant la lumière/glow doit rester sombre et froide, pas dorée,
  // sinon le halo ambiant contredit visuellement les particules du rang le plus élevé.
  World: { primary: '#1B1B24', secondary: '#8FE9FF' },
};

export const getRankColors = (rank: string | undefined): RankColorPair =>
  RANK_COLORS[rank as RankLevel] || RANK_COLORS.D;
