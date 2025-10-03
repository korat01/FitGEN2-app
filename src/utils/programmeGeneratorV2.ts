import { UserProfile } from '../types/profile';
import { Programme, Exercice } from '../types/programme';

interface ProgrammeConfig {
  sportClass: string;
  niveau: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  focus: 'force' | 'hypertrophie' | 'endurance' | 'skill' | 'mixte';
  focusSecondaire?: 'cardio' | 'mobilite' | 'prevention';
  seancesParSemaine: number;
  dureeCycle: number; // en semaines
}

export class ProgrammeGeneratorV2 {
  private user: UserProfile;
  private config: ProgrammeConfig;

  constructor(user: UserProfile) {
    this.user = user;
    this.config = this.determinerConfig(user);
  }

  private determinerConfig(user: UserProfile): ProgrammeConfig {
    const sportClass = user.sportClass;
    const niveau = this.determinerNiveau(user);
    
    return {
      sportClass,
      niveau,
      focus: 'force', // Par défaut, peut être modifié
      seancesParSemaine: 4,
      dureeCycle: 4
    };
  }

  private determinerNiveau(user: UserProfile): 'debutant' | 'intermediaire' | 'avance' | 'expert' {
    // Logique basée sur le score global ou l'expérience
    const score = user.globalScore || 0;
    if (score < 100) return 'debutant';
    if (score < 300) return 'intermediaire';
    if (score < 500) return 'avance';
    return 'expert';
  }

  public genererProgramme(): Programme {
    const exercices = this.getExercicesParClasse();
    const seances = this.genererSeances(exercices);
    
    return {
      id: Date.now().toString(),
      nom: `${this.config.sportClass} - ${this.config.focus}`,
      description: `Programme adapté pour ${this.config.sportClass}`,
      duree: this.config.dureeCycle,
      seancesParSemaine: this.config.seancesParSemaine,
      sessions: seances as any[],
      dateCreation: new Date().toISOString()
    };
  }

  private getExercicesParClasse(): Exercice[] {
    const classe = this.config.sportClass;
    
    switch (classe) {
      case 'power':
        return this.getExercicesPowerlifting();
      case 'crossfit':
        return this.getExercicesCrossFit();
      case 'marathon':
        return this.getExercicesMarathon();
      case 'calisthenics':
        return this.getExercicesCalisthenics();
      case 'classique':
        return this.getExercicesClassique();
      case 'sprint': // ✅ Nouveau
        return this.getExercicesSprint();
      default:
        return this.getExercicesClassique();
    }
  }

