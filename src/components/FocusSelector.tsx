import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Target, Dumbbell, Zap } from 'lucide-react';
import { FocusArea, ForceFocus, FOCUS_AREAS, FORCE_FOCUS_OPTIONS } from '@/types/profile';

interface FocusSelectorProps {
  objectif: string;
  onFocusChange: (focus: FocusArea[], forceFocus: ForceFocus[]) => void;
  initialFocus?: FocusArea[];
  initialForceFocus?: ForceFocus[];
}

const FocusSelector: React.FC<FocusSelectorProps> = ({
  objectif,
  onFocusChange,
  initialFocus = [],
  initialForceFocus = []
}) => {
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>(initialFocus);
  const [forceFocus, setForceFocus] = useState<ForceFocus[]>(initialForceFocus);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const isMusculation = ['perte_poids', 'prise_masse', 'maintien'].includes(objectif);
  const isForce = ['force', 'powerlifting'].includes(objectif);

  useEffect(() => {
    if (isMusculation && focusAreas.length === 0) {
      // Initialiser avec les focus par défaut
      const defaultFocus = FOCUS_AREAS.map(area => ({ ...area, pourcentage: 0 }));
      setFocusAreas(defaultFocus);
    }
    if (isForce && forceFocus.length === 0) {
      setForceFocus(FORCE_FOCUS_OPTIONS);
    }
  }, [objectif, isMusculation, isForce]);

  const handleAreaToggle = (areaId: string) => {
    if (selectedAreas.includes(areaId)) {
      setSelectedAreas(selectedAreas.filter(id => id !== areaId));
      setFocusAreas(focusAreas.map(area => 
        area.id === areaId ? { ...area, pourcentage: 0 } : area
      ));
    } else {
      setSelectedAreas([...selectedAreas, areaId]);
    }
  };

  const handlePercentageChange = (areaId: string, value: number[]) => {
    const newPercentage = value[0];
    setFocusAreas(focusAreas.map(area => 
      area.id === areaId ? { ...area, pourcentage: newPercentage } : area
    ));
  };

  const handleForceFocusToggle = (focusId: string) => {
    setForceFocus(forceFocus.map(focus => 
      focus.id === focusId 
        ? { ...focus, priorite: focus.priorite === 0 ? 1 : 0 }
        : focus
    ));
  };

  const handleForceFocusPriority = (focusId: string, priority: number) => {
    setForceFocus(forceFocus.map(focus => 
      focus.id === focusId ? { ...focus, priorite: priority } : focus
    ));
  };

  const normalizePercentages = () => {
    const selectedAreasWithFocus = focusAreas.filter(area => 
      selectedAreas.includes(area.id) && area.pourcentage > 0
    );
    
    if (selectedAreasWithFocus.length === 0) return;

    const totalPercentage = selectedAreasWithFocus.reduce((sum, area) => sum + area.pourcentage, 0);
    
    if (totalPercentage > 100) {
      // Normaliser pour que la somme fasse 100%
      const factor = 100 / totalPercentage;
      setFocusAreas(focusAreas.map(area => 
        selectedAreas.includes(area.id) && area.pourcentage > 0
          ? { ...area, pourcentage: Math.round(area.pourcentage * factor) }
          : area
      ));
    }
  };

  useEffect(() => {
    normalizePercentages();
    onFocusChange(focusAreas, forceFocus);
  }, [focusAreas, forceFocus]);

  const getTotalPercentage = () => {
    return focusAreas
      .filter(area => selectedAreas.includes(area.id))
      .reduce((sum, area) => sum + area.pourcentage, 0);
  };

  const getAreaColor = (couleur: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[couleur as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (!isMusculation && !isForce) {
    return null;
  }

  return (
    <div className="space-y-6">
      {isMusculation && (
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-black text-xl">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              Focus d'entraînement
            </CardTitle>
            <p className="text-black font-medium">
              Sélectionnez les zones musculaires sur lesquelles vous voulez vous concentrer
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sélection des zones */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {FOCUS_AREAS.map((area) => {
                const isSelected = selectedAreas.includes(area.id);
                const areaData = focusAreas.find(a => a.id === area.id);
                
                return (
                  <div
                    key={area.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 shadow-lg' 
                        : 'bg-white border-slate-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleAreaToggle(area.id)}
                  >
                    <div className="text-center space-y-3">
                      <div className="text-3xl">{area.icone}</div>
                      <div className="font-bold text-black">{area.nom}</div>
                      {isSelected && (
                        <div className="space-y-2">
                          <div className="text-sm text-black">
                            {areaData?.pourcentage || 0}% de l'entraînement
                          </div>
                          <Slider
                            value={[areaData?.pourcentage || 0]}
                            onValueChange={(value) => handlePercentageChange(area.id, value)}
                            max={100}
                            step={5}
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Résumé des pourcentages */}
            {selectedAreas.length > 0 && (
              <div className="p-4 bg-white rounded-xl border-2 border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-black">Répartition de l'entraînement</span>
                  <Badge className={`${getTotalPercentage() === 100 ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'} border-2`}>
                    {getTotalPercentage()}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  {focusAreas
                    .filter(area => selectedAreas.includes(area.id) && area.pourcentage > 0)
                    .map((area) => (
                      <div key={area.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{area.icone}</span>
                          <span className="text-black font-medium">{area.nom}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500`}
                              style={{ width: `${area.pourcentage}%` }}
                            ></div>
                          </div>
                          <span className="text-black font-bold">{area.pourcentage}%</span>
                        </div>
                      </div>
                    ))}
                </div>
                {getTotalPercentage() !== 100 && (
                  <div className="mt-3 text-sm text-yellow-600 font-medium">
                    ⚠️ La somme doit faire 100% pour générer le programme
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isForce && (
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-black text-xl">
              <div className="p-2 bg-red-500 rounded-lg">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              Focus Force/Powerlifting
            </CardTitle>
            <p className="text-black font-medium">
              Sélectionnez les exercices de force sur lesquels vous voulez vous concentrer
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {FORCE_FOCUS_OPTIONS.map((focus) => {
              const focusData = forceFocus.find(f => f.id === focus.id);
              const isSelected = focusData?.priorite > 0;
              
              return (
                <div
                  key={focus.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-red-100 to-orange-100 border-red-300 shadow-lg' 
                      : 'bg-white border-slate-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">🏋️</div>
                      <div>
                        <div className="font-bold text-black text-lg">{focus.nom}</div>
                        <div className="text-sm text-black">{focus.objectif}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isSelected && (
                        <div className="flex gap-1">
                          {[1, 2, 3].map((priority) => (
                            <Button
                              key={priority}
                              size="sm"
                              variant={focusData?.priorite === priority ? "default" : "outline"}
                              onClick={() => handleForceFocusPriority(focus.id, priority)}
                              className="w-8 h-8 p-0"
                            >
                              {priority}
                            </Button>
                          ))}
                        </div>
                      )}
                      <Button
                        onClick={() => handleForceFocusToggle(focus.id)}
                        variant={isSelected ? "destructive" : "default"}
                        size="sm"
                      >
                        {isSelected ? 'Désélectionner' : 'Sélectionner'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FocusSelector; 