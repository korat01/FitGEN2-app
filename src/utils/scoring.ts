export interface PerformanceRecord {
  id: string;
  userId: string;
  discipline: string;
  value: number;
  units: string;
  date: Date;
  context?: string;
  verified?: boolean;
}

import { getAgeCategory } from './ffforceStandards';
import { calculateWilksScore, calculateIPFGLPoints } from './statsCalculator';

export interface GlobalScore {
  rank: string;
  globalScore: number;
  breakdown: {
    force: number;
    endurance: number;
    explosivite: number;
    calisthenics: number;
  };
  reason: string;
  /** Score Wilks "classique" (1994), fourni à titre de référence à côté des IPF GL Points. */
  wilksScore?: number;
  /** Nom à afficher à côté de globalScore (ex: "IPF GL Points" vs "Score") — l'échelle diffère selon la méthode de calcul. */
  scoreLabel: string;
  /** Progression (0-100) à l'intérieur du palier de rang actuel, vers nextRank. */
  rankProgressPercent: number;
  /** Rang suivant à atteindre (égal au rang actuel si déjà au sommet). */
  nextRank: string;
}

interface RankBand {
  rank: string;
  min: number;
  max: number;
}

// Échelle historique (scoring générique 5km/tractions/etc, environ 0-1000)
const LEGACY_RANK_BANDS: RankBand[] = [
  { rank: 'E', min: 0, max: 100 },
  { rank: 'D', min: 100, max: 250 },
  { rank: 'C', min: 250, max: 400 },
  { rank: 'B', min: 400, max: 550 },
  { rank: 'A', min: 550, max: 700 },
  { rank: 'S', min: 700, max: 800 },
  { rank: 'Nation', min: 800, max: 900 },
  { rank: 'World', min: 900, max: 900 },
];

// Échelle IPF GL Points (squat+bench+deadlift), environ 0-150
const GL_RANK_BANDS: RankBand[] = [
  { rank: 'E', min: 0, max: 40 },
  { rank: 'D', min: 40, max: 55 },
  { rank: 'C', min: 55, max: 70 },
  { rank: 'B', min: 70, max: 80 },
  { rank: 'A', min: 80, max: 90 },
  { rank: 'S', min: 90, max: 100 },
  { rank: 'Nation', min: 100, max: 110 },
  { rank: 'World', min: 110, max: 110 },
];

const computeRankProgress = (score: number, bands: RankBand[]): { percent: number; nextRank: string } => {
  const bandIndex = bands.findIndex((b) => score < b.max);
  if (bandIndex === -1) {
    const top = bands[bands.length - 1];
    return { percent: 100, nextRank: top.rank };
  }
  const band = bands[bandIndex];
  const range = band.max - band.min;
  const percent = range > 0 ? Math.min(Math.max(((score - band.min) / range) * 100, 0), 100) : 100;
  const nextRank = bandIndex < bands.length - 1 ? bands[bandIndex + 1].rank : band.rank;
  return { percent, nextRank };
};

