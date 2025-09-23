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
    const userAge = user.age || 25;
    
    // DÉTERMINER LA CATÉGORIE D'ÂGE
    const ageCategory = this.getAgeCategory(userAge);
    const ageMultiplier = this.getAgeMultiplier(userAge);
    
    console.log('📊 Données utilisateur:', { 
      userWeight, 
      userSex, 
      userSportClass, 
      userAge, 
      ageCategory, 
      ageMultiplier,
      performancesCount: performances.length 
    });

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
          // RÉFÉRENCES AVEC AJUSTEMENT JUNIOR
          let benchRefs;
          if (userWeight <= 66) {
            benchRefs = { A: 100, S: 150, World: 200 };
          } else if (userWeight <= 74) {
            benchRefs = { A: 120, S: 180, World: 220 };
          } else if (userWeight <= 83) {
            benchRefs = { A: 140, S: 200, World: 250 };
          } else if (userWeight <= 93) {
            benchRefs = { A: 160, S: 220, World: 280 };
          } else if (userWeight <= 105) {
            benchRefs = { A: 180, S: 240, World: 300 };
          } else {
            benchRefs = { A: 200, S: 260, World: 320 };
          }
          
          // APPLIQUER LE MULTIPLICATEUR JUNIOR
          benchRefs.A *= ageMultiplier;
          benchRefs.S *= ageMultiplier;
          benchRefs.World *= ageMultiplier;
          
          console.log(`💪 Bench ${perf.value}kg pour ${userWeight}kg (${ageCategory}):`, benchRefs);
          
          if (perf.value >= benchRefs.A) {
            score = 600 + (perf.value - benchRefs.A) / (benchRefs.S - benchRefs.A) * 300;
          } else {
            score = (perf.value / benchRefs.A) * 600;
          }
          category = 'force';
          break;
          
        case 'squat':
          // RÉFÉRENCES AVEC AJUSTEMENT JUNIOR
          let squatRefs;
          if (userWeight <= 66) {
            squatRefs = { A: 150, S: 220, World: 280 };
          } else if (userWeight <= 74) {
            squatRefs = { A: 180, S: 250, World: 320 };
          } else if (userWeight <= 83) {
            squatRefs = { A: 200, S: 280, World: 350 };
          } else if (userWeight <= 93) {
            squatRefs = { A: 220, S: 300, World: 380 };
          } else if (userWeight <= 105) {
            squatRefs = { A: 240, S: 320, World: 400 };
          } else {
            squatRefs = { A: 260, S: 340, World: 420 };
          }
          
          // APPLIQUER LE MULTIPLICATEUR JUNIOR
          squatRefs.A *= ageMultiplier;
          squatRefs.S *= ageMultiplier;
          squatRefs.World *= ageMultiplier;
          
          console.log(`🏋️ Squat ${perf.value}kg pour ${userWeight}kg (${ageCategory}):`, squatRefs);
          
          if (perf.value >= squatRefs.A) {
            score = 600 + (perf.value - squatRefs.A) / (squatRefs.S - squatRefs.A) * 300;
          } else {
            score = (perf.value / squatRefs.A) * 600;
          }
          category = 'force';
          break;
          
        case 'deadlift':
          // RÉFÉRENCES AVEC AJUSTEMENT JUNIOR
          let deadliftRefs;
          if (userWeight <= 66) {
            deadliftRefs = { A: 150, S: 220, World: 280 };
          } else if (userWeight <= 74) {
            deadliftRefs = { A: 180, S: 250, World: 320 };
          } else if (userWeight <= 83) {
            deadliftRefs = { A: 200, S: 280, World: 350 };
          } else if (userWeight <= 93) {
            deadliftRefs = { A: 220, S: 300, World: 380 };
          } else if (userWeight <= 105) {
            deadliftRefs = { A: 240, S: 320, World: 400 };
          } else {
            deadliftRefs = { A: 260, S: 340, World: 420 };
          }
          
          // APPLIQUER LE MULTIPLICATEUR JUNIOR
          deadliftRefs.A *= ageMultiplier;
          deadliftRefs.S *= ageMultiplier;
          deadliftRefs.World *= ageMultiplier;
          
          console.log(`⚡ Deadlift ${perf.value}kg pour ${userWeight}kg (${ageCategory}):`, deadliftRefs);
          
          if (perf.value >= deadliftRefs.A) {
            score = 600 + (perf.value - deadliftRefs.A) / (deadliftRefs.S - deadliftRefs.A) * 300;
          } else {
            score = (perf.value / deadliftRefs.A) * 600;
          }
          category = 'force';
          break;
          
        case '5k':
          // RÉFÉRENCES POUR LE 5KM
          const runRefs = userSex === 'male' ? { A: 20, S: 16, World: 12 } : { A: 25, S: 20, World: 15 };
          console.log(`🏃 5km ${perf.value}min (${userSex}):`, runRefs);
          
          if (perf.value <= runRefs.A) {
            score = 600 + (runRefs.A - perf.value) / (runRefs.A - runRefs.S) * 300;
          } else {
            score = (runRefs.A / perf.value) * 600;
          }
          category = 'endurance';
          break;
          
        case 'pullups':
          // RÉFÉRENCES POUR LES TRACTIONS
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
    const sportProfile = this.getSportProfile(userSportClass);
    const weightedScore = averageScore * sportProfile.force;

    console.log('📈 Score final:', { 
      totalScore, 
      performanceCount, 
      averageScore, 
      weightedScore, 
      sportProfile,
      ageCategory,
      ageMultiplier,
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
      reason: `Basé sur ${performanceCount} performance(s) avec profil ${userSportClass} (${ageCategory})`
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

  // DÉTERMINER LA CATÉGORIE D'ÂGE
  private getAgeCategory(age: number): string {
    if (age >= 14 && age <= 18) return 'sub-junior';
    if (age >= 19 && age <= 23) return 'junior';
    if (age >= 24 && age <= 39) return 'open';
    if (age >= 40 && age <= 49) return 'masters1';
    if (age >= 50 && age <= 59) return 'masters2';
    if (age >= 60) return 'masters3+';
    return 'open';
  }

  // MULTIPLICATEUR SELON LA CATÉGORIE D'ÂGE
  private getAgeMultiplier(age: number): number {
    const category = this.getAgeCategory(age);
    switch (category) {
      case 'sub-junior': return 0.85;  // Références plus basses
      case 'junior': return 0.9;         // Références légèrement plus basses
      case 'open': return 1.0;         // Références standard
      case 'masters1': return 1.05;     // Léger bonus
      case 'masters2': return 1.1;      // Bonus
      case 'masters3+': return 1.15;    // Bonus important
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
}

// Instance globale du moteur de scoring
export const scoringEngine = new ScoringEngine(); 