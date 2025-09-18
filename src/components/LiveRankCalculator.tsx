import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScoringEngine } from '../utils/scoring';
import { getSportProfile } from '../utils/standardsData';

interface LiveRankCalculatorProps {
  user: any;
  performances?: any[];
}

export const LiveRankCalculator: React.FC<LiveRankCalculatorProps> = ({ user, performances = [] }) => {
  const [userRank, setUserRank] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const calculateRank = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const scoringEngine = new ScoringEngine();
      
      // Simuler des performances si aucune n'est fournie
      const mockPerformances = performances.length > 0 ? performances : [
        { discipline: 'bench', value: user.weight * 1.2, date: new Date() },
        { discipline: 'squat', value: user.weight * 1.5, date: new Date() },
        { discipline: 'deadlift', value: user.weight * 1.8, date: new Date() },
        { discipline: '5k', value: 25, date: new Date() },
        { discipline: 'pullups', value: 8, date: new Date() }
      ];
      
      // Calculer les scores normalisés pour chaque performance
      const userScores: { [discipline: string]: number } = {};
      
      mockPerformances.forEach((perf: any) => {
        const normalizedScore = scoringEngine.calculateNormalizedScore(
          perf.value,
          perf.discipline,
          user.sex || 'male',
          user.weight || 75,
          user.age || 28
        );
        
        // Garder le meilleur score pour chaque discipline
        if (!userScores[perf.discipline] || normalizedScore > userScores[perf.discipline]) {
          userScores[perf.discipline] = normalizedScore;
        }
      });
      
      // Créer le profil utilisateur
      const userProfile = {
        id: user.id || '1',
        name: user.name || 'Utilisateur',
        weights: getSportProfile(user.sportClass || 'classique')
      };
      
      // Calculer le score global
      const globalScore = scoringEngine.calculateGlobalScore(
        userScores,
        userProfile,
        user.sportClass || 'classique'
      );
      
      setUserRank(globalScore);
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('Erreur lors du calcul du rang:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateRank();
  }, [user, performances]);

  const getRankColor = (rank: string) => {
    const colors = {
      'E': 'bg-gray-400',
      'D': 'bg-blue-400',
      'C': 'bg-green-400',
      'B': 'bg-yellow-400',
      'A': 'bg-orange-400',
      'S': 'bg-red-400',
      'Nation': 'bg-purple-400',
      'World': 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    };
    return colors[rank as keyof typeof colors] || 'bg-gray-400';
  };

  const getRankLabel = (rank: string) => {
    const labels = {
      'E': 'Débutant',
      'D': 'Occasionnel',
      'C': 'Confirmé',
      'B': 'Régional',
      'A': 'National',
      'S': 'Mondial élite',
      'Nation': 'Top national',
      'World': 'Record mondial'
    };
    return labels[rank as keyof typeof labels] || rank;
  };

  const getRankDescription = (rank: string) => {
    const descriptions = {
      'E': 'Débutant - Commencez votre parcours',
      'D': 'Occasionnel - Pratique régulière',
      'C': 'Confirmé - Bon niveau général',
      'B': 'Régional - Niveau compétitif local',
      'A': 'National - Niveau compétitif national',
      'S': 'Mondial élite - Niveau compétitif international',
      'Nation': 'Top national - Proche des records nationaux',
      'World': 'Record mondial - Légendaire'
    };
    return descriptions[rank as keyof typeof descriptions] || '';
  };

  const getSportLabel = (sport: string) => {
    const labels = {
      'crossfit': 'CrossFit',
      'power': 'Powerlifting',
      'classique': 'Musculation',
      'marathon': 'Marathon',
      'calisthenics': 'Calisthenics',
      'yoga': 'Yoga',
      'natation': 'Natation',
      'cyclisme': 'Cyclisme'
    };
    return labels[sport as keyof typeof labels] || 'Musculation';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <div className="mt-2">Calcul de votre rang...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userRank) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            Impossible de calculer votre rang. Vérifiez vos informations de profil.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Votre rang actuel</span>
          <div className="flex items-center gap-2">
            <Badge className={`${getRankColor(userRank.rank)} text-white`}>
              {userRank.rank} - {getRankLabel(userRank.rank)}
            </Badge>
            <Button
              onClick={calculateRank}
              size="sm"
              variant="outline"
              disabled={loading}
            >
              Actualiser
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">
            {userRank.globalScore}
          </div>
          <div className="text-sm text-muted-foreground">
            sur 1000 points
          </div>
          
          {/* Informations sur le profil */}
          <div className="text-sm text-muted-foreground">
            Classe: {getSportLabel(user.sportClass || 'classique')} | 
            Sexe: {user.sex === 'male' ? 'Homme' : 'Femme'} | 
            Poids: {user.weight || 75}kg
          </div>
          
          {/* Description du rang */}
          <div className="text-xs text-muted-foreground">
            {getRankDescription(userRank.rank)}
          </div>
          
          {/* Breakdown par catégorie */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Force:</span> {userRank.breakdown.force}/1000
            </div>
            <div>
              <span className="font-medium">Endurance:</span> {userRank.breakdown.endurance}/1000
            </div>
            <div>
              <span className="font-medium">Explosivité:</span> {userRank.breakdown.explosivite}/1000
            </div>
            <div>
              <span className="font-medium">Calisthenics:</span> {userRank.breakdown.calisthenics}/1000
            </div>
          </div>
          
          {/* Dernière mise à jour */}
          {lastUpdated && (
            <div className="text-xs text-muted-foreground">
              Dernière mise à jour: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 