export class ScoringEngine {
  // FONCTION PRINCIPALE POUR CALCULER LE RANG D'UN UTILISATEUR
  public calculateUserRank(user: any, performances: PerformanceRecord[]): GlobalScore {
    if (!user) {
      return {
        rank: 'D',
        globalScore: 0,
        breakdown: { force: 0, endurance: 0, explosivite: 0, calisthenics: 0 },
        reason: 'Utilisateur non connecté',
        scoreLabel: 'Score',
        rankProgressPercent: 0,
        nextRank: 'C',
      };
    }

    if (!performances || performances.length === 0) {
      return {
        rank: 'D',
        globalScore: 0,
        breakdown: { force: 0, endurance: 0, explosivite: 0, calisthenics: 0 },
        reason: 'Aucune performance enregistrée',
        scoreLabel: 'Score',
        rankProgressPercent: 0,
        nextRank: 'C',
      };
    }

    const userWeight = user.weight || 75;
    const userSex = user.sex || 'male';
    const userSportClass = user.sportClass || 'classique';
    const userAge = user.age || 25;

    // DÉTERMINER LA CATÉGORIE D'ÂGE
    const ageCategory = this.getAgeCategory(userAge);
    const ageMultiplier = this.getAgeMultiplier(userAge);

    let totalScore = 0;
    let performanceCount = 0;
    const breakdown = {
      force: 0,
      endurance: 0,
      explosivite: 0,
      calisthenics: 0
    };

    // CALCULER LES MEILLEURES PERFORMANCES POUR CHAQUE DISCIPLINE
    const bestPerformances = this.getBestPerformances(performances);

    // TOTAL (squat + bench + deadlift) : IPF GL Points (référence officielle IPF depuis 2020),
    // normalisé par le poids de corps. Le Wilks classique est calculé en plus, à titre indicatif.
    const squatPerf = bestPerformances.find(p => p.discipline === 'squat');
    const benchPerf = bestPerformances.find(p => p.discipline === 'bench');
    const deadliftPerf = bestPerformances.find(p => p.discipline === 'deadlift');

    if (squatPerf && benchPerf && deadliftPerf) {
      const totalWeight = squatPerf.value + benchPerf.value + deadliftPerf.value;
      const isMale = userSex === 'male';
      const glPoints = calculateIPFGLPoints(userWeight, totalWeight, isMale);
      const wilksScore = calculateWilksScore(userWeight, totalWeight, isMale);
      const progress = computeRankProgress(glPoints, GL_RANK_BANDS);

      // Le total squat+bench+deadlift pilote le rang global, mais les AUTRES disciplines
      // (course, tractions, pompes...) restent prises en compte dans la décomposition —
      // sinon les ajouter n'avait visiblement aucun effet.
      const otherPerfs = bestPerformances.filter(
        (p) => p.discipline !== 'squat' && p.discipline !== 'bench' && p.discipline !== 'deadlift'
      );
      const otherBreakdown = this.scoreOtherDisciplines(otherPerfs, userWeight, userSex, userSportClass, ageMultiplier);

      return {
        rank: this.determineRankFromGLPoints(glPoints),
        globalScore: glPoints,
        breakdown: {
          force: glPoints,
          endurance: otherBreakdown.endurance,
          explosivite: otherBreakdown.explosivite,
          calisthenics: otherBreakdown.calisthenics
        },
        wilksScore,
        reason: `IPF GL : ${glPoints} pts (total ${totalWeight}kg à ${userWeight}kg, ${userSex})`,
        scoreLabel: 'IPF GL Points',
        rankProgressPercent: progress.percent,
        nextRank: progress.nextRank,
      };
    }

    // FALLBACK: Système de scoring classique si pas de squat+bench+deadlift complet
    bestPerformances.forEach((perf) => {
      const scored = this.scoreDiscipline(perf, userWeight, userSex, userSportClass, ageMultiplier);
      if (!scored) return;

      totalScore += scored.score;
      performanceCount++;
      breakdown[scored.category] += scored.score;
    });

    if (performanceCount === 0) {
      return {
        rank: 'D',
        globalScore: 0,
        breakdown: { force: 0, endurance: 0, explosivite: 0, calisthenics: 0 },
        reason: 'Aucune performance valide',
        scoreLabel: 'Score',
        rankProgressPercent: 0,
        nextRank: 'C',
      };
    }

    const averageScore = totalScore / performanceCount;

    // Appliquer les pondérations selon la classe de sport
    const sportProfile = this.getSportProfile(userSportClass);
    const weightedScore = averageScore * sportProfile.force;

    const finalRank = this.determineRank(weightedScore);
    const finalScore = Math.round(weightedScore);
    const progress = computeRankProgress(weightedScore, LEGACY_RANK_BANDS);

    return {
      rank: finalRank,
      globalScore: finalScore,
      breakdown: {
        force: Math.round(breakdown.force / performanceCount),
        endurance: Math.round(breakdown.endurance / performanceCount),
        explosivite: Math.round(breakdown.explosivite / performanceCount),
        calisthenics: Math.round(breakdown.calisthenics / performanceCount)
      },
      reason: `Basé sur ${performanceCount} performance(s) avec profil ${userSportClass} (${userSex}, ${ageCategory})`,
      scoreLabel: 'Score',
      rankProgressPercent: progress.percent,
      nextRank: progress.nextRank,
    };
  }

  // Détermination du rang basé sur le score global
  private determineRank(score: number): string {
    if (isNaN(score) || score < 0) {
      return 'D';
    }

    if (score < 100) return 'E';
    if (score < 250) return 'D';
    if (score < 400) return 'C';
    if (score < 550) return 'B';
    if (score < 700) return 'A';
    if (score < 800) return 'S';
    if (score < 900) return 'Nation';
    return 'World';
  }

