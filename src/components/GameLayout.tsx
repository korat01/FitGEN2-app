import React, { useEffect } from 'react';
import { ParticleContainer } from './ParticleContainer';
import { CelebrationContainer } from './CelebrationContainer';
import { useParticles } from '@/hooks/useParticles';
import { useCelebration } from '@/hooks/useCelebration';
import { useSounds } from '@/utils/sounds';

interface GameLayoutProps {
  children: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  const { particles, spawnClickParticles } = useParticles();
  const { celebrations } = useCelebration();
  const { playClick } = useSounds();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Jouer le son de clic
      playClick();
      
      // Spawn particles on any click
      const syntheticEvent = {
        clientX: e.clientX,
        clientY: e.clientY,
      } as React.MouseEvent;
      
      spawnClickParticles(syntheticEvent);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [spawnClickParticles]);

  return (
    <>
      {children}
      <ParticleContainer particles={particles} />
      <CelebrationContainer celebrations={celebrations} />
    </>
  );
};
