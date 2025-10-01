import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScoringEngine, calculateUserRank } from '../utils/scoring';

interface UserRankDisplayProps {
  user: any;
  performances?: any[];
}

export const UserRankDisplay: React.FC<UserRankDisplayProps> = ({ user, performances = [] }) => {
  const [userRank, setUserRank] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && performances.length > 0) {
      try {
        const rank = calculateUserRank({
          ...user,
          performances,
          sportClass: user.sportClass // Passer la classe de sport
        });
        setUserRank(rank);
      } catch (error) {
        console.error('Erreur lors du calcul du rang:', error);
      }
    }
    setLoading(false);
  }, [user, performances]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Calcul du rang...</div>
        </CardContent>
      </Card>
    );
  }

  if (!userRank) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            Remplissez votre profil et ajoutez des performances pour voir votre rang
          </div>
        </CardContent>
      </Card>
    );
  }

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Votre rang actuel</span>
          <Badge className={`${getRankColor(userRank.rank)} text-white`}>
            {userRank.rank} - {getRankLabel(userRank.rank)}
          </Badge>
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
          
          {/* Afficher la classe de sport */}
          <div className="text-sm text-muted-foreground">
            Classe: {user?.sportClass ? getSportLabel(user.sportClass) : 'Non définie'}
          </div>
          
          {/* Informations sur le rang */}
          <div className="text-xs text-muted-foreground">
            {getRankDescription(userRank.rank)}
          </div>
          
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
        </div>
      </CardContent>
    </Card>
  );
};

// Fonction pour obtenir la description du rang
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

// Fonction pour obtenir le label du sport
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