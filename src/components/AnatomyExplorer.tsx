import React, { useState } from 'react';
import { HotspotPoint, AnatomyGuide } from '../types';
import { anatomicalHotspots } from '../data/hotspots';
import { anatomyGuides } from '../data/anatomy';
import { Layers, ArrowRight, Info, CheckCircle2, BookOpen } from 'lucide-react';

interface AnatomyExplorerProps {
  onOpenGuide: (guide: AnatomyGuide) => void;
  onViewAllGuides: () => void;
}

export const AnatomyExplorer: React.FC<AnatomyExplorerProps> = ({
  onOpenGuide,
  onViewAllGuides
}) => {
  const [activeSystem, setActiveSystem] = useState<HotspotPoint['system'] | 'all'>('skeletal');
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotPoint>(anatomicalHotspots[0]);

  // Filter hotspots for the current system
  const filteredHotspots = activeSystem === 'all'
    ? anatomicalHotspots
    : anatomicalHotspots.filter((h) => h.system === activeSystem);

  // System layer definitions with descriptions
  const systems: { id: HotspotPoint['system'] | 'all'; label: string; count: number }[] = [
    { id: 'skeletal', label: 'Skeletal System', count: anatomicalHotspots.filter(h => h.system === 'skeletal').length },
    { id: 'muscular', label: 'Muscular System', count: anatomicalHotspots.filter(h => h.system === 'muscular').length },
    { id: 'conformation', label: 'Conformation & Angles', count: anatomicalHotspots.filter(h => h.system === 'conformation').length },
    { id: 'saddle', label: 'Saddle & Gullet Interaction', count: anatomicalHotspots.filter(h => h.system === 'saddle').length },
    { id: 'shoulder', label: 'Shoulder & Scapular Freedom', count: anatomicalHotspots.filter(h => h.system === 'shoulder').length },
    { id: 'all', label: 'All Hotspots', count: anatomicalHotspots.length }
  ];

  // Find linked anatomy guide if present
  const linkedGuide = selectedHotspot?.relatedGuideId
    ? anatomyGuides.find((g) => g.id === selectedHotspot.relatedGuideId)
    : null;

  return (
    <div className="bg-[#10272B] text-[#F3EFE6] border-b border-[#37463C] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#AC8B59] text-xs font-mono tracking-widest uppercase mb-1">
              <Layers className="w-4 h-4" />
              <span>Multi-Layer Equine Biomechanics</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F3EFE6]">
              Interactive Horse Anatomy Explorer
            </h2>
            <p className="text-sm text-[#E9E6DF]/70 max-w-2xl mt-1">
              Examine the critical skeletal, muscular, and saddle-bearing structures of the horse with interactive anatomical hotspot overlays.
            </p>
          </div>

          <button
            onClick={onViewAllGuides}
            className="px-4 py-2 border border-[#AC8B59] text-[#AC8B59] hover:bg-[#AC8B59] hover:text-[#10272B] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5 self-start md:self-auto"
          >
            <span>Browse All 50 Anatomy Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* System Layer Selector Tabs */}
        <div className="flex overflow-x-auto pb-3 mb-8 gap-2 border-b border-[#37463C]/60 scrollbar-none">
          {systems.map((sys) => {
            const isActive = activeSystem === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => setActiveSystem(sys.id)}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-[#AC8B59] text-[#10272B] font-bold shadow-sm'
                    : 'bg-[#252B2D] text-[#E9E6DF]/80 hover:text-[#F3EFE6] border border-[#37463C]'
                }`}
              >
                <span>{sys.label}</span>
                <span className="text-[10px] opacity-80 font-mono">({sys.count})</span>
              </button>
            );
          })}
        </div>

        {/* Main Grid: Interactive Diagram + Inspector Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Anatomical Silhouette Surface (7 cols) */}
          <div className="lg:col-span-7 bg-[#141E20] border border-[#37463C] relative overflow-hidden aspect-[4/3] p-4 shadow-inner flex items-center justify-center">
            
            {/* SVG Base Horse Anatomical Diagram */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="horseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E2B2E" />
                  <stop offset="100%" stopColor="#162224" />
                </linearGradient>
                <linearGradient id="spineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#AC8B59" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E9E6DF" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Equine Silhouette Contour */}
              <path
                d="M120,240 C130,210 145,170 180,140 C200,120 220,105 240,110 C245,90 255,85 260,95 C265,90 275,85 280,105 C290,130 305,170 330,175 C360,165 380,180 430,190 C490,195 560,195 620,220 C640,230 670,250 670,300 C675,340 680,410 670,470 L650,470 C655,420 655,360 645,330 C635,330 615,350 605,420 L585,550 L560,550 L575,430 C550,430 520,440 470,440 C430,440 400,430 370,410 C360,430 345,490 330,550 L305,550 L315,440 C300,420 280,390 260,350 C245,340 230,330 210,310 C180,315 140,320 125,290 C115,270 115,250 120,240 Z"
                fill="url(#horseGrad)"
                stroke="#37463C"
                strokeWidth="2"
              />

              {/* Anatomical Overlays based on active system */}
              {(activeSystem === 'skeletal' || activeSystem === 'all') && (
                <g opacity="0.85">
                  {/* Spine representation */}
                  <path
                    d="M 230,130 Q 300,190 350,180 T 520,200 T 630,230"
                    fill="none"
                    stroke="#AC8B59"
                    strokeWidth="4"
                    strokeDasharray="4 2"
                  />
                  {/* Withers dorsal spinous peaks */}
                  <path d="M 330,185 L 340,160 L 350,180" stroke="#AC8B59" strokeWidth="2" fill="none" />
                  <path d="M 350,180 L 360,155 L 370,182" stroke="#AC8B59" strokeWidth="2" fill="none" />
                  {/* Ribcage arch */}
                  <ellipse cx="440" cy="270" rx="90" ry="70" fill="none" stroke="#AC8B59" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                  {/* Scapula blade */}
                  <polygon points="260,250 310,180 340,240 290,290" fill="#AC8B59" fillOpacity="0.15" stroke="#AC8B59" strokeWidth="1.5" />
                </g>
              )}

              {(activeSystem === 'muscular' || activeSystem === 'all') && (
                <g opacity="0.8">
                  {/* Trapezius muscle shape */}
                  <polygon points="260,180 340,170 330,240 270,220" fill="#8B4513" fillOpacity="0.25" stroke="#D27D2D" strokeWidth="1" />
                  {/* Longissimus dorsi band */}
                  <path d="M 350,190 Q 450,195 560,210" stroke="#D27D2D" strokeWidth="10" strokeLinecap="round" opacity="0.3" fill="none" />
                  {/* Gluteus mass */}
                  <circle cx="590" cy="240" r="45" fill="#D27D2D" fillOpacity="0.2" stroke="#D27D2D" strokeWidth="1" />
                  {/* Abdominal sling */}
                  <path d="M 370,410 Q 470,440 560,420" stroke="#D27D2D" strokeWidth="4" fill="none" strokeDasharray="2 2" />
                </g>
              )}

              {(activeSystem === 'saddle' || activeSystem === 'all') && (
                <g opacity="0.9">
                  {/* Saddle seating area */}
                  <path
                    d="M 340,185 Q 390,230 460,195 L 470,205 Q 390,245 330,195 Z"
                    fill="#AC8B59"
                    fillOpacity="0.4"
                    stroke="#F3EFE6"
                    strokeWidth="1.5"
                  />
                  {/* Girth line */}
                  <line x1="370" y1="230" x2="350" y2="400" stroke="#AC8B59" strokeWidth="2.5" strokeDasharray="4 2" />
                  {/* Gullet clearance zone */}
                  <rect x="340" y="175" width="130" height="15" fill="none" stroke="#00FFCC" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                </g>
              )}

              {(activeSystem === 'shoulder' || activeSystem === 'all') && (
                <g opacity="0.9">
                  {/* Scapula rotation arc */}
                  <path
                    d="M 260,230 A 60 60 0 0 1 320,180"
                    fill="none"
                    stroke="#FFCC00"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  {/* Safety clearance zone */}
                  <circle cx="310" cy="210" r="30" fill="none" stroke="#FFCC00" strokeWidth="1.5" opacity="0.5" />
                </g>
              )}
            </svg>

            {/* Clickable Hotspot Markers */}
            <div className="absolute inset-0 pointer-events-none">
              {filteredHotspots.map((hotspot) => {
                const isSelected = selectedHotspot?.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot)}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-200 group ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-125 hover:z-20'
                    }`}
                    title={hotspot.name}
                    aria-label={hotspot.name}
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-[#AC8B59]' : 'bg-[#E9E6DF]/50 group-hover:bg-[#AC8B59]'
                      }`} />
                      <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 ${
                        isSelected
                          ? 'bg-[#AC8B59] border-[#F3EFE6]'
                          : 'bg-[#252B2D] border-[#AC8B59] group-hover:bg-[#AC8B59]'
                      }`} />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Status Tag on canvas */}
            <div className="absolute bottom-3 left-3 bg-[#10272B]/90 border border-[#37463C] px-3 py-1.5 text-[11px] font-mono text-[#AC8B59]">
              Layer: <span className="uppercase text-[#F3EFE6]">{activeSystem}</span> • {filteredHotspots.length} Anatomical Targets
            </div>

          </div>

          {/* Hotspot Inspector Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#252B2D] border border-[#37463C] p-6 shadow-md min-h-[460px] flex flex-col justify-between">
            {selectedHotspot ? (
              <div className="space-y-4">
                <div className="border-b border-[#37463C] pb-3">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[#AC8B59] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#AC8B59]" />
                    <span>{selectedHotspot.system} System</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFE6] font-normal mt-1 leading-snug">
                    {selectedHotspot.name}
                  </h3>
                  <p className="text-xs text-[#E9E6DF]/80 mt-1 italic">
                    {selectedHotspot.shortDescription}
                  </p>
                </div>

                {/* Detailed Biomechanical Function */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#AC8B59] uppercase tracking-wider block">
                    Biomechanical Function
                  </span>
                  <p className="text-xs text-[#E9E6DF]/85 leading-relaxed font-sans">
                    {selectedHotspot.detailedFunction}
                  </p>
                </div>

                {/* Saddle Fit Relevance */}
                <div className="bg-[#1C2426] border-l-2 border-[#AC8B59] p-3 space-y-1">
                  <span className="text-[10px] font-mono text-[#AC8B59] uppercase tracking-wider flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#AC8B59]" />
                    <span>Critical Saddle & Rider Relevance</span>
                  </span>
                  <p className="text-xs text-[#F3EFE6] leading-relaxed">
                    {selectedHotspot.saddleRelevance}
                  </p>
                </div>

                {/* Linked Full Anatomy Guide Opener */}
                {linkedGuide && (
                  <div className="pt-2 border-t border-[#37463C]">
                    <div className="text-[11px] text-[#E9E6DF]/70 mb-2">
                      Deep Dive Chapter: <strong className="text-[#F3EFE6] font-normal">{linkedGuide.title}</strong> ({linkedGuide.readingTimeMinutes} min read)
                    </div>
                    <button
                      onClick={() => onOpenGuide(linkedGuide)}
                      className="w-full py-2.5 bg-[#AC8B59] text-[#10272B] font-semibold text-xs uppercase tracking-wider hover:bg-[#F3EFE6] transition-colors flex items-center justify-center space-x-2"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Complete Anatomy Chapter</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 px-4 space-y-3">
                <Info className="w-8 h-8 text-[#AC8B59] stroke-[1.5]" />
                <h4 className="font-serif text-lg text-[#F3EFE6]">Select Any Hotspot</h4>
                <p className="text-xs text-[#E9E6DF]/70 max-w-xs">
                  Click on any pulsating marker on the horse anatomy model to inspect its physiological role and tree-fitting impact.
                </p>
              </div>
            )}

            {/* Scientific Citation Footer */}
            <div className="mt-4 pt-3 border-t border-[#37463C]/60 text-[10px] text-[#E9E6DF]/50 font-mono">
              Ground truth references: Clayton (2016), Dyson & Adams (2020), Higgins (2012).
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
