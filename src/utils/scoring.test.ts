import { describe, it, expect } from 'vitest';
import { scoringEngine } from './scoring';

const RANK_ORDER = ['E', 'D', 'C', 'B', 'A', 'S', 'Nation', 'World'];
const rankIndex = (rank: string) => RANK_ORDER.indexOf(rank);

const baseUser = {
  weight: 75,
  sex: 'male' as const,
  sportClass: 'calisthenics',
  age: 25, // senior
};

const pullupsPerf = (value: number, overrides: Partial<typeof baseUser> = {}) => ({
  user: { ...baseUser, ...overrides },
  performances: [
    {
      id: '1',
      userId: 'u1',
      discipline: 'pullups',
      value,
      units: 'reps',
      date: new Date(),
    },
  ],
});

describe('scoringEngine.calculateUserRank — edge cases', () => {
  it('returns rank D / score 0 when there is no user', () => {
    const result = scoringEngine.calculateUserRank(null, []);
    expect(result.rank).toBe('D');
    expect(result.globalScore).toBe(0);
  });

  it('returns rank D / score 0 when there are no performances', () => {
    const result = scoringEngine.calculateUserRank(baseUser, []);
    expect(result.rank).toBe('D');
    expect(result.globalScore).toBe(0);
  });
});

describe('scoringEngine.calculateUserRank — scoreLabel / progress (regression for the "84/1000" display bug)', () => {
  it('labels the fallback score as a generic "Score", not tied to a fixed /1000 scale', () => {
    const { user, performances } = pullupsPerf(15);
    const result = scoringEngine.calculateUserRank(user, performances);
    expect(result.scoreLabel).toBe('Score');
    expect(result.rankProgressPercent).toBeCloseTo(53.33, 1);
    expect(result.nextRank).toBe('C');
  });

  it('labels the squat+bench+deadlift score as "IPF GL Points", with progress on the GL scale', () => {
    const user = { ...baseUser, sportClass: 'power', weight: 83 };
    const performances = [
      { id: '1', userId: 'u1', discipline: 'squat', value: 200, units: 'kg', date: new Date() },
      { id: '2', userId: 'u1', discipline: 'bench', value: 120, units: 'kg', date: new Date() },
      { id: '3', userId: 'u1', discipline: 'deadlift', value: 180, units: 'kg', date: new Date() },
    ];

    const result = scoringEngine.calculateUserRank(user, performances);

    expect(result.scoreLabel).toBe('IPF GL Points');
    expect(result.globalScore).toBe(69); // rank C sur l'échelle GL (55-70), pas 69/1000
    expect(result.rankProgressPercent).toBeCloseTo(93.33, 1);
    expect(result.nextRank).toBe('B');
  });

  it('keeps rankProgressPercent within 0-100 for a top-tier World score', () => {
    const { user, performances } = pullupsPerf(100);
    const result = scoringEngine.calculateUserRank(user, performances);
    expect(result.rank).toBe('World');
    expect(result.rankProgressPercent).toBe(100);
    expect(result.nextRank).toBe('World');
  });
});

describe('scoringEngine.calculateUserRank — other disciplines still count when squat+bench+deadlift are present', () => {
  it('still updates the calisthenics breakdown when pullups are logged alongside a full SBD total', () => {
    const user = { ...baseUser, sportClass: 'power', weight: 83 };
    const performances = [
      { id: '1', userId: 'u1', discipline: 'squat', value: 200, units: 'kg', date: new Date() },
      { id: '2', userId: 'u1', discipline: 'bench', value: 120, units: 'kg', date: new Date() },
      { id: '3', userId: 'u1', discipline: 'deadlift', value: 180, units: 'kg', date: new Date() },
      { id: '4', userId: 'u1', discipline: 'pullups', value: 20, units: 'reps', date: new Date() },
    ];

    const result = scoringEngine.calculateUserRank(user, performances);

    // Le rang global reste piloté par le total SBD (IPF GL)...
    expect(result.globalScore).toBe(69);
    expect(result.rank).toBe('C');
    // ...mais les tractions ne sont plus ignorées dans la décomposition.
    expect(result.breakdown.calisthenics).toBe(612);
    expect(result.breakdown.endurance).toBe(0);
  });
});

