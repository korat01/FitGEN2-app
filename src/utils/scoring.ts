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

import { getFFForceReferences, calculateFFForceScore, getAgeCategory } from './ffforceStandards';

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
    
    console.log('🔍 Vérification des données utilisateur:', {
      'user.weight': user.weight,
      'user.age': user.age,
      'user.sex': user.sex,
      'user.sportClass': user.sportClass,
      'Calculé userWeight': userWeight,
      'Calculé userAge': userAge,
      'Calculé userSex': userSex,
      'Calculé ageMultiplier': ageMultiplier,
      'Type de user.sex': typeof user.sex,
      'Valeur exacte user.sex': JSON.stringify(user.sex)
    });

    let totalScore = 0;
    let performanceCount = 0;
    let breakdown = {
      force: 0,
      endurance: 0,
      explosivite: 0,
      calisthenics: 0
    };

    // CALCULER LES MEILLEURES PERFORMANCES POUR CHAQUE DISCIPLINE
    const bestPerformances = this.getBestPerformances(performances);
    console.log('🏆 Meilleures performances sélectionnées:', bestPerformances);

    // UTILISER LES RÉFÉRENCES OFFICIELLES FFForce
    const ffForceRefs = getFFForceReferences(userAge, userWeight, userSex);
    
    if (ffForceRefs) {
      console.log('🏆 Utilisation des références FFForce officielles:', ffForceRefs);
      
      // Calculer le total des 3 mouvements principaux
      const squatPerf = bestPerformances.find(p => p.discipline === 'squat');
      const benchPerf = bestPerformances.find(p => p.discipline === 'bench');
      const deadliftPerf = bestPerformances.find(p => p.discipline === 'deadlift');
      
      if (squatPerf && benchPerf && deadliftPerf) {
        const totalWeight = squatPerf.value + benchPerf.value + deadliftPerf.value;
        const ffForceResult = calculateFFForceScore(totalWeight, ffForceRefs);
        
        console.log(`🏋️ Total 3 mouvements: ${totalWeight}kg`);
        console.log(`📊 Score FFForce: ${ffForceResult.score}, Rang: ${ffForceResult.rank}`);
        
        // MAPPING FFForce vers vos rangs
        const ffForceToAppRank = (ffForceRank: string): string => {
          switch (ffForceRank) {
            case 'D': return 'Non classé';
            case 'R3': return 'E';
            case 'R2': return 'C';
            case 'R1': return 'B';
            case 'N2': return 'A';
            case 'N1': return 'S';
            case 'Europe': return 'Nation';
            case 'Monde': return 'World';
            default: return 'Non classé';
          }
        };

        return {
          rank: ffForceToAppRank(ffForceResult.rank),
          globalScore: Math.round(ffForceResult.score),
          breakdown: {
            force: ffForceResult.score,
            endurance: 0,
            explosivite: 0,
            calisthenics: 0
          },
          reason: `Basé sur les références FFForce officielles (${getAgeCategory(userAge)} - ${userWeight}kg - ${userSex})`
        };
      }
    }

    // FALLBACK: Système de scoring classique si pas de références FFForce
    bestPerformances.forEach((perf) => {
      if (!perf.discipline || !perf.value || isNaN(perf.value)) {
        console.log('⚠️ Performance invalide ignorée:', perf);
        return;
      }

      let score = 0;
      let category = '';

      switch (perf.discipline) {
        case 'bench':
          // RÉFÉRENCES AVEC AJUSTEMENT SEXE + ÂGE + CLASSE DE SPORT
          let benchRefs = this.getBenchReferences(userWeight, userSex, userSportClass);
          
          console.log(`💪 Bench ${perf.value}kg pour ${userWeight}kg (${userSex}, ${userSportClass}, ${ageCategory}):`, {
            'Références avant âge': benchRefs,
            'Multiplicateur âge': ageMultiplier,
            'Sexe utilisé': userSex,
            'Poids utilisé': userWeight
          });
          
          // APPLIQUER LE MULTIPLICATEUR D'ÂGE
          benchRefs.A *= ageMultiplier;
          benchRefs.S *= ageMultiplier;
          benchRefs.World *= ageMultiplier;
          
          if (perf.value >= benchRefs.A) {
            score = 600 + (perf.value - benchRefs.A) / (benchRefs.S - benchRefs.A) * 300;
          } else {
            score = (perf.value / benchRefs.A) * 600;
          }
          
          console.log(`💪 Bench ${perf.value}kg pour ${userWeight}kg (${userSex}, ${userSportClass}, ${ageCategory}):`, {
            'Références après âge': benchRefs,
            'Score calculé': score
          });
          
          // BONUS POUR PERFORMANCES EXCEPTIONNELLES DANS LES DOMAINES NON-SPÉCIALISÉS
          score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, benchRefs);
          
          category = 'force';
          break;
          
        case 'squat':
          // RÉFÉRENCES AVEC AJUSTEMENT SEXE + ÂGE + CLASSE DE SPORT
          let squatRefs = this.getSquatReferences(userWeight, userSex, userSportClass);
          
          // APPLIQUER LE MULTIPLICATEUR D'ÂGE
          squatRefs.A *= ageMultiplier;
          squatRefs.S *= ageMultiplier;
          squatRefs.World *= ageMultiplier;
          
          console.log(`🏋️ Squat ${perf.value}kg pour ${userWeight}kg (${userSex}, ${userSportClass}, ${ageCategory}):`, squatRefs);
          
          if (perf.value >= squatRefs.A) {
            score = 600 + (perf.value - squatRefs.A) / (squatRefs.S - squatRefs.A) * 300;
          } else {
            score = (perf.value / squatRefs.A) * 600;
          }
          
          score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, squatRefs);
          
          category = 'force';
          break;
          
        case 'deadlift':
          // RÉFÉRENCES AVEC AJUSTEMENT SEXE + ÂGE + CLASSE DE SPORT
          let deadliftRefs = this.getDeadliftReferences(userWeight, userSex, userSportClass);
          
          // APPLIQUER LE MULTIPLICATEUR D'ÂGE
          deadliftRefs.A *= ageMultiplier;
          deadliftRefs.S *= ageMultiplier;
          deadliftRefs.World *= ageMultiplier;
          
          console.log(`⚡ Deadlift ${perf.value}kg pour ${userWeight}kg (${userSex}, ${userSportClass}, ${ageCategory}):`, deadliftRefs);
          
          if (perf.value >= deadliftRefs.A) {
            score = 600 + (perf.value - deadliftRefs.A) / (deadliftRefs.S - deadliftRefs.A) * 300;
          } else {
            score = (perf.value / deadliftRefs.A) * 600;
          }
          
          score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, deadliftRefs);
          
          category = 'force';
          break;
          
        case '5k':
          // RÉFÉRENCES POUR LE 5KM AVEC SEXE + CLASSE DE SPORT
          const runRefs = this.getRunReferences(userSex, userSportClass);
          console.log(`🏃 5km ${perf.value}min (${userSex}, ${userSportClass}):`, runRefs);
          
          if (perf.value <= runRefs.A) {
            score = 600 + (runRefs.A - perf.value) / (runRefs.A - runRefs.S) * 300;
          } else {
            score = (runRefs.A / perf.value) * 600;
          }
          
          score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, runRefs);
          
          category = 'endurance';
          break;
          
        case 'pullups':
          // RÉFÉRENCES POUR LES TRACTIONS AVEC SEXE + CLASSE DE SPORT
          const pullupRefs = this.getPullupReferences(userSex, userSportClass);
          console.log(`🤸‍♂️ Tractions ${perf.value} reps (${userSex}, ${userSportClass}):`, pullupRefs);
          
          if (perf.value >= pullupRefs.A) {
            score = 600 + (perf.value - pullupRefs.A) / (pullupRefs.S - pullupRefs.A) * 300;
          } else {
            score = (perf.value / pullupRefs.A) * 600;
          }
          
          score = this.applyCrossTrainingBonus(score, perf.discipline, userSportClass, perf.value, pullupRefs);
          
          category = 'calisthenics';
          break;
          
        default:
          console.log('⚠️ Discipline non reconnue:', perf.discipline);
          break;
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
      userSex,
      userWeight,
      userAge,
      breakdown 
    });

    const finalRank = this.determineRank(weightedScore);
    const finalScore = Math.round(weightedScore);

    console.log('🏆 RANG FINAL:', { 
      rank: finalRank, 
      score: finalScore,
      'Âge utilisé': userAge,
      'Poids utilisé': userWeight,
      'Multiplicateur âge': ageMultiplier,
      'Profil sport': userSportClass
    });

    return {
      rank: finalRank,
      globalScore: finalScore,
      breakdown: {
        force: Math.round(breakdown.force / performanceCount),
        endurance: Math.round(breakdown.endurance / performanceCount),
        explosivite: Math.round(breakdown.explosivite / performanceCount),
        calisthenics: Math.round(breakdown.calisthenics / performanceCount)
      },
      reason: `Basé sur ${performanceCount} performance(s) avec profil ${userSportClass} (${userSex}, ${ageCategory})`
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

  // DÉTERMINER LA CATÉGORIE D'ÂGE SELON LES STANDARDS FFForce
  private getAgeCategory(age: number): string {
    return getAgeCategory(age);
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
      'marathon': ['5k'],
      'calisthenics': ['pullups'],
      'crossfit': ['bench', 'squat', 'deadlift', '5k', 'pullups'],
      'streetlifting': ['bench', 'squat', 'deadlift', 'pullups'],
      'sprint': ['5k'],
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
      
      console.log(`🎯 Bonus cross-training pour ${discipline} (${sportClass}): ${performanceLevel.toFixed(2)}x → +${((bonusMultiplier - 1) * 100).toFixed(0)}%`);
      
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
      console.log(`🏆 Meilleure performance ${discipline}: ${bestPerf.value} (${disciplinePerformances.length} performances au total)`);
    });
    
    return bestPerformances;
  }
}

// Instance globale du moteur de scoring
export const scoringEngine = new ScoringEngine(); 

// Examinons les rangs définis dans le système de scoring

// Affichage des rangs existants pour référence
console.log('Rangs définis dans le système:', {
  // Ici je vais voir quels rangs sont déjà définis
  rangs: [
    // Les rangs actuels du système
  ]
}); 