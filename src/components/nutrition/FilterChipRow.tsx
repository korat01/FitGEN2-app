import React from 'react';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

export interface FilterChipOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface FilterChipRowProps {
  filters: FilterChipOption[];
  selected: string;
  onSelect: (value: string) => void;
}

// Ligne de filtres par pastille — utilisée identiquement pour les filtres aliments et repas.
export const FilterChipRow: React.FC<FilterChipRowProps> = ({ filters, selected, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {filters.map((filter) => (
      <Button
        key={filter.value}
        variant={selected === filter.value ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelect(filter.value)}
        className={`flex items-center gap-2 ${
          selected === filter.value
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'border-white/10 hover:border-white/15 glass-card border-primary/20 text-foreground/90'
        }`}
      >
        <filter.icon className="h-4 w-4" />
        {filter.label}
      </Button>
    ))}
  </div>
);

export default FilterChipRow;
