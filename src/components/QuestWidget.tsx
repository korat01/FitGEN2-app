import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useQuests } from '../contexts/QuestContext';
import { Target, Zap, Trophy, CheckCircle, ArrowRight, Star, Flame, Dumbbell, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const statBoxClass = 'rounded-xl bg-white/5 border border-white/10 p-3 text-center';

export const QuestWidget: React.FC = () => {
  const {
    dailyQuests,
    getTotalDailyXP,
    getQuestCompletionRate,
    completeQuest
  } = useQuests();
  const totalDailyXP = getTotalDailyXP();
  const completionRate = getQuestCompletionRate();
  const activeQuests = dailyQuests.filter(q => !q.completed);
  const completedQuests = dailyQuests.filter(q => q.completed);

  const getQuestIcon = (type: string) => {
    switch (type) {
      case 'exercise': return <Dumbbell className="w-4 h-4" />;
      case 'xp': return <Star className="w-4 h-4" />;
      case 'session': return <Target className="w-4 h-4" />;
      case 'streak': return <Flame className="w-4 h-4" />;
      case 'time': return <Timer className="w-4 h-4" />;
      case 'weight': return <Trophy className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/15 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
      case 'hard': return 'bg-red-500/15 text-red-300 border-red-500/30';
      default: return 'bg-white/10 text-muted-foreground border-white/15';
    }
  };

  return (
    <Card className="glass-card border-primary/20 shadow-[var(--shadow-card)]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-secondary/15 border border-secondary/30 shrink-0">
              <Target className="w-5 h-5 text-secondary" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg md:text-xl font-semibold text-foreground">
                Quêtes du jour
              </CardTitle>
              <p className="text-sm text-muted-foreground">Défis quotidiens</p>
            </div>
          </div>
          <Link to="/quetes">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-white/10 shrink-0">
              Voir tout
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className={statBoxClass}>
            <div className="text-lg font-semibold text-foreground tabular-nums">{activeQuests.length}</div>
            <div className="text-xs text-muted-foreground">Actives</div>
          </div>
          <div className={statBoxClass}>
            <div className="text-lg font-semibold text-foreground tabular-nums">{Math.round(completionRate)}%</div>
            <div className="text-xs text-muted-foreground">Réussite</div>
          </div>
          <div className={statBoxClass}>
            <div className="text-lg font-semibold text-foreground tabular-nums">+{totalDailyXP}</div>
            <div className="text-xs text-muted-foreground">XP bonus</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progression globale</span>
            <span className="tabular-nums">{Math.round(completionRate)}%</span>
          </div>
          <Progress value={completionRate} size="sm" variant="subtle" />
        </div>

        {activeQuests.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Quêtes en cours</h4>
            {activeQuests.slice(0, 2).map(quest => {
              const progressPercentage = Math.min(Math.max((quest.current / quest.target) * 100, 0), 100);
              const isCompleted = quest.current >= quest.target;

              return (
                <div key={quest.id} className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1.5 rounded-lg bg-primary/15 border border-primary/25 shrink-0">
                        {getQuestIcon(quest.type)}
                      </div>
                      <span className="text-sm font-medium text-foreground truncate">{quest.title}</span>
                    </div>
                    <Badge className={`shrink-0 ${getDifficultyColor(quest.difficulty)}`}>
                      {quest.difficulty}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-medium text-foreground tabular-nums">
                        {quest.current} / {quest.target}
                      </span>
                    </div>

                    <Progress value={progressPercentage} size="sm" variant="subtle" />

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-medium text-muted-foreground">+{quest.reward.xp} XP</span>
                      </div>

                      {isCompleted && (
                        <Button
                          size="sm"
                          onClick={() => completeQuest(quest.id)}
                          className="bg-green-600 hover:bg-green-700 text-white h-7 px-2 text-xs"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Récupérer
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {activeQuests.length > 2 && (
              <div className="text-center">
                <Link to="/quetes">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-white/10 text-xs">
                    +{activeQuests.length - 2} autres quêtes
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-3xl mb-2">🎉</div>
            <h4 className="text-sm font-semibold mb-1 text-foreground">Toutes les quêtes terminées</h4>
            <p className="text-xs text-muted-foreground">Revenez demain pour de nouveaux défis</p>
          </div>
        )}

        {completedQuests.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Réussites récentes</h4>
            <div className="space-y-2">
              {completedQuests.slice(-2).map(quest => (
                <div key={quest.id} className="rounded-lg bg-white/5 border border-white/10 p-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1 rounded bg-yellow-500/15 border border-yellow-500/25 shrink-0">
                      <Trophy className="w-3 h-3 text-yellow-400" />
                    </div>
                    <span className="text-xs font-medium text-foreground truncate">{quest.title}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-semibold text-muted-foreground tabular-nums">+{quest.reward.xp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestWidget;
