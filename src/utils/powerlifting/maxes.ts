import { roundToPlates } from '../programmeGenerator';
import type { MainLift, PartialMaxes, UserMaxes } from './types';

// Relit les performances loggées (page Stats) — contrairement à l'ancien getUserSBDMaxes() qui
// retombe silencieusement sur des valeurs par défaut, ici un mouvement sans perf réelle vaut
// explicitement `null` : c'est ce qui permet de détecter qu'une semaine de test est nécessaire.
export function getLoggedMaxes(): PartialMaxes {
  const empty: PartialMaxes = { squat: null, bench: null, deadlift: null };
  const savedPerformances = localStorage.getItem('userPerformances');
  if (!savedPerformances) return empty;

  try {
    const performancesList = JSON.parse(savedPerformances);
    const bestOf = (predicate: (discipline: string) => boolean): number | null => {
      const values = performancesList
        .filter((p: any) => predicate((p.discipline || '').toLowerCase()))
        .map((p: any) => p.value || 0);
      return values.length > 0 ? Math.max(...values) : null;
    };

    return {
      squat: bestOf((d) => d.includes('squat')),
      bench: bestOf((d) => d.includes('bench') || d.includes('développé') || d.includes('couché')),
      deadlift: bestOf((d) => d.includes('deadlift') || d.includes('soulevé') || d.includes('terre')),
    };
  } catch (error) {
    console.error('Erreur lors de la lecture des performances:', error);
    return empty;
  }
}

export function getMissingLifts(maxes: PartialMaxes): MainLift[] {
  return (['squat', 'bench', 'deadlift'] as MainLift[]).filter((lift) => maxes[lift] == null);
}

export function hasAllMaxes(maxes: PartialMaxes): maxes is UserMaxes {
  return getMissingLifts(maxes).length === 0;
}

// Training Max façon Wendler : 90% du vrai 1RM — la conservation délibérée qui permet au 5/3/1 de
// progresser cycle après cycle sans jamais vraiment s'entraîner au max chaque semaine.
export const TM_RATIO = 0.9;

export function computeTrainingMax(oneRepMax: number): number {
  return roundToPlates(oneRepMax * TM_RATIO);
}

export function computeTrainingMaxes(maxes: UserMaxes): UserMaxes {
  return {
    squat: computeTrainingMax(maxes.squat),
    bench: computeTrainingMax(maxes.bench),
    deadlift: computeTrainingMax(maxes.deadlift),
  };
}

// Progression du Training Max d'un cycle 5/3/1 au suivant — bas du corps progresse plus vite que le
// haut du corps, conformément à la méthode originale (+5kg squat/deadlift, +2.5kg bench par cycle).
export const TM_CYCLE_INCREMENT: Record<MainLift, number> = {
  squat: 5,
  bench: 2.5,
  deadlift: 5,
};
