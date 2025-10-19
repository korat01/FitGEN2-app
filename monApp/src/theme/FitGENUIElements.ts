// Configuration des éléments UI spécifiques à FitGEN
// Basé sur les éléments visuels fournis (patterns, backgrounds, couleurs, etc.)

export const FitGENUIElements = {
  // Couleurs principales basées sur les éléments UI
  colors: {
    // Couleurs de base
    primary: '#00C2FF',      // Bleu cyan lumineux
    secondary: '#6B2AFF',    // Violet futuriste
    accent: '#FF7D3B',       // Orange vibrant
    
    // Couleurs de fond
    background: {
      dark: '#0A0E1F',       // Bleu nuit très sombre
      card: '#080B17',      // Bleu nuit pour les cartes
      surface: '#1E2335',   // Gris bleu foncé
    },
    
    // Couleurs de texte
    text: {
      primary: '#FFFFFF',   // Blanc
      secondary: '#B8B9C3', // Gris clair
      accent: '#00C2FF',    // Bleu cyan
    },
    
    // Couleurs de statut
    status: {
      success: '#2ECC71',   // Vert
      warning: '#F39C12',   // Orange
      error: '#E74C3C',     // Rouge
      info: '#3498DB',      // Bleu
    },
  },

  // Gradients basés sur les éléments UI
  gradients: {
    // Gradient principal (violet vers bleu cyan)
    primary: ['#6B2AFF', '#00C2FF'],
    
    // Gradient secondaire (rouge vers orange)
    secondary: ['#E74C3C', '#FF7D3B'],
    
    // Gradient de fond sombre
    dark: ['#0A0E1F', '#1E2335'],
    
    // Gradient néon
    neon: ['#6B2AFF', '#00C2FF', '#FF7D3B'],
    
    // Gradient futuriste
    futuristic: ['#0A0E1F', '#6B2AFF', '#00C2FF'],
  },

  // Patterns et textures
  patterns: {
    // Pattern de circuit board
    circuitBoard: {
      background: '#FFFFFF',
      lines: '#000000',
      nodes: '#00C2FF',
    },
    
    // Pattern hexagonal
    hexagonal: {
      background: '#1E2335',
      border: '#6B2AFF',
      fill: '#0A0E1F',
    },
    
    // Pattern de grille
    grid: {
      background: '#0A0E1F',
      lines: '#1E2335',
      accent: '#6B2AFF',
    },
  },

  // Éléments décoratifs
  decorative: {
    // Particules lumineuses
    particles: {
      color: '#FFFFFF',
      glow: '#00C2FF',
      size: 'small',
    },
    
    // Lignes lumineuses
    lightLines: {
      color: '#00C2FF',
      glow: '#6B2AFF',
      thickness: 2,
    },
    
    // Formes géométriques
    shapes: {
      triangle: '#6B2AFF',
      hexagon: '#00C2FF',
      circle: '#FF7D3B',
    },
  },

  // Composants UI spécifiques
  components: {
    // Boutons
    button: {
      primary: {
        background: ['#6B2AFF', '#00C2FF'],
        text: '#FFFFFF',
        glow: '#00C2FF',
      },
      secondary: {
        background: 'transparent',
        border: '#6B2AFF',
        text: '#6B2AFF',
      },
    },
    
    // Cartes
    card: {
      background: '#080B17',
      border: '#1E2335',
      shadow: 'rgba(0, 0, 0, 0.3)',
      glow: '#6B2AFF',
    },
    
    // Badges
    badge: {
      background: '#6B2AFF',
      text: '#FFFFFF',
      glow: '#00C2FF',
    },
    
    // Icônes
    icon: {
      primary: '#00C2FF',
      secondary: '#6B2AFF',
      accent: '#FF7D3B',
      glow: '#FFFFFF',
    },
  },

  // Système de niveaux et progression
  progression: {
    // Couleurs par niveau
    levels: {
      beginner: '#2ECC71',    // Vert
      intermediate: '#F39C12', // Orange
      advanced: '#E74C3C',     // Rouge
      expert: '#6B2AFF',       // Violet
    },
    
    // Barres de progression
    progressBar: {
      background: '#1E2335',
      fill: ['#6B2AFF', '#00C2FF'],
      glow: '#00C2FF',
    },
    
    // Indicateurs de statut
    status: {
      active: '#00C2FF',
      inactive: '#1E2335',
      completed: '#2ECC71',
    },
  },

  // Animations et effets
  effects: {
    // Effets de lueur
    glow: {
      color: '#00C2FF',
      intensity: 'medium',
      spread: 10,
    },
    
    // Effets de particules
    particles: {
      color: '#FFFFFF',
      speed: 'medium',
      density: 'high',
    },
    
    // Effets de gradient
    gradient: {
      direction: 'diagonal',
      colors: ['#6B2AFF', '#00C2FF'],
      animation: 'pulse',
    },
  },

  // Typographie
  typography: {
    // Tailles de police
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 28,
      '4xl': 32,
      '5xl': 36,
      '6xl': 48,
    },
    
    // Poids de police
    weights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    // Couleurs de texte
    colors: {
      primary: '#FFFFFF',
      secondary: '#B8B9C3',
      accent: '#00C2FF',
      muted: '#6B7280',
    },
  },

  // Espacement
  spacing: {
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
  },

  // Bordures et rayons
  borders: {
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      '2xl': 20,
      full: 9999,
    },
    width: {
      thin: 1,
      medium: 2,
      thick: 4,
    },
  },

  // Ombres
  shadows: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    glow: {
      shadowColor: '#00C2FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 0,
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

// Fonction pour obtenir une couleur par chemin
export const getUIElementColor = (path: string): string => {
  const pathParts = path.split('.');
  let current = FitGENUIElements;
  
  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return FitGENUIElements.colors.primary;
    }
  }
  
  return typeof current === 'string' ? current : FitGENUIElements.colors.primary;
};

// Fonction pour obtenir un gradient par nom
export const getUIElementGradient = (name: string): string[] => {
  return FitGENUIElements.gradients[name] || FitGENUIElements.gradients.primary;
};

// Fonction pour obtenir la configuration d'un composant
export const getUIElementComponent = (componentName: string) => {
  return FitGENUIElements.components[componentName] || {};
};

// Export par défaut
export default FitGENUIElements;
