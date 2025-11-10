import React from 'react';
import { AchievementCelebration } from './AchievementCelebration';
import { Achievement } from '@/types/stats';

interface CelebrationInstance {
  id: number;
  achievement: Achievement;
}

interface CelebrationContainerProps {
  celebrations: CelebrationInstance[];
  onCelebrationComplete?: (id: number) => void;
}

export const CelebrationContainer: React.FC<CelebrationContainerProps> = ({
  celebrations,
  onCelebrationComplete,
}) => {
  return (
    <>
      {celebrations.map(celebration => (
        <AchievementCelebration
          key={celebration.id}
          achievement={celebration.achievement}
          onComplete={() => onCelebrationComplete?.(celebration.id)}
        />
      ))}
    </>
  );
};
