import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  
  // Tabs
  'tab.client': { fr: 'Client', en: 'Client' },
  'tab.program': { fr: 'Programme', en: 'Program' },
  'tab.export': { fr: 'Export', en: 'Export' },
  'tab.database': { fr: 'Base', en: 'Database' },
  
  // Forms and buttons
  'btn.export.pdf': { fr: 'Exporter en PDF', en: 'Export to PDF' },
  'btn.send.email': { fr: 'Envoyer par email', en: 'Send by Email' },
  
  // Cards and sections
  'card.client.title': { fr: 'Fiche technique client', en: 'Client Technical Sheet' },
  'card.client.desc': { fr: 'Remplissez les informations du client pour générer un programme personnalisé', en: 'Fill in client information to generate a personalized program' },
  'card.export.title': { fr: 'Export et partage', en: 'Export and Share' },
  'card.export.desc': { fr: 'Exportez le programme en PDF ou envoyez-le par email', en: 'Export the program to PDF or send it by email' },
  'card.database.title': { fr: 'Base de données clients', en: 'Client Database' },
  'card.database.desc': { fr: 'Gérez vos clients et leurs programmes', en: 'Manage your clients and their programs' },
  
  // Messages
  'msg.coming.soon': { fr: 'Fonctionnalité à venir', en: 'Feature Coming Soon' },
  'msg.client.save': { fr: 'Sauvegarde et gestion des clients', en: 'Save and manage clients' },
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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
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