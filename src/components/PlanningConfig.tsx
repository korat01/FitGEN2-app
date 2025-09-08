import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  Calendar, 
  Dumbbell, 
  Clock,
  Save,
  CheckCircle
} from 'lucide-react';

interface PlanningConfigProps {
  selectedDays: string[];
  onDaysChange: (days: string[]) => void;
  onDurationChange: (months: number) => void;
  onGeneratePlanning: () => void;
}

const PlanningConfig: React.FC<PlanningConfigProps> = ({
  selectedDays,
  onDaysChange,
  onDurationChange,
  onGeneratePlanning
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDays, setTempDays] = useState(selectedDays);
  const [duration, setDuration] = useState(3);

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const handleDayToggle = (day: string) => {
    if (tempDays.includes(day)) {
      setTempDays(tempDays.filter(d => d !== day));
    } else {
      setTempDays([...tempDays, day]);
    }
  };

  const handleSave = () => {
    onDaysChange(tempDays);
    onDurationChange(duration);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDays(selectedDays);
    setIsEditing(false);
  };

  const handleGenerate = () => {
    onGeneratePlanning();
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
          <div className="bg-violet-100 rounded-full p-2">
            <Settings className="h-6 w-6 text-violet-600" />
          </div>
          Configuration du planning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Jours d'entraînement */}
          <div>
            <Label className="text-lg font-semibold text-slate-700 mb-3 block">
              Jours d'entraînement sélectionnés
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {days.map(day => {
                const isSelected = isEditing ? tempDays.includes(day) : selectedDays.includes(day);
                
                return (
                  <Button
                    key={day}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-16 flex flex-col items-center justify-center gap-1 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white' 
                        : 'border-2 border-slate-300 hover:border-slate-400'
                    }`}
                    onClick={isEditing ? () => handleDayToggle(day) : undefined}
                    disabled={!isEditing}
                  >
                    <span className="text-sm font-medium">{day}</span>
                    {isSelected && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Durée du planning */}
          <div>
            <Label htmlFor="duration" className="text-lg font-semibold text-slate-700 mb-3 block">
              Durée du planning (mois)
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="duration"
                type="number"
                min="1"
                max="12"
                value={isEditing ? duration : duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-20"
                disabled={!isEditing}
              />
              <span className="text-slate-600">
                {duration === 1 ? 'mois' : 'mois'} de planning
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Le planning sera généré pour les {duration} prochains mois
            </p>
          </div>

          {/* Résumé */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2">Résumé du planning</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>• Jours d'entraînement : {isEditing ? tempDays.length : selectedDays.length} par semaine</p>
              <p>• Durée : {duration} {duration === 1 ? 'mois' : 'mois'}</p>
              <p>• Total des séances : {(isEditing ? tempDays.length : selectedDays.length) * duration * 4} séances</p>
              <p>• Jours de repos : {7 - (isEditing ? tempDays.length : selectedDays.length)} par semaine</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {!isEditing ? (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                className="border-2 border-slate-300 hover:border-slate-400"
              >
                <Settings className="h-4 w-4 mr-2" />
                Modifier la configuration
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="border-2 border-slate-300 hover:border-slate-400"
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </>
            )}
            
            <Button 
              onClick={handleGenerate}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold"
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              Générer le planning
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanningConfig; 