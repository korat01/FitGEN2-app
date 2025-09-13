import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dumbbell, 
  Clock, 
  Target,
  Plus, 
  Settings, 
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Users,
  Zap,
  Heart,
  Timer,
  Weight,
  Ruler,
  Flame,
  Award,
  Star,
  Trophy,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Filter,
  Search,
  Grid,
  List,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Calendar,
  Activity,
  TrendingUp
} from 'lucide-react';

// Section Blocs d'Entraînement
const BlocsEntrainementSection = () => {
  const [selectedBloc, setSelectedBloc] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const blocsEntrainement = [
    {
      id: 1,
      name: "Bloc Musculation - Haut du Corps",
      description: "Exercices pour développer le haut du corps",
      duration: "45 min",
      difficulty: "Intermédiaire",
      exercises: 6,
      category: "Musculation",
      created: "2024-01-01",
      lastUsed: "2024-01-15",
      status: "actif",
      exercisesList: [
        "Développé couché",
        "Tractions",
        "Dips",
        "Élévations latérales",
        "Curl biceps",
        "Extension triceps"
      ]
    },
    {
      id: 2,
      name: "Bloc Cardio - HIIT",
      description: "Entraînement par intervalles à haute intensité",
      duration: "30 min",
      difficulty: "Avancé",
      exercises: 8,
      category: "Cardio",
      created: "2024-01-05",
      lastUsed: "2024-01-14",
      status: "actif",
      exercisesList: [
        "Burpees",
        "Mountain climbers",
        "Jumping jacks",
        "High knees",
        "Squat jumps",
        "Push-ups",
        "Plank",
        "Lunges"
      ]
    },
    {
      id: 3,
      name: "Bloc Musculation - Bas du Corps",
      description: "Exercices pour renforcer le bas du corps",
      duration: "50 min",
      difficulty: "Intermédiaire",
      exercises: 7,
      category: "Musculation",
      created: "2024-01-10",
      lastUsed: "2024-01-13",
      status: "pausé",
      exercisesList: [
        "Squat",
        "Fentes",
        "Soulevé de terre",
        "Leg press",
        "Extensions de jambes",
        "Curls de jambes",
        "Calf raises"
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-500';
      case 'Intermédiaire': return 'bg-yellow-500';
      case 'Avancé': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-green-500';
      case 'pausé': return 'bg-yellow-500';
      case 'terminé': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête des blocs d'entraînement */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Blocs d'Entraînement</h2>
          <p className="text-muted-foreground">
            Gérez vos blocs d'exercices personnalisés
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Rechercher
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Bloc
          </Button>
        </div>
      </div>

      {/* Contrôles de vue */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Vue :</span>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
        </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          {blocsEntrainement.length} bloc{blocsEntrainement.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Liste des blocs d'entraînement */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocsEntrainement.map((bloc) => (
            <Card 
              key={bloc.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBloc === bloc.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBloc(bloc.id)}
            >
        <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{bloc.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(bloc.status)}`}></div>
                    <Badge variant={bloc.difficulty === 'Débutant' ? 'default' : 
                                  bloc.difficulty === 'Intermédiaire' ? 'secondary' : 'destructive'}>
                      {bloc.difficulty}
                    </Badge>
            </div>
                </div>
                <CardDescription>{bloc.description}</CardDescription>
        </CardHeader>
        <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Catégorie</span>
                    <span className="font-medium">{bloc.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Durée</span>
                    <span className="font-medium">{bloc.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Exercices</span>
                    <span className="font-medium">{bloc.exercises}</span>
              </div>
            
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Créé le {bloc.created}</span>
                      <span>Dernière utilisation : {bloc.lastUsed}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Démarrer
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {blocsEntrainement.map((bloc) => (
            <Card 
              key={bloc.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBloc === bloc.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBloc(bloc.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(bloc.status)}`}></div>
                      <h3 className="font-semibold">{bloc.name}</h3>
                    </div>
                    <Badge variant={bloc.difficulty === 'Débutant' ? 'default' : 
                                  bloc.difficulty === 'Intermédiaire' ? 'secondary' : 'destructive'}>
                      {bloc.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{bloc.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="text-muted-foreground">{bloc.duration}</div>
                      <div className="font-medium">{bloc.exercises} exercices</div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
              </div>
            </div>
          </CardContent>
        </Card>
          ))}
        </div>
      )}

      {/* Bloc sélectionné - Détails */}
      {selectedBloc && (
        <Card>
            <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Détails du Bloc d'Entraînement</CardTitle>
                <CardDescription>
                  Informations détaillées sur le bloc sélectionné
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Dupliquer
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
                    </div>
              </CardHeader>
            <CardContent>
            <div className="space-y-6">
              {/* Informations générales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold">Objectifs</h3>
                  <p className="text-sm text-muted-foreground">Musculation & Cardio</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Timer className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold">Durée</h3>
                  <p className="text-sm text-muted-foreground">30-50 min</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold">Intensité</h3>
                  <p className="text-sm text-muted-foreground">Modérée à Élevée</p>
                </div>
              </div>
              
              {/* Exercices inclus */}
              <div className="space-y-4">
                <h4 className="font-semibold">Exercices Inclus :</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {blocsEntrainement.find(b => b.id === selectedBloc)?.exercisesList.map((exercise) => (
                    <div key={exercise} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{exercise}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Statistiques d'utilisation */}
              <div className="space-y-4">
                <h4 className="font-semibold">Statistiques d'Utilisation :</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-muted-foreground">Utilisations</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4h 30min</div>
                    <div className="text-sm text-muted-foreground">Temps total</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-sm text-muted-foreground">Taux de réussite</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">2</div>
                    <div className="text-sm text-muted-foreground">Records personnels</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Section Statistiques des Blocs
const StatistiquesBlocsSection = () => {
  return (
    <div className="space-y-6">
      {/* En-tête des statistiques */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Statistiques des Blocs</h2>
          <p className="text-muted-foreground">
            Analysez l'utilisation de vos blocs d'entraînement
          </p>
        </div>
        </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocs Actifs</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisations Total</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +15% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 min</div>
            <p className="text-xs text-muted-foreground">
              -3 min par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Réussite</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +5% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
                    </div>

      {/* Graphiques et analyses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Blocs les Plus Utilisés</CardTitle>
            <CardDescription>
              Top 5 des blocs d'entraînement les plus populaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bloc Musculation - Haut du Corps</span>
                <span className="text-sm text-muted-foreground">32 utilisations</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bloc Cardio - HIIT</span>
                <span className="text-sm text-muted-foreground">28 utilisations</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bloc Musculation - Bas du Corps</span>
                <span className="text-sm text-muted-foreground">24 utilisations</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par Catégorie</CardTitle>
            <CardDescription>
              Distribution des blocs par type d'entraînement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Musculation</span>
                    </div>
                <span className="text-sm font-medium">65%</span>
                            </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Cardio</span>
                </div>
                <span className="text-sm font-medium">25%</span>
                        </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Flexibilité</span>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
                  </div>
                </CardContent>
              </Card>
          </div>
    </div>
  );
};

// Page BlocsEntrainement
export default function BlocsEntrainement() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Tabs defaultValue="blocs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="blocs">Blocs d'Entraînement</TabsTrigger>
          <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blocs" className="space-y-6">
          <BlocsEntrainementSection />
        </TabsContent>
        
        <TabsContent value="statistiques" className="space-y-6">
          <StatistiquesBlocsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}