  // Détermination du rang à partir des IPF GL Points.
  // Repères usuels : ~55-75 = régional/intermédiaire, ~75-90 = national/avancé,
  // ~85-100 = élite, 100+ = niveau mondial.
  private determineRankFromGLPoints(glPoints: number): string {
    if (isNaN(glPoints) || glPoints < 0) {
      return 'D';
    }

    if (glPoints < 40) return 'E';
    if (glPoints < 55) return 'D';
    if (glPoints < 70) return 'C';
    if (glPoints < 80) return 'B';
    if (glPoints < 90) return 'A';
    if (glPoints < 100) return 'S';
    if (glPoints < 110) return 'Nation';
    return 'World';
  }

  // DÉTERMINER LA CATÉGORIE D'ÂGE SELON LES STANDARDS FFForce
  private getAgeCategory(age: number): string {
    return getAgeCategory(age);
  }

  // MULTIPLICATEUR SELON LA CATÉGORIE D'ÂGE
  // Les catégories viennent de getAgeCategory() (ffforceStandards.ts) : subjunior, junior,
  // senior, masters1, masters2, masters3, masters4.
  private getAgeMultiplier(age: number): number {
    const category = this.getAgeCategory(age);
    switch (category) {
      case 'subjunior': return 0.85;  // Références plus basses
      case 'junior': return 0.9;         // Références légèrement plus basses
      case 'senior': return 1.0;         // Références standard
      case 'masters1': return 1.05;     // Léger bonus
      case 'masters2': return 1.1;      // Bonus
      case 'masters3': return 1.15;    // Bonus important
      case 'masters4': return 1.15;    // Bonus important
      default: return 1.0;
    }
  }

  // Profils utilisateur ajustés selon la classe de sport
  private getSportProfile(sportClass: string) {
    const profiles = {
      crossfit: {
        force: 0.4,        // Équilibré force/endurance
        endurance: 0.4,    // Équilibré force/endurance
        explosivite: 0.15,  // Important pour les mouvements explosifs
        calisthenics: 0.05  // Peu de calisthenics pur
      },
      power: {
        force: 0.8,        // Focus maximal sur la force
        endurance: 0.05,   // Très peu d'endurance
        explosivite: 0.1,   // Peu d'explosivité
        calisthenics: 0.05  // Peu de calisthenics
      },
      classique: {
        force: 0.5,        // Équilibré
        endurance: 0.3,    // Modéré
        explosivite: 0.15,  // Modéré
        calisthenics: 0.05  // Peu
      },
      marathon: {
        force: 0.1,        // Très peu de force
        endurance: 0.8,    // Focus maximal sur l'endurance
        explosivite: 0.05,  // Très peu d'explosivité
        calisthenics: 0.05  // Peu de calisthenics
      },
      calisthenics: {
        force: 0.3,        // Force relative
        endurance: 0.2,    // Endurance modérée
        explosivite: 0.2,   // Explosivité importante
        calisthenics: 0.3   // Focus sur le calisthenics
      }
    };

    return profiles[sportClass] || profiles.classique;
  }

  // RÉFÉRENCES DÉVELOPPÉ COUCHÉ PAR CLASSE DE SPORT
  private getBenchReferences(weight: number, sex: string, sportClass: string) {
    const baseRefs = this.getBaseBenchReferences(weight, sex);

    // AJUSTEMENTS PAR CLASSE DE SPORT
    switch (sportClass) {
      case 'power':
        // Powerlifting : références standard (facile d'être fort)
        return baseRefs;
      case 'streetlifting':
        // Streetlifting : légèrement plus difficile (moins d'équipement)
        return {
          A: baseRefs.A * 0.95,
          S: baseRefs.S * 0.95,
          World: baseRefs.World * 0.95
        };
      case 'crossfit':
        // CrossFit : plus difficile (fatigue, technique différente)
        return {
          A: baseRefs.A * 0.85,
          S: baseRefs.S * 0.85,
          World: baseRefs.World * 0.85
        };
      case 'marathon':
        // Marathon : TRÈS DIFFICILE (pas de spécialisation force)
        return {
          A: baseRefs.A * 1.3,  // +30% plus difficile
          S: baseRefs.S * 1.3,
          World: baseRefs.World * 1.3
        };
      case 'calisthenics':
        // Calisthenics : difficile (pas d'haltères)
        return {
          A: baseRefs.A * 1.25,  // +25% plus difficile
          S: baseRefs.S * 1.25,
          World: baseRefs.World * 1.25
        };
      case 'sprint':
        // Sprint : difficile (pas de spécialisation force)
        return {
          A: baseRefs.A * 1.2,  // +20% plus difficile
          S: baseRefs.S * 1.2,
          World: baseRefs.World * 1.2
        };
      default:
        // Classique : références standard
        return baseRefs;
    }
  }

