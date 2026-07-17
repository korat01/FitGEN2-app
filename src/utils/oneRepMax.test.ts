import { describe, it, expect } from 'vitest';
import { epley1RM, brzycki1RM, estimateOneRepMax, estimateOneRepMaxFromRPE, buildPercentageTable, roundToPlates } from './oneRepMax';

describe('epley1RM / brzycki1RM', () => {
  it('returns the weight itself for a single rep (no extrapolation needed)', () => {
    expect(epley1RM(100, 1)).toBe(100);
    expect(brzycki1RM(100, 1)).toBe(100);
  });

  it('matches the standard Epley formula: weight * (1 + reps/30)', () => {
    expect(epley1RM(100, 5)).toBeCloseTo(116.67, 1);
  });

  it('matches the standard Brzycki formula: weight * 36 / (37 - reps)', () => {
    expect(brzycki1RM(100, 5)).toBeCloseTo(112.5, 1);
  });
});

describe('estimateOneRepMax', () => {
  it('averages Epley and Brzycki for a more robust estimate', () => {
    const result = estimateOneRepMax(100, 5);
    expect(result.epley).toBeCloseTo(116.5, 1);
    expect(result.brzycki).toBeCloseTo(112.5, 1);
    expect(result.average).toBeCloseTo(114.5, 1);
  });

  it('caps unreliable high rep counts instead of extrapolating wildly', () => {
    const cappedAt12 = estimateOneRepMax(100, 12);
    const wayBeyond = estimateOneRepMax(100, 30);
    expect(wayBeyond.average).toBe(cappedAt12.average);
  });
});

describe('estimateOneRepMaxFromRPE', () => {
  it('matches the canonical RTS/Tuchscherer chart at RPE 10 (all-out set = 1RM formula territory)', () => {
    // 1 rep à l'échec (RPE 10) = 100% du 1RM, donc le poids soulevé EST le 1RM.
    expect(estimateOneRepMaxFromRPE(100, 1, 10).oneRepMax).toBe(100);
    // 5 reps à l'échec (RPE 10) = 86.3% du 1RM d'après la table.
    const result = estimateOneRepMaxFromRPE(100, 5, 10);
    expect(result.pctUsed).toBeCloseTo(86.3, 1);
    expect(result.oneRepMax).toBeCloseTo(100 / 0.863, 0);
  });

  it('estimates a higher 1RM for the same weight/reps when RPE is lower (reps left in the tank)', () => {
    const maxedOut = estimateOneRepMaxFromRPE(100, 5, 10);
    const easier = estimateOneRepMaxFromRPE(100, 5, 7);
    expect(easier.oneRepMax).toBeGreaterThan(maxedOut.oneRepMax);
  });

  it('clamps RPE and reps to the table bounds instead of throwing on out-of-range input', () => {
    expect(() => estimateOneRepMaxFromRPE(100, 20, 12)).not.toThrow();
    expect(() => estimateOneRepMaxFromRPE(100, 0, 3)).not.toThrow();
  });

  it('flags RPE 6 and above as reliable (backed by the real RTS table)', () => {
    expect(estimateOneRepMaxFromRPE(100, 5, 6).reliable).toBe(true);
    expect(estimateOneRepMaxFromRPE(100, 5, 10).reliable).toBe(true);
  });

  it('covers the full 1-10 RPE scale, flagging anything below 6 as indicative only', () => {
    const veryEasy = estimateOneRepMaxFromRPE(100, 5, 1);
    expect(veryEasy.reliable).toBe(false);
    expect(veryEasy.oneRepMax).toBeGreaterThan(0);
    // Toujours monotone : plus le RPE déclaré est bas, plus le 1RM extrapolé est élevé.
    const rpe6 = estimateOneRepMaxFromRPE(100, 5, 6);
    const rpe3 = estimateOneRepMaxFromRPE(100, 5, 3);
    const rpe1 = estimateOneRepMaxFromRPE(100, 5, 1);
    expect(rpe3.oneRepMax).toBeGreaterThan(rpe6.oneRepMax);
    expect(rpe1.oneRepMax).toBeGreaterThan(rpe3.oneRepMax);
  });
});

describe('buildPercentageTable', () => {
  it('builds rows from 100% down to 50% in 5-point steps, rounded to the nearest 2.5kg plate', () => {
    const table = buildPercentageTable(114.5);
    expect(table[0]).toEqual({ pct: 100, weight: roundToPlates(114.5), zone: 'Max/Compétition' });
    expect(table[table.length - 1].pct).toBe(50);
    expect(table.length).toBe(11); // 100, 95, ..., 50
  });

  it('labels the top percentages as Max/Compétition and the lowest as Technique', () => {
    const table = buildPercentageTable(100);
    expect(table.find((r) => r.pct === 95)!.zone).toBe('Max/Compétition');
    expect(table.find((r) => r.pct === 50)!.zone).toBe('Technique');
  });
});
