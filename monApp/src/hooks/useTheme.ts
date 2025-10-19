// Hook pour gérer le thème dans l'application FitGEN
import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeConfig, LightTheme, DarkTheme } from '../theme';

// Types pour le thème
export type ThemeMode = 'light' | 'dark' | 'auto';
export type ThemeVariant = 'default' | 'colorful' | 'minimal' | 'professional';

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
  colors: typeof LightTheme;
  config: typeof ThemeConfig;
  
  // Fonctions utilitaires
  getColor: (colorPath: string) => string;
  getGradient: (gradientName: string) => string[];
  getComponentStyle: (componentName: string) => any;
}

// Contexte du thème
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Clés pour le stockage
const THEME_MODE_KEY = '@fitgen_theme_mode';
const THEME_VARIANT_KEY = '@fitgen_theme_variant';

// Configuration des variantes de thème
const ThemeVariants = {
  default: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#ff6b6b',
  },
  colorful: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#ffd93d',
  },
  minimal: {
    primary: '#2c3e50',
    secondary: '#34495e',
    accent: '#3498db',
  },
  professional: {
    primary: '#1a365d',
    secondary: '#2d3748',
    accent: '#3182ce',
  },
};

// Hook pour utiliser le thème
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
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
  defaultVariant = 'default',
}) => {
  // État du thème
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [variant, setVariantState] = useState<ThemeVariant>(defaultVariant);
  const [isDark, setIsDark] = useState(false);

  // Charger le thème sauvegardé au démarrage
  useEffect(() => {
    loadTheme();
  }, []);

  // Mettre à jour l'état sombre quand le mode change
  useEffect(() => {
    if (mode === 'auto') {
      // En mode auto, détecter la préférence système
      // Pour l'instant, on utilise le mode clair par défaut
      setIsDark(false);
    } else {
      setIsDark(mode === 'dark');
    }
  }, [mode]);

  // Charger le thème depuis le stockage
  const loadTheme = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_MODE_KEY);
      const savedVariant = await AsyncStorage.getItem(THEME_VARIANT_KEY);
      
      if (savedMode) {
        setModeState(savedMode as ThemeMode);
      }
      
      if (savedVariant) {
        setVariantState(savedVariant as ThemeVariant);
      }
    } catch (error) {
      console.log('Erreur lors du chargement du thème:', error);
    }
  };

  // Sauvegarder le mode du thème
  const setMode = async (newMode: ThemeMode) => {
    try {
      setModeState(newMode);
      await AsyncStorage.setItem(THEME_MODE_KEY, newMode);
    } catch (error) {
      console.log('Erreur lors de la sauvegarde du mode:', error);
    }
  };

  // Sauvegarder la variante du thème
  const setVariant = async (newVariant: ThemeVariant) => {
    try {
      setVariantState(newVariant);
      await AsyncStorage.setItem(THEME_VARIANT_KEY, newVariant);
    } catch (error) {
      console.log('Erreur lors de la sauvegarde de la variante:', error);
    }
  };

  // Basculer entre les thèmes clair et sombre
  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  // Obtenir les couleurs du thème actuel
  const getCurrentColors = () => {
    const baseColors = isDark ? DarkTheme : LightTheme;
    const variantColors = ThemeVariants[variant];
    
    return {
      ...baseColors,
      primary: variantColors.primary,
      secondary: variantColors.secondary,
      accent: variantColors.accent,
    };
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
        return ThemeConfig.defaultColors.primary;
      }
    }
    
    return typeof current === 'string' ? current : ThemeConfig.defaultColors.primary;
  };

  // Obtenir un gradient par nom
  const getGradient = (gradientName: string): string[] => {
    const variantColors = ThemeVariants[variant];
    
    switch (gradientName) {
      case 'primary':
        return [variantColors.primary, variantColors.secondary];
      case 'secondary':
        return [variantColors.accent, variantColors.primary];
      case 'accent':
        return [variantColors.accent, variantColors.secondary];
      default:
        return ThemeConfig.gradients[gradientName] || ThemeConfig.gradients.primary;
    }
  };

  // Obtenir le style d'un composant
  const getComponentStyle = (componentName: string) => {
    return ThemeConfig.components[componentName] || {};
  };

  // Configuration du thème actuel
  const currentConfig = {
    ...ThemeConfig,
    colors: getCurrentColors(),
    gradients: {
      ...ThemeConfig.gradients,
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

// Hook pour obtenir les couleurs du thème actuel
export const useColors = () => {
  const { colors } = useTheme();
  return colors;
};

// Hook pour obtenir les gradients du thème actuel
export const useGradients = () => {
  const { getGradient } = useTheme();
  return {
    primary: getGradient('primary'),
    secondary: getGradient('secondary'),
    accent: getGradient('accent'),
    success: getGradient('success'),
    warning: getGradient('warning'),
    info: getGradient('info'),
    dark: getGradient('dark'),
  };
};

// Hook pour obtenir la configuration des composants
export const useComponentConfig = () => {
  const { getComponentStyle } = useTheme();
  return getComponentStyle;
};

// Hook pour basculer le thème
export const useToggleTheme = () => {
  const { toggleTheme } = useTheme();
  return toggleTheme;
};

// Hook pour obtenir l'état du thème
export const useThemeState = () => {
  const { mode, variant, isDark } = useTheme();
  return { mode, variant, isDark };
};

// Hook pour changer le thème
export const useThemeActions = () => {
  const { setMode, setVariant } = useTheme();
  return { setMode, setVariant };
};

// Export par défaut
export default ThemeProvider;
