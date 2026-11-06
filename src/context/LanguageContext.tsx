import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'de';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    de: string;
  };
}

const UI_TRANSLATIONS: Translations = {
  appName: {
    en: 'THE GLOBAL HORSE ATLAS',
    fr: "L'ATLAS MONDIAL DU CHEVAL",
    de: 'DER GLOBALE PFERDE-ATLAS'
  },
  tagline: {
    en: 'The International Encyclopedia of Horse Breeds, Equine Anatomy & Equestrian Heritage',
    fr: "L'Encyclopédie Internationale des Races Équines, de l'Anatomie et du Patrimoine",
    de: 'Die Internationale Enzyklopädie der Pferderassen, Pferdeanatomie & Reitergeschichte'
  },
  breeds: {
    en: 'Breeds Database',
    fr: 'Base des Races',
    de: 'Rassendatenbank'
  },
  worldMap: {
    en: 'Interactive Map',
    fr: 'Carte Interactive',
    de: 'Interaktive Karte'
  },
  anatomy: {
    en: 'Anatomy & Biomechanics',
    fr: 'Anatomie & Biomécanique',
    de: 'Anatomie & Biomechanik'
  },
  heritage: {
    en: 'Heritage & History',
    fr: 'Histoire & Patrimoine',
    de: 'Geschichte & Kulturerbe'
  },
  compare: {
    en: 'Breed Comparison',
    fr: 'Comparateur de Races',
    de: 'Rassenvergleich'
  },
  sponsor: {
    en: 'Sorenta Saddlery',
    fr: 'Sorenta Saddlery',
    de: 'Sorenta Saddlery'
  },
  searchPlaceholder: {
    en: 'Search 204 breeds, 50 anatomy guides, or 30 heritage monographs...',
    fr: 'Rechercher parmi 204 races, 50 guides d’anatomie, 30 monographies...',
    de: 'Suche in 204 Rassen, 50 Anatomie-Leitfäden, 30 Geschichtsmonographien...'
  },
  filterByContinent: {
    en: 'Continent',
    fr: 'Continent',
    de: 'Kontinent'
  },
  filterByClassification: {
    en: 'Classification',
    fr: 'Classification',
    de: 'Klassifikation'
  },
  filterByPurpose: {
    en: 'Historical Purpose',
    fr: 'Usage Historique',
    de: 'Historischer Verwendungszweck'
  },
  allContinents: {
    en: 'All Continents',
    fr: 'Tous les continents',
    de: 'Alle Kontinente'
  },
  allClassifications: {
    en: 'All Classifications',
    fr: 'Toutes les classifications',
    de: 'Alle Klassifikationen'
  },
  allPurposes: {
    en: 'All Purposes',
    fr: 'Tous les usages',
    de: 'Alle Nutzungsarten'
  },
  hands: {
    en: 'hands',
    fr: 'mains',
    de: 'Faust'
  },
  saddleFitTitle: {
    en: 'Saddle Connection & Tree Geometry',
    fr: 'Connexion Selle & Géométrie d’Arçon',
    de: 'Sattelpassform & Baumgeometrie'
  },
  close: {
    en: 'Close',
    fr: 'Fermer',
    de: 'Schließen'
  },
  readFullDossier: {
    en: 'Examine Full Dossier',
    fr: 'Consulter le Dossier Complet',
    de: 'Vollständiges Dossier Ansehen'
  },
  compareButton: {
    en: 'Compare',
    fr: 'Comparer',
    de: 'Vergleichen'
  },
  addedToCompare: {
    en: 'In Comparison',
    fr: 'En Comparaison',
    de: 'Im Vergleich'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (UI_TRANSLATIONS[key] && UI_TRANSLATIONS[key][language]) {
      return UI_TRANSLATIONS[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
