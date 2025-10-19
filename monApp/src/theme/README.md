// Guide d'utilisation du système de design centralisé FitGEN
// Ce fichier explique comment utiliser le système de design pour modifier l'UI/UX

/*
# 🎨 SYSTÈME DE DESIGN CENTRALISÉ FITGEN

## 📁 Structure des fichiers

```
src/
├── theme/
│   ├── index.ts          # Configuration principale du thème
│   ├── colors.ts         # Système de couleurs
│   ├── typography.ts      # Système de typographie
│   ├── spacing.ts        # Espacement et dimensions
│   └── components.ts     # Styles des composants
├── components/
│   └── UIComponents.tsx   # Composants réutilisables
└── hooks/
    └── useTheme.ts       # Hook de gestion du thème
```

## 🎯 Comment modifier l'UI/UX

### 1. 🎨 Modifier les couleurs

Pour changer les couleurs de l'application, modifiez le fichier `src/theme/colors.ts` :

```typescript
// Exemple : Changer la couleur principale
export const Colors = {
  primary: {
    500: '#ff6b6b', // Nouvelle couleur principale
    // ... autres nuances
  },
  // ... autres couleurs
};
```

### 2. 📝 Modifier la typographie

Pour changer les polices et tailles, modifiez `src/theme/typography.ts` :

```typescript
// Exemple : Changer la taille des titres
export const Typography = {
  styles: {
    h1: {
      fontSize: 36, // Nouvelle taille
      fontWeight: '800', // Nouveau poids
      // ... autres propriétés
    },
    // ... autres styles
  },
};
```

### 3. 📏 Modifier l'espacement

Pour changer les espacements, modifiez `src/theme/spacing.ts` :

```typescript
// Exemple : Changer l'espacement de base
export const Spacing = {
  base: 20, // Nouvel espacement de base
  // ... autres espacements
};
```

### 4. 🧩 Modifier les composants

Pour changer les styles des composants, modifiez `src/theme/components.ts` :

```typescript
// Exemple : Changer le style des boutons
export const ButtonStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#ff6b6b', // Nouvelle couleur
    borderRadius: 20, // Nouveau rayon
    // ... autres propriétés
  },
  // ... autres styles
});
```

## 🔧 Utilisation dans les composants

### 1. Utiliser le hook useTheme

```typescript
import { useTheme, useColors, useGradients } from '../hooks/useTheme';

const MyComponent = () => {
  const { colors, getGradient } = useTheme();
  const gradients = useGradients();
  
  return (
    <View style={{ backgroundColor: colors.primary }}>
      <LinearGradient colors={gradients.primary}>
        {/* Contenu */}
      </LinearGradient>
    </View>
  );
};
```

### 2. Utiliser les composants UI

```typescript
import { Button, Card, Input, Badge } from '../components/UIComponents';

const MyComponent = () => {
  return (
    <Card variant="base">
      <Input
        variant="base"
        label="Email"
        icon="mail-outline"
        placeholder="Votre email"
      />
      <Button
        variant="primary"
        gradient={true}
        icon="arrow-forward"
        onPress={() => {}}
      >
        Se connecter
      </Button>
      <Badge variant="success" color="#4ecdc4">
        Succès
      </Badge>
    </Card>
  );
};
```

### 3. Utiliser la configuration du thème

```typescript
import { ThemeConfig } from '../theme';

const MyComponent = () => {
  return (
    <View style={{
      padding: ThemeConfig.spacing.lg,
      borderRadius: ThemeConfig.dimensions.card.borderRadius,
      backgroundColor: ThemeConfig.defaultColors.background,
    }}>
      {/* Contenu */}
    </View>
  );
};
```

## 🎨 Thèmes prédéfinis

### Thème par défaut
- Couleur principale : #667eea (bleu)
- Couleur secondaire : #764ba2 (violet)
- Accent : #ff6b6b (rouge)

### Thème coloré
- Couleur principale : #ff6b6b (rouge)
- Couleur secondaire : #4ecdc4 (vert)
- Accent : #ffd93d (jaune)

### Thème minimal
- Couleur principale : #2c3e50 (gris foncé)
- Couleur secondaire : #34495e (gris)
- Accent : #3498db (bleu)

### Thème professionnel
- Couleur principale : #1a365d (bleu foncé)
- Couleur secondaire : #2d3748 (gris foncé)
- Accent : #3182ce (bleu)

## 🔄 Changement de thème dynamique

```typescript
import { useTheme } from '../hooks/useTheme';

const ThemeSelector = () => {
  const { setMode, setVariant, mode, variant } = useTheme();
  
  return (
    <View>
      <Button onPress={() => setMode('light')}>
        Mode Clair
      </Button>
      <Button onPress={() => setMode('dark')}>
        Mode Sombre
      </Button>
      <Button onPress={() => setVariant('colorful')}>
        Thème Coloré
      </Button>
    </View>
  );
};
```

## 📱 Responsivité

Le système inclut des breakpoints pour la responsivité :

```typescript
import { ThemeConfig } from '../theme';

