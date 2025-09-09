import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Target, TrendingUp, Star, Zap, Award, Activity, Heart, Clock, Flame } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SwipeableCard from '@/components/SwipeableCard';
import MobileCarousel from '@/components/MobileCarousel';

const Home: React.FC = () => {
  const stats = [
    { label: 'Séances cette semaine', value: '4', icon: Dumbbell, color: 'blue', change: '+2' },
    { label: 'Calories brûlées', value: '1,250', icon: Flame, color: 'orange', change: '+15%' },
    { label: 'Temps d\'entraînement', value: '3h 45m', icon: Clock, color: 'green', change: '+30min' },
    { label: 'Progression', value: '85%', icon: TrendingUp, color: 'purple', change: '+5%' }
  ];

  const recentWorkouts = [
    { name: 'Push Day', date: 'Aujourd\'hui', duration: '1h 15m', exercises: 8 },
    { name: 'Pull Day', date: 'Hier', duration: '1h 30m', exercises: 6 },
    { name: 'Leg Day', date: 'Il y a 2 jours', duration: '1h 45m', exercises: 10 }
  ];

  const achievements = [
    { title: 'Premier mois', description: '4 semaines consécutives', icon: Star, color: 'yellow' },
    { title: '100 séances', description: 'Objectif atteint !', icon: Award, color: 'gold' },
    { title: 'Consistance', description: '7 jours d\'affilée', icon: Zap, color: 'purple' }
  ];

  const handleSwipeLeft = () => {
    console.log('Swipe gauche détecté');
  };

  const handleSwipeRight = () => {
    console.log('Swipe droite détecté');
  };

  return (
    <PageLayout>
      <div className="space-y-6 p-4 md:p-6">
        {/* Header mobile-friendly */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Bonjour Alexandre ! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Prêt pour votre séance d'aujourd'hui ?
          </p>
        </div>

        {/* Stats avec carousel mobile */}
        <div className="md:hidden">
          <MobileCarousel
            items={stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                    <Badge className="bg-green-100 text-green-800">
                      {stat.change}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          />
        </div>

        {/* Stats desktop */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                  <Badge className="bg-green-100 text-green-800">
                    {stat.change}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Séances récentes avec swipe */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-black">Séances récentes</h2>
          <div className="space-y-3">
            {recentWorkouts.map((workout, index) => (
              <SwipeableCard
                key={index}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                className="bg-white shadow-lg border-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-black">{workout.name}</h3>
                    <p className="text-gray-600">{workout.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{workout.duration}</p>
                    <p className="text-sm text-gray-500">{workout.exercises} exercices</p>
                  </div>
                </div>
              </SwipeableCard>
            ))}
          </div>
        </div>

        {/* Réalisations avec carousel mobile */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-black">Réalisations</h2>
          <div className="md:hidden">
            <MobileCarousel
              items={achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-black mb-2">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            />
          </div>
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-black mb-2">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-black">Actions rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
              <div className="text-center">
                <Dumbbell className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Nouvelle séance</span>
              </div>
            </Button>
            <Button className="h-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700">
              <div className="text-center">
                <Target className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Objectifs</span>
              </div>
            </Button>
            <Button className="h-20 bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700">
              <div className="text-center">
                <Activity className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Progression</span>
              </div>
            </Button>
            <Button className="h-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700">
              <div className="text-center">
                <Heart className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Santé</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;