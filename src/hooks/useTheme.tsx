// Hook de thème adapté pour React Web (au lieu de React Native)
import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { ThemeConfig } from '../config/ThemeConfig';

// Types pour le thème
export type ThemeMode = 'light' | 'dark' | 'auto';
export type ThemeVariant = 'futuristic' | 'neon' | 'circuit' | 'dark';

// Interface pour le contexte du thème
interface ThemeContextType {
  // État du thème
  mode: ThemeMode;
  variant: ThemeVariant;
  isDark: boolean;
  
  // Fonctions pour changer le thème
  setMode: (mode: ThemeMode) => void;
  setVariant: (variant: ThemeVariant) => void;
  toggleTheme: () => void;
  
  // Configuration du thème actuel
  colors: any;
  config: any;
  
  // Fonctions utilitaires
  getColor: (colorPath: string) => string;
  getGradient: (gradientName: string) => string[];
  getComponentStyle: (componentName: string) => any;
}

// Contexte du thème
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Configuration des variantes de thème basée sur ThemeConfig
const ThemeVariants = ThemeConfig.themes;

// Configuration par défaut
const DefaultConfig = ThemeConfig;

// Hook pour utiliser le thème
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Retourner une configuration par défaut si pas de contexte
    const defaultColors = ThemeVariants.futuristic;
    return {
      mode: 'light',
      variant: 'futuristic',
      isDark: false,
      setMode: () => {},
      setVariant: () => {},
      toggleTheme: () => {},
      colors: defaultColors,
      config: DefaultConfig,
      getColor: (path: string) => {
        const parts = path.split('.');
        let current: any = defaultColors;
        for (const part of parts) {
          current = current?.[part];
        }
        return typeof current === 'string' ? current : defaultColors.primary;
      },
      getGradient: (name: string) => {
        const gradients = {
          primary: [defaultColors.primary, defaultColors.secondary],
          secondary: [defaultColors.secondary, defaultColors.accent],
          accent: [defaultColors.accent, defaultColors.primary]
        };
        return gradients[name] || gradients.primary;
      },
      getComponentStyle: () => ({})
    };
  }
  return context;
};

// Provider du thème
interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  defaultVariant?: ThemeVariant;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'light',
  defaultVariant = 'futuristic',
}) => {
  // État du thème
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [variant, setVariantState] = useState<ThemeVariant>(defaultVariant);
  const [isDark, setIsDark] = useState(false);

  // Mettre à jour l'état sombre quand le mode change
  useEffect(() => {
    if (mode === 'auto') {
      // En mode auto, détecter la préférence système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    } else {
      setIsDark(mode === 'dark');
    }
  }, [mode]);

  // Sauvegarder le mode du thème dans localStorage
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('fitgen_theme_mode', newMode);
  };

  // Sauvegarder la variante du thème dans localStorage
  const setVariant = (newVariant: ThemeVariant) => {
    setVariantState(newVariant);
    localStorage.setItem('fitgen_theme_variant', newVariant);
  };

  // Basculer entre les thèmes clair et sombre
  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  // Charger le thème depuis localStorage au démarrage
  useEffect(() => {
    const savedMode = localStorage.getItem('fitgen_theme_mode') as ThemeMode;
    const savedVariant = localStorage.getItem('fitgen_theme_variant') as ThemeVariant;
    
    if (savedMode) {
      setModeState(savedMode);
    }
    
    if (savedVariant) {
      setVariantState(savedVariant);
    }
  }, []);

  // Obtenir les couleurs du thème actuel
  const getCurrentColors = () => {
    const baseColors = ThemeVariants[variant];
    
    // Ajuster les couleurs selon le mode sombre/clair
    if (isDark) {
      return {
        ...baseColors,
        background: '#1A1A1A',
        surface: '#2D2D2D',
        text: {
          primary: '#FFFFFF',
          secondary: '#B8B9C3',
          inverse: '#1A1A1A'
        },
        border: '#404040'
      };
    }
    
    return baseColors;
  };

  // Obtenir une couleur par chemin
  const getColor = (colorPath: string): string => {
    const colors = getCurrentColors();
    const pathParts = colorPath.split('.');
    
    let current = colors;
    for (const part of pathParts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return colors.primary;
      }
    }
    
    return typeof current === 'string' ? current : colors.primary;
  };

  // Obtenir un gradient par nom
  const getGradient = (gradientName: string): string[] => {
    const colors = getCurrentColors();
    
    switch (gradientName) {
      case 'primary':
        return [colors.primary, colors.secondary];
      case 'secondary':
        return [colors.secondary, colors.accent];
      case 'accent':
        return [colors.accent, colors.primary];
      case 'success':
        return ['#2ECC71', '#3498DB'];
      case 'warning':
        return ['#F39C12', colors.accent];
      case 'info':
        return ['#3498DB', colors.primary];
      default:
        return [colors.primary, colors.secondary];
    }
  };

  // Obtenir le style d'un composant
  const getComponentStyle = (componentName: string) => {
    return (DefaultConfig as any).components?.[componentName] || {};
  };

  // Configuration du thème actuel
  const currentConfig = {
    ...DefaultConfig,
    colors: getCurrentColors(),
    gradients: {
      primary: getGradient('primary'),
      secondary: getGradient('secondary'),
      accent: getGradient('accent'),
    },
  };

  // Valeur du contexte
  const contextValue: ThemeContextType = {
    mode,
    variant,
    isDark,
    setMode,
    setVariant,
    toggleTheme,
    colors: getCurrentColors(),
    config: currentConfig,
    getColor,
    getGradient,
    getComponentStyle,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hooks utilitaires
export const useColors = () => {
  const { colors } = useTheme();
  return colors;
};

export const useGradients = () => {
  const { getGradient } = useTheme();
  return {
    primary: getGradient('primary'),
    secondary: getGradient('secondary'),
    accent: getGradient('accent'),
    success: getGradient('success'),
    warning: getGradient('warning'),
    info: getGradient('info'),
  };
};

export const useThemeState = () => {
  const { mode, variant, isDark } = useTheme();
  return { mode, variant, isDark };
};

export const useThemeActions = () => {
  const { setMode, setVariant } = useTheme();
  return { setMode, setVariant };
};

export default ThemeProvider;