const ResponsiveComponent = () => {
  const { width } = Dimensions.get('window');
  
  const isSmallScreen = width < ThemeConfig.breakpoints.md;
  
  return (
    <View style={{
      padding: isSmallScreen ? ThemeConfig.spacing.md : ThemeConfig.spacing.lg,
    }}>
      {/* Contenu adaptatif */}
    </View>
  );
};
```

## 🎯 Bonnes pratiques

### 1. Utiliser les composants réutilisables
- Préférer `<Button>` à `<TouchableOpacity>` personnalisé
- Utiliser `<Card>` pour les conteneurs
- Utiliser `<Input>` pour les champs de saisie

### 2. Respecter la hiérarchie des couleurs
- Utiliser `colors.primary` pour les éléments principaux
- Utiliser `colors.secondary` pour les éléments secondaires
- Utiliser `colors.accent` pour les accents

### 3. Utiliser l'espacement cohérent
- Utiliser `Spacing.base` pour l'espacement standard
- Utiliser `Spacing.lg` pour les sections
- Utiliser `Spacing.xl` pour les écarts importants

### 4. Respecter la typographie
- Utiliser `Typography.styles.h1` pour les titres principaux
- Utiliser `Typography.styles.body` pour le texte
- Utiliser `Typography.styles.caption` pour les légendes

## 🚀 Exemples d'utilisation

### Page d'authentification
```typescript
import { useTheme } from '../hooks/useTheme';
import { Button, Input, Card } from '../components/UIComponents';

const AuthPage = () => {
  const { colors, getGradient } = useTheme();
  
  return (
    <LinearGradient colors={getGradient('primary')} style={{ flex: 1 }}>
      <Card variant="base" style={{ margin: 20 }}>
        <Input
          variant="base"
          label="Email"
          icon="mail-outline"
          placeholder="Votre email"
        />
        <Input
          variant="base"
          label="Mot de passe"
          icon="lock-closed-outline"
          secureTextEntry
        />
        <Button
          variant="primary"
          gradient={true}
          onPress={() => {}}
        >
          Se connecter
        </Button>
      </Card>
    </LinearGradient>
  );
};
```

### Page d'accueil
```typescript
import { useTheme } from '../hooks/useTheme';
import { Card, Badge, Button } from '../components/UIComponents';

const HomePage = () => {
  const { colors, getGradient } = useTheme();
  
  return (
    <LinearGradient colors={getGradient('primary')} style={{ flex: 1 }}>
      <Card variant="stat">
        <Badge variant="success">12 Séances</Badge>
        <Badge variant="warning">2,847 Calories</Badge>
      </Card>
      
      <Card variant="exercise">
        <Button variant="primary" gradient={true}>
          Commencer
        </Button>
      </Card>
    </LinearGradient>
  );
};
```

## 🔧 Personnalisation avancée

### Créer un nouveau composant
```typescript
import { ThemeConfig } from '../theme';
import { StyleSheet } from 'react-native';

const MyCustomComponent = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeConfig.defaultColors.background,
    borderRadius: ThemeConfig.dimensions.card.borderRadius,
    padding: ThemeConfig.spacing.lg,
    ...ThemeConfig.dimensions.shadow.md,
  },
});
```

### Créer un nouveau style
```typescript
import { ThemeConfig } from '../theme';
import { StyleSheet } from 'react-native';

const customStyles = StyleSheet.create({
  specialButton: {
    backgroundColor: ThemeConfig.colors.accent.red,
    borderRadius: ThemeConfig.dimensions.border.radius.full,
    padding: ThemeConfig.spacing.xl,
    ...ThemeConfig.dimensions.shadow.lg,
  },
});
```

## 📝 Notes importantes

1. **Cohérence** : Toujours utiliser le système de design pour maintenir la cohérence
2. **Performance** : Les styles sont optimisés et réutilisés
3. **Maintenabilité** : Un seul endroit pour modifier l'UI/UX
4. **Flexibilité** : Support des thèmes clair/sombre et des variantes
5. **Responsivité** : Breakpoints intégrés pour tous les écrans

## 🎨 Exemples de modifications rapides

### Changer la couleur principale
1. Ouvrir `src/theme/colors.ts`
2. Modifier `primary.500`
3. Redémarrer l'app

### Changer la taille des boutons
1. Ouvrir `src/theme/spacing.ts`
2. Modifier `button.heights`
3. Redémarrer l'app

### Changer la police
1. Ouvrir `src/theme/typography.ts`
2. Modifier `fontSize` ou `fontWeight`
3. Redémarrer l'app

### Changer l'espacement
1. Ouvrir `src/theme/spacing.ts`
2. Modifier les valeurs d'espacement
3. Redémarrer l'app

Ce système permet de modifier l'ensemble de l'UI/UX de l'application en modifiant uniquement les fichiers de configuration, sans toucher au code des composants !
*/

export const DesignSystemGuide = {
  // Guide d'utilisation du système de design
  description: 'Système de design centralisé pour FitGEN',
  version: '1.0.0',
  lastUpdated: new Date().toISOString(),
};
