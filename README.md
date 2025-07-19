# 🏋️ Workout Alchemy

Une application React moderne pour générer des programmes d'entraînement personnalisés avec un algorithme intelligent.

## ✨ Fonctionnalités

### 🎯 **Génération de programmes personnalisés**
- Algorithme intelligent qui utilise les informations du client
- Adaptation selon l'objectif (prise de masse, perte de poids, force, endurance, remise en forme)
- Prise en compte des contraintes médicales et de l'équipement disponible
- Utilisation des valeurs 1RM pour calculer les charges

### 📚 **Bibliothèque d'exercices complète**
- Plus de 50 exercices prédéfinis
- Exercices de force avec références 1RM
- Exercices cardio et d'endurance
- Exercices spécifiques pour femmes et hommes
- Système de sauvegarde d'exercices personnalisés

### 🎨 **Interface moderne**
- Design responsive avec Tailwind CSS
- Composants UI avec shadcn/ui
- Animations et transitions fluides
- Mode sombre/clair

## 🚀 Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le dépôt
git clone <URL_DE_VOTRE_DEPOT>
cd workout-alchemy-app

# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

### Scripts de lancement
- **Script PowerShell** : `.\start-app.ps1`
- **Script Batch** : `start-app.bat`
- **Configuration Git** : `.\setup-git.ps1`

## 📁 Structure du projet

```
workout-alchemy-app/
├── src/
│   ├── components/          # Composants React
│   │   ├── ui/             # Composants UI (shadcn/ui)
│   │   ├── ClientForm.tsx  # Formulaire client
│   │   └── ProgrammeDisplay.tsx
│   ├── pages/              # Pages de l'application
│   │   ├── Index.tsx       # Page d'accueil
│   │   ├── BlocsEntrainement.tsx # Bibliothèque d'exercices
│   │   └── Developer.tsx   # Panel développeur
│   ├── utils/              # Utilitaires
│   │   ├── programmeGenerator.ts # Algorithme de génération
│   │   ├── blocsExercices.ts    # Exercices prédéfinis
│   │   └── blocsEntrainementData.ts # Gestion des données
│   └── types/              # Types TypeScript
│       └── programme.ts    # Types du programme
├── public/                 # Assets statiques
└── package.json           # Dépendances et scripts
```

## 🔧 Algorithme de génération

### Fonctionnalités principales
- **Adaptation selon l'objectif** : Différentes stratégies selon le but
- **Répartition intelligente** : Séances équilibrées selon le profil
- **Gestion des contraintes** : Exclusion des exercices incompatibles
- **Calcul des charges** : Utilisation des pourcentages 1RM
- **Optimisation de séquence** : Ordre des exercices optimisé

### Types d'objectifs supportés
- **Prise de masse** : Focus sur exercices composés, charges lourdes
- **Perte de poids** : Plus de cardio, séances plus longues
- **Force** : Moins d'exercices mais plus intenses
- **Endurance** : Plus de répétitions, repos courts
- **Remise en forme** : Programme équilibré

## 🎯 Utilisation

### 1. Créer un profil client
- Remplir le formulaire avec les informations personnelles
- Définir l'objectif et la vitesse de progression
- Spécifier les contraintes médicales et l'équipement disponible

### 2. Générer un programme
- L'algorithme analyse le profil et génère un programme personnalisé
- Les exercices sont sélectionnés selon les critères
- Les charges sont calculées selon les 1RM fournis

### 3. Consulter la bibliothèque
- Parcourir tous les exercices disponibles
- Filtrer par type, focus, équipement
- Sauvegarder des exercices personnalisés

## 🛠️ Technologies utilisées

- **React 18** : Framework frontend
- **TypeScript** : Typage statique
- **Vite** : Build tool rapide
- **Tailwind CSS** : Framework CSS utilitaire
- **shadcn/ui** : Composants UI modernes
- **React Router** : Navigation
- **Lucide React** : Icônes

## 📝 Scripts disponibles

```bash
npm run dev          # Lancer en mode développement
npm run build        # Construire pour la production
npm run preview      # Prévisualiser la build
npm run lint         # Vérifier le code
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 🙏 Remerciements

- shadcn/ui pour les composants
- Tailwind CSS pour le styling
- Lucide pour les icônes
- La communauté React

---

**Développé avec ❤️ pour la communauté fitness**