  private getExercicesPowerlifting(): Exercice[] {
    return [
      // Exercices principaux
      { nom: 'Squat', type: 'force', groupeMusculaire: 'jambes', difficulte: 'avance' },
      { nom: 'Développé couché', type: 'force', groupeMusculaire: 'pecs', difficulte: 'avance' },
      { nom: 'Soulevé de terre', type: 'force', groupeMusculaire: 'dos', difficulte: 'avance' },
      
      // Accessoires
      { nom: 'Leg press', type: 'hypertrophie', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Dips', type: 'hypertrophie', groupeMusculaire: 'pecs', difficulte: 'intermediaire' },
      { nom: 'Tractions', type: 'hypertrophie', groupeMusculaire: 'dos', difficulte: 'intermediaire' },
      { nom: 'Développé militaire', type: 'hypertrophie', groupeMusculaire: 'epaules', difficulte: 'intermediaire' }
    ];
  }

  private getExercicesCrossFit(): Exercice[] {
    return [
      // Lifts olympiques
      { nom: 'Snatch', type: 'skill', groupeMusculaire: 'corps', difficulte: 'expert' },
      { nom: 'Clean & Jerk', type: 'skill', groupeMusculaire: 'corps', difficulte: 'expert' },
      { nom: 'Thruster', type: 'endurance', groupeMusculaire: 'corps', difficulte: 'avance' },
      
      // Gymnastique
      { nom: 'Muscle-up', type: 'skill', groupeMusculaire: 'corps', difficulte: 'expert' },
      { nom: 'Handstand Push-up', type: 'skill', groupeMusculaire: 'epaules', difficulte: 'expert' },
      { nom: 'Pompes', type: 'endurance', groupeMusculaire: 'pecs', difficulte: 'intermediaire' },
      { nom: 'Tractions', type: 'endurance', groupeMusculaire: 'dos', difficulte: 'intermediaire' }
    ];
  }

  private getExercicesMarathon(): Exercice[] {
    return [
      // Course
      { nom: 'Course longue', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Fractionné', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'avance' },
      { nom: 'Tempo run', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'avance' },
      
      // Renforcement
      { nom: 'Squat', type: 'force', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Fentes', type: 'force', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Planche', type: 'force', groupeMusculaire: 'core', difficulte: 'intermediaire' }
    ];
  }

  private getExercicesCalisthenics(): Exercice[] {
    return [
      // Skills
      { nom: 'Planche', type: 'skill', groupeMusculaire: 'core', difficulte: 'expert' },
      { nom: 'Front lever', type: 'skill', groupeMusculaire: 'dos', difficulte: 'expert' },
      { nom: 'Muscle-up', type: 'skill', groupeMusculaire: 'corps', difficulte: 'expert' },
      { nom: 'Handstand', type: 'skill', groupeMusculaire: 'epaules', difficulte: 'expert' },
      
      // Force
      { nom: 'Pompes lestées', type: 'force', groupeMusculaire: 'pecs', difficulte: 'avance' },
      { nom: 'Tractions lestées', type: 'force', groupeMusculaire: 'dos', difficulte: 'avance' },
      { nom: 'Dips lestés', type: 'force', groupeMusculaire: 'pecs', difficulte: 'avance' }
    ];
  }

  private getExercicesClassique(): Exercice[] {
    return [
      // Polyvalent
      { nom: 'Squat', type: 'force', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Développé couché', type: 'force', groupeMusculaire: 'pecs', difficulte: 'intermediaire' },
      { nom: 'Soulevé de terre', type: 'force', groupeMusculaire: 'dos', difficulte: 'intermediaire' },
      { nom: 'Tractions', type: 'hypertrophie', groupeMusculaire: 'dos', difficulte: 'intermediaire' },
      { nom: 'Dips', type: 'hypertrophie', groupeMusculaire: 'pecs', difficulte: 'intermediaire' }
    ];
  }

  private getExercicesSprint(): Exercice[] {
    return [
      // Technique
      { nom: 'Drills A/B/C', type: 'skill', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Sprints départ accroupi', type: 'skill', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Accélérations progressives', type: 'skill', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      
      // Sprint court
      { nom: 'Sprints 30m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Sprints 60m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Sprints 80m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      
      // Sprint moyen
      { nom: 'Sprints 100m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'avance' },
      { nom: 'Sprints 150m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'avance' },
      { nom: 'Sprints 200m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'avance' },
      { nom: 'Sprints 400m', type: 'endurance', groupeMusculaire: 'jambes', difficulte: 'expert' },
      
      // Plyométrie
      { nom: 'Box jumps', type: 'skill', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Bounding', type: 'skill', groupeMusculaire: 'jambes', difficulte: 'avance' },
      { nom: 'Sauts en longueur', type: 'skill', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      { nom: 'Drop jumps', type: 'skill', groupeMusculaire: 'jambes', difficulte: 'expert' },
      
      // Force
      { nom: 'Back Squat', type: 'force', groupeMusculaire: 'jambes', difficulte: 'avance' },
      { nom: 'Power Clean', type: 'force', groupeMusculaire: 'corps', difficulte: 'expert' },
      { nom: 'Deadlift explosif', type: 'force', groupeMusculaire: 'dos', difficulte: 'avance' },
      { nom: 'Hip Thrust', type: 'force', groupeMusculaire: 'jambes', difficulte: 'intermediaire' },
      
      // Renforcement
      { nom: 'Core anti-rotation', type: 'force', groupeMusculaire: 'core', difficulte: 'intermediaire' },
      { nom: 'Gainage dynamique', type: 'force', groupeMusculaire: 'core', difficulte: 'intermediaire' },
      { nom: 'Nordic hamstring', type: 'force', groupeMusculaire: 'jambes', difficulte: 'avance' },
      { nom: 'Glute bridge', type: 'force', groupeMusculaire: 'jambes', difficulte: 'debutant' }
    ];
  }

  private genererSeances(exercices: Exercice[]): any[] {
    const seances: any[] = [];
    const exercicesParSeance = this.getExercicesParSeance();
    
    for (let semaine = 1; semaine <= this.config.dureeCycle; semaine++) {
      for (let jour = 1; jour <= this.config.seancesParSemaine; jour++) {
        const seance = this.creerSeance(semaine, jour, exercices, exercicesParSeance);
        seances.push(seance);
      }
    }
    
    return seances;
  }

  private getExercicesParSeance(): number {
    switch (this.config.niveau) {
      case 'debutant': return 3;
      case 'intermediaire': return 4;
      case 'avance': return 5;
      case 'expert': return 6;
      default: return 4;
    }
  }

  private creerSeance(semaine: number, jour: number, exercices: Exercice[], nbExercices: number): any {
    const exercicesSeance = this.selectionnerExercices(exercices, nbExercices, jour);
    const estDeload = semaine === this.config.dureeCycle; // Dernière semaine = deload
    
    return {
      id: `${semaine}-${jour}`,
      nom: `Semaine ${semaine} - Jour ${jour}`,
      exercices: exercicesSeance.map(ex => ({
        ...ex,
        series: this.calculerSeries(ex, estDeload),
        repetitions: this.calculerRepetitions(ex, estDeload),
        poids: this.calculerPoids(ex, estDeload),
        repos: this.calculerRepos(ex)
      })),
      duree: this.calculerDuree(exercicesSeance),
      notes: estDeload ? 'Semaine de récupération' : ''
    };
  }

  private selectionnerExercices(exercices: Exercice[], nbExercices: number, jour: number): Exercice[] {
    // Logique de sélection basée sur le jour et le focus
    const exercicesPrincipaux = exercices.filter(ex => ex.type === this.config.focus);
    const exercicesAccessoires = exercices.filter(ex => ex.type !== this.config.focus);
    
    const selection: Exercice[] = [];
    
    // Ajouter 1-2 exercices principaux
    selection.push(...exercicesPrincipaux.slice(0, 2));
    
    // Compléter avec des accessoires
    const restants = nbExercices - selection.length;
    selection.push(...exercicesAccessoires.slice(0, restants));
    
    return selection;
  }

  private calculerSeries(exercice: Exercice, estDeload: boolean): number {
    if (estDeload) return 3;
    
    switch (exercice.type) {
      case 'force': return 5;
      case 'hypertrophie': return 4;
      case 'endurance': return 3;
      case 'skill': return 5;
      default: return 4;
    }
  }

  private calculerRepetitions(exercice: Exercice, estDeload: boolean): number {
    if (estDeload) return 8;
    
    switch (exercice.type) {
      case 'force': return 5;
      case 'hypertrophie': return 10;
      case 'endurance': return 15;
      case 'skill': return 3;
      default: return 8;
    }
  }

  private calculerPoids(exercice: Exercice, estDeload: boolean): number {
    if (estDeload) return 70; // 70% du max
    
    const baseWeight = this.user.weight * 0.8; // Poids de base
    
    switch (exercice.type) {
      case 'force': return baseWeight * 0.9;
      case 'hypertrophie': return baseWeight * 0.7;
      case 'endurance': return baseWeight * 0.5;
      case 'skill': return 0; // Poids du corps
      default: return baseWeight * 0.7;
    }
  }

  private calculerRepos(exercice: Exercice): number {
    switch (exercice.type) {
      case 'force': return 180; // 3 minutes
      case 'hypertrophie': return 90; // 1.5 minutes
      case 'endurance': return 60; // 1 minute
      case 'skill': return 120; // 2 minutes
      default: return 90;
    }
  }

  private calculerDuree(exercices: Exercice[]): number {
    return exercices.length * 15; // 15 minutes par exercice en moyenne
  }
}

// Fonction d'export pour faciliter l'utilisation
export const genererProgrammeAdapte = (user: UserProfile): Programme => {
  const generator = new ProgrammeGeneratorV2(user);
  return generator.genererProgramme();
}; 