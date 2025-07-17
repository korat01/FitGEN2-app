import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Search, Filter, Dumbbell, Target, Users, Clock } from 'lucide-react';
import { getSavedBlocsEntrainement, deleteBlocEntrainement, SavedBlocEntrainement } from '@/utils/blocsEntrainementData';
import { useToast } from '@/hooks/use-toast';

export default function BlocsEntrainement() {
  const [blocs, setBlocs] = useState<SavedBlocEntrainement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('tous');
  const [filterFocus, setFilterFocus] = useState<string>('tous');
  const { toast } = useToast();

  useEffect(() => {
    loadBlocs();
  }, []);

  const loadBlocs = () => {
    const savedBlocs = getSavedBlocsEntrainement();
    setBlocs(savedBlocs);
  };

  const handleDeleteBloc = (id: string, nom: string) => {
    deleteBlocEntrainement(id);
    loadBlocs();
    toast({
      title: "Bloc supprimé",
      description: `Le bloc "${nom}" a été supprimé avec succès.`
    });
  };

  const filteredBlocs = blocs.filter(bloc => {
    const matchesSearch = bloc.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bloc.muscles_sollicités.some(muscle => 
                           muscle.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesType = filterType === 'tous' || bloc.type === filterType;
    const matchesFocus = filterFocus === 'tous' || bloc.focus === filterFocus;
    
    return matchesSearch && matchesType && matchesFocus;
  });

  const getTypeColor = (type: string) => {
    const colors = {
      'composé': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'isolé': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'cardio': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'gainage': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'étirement': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'accessoire': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  return (
    <div className="bg-background animate-fade-in">
      {/* Page Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="relative bg-card/80 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-4 animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 gradient-primary rounded-xl blur-lg opacity-30"></div>
                <div className="relative p-3 gradient-primary rounded-xl shadow-glow">
                  <Dumbbell className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Blocs d'Entraînement
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  Gestion des exercices sauvegardés ({blocs.length} blocs)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nom ou muscle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Type d'exercice</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les types</SelectItem>
                    <SelectItem value="composé">Composé</SelectItem>
                    <SelectItem value="isolé">Isolé</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="gainage">Gainage</SelectItem>
                    <SelectItem value="étirement">Étirement</SelectItem>
                    <SelectItem value="accessoire">Accessoire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Focus</label>
                <Select value={filterFocus} onValueChange={setFilterFocus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les focus</SelectItem>
                    <SelectItem value="haut_corps_poussée">Haut corps - Poussée</SelectItem>
                    <SelectItem value="haut_corps_tirage">Haut corps - Tirage</SelectItem>
                    <SelectItem value="bas_corps_gainage">Bas corps - Gainage</SelectItem>
                    <SelectItem value="full_body_léger">Full body léger</SelectItem>
                    <SelectItem value="repos_étirements">Repos - Étirements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blocs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredBlocs.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Dumbbell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucun bloc trouvé</h3>
              <p className="text-muted-foreground">
                {blocs.length === 0 
                  ? "Aucun bloc d'entraînement sauvegardé. Rendez-vous dans le panel développeur pour en créer."
                  : "Aucun bloc ne correspond aux critères de recherche."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlocs.map((bloc) => (
              <Card key={bloc.id} className="gradient-card shadow-card border-0 hover-lift">
                <CardHeader className="relative">
                  <div className="absolute top-0 left-0 w-full h-1 gradient-primary rounded-t-lg"></div>
                  <div className="flex justify-between items-start mt-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{bloc.nom}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge className={getTypeColor(bloc.type)}>
                          {bloc.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getDifficultyStars(bloc.difficulté)}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBloc(bloc.id, bloc.nom)}
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-medium">{bloc.focus.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{bloc.séries}×{bloc.répétitions}</span>
                    </div>
                    {bloc.charge > 0 && (
                      <div className="col-span-2 flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Charge: {bloc.charge}kg</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Muscles sollicités:</h4>
                    <div className="flex flex-wrap gap-1">
                      {bloc.muscles_sollicités.map((muscle, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Équipement:</h4>
                    <div className="flex flex-wrap gap-1">
                      {bloc.équipement.map((equip, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {equip}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {bloc.description && (
                    <div>
                      <h4 className="font-medium text-sm mb-1">Description:</h4>
                      <p className="text-xs text-muted-foreground">{bloc.description}</p>
                    </div>
                  )}

                  {bloc.contraintes_médicales && bloc.contraintes_médicales.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-1 text-destructive">Contraintes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {bloc.contraintes_médicales.map((contrainte, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {contrainte}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground border-t pt-2">
                    Créé le: {new Date(bloc.dateCreation).toLocaleDateString('fr-FR')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}