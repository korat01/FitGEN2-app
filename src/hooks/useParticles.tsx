import { useState, useCallback } from 'react';

interface ParticleInstance {
  id: number;
  x: number;
  y: number;
  type: 'click' | 'success' | 'levelup' | 'error';
}

export const useParticles = () => {
  const [particles, setParticles] = useState<ParticleInstance[]>([]);
  const [nextId, setNextId] = useState(0);

  const spawnParticles = useCallback(
    (x: number, y: number, type: 'click' | 'success' | 'levelup' | 'error' = 'click') => {
      const id = nextId;
      setNextId(id + 1);
      
      setParticles((prev) => [...prev, { id, x, y, type }]);

      // Auto-remove after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 2500);
    },
    [nextId]
  );

  const spawnClickParticles = useCallback(
    (event: React.MouseEvent) => {
      spawnParticles(event.clientX, event.clientY, 'click');
    },
    [spawnParticles]
  );

  const spawnSuccessParticles = useCallback(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      spawnParticles(x, y, 'success');
    },
    [spawnParticles]
  );

  const spawnLevelUpParticles = useCallback(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      spawnParticles(x, y, 'levelup');
    },
    [spawnParticles]
  );

  const spawnErrorParticles = useCallback(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      spawnParticles(x, y, 'error');
    },
    [spawnParticles]
  );

  return {
    particles,
    spawnParticles,
    spawnClickParticles,
    spawnSuccessParticles,
    spawnLevelUpParticles,
    spawnErrorParticles,
  };
};
