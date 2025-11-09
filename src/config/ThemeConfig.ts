// Configuration simple pour changer les couleurs de FitGEN
// Modifiez ces valeurs pour changer l'apparence de l'application

export const ThemeConfig = {
  // 🎨 COULEURS PRINCIPALES - VitalForce DA
  colors: {
    // Couleur principale de l'application
    primary: '#6B2AFF', // Violet VitalForce
    
    // Couleur secondaire
    secondary: '#00C2FF', // Bleu cyan VitalForce
    
    // Couleur d'accent
    accent: '#FF7D3B', // Orange vibrant
    
    // Couleurs de statut
    success: '#2ECC71', // Vert
    warning: '#F39C12', // Orange
    error: '#E74C3C', // Rouge
    info: '#3498DB', // Bleu
    
    // Couleurs de fond VitalForce
    background: '#0A0E1A', // Bleu nuit très sombre
    surface: '#1A1F2E', // Cartes VitalForce
    
    // Couleurs de texte
    text: {
      primary: '#FFFFFF', // Blanc
      secondary: '#A0AEC0', // Gris clair VitalForce
      inverse: '#0A0E1A' // Sombre
    },
    
    // Couleur des bordures
    border: '#313849' // Bordures sombres
  },

  // 🌈 THÈMES PRÉDÉFINIS - VitalForce DA
  themes: {
    futuristic: {
      name: 'VitalForce',
      primary: '#6B2AFF',
      secondary: '#00C2FF',
      accent: '#FF7D3B',
      background: '#0A0E1A',
      surface: '#1A1F2E',
      text: {
        primary: '#FFFFFF',
        secondary: '#A0AEC0',
        inverse: '#0A0E1A'
      },
      border: '#313849'
    },
    
    neon: {
      name: 'Néon',
      primary: '#FF6B9D',
      secondary: '#00E0FF',
      accent: '#FFD700',
      background: '#0A0E1A',
      surface: '#1A1F2E',
      text: {
        primary: '#FFFFFF',
        secondary: '#A0AEC0',
        inverse: '#0A0E1A'
      },
      border: '#313849'
    },
    
    circuit: {
      name: 'Circuit',
      primary: '#00C2FF',
      secondary: '#6B2AFF',
      accent: '#FF7D3B',
      background: '#0A0E1A',
      surface: '#1A1F2E',
      text: {
        primary: '#FFFFFF',
        secondary: '#A0AEC0',
        inverse: '#0A0E1A'
      },
      border: '#313849'
    },
    
    dark: {
      name: 'Ultra Sombre',
      primary: '#6B2AFF',
      secondary: '#00C2FF',
      accent: '#FF7D3B',
      background: '#000000',
      surface: '#0A0E1A',
      text: {
        primary: '#FFFFFF',
        secondary: '#A0AEC0',
        inverse: '#000000'
      },
      border: '#1A1F2E'
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
