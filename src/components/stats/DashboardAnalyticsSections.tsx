import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainStatsCards } from '@/components/MainStatsCards';
import { GlobalStatsDisplay } from '@/components/GlobalStatsDisplay';
import { Achievements } from '@/components/Achievements';
import { StatsSection } from '@/components/stats/StatsSection';
import { StatsOverviewEmpty } from '@/components/stats/StatsOverviewEmpty';
import { StatsRecordsPanel } from '@/components/stats/StatsRecordsPanel';
import { StatsProgressPanel } from '@/components/stats/StatsProgressPanel';
import { StatsGoalsPanel } from '@/components/stats/StatsGoalsPanel';
import { StatsRankingPanel } from '@/components/stats/StatsRankingPanel';
import { MainStats, Achievement, GlobalStats } from '@/types/stats';

interface DashboardAnalyticsSectionsProps {
  user: any;
  performances: any[];
  userRank: any;
  mainStats: MainStats | null;
  globalStats: GlobalStats | null;
  achievements: Achievement[];
  onAchievementClaim: (
    achievementId: string,
    achievement: Achievement,
    element: HTMLElement
  ) => void;
}

export const DashboardAnalyticsSections: React.FC<DashboardAnalyticsSectionsProps> = ({
  user,
  performances,
  userRank,
  mainStats,
  globalStats,
  achievements,
  onAchievementClaim,
}) => {
  const navigate = useNavigate();
  const isEmpty = performances.length === 0 || !mainStats;

  if (isEmpty) {
    return (
      <StatsOverviewEmpty
        rank={userRank?.rank || user?.rank || 'D'}
        globalScore={userRank?.globalScore || user?.globalScore || 0}
        onAddPerformance={() => navigate('/stats')}
      />
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <StatsSection
        title="Performances clés"
        description="Force, vitesse et endurance en un coup d'œil"
      >
        <MainStatsCards stats={mainStats} />
        {globalStats && <GlobalStatsDisplay stats={globalStats} />}
      </StatsSection>

      <StatsSection title="Records" description="Vos meilleures performances par discipline">
        <StatsRecordsPanel
          performances={performances}
          userWeight={user?.weight}
        />
        {achievements.length > 0 && (
          <Achievements
            achievements={achievements}
            onAchievementClaim={onAchievementClaim}
          />
        )}
      </StatsSection>

      <StatsSection title="Évolution" description="Suivez votre progression dans le temps">
        <StatsProgressPanel performances={performances} />
      </StatsSection>

      <StatsSection title="Objectif" description="Votre prochain défi de rang">
        <StatsGoalsPanel userRank={userRank} />
      </StatsSection>

      <StatsSection title="Classement" description="Comparez-vous aux autres athlètes">
        <StatsRankingPanel
          user={user}
          userRank={userRank}
          performances={performances}
        />
      </StatsSection>
    </div>
  );
};
