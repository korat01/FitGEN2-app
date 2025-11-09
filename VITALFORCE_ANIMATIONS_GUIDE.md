# Guide d'utilisation des animations VitalForce

Ce guide explique comment intégrer les animations VitalForce dans vos pages.

## Composant VitalForceBackground

Le composant `VitalForceBackground` ajoute des animations flottantes et des particules en arrière-plan de vos pages, créant une ambiance futuriste inspirée du design VitalForce.

### Import

```tsx
import { VitalForceBackground } from '@/components/VitalForceBackground';
```

### Utilisation

```tsx
const MaPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <VitalForceBackground intensity="medium" />
      {/* Votre contenu ici */}
    </div>
  );
};
```

### Props

- **intensity**: `'low' | 'medium' | 'high'` (optionnel, par défaut: `'medium'`)
  - `'low'`: Animations légères, peu d'éléments (3 aurora, 8 bulles, 4 formes, 10 particules)
  - `'medium'`: Animations modérées, équilibrées (5 aurora, 12 bulles, 6 formes, 15 particules)
  - `'high'`: Animations intenses, beaucoup d'éléments (7 aurora, 20 bulles, 10 formes, 25 particules)

### Quand utiliser chaque intensité

#### Low (faible)
- Pages avec beaucoup de contenu texte
- Pages de formulaires
- Pages de statistiques avec graphiques
- **Exemple**: Page Stats, Page Nutrition

#### Medium (moyen)
- Pages d'accueil/dashboard
- Pages de présentation
- Pages avec contenu mixte
- **Exemple**: Page Dashboard, Page Programme

#### High (élevé)
- Pages de landing
- Pages d'accueil marketing
- Pages avec peu de contenu
- **Exemple**: Page VitalForce dédiée

### Animations incluses

Le composant inclut plusieurs types d'animations :

1. **Aurora Borealis**: Vagues lumineuses flottantes en haut de page
2. **Floating Bubbles**: Bulles qui montent du bas vers le haut
3. **Morphing Shapes**: Formes qui changent de forme et tournent
4. **Cosmic Dust**: Petites particules qui flottent doucement
5. **Floating Orbs**: Orbes lumineux qui flottent verticalement
6. **Energy Pulse**: Orbes qui pulsent avec effet d'énergie
7. **Gradient Overlays**: Superpositions de gradients pour la profondeur

### Couleurs utilisées

Les couleurs sont basées sur la palette VitalForce :
- Violet: `#6B2AFF`
- Bleu cyan: `#00C2FF`
- Cyan: `#00E0FF`
- Rose: `#FF6B9D`
- Orange: `#FF7D3B`
- Or: `#FFD700`

### Performance

- Le composant utilise `position: fixed` et `pointer-events: none` pour ne pas interférer avec le contenu
- Les animations CSS sont optimisées avec `will-change` pour de meilleures performances
- Le composant s'adapte automatiquement à l'intensité choisie pour optimiser les performances

### Personnalisation

Pour personnaliser les animations, vous pouvez modifier directement le composant `VitalForceBackground.tsx` :
- Ajuster les durées d'animation dans les keyframes
- Modifier les couleurs des éléments
- Changer le nombre d'éléments selon l'intensité
- Ajouter de nouveaux types d'animations

### Exemple complet

```tsx
import React from 'react';
import { VitalForceBackground } from '@/components/VitalForceBackground';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <VitalForceBackground intensity="medium" />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">Mon Dashboard</h1>
        {/* Votre contenu */}
      </div>
    </div>
  );
};

export default Dashboard;
```

## Pages actuellement équipées

✅ **Dashboard**: Intensité `medium` - animations équilibrées pour la page d'accueil
✅ **Stats**: Intensité `low` - animations légères pour ne pas distraire des graphiques
✅ **Programme**: Intensité `medium` - animations dynamiques pour la page d'entraînement
✅ **Nutrition**: Intensité `low` - animations subtiles pour la liste d'aliments

## Prochaines étapes

Pour ajouter VitalForce à d'autres pages :

1. Importer le composant
2. Choisir l'intensité appropriée selon le contenu
3. Placer le composant juste après la div principale
4. Tester sur mobile et desktop pour vérifier les performances