describe('scoringEngine.calculateUserRank — nouvelles disciplines (pompes, course à distance/temps libres)', () => {
  it('scores pushups into the calisthenics category', () => {
    const user = { ...baseUser, sportClass: 'calisthenics' };
    const performances = [
      { id: '1', userId: 'u1', discipline: 'pushups', value: 30, units: 'reps', date: new Date() },
    ];

    const result = scoringEngine.calculateUserRank(user, performances);

    expect(result.breakdown.calisthenics).toBe(675);
    expect(result.globalScore).toBe(203);
    expect(result.rank).toBe('D');
  });

  it('scores a free-distance run (speed-based) into the endurance category', () => {
    const user = { ...baseUser, sportClass: 'marathon', weight: 65 };
    const speedKmh = 10 / (45 / 60); // 10km en 45 minutes
    const performances = [
      { id: '1', userId: 'u1', discipline: 'course', value: speedKmh, units: 'km/h', date: new Date() },
    ];

    const result = scoringEngine.calculateUserRank(user, performances);

    expect(result.breakdown.endurance).toBe(373);
    expect(result.globalScore).toBe(37);
    expect(result.rank).toBe('E');
  });
});

describe('scoringEngine.calculateUserRank — fallback scoring (no squat+bench+deadlift trio)', () => {
  it('locks in the current score for a beginner-level performance', () => {
    const { user, performances } = pullupsPerf(15);
    const result = scoringEngine.calculateUserRank(user, performances);
    expect(result.globalScore).toBe(180);
    expect(result.rank).toBe('D');
  });

  it('locks in the current score for an intermediate performance', () => {
    const { user, performances } = pullupsPerf(35);
    const result = scoringEngine.calculateUserRank(user, performances);
    expect(result.globalScore).toBe(360);
    expect(result.rank).toBe('C');
  });

  it('locks in the current score for an elite performance', () => {
    const { user, performances } = pullupsPerf(100);
    const result = scoringEngine.calculateUserRank(user, performances);
    expect(result.globalScore).toBe(945);
    expect(result.rank).toBe('World');
  });

  it('ranks a better raw performance no lower than a worse one (monotonic)', () => {
    const rankFor = (value: number) => {
      const { user, performances } = pullupsPerf(value);
      return scoringEngine.calculateUserRank(user, performances).rank;
    };

    const low = rankFor(5);
    const mid = rankFor(20);
    const high = rankFor(60);

    expect(rankIndex(mid)).toBeGreaterThanOrEqual(rankIndex(low));
    expect(rankIndex(high)).toBeGreaterThanOrEqual(rankIndex(mid));
  });

  it('uses rounded IPF GL Points (not the raw FFForce float) when squat+bench+deadlift are all present', () => {
    const user = { ...baseUser, sportClass: 'power', weight: 83 };
    const performances = [
      { id: '1', userId: 'u1', discipline: 'squat', value: 200, units: 'kg', date: new Date() },
      { id: '2', userId: 'u1', discipline: 'bench', value: 120, units: 'kg', date: new Date() },
      { id: '3', userId: 'u1', discipline: 'deadlift', value: 180, units: 'kg', date: new Date() },
    ];

    const result = scoringEngine.calculateUserRank(user, performances);

    expect(result.globalScore).toBe(69);
    expect(Number.isInteger(result.globalScore)).toBe(true);
    expect(Number.isInteger(result.breakdown.force)).toBe(true); // pas de float qui déborde du cadre
    expect(result.rank).toBe('C');
  });

  it('also exposes the classic Wilks score as a reference alongside the IPF GL Points', () => {
    const user = { ...baseUser, sportClass: 'power', weight: 83 };
    const performances = [
      { id: '1', userId: 'u1', discipline: 'squat', value: 200, units: 'kg', date: new Date() },
      { id: '2', userId: 'u1', discipline: 'bench', value: 120, units: 'kg', date: new Date() },
      { id: '3', userId: 'u1', discipline: 'deadlift', value: 180, units: 'kg', date: new Date() },
    ];

    const result = scoringEngine.calculateUserRank(user, performances);

    expect(result.wilksScore).toBe(334);
    expect(result.wilksScore).not.toBe(result.globalScore);
  });

  it('applies the age multiplier (regression for the senior/masters2 category-name bug)', () => {
    const senior = pullupsPerf(15, { age: 25 }); // senior -> multiplier 1.0
    const masters2 = pullupsPerf(15, { age: 55 }); // masters2 -> multiplier 1.1

    const seniorResult = scoringEngine.calculateUserRank(senior.user, senior.performances);
    const masters2Result = scoringEngine.calculateUserRank(masters2.user, masters2.performances);

    // Avant le fix de getAgeMultiplier, ces deux scores étaient identiques (multiplicateur mort).
    expect(seniorResult.globalScore).toBe(180);
    expect(masters2Result.globalScore).toBe(164);
    expect(masters2Result.globalScore).not.toBe(seniorResult.globalScore);
  });
});
