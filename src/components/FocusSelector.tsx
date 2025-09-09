import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Target, Zap } from 'lucide-react';
import { FocusArea } from '@/types/profile';

interface FocusSelectorProps {
  selectedFocus: FocusArea[];
  onFocusChange: (focus: FocusArea[]) => void;
}

const FocusSelector: React.FC<FocusSelectorProps> = ({
  selectedFocus,
  onFocusChange
}) => {
  const focusOptions: { value: FocusArea; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'bras', label: 'Bras', icon: <Dumbbell className="w-5 h-5" />, color: 'blue' },
    { value: 'fesses', label: 'Fesses', icon: <Target className="w-5 h-5" />, color: 'pink' },
    { value: 'jambes', label: 'Jambes', icon: <Zap className="w-5 h-5" />, color: 'green' },
    { value: 'dos', label: 'Dos', icon: <Dumbbell className="w-5 h-5" />, color: 'purple' },
    { value: 'pectoraux', label: 'Pectoraux', icon: <Target className="w-5 h-5" />, color: 'red' },
    { value: 'epaules', label: 'Épaules', icon: <Zap className="w-5 h-5" />, color: 'orange' },
    { value: 'abdos', label: 'Abdominaux', icon: <Dumbbell className="w-5 h-5" />, color: 'yellow' }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = "h-16 text-base font-semibold transition-all duration-200 border-2 rounded-lg ";
    
    if (isSelected) {
      const selectedClasses = {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
        pink: 'bg-pink-600 hover:bg-pink-700 text-white border-pink-600',
        green: 'bg-green-600 hover:bg-green-700 text-white border-green-600',
        purple: 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600',
        red: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
        orange: 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600',
        yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600'
      };
      return baseClasses + selectedClasses[color as keyof typeof selectedClasses];
    } else {
      const unselectedClasses = {
        blue: 'border-blue-300 text-blue-700 hover:bg-blue-50 bg-white',
        pink: 'border-pink-300 text-pink-700 hover:bg-pink-50 bg-white',
        green: 'border-green-300 text-green-700 hover:bg-green-50 bg-white',
        purple: 'border-purple-300 text-purple-700 hover:bg-purple-50 bg-white',
        red: 'border-red-300 text-red-700 hover:bg-red-50 bg-white',
        orange: 'border-orange-300 text-orange-700 hover:bg-orange-50 bg-white',
        yellow: 'border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-white'
      };
      return baseClasses + unselectedClasses[color as keyof typeof unselectedClasses];
    }
  };

  const handleFocusToggle = (focus: FocusArea) => {
    const newFocus = selectedFocus.includes(focus)
      ? selectedFocus.filter(f => f !== focus)
      : [...selectedFocus, focus];
    onFocusChange(newFocus);
  };

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Sélectionnez vos zones de focus</CardTitle>
        <p className="text-gray-600 text-base">Choisissez les parties du corps que vous souhaitez développer en priorité</p>
      </CardHeader>
      <CardContent className="bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {focusOptions.map((option) => {
            const isSelected = selectedFocus.includes(option.value);
            return (
              <Button
                key={option.value}
                variant={isSelected ? "default" : "outline"}
                onClick={() => handleFocusToggle(option.value)}
                className={getColorClasses(option.color, isSelected)}
              >
                <div className="flex flex-col items-center gap-2">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </Button>
            );
          })}
        </div>
        
        {selectedFocus.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <p className="text-base font-semibold text-gray-700 mb-3">Zones sélectionnées :</p>
            <div className="flex flex-wrap gap-2">
              {selectedFocus.map((focus) => {
                const option = focusOptions.find(opt => opt.value === focus);
                return (
                  <span
                    key={focus}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      option ? getColorClasses(option.color, true) : 'bg-gray-600 text-white'
                    }`}
                  >
                    {option?.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FocusSelector; 