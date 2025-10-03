import { UserProfile } from '../types/profile';
import { Programme, Exercice, Seance } from '../types/programme';

interface SprintConfig {
    niveau: 'debutant' | 'intermediaire' | 'avance' | 'expert';
    objectif: 'vitesseMax' | 'enduranceVitesse' | '10k' | 'marathon' | 'semi';
  seancesParSemaine: number;
}

export function generateSprintProgram(user: UserProfile): Programme {
  console.log('=== GENERATE SPRINT PROGRAM ===');
  console.log('User reçu:', user);
  
  const config: SprintConfig = {
    niveau: user.niveau || 'intermediaire',
    objectif: user.objectif || 'vitesseMax',
    seancesParSemaine: user.seancesParSemaine || 4
  };
  
  console.log('Config:', config);
  
  const seances: Seance[] = [];

  for (let semaine = 1; semaine <= 4; semaine++) {
    for (let jour = 1; jour <= config.seancesParSemaine; jour++) {
      const seance = createSprintSession(semaine, jour, config);
      seances.push(seance);
    }
  }

  const programme: Programme = {
    id: Date.now().toString(),
    nom: `Sprint - ${config.objectif}`,
    description: `Programme sprint adapté pour ${config.niveau}`,
    duree: 4,
    sessions: seances as any[],
    phases: { adaptation: [], progression: [], specialisation: [] },
    progression: { totalSessions: seances.length, sessionsParSemaine: config.seancesParSemaine, dureeMoyenne: 60 }
  };

  console.log('Programme final:', programme);
  console.log('Nombre de séances:', programme.seances.length);
  
  return programme;
}

function createSprintSession(semaine: number, jour: number, config: SprintConfig): Seance {
  const estDeload = semaine === 4;
  
  let exercices: Exercice[] = [];

  if (config.objectif === 'vitesseMax') {
    exercices = [
      { nom: 'Sprints 30m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Sprints 60m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Back Squat', type: 'force', groupeMusculaire: 'jambes', difficulte: 'avance' }
    ];
  } else {
    exercices = [
      { nom: 'Sprints 150m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'avance' },
      { nom: 'Sprints 400m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'expert' },
      { nom: 'Bounding', type: 'skill', groupeMusculaire: 'jambes', difficulte: 'avance' }
    ];
  }

  // Ajustement selon la semaine
  const multiplicateurSeries = getSeriesMultiplier(semaine, estDeload);

  return {
    id: `${semaine}-${jour}`,
    nom: `Semaine ${semaine} - Jour ${jour}`,
    exercices: exercices.map(ex => ({
      ...ex,
      series: Math.max(2, Math.floor(4 * multiplicateurSeries)),
      repetitions: getRepetitions(ex, estDeload),
      poids: getPoids(ex, estDeload),
      repos: getRepos(ex)
    })),
    duree: calculerDuree(exercices),
    notes: estDeload ? 'Semaine de récupération' : ''
  };
}

function getSeriesMultiplier(semaine: number, estDeload: boolean): number {
  if (estDeload) return 0.5;
  
  switch (semaine) {
    case 1: return 1.0;
    case 2: return 1.25;
    case 3: return 1.5;
    default: return 1.0;
  }
}

function getRepetitions(exercice: Exercice, estDeload: boolean): number {
  if (estDeload) return 8;
  
  switch (exercice.type) {
    case 'endurance': return 1; // Sprints
    case 'force': return 5;
    case 'skill': return 20;
    default: return 8;
  }
}

function getPoids(exercice: Exercice, estDeload: boolean): number {
  if (estDeload) return 70;
  
  switch (exercice.type) {
    case 'force': return 80;
    case 'endurance': return 0; // Poids du corps
    case 'skill': return 0;
    default: return 0;
  }
}

function getRepos(exercice: Exercice): number {
  switch (exercice.type) {
    case 'endurance': return 180; // 3 minutes pour les sprints
    case 'force': return 180; // 3 minutes
    case 'skill': return 90; // 1.5 minutes
    default: return 120;
  }
}

function calculerDuree(exercices: Exercice[]): number {
  return exercices.length * 20; // 20 minutes par exercice en moyenne
} 