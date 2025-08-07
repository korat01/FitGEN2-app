import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  UtensilsCrossed, 
  Apple, 
  Calendar, 
  ShoppingCart, 
  Plus,
  Search,
  Filter,
  Trash2,
  Download,
  ChefHat,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAliments, getRepas, getAllAliments, getAllRepas, deleteAliment, deleteRepas, generateShoppingList, getMenus } from '@/utils/nutritionData';
import type { AlimentBlock, RepasBlock } from '@/utils/nutritionData';
import { useToast } from '@/hooks/use-toast';

const Nutrition = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState('repas-types');
  const [aliments, setAliments] = useState<AlimentBlock[]>([]);
  const [repas, setRepas] = useState<RepasBlock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRecipes, setExpandedRecipes] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAliments(getAllAliments());
    setRepas(getAllRepas());
  };

  const handleDeleteAliment = (id: string) => {
    deleteAliment(id);
    loadData();
    toast({
      title: t('toast.food.deleted'),
      description: t('toast.food.deleted.desc')
    });
  };

  const handleDeleteRepas = (id: string) => {
    deleteRepas(id);
    loadData();
    toast({
      title: t('toast.meal.deleted'), 
      description: t('toast.meal.deleted.desc')
    });
  };

  const toggleRecipe = (repasId: string) => {
    const newExpanded = new Set(expandedRecipes);
    if (newExpanded.has(repasId)) {
      newExpanded.delete(repasId);
    } else {
      newExpanded.add(repasId);
    }
    setExpandedRecipes(newExpanded);
  };

  const generateShoppingListAction = () => {
    const menus = getMenus();
    const shoppingList = generateShoppingList(menus);
    
    // Créer un fichier texte de la liste
    let listText = "LISTE DE COURSES\n=================\n\n";
    Object.entries(shoppingList).forEach(([category, items]) => {
      listText += `${category.toUpperCase()}\n`;
      listText += "─".repeat(category.length) + "\n";
      items.forEach(item => {
        listText += `• ${item}\n`;
      });
      listText += "\n";
    });
    
    // Télécharger le fichier
    const blob = new Blob([listText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liste-courses-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: t('toast.shopping.generated'),
      description: t('toast.shopping.downloaded')
    });
  };

  const filteredAliments = aliments.filter(aliment =>
    aliment.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aliment.catégorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRepas = repas.filter(repas =>
    repas.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repas.type_de_repas.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <UtensilsCrossed className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('page.title.nutrition')}
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  {t('page.subtitle.nutrition')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-14 p-1 gradient-card shadow-card">
            <TabsTrigger 
              value="repas-types" 
              className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
            >
              <UtensilsCrossed className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tab.meals')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mes-aliments" 
              className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
            >
              <Apple className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tab.foods')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="menu-jour" 
              className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tab.menu')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="liste-courses" 
              className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tab.shopping')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Onglet Repas Types */}
          <TabsContent value="repas-types" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary rounded-t-lg"></div>
                <CardTitle className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 gradient-primary rounded-lg">
                      <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-2xl">{t('card.meals.title')}</span>
                  </div>
                  <Button className="gradient-primary hover:gradient-accent transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('btn.new.meal')}
                  </Button>
                </CardTitle>
                <CardDescription className="text-base">
                  {t('card.meals.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder={t('search.meal')} 
                      className="h-12 pl-10"
                    />
                  </div>
                  <Button variant="outline" className="h-12 px-6">
                    <Filter className="h-4 w-4 mr-2" />
                    {t('btn.filters')}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRepas.length > 0 ? (
                    filteredRepas.map((repas) => (
                      <Card key={repas.id} className="hover-lift border border-border/50">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{repas.nom}</CardTitle>
                              <CardDescription>{repas.type_de_repas}</CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteRepas(repas.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {repas.objectif_nutritionnel.map((objectif) => (
                              <Badge key={objectif} variant="secondary" className="text-xs">
                                {objectif}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                            <div className="text-center">
                              <div className="font-semibold text-primary">{repas.calories_totales}</div>
                              <div className="text-muted-foreground">{t('nutrition.calories')}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-accent">{repas.macros.protéines}g</div>
                              <div className="text-muted-foreground">{t('nutrition.proteins')}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-secondary">{repas.macros.glucides}g</div>
                              <div className="text-muted-foreground">{t('nutrition.carbs')}</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => toggleRecipe(repas.id)}
                            >
                              <ChefHat className="h-4 w-4 mr-2" />
                              {expandedRecipes.has(repas.id) ? (
                                <>
                                  {t('btn.hide.recipe')}
                                  <ChevronUp className="h-4 w-4 ml-2" />
                                </>
                              ) : (
                                <>
                                  {t('btn.show.recipe')}
                                  <ChevronDown className="h-4 w-4 ml-2" />
                                </>
                              )}
                            </Button>
                            <Button variant="default" size="sm">
                              {t('btn.add.menu')}
                            </Button>
                          </div>
                          
                          {/* Recette détaillée */}
                          {expandedRecipes.has(repas.id) && (
                            <div className="mt-4 p-4 gradient-subtle rounded-lg border border-border/50 animate-fade-in">
                              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                <ChefHat className="h-4 w-4 mr-2 text-primary" />
                                {t('nutrition.recipe')}
                              </h4>
                              
                              {/* Composition */}
                              <div className="mb-4">
                                <h5 className="font-medium text-sm text-muted-foreground mb-2">{t('nutrition.ingredients')}</h5>
                                <div className="space-y-1">
                                  {repas.composition.map((ingredient, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                      <span className="text-foreground">{ingredient.aliment}</span>
                                      <span className="text-muted-foreground font-medium">{ingredient.quantité}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Préparation */}
                              <div className="mb-4">
                                <h5 className="font-medium text-sm text-muted-foreground mb-2">{t('nutrition.preparation')}</h5>
                                <div className="space-y-1">
                                  {repas.composition.map((ingredient, idx) => (
                                    <div key={idx} className="text-sm text-foreground">
                                      <span className="font-medium">{ingredient.aliment}:</span> {ingredient.préparation}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Infos supplémentaires */}
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <span className="text-muted-foreground">{t('nutrition.prep.time')}</span>
                                  <div className="font-medium text-primary">{repas.temps_de_préparation} min</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">{t('nutrition.satiety')}</span>
                                  <div className="font-medium text-accent capitalize">{repas.indice_satiété}</div>
                                </div>
                              </div>
                              
                              {/* Adaptations possibles */}
                              {repas.adaptations_possibles.length > 0 && (
                                <div className="mt-3">
                                  <h5 className="font-medium text-xs text-muted-foreground mb-1">{t('nutrition.adaptations')}</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {repas.adaptations_possibles.map((adaptation, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {adaptation}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <UtensilsCrossed className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                      <p className="text-lg font-medium text-foreground mb-2">{t('msg.no.meals')}</p>
                      <p className="text-muted-foreground">{t('msg.create.meals')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Mes Aliments */}
          <TabsContent value="mes-aliments" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-accent rounded-t-lg"></div>
                <CardTitle className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 gradient-accent rounded-lg">
                      <Apple className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <span className="text-2xl">{t('card.foods.title')}</span>
                  </div>
                  <Button className="gradient-accent hover:gradient-primary transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('btn.add.food')}
                  </Button>
                </CardTitle>
                <CardDescription className="text-base">
                  {t('card.foods.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder={t('search.food')} 
                      className="h-12 pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="h-12 px-6">
                    <Filter className="h-4 w-4 mr-2" />
                    {t('btn.filters')}
                  </Button>
                </div>

                {filteredAliments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAliments.map((aliment) => (
                      <Card key={aliment.id} className="hover-lift border border-border/50">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{aliment.nom}</CardTitle>
                              <CardDescription>{aliment.catégorie}</CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteAliment(aliment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {aliment.classes_nutritionnelles.slice(0, 2).map((classe) => (
                              <Badge key={classe} variant="secondary" className="text-xs">
                                {classe}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                            <div className="text-center">
                              <div className="font-semibold text-primary">{aliment.calories}</div>
                              <div className="text-muted-foreground">{t('nutrition.calories')}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-accent">{aliment.macros.protéines}g</div>
                              <div className="text-muted-foreground">{t('nutrition.proteins')}</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {aliment.quantité_standard}
                          </p>
                          <Button variant="outline" className="w-full">
                            Ajouter à un repas
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 gradient-accent rounded-full blur-xl opacity-20"></div>
                      <Apple className="relative h-16 w-16 mx-auto text-accent" />
                    </div>
                    <p className="text-lg font-medium text-foreground mb-2">
                      {searchTerm ? t('msg.no.foods') : t('msg.create.foods')}
                    </p>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm ? t('msg.try.search') : t('msg.add.foods.desc')}
                    </p>
                    {!searchTerm && (
                      <Button className="gradient-accent hover:gradient-primary transition-all duration-300">
                        <Plus className="h-4 w-4 mr-2" />
                        Créer mon premier aliment
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Menu du Jour */}
          <TabsContent value="menu-jour" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary rounded-t-lg"></div>
                <CardTitle className="flex items-center space-x-3 mt-2">
                  <div className="p-2 gradient-primary rounded-lg">
                    <Calendar className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-2xl">Menu du jour</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Planifiez et suivez vos repas quotidiens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Petit-déjeuner */}
                  <Card className="border border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>🌅</span>
                        <span>Petit-déjeuner</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter un repas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Déjeuner */}
                  <Card className="border border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>☀️</span>
                        <span>Déjeuner</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter un repas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Dîner */}
                  <Card className="border border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>🌙</span>
                        <span>Dîner</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter un repas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Collations */}
                  <Card className="border border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>🍎</span>
                        <span>Collations</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter une collation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Résumé nutritionnel */}
                <Card className="mt-6 border border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Résumé nutritionnel du jour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Calories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">0g</div>
                        <div className="text-sm text-muted-foreground">Protéines</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">0g</div>
                        <div className="text-sm text-muted-foreground">Glucides</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-destructive">0g</div>
                        <div className="text-sm text-muted-foreground">Lipides</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Liste de Courses */}
          <TabsContent value="liste-courses" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-secondary rounded-t-lg"></div>
                <CardTitle className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 gradient-secondary rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <span className="text-2xl">Liste de courses</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      onClick={generateShoppingListAction}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Générer et télécharger
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="text-base">
                  Liste générée automatiquement depuis vos menus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Instructions */}
                  <div className="bg-card/50 rounded-lg p-4 border border-border/20">
                    <h3 className="font-semibold mb-2">Comment ça marche ?</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>1. Ajoutez des repas à votre menu du jour</li>
                      <li>2. Cliquez sur "Générer et télécharger" pour créer automatiquement votre liste</li>
                      <li>3. La liste sera organisée par catégories d'aliments</li>
                    </ul>
                  </div>

                  {/* Aperçu des catégories */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Protéines', 'Féculents', 'Légumes', 'Fruits', 'Matières grasses', 'Autres'].map((category) => (
                      <Card key={category} className="text-center p-4 border border-border/50">
                        <div className="text-sm font-medium text-muted-foreground">{category}</div>
                        <div className="text-xs text-muted-foreground/70 mt-1">0 items</div>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center py-8">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 gradient-secondary rounded-full blur-xl opacity-20"></div>
                      <ShoppingCart className="relative h-16 w-16 mx-auto text-secondary" />
                    </div>
                    <p className="text-lg font-medium text-foreground mb-2">Liste de courses intelligente</p>
                    <p className="text-muted-foreground mb-6">Organisée automatiquement par catégories</p>
                    <Button 
                      className="gradient-secondary hover:gradient-primary transition-all duration-300"
                      onClick={generateShoppingListAction}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger la liste
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Nutrition;