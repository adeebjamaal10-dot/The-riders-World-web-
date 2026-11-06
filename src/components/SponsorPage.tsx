import React from 'react';
import { Award, ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react';
import { SorentaLogo } from './SorentaLogo';

export const SponsorPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 py-16" id="sponsor-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Banner with Official Sorenta Crest */}
        <div className="border border-gray-300 bg-gray-50 p-8 sm:p-12 text-center space-y-5 relative overflow-hidden shadow-xs">
          
          {/* Official Sorenta Crest Display */}
          <div className="flex flex-col items-center justify-center">
            <a
              href="https://sorenta-saddlery.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-2 bg-white border border-gray-300 shadow-sm hover:border-black transition-all mb-3"
              title="Sorenta Saddlery Official Website"
            >
              <SorentaLogo size="xl" className="group-hover:scale-105 transition-transform" />
            </a>
            <span className="text-[10px] font-mono text-amber-800 uppercase tracking-widest font-semibold">
              Official Research Partner & Information Provider
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-black">
            Sorenta Saddlery
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto font-sans leading-relaxed">
            Collaborating on global equine back welfare, ergonomic tree engineering, anatomical dorsal surveys, and the enduring craft of bespoke European saddlery.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <a
              href="https://sorenta-saddlery.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-black text-white font-semibold text-xs uppercase tracking-widest hover:bg-amber-700 transition-all shadow-xs"
            >
              <span>Visit Sorenta Saddlery Atelier</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* The Partnership Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-black">
              A Research Partnership Dedicated to the Modern Horse
            </h2>

            <p className="text-sm text-gray-700 leading-relaxed font-sans">
              The creation of <strong className="text-black font-semibold">The Global Horse Atlas</strong> was born from a fundamental realization: across centuries of breeding for specialized athletic feats—from grand prix dressage and stadium jumping to endurance racing and working ranch stock—the primary limiting factor in equine longevity and soundness remains the mechanical interface between the horse’s back and the rider’s saddle.
            </p>

            <p className="text-sm text-gray-700 leading-relaxed font-sans">
              Serving as our <strong className="text-black font-semibold">Official Research Partner and Information Provider</strong>, <strong className="text-black font-semibold">Sorenta Saddlery</strong> contributes empirical biomechanical data, wither angle surveys, scapular clearance models, and saddle tree geometry to this open-access encyclopedia—allowing riders, veterinarians, farriers, and equine researchers worldwide to freely explore the conformation, movement, and specific saddle requirements of over 240 distinct breeds.
            </p>

            {/* Editorial Independence Note */}
            <div className="bg-gray-50 border-l-2 border-black p-4 text-xs text-gray-700 space-y-1">
              <span className="font-mono text-black uppercase tracking-wider block font-semibold">
                Scientific Standards & Editorial Independence
              </span>
              <p>
                All biometric measurements, veterinary references, and historical breed profiles within this Atlas are curated under strict academic criteria. Sorenta Saddlery collaborates as our esteemed technical research partner and information provider, upholding independent open equine educational standards.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 bg-gray-50 border border-gray-300 p-6 space-y-4">
            <h3 className="font-serif text-lg text-black border-b border-gray-200 pb-2">
              The Four Pillars of Sorenta Tree Design
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black block font-semibold">Anatomical Scapular Clearance</strong>
                  <span className="text-gray-600">
                    Curved headplates and flaring points ensure the backward-rotating scapular cartilage never collides with rigid tree points during stride extension.
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black block font-semibold">Generous Gullet Spinal Channels</strong>
                  <span className="text-gray-600">
                    A minimum 4-finger continuous channel across the entire spine prevents impingement upon the supraspinous ligament throughout axial lateral bend.
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black block font-semibold">100% Pure Virgin Wool Flocking</strong>
                  <span className="text-gray-600">
                    Elastic natural wool fibers absorb concussion and allow qualified master saddlers to adjust and re-flock panels as the horse’s musculature matures.
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black block font-semibold">Thoracic Balance (T5–T18)</strong>
                  <span className="text-gray-600">
                    Ensures rider seat weight remains strictly concentrated over the rib-bearing thoracic region, terminating well forward of the delicate lumbar vertebrae.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <a
                href="https://sorenta-saddlery.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-black hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <span>Explore Sorenta Saddles</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
