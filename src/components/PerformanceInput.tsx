import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Target, Calendar, Zap, Dumbbell, Clock, Activity } from 'lucide-react';

interface PerformanceInputProps {
  onPerformanceAdded: (performance: any) => void;
  user: any;
}

export const PerformanceInput: React.FC<PerformanceInputProps> = ({ onPerformanceAdded, user }) => {
  const [performance, setPerformance] = useState({
    discipline: '',
    value: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!performance.discipline || !performance.value) return;

    setIsAdding(true);
    
    const newPerformance = {
      id: Date.now().toString(),
      discipline: performance.discipline,
      value: parseFloat(performance.value),
      date: new Date(performance.date),
      userId: user?.id || '1'
    };

    // Simuler un délai pour l'effet visuel
    setTimeout(() => {
      onPerformanceAdded(newPerformance);
      setPerformance({
        discipline: '',
        value: '',
        date: new Date().toISOString().split('T')[0]
      });
      setIsAdding(false);
    }, 800);
  };

  const getDisciplineIcon = (discipline: string) => {
    switch (discipline) {
      case 'bench': return '💪';
      case 'squat': return '🏋️';
      case 'deadlift': return '⚡';
      case '5k': return '🏃';
      case 'pullups': return '🤸‍♂️';
      default: return '🎯';
    }
  };

  const getDisciplineName = (discipline: string) => {
    switch (discipline) {
      case 'bench': return 'Développé couché';
      case 'squat': return 'Squat';
      case 'deadlift': return 'Soulevé de terre';
      case '5k': return '5km';
      case 'pullups': return 'Tractions';
      default: return discipline;
    }
  };

  const getDisciplineUnit = (discipline: string) => {
    switch (discipline) {
      case '5k': return 'min';
      case 'pullups': return 'reps';
      default: return 'kg';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 border-0 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Target className="w-8 h-8" />
          Ajoutez vos performances
        </CardTitle>
        <p className="text-center text-white/90 text-lg">
          Entrez vos performances pour calculer votre rang réel
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          {/* Sélection de la discipline */}
          <div className="space-y-2">
            <Label className="text-white font-semibold text-lg">Discipline</Label>
            <Select
              value={performance.discipline}
              onValueChange={(value) => setPerformance({ ...performance, discipline: value })}
            >
              <SelectTrigger className="w-full h-12 text-lg font-semibold bg-white/90 border-0 shadow-lg">
                <SelectValue placeholder="Choisissez votre discipline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bench">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💪</span>
                    <span>Développé couché (kg)</span>
                  </div>
                </SelectItem>
                <SelectItem value="squat">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏋️</span>
                    <span>Squat (kg)</span>
                  </div>
                </SelectItem>
                <SelectItem value="deadlift">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <span>Soulevé de terre (kg)</span>
                  </div>
                </SelectItem>
                <SelectItem value="5k">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏃</span>
                    <span>5km (min)</span>
                  </div>
                </SelectItem>
                <SelectItem value="pullups">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤸‍♂️</span>
                    <span>Tractions (reps)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Valeur de la performance */}
          <div className="space-y-2">
            <Label className="text-white font-semibold text-lg">Performance</Label>
            <div className="relative">
              <Input
                type="number"
                value={performance.value}
                onChange={(e) => setPerformance({ ...performance, value: e.target.value })}
                className="w-full h-12 text-lg font-semibold bg-white/90 border-0 shadow-lg pr-16"
                placeholder="Entrez votre performance"
                step="0.1"
                required
              />
              {performance.discipline && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  {getDisciplineUnit(performance.discipline)}
                </div>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-white font-semibold text-lg">Date</Label>
            <Input
              type="date"
              value={performance.date}
              onChange={(e) => setPerformance({ ...performance, date: e.target.value })}
              className="w-full h-12 text-lg font-semibold bg-white/90 border-0 shadow-lg"
              required
            />
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            disabled={!performance.discipline || !performance.value || isAdding}
            className="w-full h-14 bg-white text-emerald-600 text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
                <span>Ajout en cours...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>AJOUTER MA PERFORMANCE</span>
              </div>
            )}
          </Button>
        </form>

        {/* Aperçu de la performance */}
        {performance.discipline && performance.value && (
          <div className="mt-6 p-4 bg-white/20 rounded-xl backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="text-lg font-semibold mb-2">Aperçu</div>
              <div className="text-2xl font-bold">
                {getDisciplineIcon(performance.discipline)} {getDisciplineName(performance.discipline)}
              </div>
              <div className="text-xl">
                {performance.value} {getDisciplineUnit(performance.discipline)}
              </div>
              <div className="text-sm opacity-80">
                {new Date(performance.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 