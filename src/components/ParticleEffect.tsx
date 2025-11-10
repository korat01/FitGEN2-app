import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  life: number;
  color: string;
  size: number;
  emoji?: string;
}

interface ParticleEffectProps {
  x: number;
  y: number;
  type?: 'click' | 'success' | 'levelup' | 'error';
  onComplete?: () => void;
}

const particleConfigs = {
  click: {
    count: 8,
    colors: ['#6366f1', '#8b5cf6', '#a855f7'],
    emojis: [],
    size: 4,
    velocity: 3,
    life: 1000,
  },
  success: {
    count: 20,
    colors: ['#22c55e', '#10b981', '#84cc16'],
    emojis: ['✓', '⭐', '💪'],
    size: 6,
    velocity: 4,
    life: 1500,
  },
  levelup: {
    count: 30,
    colors: ['#fbbf24', '#f59e0b', '#eab308', '#facc15'],
    emojis: ['🎉', '⭐', '🏆', '✨', '🔥'],
    size: 8,
    velocity: 5,
    life: 2000,
  },
  error: {
    count: 12,
    colors: ['#ef4444', '#dc2626', '#f87171'],
    emojis: [],
    size: 5,
    velocity: 3,
    life: 1200,
  },
};

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  x,
  y,
  type = 'click',
  onComplete,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const config = particleConfigs[type];
    const newParticles: Particle[] = [];

    for (let i = 0; i < config.count; i++) {
      const angle = (Math.PI * 2 * i) / config.count;
      const velocity = config.velocity + Math.random() * 2;
      const useEmoji = config.emojis.length > 0 && Math.random() > 0.5;
      
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        angle,
        velocity,
        life: config.life,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        size: config.size + Math.random() * 4,
        emoji: useEmoji ? config.emojis[Math.floor(Math.random() * config.emojis.length)] : undefined,
      });
    }

    setParticles(newParticles);

    const animationInterval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + Math.cos(p.angle) * p.velocity,
          y: p.y + Math.sin(p.angle) * p.velocity + 2, // Gravité
          velocity: p.velocity * 0.98,
          life: p.life - 16,
        }))
      );
    }, 16);

    const timeout = setTimeout(() => {
      setIsActive(false);
      onComplete?.();
    }, config.life);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(timeout);
    };
  }, [type, onComplete]);

  if (!isActive) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{ left: x, top: y }}
    >
      {particles.map((particle) => {
        const opacity = Math.max(0, particle.life / particleConfigs[type].life);
        
        return particle.emoji ? (
          <div
            key={particle.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: particle.x,
              top: particle.y,
              opacity,
              fontSize: `${particle.size * 2}px`,
              transition: 'opacity 0.1s',
            }}
          >
            {particle.emoji}
          </div>
        ) : (
          <div
            key={particle.id}
            className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              transition: 'opacity 0.1s',
            }}
          />
        );
      })}
    </div>
  );
};
