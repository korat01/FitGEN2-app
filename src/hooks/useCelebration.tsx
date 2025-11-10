import { useState, useCallback } from 'react';
import { Achievement } from '@/types/stats';

interface CelebrationInstance {
  id: number;
  achievement: Achievement;
}

export const useCelebration = () => {
  const [celebrations, setCelebrations] = useState<CelebrationInstance[]>([]);
  const [nextId, setNextId] = useState(0);

  const celebrate = useCallback((achievement: Achievement) => {
    const id = nextId;
    setNextId(id + 1);
    
    setCelebrations(prev => [...prev, { id, achievement }]);

    // Auto-remove après l'animation
    setTimeout(() => {
      setCelebrations(prev => prev.filter(c => c.id !== id));
    }, 5500);
  }, [nextId]);

  const removeCelebration = useCallback((id: number) => {
    setCelebrations(prev => prev.filter(c => c.id !== id));
  }, []);

  return {
    celebrations,
    celebrate,
    removeCelebration,
  };
};
