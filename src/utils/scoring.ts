// Système de scoring et normalisation
export class ScoringEngine {
  private standards: StandardReference[] = [];
  private disciplines: Discipline[] = [];

  constructor() {
    this.loadStandards();
    this.loadDisciplines();
  }

  // Normalisation simple (méthode 3.1)
  calculateNormalizedScore(
    performance: number,
    discipline: string,
    userSex: 'male' | 'female',
    userWeight?: number,
    userAge?: number
  ): number {
    const weightCategory = userWeight ? getWeightCategory(userWeight, userSex) : undefined;
    const refs = this.getReferences(discipline, userSex, weightCategory);
    
    if (refs.length < 3) {
      // Valeurs par défaut si pas de références
      return Math.min(1000, Math.max(0, performance * 2));
    }

    const [refA, refS, refWorld] = refs;
    
    let adjustedPerformance = performance;
    
    // Ajustement poids si nécessaire
    if (userWeight && this.isWeightAdjustedDiscipline(discipline)) {
      adjustedPerformance = this.applyWeightAdjustment(performance, userWeight, userSex);
    }
    
    // Ajustement âge si nécessaire
    if (userAge && this.isAgeAdjustedDiscipline(discipline)) {
      adjustedPerformance = this.applyAgeAdjustment(adjustedPerformance, userAge);
    }

    // Calcul du score normalisé avec progression plus réaliste
    if (adjustedPerformance < refA.thresholdValue) {
      // 0-400 points pour les performances sous le minima national
      return Math.floor(400 * (adjustedPerformance / refA.thresholdValue));
    } else if (adjustedPerformance < refS.thresholdValue) {
      // 400-700 points pour les performances entre minima national et élite
      return Math.floor(400 + 300 * ((adjustedPerformance - refA.thresholdValue) / (refS.thresholdValue - refA.thresholdValue)));
    } else {
      // 700-1000 points pour les performances d'élite et records
      return Math.floor(700 + 300 * ((adjustedPerformance - refS.thresholdValue) / (refWorld.thresholdValue - refS.thresholdValue)));
    }
  }

  // Calcul du score global avec pondérations par profil et bonus
  calculateGlobalScore(
    userScores: { [discipline: string]: number },
    userProfile: UserProfile,
    sportClass?: string
  ): GlobalScore {
    // Utiliser le profil selon la classe de sport si disponible
    const profileWeights = sportClass ? getSportProfile(sportClass) : userProfile.weights;
    
    const categoryScores = this.aggregateByCategory(userScores);
    
    // Calcul du score de base
    let globalScore = Math.floor(
      categoryScores.force * profileWeights.force +
      categoryScores.endurance * profileWeights.endurance +
      categoryScores.explosivite * profileWeights.explosivite +
      categoryScores.calisthenics * profileWeights.calisthenics
    );

    // Bonus de polyvalence si l'utilisateur excelle dans plusieurs catégories
    const maxCategory = Math.max(categoryScores.force, categoryScores.endurance, categoryScores.explosivite, categoryScores.calisthenics);
    const minCategory = Math.min(categoryScores.force, categoryScores.endurance, categoryScores.explosivite, categoryScores.calisthenics);
    
    // Si l'écart entre max et min est faible, bonus de polyvalence
    if (maxCategory - minCategory < 200) {
      globalScore = Math.floor(globalScore * 1.05); // +5% bonus polyvalence
    }

    // Bonus de spécialisation si l'utilisateur excelle dans sa catégorie principale
    const mainCategoryScore = categoryScores[this.getMainCategory(sportClass)];
    if (mainCategoryScore > 600) {
      globalScore = Math.floor(globalScore * 1.03); // +3% bonus spécialisation
    }

    // Limiter le score à 1000
    globalScore = Math.min(1000, globalScore);

    const rank = this.determineRank(globalScore);

    return {
      userId: '', // sera rempli par l'appelant
      date: new Date(),
      globalScore,
      rank,
      breakdown: categoryScores,
      profile: userProfile
    };
  }

