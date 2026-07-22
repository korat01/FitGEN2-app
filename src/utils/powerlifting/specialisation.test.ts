import { describe, it, expect } from 'vitest';
import { generateSpecialisation } from './programs/specialisation';
import type { PowerliftingProgramConfig, UserMaxes } from './types';

const maxes: UserMaxes = { squat: 140, bench: 100, deadlift: 180 };

const config = (trainingDays: string[]): PowerliftingProgramConfig => ({
  type: 'spe',
  trainingDays,
  bodyweight: 80,
  sex: 'male',
});

describe('generateSpecialisation (programme "Spé")', () => {
  it('avec 1 cible, les 2 autres mouvements passent en entretien (1x/semaine chacun)', () => {
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi'];
    const program = generateSpecialisation(config(days), maxes, ['squat'], 1);

    const semaine1 = program.sessions.filter((s) => s.nom.startsWith('Semaine 1 -'));
    const maintenance = semaine1.filter((s) => s.phase === 'Entretien');
    const spé = semaine1.filter((s) => s.phase === 'Spécialisation');

    expect(maintenance.length).toBe(2); // bench + deadlift, 1x chacun
    expect(spé.length).toBe(2); // 4 jours - 2 entretien = 2 jours de squat
    expect(semaine1.length).toBe(days.length);
  });

  it('avec 2 cibles, un seul mouvement reste en entretien et les 2 cibles se partagent le reste des jours', () => {
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const program = generateSpecialisation(config(days), maxes, ['squat', 'bench'], 1);

    const semaine1 = program.sessions.filter((s) => s.nom.startsWith('Semaine 1 -'));
    const maintenance = semaine1.filter((s) => s.phase === 'Entretien');
    const squatSessions = semaine1.filter((s) => s.exercises.some((e) => e.nom.startsWith('Squat')) && s.phase !== 'Entretien');
    const benchSessions = semaine1.filter((s) => s.exercises.some((e) => e.nom.startsWith('Développé Couché')) && s.phase !== 'Entretien');

    expect(maintenance.length).toBe(1); // seul le deadlift reste en entretien
    expect(maintenance[0].exercises.some((e) => e.nom.startsWith('Soulevé de Terre'))).toBe(true);
    // 6 jours - 1 entretien = 5 jours à répartir sur squat+bench (3+2 ou 2+3)
    expect(squatSessions.length + benchSessions.length).toBe(5);
    expect(squatSessions.length).toBeGreaterThanOrEqual(1);
    expect(benchSessions.length).toBeGreaterThanOrEqual(1);
    expect(semaine1.length).toBe(days.length);
  });

  it('chaque mouvement (cible ou entretien) a toujours au moins 1 jour, même avec le minimum de 3 jours', () => {
    const days = ['lundi', 'mardi', 'mercredi'];
    const program = generateSpecialisation(config(days), maxes, ['squat', 'deadlift'], 1);
    const semaine1 = program.sessions.filter((s) => s.nom.startsWith('Semaine 1 -'));

    expect(semaine1.length).toBe(3);
    expect(semaine1.some((s) => s.exercises.some((e) => e.nom.startsWith('Squat')))).toBe(true);
    expect(semaine1.some((s) => s.exercises.some((e) => e.nom.startsWith('Soulevé de Terre')))).toBe(true);
    expect(semaine1.some((s) => s.exercises.some((e) => e.nom.startsWith('Développé Couché')))).toBe(true);
  });
});
