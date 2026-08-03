import { describe, it, expect } from 'vitest';
import { generateApprentissage } from './programs/apprentissage';
import type { PowerliftingProgramConfig, UserMaxes } from './types';

const maxes: UserMaxes = { squat: 100, bench: 60, deadlift: 120 };

const config: PowerliftingProgramConfig = {
  type: 'apprentissage',
  trainingDays: ['lundi', 'mercredi', 'vendredi'],
  bodyweight: 75,
  sex: 'male',
};

describe('generateApprentissage', () => {
  it('le pourcentage affiché est bien "% du vrai 1RM", y compris sur l\'échauffement et les accessoires', () => {
    // Régression : buildWarmupSets/buildAccessory calculent pourcentage par rapport au poids du
    // jour (déjà réduit par STARTING_PCT puis incrémenté séance après séance), pas au vrai 1RM —
    // l'UI affiche pourtant "{pourcentage}% du max" littéralement.
    const program = generateApprentissage(config, maxes, 1);
    const firstSession = program.sessions[0];

    firstSession.exercises
      .filter((ex) => ex.poids > 0)
      .forEach((ex) => {
        const isSquat = ex.nom.startsWith('Squat') || ex.nom.includes('Jambes') || ex.nom.includes('Presse');
        const reference = isSquat ? maxes.squat : maxes.bench; // séance A = squat + bench
        expect(ex.pourcentage).toBe(Math.round((ex.poids / reference) * 100));
      });
  });

  it('la charge de travail augmente séance après séance sur un même mouvement', () => {
    const program = generateApprentissage(config, maxes, 1);
    const squatWorkWeights = program.sessions
      .map((s) => s.exercises.find((e) => e.type === 'travail' && e.nom === 'Squat')?.poids)
      .filter((w): w is number => w !== undefined);

    expect(squatWorkWeights.length).toBeGreaterThan(1);
    expect(squatWorkWeights[squatWorkWeights.length - 1]).toBeGreaterThan(squatWorkWeights[0]);
  });
});
