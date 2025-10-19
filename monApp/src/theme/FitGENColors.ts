// Configuration des couleurs spécifiques à FitGEN
// Ce fichier contient toutes les couleurs utilisées dans l'application
// Basé sur l'esthétique moderne et futuriste des éléments UI fournis

export const FitGENColors = {
  // Couleurs principales de l'application (basées sur les éléments UI)
  primary: {
    // Bleu principal moderne
    main: '#00C2FF',
    light: '#4DD0FF',
    dark: '#0099CC',
    contrast: '#ffffff',
  },
  
  secondary: {
    // Violet secondaire futuriste
    main: '#6B2AFF',
    light: '#9A5AFF',
    dark: '#4A1ACC',
    contrast: '#ffffff',
  },
  
  accent: {
    // Orange vibrant pour les accents
    main: '#FF7D3B',
    light: '#FF9A5A',
    dark: '#CC5A1A',
    contrast: '#ffffff',
  },

  // Couleurs de statut (basées sur les éléments UI)
  status: {
    success: {
      main: '#2ECC71',
      light: '#58D68D',
      dark: '#27AE60',
      contrast: '#ffffff',
    },
    warning: {
      main: '#F39C12',
      light: '#F7DC6F',
      dark: '#D68910',
      contrast: '#000000',
    },
    error: {
      main: '#E74C3C',
      light: '#F1948A',
      dark: '#C0392B',
      contrast: '#ffffff',
    },
    info: {
      main: '#3498DB',
      light: '#85C1E9',
      dark: '#2980B9',
      contrast: '#ffffff',
    },
  },

  // Couleurs par catégorie d'exercice (basées sur les éléments UI)
  exercise: {
    force: {
      main: '#E74C3C',
      light: '#F1948A',
      dark: '#C0392B',
      gradient: ['#E74C3C', '#FF7D3B'],
    },
    endurance: {
      main: '#3498DB',
      light: '#85C1E9',
      dark: '#2980B9',
      gradient: ['#3498DB', '#00C2FF'],
    },
    calisthenics: {
      main: '#F39C12',
      light: '#F7DC6F',
      dark: '#D68910',
      gradient: ['#F39C12', '#FF7D3B'],
    },
    crossfit: {
      main: '#6B2AFF',
      light: '#9A5AFF',
      dark: '#4A1ACC',
      gradient: ['#6B2AFF', '#00C2FF'],
    },
    cardio: {
      main: '#2ECC71',
      light: '#58D68D',
      dark: '#27AE60',
      gradient: ['#2ECC71', '#3498DB'],
    },
    hiit: {
      main: '#E74C3C',
      light: '#F1948A',
      dark: '#C0392B',
      gradient: ['#E74C3C', '#F39C12'],
    },
  },

  // Couleurs par niveau de difficulté (basées sur les éléments UI)
  difficulty: {
    beginner: {
      main: '#2ECC71',
      light: '#58D68D',
      dark: '#27AE60',
      label: 'Débutant',
    },
    intermediate: {
      main: '#F39C12',
      light: '#F7DC6F',
      dark: '#D68910',
      label: 'Intermédiaire',
    },
    advanced: {
      main: '#E74C3C',
      light: '#F1948A',
      dark: '#C0392B',
      label: 'Avancé',
    },
    expert: {
      main: '#6B2AFF',
      light: '#9A5AFF',
      dark: '#4A1ACC',
      label: 'Expert',
    },
  },

  // Couleurs par type d'exercice
  exerciseType: {
    compound: {
      main: '#667eea',
      light: '#93c5fd',
      dark: '#2563eb',
      label: 'Compound',
    },
    bodyweight: {
      main: '#4ecdc4',
      light: '#7dd3fc',
      dark: '#0891b2',
      label: 'Bodyweight',
    },
    isometric: {
      main: '#ffd93d',
      light: '#fef08a',
      dark: '#eab308',
      label: 'Isométrique',
    },
    metabolic: {
      main: '#ff6b6b',
      light: '#fca5a5',
      dark: '#dc2626',
      label: 'Métabolique',
    },
    cardio: {
      main: '#44a08d',
      light: '#6ee7b7',
      dark: '#059669',
      label: 'Cardio',
    },
  },

  // Couleurs par programme
  program: {
    powerlifting: {
      main: '#667eea',
      light: '#93c5fd',
      dark: '#2563eb',
      gradient: ['#667eea', '#764ba2'],
    },
    musculation: {
      main: '#ff6b6b',
      light: '#fca5a5',
      dark: '#dc2626',
      gradient: ['#ff6b6b', '#ee5a52'],
    },
    cardio: {
      main: '#4ecdc4',
      light: '#7dd3fc',
      dark: '#0891b2',
      gradient: ['#4ecdc4', '#44a08d'],
    },
    hiit: {
      main: '#ff6b6b',
      light: '#fca5a5',
      dark: '#dc2626',
      gradient: ['#ff6b6b', '#ffd93d'],
    },
    calisthenics: {
      main: '#ffd93d',
      light: '#fef08a',
      dark: '#eab308',
      gradient: ['#ffd93d', '#ff6b6b'],
    },
    crossfit: {
      main: '#667eea',
      light: '#93c5fd',
      dark: '#2563eb',
      gradient: ['#667eea', '#764ba2'],
    },
  },

  // Couleurs par page
  page: {
    auth: {
      background: ['#667eea', '#764ba2'],
      form: '#ffffff',
      formBorder: 'rgba(255, 255, 255, 0.2)',
    },
    home: {
      background: ['#667eea', '#764ba2'],
      card: '#ffffff',
      cardShadow: 'rgba(0, 0, 0, 0.1)',
    },
    programs: {
      background: ['#667eea', '#764ba2'],
      category: 'rgba(255, 255, 255, 0.2)',
      categoryActive: '#ffffff',
    },
    exercises: {
      background: ['#667eea', '#764ba2'],
      card: '#ffffff',
      cardShadow: 'rgba(0, 0, 0, 0.1)',
    },
  },

  // Couleurs par composant
  component: {
    button: {
      primary: '#667eea',
      secondary: 'transparent',
      success: '#4ecdc4',
      warning: '#ffd93d',
      error: '#ff6b6b',
      disabled: '#9ca3af',
    },
    card: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    input: {
      background: '#ffffff',
      border: '#d1d5db',
      borderFocus: '#667eea',
      borderError: '#ff6b6b',
      placeholder: '#9ca3af',
    },
    badge: {
      background: '#667eea',
      text: '#ffffff',
      border: 'transparent',
    },
  },

  // Couleurs par état
  state: {
    hover: {
      primary: '#5a67d8',
      secondary: '#6b7280',
      success: '#0891b2',
      warning: '#eab308',
      error: '#dc2626',
    },
    active: {
      primary: '#4c51bf',
      secondary: '#4b5563',
      success: '#0e7490',
      warning: '#ca8a04',
      error: '#b91c1c',
    },
    disabled: {
      background: '#f3f4f6',
      text: '#9ca3af',
      border: '#d1d5db',
    },
  },

  // Couleurs par contexte
  context: {
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      dark: '#1f2937',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
      inverse: '#ffffff',
      disabled: '#9ca3af',
    },
    border: {
      light: '#e5e7eb',
      medium: '#d1d5db',
      dark: '#9ca3af',
    },
  },

  // Couleurs par icône
  icon: {
    primary: '#667eea',
    secondary: '#6b7280',
    success: '#4ecdc4',
    warning: '#ffd93d',
    error: '#ff6b6b',
    info: '#667eea',
    inverse: '#ffffff',
  },

  // Couleurs par gradient (basées sur les éléments UI)
  gradient: {
    primary: ['#6B2AFF', '#00C2FF'],
    secondary: ['#E74C3C', '#FF7D3B'],
    success: ['#2ECC71', '#3498DB'],
    warning: ['#F39C12', '#FF7D3B'],
    info: ['#3498DB', '#00C2FF'],
    dark: ['#0A0E1F', '#1E2335'],
    light: ['#FFFFFF', '#B8B9C3'],
    neon: ['#6B2AFF', '#00C2FF', '#FF7D3B'],
    futuristic: ['#0A0E1F', '#6B2AFF', '#00C2FF'],
  },

  // Couleurs par ombre
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.15)',
    colored: 'rgba(102, 126, 234, 0.2)',
  },

  // Couleurs par overlay
  overlay: {
    light: 'rgba(255, 255, 255, 0.8)',
    medium: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(0, 0, 0, 0.5)',
    colored: 'rgba(102, 126, 234, 0.1)',
  },
};

