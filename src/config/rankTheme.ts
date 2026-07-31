// Palette de couleurs par rang — pilote à la fois le badge et la teinte globale de l'app
export type RankLevel = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Nation' | 'World';

export interface RankColorPair {
  primary: string;
  secondary: string;
}

// Chaque paire est calée sur les couleurs RÉELLEMENT présentes dans l'illustration du badge
// (src/assets/ranks/*.png), pas sur une logique abstraite de progression — sinon le halo CSS
// jure avec l'image qu'il entoure. Vérifié visuellement badge par badge :
//   E = pierre grise fissurée · D = bronze + braises orange qui couvent · C = médaille argent
//   + liseré néon bleu · B = losange or et flammes orange-doré · A = guerrier platine + éclairs
//   bleu électrique vif (PAS un bleu-blanc délavé) · S = triangle noir + dragon/éclairs rouges
//   Nation = bête violette + couronne or, AUCUN cyan dans l'image · World = noir + cristaux/fumée
//   bleu glacé.
export const RANK_COLORS: Record<RankLevel, RankColorPair> = {
  E: { primary: '#6B7280', secondary: '#9CA3AF' },
  D: { primary: '#B87333', secondary: '#FF8C42' },
  C: { primary: '#4A90C4', secondary: '#7EC8E3' },
  // Or "vrai", pas brun : une teinte or pleinement saturée mais sous 50% de luminosité (l'ancien
  // #E08E00) se perçoit comme marron à l'œil — primary reste donc un or métallique ≥ 50% de
  // luminosité, secondary l'or vif classique.
  B: { primary: '#D4AF37', secondary: '#FFD700' },
  // Bleu électrique pleinement saturé (100%), pas un platine délavé — poussé plus vif/plus
  // saturé sur demande explicite.
  A: { primary: '#1B5FFF', secondary: '#00E1FF' },
  S: { primary: '#E0263D', secondary: '#FF4D4D' },
  Nation: { primary: '#6B2AFF', secondary: '#C084FC' },
  // World a une aura "shadow-flame" (fumée noire, flammes sombres, cœur bleu glacé — voir
  // RankBadgeAura) : la teinte pilotant la lumière/glow doit rester sombre et froide, pas dorée,
  // sinon le halo ambiant contredit visuellement les particules du rang le plus élevé.
  World: { primary: '#1B1B24', secondary: '#8FE9FF' },
};

export const getRankColors = (rank: string | undefined): RankColorPair =>
  RANK_COLORS[rank as RankLevel] || RANK_COLORS.D;
