import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SelectableTileProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  selected: boolean;
  onClick?: () => void;
  /** Tailwind gradient stops, ex: "from-primary to-secondary" — utilisé pour l'icône + le check quand sélectionné. */
  gradient?: string;
  /** Classe de bordure Tailwind complète (ex: "border-red-500/40") appliquée quand sélectionné, à la place du violet par défaut. */
  borderClass?: string;
  layout?: 'vertical' | 'horizontal';
  disabled?: boolean;
}

const DEFAULT_GRADIENT = 'from-primary to-secondary';

export const SelectableTile: React.FC<SelectableTileProps> = ({
  icon,
  label,
  description,
  selected,
  onClick,
  gradient = DEFAULT_GRADIENT,
  borderClass,
  layout = 'vertical',
  disabled = false,
}) => {
  const interactive = !disabled && !!onClick;

  const checkbox = (
    <div
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0 ${
        selected ? `bg-gradient-to-r ${gradient} border-transparent` : 'border-white/15 group-hover:border-white/30'
      }`}
    >
      {selected && <CheckCircle className="w-4 h-4 text-white" />}
    </div>
  );

  const iconBadge = (
    <div
      className={`rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-300 shrink-0 ${
        layout === 'vertical' ? 'w-12 h-12' : 'w-12 h-12'
      } ${selected ? `bg-gradient-to-br ${gradient}` : 'bg-white/10 group-hover:bg-white/15'}`}
    >
      {icon}
    </div>
  );

  const baseClass = `rounded-2xl border-2 transition-all duration-200 ${interactive ? 'cursor-pointer group' : ''} ${
    selected
      ? `bg-white/[0.06] ${borderClass || 'border-primary/40'} shadow-[0_0_20px_hsl(var(--primary)/0.12)]`
      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
  }`;

  if (layout === 'horizontal') {
    return (
      <div className={`${baseClass} p-4 md:p-5`} onClick={interactive ? onClick : undefined}>
        <div className="flex items-center gap-4">
          {iconBadge}
          <div className="flex-1 min-w-0">
            <h5 className={`font-semibold truncate ${selected ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</h5>
            {description && <p className="text-sm text-muted-foreground truncate">{description}</p>}
          </div>
          {checkbox}
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClass} p-3 md:p-4`} onClick={interactive ? onClick : undefined}>
      <div className="flex flex-col items-center text-center gap-2">
        {iconBadge}
        <span className={`font-semibold text-sm md:text-base truncate w-full ${selected ? 'text-foreground' : 'text-muted-foreground'}`}>
          {label}
        </span>
        {checkbox}
      </div>
    </div>
  );
};

export default SelectableTile;
