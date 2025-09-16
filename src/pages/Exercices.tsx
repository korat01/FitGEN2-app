import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, 
  Target, 
  Clock, 
  Users, 
  Search,
  Filter,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { tousBlocs } from '@/utils/blocsExercices';

const Exercices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'tous' | string>('tous');
  const [selectedFocus, setSelectedFocus] = useState<'tous' | string>('tous');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'tous' | number>('tous');

  // Dérivés pour filtres
  const types = useMemo(() => ['tous', ...Array.from(new Set(tousBlocs.map(b => b.type)))], []);
  const focuses = useMemo(() => ['tous', ...Array.from(new Set(tousBlocs.map(b => b.focus)))], []);
  const difficulties = ['tous', 1, 2, 3, 4, 5] as const;

  // Filtrage
  const filteredExercices = useMemo(() => {
    return tousBlocs.filter((ex) => {
      const q = searchTerm.trim().toLowerCase();
      const matchSearch = !q ||
        ex.nom.toLowerCase().includes(q) ||
        (ex.description?.toLowerCase().includes(q)) ||
        (Array.isArray(ex.muscles_sollicités) && ex.muscles_sollicités.some(m => m.toLowerCase().includes(q)));
      const matchType = selectedType === 'tous' || ex.type === selectedType;
      const matchFocus = selectedFocus === 'tous' || ex.focus === selectedFocus;
      const matchDiff = selectedDifficulty === 'tous' || ex.difficulté === selectedDifficulty;
      return matchSearch && matchType && matchFocus && matchDiff;
    });
  }, [searchTerm, selectedType, selectedFocus, selectedDifficulty]);

  const getDifficultyColor = (difficulte?: number) => {
    switch (difficulte) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-emerald-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-orange-500';
      case 5: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const ExerciseCard = ({ ex }: any) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl">{ex.nom}</CardTitle>
            {ex.description && (
              <CardDescription className="mt-1">{ex.description}</CardDescription>
            )}
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={`${getDifficultyColor(ex.difficulté)} text-white`}>
              {typeof ex.difficulté === 'number' ? `Niv. ${ex.difficulté}` : 'N/A'}
            </Badge>
            <div className="flex gap-1 flex-wrap justify-end">
              <Badge variant="outline">{ex.type}</Badge>
              <Badge variant="secondary">{ex.focus}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {ex.séries !== undefined && (
            <div><span className="text-muted-foreground">Séries:</span> {ex.séries}</div>
          )}
          {ex.répétitions !== undefined && (
            <div><span className="text-muted-foreground">Répétitions:</span> {ex.répétitions}</div>
          )}
          {ex.charge !== undefined && (
            <div><span className="text-muted-foreground">Charge:</span> {ex.charge === 0 ? 'Poids du corps' : `${ex.charge} kg`}</div>
          )}
          {Array.isArray(ex.équipement) && ex.équipement.length > 0 && (
            <div className="col-span-2">
              <span className="text-muted-foreground">Équipement:</span>{' '}
              <span>{ex.équipement.join(', ')}</span>
            </div>
          )}
        </div>

        {Array.isArray(ex.muscles_sollicités) && ex.muscles_sollicités.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Muscles sollicités</h4>
            <div className="flex flex-wrap gap-1">
              {ex.muscles_sollicités.map((m: string) => (
                <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(ex.contraintes_médicales) && ex.contraintes_médicales.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Contraintes médicales</h4>
            <div className="flex flex-wrap gap-1">
              {ex.contraintes_médicales.map((c: string) => (
                <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <Button className="flex-1">
            Commencer
          </Button>
          <Button variant="outline">
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const totalTypes = useMemo(() => new Map(types.filter(t => t !== 'tous').map(t => [t, tousBlocs.filter(b => b.type === t).length])), [types]);
  const totalFocus = useMemo(() => new Map(focuses.filter(f => f !== 'tous').map(f => [f, tousBlocs.filter(b => b.focus === f).length])), [focuses]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-primary" />
            Exercices
          </h1>
          <p className="text-muted-foreground mt-1">
            Parcourez les blocs d'exercices (ex: Pompes) et leurs contraintes
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{tousBlocs.length}</p>
          <p className="text-sm text-muted-foreground">Exercices disponibles</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un exercice (ex: pompes, dos, gainage)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'tous' ? 'Tous types' : type}
                  </option>
                ))}
              </select>
              <select
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {focuses.map(focus => (
                  <option key={focus} value={focus}>
                    {focus === 'tous' ? 'Tous focus' : focus}
                  </option>
                ))}
              </select>
              <select
                value={selectedDifficulty as any}
                onChange={(e) => setSelectedDifficulty(e.target.value === 'tous' ? 'tous' : Number(e.target.value))}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {difficulties.map((d) => (
                  <option key={String(d)} value={String(d)}>
                    {d === 'tous' ? 'Tous niveaux' : `Niv. ${d}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{tousBlocs.filter(b => b.type === 'composé').length}</p>
                <p className="text-sm text-muted-foreground">Exos composés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{tousBlocs.filter(b => b.type === 'isolé').length}</p>
                <p className="text-sm text-muted-foreground">Exos isolés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{tousBlocs.filter(b => b.type === 'cardio').length}</p>
                <p className="text-sm text-muted-foreground">Exos cardio</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{tousBlocs.filter(b => b.type !== 'cardio' && b.type !== 'étirement').length}</p>
                <p className="text-sm text-muted-foreground">Renfo & autres</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredExercices.map((ex, idx) => (
          <ExerciseCard key={`${ex.nom}-${idx}`} ex={ex} />
        ))}
      </div>

      {filteredExercices.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun exercice trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Exercices; 