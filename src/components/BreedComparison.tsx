import React, { useState } from 'react';
import { BreedProfile } from '../types';
import { Scale, X, Plus, ExternalLink, Trash2, ArrowLeft } from 'lucide-react';

interface BreedComparisonProps {
  allBreeds: BreedProfile[];
  comparedBreeds: BreedProfile[];
  onRemoveBreed: (breedId: string) => void;
  onAddBreed: (breed: BreedProfile) => void;
  onClearAll: () => void;
  onSelectBreed: (breed: BreedProfile) => void;
  onBackToCatalog: () => void;
}

export const BreedComparison: React.FC<BreedComparisonProps> = ({
  allBreeds,
  comparedBreeds,
  onRemoveBreed,
  onAddBreed,
  onClearAll,
  onSelectBreed,
  onBackToCatalog
}) => {
  const [searchToAdd, setSearchToAdd] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);

  const candidatesToAdd = allBreeds.filter((b) => {
    const isAlreadyCompared = comparedBreeds.some((c) => c.id === b.id);
    const matchesSearch = !searchToAdd || 
      b.name.toLowerCase().includes(searchToAdd.toLowerCase()) ||
      b.originCountry.toLowerCase().includes(searchToAdd.toLowerCase());
    return !isAlreadyCompared && matchesSearch;
  }).slice(0, 8);

  const comparisonRows = [
    {
      title: 'Taxonomic Classification',
      render: (b: BreedProfile) => (
        <div>
          <span className="font-semibold text-black">{b.classification}</span>
          <div className="text-[11px] text-gray-600">{b.historicalPurpose}</div>
        </div>
      )
    },
    {
      title: 'Geographic Origin',
      render: (b: BreedProfile) => (
        <div>
          <div className="font-semibold text-black">{b.originCountry}</div>
          <div className="text-[11px] text-amber-800 font-medium">{b.originRegion} ({b.continent})</div>
        </div>
      )
    },
    {
      title: 'Height Range',
      render: (b: BreedProfile) => (
        <div className="font-mono text-black font-semibold">
          <div>{b.heightMinHands} – {b.heightMaxHands} hands</div>
          <div className="text-[11px] text-gray-500 font-normal">({b.heightMinCm} – {b.heightMaxCm} cm)</div>
        </div>
      )
    },
    {
      title: 'Head & Neck Conformation',
      render: (b: BreedProfile) => (
        <p className="text-xs text-gray-700 leading-relaxed">
          {b.conformationSummary.headAndNeck}
        </p>
      )
    },
    {
      title: 'Shoulders & Chest',
      render: (b: BreedProfile) => (
        <p className="text-xs text-gray-700 leading-relaxed">
          {b.conformationSummary.shouldersAndChest}
        </p>
      )
    },
    {
      title: 'Back, Loin & Croup',
      render: (b: BreedProfile) => (
        <p className="text-xs text-gray-700 leading-relaxed">
          {b.conformationSummary.backAndCroup}
        </p>
      )
    },
    {
      title: 'Limbs, Bone & Hooves',
      render: (b: BreedProfile) => (
        <p className="text-xs text-gray-700 leading-relaxed">
          {b.conformationSummary.limbsAndHooves}
        </p>
      )
    },
    {
      title: 'Movement & Biomechanics',
      render: (b: BreedProfile) => (
        <p className="text-xs text-gray-700 leading-relaxed">
          {b.movementCharacteristics}
        </p>
      )
    },
    {
      title: 'Saddle Fit: Wither & Spine',
      render: (b: BreedProfile) => (
        <div className="bg-amber-50/50 p-2.5 border-l-2 border-amber-600 text-xs text-gray-900 space-y-1">
          <div className="font-semibold text-amber-900 text-[10px] uppercase font-mono">Wither Consideration</div>
          <div>{b.saddleConnection.witherConsiderations}</div>
        </div>
      )
    },
    {
      title: 'Saddle Fit: Tree Fitting & Shoulder',
      render: (b: BreedProfile) => (
        <div className="bg-gray-50 p-2.5 border-l-2 border-gray-400 text-xs text-gray-800 space-y-1">
          <div className="font-semibold text-black text-[10px] uppercase font-mono">Tree Geometry Guidance</div>
          <div>{b.saddleConnection.fittingGuidance}</div>
        </div>
      )
    },
    {
      title: 'Conservation Status',
      render: (b: BreedProfile) => (
        <div>
          <span className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase font-semibold ${
            b.conservationStatus === 'Critical' ? 'bg-red-100 text-red-800 border border-red-300' :
            b.conservationStatus === 'Endangered' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
            'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            {b.conservationStatus || 'Stable'}
          </span>
          {b.populationEstimate && (
            <div className="text-[11px] text-gray-500 mt-0.5">Est. {b.populationEstimate}</div>
          )}
        </div>
      )
    }
  ];

  if (comparedBreeds.length === 0) {
    return (
      <div className="bg-white text-gray-900 py-20 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-12 h-12 border border-gray-300 bg-gray-50 flex items-center justify-center text-amber-700 mx-auto">
            <Scale className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-2xl text-black">Comparison Matrix is Empty</h2>
          <p className="text-xs text-gray-600 leading-relaxed font-sans">
            Select 2 to 4 breeds from the database to compare their skeletal dimensions, back profile, movement biomechanics, and saddle tree requirements side-by-side.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onBackToCatalog}
              className="px-5 py-2.5 bg-black text-white font-semibold text-xs uppercase tracking-wider hover:bg-amber-700 transition-colors"
            >
              Browse 243 Breeds
            </button>
            <button
              onClick={() => {
                const friesian = allBreeds.find(b => b.id === 'friesian-horse') || allBreeds[0];
                const quarter = allBreeds.find(b => b.id === 'american-quarter-horse') || allBreeds[1];
                const arabian = allBreeds.find(b => b.id === 'arabian') || allBreeds[2];
                onAddBreed(friesian);
                onAddBreed(quarter);
                onAddBreed(arabian);
              }}
              className="px-4 py-2.5 bg-gray-50 border border-gray-300 text-xs text-gray-800 hover:border-black uppercase tracking-wider transition-colors font-medium"
            >
              Load Sample Trio (Friesian vs Quarter vs Arabian)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-gray-200 pb-6">
          <div>
            <button
              onClick={onBackToCatalog}
              className="text-xs text-amber-800 hover:text-black flex items-center space-x-1 uppercase tracking-wider mb-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Catalog</span>
            </button>
            <h2 className="font-serif text-3xl font-light text-black">
              Side-by-Side Equine Comparison Engine
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Comparing {comparedBreeds.length} breeds across anatomical structure, gait mechanics, and saddle fitting geometry.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {comparedBreeds.length < 4 && (
              <div className="relative">
                <button
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  className="px-3.5 py-2 bg-white border border-gray-300 hover:border-black text-xs text-gray-800 uppercase tracking-wider flex items-center space-x-1.5 transition-colors font-medium"
                >
                  <Plus className="w-3.5 h-3.5 text-black" />
                  <span>Add Another Breed</span>
                </button>

                {showAddMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-black shadow-xl z-30 p-3 space-y-2">
                    <input
                      type="text"
                      value={searchToAdd}
                      onChange={(e) => setSearchToAdd(e.target.value)}
                      placeholder="Search breed to add..."
                      className="w-full bg-gray-50 border border-gray-300 text-xs text-black px-2.5 py-1.5 focus:outline-none focus:border-black"
                      autoFocus
                    />
                    <div className="max-h-48 overflow-y-auto space-y-1 divide-y divide-gray-100">
                      {candidatesToAdd.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            onAddBreed(b);
                            setShowAddMenu(false);
                            setSearchToAdd('');
                          }}
                          className="w-full text-left py-1.5 px-2 hover:bg-gray-50 text-xs flex items-center justify-between group"
                        >
                          <div>
                            <div className="font-serif text-black group-hover:text-amber-800">{b.name}</div>
                            <div className="text-[10px] text-gray-500">{b.originCountry}</div>
                          </div>
                          <Plus className="w-3.5 h-3.5 text-black" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={onClearAll}
              className="px-3.5 py-2 border border-red-300 text-xs text-red-700 hover:bg-red-50 uppercase tracking-wider flex items-center space-x-1.5 transition-colors font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Matrix</span>
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto border border-gray-300 bg-white shadow-xs">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="p-4 w-1/4 text-xs font-mono uppercase tracking-widest text-gray-700 border-r border-gray-300 font-semibold">
                  Biomechanical Parameter
                </th>
                {comparedBreeds.map((breed) => (
                  <th key={breed.id} className="p-4 border-r last:border-r-0 border-gray-300 align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider font-semibold block">
                          {breed.originCountry}
                        </span>
                        <h3 className="font-serif text-lg text-black font-normal leading-tight">
                          {breed.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => onRemoveBreed(breed.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectBreed(breed)}
                      className="mt-3 text-[11px] font-mono text-black hover:text-amber-800 flex items-center space-x-1 uppercase tracking-wider font-medium"
                    >
                      <span>Open Full Dossier</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-xs font-sans">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-gray-700 text-[11px] uppercase tracking-wider align-top bg-gray-50/70 border-r border-gray-300 font-semibold">
                    {row.title}
                  </td>
                  {comparedBreeds.map((breed) => (
                    <td key={breed.id} className="p-4 align-top border-r last:border-r-0 border-gray-200">
                      {row.render(breed)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
