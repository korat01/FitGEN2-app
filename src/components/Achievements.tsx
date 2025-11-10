import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Crown, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Achievement } from '@/types/stats';
import { useSounds } from '@/utils/sounds';
import '../styles/achievements.css';

interface AchievementCardProps {
  achievement: Achievement;
  onClaim: (achievementId: string, element: HTMLElement) => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onClaim }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { playSuccess } = useSounds();
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-yellow-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-200';
      case 'rare': return 'shadow-blue-200';
      case 'epic': return 'shadow-purple-200';
      case 'legendary': return 'shadow-yellow-200';
      default: return 'shadow-gray-200';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-4 h-4" />;
      case 'rare': return <Star className="w-5 h-5" />;
      case 'epic': return <Crown className="w-5 h-5" />;
      case 'legendary': return <Trophy className="w-6 h-6" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <Card ref={cardRef} className={`achievement-card bg-white/80 backdrop-blur-sm border-0 shadow-xl transition-all duration-300 ${
      achievement.unlocked 
        ? `achievement-unlocked ${getRarityGlow(achievement.rarity)} animate-glow` 
        : 'hover:shadow-2xl'
    }`}>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          {/* Icône et titre avec effet de brillance */}
          <div className={`w-16 h-16 ${getRarityColor(achievement.rarity)} rounded-2xl flex items-center justify-center mx-auto relative overflow-hidden ${
            achievement.unlocked ? 'animate-pulse animate-float' : ''
          }`}>
            <span className="text-white text-2xl relative z-10">{achievement.icon}</span>
            {achievement.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{achievement.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
          </div>

          {/* Progression */}
          {!achievement.unlocked && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Progression</span>
                <span>{achievement.progress} / {achievement.maxProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-full transition-all duration-500`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Récompense XP */}
          <div className="flex items-center justify-center gap-2">
            {getRarityIcon(achievement.rarity)}
            <span className="text-sm font-semibold text-gray-700">+{achievement.xpReward} XP</span>
          </div>

          {/* Badge de rareté */}
          <Badge 
            className={`text-xs ${
              achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
              achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
              achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
              'bg-yellow-100 text-yellow-800'
            }`}
          >
            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
          </Badge>

          {/* Statut */}
          {achievement.unlocked ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Trophy className="w-3 h-3 mr-1" />
              Débloqué
            </Badge>
          ) : (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                playSuccess();
                if (cardRef.current) {
                  onClaim(achievement.id, cardRef.current);
                }
              }}
              className="w-full"
            >
              <Zap className="w-4 h-4 mr-2" />
              Récupérer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface AchievementsProps {
  achievements: Achievement[];
  onAchievementClaim: (achievementId: string, achievement: Achievement, element: HTMLElement) => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements, onAchievementClaim }) => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const categories = [
    { id: 'all', name: 'Tous', icon: '🏆' },
    { id: 'force', name: 'Force', icon: '💪' },
    { id: 'endurance', name: 'Endurance', icon: '🏃' },
    { id: 'discipline', name: 'Discipline', icon: '🔥' },
    { id: 'special', name: 'Spécial', icon: '⭐' }
  ];

  const filteredAchievements = currentCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === currentCategory);

  const totalPages = Math.ceil(filteredAchievements.length / itemsPerPage);
  const currentAchievements = filteredAchievements.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={currentCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCurrentCategory(category.id);
                setCurrentPage(0);
              }}
              className={currentCategory === category.id ? 
                "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" : 
                "border-gray-300 text-gray-700"
              }
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Grille des achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClaim={(id, element) => onAchievementClaim(id, achievement, element)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} sur {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Statistiques des achievements enrichies */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">📊 Statistiques des Succès</h4>
          
          {/* Statistiques principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-600">
                {achievements.filter(a => a.unlocked).length}
              </div>
              <div className="text-sm text-gray-600">Débloqués</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-600">
                {achievements.length}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">
                {achievements.filter(a => a.rarity === 'legendary').length}
              </div>
              <div className="text-sm text-gray-600">Légendaires</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600">
                {achievements.reduce((sum, a) => sum + (a.unlocked ? a.xpReward : 0), 0)}
              </div>
              <div className="text-sm text-gray-600">XP gagnés</div>
            </div>
          </div>

          {/* Répartition par rareté */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-500">🥉</div>
              <div className="text-sm text-gray-600">Commun</div>
              <div className="text-xs text-gray-500">
                {achievements.filter(a => a.rarity === 'common').length} badges
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-500">🥈</div>
              <div className="text-sm text-gray-600">Rare</div>
              <div className="text-xs text-gray-500">
                {achievements.filter(a => a.rarity === 'rare').length} badges
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-500">🥇</div>
              <div className="text-sm text-gray-600">Épique</div>
              <div className="text-xs text-gray-500">
                {achievements.filter(a => a.rarity === 'epic').length} badges
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-500">💎</div>
              <div className="text-sm text-gray-600">Légendaire</div>
              <div className="text-xs text-gray-500">
                {achievements.filter(a => a.rarity === 'legendary').length} badges
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
