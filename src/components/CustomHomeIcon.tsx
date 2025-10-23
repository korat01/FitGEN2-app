import React, { useState, useEffect } from 'react';
import { UIConfig, loadUIConfig } from '../config/UIConfig';

interface CustomHomeIconProps {
  className?: string;
  size?: number;
}

export const CustomHomeIcon: React.FC<CustomHomeIconProps> = ({ 
  className = '', 
  size = 24 
}) => {
  const [config, setConfig] = useState<UIConfig>(loadUIConfig());
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Charger la configuration au montage
  useEffect(() => {
    setConfig(loadUIConfig());
  }, []);

  // Écouter les changements de configuration
  useEffect(() => {
    const handleConfigUpdate = (event: CustomEvent) => {
      setConfig(event.detail);
    };

    window.addEventListener('ui-config-updated', handleConfigUpdate as EventListener);
    return () => window.removeEventListener('ui-config-updated', handleConfigUpdate as EventListener);
  }, []);

  // Vérifier si l'image PNG existe
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = '/src/assets/images/home-icon.png';
  }, []);

  // Si l'image PNG existe et est chargée, l'utiliser
  if (imageLoaded && !imageError) {
    return (
      <div 
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <img 
          src="/src/assets/images/home-icon.png"
          alt="Home Icon"
          width={size}
          height={size}
          style={{ 
            filter: `drop-shadow(0 0 ${config.icons.home.glow.blur} ${config.icons.home.glow.color})`,
            transition: config.effects.transition.normal,
            transform: 'scale(1)',
            borderRadius: config.effects.borderRadius.sm,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `scale(${config.icons.home.hover.scale})`;
            e.currentTarget.style.filter = `drop-shadow(0 0 ${config.icons.home.glow.hoverBlur} ${config.icons.home.glow.hoverColor})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = `drop-shadow(0 0 ${config.icons.home.glow.blur} ${config.icons.home.glow.color})`;
          }}
        />
      </div>
    );
  }

  // SVG basé sur votre vraie image avec configuration dynamique
  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none"
        style={{ 
          filter: `drop-shadow(0 0 ${config.icons.home.glow.blur} ${config.icons.home.glow.color})`,
          transition: config.effects.transition.normal,
          transform: 'scale(1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = `scale(${config.icons.home.hover.scale})`;
          e.currentTarget.style.filter = `drop-shadow(0 0 ${config.icons.home.glow.hoverBlur} ${config.icons.home.glow.hoverColor})`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.filter = `drop-shadow(0 0 ${config.icons.home.glow.blur} ${config.icons.home.glow.color})`;
        }}
      >
        <defs>
          {/* Gradient dynamique basé sur la configuration */}
          <linearGradient id="homeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={config.icons.home.gradientColors.top}/>
            <stop offset="25%" stopColor={config.icons.home.gradientColors.middle1}/>
            <stop offset="50%" stopColor={config.icons.home.gradientColors.middle2}/>
            <stop offset="75%" stopColor={config.icons.home.gradientColors.middle3}/>
            <stop offset="100%" stopColor={config.icons.home.gradientColors.bottom}/>
          </linearGradient>
          
          {/* Effet de lueur externe */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Fond noir comme votre vraie image */}
        <rect width="24" height="24" fill={config.colors.background}/>
        
        {/* Forme de maison avec effet lumineux */}
        <g filter="url(#glow)">
          {/* Corps de la maison (rectangle) */}
          <rect x="7" y="13" width="10" height="7" fill="url(#homeGradient)" rx="0.5"/>
          
          {/* Toit triangulaire */}
          <path d="M 5 13 L 12 7 L 19 13 Z" fill="url(#homeGradient)"/>
        </g>
      </svg>
    </div>
  );
};

export default CustomHomeIcon;