// Mode Coach — prototype sans serveur : toutes les données (coachés, repas envoyés, programmes
// assignés) vivent dans le localStorage du coach lui-même. Pas de vraie synchro avec le téléphone
// du coaché tant qu'aucun backend n'est branché (voir coachingData.ts pour le détail).

export type JourSemaine = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export const JOURS_SEMAINE: JourSemaine[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

export interface MealLogEntry {
  id: string;
  nom: string;
  emoji: string;
  heure: string; // "08:30"
  calories: number;
  /** Si envoyé par le coach plutôt que logué par le coaché lui-même. */
  envoyeParCoach?: boolean;
}

export interface ProgramExercise {
  id: string;
  nom: string;
  type: string;
  /** Séries — vide pour un exercice de type cardio/distance pur. */
  series?: number;
  repetitions?: number;
  /** Charge en kg — 0 ou vide si non applicable (poids du corps, étirement...). */
  charge?: number;
  /** Pour les exercices chronométrés (gainage, cardio en temps) — en secondes. */
  dureeSecondes?: number;
  /** Pour les exercices de distance (course, rameur...) — en mètres. */
  distanceMetres?: number;
  /** Repos entre séries — en secondes. */
  reposSecondes?: number;
  notes?: string;
}

export type AssignedProgram = Partial<Record<JourSemaine, ProgramExercise[]>>;

export interface CoachedClient {
  id: string;
  name: string;
  avatarEmoji: string;
  sportClass: string;
  rank: string;
  /** Pas du jour — simulés côté prototype (pas de vrai accès pedometer sans app native). */
  stepsToday: number;
  stepsGoal: number;
  meals: MealLogEntry[];
  program: AssignedProgram;
  lastActivityLabel: string;
}
