// Espacement et dimensions centralisés pour FitGEN
export const Spacing = {
  // Espacement de base (multiples de 4)
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
  '7xl': 96,
  '8xl': 128,

  // Espacement spécifique aux composants
  component: {
    padding: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
    margin: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
  },

  // Espacement pour les layouts
  layout: {
    container: 20,
    section: 30,
    screen: 20,
  },

  // Espacement pour les grilles
  grid: {
    gap: 15,
    itemMargin: 5,
  },
};

export const Dimensions = {
  // Tailles de composants
  button: {
    height: {
      small: 36,
      medium: 44,
      large: 52,
    },
    borderRadius: {
      small: 8,
      medium: 12,
      large: 16,
    },
  },

  card: {
    borderRadius: 16,
    padding: 20,
    margin: 15,
  },

  input: {
    height: 50,
    borderRadius: 12,
    padding: 15,
  },

  // Tailles d'icônes
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
    '3xl': 60,
  },

  // Tailles d'avatar
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
    '2xl': 64,
  },

  // Hauteurs de ligne
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Bordures
  border: {
    width: {
      thin: 1,
      medium: 2,
      thick: 4,
    },
    radius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      '2xl': 20,
      full: 9999,
    },
  },

  // Ombres
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },

  // Z-index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

// Fonction utilitaire pour créer des styles d'espacement
export const createSpacing = (direction: 'horizontal' | 'vertical' | 'all', size: keyof typeof Spacing) => {
  const spacingValue = Spacing[size];
  
  switch (direction) {
    case 'horizontal':
      return { paddingHorizontal: spacingValue };
    case 'vertical':
      return { paddingVertical: spacingValue };
    case 'all':
      return { padding: spacingValue };
    default:
      return { padding: spacingValue };
  }
};

// Fonction utilitaire pour créer des marges
export const createMargin = (direction: 'horizontal' | 'vertical' | 'all', size: keyof typeof Spacing) => {
  const spacingValue = Spacing[size];
  
  switch (direction) {
    case 'horizontal':
      return { marginHorizontal: spacingValue };
    case 'vertical':
      return { marginVertical: spacingValue };
    case 'all':
      return { margin: spacingValue };
    default:
      return { margin: spacingValue };
  }
};
