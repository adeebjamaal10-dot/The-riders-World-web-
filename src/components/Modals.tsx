import React, { useState } from 'react';
import { BreedProfile, AnatomyGuide, HeritageArticle } from '../types';
import { X, Scale, Check, Clock, ShieldCheck, ExternalLink, Search } from 'lucide-react';
import { SorentaLogo } from './SorentaLogo';

/* =========================================================================
   1. BREED DETAIL MODAL
   ========================================================================= */
interface BreedModalProps {
  breed: BreedProfile | null;
  onClose: () => void;
  onToggleCompare: (breed: BreedProfile) => void;
  isCompared: boolean;
  onSelectRelatedBreed?: (breedId: string) => void;
}

export const BreedDetailModal: React.FC<BreedModalProps> = ({
  breed,
  onClose,
  onToggleCompare,
  isCompared
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'conformation' | 'movement' | 'saddle' | 'history'>('overview');

  if (!breed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-gray-300 text-gray-900 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-800 uppercase tracking-wider mb-1 font-semibold">
              <span>{breed.classification}</span>
              <span>•</span>
              <span>{breed.originCountry} ({breed.originRegion})</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-black font-normal leading-tight">
              {breed.name}
            </h2>
            {breed.alternativeNames.length > 0 && (
              <div className="text-xs text-gray-500 italic mt-0.5">
                Also known as: {breed.alternativeNames.join(', ')}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleCompare(breed)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5 border ${
                isCompared
                  ? 'bg-amber-100 border-amber-500 text-amber-900'
                  : 'bg-white border-gray-300 text-gray-800 hover:text-black hover:border-black'
              }`}
            >
              {isCompared ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-800" />
                  <span>In Compare</span>
                </>
              ) : (
                <>
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50 px-6 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Biometrics' },
            { id: 'conformation', label: 'Anatomical Conformation' },
            { id: 'movement', label: 'Movement & Biomechanics' },
            { id: 'saddle', label: 'Saddle Fit & Tree Geometry' },
            { id: 'history', label: 'History & Conservation' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs uppercase tracking-wider font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-black text-black bg-white'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs font-sans leading-relaxed flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 border border-gray-200">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block font-semibold">Height Range</span>
                  <span className="font-mono text-sm text-black font-semibold">{breed.heightMinHands}–{breed.heightMaxHands} hh</span>
                  <span className="text-[10px] text-gray-500 block font-mono">({breed.heightMinCm}–{breed.heightMaxCm} cm)</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block font-semibold">Continent</span>
                  <span className="text-sm text-black font-medium">{breed.continent}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block font-semibold">Historical Role</span>
                  <span className="text-sm text-black font-medium">{breed.historicalPurpose}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block font-semibold">Status</span>
                  <span className="text-sm text-black font-medium">{breed.conservationStatus || 'Stable'}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-black font-semibold mb-2">Coat Colours & Markings</h4>
                <div className="flex flex-wrap gap-1.5">
                  {breed.coatColours.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-[11px] text-gray-800 font-mono">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-black font-semibold mb-2">Distinguishing Characteristics</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  {breed.distinguishingFeatures.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-black font-semibold mb-2">Temperament & Management</h4>
                <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 border border-gray-200">
                  {breed.temperamentAndManagement}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'conformation' && (
            <div className="space-y-4">
              <div className="border border-gray-200 p-4 bg-gray-50 space-y-1">
                <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider block font-semibold">Head & Neck Architecture</span>
                <p className="text-xs text-gray-700">{breed.conformationSummary.headAndNeck}</p>
              </div>

              <div className="border border-gray-200 p-4 bg-gray-50 space-y-1">
                <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider block font-semibold">Shoulders & Thoracic Cage</span>
                <p className="text-xs text-gray-700">{breed.conformationSummary.shouldersAndChest}</p>
              </div>

              <div className="border border-gray-200 p-4 bg-gray-50 space-y-1">
                <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider block font-semibold">Back, Loin & Croup Conformation</span>
                <p className="text-xs text-gray-700">{breed.conformationSummary.backAndCroup}</p>
              </div>

              <div className="border border-gray-200 p-4 bg-gray-50 space-y-1">
                <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider block font-semibold">Limbs, Tendons & Hoof Quality</span>
                <p className="text-xs text-gray-700">{breed.conformationSummary.limbsAndHooves}</p>
              </div>
            </div>
          )}

          {activeTab === 'movement' && (
            <div className="space-y-4">
              <div className="bg-amber-50/50 border-l-2 border-amber-600 p-4 space-y-2">
                <span className="text-[10px] font-mono text-amber-900 uppercase tracking-wider block font-semibold">Gait Kinematics & Locomotion</span>
                <p className="text-xs text-gray-800 leading-relaxed">{breed.movementCharacteristics}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1">Veterinary & Soundness Considerations</h4>
                <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 border border-gray-200">
                  {breed.careAndHealthConsiderations}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'saddle' && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 border border-gray-300 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <SorentaLogo size="sm" withBorder />
                    <div>
                      <span className="text-black font-serif text-sm font-semibold block leading-tight">
                        Research Partner & Information Provider: Sorenta Saddlery
                      </span>
                      <span className="text-[10px] text-amber-800 font-mono uppercase tracking-wider font-semibold">
                        Equine Dorsal Biomechanics & Anatomical Tree Protocol
                      </span>
                    </div>
                  </div>
                  <a
                    href="https://sorenta-saddlery.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-gray-600 hover:text-black uppercase tracking-wider flex items-center space-x-1"
                  >
                    <span>Atelier</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-black font-semibold block text-[10px] uppercase font-mono">Dorsal Back Profile</span>
                    <p className="text-gray-700 mt-0.5">{breed.saddleConnection.backShapeProfile}</p>
                  </div>
                  <div>
                    <span className="text-black font-semibold block text-[10px] uppercase font-mono">Wither Conformation & Vertical Clearance</span>
                    <p className="text-gray-700 mt-0.5">{breed.saddleConnection.witherConsiderations}</p>
                  </div>
                  <div>
                    <span className="text-black font-semibold block text-[10px] uppercase font-mono">Shoulder Blade Freedom & Scapular Arc</span>
                    <p className="text-gray-700 mt-0.5">{breed.saddleConnection.shoulderClearance}</p>
                  </div>
                  <div>
                    <span className="text-black font-semibold block text-[10px] uppercase font-mono">Master Saddler Tree Fitting Guidance</span>
                    <p className="text-black font-medium mt-0.5 bg-white p-2.5 border border-gray-200">{breed.saddleConnection.fittingGuidance}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-black font-semibold mb-2">Historical Development & Lineage</h4>
                <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-4 border border-gray-200">
                  {breed.historicalDevelopment}
                </p>
              </div>

              {breed.populationEstimate && (
                <div className="text-xs text-gray-700">
                  <strong className="text-black font-mono uppercase text-[10px] block font-semibold">Census Estimate</strong>
                  {breed.populationEstimate}
                </div>
              )}

              <div className="pt-2 border-t border-gray-200">
                <h4 className="text-xs font-mono uppercase tracking-wider text-black font-semibold mb-2">Academic & Studbook References</h4>
                <ul className="list-disc pl-5 space-y-1 text-[11px] text-gray-600 font-mono">
                  {breed.verifiedSources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <span>Peer Review Status: {breed.reviewStatus} ({breed.lastReviewed})</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black hover:bg-gray-800 text-white uppercase tracking-wider font-semibold"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};


/* =========================================================================
   2. ANATOMY DETAIL MODAL
   ========================================================================= */
interface AnatomyModalProps {
  guide: AnatomyGuide | null;
  onClose: () => void;
}

export const AnatomyDetailModal: React.FC<AnatomyModalProps> = ({ guide, onClose }) => {
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-gray-300 text-gray-900 w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-800 uppercase tracking-wider mb-1 font-semibold">
              <span>{guide.department}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{guide.readingTimeMinutes} min read</span>
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-black font-normal leading-tight">
              {guide.title}
            </h2>
            <div className="text-xs text-gray-600 italic mt-0.5">
              {guide.subtitle}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs font-sans leading-relaxed flex-1">
          <div className="bg-amber-50/60 border-l-2 border-amber-600 p-4 text-black text-sm leading-relaxed">
            {guide.leadSummary}
          </div>

          <div>
            <span className="text-[10px] font-mono text-black uppercase tracking-wider block mb-2 font-semibold">
              Primary Anatomical Structures
            </span>
            <div className="flex flex-wrap gap-1.5">
              {guide.primaryStructures.map((s, i) => (
                <span key={i} className="px-2.5 py-1 bg-gray-50 border border-gray-200 font-mono text-[11px] text-gray-800">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono text-black uppercase tracking-wider block mb-1 font-semibold">
              Physiological & Functional Role
            </span>
            <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3.5 border border-gray-200">
              {guide.functionalRole}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono text-black uppercase tracking-wider block mb-1 font-semibold">
              Biomechanical & Locomotor Impact
            </span>
            <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3.5 border border-gray-200">
              {guide.biomechanicalImpact}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-300 p-4 space-y-1">
            <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Relevance to Saddle Fit & Rider Balance</span>
            </span>
            <p className="text-xs text-gray-800 leading-relaxed pt-1">
              {guide.relevanceToSaddleAndRider}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono text-black uppercase tracking-wider block mb-1 font-semibold">
              Veterinary & Maintenance Considerations
            </span>
            <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3.5 border border-gray-200">
              {guide.clinicalAndCareNotes}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono text-black uppercase tracking-wider block mb-2 font-semibold">
              Key Clinical Takeaways
            </span>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-700">
              {guide.keyTakeaways.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <span className="text-[10px] font-mono text-black uppercase tracking-wider block mb-2 font-semibold">
              Academic Peer-Reviewed References
            </span>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-gray-600 font-mono">
              {guide.academicReferences.map((ref, i) => (
                <li key={i}>{ref}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black text-white font-semibold text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Close Chapter
          </button>
        </div>
      </div>
    </div>
  );
};


/* =========================================================================
   3. HERITAGE DETAIL MODAL
   ========================================================================= */
interface HeritageModalProps {
  article: HeritageArticle | null;
  onClose: () => void;
}

export const HeritageDetailModal: React.FC<HeritageModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-gray-300 text-gray-900 w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-800 uppercase tracking-wider mb-1 font-semibold">
              <span>Monograph #{article.order}</span>
              <span>•</span>
              <span>{article.era}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{article.readingTimeMinutes} min read</span>
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-black font-normal leading-tight">
              {article.title}
            </h2>
            <div className="text-xs text-amber-800 font-mono mt-1 font-semibold">
              {article.geographicFocus}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs font-sans leading-relaxed flex-1">
          <div className="bg-amber-50/60 border-l-2 border-amber-600 p-4 text-black text-sm leading-relaxed">
            {article.summary}
          </div>

          <div className="space-y-6">
            {article.contentSections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-serif text-lg text-black font-semibold border-b border-gray-200 pb-1">
                  {sec.heading}
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed font-sans text-justify">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <span className="text-[10px] font-mono text-black uppercase tracking-wider block mb-2 font-semibold">
              Archaeological, Zooarchaeological & Historical Sources
            </span>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-gray-600 font-mono">
              {article.archaeologicalAndHistoricalSources.map((src, i) => (
                <li key={i}>{src}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black text-white font-semibold text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Close Monograph
          </button>
        </div>
      </div>
    </div>
  );
};


/* =========================================================================
   4. GLOBAL SEARCH MODAL
   ========================================================================= */
interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  breeds: BreedProfile[];
  guides: AnatomyGuide[];
  articles: HeritageArticle[];
  onSelectBreed: (b: BreedProfile) => void;
  onSelectGuide: (g: AnatomyGuide) => void;
  onSelectArticle: (a: HeritageArticle) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  breeds,
  guides,
  articles,
  onSelectBreed,
  onSelectGuide,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingBreeds = q ? breeds.filter(b => 
    b.name.toLowerCase().includes(q) || 
    b.originCountry.toLowerCase().includes(q) ||
    b.classification.toLowerCase().includes(q)
  ).slice(0, 6) : [];

  const matchingArticles = q ? articles.filter(a => 
    a.title.toLowerCase().includes(q) ||
    a.geographicFocus.toLowerCase().includes(q) ||
    a.era.toLowerCase().includes(q)
  ).slice(0, 4) : [];

  const totalResults = matchingBreeds.length + matchingArticles.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white border border-gray-400 text-gray-900 w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center space-x-3">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across 243 breeds and 30 monographs..."
            className="w-full bg-transparent text-sm text-black focus:outline-none placeholder-gray-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Body */}
        <div className="p-4 overflow-y-auto space-y-5 text-xs font-sans divide-y divide-gray-200">
          {!q ? (
            <div className="py-8 text-center text-xs text-gray-500">
              Type to search breeds (e.g. "Friesian", "Arabian", "Mustang") or history ("Botai", "stirrup")...
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500">
              No results found for "{query}".
            </div>
          ) : (
            <>
              {matchingBreeds.length > 0 && (
                <div className="space-y-2 pt-2 first:pt-0">
                  <div className="text-[10px] font-mono text-black uppercase tracking-wider font-semibold">
                    Horse Breeds ({matchingBreeds.length})
                  </div>
                  <div className="space-y-1">
                    {matchingBreeds.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          onSelectBreed(b);
                          onClose();
                        }}
                        className="w-full text-left p-2 hover:bg-gray-50 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <span className="font-serif text-sm text-black group-hover:text-amber-800 font-medium">
                            {b.name}
                          </span>
                          <span className="text-[11px] text-gray-500 ml-2">
                            {b.originCountry} • {b.classification}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-amber-800 font-semibold">
                          {b.heightMinHands}–{b.heightMaxHands} hh
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingArticles.length > 0 && (
                <div className="space-y-2 pt-3">
                  <div className="text-[10px] font-mono text-black uppercase tracking-wider font-semibold">
                    Heritage Monographs ({matchingArticles.length})
                  </div>
                  <div className="space-y-1">
                    {matchingArticles.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => {
                          onSelectArticle(a);
                          onClose();
                        }}
                        className="w-full text-left p-2 hover:bg-gray-50 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <span className="font-serif text-sm text-black group-hover:text-amber-800 font-medium">
                            {a.title}
                          </span>
                          <span className="text-[11px] text-gray-500 ml-2">
                            {a.era}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">
                          {a.readingTimeMinutes} min
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
