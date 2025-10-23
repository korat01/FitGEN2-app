import React from 'react';
import VitalForceTheme from '../config/VitalForceTheme';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  children, 
  intensity = 'medium' 
}) => {
  const opacityLevel = intensity === 'low' ? '0.05' : intensity === 'medium' ? '0.15' : '0.25';
  const particleCount = intensity === 'low' ? 5 : intensity === 'medium' ? 12 : 20;
  const waveCount = intensity === 'low' ? 3 : intensity === 'medium' ? 5 : 8;

  return (
    <>
      <style>{VitalForceTheme.animations.css}</style>
      
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: VitalForceTheme.colors.primary.darkBg }}>
        {/* Background Pattern - Circuit board texture animée */}
        <div className="absolute inset-0" style={{ opacity: opacityLevel }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="circuitPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path 
                  d="M40,0 L40,20 M40,60 L40,80 M0,40 L20,40 M60,40 L80,40" 
                  stroke={VitalForceTheme.colors.primary.purple} 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.4"
                  strokeDasharray="5,5"
                  className={VitalForceTheme.animations.classes.circuitFlow}
                />
                <circle 
                  cx="40" 
                  cy="40" 
                  r="3" 
                  fill={VitalForceTheme.colors.primary.blue} 
                  opacity="0.6"
                  className={VitalForceTheme.animations.classes.backgroundPulse}
                />
                <path 
                  d="M20,20 L60,60 M60,20 L20,60" 
                  stroke={VitalForceTheme.colors.primary.cyan} 
                  strokeWidth="0.5" 
                  opacity="0.3"
                  strokeDasharray="3,3"
                  className={VitalForceTheme.animations.classes.circuitFlow}
                  style={{ animationDelay: '1s' }}
                />
                <polygon 
                  points="40,10 50,20 40,30 30,20" 
                  fill={VitalForceTheme.colors.primary.purple} 
                  opacity="0.2"
                  className={VitalForceTheme.animations.classes.hexagonRotate}
                />
              </pattern>
              <pattern id="hexPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path 
                  d="M50 10 L80 25 L80 75 L50 90 L20 75 L20 25 Z" 
                  fill="none" 
                  stroke={VitalForceTheme.colors.primary.blue} 
                  strokeWidth="0.8" 
                  opacity="0.2"
                  className={VitalForceTheme.animations.classes.hexagonRotate}
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="2" 
                  fill={VitalForceTheme.colors.primary.cyan} 
                  opacity="0.4"
                  className={VitalForceTheme.animations.classes.backgroundPulse}
                  style={{ animationDelay: '2s' }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuitPattern)"/>
            <rect width="100%" height="100%" fill="url(#hexPattern)"/>
          </svg>
        </div>

        {/* Animated Energy Waves */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: waveCount }, (_, i) => (
            <div
              key={i}
              className={`absolute ${VitalForceTheme.animations.classes.energyWave}`}
              style={{
                top: `${20 + i * (60 / waveCount)}%`,
                left: '0',
                width: '100%',
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${VitalForceTheme.colors.primary.purple}, ${VitalForceTheme.colors.primary.blue}, transparent)`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i}s`
              }}
            ></div>
          ))}
        </div>

        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: particleCount }, (_, i) => (
            <div
              key={i}
              className={`absolute ${VitalForceTheme.animations.classes.matrixRain}`}
              style={{
                left: `${i * (100 / particleCount)}%`,
                top: '0',
                width: '2px',
                height: '20px',
                background: `linear-gradient(to bottom, transparent, ${VitalForceTheme.colors.primary.cyan}, transparent)`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>

        {/* Orbiting Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`absolute ${VitalForceTheme.animations.classes.particleOrbit}`}
              style={{
                top: '50%',
                left: '50%',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: i % 2 === 0 ? VitalForceTheme.colors.primary.purple : VitalForceTheme.colors.primary.blue,
                boxShadow: `0 0 10px ${i % 2 === 0 ? VitalForceTheme.colors.glow.purple : VitalForceTheme.colors.glow.blue}`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + i * 2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Gradient overlays animés */}
        <div 
          className={`absolute inset-0 pointer-events-none ${VitalForceTheme.animations.classes.gradientShift}`}
          style={{
            background: `radial-gradient(ellipse at top, ${VitalForceTheme.colors.primary.purple}15 0%, transparent 60%)`,
            backgroundSize: '200% 200%'
          }}
        ></div>
        <div 
          className={`absolute inset-0 pointer-events-none ${VitalForceTheme.animations.classes.gradientShift}`}
          style={{
            background: `radial-gradient(ellipse at bottom, ${VitalForceTheme.colors.primary.blue}10 0%, transparent 60%)`,
            backgroundSize: '200% 200%',
            animationDelay: '2s'
          }}
        ></div>
        
        {/* Animated Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={`absolute ${VitalForceTheme.animations.classes.backgroundPulse}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${i % 2 === 0 ? VitalForceTheme.colors.primary.purple : VitalForceTheme.colors.primary.blue}20 0%, transparent 70%)`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + i}s`
              }}
            ></div>
          ))}
        </div>

        {/* Contenu principal */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default AnimatedBackground;
