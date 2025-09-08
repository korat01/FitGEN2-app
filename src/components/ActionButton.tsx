import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  name: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan';
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  name,
  icon: Icon,
  color,
  onClick,
  disabled = false
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300',
    green: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 hover:border-emerald-300',
    purple: 'text-violet-600 bg-violet-50 hover:bg-violet-100 border-violet-200 hover:border-violet-300',
    orange: 'text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-200 hover:border-amber-300',
    pink: 'text-pink-600 bg-pink-50 hover:bg-pink-100 border-pink-200 hover:border-pink-300',
    cyan: 'text-cyan-600 bg-cyan-50 hover:bg-cyan-100 border-cyan-200 hover:border-cyan-300'
  };

  return (
    <Button
      variant="outline"
      className={`h-28 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 ${colorClasses[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-8 w-8" />
      <span className="text-sm font-semibold">{name}</span>
    </Button>
  );
};

export default ActionButton; 