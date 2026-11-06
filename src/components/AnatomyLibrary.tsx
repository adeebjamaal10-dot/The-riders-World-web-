import React, { useState, useMemo } from 'react';
import { AnatomyGuide, AnatomyDepartment } from '../types';
import { Layers, BookOpen, Clock, ChevronRight, Search, ShieldCheck } from 'lucide-react';

interface AnatomyLibraryProps {
  guides: AnatomyGuide[];
  onOpenGuide: (guide: AnatomyGuide) => void;
  onOpenExplorer: () => void;
}

export const AnatomyLibrary: React.FC<AnatomyLibraryProps> = ({
  guides,
  onOpenGuide,
  onOpenExplorer
}) => {
  const [selectedDept, setSelectedDept] = useState<AnatomyDepartment | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const departments: (AnatomyDepartment | 'All')[] = [
    'All',
    'Skeletal System',
    'Muscular System',
    'Movement & Biomechanics',
    'Conformation',
    'Horse, Rider & Saddle Interaction'
  ];

  const filteredGuides = useMemo(() => {
    return guides.filter((g) => {
      const matchesDept = selectedDept === 'All' || g.department === selectedDept;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        g.title.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.leadSummary.toLowerCase().includes(q) ||
        g.primaryStructures.some(s => s.toLowerCase().includes(q));
      return matchesDept && matchesSearch;
    });
  }, [guides, selectedDept, searchQuery]);

  return (
    <div className="bg-[#10272B] text-[#F3EFE6] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#37463C] pb-6">
          <div>
            <div className="flex items-center space-x-2 text-[#AC8B59] text-xs font-mono tracking-widest uppercase mb-1">
              <Layers className="w-4 h-4" />
              <span>Departmental Equine Science</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F3EFE6]">
              Equine Anatomy & Biomechanics Compendium ({guides.length} Chapters)
            </h2>
            <p className="text-sm text-[#E9E6DF]/70 max-w-3xl mt-1">
              Fifty peer-reviewed chapters spanning osteology, myology, locomotion physics, structural conformation, and saddle pressure dynamics.
            </p>
          </div>

          <button
            onClick={onOpenExplorer}
            className="px-4 py-2.5 bg-[#AC8B59] text-[#10272B] hover:bg-[#F3EFE6] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center space-x-2 self-start md:self-auto shadow-sm"
          >
            <span>Interactive 3D/2D Explorer</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Department Selector */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#AC8B59]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters by anatomical term, muscle, or bone..."
              className="w-full bg-[#1C2729] border border-[#37463C] text-xs text-[#F3EFE6] pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#AC8B59]"
            />
          </div>

          <div className="flex overflow-x-auto pb-2 gap-2 border-b border-[#37463C]/60 scrollbar-none">
            {departments.map((dept) => {
              const isSelected = selectedDept === dept;
              const count = dept === 'All'
                ? guides.length
                : guides.filter(g => g.department === dept).length;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-[#AC8B59] text-[#10272B] font-bold'
                      : 'bg-[#252B2D] text-[#E9E6DF]/80 hover:text-[#F3EFE6] border border-[#37463C]'
                  }`}
                >
                  <span>{dept}</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-[#1C2729] border border-[#37463C] hover:border-[#AC8B59] p-5 flex flex-col justify-between transition-all duration-300 group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#AC8B59] uppercase tracking-wider">
                  <span>{guide.department}</span>
                  <span className="flex items-center space-x-1 text-[#E9E6DF]/60">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readingTimeMinutes} min</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl text-[#F3EFE6] font-normal group-hover:text-[#AC8B59] transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-[#E9E6DF]/75 font-sans italic line-clamp-1">
                  {guide.subtitle}
                </p>

                <p className="text-xs text-[#E9E6DF]/85 leading-relaxed line-clamp-3">
                  {guide.leadSummary}
                </p>

                {/* Primary Structures Pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {guide.primaryStructures.slice(0, 3).map((struct, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#252B2D] text-[10px] font-mono text-[#E9E6DF]/80 border border-[#37463C]"
                    >
                      {struct}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 mt-4 border-t border-[#37463C]/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#AC8B59]">
                  {guide.academicReferences.length} Academic Citations
                </span>

                <button
                  onClick={() => onOpenGuide(guide)}
                  className="px-3 py-1.5 bg-[#252B2D] hover:bg-[#AC8B59] hover:text-[#10272B] text-xs font-semibold uppercase tracking-wider text-[#F3EFE6] transition-colors flex items-center space-x-1 border border-[#37463C]"
                >
                  <span>Examine Chapter</span>
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
