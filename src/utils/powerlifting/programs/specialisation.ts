// Programmes de "Spécialisation" (Bench / Squat / Deadlift) — fréquence plus élevée sur le
// mouvement choisi (2 à 4x/semaine selon le nombre de jours disponibles, avec des variantes
// heavy/volume/technique/vitesse), les 2 autres mouvements passant en simple entretien 1x/semaine.
// Schéma largement documenté dans la communauté powerlifting (Stronger by Science, Smolov,
// Smolov Jr, Coan/Phillipi) même s'il n'existe pas de protocole unique canonique — cf. recherche.
import { buildWarmupSets, buildMainLiftSets, roundToPlates, pctOf, assignExerciseIds } from '../../programmeGenerator';
import type {
  GeneratedExercise,
  GeneratedPowerliftingProgram,
  GeneratedSession,
  MainLift,
  PowerliftingProgramConfig,
  ProgramType,
  UserMaxes,
} from '../types';

const MAIN_LIFT_NOM: Record<MainLift, string> = {
  squat: 'Squat',
  bench: 'Développé Couché',
  deadlift: 'Soulevé de Terre',
};

const REPOS_LOURD: Record<MainLift, string> = { squat: '3-4 min', bench: '3 min', deadlift: '3-4 min' };

// Combien de fois par semaine le mouvement spécialisé revient, selon le nombre total de jours
// choisis — toute la marge supplémentaire va sur le mouvement ciblé, jamais sur l'entretien.
function targetFrequency(totalDays: number): number {
  if (totalDays <= 3) return 2;
  if (totalDays === 4) return 2;
  if (totalDays === 5) return 3;
  return 4; // 6 jours
}

type Flavor = 'heavy' | 'volume' | 'technique' | 'vitesse';
const FLAVOR_CYCLE: Flavor[] = ['heavy', 'volume', 'technique', 'vitesse'];

function buildTargetSession(
  flavor: Flavor,
  lift: MainLift,
  workingMax: number,
  isDeload: boolean
): { exercises: GeneratedExercise[]; label: string } {
  const nom = MAIN_LIFT_NOM[lift];
  const deloadFactor = isDeload ? 0.85 : 1;

  let scheme: Array<{ reps: number | string; pct: number }>;
  let label: string;
  let nomTravail = nom;

  switch (flavor) {
    case 'heavy':
      scheme = [{ reps: 3, pct: 0.8 * deloadFactor }, { reps: 2, pct: 0.87 * deloadFactor }, { reps: 2, pct: 0.9 * deloadFactor }];
      label = 'Lourd';
      break;
    case 'volume':
      scheme = [{ reps: 8, pct: 0.65 * deloadFactor }, { reps: 8, pct: 0.7 * deloadFactor }, { reps: 6, pct: 0.72 * deloadFactor }, { reps: 6, pct: 0.72 * deloadFactor }];
      label = 'Volume';
      break;
    case 'technique':
      scheme = [{ reps: 5, pct: 0.65 * deloadFactor }, { reps: 5, pct: 0.68 * deloadFactor }, { reps: 5, pct: 0.68 * deloadFactor }];
      label = lift === 'deadlift' ? 'Technique (pause 2ct)' : 'Technique (pause 3ct)';
      nomTravail = `${nom} Pause`;
      break;
    case 'vitesse':
      scheme = [{ reps: 3, pct: 0.55 * deloadFactor }, { reps: 3, pct: 0.55 * deloadFactor }, { reps: 3, pct: 0.6 * deloadFactor }, { reps: 3, pct: 0.6 * deloadFactor }, { reps: 3, pct: 0.6 * deloadFactor }];
      label = 'Vitesse';
      nomTravail = `${nom} (vitesse)`;
      break;
  }

  const firstWeight = roundToPlates(workingMax * scheme[0].pct);
  const warmup = buildWarmupSets(nom, firstWeight, [
    { pct: 0.4, reps: 8 }, { pct: 0.55, reps: 5 }, { pct: 0.7, reps: 3 },
  ]) as GeneratedExercise[];
  const mainSets = buildMainLiftSets(nomTravail, workingMax, scheme, REPOS_LOURD[lift]) as GeneratedExercise[];

  return { exercises: [...warmup, ...mainSets], label };
}

function buildMaintenanceSession(lift: MainLift, workingMax: number, isDeload: boolean): GeneratedExercise[] {
  const nom = MAIN_LIFT_NOM[lift];
  const pct = isDeload ? 0.6 : 0.75;
  const scheme = [{ reps: 5, pct }, { reps: 5, pct }, { reps: 5, pct }];
  const firstWeight = roundToPlates(workingMax * pct);
  const warmup = buildWarmupSets(nom, firstWeight, [{ pct: 0.5, reps: 5 }, { pct: 0.7, reps: 3 }]) as GeneratedExercise[];
  const mainSets = buildMainLiftSets(nom, workingMax, scheme, REPOS_LOURD[lift]) as GeneratedExercise[];
  return [...warmup, ...mainSets];
}

