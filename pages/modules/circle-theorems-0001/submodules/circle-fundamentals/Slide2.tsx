import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

const DIAGRAMS = ['tangent', 'secant', 'subtended'] as const;
type DiagramType = typeof DIAGRAMS[number];

export default function CircleFundamentalsSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [activeDiagram, setActiveDiagram] = useState<DiagramType>('tangent');

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-tangent-concept',
      conceptId: 'ct-tangent',
      conceptName: 'Tangent Line',
      type: 'learning',
      description: 'Understanding tangent lines that touch the circle at exactly one point'
    },
    {
      id: 'ct-secant-concept',
      conceptId: 'ct-secant',
      conceptName: 'Secant Line',
      type: 'learning',
      description: 'Understanding secant lines that intersect the circle at two points'
    },
    {
      id: 'ct-subtended-angle-concept',
      conceptId: 'ct-subtended-angle',
      conceptName: 'Subtended Angles',
      type: 'learning',
      description: 'Understanding how arcs subtend angles at the center and circumference'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry setup
  const cx = 175, cy = 175, r = 100;
  const T = { x: cx, y: cy - r };

  const secantSlope = (cy - 40 - (cy + 120)) / (cx + 120 - (cx - 100));
  const secantIntercept = (cy + 120) - secantSlope * (cx - 100);
  function getSecantCircleIntersections() {
    const m = secantSlope;
    const b = secantIntercept;
    const A = 1 + m * m;
    const B = 2 * (m * (b - cy) - cx);
    const C = cx * cx + (b - cy) * (b - cy) - r * r;
    const D = Math.sqrt(B * B - 4 * A * C);
    const x1 = (-B + D) / (2 * A);
    const x2 = (-B - D) / (2 * A);
    const y1 = m * x1 + b;
    const y2 = m * x2 + b;
    return [
      { x: x1, y: y1 },
      { x: x2, y: y2 }
    ];
  }
  const [P, Q] = getSecantCircleIntersections();
  const S1 = { x: cx - 100, y: cy + 120 };
  const S2 = { x: cx + 120, y: cy - 40 };

  const angleA = Math.PI / 4;
  const angleB = Math.PI / 1.2;
  const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
  const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
  const arcRadius = 28;
  let angleDiff = angleB - angleA;
  if (angleDiff < 0) angleDiff += 2 * Math.PI;
  const arcSweep = angleDiff <= Math.PI ? 1 : 0;
  const arcX1 = cx + arcRadius * Math.cos(angleA);
  const arcY1 = cy + arcRadius * Math.sin(angleA);
  const arcX2 = cx + arcRadius * Math.cos(angleB);
  const arcY2 = cy + arcRadius * Math.sin(angleB);
  const midAngle = angleA + (angleDiff <= Math.PI ? angleDiff / 2 : (angleDiff - 2 * Math.PI) / 2);
  const labelRadius = arcRadius + 18;
  const labelX = cx + labelRadius * Math.cos(midAngle);
  const labelY = cy + labelRadius * Math.sin(midAngle);

  // Diagram component
  const SpecialLinesDiagram = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Special Lines in Circles</h3>
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {DIAGRAMS.map((type) => (
        <button
          key={type}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            activeDiagram === type
              ? 'bg-blue-600 text-white border-blue-700'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800'
          }`}
          onClick={() => setActiveDiagram(type)}
        >
          {type === 'tangent' ? 'Tangent' : type === 'secant' ? 'Secant' : 'Subtended Angle'}
        </button>
      ))}
    </div>
    <svg width="350" height="350" viewBox="0 0 350 350" className="mx-auto">
      {/* Main Circle - White in light mode, Dark in dark mode */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={r} 
        className="fill-white dark:fill-gray-900 stroke-blue-600 dark:stroke-blue-300" 
        strokeWidth="2" 
      />
      
      {/* Center point */}
      <circle cx={cx} cy={cy} r={3} className="fill-blue-600 dark:fill-blue-300" />
      <text x={cx + 10} y={cy - 2} className="fill-blue-600 dark:fill-blue-300 text-sm font-bold">O</text>

      {/* Tangent */}
      {activeDiagram === 'tangent' && (
        <g>
          <line x1={T.x - 80} y1={T.y} x2={T.x + 80} y2={T.y} className="stroke-blue-600 dark:stroke-blue-300" strokeWidth="3" />
          <circle cx={T.x} cy={T.y} r={5} className="fill-blue-600 dark:fill-blue-300" />
          <text x={T.x + 10} y={T.y - 10} className="fill-blue-600 dark:fill-blue-300 font-bold text-sm">T</text>
          <line x1={cx} y1={cy} x2={T.x} y2={T.y} className="stroke-blue-600 dark:stroke-blue-300" strokeWidth="2" strokeDasharray="5,5" />
          <text x={cx + (T.x - cx) / 2 + 10} y={cy + (T.y - cy) / 2 - 10} className="fill-gray-600 dark:fill-gray-300 text-xs">r</text>
          <text x={T.x - 60} y={T.y - 10} className="fill-blue-600 dark:fill-blue-300 text-sm">Tangent</text>
        </g>
      )}

      {/* Secant */}
      {activeDiagram === 'secant' && (
        <g>
          <line x1={S1.x} y1={S1.y} x2={S2.x} y2={S2.y} className="stroke-blue-600 dark:stroke-blue-300" strokeWidth="3" />
          <circle cx={P.x} cy={P.y} r={5} className="fill-blue-600 dark:fill-blue-300" />
          <circle cx={Q.x} cy={Q.y} r={5} className="fill-blue-600 dark:fill-blue-300" />
          <text x={P.x - 22} y={P.y + 18} className="fill-blue-600 dark:fill-blue-300 font-bold text-sm">P</text>
          <text x={Q.x + 12} y={Q.y - 12} className="fill-blue-600 dark:fill-blue-300 font-bold text-sm">Q</text>
          <text x={S2.x - 30} y={S2.y - 10} className="fill-blue-600 dark:fill-blue-300 text-sm">Secant</text>
        </g>
      )}

      {/* Subtended Angle */}
      {activeDiagram === 'subtended' && (
        <g>
          <path d={`M ${A.x} ${A.y} A ${r} ${r} 0 0 ${arcSweep} ${B.x} ${B.y}`} className="fill-none stroke-blue-600 dark:stroke-blue-300" strokeWidth="6" />
          <circle cx={A.x} cy={A.y} r={5} className="fill-blue-600 dark:fill-blue-300" />
          <circle cx={B.x} cy={B.y} r={5} className="fill-blue-600 dark:fill-blue-300" />
          <text x={A.x + 5} y={A.y - 10} className="fill-blue-600 dark:fill-blue-300 font-bold text-sm">A</text>
          <text x={B.x + 5} y={B.y + 15} className="fill-blue-600 dark:fill-blue-300 font-bold text-sm">B</text>
          <line x1={cx} y1={cy} x2={A.x} y2={A.y} className="stroke-blue-600 dark:stroke-blue-300" strokeWidth="2" />
          <line x1={cx} y1={cy} x2={B.x} y2={B.y} className="stroke-blue-600 dark:stroke-blue-300" strokeWidth="2" />
          <path d={`M ${arcX1} ${arcY1} A ${arcRadius} ${arcRadius} 0 0 ${arcSweep} ${arcX2} ${arcY2}`} className="fill-none stroke-blue-600 dark:stroke-blue-300" strokeWidth="2" />
          <text x={labelX} y={labelY} className="fill-blue-600 dark:fill-blue-300 text-xs font-bold" alignmentBaseline="middle" textAnchor="middle">∠AOB</text>
        </g>
      )}
    </svg>
  </div>
);


  // Properties Comparison
  const PropertiesComparison = () => (
<div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Differences</h3>
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
          <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Tangent</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>• Touches circle at exactly ONE point</li>
            <li>• Perpendicular to radius at point of contact</li>
            <li>• Does not pass through the circle</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
          <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Secant</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>• Intersects circle at exactly TWO points</li>
            <li>• Passes through the circle</li>
            <li>• Creates chord between intersection points</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
          <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Subtended Angle</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>• Formed by two radii meeting at center</li>
            <li>• Angle at center = arc length ÷ radius</li>
            <li>• Foundation for angle theorems</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Slide layout
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-6">
         <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
  <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Tangent Line</h2>
    <p className="text-slate-700 dark:text-slate-300 mb-4">
      A tangent is a straight line that touches the circle at exactly one point, called the point of tangency.
    </p>
    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Key Properties</h3>
      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
        <li>• Touches circle at exactly one point</li>
        <li>• Perpendicular to radius at contact point</li>
        <li>• Never crosses or passes through circle</li>
        <li>• Forms 90° angle with radius</li>
      </ul>
    </div>
  </div>
</TrackedInteraction>


          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl shadow-md p-6">
               <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Secant Line</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                A secant is a straight line that intersects the circle at exactly two points.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Key Properties</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Intersects circle at two points</li>
                  <li>• Passes through the circle</li>
                  <li>• Creates a chord between intersections</li>
                  <li>• Can become tangent as points approach</li>
                </ul>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <TrackedInteraction interaction={slideInteractions[2]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Subtended Angles</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                An arc subtends an angle at the center when two radii are drawn to the endpoints of the arc.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Central Angle</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Vertex at center of circle</li>
                  <li>• Sides are radii to arc endpoints</li>
                  <li>• Measure equals arc measure</li>
                  <li>• Foundation for circle theorems</li>
                </ul>
              </div>
            </div>
          </TrackedInteraction>

          <SpecialLinesDiagram />
          <PropertiesComparison />
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-circle-special-lines"
      slideTitle="Circle: Special Lines"
      moduleId="circle-theorems-0001"
      submoduleId="circle-fundamentals"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}
