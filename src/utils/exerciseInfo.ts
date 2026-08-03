export interface ExerciseInfo {
  description: string;
  isIPFLift: boolean;
  /** Repères techniques inspirés des règles IPF (mouvements jugés en compétition) — pas une
      citation littérale du règlement, qui évolue et dont la version en vigueur doit toujours être
      vérifiée sur powerlifting.sport avant une compétition officielle. */
  ipfRules?: string[];
  tips?: string;
}

const SQUAT: ExerciseInfo = {
  description:
    "Le squat consiste à descendre en flexion de hanches/genoux avec la barre posée sur le haut du dos, puis à remonter en position debout, verrouillé. C'est le premier des 3 mouvements du powerlifting.",
  isIPFLift: true,
  ipfRules: [
    'Profondeur : le pli de la hanche doit descendre sous le sommet du genou (pas juste "parallèle").',
    'Signaux arbitre : "Squat" pour démarrer la descente, "Rack" une fois le lift validé et verrouillé.',
    'Disqualifié si : profondeur insuffisante, rebond excessif en bas, pas en arrière/sur le côté, ou remontée incomplète avant de se re-stabiliser.',
  ],
  tips: 'Gainage avant de désengager la barre, descente contrôlée, pas de rebond au fond.',
};

const BENCH: ExerciseInfo = {
  description:
    "Le développé couché se réalise allongé sur le banc, barre amenée à la poitrine puis pressée jusqu'au verrouillage complet des coudes. Deuxième mouvement du powerlifting.",
  isIPFLift: true,
  ipfRules: [
    'Immobilité obligatoire sur la poitrine avant le signal — aucun rebond.',
    'Signaux arbitre : "Start" pour presser, puis "Rack" une fois les coudes totalement verrouillés.',
    'Disqualifié si : fesses/tête/épaules décollent du banc, pieds qui bougent excessivement, verrouillage incomplet, ou barre qui redescend avant le signal.',
  ],
  tips: 'Omoplates serrées et rétractées, trajectoire de barre stable, pause nette sur la poitrine.',
};

const DEADLIFT: ExerciseInfo = {
  description:
    "Le soulevé de terre consiste à tirer la barre du sol jusqu'à la position debout, hanches et genoux totalement verrouillés. Troisième et dernier mouvement du powerlifting.",
  isIPFLift: true,
  ipfRules: [
    'Verrouillage complet obligatoire : hanches ET genoux tendus, épaules en arrière ou à l\'aplomb de la barre.',
    'Signal arbitre : "Down" une fois le lift validé, pour reposer la barre au sol de façon contrôlée.',
    'Disqualifié si : hitch (aide des cuisses par à-coups), recul de la barre vers l\'avant, chute de la barre non contrôlée, ou pas en arrière/avant excessif.',
  ],
  tips: 'Barre proche des tibias tout du long, dos neutre, pas de à-coups (hitch) pour finir le lock-out.',
};

// Descriptions génériques pour les accessoires — pas jugés en compétition, donc pas de règles IPF,
// juste un repère technique/objectif de l'exercice.
const ACCESSORIES: Record<string, ExerciseInfo> = {
  'Presse à Jambes': {
    description: "Extension des jambes sur une presse inclinée, assis, dos calé — cible quadriceps/fessiers avec moins de charge axiale sur la colonne que le squat.",
    isIPFLift: false,
    tips: 'Amplitude complète sans décoller le bas du dos du dossier.',
  },
  'Fentes Bulgares': {
    description: 'Fente arrière pied surélevé sur un banc — travail unilatéral quadriceps/fessiers/ischio-jambiers, utile pour corriger les déséquilibres gauche/droite.',
    isIPFLift: false,
    tips: 'Descente contrôlée, genou avant qui ne dépasse pas trop la pointe du pied.',
  },
  'Fentes lestées': {
    description: 'Fentes marchées ou sur place avec charge additionnelle — renforcement unilatéral jambes/fessiers.',
    isIPFLift: false,
  },
  'Extensions de Jambes': {
    description: 'Isolation du quadriceps sur machine, genou en extension.',
    isIPFLift: false,
    tips: 'Contrôler la descente, éviter de verrouiller sec en haut.',
  },
  'Développé Prise Serrée': {
    description: 'Développé couché mains rapprochées — sollicite davantage les triceps, utile en accessoire du bench.',
    isIPFLift: false,
  },
  'Dips Lestés': {
    description: 'Dips aux barres parallèles avec charge additionnelle — pectoraux/triceps/épaules, bon accessoire pour le lock-out du bench.',
    isIPFLift: false,
  },
  'Dips (assistés si besoin)': {
    description: 'Dips aux barres parallèles, assistés (élastique/machine) si le poids de corps est encore trop lourd — pectoraux/triceps/épaules.',
    isIPFLift: false,
  },
  'Tractions Lestées': {
    description: 'Tractions à la barre fixe avec charge additionnelle — dos/biceps, contribue à la stabilité du haut du dos sur le bench.',
    isIPFLift: false,
  },
  'Tractions Assistées': {
    description: 'Tractions à la barre fixe assistées (élastique/machine) — dos/biceps, base avant de passer aux tractions lestées.',
    isIPFLift: false,
  },
  'Extensions Triceps': {
    description: 'Isolation des triceps (poulie, barre EZ ou haltères) — soutien direct du lock-out au développé couché.',
    isIPFLift: false,
  },
  'Soulevé de Terre Roumain': {
    description: 'Variante du soulevé de terre jambes quasi tendues, amplitude centrée sur la hanche — ischio-jambiers/fessiers/bas du dos.',
    isIPFLift: false,
    tips: 'Barre au contact des jambes, dos neutre, amplitude limitée par la souplesse des ischios (pas besoin de toucher le sol).',
  },
  'Rowing Barre': {
    description: 'Tirage horizontal buste penché — dos (grand dorsal, trapèzes, rhomboïdes), soutient la position du dos au soulevé de terre.',
    isIPFLift: false,
  },
  'Extensions Lombaires': {
    description: 'Renforcement de la chaîne postérieure (lombaires/fessiers/ischio-jambiers) sur banc à lombaires ou au sol.',
    isIPFLift: false,
  },
};

// Retire les suffixes ajoutés par les générateurs (FSL, volume, Pause, vitesse, échauffement, test,
// jour de la semaine...) pour retrouver le nom canonique de l'exercice et lui associer sa fiche.
const normalizeName = (nom: string): string =>
  nom
    .replace(/\s*\(échauffement\)\s*$/i, '')
    .replace(/\s*\(FSL\)\s*$/i, '')
    .replace(/\s*\(volume\)\s*$/i, '')
    .replace(/\s*\(vitesse\)\s*$/i, '')
    .replace(/\s*\(test.*?\)\s*$/i, '')
    .replace(/\s*Pause\s*$/i, '')
    .trim();

export function getExerciseInfo(nom: string): ExerciseInfo | undefined {
  const base = normalizeName(nom);

  if (base === 'Squat') return SQUAT;
  if (base === 'Développé Couché') return BENCH;
  if (base === 'Soulevé de Terre') return DEADLIFT;

  if (ACCESSORIES[base]) return ACCESSORIES[base];

  // Correspondance partielle (ex: "Squat (test — ...)" mal normalisé, ou variante non listée).
  if (base.startsWith('Squat')) return SQUAT;
  if (base.startsWith('Développé Couché')) return BENCH;
  if (base.startsWith('Soulevé de Terre')) return DEADLIFT;

  return undefined;
}
