import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function EqualChordsTheoremAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  // Question 1 Diagram: Basic Equal Chords Theorem
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Two equal chords AB and CD
    const angleA = Math.PI * 0.2;
    const angleB = Math.PI * 0.5;
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    
    const angleC = Math.PI * 1.0;
    const angleD = Math.PI * 1.3;
    const C = { x: cx + r * Math.cos(angleC), y: cy + r * Math.sin(angleC) };
    const D = { x: cx + r * Math.cos(angleD), y: cy + r * Math.sin(angleD) };
    
    // Midpoints
    const M1 = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    const M2 = { x: (C.x + D.x) / 2, y: (C.y + D.y) / 2 };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx - 15} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Equal chords */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="3" />
        <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="#3B82F6" strokeWidth="3" />
        
        {/* Perpendicular distances from center to chords */}
        <line x1={cx} y1={cy} x2={M1.x} y2={M1.y} stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={M2.x} y2={M2.y} stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
        
        {/* Points */}
        <circle cx={A.x} cy={A.y} r={3} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={3} fill="#DC2626" />
        <circle cx={C.x} cy={C.y} r={3} fill="#3B82F6" />
        <circle cx={D.x} cy={D.y} r={3} fill="#3B82F6" />
        <circle cx={M1.x} cy={M1.y} r={2} fill="#10B981" />
        <circle cx={M2.x} cy={M2.y} r={2} fill="#10B981" />
        
        <text x={A.x + 5} y={A.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x - 15} y={B.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x - 15} y={C.y + 15} fill="#3B82F6" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x + 5} y={D.y + 15} fill="#3B82F6" fontSize="14" fontWeight="bold">D</text>
        <text x={M1.x + 5} y={M1.y + 15} fill="#10B981" fontSize="11">M₁</text>
        <text x={M2.x - 15} y={M2.y - 5} fill="#10B981" fontSize="11">M₂</text>
        
        {/* Equal length indicators */}
        <path d={`M ${(A.x + B.x)/2 - 5} ${(A.y + B.y)/2 + 10} L ${(A.x + B.x)/2 + 5} ${(A.y + B.y)/2 - 10}`} 
              stroke="#8B5CF6" strokeWidth="2" />
        <path d={`M ${(C.x + D.x)/2 - 5} ${(C.y + D.y)/2 + 10} L ${(C.x + D.x)/2 + 5} ${(C.y + D.y)/2 - 10}`} 
              stroke="#8B5CF6" strokeWidth="2" />
        
        {/* Labels */}
        <text x={(A.x + B.x)/2 + 10} y={(A.y + B.y)/2 - 5} fill="#DC2626" fontSize="11">AB = 6cm</text>
        <text x={(C.x + D.x)/2 - 35} y={(C.y + D.y)/2 + 25} fill="#3B82F6" fontSize="11">CD = 6cm</text>
        <text x={(cx + M1.x)/2 - 15} y={(cy + M1.y)/2 + 15} fill="#10B981" fontSize="10">OM₁</text>
        <text x={(cx + M2.x)/2 + 5} y={(cy + M2.y)/2 - 5} fill="#10B981" fontSize="10">OM₂</text>
        
        <text x={cx - 60} y={cy + 110} fill="#8B5CF6" fontSize="11">Equal chords ⟹ Equal distances</text>
      </svg>
    );
  };

  // Question 2 Diagram: Hexagon with Equal Chords
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 70;
    
    // Regular hexagon vertices
    const vertices: Array<{x: number; y: number; label: string}> = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6;
      vertices.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        label: String.fromCharCode(65 + i) // A, B, C, D, E, F
      });
    }
    
    // Distance from center to one side
    const midAB = { x: (vertices[0].x + vertices[1].x) / 2, y: (vertices[0].y + vertices[1].y) / 2 };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx - 8} y={cy + 5} fill="#374151" fontSize="12" fontWeight="bold">O</text>
        
        {/* Hexagon sides (chords) */}
        {vertices.map((vertex, i) => {
          const nextVertex = vertices[(i + 1) % 6];
          return (
            <line
              key={i}
              x1={vertex.x}
              y1={vertex.y}
              x2={nextVertex.x}
              y2={nextVertex.y}
              stroke="#3B82F6"
              strokeWidth="2"
            />
          );
        })}
        
        {/* Vertices */}
        {vertices.map((vertex, i) => (
          <g key={i}>
            <circle cx={vertex.x} cy={vertex.y} r={3} fill="#3B82F6" />
            <text 
              x={vertex.x + (vertex.x > cx ? 8 : -15)} 
              y={vertex.y + (vertex.y > cy ? 15 : -5)} 
              fill="#3B82F6" 
              fontSize="14" 
              fontWeight="bold"
            >
              {vertex.label}
            </text>
          </g>
        ))}
        
        {/* Radii to show equal distances */}
        <line x1={cx} y1={cy} x2={vertices[0].x} y2={vertices[0].y} stroke="#DC2626" strokeWidth="1" strokeDasharray="2,2" />
        <line x1={cx} y1={cy} x2={vertices[2].x} y2={vertices[2].y} stroke="#DC2626" strokeWidth="1" strokeDasharray="2,2" />
        <line x1={cx} y1={cy} x2={vertices[4].x} y2={vertices[4].y} stroke="#DC2626" strokeWidth="1" strokeDasharray="2,2" />
        
        {/* Distance from center to one side */}
        <line x1={cx} y1={cy} x2={midAB.x} y2={midAB.y} stroke="#10B981" strokeWidth="2" />
        <circle cx={midAB.x} cy={midAB.y} r={2} fill="#10B981" />
        
        <text x={cx - 50} y={cy + 90} fill="#3B82F6" fontSize="10">Regular hexagon</text>
        <text x={cx - 60} y={cy + 105} fill="#10B981" fontSize="10">All sides equal ⟹ All equidistant</text>
      </svg>
    );
  };

  // Question 3 Diagram: Circle with Parallel Chords
  const Question3Diagram = () => {
    const cx = 150, cy = 150, r = 75;
    
    // Three parallel chords at different distances
    const chord1Y = cy - 30;
    const chord2Y = cy;
    const chord3Y = cy + 40;
    
    // Calculate chord endpoints using circle equation
    const getChordEndpoints = (y: number) => {
      const dy = y - cy;
      const dx = Math.sqrt(r * r - dy * dy);
      return {
        left: { x: cx - dx, y: y },
        right: { x: cx + dx, y: y }
      };
    };
    
    const chord1 = getChordEndpoints(chord1Y);
    const chord2 = getChordEndpoints(chord2Y);
    const chord3 = getChordEndpoints(chord3Y);
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy + 5} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Parallel chords */}
        <line x1={chord1.left.x} y1={chord1.left.y} x2={chord1.right.x} y2={chord1.right.y} stroke="#DC2626" strokeWidth="3" />
        <line x1={chord2.left.x} y1={chord2.left.y} x2={chord2.right.x} y2={chord2.right.y} stroke="#3B82F6" strokeWidth="3" />
        <line x1={chord3.left.x} y1={chord3.left.y} x2={chord3.right.x} y2={chord3.right.y} stroke="#10B981" strokeWidth="3" />
        
        {/* Perpendicular distances */}
        <line x1={cx} y1={cy} x2={cx} y2={chord1Y} stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={cx} y2={chord3Y} stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
        
        {/* Distance markers */}
        <circle cx={cx} cy={chord1Y} r={2} fill="#8B5CF6" />
        <circle cx={cx} cy={chord3Y} r={2} fill="#F59E0B" />
        
        {/* Chord endpoints */}
        <circle cx={chord1.left.x} cy={chord1.left.y} r={2} fill="#DC2626" />
        <circle cx={chord1.right.x} cy={chord1.right.y} r={2} fill="#DC2626" />
        <circle cx={chord2.left.x} cy={chord2.left.y} r={2} fill="#3B82F6" />
        <circle cx={chord2.right.x} cy={chord2.right.y} r={2} fill="#3B82F6" />
        <circle cx={chord3.left.x} cy={chord3.left.y} r={2} fill="#10B981" />
        <circle cx={chord3.right.x} cy={chord3.right.y} r={2} fill="#10B981" />
        
        {/* Labels */}
        <text x={chord1.left.x - 15} y={chord1.left.y - 5} fill="#DC2626" fontSize="12">P</text>
        <text x={chord1.right.x + 5} y={chord1.right.y - 5} fill="#DC2626" fontSize="12">Q</text>
        <text x={chord2.left.x - 15} y={chord2.left.y + 15} fill="#3B82F6" fontSize="12">R</text>
        <text x={chord2.right.x + 5} y={chord2.right.y + 15} fill="#3B82F6" fontSize="12">S</text>
        <text x={chord3.left.x - 15} y={chord3.left.y + 15} fill="#10B981" fontSize="12">T</text>
        <text x={chord3.right.x + 5} y={chord3.right.y + 15} fill="#10B981" fontSize="12">U</text>
        
        {/* Chord length labels */}
        <text x={chord1.left.x + 20} y={chord1Y - 8} fill="#DC2626" fontSize="10">PQ = ?</text>
        <text x={chord2.left.x + 20} y={chord2Y + 12} fill="#3B82F6" fontSize="10">RS = 12cm</text>
        <text x={chord3.left.x + 15} y={chord3Y + 12} fill="#10B981" fontSize="10">TU = ?</text>
        
        {/* Distance labels */}
        <text x={cx + 15} y={(cy + chord1Y)/2} fill="#8B5CF6" fontSize="10">3cm</text>
        <text x={cx + 15} y={(cy + chord3Y)/2} fill="#F59E0B" fontSize="10">4cm</text>
        
        <text x={cx - 80} y={cy + 105} fill="#64748B" fontSize="9">Parallel chords in same circle</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of the equal chords theorem with these challenging problems
          </p>
        </div>

        <div className="bg-teal-50/60 border border-teal-200 dark:bg-teal-900/40 dark:border-teal-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📐 Equal Chords Theorem Assessment Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the equal chords theorem: equal chords in the same circle are equidistant from the center</li>
            <li>• Use the converse: chords equidistant from the center are equal in length</li>
            <li>• Remember the relationship: for chord length L and distance d from center, d² + (L/2)² = r²</li>
            <li>• Show clear geometric reasoning and calculations using the theorem properties</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Basic Equal Chords Application
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                In a circle with center O, two chords AB and CD are both 6 cm long. M₁ and M₂ are the midpoints of the chords respectively.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4"> 
                <li>If the circle has radius 5 cm, calculate the distance from the center to each chord</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 2: Regular Hexagon Inscribed in Circle
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question2Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A regular hexagon ABCDEF is inscribed in a circle with center O and radius 8 cm. All sides of the hexagon are chords of the circle.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Calculate the length of each side using the equal chords theorem</li>
                <li>Find the distance from the center O to each side of the hexagon</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 3: Parallel Chords of Different Lengths
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question3Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                In a circle with radius 6 cm, three parallel chords PQ, RS, and TU are drawn. RS passes through the center, PQ is 3 cm from the center, and TU is 4 cm from the center.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Find the length of chord PQ using the equal chords theorem relationship</li>
                <li>Calculate the length of chord TU</li>
                <li>Rank the chords from longest to shortest and explain the relationship between chord length and distance from center</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-equal-chords-theorem-assessment"
      slideTitle="Equal Chords Theorem Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="equal-chords-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 