import { describe, it, expect } from 'vitest';
import { calculateWilksScore, calculateIPFGLPoints, toPerformanceRecords } from './statsCalculator';

describe('calculateWilksScore', () => {
  it('computes a male score for a given bodyweight/total', () => {
    expect(calculateWilksScore(83, 500, true)).toBe(334);
  });

  it('increases with a heavier total at the same bodyweight', () => {
    expect(calculateWilksScore(83, 600, true)).toBe(400);
  });

  it('computes a female score using the female coefficients', () => {
    expect(calculateWilksScore(60, 300, false)).toBe(334);
  });

  it('returns 0 for a zero total', () => {
    expect(calculateWilksScore(75, 0, true)).toBe(0);
  });
});

// Coefficients officiels IPF GL (raw/classic SBD), vérifiés contre le calculateur
// de référence OpenPowerlifting : A=1199.72839 B=1025.18162 C=0.00921 (hommes),
// A=610.32796 B=1045.59282 C=0.03048 (femmes).
describe('calculateIPFGLPoints', () => {
  it('computes a male score for a given bodyweight/total', () => {
    expect(calculateIPFGLPoints(83, 500, true)).toBe(69);
  });

  it('increases with a heavier total at the same bodyweight', () => {
    expect(calculateIPFGLPoints(83, 600, true)).toBe(83);
  });

  it('computes a female score using the female coefficients', () => {
    expect(calculateIPFGLPoints(60, 300, false)).toBe(68);
  });

  it('returns 0 for a zero total', () => {
    expect(calculateIPFGLPoints(75, 0, true)).toBe(0);
  });
});

describe('toPerformanceRecords', () => {
  it('maps raw stored performances to well-formed PerformanceRecord objects', () => {
    const raw = [{ id: '1', discipline: 'squat', value: '120', date: '2026-01-01' }];
    const [record] = toPerformanceRecords(raw, 'user-1');

    expect(record.userId).toBe('user-1');
    expect(record.value).toBe(120);
    expect(record.discipline.id).toBe('squat');
    expect(record.discipline.category).toBeDefined();
    expect(record.discipline.units).toBeDefined();
    expect(record.date instanceof Date).toBe(true);
  });

  it('defaults invalid/missing values to 0 instead of NaN', () => {
    const raw = [{ discipline: 'bench', value: 'not-a-number', date: '2026-01-01' }];
    const [record] = toPerformanceRecords(raw, 'user-1');

    expect(record.value).toBe(0);
  });
});
