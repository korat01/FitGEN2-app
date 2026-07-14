import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { scoringEngine } from '@/utils/scoring';
import {
  calculateMainStats,
  generateAchievements,
  calculateGlobalStats,
} from '@/utils/statsCalculator';
import { MainStats, Achievement, GlobalStats } from '@/types/stats';

export function usePerformanceStats() {
  const { user, updateUser } = useAuth();
  const [performances, setPerformances] = useState<any[]>([]);
  const [userRank, setUserRank] = useState<any>(null);
  const [mainStats, setMainStats] = useState<MainStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);

  const syncDerivedStats = useCallback(
    (performancesList: any[]) => {
      if (!user) return;

      const realRank = scoringEngine.calculateUserRank(user, performancesList);
      setUserRank(realRank);
      updateUser({ rank: realRank.rank, globalScore: realRank.globalScore });

      try {
        const formattedPerformances = performancesList.map((p: any) => ({
          id: p.id || Math.random().toString(),
          userId: user.id,
          discipline: { id: p.discipline, name: p.discipline },
          value: parseFloat(p.value) || 0,
          units: 'kg',
          date: new Date(p.date),
          context: 'raw',
          verified: true,
        }));

        setMainStats(calculateMainStats(user as any, formattedPerformances));
        setAchievements(generateAchievements(user as any, formattedPerformances));
        setGlobalStats(calculateGlobalStats(user as any, formattedPerformances));
      } catch (error) {
        console.error('Erreur calcul stats:', error);
      }
    },
    [user, updateUser]
  );

  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem('userPerformances');
    const list = saved ? JSON.parse(saved) : [];
    setPerformances(list);
    syncDerivedStats(list);
  }, [user, syncDerivedStats]);

  const refreshFromStorage = useCallback(() => {
    const saved = localStorage.getItem('userPerformances');
    const list = saved ? JSON.parse(saved) : [];
    setPerformances(list);
    syncDerivedStats(list);
    return list;
  }, [syncDerivedStats]);

  return {
    user,
    performances,
    setPerformances,
    userRank,
    mainStats,
    globalStats,
    achievements,
    setAchievements,
    syncDerivedStats,
    refreshFromStorage,
  };
}
