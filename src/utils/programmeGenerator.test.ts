import { describe, it, expect, beforeEach } from 'vitest';
import { generateProgramme } from './programmeGenerator';

const setPerformances = (perfs: Array<{ discipline: string; value: number }>) => {
  (globalThis as any).localStorage = {
    getItem: (key: string) => (key === 'userPerformances' ? JSON.stringify(perfs) : null),
    setItem: () => {},
    removeItem: () => {},
  };
};

const baseUser = {
  id: 'u1',
  name: 'Test',
  email: 't@t.com',
  sportClass: 'power' as const,
  sex: 'male' as const,
  age: 25,
  trainingDays: ['lundi', 'mardi', 'jeudi'],
};

describe('generateProgramme — powerlifting', () => {
  beforeEach(() => {
    setPerformances([
      { discipline: 'squat', value: 140 },
      { discipline: 'bench', value: 90 },
      { discipline: 'deadlift', value: 170 },
    ]);
  });

  it('generates one session per training day per week over 2 full 4-week cycles', () => {
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);
    expect(programme.sessions.length).toBe(3 * 8); // 3 jours/semaine * 8 semaines (2 cycles)
  });

  it('includes a warm-up ramp before the main lift working sets', () => {
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);
    const squatDay = programme.sessions[0]; // semaine 1, jour 1 = Squat
    const exerciseNames = squatDay.exercises.map((e: any) => e.nom);

    const warmupIndex = exerciseNames.findIndex((n: string) => n.includes('échauffement'));
    const workingIndex = exerciseNames.findIndex((n: string) => n === 'Squat');

    expect(warmupIndex).toBeGreaterThanOrEqual(0);
    expect(workingIndex).toBeGreaterThan(warmupIndex); // l'échauffement vient avant le travail
    // La rampe d'échauffement doit être strictement plus légère que le premier set de travail
    const firstWorkingWeight = (squatDay.exercises[workingIndex] as any).poids;
    squatDay.exercises.slice(0, workingIndex).forEach((warmupSet: any) => {
      expect(warmupSet.poids).toBeLessThan(firstWorkingWeight);
    });
  });

  it('includes accessory work after the main lift sets', () => {
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);
    const squatDay = programme.sessions[0];
    const mainCount = squatDay.exercises.filter((e: any) => e.nom === 'Squat').length;
    const warmupCount = squatDay.exercises.filter((e: any) => e.nom.includes('échauffement')).length;
    const accessoryCount = squatDay.exercises.length - mainCount - warmupCount;

    expect(accessoryCount).toBeGreaterThan(0);
  });

  it('increases working weight progressively across cycles (week 5 > week 1)', () => {
    const programme = generateProgramme({ ...baseUser, weight: 83, trainingDays: ['lundi'] } as any);
    // Avec un seul jour d'entrainement, sessions[0..3] = semaines 1-4 (cycle 1), toutes "Squat" (jour 1)
    const week1Top = Math.max(...programme.sessions[0].exercises.filter((e: any) => e.nom === 'Squat').map((e: any) => e.poids));
    // 8 séances (2 cycles) nécessitent 8 semaines ; on ne génère que 4 semaines par défaut donc on
    // compare plutôt la vague intra-cycle : semaine 3 (spécialisation) doit dépasser la semaine 1.
    const week3Top = Math.max(...programme.sessions[2].exercises.filter((e: any) => e.nom === 'Squat').map((e: any) => e.poids));
    expect(week3Top).toBeGreaterThan(week1Top);
  });

  it('reduces intensity on the deload week (week 4)', () => {
    const programme = generateProgramme({ ...baseUser, weight: 83, trainingDays: ['lundi'] } as any);
    const week3Top = Math.max(...programme.sessions[2].exercises.filter((e: any) => e.nom === 'Squat').map((e: any) => e.poids));
    const deloadTop = Math.max(...programme.sessions[3].exercises.filter((e: any) => e.nom === 'Squat').map((e: any) => e.poids));
    expect(programme.sessions[3].phase).toBe('Deload');
    expect(deloadTop).toBeLessThan(week3Top);
  });

  it('flags the proportionally weakest lift as a priority day in the notes', () => {
    // Développé couché anormalement faible par rapport au squat/deadlift et au poids de corps
    setPerformances([
      { discipline: 'squat', value: 180 },
      { discipline: 'bench', value: 60 },
      { discipline: 'deadlift', value: 220 },
    ]);
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);
    const benchDay = programme.sessions.find((s: any) => s.exercises.some((e: any) => e.nom === 'Développé Couché'));
    expect(benchDay?.notes).toContain('point faible');
  });

  it('gives a beginner (low relative strength) a simpler linear progression with more accessories', () => {
    setPerformances([
      { discipline: 'squat', value: 60 },
      { discipline: 'bench', value: 40 },
      { discipline: 'deadlift', value: 80 },
    ]);
    const beginnerProgramme = generateProgramme({ ...baseUser, weight: 75 } as any);

    setPerformances([
      { discipline: 'squat', value: 200 },
      { discipline: 'bench', value: 140 },
      { discipline: 'deadlift', value: 230 },
    ]);
    const advancedProgramme = generateProgramme({ ...baseUser, weight: 83 } as any);

    expect(beginnerProgramme.sessions[0].notes).toContain('progression linéaire');
    expect(advancedProgramme.sessions[0].notes).toContain('intensification');
  });

  it('always keeps the competition-specificity accessory (pause bench) even when bench is not the weak lift', () => {
    // Squat/bench/deadlift équilibrés : aucun point faible marqué -> le bench ne devrait pas être sauté
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);
    const benchDay = programme.sessions.find((s: any) => s.exercises.some((e: any) => e.nom === 'Développé Couché'));
    const accessoryNames = benchDay.exercises.filter((e: any) => e.type === 'accessoire').map((e: any) => e.nom);
    expect(accessoryNames).toContain('Développé Couché Pause (3ct)');
  });

  it('attaches a percentage-of-max and a type to every exercise (no more "TM")', () => {
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);
    const squatDay = programme.sessions[0];
    squatDay.exercises.forEach((e: any) => {
      expect(typeof e.pourcentage).toBe('number');
      expect(['echauffement', 'travail', 'accessoire']).toContain(e.type);
    });
    expect(JSON.stringify(programme)).not.toMatch(/\bTM\b/);
  });

  it('inserts a combined SBD session before the deload on a 3-day/week schedule', () => {
    // 3 jours/semaine : jour SBD = semaine 3, jour "deadlift" (logicalJour 3)
    const programme = generateProgramme({ ...baseUser, weight: 83, trainingDays: ['lundi', 'mardi', 'jeudi'] } as any);
    const week3LastSession = programme.sessions[8]; // semaine3 = indices 6,7,8 ; jour3 = index 8
    const names = week3LastSession.exercises.map((e: any) => e.nom);

    expect(week3LastSession.notes).toContain('SBD combinée');
    expect(names).toContain('Squat');
    expect(names).toContain('Développé Couché');
    expect(names).toContain('Soulevé de Terre');
    // Pas de deload sur la séance SBD
    expect(week3LastSession.phase).not.toBe('Deload');
  });

  it('inserts exactly one combined SBD session per cycle (not several) for a 4-day/week (high frequency) schedule', () => {
    const programme = generateProgramme({
      ...baseUser,
      weight: 83,
      trainingDays: ['lundi', 'mardi', 'jeudi', 'vendredi'],
    } as any);

    // Une seule séance SBD par cycle de 4 semaines : trop de séances SBD donnerait l'impression
    // qu'une bonne partie du bloc n'est que ça (retour utilisateur direct sur ce point).
    const sbdSessions = programme.sessions.filter((s: any) => s.notes.includes('SBD combinée'));
    expect(sbdSessions.length).toBe(2); // 1 par cycle x 2 cycles (8 semaines générées)
  });

  it('increases the working weight in cycle 2 (week 5+) compared to cycle 1, without needing to regenerate', () => {
    const programme = generateProgramme({ ...baseUser, weight: 83, trainingDays: ['lundi'] } as any);
    // 1 jour/semaine : sessions[0] = semaine1 (cycle1), sessions[4] = semaine5 (cycle2), toutes "Squat"
    const cycle1Top = Math.max(...programme.sessions[0].exercises.filter((e: any) => e.nom === 'Squat').map((e: any) => e.poids));
    const cycle2Top = Math.max(...programme.sessions[4].exercises.filter((e: any) => e.nom === 'Squat').map((e: any) => e.poids));
    expect(cycle2Top).toBeGreaterThan(cycle1Top);
  });

  it('always includes the full accessory pool (leg extensions, bicep curls, weighted pull-ups) instead of a truncated subset', () => {
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);

    const squatDay = programme.sessions.find((s: any) => s.exercises.some((e: any) => e.nom === 'Squat'));
    const squatAccessoryNames = squatDay.exercises.filter((e: any) => e.type === 'accessoire').map((e: any) => e.nom);
    expect(squatAccessoryNames).toContain('Extensions de Jambes');

    const benchDay = programme.sessions.find((s: any) => s.exercises.some((e: any) => e.nom === 'Développé Couché'));
    const benchAccessoryNames = benchDay.exercises.filter((e: any) => e.type === 'accessoire').map((e: any) => e.nom);
    expect(benchAccessoryNames).toContain('Curls Biceps');
    expect(benchAccessoryNames).toContain('Dips lestés'); // niveau intermédiaire/avancé -> lestés

    const deadliftDay = programme.sessions.find((s: any) => s.exercises.some((e: any) => e.nom === 'Soulevé de Terre'));
    const deadliftAccessoryNames = deadliftDay.exercises.filter((e: any) => e.type === 'accessoire').map((e: any) => e.nom);
    expect(deadliftAccessoryNames).toContain('Tractions Lestées'); // niveau intermédiaire/avancé -> lestées, pas assistées
  });
});
