import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useQuests } from '../contexts/QuestContext';
import { 
  Target, 
  Zap, 
  Clock, 
  Trophy, 
  Star, 
  CheckCircle, 
  Calendar,
  Award,
  TrendingUp,
  Flame,
  Dumbbell,
  Timer
} from 'lucide-react';

interface QuestCardProps {
  quest: any;
  onComplete?: (questId: string) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete }) => {
  const { completeQuest } = useQuests();
  
  const progressPercentage = (quest.current / quest.target) * 100;
  const isCompleted = quest.current >= quest.target;
  
  const getQuestIcon = (type: string) => {
    switch (type) {
      case 'exercise': return <Dumbbell className="w-5 h-5" />;
      case 'xp': return <Star className="w-5 h-5" />;
      case 'session': return <Target className="w-5 h-5" />;
      case 'streak': return <Flame className="w-5 h-5" />;
      case 'time': return <Timer className="w-5 h-5" />;
      case 'weight': return <Trophy className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/15 border border-green-500/25 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-500/15 border border-yellow-500/25 text-yellow-800 border-yellow-300';
      case 'hard': return 'bg-red-500/15 border border-red-500/25 text-red-800 border-red-300';
      default: return 'bg-white/5 text-foreground border-white/15';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      default: return 'Normal';
    }
  };

  const handleComplete = () => {
    if (isCompleted && !quest.completed) {
      completeQuest(quest.id);
      onComplete?.(quest.id);
    }
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${
      isCompleted ? 'bg-green-500/10 border-green-500/30' : 'glass-card border-primary/20'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              isCompleted ? 'bg-green-500/15 border border-green-500/25 text-green-400' : 'bg-primary/15 border border-primary/25 text-primary'
            }`}>
              {getQuestIcon(quest.type)}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {quest.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {quest.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getDifficultyColor(quest.difficulty)}>
              {getDifficultyText(quest.difficulty)}
            </Badge>
            {isCompleted && !quest.completed && (
              <Button
                size="sm"
                onClick={handleComplete}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Récupérer
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Barre de progression */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-semibold text-foreground">
              {quest.current} / {quest.target}
            </span>
          </div>
          
          <Progress
            value={Math.min(Math.max(progressPercentage, 0), 100)}
            size="sm"
            variant="subtle"
          />
          
          {/* Récompense */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-foreground/90">
                +{quest.reward.xp} XP
              </span>
              {quest.reward.badge && (
                <Badge variant="outline" className="text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  Badge
                </Badge>
              )}
            </div>
            
            {/* Indicateur de completion */}
            {isCompleted && (
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Terminé !</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DailyQuests: React.FC = () => {
  const { 
    dailyQuests, 
    weeklyQuests, 
    completedQuests, 
    getTotalDailyXP,
    getQuestCompletionRate 
  } = useQuests();

  const totalDailyXP = getTotalDailyXP();
  const completionRate = getQuestCompletionRate();

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">🎯 Quêtes Journalières</h2>
            <p className="text-purple-100">Défis quotidiens pour booster votre progression</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">+{totalDailyXP}</div>
            <div className="text-purple-100">XP Bonus</div>
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">{dailyQuests.length}</div>
            <div className="text-sm text-purple-100">Quêtes Actives</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">{Math.round(completionRate)}%</div>
            <div className="text-sm text-purple-100">Taux de Réussite</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">{completedQuests.length}</div>
            <div className="text-sm text-purple-100">Quêtes Terminées</div>
          </div>
        </div>
      </div>

      {/* Quêtes Quotidiennes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-secondary" />
          <h3 className="text-xl font-semibold text-foreground">Quêtes du Jour</h3>
        </div>
        
        {dailyQuests.length > 0 ? (
          <div className="grid gap-4">
            {dailyQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Toutes les quêtes sont terminées !
            </h3>
            <p className="text-muted-foreground">
              Revenez demain pour de nouveaux défis.
            </p>
          </Card>
        )}
      </div>

      {/* Quêtes Hebdomadaires */}
      {weeklyQuests.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="text-xl font-semibold text-foreground">Défis Hebdomadaires</h3>
          </div>
          
          <div className="grid gap-4">
            {weeklyQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </div>
      )}

      {/* Quêtes Terminées Récemment */}
      {completedQuests.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-semibold text-foreground">Réussites Récentes</h3>
          </div>
          
          <div className="grid gap-3">
            {completedQuests.slice(-3).map(quest => (
              <Card key={quest.id} className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/15 border border-yellow-500/25 text-yellow-600 rounded-lg">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{quest.title}</h4>
                        <p className="text-sm text-muted-foreground">{quest.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-yellow-600">+{quest.reward.xp} XP</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyQuests;