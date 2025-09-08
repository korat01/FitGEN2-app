import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import StatCard from '@/components/StatCard';
import ActionButton from '@/components/ActionButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Utensils, 
  Search, 
  Clock, 
  Flame, 
  Star, 
  ChefHat,
  Target,
  Plus,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Repas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Base de données des repas avec recettes
  const repasData = [
    {
      id: 1,
      name: "Bowl protéiné aux fruits",
      category: "Petit-déjeuner",
      calories: 650,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.7,
      image: "🥣",
      protein: 35,
      carbs: 65,
      fat: 18,
      fiber: 12,
      servings: 1,
      ingredients: [
        { name: "Flocons d'avoine", quantity: "80g", calories: 300 },
        { name: "Protéine en poudre", quantity: "40g", calories: 160 },
        { name: "Banane", quantity: "1", calories: 90 },
        { name: "Beurre d'amande", quantity: "30g", calories: 180 },
        { name: "Myrtilles", quantity: "100g", calories: 57 },
        { name: "Lait entier", quantity: "200ml", calories: 120 }
      ],
      recipe: [
        "Mélangez les flocons d'avoine avec le lait",
        "Ajoutez la protéine en poudre et mélangez",
        "Coupez la banane en rondelles",
        "Ajoutez le beurre d'amande et les myrtilles",
        "Mélangez le tout et dégustez"
      ],
      tips: "Pour une version plus crémeuse, laissez reposer 10 minutes avant de déguster",
      isPopular: true
    },
    {
      id: 2,
      name: "Omelette aux 3 œufs et fromage",
      category: "Petit-déjeuner",
      calories: 520,
      prepTime: 12,
      difficulty: "Facile",
      rating: 4.5,
      image: "🍳",
      protein: 42,
      carbs: 8,
      fat: 35,
      fiber: 2,
      servings: 1,
      ingredients: [
        { name: "Œufs", quantity: "3", calories: 210 },
        { name: "Fromage cheddar", quantity: "60g", calories: 240 },
        { name: "Beurre", quantity: "15g", calories: 110 },
        { name: "Lait", quantity: "50ml", calories: 25 },
        { name: "Sel et poivre", quantity: "1 pincée", calories: 0 }
      ],
      recipe: [
        "Battez les œufs avec le lait, sel et poivre",
        "Faites chauffer le beurre dans une poêle",
        "Versez les œufs battus",
        "Ajoutez le fromage râpé",
        "Cuisez à feu doux jusqu'à ce que les œufs soient pris"
      ],
      tips: "Ne mélangez pas trop les œufs pour garder une texture moelleuse",
      isPopular: true
    },
    {
      id: 3,
      name: "Poulet rôti aux patates douces",
      category: "Déjeuner",
      calories: 720,
      prepTime: 45,
      difficulty: "Moyen",
      rating: 4.6,
      image: "🍗",
      protein: 55,
      carbs: 75,
      fat: 18,
      fiber: 10,
      servings: 2,
      ingredients: [
        { name: "Filet de poulet", quantity: "200g", calories: 330 },
        { name: "Patates douces", quantity: "300g", calories: 250 },
        { name: "Brocolis", quantity: "200g", calories: 70 },
        { name: "Huile d'olive", quantity: "2 c.à.s", calories: 240 },
        { name: "Ail", quantity: "2 gousses", calories: 8 },
        { name: "Herbes de Provence", quantity: "1 c.à.s", calories: 5 }
      ],
      recipe: [
        "Préchauffez le four à 200°C",
        "Coupez les patates douces en cubes",
        "Assaisonnez le poulet avec l'ail et les herbes",
        "Mélangez les légumes avec l'huile",
        "Enfournez 35-40 minutes",
        "Servez chaud"
      ],
      tips: "Marinez le poulet 30 minutes avant la cuisson pour plus de saveur",
      isPopular: true
    },
    {
      id: 4,
      name: "Saumon aux légumes vapeur",
      category: "Dîner",
      calories: 380,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.5,
      image: "🐟",
      protein: 35,
      carbs: 25,
      fat: 18,
      fiber: 8,
      servings: 1,
      ingredients: [
        { name: "Filet de saumon", quantity: "150g", calories: 250 },
        { name: "Asperges", quantity: "200g", calories: 40 },
        { name: "Courgettes", quantity: "150g", calories: 25 },
        { name: "Brocolis", quantity: "150g", calories: 50 },
        { name: "Citron", quantity: "1/2", calories: 8 },
        { name: "Herbes fraîches", quantity: "1 c.à.s", calories: 2 }
      ],
      recipe: [
        "Préparez les légumes en morceaux",
        "Faites cuire à la vapeur 8-10 min",
        "Assaisonnez le saumon",
        "Faites cuire le saumon 6-8 min",
        "Servez avec les légumes",
        "Arrosez de citron et herbes"
      ],
      tips: "Le saumon est cuit quand il se détache facilement à la fourchette",
      isPopular: false
    },
    {
      id: 5,
      name: "Smoothie récupération",
      category: "Collation",
      calories: 250,
      prepTime: 5,
      difficulty: "Facile",
      rating: 4.6,
      image: "🥤",
      protein: 20,
      carbs: 35,
      fat: 8,
      fiber: 6,
      servings: 1,
      ingredients: [
        { name: "Banane", quantity: "1", calories: 90 },
        { name: "Protéine en poudre", quantity: "25g", calories: 100 },
        { name: "Lait d'amande", quantity: "200ml", calories: 30 },
        { name: "Épinards", quantity: "50g", calories: 12 },
        { name: "Graines de lin", quantity: "1 c.à.s", calories: 55 },
        { name: "Miel", quantity: "1 c.à.s", calories: 64 }
      ],
      recipe: [
        "Épluchez et coupez la banane",
        "Mettez tous les ingrédients dans un blender",
        "Mixez 1-2 minutes",
        "Versez dans un verre",
        "Dégustez immédiatement"
      ],
      tips: "Consommez dans les 30 minutes après l'entraînement pour une meilleure récupération",
      isPopular: true
    },
    {
      id: 6,
      name: "Bowl d'énergie pré-entraînement",
      category: "Pre-workout",
      calories: 320,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.4,
      image: "⚡",
      protein: 15,
      carbs: 55,
      fat: 8,
      fiber: 8,
      servings: 1,
      ingredients: [
        { name: "Flocons d'avoine", quantity: "50g", calories: 190 },
        { name: "Banane", quantity: "1/2", calories: 45 },
        { name: "Dattes", quantity: "3", calories: 60 },
        { name: "Cacao en poudre", quantity: "1 c.à.s", calories: 15 },
        { name: "Lait d'amande", quantity: "150ml", calories: 22 },
        { name: "Café", quantity: "50ml", calories: 2 }
      ],
      recipe: [
        "Mélangez les flocons d'avoine avec le lait",
        "Ajoutez la banane coupée",
        "Mélangez les dattes hachées",
        "Ajoutez le cacao et le café",
        "Mélangez le tout",
        "Consommez 30 min avant l'entraînement"
      ],
      tips: "Évitez de consommer trop près de l'entraînement pour éviter les troubles digestifs",
      isPopular: false
    }
  ];

  const stats = {
    totalRepas: repasData.length,
    popularRepas: repasData.filter(repas => repas.isPopular).length,
    totalCalories: repasData.reduce((sum, repas) => sum + repas.calories, 0),
    averageRating: (repasData.reduce((sum, repas) => sum + repas.rating, 0) / repasData.length).toFixed(1)
  };

  const filters = [
    { value: 'all', label: 'Tous', icon: Utensils },
    { value: 'popular', label: 'Populaires', icon: Star },
    { value: 'petit-déjeuner', label: 'Petit-déjeuner', icon: Utensils },
    { value: 'déjeuner', label: 'Déjeuner', icon: Utensils },
    { value: 'dîner', label: 'Dîner', icon: Utensils },
    { value: 'collation', label: 'Collation', icon: Utensils },
    { value: 'pre-workout', label: 'Pre-workout', icon: Zap }
  ];

  const filteredRepas = repasData.filter(repas => {
    const matchesSearch = repas.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repas.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'popular' && repas.isPopular) ||
      repas.category.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Difficile': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <PageLayout
      title="Repas & Recettes"
      subtitle="Découvrez des recettes saines et équilibrées"
      icon={<Utensils className="h-6 w-6 text-blue-600" />}
      actions={
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter recette
        </Button>
      }
    >
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Recettes"
          value={stats.totalRepas}
          icon={Utensils}
          color="blue"
        />
        <StatCard
          title="Populaires"
          value={stats.popularRepas}
          icon={Star}
          color="orange"
        />
        <StatCard
          title="Calories totales"
          value={stats.totalCalories}
          icon={Flame}
          color="green"
        />
        <StatCard
          title="Note moyenne"
          value={`${stats.averageRating}/5`}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Recherche et filtres */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-gray-800 text-2xl">
            <div className="bg-blue-100 rounded-full p-2">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            Recherche et filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Rechercher une recette..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 bg-white"
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
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
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

      {/* Liste des repas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepas.map((repas) => (
          <Card 
            key={repas.id} 
            className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate(`/repas/${repas.id}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="text-4xl mb-2">{repas.image}</div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">{repas.rating}</span>
                </div>
              </div>
              <CardTitle className="text-gray-800 text-xl">{repas.name}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  {repas.calories} cal
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  {repas.prepTime} min
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="h-4 w-4 text-purple-500" />
                  {repas.servings} portion{repas.servings > 1 ? 's' : ''}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(repas.difficulty)}>
                    {repas.difficulty}
                  </Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                    {repas.category}
                  </Badge>
                  {repas.isPopular && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      <Star className="h-3 w-3 mr-1" />
                      Populaire
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">{repas.protein}g</div>
                    <div className="text-sm text-gray-600">Protéines</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">{repas.carbs}g</div>
                    <div className="text-sm text-gray-600">Glucides</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">{repas.fat}g</div>
                    <div className="text-sm text-gray-600">Lipides</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">{repas.fiber}g</div>
                    <div className="text-sm text-gray-600">Fibres</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-800">Ingrédients principaux :</h4>
                  <div className="text-sm text-gray-600">
                    {repas.ingredients.slice(0, 3).map((ing, index) => (
                      <span key={index}>
                        {ing.name}
                        {index < 2 && ', '}
                      </span>
                    ))}
                    {repas.ingredients.length > 3 && (
                      <span className="text-gray-500">
                        +{repas.ingredients.length - 3} autres
                      </span>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/repas/${repas.id}`);
                  }}
                >
                  <ChefHat className="h-4 w-4 mr-2" />
                  Voir la recette
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default Repas; 