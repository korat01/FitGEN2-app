import React from 'react';
import { cn } from '@/lib/utils';

interface VitalForceLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

// Marque VitalForce : hexagone à facettes (même langage visuel que HexagonBadge)
// avec un chevron "V" gravé au centre. Rendu en SVG pour des bords nets à toute taille,
// contrairement à l'ancienne version en triangles CSS bruts.
export const VitalForceLogo: React.FC<VitalForceLogoProps> = ({
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
          ? 'drop-shadow(0 0 5px rgba(107, 42, 255, 0.7)) drop-shadow(0 0 5px rgba(0, 194, 255, 0.6))'
          : 'none',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id={`${gradientId}-outer`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B2AFF" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
          <linearGradient id={`${gradientId}-inner`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A1F3A" />
            <stop offset="100%" stopColor="#0D1020" />
          </linearGradient>
        </defs>

        {/* Hexagone extérieur — dégradé de marque */}
        <polygon
          points="50,0 100,25 100,75 50,100 0,75 0,25"
          fill={`url(#${gradientId}-outer)`}
        />

        {/* Hexagone intérieur — fond sombre pour l'effet "badge" */}
        <polygon
          points="50,9 91,29.5 91,70.5 50,91 9,70.5 9,29.5"
          fill={`url(#${gradientId}-inner)`}
        />

        {/* Chevron "V" central */}
        <path
          d="M32 34 L50 64 L68 34"
          stroke="white"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
