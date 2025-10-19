// Configuration centralisée du thème pour FitGEN
import { Colors, DefaultColors, LightTheme, DarkTheme } from './colors';
import { Typography } from './typography';
import { Spacing, Dimensions } from './spacing';
import { AllStyles } from './components';

// Configuration du thème principal
export const ThemeConfig = {
  // Couleurs
  colors: Colors,
  defaultColors: DefaultColors,
  lightTheme: LightTheme,
  darkTheme: DarkTheme,

  // Typographie
  typography: Typography,

  // Espacement et dimensions
  spacing: Spacing,
  dimensions: Dimensions,

  // Styles de composants
  styles: AllStyles,

  // Configuration des gradients
  gradients: {
    primary: ['#667eea', '#764ba2'],
    secondary: ['#ff6b6b', '#ee5a52'],
    success: ['#4ecdc4', '#44a08d'],
    warning: ['#ffd93d', '#ff6b6b'],
    info: ['#a8edea', '#fed6e3'],
    dark: ['#2c3e50', '#34495e'],
    
    // Gradients par catégorie d'exercice
    force: ['#ff6b6b', '#ee5a52'],
    endurance: ['#4ecdc4', '#44a08d'],
    calisthenics: ['#ffd93d', '#ff6b6b'],
    crossfit: ['#667eea', '#764ba2'],
    cardio: ['#44a08d', '#4ecdc4'],
    hiit: ['#ff6b6b', '#ffd93d'],
  },

  // Configuration des icônes
  icons: {
    sizes: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 40,
      '2xl': 48,
      '3xl': 60,
    },
    colors: {
      primary: DefaultColors.primary,
      secondary: DefaultColors.secondary,
      success: DefaultColors.success,
      warning: DefaultColors.warning,
      error: DefaultColors.error,
      info: DefaultColors.info,
      text: DefaultColors.text.primary,
      inverse: DefaultColors.text.inverse,
    },
  },

  // Configuration des animations
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

  // Configuration des breakpoints (pour la responsivité)
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },

  // Configuration des composants spécifiques
  components: {
    // Configuration des boutons
    button: {
      heights: {
        small: 36,
        medium: 44,
        large: 52,
      },
      borderRadius: {
        small: 8,
        medium: 12,
        large: 16,
      },
      padding: {
        horizontal: Spacing.xl,
        vertical: Spacing.md,
      },
    },

    // Configuration des cartes
    card: {
      borderRadius: 16,
      padding: 20,
      margin: 15,
      shadow: Dimensions.shadow.md,
    },

    // Configuration des inputs
    input: {
      height: 50,
      borderRadius: 12,
      padding: 15,
      borderWidth: 1,
    },

    // Configuration des modales
    modal: {
      borderRadius: 16,
      padding: 20,
      margin: 20,
      maxWidth: '90%',
      maxHeight: '80%',
    },

    // Configuration des listes
    list: {
      itemPadding: 20,
      itemMargin: 15,
      itemBorderRadius: 16,
    },

    // Configuration des grilles
    grid: {
      gap: 15,
      itemMargin: 5,
    },
  },

  // Configuration des pages spécifiques
  pages: {
    // Page d'authentification
    auth: {
      backgroundGradient: ['#667eea', '#764ba2'],
      formContainer: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 32,
        marginHorizontal: 20,
        shadow: Dimensions.shadow.lg,
      },
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

  // Configuration des états
  states: {
    // États de difficulté
    difficulty: {
      beginner: {
        color: Colors.difficulty.beginner,
        label: 'Débutant',
      },
      intermediate: {
        color: Colors.difficulty.intermediate,
        label: 'Intermédiaire',
      },
      advanced: {
        color: Colors.difficulty.advanced,
        label: 'Avancé',
      },
      expert: {
        color: Colors.difficulty.expert,
        label: 'Expert',
      },
    },

    // États de catégorie
    category: {
      force: {
        color: Colors.category.force,
        label: 'Force',
        icon: 'barbell',
      },
      endurance: {
        color: Colors.category.endurance,
        label: 'Endurance',
        icon: 'walk',
      },
      calisthenics: {
        color: Colors.category.calisthenics,
        label: 'Calisthéniques',
        icon: 'fitness',
      },
      crossfit: {
        color: Colors.category.crossfit,
        label: 'Crossfit',
        icon: 'flash',
      },
      cardio: {
        color: Colors.category.cardio,
        label: 'Cardio',
        icon: 'heart',
      },
      hiit: {
        color: Colors.category.hiit,
        label: 'HIIT',
        icon: 'flame',
      },
    },

    // États de statut
    status: {
      success: {
        color: Colors.status.success,
        label: 'Succès',
        icon: 'checkmark-circle',
      },
      warning: {
        color: Colors.status.warning,
        label: 'Avertissement',
        icon: 'warning',
      },
      error: {
        color: Colors.status.error,
        label: 'Erreur',
        icon: 'close-circle',
      },
      info: {
        color: Colors.status.info,
        label: 'Information',
        icon: 'information-circle',
      },
    },
  },

  // Configuration des données par défaut
  defaults: {
    // Données par défaut pour les utilisateurs
    user: {
      age: 25,
      weight: 70,
      height: 175,
      level: 'Débutant',
      goal: 'Force',
      experience: '0-1 an',
      trainingDays: ['Lundi', 'Mercredi', 'Vendredi'],
      maxSquat: 100,
      maxBench: 80,
      maxDeadlift: 120,
      preferences: {
        sessionDuration: 60,
        intensity: 'Modérée',
        favoriteExercises: ['Squat', 'Développé Couché', 'Soulevé de Terre'],
      },
    },

    // Données par défaut pour les exercices
    exercise: {
      categories: ['Force', 'Endurance', 'Calisthéniques', 'Crossfit'],
      difficulties: ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'],
      types: ['Compound', 'Bodyweight', 'Isométrique', 'Métabolique', 'Cardio'],
    },

    // Données par défaut pour les programmes
    program: {
      categories: ['Powerlifting', 'Musculation', 'Cardio', 'HIIT'],
      difficulties: ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'],
      durations: ['4 semaines', '6 semaines', '8 semaines', '12 semaines', '16 semaines'],
      frequencies: ['2x/semaine', '3x/semaine', '4x/semaine', '5x/semaine'],
    },
  },
};

