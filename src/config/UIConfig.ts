// Configuration UI/DA centralisée pour FitGEN
export interface UIConfig {
  // Couleurs principales
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  
  // Typographie
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  
  // Icônes personnalisées
  icons: {
    home: {
      gradientColors: {
        top: string;
        middle1: string;
        middle2: string;
        middle3: string;
        bottom: string;
      };
      glow: {
        color: string;
        blur: string;
        hoverColor: string;
        hoverBlur: string;
      };
      hover: {
        scale: number;
      };
    };
  };
  
  // Effets et animations
  effects: {
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
    transition: {
      fast: string;
      normal: string;
      slow: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  
  // Espacement
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  // Configuration de la page UI/DA
  uiPage: {
    background: {
      primary: string;
      secondary: string;
      gradient: string;
    };
    cards: {
      background: string;
      border: string;
      shadow: string;
      borderRadius: string;
    };
    text: {
      primary: string;
      secondary: string;
      accent: string;
    };
    buttons: {
      primary: {
        background: string;
        text: string;
        hover: string;
      };
      secondary: {
        background: string;
        text: string;
        hover: string;
      };
    };
    layout: {
      padding: string;
      margin: string;
      gap: string;
    };
  };
}

// Configuration par défaut
export const defaultUIConfig: UIConfig = {
  colors: {
    primary: '#8B45FF',
    secondary: '#3B82F6',
    accent: '#00C2FF',
    background: '#0A0A0A',
    surface: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
  },
  
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  icons: {
    home: {
      gradientColors: {
        top: '#8B45FF',
        middle1: '#7C3AED',
        middle2: '#6B2AFF',
        middle3: '#3B82F6',
        bottom: '#00C2FF',
      },
      glow: {
        color: 'rgba(139, 69, 255, 0.6)',
        blur: '8px',
        hoverColor: 'rgba(139, 69, 255, 0.8)',
        hoverBlur: '12px',
      },
      hover: {
        scale: 1.1,
      },
    },
  },
  
  effects: {
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    transition: {
      fast: 'all 0.15s ease',
      normal: 'all 0.3s ease',
      slow: 'all 0.5s ease',
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  // Configuration de la page UI/DA par défaut
  uiPage: {
    background: {
      primary: '#0A0A0A',
      secondary: '#1A1A1A',
      gradient: 'linear-gradient(135deg, #0A0A0A 0%, #1A0B2E 50%, #0A0A0A 100%)',
    },
    cards: {
      background: 'rgba(26, 26, 26, 0.8)',
      border: '1px solid rgba(139, 69, 255, 0.2)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      borderRadius: '16px',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
      accent: '#8B45FF',
    },
    buttons: {
      primary: {
        background: 'linear-gradient(135deg, #8B45FF 0%, #3B82F6 100%)',
        text: '#FFFFFF',
        hover: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
      },
      secondary: {
        background: 'rgba(139, 69, 255, 0.1)',
        text: '#8B45FF',
        hover: 'rgba(139, 69, 255, 0.2)',
      },
    },
    layout: {
      padding: '2rem',
      margin: '1rem',
      gap: '1.5rem',
    },
  },
};

// Fonctions utilitaires
export const saveUIConfig = (config: UIConfig): void => {
  localStorage.setItem('fitgen-ui-config', JSON.stringify(config));
};

export const loadUIConfig = (): UIConfig => {
  const saved = localStorage.getItem('fitgen-ui-config');
  if (saved) {
    try {
      return { ...defaultUIConfig, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Erreur lors du chargement de la configuration UI');
    }
  }
  return defaultUIConfig;
};

export const resetUIConfig = (): void => {
  localStorage.removeItem('fitgen-ui-config');
};
