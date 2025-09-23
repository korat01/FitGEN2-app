import { STANDARDS_DATA, getBenchReferences, getSquatReferences, getDeadliftReferences, getRunReferences, getSportProfile } from './standardsData';

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
}

export class ScoringEngine {
  // FONCTION PRINCIPALE POUR CALCULER LE RANG D'UN UTILISATEUR
  public calculateUserRank(user: any, performances: PerformanceRecord[]): GlobalScore {
    console.log('🔍 DÉBUT DU CALCUL DE RANG');
    console.log('Utilisateur:', user);
    console.log('Performances:', performances);

    if (!user) {
      console.log('❌ Pas d\'utilisateur');
      return {
        rank: 'D',
        globalScore: 0,
        breakdown: { force: 0, endurance: 0, explosivite: 0, calisthenics: 0 },
        reason: 'Utilisateur non connecté'
      };
    }

    if (!performances || performances.length === 0) {
      console.log('❌ Pas de performances');
      return {
        rank: 'D',
        globalScore: 0,
        breakdown: { force: 0, endurance: 0, explosivite: 0, calisthenics: 0 },
        reason: 'Aucune performance enregistrée'
      };
    }

    const userWeight = user.weight || 75;
    const userSex = user.sex || 'male';
    const userSportClass = user.sportClass || 'classique';
    
    console.log('📊 Données utilisateur:', { userWeight, userSex, userSportClass, performancesCount: performances.length });

    let totalScore = 0;
    let performanceCount = 0;
    let breakdown = {
      force: 0,
      endurance: 0,
      explosivite: 0,
      calisthenics: 0
    };

    performances.forEach((perf) => {
      if (!perf.discipline || !perf.value || isNaN(perf.value)) {
        console.log('⚠️ Performance invalide ignorée:', perf);
        return;
      }

      let score = 0;
      let category = '';

      switch (perf.discipline) {
        case 'bench':
          const benchRefs = getBenchReferences(userWeight, userSex);
          console.log(`💪 Bench ${perf.value}kg pour ${userWeight}kg (${userSex}):`, benchRefs);
          
          if (perf.value >= benchRefs.A) {
            score = 600 + (perf.value - benchRefs.A) / (benchRefs.S - benchRefs.A) * 300;
          } else {
            score = (perf.value / benchRefs.A) * 600;
          }
          category = 'force';
          break;
          
        case 'squat':
          const squatRefs = getSquatReferences(userWeight, userSex);
          console.log(`🏋️ Squat ${perf.value}kg pour ${userWeight}kg (${userSex}):`, squatRefs);
          
          if (perf.value >= squatRefs.A) {
            score = 600 + (perf.value - squatRefs.A) / (squatRefs.S - squatRefs.A) * 300;
          } else {
            score = (perf.value / squatRefs.A) * 600;
          }
          category = 'force';
          break;
          
        case 'deadlift':
          const deadliftRefs = getDeadliftReferences(userWeight, userSex);
          console.log(`⚡ Deadlift ${perf.value}kg pour ${userWeight}kg (${userSex}):`, deadliftRefs);
          
          if (perf.value >= deadliftRefs.A) {
            score = 600 + (perf.value - deadliftRefs.A) / (deadliftRefs.S - deadliftRefs.A) * 300;
          } else {
            score = (perf.value / deadliftRefs.A) * 600;
          }
          category = 'force';
          break;
          
        case '5k':
          const runRefs = getRunReferences(userSex);
          console.log(`🏃 5km ${perf.value}min (${userSex}):`, runRefs);
          
          if (perf.value <= runRefs.A) {
            score = 600 + (runRefs.A - perf.value) / (runRefs.A - runRefs.S) * 300;
          } else {
            score = (runRefs.A / perf.value) * 600;
          }
          category = 'endurance';
          break;
          
        case 'pullups':
          // Références pour les tractions
          const pullupRefs = { A: 15, S: 25, World: 35 }; // reps
          console.log(`🤸‍♂️ Tractions ${perf.value} reps:`, pullupRefs);
          
          if (perf.value >= pullupRefs.A) {
            score = 600 + (perf.value - pullupRefs.A) / (pullupRefs.S - pullupRefs.A) * 300;
          } else {
            score = (perf.value / pullupRefs.A) * 600;
          }
          category = 'calisthenics';
          break;
          
        default:
          console.log('⚠️ Discipline non reconnue:', perf.discipline);
          return;
      }

      console.log(`✅ Performance ${perf.discipline}: ${perf.value} → Score: ${score} (catégorie: ${category})`);
      
      totalScore += score;
      performanceCount++;
      breakdown[category] += score;
    });

    if (performanceCount === 0) {
      console.log('❌ Aucune performance valide');
      return {
        rank: 'D',
        globalScore: 0,
        breakdown: { force: 0, endurance: 0, explosivite: 0, calisthenics: 0 },
        reason: 'Aucune performance valide'
      };
    }

    const averageScore = totalScore / performanceCount;
    
    // Appliquer les pondérations selon la classe de sport
    const sportProfile = getSportProfile(userSportClass);
    const weightedScore = averageScore * sportProfile.force;

    console.log('📈 Score final:', { 
      totalScore, 
      performanceCount, 
      averageScore, 
      weightedScore, 
      sportProfile,
      breakdown 
    });

    const finalRank = this.determineRank(weightedScore);
    const finalScore = Math.round(weightedScore);

    console.log('🏆 RANG FINAL:', { rank: finalRank, score: finalScore });

    return {
      rank: finalRank,
      globalScore: finalScore,
      breakdown: {
        force: Math.round(breakdown.force / performanceCount),
        endurance: Math.round(breakdown.endurance / performanceCount),
        explosivite: Math.round(breakdown.explosivite / performanceCount),
        calisthenics: Math.round(breakdown.calisthenics / performanceCount)
      },
      reason: `Basé sur ${performanceCount} performance(s) avec profil ${userSportClass}`
    };
  }

  // Détermination du rang basé sur le score global
  private determineRank(score: number): string {
    if (isNaN(score) || score < 0) {
      console.log('⚠️ Score invalide:', score);
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
}

// Instance globale du moteur de scoring
export const scoringEngine = new ScoringEngine(); 