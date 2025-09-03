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
import { useLanguage } from '@/contexts/LanguageContext';
import { saveAliment, saveRepas } from '@/utils/nutritionData';

const Developer = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
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
    type_de_repas: '',
    objectif_nutritionnel: [] as string[],
    calories_totales: '',
    protéines: '',
    glucides: '',
    lipides: '',
    fibres: '',
    composition: [] as Array<{aliment: string, quantité: string, préparation: string}>,
    indice_satiété: '',
    temps_de_préparation: '',
    adaptations_possibles: [] as string[],
    contre_indications: [] as string[]
  });

  // États pour le formulaire de programme sportif
  const [programmeForm, setProgrammeForm] = useState({
    nom: '',
    objectif: [] as string[],
    niveau: '',
    type: [] as string[],
    durée_estimée: '',
    structure: {
      échauffement: [] as string[],
      principal: [] as string[],
      finisher: [] as string[],
      récupération: [] as string[]
    },
    groupes_musculaires: [] as string[],
    intensité: '',
    matériel_nécessaire: [] as string[],
    recommandations: ''
  });

  // États pour le formulaire de bloc d'entraînement
  const [blocForm, setBlocForm] = useState({
    nom: '',
    type: 'composé' as 'composé' | 'isolé' | 'cardio' | 'accessoire' | 'étirement' | 'gainage',
    focus: '',
    difficulté: 1,
    muscles_sollicités: [] as string[],
    charge: 0,
    répétitions: '',
    séries: 1,
    temps_repos: '',
    équipement: [] as string[],
    description: '',
    contraintes_médicales: [] as string[]
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
      if (arrayName === 'composition') {
        setRepasForm(prev => ({
          ...prev,
          composition: [...prev.composition, {aliment: value, quantité: '', préparation: ''}]
        }));
      } else {
        setRepasForm(prev => ({
          ...prev,
          [arrayName]: [...prev[arrayName as keyof typeof prev] as string[], value]
        }));
      }
    } else if (formType === 'programme') {
      if (arrayName.includes('structure.')) {
        const structureKey = arrayName.split('.')[1] as keyof typeof programmeForm.structure;
        setProgrammeForm(prev => ({
          ...prev,
          structure: {
            ...prev.structure,
            [structureKey]: [...prev.structure[structureKey], value]
          }
        }));
      } else {
        setProgrammeForm(prev => ({
          ...prev,
          [arrayName]: [...prev[arrayName as keyof typeof prev] as string[], value]
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
      if (arrayName === 'composition') {
        setRepasForm(prev => ({
          ...prev,
          composition: prev.composition.filter((_, i) => i !== index)
        }));
      } else {
        setRepasForm(prev => ({
          ...prev,
          [arrayName]: (prev[arrayName as keyof typeof prev] as string[]).filter((_, i) => i !== index)
        }));
      }
    } else if (formType === 'programme') {
      if (arrayName.includes('structure.')) {
        const structureKey = arrayName.split('.')[1] as keyof typeof programmeForm.structure;
        setProgrammeForm(prev => ({
          ...prev,
          structure: {
            ...prev.structure,
            [structureKey]: prev.structure[structureKey].filter((_, i) => i !== index)
          }
        }));
      } else {
        setProgrammeForm(prev => ({
          ...prev,
          [arrayName]: (prev[arrayName as keyof typeof prev] as string[]).filter((_, i) => i !== index)
        }));
      }
    }
  };

  const handleSaveAliment = () => {
    try {
      const alimentData = {
        nom: alimentForm.nom,
        catégorie: alimentForm.catégorie as string,
        calories: parseInt(alimentForm.calories),
        macros: {
          protéines: parseFloat(alimentForm.protéines),
          glucides: parseFloat(alimentForm.glucides),
          lipides: parseFloat(alimentForm.lipides),
          fibres: parseFloat(alimentForm.fibres)
        },
        quantité_standard: alimentForm.quantité_standard,
        moment_de_consommation: alimentForm.moment_consommation,
        classes_nutritionnelles: alimentForm.classes_nutritionnelles,
        index_glycémique: alimentForm.index_glycémique as string,
        bénéfices_clés: alimentForm.bénéfices_clés,
        interdit_si: alimentForm.interdit_si
      };
      
      saveAliment(alimentData);
      
      toast({
        title: "Aliment ajouté",
        description: `L'aliment "${alimentForm.nom}" a été ajouté avec succès à votre bibliothèque.`
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
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive"
      });
    }
  };

  const handleSaveRepas = () => {
    try {
      const repasData = {
        nom: repasForm.nom,
        type_de_repas: repasForm.type_de_repas as string,
        objectif_nutritionnel: repasForm.objectif_nutritionnel,
        calories_totales: parseInt(repasForm.calories_totales),
        macros: {
          protéines: parseFloat(repasForm.protéines),
          glucides: parseFloat(repasForm.glucides),
          lipides: parseFloat(repasForm.lipides),
          fibres: parseFloat(repasForm.fibres)
        },
        composition: repasForm.composition,
        indice_satiété: repasForm.indice_satiété as string,
        temps_de_préparation: parseInt(repasForm.temps_de_préparation),
        adaptations_possibles: repasForm.adaptations_possibles,
        contre_indications: repasForm.contre_indications
      };
      
      saveRepas(repasData);
      
      toast({
        title: "Repas ajouté",
        description: `Le repas "${repasForm.nom}" a été ajouté avec succès à votre bibliothèque.`
      });
      
      // Reset du formulaire
      setRepasForm({
        nom: '',
        type_de_repas: '',
        objectif_nutritionnel: [],
        calories_totales: '',
        protéines: '',
        glucides: '',
        lipides: '',
        fibres: '',
        composition: [],
        indice_satiété: '',
        temps_de_préparation: '',
        adaptations_possibles: [],
        contre_indications: []
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive"
      });
    }
  };

  const handleSaveProgramme = () => {
    console.log('Nouveau programme:', JSON.stringify(programmeForm, null, 2));
    toast({
      title: "Programme ajouté",
      description: `Le programme "${programmeForm.nom}" a été ajouté avec succès.`
    });
  };

  const handleSaveBlocEntrainement = async () => {
    const { saveBlocEntrainement } = await import('@/utils/blocsEntrainementData');
    const savedBloc = saveBlocEntrainement(blocForm);
    toast({
      title: "Bloc d'entraînement sauvegardé",
      description: `Le bloc "${blocForm.nom}" a été sauvegardé avec succès.`
    });
    // Réinitialiser le formulaire
    setBlocForm({
      nom: '',
      type: 'composé',
      focus: '',
      difficulté: 1,
      muscles_sollicités: [],
      charge: 0,
      répétitions: '',
      séries: 1,
      temps_repos: '',
      équipement: [],
      description: '',
      contraintes_médicales: []
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
                  {t('dev.title')}
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  {t('dev.subtitle')}
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
              <span>{t('dev.tab.foods')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="repas" 
              className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
            >
              <UtensilsCrossed className="h-4 w-4" />
              <span>{t('dev.tab.meals')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="programmes" 
              className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
            >
              <Dumbbell className="h-4 w-4" />
              <span>{t('dev.tab.training')}</span>
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
                  <span className="text-2xl">{t('dev.food.title')}</span>
                </CardTitle>
                <CardDescription className="text-base">
                  {t('dev.food.desc')}
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
                        placeholder="Ex: Déjeuner post-training poulet-riz"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="type_de_repas">Type de repas</Label>
                      <Select value={repasForm.type_de_repas} onValueChange={(value) => setRepasForm(prev => ({...prev, type_de_repas: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petit-déjeuner">Petit-déjeuner</SelectItem>
                          <SelectItem value="déjeuner">Déjeuner</SelectItem>
                          <SelectItem value="dîner">Dîner</SelectItem>
                          <SelectItem value="collation">Collation</SelectItem>
                          <SelectItem value="post-training">Post-training</SelectItem>
                          <SelectItem value="pré-training">Pré-training</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="indice_satiété">Indice de satiété</Label>
                      <Select value={repasForm.indice_satiété} onValueChange={(value) => setRepasForm(prev => ({...prev, indice_satiété: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez l'indice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="faible">Faible</SelectItem>
                          <SelectItem value="moyen">Moyen</SelectItem>
                          <SelectItem value="élevé">Élevé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="temps_de_préparation">Temps de préparation (minutes)</Label>
                      <Input 
                        id="temps_de_préparation"
                        type="number"
                        value={repasForm.temps_de_préparation}
                        onChange={(e) => setRepasForm(prev => ({...prev, temps_de_préparation: e.target.value}))}
                        placeholder="Ex: 15"
                      />
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

                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                      <div>
                        <Label htmlFor="fibres-repas">Fibres (g)</Label>
                        <Input 
                          id="fibres-repas"
                          type="number"
                          value={repasForm.fibres}
                          onChange={(e) => setRepasForm(prev => ({...prev, fibres: e.target.value}))}
                          placeholder="Ex: 8"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Objectifs nutritionnels */}
                <div>
                  <Label>Objectifs nutritionnels</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {['prise de masse', 'sèche', 'récupération', 'énergétique', 'végétarien', 'végétalien'].map((objectif) => (
                      <div key={objectif} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`objectif-${objectif}`}
                          checked={repasForm.objectif_nutritionnel.includes(objectif)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setRepasForm(prev => ({
                                ...prev,
                                objectif_nutritionnel: [...prev.objectif_nutritionnel, objectif]
                              }));
                            } else {
                              setRepasForm(prev => ({
                                ...prev,
                                objectif_nutritionnel: prev.objectif_nutritionnel.filter(o => o !== objectif)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={`objectif-${objectif}`} className="text-sm">{objectif}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Composition */}
                <div>
                  <Label>Composition du repas</Label>
                  <div className="space-y-2 mt-2">
                    {repasForm.composition.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center p-2 border rounded">
                        <Input 
                          placeholder="Aliment"
                          value={item.aliment}
                          onChange={(e) => {
                            const newComposition = [...repasForm.composition];
                            newComposition[index].aliment = e.target.value;
                            setRepasForm(prev => ({ ...prev, composition: newComposition }));
                          }}
                        />
                        <Input 
                          placeholder="Quantité"
                          value={item.quantité}
                          onChange={(e) => {
                            const newComposition = [...repasForm.composition];
                            newComposition[index].quantité = e.target.value;
                            setRepasForm(prev => ({ ...prev, composition: newComposition }));
                          }}
                        />
                        <Input 
                          placeholder="Préparation"
                          value={item.préparation}
                          onChange={(e) => {
                            const newComposition = [...repasForm.composition];
                            newComposition[index].préparation = e.target.value;
                            setRepasForm(prev => ({ ...prev, composition: newComposition }));
                          }}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveFromArray('composition', index, 'repas')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      onClick={() => handleAddToArray('composition', 'nouvel aliment', 'repas')}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un aliment
                    </Button>
                  </div>
                </div>

                {/* Adaptations possibles */}
                <div>
                  <Label>Adaptations possibles</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {repasForm.adaptations_possibles.map((adaptation, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {adaptation}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0"
                          onClick={() => handleRemoveFromArray('adaptations_possibles', index, 'repas')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      placeholder="Ex: remplacer riz par patate douce"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddToArray('adaptations_possibles', e.currentTarget.value, 'repas');
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleAddToArray('adaptations_possibles', input.value, 'repas');
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
                    {repasForm.contre_indications.map((contre_indication, index) => (
                      <Badge key={index} variant="destructive" className="flex items-center gap-1">
                        {contre_indication}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0"
                          onClick={() => handleRemoveFromArray('contre_indications', index, 'repas')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      placeholder="Ex: allergie gluten, intolérance lactose"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddToArray('contre_indications', e.currentTarget.value, 'repas');
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleAddToArray('contre_indications', input.value, 'repas');
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
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
                  <span className="text-2xl">Ajouter un bloc entraînement</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Créer un nouveau bloc d'entraînement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nom-programme">Nom du bloc</Label>
                      <Input 
                        id="nom-programme"
                        value={programmeForm.nom}
                        onChange={(e) => setProgrammeForm(prev => ({...prev, nom: e.target.value}))}
                        placeholder="Ex: Full Body Débutant, Push Haut du Corps"
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

                    <div>
                      <Label htmlFor="durée_estimée">Durée estimée (minutes)</Label>
                      <Input 
                        id="durée_estimée"
                        type="number"
                        value={programmeForm.durée_estimée}
                        onChange={(e) => setProgrammeForm(prev => ({...prev, durée_estimée: e.target.value}))}
                        placeholder="Ex: 45"
                      />
                    </div>

                    <div>
                      <Label htmlFor="intensité">Intensité</Label>
                      <Select value={programmeForm.intensité} onValueChange={(value) => setProgrammeForm(prev => ({...prev, intensité: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez l'intensité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="faible">Faible</SelectItem>
                          <SelectItem value="modérée">Modérée</SelectItem>
                          <SelectItem value="élevée">Élevée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="recommandations">Recommandations</Label>
                      <Textarea 
                        id="recommandations"
                        value={programmeForm.recommandations}
                        onChange={(e) => setProgrammeForm(prev => ({...prev, recommandations: e.target.value}))}
                        placeholder="Ex: éviter si douleurs genoux, à faire 2x semaine"
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Objectifs */}
                    <div>
                      <Label>Objectifs</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {['prise de masse', 'perte de gras', 'endurance', 'tonification', 'mobilité', 'force'].map((obj) => (
                          <div key={obj} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`objectif-prog-${obj}`}
                              checked={programmeForm.objectif.includes(obj)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setProgrammeForm(prev => ({
                                    ...prev,
                                    objectif: [...prev.objectif, obj]
                                  }));
                                } else {
                                  setProgrammeForm(prev => ({
                                    ...prev,
                                    objectif: prev.objectif.filter(o => o !== obj)
                                  }));
                                }
                              }}
                            />
                            <Label htmlFor={`objectif-prog-${obj}`} className="text-sm">{obj}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Types */}
                    <div>
                      <Label>Types d'entraînement</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {['poids du corps', 'salle de sport', 'avec matériel maison', 'sans matériel'].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type}`}
                              checked={programmeForm.type.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setProgrammeForm(prev => ({
                                    ...prev,
                                    type: [...prev.type, type]
                                  }));
                                } else {
                                  setProgrammeForm(prev => ({
                                    ...prev,
                                    type: prev.type.filter(t => t !== type)
                                  }));
                                }
                              }}
                            />
                            <Label htmlFor={`type-${type}`} className="text-sm">{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Groupes musculaires */}
                <div>
                  <Label>Groupes musculaires ciblés</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {programmeForm.groupes_musculaires.map((groupe, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {groupe}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0"
                          onClick={() => handleRemoveFromArray('groupes_musculaires', index, 'programme')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      placeholder="Ex: pectoraux, quadriceps, fessiers"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddToArray('groupes_musculaires', e.currentTarget.value, 'programme');
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleAddToArray('groupes_musculaires', input.value, 'programme');
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Matériel nécessaire */}
                <div>
                  <Label>Matériel nécessaire</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {programmeForm.matériel_nécessaire.map((materiel, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {materiel}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0"
                          onClick={() => handleRemoveFromArray('matériel_nécessaire', index, 'programme')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      placeholder="Ex: haltères, bande élastique, aucun"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddToArray('matériel_nécessaire', e.currentTarget.value, 'programme');
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleAddToArray('matériel_nécessaire', input.value, 'programme');
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Structure */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Structure de l'entraînement</h3>
                  
                  {/* Échauffement */}
                  <div>
                    <Label>Échauffement</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {programmeForm.structure.échauffement.map((exercice, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {exercice}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0"
                            onClick={() => handleRemoveFromArray('structure.échauffement', index, 'programme')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        placeholder="Ex: 5 min tapis de course"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddToArray('structure.échauffement', e.currentTarget.value, 'programme');
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          handleAddToArray('structure.échauffement', input.value, 'programme');
                          input.value = '';
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Principal */}
                  <div>
                    <Label>Exercices principaux</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {programmeForm.structure.principal.map((exercice, index) => (
                        <Badge key={index} variant="default" className="flex items-center gap-1">
                          {exercice}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0"
                            onClick={() => handleRemoveFromArray('structure.principal', index, 'programme')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        placeholder="Ex: Squats 4x12"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddToArray('structure.principal', e.currentTarget.value, 'programme');
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          handleAddToArray('structure.principal', input.value, 'programme');
                          input.value = '';
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Finisher */}
                  <div>
                    <Label>Finisher (optionnel)</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {programmeForm.structure.finisher.map((exercice, index) => (
                        <Badge key={index} variant="destructive" className="flex items-center gap-1">
                          {exercice}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0"
                            onClick={() => handleRemoveFromArray('structure.finisher', index, 'programme')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        placeholder="Ex: Burpees 3x10"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddToArray('structure.finisher', e.currentTarget.value, 'programme');
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          handleAddToArray('structure.finisher', input.value, 'programme');
                          input.value = '';
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Récupération */}
                  <div>
                    <Label>Récupération</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {programmeForm.structure.récupération.map((exercice, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {exercice}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0"
                            onClick={() => handleRemoveFromArray('structure.récupération', index, 'programme')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        placeholder="Ex: Étirements 10 min"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddToArray('structure.récupération', e.currentTarget.value, 'programme');
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          handleAddToArray('structure.récupération', input.value, 'programme');
                          input.value = '';
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProgramme} className="gradient-secondary">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder le bloc
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