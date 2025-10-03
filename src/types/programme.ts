
export interface ClientProfile {
  nom: string;
  age: number;
  poids?: number;
  taille?: number; // en cm
  imc?: number; // calculé automatiquement
  niveau: 'débutant' | 'intermédiaire' | 'avancé';
  objectif: 'prise_de_masse' | 'perte_de_poids' | 'remise_en_forme' | 'endurance' | 'force';
  vitesse_progression: 'maintien' | 'progression_legere' | 'progression_rapide';
  jours_disponibles: string[];
  contraintes_medicales: string[];
  limitations_physiques?: string;
  equipement_disponible: string[];
  format_souhaite: 'en_ligne' | 'presentiel' | 'salle' | 'exterieur';
  rm_values?: {
    developpe_couche?: number;
    squat?: number;
    souleve_de_terre?: number;
    developpe_militaire?: number;
    rowing?: number;
  };
}

export interface BlocExercice {
  nom: string;
  type: 'composé' | 'isolé' | 'cardio' | 'accessoire' | 'étirement' | 'gainage';
  focus: string;
  difficulté: number;
  muscles_sollicités: string[];
  charge: number;
  répétitions: number | string;
  séries?: number;
  temps_repos?: string;
  équipement: string[];
  description?: string;
  contraintes_médicales?: string[];
  pourcentage_rm?: number; // Nouveau champ pour les exercices de force
  exercice_rm?: 'developpe_couche' | 'squat' | 'souleve_de_terre' | 'developpe_militaire' | 'rowing';
}

export interface SeanceJour {
  nom: string;
  focus: string;
  blocs: BlocExercice[];
  durée_estimée?: number;
  niveau_intensité?: 'faible' | 'modérée' | 'élevée';
}

export interface ProgrammeHebdomadaire {
  [jour: string]: SeanceJour;
}

export interface Contraintes {
  médicales: string[];
  limitations?: string;
  équipement: string[];
}

export interface Exercice {
  nom: string;
  type: 'force' | 'hypertrophie' | 'endurance' | 'skill' | 'mixte';
  groupeMusculaire: string;
  difficulte: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  series?: number;
  repetitions?: number;
  poids?: number;
  repos?: number; // en secondes
}

export interface Seance {
  id: string;
  nom: string;
  exercices: Exercice[];
  duree: number;
  notes?: string;
}

export interface Programme {
  id: string;
  nom: string;
  description: string;
  duree: number;
  seancesParSemaine?: number;
  sessions?: any[];
  seances?: Seance[];
  phases?: {
    adaptation: any[];
    progression: any[];
    specialisation: any[];
  };
  progression?: {
    totalSessions: number;
    sessionsParSemaine: number;
    dureeMoyenne: number;
  };
  dateCreation?: string;
}
