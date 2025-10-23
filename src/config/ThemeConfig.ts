// Configuration simple pour changer les couleurs de FitGEN
// Modifiez ces valeurs pour changer l'apparence de l'application

export const ThemeConfig = {
  // 🎨 COULEURS PRINCIPALES
  colors: {
    // Couleur principale de l'application
    primary: '#00C2FF', // Bleu cyan lumineux
    
    // Couleur secondaire
    secondary: '#6B2AFF', // Violet futuriste
    
    // Couleur d'accent
    accent: '#FF7D3B', // Orange vibrant
    
    // Couleurs de statut
    success: '#2ECC71', // Vert
    warning: '#F39C12', // Orange
    error: '#E74C3C', // Rouge
    info: '#3498DB', // Bleu
    
    // Couleurs de fond
    background: '#FFFFFF', // Blanc
    surface: '#F8F9FA', // Gris très clair
    
    // Couleurs de texte
    text: {
      primary: '#1A1A1A', // Noir
      secondary: '#6B7280', // Gris
      inverse: '#FFFFFF' // Blanc
    },
    
    // Couleur des bordures
    border: '#E5E7EB' // Gris clair
  },

  // 🌈 THÈMES PRÉDÉFINIS
  themes: {
    futuristic: {
      name: 'Futuriste',
      primary: '#00C2FF',
      secondary: '#6B2AFF',
      accent: '#FF7D3B',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: {
        primary: '#1A1A1A',
        secondary: '#6B7280',
        inverse: '#FFFFFF'
      },
      border: '#E5E7EB'
    },
    
    neon: {
      name: 'Néon',
      primary: '#6B2AFF',
      secondary: '#00C2FF',
      accent: '#FF7D3B',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: {
        primary: '#1A1A1A',
        secondary: '#6B7280',
        inverse: '#FFFFFF'
      },
      border: '#E5E7EB'
    },
    
    circuit: {
      name: 'Circuit',
      primary: '#00C2FF',
      secondary: '#1E2335',
      accent: '#FF7D3B',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: {
        primary: '#1A1A1A',
        secondary: '#6B7280',
        inverse: '#FFFFFF'
      },
      border: '#E5E7EB'
    },
    
    dark: {
      name: 'Sombre',
      primary: '#3498DB',
      secondary: '#2ECC71',
      accent: '#F39C12',
      background: '#1A1A1A',
      surface: '#2D2D2D',
      text: {
        primary: '#FFFFFF',
        secondary: '#B8B9C3',
        inverse: '#1A1A1A'
      },
      border: '#404040'
    }
  },

  // 📏 DIMENSIONS ET ESPACEMENT
  dimensions: {
    card: {
      borderRadius: 16
    },
    button: {
      borderRadius: {
        small: 8,
        medium: 12,
        large: 16
      }
    },
    border: {
      radius: {
        full: 9999
      }
    },
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },

  // 📝 TYPOGRAPHIE
  typography: {
    styles: {
      h1: { fontSize: '2.5rem', fontWeight: '700' },
      h2: { fontSize: '2rem', fontWeight: '600' },
      h3: { fontSize: '1.75rem', fontWeight: '600' },
      h4: { fontSize: '1.5rem', fontWeight: '600' },
      h5: { fontSize: '1.25rem', fontWeight: '600' },
      h6: { fontSize: '1.125rem', fontWeight: '600' },
      body: { fontSize: '1rem', fontWeight: '400' },
      bodyLarge: { fontSize: '1.125rem', fontWeight: '400' },
      bodySmall: { fontSize: '0.875rem', fontWeight: '400' },
      button: { fontSize: '1rem', fontWeight: '500' }
    }
  }
};

// Fonction pour changer rapidement les couleurs
export const changeThemeColors = (newColors: Partial<typeof ThemeConfig.colors>) => {
  Object.assign(ThemeConfig.colors, newColors);
  console.log('🎨 Couleurs mises à jour:', ThemeConfig.colors);
};

// Fonction pour changer de thème
export const changeTheme = (themeName: keyof typeof ThemeConfig.themes) => {
  const theme = ThemeConfig.themes[themeName];
  if (theme) {
    Object.assign(ThemeConfig.colors, theme);
    console.log(`🎨 Thème changé vers: ${theme.name}`);
  }
};

export default ThemeConfig;
