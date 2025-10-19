// Composants UI spécifiques basés sur les éléments visuels fournis
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FitGENUIElements, getUIElementColor, getUIElementGradient } from './FitGENUIElements';

// Interface pour les props communes
interface BaseProps {
  style?: ViewStyle | TextStyle;
  children?: React.ReactNode;
}

// Bouton futuriste avec effet de lueur
interface FuturisticButtonProps extends TouchableOpacityProps, BaseProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'glow';
  size?: 'small' | 'medium' | 'large';
  glow?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export const FuturisticButton: React.FC<FuturisticButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  glow = true,
  icon,
  iconPosition = 'left',
  children,
  style,
  ...props
}) => {
  const getButtonConfig = () => {
    switch (variant) {
      case 'primary':
        return {
          gradient: getUIElementGradient('primary'),
          textColor: '#FFFFFF',
          glowColor: '#00C2FF',
        };
      case 'secondary':
        return {
          gradient: ['transparent', 'transparent'],
          textColor: '#6B2AFF',
          glowColor: '#6B2AFF',
          borderColor: '#6B2AFF',
        };
      case 'accent':
        return {
          gradient: getUIElementGradient('secondary'),
          textColor: '#FFFFFF',
          glowColor: '#FF7D3B',
        };
      case 'glow':
        return {
          gradient: getUIElementGradient('neon'),
          textColor: '#FFFFFF',
          glowColor: '#00C2FF',
        };
      default:
        return {
          gradient: getUIElementGradient('primary'),
          textColor: '#FFFFFF',
          glowColor: '#00C2FF',
        };
    }
  };

  const config = getButtonConfig();
  const height = size === 'small' ? 36 : size === 'large' ? 52 : 44;
  const borderRadius = size === 'small' ? 8 : size === 'large' ? 16 : 12;

  const buttonStyle = [
    styles.futuristicButton,
    {
      height,
      borderRadius,
      ...(variant === 'secondary' && {
        borderWidth: 2,
        borderColor: config.borderColor,
      }),
      ...(glow && {
        shadowColor: config.glowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
      }),
    },
    style,
  ];

  const textStyle = [
    styles.futuristicButtonText,
    {
      color: config.textColor,
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
    },
  ];

  return (
    <TouchableOpacity {...props} style={buttonStyle}>
      <LinearGradient
        colors={config.gradient}
        style={[styles.buttonGradient, { borderRadius }]}
      >
        <View style={styles.buttonContent}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon as any}
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              color={config.textColor}
              style={styles.buttonIconLeft}
            />
          )}
          <Text style={textStyle}>{children}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon as any}
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              color={config.textColor}
              style={styles.buttonIconRight}
            />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Carte futuriste avec effet de lueur
interface FuturisticCardProps extends BaseProps {
  variant?: 'default' | 'glow' | 'neon' | 'circuit';
  glow?: boolean;
  padding?: number;
  margin?: number;
}

