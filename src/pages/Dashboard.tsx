
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

export const Dashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [userRank, setUserRank] = useState<any>(null);
  const [performances, setPerformances] = useState<any[]>([]);
  const [debugInfo, setDebugInfo] = useState<any>(null);

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
          
          // Mettre à jour l'utilisateur avec le vrai rang
          if (realRank.rank !== user.rank || realRank.globalScore !== user.globalScore) {
            updateUser({
              rank: realRank.rank,
              globalScore: realRank.globalScore
            });
            console.log('✅ Utilisateur mis à jour avec le nouveau rang');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
          
          {/* Header Principal - Design Moderne */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-8 text-white shadow-2xl">
            {/* Effets visuels */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
            
          <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <Dumbbell className="w-8 h-8" />
                  </div>
                  <div>
                      <h1 className="text-4xl font-bold tracking-tight">
                        Salut, {user.name} !
                    </h1>
                      <p className="text-white/90 text-lg mt-2">Votre tableau de bord personnel</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    {/* RANG CALCULÉ AVEC LES PERFORMANCES */}
                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${getRangColor(userRank?.rank || 'D')} text-white font-semibold shadow-lg`}>
                      <span className="text-xl">{getRangIcon(userRank?.rank || 'D')}</span>
                      <span>Rang {userRank?.rank || 'D'}</span>
                </div>
                
                    <Button
                      onClick={() => window.location.href = '/stats'}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    >
                      📊 Voir mes stats
                    </Button>
                </div>
              </div>

                <div className="lg:text-right space-y-4">
                  <div className="text-white/90 font-medium">Progression</div>
                <div className="w-80">
                  <Progress 
                      value={userRank?.globalScore || 0} 
                      className="h-3 bg-white/20 rounded-full"
                  />
                </div>
                <div className="text-sm">
                    <span className="text-white font-bold text-xl">{userRank?.globalScore || 0}</span> 
                    <span className="text-white/80"> / 1000 points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DEBUG INFO - À SUPPRIMER APRÈS CORRECTION */}
          {debugInfo && (
            <Card className="bg-red-50 border-2 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">🐛 DEBUG INFO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-red-800">Utilisateur:</h4>
                    <p>Poids: {debugInfo.userWeight}kg</p>
                    <p>Sexe: {debugInfo.userSex}</p>
                    <p>Sport: {debugInfo.userSportClass}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800">Performances:</h4>
                    <p>Nombre: {debugInfo.performancesCount}</p>
                    <p>Détail: {JSON.stringify(debugInfo.performances, null, 2)}</p>
        </div>
                </div>
                <div>
                  <h4 className="font-bold text-red-800">Rang calculé:</h4>
                  <p>{JSON.stringify(debugInfo.calculatedRank, null, 2)}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Poids</p>
                    <p className="text-2xl font-bold text-gray-800">{user.weight} kg</p>
              </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Weight className="w-6 h-6 text-blue-600" />
                  </div>
            </div>
          </CardContent>
        </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Âge</p>
                    <p className="text-2xl font-bold text-gray-800">{user.age} ans</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                      <div>
                    <p className="text-sm text-gray-600 mb-1">Sport</p>
                    <p className="text-2xl font-bold text-gray-800 capitalize">{user.sportClass}</p>
                      </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
              </div>
            </CardContent>
          </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Performances</p>
                    <p className="text-2xl font-bold text-gray-800">{performances.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Détail du rang calculé */}
          {userRank && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                  <Award className="w-6 h-6 text-yellow-500" />
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
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progression vers le rang supérieur</span>
                    <span>{userRank.globalScore}%</span>
                  </div>
                  <Progress value={userRank.globalScore} className="h-4" />
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
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/stats'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mes Statistiques</h3>
                <p className="text-gray-600">Voir mes performances et mon rang</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/programme'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mon Programme</h3>
                <p className="text-gray-600">Gérer mes entraînements</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/profile'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
              </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mon Profil</h3>
                <p className="text-gray-600">Modifier mes informations</p>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
