import React from 'react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Zap, Star, Trophy, Crown, Sparkles } from 'lucide-react';
import { useExerciseValidation } from '../contexts/ExerciseContext';

export const XPLevelBar: React.FC = () => {
  const { xpData } = useExerciseValidation();

  if (!xpData) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = (xpData.currentXP / xpData.xpToNextLevel) * 100;
  
  // Déterminer l'icône selon le niveau
  const getLevelIcon = (level: number) => {
    if (level >= 50) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (level >= 25) return <Trophy className="w-6 h-6 text-purple-500" />;
    if (level >= 10) return <Star className="w-6 h-6 text-blue-500" />;
    return <Zap className="w-6 h-6 text-indigo-500" />;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl relative overflow-hidden">
      {/* Effets visuels subtils */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <CardContent className="p-6 relative z-10">
        <div className="space-y-4">
          {/* En-tête avec niveau et icône */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getLevelIcon(xpData.level)}
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                  Niveau {xpData.level}
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                </h3>
                <p className="text-sm text-gray-600">Total: {xpData.totalXP.toLocaleString()} XP</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200">
              <Zap className="w-3 h-3 mr-1" />
              {xpData.currentXP}/{xpData.xpToNextLevel} XP
            </Badge>
          </div>

          {/* Barre de progression avec style cohérent */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Progression vers le niveau {xpData.level + 1}</span>
              <span className="font-bold text-gray-800">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="relative">
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-gray-200 rounded-full overflow-hidden"
              />
              {/* Effet de brillance sur la barre */}
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
                style={{
                  width: `${progressPercentage}%`,
                  animation: 'shimmer 2s infinite'
                }}
              ></div>
            </div>
          </div>

          {/* Informations supplémentaires avec design cohérent */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold mb-1 text-gray-600">XP Restant</p>
              <p className="text-lg font-bold text-gray-800">{xpData.xpToNextLevel - xpData.currentXP}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold mb-1 text-gray-600">Prochain Niveau</p>
              <p className="text-lg font-bold text-gray-800">{xpData.level + 1}</p>
            </div>
          </div>

          {/* Message motivant avec style cohérent */}
          <div className="text-center text-sm text-gray-600 italic">
            {xpData.level >= 50 && "🏆 Légende du fitness !"}
            {xpData.level >= 25 && xpData.level < 50 && "⭐ Champion en devenir !"}
            {xpData.level >= 10 && xpData.level < 25 && "🔥 Sur la bonne voie !"}
            {xpData.level < 10 && "🚀 Commencez votre aventure !"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};