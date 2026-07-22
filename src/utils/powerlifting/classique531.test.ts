import { describe, it, expect } from 'vitest';
import { generateClassique531 } from './programs/classique531';
import type { PowerliftingProgramConfig, UserMaxes } from './types';

const maxes: UserMaxes = { squat: 140, bench: 100, deadlift: 180 };

const isRealisticPlateWeight = (poids: number) =>
  poids === 0 || (poids >= 20 && Math.abs(poids / 2.5 - Math.round(poids / 2.5)) < 1e-9);

describe('generateClassique531', () => {
  it('génère bien une séance par jour choisi pour 3 à 6 jours, sans jour ignoré', () => {
    for (let nbJours = 3; nbJours <= 6; nbJours++) {
      const trainingDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'].slice(0, nbJours);
      const config: PowerliftingProgramConfig = { type: 'classique', trainingDays, bodyweight: 80, sex: 'male' };
      const program = generateClassique531(config, maxes, 1);

      const semaine1Days = new Set(
        program.sessions.filter((s) => s.nom.startsWith('Semaine 1 -')).map((s) => s.day)
      );
      expect(semaine1Days.size).toBe(nbJours);
      trainingDays.forEach((day) => expect(semaine1Days.has(day)).toBe(true));
    }
  });

  it("n'assigne jamais un poids qui n'existe pas en salle (multiple de 2.5kg, ou 0 pour du poids de corps)", () => {
    const trainingDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const config: PowerliftingProgramConfig = { type: 'classique', trainingDays, bodyweight: 80, sex: 'male' };
    const program = generateClassique531(config, maxes, 1);

    const offenders: Array<{ session: string; exercice: string; poids: number }> = [];
    program.sessions.forEach((session) => {
      session.exercises.forEach((ex) => {
        if (!isRealisticPlateWeight(ex.poids)) {
          offenders.push({ session: session.nom, exercice: ex.nom, poids: ex.poids });
        }
      });
    });

    expect(offenders).toEqual([]);
  });

  it('avec 5-6 jours, les jours de volume ciblent squat puis deadlift (pas 2x le même mouvement en intensité max)', () => {
    const config: PowerliftingProgramConfig = {
      type: 'classique',
      trainingDays: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      bodyweight: 80,
      sex: 'male',
    };
    const program = generateClassique531(config, maxes, 1);

    const semaine1 = program.sessions.filter((s) => s.nom.startsWith('Semaine 1 -'));
    const jeudiSession = semaine1.find((s) => s.day === 'jeudi'); // 4e jour -> bench
    const vendrediSession = semaine1.find((s) => s.day === 'vendredi'); // 5e jour -> squat
    const samediSession = semaine1.find((s) => s.day === 'samedi'); // 6e jour -> deadlift

    expect(jeudiSession?.exercises.some((e) => e.nom.startsWith('Développé Couché'))).toBe(true);
    expect(vendrediSession?.exercises.some((e) => e.nom.startsWith('Squat'))).toBe(true);
    expect(samediSession?.exercises.some((e) => e.nom.startsWith('Soulevé de Terre'))).toBe(true);
  });

  it('fusionne les sets identiques consécutifs (FSL, bloc volume BBB) en une seule carte au lieu de les répéter', () => {
    const config: PowerliftingProgramConfig = {
      type: 'classique',
      trainingDays: ['lundi', 'mardi', 'mercredi', 'jeudi'],
      bodyweight: 80,
      sex: 'male',
    };
    const program = generateClassique531(config, maxes, 1);

    // FSL : 5 sets identiques (mêmes reps/poids) prévus par le schéma -> doit devenir 1 seule carte
    // avec series=5, jamais 5 cartes séparées de series=1.
    const squatSemaine1 = program.sessions.find((s) => s.nom === 'Semaine 1 - lundi');
    const fslEntries = squatSemaine1!.exercises.filter((e) => e.nom.includes('(FSL)'));
    expect(fslEntries.length).toBe(1);
    expect(fslEntries[0].series).toBe(5);

    // Bloc volume (4e jour, BBB) : 5 sets identiques -> 1 seule carte series=5.
    const jourVolume = program.sessions.find((s) => s.nom === 'Semaine 1 - jeudi');
    const volumeEntries = jourVolume!.exercises.filter((e) => e.nom.includes('(volume)'));
    expect(volumeEntries.length).toBe(1);
    expect(volumeEntries[0].series).toBe(5);

    // Aucun exercice de travail ne doit rester avec series=1 s'il existe un doublon identique
    // juste après lui dans la liste (signe d'une fusion manquée).
    squatSemaine1!.exercises.forEach((ex, idx) => {
      const next = squatSemaine1!.exercises[idx + 1];
      if (!next) return;
      const isDuplicate =
        ex.nom === next.nom && ex.type === next.type && ex.reps === next.reps && ex.poids === next.poids;
      expect(isDuplicate).toBe(false);
    });
  });

  it('spécialisation optionnelle : sans speTargets, les jours en plus suivent bien bench->squat->deadlift', () => {
    const config: PowerliftingProgramConfig = {
      type: 'classique',
      trainingDays: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'],
      bodyweight: 80,
      sex: 'male',
    };
    const program = generateClassique531(config, maxes, 1);
    const semaine1 = program.sessions.filter((s) => s.nom.startsWith('Semaine 1 -'));

    expect(semaine1.find((s) => s.day === 'jeudi')?.exercises.some((e) => e.nom.startsWith('Développé Couché'))).toBe(true);
    expect(semaine1.find((s) => s.day === 'vendredi')?.exercises.some((e) => e.nom.startsWith('Squat'))).toBe(true);
  });

  it('spécialisation optionnelle : avec speTargets=["deadlift"], TOUS les jours en plus vont sur le deadlift', () => {
    const config: PowerliftingProgramConfig = {
      type: 'classique',
      trainingDays: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      bodyweight: 80,
      sex: 'male',
      speTargets: ['deadlift'],
    };
    const program = generateClassique531(config, maxes, 1);
    const semaine1 = program.sessions.filter((s) => s.nom.startsWith('Semaine 1 -'));

    ['jeudi', 'vendredi', 'samedi'].forEach((day) => {
      const session = semaine1.find((s) => s.day === day);
      expect(session?.exercises.some((e) => e.nom.startsWith('Soulevé de Terre'))).toBe(true);
      expect(session?.exercises.some((e) => e.nom.startsWith('Squat'))).toBe(false);
      expect(session?.exercises.some((e) => e.nom.startsWith('Développé Couché'))).toBe(false);
    });
  });

  it('spécialisation optionnelle : avec speTargets=["squat","bench"], les jours en plus alternent entre les 2 (jamais le deadlift)', () => {
    const config: PowerliftingProgramConfig = {
      type: 'classique',
      trainingDays: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      bodyweight: 80,
      sex: 'male',
      speTargets: ['squat', 'bench'],
    };
    const program = generateClassique531(config, maxes, 1);
    const semaine1 = program.sessions.filter((s) => s.nom.startsWith('Semaine 1 -'));

    ['jeudi', 'vendredi', 'samedi'].forEach((day) => {
      const session = semaine1.find((s) => s.day === day);
      const hasSquat = session?.exercises.some((e) => e.nom.startsWith('Squat'));
      const hasBench = session?.exercises.some((e) => e.nom.startsWith('Développé Couché'));
      const hasDeadlift = session?.exercises.some((e) => e.nom.startsWith('Soulevé de Terre'));
      expect(hasSquat || hasBench).toBe(true);
      expect(hasDeadlift).toBe(false);
    });
  });
});
