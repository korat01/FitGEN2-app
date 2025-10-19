// Système de couleurs centralisé pour FitGEN
export const Colors = {
  // Couleurs principales
  primary: {
    50: '#f0f4ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#667eea', // Couleur principale
    600: '#5a67d8',
    700: '#4c51bf',
    800: '#434190',
    900: '#3c366b',
  },
  
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#764ba2', // Couleur secondaire
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },

  // Couleurs d'accent
  accent: {
    red: '#ff6b6b',
    orange: '#ffd93d',
    green: '#4ecdc4',
    blue: '#667eea',
    purple: '#764ba2',
    pink: '#ee5a52',
    cyan: '#44a08d',
    yellow: '#ffd93d',
  },

  // Couleurs de statut
  status: {
    success: '#4ecdc4',
    warning: '#ffd93d',
    error: '#ff6b6b',
    info: '#667eea',
  },

  // Couleurs de difficulté
  difficulty: {
    beginner: '#4ecdc4',
    intermediate: '#ffd93d',
    advanced: '#ff6b6b',
    expert: '#667eea',
  },

  // Couleurs de catégorie
  category: {
    force: '#ff6b6b',
    endurance: '#4ecdc4',
    calisthenics: '#ffd93d',
    crossfit: '#667eea',
    cardio: '#44a08d',
    hiit: '#ff6b6b',
  },

  // Couleurs neutres
  neutral: {
    50: '#f8f9fa',
    100: '#f1f3f4',
    200: '#e8eaed',
    300: '#dadce0',
    400: '#bdc1c6',
    500: '#9aa0a6',
    600: '#80868b',
    700: '#5f6368',
    800: '#3c4043',
    900: '#202124',
  },

  // Couleurs de fond
  background: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    tertiary: '#f1f3f4',
    dark: '#1a1a1a',
  },

  // Couleurs de texte
  text: {
    primary: '#202124',
    secondary: '#5f6368',
    tertiary: '#9aa0a6',
    inverse: '#ffffff',
    disabled: '#bdc1c6',
  },

  // Couleurs de bordure
  border: {
    light: '#e8eaed',
    medium: '#dadce0',
    dark: '#bdc1c6',
  },

  // Couleurs de gradient
  gradients: {
    primary: ['#667eea', '#764ba2'],
    secondary: ['#ff6b6b', '#ee5a52'],
    success: ['#4ecdc4', '#44a08d'],
    warning: ['#ffd93d', '#ff6b6b'],
    info: ['#a8edea', '#fed6e3'],
    dark: ['#2c3e50', '#34495e'],
  },
};

// Couleurs par défaut pour les composants
export const DefaultColors = {
  primary: Colors.primary[500],
  secondary: Colors.secondary[500],
  background: Colors.background.primary,
  surface: Colors.background.secondary,
  text: Colors.text.primary,
  textSecondary: Colors.text.secondary,
  border: Colors.border.light,
  error: Colors.status.error,
  success: Colors.status.success,
  warning: Colors.status.warning,
  info: Colors.status.info,
};

// Couleurs pour les thèmes
export const LightTheme = {
  ...DefaultColors,
  background: Colors.background.primary,
  surface: Colors.background.secondary,
  text: Colors.text.primary,
  textSecondary: Colors.text.secondary,
  border: Colors.border.light,
};

export const DarkTheme = {
  ...DefaultColors,
  background: Colors.background.dark,
  surface: Colors.neutral[800],
  text: Colors.text.inverse,
  textSecondary: Colors.neutral[300],
  border: Colors.neutral[700],
};