  // RÉFÉRENCES SQUAT PAR CLASSE DE SPORT
  private getSquatReferences(weight: number, sex: string, sportClass: string) {
    const baseRefs = this.getBaseSquatReferences(weight, sex);

    // AJUSTEMENTS PAR CLASSE DE SPORT
    switch (sportClass) {
      case 'power':
        return baseRefs;
      case 'streetlifting':
        return {
          A: baseRefs.A * 0.95,
          S: baseRefs.S * 0.95,
          World: baseRefs.World * 0.95
        };
      case 'crossfit':
        return {
          A: baseRefs.A * 0.85,
          S: baseRefs.S * 0.85,
          World: baseRefs.World * 0.85
        };
      case 'marathon':
        return {
          A: baseRefs.A * 0.7,
          S: baseRefs.S * 0.7,
          World: baseRefs.World * 0.7
        };
      case 'calisthenics':
        return {
          A: baseRefs.A * 0.75,
          S: baseRefs.S * 0.75,
          World: baseRefs.World * 0.75
        };
      case 'sprint':
        return {
          A: baseRefs.A * 0.8,
          S: baseRefs.S * 0.8,
          World: baseRefs.World * 0.8
        };
      default:
        return baseRefs;
    }
  }

  // RÉFÉRENCES SOULEVÉ DE TERRE PAR CLASSE DE SPORT
  private getDeadliftReferences(weight: number, sex: string, sportClass: string) {
    const baseRefs = this.getBaseDeadliftReferences(weight, sex);

    // AJUSTEMENTS PAR CLASSE DE SPORT
    switch (sportClass) {
      case 'power':
        return baseRefs;
      case 'streetlifting':
        return {
          A: baseRefs.A * 0.95,
          S: baseRefs.S * 0.95,
          World: baseRefs.World * 0.95
        };
      case 'crossfit':
        return {
          A: baseRefs.A * 0.85,
          S: baseRefs.S * 0.85,
          World: baseRefs.World * 0.85
        };
      case 'marathon':
        return {
          A: baseRefs.A * 0.7,
          S: baseRefs.S * 0.7,
          World: baseRefs.World * 0.7
        };
      case 'calisthenics':
        return {
          A: baseRefs.A * 0.75,
          S: baseRefs.S * 0.75,
          World: baseRefs.World * 0.75
        };
      case 'sprint':
        return {
          A: baseRefs.A * 0.8,
          S: baseRefs.S * 0.8,
          World: baseRefs.World * 0.8
        };
      default:
        return baseRefs;
    }
  }

  // RÉFÉRENCES 5KM PAR CLASSE DE SPORT
  private getRunReferences(sex: string, sportClass: string) {
    const baseRefs = sex === 'male' ?
      { A: 20, S: 16, World: 12 } :  // Hommes
      { A: 25, S: 20, World: 15 };  // Femmes

    // AJUSTEMENTS PAR CLASSE DE SPORT
    switch (sportClass) {
      case 'marathon':
        // Marathon : FACILE d'être endurant (sa spécialité)
        return {
          A: baseRefs.A * 0.7,  // -30% plus facile
          S: baseRefs.S * 0.7,
          World: baseRefs.World * 0.7
        };
      case 'crossfit':
        // CrossFit : légèrement plus difficile
        return {
          A: baseRefs.A * 1.1,
          S: baseRefs.S * 1.1,
          World: baseRefs.World * 1.1
        };
      case 'power':
        // Powerlifting : TRÈS DIFFICILE (pas de spécialisation endurance)
        return {
          A: baseRefs.A * 1.3,  // +30% plus difficile
          S: baseRefs.S * 1.3,
          World: baseRefs.World * 1.3
        };
      case 'streetlifting':
        // Streetlifting : difficile
        return {
          A: baseRefs.A * 1.2,
          S: baseRefs.S * 1.2,
          World: baseRefs.World * 1.2
        };
      case 'calisthenics':
        // Calisthenics : modérément difficile
        return {
          A: baseRefs.A * 1.15,
          S: baseRefs.S * 1.15,
          World: baseRefs.World * 1.15
        };
      case 'sprint':
        // Sprint : très difficile (spécialisation vitesse)
        return {
          A: baseRefs.A * 1.4,
          S: baseRefs.S * 1.4,
          World: baseRefs.World * 1.4
        };
      default:
        return baseRefs;
    }
  }

