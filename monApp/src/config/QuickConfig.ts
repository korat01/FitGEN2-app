// Configuration rapide pour modifier l'UI/UX de FitGEN
// Modifiez ces valeurs pour changer l'apparence de l'application
// Basé sur les éléments UI futuristes fournis

export const QuickConfig = {
  // 🎨 COULEURS PRINCIPALES (basées sur les éléments UI)
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
    background: {
      dark: '#0A0E1F', // Bleu nuit très sombre
      card: '#080B17', // Bleu nuit pour les cartes
      surface: '#1E2335', // Gris bleu foncé
    },
    
    // Couleurs de texte
    text: {
      primary: '#FFFFFF', // Blanc
      secondary: '#B8B9C3', // Gris clair
      accent: '#00C2FF', // Bleu cyan
    },
  },

  // 📝 TYPOGRAPHIE
  typography: {
    // Taille de police de base
    baseFontSize: 16,
    
    // Poids de police par défaut
    defaultFontWeight: '400',
    
    // Poids de police pour les titres
    titleFontWeight: '700',
    
    // Hauteur de ligne
    lineHeight: 1.6,
  },

  // 📏 ESPACEMENT
  spacing: {
    // Espacement de base (utilisé partout)
    base: 16,
    
    // Espacement pour les sections
    section: 30,
    
    // Espacement pour les cartes
    card: 20,
    
    // Espacement pour les boutons
    button: 12,
  },

  // 🧩 COMPOSANTS
  components: {
    // Rayon des bordures
    borderRadius: {
      small: 8,
      medium: 12,
      large: 16,
      extraLarge: 24,
    },
    
    // Hauteur des boutons
    buttonHeight: {
      small: 36,
      medium: 44,
      large: 52,
    },
    
    // Hauteur des inputs
    inputHeight: 50,
    
    // Padding des cartes
    cardPadding: 20,
    
    // Margin des cartes
    cardMargin: 15,
  },

  // 🌈 GRADIENTS (basés sur les éléments UI)
  gradients: {
    // Gradient principal (utilisé sur les pages principales)
    primary: ['#6B2AFF', '#00C2FF'], // Violet vers bleu cyan
    
    // Gradient secondaire
    secondary: ['#E74C3C', '#FF7D3B'], // Rouge vers orange
    
    // Gradient de succès
    success: ['#2ECC71', '#3498DB'], // Vert vers bleu
    
    // Gradient d'avertissement
    warning: ['#F39C12', '#FF7D3B'], // Orange vers orange vif
    
    // Gradient d'information
    info: ['#3498DB', '#00C2FF'], // Bleu vers bleu cyan
    
    // Gradient futuriste
    futuristic: ['#0A0E1F', '#6B2AFF', '#00C2FF'], // Sombre vers violet vers bleu cyan
    
    // Gradient néon
    neon: ['#6B2AFF', '#00C2FF', '#FF7D3B'], // Violet vers bleu cyan vers orange
  },

  // 🎯 THÈMES PRÉDÉFINIS (basés sur les éléments UI)
  themes: {
    // Thème futuriste (par défaut)
    futuristic: {
      name: 'Futuriste',
      primary: '#00C2FF',
      secondary: '#6B2AFF',
      accent: '#FF7D3B',
      background: '#0A0E1F',
    },
    
    // Thème néon
    neon: {
      name: 'Néon',
      primary: '#6B2AFF',
      secondary: '#00C2FF',
      accent: '#FF7D3B',
      background: '#0A0E1F',
    },
    
    // Thème circuit
    circuit: {
      name: 'Circuit',
      primary: '#00C2FF',
      secondary: '#1E2335',
      accent: '#FF7D3B',
      background: '#080B17',
    },
    
    // Thème sombre
    dark: {
      name: 'Sombre',
      primary: '#3498DB',
      secondary: '#2ECC71',
      accent: '#F39C12',
      background: '#0A0E1F',
    },
  },

  // 📱 RESPONSIVITÉ
  breakpoints: {
    // Écrans petits (téléphones)
    small: 576,
    
    // Écrans moyens (tablettes)
    medium: 768,
    
    // Écrans grands (desktop)
    large: 992,
    
    // Écrans très grands
    extraLarge: 1200,
  },

  // 🎨 STYLES SPÉCIFIQUES
  specificStyles: {
    // Page d'authentification
    auth: {
      backgroundGradient: ['#667eea', '#764ba2'],
      formBackground: 'white',
      formBorderRadius: 24,
      formPadding: 32,
    },
    
    // Page d'accueil
    home: {
      backgroundGradient: ['#667eea', '#764ba2'],
      headerPadding: 20,
      sectionSpacing: 30,
    },
    
    // Page des programmes
    programs: {
      backgroundGradient: ['#667eea', '#764ba2'],
      categorySpacing: 10,
      programCardSpacing: 20,
    },
    
    // Page des exercices
    exercises: {
      backgroundGradient: ['#667eea', '#764ba2'],
      searchContainerPadding: 20,
      exerciseCardSpacing: 15,
    },
  },

  // 🔧 CONFIGURATION AVANCÉE
  advanced: {
    // Ombres
    shadows: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      },
    },
    
    // Animations
    animations: {
      duration: {
        fast: 200,
        normal: 300,
        slow: 500,
      },
      easing: {
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
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
  },
};

// Fonction pour appliquer la configuration rapide
export const applyQuickConfig = () => {
  // Cette fonction peut être utilisée pour appliquer les changements
  // sans redémarrer l'application (si implémentée correctement)
  console.log('Configuration rapide appliquée:', QuickConfig);
};

// Fonction pour réinitialiser à la configuration par défaut
export const resetToDefault = () => {
  // Réinitialise toutes les valeurs à leur état par défaut
  console.log('Configuration réinitialisée');
};

// Export par défaut
export default QuickConfig;
