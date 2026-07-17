import { useState, useCallback, useRef } from 'react';
import { Achievement } from '@/types/stats';

interface CelebrationInstance {
  id: number;
  achievement: Achievement;
}

export const useCelebration = () => {
  const [celebrations, setCelebrations] = useState<CelebrationInstance[]>([]);
  const nextIdRef = useRef(0);

  const celebrate = useCallback((achievement: Achievement) => {
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const id = nextIdRef.current++;
    setCelebrations((prev) => [...prev, { id, achievement }]);

    window.setTimeout(() => {
      setCelebrations((prev) => prev.filter((c) => c.id !== id));
    }, 4800);
  }, []);

  const removeCelebration = useCallback((id: number) => {
    setCelebrations((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return {
    celebrations,
    celebrate,
    removeCelebration,
  };
};
