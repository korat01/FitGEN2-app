import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Clock, 
  Flame, 
  Star, 
  ChefHat, 
  Users, 
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const RecetteDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Données de la recette (en réalité, vous récupéreriez cela depuis une API)
  const recette = {
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
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Difficile': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <Button
          variant="outline"
          onClick={() => navigate('/repas')}
          className="mb-6 bg-white border-gray-200 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux recettes
        </Button>

        {/* En-tête de la recette */}
        <Card className="bg-white border-0 shadow-lg mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-6xl mb-4">{recette.image}</div>
                <CardTitle className="text-3xl text-gray-800 mb-2">{recette.name}</CardTitle>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold">{recette.calories} calories</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">{recette.prepTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold">{recette.servings} portion{recette.servings > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{recette.rating}/5</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(recette.difficulty)}>
                    {recette.difficulty}
                  </Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                    {recette.category}
                  </Badge>
                  {recette.isPopular && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      <Star className="h-3 w-3 mr-1" />
                      Populaire
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ingrédients */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Target className="h-5 w-5 text-blue-600" />
                Ingrédients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recette.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-gray-800">{ingredient.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{ingredient.quantity}</div>
                      <div className="text-sm text-gray-600">{ingredient.calories} cal</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Valeurs nutritionnelles */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Flame className="h-5 w-5 text-orange-600" />
                Valeurs nutritionnelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{recette.protein}g</div>
                  <div className="text-sm text-blue-800 font-medium">Protéines</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{recette.carbs}g</div>
                  <div className="text-sm text-green-800 font-medium">Glucides</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{recette.fat}g</div>
                  <div className="text-sm text-purple-800 font-medium">Lipides</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{recette.fiber}g</div>
                  <div className="text-sm text-orange-800 font-medium">Fibres</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-white border-0 shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <ChefHat className="h-5 w-5 text-blue-600" />
              Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recette.recipe.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-800 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conseils */}
        <Card className="bg-white border-0 shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Conseils du chef
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <p className="text-gray-800 italic">{recette.tips}</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold h-12">
            <ChefHat className="h-5 w-5 mr-2" />
            Commencer la recette
          </Button>
          <Button variant="outline" className="px-8 border-gray-200 hover:bg-gray-50 h-12">
            <Star className="h-5 w-5 mr-2" />
            Ajouter aux favoris
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecetteDetail; 