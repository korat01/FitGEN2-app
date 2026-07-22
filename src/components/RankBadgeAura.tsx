import React from 'react';
import type { RankLevel } from './RankBadge';

type EffectKind = 'dust' | 'embers' | 'shine' | 'flame' | 'lightning' | 'flame-lightning' | 'energy' | 'shadow-flame';

const RANK_EFFECTS: Record<RankLevel, EffectKind> = {
  E: 'dust',
  D: 'embers',
  C: 'shine',
  B: 'flame',
  A: 'lightning',
  S: 'flame-lightning',
  Nation: 'energy',
  World: 'shadow-flame',
};

const SIZE_SCALE: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
  sm: 0.65,
  md: 1,
  lg: 1.3,
  xl: 1.65,
};

// Positions en % biaisées vers les bords du badge, pour ne pas masquer le visuel central.
const SLOTS = [
  { left: '6%', top: '16%' },
  { left: '86%', top: '10%' },
  { left: '48%', top: '0%' },
  { left: '12%', top: '78%' },
  { left: '90%', top: '68%' },
  { left: '44%', top: '94%' },
  { left: '74%', top: '40%' },
  { left: '22%', top: '42%' },
];

interface DotProps {
  left: string;
  top: string;
  size: number;
  color: string;
  glow?: string;
  animationName: string;
  duration: number;
  delay: number;
  extraAnimation?: string;
}

const Dot: React.FC<DotProps> = ({ left, top, size, color, glow, animationName, duration, delay, extraAnimation }) => (
  <span
    className="absolute rounded-full"
    style={{
      left,
      top,
      width: size,
      height: size,
      background: color,
      boxShadow: glow ? `0 0 ${size * 1.6}px ${glow}` : undefined,
      animation: `${animationName} ${duration}s ease-in-out ${delay}s infinite${extraAnimation ? `, ${extraAnimation}` : ''}`,
    }}
  />
);

interface RankBadgeAuraProps {
  rank: RankLevel;
  size: 'sm' | 'md' | 'lg' | 'xl';
}

