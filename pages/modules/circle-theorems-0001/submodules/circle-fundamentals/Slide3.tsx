import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function CircleFundamentalsAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Question 1 Diagram: Arc vs Segment
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    const angleA = -Math.PI/3; // 120° from top
    const angleB = Math.PI/3;
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        {/* Points A and B */}
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <text x={A.x - 15} y={A.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 10} y={B.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        {/* Radii OA and OB */}
        <line x1={cx} y1={cy} x2={A.x} y2={A.y} stroke="#64748B" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="#64748B" strokeWidth="1.5" strokeDasharray="3,3" />
        {/* Chord AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#3B82F6" strokeWidth="2" />
        {/* Central angle arc */}
        <path d={`M ${cx + 25 * Math.cos(angleA)} ${cy + 25 * Math.sin(angleA)} A 25 25 0 0 1 ${cx + 25 * Math.cos(angleB)} ${cy + 25 * Math.sin(angleB)}`} 
              fill="none" stroke="#8B5CF6" strokeWidth="2" />
        <text x={cx + 35} y={cy + 5} fill="#8B5CF6" fontSize="12" fontWeight="bold">120°</text>
        {/* Minor arc AB */}
        <path d={`M ${A.x} ${A.y} A ${r} ${r} 0 0 1 ${B.x} ${B.y}`} 
              fill="none" stroke="#EF4444" strokeWidth="3" />
        <text x={cx + 55} y={cy - 60} fill="#EF4444" fontSize="12" fontWeight="bold">Minor Arc</text>
      </svg>
    );
  };

  // Question 2 Diagram: Central Angle Ratios  
  const Question2Diagram = () => {
    const cx = 120, cy = 120, r = 70;
    const angleStart = -Math.PI/2;
    const angleEnd = angleStart + Math.PI/3; // 60°
    const startX = cx + r * Math.cos(angleStart);
    const startY = cy + r * Math.sin(angleStart);
    const endX = cx + r * Math.cos(angleEnd);
    const endY = cy + r * Math.sin(angleEnd);
    
    return (
      <svg width="240" height="240" viewBox="0 0 240 240" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Sector fill */}
        <path d={`M ${cx} ${cy} L ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY} Z`} 
              fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
        {/* Center */}        
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy + 5} fill="#374151" fontSize="12" fontWeight="bold">O</text>
        {/* Angle marking */}
        <path d={`M ${cx + 20 * Math.cos(angleStart)} ${cy + 20 * Math.sin(angleStart)} A 20 20 0 0 1 ${cx + 20 * Math.cos(angleEnd)} ${cy + 20 * Math.sin(angleEnd)}`} 
              fill="none" stroke="#8B5CF6" strokeWidth="2" />
        <text x={cx + 25} y={cy - 15} fill="#8B5CF6" fontSize="11" fontWeight="bold">60°</text>
        {/* Radius label */}
        <text x={cx - 25} y={cy - 35} fill="#64748B" fontSize="11">r = 8 cm</text>
      </svg>
    );
  };

  // Question 3 Diagram: Subtended Angle Properties
  const Question3Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    const angleP = -Math.PI/4;
    const angleQ = Math.PI/4;
    const angleR = 3*Math.PI/4;
    const P = { x: cx + r * Math.cos(angleP), y: cy + r * Math.sin(angleP) };
    const Q = { x: cx + r * Math.cos(angleQ), y: cy + r * Math.sin(angleQ) };
    const R = { x: cx + r * Math.cos(angleR), y: cy + r * Math.sin(angleR) };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy + 5} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        {/* Points P, Q, R */}
        <circle cx={P.x} cy={P.y} r={4} fill="#DC2626" />
        <circle cx={Q.x} cy={Q.y} r={4} fill="#DC2626" />
        <circle cx={R.x} cy={R.y} r={4} fill="#3B82F6" />
        <text x={P.x + 10} y={P.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">P</text>
        <text x={Q.x + 10} y={Q.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">Q</text>
        <text x={R.x - 20} y={R.y - 10} fill="#3B82F6" fontSize="14" fontWeight="bold">R</text>
        {/* Arc PQ */}
        <path d={`M ${P.x} ${P.y} A ${r} ${r} 0 0 1 ${Q.x} ${Q.y}`} 
              fill="none" stroke="#EF4444" strokeWidth="4" />
        {/* Central angle at O */}
        <line x1={cx} y1={cy} x2={P.x} y2={P.y} stroke="#8B5CF6" strokeWidth="1.5" />
        <line x1={cx} y1={cy} x2={Q.x} y2={Q.y} stroke="#8B5CF6" strokeWidth="1.5" />
        {/* Inscribed angle at R */}
        <line x1={R.x} y1={R.y} x2={P.x} y2={P.y} stroke="#3B82F6" strokeWidth="1.5" />
        <line x1={R.x} y1={R.y} x2={Q.x} y2={Q.y} stroke="#3B82F6" strokeWidth="1.5" />
        {/* Angle labels */}
        <text x={cx + 15} y={cy + 20} fill="#8B5CF6" fontSize="12" fontWeight="bold">80°</text>
        <text x={R.x + 20} y={R.y + 15} fill="#3B82F6" fontSize="12" fontWeight="bold">?</text>
      </svg>
    );
  };

  // Question 4 Diagram: Arc Segment Calculation
  const Question4Diagram = () => {
    const cx = 120, cy = 120, r = 85;
    const distance = 5 * (85/13); // Scale the 5cm to our coordinate system
    const chordY = cy + distance;
    const halfChord = 12 * (85/13); // Half of 24cm chord scaled (12cm each side)
    const chordStart = { x: cx - halfChord, y: chordY };
    const chordEnd = { x: cx + halfChord, y: chordY };
    
    return (
      <svg width="240" height="240" viewBox="0 0 240 240" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        {/* Chord */}
        <line x1={chordStart.x} y1={chordStart.y} x2={chordEnd.x} y2={chordEnd.y} 
              stroke="#3B82F6" strokeWidth="3" />
        {/* Distance from center to chord */}
        <line x1={cx} y1={cy} x2={cx} y2={chordY} 
              stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" />
        <text x={cx + 5} y={cy + distance/2} fill="#EF4444" fontSize="11" fontWeight="bold">5 cm</text>
        {/* Chord length label */}
        <text x={cx - 20} y={chordY + 15} fill="#3B82F6" fontSize="11" fontWeight="bold">24 cm</text>
        {/* Right angle marker */}
        <path d={`M ${cx-8} ${chordY} L ${cx-8} ${chordY-8} L ${cx} ${chordY-8}`} 
              fill="none" stroke="#64748B" strokeWidth="1" />
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of segments, arcs, and subtended angles
          </p>
        </div>

   <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mb-8">
  <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Instructions</h2>
  <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
    <ul className="text-gray-700 dark:text-gray-300 space-y-2">
      <li>• Show all your work clearly</li>
      <li>• Draw diagrams where appropriate</li>
      <li>• Label all points, lines, and angles</li>
      <li>• Upload images of your solutions</li>
    </ul>
  </div>
</div>


        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">
            Question 1: Arc vs Segment Identification
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Draw a circle with center O and radius 5 cm. Mark two points A and B on the circle such that the central angle AOB = 120°.
              </p>
              <p className="font-medium">Identify and label:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>(a) the major arc AB</li>
                <li>(b) the minor arc AB</li>
                <li>(c) the chord AB</li>
                <li>(d) the segment formed by chord AB and the minor arc</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">
            Question 2: Central Angle Ratios
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question2Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                In a circle with radius 8 cm, if the central angle is 60°, find the ratio of:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>(a) arc length to radius</li>
                <li>(b) area of sector to area of circle</li>
                <li>(c) area of segment to area of sector</li>
              </ul>
              <p className="mt-4 font-medium">Show all calculations.</p>
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">
            Question 3: Subtended Angle Properties
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question3Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A circle has center O and points P, Q, R on its circumference. If arc PQ subtends an angle of 80° at the center O, what angle does the same arc PQ subtend at point R on the circumference?
              </p>
              <p className="font-medium">Draw the diagram and explain the relationship.</p>
            </div>
          </div>
        </div>

        {/* Question 4 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">
            Question 4: Arc Segment Calculation
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question4Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A chord of length 24 cm is at a distance of 5 cm from the center of a circle.
              </p>
              <p className="font-medium">Calculate:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>(a) the radius of the circle</li>
                <li>(b) the central angle subtended by the chord</li>
                <li>(c) the area of the minor segment formed by the chord</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-circle-fundamentals-assessment"
      slideTitle="Circle Fundamentals Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="circle-fundamentals"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 