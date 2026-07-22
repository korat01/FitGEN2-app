// Programme "Classique" — 5/3/1 de Jim Wendler (méthode originale, cf. recherche sourcée : TM =
// 90% du 1RM, vague 3 semaines + 1 semaine de deload, warm-up 40/50/60%, supplémentaire FSL/BBB).
import { buildWarmupSets, buildMainLiftSets, roundToPlates, pctOf, assignExerciseIds } from '../../programmeGenerator';
import { computeTrainingMaxes, TM_CYCLE_INCREMENT } from '../maxes';
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

const REPOS_PRINCIPAL: Record<MainLift, string> = {
  squat: '3-4 min',
  bench: '3 min',
  deadlift: '3-4 min',
};

// Rampe d'échauffement standard 5/3/1 : identique chaque semaine, avant les 3 sets de travail.
const WENDLER_WARMUP = [
  { pct: 0.4, reps: 5 },
  { pct: 0.5, reps: 5 },
  { pct: 0.6, reps: 3 },
];

// Vague 3 semaines + deload, en % du Training Max — cf. rapport de recherche (BarBend, Lift Vault,
// jimwendler.com) : 5/5/5+, 3/3/3+, 5/3/1+, puis deload 5/5/5 à faible intensité.
type WaveSet = { reps: number | string; pct: number };
const WAVE_BY_WEEK: Record<number, WaveSet[]> = {
  1: [{ reps: 5, pct: 0.65 }, { reps: 5, pct: 0.75 }, { reps: '5+', pct: 0.85 }],
  2: [{ reps: 3, pct: 0.7 }, { reps: 3, pct: 0.8 }, { reps: '3+', pct: 0.9 }],
  3: [{ reps: 5, pct: 0.75 }, { reps: 3, pct: 0.85 }, { reps: '1+', pct: 0.95 }],
  4: [{ reps: 5, pct: 0.4 }, { reps: 5, pct: 0.5 }, { reps: 5, pct: 0.6 }], // deload
};

// Plusieurs accessoires cohérents par mouvement (pas juste 2 fixes) — on en prend 2 par séance en
// alternant selon la semaine, pour varier le stimulus sur le cycle plutôt que de répéter exactement
// les 2 mêmes exercices 8 semaines de suite. Le poids est exprimé en ratio du Training Max du jour
// (sauf mention contraire), cohérent avec le reste du module.
interface AccessoryDef {
  nom: string;
  ratio: number;
  series: number;
  reps: number;
  repos: string;
}

const ACCESSORY_POOL: Record<MainLift, AccessoryDef[]> = {
  squat: [
    { nom: 'Presse à Jambes', ratio: 1.2, series: 3, reps: 12, repos: '90s' },
    { nom: 'Fentes Bulgares', ratio: 0.25, series: 3, reps: 10, repos: '90s' },
    { nom: 'Fentes lestées', ratio: 0.15, series: 3, reps: 10, repos: '90s' },
    { nom: 'Extensions de Jambes', ratio: 0.35, series: 3, reps: 15, repos: '90s' },
  ],
  bench: [
    { nom: 'Développé Prise Serrée', ratio: 0.55, series: 3, reps: 10, repos: '90s' },
    { nom: 'Dips Lestés', ratio: 0.2, series: 3, reps: 10, repos: '90s' },
    { nom: 'Tractions Lestées', ratio: 0.15, series: 3, reps: 8, repos: '90s' },
    { nom: 'Extensions Triceps', ratio: 0.15, series: 3, reps: 15, repos: '60s' },
  ],
  deadlift: [
    { nom: 'Soulevé de Terre Roumain', ratio: 0.45, series: 3, reps: 10, repos: '90s' },
    { nom: 'Rowing Barre', ratio: 0.45, series: 3, reps: 10, repos: '90s' },
    { nom: 'Fentes Bulgares', ratio: 0.25, series: 3, reps: 10, repos: '90s' },
    { nom: 'Extensions Lombaires', ratio: 0, series: 3, reps: 15, repos: '60s' },
  ],
};

// Alterne les 2 accessoires servis chaque semaine (semaines paires vs impaires) plutôt que de
// toujours prendre les 2 premiers de la liste — la Presse à Jambes/RDL/Tractions reviennent chacun
// leur tour, pas systématiquement les 4 chaque séance (durée de séance sinon trop longue).
function buildAccessories(lift: MainLift, tm: number, semaineAbsolue: number): GeneratedExercise[] {
  const pool = ACCESSORY_POOL[lift];
  const offset = semaineAbsolue % 2 === 0 ? 2 : 0;
  const picked = [pool[offset], pool[offset + 1]];
  return picked.map(({ nom, ratio, series, reps, repos }) => {
    const poids = ratio > 0 ? roundToPlates(tm * ratio) : 0;
    return { nom, type: 'accessoire', series, reps, poids, pourcentage: poids > 0 ? pctOf(poids, tm) : 0, repos };
  });
}