// Mémorisé : sans ça, chaque re-render du parent (XP, quêtes, streak... plein de choses bougent
// sur le Dashboard) recrée les objets `style` des particules avec des valeurs identiques mais une
// référence neuve — certains navigateurs redémarrent alors l'animation CSS en cours au lieu de la
// laisser filer, ce qui donnait cet effet de "saut"/redémarrage par à-coups au lieu d'une boucle
// fluide. Avec React.memo, tant que `rank`/`size` ne changent pas, ce composant ne se re-rend pas
// du tout et l'animation continue tranquillement en arrière-plan.
export const RankBadgeAura: React.FC<RankBadgeAuraProps> = React.memo(({ rank, size }) => {
  const kind = RANK_EFFECTS[rank];
  const scale = SIZE_SCALE[size];

  const dust = () => (
    <>
      {SLOTS.slice(0, 5).map((slot, i) => (
        <Dot
          key={i}
          left={slot.left}
          top={slot.top}
          size={3 * scale}
          color="rgba(200, 205, 213, 0.8)"
          animationName="rank-particle-float"
          duration={4.5 + i * 0.4}
          delay={i * 0.6}
        />
      ))}
    </>
  );

  const embers = () => (
    <>
      {SLOTS.slice(0, 6).map((slot, i) => (
        <Dot
          key={i}
          left={slot.left}
          top={slot.top}
          size={(i % 2 === 0 ? 4 : 3) * scale}
          color={i % 2 === 0 ? '#FF8A3D' : '#FFB000'}
          glow="rgba(255, 138, 61, 0.7)"
          animationName="rank-particle-float"
          duration={2.2 + i * 0.3}
          delay={i * 0.35}
        />
      ))}
    </>
  );

  const shine = () => (
    <>
      <div className="absolute inset-0 rounded-full overflow-hidden" style={{ zIndex: 5 }}>
        <div
          className="absolute inset-y-0 animate-rank-shine-sweep"
          style={{
            left: '-20%',
            width: '30%',
            background: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.65) 50%, transparent 80%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
      {SLOTS.slice(0, 3).map((slot, i) => (
        <Dot
          key={i}
          left={slot.left}
          top={slot.top}
          size={2.5 * scale}
          color="#DFF4FF"
          glow="rgba(126, 200, 227, 0.8)"
          animationName="rank-spark-flicker"
          duration={2.6 + i * 0.5}
          delay={i * 0.7}
        />
      ))}
    </>
  );

  const flame = (palette: 'gold' | 'red' = 'gold') => {
    const blobColor = palette === 'gold' ? 'rgba(255, 176, 0, 0.55)' : 'rgba(224, 38, 61, 0.55)';
    const sparkColor = palette === 'gold' ? '#FFE9B0' : '#FFD3D3';
    const sparkGlow = palette === 'gold' ? 'rgba(255, 176, 0, 0.8)' : 'rgba(224, 38, 61, 0.85)';
    return (
      <>
        <div
          className="absolute rounded-full blur-md"
          style={{
            left: '2%',
            bottom: '2%',
            width: 18 * scale,
            height: 18 * scale,
            background: blobColor,
            transformOrigin: 'bottom center',
            animation: 'rank-flame-lick 1.7s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full blur-md"
          style={{
            right: '2%',
            bottom: '4%',
            width: 15 * scale,
            height: 15 * scale,
            background: blobColor,
            transformOrigin: 'bottom center',
            animation: 'rank-flame-lick 1.9s ease-in-out 0.3s infinite',
          }}
        />
        {SLOTS.slice(0, 3).map((slot, i) => (
          <Dot
            key={i}
            left={slot.left}
            top={slot.top}
            size={2.5 * scale}
            color={sparkColor}
            glow={sparkGlow}
            animationName="rank-spark-flicker"
            duration={2.4 + i * 0.4}
            delay={i * 0.6}
          />
        ))}
      </>
    );
  };

  const lightning = (palette: 'blue' | 'red' = 'blue') => {
    const color = palette === 'blue' ? '#B9ECFF' : '#FFD9D9';
    const glow = palette === 'blue' ? 'rgba(0, 194, 255, 0.9)' : 'rgba(255, 77, 77, 0.9)';
    return (
      <>
        {SLOTS.slice(0, 5).map((slot, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: slot.left,
              top: slot.top,
              width: 2.2 * scale,
              height: 9 * scale,
              background: color,
              boxShadow: `0 0 ${6 * scale}px ${glow}`,
              transform: `rotate(${(i % 2 === 0 ? 18 : -18)}deg)`,
              borderRadius: 2,
              animation: `rank-spark-flicker ${1.6 + i * 0.35}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </>
    );
  };

  const energy = () => (
    <>
      {/* Pas de blur() ici : un filtre flouté animé EN CONTINU par une rotation force une
          re-rasterisation à chaque frame (au lieu d'une simple recomposition de calque) — sur
          certains appareils, ça finit par décrocher et geler l'anim en plein milieu du tour. Le
          dégradé conique a déjà des transitions douces intégrées, pas besoin de flou en plus. */}
      <div
        className="absolute animate-rank-energy-spin rounded-full"
        style={{
          inset: '-18%',
          background: 'conic-gradient(from 0deg, transparent, rgba(107,42,255,0.55) 25%, rgba(255,215,0,0.5) 45%, transparent 65%)',
          opacity: 0.7,
        }}
      />
      {SLOTS.slice(0, 4).map((slot, i) => (
        <Dot
          key={i}
          left={slot.left}
          top={slot.top}
          size={3 * scale}
          color={i % 2 === 0 ? '#C9A6FF' : '#FFE082'}
          glow={i % 2 === 0 ? 'rgba(107, 42, 255, 0.85)' : 'rgba(255, 215, 0, 0.7)'}
          animationName="rank-spark-flicker"
          duration={2 + i * 0.4}
          delay={i * 0.45}
        />
      ))}
    </>
  );

  const shadowFlame = () => (
    <>
      {/* Fumée noire qui dérive */}
      <div
        className="absolute rounded-full blur-lg"
        style={{
          left: '-12%',
          top: '8%',
          width: 24 * scale,
          height: 24 * scale,
          background: 'rgba(10, 10, 14, 0.75)',
          animation: 'rank-smoke-drift 4.2s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-lg"
        style={{
          right: '-10%',
          bottom: '6%',
          width: 20 * scale,
          height: 20 * scale,
          background: 'rgba(20, 20, 26, 0.7)',
          animation: 'rank-smoke-drift 3.6s ease-in-out 0.8s infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-lg"
        style={{
          left: '38%',
          top: '-10%',
          width: 16 * scale,
          height: 16 * scale,
          background: 'rgba(0, 0, 0, 0.6)',
          animation: 'rank-smoke-drift 5s ease-in-out 1.4s infinite',
        }}
      />

      {/* Flammes noires qui lèchent les bords, cœur bleu glacé */}
      <div
        className="absolute rounded-full blur-md"
        style={{
          left: '4%',
          bottom: '2%',
          width: 16 * scale,
          height: 16 * scale,
          background: 'radial-gradient(circle, rgba(60,160,200,0.35) 0%, rgba(5,5,8,0.85) 65%, transparent 100%)',
          transformOrigin: 'bottom center',
          animation: 'rank-flame-lick 1.8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-md"
        style={{
          right: '4%',
          bottom: '4%',
          width: 14 * scale,
          height: 14 * scale,
          background: 'radial-gradient(circle, rgba(60,160,200,0.3) 0%, rgba(5,5,8,0.85) 65%, transparent 100%)',
          transformOrigin: 'bottom center',
          animation: 'rank-flame-lick 2.1s ease-in-out 0.35s infinite',
        }}
      />

      {/* Éclats de gemme, discrets et froids */}
      {SLOTS.slice(0, 3).map((slot, i) => (
        <Dot
          key={i}
          left={slot.left}
          top={slot.top}
          size={2.5 * scale}
          color="#DCEFFF"
          glow="rgba(120, 190, 220, 0.7)"
          animationName="rank-spark-flicker"
          duration={2.6 + i * 0.4}
          delay={i * 0.7}
        />
      ))}
    </>
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {kind === 'dust' && dust()}
      {kind === 'embers' && embers()}
      {kind === 'shine' && shine()}
      {kind === 'flame' && flame('gold')}
      {kind === 'lightning' && lightning('blue')}
      {kind === 'flame-lightning' && (
        <>
          {flame('red')}
          {lightning('red')}
        </>
      )}
      {kind === 'energy' && energy()}
      {kind === 'shadow-flame' && shadowFlame()}
    </div>
  );
});
RankBadgeAura.displayName = 'RankBadgeAura';

export default RankBadgeAura;
