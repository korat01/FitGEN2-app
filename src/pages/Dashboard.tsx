
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { scoringEngine } from '../utils/scoring';
import { 
  Dumbbell, Target, TrendingUp, Zap, Clock, Weight, 
  Gauge, Activity, BarChart3, Star, Award, Flame, 
  Sparkles, Heart, CheckCircle, Play, Pause, RotateCcw, 
  Plus, Calendar, Timer, Users, Settings, Bell, Search 
} from 'lucide-react';

// Nouveaux composants pour le Dashboard
import { XPLevelBar } from '@/components/XPLevelBar';
import { DailyQuests } from '@/components/DailyQuests';
import { StreakDisplay } from '@/components/StreakDisplay';

// Utilitaires pour les calculs
import { 
  calculateXPData, 
  generateDailyQuests, 
  calculateStreakData 
} from '@/utils/statsCalculator';
import { XPData, DailyQuest, StreakData } from '@/types/stats';

export const Dashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [userRank, setUserRank] = useState<any>(null);
  const [performances, setPerformances] = useState<any[]>([]);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  // NOUVEAUX ÉTATS POUR LES COMPOSANTS DASHBOARD
  const [xpData, setXpData] = useState<XPData | null>(null);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);
  const [streakData, setStreakData] = useState<StreakData | null>(null);

  // FONCTION POUR RECALCULER LE RANG
  const recalculateRank = () => {
    if (user) {
      console.log('🔄 RECALCUL FORCÉ DU RANG');
      const savedPerformances = localStorage.getItem('userPerformances');
      if (savedPerformances) {
        const performancesList = JSON.parse(savedPerformances);
        console.log('📊 Performances pour recalcul:', performancesList);
        
        const realRank = scoringEngine.calculateUserRank(user, performancesList);
        console.log('🏆 Nouveau rang calculé:', realRank);
        
        setUserRank(realRank);
        updateUser({
          rank: realRank.rank,
          globalScore: realRank.globalScore
        });
        
        // Mettre à jour les performances
        setPerformances(performancesList);
        
        // Debug info
        setDebugInfo({
          userWeight: user.weight,
          userSex: user.sex,
          userSportClass: user.sportClass,
          performancesCount: performancesList.length,
          performances: performancesList,
          calculatedRank: realRank
        });
        
        alert(`Rang recalculé : ${realRank.rank} (${realRank.globalScore}/1000)`);
      }
    }
  };

  // Charger les performances et calculer le rang
  useEffect(() => {
    if (user) {
      console.log('🔄 Dashboard: DÉBUT DU CHARGEMENT');
      console.log('👤 Utilisateur:', user);
      
      const savedPerformances = localStorage.getItem('userPerformances');
      console.log('💾 Performances brutes du localStorage:', savedPerformances);
      
      if (savedPerformances) {
        try {
          const performancesList = JSON.parse(savedPerformances);
          console.log('📊 Performances parsées:', performancesList);
          setPerformances(performancesList);
          
          // Calculer le rang avec les vraies performances
          console.log('🧮 Calcul du rang...');
          const realRank = scoringEngine.calculateUserRank(user, performancesList);
          console.log('🏆 Rang calculé:', realRank);
          setUserRank(realRank);
          
          // Debug info
          setDebugInfo({
            userWeight: user.weight,
            userSex: user.sex,
            userSportClass: user.sportClass,
            performancesCount: performancesList.length,
            performances: performancesList,
            calculatedRank: realRank
          });
          
          // Mettre à jour l'utilisateur avec le vrai rang
          if (realRank.rank !== user.rank || realRank.globalScore !== user.globalScore) {
            updateUser({
              rank: realRank.rank,
              globalScore: realRank.globalScore
            });
            console.log('✅ Utilisateur mis à jour avec le nouveau rang');
          }

          // CALCULER LES DONNÉES POUR LE DASHBOARD
          try {
            // Convertir les performances au bon format
            const formattedPerformances = performancesList.map((p: any) => ({
              id: p.id || Math.random().toString(),
              userId: user.id,
              discipline: { id: p.discipline, name: p.discipline },
              value: parseFloat(p.value) || 0,
              units: 'kg',
              date: new Date(p.date),
              context: 'raw',
              verified: true
            }));

            // Calculer les données pour le dashboard
            const calculatedStreakData = calculateStreakData(user, formattedPerformances);
            const calculatedXpData = calculateXPData(user, formattedPerformances, calculatedStreakData);
            const generatedQuests = generateDailyQuests(user);

            // Mettre à jour les états
            setXpData(calculatedXpData);
            setDailyQuests(generatedQuests);
            setStreakData(calculatedStreakData);

            console.log('✅ Données Dashboard calculées:', {
              xpData: calculatedXpData,
              streakData: calculatedStreakData
            });
          } catch (error) {
            console.error('❌ Erreur lors du calcul des données Dashboard:', error);
          }
        } catch (error) {
          console.error('❌ Erreur lors du parsing des performances:', error);
        }
      } else {
        console.log('⚠️ Aucune performance trouvée dans localStorage');
        const defaultRank = {
          rank: 'D',
          globalScore: 0,
          breakdown: { force: 0, endurance: 0, explosivite: 0, calisthenics: 0 },
          reason: 'Aucune performance enregistrée'
        };
        setUserRank(defaultRank);
        setDebugInfo({
          userWeight: user.weight,
          userSex: user.sex,
          userSportClass: user.sportClass,
          performancesCount: 0,
          performances: [],
          calculatedRank: defaultRank
        });
      }
    }
  }, [user, updateUser]);

  // Fonction pour obtenir la couleur du rang
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

  // Fonction pour obtenir l'icône du rang
  const getRangIcon = (rang: string) => {
    switch (rang) {
      case 'World': return '🏆';
      case 'Nation': return '🏆';
      case 'S': return '🥇';
      case 'A': return '🥈';
      case 'B': return '🥉';
      case 'C': return '⭐';
      case 'D': return '🔰';
      default: return '⭐';
    }
  };

  // Fonction pour calculer la progression vers le rang supérieur
  const getRankProgression = (currentRank: string, currentScore: number) => {
    const rankThresholds = {
      'D': { min: 0, max: 200 },
      'C': { min: 200, max: 400 },
      'B': { min: 400, max: 600 },
      'A': { min: 600, max: 800 },
      'S': { min: 800, max: 900 },
      'Nation': { min: 900, max: 950 },
      'World': { min: 950, max: 1000 }
    };

    const threshold = rankThresholds[currentRank as keyof typeof rankThresholds];
    if (!threshold) return { percentage: 100, nextRank: 'World' };

    // Calculer le pourcentage dans le rang actuel
    const range = threshold.max - threshold.min;
    const progress = currentScore - threshold.min;
    const percentage = Math.min(Math.max((progress / range) * 100, 0), 100);

    // Déterminer le rang suivant
    const ranks = ['D', 'C', 'B', 'A', 'S', 'Nation', 'World'];
    const currentIndex = ranks.indexOf(currentRank);
    const nextRank = currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : 'World';

    return { percentage, nextRank };
  };

  // Fonctions pour gérer les interactions Dashboard
  const handleQuestComplete = (questId: string) => {
    setDailyQuests(prev => prev.map(quest => 
      quest.id === questId 
        ? { ...quest, completed: true, progress: quest.maxProgress }
        : quest
    ));
    
    // Ajouter XP à l'utilisateur
    const quest = dailyQuests.find(q => q.id === questId);
    if (quest && xpData) {
      const newTotalXP = xpData.totalXP + quest.xpReward;
      const newLevel = Math.floor(newTotalXP / 1000);
      const newCurrentXP = newTotalXP % 1000;
      
      setXpData({
        ...xpData,
        totalXP: newTotalXP,
        level: newLevel,
        currentXP: newCurrentXP,
        xpToNextLevel: 1000 - newCurrentXP
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-futuristic-primary text-text-primary font-exo xp-particles">
      <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
          
          {/* Header Principal - Design Futuriste */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-futuristic-secondary via-futuristic-tertiary to-futuristic-secondary p-4 md:p-8 text-text-primary shadow-2xl border border-neon-blue/30 glow-blue">
            {/* Effets visuels futuristes */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-blue/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full -translate-y-16 translate-x-16 md:-translate-y-32 md:translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-tr from-neon-purple/20 to-transparent rounded-full translate-y-12 -translate-x-12 md:translate-y-24 md:-translate-x-24"></div>
            
          <div className="relative z-10">
              <div className="flex flex-col gap-6">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-3 md:p-4 bg-neon-blue/20 rounded-xl md:rounded-2xl backdrop-blur-sm flex-shrink-0 border border-neon-blue/30">
                      <Dumbbell className="w-6 h-6 md:w-8 md:h-8 text-neon-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <h1 className="text-2xl md:text-4xl font-orbitron font-bold tracking-tight truncate text-neon-blue text-neon">
                        Salut, {user.name} !
                    </h1>
                      <p className="text-text-secondary font-rajdhani text-sm md:text-lg mt-1 md:mt-2">Votre tableau de bord futuriste 🚀</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                    {/* RANG CALCULÉ AVEC LES PERFORMANCES */}
                    <div className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r ${getRangColor(userRank?.rank || 'D')} text-white font-semibold shadow-lg text-sm md:text-base`}>
                      <span className="text-lg md:text-xl">{getRangIcon(userRank?.rank || 'D')}</span>
                      <span>Rang {userRank?.rank || 'D'}</span>
                </div>
                
                    <Button
                      onClick={recalculateRank}
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm text-xs md:text-sm"
                    >
                      🔄 Recalculer
                    </Button>
                    
                    <Button
                      onClick={() => window.location.href = '/stats'}
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm text-xs md:text-sm"
                    >
                      📊 Stats
                    </Button>
                </div>
              </div>

                <div className="space-y-3 md:space-y-4 mt-4">
                  {(() => {
                    const progression = getRankProgression(userRank?.rank || 'D', userRank?.globalScore || 0);
                    return (
                      <>
                        <div className="text-white/90 font-medium text-sm md:text-base">
                          Progression vers le rang {progression.nextRank}
                        </div>
                        <div className="w-full max-w-md">
                          <Progress 
                            value={progression.percentage} 
                            className="h-2 md:h-3 bg-white/20 rounded-full"
                          />
                        </div>
                        <div className="text-xs md:text-sm">
                          <span className="text-white font-bold text-lg md:text-xl">
                            {Math.round(progression.percentage)}%
                          </span> 
                          <span className="text-white/80"> vers le rang {progression.nextRank}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
            </div>
          </div>
        </div>

        {/* NOUVEAUX COMPOSANTS DASHBOARD */}
        {/* Barre XP & Niveau */}
        {xpData && <XPLevelBar xpData={xpData} />}

        {/* Quêtes journalières */}
        {dailyQuests.length > 0 && (
          <DailyQuests 
            quests={dailyQuests} 
            onQuestComplete={handleQuestComplete} 
          />
        )}

        {/* Streak & Régularité */}
        {streakData && <StreakDisplay streakData={streakData} />}

          {/* DEBUG INFO - Masqué par défaut */}
          {false && (
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">🐛 DEBUG INFO</h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <p><strong>Utilisateur:</strong></p>
                <p>Poids: {user?.weight || 75}kg</p>
                <p>Sexe: {user?.sex || 'male'}</p>
                <p>Sport: {user?.sportClass || 'classique'}</p>
                <p>Âge: {user?.age || 25} ans</p>
                <p><strong>Performances:</strong></p>
                <p>Nombre: {performances.length}</p>
                <p><strong>Détail:</strong> {JSON.stringify(performances, null, 2)}</p>
                <p><strong>Rang calculé:</strong></p>
                <p>{JSON.stringify(userRank, null, 2)}</p>
                </div>
                </div>
          )}

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <Card className="bg-futuristic-secondary/80 backdrop-blur-sm border border-neon-blue/30 shadow-xl glow-blue hover-glow transition-futuristic">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-text-secondary mb-1 truncate font-rajdhani">Poids</p>
                    <p className="text-lg md:text-2xl font-bold text-text-primary truncate font-orbitron">{user.weight} kg</p>
              </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-neon-blue/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-neon-blue/30">
                    <Weight className="w-5 h-5 md:w-6 md:h-6 text-neon-blue" />
                  </div>
            </div>
          </CardContent>
        </Card>

            <Card className="bg-futuristic-secondary/80 backdrop-blur-sm border border-neon-endurance/30 shadow-xl glow-endurance hover-glow transition-futuristic">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-text-secondary mb-1 truncate font-rajdhani">Âge</p>
                    <p className="text-lg md:text-2xl font-bold text-text-primary truncate font-orbitron">{user.age} ans</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-neon-endurance/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-neon-endurance/30">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-neon-endurance" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-futuristic-secondary/80 backdrop-blur-sm border border-neon-purple/30 shadow-xl glow-purple hover-glow transition-futuristic">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-text-secondary mb-1 truncate font-rajdhani">Sport</p>
                    <p className="text-lg md:text-2xl font-bold text-text-primary capitalize truncate font-orbitron">{user.sportClass}</p>
                      </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-neon-purple/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-neon-purple/30">
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-neon-purple" />
                  </div>
              </div>
            </CardContent>
          </Card>

            <Card className="bg-futuristic-secondary/80 backdrop-blur-sm border border-neon-force/30 shadow-xl glow-force hover-glow transition-futuristic">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-text-secondary mb-1 truncate font-rajdhani">Performances</p>
                    <p className="text-lg md:text-2xl font-bold text-text-primary truncate font-orbitron">{performances.length}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-neon-force/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-neon-force/30">
                    <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-neon-force" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Détail du rang calculé */}
          {userRank && (
            <Card className="bg-futuristic-secondary/80 backdrop-blur-sm border border-neon-purple/30 shadow-xl glow-purple">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2 text-neon-purple font-orbitron">
                  <Award className="w-6 h-6 text-neon-purple" />
                  Votre rang calculé
              </CardTitle>
            </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r ${getRangColor(userRank.rank)} text-white font-bold text-2xl shadow-lg`}>
                    <span className="text-2xl">{getRangIcon(userRank.rank)}</span>
                    <span>Rang {userRank.rank}</span>
                      </div>
                  
                  <div className="text-4xl font-bold text-indigo-600">
                    {userRank.globalScore}/1000
                      </div>
                  <div className="text-lg text-gray-600">Score global</div>
                    </div>

                {/* Barre de progression */}
                    <div className="space-y-2">
                  {(() => {
                    const progression = getRankProgression(userRank.rank, userRank.globalScore);
                    return (
                      <>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Progression vers le rang {progression.nextRank}</span>
                          <span>{Math.round(progression.percentage)}%</span>
                        </div>
                        <Progress value={progression.percentage} className="h-4" />
                      </>
                    );
                  })()}
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

                {/* Bouton pour aller aux stats */}
                <Button
                  onClick={() => window.location.href = '/stats'}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Voir le détail de mes performances
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Actions rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-futuristic-secondary/80 backdrop-blur-sm border border-neon-blue/30 shadow-xl hover-glow transition-futuristic cursor-pointer" onClick={() => window.location.href = '/stats'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-4 glow-blue">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 font-orbitron">Mes Statistiques</h3>
                <p className="text-text-secondary font-rajdhani">Voir mes performances et mon rang</p>
              </CardContent>
            </Card>

            <Card className="bg-futuristic-secondary/80 backdrop-blur-sm border border-neon-endurance/30 shadow-xl hover-glow transition-futuristic cursor-pointer" onClick={() => window.location.href = '/programme'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-neon-endurance to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 glow-endurance">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 font-orbitron">Mon Programme</h3>
                <p className="text-text-secondary font-rajdhani">Gérer mes entraînements</p>
              </CardContent>
            </Card>

            <Card className="bg-futuristic-secondary/80 backdrop-blur-sm border border-neon-purple/30 shadow-xl hover-glow transition-futuristic cursor-pointer" onClick={() => window.location.href = '/profile'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-neon-purple to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 glow-purple">
                  <Users className="w-8 h-8 text-white" />
              </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 font-orbitron">Mon Profil</h3>
                <p className="text-text-secondary font-rajdhani">Modifier mes informations</p>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
