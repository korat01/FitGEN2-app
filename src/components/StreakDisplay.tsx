import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Trophy, Calendar } from 'lucide-react';
import { StreakData } from '@/types/stats';

interface StreakDisplayProps {
  streakData: StreakData;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streakData }) => {
  const { currentStreak, longestStreak, weeklyHistory, streakBonus } = streakData;

  const getStreakColor = (streak: number) => {
    if (streak < 3) return 'text-gray-500';
    if (streak < 7) return 'text-orange-500';
    if (streak < 14) return 'text-red-500';
    if (streak < 30) return 'text-purple-500';
    return 'text-yellow-500';
  };

  const getStreakIcon = (streak: number) => {
    if (streak < 3) return <Flame className="w-5 h-5" />;
    if (streak < 7) return <Flame className="w-6 h-6" />;
    if (streak < 14) return <Flame className="w-7 h-7" />;
    return <Trophy className="w-7 h-7" />;
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Commence ta série !";
    if (streak < 3) return "Bien commencé !";
    if (streak < 7) return "Excellente régularité !";
    if (streak < 14) return "Impressionnant !";
    if (streak < 30) return "Légendaire !";
    return "MYTHIQUE !";
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          Streak & Régularité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Streak actuelle */}
        <div className="text-center">
          <div className={`flex items-center justify-center gap-3 mb-2 ${getStreakColor(currentStreak)}`}>
            {getStreakIcon(currentStreak)}
            <span className="text-4xl font-bold">{currentStreak}</span>
            <span className="text-lg">jours</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{getStreakMessage(currentStreak)}</p>
          
          {streakBonus > 0 && (
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              <Flame className="w-3 h-3 mr-1" />
              +{streakBonus}% Bonus XP
            </Badge>
          )}
        </div>

        {/* Historique 7 jours */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Historique 7 jours
          </h4>
          
          <div className="grid grid-cols-7 gap-2">
            {weeklyHistory.map((completed, index) => {
              const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
              return (
                <div key={index} className="text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                    completed 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {dayNames[index]}
                  </div>
                  <div className={`w-3 h-3 rounded-full mx-auto ${
                    completed ? 'bg-orange-500' : 'bg-gray-300'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Record personnel */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-purple-600" />
              <div>
                <h4 className="font-semibold text-gray-800">Record personnel</h4>
                <p className="text-sm text-gray-600">Plus longue série</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{longestStreak}</div>
              <div className="text-sm text-gray-600">jours</div>
            </div>
          </div>
        </div>

        {/* Conseils pour maintenir le streak */}
        {currentStreak > 0 && (
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Conseil</h4>
            <p className="text-sm text-blue-700">
              {currentStreak < 7 
                ? "Continue comme ça ! Chaque jour compte pour construire une habitude solide."
                : currentStreak < 30
                ? "Tu es sur la bonne voie ! La régularité est la clé du succès."
                : "Tu es un exemple de discipline ! Inspire les autres avec ta constance."
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
