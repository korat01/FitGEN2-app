import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Flame, 
  Target, 
  Zap,
  Plus
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const AlimentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Données de l'aliment (en réalité, vous récupéreriez cela depuis une API)
  const aliment = {
    id: 1,
    name: "Pomme",
    emoji: "��",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    category: "Fruits",
    goal: "Équilibre",
    popularity: 95,
    isPopular: true,
    description: "Fruit riche en fibres et vitamine C",
    benefits: [
      "Riche en vitamine C",
      "Source de fibres",
      "Antioxydants naturels",
      "Faible en calories"
    ]
  };

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'Prise de masse': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Perte de poids': return 'bg-red-100 text-red-800 border-red-200';
      case 'Récupération': return 'bg-green-100 text-green-800 border-green-200';
      case 'Performance': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Équilibre': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <Button
          variant="outline"
          onClick={() => navigate('/nutrition')}
          className="mb-6 bg-white border-gray-200 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la nutrition
        </Button>

        {/* En-tête de l'aliment */}
        <Card className="bg-white border-0 shadow-lg mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-6xl mb-4">{aliment.emoji}</div>
                <CardTitle className="text-3xl text-gray-800 mb-2">{aliment.name}</CardTitle>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold">{aliment.calories} calories</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className="border-blue-300 text-blue-700 bg-blue-50"
                  >
                    {aliment.category}
                  </Badge>
                  <Badge className={getGoalColor(aliment.goal)}>
                    {aliment.goal}
                  </Badge>
                  {aliment.isPopular && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      <Target className="h-3 w-3 mr-1" />
                      Populaire
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <div className="text-3xl font-bold text-blue-600">{aliment.protein}g</div>
                  <div className="text-sm text-blue-800 font-medium">Protéines</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{aliment.carbs}g</div>
                  <div className="text-sm text-green-800 font-medium">Glucides</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{aliment.fat}g</div>
                  <div className="text-sm text-purple-800 font-medium">Lipides</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{aliment.calories}</div>
                  <div className="text-sm text-orange-800 font-medium">Calories</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bénéfices */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Target className="h-5 w-5 text-green-600" />
                Bénéfices nutritionnels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aliment.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-800">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card className="bg-white border-0 shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="text-gray-800">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 text-lg leading-relaxed">{aliment.description}</p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold h-12">
            <Plus className="h-5 w-5 mr-2" />
            Ajouter à mon journal
          </Button>
          <Button variant="outline" className="px-8 border-gray-200 hover:bg-gray-50 h-12">
            <Target className="h-5 w-5 mr-2" />
            Ajouter aux favoris
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlimentDetail; 