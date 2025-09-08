import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import StatCard from '@/components/StatCard';
import ActionButton from '@/components/ActionButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Dumbbell, 
  Search, 
  Filter, 
  Plus, 
  Star, 
  Clock, 
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlocsEntrainement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Données d'exemple
  const exerciseBlocks = [
    {
      id: 1,
      name: "Push Day",
      exercises: 4,
      duration: "75 min",
      difficulty: "Intermédiaire",
      category: "Push",
      popularity: 95,
      isPopular: true
    },
    {
      id: 2,
      name: "Pull Day",
      exercises: 5,
      duration: "80 min",
      difficulty: "Intermédiaire",
      category: "Pull",
      popularity: 88,
      isPopular: true
    },
    {
      id: 3,
      name: "Leg Day",
      exercises: 6,
      duration: "90 min",
      difficulty: "Avancé",
      category: "Legs",
      popularity: 92,
      isPopular: true
    },
    {
      id: 4,
      name: "Full Body",
      exercises: 8,
      duration: "60 min",
      difficulty: "Débutant",
      category: "Full Body",
      popularity: 78,
      isPopular: false
    }
  ];

  const stats = {
    totalBlocks: exerciseBlocks.length,
    popularBlocks: exerciseBlocks.filter(block => block.isPopular).length,
    totalExercises: exerciseBlocks.reduce((sum, block) => sum + block.exercises, 0),
    averageDuration: Math.round(exerciseBlocks.reduce((sum, block) => sum + parseInt(block.duration), 0) / exerciseBlocks.length)
  };

  const filters = [
    { value: 'all', label: 'Tous', icon: Dumbbell },
    { value: 'popular', label: 'Populaires', icon: Star },
    { value: 'push', label: 'Push', icon: Target },
    { value: 'pull', label: 'Pull', icon: Target },
    { value: 'legs', label: 'Legs', icon: Target }
  ];

  const filteredBlocks = exerciseBlocks.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'popular' && block.isPopular) ||
      block.category.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <PageLayout
      title="Blocs d'entraînement"
      subtitle="Choisissez votre programme d'exercices"
      icon={<Dumbbell className="h-6 w-6 text-blue-600" />}
      actions={
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau bloc
        </Button>
      }
    >
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total blocs"
          value={stats.totalBlocks}
          icon={Dumbbell}
          color="blue"
        />
        <StatCard
          title="Populaires"
          value={stats.popularBlocks}
          icon={Star}
          color="orange"
        />
        <StatCard
          title="Exercices"
          value={stats.totalExercises}
          icon={Target}
          color="green"
        />
        <StatCard
          title="Durée moy."
          value={`${stats.averageDuration} min`}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Recherche et filtres */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900 text-2xl">
            <div className="bg-blue-100 rounded-full p-2">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            Recherche et filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Rechercher un bloc d'entraînement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-slate-300 focus:border-blue-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`flex items-center gap-2 ${
                    selectedFilter === filter.value 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <filter.icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des blocs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlocks.map((block) => (
          <Card 
            key={block.id} 
            className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate(`/programme/${block.id}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-slate-900 text-xl">{block.name}</CardTitle>
                {block.isPopular && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    <Star className="h-3 w-3 mr-1" />
                    Populaire
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Exercices</span>
                  <span className="font-semibold text-slate-900">{block.exercises}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Durée</span>
                  <span className="font-semibold text-slate-900">{block.duration}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Difficulté</span>
                  <Badge 
                    variant="outline" 
                    className={`${
                      block.difficulty === 'Débutant' ? 'border-green-300 text-green-700' :
                      block.difficulty === 'Intermédiaire' ? 'border-yellow-300 text-yellow-700' :
                      'border-red-300 text-red-700'
                    }`}
                  >
                    {block.difficulty}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Popularité</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                        style={{ width: `${block.popularity}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-600">{block.popularity}%</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/programme/${block.id}`);
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Commencer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default BlocsEntrainement;