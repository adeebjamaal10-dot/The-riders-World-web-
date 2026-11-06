import React from 'react';
import { Compass, BookOpen, History, Scale, Award, Globe, Search } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { SorentaLogo } from './SorentaLogo';

export type AppView = 'home' | 'catalog' | 'map' | 'heritage' | 'compare' | 'sponsor';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenSearch: () => void;
  comparisonCount: number;
  onOpenComparison: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  comparisonCount,
  onOpenComparison
}) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'catalog' as AppView, label: t('breeds'), count: '243', icon: BookOpen },
    { id: 'map' as AppView, label: t('worldMap'), count: null, icon: Globe },
    { id: 'compare' as AppView, label: t('compare'), count: comparisonCount > 0 ? `${comparisonCount}` : null, icon: Scale },
    { id: 'heritage' as AppView, label: t('heritage'), count: '30', icon: History },
    { id: 'sponsor' as AppView, label: t('sponsor'), count: 'Partner', icon: Award }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white text-gray-900 border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Zone: Brand & Identity */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 border border-gray-300 bg-black flex items-center justify-center text-white transition-colors group-hover:bg-amber-700">
              <Compass className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.16em] font-semibold text-black uppercase">
                {t('appName')}
              </span>
              <span className="text-[10px] tracking-wider uppercase text-amber-700 font-sans font-medium">
                The International Equine Atlas & Breeds Registry
              </span>
            </div>
          </div>

          {/* Center Zone: Primary Section Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-2 text-xs tracking-wider uppercase font-semibold transition-all flex items-center space-x-1.5 border-b-2 ${
                    isActive
                      ? 'border-black text-black bg-gray-50'
                      : 'border-transparent text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.count && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.2 bg-gray-200 text-gray-800 font-mono">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Zone: Search, Drawer, Language Switcher */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 border border-transparent hover:border-gray-300 transition-colors"
              title="Global Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Compare Indicator */}
            {comparisonCount > 0 && (
              <button
                onClick={onOpenComparison}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-black text-white font-semibold text-xs tracking-wider uppercase hover:bg-amber-700 transition-colors shadow-xs"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare ({comparisonCount})</span>
              </button>
            )}

            {/* Language Switcher */}
            <div className="flex items-center border border-gray-300 bg-gray-50 text-xs font-mono">
              {(['en', 'fr', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 uppercase tracking-wider transition-colors ${
                    language === lang
                      ? 'bg-black text-white font-bold'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Research Partner & Info Provider Sorenta Highlight Badge */}
            <a
              href="https://sorenta-saddlery.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center space-x-2.5 border-l border-gray-200 pl-3.5 ml-2 group transition-all"
              title="Sorenta Saddlery — Official Research Partner & Information Provider"
            >
              <SorentaLogo size="sm" withBorder className="group-hover:ring-1 group-hover:ring-black transition-all" />
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-mono font-bold text-black uppercase tracking-wider group-hover:text-amber-800 transition-colors">
                  Sorenta Saddlery
                </span>
                <span className="text-[9px] text-gray-700 uppercase tracking-widest font-sans font-medium flex items-center">
                  Research Partner & Info Provider <span className="ml-1 text-[8px] text-amber-700">↗</span>
                </span>
              </div>
            </a>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex overflow-x-auto py-2 space-x-2 border-t border-gray-200 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex-shrink-0 px-2.5 py-1 text-[11px] tracking-wider uppercase flex items-center space-x-1 border ${
                  isActive
                    ? 'border-black bg-black text-white font-semibold'
                    : 'border-gray-200 text-gray-700 hover:text-black bg-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
                {item.count && (
                  <span className="text-[9px] text-amber-700 font-mono">({item.count})</span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
