import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Code, 
  Apple, 
  UtensilsCrossed, 
  Dumbbell,
  Plus,
  X,
  Save,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Developer = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState('aliments');

  // États pour le formulaire d'aliment
  const [alimentForm, setAlimentForm] = useState({
    nom: '',
    catégorie: '',
    calories: '',
    protéines: '',
    glucides: '',
    lipides: '',
    fibres: '',
    quantité_standard: '',
    index_glycémique: '',
    moment_consommation: [] as string[],
    classes_nutritionnelles: [] as string[],
    bénéfices_clés: [] as string[],
    interdit_si: [] as string[]
  });

  // États pour le formulaire de repas
  const [repasForm, setRepasForm] = useState({
    nom: '',
    calories_totales: '',
    protéines: '',
    glucides: '',
    lipides: '',
    objectif: '',
    densité: '',
    catégorie_repas: '',
    image_url: '',
    aliments: [] as Array<{nom: string, quantité: string}>
  });

  // États pour le formulaire de programme sportif
  const [programmeForm, setProgrammeForm] = useState({
    nom: '',
    description: '',
    niveau: '',
    objectif: '',
    durée: '',
    fréquence: '',
    matériel: [] as string[],
    exercices: [] as Array<{nom: string, séries: string, répétitions: string, temps_repos: string}>
  });

  const momentConsommationOptions = [
    'petit-déjeuner', 'collation', 'déjeuner', 'collation-après-midi', 
    'dîner', 'post-entraînement', 'pré-entraînement', 'soir'
  ];

  const classesNutritionnellesOptions = [
    'prise de masse', 'sèche', 'récupération', 'rétablissement', 
    'anti-inflammatoire', 'énergétique', 'boost performance'
  ];

  const handleAddToArray = (arrayName: string, value: string, formType: 'aliment' | 'repas' | 'programme') => {
    if (!value.trim()) return;

    if (formType === 'aliment') {
      setAlimentForm(prev => ({
        ...prev,
        [arrayName]: [...prev[arrayName as keyof typeof prev] as string[], value]
      }));
    } else if (formType === 'repas') {
      if (arrayName === 'aliments') {
        setRepasForm(prev => ({
          ...prev,
          aliments: [...prev.aliments, {nom: value, quantité: ''}]
        }));
      }
    } else if (formType === 'programme') {
      if (arrayName === 'matériel') {
        setProgrammeForm(prev => ({
          ...prev,
          matériel: [...prev.matériel, value]
        }));
      } else if (arrayName === 'exercices') {
        setProgrammeForm(prev => ({
          ...prev,
          exercices: [...prev.exercices, {nom: value, séries: '', répétitions: '', temps_repos: ''}]
        }));
      }
    }
  };

  const handleRemoveFromArray = (arrayName: string, index: number, formType: 'aliment' | 'repas' | 'programme') => {
    if (formType === 'aliment') {
      setAlimentForm(prev => ({
        ...prev,
        [arrayName]: (prev[arrayName as keyof typeof prev] as string[]).filter((_, i) => i !== index)
      }));
    } else if (formType === 'repas') {
      if (arrayName === 'aliments') {
        setRepasForm(prev => ({
          ...prev,
          aliments: prev.aliments.filter((_, i) => i !== index)
        }));
      }
    } else if (formType === 'programme') {
      if (arrayName === 'matériel') {
        setProgrammeForm(prev => ({
          ...prev,
          matériel: prev.matériel.filter((_, i) => i !== index)
        }));
      } else if (arrayName === 'exercices') {
        setProgrammeForm(prev => ({
          ...prev,
          exercices: prev.exercices.filter((_, i) => i !== index)
        }));
      }
    }
  };

  const handleSaveAliment = () => {
    const alimentData = {
      nom: alimentForm.nom,
      catégorie: alimentForm.catégorie,
      calories: `${alimentForm.calories} kcal pour ${alimentForm.quantité_standard}`,
      macros: {
        protéines: `${alimentForm.protéines}g`,
        glucides: `${alimentForm.glucides}g`,
        lipides: `${alimentForm.lipides}g`,
        fibres: `${alimentForm.fibres}g`
      },
      quantité_standard: alimentForm.quantité_standard,
      moment_de_consommation: alimentForm.moment_consommation,
      classes_nutritionnelles: alimentForm.classes_nutritionnelles,
      index_glycémique: alimentForm.index_glycémique,
      bénéfices_clés: alimentForm.bénéfices_clés,
      interdit_si: alimentForm.interdit_si
    };

    console.log('Nouvel aliment:', JSON.stringify(alimentData, null, 2));
    toast({
      title: "Aliment ajouté",
      description: `L'aliment "${alimentForm.nom}" a été ajouté avec succès.`
    });

    // Reset form
    setAlimentForm({
      nom: '',
      catégorie: '',
      calories: '',
      protéines: '',
      glucides: '',
      lipides: '',
      fibres: '',
      quantité_standard: '',
      index_glycémique: '',
      moment_consommation: [],
      classes_nutritionnelles: [],
      bénéfices_clés: [],
      interdit_si: []
    });
  };

  const handleSaveRepas = () => {
    console.log('Nouveau repas:', JSON.stringify(repasForm, null, 2));
    toast({
      title: "Repas ajouté",
      description: `Le repas "${repasForm.nom}" a été ajouté avec succès.`
    });
  };

  const handleSaveProgramme = () => {
    console.log('Nouveau programme:', JSON.stringify(programmeForm, null, 2));
    toast({
      title: "Programme ajouté",
      description: `Le programme "${programmeForm.nom}" a été ajouté avec succès.`
    });
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
                  <Code className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Panel Développeur
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  Ajout de blocs nutrition et programmes sportifs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-14 p-1 gradient-card shadow-card">
            <TabsTrigger 
              value="aliments" 
              className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
            >
              <Apple className="h-4 w-4" />
              <span>Blocs Aliments</span>
            </TabsTrigger>
            <TabsTrigger 
              value="repas" 
              className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
            >
              <UtensilsCrossed className="h-4 w-4" />
              <span>Blocs Repas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="programmes" 
              className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
            >
              <Dumbbell className="h-4 w-4" />
              <span>Programmes Sportifs</span>
            </TabsTrigger>
          </TabsList>

          {/* Onglet Aliments */}
          <TabsContent value="aliments" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary rounded-t-lg"></div>
                <CardTitle className="flex items-center space-x-3 mt-2">
                  <div className="p-2 gradient-primary rounded-lg">
                    <Apple className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-2xl">Ajouter un bloc aliment</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Créer un nouvel aliment avec ses informations nutritionnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Informations de base */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nom">Nom de l'aliment</Label>
                      <Input 
                        id="nom"
                        value={alimentForm.nom}
                        onChange={(e) => setAlimentForm(prev => ({...prev, nom: e.target.value}))}
                        placeholder="Ex: Avocat"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="catégorie">Catégorie</Label>
                      <Select value={alimentForm.catégorie} onValueChange={(value) => setAlimentForm(prev => ({...prev, catégorie: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Protéine">Protéine</SelectItem>
                          <SelectItem value="Glucide">Glucide</SelectItem>
                          <SelectItem value="Lipide">Lipide</SelectItem>
                          <SelectItem value="Mixte">Mixte</SelectItem>
                          <SelectItem value="Micronutriments">Micronutriments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="quantité_standard">Quantité standard</Label>
                      <Input 
                        id="quantité_standard"
                        value={alimentForm.quantité_standard}
                        onChange={(e) => setAlimentForm(prev => ({...prev, quantité_standard: e.target.value}))}
                        placeholder="Ex: 100g, 1 unité, 1 portion"
                      />
                    </div>

                    <div>
                      <Label htmlFor="index_glycémique">Index glycémique</Label>
                      <Select value={alimentForm.index_glycémique} onValueChange={(value) => setAlimentForm(prev => ({...prev, index_glycémique: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez l'index glycémique" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="faible">Faible</SelectItem>
                          <SelectItem value="modéré">Modéré</SelectItem>
                          <SelectItem value="élevé">Élevé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Macronutriments */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="calories">Calories (kcal)</Label>
                      <Input 
                        id="calories"
                        type="number"
                        value={alimentForm.calories}
                        onChange={(e) => setAlimentForm(prev => ({...prev, calories: e.target.value}))}
                        placeholder="Ex: 160"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="protéines">Protéines (g)</Label>
                        <Input 
                          id="protéines"
                          type="number"
                          value={alimentForm.protéines}
                          onChange={(e) => setAlimentForm(prev => ({...prev, protéines: e.target.value}))}
                          placeholder="Ex: 2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="glucides">Glucides (g)</Label>
                        <Input 
                          id="glucides"
                          type="number"
                          value={alimentForm.glucides}
                          onChange={(e) => setAlimentForm(prev => ({...prev, glucides: e.target.value}))}
                          placeholder="Ex: 9"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lipides">Lipides (g)</Label>
                        <Input 
                          id="lipides"
                          type="number"
                          value={alimentForm.lipides}
                          onChange={(e) => setAlimentForm(prev => ({...prev, lipides: e.target.value}))}
                          placeholder="Ex: 15"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fibres">Fibres (g)</Label>
                        <Input 
                          id="fibres"
                          type="number"
                          value={alimentForm.fibres}
                          onChange={(e) => setAlimentForm(prev => ({...prev, fibres: e.target.value}))}
                          placeholder="Ex: 7"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Moments de consommation */}
                <div>
                  <Label>Moments de consommation</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {momentConsommationOptions.map((moment) => (
                      <div key={moment} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`moment-${moment}`}
                          checked={alimentForm.moment_consommation.includes(moment)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAlimentForm(prev => ({
                                ...prev,
                                moment_consommation: [...prev.moment_consommation, moment]
                              }));
                            } else {
                              setAlimentForm(prev => ({
                                ...prev,
                                moment_consommation: prev.moment_consommation.filter(m => m !== moment)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={`moment-${moment}`} className="text-sm">{moment}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Classes nutritionnelles */}
                <div>
                  <Label>Classes nutritionnelles</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {classesNutritionnellesOptions.map((classe) => (
                      <div key={classe} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`classe-${classe}`}
                          checked={alimentForm.classes_nutritionnelles.includes(classe)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAlimentForm(prev => ({
                                ...prev,
                                classes_nutritionnelles: [...prev.classes_nutritionnelles, classe]
                              }));
                            } else {
                              setAlimentForm(prev => ({
                                ...prev,
                                classes_nutritionnelles: prev.classes_nutritionnelles.filter(c => c !== classe)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={`classe-${classe}`} className="text-sm">{classe}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bénéfices clés */}
                <div>
                  <Label>Bénéfices clés</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {alimentForm.bénéfices_clés.map((bénéfice, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {bénéfice}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0"
                          onClick={() => handleRemoveFromArray('bénéfices_clés', index, 'aliment')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      placeholder="Ex: Anti-catabolique, Riche en oméga 3"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddToArray('bénéfices_clés', e.currentTarget.value, 'aliment');
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleAddToArray('bénéfices_clés', input.value, 'aliment');
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Contre-indications */}
                <div>
                  <Label>Contre-indications</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {alimentForm.interdit_si.map((interdiction, index) => (
                      <Badge key={index} variant="destructive" className="flex items-center gap-1">
                        {interdiction}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0"
                          onClick={() => handleRemoveFromArray('interdit_si', index, 'aliment')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      placeholder="Ex: allergie aux fruits à coque, problèmes rénaux"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddToArray('interdit_si', e.currentTarget.value, 'aliment');
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleAddToArray('interdit_si', input.value, 'aliment');
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveAliment} className="gradient-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder l'aliment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Repas */}
          <TabsContent value="repas" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-accent rounded-t-lg"></div>
                <CardTitle className="flex items-center space-x-3 mt-2">
                  <div className="p-2 gradient-accent rounded-lg">
                    <UtensilsCrossed className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <span className="text-2xl">Ajouter un bloc repas</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Créer un nouveau repas avec ses informations nutritionnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nom-repas">Nom du repas</Label>
                      <Input 
                        id="nom-repas"
                        value={repasForm.nom}
                        onChange={(e) => setRepasForm(prev => ({...prev, nom: e.target.value}))}
                        placeholder="Ex: Petit-déjeuner équilibré"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="objectif">Objectif</Label>
                      <Select value={repasForm.objectif} onValueChange={(value) => setRepasForm(prev => ({...prev, objectif: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un objectif" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prise_de_masse">Prise de masse</SelectItem>
                          <SelectItem value="perte_de_gras">Perte de gras</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="densité">Densité</Label>
                      <Select value={repasForm.densité} onValueChange={(value) => setRepasForm(prev => ({...prev, densité: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez la densité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="léger">Léger</SelectItem>
                          <SelectItem value="moyen">Moyen</SelectItem>
                          <SelectItem value="lourd">Lourd</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="catégorie_repas">Catégorie de repas</Label>
                      <Select value={repasForm.catégorie_repas} onValueChange={(value) => setRepasForm(prev => ({...prev, catégorie_repas: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petit-déjeuner">Petit-déjeuner</SelectItem>
                          <SelectItem value="déjeuner">Déjeuner</SelectItem>
                          <SelectItem value="dîner">Dîner</SelectItem>
                          <SelectItem value="collation">Collation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="calories_totales">Calories totales</Label>
                      <Input 
                        id="calories_totales"
                        type="number"
                        value={repasForm.calories_totales}
                        onChange={(e) => setRepasForm(prev => ({...prev, calories_totales: e.target.value}))}
                        placeholder="Ex: 450"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="protéines-repas">Protéines (g)</Label>
                        <Input 
                          id="protéines-repas"
                          type="number"
                          value={repasForm.protéines}
                          onChange={(e) => setRepasForm(prev => ({...prev, protéines: e.target.value}))}
                          placeholder="Ex: 25"
                        />
                      </div>
                      <div>
                        <Label htmlFor="glucides-repas">Glucides (g)</Label>
                        <Input 
                          id="glucides-repas"
                          type="number"
                          value={repasForm.glucides}
                          onChange={(e) => setRepasForm(prev => ({...prev, glucides: e.target.value}))}
                          placeholder="Ex: 60"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lipides-repas">Lipides (g)</Label>
                        <Input 
                          id="lipides-repas"
                          type="number"
                          value={repasForm.lipides}
                          onChange={(e) => setRepasForm(prev => ({...prev, lipides: e.target.value}))}
                          placeholder="Ex: 15"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="image_url">URL de l'image</Label>
                      <Input 
                        id="image_url"
                        value={repasForm.image_url}
                        onChange={(e) => setRepasForm(prev => ({...prev, image_url: e.target.value}))}
                        placeholder="Ex: https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveRepas} className="gradient-accent">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder le repas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Programmes */}
          <TabsContent value="programmes" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-secondary rounded-t-lg"></div>
                <CardTitle className="flex items-center space-x-3 mt-2">
                  <div className="p-2 gradient-secondary rounded-lg">
                    <Dumbbell className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <span className="text-2xl">Ajouter un programme sportif</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Créer un nouveau programme d'entraînement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nom-programme">Nom du programme</Label>
                      <Input 
                        id="nom-programme"
                        value={programmeForm.nom}
                        onChange={(e) => setProgrammeForm(prev => ({...prev, nom: e.target.value}))}
                        placeholder="Ex: Programme Full Body Débutant"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        value={programmeForm.description}
                        onChange={(e) => setProgrammeForm(prev => ({...prev, description: e.target.value}))}
                        placeholder="Description du programme..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="niveau">Niveau</Label>
                      <Select value={programmeForm.niveau} onValueChange={(value) => setProgrammeForm(prev => ({...prev, niveau: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="débutant">Débutant</SelectItem>
                          <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                          <SelectItem value="avancé">Avancé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="objectif-programme">Objectif</Label>
                      <Select value={programmeForm.objectif} onValueChange={(value) => setProgrammeForm(prev => ({...prev, objectif: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez l'objectif" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prise_de_masse">Prise de masse</SelectItem>
                          <SelectItem value="perte_de_poids">Perte de poids</SelectItem>
                          <SelectItem value="force">Force</SelectItem>
                          <SelectItem value="endurance">Endurance</SelectItem>
                          <SelectItem value="tonification">Tonification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="durée">Durée</Label>
                      <Input 
                        id="durée"
                        value={programmeForm.durée}
                        onChange={(e) => setProgrammeForm(prev => ({...prev, durée: e.target.value}))}
                        placeholder="Ex: 45 minutes"
                      />
                    </div>

                    <div>
                      <Label htmlFor="fréquence">Fréquence</Label>
                      <Input 
                        id="fréquence"
                        value={programmeForm.fréquence}
                        onChange={(e) => setProgrammeForm(prev => ({...prev, fréquence: e.target.value}))}
                        placeholder="Ex: 3 fois par semaine"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProgramme} className="gradient-secondary">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder le programme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Developer;