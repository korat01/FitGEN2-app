import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Trophy, Star, Crown, Sparkles, Zap } from 'lucide-react';
import { Achievement } from '@/types/stats';
import { useSounds } from '@/utils/sounds';

interface AchievementCelebrationProps {
  achievement: Achievement;
  onComplete?: () => void;
}

const CELEBRATION_MESSAGES = {
  common: [
    "Bravo ! Premier pas accompli ! 🎉",
    "Excellent travail ! Continue comme ça ! 💪",
    "Tu progresses bien ! 🌟",
    "Succès débloqué ! 🏆"
  ],
  rare: [
    "Impressionnant ! Tu deviens plus fort ! 💎",
    "Quel exploit ! Continue à briller ! ✨",
    "Superbe performance ! 🔥",
    "Tu es sur la bonne voie ! ⭐"
  ],
  epic: [
    "INCROYABLE ! Tu es exceptionnel ! 👑",
    "EXPLOIT ÉPIQUE ! Tu es au sommet ! 🎯",
    "LÉGENDAIRE ! Continue à dominer ! 💜",
    "Tu es INÉGALABLE ! 🚀"
  ],
  legendary: [
    "🌟 LÉGENDAIRE ! TU ES UNE LÉGENDE ! 🌟",
    "👑 PERFECTION ABSOLUE ! RESPECT ! 👑",
    "💎 ACCOMPLISSEMENT ULTIME ! CHAPEAU ! 💎",
    "🔥 TU AS ATTEINT LE SOMMET ! 🔥"
  ]
};

type ConfettiPiece = {
  id: number;
  left: number;
  top: number;
  color: string;
  size: number;
  cx: number;
  cy: number;
  rot: number;
  duration: number;
  delay: number;
  emoji?: string;
};

export const AchievementCelebration: React.FC<AchievementCelebrationProps> = ({
  achievement,
  onComplete,
}) => {
  const [showMessage, setShowMessage] = useState(true);
  const [messageText, setMessageText] = useState('');
  const { playNotification } = useSounds();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const confetti = useMemo<ConfettiPiece[]>(() => {
    const confettiCount = {
      common: 18,
      rare: 24,
      epic: 32,
      legendary: 40,
    }[achievement.rarity];

    const colors = {
      common: ['#9CA3AF', '#6B7280', '#4B5563'],
      rare: ['#3B82F6', '#60A5FA', '#93C5FD'],
      epic: ['#A855F7', '#C084FC', '#E9D5FF'],
      legendary: ['#FBBF24', '#FCD34D', '#FDE68A', '#F59E0B'],
    }[achievement.rarity];

    const emojis = {
      common: ['⭐', '✨'],
      rare: ['💎', '🌟', '✨'],
      epic: ['👑', '🏆', '💜', '✨'],
      legendary: ['🔥', '💎', '👑', '🏆', '⚡', '🌟'],
    }[achievement.rarity];

    const width = typeof window !== 'undefined' ? window.innerWidth : 400;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;

    return Array.from({ length: confettiCount }, (_, i) => {
      const useEmoji = Math.random() > 0.65;
      return {
        id: i,
        left: Math.random() * width,
        top: -20 - Math.random() * 80,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 10,
        cx: (Math.random() - 0.5) * 120,
        cy: height * 0.7 + Math.random() * 200,
        rot: (Math.random() - 0.5) * 720,
        duration: 2200 + Math.random() * 1600,
        delay: Math.random() * 400,
        emoji: useEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : undefined,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievement.id, achievement.rarity]);

  useEffect(() => {
    playNotification();
    const messages = CELEBRATION_MESSAGES[achievement.rarity];
    setMessageText(messages[Math.floor(Math.random() * messages.length)]);

    const messageTimeout = window.setTimeout(() => setShowMessage(false), 3000);
    const completeTimeout = window.setTimeout(() => onCompleteRef.current?.(), 4500);

    return () => {
      window.clearTimeout(messageTimeout);
      window.clearTimeout(completeTimeout);
    };
  }, [achievement.rarity, playNotification]);

  const getRarityIcon = () => {
    switch (achievement.rarity) {
      case 'common': return <Star className="w-8 h-8" />;
      case 'rare': return <Sparkles className="w-8 h-8" />;
      case 'epic': return <Crown className="w-8 h-8" />;
      case 'legendary': return <Trophy className="w-8 h-8" />;
    }
  };

  const getRarityColors = () => {
    switch (achievement.rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500';
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none" aria-hidden>
      {confetti.map((c) => {
        const style: React.CSSProperties = {
          left: c.left,
          top: c.top,
          ['--cx' as string]: `${c.cx}px`,
          ['--cy' as string]: `${c.cy}px`,
          ['--rot' as string]: `${c.rot}deg`,
          animationDuration: `${c.duration}ms`,
          animationDelay: `${c.delay}ms`,
          fontSize: c.emoji ? `${c.size * 1.5}px` : undefined,
          width: c.emoji ? undefined : c.size,
          height: c.emoji ? undefined : c.size,
          backgroundColor: c.emoji ? undefined : c.color,
          boxShadow: c.emoji ? undefined : `0 0 ${c.size}px ${c.color}`,
        };

        return c.emoji ? (
          <div key={c.id} className="vf-confetti absolute" style={style}>
            {c.emoji}
          </div>
        ) : (
          <div key={c.id} className="vf-confetti absolute rounded-sm" style={style} />
        );
      })}

      {showMessage && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in">
          <div className={`bg-gradient-to-r ${getRarityColors()} p-8 rounded-3xl shadow-2xl text-white text-center max-w-md`}>
            <div className="relative mb-6">
              <div className={`relative w-24 h-24 bg-gradient-to-r ${getRarityColors()} rounded-full flex items-center justify-center mx-auto shadow-xl`}>
                <span className="text-5xl">{achievement.icon}</span>
              </div>
            </div>

            <h2 className="text-3xl font-black mb-3 uppercase tracking-wide drop-shadow-lg">
              {achievement.title}
            </h2>

            <p className="text-xl font-bold mb-4 drop-shadow">
              {messageText}
            </p>

            <div className="flex items-center justify-center gap-2 bg-white/20 rounded-full px-6 py-3">
              <Zap className="w-6 h-6" />
              <span className="text-2xl font-black">+{achievement.xpReward} XP</span>
              <span className="sr-only">{getRarityIcon()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
