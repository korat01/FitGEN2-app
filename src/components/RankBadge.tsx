import React from 'react';
import { cn } from '@/lib/utils';
import { getRankColors } from '@/config/rankTheme';
import { RankBadgeAura } from './RankBadgeAura';

import rankE from '@/assets/ranks/e.png';
import rankD from '@/assets/ranks/d.png';
import rankC from '@/assets/ranks/c.png';
import rankB from '@/assets/ranks/b.png';
import rankA from '@/assets/ranks/a.png';
import rankS from '@/assets/ranks/s.png';
import rankNation from '@/assets/ranks/nation.png';
import rankWorld from '@/assets/ranks/world.png';

export type RankLevel = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Nation' | 'World';

interface RankBadgeProps {
  rank: RankLevel | string;
  /** Si fourni, affiche une petite bulle avec le niveau, accrochée sous le badge. */
  level?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-14 h-14',
  md: 'w-20 h-20',
  lg: 'w-28 h-28',
  xl: 'w-36 h-36',
};

const bubbleClasses = {
  sm: 'w-5 h-5 text-[10px] -mt-2 border',
  md: 'w-7 h-7 text-xs -mt-3 border-2',
  lg: 'w-9 h-9 text-sm -mt-4 border-2',
  xl: 'w-11 h-11 text-base -mt-5 border-2',
};

const RANK_LABELS: Record<RankLevel, string> = {
  E: 'Rang E',
  D: 'Rang D',
  C: 'Rang C',
  B: 'Rang B',
  A: 'Rang A',
  S: 'Rang S',
  Nation: 'Rang SS (Nation)',
  World: 'Rang SSS (World)',
};

const RANK_SRC: Record<RankLevel, string> = {
  E: rankE,
  D: rankD,
  C: rankC,
  B: rankB,
  A: rankA,
  S: rankS,
  Nation: rankNation,
  World: rankWorld,
};

export const RankBadge: React.FC<RankBadgeProps> = ({ rank, level, size = 'md', animated = true, className }) => {
  const key = (rank in RANK_SRC ? rank : 'D') as RankLevel;
  const src = RANK_SRC[key];
  const label = RANK_LABELS[key];
  const { primary, secondary } = getRankColors(key);

  return (
    <div className={cn('relative inline-flex flex-col items-center', className)}>
      <div
        className={cn('relative flex items-center justify-center', sizeClasses[size], animated && 'animate-badge-breathe')}
        style={{ filter: `drop-shadow(0 0 12px ${secondary}99)` }}
        title={label}
      >
        {animated && <RankBadgeAura rank={key} size={size} />}
        <img
          src={src}
          alt={label}
          className="relative w-full h-full object-contain select-none"
          style={{ zIndex: 2 }}
          draggable={false}
        />
      </div>

      {level != null && (
        <div
          className={cn(
            'relative z-10 flex items-center justify-center rounded-full font-bold text-white shadow-md',
            bubbleClasses[size]
          )}
          style={{
            background: `linear-gradient(180deg, ${primary} 0%, #0b0e1a 120%)`,
            borderColor: secondary,
          }}
          title={`Niveau ${level}`}
        >
          {level}
        </div>
      )}
    </div>
  );
};

export default RankBadge;