// First Set Last (FSL) : 5x5 au poids du PREMIER set de travail de la semaine — reste plus proche
// de l'intensité du jour que le BBB (5x10 à 50-60% fixe), cf. jimwendler.com / Lift Vault.
function buildFSL(nom: string, tm: number, firstSetPct: number): GeneratedExercise[] {
  return buildMainLiftSets(nom, tm, [
    { reps: 5, pct: firstSetPct }, { reps: 5, pct: firstSetPct }, { reps: 5, pct: firstSetPct },
    { reps: 5, pct: firstSetPct }, { reps: 5, pct: firstSetPct },
  ], '2 min') as GeneratedExercise[];
}

function createMainSession(
  semaineAbsolue: number,
  semaineDansCycle: number,
  cycle: number,
  lift: MainLift,
  tm: number,
  dayName: string,
  volumeExtraFor: MainLift | null
): GeneratedSession {
  const nomPrincipal = MAIN_LIFT_NOM[lift];
  const wave = WAVE_BY_WEEK[semaineDansCycle];
  const isDeload = semaineDansCycle === 4;

  let exercises: GeneratedExercise[];
  let notes: string;

  if (volumeExtraFor) {
    // Jour de volume supplémentaire (4e/5e/6e jour selon les jours choisis) façon BBB, à intensité
    // fixe et modérée — la fréquence en plus sur ce mouvement, pas une 2e montée en charge maximale
    // dans la semaine. Un seul mouvement ciblé par jour de volume (bench, puis squat, puis deadlift).
    const nomVolume = MAIN_LIFT_NOM[volumeExtraFor];
    const poidsBBB = roundToPlates(tm * (isDeload ? 0.4 : 0.5));
    const warmup = buildWarmupSets(nomVolume, poidsBBB, WENDLER_WARMUP) as GeneratedExercise[];
    const bbb = Array.from({ length: 5 }, () => ({
      nom: `${nomVolume} (volume)`,
      type: 'travail' as const,
      series: 1,
      reps: 10,
      poids: poidsBBB,
      pourcentage: pctOf(poidsBBB, tm),
      repos: '90s',
    }));
    exercises = [...warmup, ...bbb, ...buildAccessories(volumeExtraFor, tm, semaineAbsolue)];
    notes = `Bloc Volume (Boring But Big) — ${nomVolume.toLowerCase()}, 5x10 à charge fixe (Cycle ${cycle}).`;
  } else {
    const firstWorkingWeight = roundToPlates(tm * wave[0].pct);
    const warmup = buildWarmupSets(nomPrincipal, firstWorkingWeight, WENDLER_WARMUP) as GeneratedExercise[];
    const mainSets = buildMainLiftSets(nomPrincipal, tm, wave, REPOS_PRINCIPAL[lift]) as GeneratedExercise[];
    const fsl = isDeload ? [] : buildFSL(`${nomPrincipal} (FSL)`, tm, wave[0].pct);
    exercises = [...warmup, ...mainSets, ...fsl, ...buildAccessories(lift, tm, semaineAbsolue)];
    const semaineLabel = isDeload ? 'Deload' : semaineDansCycle === 1 ? '5/5/5+' : semaineDansCycle === 2 ? '3/3/3+' : '5/3/1+';
    notes = isDeload
      ? 'Semaine de deload — intensité réduite, aucun AMRAP. Profitez-en pour récupérer avant le cycle suivant.'
      : `5/3/1 — semaine ${semaineLabel} sur ${nomPrincipal.toLowerCase()} (Training Max ${tm}kg, Cycle ${cycle}). Le dernier set est un AMRAP : allez chercher un maximum de répétitions propres.`;
  }

  return {
    id: `531-${semaineAbsolue}-${lift}${volumeExtraFor ? `-vol-${volumeExtraFor}` : ''}`,
    nom: `Semaine ${semaineAbsolue} - ${dayName}`,
    day: dayName,
    phase: isDeload ? 'Deload' : semaineDansCycle === 1 ? 'Adaptation' : semaineDansCycle === 2 ? 'Progression' : 'Spécialisation',
    intensity: isDeload ? 'Faible' : semaineDansCycle === 3 ? 'Maximale' : 'Élevée',
    duration: exercises.length * 10,
    exercises: assignExerciseIds(`531-${semaineAbsolue}-${lift}${volumeExtraFor ? `-vol-${volumeExtraFor}` : ''}`, exercises),
    notes,
    equipment: ['Barre', 'Disques', 'Rack'],
  };
}

