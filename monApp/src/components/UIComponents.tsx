// Composants UI réutilisables pour FitGEN
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  TextInputProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemeConfig, getComponentConfig, getGradientConfig } from './index';

// Interface pour les props communes
interface BaseProps {
  style?: ViewStyle | TextStyle;
  children?: React.ReactNode;
}

// Composant Button réutilisable
interface ButtonProps extends TouchableOpacityProps, BaseProps {
  variant?: 'primary' | 'secondary' | 'text' | 'danger' | 'success' | 'disabled';
  size?: 'small' | 'medium' | 'large';
  gradient?: boolean;
  gradientColors?: string[];
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  gradient = false,
  gradientColors,
  icon,
  iconPosition = 'left',
  loading = false,
  children,
  style,
  ...props
}) => {
  const config = getComponentConfig('button');
  const height = config.heights[size];
  const borderRadius = config.borderRadius[size];
  
  const buttonStyle = [
    styles.button,
    {
      height,
      borderRadius,
      backgroundColor: gradient ? 'transparent' : ThemeConfig.defaultColors[variant === 'primary' ? 'primary' : variant],
    },
    style,
  ];

  const textStyle = [
    styles.buttonText,
    {
      color: variant === 'secondary' ? ThemeConfig.defaultColors.primary : ThemeConfig.defaultColors.text.inverse,
    },
  ];

  const ButtonComponent = gradient ? LinearGradient : TouchableOpacity;
  const gradientProps = gradient ? {
    colors: gradientColors || getGradientConfig('primary'),
    style: buttonStyle,
  } : {};

  return (
    <ButtonComponent
      {...props}
      {...gradientProps}
      style={gradient ? undefined : buttonStyle}
    >
      <View style={styles.buttonContent}>
        {icon && iconPosition === 'left' && (
          <Ionicons
            name={icon as any}
            size={ThemeConfig.icons.sizes.md}
            color={textStyle[1]?.color}
            style={styles.buttonIconLeft}
          />
        )}
        {loading ? (
          <Text style={textStyle}>Chargement...</Text>
        ) : (
          <Text style={textStyle}>{children}</Text>
        )}
        {icon && iconPosition === 'right' && (
          <Ionicons
            name={icon as any}
            size={ThemeConfig.icons.sizes.md}
            color={textStyle[1]?.color}
            style={styles.buttonIconRight}
          />
        )}
      </View>
    </ButtonComponent>
  );
};

// Composant Card réutilisable
interface CardProps extends BaseProps {
  variant?: 'base' | 'bordered' | 'stat' | 'exercise' | 'program';
  shadow?: boolean;
  padding?: number;
  margin?: number;
}

export const Card: React.FC<CardProps> = ({
  variant = 'base',
  shadow = true,
  padding,
  margin,
  children,
  style,
}) => {
  const config = getComponentConfig('card');
  const cardStyle = [
    styles.card,
    {
      padding: padding ?? config.padding,
      margin: margin ?? config.margin,
      ...(shadow ? ThemeConfig.dimensions.shadow.md : {}),
    },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

// Composant Input réutilisable
interface InputProps extends TextInputProps, BaseProps {
  variant?: 'base' | 'withIcon' | 'search' | 'error';
  icon?: string;
  iconPosition?: 'left' | 'right';
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  variant = 'base',
  icon,
  iconPosition = 'left',
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  const config = getComponentConfig('input');
  const inputStyle = [
    styles.input,
    {
      height: config.height,
      borderRadius: config.borderRadius,
      paddingHorizontal: config.padding,
      borderColor: error ? ThemeConfig.defaultColors.error : ThemeConfig.defaultColors.border,
      borderWidth: error ? 2 : 1,
    },
    style,
  ];

  const containerStyles = [
    styles.inputContainer,
    containerStyle,
  ];

  return (
    <View style={containerStyles}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {icon && iconPosition === 'left' && (
          <Ionicons
            name={icon as any}
            size={ThemeConfig.icons.sizes.md}
            color={ThemeConfig.defaultColors.text.secondary}
            style={styles.inputIconLeft}
          />
        )}
        <TextInput
          style={inputStyle}
          placeholderTextColor={ThemeConfig.defaultColors.text.secondary}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <Ionicons
            name={icon as any}
            size={ThemeConfig.icons.sizes.md}
            color={ThemeConfig.defaultColors.text.secondary}
            style={styles.inputIconRight}
          />
        )}
      </View>
      {error && <Text style={styles.inputError}>{error}</Text>}
    </View>
  );
};

// Composant Badge réutilisable
interface BadgeProps extends BaseProps {
  variant?: 'base' | 'difficulty' | 'category' | 'status';
  color?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'base',
  color,
  textColor,
  size = 'medium',
  children,
  style,
}) => {
  const badgeStyle = [
    styles.badge,
    {
      backgroundColor: color || ThemeConfig.defaultColors.primary,
      paddingHorizontal: size === 'small' ? 8 : size === 'large' ? 16 : 12,
      paddingVertical: size === 'small' ? 4 : size === 'large' ? 8 : 6,
    },
    style,
  ];

  const textStyle = [
    styles.badgeText,
    {
      color: textColor || ThemeConfig.defaultColors.text.inverse,
      fontSize: size === 'small' ? 10 : size === 'large' ? 14 : 12,
    },
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

// Composant Icon réutilisable
interface IconProps extends BaseProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: string;
  variant?: 'base' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'inverse';
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color,
  variant = 'base',
  style,
}) => {
  const iconSize = ThemeConfig.icons.sizes[size];
  const iconColor = color || ThemeConfig.icons.colors[variant];

  return (
    <Ionicons
      name={name as any}
      size={iconSize}
      color={iconColor}
      style={style}
    />
  );
};