// Fonction pour obtenir une couleur par chemin
export const getFitGENColor = (path: string): string => {
  const pathParts = path.split('.');
  let current = FitGENColors;
  
  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return FitGENColors.primary.main;
    }
  }
  
  return typeof current === 'string' ? current : FitGENColors.primary.main;
};

// Fonction pour obtenir un gradient par nom
export const getFitGENGradient = (name: string): string[] => {
  return FitGENColors.gradient[name] || FitGENColors.gradient.primary;
};

// Fonction pour obtenir la couleur d'une catégorie d'exercice
export const getExerciseCategoryColor = (category: string): string => {
  return FitGENColors.exercise[category]?.main || FitGENColors.primary.main;
};

// Fonction pour obtenir la couleur d'un niveau de difficulté
export const getDifficultyColor = (difficulty: string): string => {
  return FitGENColors.difficulty[difficulty]?.main || FitGENColors.primary.main;
};

// Fonction pour obtenir la couleur d'un type d'exercice
export const getExerciseTypeColor = (type: string): string => {
  return FitGENColors.exerciseType[type]?.main || FitGENColors.primary.main;
};

// Fonction pour obtenir la couleur d'un programme
export const getProgramColor = (program: string): string => {
  return FitGENColors.program[program]?.main || FitGENColors.primary.main;
};

// Export par défaut
export default FitGENColors;
