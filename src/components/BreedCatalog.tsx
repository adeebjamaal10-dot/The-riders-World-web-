import React, { useState, useMemo } from 'react';
import { BreedProfile, BreedClassification, Continent, HistoricalPurpose } from '../types';
import { Search, RotateCcw, Scale, Check, ChevronRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BreedCatalogProps {
  breeds: BreedProfile[];
  onSelectBreed: (breed: BreedProfile) => void;
  onToggleCompare: (breed: BreedProfile) => void;
  isCompared: (breedId: string) => boolean;
}

export const BreedCatalog: React.FC<BreedCatalogProps> = ({
  breeds,
  onSelectBreed,
  onToggleCompare,
  isCompared
}) => {
  const { t } = useLanguage();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'All'>('All');
  const [selectedClassification, setSelectedClassification] = useState<BreedClassification | 'All'>('All');
  const [selectedPurpose, setSelectedPurpose] = useState<HistoricalPurpose | 'All'>('All');
  const [selectedConservation, setSelectedConservation] = useState<string>('All');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  const continents: (Continent | 'All')[] = [
    'All',
    'Europe',
    'North America',
    'South America',
    'Asia',
    'Africa',
    'Oceania'
  ];

  const classifications: (BreedClassification | 'All')[] = [
    'All',
    'Recognised Breed',
    'Regional Population',
    'Landrace',
    'Historically Documented Breed',
    'Distinct Equine Type',
    'Wild Equid'
  ];

  const purposes: (HistoricalPurpose | 'All')[] = [
    'All',
    'Riding & War',
    'Draft & Agriculture',
    'Sport & Dressage',
    'Carriage & Driving',
    'Working Stock & Ranch',
    'Mountain & Pack',
    'Pony & Light Riding',
    'Wild & Conservation'
  ];

  // Filtered Breeds
  const filteredBreeds = useMemo(() => {
    return breeds.filter((b) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        b.name.toLowerCase().includes(q) ||
        b.alternativeNames.some(alt => alt.toLowerCase().includes(q)) ||
        b.originCountry.toLowerCase().includes(q) ||
        b.originRegion.toLowerCase().includes(q) ||
        b.distinguishingFeatures.some(f => f.toLowerCase().includes(q)) ||
        b.historicalDevelopment.toLowerCase().includes(q);

      const matchesContinent = selectedContinent === 'All' || b.continent === selectedContinent;
      const matchesClassification = selectedClassification === 'All' || b.classification === selectedClassification;
      const matchesPurpose = selectedPurpose === 'All' || b.historicalPurpose === selectedPurpose;
      const matchesConservation = selectedConservation === 'All' || b.conservationStatus === selectedConservation;

      return matchesSearch && matchesContinent && matchesClassification && matchesPurpose && matchesConservation;
    });
  }, [breeds, searchQuery, selectedContinent, selectedClassification, selectedPurpose, selectedConservation]);

  const paginatedBreeds = useMemo(() => {
    return filteredBreeds.slice(0, page * PAGE_SIZE);
  }, [filteredBreeds, page]);

  const hasMore = paginatedBreeds.length < filteredBreeds.length;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedContinent('All');
    setSelectedClassification('All');
    setSelectedPurpose('All');
    setSelectedConservation('All');
    setPage(1);
  };

  return (
    <div className="bg-white text-gray-900 py-14" id="breed-catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-2 text-amber-700 text-xs font-mono tracking-widest uppercase mb-1 font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Master Breeds Register</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-black">
            The Global Horse Catalog ({breeds.length} Verified Breeds)
          </h2>
          <p className="text-sm text-gray-600 max-w-3xl mt-1">
            Access the world's most comprehensive open taxonomic registry of equines—each classified by biometric height, structural conformation, saddle interaction, and documented origins.
          </p>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-gray-50 border border-gray-300 p-5 mb-8 shadow-xs space-y-4">
          
          {/* Top Row: Search Input & Reset */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by breed name, country, feature, trait, or lineage..."
                className="w-full bg-white border border-gray-300 text-xs text-gray-900 pl-9 pr-3 py-2.5 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <button
              onClick={resetFilters}
              className="px-3.5 py-2 bg-white border border-gray-300 hover:border-black text-xs text-gray-700 hover:text-black flex items-center justify-center space-x-1.5 transition-colors font-medium"
              title="Reset all search filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Continent Filter Row */}
          <div>
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2 font-semibold">
              Continent
            </div>
            <div className="flex flex-wrap gap-1.5">
              {continents.map((cont) => {
                const isSelected = selectedContinent === cont;
                const count = cont === 'All' 
                  ? breeds.length 
                  : breeds.filter(b => b.continent === cont).length;
                return (
                  <button
                    key={cont}
                    onClick={() => {
                      setSelectedContinent(cont);
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all border ${
                      isSelected
                        ? 'bg-black text-white border-black font-bold shadow-xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    <span>{cont}</span>
                    <span className="ml-1 text-[10px] opacity-75 font-mono">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Classification & Purpose Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-gray-200">
            {/* Classification */}
            <div>
              <label className="text-[10px] font-mono text-gray-600 uppercase tracking-wider block mb-1 font-semibold">
                Classification Type
              </label>
              <select
                value={selectedClassification}
                onChange={(e) => {
                  setSelectedClassification(e.target.value as any);
                  setPage(1);
                }}
                className="w-full bg-white border border-gray-300 text-xs text-gray-900 px-3 py-2 focus:outline-none focus:border-black"
              >
                {classifications.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="text-[10px] font-mono text-gray-600 uppercase tracking-wider block mb-1 font-semibold">
                Historical Purpose
              </label>
              <select
                value={selectedPurpose}
                onChange={(e) => {
                  setSelectedPurpose(e.target.value as any);
                  setPage(1);
                }}
                className="w-full bg-white border border-gray-300 text-xs text-gray-900 px-3 py-2 focus:outline-none focus:border-black"
              >
                {purposes.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Conservation Status */}
            <div>
              <label className="text-[10px] font-mono text-gray-600 uppercase tracking-wider block mb-1 font-semibold">
                Conservation Status
              </label>
              <select
                value={selectedConservation}
                onChange={(e) => {
                  setSelectedConservation(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-white border border-gray-300 text-xs text-gray-900 px-3 py-2 focus:outline-none focus:border-black"
              >
                <option value="All">All Populations</option>
                <option value="Critical">Critical (&lt;500 breeding females)</option>
                <option value="Endangered">Endangered</option>
                <option value="Vulnerable">Vulnerable</option>
                <option value="Stable">Stable</option>
              </select>
            </div>
          </div>

        </div>

        {/* Counter Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-gray-600 mb-6 pb-2 border-b border-gray-200">
          <span>Displaying {filteredBreeds.length} of {breeds.length} Documented Breeds</span>
          {filteredBreeds.length < breeds.length && (
            <span className="text-amber-700 font-semibold">Active Filters Applied</span>
          )}
        </div>

        {/* Breed Cards Grid */}
        {filteredBreeds.length === 0 ? (
          <div className="bg-gray-50 border border-gray-300 p-12 text-center space-y-3">
            <h3 className="font-serif text-xl text-black">No Breeds Match These Criteria</h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Try adjusting your search terms or resetting filters to explore the complete catalog of {breeds.length} verified breeds.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-4 py-2 bg-black text-white font-semibold text-xs uppercase tracking-wider hover:bg-amber-700"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBreeds.map((breed) => {
              const inComparison = isCompared(breed.id);
              return (
                <div
                  key={breed.id}
                  className="bg-white border border-gray-300 hover:border-black transition-all duration-300 flex flex-col justify-between group shadow-xs"
                >
                  {/* Top Metadata */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-mono text-amber-800 uppercase tracking-wider font-semibold">
                          {breed.continent} • {breed.originCountry}
                        </div>
                        <h3 className="font-serif text-xl text-black font-normal group-hover:text-amber-800 transition-colors leading-tight mt-0.5">
                          {breed.name}
                        </h3>
                        {breed.alternativeNames.length > 0 && (
                          <div className="text-[11px] text-gray-500 italic">
                            aka {breed.alternativeNames.slice(0, 2).join(', ')}
                          </div>
                        )}
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-[11px] font-mono font-semibold text-black block">
                          {breed.heightMinHands}–{breed.heightMaxHands} hh
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 block">
                          {breed.heightMinCm}–{breed.heightMaxCm} cm
                        </span>
                      </div>
                    </div>

                    {/* Classification & Purpose Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-[10px] font-mono text-gray-800 uppercase">
                        {breed.classification}
                      </span>
                      <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-[10px] font-mono text-amber-900 uppercase">
                        {breed.historicalPurpose}
                      </span>
                      {breed.conservationStatus && breed.conservationStatus !== 'Stable' && (
                        <span className="px-2 py-0.5 bg-red-100 border border-red-300 text-[10px] font-mono text-red-800 uppercase font-semibold">
                          {breed.conservationStatus}
                        </span>
                      )}
                    </div>

                    {/* Conformation Snippet */}
                    <div className="text-xs text-gray-700 pt-2 border-t border-gray-100 line-clamp-2 font-sans">
                      <strong className="text-black font-semibold">Head & Neck: </strong>
                      {breed.conformationSummary.headAndNeck}
                    </div>

                    {/* Saddle Connection Snippet */}
                    <div className="bg-gray-50 p-2.5 border-l-2 border-amber-600 text-[11px] text-gray-800 space-y-0.5">
                      <div className="text-[10px] font-mono text-amber-800 uppercase tracking-wider font-semibold">
                        Saddle Tree Fit
                      </div>
                      <div className="line-clamp-2">
                        {breed.saddleConnection.witherConsiderations}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="p-4 pt-0 border-t border-gray-100 grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => onSelectBreed(breed)}
                      className="py-2 px-3 bg-black hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Full Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleCompare(breed)}
                      className={`py-2 px-3 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-1 border ${
                        inComparison
                          ? 'bg-amber-100 border-amber-500 text-amber-900'
                          : 'bg-white border-gray-300 text-gray-700 hover:text-black hover:border-black'
                      }`}
                    >
                      {inComparison ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-800" />
                          <span>Compared</span>
                        </>
                      ) : (
                        <>
                          <Scale className="w-3.5 h-3.5" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-8 py-3 bg-black text-white font-semibold text-xs uppercase tracking-widest hover:bg-amber-700 transition-colors shadow-xs"
            >
              Load Next 24 Breeds ({filteredBreeds.length - paginatedBreeds.length} remaining)
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
