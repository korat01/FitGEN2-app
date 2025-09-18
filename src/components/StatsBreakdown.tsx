// Composant pour afficher le breakdown des scores
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface StatsBreakdownProps {
  globalScore: number;
  rank: string;
  breakdown: {
    force: number;
    endurance: number;
    explosivite: number;
    calisthenics: number;
  };
  profile: {
    force: number;
    endurance: number;
    explosivite: number;
    calisthenics: number;
  };
}

export const StatsBreakdown: React.FC<StatsBreakdownProps> = ({
  globalScore,
  rank,
  breakdown,
  profile
}) => {
  const getRankColor = (rank: string) => {
    const colors = {
      'E': 'bg-gray-400',      // Gris pour débutant
      'D': 'bg-blue-400',      // Bleu pour occasionnel
      'C': 'bg-green-400',     // Vert pour confirmé
      'B': 'bg-yellow-400',    // Jaune pour régional
      'A': 'bg-orange-400',    // Orange pour national
      'S': 'bg-red-400',       // Rouge pour élite
      'Nation': 'bg-purple-400', // Violet pour top national
      'World': 'bg-gradient-to-r from-yellow-400 to-yellow-600' // Or pour record mondial
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

  // Calcul du pourcentage vers le rang suivant - ajusté
  const getProgressToNextRank = (score: number, rank: string) => {
    const thresholds = {
      'E': 100,
      'D': 250,
      'C': 400,
      'B': 550,
      'A': 700,
      'S': 800,
      'Nation': 900,
      'World': 1000
    };
    
    const currentThreshold = thresholds[rank as keyof typeof thresholds] || 0;
    const nextThreshold = thresholds[Object.keys(thresholds)[Object.keys(thresholds).indexOf(rank) + 1] as keyof typeof thresholds] || 1000;
    
    const progress = ((score - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const progressToNext = getProgressToNextRank(globalScore, rank);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Score Global</span>
            <Badge className={`${getRankColor(rank)} text-white`}>
              {rank} - {getRankLabel(rank)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">
              {globalScore}
            </div>
            <div className="text-sm text-muted-foreground">
              sur 1000 points
            </div>
            
            {/* Barre de progression vers le rang suivant */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Progression vers le rang suivant
              </div>
              <Progress value={progressToNext} className="h-3" />
              <div className="text-xs text-muted-foreground">
                {Math.round(progressToNext)}% complété
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Breakdown par Catégorie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(breakdown).map(([category, score]) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{category}</span>
                <span className="font-medium">{score}/1000</span>
              </div>
              <Progress 
                value={score / 10} 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                Poids: {Math.round(profile[category as keyof typeof profile] * 100)}%
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}; 

// Ajouter une fonction pour afficher les informations de profil
export const ProfileInfo: React.FC<{ user: any }> = ({ user }) => {
  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de profil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Poids:</span> {user.weight} kg
          </div>
          <div>
            <span className="font-medium">Âge:</span> {user.age} ans
          </div>
          <div>
            <span className="font-medium">Sexe:</span> {user.sex === 'male' ? 'Homme' : 'Femme'}
          </div>
          <div>
            <span className="font-medium">Profil:</span> {user.profileType}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};