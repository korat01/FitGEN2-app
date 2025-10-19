# 🎨 SYSTÈME DE DESIGN CENTRALISÉ FITGEN

## 📋 Vue d'ensemble

Le système de design centralisé de FitGEN permet de modifier l'ensemble de l'UI/UX de l'application en modifiant uniquement les fichiers de configuration, sans toucher au code des composants.

## 🚀 Installation et utilisation

### 1. Import du système

```typescript
// Import simple
import { useTheme, Button, Card, Input } from '../src';

// Import spécifique
import { useTheme } from '../src/hooks/useTheme';
import { Button, Card, Input } from '../src/components/UIComponents';
```

### 2. Utilisation dans un composant

```typescript
import React from 'react';
import { View } from 'react-native';
import { useTheme, Button, Card, Input } from '../src';

const MyComponent = () => {
  const { colors, getGradient } = useTheme();
  
  return (
    <View>
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
          onPress={() => {}}
        >
          Se connecter
        </Button>
      </Card>
    </View>
  );
};
```

## 🎨 Modification rapide de l'UI

### Changer les couleurs principales

1. Ouvrir `src/config/QuickConfig.ts`
2. Modifier les valeurs dans `colors` :

```typescript
colors: {
  primary: '#ff6b6b', // Nouvelle couleur principale
  secondary: '#4ecdc4', // Nouvelle couleur secondaire
  accent: '#ffd93d', // Nouvelle couleur d'accent
}
```

3. Redémarrer l'application

### Changer la typographie

1. Ouvrir `src/config/QuickConfig.ts`
2. Modifier les valeurs dans `typography` :

```typescript
typography: {
  baseFontSize: 18, // Nouvelle taille de base
  defaultFontWeight: '500', // Nouveau poids
  titleFontWeight: '800', // Nouveau poids des titres
}
```

3. Redémarrer l'application

### Changer l'espacement

1. Ouvrir `src/config/QuickConfig.ts`
2. Modifier les valeurs dans `spacing` :

```typescript
spacing: {
  base: 20, // Nouvel espacement de base
  section: 40, // Nouvel espacement des sections
  card: 25, // Nouvel espacement des cartes
}
```

3. Redémarrer l'application

## 🧩 Composants disponibles

### Button
```typescript
<Button
  variant="primary" // primary | secondary | text | danger | success | disabled
  size="medium" // small | medium | large
  gradient={true} // Utiliser un gradient
  icon="arrow-forward" // Nom de l'icône
  iconPosition="right" // left | right
  loading={false} // État de chargement
  onPress={() => {}}
>
  Texte du bouton
</Button>
```

### Card
```typescript
<Card
  variant="base" // base | bordered | stat | exercise | program
  shadow={true} // Afficher l'ombre
  padding={20} // Padding personnalisé
  margin={15} // Margin personnalisé
>
  Contenu de la carte
</Card>
```

### Input
```typescript
<Input
  variant="base" // base | withIcon | search | error
  icon="mail-outline" // Nom de l'icône
  iconPosition="left" // left | right
  label="Email" // Label du champ
  error="Erreur" // Message d'erreur
  placeholder="Votre email"
  value={email}
  onChangeText={setEmail}
/>
```

### Badge
```typescript
<Badge
  variant="base" // base | difficulty | category | status
  color="#ff6b6b" // Couleur personnalisée
  textColor="white" // Couleur du texte
  size="medium" // small | medium | large
>
  Texte du badge
</Badge>
```

### Icon
```typescript
<Icon
  name="fitness" // Nom de l'icône
  size="md" // xs | sm | md | lg | xl | 2xl | 3xl
  color="#ff6b6b" // Couleur personnalisée
  variant="accent" // base | accent | success | warning | error | info | inverse
/>
```

### Text
```typescript
<Text
  variant="h1" // h1 | h2 | h3 | h4 | h5 | h6 | body | bodySmall | bodyLarge | label | caption | small
  color="#333" // Couleur personnalisée
  align="center" // left | center | right
  weight="bold" // light | normal | medium | semibold | bold | extrabold
>
  Texte à afficher
</Text>
```

## 🎯 Hooks disponibles

### useTheme
```typescript
const {
  mode, // Mode du thème (light | dark | auto)
  variant, // Variante du thème
  isDark, // Si le thème est sombre
  setMode, // Fonction pour changer le mode
  setVariant, // Fonction pour changer la variante
  toggleTheme, // Fonction pour basculer le thème
  colors, // Couleurs du thème actuel
  config, // Configuration complète
  getColor, // Fonction pour obtenir une couleur
  getGradient, // Fonction pour obtenir un gradient
  getComponentStyle, // Fonction pour obtenir le style d'un composant
} = useTheme();
```

### useColors
```typescript
const colors = useColors();
// Retourne les couleurs du thème actuel
```

### useGradients
```typescript
const gradients = useGradients();
// Retourne tous les gradients disponibles
```

## 🌈 Thèmes prédéfinis

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

## 🔧 Configuration avancée

### Modifier les styles des composants

1. Ouvrir `src/theme/components.ts`
2. Modifier les styles dans `StyleSheet.create()`

### Ajouter de nouveaux composants

1. Créer le composant dans `src/components/UIComponents.tsx`
2. Ajouter les styles dans `src/theme/components.ts`
3. Exporter le composant dans `src/index.ts`

### Créer un nouveau thème

1. Ajouter le thème dans `src/config/QuickConfig.ts`
2. Modifier la logique dans `src/hooks/useTheme.ts`

## 📱 Responsivité

Le système inclut des breakpoints pour la responsivité :

```typescript
import { Dimensions } from 'react-native';
import { ThemeConfig } from '../src';

const { width } = Dimensions.get('window');
const isSmallScreen = width < ThemeConfig.breakpoints.medium;
```

## 🎨 Exemples d'utilisation

### Page d'authentification
```typescript
import { useTheme, Button, Input, Card } from '../src';

const AuthPage = () => {
  const { getGradient } = useTheme();
  
  return (
    <LinearGradient colors={getGradient('primary')} style={{ flex: 1 }}>
      <Card variant="base" style={{ margin: 20 }}>
        <Input
          variant="base"
          label="Email"
          icon="mail-outline"
          placeholder="Votre email"
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
import { useTheme, Card, Badge, Button } from '../src';

const HomePage = () => {
  const { getGradient } = useTheme();
  
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

## 🚀 Avantages du système

1. **Cohérence** : Interface uniforme dans toute l'application
2. **Maintenabilité** : Un seul endroit pour modifier l'UI/UX
3. **Performance** : Styles optimisés et réutilisés
4. **Flexibilité** : Support des thèmes clair/sombre et des variantes
5. **Responsivité** : Breakpoints intégrés pour tous les écrans
6. **Facilité d'utilisation** : Composants prêts à l'emploi

## 📝 Notes importantes

- Toujours utiliser le système de design pour maintenir la cohérence
- Les styles sont optimisés et réutilisés pour de meilleures performances
- Un seul endroit pour modifier l'UI/UX facilite la maintenance
- Support des thèmes clair/sombre et des variantes pour la flexibilité
- Breakpoints intégrés pour tous les écrans

## 🔄 Mise à jour du système

Pour mettre à jour le système de design :

1. Modifier les fichiers de configuration
2. Redémarrer l'application
3. Tester les changements
4. Ajuster si nécessaire

Le système est conçu pour être facilement modifiable et maintenable !
