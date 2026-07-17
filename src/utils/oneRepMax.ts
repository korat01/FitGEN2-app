// Calculateur de 1RM (charge maximale théorique sur une répétition) — formules Epley et Brzycki,
// standards du milieu (utilisées par la quasi-totalité des calculateurs 1RM : Epley = poids × (1 +
// reps/30), Brzycki = poids × 36 / (37 - reps)). Les deux formules concordent bien entre 1 et ~5
// répétitions et divergent au-delà (Epley a tendance à surestimer, Brzycki à sous-estimer sur les
// séries à hautes reps) — d'où l'estimation par défaut basée sur leur moyenne, plus robuste qu'une
// seule formule, et le plafond à 12 reps au-delà duquel toute estimation devient peu fiable.
export const MAX_RELIABLE_REPS = 12;

export const roundToPlates = (weight: number): number => Math.max(0, Math.round(weight / 2.5) * 2.5);

export const epley1RM = (weight: number, reps: number): number => {
  if (reps <= 1) return weight;
  return weight * (1 + reps / 30);
};

export const brzycki1RM = (weight: number, reps: number): number => {
  if (reps <= 1) return weight;
  if (reps >= 37) return weight; // formule invalide au-delà (dénominateur négatif)
  return weight * (36 / (37 - reps));
};

export interface OneRepMaxEstimate {
  epley: number;
  brzycki: number;
  average: number;
}

// Estime le 1RM à partir d'une série (poids soulevé + reps effectuées), arrondi au 0.5kg près.
export const estimateOneRepMax = (weight: number, reps: number): OneRepMaxEstimate => {
  const clampedReps = Math.max(1, Math.min(reps, MAX_RELIABLE_REPS));
  const epley = Math.round(epley1RM(weight, clampedReps) * 2) / 2;
  const brzycki = Math.round(brzycki1RM(weight, clampedReps) * 2) / 2;
  const average = Math.round(((epley + brzycki) / 2) * 2) / 2;
  return { epley, brzycki, average };
};

// Table RPE -> %1RM (Mike Tuchscherer / Reactive Training Systems), la référence utilisée par
// pratiquement tous les calculateurs 1RM sérieux en powerlifting. Contrairement à Epley/Brzycki (qui
// supposent implicitement une série poussée jusqu'à l'échec), cette table tient compte du nombre de
// répétitions qu'il restait "en réserve" (RPE 10 = échec, RPE 9 = 1 rep en réserve, RPE 8 = 2, etc.),
// ce qui donne une estimation bien plus fiable quand la série n'était pas un vrai effort maximal.
// Clé = RPE (6 à 10 par pas de 0.5), valeurs = %1RM pour 1 à 12 répétitions.
const RPE_TABLE: Record<string, number[]> = {
  '10': [100.0, 95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0],
  '9.5': [97.8, 93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7],
  '9': [95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3],
  '8.5': [93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0],
  '8': [92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6],
  '7.5': [90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0, 61.3],
  '7': [89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6, 59.9],
  '6.5': [87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0, 61.3, 58.6],
  '6': [86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6, 59.9, 57.4],
};

// La table "officielle" RTS ne couvre que RPE 6 à 10 : en dessous de 6 répétitions en réserve, le
// ressenti ne correlate plus assez précisément avec un %1RM pour qu'un tableau ait un sens (une série
// d'échauffement à vide peut être "RPE 1" que le 1RM fasse 80kg ou 200kg). On garde 1 à 10 sur
// l'échelle affichée (c'est l'échelle RPE standard, les utilisateurs s'attendent à la voir en entier),
// mais on extrapole linéairement en dessous de 6 à partir de la pente réelle (6.5 → 6) de la table, et
// on signale que l'estimation devient indicative au-delà de ce seuil.
export const RPE_RELIABLE_MIN = 6;
export const MIN_RPE = 1;
export const MAX_RPE = 10;

const pctForRpeAndReps = (rpe: number, repsIdx: number): number => {
  if (rpe >= RPE_RELIABLE_MIN) return RPE_TABLE[String(rpe)][repsIdx];

  const slope = RPE_TABLE['6.5'][repsIdx] - RPE_TABLE['6'][repsIdx];
  const stepsBelowSix = (RPE_RELIABLE_MIN - rpe) / 0.5;
  const extrapolated = RPE_TABLE[String(RPE_RELIABLE_MIN)][repsIdx] - slope * stepsBelowSix;
  return Math.max(extrapolated, 20); // plancher de sécurité : évite un 1RM extrapolé absurde
};

export interface RpeEstimate {
  oneRepMax: number;
  pctUsed: number;
  /** false quand le RPE est en dessous de la table de référence (< 6) : estimation indicative seulement. */
  reliable: boolean;
}

// Estime le 1RM à partir d'une série + son RPE déclaré (à quel point c'était dur). Plus précis que
// Epley/Brzycki dès que la série n'était pas un effort maximal (RPE < 10).
export const estimateOneRepMaxFromRPE = (weight: number, reps: number, rpe: number): RpeEstimate => {
  const clampedReps = Math.max(1, Math.min(Math.round(reps), MAX_RELIABLE_REPS));
  const clampedRpe = Math.max(MIN_RPE, Math.min(Math.round(rpe * 2) / 2, MAX_RPE));
  const pctUsed = Math.round(pctForRpeAndReps(clampedRpe, clampedReps - 1) * 10) / 10;
  const oneRepMax = Math.round((weight / (pctUsed / 100)) * 2) / 2;
  return { oneRepMax, pctUsed, reliable: clampedRpe >= RPE_RELIABLE_MIN };
};

export interface PercentageRow {
  pct: number;
  weight: number;
  /** Zone d'entraînement usuelle pour ce %1RM, à titre indicatif. */
  zone: 'Max/Compétition' | 'Force' | 'Force-Volume' | 'Volume' | 'Technique';
}

const zoneForPct = (pct: number): PercentageRow['zone'] => {
  if (pct >= 90) return 'Max/Compétition';
  if (pct >= 80) return 'Force';
  if (pct >= 70) return 'Force-Volume';
  if (pct >= 60) return 'Volume';
  return 'Technique';
};

// Table de %1RM -> charge de travail, de 100% à 50% par pas de 5 — la vraie utilité pratique d'un
// 1RM une fois estimé (permet de lire directement les charges d'échauffement/travail du programme).
export const buildPercentageTable = (oneRepMax: number, step = 5): PercentageRow[] => {
  const rows: PercentageRow[] = [];
  for (let pct = 100; pct >= 50; pct -= step) {
    rows.push({ pct, weight: roundToPlates(oneRepMax * (pct / 100)), zone: zoneForPct(pct) });
  }
  return rows;
};
