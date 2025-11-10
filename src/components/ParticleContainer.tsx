import React from 'react';
import { ParticleEffect } from './ParticleEffect';

interface ParticleInstance {
  id: number;
  x: number;
  y: number;
  type: 'click' | 'success' | 'levelup' | 'error';
}

interface ParticleContainerProps {
  particles: ParticleInstance[];
}

export const ParticleContainer: React.FC<ParticleContainerProps> = ({ particles }) => {
  return (
    <>
      {particles.map((particle) => (
        <ParticleEffect
          key={particle.id}
          x={particle.x}
          y={particle.y}
          type={particle.type}
        />
      ))}
    </>
  );
};