  // RÉFÉRENCES TRACTIONS PAR CLASSE DE SPORT
  private getPullupReferences(sex: string, sportClass: string) {
    const baseRefs = sex === 'male' ?
      { A: 15, S: 25, World: 35 } :  // Hommes
      { A: 8, S: 15, World: 25 };   // Femmes

    // AJUSTEMENTS PAR CLASSE DE SPORT
    switch (sportClass) {
      case 'calisthenics':
        // Calisthenics : facile d'être fort au poids du corps
        return baseRefs;
      case 'streetlifting':
        // Streetlifting : légèrement plus difficile
        return {
          A: baseRefs.A * 1.1,
          S: baseRefs.S * 1.1,
          World: baseRefs.World * 1.1
        };
      case 'crossfit':
        // CrossFit : modérément difficile
        return {
          A: baseRefs.A * 1.15,
          S: baseRefs.S * 1.15,
          World: baseRefs.World * 1.15
        };
      case 'power':
        // Powerlifting : difficile (pas de spécialisation calisthenics)
        return {
          A: baseRefs.A * 1.3,
          S: baseRefs.S * 1.3,
          World: baseRefs.World * 1.3
        };
      case 'marathon':
        // Marathon : difficile
        return {
          A: baseRefs.A * 1.25,
          S: baseRefs.S * 1.25,
          World: baseRefs.World * 1.25
        };
      case 'sprint':
        // Sprint : difficile
        return {
          A: baseRefs.A * 1.2,
          S: baseRefs.S * 1.2,
          World: baseRefs.World * 1.2
        };
      default:
        return baseRefs;
    }
  }

  // RÉFÉRENCES POMPES PAR CLASSE DE SPORT
  private getPushupReferences(sex: string, sportClass: string) {
    const baseRefs = sex === 'male' ?
      { A: 25, S: 45, World: 70 } :  // Hommes
      { A: 12, S: 25, World: 45 };  // Femmes

    // AJUSTEMENTS PAR CLASSE DE SPORT (même logique que les tractions)
    switch (sportClass) {
      case 'calisthenics':
        return baseRefs;
      case 'streetlifting':
        return { A: baseRefs.A * 1.1, S: baseRefs.S * 1.1, World: baseRefs.World * 1.1 };
      case 'crossfit':
        return { A: baseRefs.A * 1.15, S: baseRefs.S * 1.15, World: baseRefs.World * 1.15 };
      case 'power':
        return { A: baseRefs.A * 1.3, S: baseRefs.S * 1.3, World: baseRefs.World * 1.3 };
      case 'marathon':
        return { A: baseRefs.A * 1.25, S: baseRefs.S * 1.25, World: baseRefs.World * 1.25 };
      case 'sprint':
        return { A: baseRefs.A * 1.2, S: baseRefs.S * 1.2, World: baseRefs.World * 1.2 };
      default:
        return baseRefs;
    }
  }

  // RÉFÉRENCES DE VITESSE (km/h) POUR LA COURSE À DISTANCE/TEMPS LIBRES.
  // Dérivées des références de temps sur 5km : mêmes ajustements par classe de sport,
  // mais exprimées en vitesse pour accepter n'importe quelle distance/temps.
  private getRunSpeedReferences(sex: string, sportClass: string) {
    const timeRefs = this.getRunReferences(sex, sportClass); // minutes, calibré sur 5km
    const speedFromTime = (minutes: number) => 5 / (minutes / 60);
    return {
      A: speedFromTime(timeRefs.A),
      S: speedFromTime(timeRefs.S),
      World: speedFromTime(timeRefs.World),
    };
  }

