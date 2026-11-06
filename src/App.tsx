import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { allBreeds, TOTAL_BREEDS_COUNT } from './data/breedsCatalog';
import { anatomyGuides } from './data/anatomy';
import { heritageArticles } from './data/heritage';
import { BreedProfile, AnatomyGuide, HeritageArticle } from './types';
import { Navbar, AppView } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorldHorseMap } from './components/WorldHorseMap';
import { BreedCatalog } from './components/BreedCatalog';
import { BreedComparison } from './components/BreedComparison';
import { HeritageLibrary } from './components/HeritageLibrary';
import { SponsorPage } from './components/SponsorPage';
import { Footer } from './components/Footer';
import {
  BreedDetailModal,
  AnatomyDetailModal,
  HeritageDetailModal,
  GlobalSearchModal
} from './components/Modals';

export function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedBreed, setSelectedBreed] = useState<BreedProfile | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<AnatomyGuide | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HeritageArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [comparedBreeds, setComparedBreeds] = useState<BreedProfile[]>([]);

  // Hash route management
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (hash.startsWith('breed=')) {
        const id = hash.replace('breed=', '');
        const found = allBreeds.find(b => b.id === id);
        if (found) setSelectedBreed(found);
      } else if (hash.startsWith('guide=')) {
        const id = hash.replace('guide=', '');
        const found = anatomyGuides.find(g => g.id === id);
        if (found) setSelectedGuide(found);
      } else if (hash.startsWith('article=')) {
        const id = hash.replace('article=', '');
        const found = heritageArticles.find(a => a.id === id);
        if (found) setSelectedArticle(found);
      } else if (['home', 'catalog', 'map', 'heritage', 'compare', 'sponsor'].includes(hash)) {
        setCurrentView(hash as AppView);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompare = (breed: BreedProfile) => {
    setComparedBreeds((prev) => {
      const exists = prev.some((b) => b.id === breed.id);
      if (exists) {
        return prev.filter((b) => b.id !== breed.id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), breed];
      }
      return [...prev, breed];
    });
  };

  const isCompared = (breedId: string) => {
    return comparedBreeds.some((b) => b.id === breedId);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-amber-100 selection:text-black">
      
      {/* Primary Sticky Top Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        comparisonCount={comparedBreeds.length}
        onOpenComparison={() => navigateTo('compare')}
      />

      {/* Main View Content */}
      <main className="flex-1 bg-white">
        {currentView === 'home' && (
          <>
            <HeroSection
              onNavigate={navigateTo}
              totalBreeds={TOTAL_BREEDS_COUNT}
              totalHeritage={heritageArticles.length}
            />

            {/* The World Horse Map with User-Supplied Hard-Feeded Image & Interactive Calibrated Dots */}
            <WorldHorseMap
              breeds={allBreeds}
              onSelectBreed={(breed) => setSelectedBreed(breed)}
              onToggleCompare={handleToggleCompare}
              isCompared={isCompared}
            />

            {/* Breeds Directory Section */}
            <BreedCatalog
              breeds={allBreeds}
              onSelectBreed={(breed) => setSelectedBreed(breed)}
              onToggleCompare={handleToggleCompare}
              isCompared={isCompared}
            />
          </>
        )}

        {currentView === 'catalog' && (
          <BreedCatalog
            breeds={allBreeds}
            onSelectBreed={(breed) => setSelectedBreed(breed)}
            onToggleCompare={handleToggleCompare}
            isCompared={isCompared}
          />
        )}

        {currentView === 'map' && (
          <WorldHorseMap
            breeds={allBreeds}
            onSelectBreed={(breed) => setSelectedBreed(breed)}
            onToggleCompare={handleToggleCompare}
            isCompared={isCompared}
          />
        )}

        {currentView === 'heritage' && (
          <HeritageLibrary
            articles={heritageArticles}
            onOpenArticle={(article) => setSelectedArticle(article)}
          />
        )}

        {currentView === 'compare' && (
          <BreedComparison
            allBreeds={allBreeds}
            comparedBreeds={comparedBreeds}
            onRemoveBreed={(id) => setComparedBreeds(prev => prev.filter(b => b.id !== id))}
            onAddBreed={(breed) => {
              if (comparedBreeds.length < 4 && !comparedBreeds.some(b => b.id === breed.id)) {
                setComparedBreeds(prev => [...prev, breed]);
              }
            }}
            onClearAll={() => setComparedBreeds([])}
            onSelectBreed={(breed) => setSelectedBreed(breed)}
            onBackToCatalog={() => navigateTo('catalog')}
          />
        )}

        {currentView === 'sponsor' && (
          <SponsorPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Modals & Readers */}
      <BreedDetailModal
        breed={selectedBreed}
        onClose={() => setSelectedBreed(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedBreed ? isCompared(selectedBreed.id) : false}
      />

      <AnatomyDetailModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
      />

      <HeritageDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        breeds={allBreeds}
        guides={anatomyGuides}
        articles={heritageArticles}
        onSelectBreed={(b) => setSelectedBreed(b)}
        onSelectGuide={(g) => setSelectedGuide(g)}
        onSelectArticle={(a) => setSelectedArticle(a)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
