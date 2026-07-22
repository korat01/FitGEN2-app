// Programme "Apprentissage" — progression linéaire débutant façon Starting Strength / GreySkull LP
// (cf. recherche sourcée) : charge qui augmente à CHAQUE séance réussie (pas chaque semaine), séances
// full-body à haute fréquence, focus technique. Squat quasi chaque séance, bench/deadlift en
// alternance A/B pour gérer la fatigue — le schéma le plus documenté pour un vrai débutant.
import { buildWarmupSets, roundToPlates, pctOf, assignExerciseIds } from '../../programmeGenerator';
import type {
  GeneratedExercise,
  GeneratedPowerliftingProgram,
  GeneratedSession,
  MainLift,
  PowerliftingProgramConfig,
  UserMaxes,
} from '../types';

const MAIN_LIFT_NOM: Record<MainLift, string> = {
  squat: 'Squat',
  bench: 'Développé Couché',
  deadlift: 'Soulevé de Terre',
};

// Charge de départ prudente (%1RM) : un débutant n'a pas besoin d'être proche de son max pour
// apprendre le mouvement, la marge sert justement à polir la technique sous la barre.
const STARTING_PCT: Record<MainLift, number> = { squat: 0.7, bench: 0.65, deadlift: 0.75 };

// Incrément par SÉANCE (pas par semaine) où le mouvement est reprogrammé — bas du corps progresse
// plus vite que le haut du corps (cf. Starting Strength/GreySkull LP : ~2.5kg squat/deadlift par
// séance, ~1.25kg bench, obtenu ici en n'incrémentant le bench qu'une séance sur deux).
const SESSION_INCREMENT_KG: Record<MainLift, number> = { squat: 2.5, bench: 2.5, deadlift: 2.5 };
const BENCH_INCREMENT_EVERY_N_SESSIONS = 2;

// 2 options par mouvement, alternées d'une séance sur l'autre (pas le même accessoire à chaque
// séance pendant 6 semaines) — reste simple et sûr pour un débutant, sans ajouter de volume.
const ACCESSORY_POOL: Record<MainLift, Array<{ nom: string; ratio: number; reps: number }>> = {
  squat: [
    { nom: 'Extensions de Jambes', ratio: 0.3, reps: 15 },
    { nom: 'Presse à Jambes', ratio: 1.1, reps: 12 },
  ],
  bench: [
    { nom: 'Extensions Triceps', ratio: 0.15, reps: 15 },
    { nom: 'Dips (assistés si besoin)', ratio: 0, reps: 8 },
  ],
  deadlift: [
    { nom: 'Tractions Assistées', ratio: 0, reps: 8 },
    { nom: 'Fentes Bulgares', ratio: 0.2, reps: 10 },
  ],
};

function buildAccessory(lift: MainLift, rm: number, sessionIndex: number): GeneratedExercise {
  const accessory = ACCESSORY_POOL[lift][sessionIndex % 2];
  const poids = accessory.ratio > 0 ? roundToPlates(rm * accessory.ratio) : 0;
  return {
    nom: accessory.nom,
    type: 'accessoire',
    series: 3,
    reps: accessory.reps,
    poids,
    pourcentage: poids > 0 ? pctOf(poids, rm) : 0,
    repos: '90s',
  };
}

function createLiftBlock(lift: MainLift, weight: number, sessionIndex: number): GeneratedExercise[] {
  const nom = MAIN_LIFT_NOM[lift];
  const warmup = buildWarmupSets(nom, weight, [
    { pct: 0.5, reps: 5 },
    { pct: 0.7, reps: 3 },
    { pct: 0.85, reps: 2 },
  ]) as GeneratedExercise[];

  const mainSets: GeneratedExercise[] = [1, 2, 3].map(() => ({
    nom,
    type: 'travail',
    series: 1,
    reps: 5,
    poids: weight,
    pourcentage: 0, // recalculé ensuite (voir appelant, qui connaît le 1RM de référence)
    repos: lift === 'deadlift' ? '3 min' : '2-3 min',
  }));

  return [...warmup, ...mainSets, buildAccessory(lift, weight, sessionIndex)];
}