  // Calcule score + catégorie pour UNE performance. Utilisé par le fallback complet, et par
  // scoreOtherDisciplines pour compléter la décomposition quand le total squat+bench+deadlift
  // pilote déjà le rang global (voir calculateUserRank).
  private scoreDiscipline(
    perf: PerformanceRecord,
    userWeight: number,
    userSex: string,
    userSportClass: string,
    ageMultiplier: number
  ): { score: number; category: string } | null {
    if (!perf.discipline || !perf.value || isNaN(perf.value)) {
      return null;
    }

    let score = 0;
    let category = '';

    switch (perf.discipline) {
      case 'bench': {
        const benchRefs = this.getBenchReferences(userWeight, userSex, userSportClass);
        benchRefs.A *= ageMultiplier;
        benchRefs.S *= ageMultiplier;
        benchRefs.World *= ageMultiplier;

        score = perf.value >= benchRefs.A
          ? 600 + (perf.value - benchRefs.A) / (benchRefs.S - benchRefs.A) * 300
          : (perf.value / benchRefs.A) * 600;
        score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, benchRefs);
        category = 'force';
        break;
      }

      case 'squat': {
        const squatRefs = this.getSquatReferences(userWeight, userSex, userSportClass);
        squatRefs.A *= ageMultiplier;
        squatRefs.S *= ageMultiplier;
        squatRefs.World *= ageMultiplier;

        score = perf.value >= squatRefs.A
          ? 600 + (perf.value - squatRefs.A) / (squatRefs.S - squatRefs.A) * 300
          : (perf.value / squatRefs.A) * 600;
        score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, squatRefs);
        category = 'force';
        break;
      }

