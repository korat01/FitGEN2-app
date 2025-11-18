import React, { useEffect, useState } from 'react';
import { Trophy, Star, Crown, Sparkles, Zap } from 'lucide-react';
import { Achievement } from '@/types/stats';
import { useSounds } from '@/utils/sounds';

interface Confetti {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
  rotationSpeed: number;
  emoji?: string;
}

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

export const AchievementCelebration: React.FC<AchievementCelebrationProps> = ({
  achievement,
  onComplete,
}) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showMessage, setShowMessage] = useState(true);
  const [messageText, setMessageText] = useState('');
  const { playNotification } = useSounds();

  useEffect(() => {
    // Jouer le son d'achievement
    playNotification();
    
    // Choisir un message aléatoire selon la rareté
    const messages = CELEBRATION_MESSAGES[achievement.rarity];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessageText(randomMessage);

    // Générer les confettis
    const confettiCount = {
      common: 30,
      rare: 50,
      epic: 80,
      legendary: 120
    }[achievement.rarity];

    const colors = {
      common: ['#9CA3AF', '#6B7280', '#4B5563'],
      rare: ['#3B82F6', '#60A5FA', '#93C5FD'],
      epic: ['#A855F7', '#C084FC', '#E9D5FF'],
      legendary: ['#FBBF24', '#FCD34D', '#FDE68A', '#F59E0B']
    }[achievement.rarity];

    const emojis = {
      common: ['⭐', '✨'],
      rare: ['💎', '🌟', '✨'],
      epic: ['👑', '🏆', '💜', '✨'],
      legendary: ['🔥', '💎', '👑', '🏆', '⚡', '🌟']
    }[achievement.rarity];

    const newConfetti: Confetti[] = [];
    for (let i = 0; i < confettiCount; i++) {
      const useEmoji = Math.random() > 0.6;
      newConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
        velocity: {
          x: (Math.random() - 0.5) * 3,
          y: 2 + Math.random() * 3
        },
        rotationSpeed: (Math.random() - 0.5) * 10,
        emoji: useEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : undefined
      });
    }
    setConfetti(newConfetti);

    // Animation des confettis
    const animationInterval = setInterval(() => {
      setConfetti(prev =>
        prev
          .map(c => ({
            ...c,
            x: c.x + c.velocity.x,
            y: c.y + c.velocity.y,
            rotation: c.rotation + c.rotationSpeed,
            velocity: {
              x: c.velocity.x * 0.99,
              y: c.velocity.y + 0.1 // Gravité
            }
          }))
          .filter(c => c.y < window.innerHeight + 50)
      );
    }, 16);

    // Masquer le message après un moment
    const messageTimeout = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    // Terminer l'animation
    const completeTimeout = setTimeout(() => {
      onComplete?.();
    }, 5000);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(messageTimeout);
      clearTimeout(completeTimeout);
    };
  }, [achievement, onComplete]);

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
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {/* Confettis */}
      {confetti.map(c => (
        c.emoji ? (
          <div
            key={c.id}
            className="absolute text-2xl"
            style={{
              left: c.x,
              top: c.y,
              transform: `rotate(${c.rotation}deg)`,
              fontSize: `${c.size * 1.5}px`,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {c.emoji}
          </div>
        ) : (
          <div
            key={c.id}
            className="absolute rounded-sm"
            style={{
              left: c.x,
              top: c.y,
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              transform: `rotate(${c.rotation}deg)`,
              boxShadow: `0 0 ${c.size}px ${c.color}`,
            }}
          />
        )
      ))}

      {/* Message de célébration */}
      {showMessage && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in">
          <div className={`bg-gradient-to-r ${getRarityColors()} p-8 rounded-3xl shadow-2xl text-white text-center max-w-md`}>
            {/* Icône de l'achievement avec animation */}
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping opacity-75">
                <div className={`w-24 h-24 bg-gradient-to-r ${getRarityColors()} rounded-full mx-auto`}></div>
              </div>
              <div className={`relative w-24 h-24 bg-gradient-to-r ${getRarityColors()} rounded-full flex items-center justify-center mx-auto shadow-xl animate-bounce`}>
                <span className="text-5xl">{achievement.icon}</span>
              </div>
            </div>

            {/* Titre achievement */}
            <h2 className="text-3xl font-black mb-3 uppercase tracking-wide drop-shadow-lg">
              {achievement.title}
            </h2>

            {/* Message de félicitations */}
            <p className="text-xl font-bold mb-4 drop-shadow">
              {messageText}
            </p>

            {/* XP Reward avec animation */}
            <div className="flex items-center justify-center gap-2 bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
              <Zap className="w-6 h-6 animate-pulse" />
              <span className="text-2xl font-black">+{achievement.xpReward} XP</span>
            </div>

            {/* Étoiles décoratives */}
            <div className="flex justify-center gap-4 mt-4">
              <Star className="w-6 h-6 animate-pulse" style={{ animationDelay: '0ms' }} />
              <Star className="w-8 h-8 animate-pulse" style={{ animationDelay: '150ms' }} />
              <Star className="w-6 h-6 animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>

          {/* Effet de lumière rayonnante */}
          <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColors()} rounded-3xl blur-3xl opacity-50 animate-pulse -z-10`}></div>
        </div>
      )}
    </div>
  );
};
