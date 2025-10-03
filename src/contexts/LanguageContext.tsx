import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

type Translations = {
  [key: string]: {
    fr: string;
    en: string;
  };
};

const translations: Translations = {
  // Navigation
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.nutrition': { fr: 'Nutrition', en: 'Nutrition' },
  'nav.scan': { fr: 'Scan', en: 'Scan' },
  'nav.training': { fr: 'Blocs Sport', en: 'Training Blocks' },
  'nav.developer': { fr: 'Développeur', en: 'Developer' },
  
  // Page titles
  'page.title.generator': { fr: 'Générateur de Programmes', en: 'Program Generator' },
  'page.subtitle.generator': { fr: 'Créez des programmes sportifs personnalisés pour vos clients', en: 'Create personalized sports programs for your clients' },
  'page.title.nutrition': { fr: 'Module Nutrition', en: 'Nutrition Module' },
  'page.subtitle.nutrition': { fr: 'Gestion complète de l\'alimentation et des repas', en: 'Complete food and meal management' },
  
  // Tabs
  'tab.client': { fr: 'Client', en: 'Client' },
  'tab.program': { fr: 'Programme', en: 'Program' },
  'tab.export': { fr: 'Export', en: 'Export' },
  'tab.database': { fr: 'Base', en: 'Database' },
  'tab.meals': { fr: 'Repas types', en: 'Meal Types' },
  'tab.foods': { fr: 'Mes aliments', en: 'My Foods' },
  'tab.menu': { fr: 'Menu du jour', en: 'Daily Menu' },
  'tab.shopping': { fr: 'Liste courses', en: 'Shopping List' },
  
  // Forms and buttons
  'btn.new.meal': { fr: 'Nouveau repas', en: 'New Meal' },
  'btn.add.food': { fr: 'Ajouter aliment', en: 'Add Food' },
  'btn.show.recipe': { fr: 'Afficher la recette', en: 'Show Recipe' },
  'btn.hide.recipe': { fr: 'Masquer la recette', en: 'Hide Recipe' },
  'btn.add.menu': { fr: 'Ajouter au menu', en: 'Add to Menu' },
  'btn.export.pdf': { fr: 'Exporter en PDF', en: 'Export to PDF' },
  'btn.send.email': { fr: 'Envoyer par email', en: 'Send by Email' },
  'btn.filters': { fr: 'Filtres', en: 'Filters' },
  
  // Search and placeholders
  'search.meal': { fr: 'Rechercher un repas...', en: 'Search for a meal...' },
  'search.food': { fr: 'Rechercher un aliment...', en: 'Search for a food...' },
  
  // Cards and sections
  'card.client.title': { fr: 'Fiche technique client', en: 'Client Technical Sheet' },
  'card.client.desc': { fr: 'Remplissez les informations du client pour générer un programme personnalisé', en: 'Fill in client information to generate a personalized program' },
  'card.export.title': { fr: 'Export et partage', en: 'Export and Share' },
  'card.export.desc': { fr: 'Exportez le programme en PDF ou envoyez-le par email', en: 'Export the program to PDF or send it by email' },
  'card.database.title': { fr: 'Base de données clients', en: 'Client Database' },
  'card.database.desc': { fr: 'Gérez vos clients et leurs programmes', en: 'Manage your clients and their programs' },
  'card.meals.title': { fr: 'Repas types', en: 'Meal Types' },
  'card.meals.desc': { fr: 'Bibliothèque de repas prédéfinis avec informations nutritionnelles', en: 'Library of predefined meals with nutritional information' },
  'card.foods.title': { fr: 'Mes aliments', en: 'My Foods' },
  'card.foods.desc': { fr: 'Créez et gérez vos aliments personnalisés', en: 'Create and manage your custom foods' },
  
  // Nutritional info
  'nutrition.calories': { fr: 'kcal', en: 'kcal' },
  'nutrition.proteins': { fr: 'protéines', en: 'proteins' },
  'nutrition.carbs': { fr: 'glucides', en: 'carbs' },
  'nutrition.fats': { fr: 'lipides', en: 'fats' },
  'nutrition.recipe': { fr: 'Recette détaillée', en: 'Detailed Recipe' },
  'nutrition.ingredients': { fr: 'Ingrédients :', en: 'Ingredients:' },
  'nutrition.preparation': { fr: 'Préparation :', en: 'Preparation:' },
  'nutrition.prep.time': { fr: 'Temps de préparation:', en: 'Preparation time:' },
  'nutrition.satiety': { fr: 'Indice de satiété:', en: 'Satiety index:' },
  'nutrition.adaptations': { fr: 'Adaptations possibles:', en: 'Possible adaptations:' },
  
  // Messages
  'msg.coming.soon': { fr: 'Fonctionnalité à venir', en: 'Feature Coming Soon' },
  'msg.client.save': { fr: 'Sauvegarde et gestion des clients', en: 'Save and manage clients' },
  'msg.no.meals': { fr: 'Aucun repas', en: 'No meals' },
  'msg.create.meals': { fr: 'Créez vos premiers repas dans la section Développeur', en: 'Create your first meals in the Developer section' },
  'msg.no.foods': { fr: 'Aucun aliment', en: 'No foods' },
  'msg.create.foods': { fr: 'Ajoutez vos premiers aliments personnalisés', en: 'Add your first custom foods' },
  
  // Toast messages
  'toast.meal.deleted': { fr: 'Repas supprimé', en: 'Meal deleted' },
  'toast.meal.deleted.desc': { fr: 'Le repas a été supprimé de votre bibliothèque.', en: 'The meal has been removed from your library.' },
  'toast.food.deleted': { fr: 'Aliment supprimé', en: 'Food deleted' },
  'toast.food.deleted.desc': { fr: 'L\'aliment a été supprimé de votre bibliothèque.', en: 'The food has been removed from your library.' },
  'toast.shopping.generated': { fr: 'Liste de courses générée', en: 'Shopping list generated' },
  'toast.shopping.downloaded': { fr: 'La liste a été téléchargée.', en: 'The list has been downloaded.' },
  
  // Additional messages
  'msg.try.search': { fr: 'Essayez un autre terme de recherche', en: 'Try a different search term' },
  'msg.add.foods.desc': { fr: 'Ajoutez des aliments avec leurs valeurs nutritionnelles', en: 'Add foods with their nutritional values' },
  
  // Scan module
  'scan.title': { fr: 'Scanner un Aliment', en: 'Scan Food' },
  'scan.subtitle': { fr: 'Analysez les valeurs nutritionnelles en prenant une photo', en: 'Analyze nutritional values by taking a photo' },
  'scan.upload': { fr: 'Prendre/Choisir une photo', en: 'Take/Choose a photo' },
  'scan.analyzing': { fr: 'Analyse en cours...', en: 'Analyzing...' },
  'scan.results': { fr: 'Résultats de l\'analyse', en: 'Analysis Results' },
  'scan.error': { fr: 'Erreur lors de l\'analyse', en: 'Analysis error' },
  'scan.no.food': { fr: 'Aucun aliment détecté sur cette image', en: 'No food detected in this image' },
  'scan.try.again': { fr: 'Réessayer', en: 'Try Again' },
  'scan.save.food': { fr: 'Sauvegarder cet aliment', en: 'Save this food' },

  // Developer module
  'dev.title': { fr: 'Panel Développeur', en: 'Developer Panel' },
  'dev.subtitle': { fr: 'Ajout de blocs nutrition et programmes sportifs', en: 'Add nutrition blocks and sports programs' },
  'dev.tab.foods': { fr: 'Blocs Aliments', en: 'Food Blocks' },
  'dev.tab.meals': { fr: 'Blocs Repas', en: 'Meal Blocks' },
  'dev.tab.training': { fr: 'Blocs Entraînement', en: 'Training Blocks' },
  'dev.food.title': { fr: 'Ajouter un bloc aliment', en: 'Add food block' },
  'dev.food.desc': { fr: 'Créer un nouvel aliment avec ses informations nutritionnelles', en: 'Create a new food with its nutritional information' },
  'dev.meal.title': { fr: 'Ajouter un bloc repas', en: 'Add meal block' },
  'dev.meal.desc': { fr: 'Créer un nouveau repas avec ses ingrédients', en: 'Create a new meal with its ingredients' },
  'dev.training.title': { fr: 'Ajouter un bloc d\'entraînement', en: 'Add training block' },
  'dev.training.desc': { fr: 'Créer un nouveau bloc d\'exercice', en: 'Create a new exercise block' },

  // Training blocks module
  'training.title': { fr: 'Blocs d\'Entraînement', en: 'Training Blocks' },
  'training.subtitle': { fr: 'Bibliothèque complète d\'exercices', en: 'Complete exercise library' },
  'training.filters': { fr: 'Filtres', en: 'Filters' },
  'training.search': { fr: 'Nom ou muscle...', en: 'Name or muscle...' },
  'training.type': { fr: 'Type d\'exercice', en: 'Exercise type' },
  'training.focus': { fr: 'Focus', en: 'Focus' },
  'training.display': { fr: 'Affichage', en: 'Display' },
  'training.all.types': { fr: 'Tous les types', en: 'All types' },
  'training.all.focus': { fr: 'Tous les focus', en: 'All focus' },
  'training.all.blocks': { fr: 'Tous les blocs', en: 'All blocks' },
  'training.saved.only': { fr: 'Sauvegardés uniquement', en: 'Saved only' },
  'training.no.blocks': { fr: 'Aucun bloc trouvé', en: 'No blocks found' },
  'training.no.saved': { fr: 'Aucun bloc d\'entraînement sauvegardé. Rendez-vous dans le panel développeur pour en créer.', en: 'No saved training blocks. Go to the developer panel to create some.' },
  'training.no.criteria': { fr: 'Aucun bloc ne correspond aux critères de recherche.', en: 'No blocks match the search criteria.' },
  'training.saved': { fr: 'Sauvegardé', en: 'Saved' },
  'training.muscles': { fr: 'Muscles sollicités:', en: 'Muscles worked:' },
  'training.equipment': { fr: 'Équipement:', en: 'Equipment:' },
  'training.description': { fr: 'Description:', en: 'Description:' },
  'training.constraints': { fr: 'Contraintes:', en: 'Constraints:' },
  'training.saved.on': { fr: 'Sauvegardé le:', en: 'Saved on:' },

  // NotFound module
  'notfound.title': { fr: 'Page non trouvée', en: 'Page Not Found' },
  'notfound.message': { fr: 'Oops! La page que vous cherchez n\'existe pas', en: 'Oops! The page you are looking for does not exist' },
  'notfound.back': { fr: 'Retour à l\'accueil', en: 'Back to Home' },

  // Common labels
  'label.name': { fr: 'Nom', en: 'Name' },
  'label.category': { fr: 'Catégorie', en: 'Category' },
  'label.calories': { fr: 'Calories (kcal)', en: 'Calories (kcal)' },
  'label.proteins': { fr: 'Protéines (g)', en: 'Proteins (g)' },
  'label.carbs': { fr: 'Glucides (g)', en: 'Carbs (g)' },
  'label.fats': { fr: 'Lipides (g)', en: 'Fats (g)' },
  'label.fiber': { fr: 'Fibres (g)', en: 'Fiber (g)' },
  'label.save': { fr: 'Sauvegarder', en: 'Save' },
  'label.delete': { fr: 'Supprimer', en: 'Delete' },
  'label.search': { fr: 'Recherche', en: 'Search' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};