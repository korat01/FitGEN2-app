import React from 'react';
import { Button } from './button';
import { useSounds } from '../../utils/sounds';

interface SoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  soundType?: 'click' | 'success' | 'error' | 'notification' | 'hover';
  children: React.ReactNode;
}

export const SoundButton: React.FC<SoundButtonProps> = ({ 
  soundType = 'click', 
  children, 
  onClick,
  onMouseEnter,
  ...props 
}) => {
  const { playClick, playSuccess, playError, playNotification, playHover } = useSounds();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (soundType) {
      case 'success':
        playSuccess();
        break;
      case 'error':
        playError();
        break;
      case 'notification':
        playNotification();
        break;
      default:
        playClick();
    }
    onClick?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHover();
    onMouseEnter?.(e);
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Button>
  );
}; 