import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Zap } from 'lucide-react';
import { XPData } from '@/types/stats';

interface XPLevelBarProps {
  xpData: XPData;
}

export const XPLevelBar: React.FC<XPLevelBarProps> = ({ xpData }) => {
  const { currentXP, level, xpToNextLevel, totalXP, streakBonus } = xpData;
  
  // Couleur dynamique selon le niveau
  const getLevelColor = (level: number) => {
    if (level < 10) return 'from-blue-500 to-indigo-500';
    if (level < 25) return 'from-indigo-500 to-purple-500';
    if (level < 50) return 'from-purple-500 to-pink-500';
    if (level < 100) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  const getLevelIcon = (level: number) => {
    if (level < 10) return <Zap className="w-4 h-4" />;
    if (level < 25) return <Star className="w-4 h-4" />;
    if (level < 50) return <Crown className="w-4 h-4" />;
    return <Crown className="w-4 h-4" />;
  };

  const progressPercentage = (currentXP / 1000) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${getLevelColor(level)} rounded-xl flex items-center justify-center`}>
            {getLevelIcon(level)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Niveau {level}</h3>
            <p className="text-sm text-gray-600">Total XP : {totalXP.toLocaleString()}</p>
          </div>
        </div>
        
        {streakBonus > 0 && (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <Zap className="w-3 h-3 mr-1" />
            +{streakBonus}% Streak
          </Badge>
        )}
      </div>

      {/* Barre de progression XP */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progression vers le niveau {level + 1}</span>
          <span>{currentXP} / 1,000 XP</span>
        </div>
        
        <div className="relative">
          <Progress 
            value={progressPercentage} 
            className="h-4 bg-gray-200"
          />
          <div 
            className={`absolute top-0 left-0 h-4 bg-gradient-to-r ${getLevelColor(level)} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="text-center text-sm text-gray-500">
          {xpToNextLevel} XP restants
        </div>
      </div>

      {/* Indicateurs de niveau */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="text-center">
          <div className="text-xs text-gray-500">Débutant</div>
          <div className={`w-2 h-2 rounded-full ${level >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`} />
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Intermédiaire</div>
          <div className={`w-2 h-2 rounded-full ${level >= 10 ? 'bg-purple-500' : 'bg-gray-300'}`} />
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Avancé</div>
          <div className={`w-2 h-2 rounded-full ${level >= 25 ? 'bg-yellow-500' : 'bg-gray-300'}`} />
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Expert</div>
          <div className={`w-2 h-2 rounded-full ${level >= 50 ? 'bg-red-500' : 'bg-gray-300'}`} />
        </div>
      </div>
    </div>
  );
};
