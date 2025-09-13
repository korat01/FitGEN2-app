import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dumbbell, 
  Clock, 
  Target, 
  Search,
  Filter,
  Star,
  Zap,
  Heart,
  Timer,
  Weight,
  Ruler,
  Flame,
  Award,
  Trophy,
  Play,
  Eye,
  Bookmark,
  Share,
  Download,
  Grid,
  List,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

// Page Sport - Bibliothèque d'exercices
export default function Sport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const exercices = [
    {
      id: 1,
      name: "Développé couché",
      emoji: "💪",
      category: "Musculation",
      difficulty: "Intermédiaire",
      type: "Poids libre",
      description: "Pectoraux, Deltoïdes antérieurs, Triceps",
      duration: "45min",
      calories: 10,
      rating: 4.8,
      equipment: ["Banc plat", "Barre", "Disques"],
      muscles: ["Pectoraux", "Deltoïdes antérieurs", "Triceps"],
      instructions: "Allongez-vous sur le banc, saisissez la barre avec les mains écartées de la largeur des épaules, descendez la barre vers la poitrine puis poussez vers le haut."
    },
    {
      id: 2,
      name: "Tractions",
      emoji: "��",
      category: "Musculation",
      difficulty: "Débutant",
      type: "Corps libre",
      description: "Dorsaux, Biceps, Deltoïdes postérieurs",
      duration: "30min",
      calories: 8,
      rating: 4.6,
      equipment: ["Barre de traction"],
      muscles: ["Dorsaux", "Biceps", "Deltoïdes postérieurs"],
      instructions: "Suspendez-vous à la barre, tirez votre corps vers le haut jusqu'à ce que le menton dépasse la barre, puis redescendez lentement."
    },
    {
      id: 3,
      name: "Dips",
      emoji: "⭐",
      category: "Musculation",
      difficulty: "Intermédiaire",
      type: "Corps libre",
      description: "Triceps, Pectoraux inférieurs, Deltoïdes antérieurs",
      duration: "35min",
      calories: 9,
      rating: 4.7,
      equipment: ["Barres parallèles"],
      muscles: ["Triceps", "Pectoraux inférieurs", "Deltoïdes antérieurs"],
      instructions: "Placez vos mains sur les barres parallèles, descendez votre corps en fléchissant les bras, puis remontez en poussant."
    },
    {
      id: 4,
      name: "Squat",
      emoji: "🏋️",
      category: "Musculation",
      difficulty: "Débutant",
      type: "Poids libre",
      description: "Quadriceps, Fessiers, Ischio-jambiers",
      duration: "40min",
      calories: 12,
      rating: 4.5,
      equipment: ["Barre", "Disques"],
      muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
      instructions: "Placez la barre sur vos épaules, descendez en fléchissant les genoux comme pour vous asseoir, puis remontez."
    },
    {
      id: 5,
      name: "Soulevé de terre",
      emoji: "🔥",
      category: "Musculation",
      difficulty: "Intermédiaire",
      type: "Poids libre",
      description: "Ischio-jambiers, Fessiers, Lombaires",
      duration: "50min",
      calories: 15,
      rating: 4.9,
      equipment: ["Barre", "Disques"],
      muscles: ["Ischio-jambiers", "Fessiers", "Lombaires"],
      instructions: "Saisissez la barre au sol, gardez le dos droit, soulevez en contractant les fessiers et les ischio-jambiers."
    },
    {
      id: 6,
      name: "Pompes",
      emoji: "��",
      category: "Musculation",
      difficulty: "Débutant",
      type: "Corps libre",
      description: "Pectoraux, Triceps, Deltoïdes antérieurs",
      duration: "25min",
      calories: 6,
      rating: 4.4,
      equipment: ["Sol"],
      muscles: ["Pectoraux", "Triceps", "Deltoïdes antérieurs"],
      instructions: "En position de planche, descendez votre corps en fléchissant les bras, puis poussez pour remonter."
    },
    {
      id: 7,
      name: "Planche",
      emoji: "🛡️",
      category: "Musculation",
      difficulty: "Débutant",
      type: "Corps libre",
      description: "Abdominaux, Deltoïdes, Lombaires",
      duration: "20min",
      calories: 4,
      rating: 4.3,
      equipment: ["Sol"],
      muscles: ["Abdominaux", "Deltoïdes", "Lombaires"],
      instructions: "En position de planche, maintenez votre corps droit et rigide, contractez les abdominaux."
    },
    {
      id: 8,
      name: "Burpees",
      emoji: "⚡",
      category: "Cardio",
      difficulty: "Avancé",
      type: "Corps libre",
      description: "Cardio, Pectoraux, Quadriceps",
      duration: "15min",
      calories: 20,
      rating: 4.6,
      equipment: ["Sol"],
      muscles: ["Cardio", "Pectoraux", "Quadriceps"],
      instructions: "Commencez debout, descendez en position de pompe, faites une pompe, remontez et sautez."
    },
    {
      id: 9,
      name: "Mountain Climbers",
      emoji: "🏔️",
      category: "Cardio",
      difficulty: "Intermédiaire",
      type: "Corps libre",
      description: "Cardio, Abdominaux, Deltoïdes",
      duration: "20min",
      calories: 18,
      rating: 4.2,
      equipment: ["Sol"],
      muscles: ["Cardio", "Abdominaux", "Deltoïdes"],
      instructions: "En position de planche, alternez rapidement les genoux vers la poitrine."
    },
    {
      id: 10,
      name: "Jumping Jacks",
      emoji: "🤸",
      category: "Cardio",
      difficulty: "Débutant",
      type: "Corps libre",
      description: "Cardio, Deltoïdes, Quadriceps",
      duration: "10min",
      calories: 8,
      rating: 4.1,
      equipment: ["Sol"],
      muscles: ["Cardio", "Deltoïdes", "Quadriceps"],
      instructions: "Sautez en écartant les jambes et en levant les bras au-dessus de la tête."
    }
  ];

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'Musculation', label: 'Musculation' },
    { value: 'Cardio', label: 'Cardio' },
    { value: 'Flexibilité', label: 'Flexibilité' },
    { value: 'Yoga', label: 'Yoga' }
  ];

  const difficulties = [
    { value: 'all', label: 'Toutes les difficultés' },
    { value: 'Débutant', label: 'Débutant' },
    { value: 'Intermédiaire', label: 'Intermédiaire' },
    { value: 'Avancé', label: 'Avancé' }
  ];

  const types = [
    { value: 'all', label: 'Tous les exercices' },
    { value: 'Poids libre', label: 'Poids libre' },
    { value: 'Corps libre', label: 'Corps libre' },
    { value: 'Machine', label: 'Machine' },
    { value: 'Cardio', label: 'Cardio' }
  ];

  const filteredExercices = exercices.filter(exercice => {
    const matchesSearch = exercice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercice.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || exercice.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || exercice.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-blue-500';
      case 'Intermédiaire': return 'bg-green-500';
      case 'Avancé': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const totalExercices = exercices.length;
  const totalCalories = exercices.reduce((sum, ex) => sum + ex.calories, 0);
  const averageRating = (exercices.reduce((sum, ex) => sum + ex.rating, 0) / exercices.length).toFixed(1);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* En-tête */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Dumbbell className="h-12 w-12 text-purple-500" />
          <h1 className="text-4xl font-bold text-white">Entraînement</h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Découvrez notre collection d'exercices de musculation
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Heart className="h-8 w-8 text-purple-500" />
              <span className="text-3xl font-bold text-white">{totalExercices}</span>
            </div>
            <p className="text-gray-300">Exercices disponibles</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Zap className="h-8 w-8 text-purple-500" />
              <span className="text-3xl font-bold text-white">{totalCalories}</span>
            </div>
            <p className="text-gray-300">Calories totales</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Star className="h-8 w-8 text-purple-500" />
              <span className="text-3xl font-bold text-white">{averageRating}</span>
            </div>
            <p className="text-gray-300">Note moyenne</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nom de l'exercice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Catégorie</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Difficulté</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Type d'exercice</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contrôles de vue */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Vue :</span>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-sm text-gray-300">
          {filteredExercices.length} exercice{filteredExercices.length > 1 ? 's' : ''} trouvé{filteredExercices.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Liste des exercices */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercices.map((exercice) => (
            <Card key={exercice.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{exercice.emoji}</span>
                    <div>
                      <CardTitle className="text-white flex items-center gap-1">
                        {exercice.name}
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </CardTitle>
                    </div>
                  </div>
                  <Badge 
                    className={`${getDifficultyColor(exercice.difficulty)} text-white`}
                  >
                    {exercice.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-gray-300">
                  {exercice.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Clock className="h-4 w-4" />
                      {exercice.duration}
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <Zap className="h-4 w-4" />
                      {exercice.calories} cal
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <Star className="h-4 w-4" />
                      {exercice.rating}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {exercice.equipment.map((eq, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {eq}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => toggleFavorite(exercice.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {favorites.includes(exercice.id) ? 'Retiré des favoris' : 'Voir les détails'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExercices.map((exercice) => (
            <Card key={exercice.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{exercice.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-white flex items-center gap-1">
                        {exercice.name}
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </h3>
                      <p className="text-sm text-gray-300">{exercice.description}</p>
                    </div>
                    <Badge className={`${getDifficultyColor(exercice.difficulty)} text-white`}>
                      {exercice.difficulty}
                    </Badge>
                    <span className="text-sm text-gray-400">{exercice.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {exercice.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        {exercice.calories} cal
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {exercice.rating}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-600 text-gray-300"
                        onClick={() => toggleFavorite(exercice.id)}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 