// Jours de volume supplémentaires au-delà des 3 jours principaux (squat/bench/deadlift) : bench en
// 4e jour, squat en 5e, deadlift en 6e — dans cet ordre, pour rester cohérent avec l'ordre des 3
// jours principaux et ne jamais faire travailler le même mouvement 2x en intensité max la semaine.
const DEFAULT_EXTRA_DAY_LIFT: MainLift[] = ['bench', 'squat', 'deadlift'];

// Spécialisation optionnelle DANS le Classique : si l'utilisateur a choisi 1 ou 2 mouvements à
// spécialiser (même champ `speTargets` que le programme "Spé"), les jours en plus (au-delà des 3
// jours de base) vont TOUS sur ce(s) mouvement(s) en alternance, au lieu de l'ordre par défaut
// bench->squat->deadlift. Sans choix (optionnel, la plupart des utilisateurs skip cette étape dans
// le modal), le comportement d'origine est inchangé.
function resolveExtraDayLifts(nbExtraDays: number, speTargets?: MainLift[]): MainLift[] {
  if (!speTargets || speTargets.length === 0) {
    return DEFAULT_EXTRA_DAY_LIFT.slice(0, nbExtraDays);
  }
  return Array.from({ length: nbExtraDays }, (_, i) => speTargets[i % speTargets.length]);
}

// Génère le programme Classique (5/3/1) sur 2 cycles de 4 semaines (progression de TM visible sans
// avoir à régénérer). `startWeek` permet de reprendre la numérotation après une semaine de test
// (semaine 1 = test, le vrai programme démarre alors à "Semaine 2").
export function generateClassique531(
  config: PowerliftingProgramConfig,
  maxes: UserMaxes,
  startWeek: number = 1
): GeneratedPowerliftingProgram {
  const days = config.trainingDays;
  const liftForDay: MainLift[] = ['squat', 'bench', 'deadlift'];
  const nbExtraDays = Math.max(0, Math.min(3, days.length - 3));
  const extraDayLifts = resolveExtraDayLifts(nbExtraDays, config.speTargets);

  const sessions: GeneratedSession[] = [];
  const nbCycles = 2;

  for (let cycle = 1; cycle <= nbCycles; cycle++) {
    const tmParCycle = computeTrainingMaxes(maxes);
    (['squat', 'bench', 'deadlift'] as MainLift[]).forEach((lift) => {
      tmParCycle[lift] += TM_CYCLE_INCREMENT[lift] * (cycle - 1);
    });

    for (let semaineDansCycle = 1; semaineDansCycle <= 4; semaineDansCycle++) {
      const semaineAbsolue = startWeek + (cycle - 1) * 4 + (semaineDansCycle - 1);

      liftForDay.forEach((lift, jourIndex) => {
        if (!days[jourIndex]) return;
        sessions.push(
          createMainSession(semaineAbsolue, semaineDansCycle, cycle, lift, tmParCycle[lift], days[jourIndex], null)
        );
      });

      for (let extra = 0; extra < nbExtraDays; extra++) {
        const jourIndex = 3 + extra;
        if (!days[jourIndex]) continue;
        const targetLift = extraDayLifts[extra];
        sessions.push(
          createMainSession(semaineAbsolue, semaineDansCycle, cycle, targetLift, tmParCycle[targetLift], days[jourIndex], targetLift)
        );
      }
    }
  }

  const extraLabel = nbExtraDays > 0
    ? ` + volume ${Array.from(new Set(extraDayLifts)).map((l) => MAIN_LIFT_NOM[l].toLowerCase()).join('/')}`
    : '';

  return {
    id: `classique531-${Date.now()}`,
    nom: '5/3/1 — Programme Classique',
    description: `Méthode 5/3/1 de Jim Wendler, basée sur vos Training Max (90% de vos 1RM réels : Squat ${maxes.squat}kg, Bench ${maxes.bench}kg, Deadlift ${maxes.deadlift}kg). Vague progressive sur 3 semaines (5/5/5+, 3/3/3+, 5/3/1+) suivie d'un deload, avec travail supplémentaire (FSL${extraLabel}) et accessoires ciblés et variés.`,
    duree: startWeek - 1 + nbCycles * 4,
    sessions,
    type: 'classique',
  };
}
