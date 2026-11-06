import React, { useState, useMemo } from 'react';
import { HeritageArticle } from '../types';
import { History, Clock, ChevronRight, Search, MapPin } from 'lucide-react';

interface HeritageLibraryProps {
  articles: HeritageArticle[];
  onOpenArticle: (article: HeritageArticle) => void;
}

export const HeritageLibrary: React.FC<HeritageLibraryProps> = ({
  articles,
  onOpenArticle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('All');

  const eras = [
    'All',
    'Prehistoric & Bronze Age',
    'Classical Antiquity',
    'Medieval & Renaissance',
    '18th & 19th Century',
    '20th Century & Conservation'
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        art.title.toLowerCase().includes(q) ||
        art.subtitle.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.geographicFocus.toLowerCase().includes(q);

      let matchesEra = true;
      if (selectedEra === 'Prehistoric & Bronze Age') {
        matchesEra = art.order <= 3;
      } else if (selectedEra === 'Classical Antiquity') {
        matchesEra = art.order >= 4 && art.order <= 7;
      } else if (selectedEra === 'Medieval & Renaissance') {
        matchesEra = art.order >= 8 && art.order <= 15;
      } else if (selectedEra === '18th & 19th Century') {
        matchesEra = art.order >= 16 && art.order <= 21;
      } else if (selectedEra === '20th Century & Conservation') {
        matchesEra = art.order >= 22;
      }

      return matchesSearch && matchesEra;
    });
  }, [articles, searchQuery, selectedEra]);

  return (
    <div className="bg-white text-gray-900 py-14" id="heritage-library">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-amber-700 text-xs font-mono tracking-widest uppercase mb-1 font-semibold">
              <History className="w-4 h-4" />
              <span>Archival & Archaeological Monographs</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-black">
              Equestrian History & Cultural Heritage ({articles.length} Monographs)
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mt-1">
              From the Copper Age corrals of Botai to the classical Renaissance riding academies and modern gene banks, explore 6,000 years of the human-equine partnership.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search historical topics, civilizations, battles..."
              className="w-full bg-gray-50 border border-gray-300 text-xs text-gray-900 pl-9 pr-3 py-2.5 focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex overflow-x-auto pb-2 gap-2 border-b border-gray-200 scrollbar-none">
            {eras.map((era) => {
              const isSelected = selectedEra === era;
              return (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold flex items-center space-x-1.5 transition-all flex-shrink-0 border ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-xs'
                      : 'bg-white text-gray-700 hover:text-black border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span>{era}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-gray-300 hover:border-black p-5 flex flex-col justify-between transition-all duration-300 group shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-800 uppercase tracking-wider font-semibold">
                  <span>Monograph #{art.order}</span>
                  <span className="flex items-center space-x-1 text-gray-500 font-normal">
                    <Clock className="w-3 h-3" />
                    <span>{art.readingTimeMinutes} min read</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl text-black font-normal group-hover:text-amber-800 transition-colors leading-snug">
                  {art.title}
                </h3>

                <div className="text-[11px] text-gray-700 font-mono flex items-center space-x-1 font-medium">
                  <MapPin className="w-3 h-3 flex-shrink-0 text-amber-700" />
                  <span className="truncate">{art.geographicFocus}</span>
                </div>

                <div className="text-xs text-gray-500 font-sans italic">
                  Era: {art.era}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500">
                  {art.archaeologicalAndHistoricalSources.length} Primary Sources
                </span>

                <button
                  onClick={() => onOpenArticle(art)}
                  className="px-3 py-1.5 bg-black hover:bg-amber-700 text-xs font-semibold uppercase tracking-wider text-white transition-colors flex items-center space-x-1"
                >
                  <span>Read Monograph</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
