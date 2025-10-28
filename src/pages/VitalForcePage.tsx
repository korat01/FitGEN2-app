import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Crown,
  Hexagon,
  Triangle,
  Square,
  Circle,
  User,
  Bell,
  Coins,
  TrendingUp,
  ChevronDown,
  Award,
  Gem,
  Shield,
  Heart,
  Activity,
  BarChart3,
  Settings,
  ArrowLeft,
  Check,
  Droplets,
  ChevronRight,
  MoreHorizontal,
  Target as TargetIcon,
  Clock,
  MapPin,
  Gift,
  Sparkles,
  Menu,
  Search,
  ToggleLeft,
  ToggleRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const VitalForcePage: React.FC = () => {
  const [xpGain, setXpGain] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number, type: string}>>([]);
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(true);

  // Couleurs exactes basées sur l'image VitalForce
  const colors = {
    primary: {
      darkBg: '#0A0E1A',
      cardBg: '#1A1F2E',
      purple: '#6B2AFF',
      blue: '#00C2FF',
      cyan: '#00E0FF',
      pink: '#FF6B9D',
      orange: '#FF7D3B',
      yellow: '#FFD700',
      textWhite: '#FFFFFF',
      textGray: '#A0AEC0',
      textLightGray: '#CBD5E0',
      progressGreen: '#2ECC71',
      progressBlue: '#3498DB',
      progressPurple: '#9B59B6',
      gold: '#FFD700'
    },
    glow: {
      purple: 'rgba(107, 42, 255, 0.6)',
      blue: 'rgba(0, 194, 255, 0.6)',
      pink: 'rgba(255, 107, 157, 0.6)',
      green: 'rgba(46, 204, 113, 0.6)',
      gold: 'rgba(255, 215, 0, 0.6)',
      cyan: 'rgba(0, 224, 255, 0.6)'
    },
    gradients: {
      main: 'linear-gradient(135deg, #6B2AFF 0%, #00C2FF 100%)',
      pinkPurple: 'linear-gradient(135deg, #FF6B9D 0%, #6B2AFF 100%)',
      blueCyan: 'linear-gradient(135deg, #00C2FF 0%, #00E0FF 100%)',
      goldOrange: 'linear-gradient(135deg, #FFD700 0%, #FF7D3B 100%)',
      purpleBlue: 'linear-gradient(135deg, #6B2AFF 0%, #00C2FF 100%)'
    }
  };

  // Effet de particules avancé pour XP Gain
  useEffect(() => {
    if (xpGain) {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 1,
        type: ['gold', 'purple', 'blue', 'pink', 'cyan'][Math.floor(Math.random() * 5)]
      }));
      setParticles(newParticles);
      
      setTimeout(() => {
        setXpGain(false);
        setParticles([]);
      }, 3000);
    }
  }, [xpGain]);

  // Effet d'éléments flottants en arrière-plan
  useEffect(() => {
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setFloatingElements(elements);
  }, []);

  // Animation de démarrage
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
       {/* CSS personnalisé pour les animations VitalForce */}
       <style>
         {`
           @keyframes progressGlow {
             0% { box-shadow: 0 0 15px rgba(107, 42, 255, 0.4); }
             50% { box-shadow: 0 0 25px rgba(107, 42, 255, 0.8); }
             100% { box-shadow: 0 0 15px rgba(107, 42, 255, 0.4); }
           }
           
           @keyframes logoFloat {
             0%, 100% { transform: translateY(0px) rotate(0deg); }
             50% { transform: translateY(-8px) rotate(2deg); }
           }
           
           @keyframes particleFloat {
             0% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
             50% { transform: translateY(-50px) rotate(180deg) scale(1.2); opacity: 0.8; }
             100% { transform: translateY(-100px) rotate(360deg) scale(0.8); opacity: 0; }
           }
           
           @keyframes shimmer {
             0% { transform: translateX(-100%) skewX(-15deg); }
             100% { transform: translateX(100%) skewX(-15deg); }
           }
           
           @keyframes pulseGlow {
             0%, 100% { filter: drop-shadow(0 0 10px rgba(107, 42, 255, 0.6)); }
             50% { filter: drop-shadow(0 0 20px rgba(107, 42, 255, 1)); }
           }
           
           @keyframes floatingElement {
             0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.3; }
             25% { transform: translateY(-15px) translateX(8px) rotate(8deg); opacity: 0.6; }
             50% { transform: translateY(15px) translateX(-8px) rotate(-8deg); opacity: 0.3; }
             75% { transform: translateY(-8px) translateX(15px) rotate(15deg); opacity: 0.6; }
           }
           
           @keyframes heartbeat {
             0%, 100% { transform: scale(1); }
             50% { transform: scale(1.1); }
           }
           
           @keyframes waveAnimation {
             0%, 100% { transform: scaleY(1); }
             50% { transform: scaleY(1.2); }
           }
           
           @keyframes circularProgress {
             0% { stroke-dashoffset: 180; }
             100% { stroke-dashoffset: 36; }
           }
           
           @keyframes auroraBorealis {
             0% { 
               transform: translateY(0px) rotate(0deg) scaleX(1); 
               opacity: 0.1; 
               filter: hue-rotate(0deg) brightness(1) blur(0px);
             }
             25% { 
               transform: translateY(-8px) rotate(0.5deg) scaleX(1.02); 
               opacity: 0.2; 
               filter: hue-rotate(30deg) brightness(1.1) blur(0.5px);
             }
             50% { 
               transform: translateY(-15px) rotate(0deg) scaleX(1.05); 
               opacity: 0.25; 
               filter: hue-rotate(60deg) brightness(1.2) blur(1px);
             }
             75% { 
               transform: translateY(-8px) rotate(-0.5deg) scaleX(1.02); 
               opacity: 0.2; 
               filter: hue-rotate(30deg) brightness(1.1) blur(0.5px);
             }
             100% { 
               transform: translateY(0px) rotate(0deg) scaleX(1); 
               opacity: 0.1; 
               filter: hue-rotate(0deg) brightness(1) blur(0px);
             }
           }
           
           @keyframes floatingBubbles {
             0% { 
               transform: translateY(100vh) translateX(0px) scale(0) rotate(0deg); 
               opacity: 0; 
               filter: blur(0px);
             }
             20% { 
               transform: translateY(80vh) translateX(5px) scale(0.3) rotate(36deg); 
               opacity: 0.1; 
               filter: blur(0.5px);
             }
             50% { 
               transform: translateY(20vh) translateX(-5px) scale(0.6) rotate(90deg); 
               opacity: 0.3; 
               filter: blur(0px);
             }
             80% { 
               transform: translateY(-20vh) translateX(2px) scale(0.4) rotate(144deg); 
               opacity: 0.15; 
               filter: blur(0.5px);
             }
             100% { 
               transform: translateY(-100vh) translateX(0px) scale(0) rotate(180deg); 
               opacity: 0; 
               filter: blur(1px);
             }
           }
           
           @keyframes morphingShapes {
             0% { 
               transform: scale(1) rotate(0deg) skewX(0deg); 
               border-radius: 50%; 
               opacity: 0.08; 
               filter: hue-rotate(0deg);
             }
             25% { 
               transform: scale(1.1) rotate(45deg) skewX(3deg); 
               border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%; 
               opacity: 0.12; 
               filter: hue-rotate(45deg);
             }
             50% { 
               transform: scale(0.9) rotate(90deg) skewX(0deg); 
               border-radius: 60% 40% 40% 60% / 60% 60% 40% 40%; 
               opacity: 0.15; 
               filter: hue-rotate(90deg);
             }
             75% { 
               transform: scale(1.05) rotate(135deg) skewX(-3deg); 
               border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; 
               opacity: 0.12; 
               filter: hue-rotate(135deg);
             }
             100% { 
               transform: scale(1) rotate(180deg) skewX(0deg); 
               border-radius: 50%; 
               opacity: 0.08; 
               filter: hue-rotate(180deg);
             }
           }
           
           @keyframes liquidFlow {
             0% { 
               transform: translateX(-100%) scaleY(1) rotate(0deg); 
               opacity: 0; 
               filter: blur(2px) brightness(0.8);
             }
             30% { 
               transform: translateX(-50%) scaleY(1.1) rotate(1deg); 
               opacity: 0.2; 
               filter: blur(1px) brightness(1.1);
             }
             60% { 
               transform: translateX(0%) scaleY(0.9) rotate(0deg); 
               opacity: 0.3; 
               filter: blur(0px) brightness(1.3);
             }
             80% { 
               transform: translateX(50%) scaleY(1.1) rotate(-1deg); 
               opacity: 0.2; 
               filter: blur(1px) brightness(1.1);
             }
             100% { 
               transform: translateX(150%) scaleY(1) rotate(0deg); 
               opacity: 0; 
               filter: blur(3px) brightness(0.8);
             }
           }
           
           @keyframes cosmicDust {
             0% { 
               transform: translateX(0px) translateY(0px) scale(1) rotate(0deg); 
               opacity: 0.05; 
               filter: brightness(1) blur(0px);
             }
             25% { 
               transform: translateX(10px) translateY(-8px) scale(1.05) rotate(45deg); 
               opacity: 0.1; 
               filter: brightness(1.1) blur(0.5px);
             }
             50% { 
               transform: translateX(-8px) translateY(10px) scale(0.95) rotate(90deg); 
               opacity: 0.15; 
               filter: brightness(1.2) blur(1px);
             }
             75% { 
               transform: translateX(8px) translateY(-10px) scale(1.02) rotate(135deg); 
               opacity: 0.1; 
               filter: brightness(1.1) blur(0.5px);
             }
             100% { 
               transform: translateX(0px) translateY(0px) scale(1) rotate(180deg); 
               opacity: 0.05; 
               filter: brightness(1) blur(0px);
             }
           }
           
           @keyframes energyPulse {
             0%, 100% { 
               transform: scale(1) rotate(0deg); 
               opacity: 0.1; 
               filter: brightness(1) blur(0px);
             }
             25% { 
               transform: scale(1.2) rotate(90deg); 
               opacity: 0.3; 
               filter: brightness(1.5) blur(1px);
             }
             50% { 
               transform: scale(1.5) rotate(180deg); 
               opacity: 0.5; 
               filter: brightness(2) blur(2px);
             }
             75% { 
               transform: scale(1.2) rotate(270deg); 
               opacity: 0.3; 
               filter: brightness(1.5) blur(1px);
             }
           }
           
           @keyframes waveRipple {
             0% { 
               transform: scale(0) rotate(0deg); 
               opacity: 0.8; 
               filter: blur(0px);
             }
             50% { 
               transform: scale(1) rotate(180deg); 
               opacity: 0.4; 
               filter: blur(1px);
             }
             100% { 
               transform: scale(2) rotate(360deg); 
               opacity: 0; 
               filter: blur(2px);
             }
           }
           
           @keyframes floatingOrbs {
             0% { 
               transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); 
               opacity: 0.1; 
               filter: brightness(1) blur(0px);
             }
             25% { 
               transform: translateY(-20px) translateX(10px) scale(1.1) rotate(90deg); 
               opacity: 0.2; 
               filter: brightness(1.2) blur(0.5px);
             }
             50% { 
               transform: translateY(-40px) translateX(-10px) scale(1.3) rotate(180deg); 
               opacity: 0.3; 
               filter: brightness(1.4) blur(1px);
             }
             75% { 
               transform: translateY(-20px) translateX(5px) scale(1.1) rotate(270deg); 
               opacity: 0.2; 
               filter: brightness(1.2) blur(0.5px);
             }
             100% { 
               transform: translateY(0px) translateX(0px) scale(1) rotate(360deg); 
               opacity: 0.1; 
               filter: brightness(1) blur(0px);
             }
           }
           
           @keyframes sparkleTwinkle {
             0%, 100% { 
               transform: scale(1) rotate(0deg); 
               opacity: 0.1; 
               filter: brightness(1) blur(0px);
             }
             25% { 
               transform: scale(1.5) rotate(45deg); 
               opacity: 0.6; 
               filter: brightness(2) blur(0px);
             }
             50% { 
               transform: scale(0.8) rotate(90deg); 
               opacity: 0.3; 
               filter: brightness(1.5) blur(0.5px);
             }
             75% { 
               transform: scale(1.2) rotate(135deg); 
               opacity: 0.5; 
               filter: brightness(1.8) blur(0px);
             }
           }
           
           
           
           @keyframes nebulaFloat {
             0%, 100% { 
               transform: translateY(0px) translateX(0px) rotate(0deg) scale(1) translateZ(0); 
               opacity: 0.1; 
               filter: blur(3px) brightness(0.8) hue-rotate(0deg);
             }
             25% { 
               transform: translateY(-40px) translateX(30px) rotate(90deg) scale(1.4) translateZ(0); 
               opacity: 0.3; 
               filter: blur(2px) brightness(1.2) hue-rotate(90deg);
             }
             50% { 
               transform: translateY(40px) translateX(-30px) rotate(180deg) scale(0.8) translateZ(0); 
               opacity: 0.2; 
               filter: blur(4px) brightness(0.6) hue-rotate(180deg);
             }
             75% { 
               transform: translateY(-20px) translateX(40px) rotate(270deg) scale(1.2) translateZ(0); 
               opacity: 0.25; 
               filter: blur(1px) brightness(1.1) hue-rotate(270deg);
             }
           }
           
           
           @keyframes hologramFlicker {
             0%, 100% { 
               opacity: 0.6; 
               filter: hue-rotate(0deg) brightness(1) contrast(1) saturate(1); 
               transform: scale(1) translateZ(0);
             }
             25% { 
               opacity: 0.8; 
               filter: hue-rotate(90deg) brightness(1.4) contrast(1.2) saturate(1.3); 
               transform: scale(1.08) translateZ(0);
             }
             50% { 
               opacity: 0.3; 
               filter: hue-rotate(180deg) brightness(0.6) contrast(0.8) saturate(0.7); 
               transform: scale(0.92) translateZ(0);
             }
             75% { 
               opacity: 0.9; 
               filter: hue-rotate(270deg) brightness(1.2) contrast(1.1) saturate(1.1); 
               transform: scale(1.04) translateZ(0);
             }
           }
           
           @keyframes quantumField {
             0% { 
               transform: scale(1) rotate(0deg) skewX(0deg) translateZ(0); 
               opacity: 0.1; 
               filter: hue-rotate(0deg) brightness(0.8) blur(2px);
             }
             25% { 
               transform: scale(1.4) rotate(90deg) skewX(8deg) translateZ(0); 
               opacity: 0.4; 
               filter: hue-rotate(90deg) brightness(1.3) blur(1px);
             }
             50% { 
               transform: scale(0.7) rotate(180deg) skewX(0deg) translateZ(0); 
               opacity: 0.2; 
               filter: hue-rotate(180deg) brightness(0.5) blur(3px);
             }
             75% { 
               transform: scale(1.2) rotate(270deg) skewX(-8deg) translateZ(0); 
               opacity: 0.3; 
               filter: hue-rotate(270deg) brightness(1.1) blur(1px);
             }
             100% { 
               transform: scale(1) rotate(360deg) skewX(0deg) translateZ(0); 
               opacity: 0.1; 
               filter: hue-rotate(360deg) brightness(0.8) blur(2px);
             }
           }
           
           @keyframes cosmicRipple {
             0% { 
               transform: scale(0) rotate(0deg) translateZ(0); 
               opacity: 1; 
               filter: brightness(1) blur(0px);
             }
             25% { 
               transform: scale(1.2) rotate(90deg) translateZ(0); 
               opacity: 0.7; 
               filter: brightness(1.3) blur(1px);
             }
             50% { 
               transform: scale(2) rotate(180deg) translateZ(0); 
               opacity: 0.4; 
               filter: brightness(1.6) blur(2px);
             }
             75% { 
               transform: scale(2.8) rotate(270deg) translateZ(0); 
               opacity: 0.2; 
               filter: brightness(1.9) blur(3px);
             }
             100% { 
               transform: scale(3.5) rotate(360deg) translateZ(0); 
               opacity: 0; 
               filter: brightness(2.2) blur(4px);
             }
           }
           
           
           @keyframes plasmaFlow {
             0% { 
               transform: translateX(-100%) scaleY(1) rotate(0deg) skewX(0deg) translateZ(0); 
               opacity: 0; 
               filter: blur(3px) brightness(0.5) hue-rotate(0deg);
             }
             20% { 
               transform: translateX(-60%) scaleY(1.4) rotate(5deg) skewX(3deg) translateZ(0); 
               opacity: 0.6; 
               filter: blur(2px) brightness(1.2) hue-rotate(72deg);
             }
             40% { 
               transform: translateX(-20%) scaleY(0.6) rotate(0deg) skewX(0deg) translateZ(0); 
               opacity: 1; 
               filter: blur(0px) brightness(1.8) hue-rotate(144deg);
             }
             60% { 
               transform: translateX(20%) scaleY(1.4) rotate(-5deg) skewX(-3deg) translateZ(0); 
               opacity: 0.8; 
               filter: blur(2px) brightness(1.2) hue-rotate(216deg);
             }
             80% { 
               transform: translateX(60%) scaleY(0.8) rotate(0deg) skewX(0deg) translateZ(0); 
               opacity: 0.4; 
               filter: blur(3px) brightness(0.8) hue-rotate(288deg);
             }
             100% { 
               transform: translateX(100%) scaleY(1) rotate(0deg) skewX(0deg) translateZ(0); 
               opacity: 0; 
               filter: blur(4px) brightness(0.5) hue-rotate(360deg);
             }
           }
           
           .logo-float {
             animation: logoFloat 4s ease-in-out infinite;
           }
           
           .particle-float {
             animation: particleFloat 2.5s ease-out forwards;
           }
           
           .shimmer-effect {
             animation: shimmer 2s ease-in-out infinite;
           }
           
           .pulse-glow {
             animation: pulseGlow 2s ease-in-out infinite;
           }
           
           .floating-element {
             animation: floatingElement 20s ease-in-out infinite;
           }
           
           .energy-pulse {
             animation: energyPulse 8s ease-in-out infinite;
           }
           
           .wave-ripple {
             animation: waveRipple 6s ease-out infinite;
           }
           
           .floating-orb {
             animation: floatingOrbs 12s ease-in-out infinite;
           }
           
           .sparkle-twinkle {
             animation: sparkleTwinkle 3s ease-in-out infinite;
           }
           
           .heartbeat-animation {
             animation: heartbeat 1.5s ease-in-out infinite;
           }
           
           .wave-animation {
             animation: waveAnimation 2s ease-in-out infinite;
           }
           
           .circular-progress {
             animation: circularProgress 2s ease-out forwards;
           }
           
           .particle-gold { background-color: #FFD700; }
           .particle-purple { background-color: #6B2AFF; }
           .particle-blue { background-color: #00C2FF; }
           .particle-pink { background-color: #FF6B9D; }
           .particle-cyan { background-color: #00E0FF; }
           
           .aurora-borealis {
             animation: auroraBorealis 12s ease-in-out infinite;
           }
           
           .floating-bubbles {
             animation: floatingBubbles 8s ease-in-out infinite;
           }
           
           .morphing-shapes {
             animation: morphingShapes 15s ease-in-out infinite;
           }
           
           .liquid-flow {
             animation: liquidFlow 10s ease-in-out infinite;
           }
           
           .cosmic-dust {
             animation: cosmicDust 20s ease-in-out infinite;
           }
           
         `}
       </style>
      
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: colors.primary.darkBg }}>
        {/* Aurora Borealis Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="absolute aurora-borealis"
              style={{
                top: `${20 + i * 15}%`,
                left: '0',
                width: '100%',
                height: '60px',
                background: `linear-gradient(45deg, 
                  transparent 0%, 
                  ${colors.primary.cyan}08 25%, 
                  ${colors.primary.purple}12 50%, 
                  ${colors.primary.pink}08 75%, 
                  transparent 100%)`,
                clipPath: 'polygon(0% 100%, 20% 80%, 40% 60%, 60% 40%, 80% 20%, 100% 0%, 100% 100%)',
                animationDelay: `${i * 3}s`,
                animationDuration: `${12 + i * 1.5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Floating Bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="absolute floating-bubbles"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '0',
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, 
                  ${i % 3 === 0 ? colors.primary.cyan : i % 3 === 1 ? colors.primary.purple : colors.primary.pink}15, 
                  ${i % 3 === 0 ? colors.primary.blue : i % 3 === 1 ? colors.primary.pink : colors.primary.cyan}08, 
                  transparent)`,
                boxShadow: `0 0 20px ${i % 3 === 0 ? colors.glow.cyan : i % 3 === 1 ? colors.glow.purple : colors.glow.pink}`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        {/* Morphing Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute morphing-shapes"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${100 + Math.random() * 150}px`,
                height: `${100 + Math.random() * 150}px`,
                background: `conic-gradient(from ${i * 45}deg, 
                  ${colors.primary.purple}08, 
                  ${colors.primary.blue}08, 
                  ${colors.primary.cyan}08, 
                  ${colors.primary.pink}08, 
                  transparent)`,
                animationDelay: `${i * 2.5}s`,
                animationDuration: `${15 + i * 1.2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Liquid Flow Streams */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute liquid-flow"
              style={{
                top: `${30 + i * 10}%`,
                left: '0',
                width: '100%',
                height: '3px',
                background: `linear-gradient(90deg, 
                  transparent, 
                  ${colors.primary.purple}20, 
                  ${colors.primary.cyan}30, 
                  ${colors.primary.pink}20, 
                  transparent)`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${10 + i * 0.8}s`
              }}
            ></div>
          ))}
        </div>

        {/* Cosmic Dust Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute cosmic-dust"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                borderRadius: '50%',
                background: i % 4 === 0 ? colors.primary.cyan : 
                           i % 4 === 1 ? colors.primary.purple : 
                           i % 4 === 2 ? colors.primary.pink : colors.primary.blue,
                boxShadow: `0 0 5px ${i % 4 === 0 ? colors.glow.cyan : 
                           i % 4 === 1 ? colors.glow.purple : 
                           i % 4 === 2 ? colors.glow.pink : colors.glow.blue}`,
                animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${18 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>


        {/* Éléments flottants en arrière-plan */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute floating-element"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: '20s'
            }}
          >
            <div 
              className="rounded-full"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                background: `radial-gradient(circle, ${colors.primary.purple}60 0%, transparent 70%)`,
                boxShadow: `0 0 15px ${colors.glow.purple}`
              }}
            ></div>
          </div>
        ))}

        {/* Gradient overlays animés pour plus de profondeur */}
        <div 
          className="absolute inset-0 pointer-events-none gradient-shift"
          style={{
            background: `radial-gradient(ellipse at top, ${colors.primary.purple}15 0%, transparent 60%)`,
            backgroundSize: '200% 200%'
          }}
        ></div>
        <div 
          className="absolute inset-0 pointer-events-none gradient-shift"
          style={{
            background: `radial-gradient(ellipse at bottom, ${colors.primary.blue}10 0%, transparent 60%)`,
            backgroundSize: '200% 200%',
            animationDelay: '2s'
          }}
        ></div>
        
        {/* Animated Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute background-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${i % 2 === 0 ? colors.primary.purple : colors.primary.blue}20 0%, transparent 70%)`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + i}s`
              }}
            ></div>
          ))}
        </div>

        {/* Energy Pulse Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={`energy-pulse-${i}`}
              className="absolute energy-pulse"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                width: `${60 + i * 10}px`,
                height: `${60 + i * 10}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, 
                  ${i % 3 === 0 ? colors.primary.cyan : i % 3 === 1 ? colors.primary.purple : colors.primary.pink}20, 
                  ${i % 3 === 0 ? colors.primary.blue : i % 3 === 1 ? colors.primary.pink : colors.primary.cyan}10, 
                  transparent)`,
                animationDelay: `${i * 4}s`,
                animationDuration: `${10 + i * 1.5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Wave Ripples */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={`wave-ripple-${i}`}
              className="absolute wave-ripple"
              style={{
                top: `${30 + i * 20}%`,
                left: `${25 + i * 25}%`,
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                borderRadius: '50%',
                border: `2px solid ${i % 2 === 0 ? colors.primary.cyan : colors.primary.purple}30`,
                animationDelay: `${i * 5}s`,
                animationDuration: `${8 + i * 1}s`
              }}
            ></div>
          ))}
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`floating-orb-${i}`}
              className="absolute floating-orb"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${30 + Math.random() * 20}px`,
                height: `${30 + Math.random() * 20}px`,
                borderRadius: '50%',
                background: `conic-gradient(from ${i * 45}deg, 
                  ${colors.primary.purple}15, 
                  ${colors.primary.blue}15, 
                  ${colors.primary.cyan}15, 
                  ${colors.primary.pink}15, 
                  transparent)`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${14 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        {/* Sparkle Twinkles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute sparkle-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${6 + Math.random() * 4}px`,
                height: `${6 + Math.random() * 4}px`,
                borderRadius: '50%',
                background: i % 3 === 0 ? colors.primary.cyan : 
                           i % 3 === 1 ? colors.primary.purple : colors.primary.pink,
                boxShadow: `0 0 8px ${i % 3 === 0 ? colors.glow.cyan : 
                           i % 3 === 1 ? colors.glow.purple : colors.glow.pink}`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 1.5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="relative z-10 flex justify-between items-center px-6 py-3 text-sm">
          <span className="text-white font-medium">9:41</span>
          <div className="flex items-center gap-2">
            {/* Signal bars */}
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-4 bg-white rounded-full"></div>
              <div className="w-1 h-5 bg-white rounded-full"></div>
              <div className="w-1 h-6 bg-white rounded-full"></div>
            </div>
            {/* WiFi icon */}
            <div className="w-4 h-4 border-2 border-white rounded-full">
              <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
            </div>
            {/* Battery */}
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>

        {/* Header avec hamburger menu et logo VitalForce */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4">
          <Menu className="w-6 h-6 text-white" />
          <div className="flex items-center gap-3">
            {/* Logo VitalForce avec gradient */}
            <div className="relative w-8 h-8">
              <div 
                className="absolute"
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '0px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '12px solid #6B2AFF',
                  left: '4px',
                  top: '0px',
                  transform: 'rotate(-15deg)',
                  filter: 'drop-shadow(0 0 6px rgba(107, 42, 255, 0.8))'
                }}
              ></div>
              <div 
                className="absolute"
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '8px solid transparent',
                  borderRight: '0px solid transparent',
                  borderBottom: '12px solid #00C2FF',
                  right: '4px',
                  top: '0px',
                  transform: 'rotate(15deg)',
                  filter: 'drop-shadow(0 0 6px rgba(0, 194, 255, 0.8))'
                }}
              ></div>
            </div>
            <h1 
              className="text-2xl font-bold text-white tracking-wide"
              style={{
                textShadow: '0 0 20px rgba(107, 42, 255, 0.5)',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              VitalForce
            </h1>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Experience Points Section */}
        <div className="relative z-10 px-6 py-4">
          <h2 className="text-lg font-bold text-white mb-4">Experience Points</h2>
          
          <div className="flex items-center justify-between mb-6">
            {/* Gold Hexagonal Badge */}
            <div 
              className="w-16 h-16 flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.gold} 0%, #FFA500 100%)`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                boxShadow: `0 0 20px ${colors.glow.gold}, 0 8px 32px rgba(255, 215, 0, 0.3), inset 0 -2px 8px rgba(0, 0, 0, 0.2)`
              }}
            >
              <span 
                className="text-white font-bold text-xl relative z-10"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.5)'
                }}
              >
                24
              </span>
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
              ></div>
            </div>

            {/* Central Circular Progress */}
            <div className="relative w-32 h-32 overflow-hidden">
              {/* Glow Background Layers */}
              <div 
                className="absolute inset-4 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${colors.primary.purple}04 0%, transparent 50%)`,
                  filter: 'blur(4px)',
                  animation: 'pulseGlow 2s ease-in-out infinite'
                }}
              ></div>

              <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                {/* Outer Glow Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40.5"
                  stroke="url(#outerGlowGradient)"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.2"
                  style={{
                    filter: 'blur(0.5px)'
                  }}
                />
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={colors.primary.cardBg}
                  strokeWidth="8"
                  fill="none"
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))'
                  }}
                />
                {/* Progress circle with enhanced glow */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset="50"
                  className="circular-progress"
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(107, 42, 255, 0.2)) drop-shadow(0 0 8px rgba(0, 194, 255, 0.1))'
                  }}
                />
                {/* Inner Glow Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="39.5"
                  stroke="url(#innerGlowGradient)"
                  strokeWidth="0.3"
                  fill="none"
                  opacity="0.2"
                  style={{
                    filter: 'blur(0.5px)'
                  }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.primary.purple} />
                    <stop offset="50%" stopColor={colors.primary.blue} />
                    <stop offset="100%" stopColor={colors.primary.cyan} />
                  </linearGradient>
                  <linearGradient id="outerGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.primary.purple} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={colors.primary.cyan} stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="innerGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.primary.cyan} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={colors.primary.purple} stopOpacity="0.15" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Enhanced Text Glow */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <span 
                  className="text-3xl font-bold text-white"
                  style={{
                    textShadow: `0 0 2px ${colors.primary.purple}, 0 0 4px ${colors.primary.blue}`,
                    filter: 'drop-shadow(0 0 1px rgba(255, 255, 255, 0.1))'
                  }}
                >
                  24
                </span>
                <span 
                  className="text-sm text-gray-300"
                  style={{
                    textShadow: `0 0 1px ${colors.primary.purple}, 0 0 2px ${colors.primary.blue}`,
                    filter: 'drop-shadow(0 0 0.5px rgba(255, 255, 255, 0.05))'
                  }}
                >
                  Level 24
                </span>
              </div>

              {/* Rotating Glow Orbs */}
              <div 
                className="absolute w-1 h-1 rounded-full"
                style={{
                  top: '8px',
                  left: '8px',
                  background: colors.primary.cyan,
                  boxShadow: `0 0 2px ${colors.glow.cyan}`,
                  animation: 'sparkleTwinkle 3s ease-in-out infinite'
                }}
              ></div>
              <div 
                className="absolute w-1 h-1 rounded-full"
                style={{
                  top: '8px',
                  right: '8px',
                  background: colors.primary.purple,
                  boxShadow: `0 0 2px ${colors.glow.purple}`,
                  animation: 'sparkleTwinkle 3s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              ></div>
              <div 
                className="absolute w-1 h-1 rounded-full"
                style={{
                  bottom: '8px',
                  left: '8px',
                  background: colors.primary.blue,
                  boxShadow: `0 0 2px ${colors.glow.blue}`,
                  animation: 'sparkleTwinkle 3s ease-in-out infinite',
                  animationDelay: '2s'
                }}
              ></div>
              <div 
                className="absolute w-1 h-1 rounded-full"
                style={{
                  bottom: '8px',
                  right: '8px',
                  background: colors.primary.pink,
                  boxShadow: `0 0 2px ${colors.glow.pink}`,
                  animation: 'sparkleTwinkle 3s ease-in-out infinite',
                  animationDelay: '0.5s'
                }}
              ></div>
            </div>

            {/* Purple Hexagonal Badge with Star */}
            <div 
              className="w-16 h-16 flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.purple} 0%, ${colors.primary.blue} 100%)`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                boxShadow: `0 0 20px ${colors.glow.purple}, 0 8px 32px rgba(107, 42, 255, 0.3), inset 0 -2px 8px rgba(0, 0, 0, 0.2)`
              }}
            >
              <Star 
                className="w-8 h-8 text-yellow-400 relative z-10" 
                fill="currentColor"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                }}
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
              ></div>
            </div>
          </div>

          {/* Detailed Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Emesionn Experiences</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">78%</span>
                <div className="text-xs text-gray-400">ROOLRY Acılaivanto</div>
              </div>
            </div>
            <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: colors.gradients.purpleBlue,
                  width: '78%',
                  boxShadow: `0 0 15px ${colors.glow.purple}, inset 0 -1px 4px rgba(0, 0, 0, 0.3)`
                }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
                  style={{ animationDuration: '2s' }}
                ></div>
              </div>
              <div 
                className="absolute w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full top-1/2 transform -translate-y-1/2 relative"
                style={{
                  left: 'calc(78% - 12px)',
                  boxShadow: `0 0 10px ${colors.glow.blue}, 0 0 20px rgba(0, 194, 255, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)`
                }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar and Toggle */}
        <div className="relative z-10 px-6 py-4">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Filmer Statue fatsps"
              className="w-full pl-12 pr-4 py-3 rounded-2xl text-white"
              style={{
                background: colors.primary.cardBg,
                border: `1px solid ${colors.primary.purple}30`,
                boxShadow: `0 4px 20px ${colors.glow.purple}20`
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Rentaner's</span>
            <button
              onClick={() => setIsToggleOn(!isToggleOn)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: isToggleOn ? colors.primary.progressGreen : colors.primary.cardBg,
                border: `2px solid ${isToggleOn ? colors.primary.progressGreen : colors.primary.purple}`
              }}
            >
              <div
                className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
                style={{
                  transform: isToggleOn ? 'translateX(6px)' : 'translateX(2px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
              ></div>
            </button>
          </div>
        </div>

        {/* Activity Cards Grid 2x2 */}
        <div className="relative z-10 px-6 py-4 mb-24">
          <div className="grid grid-cols-2 gap-4">
            {/* Daily Challenge Card */}
            <div 
              className="relative overflow-hidden rounded-3xl p-4 transform transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.purple} 0%, ${colors.primary.blue} 100%)`,
                boxShadow: `0 12px 40px ${colors.glow.purple}`
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-bold text-sm">Daily Challenge</h3>
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: colors.primary.cardBg,
                    color: colors.primary.textWhite
                  }}
                >
                  Pator
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">2%</span>
                <ArrowUp className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Moder Card */}
            <div 
              className="relative overflow-hidden rounded-3xl p-4 transform transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.purple} 0%, ${colors.primary.blue} 100%)`,
                boxShadow: `0 12px 40px ${colors.glow.purple}`
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-bold text-sm">Moder IciGLEEG</h3>
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: colors.primary.cardBg,
                    color: colors.primary.textWhite
                  }}
                >
                  Priate
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">40</span>
                <ArrowUp className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Fitness Card */}
            <div 
              className="relative overflow-hidden rounded-3xl p-4 transform transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.cardBg} 0%, #2A2F47 100%)`,
                boxShadow: `0 12px 40px ${colors.glow.blue}`,
                border: `2px solid ${colors.primary.blue}40`
              }}
            >
              <h3 className="text-white font-bold text-sm mb-3">Fitinesss</h3>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{
                    background: colors.gradients.blueCyan,
                    width: '65%',
                    boxShadow: `0 0 10px ${colors.glow.blue}`
                  }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
                    style={{ animationDuration: '1.5s' }}
                  ></div>
                </div>
                <div 
                  className="absolute w-4 h-4 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2"
                  style={{
                    left: 'calc(65% - 8px)',
                    boxShadow: `0 0 8px ${colors.glow.blue}`
                  }}
                ></div>
              </div>
            </div>

            {/* Figritsctengs Card */}
            <div 
              className="relative overflow-hidden rounded-3xl p-4 transform transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.cardBg} 0%, #2A2F47 100%)`,
                boxShadow: `0 12px 40px ${colors.glow.purple}`,
                border: `2px solid ${colors.primary.purple}40`
              }}
            >
              <h3 className="text-white font-bold text-sm mb-3">Figritsctengs</h3>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{
                    background: colors.gradients.purpleBlue,
                    width: '45%',
                    boxShadow: `0 0 10px ${colors.glow.purple}`
                  }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
                    style={{ animationDuration: '1.5s' }}
                  ></div>
                </div>
                <div 
                  className="absolute w-4 h-4 bg-purple-500 rounded-full top-1/2 transform -translate-y-1/2"
                  style={{
                    left: 'calc(45% - 8px)',
                    boxShadow: `0 0 8px ${colors.glow.purple}`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation avec design VitalForce exact */}
        <div className="fixed bottom-0 left-0 right-0 z-20" style={{ backgroundColor: colors.primary.darkBg }}>
          <div className="flex justify-around items-center py-5 px-6 border-t" style={{ borderColor: `${colors.primary.purple}20` }}>
            {/* Home Icon - Hexagonal/Cube shape */}
            <div className="flex flex-col items-center text-white">
              <div 
                className="w-8 h-8 flex items-center justify-center rounded-lg"
                style={{
                  background: colors.gradients.main,
                  boxShadow: `0 0 15px ${colors.glow.purple}`,
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                }}
              >
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xs mt-1">Home</span>
            </div>
            
            {/* Book/Document Icon */}
            <div className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs mt-1">Stats</span>
            </div>
            
            {/* Geometric Shape */}
            <div className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-gray-600 rounded-sm transform rotate-45"></div>
              <span className="text-xs mt-1">Activity</span>
            </div>
            
            {/* Gift/Box Icon */}
            <div className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
              <Gift className="w-6 h-6" />
              <span className="text-xs mt-1">Rewards</span>
            </div>
            
            {/* Profile Icon */}
            <div className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </div>
          </div>
          
          {/* Home gesture bar */}
          <div 
            className="w-32 h-1 rounded-full mx-auto mb-4"
            style={{
              backgroundColor: colors.primary.textWhite,
              boxShadow: `0 0 10px rgba(255, 255, 255, 0.4)`
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default VitalForcePage;