// Composant Text réutilisable
interface TextProps extends BaseProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'bodySmall' | 'bodyLarge' | 'label' | 'caption' | 'small';
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  align = 'left',
  weight,
  children,
  style,
}) => {
  const textStyle = [
    ThemeConfig.typography.styles[variant],
    {
      color: color || ThemeConfig.defaultColors.text.primary,
      textAlign: align,
      fontWeight: weight || ThemeConfig.typography.styles[variant].fontWeight,
    },
    style,
  ];

  return <Text style={textStyle}>{children}</Text>;
};

// Composant Separator réutilisable
interface SeparatorProps extends BaseProps {
  variant?: 'horizontal' | 'vertical' | 'withText';
  text?: string;
  color?: string;
  thickness?: number;
}

export const Separator: React.FC<SeparatorProps> = ({
  variant = 'horizontal',
  text,
  color,
  thickness = 1,
  style,
}) => {
  if (variant === 'withText' && text) {
    return (
      <View style={[styles.separatorWithText, style]}>
        <View style={[styles.separatorLine, { backgroundColor: color || ThemeConfig.defaultColors.border }]} />
        <Text style={styles.separatorText}>{text}</Text>
        <View style={[styles.separatorLine, { backgroundColor: color || ThemeConfig.defaultColors.border }]} />
      </View>
    );
  }

  const separatorStyle = [
    variant === 'horizontal' ? styles.separatorHorizontal : styles.separatorVertical,
    {
      backgroundColor: color || ThemeConfig.defaultColors.border,
      [variant === 'horizontal' ? 'height' : 'width']: thickness,
    },
    style,
  ];

  return <View style={separatorStyle} />;
};

// Composant Loading réutilisable
interface LoadingProps extends BaseProps {
  variant?: 'container' | 'overlay';
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Loading: React.FC<LoadingProps> = ({
  variant = 'container',
  text = 'Chargement...',
  size = 'medium',
  style,
}) => {
  const loadingStyle = [
    variant === 'container' ? styles.loadingContainer : styles.loadingOverlay,
    style,
  ];

  return (
    <View style={loadingStyle}>
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};

// Styles pour les composants
const styles = StyleSheet.create({
  // Styles pour Button
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    ...ThemeConfig.dimensions.shadow.md,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...ThemeConfig.typography.styles.button,
    color: ThemeConfig.defaultColors.text.inverse,
  },
  buttonIconLeft: {
    marginRight: ThemeConfig.spacing.sm,
  },
  buttonIconRight: {
    marginLeft: ThemeConfig.spacing.sm,
  },

  // Styles pour Card
  card: {
    backgroundColor: ThemeConfig.defaultColors.background,
    borderRadius: ThemeConfig.dimensions.card.borderRadius,
    ...ThemeConfig.dimensions.shadow.md,
  },

  // Styles pour Input
  inputContainer: {
    marginBottom: ThemeConfig.spacing.md,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    ...ThemeConfig.typography.styles.input,
    color: ThemeConfig.defaultColors.text.primary,
  },
  inputLabel: {
    ...ThemeConfig.typography.styles.inputLabel,
    color: ThemeConfig.defaultColors.text.primary,
    marginBottom: ThemeConfig.spacing.xs,
  },
  inputError: {
    ...ThemeConfig.typography.styles.inputError,
    color: ThemeConfig.defaultColors.error,
    marginTop: ThemeConfig.spacing.xs,
  },
  inputIconLeft: {
    marginRight: ThemeConfig.spacing.sm,
  },
  inputIconRight: {
    marginLeft: ThemeConfig.spacing.sm,
  },

  // Styles pour Badge
  badge: {
    borderRadius: ThemeConfig.dimensions.border.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...ThemeConfig.typography.styles.badge,
    color: ThemeConfig.defaultColors.text.inverse,
  },

  // Styles pour Separator
  separatorHorizontal: {
    marginVertical: ThemeConfig.spacing.md,
  },
  separatorVertical: {
    marginHorizontal: ThemeConfig.spacing.md,
  },
  separatorWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ThemeConfig.spacing.md,
  },
  separatorLine: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    ...ThemeConfig.typography.styles.caption,
    color: ThemeConfig.defaultColors.text.secondary,
    marginHorizontal: ThemeConfig.spacing.md,
  },

  // Styles pour Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeConfig.defaultColors.background,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...ThemeConfig.typography.styles.body,
    color: ThemeConfig.defaultColors.text.secondary,
    marginTop: ThemeConfig.spacing.md,
  },
});

// Export de tous les composants
export const UIComponents = {
  Button,
  Card,
  Input,
  Badge,
  Icon,
  Text,
  Separator,
  Loading,
};

export default UIComponents;