  // Détermination du rang basé sur le score global - ajusté pour être plus réaliste
  private determineRank(score: number): RankLevel {
    // Seuils ajustés pour être plus progressifs et réalistes
    if (score < 100) return 'E';      // Débutant - très faible
    if (score < 250) return 'D';      // Occasionnel - faible
    if (score < 400) return 'C';      // Confirmé - moyen
    if (score < 550) return 'B';      // Régional - bon
    if (score < 700) return 'A';      // National - très bon
    if (score < 800) return 'S';      // Mondial élite - excellent
    if (score < 900) return 'Nation'; // Top national - exceptionnel
    return 'World';                   // Record mondial - légendaire
  }

  // Agrégation par catégorie
  private aggregateByCategory(scores: { [discipline: string]: number }): {
    force: number;
    endurance: number;
    explosivite: number;
    calisthenics: number;
  } {
    const categories = {
      force: 0,
      endurance: 0,
      explosivite: 0,
      calisthenics: 0
    };

    // Logique d'agrégation par catégorie
    // Pour l'instant, moyenne simple - à améliorer avec des pondérations spécifiques
    Object.entries(scores).forEach(([discipline, score]) => {
      const disc = this.disciplines.find(d => d.id === discipline);
      if (disc) {
        categories[disc.category] += score;
      }
    });

    return categories;
  }

  // Ajustement poids corporel (Wilks/IPF)
  private applyWeightAdjustment(performance: number, weight: number, sex: 'male' | 'female'): number {
    // Implémentation simplifiée - à remplacer par la vraie formule Wilks/IPF
    const wilksCoeff = this.calculateWilksCoefficient(weight, sex);
    return performance * wilksCoeff;
  }

  // Ajustement âge (tables Masters)
  private applyAgeAdjustment(performance: number, age: number): number {
    const ageCoeff = this.getAgeCoefficient(age);
    return performance / ageCoeff; // Diviser pour comparer à la "valeur adulte optimale"
  }

  // Coefficients Wilks/IPF plus réalistes
  private calculateWilksCoefficient(weight: number, sex: 'male' | 'female'): number {
    // Coefficients simplifiés mais plus réalistes
    if (sex === 'male') {
      if (weight < 60) return 1.2;
      if (weight < 75) return 1.1;
      if (weight < 90) return 1.0;
      if (weight < 105) return 0.95;
      return 0.9;
    } else {
      if (weight < 50) return 1.15;
      if (weight < 65) return 1.05;
      if (weight < 80) return 1.0;
      if (weight < 95) return 0.95;
      return 0.9;
    }
  }

  // Coefficients d'âge plus réalistes
  private getAgeCoefficient(age: number): number {
    if (age < 20) return 0.95;  // Jeunes adultes
    if (age < 25) return 1.0;   // Pic de performance
    if (age < 30) return 0.98;
    if (age < 35) return 0.95;
    if (age < 40) return 0.90;
    if (age < 45) return 0.85;
    if (age < 50) return 0.80;
    if (age < 55) return 0.75;
    if (age < 60) return 0.70;
    return 0.65;
  }

  // Vérification si la discipline nécessite un ajustement poids
  private isWeightAdjustedDiscipline(discipline: string): boolean {
    const weightAdjustedDisciplines = ['bench', 'squat', 'deadlift', 'powerlifting'];
    return weightAdjustedDisciplines.includes(discipline.toLowerCase());
  }

  // Vérification si la discipline nécessite un ajustement âge
  private isAgeAdjustedDiscipline(discipline: string): boolean {
    return true; // Toutes les disciplines pour l'instant
  }

  // Récupération des références pour une discipline avec catégorie de poids
  private getReferences(discipline: string, sex: 'male' | 'female', weightCategory?: string): StandardReference[] {
    const disciplineData = STANDARDS_DATA[discipline as keyof typeof STANDARDS_DATA];
    if (!disciplineData) return [];

    const sexData = disciplineData[sex];
    if (!sexData) return [];

    // Si pas de catégorie de poids spécifiée, utiliser la première disponible
    const category = weightCategory || Object.keys(sexData)[0];
    const categoryData = sexData[category as keyof typeof sexData];
    
    if (!categoryData) return [];

    return [
      { discipline, sex, weightCategory: category, rankLevel: 'A', thresholdValue: categoryData.A.value, source: categoryData.A.source },
      { discipline, sex, weightCategory: category, rankLevel: 'S', thresholdValue: categoryData.S.value, source: categoryData.S.source },
      { discipline, sex, weightCategory: category, rankLevel: 'World', thresholdValue: categoryData.World.value, source: categoryData.World.source }
    ];
  }

