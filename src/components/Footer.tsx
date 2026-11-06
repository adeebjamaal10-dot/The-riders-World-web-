import React from 'react';
import { Compass, ShieldCheck, ExternalLink } from 'lucide-react';
import { AppView } from './Navbar';
import { SorentaLogo } from './SorentaLogo';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-50 text-gray-900 border-t border-gray-200 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-200">
          
          {/* Brand & Mission Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-gray-300 bg-black flex items-center justify-center text-white">
                <Compass className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <span className="font-serif text-lg tracking-[0.15em] font-semibold text-black uppercase block">
                  THE GLOBAL HORSE ATLAS
                </span>
                <span className="text-[10px] tracking-wider uppercase text-amber-800 font-mono font-medium">
                  Volume I • Open Access Curatorial Edition
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
              The premier open-access international compendium cataloging 243 verified equine populations, 50 peer-reviewed anatomical treatises, and 30 equestrian archaeological monographs. Dedicated to equine biomechanical health, proper saddle tree fit, and genetic preservation.
            </p>

            <div className="pt-2 text-xs text-amber-800 flex items-center space-x-1.5 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent Academic Standard • ISO / FAO DAD-IS Taxonomies</span>
            </div>
          </div>

          {/* Atlas Index Sections (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm text-black uppercase tracking-wider font-semibold">
              Encyclopedia Index
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 font-medium">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-black transition-colors">
                  Breeds Database (243 Profiles)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-black transition-colors">
                  Interactive World Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-black transition-colors">
                  Side-by-Side Comparison Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('heritage')} className="hover:text-black transition-colors">
                  Heritage Monographs (30)
                </button>
              </li>
            </ul>
          </div>

          {/* Research Partner & Info Provider Column (4 cols) */}
          <div className="md:col-span-4 bg-white border border-gray-300 p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center space-x-3">
              <a
                href="https://sorenta-saddlery.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Sorenta Saddlery"
                className="group"
              >
                <SorentaLogo size="md" withBorder className="group-hover:scale-105 transition-transform" />
              </a>
              <div>
                <span className="text-[10px] font-mono text-amber-800 uppercase tracking-widest block font-semibold">
                  Research Partner & Info Provider
                </span>
                <h4 className="font-serif text-base text-black font-medium leading-tight">
                  Sorenta Saddlery
                </h4>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Equine anatomical data, dorsal spine parameters, and saddle tree biomechanics provided in research collaboration with Sorenta Saddlery.
            </p>

            <div className="pt-1 flex items-center justify-between border-t border-gray-100">
              <a
                href="https://sorenta-saddlery.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-black hover:text-amber-700 font-mono uppercase tracking-wider underline font-semibold transition-colors"
              >
                <span>Visit Sorenta Atelier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => onNavigate('sponsor')}
                className="text-xs text-gray-500 hover:text-black font-mono uppercase tracking-wider"
              >
                Research Details →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} The Global Horse Atlas. Open educational access for equine welfare.
          </div>
          <div className="flex items-center space-x-4">
            <span>Taxonomic Standard: Equus caballus</span>
            <span>•</span>
            <button onClick={() => onNavigate('sponsor')} className="hover:text-black">
              Partner Disclosure
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
