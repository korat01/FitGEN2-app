import React, { useState } from 'react';
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

const Exercices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [selectedDifficulty, setSelectedDifficulty] = useState('tous');

  // Base de données des blocs d'exercices
  const blocsExercices = [
    // Blocs de force
    {
      id: 1,
      nom: 'Bloc Force - Débutant',
      categorie: 'Force',
      difficulte: 'Débutant',
      duree: '45 min',
      exercices: [
        { nom: 'Squats', series: 3, repetitions: '12-15', repos: '60s', poids: 'Corps' },
        { nom: 'Pompes', series: 3, repetitions: '8-12', repos: '60s', poids: 'Corps' },
        { nom: 'Fentes', series: 3, repetitions: '10-12', repos: '60s', poids: 'Corps' },
        { nom: 'Planche', series: 3, repetitions: '30-45s', repos: '60s', poids: 'Corps' }
      ],
      contraintes: [
        'Échauffement obligatoire de 10 minutes',
        'Technique correcte avant d\'augmenter l\'intensité',
        'Respecter les temps de repos',
        'Hydratation régulière'
      ],
      objectifs: ['Renforcement musculaire', 'Amélioration de la condition physique'],
      materiel: ['Aucun', 'Tapis de sol'],
      description: 'Bloc d\'entraînement pour débuter en musculation avec des exercices au poids du corps.'
    },
    {
      id: 2,
      nom: 'Bloc Force - Intermédiaire',
      categorie: 'Force',
      difficulte: 'Intermédiaire',
      duree: '60 min',
      exercices: [
        { nom: 'Squats avec haltères', series: 4, repetitions: '10-12', repos: '90s', poids: '8-12kg' },
        { nom: 'Développé couché', series: 4, repetitions: '8-10', repos: '90s', poids: '20-30kg' },
        { nom: 'Tractions', series: 3, repetitions: '6-10', repos: '90s', poids: 'Corps' },
        { nom: 'Soulevé de terre', series: 3, repetitions: '8-10', repos: '120s', poids: '30-40kg' }
      ],
      contraintes: [
        'Échauffement complet de 15 minutes',
        'Surveillance de la technique',
        'Progression progressive des charges',
        'Récupération de 48h entre les séances'
      ],
      objectifs: ['Gain de force', 'Hypertrophie musculaire'],
      materiel: ['Haltères', 'Barre', 'Banc', 'Rack'],
      description: 'Bloc d\'entraînement intermédiaire pour développer la force et la masse musculaire.'
    },
    {
      id: 3,
      nom: 'Bloc Force - Avancé',
      categorie: 'Force',
      difficulte: 'Avancé',
      duree: '75 min',
      exercices: [
        { nom: 'Squats lourds', series: 5, repetitions: '5', repos: '3-5min', poids: '80-120kg' },
        { nom: 'Développé couché lourd', series: 5, repetitions: '5', repos: '3-5min', poids: '60-100kg' },
        { nom: 'Soulevé de terre lourd', series: 5, repetitions: '5', repos: '3-5min', poids: '100-150kg' },
        { nom: 'Développé militaire', series: 4, repetitions: '6-8', repos: '2-3min', poids: '40-60kg' }
      ],
      contraintes: [
        'Échauffement progressif de 20 minutes',
        'Technique parfaite obligatoire',
        'Surveillance d\'un partenaire pour les charges lourdes',
        'Récupération de 72h minimum'
      ],
      objectifs: ['Force maximale', 'Puissance'],
      materiel: ['Barre olympique', 'Disques', 'Rack de squat', 'Banc', 'Ceinture'],
      description: 'Bloc d\'entraînement avancé pour développer la force maximale.'
    },

    // Blocs de cardio
    {
      id: 4,
      nom: 'Bloc Cardio - HIIT',
      categorie: 'Cardio',
      difficulte: 'Intermédiaire',
      duree: '30 min',
      exercices: [
        { nom: 'Burpees', series: 4, repetitions: '30s', repos: '30s', poids: 'Corps' },
        { nom: 'Mountain climbers', series: 4, repetitions: '30s', repos: '30s', poids: 'Corps' },
        { nom: 'Jumping jacks', series: 4, repetitions: '30s', repos: '30s', poids: 'Corps' },
        { nom: 'High knees', series: 4, repetitions: '30s', repos: '30s', poids: 'Corps' }
      ],
      contraintes: [
        'Échauffement cardio de 10 minutes',
        'Intensité maximale pendant les efforts',
        'Respecter les temps de récupération',
        'Hydratation continue'
      ],
      objectifs: ['Brûler les graisses', 'Améliorer la condition cardio'],
      materiel: ['Aucun', 'Tapis de sol'],
      description: 'Entraînement HIIT pour brûler les graisses et améliorer la condition physique.'
    },
    {
      id: 5,
      nom: 'Bloc Cardio - Endurance',
      categorie: 'Cardio',
      difficulte: 'Débutant',
      duree: '45 min',
      exercices: [
        { nom: 'Course à pied', series: 1, repetitions: '30 min', repos: '0s', poids: 'Corps' },
        { nom: 'Marche rapide', series: 1, repetitions: '15 min', repos: '0s', poids: 'Corps' }
      ],
      contraintes: [
        'Allure modérée et constante',
        'Respiration contrôlée',
        'Hydratation régulière',
        'Écoute de son corps'
      ],
      objectifs: ['Endurance cardiovasculaire', 'Perte de poids'],
      materiel: ['Chaussures de course', 'Bouteille d\'eau'],
      description: 'Entraînement d\'endurance pour améliorer la condition cardiovasculaire.'
    },

    // Blocs de mobilité
    {
      id: 6,
      nom: 'Bloc Mobilité - Échauffement',
      categorie: 'Mobilité',
      difficulte: 'Débutant',
      duree: '20 min',
      exercices: [
        { nom: 'Rotations d\'épaules', series: 2, repetitions: '10', repos: '30s', poids: 'Corps' },
        { nom: 'Flexions de hanches', series: 2, repetitions: '10', repos: '30s', poids: 'Corps' },
        { nom: 'Rotations de chevilles', series: 2, repetitions: '10', repos: '30s', poids: 'Corps' },
        { nom: 'Étirements dynamiques', series: 1, repetitions: '5 min', repos: '0s', poids: 'Corps' }
      ],
      contraintes: [
        'Mouvements lents et contrôlés',
        'Respiration profonde',
        'Pas de douleur, seulement tension',
        'Progression graduelle'
      ],
      objectifs: ['Préparation musculaire', 'Prévention des blessures'],
      materiel: ['Tapis de sol'],
      description: 'Bloc d\'échauffement et de mobilité pour préparer le corps à l\'effort.'
    },
    {
      id: 7,
      nom: 'Bloc Mobilité - Récupération',
      categorie: 'Mobilité',
      difficulte: 'Débutant',
      duree: '30 min',
      exercices: [
        { nom: 'Étirements statiques', series: 1, repetitions: '20 min', repos: '0s', poids: 'Corps' },
        { nom: 'Foam rolling', series: 1, repetitions: '10 min', repos: '0s', poids: 'Corps' }
      ],
      contraintes: [
        'Ambiance calme et relaxante',
        'Respiration profonde et lente',
        'Maintenir chaque étirement 30-60s',
        'Écoute de son corps'
      ],
      objectifs: ['Récupération musculaire', 'Flexibilité'],
      materiel: ['Tapis de sol', 'Rouleau de massage'],
      description: 'Séance de récupération et d\'étirements pour optimiser la récupération.'
    },

    // Blocs fonctionnels
    {
      id: 8,
      nom: 'Bloc Fonctionnel - Core',
      categorie: 'Fonctionnel',
      difficulte: 'Intermédiaire',
      duree: '25 min',
      exercices: [
        { nom: 'Planche', series: 3, repetitions: '45s', repos: '60s', poids: 'Corps' },
        { nom: 'Russian twists', series: 3, repetitions: '20', repos: '60s', poids: 'Corps' },
        { nom: 'Mountain climbers', series: 3, repetitions: '30s', repos: '60s', poids: 'Corps' },
        { nom: 'Dead bug', series: 3, repetitions: '12', repos: '60s', poids: 'Corps' }
      ],
      contraintes: [
        'Engagement constant du core',
        'Respiration contrôlée',
        'Technique parfaite',
        'Progression graduelle'
      ],
      objectifs: ['Renforcement du core', 'Stabilité'],
      materiel: ['Tapis de sol'],
      description: 'Bloc spécialisé pour renforcer les muscles du core et améliorer la stabilité.'
    },
    {
      id: 9,
      nom: 'Bloc Fonctionnel - Full Body',
      categorie: 'Fonctionnel',
      difficulte: 'Avancé',
      duree: '50 min',
      exercices: [
        { nom: 'Thrusters', series: 4, repetitions: '12', repos: '90s', poids: '15-20kg' },
        { nom: 'Burpees', series: 4, repetitions: '10', repos: '90s', poids: 'Corps' },
        { nom: 'Kettlebell swings', series: 4, repetitions: '15', repos: '90s', poids: '16-24kg' },
        { nom: 'Box jumps', series: 4, repetitions: '8', repos: '90s', poids: 'Corps' }
      ],
      contraintes: [
        'Mouvements fonctionnels complets',
        'Intensité élevée',
        'Technique prioritaire',
        'Récupération active'
      ],
      objectifs: ['Condition physique globale', 'Puissance'],
      materiel: ['Haltères', 'Kettlebell', 'Box', 'Tapis'],
      description: 'Entraînement fonctionnel complet pour améliorer la condition physique globale.'
    },

    // Blocs spécialisés
    {
      id: 10,
      nom: 'Bloc Spécialisé - Posture',
      categorie: 'Spécialisé',
      difficulte: 'Débutant',
      duree: '35 min',
      exercices: [
        { nom: 'Wall slides', series: 3, repetitions: '15', repos: '60s', poids: 'Corps' },
        { nom: 'Face pulls', series: 3, repetitions: '12', repos: '60s', poids: '5-10kg' },
        { nom: 'Reverse flyes', series: 3, repetitions: '12', repos: '60s', poids: '3-5kg' },
        { nom: 'Cat-cow stretch', series: 2, repetitions: '10', repos: '30s', poids: 'Corps' }
      ],
      contraintes: [
        'Focus sur la posture',
        'Mouvements lents et contrôlés',
        'Respiration profonde',
        'Conscience corporelle'
      ],
      objectifs: ['Amélioration de la posture', 'Prévention des douleurs'],
      materiel: ['Bande élastique', 'Haltères légers', 'Tapis'],
      description: 'Bloc spécialisé pour corriger la posture et prévenir les douleurs dorsales.'
    }
  ];

  const categories = ['tous', ...Array.from(new Set(blocsExercices.map(bloc => bloc.categorie)))];
  const difficultes = ['tous', ...Array.from(new Set(blocsExercices.map(bloc => bloc.difficulte)))];

  const filteredBlocs = blocsExercices.filter(bloc => {
    const matchesSearch = bloc.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bloc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || bloc.categorie === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'tous' || bloc.difficulte === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Débutant': return 'bg-green-500';
      case 'Intermédiaire': return 'bg-yellow-500';
      case 'Avancé': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const BlocCard = ({ bloc }: any) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{bloc.nom}</CardTitle>
            <CardDescription className="mt-1">{bloc.description}</CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={`${getDifficultyColor(bloc.difficulte)} text-white`}>
              {bloc.difficulte}
            </Badge>
            <Badge variant="outline">{bloc.categorie}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Informations générales */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{bloc.duree}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span>{bloc.exercices.length} exercices</span>
          </div>
        </div>

        {/* Objectifs */}
        <div>
          <h4 className="font-medium mb-2">Objectifs :</h4>
          <div className="flex flex-wrap gap-1">
            {bloc.objectifs.map((objectif: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {objectif}
              </Badge>
            ))}
          </div>
        </div>

        {/* Matériel nécessaire */}
        <div>
          <h4 className="font-medium mb-2">Matériel :</h4>
          <div className="flex flex-wrap gap-1">
            {bloc.materiel.map((materiel: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {materiel}
              </Badge>
            ))}
          </div>
        </div>

        {/* Exercices */}
        <div>
          <h4 className="font-medium mb-2">Exercices :</h4>
          <div className="space-y-2">
            {bloc.exercices.slice(0, 3).map((exercice: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                <span className="font-medium">{exercice.nom}</span>
                <span className="text-muted-foreground">
                  {exercice.series} séries × {exercice.repetitions}
                </span>
              </div>
            ))}
            {bloc.exercices.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{bloc.exercices.length - 3} autres exercices...
              </p>
            )}
          </div>
        </div>

        {/* Contraintes importantes */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            Contraintes importantes :
          </h4>
          <div className="space-y-1">
            {bloc.contraintes.slice(0, 2).map((contrainte: string, index: number) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">{contrainte}</span>
              </div>
            ))}
            {bloc.contraintes.length > 2 && (
              <p className="text-xs text-muted-foreground">
                +{bloc.contraintes.length - 2} autres contraintes...
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            Commencer
          </Button>
          <Button variant="outline">
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-primary" />
            Exercices
          </h1>
          <p className="text-muted-foreground mt-1">
            Blocs d'entraînement avec exercices et contraintes
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{blocsExercices.length}</p>
          <p className="text-sm text-muted-foreground">Blocs disponibles</p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un bloc d'exercice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'tous' ? 'Toutes catégories' : category}
                  </option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {difficultes.map(difficulte => (
                  <option key={difficulte} value={difficulte}>
                    {difficulte === 'tous' ? 'Tous niveaux' : difficulte}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{blocsExercices.filter(b => b.categorie === 'Force').length}</p>
                <p className="text-sm text-muted-foreground">Blocs Force</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{blocsExercices.filter(b => b.categorie === 'Cardio').length}</p>
                <p className="text-sm text-muted-foreground">Blocs Cardio</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{blocsExercices.filter(b => b.categorie === 'Mobilité').length}</p>
                <p className="text-sm text-muted-foreground">Blocs Mobilité</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{blocsExercices.filter(b => b.categorie === 'Fonctionnel').length}</p>
                <p className="text-sm text-muted-foreground">Blocs Fonctionnel</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des blocs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBlocs.map((bloc) => (
          <BlocCard key={bloc.id} bloc={bloc} />
        ))}
      </div>

      {filteredBlocs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun bloc trouvé</h3>
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