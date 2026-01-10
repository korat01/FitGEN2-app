import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, Target, TrendingUp, Zap, Clock, Weight, 
  Gauge, Activity, BarChart3, Star, Award, Flame, 
  Sparkles, Heart, CheckCircle, Play, Pause, RotateCcw, 
  Plus, Calendar, Timer, Users, Settings, Bell, Search,
  Trophy, Crown, Shield, Medal, Gem, Diamond, Crown as CrownIcon,
  Hexagon, Circle, Square, Triangle, Pentagon, Droplets, Wand2
} from 'lucide-react';

// Import du système de design centralisé
import ProgramGenerator from '../components/ProgramGenerator';
import CustomHomeIcon from '../components/CustomHomeIcon';
import { UIConfig, loadUIConfig } from '../config/UIConfig';

// Composant principal de test UI/DA
const UITestPage: React.FC = () => {
  const [uiConfig, setUiConfig] = useState<UIConfig>(loadUIConfig());
  const [selectedDays] = useState(['Lundi', 'Mercredi', 'Vendredi']);

  // Charger la configuration UI au montage
  useEffect(() => {
    setUiConfig(loadUIConfig());
  }, []);

  // Écouter les changements de configuration UI
  useEffect(() => {
    const handleConfigUpdate = (event: CustomEvent) => {
      setUiConfig(event.detail);
    };

    // Écouter les événements de mise à jour de configuration
    window.addEventListener('ui-config-updated', handleConfigUpdate as EventListener);
    
    // Écouter les changements dans localStorage
    const handleStorageChange = () => {
      const newConfig = loadUIConfig();
      setUiConfig(newConfig);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Vérifier périodiquement les changements (pour les changements dans le même onglet)
    const interval = setInterval(() => {
      const currentConfig = loadUIConfig();
      if (JSON.stringify(currentConfig) !== JSON.stringify(uiConfig)) {
        setUiConfig(currentConfig);
      }
    }, 500); // Vérifier toutes les 500ms

    return () => {
      window.removeEventListener('ui-config-updated', handleConfigUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [uiConfig]);

  const handleProgramsGenerated = (programs: any[]) => {
    console.log('Programmes générés:', programs);
  };

  // Données de test pour les statistiques
  const testStats = {
    force: {
      total: 450,
      wilks: 285,
      weeklyProgress: 75,
      communityRank: "Top 15%",
      evolution: [280, 290, 285, 300, 310, 320, 330],
      performancePoints: 285,
      performanceLevel: "Avancé"
    },
    speed: {
      time100m: 12.5,
      maxSpeed: 28.8,
      weeklyProgress: 60,
      communityRank: "Top 25%",
      evolution: [13.2, 13.0, 12.8, 12.7, 12.6, 12.5, 12.5],
      performancePoints: 320,
      performanceLevel: "Intermédiaire"
    },
    endurance: {
      maxDistance: 8.5,
      avgPace: 4.2,
      weeklyProgress: 85,
      communityRank: "Top 10%",
      evolution: [7.0, 7.2, 7.5, 7.8, 8.0, 8.2, 8.5],
      performancePoints: 450,
      performanceLevel: "Expert"
    },
    flexibility: {
      sitReach: 15,
      shoulderFlexibility: 180,
      weeklyProgress: 40,
      communityRank: "Top 30%",
      evolution: [10, 11, 12, 13, 14, 14.5, 15],
      performancePoints: 200,
      performanceLevel: "Débutant"
    }
  };

  const testQuests = [
    { id: 1, title: "Faire 30 pompes", progress: 20, max: 30, reward: "50 XP", icon: Target },
    { id: 2, title: "Courir 5km", progress: 3.2, max: 5, reward: "100 XP", icon: Activity },
    { id: 3, title: "Méditer 10min", progress: 10, max: 10, reward: "25 XP", icon: Heart },
    { id: 4, title: "Boire 2L d'eau", progress: 1.5, max: 2, reward: "30 XP", icon: Droplets }
  ];

  const testAchievements = [
    { id: 1, title: "Premier pas", description: "Compléter votre premier entraînement", icon: Star, unlocked: true },
    { id: 2, title: "Marathonien", description: "Courir 42km en une fois", icon: Trophy, unlocked: false },
    { id: 3, title: "Force brute", description: "Soulever 200kg au développé couché", icon: Dumbbell, unlocked: false },
    { id: 4, title: "Zen master", description: "Méditer 100 jours consécutifs", icon: Heart, unlocked: true }
  ];

  return (
    <div 
      className="min-h-screen"
      style={{
        background: uiConfig.uiPage.background.gradient,
        padding: uiConfig.uiPage.layout.padding
      }}
    >
      <div className="container mx-auto">
        <div style={{ display: 'flex', flexDirection: 'column', gap: uiConfig.uiPage.layout.gap }}>
          
          {/* Header Principal */}
          <div 
            className="relative overflow-hidden p-4 md:p-8 text-white shadow-2xl"
            style={{
              background: uiConfig.uiPage.buttons.primary.background,
              borderRadius: uiConfig.uiPage.cards.borderRadius,
              border: uiConfig.uiPage.cards.border,
              boxShadow: uiConfig.uiPage.cards.shadow
            }}
          >
            {/* Effets visuels */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 md:-translate-y-32 md:translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12 md:translate-y-24 md:-translate-x-24"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col gap-6">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div 
                      className="p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-sm flex-shrink-0"
                      style={{
                        backgroundColor: uiConfig.uiPage.text.accent + '20',
                        borderRadius: uiConfig.uiPage.cards.borderRadius
                      }}
                    >
                      <Dumbbell 
                        className="w-6 h-6 md:w-8 md:h-8" 
                        style={{ color: uiConfig.uiPage.text.accent }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 
                        className="text-2xl md:text-4xl font-bold tracking-tight truncate"
                        style={{
                          color: uiConfig.uiPage.text.primary,
                          fontSize: uiConfig.typography.fontSize['3xl'],
                          fontWeight: uiConfig.typography.fontWeight.bold
                        }}
                      >
                        Test UI/DA VitalForce
                      </h1>
                      <p 
                        className="text-sm md:text-lg mt-1 md:mt-2"
                        style={{ color: uiConfig.uiPage.text.secondary }}
                      >
                        Démonstration complète du système de design
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                    {/* Bouton de personnalisation principal */}
                    <Button
                      onClick={() => window.location.href = '/ui-customizer'}
                      className="px-4 py-2 font-medium"
                      style={{
                        background: uiConfig.uiPage.buttons.secondary.background,
                        color: uiConfig.uiPage.buttons.secondary.text,
                        border: `2px solid ${uiConfig.uiPage.text.accent}`,
                        borderRadius: uiConfig.uiPage.cards.borderRadius,
                        boxShadow: `0 0 20px ${uiConfig.uiPage.text.accent}40`
                      }}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      🎨 Personnaliser l'UI/DA
                    </Button>

                    {/* Badges */}
                    <Badge 
                      className="px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: uiConfig.uiPage.text.accent + '20',
                        color: uiConfig.uiPage.text.accent,
                        border: `1px solid ${uiConfig.uiPage.text.accent}40`
                      }}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Système de design
                    </Badge>
                    <Badge 
                      className="px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: uiConfig.uiPage.text.accent + '20',
                        color: uiConfig.uiPage.text.accent,
                        border: `1px solid ${uiConfig.uiPage.text.accent}40`
                      }}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Personnalisable
                    </Badge>
                    <Badge 
                      className="px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: uiConfig.uiPage.text.accent + '20',
                        color: uiConfig.uiPage.text.accent,
                        border: `1px solid ${uiConfig.uiPage.text.accent}40`
                      }}
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      Configuration dynamique
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cartes principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Carte Statistiques */}
            <Card 
              className="relative overflow-hidden"
              style={{
                backgroundColor: uiConfig.uiPage.cards.background,
                border: uiConfig.uiPage.cards.border,
                borderRadius: uiConfig.uiPage.cards.borderRadius,
                boxShadow: uiConfig.uiPage.cards.shadow
              }}
            >
              <CardHeader>
                <CardTitle 
                  className="flex items-center gap-2"
                  style={{ color: uiConfig.uiPage.text.primary }}
                >
                  <BarChart3 className="w-5 h-5" style={{ color: uiConfig.uiPage.text.accent }} />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: uiConfig.uiPage.text.accent }}
                    >
                      {testStats.force.total}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: uiConfig.uiPage.text.secondary }}
                    >
                      Force totale
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: uiConfig.uiPage.text.accent }}
                    >
                      {testStats.speed.maxSpeed}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: uiConfig.uiPage.text.secondary }}
                    >
                      Vitesse max
                    </div>
                  </div>
                </div>
                <Progress 
                  value={testStats.force.weeklyProgress} 
                  className="h-2"
                  style={{
                    backgroundColor: uiConfig.uiPage.text.accent + '20'
                  }}
                />
                <div 
                  className="text-sm text-center"
                  style={{ color: uiConfig.uiPage.text.secondary }}
                >
                  Progression hebdomadaire: {testStats.force.weeklyProgress}%
                </div>
              </CardContent>
            </Card>

            {/* Carte Icônes */}
            <Card 
              className="relative overflow-hidden"
              style={{
                backgroundColor: uiConfig.uiPage.cards.background,
                border: uiConfig.uiPage.cards.border,
                borderRadius: uiConfig.uiPage.cards.borderRadius,
                boxShadow: uiConfig.uiPage.cards.shadow
              }}
            >
              <CardHeader>
                <CardTitle 
                  className="flex items-center gap-2"
                  style={{ color: uiConfig.uiPage.text.primary }}
                >
                  <CustomHomeIcon size={20} />
                  Icônes personnalisées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <CustomHomeIcon size={24} />
                    <span 
                      className="text-xs text-center"
                      style={{ color: uiConfig.uiPage.text.secondary }}
                    >
                      Home
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Dumbbell className="w-6 h-6" style={{ color: uiConfig.uiPage.text.accent }} />
                    <span 
                      className="text-xs text-center"
                      style={{ color: uiConfig.uiPage.text.secondary }}
                    >
                      Sport
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Target className="w-6 h-6" style={{ color: uiConfig.uiPage.text.accent }} />
                    <span 
                      className="text-xs text-center"
                      style={{ color: uiConfig.uiPage.text.secondary }}
                    >
                      Cible
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Trophy className="w-6 h-6" style={{ color: uiConfig.uiPage.text.accent }} />
                    <span 
                      className="text-xs text-center"
                      style={{ color: uiConfig.uiPage.text.secondary }}
                    >
                      Trophée
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carte Boutons */}
            <Card 
              className="relative overflow-hidden"
              style={{
                backgroundColor: uiConfig.uiPage.cards.background,
                border: uiConfig.uiPage.cards.border,
                borderRadius: uiConfig.uiPage.cards.borderRadius,
                boxShadow: uiConfig.uiPage.cards.shadow
              }}
            >
              <CardHeader>
                <CardTitle 
                  className="flex items-center gap-2"
                  style={{ color: uiConfig.uiPage.text.primary }}
                >
                  <Settings className="w-5 h-5" style={{ color: uiConfig.uiPage.text.accent }} />
                  Boutons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full"
                  style={{
                    background: uiConfig.uiPage.buttons.primary.background,
                    color: uiConfig.uiPage.buttons.primary.text,
                    borderRadius: uiConfig.uiPage.cards.borderRadius
                  }}
                >
                  Bouton principal
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  style={{
                    backgroundColor: uiConfig.uiPage.buttons.secondary.background,
                    color: uiConfig.uiPage.buttons.secondary.text,
                    borderColor: uiConfig.uiPage.text.accent,
                    borderRadius: uiConfig.uiPage.cards.borderRadius
                  }}
                >
                  Bouton secondaire
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Section ProgramGenerator */}
          <Card 
            className="relative overflow-hidden"
            style={{
              backgroundColor: uiConfig.uiPage.cards.background,
              border: uiConfig.uiPage.cards.border,
              borderRadius: uiConfig.uiPage.cards.borderRadius,
              boxShadow: uiConfig.uiPage.cards.shadow
            }}
          >
            <CardHeader>
              <CardTitle 
                className="flex items-center gap-2"
                style={{ color: uiConfig.uiPage.text.primary }}
              >
                <Dumbbell className="w-5 h-5" style={{ color: uiConfig.uiPage.text.accent }} />
                Générateur de programmes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProgramGenerator 
                onProgramsGenerated={handleProgramsGenerated}
                selectedDays={selectedDays}
              />
            </CardContent>
          </Card>

          {/* Section Quêtes */}
          <Card 
            className="relative overflow-hidden"
            style={{
              backgroundColor: uiConfig.uiPage.cards.background,
              border: uiConfig.uiPage.cards.border,
              borderRadius: uiConfig.uiPage.cards.borderRadius,
              boxShadow: uiConfig.uiPage.cards.shadow
            }}
          >
            <CardHeader>
              <CardTitle 
                className="flex items-center gap-2"
                style={{ color: uiConfig.uiPage.text.primary }}
              >
                <Target className="w-5 h-5" style={{ color: uiConfig.uiPage.text.accent }} />
                Quêtes du jour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testQuests.map((quest) => (
                  <div 
                    key={quest.id}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: uiConfig.uiPage.cards.background,
                      border: uiConfig.uiPage.cards.border,
                      borderRadius: uiConfig.uiPage.cards.borderRadius
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <quest.icon className="w-5 h-5" style={{ color: uiConfig.uiPage.text.accent }} />
                      <h3 
                        className="font-medium"
                        style={{ color: uiConfig.uiPage.text.primary }}
                      >
                        {quest.title}
                      </h3>
                    </div>
                    <Progress 
                      value={(quest.progress / quest.max) * 100} 
                      className="h-2 mb-2"
                      style={{
                        backgroundColor: uiConfig.uiPage.text.accent + '20'
                      }}
                    />
                    <div 
                      className="text-sm"
                      style={{ color: uiConfig.uiPage.text.secondary }}
                    >
                      {quest.progress}/{quest.max} - {quest.reward}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section Succès */}
          <Card 
            className="relative overflow-hidden"
            style={{
              backgroundColor: uiConfig.uiPage.cards.background,
              border: uiConfig.uiPage.cards.border,
              borderRadius: uiConfig.uiPage.cards.borderRadius,
              boxShadow: uiConfig.uiPage.cards.shadow
            }}
          >
            <CardHeader>
              <CardTitle 
                className="flex items-center gap-2"
                style={{ color: uiConfig.uiPage.text.primary }}
              >
                <Trophy className="w-5 h-5" style={{ color: uiConfig.uiPage.text.accent }} />
                Succès
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {testAchievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border text-center ${
                      achievement.unlocked ? 'opacity-100' : 'opacity-50'
                    }`}
                    style={{
                      backgroundColor: uiConfig.uiPage.cards.background,
                      border: uiConfig.uiPage.cards.border,
                      borderRadius: uiConfig.uiPage.cards.borderRadius
                    }}
                  >
                    <achievement.icon 
                      className="w-8 h-8 mx-auto mb-2" 
                      style={{ 
                        color: achievement.unlocked ? uiConfig.uiPage.text.accent : uiConfig.uiPage.text.secondary 
                      }} 
                    />
                    <h3 
                      className="font-medium text-sm mb-1"
                      style={{ color: uiConfig.uiPage.text.primary }}
                    >
                      {achievement.title}
                    </h3>
                    <p 
                      className="text-xs"
                      style={{ color: uiConfig.uiPage.text.secondary }}
                    >
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default UITestPage;