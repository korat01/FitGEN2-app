import React from 'react';
import { cn } from '@/lib/utils';

interface AscendLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

// Marque Ascend : trois barres ascendantes (progression de rang) dans un carré arrondi
// à la manière d'une icône d'app iOS — glyphe unique, plat, sans texte, lisible en tout petit
// (nav mobile) comme en grand (icône d'app). Le dégradé suit --primary/--secondary, donc la
// marque se reteinte automatiquement en Hunter Mode pour les rangs S/Nation/World.
export const AscendLogo: React.FC<AscendLogoProps> = ({
  size = 32,
  className,
  glow = true,
}) => {
  const gradientId = React.useId();

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{
        width: size,
        height: size,
        filter: glow
          ? 'drop-shadow(0 0 5px hsl(var(--primary) / 0.7)) drop-shadow(0 0 5px hsl(var(--secondary) / 0.6))'
          : 'none',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id={`${gradientId}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="100" height="100" rx="22" fill={`url(#${gradientId}-bg)`} />

        {/* Trois barres, hauteur croissante -> lecture immédiate "progression / ascension" */}
        <rect x="28" y="51" width="11" height="21" rx="5.5" fill="white" />
        <rect x="44.5" y="39" width="11" height="33" rx="5.5" fill="white" />
        <rect x="61" y="27" width="11" height="45" rx="5.5" fill="white" />
      </svg>
    </div>
  );
};

export default AscendLogo;
