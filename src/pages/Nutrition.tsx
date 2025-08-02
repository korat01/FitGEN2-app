import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressCircle } from "@/components/ProgressCircle";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllAliments, getAllRepas } from "@/utils/nutritionData";

interface Aliment {
  nom: string;
  categorie: string;
  calories: number;
  macros: { proteines: number; glucides: number; lipides: number };
  micronutriments: { vitamine: string; mineral: string; antioxydant: string };
  contreIndications: string[];
}

interface Repas {
  nom: string;
  type: string;
  calories: number;
  macros: { proteines: number; glucides: number; lipides: number };
  tempsPreparation: number;
  ingredients: string[];
  preparation: string[];
  indiceSatiete: number;
  adaptationsPossibles: string[];
  contreIndications: string[];
}
import { Separator } from "@/components/ui/separator";

const Nutrition = () => {
  const [savedAliments, setSavedAliments] = useState<Aliment[]>([]);
  const [savedRepas, setSavedRepas] = useState<Repas[]>([]);
  const [expandedRecipes, setExpandedRecipes] = useState<Set<string>>(new Set());
  const [showRepasForm, setShowRepasForm] = useState(false);

  // Form states
  const [newAliment, setNewAliment] = useState<Aliment>({
    nom: '',
    categorie: '',
    calories: 0,
    macros: { proteines: 0, glucides: 0, lipides: 0 },
    micronutriments: { vitamine: '', mineral: '', antioxydant: '' },
    contreIndications: []
  });

  const [newRepas, setNewRepas] = useState<Repas>({
    nom: '',
    type: '',
    calories: 0,
    macros: { proteines: 0, glucides: 0, lipides: 0 },
    tempsPreparation: 0,
    ingredients: [],
    preparation: [],
    indiceSatiete: 5,
    adaptationsPossibles: [],
    contreIndications: []
  });

  useEffect(() => {
    const savedAls = localStorage.getItem('savedAliments');
    const savedReps = localStorage.getItem('savedRepas');
    if (savedAls) setSavedAliments(JSON.parse(savedAls));
    if (savedReps) setSavedRepas(JSON.parse(savedReps));
  }, []);

  const saveToLocalStorage = (aliments: Aliment[], repas: Repas[]) => {
    localStorage.setItem('savedAliments', JSON.stringify(aliments));
    localStorage.setItem('savedRepas', JSON.stringify(repas));
  };

  const handleAddAliment = () => {
    if (newAliment.nom && newAliment.categorie && newAliment.calories > 0) {
      const updatedAliments = [...savedAliments, newAliment];
      setSavedAliments(updatedAliments);
      saveToLocalStorage(updatedAliments, savedRepas);
      setNewAliment({
        nom: '',
        categorie: '',
        calories: 0,
        macros: { proteines: 0, glucides: 0, lipides: 0 },
        micronutriments: { vitamine: '', mineral: '', antioxydant: '' },
        contreIndications: []
      });
    }
  };

  const handleAddRepas = () => {
    if (newRepas.nom && newRepas.type && newRepas.calories > 0) {
      const updatedRepas = [...savedRepas, newRepas];
      setSavedRepas(updatedRepas);
      saveToLocalStorage(savedAliments, updatedRepas);
      setNewRepas({
        nom: '',
        type: '',
        calories: 0,
        macros: { proteines: 0, glucides: 0, lipides: 0 },
        tempsPreparation: 0,
        ingredients: [],
        preparation: [],
        indiceSatiete: 5,
        adaptationsPossibles: [],
        contreIndications: []
      });
      setShowRepasForm(false);
    }
  };

  const handleDeleteAliment = (nom: string, categorie: string) => {
    const updatedAliments = savedAliments.filter(a => !(a.nom === nom && a.categorie === categorie));
    setSavedAliments(updatedAliments);
    saveToLocalStorage(updatedAliments, savedRepas);
  };

  const handleDeleteRepas = (nom: string, type: string) => {
    const updatedRepas = savedRepas.filter(r => !(r.nom === nom && r.type === type));
    setSavedRepas(updatedRepas);
    saveToLocalStorage(savedAliments, updatedRepas);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-sm font-medium text-primary mb-2">FITGEN</h2>
          <h1 className="text-2xl font-bold text-foreground">
            Your Nutrition Plan
          </h1>
        </div>

        {/* Nutrition Plan Cards */}
        <div className="space-y-4 mb-8">
          {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((mealType, index) => {
            const calories = [350, 600, 200, 450][index];
            const macros = [
              { p: 30, c: 45, f: 12 },
              { p: 42, c: 60, f: 18 },
              { p: 6, c: 8, f: 15 },
              { p: 35, c: 20, f: 22 }
            ][index];
            const mealImages = [
              "🥣", "🍽️", "🥜", "🍽️"
            ];

            return (
              <div key={mealType} className="fitgen-card-accent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center text-2xl">
                      {mealImages[index]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{mealType}</h3>
                      <div className="text-sm text-muted-foreground">
                        <span className="text-primary">P {macros.p}g</span>{" "}
                        <span className="text-primary">C {macros.c}g</span>{" "}
                        <span className="text-primary">F {macros.f}g</span>
                      </div>
                      <div className="text-accent font-semibold">{calories} kcal</div>
                    </div>
                  </div>
                  <ProgressCircle 
                    percentage={Math.floor(Math.random() * 40) + 60} 
                    size={60} 
                    value={calories}
                    showText={true}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Plan Button */}
        <div className="text-center mb-8">
          <Button 
            className="fitgen-button w-full"
            onClick={() => setShowRepasForm(!showRepasForm)}
          >
            View Full Plan
          </Button>
        </div>

        {/* Detailed Sections - Hidden by default, shown when "View Full Plan" is clicked */}
        {showRepasForm && (
          <>
            {/* Section Repas */}
            <Card className="mb-8 fitgen-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-foreground">
                  Mes Repas
                  <Button onClick={() => setShowRepasForm(!showRepasForm)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un repas
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Petit-déjeuner', 'Déjeuner', 'Dîner', 'Collation', 'Post-entraînement', 'Pré-entraînement'].map((type) => {
                    const repasOfType = [...savedRepas, ...getAllRepas()].filter(repas => (repas as any).type_de_repas === type || (repas as any).type === type);
                    if (repasOfType.length === 0) return null;

                    return (
                      <div key={type}>
                        <h4 className="text-lg font-semibold mb-3 text-primary">{type}</h4>
                        <div className="grid gap-4">
                          {repasOfType.slice(0, 3).map((repas, index) => (
                            <Card key={`${type}-${index}`} className="fitgen-card p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-lg text-foreground">{repas.nom}</h5>
                                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
                                    <div>📊 {(repas as any).calories_totales || (repas as any).calories} kcal</div>
                                    <div>⏱️ {(repas as any).temps_de_préparation || (repas as any).tempsPreparation} min</div>
                                    <div>🥩 P: {(repas as any).macros.protéines || (repas as any).macros.proteines}g</div>
                                    <div>🍞 G: {(repas as any).macros.glucides}g</div>
                                    <div>🥑 L: {(repas as any).macros.lipides}g</div>
                                    <div>😋 Satiété: {(repas as any).indice_satiété || (repas as any).indiceSatiete}/10</div>
                                  </div>
                                  
                                  <Collapsible>
                                    <CollapsibleTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="mt-2 p-0 h-auto font-normal text-primary hover:text-primary/80"
                                        onClick={() => {
                                          const key = `${type}-${index}`;
                                          const newExpanded = new Set(expandedRecipes);
                                          if (expandedRecipes.has(key)) {
                                            newExpanded.delete(key);
                                          } else {
                                            newExpanded.add(key);
                                          }
                                          setExpandedRecipes(newExpanded);
                                        }}
                                      >
                                        {expandedRecipes.has(`${type}-${index}`) ? (
                                          <>
                                            <ChevronDown className="h-4 w-4 mr-1" />
                                            Masquer la recette
                                          </>
                                        ) : (
                                          <>
                                            <ChevronRight className="h-4 w-4 mr-1" />
                                            Afficher la recette
                                          </>
                                        )}
                                      </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="space-y-3 mt-3">
                                      <div>
                                        <h6 className="font-medium text-sm mb-1 text-foreground">Ingrédients:</h6>
                                        <ul className="text-xs space-y-1 text-muted-foreground">
                                          {repas.ingredients.map((ingredient, i) => (
                                            <li key={i}>• {ingredient}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      
                                      <div>
                                        <h6 className="font-medium text-sm mb-1 text-foreground">Préparation:</h6>
                                        <ol className="text-xs space-y-1 text-muted-foreground">
                                          {repas.preparation.map((step, i) => (
                                            <li key={i}>{i + 1}. {step}</li>
                                          ))}
                                        </ol>
                                      </div>
                                      
                                      <div>
                                        <h6 className="font-medium text-sm mb-1 text-foreground">Temps de préparation:</h6>
                                        <p className="text-xs text-muted-foreground">{repas.tempsPreparation} minutes</p>
                                      </div>
                                      
                                      <div>
                                        <h6 className="font-medium text-sm mb-1 text-foreground">Indice de satiété:</h6>
                                        <p className="text-xs text-muted-foreground">{repas.indiceSatiete}/10</p>
                                      </div>
                                      
                                      {repas.adaptationsPossibles.length > 0 && (
                                        <div>
                                          <h6 className="font-medium text-sm mb-1 text-foreground">Adaptations possibles:</h6>
                                          <ul className="text-xs space-y-1 text-muted-foreground">
                                            {repas.adaptationsPossibles.map((adaptation, i) => (
                                              <li key={i}>• {adaptation}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </CollapsibleContent>
                                  </Collapsible>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Section Aliments */}
            <Card className="mb-8 fitgen-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-foreground">
                  Mes Aliments
                  <Button onClick={() => setShowRepasForm(!showRepasForm)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un aliment
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Protéines', 'Glucides', 'Lipides', 'Micronutriments'].map((categorie) => {
                    const alimentsOfCategory = [...savedAliments, ...getAllAliments()].filter(aliment => aliment.categorie === categorie);
                    if (alimentsOfCategory.length === 0) return null;

                    return (
                      <div key={categorie}>
                        <h4 className="text-lg font-semibold mb-3 text-primary">{categorie}</h4>
                        <div className="grid gap-4">
                          {alimentsOfCategory.slice(0, 5).map((aliment, index) => (
                            <Card key={`${categorie}-${index}`} className="fitgen-card p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-foreground">{aliment.nom}</h5>
                                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
                                    <div>📊 {aliment.calories} kcal/100g</div>
                                    <div>🥩 P: {aliment.macros.proteines}g</div>
                                    <div>🍞 G: {aliment.macros.glucides}g</div>
                                    <div>🥑 L: {aliment.macros.lipides}g</div>
                                  </div>
                                  {aliment.micronutriments.vitamine && (
                                    <div className="mt-2 text-xs text-muted-foreground">
                                      💊 {aliment.micronutriments.vitamine}
                                    </div>
                                  )}
                                </div>
                                
                                {savedAliments.some(saved => saved.nom === aliment.nom && saved.categorie === aliment.categorie) && (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteAliment(aliment.nom, aliment.categorie)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Nutrition;