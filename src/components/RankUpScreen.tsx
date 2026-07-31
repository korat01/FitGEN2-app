import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { RankBadge, RANK_LABELS, type RankLevel } from './RankBadge';
import { getRankColors } from '@/config/rankTheme';
import { ChevronRight } from 'lucide-react';

interface RankUpScreenProps {
  rank: RankLevel;
  onDismiss: () => void;
  /** Optionnel : déclenche une salve de particules "level up" autour du badge à l'apparition. */
  onReveal?: (element: HTMLElement) => void;
}

// Plein écran, façon "reveal" de jeu vidéo — se déclenche uniquement quand le rang MONTE
// (voir la détection dans App.tsx), jamais sur la première synchronisation après connexion.
export const RankUpScreen: React.FC<RankUpScreenProps> = ({ rank, onDismiss, onReveal }) => {
  const { primary, secondary } = getRankColors(rank);
  const badgeRef = useRef<HTMLDivElement>(null);
  const label = RANK_LABELS[rank] || `Rang ${rank}`;

  useEffect(() => {
    if (badgeRef.current) {
      onReveal?.(badgeRef.current);
    }
    // Ne se relance qu'au changement de rang affiché, pas à chaque re-render du parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rank]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Nouveau rang atteint : ${label}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 38%, ${secondary}26 0%, ${primary}1f 35%, #05060b 75%)`,
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm w-full">
        <p
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em]"
          style={{ color: secondary }}
        >
          Nouveau rang atteint
        </p>

        <div ref={badgeRef} className="animate-scale-in">
          <RankBadge rank={rank} size="xl" animated />
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight"
          style={{
            background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {label}
        </h2>

        <p className="text-sm text-white/70 max-w-xs">
          Ta progression continue de payer — garde le rythme pour viser le rang suivant.
        </p>

        <Button
          onClick={onDismiss}
          className="mt-2 px-8"
          style={{
            background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
            color: '#fff',
          }}
        >
          Continuer
          <ChevronRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};

export default RankUpScreen;