  // Chargement des standards (à remplacer par de vraies données)
  private loadStandards(): void {
    // Données d'exemple - à remplacer par de vraies références IPF/FFA
    this.standards = [
      {
        discipline: 'bench',
        sex: 'male',
        weightCategory: '90kg',
        rankLevel: 'A',
        thresholdValue: 140,
        source: 'FFA'
      },
      {
        discipline: 'bench',
        sex: 'male',
        weightCategory: '90kg',
        rankLevel: 'S',
        thresholdValue: 180,
        source: 'IPF'
      },
      {
        discipline: 'bench',
        sex: 'male',
        weightCategory: '90kg',
        rankLevel: 'World',
        thresholdValue: 230,
        source: 'IPF'
      }
    ];
  }

  // Chargement des disciplines
  private loadDisciplines(): void {
    this.disciplines = [
      { id: 'bench', name: 'Développé couché', category: 'force', units: 'kg' },
      { id: 'squat', name: 'Squat', category: 'force', units: 'kg' },
      { id: 'deadlift', name: 'Soulevé de terre', category: 'force', units: 'kg' },
      { id: '5k', name: '5km', category: 'endurance', units: 'min', isTimeBased: true },
      { id: 'pullups', name: 'Tractions', category: 'calisthenics', units: 'reps' }
    ];
  }

  // Fonction pour déterminer la catégorie principale selon le sport
  private getMainCategory(sportClass?: string): keyof typeof categoryScores {
    const mainCategories = {
      'crossfit': 'force' as const,
      'power': 'force' as const,
      'classique': 'force' as const,
      'marathon': 'endurance' as const,
      'calisthenics': 'calisthenics' as const,
      'yoga': 'calisthenics' as const,
      'natation': 'endurance' as const,
      'cyclisme': 'endurance' as const
    };
    
    return mainCategories[sportClass as keyof typeof mainCategories] || 'force';
  }
} 

// Fonction pour calculer le rang d'un utilisateur à partir de ses données existantes
export const calculateUserRank = (userData: any): GlobalScore => {
  const scoringEngine = new ScoringEngine();
  
  // Récupérer les performances de l'utilisateur
  const performances = userData.performances || [];
  const userScores: { [discipline: string]: number } = {};
  
  // Calculer le score normalisé pour chaque performance
  performances.forEach((perf: any) => {
    const normalizedScore = scoringEngine.calculateNormalizedScore(
      perf.value,
      perf.discipline,
      userData.sex,
      userData.weight,
      userData.age
    );
    
    // Garder le meilleur score pour chaque discipline
    if (!userScores[perf.discipline] || normalizedScore > userScores[perf.discipline]) {
      userScores[perf.discipline] = normalizedScore;
    }
  });
  
  // Déterminer le profil utilisateur
  const userProfile = getUserProfile(userData.profileType || 'allround');
  
  // Calculer le score global
  return scoringEngine.calculateGlobalScore(userScores, userProfile);
};

// Fonction pour déterminer le profil utilisateur
const getUserProfile = (profileType: string): UserProfile => {
  const profiles = {
    powerlifter: { force: 0.7, endurance: 0.05, explosivite: 0.15, calisthenics: 0.1 },
    runner: { force: 0.05, endurance: 0.8, explosivite: 0.1, calisthenics: 0.05 },
    allround: { force: 0.3, endurance: 0.3, explosivite: 0.2, calisthenics: 0.2 },
    calisthenics: { force: 0.2, endurance: 0.1, explosivite: 0.2, calisthenics: 0.5 }
  };
  
  return profiles[profileType as keyof typeof profiles] || profiles.allround;
}; 