// Génère le programme Apprentissage. `startWeek` permet de reprendre après une semaine de test.
export function generateApprentissage(
  config: PowerliftingProgramConfig,
  maxes: UserMaxes,
  startWeek: number = 1
): GeneratedPowerliftingProgram {
  const days = config.trainingDays;
  const nbWeeks = 6;
  const sessionsParSemaine = days.length;

  // État de progression par mouvement, incrémenté séance après séance (pas semaine après semaine).
  const currentWeight: Record<MainLift, number> = {
    squat: roundToPlates(maxes.squat * STARTING_PCT.squat),
    bench: roundToPlates(maxes.bench * STARTING_PCT.bench),
    deadlift: roundToPlates(maxes.deadlift * STARTING_PCT.deadlift),
  };
  const exposureCount: Record<MainLift, number> = { squat: 0, bench: 0, deadlift: 0 };

  const advance = (lift: MainLift) => {
    exposureCount[lift]++;
    if (lift === 'bench') {
      if (exposureCount.bench % BENCH_INCREMENT_EVERY_N_SESSIONS === 0) {
        currentWeight.bench = roundToPlates(currentWeight.bench + SESSION_INCREMENT_KG.bench);
      }
    } else {
      currentWeight[lift] = roundToPlates(currentWeight[lift] + SESSION_INCREMENT_KG[lift]);
    }
  };

  const sessions: GeneratedSession[] = [];
  let globalSessionIndex = 0;

  for (let semaine = 1; semaine <= nbWeeks; semaine++) {
    const semaineAbsolue = startWeek + semaine - 1;

    for (let jour = 0; jour < sessionsParSemaine; jour++) {
      // Alterne A (Squat + Bench) / B (Squat + Deadlift) — le squat revient à chaque séance, bench
      // et deadlift en alternance pour répartir la fatigue, conformément au schéma le plus documenté.
      const isSessionA = globalSessionIndex % 2 === 0;
      const secondLift: MainLift = isSessionA ? 'bench' : 'deadlift';

      const squatBlock = createLiftBlock('squat', currentWeight.squat, globalSessionIndex).map((ex) =>
        ex.type === 'travail' ? { ...ex, pourcentage: pctOf(ex.poids, maxes.squat) } : ex
      );
      const secondBlock = createLiftBlock(secondLift, currentWeight[secondLift], globalSessionIndex).map((ex) =>
        ex.type === 'travail' ? { ...ex, pourcentage: pctOf(ex.poids, maxes[secondLift]) } : ex
      );

      const exercises = assignExerciseIds(`appr-${semaineAbsolue}-${jour}`, [...squatBlock, ...secondBlock]);

      sessions.push({
        id: `appr-${semaineAbsolue}-${jour}`,
        nom: `Semaine ${semaineAbsolue} - ${days[jour]}`,
        day: days[jour],
        phase: 'Adaptation',
        intensity: 'Modérée',
        duration: exercises.length * 8,
        exercises,
        notes: `Séance ${isSessionA ? 'A' : 'B'} — Squat + ${MAIN_LIFT_NOM[secondLift]} — Apprentissage. Priorité à la technique : chaque série de travail doit rester propre. La charge augmente à chaque séance sur ce mouvement (${SESSION_INCREMENT_KG[secondLift] === 2.5 && secondLift !== 'bench' ? '+2.5kg' : 'progression douce'}).`,
        equipment: ['Barre', 'Disques', 'Rack'],
      });

      advance('squat');
      advance(secondLift);
      globalSessionIndex++;
    }
  }

  return {
    id: `apprentissage-${Date.now()}`,
    nom: 'Programme Apprentissage',
    description: `Progression linéaire débutant (façon Starting Strength / GreySkull LP) : charge à ~${Math.round(STARTING_PCT.squat * 100)}-${Math.round(STARTING_PCT.deadlift * 100)}% de vos 1RM (Squat ${maxes.squat}kg, Bench ${maxes.bench}kg, Deadlift ${maxes.deadlift}kg), qui augmente à chaque séance. Squat travaillé quasiment à chaque séance, bench et deadlift en alternance pour bien répartir la fatigue le temps d'acquérir les mouvements.`,
    duree: startWeek - 1 + nbWeeks,
    sessions,
    type: 'apprentissage',
  };
}
