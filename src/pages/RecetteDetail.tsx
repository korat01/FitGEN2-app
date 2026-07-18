import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, ChefHat, Heart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecetteById, calculerMacrosRecette } from '@/utils/nutritionData';
import { MacroStatsGrid } from '@/components/nutrition/MacroStatsGrid';
import { useNutritionFavorites } from '@/hooks/useNutritionFavorites';

const getClasseColor = (classe: string) => {
  switch (classe) {
    case 'Prise de masse': return 'bg-blue-500/15 border border-blue-500/25 text-blue-300';
    case 'Sèche': return 'bg-red-500/15 border border-red-500/25 text-red-300';
    case 'Récupération': return 'bg-green-500/15 border border-green-500/25 text-green-300';
    case 'Anti-inflammatoire': return 'bg-purple-500/15 border border-purple-500/25 text-purple-300';
    case 'Boost performance': return 'bg-orange-500/15 border border-orange-500/25 text-orange-300';
    case 'Équilibre': return 'bg-secondary/15 border border-secondary/25 text-secondary';
    default: return 'bg-white/5 text-foreground';
  }
};

const getDifficultyColor = (difficulte: string) => {
  switch (difficulte) {
    case 'facile': return 'bg-green-500/15 border border-green-500/25 text-green-300';
    case 'moyen': return 'bg-yellow-500/15 border border-yellow-500/25 text-yellow-300';
    case 'difficile': return 'bg-red-500/15 border border-red-500/25 text-red-300';
    default: return 'bg-white/5 text-foreground';
  }
};

const RecetteDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useNutritionFavorites();

  const recette = id ? getRecetteById(id) : undefined;

  if (!recette) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">Recette non trouvée</h1>
          <Button onClick={() => navigate('/nutrition')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la nutrition
          </Button>
        </div>
      </div>
    );
  }

  const macros = calculerMacrosRecette(recette);

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={() => navigate('/nutrition')} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="text-3xl md:text-4xl">{recette.emoji}</div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground truncate">{recette.nom}</h1>
            <p className="text-muted-foreground">{recette.description}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => toggleFavorite(recette.id)}
          className={`p-2 ${isFavorite(recette.id) ? 'text-red-500' : 'text-muted-foreground/70 hover:text-red-500'}`}
        >
          <Heart className={`h-6 w-6 ${isFavorite(recette.id) ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card border-primary/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Valeurs nutritionnelles (par portion)</CardTitle>
            </CardHeader>
            <CardContent>
              <MacroStatsGrid
                calories={macros.calories}
                proteines={macros.proteines}
                glucides={macros.glucides}
                lipides={macros.lipides}
              />
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-secondary" />
                Ingrédients ({recette.portions} portion{recette.portions > 1 ? 's' : ''})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recette.ingredients.map((ing, index) => (
                  <div key={index} className="flex justify-between items-center p-3 surface-panel-sm">
                    <span className="text-foreground">{ing.aliment.nom}</span>
                    <span className="font-medium text-muted-foreground">{ing.quantite}{ing.unite}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Préparation</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {recette.instructions.map((etape, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-foreground/90 pt-0.5">{etape}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          <Card className="glass-card border-primary/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Préparation
                </span>
                <span className="font-medium text-foreground">{recette.tempsPreparation} min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Portions
                </span>
                <span className="font-medium text-foreground">{recette.portions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Difficulté</span>
                <Badge className={`capitalize ${getDifficultyColor(recette.difficulte)}`}>{recette.difficulte}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Objectif</span>
                <Badge className={getClasseColor(recette.classe)}>{recette.classe}</Badge>
              </div>
            </CardContent>
          </Card>

          {recette.tags.length > 0 && (
            <Card className="glass-card border-primary/20 border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recette.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="glass-card border-primary/20 border-0 shadow-lg">
            <CardContent className="p-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => toggleFavorite(recette.id)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite(recette.id) ? 'fill-current text-red-500' : ''}`} />
                {isFavorite(recette.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecetteDetail;