// Progression modeste par cycle de 4 semaines sur le max de travail — pas de TM façon 5/3/1 ici
// (l'app travaille directement par rapport au 1RM réel en dehors du Classique), juste une
// réévaluation prudente cycle après cycle pour rester cohérent avec la fatigue accumulée.
const CYCLE_INCREMENT: Record<MainLift, number> = { squat: 5, bench: 2.5, deadlift: 5 };
const MAINTENANCE_CYCLE_INCREMENT: Record<MainLift, number> = { squat: 2.5, bench: 1.25, deadlift: 2.5 };

export function generateSpecialisation(
  config: PowerliftingProgramConfig,
  maxes: UserMaxes,
  target: MainLift,
  startWeek: number = 1
): GeneratedPowerliftingProgram {
  const days = config.trainingDays;
  const totalDays = days.length;
  const freq = Math.min(targetFrequency(totalDays), totalDays - (totalDays > 3 ? 2 : 1));
  const others = (['squat', 'bench', 'deadlift'] as MainLift[]).filter((l) => l !== target);
  const nbCycles = 2;

  const sessions: GeneratedSession[] = [];
  let flavorCursor = 0;

  for (let cycle = 1; cycle <= nbCycles; cycle++) {
    const targetWorkingMax = roundToPlates(maxes[target] + CYCLE_INCREMENT[target] * (cycle - 1));
    const maintenanceMax: Record<MainLift, number> = {
      squat: maxes.squat, bench: maxes.bench, deadlift: maxes.deadlift,
    };
    others.forEach((l) => { maintenanceMax[l] = roundToPlates(maxes[l] + MAINTENANCE_CYCLE_INCREMENT[l] * (cycle - 1)); });

    for (let semaineDansCycle = 1; semaineDansCycle <= 4; semaineDansCycle++) {
      const semaineAbsolue = startWeek + (cycle - 1) * 4 + (semaineDansCycle - 1);
      const isDeload = semaineDansCycle === 4;
      let jourIndex = 0;

      for (let occurrence = 0; occurrence < freq; occurrence++, jourIndex++) {
        const flavor = FLAVOR_CYCLE[flavorCursor % FLAVOR_CYCLE.length];
        flavorCursor++;
        const { exercises: raw, label } = buildTargetSession(flavor, target, targetWorkingMax, isDeload);
        const exercises = assignExerciseIds(`spec-${semaineAbsolue}-${target}-${occurrence}`, raw);
        sessions.push({
          id: `spec-${semaineAbsolue}-${target}-${occurrence}`,
          nom: `Semaine ${semaineAbsolue} - ${days[jourIndex]}`,
          day: days[jourIndex],
          phase: isDeload ? 'Deload' : 'Spécialisation',
          intensity: isDeload ? 'Faible' : flavor === 'heavy' ? 'Maximale' : 'Élevée',
          duration: exercises.length * 10,
          exercises,
          notes: isDeload
            ? `Deload — ${MAIN_LIFT_NOM[target].toLowerCase()} (${label}), intensité réduite (Cycle ${cycle}).`
            : `Spécialisation ${MAIN_LIFT_NOM[target]} — séance ${label} (Cycle ${cycle}).`,
          equipment: ['Barre', 'Disques', 'Rack'],
        });
      }

      others.forEach((lift) => {
        if (!days[jourIndex]) return;
        const raw = buildMaintenanceSession(lift, maintenanceMax[lift], isDeload);
        const exercises = assignExerciseIds(`spec-${semaineAbsolue}-${lift}-maint`, raw);
        sessions.push({
          id: `spec-${semaineAbsolue}-${lift}-maint`,
          nom: `Semaine ${semaineAbsolue} - ${days[jourIndex]}`,
          day: days[jourIndex],
          phase: isDeload ? 'Deload' : 'Entretien',
          intensity: 'Modérée',
          duration: exercises.length * 10,
          exercises,
          notes: `Entretien ${MAIN_LIFT_NOM[lift].toLowerCase()} — 1x/semaine pour ne pas perdre le mouvement pendant le bloc de spécialisation ${MAIN_LIFT_NOM[target].toLowerCase()} (Cycle ${cycle}).`,
          equipment: ['Barre', 'Disques', 'Rack'],
        });
        jourIndex++;
      });
    }
  }

  const label = MAIN_LIFT_NOM[target];
  return {
    id: `specialisation-${target}-${Date.now()}`,
    nom: `Spécialisation — ${label}`,
    description: `Bloc de spécialisation ${label.toLowerCase()} : ${freq}x/semaine sur ce mouvement (alternance lourd/volume/technique/vitesse), ${others.map((l) => MAIN_LIFT_NOM[l].toLowerCase()).join(' et ')} maintenus 1x/semaine chacun pour ne pas régresser pendant le bloc.`,
    duree: startWeek - 1 + nbCycles * 4,
    sessions,
    type: `specialisation-${target}` as ProgramType,
  };
}
