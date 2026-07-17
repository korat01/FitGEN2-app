import { useState, useCallback, useRef } from 'react';

interface ParticleInstance {
  id: number;
  x: number;
  y: number;
  type: 'click' | 'success' | 'levelup' | 'error';
}

const MAX_ACTIVE_PARTICLES = 8;

export const useParticles = () => {
  const [particles, setParticles] = useState<ParticleInstance[]>([]);
  const nextIdRef = useRef(0);
  const lastClickTsRef = useRef(0);

  const spawnParticles = useCallback(
    (x: number, y: number, type: 'click' | 'success' | 'levelup' | 'error' = 'click') => {
      if (typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const id = nextIdRef.current++;
      setParticles((prev) => {
        const next = [...prev, { id, x, y, type }];
        return next.length > MAX_ACTIVE_PARTICLES
          ? next.slice(next.length - MAX_ACTIVE_PARTICLES)
          : next;
      });

      window.setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 1800);
    },
    []
  );

  const spawnClickParticles = useCallback(
    (event: { clientX: number; clientY: number }) => {
      const now = performance.now();
      // Évite une rafale de particles à chaque re-render/clic rapide
      if (now - lastClickTsRef.current < 90) return;
      lastClickTsRef.current = now;
      spawnParticles(event.clientX, event.clientY, 'click');
    },
    [spawnParticles]
  );

  const spawnSuccessParticles = useCallback(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 'success');
    },
    [spawnParticles]
  );

  const spawnLevelUpParticles = useCallback(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 'levelup');
    },
    [spawnParticles]
  );

  const spawnErrorParticles = useCallback(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 'error');
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
