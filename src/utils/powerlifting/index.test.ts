import { describe, it, expect } from 'vitest';
import { regenerateWithMaxes } from './index';
import type { PowerliftingProgramConfig, UserMaxes } from './types';

const config: PowerliftingProgramConfig = {
  type: 'classique',
  trainingDays: ['lundi', 'mercredi', 'vendredi'],
  bodyweight: 80,
  sex: 'male',
};

describe('regenerateWithMaxes', () => {
  it('garde les mêmes ids de séance/exercice avec un nouveau 1RM (même startWeek) — les validations déjà faites restent liées', () => {
    const original: UserMaxes = { squat: 140, bench: 100, deadlift: 180 };
    const updated: UserMaxes = { squat: 160, bench: 110, deadlift: 190 }; // nouveau 1RM plus élevé

    const before = regenerateWithMaxes(config, original, 1);
    const after = regenerateWithMaxes(config, updated, 1);

    expect(before.sessions.map((s) => s.id)).toEqual(after.sessions.map((s) => s.id));
    before.sessions.forEach((session, i) => {
      expect(session.exercises.map((e) => e.id)).toEqual(after.sessions[i].exercises.map((e) => e.id));
    });
  });

  it('recalcule bien les poids sur le nouveau 1RM (les charges augmentent avec un 1RM plus haut)', () => {
    const lower: UserMaxes = { squat: 140, bench: 100, deadlift: 180 };
    const higher: UserMaxes = { squat: 200, bench: 150, deadlift: 240 };

    const before = regenerateWithMaxes(config, lower, 1);
    const after = regenerateWithMaxes(config, higher, 1);

    const firstWorkSet = (p: typeof before) =>
      p.sessions[0].exercises.find((e) => e.type === 'travail')!.poids;

    expect(firstWorkSet(after)).toBeGreaterThan(firstWorkSet(before));
  });

  it('reprend au bon startWeek — la numérotation de semaine ne repart pas de 1', () => {
    const maxes: UserMaxes = { squat: 140, bench: 100, deadlift: 180 };
    const program = regenerateWithMaxes(config, maxes, 5);
    const weekNumbers = program.sessions.map((s) => parseInt(s.nom.match(/Semaine (\d+)/)![1], 10));
    expect(Math.min(...weekNumbers)).toBe(5);
  });
});
