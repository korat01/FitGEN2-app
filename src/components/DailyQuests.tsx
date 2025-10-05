import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Clock, CheckCircle, Zap } from 'lucide-react';
import { DailyQuest } from '@/types/stats';

interface DailyQuestCardProps {
  quest: DailyQuest;
  onComplete: (questId: string) => void;
}

const DailyQuestCard: React.FC<DailyQuestCardProps> = ({ quest, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const resetTime = new Date(quest.resetTime);
      const diff = resetTime.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Reset imminent');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Mise à jour chaque minute

    return () => clearInterval(interval);
  }, [quest.resetTime]);

  const progressPercentage = (quest.progress / quest.maxProgress) * 100;
  const isCompleted = quest.completed || quest.progress >= quest.maxProgress;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workout': return 'from-blue-500 to-indigo-500';
      case 'nutrition': return 'from-green-500 to-emerald-500';
      case 'activity': return 'from-purple-500 to-pink-500';
      case 'social': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <Card className={`bg-white/80 backdrop-blur-sm border-0 shadow-xl transition-all duration-300 ${
      isCompleted ? 'ring-2 ring-green-500 bg-green-50/50' : 'hover:shadow-2xl'
    }`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(quest.category)} rounded-xl flex items-center justify-center`}>
              <span className="text-white text-lg">{quest.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{quest.title}</h3>
              <p className="text-sm text-gray-600">{quest.description}</p>
            </div>
          </div>
          
          <div className="text-right">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              <Zap className="w-3 h-3 mr-1" />
              +{quest.xpReward} XP
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progression</span>
            <span>{quest.progress} / {quest.maxProgress}</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className={`h-3 ${isCompleted ? 'bg-green-200' : ''}`}
          />
        </div>

        {/* Timer de reset */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Reset dans {timeLeft}</span>
          </div>
          
          {isCompleted ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Terminé
            </Badge>
          ) : (
            <Button 
              size="sm" 
              onClick={() => onComplete(quest.id)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            >
              <Target className="w-4 h-4 mr-2" />
              Valider
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface DailyQuestsProps {
  quests: DailyQuest[];
  onQuestComplete: (questId: string) => void;
}

export const DailyQuests: React.FC<DailyQuestsProps> = ({ quests, onQuestComplete }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          Quêtes du jour
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quests.map((quest) => (
            <DailyQuestCard
              key={quest.id}
              quest={quest}
              onComplete={onQuestComplete}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
