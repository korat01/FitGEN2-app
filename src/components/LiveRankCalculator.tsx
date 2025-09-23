import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Trophy, Target, TrendingUp, Zap, Star, Award, Medal, Crown } from 'lucide-react';
import { getBenchReferences, getSquatReferences, getDeadliftReferences, getRunReferences, getSportProfile } from '../utils/standardsData';

interface LiveRankCalculatorProps {
  user: any;
  performances: any[];
  onRankUpdate?: (rank: any) => void;
}

export const LiveRankCalculator: React.FC<LiveRankCalculatorProps> = ({ 
  user, 
  performances = [], 
  onRankUpdate 
}) => {
  const [userRank, setUserRank] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // FONCTION POUR CALCULER LE RANG EN TEMPS RÉEL
  const calculateRealRank = (performancesList: any[]) => {
    if (!user || performancesList.length === 0) {
      return { rank: 'D', score: 0, reason: 'Aucune performance' };
    }

    const userWeight = user.weight || 75;
    const userSex = user.sex || 'male';
    const userSportClass = user.sportClass || 'classique';
    
    let totalScore = 0;
    let performanceCount = 0;
    let breakdown = {
      force: 0,
      endurance: 0,
      explosivite: 0,
      calisthenics: 0
    };

    performancesList.forEach((perf) => {
      let score = 0;

      switch (perf.discipline) {
        case 'bench':
          const benchRefs = getBenchReferences(userWeight, userSex);
          if (perf.value >= benchRefs.A) {
            score = 600 + (perf.value - benchRefs.A) / (benchRefs.S - benchRefs.A) * 300;
          } else {
            score = (perf.value / benchRefs.A) * 600;
          }
          breakdown.force += score;
          break;
          
        case 'squat':
          const squatRefs = getSquatReferences(userWeight, userSex);
          if (perf.value >= squatRefs.A) {
            score = 600 + (perf.value - squatRefs.A) / (squatRefs.S - squatRefs.A) * 300;
          } else {
            score = (perf.value / squatRefs.A) * 600;
          }
          breakdown.force += score;
          break;
          
        case 'deadlift':
          const deadliftRefs = getDeadliftReferences(userWeight, userSex);
          if (perf.value >= deadliftRefs.A) {
            score = 600 + (perf.value - deadliftRefs.A) / (deadliftRefs.S - deadliftRefs.A) * 300;
          } else {
            score = (perf.value / deadliftRefs.A) * 600;
          }
          breakdown.force += score;
          break;
          
        case '5k':
          const runRefs = getRunReferences(userSex);
          if (perf.value <= runRefs.A) {
            score = 600 + (runRefs.A - perf.value) / (runRefs.A - runRefs.S) * 300;
          } else {
            score = (runRefs.A / perf.value) * 600;
          }
          breakdown.endurance += score;
          break;
      }

      totalScore += score;
      performanceCount++;
    });

    const averageScore = performanceCount > 0 ? totalScore / performanceCount : 0;
    
    // Appliquer les pondérations selon la classe de sport
    const sportProfile = getSportProfile(userSportClass);
    const weightedScore = averageScore * sportProfile.force;

    return {
      rank: determineRankFromScore(weightedScore),
      score: Math.round(weightedScore),
      reason: `Basé sur ${performanceCount} performance(s) avec profil ${userSportClass}`,
      breakdown: {
        force: Math.round(breakdown.force / performanceCount),
        endurance: Math.round(breakdown.endurance / performanceCount),
        explosivite: 0,
        calisthenics: 0
      }
    };
  };

  // FONCTION POUR DÉTERMINER LE RANG SELON LE SCORE
  const determineRankFromScore = (score: number): string => {
    if (score < 100) return 'E';
    if (score < 250) return 'D';
    if (score < 400) return 'C';
    if (score < 550) return 'B';
    if (score < 700) return 'A';
    if (score < 800) return 'S';
    if (score < 900) return 'Nation';
    return 'World';
  };

  // FONCTION POUR OBTENIR LA COULEUR DU RANG
  const getRangColor = (rang: string) => {
    switch (rang) {
      case 'World': return 'from-yellow-400 to-yellow-600';
      case 'Nation': return 'from-purple-500 to-purple-700';
      case 'S': return 'from-purple-600 to-purple-800';
      case 'A': return 'from-red-500 to-red-700';
      case 'B': return 'from-blue-500 to-blue-700';
      case 'C': return 'from-green-500 to-green-700';
      case 'D': return 'from-yellow-500 to-yellow-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  // FONCTION POUR OBTENIR L'ICÔNE DU RANG
  const getRangIcon = (rang: string) => {
    switch (rang) {
      case 'World': return <Crown className="w-6 h-6" />;
      case 'Nation': return <Award className="w-6 h-6" />;
      case 'S': return <Trophy className="w-6 h-6" />;
      case 'A': return <Medal className="w-6 h-6" />;
      case 'B': return <Star className="w-6 h-6" />;
      case 'C': return <Target className="w-6 h-6" />;
      case 'D': return <Zap className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  // RECALCULER LE RANG QUAND LES PERFORMANCES CHANGENT
  useEffect(() => {
    if (performances.length > 0) {
      setIsCalculating(true);
      setTimeout(() => {
        const newRank = calculateRealRank(performances);
        setUserRank(newRank);
        if (onRankUpdate) {
          onRankUpdate(newRank);
        }
        setIsCalculating(false);
      }, 500);
    }
  }, [performances, user]);

  if (!user) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Connectez-vous pour voir votre rang</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Calculateur de Rang en Temps Réel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isCalculating ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Calcul en cours...</p>
          </div>
        ) : userRank ? (
          <>
            {/* Affichage du rang principal */}
            <div className="text-center space-y-4">
              <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r ${getRangColor(userRank.rank)} text-white font-bold text-2xl shadow-lg`}>
                {getRangIcon(userRank.rank)}
                <span>Rang {userRank.rank}</span>
              </div>
              
              <div className="text-4xl font-bold text-indigo-600">
                {userRank.score}/1000
              </div>
              <div className="text-lg text-gray-600">Score global</div>
            </div>

            {/* Barre de progression */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progression vers le rang supérieur</span>
                <span>{userRank.score}%</span>
              </div>
              <Progress value={userRank.score} className="h-4" />
            </div>

            {/* Détail des scores */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Force</div>
                <div className="text-2xl font-bold text-red-600">{userRank.breakdown.force}</div>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Endurance</div>
                <div className="text-2xl font-bold text-blue-600">{userRank.breakdown.endurance}</div>
              </div>
            </div>

            {/* Informations contextuelles */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <div className="text-sm text-gray-600 mb-1">Calcul basé sur</div>
              <div className="text-lg font-semibold text-gray-800">{userRank.reason}</div>
            </div>

            {/* Bouton de recalcul */}
            <Button
              onClick={() => {
                const newRank = calculateRealRank(performances);
                setUserRank(newRank);
                if (onRankUpdate) {
                  onRankUpdate(newRank);
                }
              }}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Recalculer le rang
            </Button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500">
              <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Aucune performance enregistrée</p>
              <p className="text-sm">Ajoutez vos performances pour calculer votre rang !</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 