      case 'deadlift': {
        const deadliftRefs = this.getDeadliftReferences(userWeight, userSex, userSportClass);
        deadliftRefs.A *= ageMultiplier;
        deadliftRefs.S *= ageMultiplier;
        deadliftRefs.World *= ageMultiplier;

        score = perf.value >= deadliftRefs.A
          ? 600 + (perf.value - deadliftRefs.A) / (deadliftRefs.S - deadliftRefs.A) * 300
          : (perf.value / deadliftRefs.A) * 600;
        score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, deadliftRefs);
        category = 'force';
        break;
      }

      case '5k': {
        // Temps fixe sur 5km (ancien format, conservé pour les performances déjà enregistrées)
        const runRefs = this.getRunReferences(userSex, userSportClass);

        score = perf.value <= runRefs.A
          ? 600 + (runRefs.A - perf.value) / (runRefs.A - runRefs.S) * 300
          : (runRefs.A / perf.value) * 600;
        score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, runRefs);
        category = 'endurance';
        break;
      }

      case 'course': {
        // Course à distance/temps libres : perf.value est une VITESSE (km/h),
        // calculée par le formulaire à partir de la distance et du temps saisis.
        const speedRefs = this.getRunSpeedReferences(userSex, userSportClass);
        speedRefs.A *= ageMultiplier;
        speedRefs.S *= ageMultiplier;
        speedRefs.World *= ageMultiplier;

        score = perf.value >= speedRefs.A
          ? 600 + (perf.value - speedRefs.A) / (speedRefs.S - speedRefs.A) * 300
          : (perf.value / speedRefs.A) * 600;
        score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, speedRefs);
        category = 'endurance';
        break;
      }

      case 'pullups': {
        const pullupRefs = this.getPullupReferences(userSex, userSportClass);
        pullupRefs.A *= ageMultiplier;
        pullupRefs.S *= ageMultiplier;
        pullupRefs.World *= ageMultiplier;

        score = perf.value >= pullupRefs.A
          ? 600 + (perf.value - pullupRefs.A) / (pullupRefs.S - pullupRefs.A) * 300
          : (perf.value / pullupRefs.A) * 600;
        score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, pullupRefs);
        category = 'calisthenics';
        break;
      }

      case 'pushups': {
        const pushupRefs = this.getPushupReferences(userSex, userSportClass);
        pushupRefs.A *= ageMultiplier;
        pushupRefs.S *= ageMultiplier;
        pushupRefs.World *= ageMultiplier;

        score = perf.value >= pushupRefs.A
          ? 600 + (perf.value - pushupRefs.A) / (pushupRefs.S - pushupRefs.A) * 300
          : (perf.value / pushupRefs.A) * 600;
        score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, pushupRefs);
        category = 'calisthenics';
        break;
      }

      default:
        return null;
    }

    return { score, category };
  }

  // Décomposition (endurance/explosivité/calisthénie) à partir de performances déjà filtrées
  // (sans squat/bench/deadlift, qui sont comptés séparément via les IPF GL Points).
  private scoreOtherDisciplines(
    perfs: PerformanceRecord[],
    userWeight: number,
    userSex: string,
    userSportClass: string,
    ageMultiplier: number
  ): { endurance: number; explosivite: number; calisthenics: number } {
    const totals = { endurance: 0, explosivite: 0, calisthenics: 0 };
    const counts = { endurance: 0, explosivite: 0, calisthenics: 0 };

    perfs.forEach((perf) => {
      const scored = this.scoreDiscipline(perf, userWeight, userSex, userSportClass, ageMultiplier);
      if (!scored || scored.category === 'force' || !(scored.category in totals)) return;
      totals[scored.category as keyof typeof totals] += scored.score;
      counts[scored.category as keyof typeof counts] += 1;
    });

    return {
      endurance: counts.endurance > 0 ? Math.round(totals.endurance / counts.endurance) : 0,
      explosivite: counts.explosivite > 0 ? Math.round(totals.explosivite / counts.explosivite) : 0,
      calisthenics: counts.calisthenics > 0 ? Math.round(totals.calisthenics / counts.calisthenics) : 0,
    };
  }

  // RÉFÉRENCES DE BASE POUR LE DÉVELOPPÉ COUCHÉ
  private getBaseBenchReferences(weight: number, sex: string) {
    if (sex === 'male') {
      if (weight <= 66) return { A: 100, S: 150, World: 200 };
      if (weight <= 74) return { A: 120, S: 180, World: 220 };
      if (weight <= 83) return { A: 140, S: 200, World: 250 };
      if (weight <= 93) return { A: 160, S: 220, World: 280 };
      if (weight <= 105) return { A: 180, S: 240, World: 300 };
      if (weight <= 120) return { A: 200, S: 260, World: 320 };
      return { A: 220, S: 280, World: 340 };
    } else {
      if (weight <= 52) return { A: 60, S: 90, World: 120 };
      if (weight <= 57) return { A: 70, S: 105, World: 140 };
      if (weight <= 63) return { A: 80, S: 120, World: 160 };
      if (weight <= 72) return { A: 90, S: 135, World: 180 };
      if (weight <= 84) return { A: 100, S: 150, World: 200 };
      return { A: 110, S: 165, World: 220 };
    }
  }

  // RÉFÉRENCES DE BASE POUR LE SQUAT
  private getBaseSquatReferences(weight: number, sex: string) {
    if (sex === 'male') {
      if (weight <= 66) return { A: 150, S: 220, World: 280 };
      if (weight <= 74) return { A: 180, S: 250, World: 320 };
      if (weight <= 83) return { A: 200, S: 280, World: 350 };
      if (weight <= 93) return { A: 220, S: 300, World: 380 };
      if (weight <= 105) return { A: 240, S: 320, World: 400 };
      if (weight <= 120) return { A: 260, S: 340, World: 420 };
      return { A: 280, S: 360, World: 440 };
    } else {
      if (weight <= 52) return { A: 90, S: 130, World: 170 };
      if (weight <= 57) return { A: 105, S: 150, World: 195 };
      if (weight <= 63) return { A: 120, S: 170, World: 220 };
      if (weight <= 72) return { A: 135, S: 190, World: 245 };
      if (weight <= 84) return { A: 150, S: 210, World: 270 };
      return { A: 165, S: 230, World: 295 };
    }
  }

  // RÉFÉRENCES DE BASE POUR LE SOULEVÉ DE TERRE
  private getBaseDeadliftReferences(weight: number, sex: string) {
    if (sex === 'male') {
      if (weight <= 66) return { A: 150, S: 220, World: 280 };
      if (weight <= 74) return { A: 180, S: 250, World: 320 };
      if (weight <= 83) return { A: 200, S: 280, World: 350 };
      if (weight <= 93) return { A: 220, S: 300, World: 380 };
      if (weight <= 105) return { A: 240, S: 320, World: 400 };
      if (weight <= 120) return { A: 260, S: 340, World: 420 };
      return { A: 280, S: 360, World: 440 };
    } else {
      if (weight <= 52) return { A: 90, S: 130, World: 170 };
      if (weight <= 57) return { A: 105, S: 150, World: 195 };
      if (weight <= 63) return { A: 120, S: 170, World: 220 };
      if (weight <= 72) return { A: 135, S: 190, World: 245 };
      if (weight <= 84) return { A: 150, S: 210, World: 270 };
      return { A: 165, S: 230, World: 295 };
    }
  }

  // NOUVELLE MÉTHODE : BONUS POUR PERFORMANCES EXCEPTIONNELLES DANS LES DOMAINES NON-SPÉCIALISÉS
  private applyCrossTrainingBonus(score: number, discipline: string, sportClass: string, value: number, refs: any): number {
    // Définir les domaines de spécialisation par classe de sport
    const specializations = {
      'power': ['bench', 'squat', 'deadlift'],
      'marathon': ['5k', 'course'],
      'calisthenics': ['pullups', 'pushups'],
      'crossfit': ['bench', 'squat', 'deadlift', '5k', 'course', 'pullups', 'pushups'],
      'streetlifting': ['bench', 'squat', 'deadlift', 'pullups', 'pushups'],
      'sprint': ['5k', 'course'],
      'classique': []
    };

    const isSpecialized = specializations[sportClass]?.includes(discipline) || false;

    if (!isSpecialized) {
      // BONUS POUR PERFORMANCES EXCEPTIONNELLES DANS LES DOMAINES NON-SPÉCIALISÉS
      let bonusMultiplier = 1.0;

      // Calculer le niveau de performance par rapport aux références
      let performanceLevel = 0;
      if (discipline === '5k') {
        // Pour la course, plus c'est rapide, mieux c'est
        performanceLevel = refs.A / value;
      } else {
        // Pour la force, plus c'est lourd, mieux c'est
        performanceLevel = value / refs.A;
      }

      // Appliquer un bonus progressif
      if (performanceLevel >= 1.5) {
        bonusMultiplier = 1.5; // +50% de bonus pour performances exceptionnelles
      } else if (performanceLevel >= 1.3) {
        bonusMultiplier = 1.3; // +30% de bonus
      } else if (performanceLevel >= 1.1) {
        bonusMultiplier = 1.1; // +10% de bonus
      }

      return score * bonusMultiplier;
    }

    return score;
  }

  // MÉTHODE POUR SÉLECTIONNER LES MEILLEURES PERFORMANCES
  private getBestPerformances(performances: PerformanceRecord[]): PerformanceRecord[] {
    const disciplineGroups: { [key: string]: PerformanceRecord[] } = {};

    // Grouper les performances par discipline
    performances.forEach(perf => {
      if (!disciplineGroups[perf.discipline]) {
        disciplineGroups[perf.discipline] = [];
      }
      disciplineGroups[perf.discipline].push(perf);
    });

    const bestPerformances: PerformanceRecord[] = [];

    // Pour chaque discipline, prendre la meilleure performance
    Object.keys(disciplineGroups).forEach(discipline => {
      const disciplinePerformances = disciplineGroups[discipline];

      if (disciplinePerformances.length === 0) return;

      let bestPerf: PerformanceRecord;

      // Logique différente selon le type d'exercice
      if (['bench', 'squat', 'deadlift', 'pullups'].includes(discipline)) {
        // Force : prendre le MAXIMUM (plus lourd)
        bestPerf = disciplinePerformances.reduce((max, current) =>
          current.value > max.value ? current : max
        );
      } else if (['5k', '10k', 'marathon', 'sprint'].includes(discipline)) {
        // Vitesse : prendre le MINIMUM (plus rapide)
        bestPerf = disciplinePerformances.reduce((min, current) =>
          current.value < min.value ? current : min
        );
      } else if (['plank', 'wall-sit', 'burpees'].includes(discipline)) {
        // Endurance : prendre le MAXIMUM (plus long)
        bestPerf = disciplinePerformances.reduce((max, current) =>
          current.value > max.value ? current : max
        );
      } else {
        // Par défaut : prendre le maximum
        bestPerf = disciplinePerformances.reduce((max, current) =>
          current.value > max.value ? current : max
        );
      }

      bestPerformances.push(bestPerf);
    });

    return bestPerformances;
  }
}

// Instance globale du moteur de scoring
export const scoringEngine = new ScoringEngine();
