import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function ChordBisectorTheoremAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Question 1 Diagram: Basic Chord Bisector Theorem
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Chord AB
    const angleA = Math.PI * 0.3;
    const angleB = Math.PI * 0.7;
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    
    // Midpoint M of chord AB
    const M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    
    // Line from center O through M (perpendicular bisector)
    // Direction perpendicular to chord AB
    const chordDir = { x: B.x - A.x, y: B.y - A.y };
    const perpDir = { x: -chordDir.y, y: chordDir.x };
    const perpLength = Math.sqrt(perpDir.x * perpDir.x + perpDir.y * perpDir.y);
    const unitPerp = { x: perpDir.x / perpLength, y: perpDir.y / perpLength };
    
    // Extend perpendicular bisector to circle edge
    const extendLength = 100;
    const P1 = { x: M.x + extendLength * unitPerp.x, y: M.y + extendLength * unitPerp.y };
    const P2 = { x: M.x - extendLength * unitPerp.x, y: M.y - extendLength * unitPerp.y };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx - 15} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Chord AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="3" />
        
        {/* Perpendicular bisector */}
        <line x1={P1.x} y1={P1.y} x2={P2.x} y2={P2.y} stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,4" />
        
        {/* Line from center to midpoint */}
        <line x1={cx} y1={cy} x2={M.x} y2={M.y} stroke="#10B981" strokeWidth="3" />
        
        {/* Points */}
        <circle cx={A.x} cy={A.y} r={3} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={3} fill="#DC2626" />
        <circle cx={M.x} cy={M.y} r={3} fill="#8B5CF6" />
        
        <text x={A.x + 8} y={A.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x - 15} y={B.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={M.x + 8} y={M.y + 15} fill="#8B5CF6" fontSize="14" fontWeight="bold">M</text>
        
        {/* Right angle indicator */}
        <path d={`M ${M.x - 8} ${M.y + 8} L ${M.x - 8} ${M.y} L ${M.x} ${M.y}`} 
              fill="none" stroke="#10B981" strokeWidth="2" />
        
        {/* Labels */}
        <text x={(A.x + M.x)/2 - 5} y={(A.y + M.y)/2 + 15} fill="#8B5CF6" fontSize="11">AM</text>
        <text x={(B.x + M.x)/2 + 5} y={(B.y + M.y)/2 + 15} fill="#8B5CF6" fontSize="11">BM</text>
        <text x={(cx + M.x)/2 - 15} y={(cy + M.y)/2} fill="#10B981" fontSize="11">OM ⊥ AB</text>
        <text x={cx - 50} y={cy + 110} fill="#64748B" fontSize="10">M is midpoint of AB</text>
      </svg>
    );
  };

  // Question 2 Diagram: Multiple Chords and Perpendicular Bisectors
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 70;
    
    // Chord PQ
    const P = { x: cx + r * Math.cos(Math.PI * 0.2), y: cy + r * Math.sin(Math.PI * 0.2) };
    const Q = { x: cx + r * Math.cos(Math.PI * 0.6), y: cy + r * Math.sin(Math.PI * 0.6) };
    const M1 = { x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 };
    
    // Chord RS
    const R = { x: cx + r * Math.cos(Math.PI * 1.0), y: cy + r * Math.sin(Math.PI * 1.0) };
    const S = { x: cx + r * Math.cos(Math.PI * 1.4), y: cy + r * Math.sin(Math.PI * 1.4) };
    const M2 = { x: (R.x + S.x) / 2, y: (R.y + S.y) / 2 };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Chords */}
        <line x1={P.x} y1={P.y} x2={Q.x} y2={Q.y} stroke="#DC2626" strokeWidth="2" />
        <line x1={R.x} y1={R.y} x2={S.x} y2={S.y} stroke="#10B981" strokeWidth="2" />
        
        {/* Lines from center to midpoints */}
        <line x1={cx} y1={cy} x2={M1.x} y2={M1.y} stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={M2.x} y2={M2.y} stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3,3" />
        
        {/* Points */}
        <circle cx={P.x} cy={P.y} r={2} fill="#DC2626" />
        <circle cx={Q.x} cy={Q.y} r={2} fill="#DC2626" />
        <circle cx={R.x} cy={R.y} r={2} fill="#10B981" />
        <circle cx={S.x} cy={S.y} r={2} fill="#10B981" />
        <circle cx={M1.x} cy={M1.y} r={2} fill="#3B82F6" />
        <circle cx={M2.x} cy={M2.y} r={2} fill="#8B5CF6" />
        
        <text x={P.x + 5} y={P.y - 5} fill="#DC2626" fontSize="12" fontWeight="bold">P</text>
        <text x={Q.x - 15} y={Q.y - 5} fill="#DC2626" fontSize="12" fontWeight="bold">Q</text>
        <text x={R.x - 15} y={R.y + 15} fill="#10B981" fontSize="12" fontWeight="bold">R</text>
        <text x={S.x + 5} y={S.y + 15} fill="#10B981" fontSize="12" fontWeight="bold">S</text>
        <text x={M1.x + 5} y={M1.y - 5} fill="#3B82F6" fontSize="11">M₁</text>
        <text x={M2.x - 15} y={M2.y + 15} fill="#8B5CF6" fontSize="11">M₂</text>
        
        {/* Distance labels */}
        <text x={P.x + 15} y={P.y + 10} fill="#DC2626" fontSize="10">PQ = 8cm</text>
        <text x={R.x - 30} y={R.y - 10} fill="#10B981" fontSize="10">RS = 6cm</text>
        <text x={cx + 20} y={cy + 20} fill="#3B82F6" fontSize="10">OM₁ = ?</text>
        <text x={cx - 35} y={cy - 15} fill="#8B5CF6" fontSize="10">OM₂ = ?</text>
        
        <text x={cx - 60} y={cy + 90} fill="#64748B" fontSize="9">Given: Circle radius = 5cm</text>
      </svg>
    );
  };

  // Question 3 Diagram: Circle Construction from Three Points
  const Question3Diagram = () => {
    const cx = 150, cy = 150;
    
    // Three points not on same line
    const A = { x: 100, y: 120 };
    const B = { x: 200, y: 110 };
    const C = { x: 160, y: 190 };
    
    // Perpendicular bisectors (construction lines)
    const midAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    const midBC = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
    
    // Perpendicular bisector of AB (vertical-ish)
    const dirAB = { x: B.x - A.x, y: B.y - A.y };
    const perpAB = { x: -dirAB.y, y: dirAB.x };
    const len = 60;
    const bisectorAB1 = { x: midAB.x + len, y: midAB.y };
    const bisectorAB2 = { x: midAB.x - len, y: midAB.y };
    
    // Perpendicular bisector of BC
    const dirBC = { x: C.x - B.x, y: C.y - B.y };
    const perpBC = { x: -dirBC.y, y: dirBC.x };
    const normBC = Math.sqrt(perpBC.x * perpBC.x + perpBC.y * perpBC.y);
    const unitBC = { x: perpBC.x / normBC, y: perpBC.y / normBC };
    const bisectorBC1 = { x: midBC.x + len * unitBC.x, y: midBC.y + len * unitBC.y };
    const bisectorBC2 = { x: midBC.x - len * unitBC.x, y: midBC.y - len * unitBC.y };
    
    // Circle through the three points (approximate)
    const r = 45;
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle through three points */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="2,2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="12" fontWeight="bold">O</text>
        
        {/* Three given points */}
        <circle cx={A.x} cy={A.y} r={3} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={3} fill="#DC2626" />
        <circle cx={C.x} cy={C.y} r={3} fill="#DC2626" />
        
        <text x={A.x - 15} y={A.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 5} y={B.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x + 5} y={C.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">C</text>
        
        {/* Chords */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#3B82F6" strokeWidth="2" />
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#10B981" strokeWidth="2" />
        <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke="#8B5CF6" strokeWidth="2" />
        
        {/* Perpendicular bisectors (construction lines) */}
        <line x1={bisectorAB1.x} y1={bisectorAB1.y} x2={bisectorAB2.x} y2={bisectorAB2.y} 
              stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,3" />
        <line x1={bisectorBC1.x} y1={bisectorBC1.y} x2={bisectorBC2.x} y2={bisectorBC2.y} 
              stroke="#EF4444" strokeWidth="1" strokeDasharray="3,3" />
        
        {/* Midpoints */}
        <circle cx={midAB.x} cy={midAB.y} r={2} fill="#F59E0B" />
        <circle cx={midBC.x} cy={midBC.y} r={2} fill="#EF4444" />
        
        <text x={midAB.x + 5} y={midAB.y - 5} fill="#F59E0B" fontSize="10">M₁</text>
        <text x={midBC.x + 5} y={midBC.y + 15} fill="#EF4444" fontSize="10">M₂</text>
        
        {/* Labels */}
        <text x={cx - 80} y={cy + 80} fill="#64748B" fontSize="9">Perpendicular bisectors</text>
        <text x={cx - 70} y={cy + 95} fill="#64748B" fontSize="9">intersect at center O</text>
        
        {/* Right angle indicators at midpoints */}
        <path d={`M ${midAB.x - 5} ${midAB.y + 5} L ${midAB.x - 5} ${midAB.y - 5} L ${midAB.x + 5} ${midAB.y - 5}`} 
              fill="none" stroke="#F59E0B" strokeWidth="1" />
        <path d={`M ${midBC.x - 5} ${midBC.y + 5} L ${midBC.x - 5} ${midBC.y - 5} L ${midBC.x + 5} ${midBC.y - 5}`} 
              fill="none" stroke="#EF4444" strokeWidth="1" />
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of the chord bisector theorem with these challenging problems
          </p>
        </div>

        <div className="bg-orange-50/60 border border-orange-200 dark:bg-orange-900/40 dark:border-orange-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📐 Chord Bisector Theorem Assessment Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the chord bisector theorem: if a line from the center bisects a chord, then it is perpendicular to that chord</li>
            <li>• Use the converse: if a line from the center is perpendicular to a chord, then it bisects that chord</li>
            <li>• Remember: the perpendicular bisector of any chord passes through the center of the circle</li>
            <li>• Show clear geometric reasoning and calculations using the theorem properties</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Basic Chord Bisector Application
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                In a circle with center O, chord AB is bisected at point M. A line is drawn from the center O through M.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>If AB = 12 cm and the radius of the circle is 10 cm, calculate the distance OM</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 2: Multiple Chords and Distances
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question2Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A circle has center O and radius 5 cm. Two chords PQ and RS have lengths 8 cm and 6 cm respectively. M₁ and M₂ are the midpoints of the chords.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Calculate the distance OM₁ from the center to the midpoint of chord PQ</li>
                <li>Calculate the distance OM₂ from the center to the midpoint of chord RS</li>
                <li>Which chord is closer to the center and why?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-chord-bisector-theorem-assessment"
      slideTitle="Chord Bisector Theorem Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="chord-bisector-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 