// Point d'entrée du système modulaire de génération de programmes powerlifting. Ajouter un
// nouveau type de programme ne demande qu'un fichier `programs/xxx.ts` de plus + une entrée dans
// `generateByType` ci-dessous — le reste (modal, Programme.tsx, couche adaptative) n'a pas à changer.
import { generateTestWeek } from './testWeek';
import { generateClassique531 } from './programs/classique531';
import { generateApprentissage } from './programs/apprentissage';
import { generateSpecialisation } from './programs/specialisation';
import { getLoggedMaxes, getMissingLifts, hasAllMaxes } from './maxes';
import type { GeneratedPowerliftingProgram, MainLift, PowerliftingProgramConfig, UserMaxes } from './types';

export * from './types';
export { getLoggedMaxes, getMissingLifts, hasAllMaxes, computeTrainingMax, computeTrainingMaxes, TM_RATIO } from './maxes';
export { generateTestWeek } from './testWeek';

function generateByType(config: PowerliftingProgramConfig, maxes: UserMaxes, startWeek: number): GeneratedPowerliftingProgram {
  switch (config.type) {
    case 'classique':
      return generateClassique531(config, maxes, startWeek);
    case 'apprentissage':
      return generateApprentissage(config, maxes, startWeek);
    case 'spe': {
      const targets: MainLift[] = config.speTargets && config.speTargets.length > 0 ? config.speTargets : ['squat'];
      return generateSpecialisation(config, maxes, targets, startWeek);
    }
    default: {
      const exhaustive: never = config.type;
      throw new Error(`Type de programme inconnu: ${exhaustive}`);
    }
  }
}

export interface NewProgramResult {
  program: GeneratedPowerliftingProgram;
  missingLifts: MainLift[];
}

// Point d'entrée principal : vérifie d'abord si l'utilisateur a déjà ses perfs (1RM). Si oui, le
// programme complet est généré directement dessus. Sinon, une semaine de test est générée à la
// place — voir `continueAfterTestWeek` pour la suite une fois les résultats saisis.
export function createNewPowerliftingProgram(config: PowerliftingProgramConfig): NewProgramResult {
  const logged = getLoggedMaxes();
  const missing = getMissingLifts(logged);

  if (missing.length > 0) {
    return { program: generateTestWeek(config, missing), missingLifts: missing };
  }

  const maxes: UserMaxes = { squat: logged.squat!, bench: logged.bench!, deadlift: logged.deadlift! };
  return { program: generateByType(config, maxes, 1), missingLifts: [] };
}

// Après une semaine de test : si les 3 perfs sont maintenant connues (l'utilisateur les a saisies
// dans Stats), génère le vrai programme et le concatène à la suite de la semaine de test — la
// numérotation continue donc à "Semaine 2" comme demandé, sans perdre l'historique de la semaine 1.
export function continueAfterTestWeek(
  config: PowerliftingProgramConfig,
  testProgram: GeneratedPowerliftingProgram
): GeneratedPowerliftingProgram | null {
  const logged = getLoggedMaxes();
  if (!hasAllMaxes(logged)) return null;

  const realProgram = generateByType(config, logged, testProgram.duree + 1);

  return {
    ...realProgram,
    id: testProgram.id,
    sessions: [...testProgram.sessions, ...realProgram.sessions],
    duree: realProgram.duree,
    isTestWeek: false,
  };
}
