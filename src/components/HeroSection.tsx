import React from 'react';
import { BookOpen, Globe, Scale, ArrowRight, ShieldCheck, Award, ExternalLink } from 'lucide-react';
import { AppView } from './Navbar';
import { SorentaLogo } from './SorentaLogo';

interface HeroSectionProps {
  onNavigate: (view: AppView) => void;
  totalBreeds: number;
  totalHeritage: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  totalBreeds,
  totalHeritage
}) => {
  return (
    <div className="bg-white text-gray-900 border-b border-gray-200 relative overflow-hidden">
      
      {/* Subtle fine dot grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        
        {/* Top Header Badge */}
        <div className="flex items-center space-x-2 mb-5">
          <span className="px-3 py-1 bg-black text-white text-xs font-mono tracking-widest uppercase font-semibold">
            Curatorial Edition • Volume I
          </span>
          <span className="text-xs text-gray-500 tracking-wider uppercase font-sans">
            International Peer-Reviewed Equine Database
          </span>
        </div>

        {/* Grid: Main Text & Visual Mosaic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols): Editorial Title & Intent */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black leading-[1.1]">
              The International Encyclopedia of Horse Breeds & Equestrian Heritage
            </h1>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-sans max-w-2xl">
              An authoritative global atlas cataloging <strong className="text-black font-semibold">{totalBreeds} verified horse breeds and landrace populations</strong> across six continents, complete with biometric heights, conformational analyses, saddle tree geometry, and <strong className="text-black font-semibold">{totalHeritage} equestrian heritage monographs</strong>.
            </p>

            {/* Core Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('catalog')}
                className="px-6 py-3.5 bg-black text-white font-semibold text-xs uppercase tracking-widest hover:bg-amber-700 transition-all flex items-center space-x-2 shadow-xs"
              >
                <span>Browse Breeds Database ({totalBreeds})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('map')}
                className="px-5 py-3.5 bg-white text-black border border-gray-300 hover:border-black font-medium text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center space-x-2 shadow-xs"
              >
                <Globe className="w-4 h-4 text-amber-700" />
                <span>The World Horse Map</span>
              </button>

              <button
                onClick={() => onNavigate('compare')}
                className="px-5 py-3.5 bg-white text-black border border-gray-300 hover:border-black font-medium text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center space-x-2 shadow-xs"
              >
                <Scale className="w-4 h-4 text-amber-700" />
                <span>Compare Breeds</span>
              </button>
            </div>

            {/* Research Partner & Info Provider Highlight */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 border border-gray-300 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center space-x-4">
                  <a
                    href="https://sorenta-saddlery.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title="Visit Sorenta Saddlery Atelier"
                  >
                    <SorentaLogo size="lg" withBorder className="group-hover:scale-105 transition-transform" />
                  </a>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-black text-white text-[9px] font-mono tracking-widest uppercase font-semibold">
                        Research Partner
                      </span>
                      <span className="text-[10px] text-amber-800 font-mono uppercase tracking-wider font-semibold">
                        Info Provider
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-black mt-0.5">
                      Sorenta Saddlery
                    </h3>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed mt-0.5 max-w-lg">
                      Equine anatomical data, dorsal spine parameters, and saddle tree biomechanics provided in research collaboration with Sorenta Saddlery. Dedicated to anatomical saddle design, unrestricted scapular movement, and safeguarding equine back health worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 w-full sm:w-auto flex-shrink-0">
                  <a
                    href="https://sorenta-saddlery.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-1 px-3.5 py-2 bg-black hover:bg-amber-700 text-white text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors shadow-xs"
                  >
                    <span>Visit Atelier</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                  <button
                    onClick={() => onNavigate('sponsor')}
                    className="inline-flex items-center justify-center px-3.5 py-2 bg-white hover:bg-gray-100 text-black border border-gray-300 text-[11px] font-mono uppercase tracking-wider font-medium transition-colors"
                  >
                    <span>Research Dossier</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Visual Asset Collage */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              {/* Primary Visual Card: Friesian */}
              <div className="group relative border border-gray-300 bg-gray-50 overflow-hidden aspect-[4/5] cursor-pointer shadow-xs" onClick={() => onNavigate('catalog')}>
                <img
                  src="/assets/aistudio/image_e233a509.png"
                  alt="Friesian Stallion"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Baroque Heavy Riding</span>
                  <span className="font-serif text-sm font-medium">Friesian Stallion</span>
                </div>
              </div>

              {/* Secondary Visual Card: Paint Horse */}
              <div className="group relative border border-gray-300 bg-gray-50 overflow-hidden aspect-[4/5] cursor-pointer shadow-xs" onClick={() => onNavigate('catalog')}>
                <img
                  src="/assets/aistudio/image_a4117215.png"
                  alt="American Paint Horse"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Americas Stock Horse</span>
                  <span className="font-serif text-sm font-medium">Overo Paint Horse</span>
                </div>
              </div>
            </div>

            {/* Bottom Panoramic Thumbnail */}
            <div className="border border-gray-300 bg-gray-50 p-3.5 flex items-center justify-between cursor-pointer hover:border-black transition-colors shadow-xs" onClick={() => onNavigate('map')}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 overflow-hidden border border-gray-300 bg-white">
                  <img
                    src="/assets/aistudio/image_190274a3.png"
                    alt="Horse Breeds of the World Catalog"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-black uppercase tracking-wider font-mono">
                    Global Breed Distribution
                  </div>
                  <div className="text-[11px] text-gray-600">
                    Explore breeds mapped by coordinates and historical habitats
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-black" />
            </div>

          </div>

        </div>

        {/* Bottom Key Metrology Banner */}
        <div className="mt-14 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div className="border-r last:border-r-0 border-gray-200 py-2">
            <div className="font-serif text-3xl sm:text-4xl font-light text-black">{totalBreeds}</div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mt-1 font-sans font-medium">Documented Breeds</div>
          </div>
          <div className="border-r last:border-r-0 border-gray-200 py-2">
            <div className="font-serif text-3xl sm:text-4xl font-light text-black">{totalHeritage}</div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mt-1 font-sans font-medium">Heritage Monographs</div>
          </div>
          <div className="py-2">
            <div className="font-serif text-3xl sm:text-4xl font-light text-black">6</div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mt-1 font-sans font-medium">Continents Surveyed</div>
          </div>
        </div>

      </div>
    </div>
  );
};