export const FuturisticCard: React.FC<FuturisticCardProps> = ({
  variant = 'default',
  glow = true,
  padding,
  margin,
  children,
  style,
}) => {
  const getCardConfig = () => {
    switch (variant) {
      case 'glow':
        return {
          background: '#080B17',
          borderColor: '#00C2FF',
          glowColor: '#00C2FF',
        };
      case 'neon':
        return {
          background: '#0A0E1F',
          borderColor: '#6B2AFF',
          glowColor: '#6B2AFF',
        };
      case 'circuit':
        return {
          background: '#080B17',
          borderColor: '#1E2335',
          glowColor: '#00C2FF',
        };
      default:
        return {
          background: '#080B17',
          borderColor: '#1E2335',
          glowColor: '#6B2AFF',
        };
    }
  };

  const config = getCardConfig();
  const cardStyle = [
    styles.futuristicCard,
    {
      backgroundColor: config.background,
      borderColor: config.borderColor,
      padding: padding ?? 20,
      margin: margin ?? 15,
      ...(glow && {
        shadowColor: config.glowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
      }),
    },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

// Badge futuriste avec effet de lueur
interface FuturisticBadgeProps extends BaseProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'neon';
  size?: 'small' | 'medium' | 'large';
  glow?: boolean;
}

export const FuturisticBadge: React.FC<FuturisticBadgeProps> = ({
  variant = 'default',
  size = 'medium',
  glow = true,
  children,
  style,
}) => {
  const getBadgeConfig = () => {
    switch (variant) {
      case 'success':
        return {
          background: '#2ECC71',
          textColor: '#FFFFFF',
          glowColor: '#2ECC71',
        };
      case 'warning':
        return {
          background: '#F39C12',
          textColor: '#FFFFFF',
          glowColor: '#F39C12',
        };
      case 'error':
        return {
          background: '#E74C3C',
          textColor: '#FFFFFF',
          glowColor: '#E74C3C',
        };
      case 'info':
        return {
          background: '#3498DB',
          textColor: '#FFFFFF',
          glowColor: '#3498DB',
        };
      case 'neon':
        return {
          background: '#6B2AFF',
          textColor: '#FFFFFF',
          glowColor: '#00C2FF',
        };
      default:
        return {
          background: '#6B2AFF',
          textColor: '#FFFFFF',
          glowColor: '#6B2AFF',
        };
    }
  };

  const config = getBadgeConfig();
  const badgeStyle = [
    styles.futuristicBadge,
    {
      backgroundColor: config.background,
      paddingHorizontal: size === 'small' ? 8 : size === 'large' ? 16 : 12,
      paddingVertical: size === 'small' ? 4 : size === 'large' ? 8 : 6,
      ...(glow && {
        shadowColor: config.glowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 2,
      }),
    },
    style,
  ];

  const textStyle = [
    styles.futuristicBadgeText,
    {
      color: config.textColor,
      fontSize: size === 'small' ? 10 : size === 'large' ? 14 : 12,
    },
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

// Icône futuriste avec effet de lueur
interface FuturisticIconProps extends BaseProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: string;
  variant?: 'default' | 'glow' | 'neon' | 'accent';
  glow?: boolean;
}

export const FuturisticIcon: React.FC<FuturisticIconProps> = ({
  name,
  size = 'md',
  color,
  variant = 'default',
  glow = true,
  style,
}) => {
  const getIconConfig = () => {
    switch (variant) {
      case 'glow':
        return {
          color: color || '#00C2FF',
          glowColor: '#00C2FF',
        };
      case 'neon':
        return {
          color: color || '#6B2AFF',
          glowColor: '#6B2AFF',
        };
      case 'accent':
        return {
          color: color || '#FF7D3B',
          glowColor: '#FF7D3B',
        };
      default:
        return {
          color: color || '#FFFFFF',
          glowColor: '#00C2FF',
        };
    }
  };

  const config = getIconConfig();
  const iconSize = size === 'xs' ? 16 : size === 'sm' ? 20 : size === 'md' ? 24 : size === 'lg' ? 32 : size === 'xl' ? 40 : size === '2xl' ? 48 : 60;

  const iconStyle = [
    styles.futuristicIcon,
    {
      ...(glow && {
        shadowColor: config.glowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 2,
      }),
    },
    style,
  ];

  return (
    <View style={iconStyle}>
      <Ionicons
        name={name as any}
        size={iconSize}
        color={config.color}
      />
    </View>
  );
};

// Texte futuriste avec effet de lueur
interface FuturisticTextProps extends BaseProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  glow?: boolean;
}

export const FuturisticText: React.FC<FuturisticTextProps> = ({
  variant = 'body',
  color,
  align = 'left',
  weight,
  glow = false,
  children,
  style,
}) => {
  const getTextConfig = () => {
    switch (variant) {
      case 'h1':
        return { fontSize: 32, fontWeight: '700' };
      case 'h2':
        return { fontSize: 28, fontWeight: '700' };
      case 'h3':
        return { fontSize: 24, fontWeight: '600' };
      case 'h4':
        return { fontSize: 20, fontWeight: '600' };
      case 'h5':
        return { fontSize: 18, fontWeight: '600' };
      case 'h6':
        return { fontSize: 16, fontWeight: '600' };
      case 'body':
        return { fontSize: 16, fontWeight: '400' };
      case 'caption':
        return { fontSize: 12, fontWeight: '400' };
      case 'small':
        return { fontSize: 10, fontWeight: '400' };
      default:
        return { fontSize: 16, fontWeight: '400' };
    }
  };

  const config = getTextConfig();
  const textColor = color || (variant.startsWith('h') ? '#FFFFFF' : '#B8B9C3');
  const glowColor = glow ? '#00C2FF' : 'transparent';

  const textStyle = [
    config,
    {
      color: textColor,
      textAlign: align,
      fontWeight: weight || config.fontWeight,
      ...(glow && {
        textShadowColor: glowColor,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
      }),
    },
    style,
  ];

  return <Text style={textStyle}>{children}</Text>;
};

// Barre de progression futuriste
interface FuturisticProgressBarProps extends BaseProps {
  progress: number; // 0-100
  variant?: 'default' | 'neon' | 'glow' | 'circuit';
  height?: number;
  glow?: boolean;
}

export const FuturisticProgressBar: React.FC<FuturisticProgressBarProps> = ({
  progress,
  variant = 'default',
  height = 8,
  glow = true,
  style,
}) => {
  const getProgressConfig = () => {
    switch (variant) {
      case 'neon':
        return {
          background: '#1E2335',
          fill: ['#6B2AFF', '#00C2FF'],
          glowColor: '#00C2FF',
        };
      case 'glow':
        return {
          background: '#0A0E1F',
          fill: ['#00C2FF', '#6B2AFF'],
          glowColor: '#00C2FF',
        };
      case 'circuit':
        return {
          background: '#080B17',
          fill: ['#FF7D3B', '#E74C3C'],
          glowColor: '#FF7D3B',
        };
      default:
        return {
          background: '#1E2335',
          fill: ['#6B2AFF', '#00C2FF'],
          glowColor: '#00C2FF',
        };
    }
  };

  const config = getProgressConfig();
  const progressWidth = `${Math.min(Math.max(progress, 0), 100)}%`;

  const containerStyle = [
    styles.progressContainer,
    {
      height,
      backgroundColor: config.background,
      ...(glow && {
        shadowColor: config.glowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 1,
      }),
    },
    style,
  ];

  return (
    <View style={containerStyle}>
      <LinearGradient
        colors={config.fill}
        style={[
          styles.progressFill,
          {
            width: progressWidth,
            height,
            ...(glow && {
              shadowColor: config.glowColor,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 6,
              elevation: 2,
            }),
          },
        ]}
      />
    </View>
  );
};

// Styles pour les composants
const styles = StyleSheet.create({
  // Styles pour FuturisticButton
  futuristicButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  futuristicButtonText: {
    fontWeight: '600',
  },
  buttonIconLeft: {
    marginRight: 8,
  },
  buttonIconRight: {
    marginLeft: 8,
  },

  // Styles pour FuturisticCard
  futuristicCard: {
    borderRadius: 16,
    borderWidth: 1,
  },

  // Styles pour FuturisticBadge
  futuristicBadge: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  futuristicBadgeText: {
    fontWeight: '600',
  },

  // Styles pour FuturisticIcon
  futuristicIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Styles pour FuturisticProgressBar
  progressContainer: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 4,
  },
});

// Export de tous les composants
export const FuturisticComponents = {
  FuturisticButton,
  FuturisticCard,
  FuturisticBadge,
  FuturisticIcon,
  FuturisticText,
  FuturisticProgressBar,
};

export default FuturisticComponents;
