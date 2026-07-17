import React, { useMemo } from 'react';

interface VitalForceBackgroundProps {
  intensity?: 'none' | 'low' | 'medium' | 'high';
}

/**
 * Fond atmosphérique VitalForce — DA gaming sombre.
 * Peu de nœuds DOM + animations CSS (transform/opacity) pour rester fluide.
 */
export const VitalForceBackground: React.FC<VitalForceBackgroundProps> = ({
  intensity = 'medium',
}) => {
  const showExtras = intensity === 'medium' || intensity === 'high';
  const showRich = intensity === 'high';

  const dust = useMemo(() => {
    if (!showExtras) return [];
    const count = intensity === 'high' ? 12 : 8;
    const items: Array<{ id: number; top: number; left: number; size: number; delay: number; dur: number }> = [];
    let s = intensity === 'high' ? 91 : 17;
    for (let i = 0; i < count; i++) {
      s = (s * 16807 + 7) % 2147483647;
      const top = 8 + (s % 84);
      s = (s * 16807 + 7) % 2147483647;
      const left = 4 + (s % 92);
      s = (s * 16807 + 7) % 2147483647;
      const size = 2 + (s % 3);
      s = (s * 16807 + 7) % 2147483647;
      items.push({
        id: i,
        top,
        left,
        size,
        delay: (s % 60) / 10,
        dur: 10 + (s % 12),
      });
    }
    return items;
  }, [intensity, showExtras]);

  if (intensity === 'none') return null;

  return (
    <div className="vf-bg fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {/* Base — navy profond référence DA */}
      <div className="absolute inset-0 vf-bg-base" />

      {/* Mesh nébuleuse */}
      <div className="absolute inset-0 vf-bg-mesh" />

      {/* Halo haut (violet) */}
      <div className="absolute vf-bg-glow vf-bg-glow-top" />

      {/* Halo bas-droit (cyan) */}
      <div className="absolute vf-bg-glow vf-bg-glow-br" />

      {/* Halo bas-gauche (bleu doux) */}
      <div className="absolute vf-bg-glow vf-bg-glow-bl" />

      {showExtras && (
        <>
          {/* Bande aurora horizontale */}
          <div className="absolute vf-bg-aurora vf-aurora" />
          {showRich && <div className="absolute vf-bg-aurora vf-bg-aurora-2 vf-aurora" />}

          {/* Orbes flottantes larges (blur GPU) */}
          <div className="absolute vf-bg-orb vf-bg-orb-a vf-orb" />
          <div className="absolute vf-bg-orb vf-bg-orb-b vf-orb" />
          {showRich && <div className="absolute vf-bg-orb vf-bg-orb-c vf-orb" />}
        </>
      )}

      {/* Poussière cosmique légère */}
      {dust.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full vf-bg-dust"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}

      {/* Grille subtile */}
      <div className="absolute inset-0 vf-bg-grid" />

      {/* Grain texture */}
      <div className="absolute inset-0 vf-bg-noise" />

      {/* Vignette bordure */}
      <div className="absolute inset-0 vf-bg-vignette" />
    </div>
  );
};

export default VitalForceBackground;
