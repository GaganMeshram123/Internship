import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

const DIAGRAMS = [
  'center',
  'radius',
  'diameter',
  'chord',
  'arc',
  'sector',
  'segment',
] as const;
type DiagramType = typeof DIAGRAMS[number];

export default function CircleFundamentalsSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [activeDiagram, setActiveDiagram] = useState<DiagramType>('center');

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-circle-center-concept',
      conceptId: 'ct-circle-center',
      conceptName: 'Circle Center',
      type: 'learning',
      description: 'Understanding the center point of a circle and its properties'
    },
    {
      id: 'ct-radius-concept',
      conceptId: 'ct-radius',
      conceptName: 'Radius',
      type: 'learning',
      description: 'Understanding radius as the distance from center to circumference'
    },
    {
      id: 'ct-diameter-concept',
      conceptId: 'ct-diameter',
      conceptName: 'Diameter',
      type: 'learning',
      description: 'Understanding diameter as the longest chord passing through center'
    },
    {
      id: 'ct-chord-arc-segment-concept',
      conceptId: 'ct-chord-arc-segment',
      conceptName: 'Chord, Arc, and Segment',
      type: 'learning',
      description: 'Understanding chords, arcs, sectors, and segments in circles'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Accurate SVG positions for all features
  const cx = 150, cy = 150, r = 100;
  // Points for features
  const A = { x: cx + r * Math.cos(-Math.PI / 6), y: cy + r * Math.sin(-Math.PI / 6) }; // 30 deg
  const B = { x: cx - r, y: cy };
  const C = { x: cx + r, y: cy };
  const D = { x: cx + r * Math.cos(Math.PI / 2), y: cy + r * Math.sin(Math.PI / 2) }; // 90 deg
  const E = { x: cx + r * Math.cos(Math.PI / 6), y: cy + r * Math.sin(Math.PI / 6) }; // 150 deg
  const F = { x: cx + r * Math.cos(Math.PI / 3), y: cy + r * Math.sin(Math.PI / 3) }; // 60 deg
  const G = { x: cx + r * Math.cos(Math.PI), y: cy + r * Math.sin(Math.PI) }; // 180 deg
  const H = { x: cx + r * Math.cos(-Math.PI / 3), y: cy + r * Math.sin(-Math.PI / 3) }; // -60 deg
  const I = { x: cx + r * Math.cos(-2 * Math.PI / 3), y: cy + r * Math.sin(-2 * Math.PI / 3) }; // -120 deg
  const J = { x: cx + r * Math.cos(Math.PI / 4), y: cy + r * Math.sin(Math.PI / 4) }; // 45 deg
  const K = { x: cx + r * Math.cos(-Math.PI / 4), y: cy + r * Math.sin(-Math.PI / 4) }; // -45 deg

  const CircleDiagram = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-300 dark:border-slate-600">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Interactive Circle Diagram</h3>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {DIAGRAMS.map((type) => (
          <button
            key={type}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              activeDiagram === type
                ? 'bg-blue-600 text-white border-blue-400 dark:border-blue-700'
                : 'bg-slate-50 text-slate-600 border-slate-300 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-900/30'
            }`}
            onClick={() => setActiveDiagram(type)}
            aria-pressed={activeDiagram === type}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Main Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d1d5db" strokeWidth="2" />
        {/* Center */}
        {activeDiagram === 'center' && (
          <g>
            <circle cx={cx} cy={cy} r={5} fill="#2563eb" className="animate-pulse" />
            <text x={cx + 10} y={cy - 5} fill="#2563eb" fontSize="16" fontWeight="bold">O</text>
          </g>
        )}
        {/* Radius */}
        {activeDiagram === 'radius' && (
          <g>
            <line x1={cx} y1={cy} x2={A.x} y2={A.y} stroke="#2563eb" strokeWidth="3" />
            <circle cx={A.x} cy={A.y} r={4} fill="#2563eb" />
            <circle cx={cx} cy={cy} r={5} fill="#2563eb" />
            <text x={A.x + 5} y={A.y - 5} fill="#2563eb" fontSize="14" fontWeight="bold">A</text>
            <text x={cx + (A.x - cx) / 2 + 10} y={cy + (A.y - cy) / 2 - 10} fill="#2563eb" fontSize="14" fontWeight="bold">r</text>
            <text x={cx + 10} y={cy - 5} fill="#2563eb" fontSize="16" fontWeight="bold">O</text>
          </g>
        )}
        {/* Diameter */}
        {activeDiagram === 'diameter' && (
          <g>
            <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#2563eb" strokeWidth="4" />
            <circle cx={B.x} cy={B.y} r={4} fill="#2563eb" />
            <circle cx={C.x} cy={C.y} r={4} fill="#2563eb" />
            <circle cx={cx} cy={cy} r={5} fill="#2563eb" />
            <text x={B.x - 15} y={B.y + 5} fill="#2563eb" fontSize="14" fontWeight="bold">B</text>
            <text x={C.x + 10} y={C.y + 5} fill="#2563eb" fontSize="14" fontWeight="bold">C</text>
            <text x={cx + 10} y={cy - 5} fill="#2563eb" fontSize="16" fontWeight="bold">O</text>
          </g>
        )}
        {/* Chord */}
        {activeDiagram === 'chord' && (
          <g>
            <line x1={F.x} y1={F.y} x2={I.x} y2={I.y} stroke="#2563eb" strokeWidth="3" />
            <circle cx={F.x} cy={F.y} r={4} fill="#2563eb" />
            <circle cx={I.x} cy={I.y} r={4} fill="#2563eb" />
            <text x={F.x - 10} y={F.y - 10} fill="#2563eb" fontSize="14" fontWeight="bold">D</text>
            <text x={I.x + 5} y={I.y + 15} fill="#2563eb" fontSize="14" fontWeight="bold">E</text>
            <text x={cx + 10} y={cy - 5} fill="#2563eb" fontSize="16" fontWeight="bold">O</text>
            <text x={cx - 30} y={cy + 60} fill="#2563eb" fontSize="12" fontWeight="bold">Chord ≠ Diam</text>
          </g>
        )}
        {/* Arc */}
        {activeDiagram === 'arc' && (
          <g>
            {/* Minor arc FG */}
            <path d={`M ${F.x} ${F.y} A ${r} ${r} 0 0 1 ${G.x} ${G.y}`} fill="none" stroke="#2563eb" strokeWidth="5" />
            <circle cx={F.x} cy={F.y} r={4} fill="#2563eb" />
            <circle cx={G.x} cy={G.y} r={4} fill="#2563eb" />
            <text x={F.x - 10} y={F.y - 10} fill="#2563eb" fontSize="14" fontWeight="bold">F</text>
            <text x={G.x + 5} y={G.y + 15} fill="#2563eb" fontSize="14" fontWeight="bold">G</text>
            <text x={(F.x + G.x) / 2 - 10} y={(F.y + G.y) / 2 - 20} fill="#2563eb" fontSize="13" fontWeight="bold">Arc FG</text>
          </g>
        )}
        {/* Sector */}
        {activeDiagram === 'sector' && (
          <g>
            {/* Area bounded by OF, OG, and arc FG */}
            <path d={`M ${cx} ${cy} L ${F.x} ${F.y} A ${r} ${r} 0 0 1 ${G.x} ${G.y} Z`} fill="rgba(30, 58, 138, 0.3)" fillOpacity="0.3" stroke="#2563eb" strokeWidth="2" />
            <circle cx={F.x} cy={F.y} r={4} fill="#2563eb" />
            <circle cx={G.x} cy={G.y} r={4} fill="#2563eb" />
            <text x={F.x - 10} y={F.y - 10} fill="#2563eb" fontSize="14" fontWeight="bold">F</text>
            <text x={G.x + 5} y={G.y + 15} fill="#2563eb" fontSize="14" fontWeight="bold">G</text>
            <text x={cx + 10} y={cy - 5} fill="#2563eb" fontSize="16" fontWeight="bold">O</text>
            <text x={(F.x + G.x) / 2 - 10} y={(F.y + G.y) / 2 - 20} fill="#2563eb" fontSize="13" fontWeight="bold">Sector OFG</text>
          </g>
        )}
        {/* Segment */}
        {activeDiagram === 'segment' && (
          <g>
            {/* Area between chord FG and arc FG */}
            <path d={`M ${F.x} ${F.y} A ${r} ${r} 0 0 1 ${G.x} ${G.y} L ${F.x} ${F.y}`} fill="rgba(127, 29, 29, 0.3)" fillOpacity="0.4" stroke="#2563eb" strokeWidth="2" />
            <line x1={F.x} y1={F.y} x2={G.x} y2={G.y} stroke="#2563eb" strokeWidth="3" />
            <circle cx={F.x} cy={F.y} r={4} fill="#2563eb" />
            <circle cx={G.x} cy={G.y} r={4} fill="#2563eb" />
            <text x={F.x - 10} y={F.y - 10} fill="#2563eb" fontSize="14" fontWeight="bold">F</text>
            <text x={G.x + 5} y={G.y + 15} fill="#2563eb" fontSize="14" fontWeight="bold">G</text>
            <text x={(F.x + G.x) / 2 - 10} y={(F.y + G.y) / 2 + 20} fill="#2563eb" fontSize="13" fontWeight="bold">Segment FG</text>
          </g>
        )}
      </svg>
    </div>
  );

const slideContent = (
  <div className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-xl p-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left column - Definitions */}
      <div className="space-y-6">
        {/* Center and Radius */}
        <TrackedInteraction
          interaction={slideInteractions[0]}
          onInteractionComplete={handleInteractionComplete}
        >
          <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl shadow-md p-6">
            <div className="text-lg text-slate-800 dark:text-slate-100 leading-relaxed space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3">
                  Center (O):
                </h3>
                <p>
                  The fixed point inside a circle that is equidistant from all
                  points on the circumference.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-200 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3">
                  Radius (r):
                </h3>
                <p>
                  The distance from the center to any point on the circumference.
                  All radii of a circle are equal.
                </p>
                <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-400">
                  Formula: r = constant for all points on circle
                </p>
              </div>
            </div>
          </div>
        </TrackedInteraction>

        {/* Diameter */}
        <TrackedInteraction
  interaction={slideInteractions[2]}
  onInteractionComplete={handleInteractionComplete}
>
  <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl shadow-md p-6">
    <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
      Diameter
    </h2>
    <div className="text-lg text-slate-800 dark:text-slate-100 leading-relaxed space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
        <p>
          A chord that passes through the center of the circle. It is the
          longest possible chord.
        </p>
        <p className="mt-2 font-medium text-slate-800 dark:text-slate-100">
          Diameter = 2 × Radius
        </p>
        <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-400">
          The diameter divides the circle into two equal semicircles.
        </p>
      </div>
    </div>
  </div>
</TrackedInteraction>

      </div>

      {/* Right column - More Definitions and Diagram */}
      <div className="space-y-6">
        {/* Chord, Arc, Sector, Segment */}
        <TrackedInteraction
          interaction={slideInteractions[3]}
          onInteractionComplete={handleInteractionComplete}
        >
          <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
              Circle Parts
            </h2>
            <div className="text-lg text-slate-800 dark:text-slate-100 leading-relaxed space-y-4">
              <div className="bg-slate-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm">
                <h4 className="font-medium text-blue-700 dark:text-blue-300">
                  Chord:
                </h4>
                <p className="text-sm">
                  A line segment connecting two points on the circle.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm">
                <h4 className="font-medium text-blue-700 dark:text-blue-300">
                  Arc:
                </h4>
                <p className="text-sm">
                  A portion of the circumference between two points.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm">
                <h4 className="font-medium text-blue-700 dark:text-blue-300">
                  Sector:
                </h4>
                <p className="text-sm">
                  A region bounded by two radii and an arc.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm">
                <h4 className="font-medium text-blue-700 dark:text-blue-300">
                  Segment:
                </h4>
                <p className="text-sm">
                  A region bounded by a chord and the arc it subtends.
                </p>
              </div>
            </div>
          </div>
        </TrackedInteraction>

        {/* Interactive Diagram */}
        <CircleDiagram />
      </div>
    </div>
  </div>
);

return (
  <SlideComponentWrapper
    slideId="ct-circle-basic-definitions"
    slideTitle="Circle Center and Radius"
    moduleId="circle-theorems-0001"
    submoduleId="circle-fundamentals"
    interactions={localInteractions}
  >
    {slideContent}
  </SlideComponentWrapper>
);
}
