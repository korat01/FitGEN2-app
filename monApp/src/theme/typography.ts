// Typographie centralisée pour FitGEN
export const Typography = {
  // Tailles de police
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 48,
  },

  // Poids de police
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Hauteur de ligne
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Espacement des lettres
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },

  // Styles de texte prédéfinis
  styles: {
    // Titres
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 1.3,
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 1.3,
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 0,
    },
    h5: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 0,
    },
    h6: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 0,
    },

    // Corps de texte
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.6,
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 1.6,
      letterSpacing: 0,
    },

    // Labels et captions
    label: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 1.4,
      letterSpacing: 0.1,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 1.4,
      letterSpacing: 0.2,
    },
    small: {
      fontSize: 10,
      fontWeight: '400',
      lineHeight: 1.3,
      letterSpacing: 0.3,
    },

    // Boutons
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 0.1,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 0.1,
    },
    buttonLarge: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 0.1,
    },

    // Navigation
    navTitle: {
      fontSize: 20,
      fontWeight: '700',
      lineHeight: 1.3,
      letterSpacing: -0.2,
    },
    navItem: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 1.4,
      letterSpacing: 0,
    },

    // Cards et composants
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 1.3,
      letterSpacing: -0.1,
    },
    cardSubtitle: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.4,
      letterSpacing: 0,
    },
    cardBody: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // Stats et métriques
    statNumber: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 1.3,
      letterSpacing: 0.2,
    },

    // Formulaires
    input: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.4,
      letterSpacing: 0,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 1.4,
      letterSpacing: 0.1,
    },
    inputError: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 1.3,
      letterSpacing: 0.1,
    },

    // Badges et tags
    badge: {
      fontSize: 10,
      fontWeight: '600',
      lineHeight: 1.2,
      letterSpacing: 0.3,
    },
    tag: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 1.3,
      letterSpacing: 0.2,
    },
  },
};

// Fonction utilitaire pour créer des styles de texte
export const createTextStyle = (style: keyof typeof Typography.styles, color?: string) => ({
  ...Typography.styles[style],
  color: color || undefined,
});
