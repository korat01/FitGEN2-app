import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import { VitalForceBackground } from '@/components/VitalForceBackground';
import { StatsPageHeader } from '@/components/stats/StatsPageHeader';
import { ProgressionTabNav, ProgressionTab } from '@/components/stats/ProgressionTabNav';
import { ProgressionAnalyticsContent } from '@/components/stats/ProgressionAnalyticsContent';
import { usePerformanceStats } from '@/hooks/usePerformanceStats';
import { useCelebration } from '@/hooks/useCelebration';
import { getRangColor, getRangIcon } from '@/utils/rankingHelpers';
import { Achievement } from '@/types/stats';
import { Target, ArrowLeft } from 'lucide-react';

export const Progression: React.FC = () => {
  const { celebrate } = useCelebration();
  const {
    user,
    performances,
    userRank,
    mainStats,
    globalStats,
    achievements,
    setAchievements,
    refreshFromStorage,
  } = usePerformanceStats();
  const [activeTab, setActiveTab] = useState<ProgressionTab>('overview');

  const handleAchievementClaim = (achievementId: string, achievement: Achievement, _element: HTMLElement) => {
    setAchievements((prev) =>
      prev.map((a) =>
        a.id === achievementId ? { ...a, unlocked: true, unlockedDate: new Date() } : a
      )
    );
    celebrate(achievement);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-background relative">
        <VitalForceBackground intensity="low" />
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-6 relative z-10 page-transition">
          <div className="space-y-5 md:space-y-6 max-w-6xl mx-auto">
            <StatsPageHeader
              userName={user?.name}
              rank={userRank?.rank || 'D'}
              rankIcon={getRangIcon(userRank?.rank || 'D')}
              rankColorClass={getRangColor(userRank?.rank || 'D')}
              globalScore={userRank?.globalScore || 0}
              onRefresh={refreshFromStorage}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Records, graphiques, classement et objectifs — consultation uniquement.
              </p>
              <Button asChild size="sm" variant="outline" className="shrink-0 border-primary/25">
                <Link to="/stats">
                  <Target className="w-4 h-4 mr-2" />
                  Saisir une performance
                </Link>
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as ProgressionTab)}
            >
              <ProgressionTabNav />
            </Tabs>

            <div className="min-h-[280px]" role="tabpanel">
              <ProgressionAnalyticsContent
                activeTab={activeTab}
                user={user}
                performances={performances}
                userRank={userRank}
                mainStats={mainStats}
                globalStats={globalStats}
                achievements={achievements}
                onAchievementClaim={handleAchievementClaim}
              />
            </div>

            <div className="text-center pb-4">
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l&apos;accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Progression;
