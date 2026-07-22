// Programme "Spé" — spécialisation OPTIONNELLE : on choisit 1 ou 2 mouvements à spécialiser (plus
// de fréquence, variantes lourd/volume/technique/vitesse), le(s) mouvement(s) restant(s) passe(nt)
// en simple entretien allégé (1x/semaine minimum, peut monter si des jours restent disponibles).
// Schéma largement documenté dans la communauté powerlifting (Stronger by Science, Smolov,
// Smolov Jr, Coan/Phillipi) même s'il n'existe pas de protocole unique canonique — cf. recherche.
import { buildWarmupSets, buildMainLiftSets, roundToPlates, pctOf, assignExerciseIds } from '../../programmeGenerator';
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

const REPOS_LOURD: Record<MainLift, string> = { squat: '3-4 min', bench: '3 min', deadlift: '3-4 min' };

const ALL_LIFTS: MainLift[] = ['squat', 'bench', 'deadlift'];

// Répartit les jours disponibles : 1 jour minimum garanti par mouvement (ciblé OU entretien), tout
// le reste part en fréquence supplémentaire sur les mouvements CIBLÉS uniquement (jamais sur
// l'entretien — c'est tout l'intérêt d'un bloc de spécialisation), en alternance si 2 cibles.
function planFrequencies(totalDays: number, targets: MainLift[]): { targetDays: Record<MainLift, number>; maintenanceLifts: MainLift[] } {
  const maintenanceLifts = ALL_LIFTS.filter((l) => !targets.includes(l));
  const targetDays: Partial<Record<MainLift, number>> = {};
  targets.forEach((t) => { targetDays[t] = 1; });

  let remaining = totalDays - targets.length - maintenanceLifts.length;
  let i = 0;
  while (remaining > 0) {
    const t = targets[i % targets.length];
    targetDays[t] = (targetDays[t] || 0) + 1;
    remaining--;
    i++;
  }

  return { targetDays: targetDays as Record<MainLift, number>, maintenanceLifts };
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
  targets: MainLift[],
  startWeek: number = 1
): GeneratedPowerliftingProgram {
  const days = config.trainingDays;
  const totalDays = days.length;
  const { targetDays, maintenanceLifts } = planFrequencies(totalDays, targets);
  const nbCycles = 2;

  const sessions: GeneratedSession[] = [];
  const flavorCursor: Record<string, number> = {};
  targets.forEach((t) => { flavorCursor[t] = 0; });

  for (let cycle = 1; cycle <= nbCycles; cycle++) {
    const targetWorkingMax: Partial<Record<MainLift, number>> = {};
    targets.forEach((t) => { targetWorkingMax[t] = roundToPlates(maxes[t] + CYCLE_INCREMENT[t] * (cycle - 1)); });
    const maintenanceMax: Partial<Record<MainLift, number>> = {};
    maintenanceLifts.forEach((l) => { maintenanceMax[l] = roundToPlates(maxes[l] + MAINTENANCE_CYCLE_INCREMENT[l] * (cycle - 1)); });

    for (let semaineDansCycle = 1; semaineDansCycle <= 4; semaineDansCycle++) {
      const semaineAbsolue = startWeek + (cycle - 1) * 4 + (semaineDansCycle - 1);
      const isDeload = semaineDansCycle === 4;
      let jourIndex = 0;

      targets.forEach((target) => {
        const freq = targetDays[target];
        for (let occurrence = 0; occurrence < freq; occurrence++, jourIndex++) {
          if (!days[jourIndex]) return;
          const flavor = FLAVOR_CYCLE[flavorCursor[target] % FLAVOR_CYCLE.length];
          flavorCursor[target]++;
          const { exercises: raw, label } = buildTargetSession(flavor, target, targetWorkingMax[target]!, isDeload);
          const exercises = assignExerciseIds(`spe-${semaineAbsolue}-${target}-${occurrence}`, raw);
          sessions.push({
            id: `spe-${semaineAbsolue}-${target}-${occurrence}`,
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
      });

      maintenanceLifts.forEach((lift) => {
        if (!days[jourIndex]) return;
        const raw = buildMaintenanceSession(lift, maintenanceMax[lift]!, isDeload);
        const exercises = assignExerciseIds(`spe-${semaineAbsolue}-${lift}-maint`, raw);
        sessions.push({
          id: `spe-${semaineAbsolue}-${lift}-maint`,
          nom: `Semaine ${semaineAbsolue} - ${days[jourIndex]}`,
          day: days[jourIndex],
          phase: isDeload ? 'Deload' : 'Entretien',
          intensity: 'Modérée',
          duration: exercises.length * 10,
          exercises,
          notes: `Entretien ${MAIN_LIFT_NOM[lift].toLowerCase()} — charge allégée pour ne pas régresser pendant le bloc de spécialisation ${targets.map((t) => MAIN_LIFT_NOM[t].toLowerCase()).join(' et ')} (Cycle ${cycle}).`,
          equipment: ['Barre', 'Disques', 'Rack'],
        });
        jourIndex++;
      });
    }
  }

  const targetLabel = targets.map((t) => MAIN_LIFT_NOM[t]).join(' + ');
  const freqLabel = targets.map((t) => `${MAIN_LIFT_NOM[t].toLowerCase()} ${targetDays[t]}x/semaine`).join(', ');

  return {
    id: `spe-${Date.now()}`,
    nom: `Spé — ${targetLabel}`,
    description: `Bloc de spécialisation optionnelle : ${freqLabel} (alternance lourd/volume/technique/vitesse), ${maintenanceLifts.map((l) => MAIN_LIFT_NOM[l].toLowerCase()).join(' et ')} maintenu${maintenanceLifts.length > 1 ? 's' : ''} en charge allégée pour ne pas régresser pendant le bloc.`,
    duree: startWeek - 1 + nbCycles * 4,
    sessions,
    type: 'spe',
  };
}
