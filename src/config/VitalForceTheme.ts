// Système de thème VitalForce global
export const VitalForceTheme = {
  colors: {
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
  },
  
  animations: {
    css: `
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
         75% { transform: translateY(-8px) translateX(10px) rotate(15deg); opacity: 0.6; }
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
       
       .particle-gold { background-color: #FFD700; }
       .particle-purple { background-color: #6B2AFF; }
       .particle-blue { background-color: #00C2FF; }
       .particle-pink { background-color: #FF6B9D; }
       .particle-cyan { background-color: #00E0FF; }
    `,
    
    classes: {
      logoFloat: 'logo-float',
      particleFloat: 'particle-float',
      shimmerEffect: 'shimmer-effect',
      pulseGlow: 'pulse-glow',
      floatingElement: 'floating-element',
      heartbeatAnimation: 'heartbeat-animation',
      waveAnimation: 'wave-animation',
      circularProgress: 'circular-progress',
      backgroundPulse: 'background-pulse',
      circuitFlow: 'circuit-flow',
      hexagonRotate: 'hexagon-rotate',
      gradientShift: 'gradient-shift',
      particleOrbit: 'particle-orbit',
      energyWave: 'energy-wave',
      matrixRain: 'matrix-rain'
    }
  },
  
  components: {
    card: {
      background: 'linear-gradient(135deg, #1A1F2E 0%, #2A2F47 100%)',
      borderRadius: '24px',
      border: '2px solid rgba(107, 42, 255, 0.3)',
      boxShadow: '0 12px 40px rgba(107, 42, 255, 0.2)',
      padding: '24px'
    },
    button: {
      primary: {
        background: 'linear-gradient(135deg, #FF6B9D 0%, #6B2AFF 100%)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(255, 107, 157, 0.6)',
        color: '#FFFFFF',
        fontWeight: 'bold',
        padding: '16px 32px',
        fontSize: '18px'
      },
      secondary: {
        background: 'linear-gradient(135deg, #1A1F2E 0%, #2A2F47 100%)',
        borderRadius: '16px',
        border: '2px solid #6B2AFF',
        color: '#FFFFFF',
        fontWeight: 'medium',
        padding: '12px 24px',
        fontSize: '16px'
      }
    },
    progressBar: {
      background: '#1A1F2E',
      borderRadius: '12px',
      height: '8px',
      overflow: 'hidden'
    },
    progressFill: {
      borderRadius: '12px',
      height: '100%',
      boxShadow: '0 0 15px rgba(107, 42, 255, 0.6)'
    }
  }
};

export default VitalForceTheme;
