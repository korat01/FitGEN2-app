// Export centralisé du système de design FitGEN
// Ce fichier permet d'importer facilement tous les éléments du système de design

// Export des couleurs
export * from '../theme/colors';

// Export de la typographie
export * from '../theme/typography';

// Export de l'espacement
export * from '../theme/spacing';

// Export des composants
export * from '../theme/components';

// Export de la configuration principale
export * from '../theme/index';

// Export des couleurs spécifiques FitGEN
export * from '../theme/FitGENColors';

// Export des éléments UI futuristes
export * from '../theme/FitGENUIElements';

// Export des composants UI de base
export * from '../components/UIComponents';

// Export des composants futuristes
export * from '../components/FuturisticComponents';

// Export des hooks
export * from '../hooks/useTheme';

// Export de la configuration rapide
export * from '../config/QuickConfig';

// Export par défaut de la configuration principale
export { default as ThemeConfig } from '../theme/index';
export { default as QuickConfig } from '../config/QuickConfig';
export { default as FitGENUIElements } from '../theme/FitGENUIElements';
export { default as FuturisticComponents } from '../components/FuturisticComponents';
