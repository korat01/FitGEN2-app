import React from 'react';
import { FocusArea } from '@/types/profile';
import { Dumbbell, Check } from 'lucide-react';

interface FocusSelectorProps {
  selectedFocus: FocusArea[];
  onFocusChange: (focus: FocusArea[]) => void;
}

const FocusSelector: React.FC<FocusSelectorProps> = ({
  selectedFocus,
  onFocusChange
}) => {
  const focusOptions: { value: FocusArea; label: string; icon: string; color: string }[] = [
    { value: 'bras', label: 'Bras', icon: '💪', color: 'from-blue-500 to-cyan-500' },
    { value: 'fesses', label: 'Fesses', icon: '🍑', color: 'from-pink-500 to-rose-500' },
    { value: 'jambes', label: 'Jambes', icon: '🦵', color: 'from-green-500 to-emerald-500' },
    { value: 'dos', label: 'Dos', icon: '🏋️', color: 'from-purple-500 to-violet-500' },
    { value: 'pecs', label: 'Pectoraux', icon: '💪', color: 'from-orange-500 to-red-500' },
    { value: 'epaules', label: 'Épaules', icon: '🤼‍♂️', color: 'from-yellow-500 to-orange-500' },
    { value: 'abdos', label: 'Abdominaux', icon: '💪', color: 'from-red-500 to-pink-500' }
  ];

  const handleFocusToggle = (focus: FocusArea) => {
    if (selectedFocus.includes(focus)) {
      onFocusChange(selectedFocus.filter(f => f !== focus));
    } else {
      onFocusChange([...selectedFocus, focus]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-600 mb-6">
        Sélectionnez les zones musculaires que vous souhaitez développer en priorité
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {focusOptions.map((option) => {
          const isSelected = selectedFocus.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => handleFocusToggle(option.value)}
              className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg transform scale-105`
                  : 'bg-white text-black border-gray-300 hover:border-purple-500 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="text-lg font-semibold">{option.label}</div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-purple-600" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {selectedFocus.length > 0 && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Focus sélectionnés :</strong> {selectedFocus.map(f => focusOptions.find(o => o.value === f)?.label).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default FocusSelector; 