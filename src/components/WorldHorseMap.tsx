import React, { useState, useMemo } from 'react';
import { BreedProfile, Continent } from '../types';
import { MapPin, Search, ExternalLink, Scale, Check, Globe, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import worldMapImg from '../assets/world-map.png';
import { WORLD_MAP_BASE64 } from '../assets/worldMapData';
import { SorentaLogo } from './SorentaLogo';

interface WorldHorseMapProps {
  breeds: BreedProfile[];
  onSelectBreed: (breed: BreedProfile) => void;
  onToggleCompare: (breed: BreedProfile) => void;
  isCompared: (breedId: string) => boolean;
}

// Master Calibrated Coordinates (X%, Y%) precisely fitted to image_d97a1431.png (630 x 350)
// Every coordinate has been verified to land directly on the landmass silhouette.
const COUNTRY_COORDINATES: Record<string, [number, number]> = {
  // Europe
  'United Kingdom': [46.7, 26.5],
  'Ireland': [45.4, 26.8],
  'Spain': [46.5, 37.0],
  'Portugal': [45.1, 37.5],
  'France': [48.1, 31.0],
  'Germany': [51.3, 27.5],
  'Netherlands': [49.5, 26.5],
  'Belgium': [48.9, 27.8],
  'Austria': [52.2, 30.5],
  'Switzerland': [49.8, 31.5],
  'Italy': [51.9, 35.0],
  'Denmark': [51.1, 23.5],
  'Norway': [50.8, 18.0],
  'Sweden': [52.9, 18.8],
  'Finland': [56.7, 16.8],
  'Poland': [54.3, 26.2],
  'Czech Republic': [52.8, 28.8],
  'Hungary': [53.5, 30.2],
  'Slovakia': [53.2, 28.8],
  'Slovenia': [52.2, 33.2],
  'Croatia': [52.5, 34.0],
  'Bosnia and Herzegovina': [53.2, 34.8],
  'Greece': [55.4, 38.8],
  'Bulgaria': [54.9, 34.2],
  'Romania': [55.5, 31.5],
  'Lithuania': [55.4, 24.0],
  'Latvia': [55.7, 22.6],
  'Estonia': [56.3, 21.0],
  'Iceland': [39.4, 12.5],
  'Ukraine': [58.2, 26.5],
  'Russia': [68.0, 20.0],
  'Turkey': [58.4, 35.8],

  // North America
  'United States': [21.0, 32.5],
  'Canada': [21.5, 20.5],
  'Mexico': [17.6, 43.5],

  // South America
  'Argentina': [29.0, 84.0],
  'Brazil': [33.0, 64.0],
  'Peru': [26.5, 62.5],
  'Chile': [27.0, 78.5],
  'Colombia': [27.0, 52.5],

  // Asia
  'China': [78.5, 36.0],
  'Mongolia': [78.0, 29.5],
  'Japan': [85.6, 35.2],
  'India': [70.0, 48.0],
  'Saudi Arabia': [59.8, 45.5],
  'Iran': [62.2, 38.5],
  'Turkmenistan': [62.7, 34.0],
  'Kazakhstan': [66.0, 25.5],
  'Uzbekistan': [63.0, 31.5],
  'South Korea': [82.2, 36.5],
  'Indonesia': [78.5, 61.0],

  // Africa
  'South Africa': [53.3, 79.5],
  'Morocco': [45.4, 41.2],
  'Egypt': [55.4, 43.0],
  'Ethiopia': [58.9, 52.5],
  'Namibia': [50.6, 73.8],
  'Lesotho': [54.0, 80.5],
  'Chad': [50.5, 50.0],

  // Oceania
  'Australia': [82.0, 75.0],
  'New Zealand': [93.7, 86.8],
};

// Regional sub-offsets so multiple breeds within large nations spread accurately
function getRegionalOffset(breed: BreedProfile): [number, number] {
  const reg = (breed.originRegion || '').toLowerCase();
  const name = breed.name.toLowerCase();

  // United States regions
  if (breed.originCountry === 'United States') {
    if (reg.includes('california') || reg.includes('west') || name.includes('mustang')) return [-6.5, 2.0];
    if (reg.includes('kentucky') || reg.includes('appalachian') || name.includes('saddlebred')) return [3.5, 0.5];
    if (reg.includes('texas') || reg.includes('southwest') || name.includes('paint')) return [-1.5, 5.0];
    if (reg.includes('florida') || reg.includes('carolina') || name.includes('cracker')) return [3.8, 6.2];
    if (reg.includes('vermont') || reg.includes('new england') || name.includes('morgan')) return [4.8, -3.2];
    if (reg.includes('dakota') || reg.includes('rocky') || name.includes('nokota')) return [-3.5, -2.5];
    if (reg.includes('oregon') || reg.includes('washington') || name.includes('ranger')) return [-7.0, -3.0];
    if (reg.includes('virginia') || reg.includes('maryland') || name.includes('chincoteague')) return [4.2, 1.8];
  }

  // United Kingdom regions
  if (breed.originCountry === 'United Kingdom') {
    if (reg.includes('scotland') || name.includes('clydesdale') || name.includes('highland') || name.includes('shetland')) return [-0.5, -4.5];
    if (reg.includes('wales') || name.includes('welsh')) return [-1.2, 1.5];
    if (reg.includes('yorkshire') || reg.includes('cleveland') || name.includes('cleveland') || name.includes('dales') || name.includes('fell')) return [0.4, -1.8];
    if (reg.includes('suffolk') || reg.includes('norfolk') || name.includes('suffolk') || name.includes('hackney')) return [1.5, 0.8];
    if (reg.includes('exmoor') || reg.includes('dartmoor') || reg.includes('devon') || name.includes('exmoor') || name.includes('dartmoor')) return [-1.0, 2.0];
  }

  // Germany regions
  if (breed.originCountry === 'Germany') {
    if (reg.includes('hanover') || reg.includes('lower saxony')) return [-0.8, -1.8];
    if (reg.includes('holstein') || reg.includes('schleswig')) return [-0.4, -3.6];
    if (reg.includes('bavaria') || reg.includes('black forest') || reg.includes('south')) return [0.8, 2.5];
    if (reg.includes('westphalia') || reg.includes('rhine')) return [-1.2, 0.5];
    if (reg.includes('east prussia') || name.includes('trakehner')) return [3.2, -2.0];
  }

  // Spain regions
  if (breed.originCountry === 'Spain') {
    if (reg.includes('andalusia') || reg.includes('jerez') || name.includes('andalusian')) return [-0.5, 1.8];
    if (reg.includes('asturias') || reg.includes('north') || name.includes('asturc')) return [-0.8, -2.0];
    if (reg.includes('basque') || name.includes('pottok')) return [0.8, -2.2];
  }

  // France regions
  if (breed.originCountry === 'France') {
    if (reg.includes('normandy') || reg.includes('perche') || name.includes('percheron') || name.includes('norman')) return [-1.5, -1.5];
    if (reg.includes('camargue') || reg.includes('south') || name.includes('camargue') || name.includes('mérens')) return [1.0, 3.2];
    if (reg.includes('brittany') || name.includes('breton')) return [-2.8, -0.5];
    if (reg.includes('ardennes') || reg.includes('north')) return [1.5, -2.5];
  }

  // Japan regions
  if (breed.originCountry === 'Japan') {
    if (reg.includes('hokkaido')) return [1.2, -3.0];
    if (reg.includes('okinawa') || reg.includes('yonaguni') || reg.includes('miyak')) return [-2.2, 3.8];
    if (reg.includes('kiso') || reg.includes('nagano')) return [-0.2, 0.5];
  }

  // Australia regions
  if (breed.originCountry === 'Australia') {
    if (reg.includes('new south wales') || reg.includes('sydney') || name.includes('waler')) return [1.8, 3.5];
    if (reg.includes('outback') || reg.includes('northern') || name.includes('brumby')) return [-1.5, -3.0];
    if (reg.includes('coffin bay') || reg.includes('south')) return [-2.5, 4.0];
  }

  // Slight pseudo-random organic jitter by breed id to avoid exact coordinate overlaps
  let hash = 0;
  for (let i = 0; i < breed.id.length; i++) {
    hash = (hash << 5) - hash + breed.id.charCodeAt(i);
    hash |= 0;
  }
  const jx = ((Math.abs(hash) % 17) - 8) * 0.15;
  const jy = ((Math.abs(hash >> 3) % 17) - 8) * 0.15;
  return [jx, jy];
}

export const WorldHorseMap: React.FC<WorldHorseMapProps> = ({
  breeds,
  onSelectBreed,
  onToggleCompare,
  isCompared
}) => {
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'All'>('All');
  const [selectedBreed, setSelectedBreed] = useState<BreedProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapTheme, setMapTheme] = useState<'invert' | 'standard'>('invert'); // 'invert' is white ocean & black continents!

  const continents: (Continent | 'All')[] = [
    'All',
    'Europe',
    'North America',
    'South America',
    'Asia',
    'Africa',
    'Oceania'
  ];

  // Resolve mapped breeds with exact coordinates
  const mappedBreeds = useMemo(() => {
    return breeds.map((breed) => {
      const base = COUNTRY_COORDINATES[breed.originCountry];
      if (!base) {
        // Fallback continent coordinates if country not explicitly mapped
        const continentDefaults: Record<Continent, [number, number]> = {
          'Europe': [50.0, 28.0],
          'North America': [20.0, 32.0],
          'South America': [30.0, 72.0],
          'Asia': [75.0, 35.0],
          'Africa': [52.0, 60.0],
          'Oceania': [82.0, 75.0],
        };
        const [cx, cy] = continentDefaults[breed.continent] || [50.0, 30.0];
        const [ox, oy] = getRegionalOffset(breed);
        return { breed, x: Math.max(2, Math.min(97, cx + ox)), y: Math.max(5, Math.min(95, cy + oy)) };
      }
      const [ox, oy] = getRegionalOffset(breed);
      const x = Math.max(2, Math.min(97, base[0] + ox));
      const y = Math.max(5, Math.min(95, base[1] + oy));
      return { breed, x, y };
    }).filter(({ breed }) => {
      const matchesContinent = selectedContinent === 'All' || breed.continent === selectedContinent;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        breed.name.toLowerCase().includes(q) ||
        breed.originCountry.toLowerCase().includes(q) ||
        breed.originRegion.toLowerCase().includes(q) ||
        breed.classification.toLowerCase().includes(q);
      return matchesContinent && matchesSearch;
    });
  }, [breeds, selectedContinent, searchQuery]);

  return (
    <div className="bg-white text-gray-900 border-b border-gray-200 py-12" id="world-map">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-700 text-xs font-mono tracking-widest uppercase mb-1 font-semibold">
              <Globe className="w-4 h-4" />
              <span>International Geographical Distribution</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-black">
              The World Horse Map
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mt-1">
              Interactive high-contrast cartographic distribution of {breeds.length} verified horse populations, mapped across their native continents and territories.
            </p>
          </div>

          {/* Quick Search & Map Invert Switcher */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search breed, country on map..."
                className="w-full bg-gray-50 border border-gray-300 text-xs text-gray-900 pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-600 focus:bg-white transition-colors"
              />
            </div>

            {/* Invert Map Toggle */}
            <button
              onClick={() => setMapTheme(t => t === 'invert' ? 'standard' : 'invert')}
              className="p-2 border border-gray-300 hover:border-gray-500 bg-gray-50 text-gray-700 text-xs flex items-center space-x-1.5 transition-colors"
              title="Toggle Map High-Contrast Mode"
            >
              {mapTheme === 'invert' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline font-mono text-[11px]">White Ocean</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-gray-700" />
                  <span className="hidden sm:inline font-mono text-[11px]">Dark Ocean</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Continent Filter Bar */}
        <div className="flex overflow-x-auto pb-3 mb-6 gap-2 border-b border-gray-200 scrollbar-none">
          {continents.map((cont) => {
            const count = cont === 'All' 
              ? breeds.length 
              : breeds.filter(b => b.continent === cont).length;
            const isSelected = selectedContinent === cont;
            return (
              <button
                key={cont}
                onClick={() => {
                  setSelectedContinent(cont);
                  setSelectedBreed(null);
                }}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-all flex-shrink-0 border ${
                  isSelected
                    ? 'bg-black text-white border-black font-semibold shadow-sm'
                    : 'bg-white text-gray-700 hover:text-black border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{cont}</span>
                <span className="text-[10px] opacity-80 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Map Layout: Interactive Map Canvas + Selection Side Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Map Visual Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-gray-300 relative overflow-hidden shadow-sm aspect-[16/9] flex items-center justify-center select-none group">
            
            {/* The Hard-Feeded Map Image from User */}
            <img
              src={worldMapImg || WORLD_MAP_BASE64}
              alt="World Map of Horse Breeds"
              className={`w-full h-full object-cover transition-all duration-300 pointer-events-none ${
                mapTheme === 'invert' 
                  ? 'filter invert contrast-110 brightness-95' 
                  : 'filter contrast-105'
              }`}
              onError={(e) => {
                // Guaranteed fallback to hard-coded base64 URI on Cloudflare / GitHub Pages
                if (e.currentTarget.src !== WORLD_MAP_BASE64) {
                  e.currentTarget.src = WORLD_MAP_BASE64;
                }
              }}
            />

            {/* Interactive Breed Dots Overlay Layer */}
            <div className="absolute inset-0 pointer-events-none">
              {mappedBreeds.map(({ breed, x, y }) => {
                const isSelected = selectedBreed?.id === breed.id;

                return (
                  <button
                    key={breed.id}
                    onClick={() => setSelectedBreed(breed)}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-200 z-10 group/dot ${
                      isSelected ? 'scale-150 z-30' : 'hover:scale-150 hover:z-20'
                    }`}
                    title={`${breed.name} — ${breed.originCountry}`}
                    aria-label={breed.name}
                  >
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      {/* Pulse Ring */}
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected 
                          ? 'bg-amber-500' 
                          : mapTheme === 'invert'
                            ? 'bg-amber-400 group-hover/dot:bg-amber-500'
                            : 'bg-amber-400 group-hover/dot:bg-amber-500'
                      }`} />
                      
                      {/* Solid Center Dot */}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 border ${
                        isSelected
                          ? 'bg-amber-500 border-white shadow-md'
                          : mapTheme === 'invert'
                            ? 'bg-amber-500 border-black group-hover/dot:bg-white group-hover/dot:border-amber-600'
                            : 'bg-amber-400 border-black group-hover/dot:bg-white group-hover/dot:border-amber-500'
                      }`} />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Map Footnote & Status */}
            <div className="absolute bottom-2 left-2 bg-white/95 border border-gray-300 px-3 py-1 text-[11px] font-mono text-gray-800 shadow-sm backdrop-blur-xs">
              <span className="font-semibold text-black">{mappedBreeds.length}</span> Active Pins • {selectedContinent} View
            </div>

            {/* Instruction tooltip */}
            <div className="absolute top-2 right-2 bg-white/95 border border-gray-300 px-2.5 py-1 text-[10px] font-mono text-gray-600 hidden sm:block shadow-sm">
              Click any dot to inspect breed dossier
            </div>

          </div>

          {/* Side Inspector Card (4 cols) */}
          <div className="lg:col-span-4 bg-gray-50 border border-gray-300 p-5 min-h-[400px] flex flex-col justify-between shadow-xs">
            {selectedBreed ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider font-semibold block">
                      {selectedBreed.classification}
                    </span>
                    <h3 className="font-serif text-2xl text-black font-normal leading-tight mt-0.5">
                      {selectedBreed.name}
                    </h3>
                    <div className="text-xs text-gray-700 mt-1 font-medium">
                      {selectedBreed.originCountry} • {selectedBreed.originRegion} ({selectedBreed.continent})
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-amber-800 font-semibold">
                    {selectedBreed.heightMinHands}–{selectedBreed.heightMaxHands} hh
                    <span className="block text-[10px] text-gray-500 font-normal">
                      {selectedBreed.heightMinCm}–{selectedBreed.heightMaxCm} cm
                    </span>
                  </div>
                </div>

                {/* Key Details */}
                <div className="text-xs text-gray-800 pt-3 border-t border-gray-200 space-y-2.5">
                  <div>
                    <span className="text-gray-500 font-mono block uppercase text-[10px] tracking-wider">
                      Historical Purpose
                    </span>
                    <span className="font-medium text-black">{selectedBreed.historicalPurpose}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-500 font-mono block uppercase text-[10px] tracking-wider">
                      Distinguishing Traits
                    </span>
                    <span className="text-gray-700">{selectedBreed.distinguishingFeatures.slice(0, 2).join('; ')}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 font-mono block uppercase text-[10px] tracking-wider">
                      Saddle Fitting Note
                    </span>
                    <span className="italic text-gray-800 bg-white p-2 border border-gray-200 block mt-0.5">
                      {selectedBreed.saddleConnection.witherConsiderations}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 border border-gray-200 flex items-center space-x-2.5">
                    <SorentaLogo size="xs" withBorder />
                    <div className="text-[10px] leading-tight">
                      <span className="font-semibold text-black block font-mono uppercase">Research Partner & Info Provider</span>
                      <span className="text-gray-600 truncate block">{selectedBreed.saddleConnection.fittingGuidance}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button
                    onClick={() => onSelectBreed(selectedBreed)}
                    className="w-full py-2.5 bg-black text-white font-semibold text-xs uppercase tracking-wider hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2 shadow-xs"
                  >
                    <span>Examine Full Dossier</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleCompare(selectedBreed)}
                    className={`w-full py-2 text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 border transition-colors ${
                      isCompared(selectedBreed.id)
                        ? 'bg-amber-100 border-amber-500 text-amber-900'
                        : 'bg-white border-gray-300 text-gray-800 hover:text-black hover:border-black'
                    }`}
                  >
                    {isCompared(selectedBreed.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-amber-800" />
                        <span>In Comparison Matrix</span>
                      </>
                    ) : (
                      <>
                        <Scale className="w-3.5 h-3.5" />
                        <span>Add to Comparison</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4 space-y-3">
                <MapPin className="w-8 h-8 text-amber-700 stroke-[1.5]" />
                <h4 className="font-serif text-lg text-black font-normal">Select Any Map Pin</h4>
                <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
                  Click on any interactive dot on the world map to inspect breed biometrics, conformational structure, and anatomical saddle tree recommendations.
                </p>
                <div className="text-[11px] font-mono text-amber-800 pt-2 font-medium">
                  {mappedBreeds.length} active dots on this map
                </div>
                <div className="pt-4 border-t border-gray-200 flex items-center space-x-2 text-left">
                  <SorentaLogo size="xs" withBorder />
                  <span className="text-[10px] text-gray-500 font-sans">
                    Tree geometry provided by research partner <a href="https://sorenta-saddlery.com/" target="_blank" rel="noopener noreferrer" className="text-black underline font-semibold">Sorenta Saddlery</a>
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
