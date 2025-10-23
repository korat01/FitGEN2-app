import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useQuests } from '../contexts/QuestContext';
import { Target, Zap, Trophy, CheckCircle, ArrowRight, Star, Flame, Dumbbell, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      case 'exercise':
        return <Dumbbell className="w-4 h-4" />;
      case 'xp':
        return <Star className="w-4 h-4" />;
      case 'session':
        return <Target className="w-4 h-4" />;
      case 'streak':
        return <Flame className="w-4 h-4" />;
      case 'time':
        return <Timer className="w-4 h-4" />;
      case 'weight':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <Card className="text-gray-800 border border-gray-200 shadow-xl bg-gray-900">
      <CardHeader className="pb-4 bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-zinc-300">🎯 Quêtes du Jour</CardTitle>
              <p className="text-gray-600 text-sm">Défis quotidiens</p>
            </div>
          </div>
          <Link to="/quetes">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              Voir tout
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 bg-gray-900">
        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-100 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-gray-800">{activeQuests.length}</div>
            <div className="text-xs text-gray-600">Actives</div>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-gray-800">{Math.round(completionRate)}%</div>
            <div className="text-xs text-gray-600">Réussite</div>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-gray-800">+{totalDailyXP}</div>
            <div className="text-xs text-gray-600">XP Bonus</div>
          </div>
        </div>

        {/* Quêtes actives */}
        {activeQuests.length > 0 ? <div className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-300">Quêtes en cours</h4>
            {activeQuests.slice(0, 2).map(quest => {
          const progressPercentage = quest.current / quest.target * 100;
          const isCompleted = quest.current >= quest.target;
          return <div key={quest.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-blue-100 rounded">
                        {getQuestIcon(quest.type)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{quest.title}</span>
                    </div>
                    <Badge className={getDifficultyColor(quest.difficulty)}>
                      {quest.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-semibold text-gray-800">
                        {quest.current} / {quest.target}
                      </span>
                    </div>
                    
                    <Progress value={progressPercentage} className="h-1.5 bg-gray-200" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs font-medium text-gray-700">+{quest.reward.xp} XP</span>
                      </div>
                      
                      {isCompleted && <Button size="sm" onClick={() => completeQuest(quest.id)} className="bg-green-500 hover:bg-green-600 text-white h-6 px-2 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Récupérer
                        </Button>}
                    </div>
                  </div>
                </div>;
        })}
            
            {activeQuests.length > 2 && <div className="text-center">
                <Link to="/quetes">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 text-xs">
                    +{activeQuests.length - 2} autres quêtes
                  </Button>
                </Link>
              </div>}
          </div> : <div className="text-center py-4">
            <div className="text-4xl mb-2">🎉</div>
            <h4 className="text-sm font-semibold mb-1 text-gray-800">Toutes les quêtes terminées !</h4>
            <p className="text-xs text-gray-600">Revenez demain pour de nouveaux défis</p>
          </div>}

        {/* Quêtes terminées récemment */}
        {completedQuests.length > 0 && <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">Réussites récentes</h4>
            <div className="space-y-2">
              {completedQuests.slice(-2).map(quest => <div key={quest.id} className="bg-gray-50 rounded-lg p-2 flex items-center justify-between border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-yellow-100 rounded">
                      <Trophy className="w-3 h-3 text-yellow-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-800">{quest.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs font-semibold text-gray-700">+{quest.reward.xp}</span>
                  </div>
                </div>)}
            </div>
          </div>}
      </CardContent>
    </Card>;
};
export default QuestWidget;