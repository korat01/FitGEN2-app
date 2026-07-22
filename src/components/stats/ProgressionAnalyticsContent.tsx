import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainStatsCards } from '@/components/MainStatsCards';
import { GlobalStatsDisplay } from '@/components/GlobalStatsDisplay';
import { Achievements } from '@/components/Achievements';
import { StatsSection } from '@/components/stats/StatsSection';
import { StatsOverviewEmpty } from '@/components/stats/StatsOverviewEmpty';
import { StatsRecordsPanel } from '@/components/stats/StatsRecordsPanel';
import { StatsProgressPanel } from '@/components/stats/StatsProgressPanel';
import { StatsGoalsPanel } from '@/components/stats/StatsGoalsPanel';
import { StatsRankingPanel } from '@/components/stats/StatsRankingPanel';
import { ProgressionTab } from '@/components/stats/ProgressionTabNav';
import { MainStats, Achievement, GlobalStats } from '@/types/stats';

interface ProgressionAnalyticsContentProps {
  activeTab: ProgressionTab;
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

export const ProgressionAnalyticsContent: React.FC<ProgressionAnalyticsContentProps> = ({
  activeTab,
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
        rank={user?.rank || userRank?.rank || 'D'}
        globalScore={user?.globalScore ?? userRank?.globalScore ?? 0}
        scoreLabel={user?.scoreLabel || userRank?.scoreLabel || 'pts'}
        onAddPerformance={() => navigate('/stats')}
      />
    );
  }

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        <StatsSection title="Performances clés" description="Force, vitesse et endurance en un coup d'œil">
          <MainStatsCards stats={mainStats!} />
        </StatsSection>
        {globalStats && <GlobalStatsDisplay stats={globalStats} />}
        <p className="text-center text-sm text-muted-foreground">
          <Link to="/stats" className="text-secondary hover:underline font-medium">
            Saisir ou modifier une performance →
          </Link>
        </p>
      </div>
    );
  }

  if (activeTab === 'records') {
    return (
      <div className="space-y-6">
        <StatsSection title="Records" description="Vos meilleures performances par discipline">
          <StatsRecordsPanel performances={performances} userWeight={user?.weight} />
        </StatsSection>
        {achievements.length > 0 && (
          <StatsSection title="Succès" description="Débloquez des récompenses XP">
            <Achievements achievements={achievements} onAchievementClaim={onAchievementClaim} />
          </StatsSection>
        )}
      </div>
    );
  }

  if (activeTab === 'progress') {
    return (
      <StatsSection title="Évolution" description="Suivez votre progression dans le temps">
        <StatsProgressPanel performances={performances} />
      </StatsSection>
    );
  }

  return (
    <div className="space-y-6">
      <StatsSection title="Classement" description="Comparez-vous aux autres athlètes">
        <StatsRankingPanel user={user} userRank={userRank} performances={performances} />
      </StatsSection>
      <StatsSection title="Objectif" description="Votre prochain défi de rang">
        <StatsGoalsPanel userRank={userRank} />
      </StatsSection>
    </div>
  );
};