// Fonction utilitaire pour obtenir la configuration d'un composant
export const getComponentConfig = (componentName: string) => {
  return ThemeConfig.components[componentName] || {};
};

// Fonction utilitaire pour obtenir la configuration d'une page
export const getPageConfig = (pageName: string) => {
  return ThemeConfig.pages[pageName] || {};
};

// Fonction utilitaire pour obtenir la configuration d'un état
export const getStateConfig = (stateType: string, stateValue: string) => {
  return ThemeConfig.states[stateType]?.[stateValue] || {};
};

// Fonction utilitaire pour obtenir la configuration d'une couleur
export const getColorConfig = (colorType: string, colorValue?: string) => {
  if (colorValue) {
    return ThemeConfig.colors[colorType]?.[colorValue] || DefaultColors[colorType];
  }
  return ThemeConfig.colors[colorType] || DefaultColors[colorType];
};

// Fonction utilitaire pour obtenir la configuration d'un gradient
export const getGradientConfig = (gradientName: string) => {
  return ThemeConfig.gradients[gradientName] || ThemeConfig.gradients.primary;
};

// Fonction utilitaire pour obtenir la configuration d'une icône
export const getIconConfig = (iconType: string, iconValue?: string) => {
  if (iconValue) {
    return ThemeConfig.icons[iconType]?.[iconValue] || ThemeConfig.icons[iconType];
  }
  return ThemeConfig.icons[iconType] || ThemeConfig.icons.sizes;
};

// Export par défaut
export default ThemeConfig;
