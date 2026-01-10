// Configuration du thème VitalForce pour l'application entière
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
  shadows: {
    card: '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)',
    glow: (color: string) => `0 0 20px ${color}, 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 -2px 8px rgba(0, 0, 0, 0.2)`,
    button: '0 4px 16px rgba(107, 42, 255, 0.3), 0 2px 8px rgba(0, 194, 255, 0.3)',
    text: (color: string) => `0 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px ${color}`,
    progress: 'inset 0 -1px 4px rgba(0, 0, 0, 0.3)'
  },
  animations: {
    shimmer: 'shimmer 2s linear infinite',
    pulse: 'pulse 2s ease-in-out infinite',
    float: 'float 3s ease-in-out infinite'
  }
};

export default VitalForceTheme;

