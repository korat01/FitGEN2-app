// Composants UI centralisés pour FitGEN
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors, DefaultColors } from './colors';
import { Typography } from './typography';
import { Spacing, Dimensions } from './spacing';

// Styles de base pour les composants
export const BaseStyles = StyleSheet.create({
  // Conteneurs
  container: {
    flex: 1,
    backgroundColor: DefaultColors.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: DefaultColors.background,
  },

  // Centrage
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Flexbox
  row: {
    flexDirection: 'row',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  spaceAround: {
    justifyContent: 'space-around',
  },
  
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },

  // Alignement
  alignStart: {
    alignItems: 'flex-start',
  },
  
  alignEnd: {
    alignItems: 'flex-end',
  },
  
  alignCenter: {
    alignItems: 'center',
  },

  // Positionnement
  absolute: {
    position: 'absolute',
  },
  
  relative: {
    position: 'relative',
  },

  // Overflow
  hidden: {
    overflow: 'hidden',
  },
});

// Styles pour les boutons
export const ButtonStyles = StyleSheet.create({
  // Bouton principal
  primary: {
    backgroundColor: DefaultColors.primary,
    borderRadius: Dimensions.button.borderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Dimensions.shadow.md,
  },
  
  primaryText: {
    ...Typography.styles.button,
    color: DefaultColors.text.inverse,
  },

  // Bouton secondaire
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: Dimensions.border.width.medium,
    borderColor: DefaultColors.primary,
    borderRadius: Dimensions.button.borderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  secondaryText: {
    ...Typography.styles.button,
    color: DefaultColors.primary,
  },

  // Bouton de texte
  text: {
    backgroundColor: 'transparent',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  textText: {
    ...Typography.styles.button,
    color: DefaultColors.primary,
  },

  // Bouton désactivé
  disabled: {
    backgroundColor: Colors.neutral[300],
    borderRadius: Dimensions.button.borderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  disabledText: {
    ...Typography.styles.button,
    color: Colors.neutral[500],
  },

  // Bouton de danger
  danger: {
    backgroundColor: DefaultColors.error,
    borderRadius: Dimensions.button.borderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Dimensions.shadow.md,
  },
  
  dangerText: {
    ...Typography.styles.button,
    color: DefaultColors.text.inverse,
  },

  // Bouton de succès
  success: {
    backgroundColor: DefaultColors.success,
    borderRadius: Dimensions.button.borderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Dimensions.shadow.md,
  },
  
  successText: {
    ...Typography.styles.button,
    color: DefaultColors.text.inverse,
  },

  // Bouton circulaire
  circular: {
    width: Dimensions.button.height.large,
    height: Dimensions.button.height.large,
    borderRadius: Dimensions.button.height.large / 2,
    backgroundColor: DefaultColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Dimensions.shadow.md,
  },
});

// Styles pour les cartes
export const CardStyles = StyleSheet.create({
  // Carte de base
  base: {
    backgroundColor: DefaultColors.background,
    borderRadius: Dimensions.card.borderRadius,
    padding: Dimensions.card.padding,
    margin: Dimensions.card.margin,
    ...Dimensions.shadow.md,
  },

  // Carte avec bordure
  bordered: {
    backgroundColor: DefaultColors.background,
    borderRadius: Dimensions.card.borderRadius,
    padding: Dimensions.card.padding,
    margin: Dimensions.card.margin,
    borderWidth: Dimensions.border.width.thin,
    borderColor: DefaultColors.border,
    ...Dimensions.shadow.sm,
  },

  // Carte de statistique
  stat: {
    backgroundColor: DefaultColors.background,
    borderRadius: Dimensions.card.borderRadius,
    padding: Dimensions.card.padding,
    margin: Dimensions.card.margin,
    alignItems: 'center',
    ...Dimensions.shadow.md,
  },

  // Carte d'exercice
  exercise: {
    backgroundColor: DefaultColors.background,
    borderRadius: Dimensions.card.borderRadius,
    padding: Dimensions.card.padding,
    margin: Dimensions.card.margin,
    ...Dimensions.shadow.md,
  },

  // Carte de programme
  program: {
    backgroundColor: DefaultColors.background,
    borderRadius: Dimensions.card.borderRadius,
    padding: Dimensions.card.padding,
    margin: Dimensions.card.margin,
    ...Dimensions.shadow.lg,
  },
});

// Styles pour les inputs
export const InputStyles = StyleSheet.create({
  // Input de base
  base: {
    height: Dimensions.input.height,
    borderRadius: Dimensions.input.borderRadius,
    paddingHorizontal: Dimensions.input.padding,
    backgroundColor: DefaultColors.background,
    borderWidth: Dimensions.border.width.thin,
    borderColor: DefaultColors.border,
    ...Typography.styles.input,
    color: DefaultColors.text.primary,
  },

  // Input avec icône
  withIcon: {
    height: Dimensions.input.height,
    borderRadius: Dimensions.input.borderRadius,
    paddingHorizontal: Dimensions.input.padding,
    backgroundColor: DefaultColors.background,
    borderWidth: Dimensions.border.width.thin,
    borderColor: DefaultColors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Input de recherche
  search: {
    height: Dimensions.input.height,
    borderRadius: Dimensions.input.borderRadius,
    paddingHorizontal: Dimensions.input.padding,
    backgroundColor: DefaultColors.background,
    borderWidth: Dimensions.border.width.thin,
    borderColor: DefaultColors.border,
    flexDirection: 'row',
    alignItems: 'center',
    ...Dimensions.shadow.sm,
  },

  // Input avec erreur
  error: {
    height: Dimensions.input.height,
    borderRadius: Dimensions.input.borderRadius,
    paddingHorizontal: Dimensions.input.padding,
    backgroundColor: DefaultColors.background,
    borderWidth: Dimensions.border.width.medium,
    borderColor: DefaultColors.error,
    ...Typography.styles.input,
    color: DefaultColors.text.primary,
  },

  // Label d'input
  label: {
    ...Typography.styles.inputLabel,
    color: DefaultColors.text.primary,
    marginBottom: Spacing.xs,
  },

  // Texte d'erreur
  errorText: {
    ...Typography.styles.inputError,
    color: DefaultColors.error,
    marginTop: Spacing.xs,
  },
});

// Styles pour les badges
export const BadgeStyles = StyleSheet.create({
  // Badge de base
  base: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Dimensions.border.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Badge de difficulté
  difficulty: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Dimensions.border.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Badge de catégorie
  category: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Dimensions.border.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Badge de statut
  status: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Dimensions.border.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Texte de badge
  text: {
    ...Typography.styles.badge,
    color: DefaultColors.text.inverse,
  },
});

// Styles pour les gradients
export const GradientStyles = {
  // Gradients principaux
  primary: ['#667eea', '#764ba2'],
  secondary: ['#ff6b6b', '#ee5a52'],
  success: ['#4ecdc4', '#44a08d'],
  warning: ['#ffd93d', '#ff6b6b'],
  info: ['#a8edea', '#fed6e3'],
  dark: ['#2c3e50', '#34495e'],

  // Gradients par catégorie
  force: ['#ff6b6b', '#ee5a52'],
  endurance: ['#4ecdc4', '#44a08d'],
  calisthenics: ['#ffd93d', '#ff6b6b'],
  crossfit: ['#667eea', '#764ba2'],
  cardio: ['#44a08d', '#4ecdc4'],
  hiit: ['#ff6b6b', '#ffd93d'],
};

// Styles pour les icônes
export const IconStyles = StyleSheet.create({
  // Icônes de base
  base: {
    color: DefaultColors.text.primary,
  },

  // Icônes d'accent
  accent: {
    color: DefaultColors.primary,
  },

  // Icônes de statut
  success: {
    color: DefaultColors.success,
  },
  
  warning: {
    color: DefaultColors.warning,
  },
  
  error: {
    color: DefaultColors.error,
  },
  
  info: {
    color: DefaultColors.info,
  },

  // Icônes inversées
  inverse: {
    color: DefaultColors.text.inverse,
  },
});

// Styles pour les modales
export const ModalStyles = StyleSheet.create({
  // Conteneur de modal
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Contenu de modal
  content: {
    backgroundColor: DefaultColors.background,
    borderRadius: Dimensions.card.borderRadius,
    padding: Dimensions.card.padding,
    margin: Spacing.lg,
    maxWidth: '90%',
    maxHeight: '80%',
    ...Dimensions.shadow.xl,
  },

  // Header de modal
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: Dimensions.border.width.thin,
    borderBottomColor: DefaultColors.border,
  },

  // Titre de modal
  title: {
    ...Typography.styles.h4,
    color: DefaultColors.text.primary,
  },

  // Bouton de fermeture
  closeButton: {
    padding: Spacing.sm,
  },
});

// Styles pour les listes
export const ListStyles = StyleSheet.create({
  // Conteneur de liste
  container: {
    flex: 1,
  },

  // Élément de liste
  item: {
    backgroundColor: DefaultColors.background,
    padding: Dimensions.card.padding,
    marginBottom: Spacing.sm,
    borderRadius: Dimensions.card.borderRadius,
    ...Dimensions.shadow.sm,
  },

  // Header d'élément
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  // Contenu d'élément
  itemContent: {
    flex: 1,
  },

  // Actions d'élément
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// Styles pour les grilles
export const GridStyles = StyleSheet.create({
  // Conteneur de grille
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Élément de grille
  item: {
    width: '48%',
    marginBottom: Spacing.lg,
  },

  // Élément de grille en 3 colonnes
  itemThree: {
    width: '31%',
    marginBottom: Spacing.lg,
  },
});

// Styles pour les séparateurs
export const SeparatorStyles = StyleSheet.create({
  // Séparateur horizontal
  horizontal: {
    height: Dimensions.border.width.thin,
    backgroundColor: DefaultColors.border,
    marginVertical: Spacing.md,
  },

  // Séparateur vertical
  vertical: {
    width: Dimensions.border.width.thin,
    backgroundColor: DefaultColors.border,
    marginHorizontal: Spacing.md,
  },

  // Séparateur avec texte
  withText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },

  // Ligne de séparateur
  line: {
    flex: 1,
    height: Dimensions.border.width.thin,
    backgroundColor: DefaultColors.border,
  },

  // Texte de séparateur
  text: {
    ...Typography.styles.caption,
    color: DefaultColors.text.secondary,
    marginHorizontal: Spacing.md,
  },
});

// Styles pour les indicateurs de chargement
export const LoadingStyles = StyleSheet.create({
  // Conteneur de chargement
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DefaultColors.background,
  },

  // Overlay de chargement
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Texte de chargement
  text: {
    ...Typography.styles.body,
    color: DefaultColors.text.secondary,
    marginTop: Spacing.md,
  },
});

// Styles pour les notifications
export const NotificationStyles = StyleSheet.create({
  // Conteneur de notification
  container: {
    position: 'absolute',
    top: 50,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: DefaultColors.background,
    borderRadius: Dimensions.card.borderRadius,
    padding: Dimensions.card.padding,
    ...Dimensions.shadow.lg,
    zIndex: Dimensions.zIndex.tooltip,
  },

  // Notification de succès
  success: {
    borderLeftWidth: Dimensions.border.width.thick,
    borderLeftColor: DefaultColors.success,
  },

  // Notification d'erreur
  error: {
    borderLeftWidth: Dimensions.border.width.thick,
    borderLeftColor: DefaultColors.error,
  },

  // Notification d'avertissement
  warning: {
    borderLeftWidth: Dimensions.border.width.thick,
    borderLeftColor: DefaultColors.warning,
  },

  // Notification d'information
  info: {
    borderLeftWidth: Dimensions.border.width.thick,
    borderLeftColor: DefaultColors.info,
  },

  // Titre de notification
  title: {
    ...Typography.styles.h6,
    color: DefaultColors.text.primary,
    marginBottom: Spacing.xs,
  },

  // Message de notification
  message: {
    ...Typography.styles.body,
    color: DefaultColors.text.secondary,
  },
});

// Export de tous les styles
export const AllStyles = {
  BaseStyles,
  ButtonStyles,
  CardStyles,
  InputStyles,
  BadgeStyles,
  IconStyles,
  ModalStyles,
  ListStyles,
  GridStyles,
  SeparatorStyles,
  LoadingStyles,
  NotificationStyles,
};
