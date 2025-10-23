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
          
          @keyframes backgroundPulse {
            0%, 100% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(1.05); }
          }
          
          @keyframes circuitFlow {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 40; }
          }
          
          @keyframes hexagonRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes particleOrbit {
            0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
          }
          
          @keyframes energyWave {
            0% { transform: translateX(-100%) scaleY(1); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%) scaleY(1.5); opacity: 0; }
          }
          
          @keyframes matrixRain {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
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
          
          .background-pulse {
            animation: backgroundPulse 4s ease-in-out infinite;
          }
          
          .circuit-flow {
            animation: circuitFlow 3s linear infinite;
          }
          
          .hexagon-rotate {
            animation: hexagonRotate 20s linear infinite;
          }
          
          .gradient-shift {
            animation: gradientShift 8s ease-in-out infinite;
          }
          
          .particle-orbit {
            animation: particleOrbit 15s linear infinite;
          }
          
          .energy-wave {
            animation: energyWave 4s ease-in-out infinite;
          }
          
          .matrix-rain {
            animation: matrixRain 10s linear infinite;
          }
        `}
      </style>
      
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: colors.primary.darkBg }}>
        {/* Background Pattern - Circuit board texture animée */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="circuitPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path 
                  d="M40,0 L40,20 M40,60 L40,80 M0,40 L20,40 M60,40 L80,40" 
                  stroke={colors.primary.purple} 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.4"
                  strokeDasharray="5,5"
                  className="circuit-flow"
                />
                <circle 
                  cx="40" 
                  cy="40" 
                  r="3" 
                  fill={colors.primary.blue} 
                  opacity="0.6"
                  className="background-pulse"
                />
                <path 
                  d="M20,20 L60,60 M60,20 L20,60" 
                  stroke={colors.primary.cyan} 
                  strokeWidth="0.5" 
                  opacity="0.3"
                  strokeDasharray="3,3"
                  className="circuit-flow"
                  style={{ animationDelay: '1s' }}
                />
                <polygon 
                  points="40,10 50,20 40,30 30,20" 
                  fill={colors.primary.purple} 
                  opacity="0.2"
                  className="hexagon-rotate"
                />
              </pattern>
              <pattern id="hexPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path 
                  d="M50 10 L80 25 L80 75 L50 90 L20 75 L20 25 Z" 
                  fill="none" 
                  stroke={colors.primary.blue} 
                  strokeWidth="0.8" 
                  opacity="0.2"
                  className="hexagon-rotate"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="2" 
                  fill={colors.primary.cyan} 
                  opacity="0.4"
                  className="background-pulse"
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
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="absolute energy-wave"
              style={{
                top: `${20 + i * 15}%`,
                left: '0',
                width: '100%',
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${colors.primary.purple}, ${colors.primary.blue}, transparent)`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i}s`
              }}
            ></div>
          ))}
        </div>

        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute matrix-rain"
              style={{
                left: `${i * 5}%`,
                top: '0',
                width: '2px',
                height: '20px',
                background: `linear-gradient(to bottom, transparent, ${colors.primary.cyan}, transparent)`,
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
              className="absolute particle-orbit"
              style={{
                top: '50%',
                left: '50%',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: i % 2 === 0 ? colors.primary.purple : colors.primary.blue,
                boxShadow: `0 0 10px ${i % 2 === 0 ? colors.glow.purple : colors.glow.blue}`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + i * 2}s`
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
              className="w-16 h-16 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.gold} 0%, #FFA500 100%)`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                boxShadow: `0 0 20px ${colors.glow.gold}`
              }}
            >
              <span className="text-white font-bold text-xl">24</span>
            </div>

            {/* Central Circular Progress */}
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={colors.primary.cardBg}
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
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
                    filter: 'drop-shadow(0 0 10px rgba(107, 42, 255, 0.6))'
                  }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.primary.purple} />
                    <stop offset="100%" stopColor={colors.primary.blue} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">24</span>
                <span className="text-sm text-gray-300">Level 24</span>
              </div>
            </div>

            {/* Purple Hexagonal Badge with Star */}
            <div 
              className="w-16 h-16 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.primary.purple} 0%, ${colors.primary.blue} 100%)`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                boxShadow: `0 0 20px ${colors.glow.purple}`
              }}
            >
              <Star 
                className="w-8 h-8 text-yellow-400" 
                fill="currentColor"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))'
                }}
              />
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
            <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{
                  background: colors.gradients.purpleBlue,
                  width: '78%',
                  boxShadow: `0 0 15px ${colors.glow.purple}`
                }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
                  style={{ animationDuration: '2s' }}
                ></div>
              </div>
              <div 
                className="absolute w-6 h-6 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2"
                style={{
                  left: 'calc(78% - 12px)',
                  boxShadow: `0 0 10px ${colors.glow.blue}`
                }}
              ></div>
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