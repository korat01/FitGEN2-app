import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import { VitalForceBackground } from '@/components/VitalForceBackground';
import { StatsPageHeader } from '@/components/stats/StatsPageHeader';
import { PerformanceManager } from '@/components/stats/PerformanceManager';
import { usePerformanceStats } from '@/hooks/usePerformanceStats';
import { getRangColor, getRangIcon } from '@/utils/rankingHelpers';

export const Stats: React.FC = () => {
  const {
    user,
    performances,
    setPerformances,
    userRank,
    syncDerivedStats,
    refreshFromStorage,
  } = usePerformanceStats();

  const handleAdd = (form: { discipline: string; value: string; date: string }) => {
    if (!user) return;
    const newPerformance = {
      id: Date.now().toString(),
      discipline: form.discipline,
      value: parseFloat(form.value),
      date: form.date,
      userId: user.id,
    };
    const updated = [...performances, newPerformance];
    setPerformances(updated);
    localStorage.setItem('userPerformances', JSON.stringify(updated));
    syncDerivedStats(updated);
  };

  const handleDelete = (performanceId: string) => {
    const updated = performances.filter((p) => p.id !== performanceId);
    setPerformances(updated);
    localStorage.setItem('userPerformances', JSON.stringify(updated));
    syncDerivedStats(updated);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-background relative">
        <VitalForceBackground intensity="low" />
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-6 relative z-10 page-transition">
          <div className="space-y-5 md:space-y-6 max-w-3xl mx-auto">
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
                Saisissez et gérez vos performances ici. Records, graphiques et classement sont sur l&apos;accueil.
              </p>
              <Button asChild variant="outline" size="sm" className="shrink-0 border-primary/25">
                <Link to="/dashboard">
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Voir mes statistiques
                </Link>
              </Button>
            </div>

            <PerformanceManager
              performances={performances}
              userRank={userRank}
              onAdd={handleAdd}
              onDelete={handleDelete}
            />

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

export default Stats;
