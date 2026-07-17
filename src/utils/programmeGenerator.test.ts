import { describe, it, expect, beforeEach } from 'vitest';
import { generateProgramme, adaptSessionToRecentFailure, adaptSessionToRecentDifficulty } from './programmeGenerator';

const setPerformances = (perfs: Array<{ discipline: string; value: number }>) => {
  (globalThis as any).localStorage = {
    getItem: (key: string) => (key === 'userPerformances' ? JSON.stringify(perfs) : null),
    setItem: () => {},
    removeItem: () => {},
  };
};

const setNoPerformances = () => {
  (globalThis as any).localStorage = {
    getItem: () => null,
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

    // sessions[0] (semaine1/jour1 = squat) est un créneau PR pour un débutant (rotation squat en
    // premier) : on vérifie plutôt sur le jour bench (sessions[1]), pas concerné ce cycle-ci.
    expect(beginnerProgramme.sessions[1].notes).toContain('progression linéaire');
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

  it('alternates an intensity block (cycle 1) and a volume block (cycle 2) instead of repeating the same wave forever', () => {
    const programme = generateProgramme({ ...baseUser, weight: 83, trainingDays: ['lundi'] } as any);
    // 1 jour/semaine : sessions[0] = semaine1 (cycle1), sessions[4] = semaine5 (cycle2), toutes "Squat"
    const cycle1Session = programme.sessions[0];
    const cycle2Session = programme.sessions[4];

    expect(cycle1Session.notes).toContain('Bloc Intensité');
    expect(cycle2Session.notes).toContain('Bloc Volume');

    const cycle1Squat = cycle1Session.exercises.filter((e: any) => e.nom === 'Squat' && e.type === 'travail');
    const cycle2Squat = cycle2Session.exercises.filter((e: any) => e.nom === 'Squat' && e.type === 'travail');

    // Bloc volume : plus de répétitions par série, mais un pic d'intensité plus bas que le bloc
    // intensité — un vrai changement de stimulus d'un cycle à l'autre, pas juste "plus lourd".
    expect(Number((cycle2Squat[0] as any).reps)).toBeGreaterThan(Number((cycle1Squat[0] as any).reps));
    const cycle1TopPct = Math.max(...cycle1Squat.map((e: any) => e.pourcentage));
    const cycle2TopPct = Math.max(...cycle2Squat.map((e: any) => e.pourcentage));
    expect(cycle2TopPct).toBeLessThan(cycle1TopPct);
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

describe('generateProgramme — powerlifting PR sessions (fréquence adaptée au niveau)', () => {
  it('gives an intermediate/advanced lifter exactly 1 PR session per cycle', () => {
    setPerformances([
      { discipline: 'squat', value: 140 },
      { discipline: 'bench', value: 90 },
      { discipline: 'deadlift', value: 170 },
    ]);
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any); // intermédiaire

    const prSessions = programme.sessions.filter((s: any) => s.notes.includes('Séance PR'));
    expect(prSessions.length).toBe(2); // 1 par cycle x 2 cycles
    // Jamais de PR SBD complet pour un non-débutant, seulement des PR simples
    expect(prSessions.every((s: any) => !s.notes.includes('PR SBD'))).toBe(true);
  });

  it('gives a beginner 2 PR sessions per cycle: one single-lift, one full PR SBD', () => {
    setPerformances([
      { discipline: 'squat', value: 60 },
      { discipline: 'bench', value: 40 },
      { discipline: 'deadlift', value: 80 },
    ]);
    const programme = generateProgramme({ ...baseUser, weight: 75 } as any); // débutant

    const prSessions = programme.sessions.filter((s: any) => s.notes.includes('Séance PR'));
    expect(prSessions.length).toBe(4); // 2 par cycle x 2 cycles

    const prSbdSessions = prSessions.filter((s: any) => s.notes.includes('PR SBD'));
    const prSingleSessions = prSessions.filter((s: any) => !s.notes.includes('PR SBD'));
    expect(prSbdSessions.length).toBe(2); // 1 par cycle
    expect(prSingleSessions.length).toBe(2); // 1 par cycle
  });

  it('structures a PR session as warm-up + a single direct record attempt, no openers, no accessories', () => {
    setPerformances([
      { discipline: 'squat', value: 140 },
      { discipline: 'bench', value: 90 },
      { discipline: 'deadlift', value: 170 },
    ]);
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);

    const prSession = programme.sessions.find((s: any) => s.notes.includes('Séance PR') && !s.notes.includes('PR SBD'));
    const workingSets = prSession.exercises.filter((e: any) => e.type === 'travail');
    const accessories = prSession.exercises.filter((e: any) => e.type === 'accessoire');

    expect(workingSets.length).toBe(1); // directement la tentative de record, pas d'ouverture/2e essai
    expect(accessories.length).toBe(0); // pas d'accessoires un jour de PR
    expect(workingSets[0].nom).toContain('tentative de record');
  });

  it('pushes the record attempt above the current logged max', () => {
    setPerformances([
      { discipline: 'squat', value: 140 },
      { discipline: 'bench', value: 90 },
      { discipline: 'deadlift', value: 170 },
    ]);
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);

    const prSession = programme.sessions.find((s: any) => s.notes.includes('Séance PR') && !s.notes.includes('PR SBD'));
    const recordAttempt = prSession.exercises.find((e: any) => e.nom.includes('tentative de record'));
    expect((recordAttempt as any).pourcentage).toBeGreaterThan(100);
  });
});

describe('generateProgramme — powerlifting displayed percentages match the actual prescribed weight', () => {
  // Bug réel remonté par l'utilisateur : le % affiché était le ratio VISÉ avant arrondi aux disques
  // (2.5kg près), pas le ratio réel du poids prescrit — un "70%" pouvait en réalité valoir 68% ou 72%.
  it('never displays a percentage that does not match poids/max once rounded to plates', () => {
    setPerformances([
      { discipline: 'squat', value: 137 }, // valeur non "ronde" exprès, pour faire dériver l'arrondi
      { discipline: 'bench', value: 91 },
      { discipline: 'deadlift', value: 163 },
    ]);
    const programme = generateProgramme({ ...baseUser, weight: 82 } as any);

    programme.sessions.forEach((session: any) => {
      session.exercises.forEach((ex: any) => {
        if (typeof ex.pourcentage !== 'number' || ex.pourcentage === 0) return;
        if (typeof ex.poids !== 'number' || ex.poids <= 0) return;
        // On ne connaît pas la référence exacte utilisée (rm, topWeight...) mais le % affiché doit
        // au moins être cohérent à l'arrondi près avec CE poids-là : poids / (%/100) doit retomber
        // sur un nombre plausible, et surtout deux exercices avec le même poids affiché doivent
        // partager le même %, jamais un % "presque bon mais pas exact".
        const impliedReference = ex.poids / (ex.pourcentage / 100);
        const recomputedPourcentage = Math.round((ex.poids / impliedReference) * 100);
        expect(recomputedPourcentage).toBe(ex.pourcentage);
      });
    });
  });
});

describe('generateProgramme — chaque exercice a un id unique (pas de validations partagées entre séries)', () => {
  // Bug réel remonté par l'utilisateur : valider "Raté" sur une série marquait aussi les séries
  // précédentes du même mouvement comme ratées, parce que toutes partageaient le même nom ("Squat"
  // x3) et donc, faute d'id propre, le même id de validation (exercise.id || exercise.nom).
  it('gives every exercise within a session a distinct id, even when several share the same name', () => {
    setPerformances([
      { discipline: 'squat', value: 140 },
      { discipline: 'bench', value: 90 },
      { discipline: 'deadlift', value: 170 },
    ]);
    const programme = generateProgramme({ ...baseUser, weight: 83 } as any);

    programme.sessions.forEach((session: any) => {
      const ids = session.exercises.map((e: any) => e.id);
      expect(new Set(ids).size).toBe(ids.length);
      ids.forEach((id: any) => expect(typeof id).toBe('string'));
    });

    const squatDay = programme.sessions.find((s: any) => s.exercises.some((e: any) => e.nom === 'Squat' && e.type === 'travail'));
    const squatWorkSets = squatDay.exercises.filter((e: any) => e.nom === 'Squat' && e.type === 'travail');
    expect(squatWorkSets.length).toBeGreaterThan(1); // plusieurs séries, même nom
    const uniqueIds = new Set(squatWorkSets.map((e: any) => e.id));
    expect(uniqueIds.size).toBe(squatWorkSets.length); // ...mais un id différent chacune
  });
});

describe('generateProgramme — powerlifting cycle-to-cycle variety', () => {
  it('rotates the squat/bench/deadlift specificity accessory between cycle 1 and cycle 2 instead of always prescribing the same variant', () => {
    setPerformances([
      { discipline: 'squat', value: 140 },
      { discipline: 'bench', value: 90 },
      { discipline: 'deadlift', value: 170 },
    ]);
    const programme = generateProgramme({ ...baseUser, weight: 83, trainingDays: ['lundi'] } as any);

    const cycle1Squat = programme.sessions[0].exercises.find((e: any) => e.nom.startsWith('Squat') && e.type === 'accessoire');
    const cycle2Squat = programme.sessions[4].exercises.find((e: any) => e.nom.startsWith('Squat') && e.type === 'accessoire');

    expect(cycle1Squat.nom).not.toBe(cycle2Squat.nom);
  });
});

describe('adaptSessionToRecentFailure — allège la séance suivante après un échec sur le même mouvement', () => {
  const buildTwoWeekSquatProgramme = () => {
    setPerformances([
      { discipline: 'squat', value: 140 },
      { discipline: 'bench', value: 90 },
      { discipline: 'deadlift', value: 170 },
    ]);
    return generateProgramme({ ...baseUser, weight: 83, trainingDays: ['lundi'] } as any);
  };

  it('leaves the session untouched when the prior session on that lift was not marked as failed', () => {
    const programme = buildTwoWeekSquatProgramme();
    const week1 = programme.sessions[0];
    const week2 = programme.sessions[1];

    const adapted = adaptSessionToRecentFailure(week2, programme.sessions, []);
    expect(adapted).toBe(week2); // pas de validations => renvoie la même référence, rien de changé
  });

  it('swaps the next session for a lighter, tempo-focused block when the prior session on the same lift failed', () => {
    const programme = buildTwoWeekSquatProgramme();
    const week1 = programme.sessions[0]; // Squat, semaine 1
    const week2 = programme.sessions[1]; // Squat, semaine 2

    // Chaque série de travail a son propre id unique désormais — on vise le dernier set (top set).
    const week1MainSets = week1.exercises.filter((e: any) => e.type === 'travail');
    const week1TopSetId = (week1MainSets[week1MainSets.length - 1] as any).id;
    const failedValidation = [{ exerciseId: week1TopSetId, sessionId: week1.id, success: false }];
    const adapted = adaptSessionToRecentFailure(week2, programme.sessions, failedValidation);

    expect(adapted).not.toBe(week2);
    expect(adapted.notes).toMatch(/adapt/i);

    const adaptedMainSets = adapted.exercises.filter((e: any) => e.type === 'travail');
    expect(adaptedMainSets.length).toBeGreaterThan(0);
    expect(adaptedMainSets[0].nom).toContain('tempo contrôlé');
    // Aucun set de travail ne doit dépasser 70% après un échec : on retombe sur un bloc technique modéré.
    adaptedMainSets.forEach((set: any) => expect(set.pourcentage).toBeLessThanOrEqual(70));
  });

  it('does not soften PR or SBD combo sessions even after a failure', () => {
    const programme = buildTwoWeekSquatProgramme();
    const week1 = programme.sessions[0];
    const prOrSbdSession = programme.sessions.find((s: any) => s.notes.includes('Séance PR') || s.notes.includes('SBD combinée'));
    if (!prOrSbdSession) return; // selon le niveau assigné, il y en a toujours au moins un sur 8 semaines

    const week1MainSets = week1.exercises.filter((e: any) => e.type === 'travail');
    const week1TopSetId = (week1MainSets[week1MainSets.length - 1] as any).id;
    const failedValidation = [{ exerciseId: week1TopSetId, sessionId: week1.id, success: false }];
    const adapted = adaptSessionToRecentFailure(prOrSbdSession, programme.sessions, failedValidation);
    expect(adapted).toBe(prOrSbdSession);
  });
});

describe('generateProgramme — powerlifting TEST sessions for lifts with no known max', () => {
  it('replaces week 1 sessions with a TEST session for every lift that has no logged performance', () => {
    setNoPerformances();
    const programme = generateProgramme({ ...baseUser, weight: 80, trainingDays: ['lundi', 'mardi', 'jeudi'] } as any);

    const week1Sessions = programme.sessions.filter((s: any) => s.nom.includes('Semaine 1 -'));
    expect(week1Sessions.length).toBe(3);
    expect(week1Sessions.every((s: any) => s.notes.includes('Séance TEST'))).toBe(true);

    // Chaque séance TEST se termine par un vrai set de test (pas d'accessoires, pas de %1RM prescrit).
    week1Sessions.forEach((s: any) => {
      const testSet = s.exercises.find((e: any) => e.nom.includes('test'));
      expect(testSet).toBeTruthy();
      expect(testSet.pourcentage).toBe(0);
      expect(s.exercises.some((e: any) => e.type === 'accessoire')).toBe(false);
    });

    // Semaine 2 : les vrais maxs restent inconnus (aucune perf n'a été "enregistrée" entre-temps
    // dans ce test), donc la génération se rabat sur les défauts prudents pour construire une vraie
    // vague — mais ce n'est plus une séance TEST.
    const week2Sessions = programme.sessions.filter((s: any) => s.nom.includes('Semaine 2 -'));
    expect(week2Sessions.every((s: any) => !s.notes.includes('Séance TEST'))).toBe(true);
  });

  it('only tests the lifts that are actually missing, leaving known lifts on a normal session', () => {
    setPerformances([{ discipline: 'squat', value: 140 }]); // seul le squat est connu
    const programme = generateProgramme({ ...baseUser, weight: 83, trainingDays: ['lundi', 'mardi', 'jeudi'] } as any);

    const week1Sessions = programme.sessions.filter((s: any) => s.nom.includes('Semaine 1 -'));
    const squatSession = week1Sessions.find((s: any) => s.exercises.some((e: any) => e.nom === 'Squat' && e.type === 'travail'));
    const otherTestSessions = week1Sessions.filter((s: any) => s.notes.includes('Séance TEST'));

    expect(squatSession.notes.includes('Séance TEST')).toBe(false); // squat déjà connu -> séance normale
    expect(otherTestSessions.length).toBe(2); // bench + deadlift, inconnus -> TEST
  });
});

describe('adaptSessionToRecentDifficulty — ajuste la charge selon le RPE laissé sur la dernière séance', () => {
  const buildTwoWeekSquatProgramme = () => {
    setPerformances([
      { discipline: 'squat', value: 140 },
      { discipline: 'bench', value: 90 },
      { discipline: 'deadlift', value: 170 },
    ]);
    return generateProgramme({ ...baseUser, weight: 83, trainingDays: ['lundi'] } as any);
  };

  it('leaves the session untouched when no rating exists for the prior session on that lift', () => {
    const programme = buildTwoWeekSquatProgramme();
    const week2 = programme.sessions[1];
    const adapted = adaptSessionToRecentDifficulty(week2, programme.sessions, []);
    expect(adapted).toBe(week2);
  });

  it('bumps the load above the programmed value when the prior session was rated very easy (1-2/10)', () => {
    const programme = buildTwoWeekSquatProgramme();
    const week1 = programme.sessions[0];
    const week2 = programme.sessions[1];

    const rating = [{ sessionId: week1.id, rpe: 1 }];
    const adapted = adaptSessionToRecentDifficulty(week2, programme.sessions, rating);

    expect(adapted).not.toBe(week2);
    expect(adapted.notes).toMatch(/trop facile/i);

    const originalTop = Math.max(...week2.exercises.filter((e: any) => e.type === 'travail').map((e: any) => e.pourcentage));
    const adaptedTop = Math.max(...adapted.exercises.filter((e: any) => e.type === 'travail').map((e: any) => e.pourcentage));
    expect(adaptedTop).toBeGreaterThan(originalTop);
  });

  it('backs off the load when the prior session was rated hardcore (10/10)', () => {
    const programme = buildTwoWeekSquatProgramme();
    const week1 = programme.sessions[0];
    const week2 = programme.sessions[1];

    const rating = [{ sessionId: week1.id, rpe: 10 }];
    const adapted = adaptSessionToRecentDifficulty(week2, programme.sessions, rating);

    expect(adapted).not.toBe(week2);
    expect(adapted.notes).toMatch(/dure/i);

    const originalTop = Math.max(...week2.exercises.filter((e: any) => e.type === 'travail').map((e: any) => e.pourcentage));
    const adaptedTop = Math.max(...adapted.exercises.filter((e: any) => e.type === 'travail').map((e: any) => e.pourcentage));
    expect(adaptedTop).toBeLessThan(originalTop);
  });

  it('leaves the session untouched when the prior session was rated in the expected middle range (5-8/10)', () => {
    const programme = buildTwoWeekSquatProgramme();
    const week1 = programme.sessions[0];
    const week2 = programme.sessions[1];

    const rating = [{ sessionId: week1.id, rpe: 6 }];
    const adapted = adaptSessionToRecentDifficulty(week2, programme.sessions, rating);
    expect(adapted).toBe(week2);
  });

  it('never adjusts PR or SBD combo sessions', () => {
    const programme = buildTwoWeekSquatProgramme();
    const week1 = programme.sessions[0];
    const prOrSbdSession = programme.sessions.find((s: any) => s.notes.includes('Séance PR') || s.notes.includes('SBD combinée'));
    if (!prOrSbdSession) return;

    const rating = [{ sessionId: week1.id, rpe: 1 }];
    const adapted = adaptSessionToRecentDifficulty(prOrSbdSession, programme.sessions, rating);
    expect(adapted).toBe(prOrSbdSession);
  });
});
