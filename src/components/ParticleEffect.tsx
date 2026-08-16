import React, { useEffect, useMemo, useRef } from 'react';

interface ParticleEffectProps {
  x: number;
  y: number;
  type?: 'click' | 'success' | 'levelup' | 'error';
  onComplete?: () => void;
}

const particleConfigs = {
  click: {
    count: 6,
    colors: ['#6366f1', '#8b5cf6', '#a855f7'],
    emojis: [] as string[],
    size: 4,
    velocity: 3,
    life: 700,
  },
  success: {
    count: 12,
    colors: ['#22c55e', '#10b981', '#84cc16'],
    emojis: ['✓', '⭐', '💪'],
    size: 6,
    velocity: 4,
    life: 1100,
  },
  levelup: {
    count: 16,
    colors: ['#fbbf24', '#f59e0b', '#eab308', '#facc15'],
    emojis: ['🎉', '⭐', '🏆', '✨', '🔥'],
    size: 8,
    velocity: 5,
    life: 1400,
  },
  error: {
    count: 8,
    colors: ['#ef4444', '#dc2626', '#f87171'],
    emojis: [] as string[],
    size: 5,
    velocity: 3,
    life: 900,
  },
};

type SpawnedParticle = {
  id: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
  emoji?: string;
  delay: number;
};

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  x,
  y,
  type = 'click',
  onComplete,
}) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const config = particleConfigs[type];

  const particles = useMemo<SpawnedParticle[]>(() => {
    const items: SpawnedParticle[] = [];
    for (let i = 0; i < config.count; i++) {
      const angle = (Math.PI * 2 * i) / config.count + Math.random() * 0.4;
      const useEmoji = config.emojis.length > 0 && Math.random() > 0.5;
      items.push({
        id: i,
        angle,
        distance: 40 + config.velocity * 18 + Math.random() * 30,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        size: config.size + Math.random() * 3,
        emoji: useEmoji
          ? config.emojis[Math.floor(Math.random() * config.emojis.length)]
          : undefined,
        delay: Math.random() * 80,
      });
    }
    return items;
    // Spawn snapshot once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      onCompleteRef.current?.();
    }, config.life + 100);
    return () => window.clearTimeout(timeout);
  }, [config.life]);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{ left: x, top: y }}
      aria-hidden
    >
      {particles.map((particle) => {
        const dx = Math.cos(particle.angle) * particle.distance;
        const dy = Math.sin(particle.angle) * particle.distance + 24;
        const style: React.CSSProperties = {
          ['--dx' as string]: `${dx}px`,
          ['--dy' as string]: `${dy}px`,
          animationDuration: `${config.life}ms`,
          animationDelay: `${particle.delay}ms`,
          fontSize: particle.emoji ? `${particle.size * 2}px` : undefined,
          width: particle.emoji ? undefined : particle.size,
          height: particle.emoji ? undefined : particle.size,
          backgroundColor: particle.emoji ? undefined : particle.color,
          boxShadow: particle.emoji
            ? undefined
            : `0 0 ${particle.size * 2}px ${particle.color}`,
        };

        return particle.emoji ? (
          <div
            key={particle.id}
            className="vf-particle absolute -translate-x-1/2 -translate-y-1/2"
            style={style}
          >
            {particle.emoji}
          </div>
        ) : (
          <div
            key={particle.id}
            className="vf-particle absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={style}
          />
        );
      })}
    </div>
  );
};
