import React, { useEffect, useState } from 'react';

interface VitalForceBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

export const VitalForceBackground: React.FC<VitalForceBackgroundProps> = ({ intensity = 'medium' }) => {
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  // Couleurs VitalForce
  const colors = {
    purple: '#6B2AFF',
    blue: '#00C2FF',
    cyan: '#00E0FF',
    pink: '#FF6B9D',
    orange: '#FF7D3B',
    gold: '#FFD700',
  };

  // Nombre d'éléments selon l'intensité
  const elementCounts = {
    low: { aurora: 3, bubbles: 8, shapes: 4, particles: 10, orbs: 4 },
    medium: { aurora: 5, bubbles: 12, shapes: 6, particles: 15, orbs: 6 },
    high: { aurora: 7, bubbles: 20, shapes: 10, particles: 25, orbs: 10 }
  };

  const counts = elementCounts[intensity];

  useEffect(() => {
    const elements = Array.from({ length: counts.particles }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setFloatingElements(elements);
  }, [intensity]);

  return (
    <>
      <style>
        {`
          @keyframes auroraBorealis {
            0%, 100% { 
              transform: translateY(0px) scaleX(1); 
              opacity: 0.1; 
            }
            50% { 
              transform: translateY(-15px) scaleX(1.05); 
              opacity: 0.25; 
            }
          }
          
          @keyframes floatingBubbles {
            0% { 
              transform: translateY(100vh) scale(0); 
              opacity: 0; 
            }
            50% { 
              transform: translateY(50vh) scale(0.6); 
              opacity: 0.3; 
            }
            100% { 
              transform: translateY(-20vh) scale(0); 
              opacity: 0; 
            }
          }
          
          @keyframes morphingShapes {
            0%, 100% { 
              transform: scale(1) rotate(0deg); 
              border-radius: 50%; 
              opacity: 0.08; 
            }
            50% { 
              transform: scale(0.9) rotate(180deg); 
              border-radius: 40% 60%; 
              opacity: 0.15; 
            }
          }
          
          @keyframes cosmicDust {
            0%, 100% { 
              transform: translateX(0) translateY(0); 
              opacity: 0.05; 
            }
            50% { 
              transform: translateX(10px) translateY(-8px); 
              opacity: 0.15; 
            }
          }
          
          @keyframes floatingOrbs {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.1; 
            }
            50% { 
              transform: translateY(-30px) scale(1.2); 
              opacity: 0.3; 
            }
          }
          
          @keyframes energyPulse {
            0%, 100% { 
              transform: scale(1); 
              opacity: 0.1; 
            }
            50% { 
              transform: scale(1.3); 
              opacity: 0.4; 
            }
          }

          .aurora-borealis {
            animation: auroraBorealis 12s ease-in-out infinite;
          }
          
          .floating-bubbles {
            animation: floatingBubbles 10s ease-in-out infinite;
          }
          
          .morphing-shapes {
            animation: morphingShapes 15s ease-in-out infinite;
          }
          
          .cosmic-dust {
            animation: cosmicDust 20s ease-in-out infinite;
          }
          
          .floating-orb {
            animation: floatingOrbs 12s ease-in-out infinite;
          }
          
          .energy-pulse {
            animation: energyPulse 8s ease-in-out infinite;
          }
        `}
      </style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Aurora Borealis Effect */}
        <div className="absolute inset-0">
          {Array.from({ length: counts.aurora }, (_, i) => (
            <div
              key={`aurora-${i}`}
              className="absolute aurora-borealis"
              style={{
                top: `${20 + i * 15}%`,
                left: '0',
                width: '100%',
                height: '60px',
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  ${colors.cyan}08 25%, 
                  ${colors.purple}12 50%, 
                  ${colors.pink}08 75%, 
                  transparent 100%)`,
                animationDelay: `${i * 2.5}s`,
                animationDuration: `${12 + i}s`
              }}
            />
          ))}
        </div>

        {/* Floating Bubbles */}
        <div className="absolute inset-0">
          {Array.from({ length: counts.bubbles }, (_, i) => (
            <div
              key={`bubble-${i}`}
              className="absolute floating-bubbles"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '0',
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, 
                  ${i % 3 === 0 ? colors.cyan : i % 3 === 1 ? colors.purple : colors.pink}15, 
                  transparent)`,
                boxShadow: `0 0 15px ${i % 3 === 0 ? colors.cyan : i % 3 === 1 ? colors.purple : colors.pink}40`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Morphing Shapes */}
        <div className="absolute inset-0">
          {Array.from({ length: counts.shapes }, (_, i) => (
            <div
              key={`shape-${i}`}
              className="absolute morphing-shapes"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${80 + Math.random() * 120}px`,
                height: `${80 + Math.random() * 120}px`,
                background: `conic-gradient(from ${i * 45}deg, 
                  ${colors.purple}08, 
                  ${colors.blue}08, 
                  ${colors.cyan}08, 
                  transparent)`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + i}s`
              }}
            />
          ))}
        </div>

        {/* Cosmic Dust Particles */}
        <div className="absolute inset-0">
          {floatingElements.map((element) => (
            <div
              key={`dust-${element.id}`}
              className="absolute cosmic-dust"
              style={{
                top: `${element.y}%`,
                left: `${element.x}%`,
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                borderRadius: '50%',
                background: element.id % 4 === 0 ? colors.cyan : 
                           element.id % 4 === 1 ? colors.purple : 
                           element.id % 4 === 2 ? colors.pink : colors.blue,
                boxShadow: `0 0 8px ${element.id % 4 === 0 ? colors.cyan : 
                           element.id % 4 === 1 ? colors.purple : 
                           element.id % 4 === 2 ? colors.pink : colors.blue}60`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${20 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0">
          {Array.from({ length: counts.orbs }, (_, i) => (
            <div
              key={`orb-${i}`}
              className="absolute floating-orb"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                width: `${50 + i * 10}px`,
                height: `${50 + i * 10}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, 
                  ${i % 3 === 0 ? colors.cyan : i % 3 === 1 ? colors.purple : colors.pink}15, 
                  transparent)`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${12 + i}s`
              }}
            />
          ))}
        </div>

        {/* Energy Pulse Orbs */}
        <div className="absolute inset-0">
          {Array.from({ length: counts.orbs }, (_, i) => (
            <div
              key={`energy-${i}`}
              className="absolute energy-pulse"
              style={{
                top: `${30 + i * 12}%`,
                left: `${15 + i * 18}%`,
                width: `${60 + i * 8}px`,
                height: `${60 + i * 8}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, 
                  ${i % 3 === 0 ? colors.purple : i % 3 === 1 ? colors.blue : colors.cyan}20, 
                  transparent)`,
                animationDelay: `${i * 2.5}s`,
                animationDuration: `${8 + i}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top, ${colors.purple}12 0%, transparent 60%)`,
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at bottom right, ${colors.blue}08 0%, transparent 60%)`,
          }}
        />
      </div>
    </>
  );
};

export default VitalForceBackground;
