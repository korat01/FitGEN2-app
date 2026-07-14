import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Target,
  Trophy,
  Medal,
  BarChart3,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus,
} from 'lucide-react';
import {
  buildMockRanking,
  filterRanking,
  getCategoryTitle,
  getCategoryDescription,
  getRangColor,
  getRangIcon,
  getSportIcon,
  RankingCategory,
  RankingAthlete,
} from '@/utils/rankingHelpers';

interface StatsRankingPanelProps {
  user: any;
  userRank: any;
  performances: any[];
}

const SPORT_NAMES: Record<string, string> = {
  power: 'Powerlifting',
  marathon: 'Marathon',
  crossfit: 'CrossFit',
  calisthenics: 'Calisthénics',
  sprint: 'Sprint',
  classique: 'Musculation',
  streetlifting: 'Street Lifting',
};

const RANK_LEVELS = ['S', 'A', 'B', 'C', 'D'];
const SPORT_CLASSES = ['power', 'marathon', 'crossfit', 'calisthenics', 'sprint', 'classique', 'streetlifting'];

const getPositionIcon = (position: number) => {
  switch (position) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return `${position}`;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
    case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
    default: return <Minus className="w-4 h-4 text-muted-foreground" />;
  }
};

export const StatsRankingPanel: React.FC<StatsRankingPanelProps> = ({
  user,
  userRank,
  performances,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RankingCategory>('global');
  const [globalRanking, setGlobalRanking] = useState<RankingAthlete[]>([]);
  const [friends, setFriends] = useState<RankingAthlete[]>([]);

  useEffect(() => {
    const ranking = buildMockRanking(user, userRank, performances.length);
    setGlobalRanking(ranking);

    if (user) {
      const userFriends = ranking.filter(
        (athlete) => athlete.friends.includes(user.id) || athlete.id === user.id
      );
      setFriends(userFriends);
    }
  }, [user, userRank, performances.length]);

  const filteredRanking = useMemo(
    () => filterRanking(globalRanking, selectedCategory, user, friends),
    [globalRanking, selectedCategory, user, friends]
  );

  const topAthletes = filteredRanking.slice(0, 10);
  const userPosition = filteredRanking.findIndex((u) => u.id === user?.id) + 1;

  const categoryButtonClass = (category: RankingCategory) =>
    selectedCategory === category
      ? 'gradient-primary text-white border-transparent'
      : 'border-white/15 text-muted-foreground hover:bg-white/5';

  return (
    <div className="space-y-5 md:space-y-6">
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            Filtrer le classement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(
              [
                { key: 'global' as const, label: '🌍 Global' },
                { key: 'sport' as const, label: `${getSportIcon(user?.sportClass || 'classique')} Sport` },
                { key: 'weight' as const, label: '⚖️ Poids' },
                { key: 'age' as const, label: '🎂 Âge' },
                { key: 'friends' as const, label: '👥 Amis' },
              ] as const
            ).map(({ key, label }) => (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(key)}
                className={`${categoryButtonClass(key)} font-semibold`}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            {getCategoryTitle(selectedCategory, user?.sportClass)}
          </CardTitle>
          <p className="text-muted-foreground">{getCategoryDescription(selectedCategory)}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                {userPosition || 'N/A'}
              </div>
              <div className="text-lg font-semibold text-foreground">Votre position</div>
              <div className="text-sm text-muted-foreground">
                sur {filteredRanking.length} athlètes
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                {userRank?.globalScore || 0}
              </div>
              <div className="text-lg font-semibold text-foreground">Votre score</div>
              <div className="text-sm text-muted-foreground">sur 1000 points</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl">
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">
                {performances.length}
              </div>
              <div className="text-lg font-semibold text-foreground">Performances</div>
              <div className="text-sm text-muted-foreground">enregistrées</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Medal className="w-5 h-5 text-yellow-500" />
            Top Athlètes ({Math.min(10, filteredRanking.length)})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topAthletes.map((athlete, index) => {
              const isCurrentUser = athlete.id === user?.id;

              return (
                <div
                  key={athlete.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/40 shadow-lg'
                      : 'bg-gradient-to-r from-white/5 to-white/10 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg">
                      {getPositionIcon(index + 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-lg ${
                            isCurrentUser ? 'text-blue-300' : 'text-foreground'
                          }`}
                        >
                          {athlete.name}
                        </span>
                        {isCurrentUser && (
                          <Badge className="bg-primary/20 text-foreground border-primary/40">
                            Vous
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                        <span>{getSportIcon(athlete.sportClass)}</span>
                        <span className="capitalize">{athlete.sportClass}</span>
                        <span>•</span>
                        <span>{athlete.performances} performances</span>
                        <span>•</span>
                        <span>{athlete.weight}kg</span>
                        <span>•</span>
                        <span>{athlete.age}ans</span>
                        {athlete.streak != null && (
                          <>
                            <span>•</span>
                            <span className="text-orange-400 font-semibold">🔥{athlete.streak}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div
                        className={`font-bold text-xl ${
                          isCurrentUser ? 'text-blue-400' : 'text-foreground'
                        }`}
                      >
                        {athlete.globalScore}
                      </div>
                      <div className="text-sm text-muted-foreground">points</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getRangColor(athlete.rank)} text-white font-semibold text-sm`}
                      >
                        <span>{getRangIcon(athlete.rank)}</span>
                        <span>{athlete.rank}</span>
                      </div>
                      {getTrendIcon(athlete.trend)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              Répartition par rang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {RANK_LEVELS.map((rank) => {
                const count = filteredRanking.filter((a) => a.rank === rank).length;
                const percentage =
                  filteredRanking.length > 0
                    ? Math.round((count / filteredRanking.length) * 100)
                    : 0;

                return (
                  <div key={rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getRangIcon(rank)}</span>
                      <span className="font-semibold text-foreground">Rang {rank}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-white/10 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getRangColor(rank)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-muted-foreground w-8">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Répartition par sport
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {SPORT_CLASSES.map((sport) => {
                const count = filteredRanking.filter((a) => a.sportClass === sport).length;
                const percentage =
                  filteredRanking.length > 0
                    ? Math.round((count / filteredRanking.length) * 100)
                    : 0;

                return (
                  <div key={sport} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getSportIcon(sport)}</span>
                      <span className="font-semibold text-foreground">{SPORT_NAMES[sport]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-white/10 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-muted-foreground w-8">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
