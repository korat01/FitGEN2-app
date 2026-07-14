export const getRangColor = (rang: string) => {
  switch (rang) {
    case 'S': return 'from-purple-600 to-purple-800';
    case 'A': return 'from-red-500 to-red-700';
    case 'B': return 'from-blue-500 to-blue-700';
    case 'C': return 'from-green-500 to-green-700';
    case 'D': return 'from-yellow-500 to-yellow-700';
    default: return 'from-gray-500 to-gray-700';
  }
};

export const getRangIcon = (rang: string) => {
  switch (rang) {
    case 'S': return '👑';
    case 'A': return '🏆';
    case 'B': return '🥇';
    case 'C': return '🥈';
    case 'D': return '🥉';
    default: return '⭐';
  }
};

export const getSportIcon = (sportClass: string) => {
  switch (sportClass) {
    case 'power': return '💪';
    case 'marathon': return '🏃';
    case 'crossfit': return '🔥';
    case 'calisthenics': return '🤸';
    case 'sprint': return '⚡';
    case 'classique': return '🏋️';
    case 'streetlifting': return '🏗️';
    default: return '🏃';
  }
};

export type RankingCategory = 'global' | 'sport' | 'weight' | 'age' | 'friends';

export interface RankingAthlete {
  id: string;
  name: string;
  rank: string;
  globalScore: number;
  sportClass: string;
  performances: number;
  trend: string;
  weight: number;
  age: number;
  friends: string[];
  lastActivity?: string;
  streak?: number;
}

export const buildMockRanking = (
  user: { id: string; name?: string; sportClass?: string; weight?: number; age?: number } | null,
  userRank: { rank?: string; globalScore?: number } | null,
  performancesCount: number
): RankingAthlete[] => {
  const mockRanking: RankingAthlete[] = [
    { id: '1', name: 'Alexandre', rank: 'S', globalScore: 950, sportClass: 'power', performances: 15, trend: 'up', weight: 85, age: 28, friends: ['2', '3'], streak: 12 },
    { id: '2', name: 'Marie', rank: 'A', globalScore: 850, sportClass: 'marathon', performances: 12, trend: 'up', weight: 60, age: 25, friends: ['1', '4'], streak: 8 },
    { id: '3', name: 'Thomas', rank: 'A', globalScore: 820, sportClass: 'crossfit', performances: 18, trend: 'down', weight: 75, age: 30, friends: ['1', '5'], streak: 5 },
    { id: '4', name: 'Sarah', rank: 'B', globalScore: 750, sportClass: 'calisthenics', performances: 10, trend: 'up', weight: 55, age: 22, friends: ['2', '6'], streak: 15 },
    { id: '5', name: 'Lucas', rank: 'B', globalScore: 720, sportClass: 'sprint', performances: 8, trend: 'stable', weight: 70, age: 26, friends: ['3', '7'], streak: 3 },
    { id: '6', name: 'Emma', rank: 'C', globalScore: 650, sportClass: 'classique', performances: 6, trend: 'up', weight: 58, age: 24, friends: ['4', '8'], streak: 7 },
    { id: '7', name: 'Pierre', rank: 'C', globalScore: 620, sportClass: 'streetlifting', performances: 9, trend: 'down', weight: 80, age: 32, friends: ['5', '9'], streak: 2 },
    { id: '8', name: 'Sophie', rank: 'D', globalScore: 580, sportClass: 'marathon', performances: 5, trend: 'stable', weight: 52, age: 20, friends: ['6', '10'], streak: 1 },
    { id: '9', name: 'Marc', rank: 'B', globalScore: 700, sportClass: 'power', performances: 11, trend: 'up', weight: 90, age: 35, friends: ['7', '11'], streak: 9 },
    { id: '10', name: 'Julie', rank: 'C', globalScore: 600, sportClass: 'calisthenics', performances: 7, trend: 'stable', weight: 50, age: 19, friends: ['8', '12'], streak: 4 },
  ];

  if (user && !mockRanking.find((u) => u.id === user.id)) {
    mockRanking.push({
      id: user.id,
      name: user.name || 'Vous',
      rank: userRank?.rank || 'D',
      globalScore: userRank?.globalScore || 0,
      sportClass: user.sportClass || 'classique',
      performances: performancesCount,
      trend: 'stable',
      weight: user.weight || 70,
      age: user.age || 25,
      friends: [],
      streak: 1,
    });
  }

  return mockRanking.sort((a, b) => b.globalScore - a.globalScore);
};

export const filterRanking = (
  globalRanking: RankingAthlete[],
  category: RankingCategory,
  user: { id?: string; sportClass?: string; weight?: number; age?: number } | null,
  friends: RankingAthlete[]
) => {
  switch (category) {
    case 'sport':
      return globalRanking.filter((athlete) => athlete.sportClass === user?.sportClass);
    case 'weight':
      if (!user?.weight) return globalRanking;
      return globalRanking.filter((athlete) => Math.abs(athlete.weight - user.weight!) <= 10);
    case 'age':
      if (!user?.age) return globalRanking;
      return globalRanking.filter((athlete) => Math.abs(athlete.age - user.age!) <= 5);
    case 'friends':
      return friends;
    default:
      return globalRanking;
  }
};

export const getCategoryTitle = (category: RankingCategory, sportClass?: string) => {
  switch (category) {
    case 'sport': return `Classement ${sportClass || 'Sport'}`;
    case 'weight': return 'Classement Poids (±10kg)';
    case 'age': return 'Classement Âge (±5ans)';
    case 'friends': return 'Classement Amis';
    default: return 'Classement Global';
  }
};

export const getCategoryDescription = (category: RankingCategory) => {
  switch (category) {
    case 'sport': return 'Athlètes pratiquant le même sport que vous';
    case 'weight': return 'Athlètes avec un poids similaire (±10kg)';
    case 'age': return 'Athlètes du même âge (±5ans)';
    case 'friends': return 'Vos amis et vous-même';
    default: return 'Tous les athlètes de la plateforme';
  }
};
