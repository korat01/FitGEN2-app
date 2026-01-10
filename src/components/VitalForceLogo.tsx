import React from 'react';
import { cn } from '@/lib/utils';

interface VitalForceLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const VitalForceLogo: React.FC<VitalForceLogoProps> = ({
  size = 32,
  className,
  glow = true,
}) => {
  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      {/* Triangle gauche (Purple) */}
      <div
        className="absolute"
        style={{
          width: 0,
          height: 0,
          borderLeft: '0px solid transparent',
          borderRight: `${size * 0.25}px solid transparent`,
          borderBottom: `${size * 0.375}px solid #6B2AFF`,
          left: `${size * 0.125}px`,
          top: 0,
          transform: 'rotate(-15deg)',
          filter: glow ? 'drop-shadow(0 0 8px rgba(107, 42, 255, 0.8))' : 'none',
        }}
      />
      {/* Triangle droit (Cyan) */}
      <div
        className="absolute"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size * 0.25}px solid transparent`,
          borderRight: '0px solid transparent',
          borderBottom: `${size * 0.375}px solid #00C2FF`,
          right: `${size * 0.125}px`,
          top: 0,
          transform: 'rotate(15deg)',
          filter: glow ? 'drop-shadow(0 0 8px rgba(0, 194, 255, 0.8))' : 'none',
        }}
      />
    </div>
  );
};

