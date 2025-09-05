import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function SameSegmentTheoremAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Question 1 Diagram: Locus Construction Problem
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    const angleA = Math.PI * 0.75; 
    const angleB = Math.PI * 0.25; 
    
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    
    // Show some sample points on the locus
    const angles = [angleA + 0.3, angleA + 0.6, angleA + 0.9, angleA + 1.2];
    const points = angles.map(angle => ({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    }));
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        {/* Chord AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="3" />
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <text x={A.x - 15} y={A.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 10} y={B.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        
        {/* Sample points on locus */}
        {points.map((point, i) => (
          <g key={i}>
            <circle cx={point.x} cy={point.y} r={3} fill="#3B82F6" fillOpacity="0.7" />
            <line x1={point.x} y1={point.y} x2={A.x} y2={A.y} stroke="#3B82F6" strokeWidth="1" strokeDasharray="2,2" />
            <line x1={point.x} y1={point.y} x2={B.x} y2={B.y} stroke="#3B82F6" strokeWidth="1" strokeDasharray="2,2" />
          </g>
        ))}
        
        {/* Highlight the locus arc */}
        <path d={`M ${A.x} ${A.y} A ${r} ${r} 0 0 0 ${B.x} ${B.y}`} 
              fill="none" stroke="#F59E0B" strokeWidth="4" strokeOpacity="0.6" />
        <text x={cx - 30} y={cy - 90} fill="#F59E0B" fontSize="12" fontWeight="bold">Locus Arc</text>
        <text x={cx + 20} y={cy + 100} fill="#3B82F6" fontSize="12" fontWeight="bold">All points subtend 30°</text>
      </svg>
    );
  };

  // Question 2 Diagram: Tangent-Chord Optimization
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    const angleA = Math.PI * 0.8;
    const angleB = Math.PI * 0.3;
    const angleT = Math.PI * 0.05; // Tangent point
    const angleP = Math.PI * 1.1; // Point on major arc
    
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    const T = { x: cx + r * Math.cos(angleT), y: cy + r * Math.sin(angleT) };
    const P = { x: cx + r * Math.cos(angleP), y: cy + r * Math.sin(angleP) };
    
    // Tangent line at T
    const tangentSlope = -Math.cos(angleT) / Math.sin(angleT);
    const tangentLength = 60;
    const tangentDx = tangentLength / Math.sqrt(1 + tangentSlope * tangentSlope);
    const tangentDy = tangentSlope * tangentDx;
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Points */}
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <circle cx={T.x} cy={T.y} r={4} fill="#10B981" />
        <circle cx={P.x} cy={P.y} r={4} fill="#3B82F6" />
        <text x={A.x - 15} y={A.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 10} y={B.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={T.x + 10} y={T.y - 10} fill="#10B981" fontSize="14" fontWeight="bold">T</text>
        <text x={P.x - 15} y={P.y - 10} fill="#3B82F6" fontSize="14" fontWeight="bold">P</text>
        
        {/* Chord AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#64748B" strokeWidth="2" />
        {/* Tangent at T */}
        <line x1={T.x - tangentDx} y1={T.y - tangentDy} x2={T.x + tangentDx} y2={T.y + tangentDy} 
              stroke="#10B981" strokeWidth="3" />
        {/* Lines from T to A and B */}
        <line x1={T.x} y1={T.y} x2={A.x} y2={A.y} stroke="#10B981" strokeWidth="2" />
        <line x1={T.x} y1={T.y} x2={B.x} y2={B.y} stroke="#10B981" strokeWidth="2" />
        {/* Lines from P to A and B */}
        <line x1={P.x} y1={P.y} x2={A.x} y2={A.y} stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1={P.x} y1={P.y} x2={B.x} y2={B.y} stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,3" />
        
        {/* Angle labels */}
        <text x={T.x - 40} y={T.y + 25} fill="#10B981" fontSize="12" fontWeight="bold">∠ATB = ?</text>
        <text x={P.x + 15} y={P.y + 15} fill="#3B82F6" fontSize="12" fontWeight="bold">∠APB = 35°</text>
        <text x={cx + 20} y={cy - 100} fill="#64748B" fontSize="11">Tangent at T</text>
      </svg>
    );
  };

  // Question 3 Diagram: Multiple Intersecting Chords
  const Question3Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Four points on circle
    const angleA = 0;
    const angleB = Math.PI/2;
    const angleC = Math.PI;
    const angleD = 3*Math.PI/2;
    
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    const C = { x: cx + r * Math.cos(angleC), y: cy + r * Math.sin(angleC) };
    const D = { x: cx + r * Math.cos(angleD), y: cy + r * Math.sin(angleD) };
    
    // Point P on arc BC
    const angleP = Math.PI * 0.75;
    const P = { x: cx + r * Math.cos(angleP), y: cy + r * Math.sin(angleP) };
    
    // Intersection point of AC and BD
    const I = { x: cx, y: cy }; // They intersect at center for this configuration
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Points */}
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <circle cx={C.x} cy={C.y} r={4} fill="#DC2626" />
        <circle cx={D.x} cy={D.y} r={4} fill="#DC2626" />
        <circle cx={P.x} cy={P.y} r={4} fill="#3B82F6" />
        <circle cx={I.x} cy={I.y} r={3} fill="#8B5CF6" />
        
        <text x={A.x + 10} y={A.y + 5} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 5} y={B.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x - 20} y={C.y + 5} fill="#DC2626" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x + 5} y={D.y + 20} fill="#DC2626" fontSize="14" fontWeight="bold">D</text>
        <text x={P.x - 15} y={P.y - 10} fill="#3B82F6" fontSize="14" fontWeight="bold">P</text>
        <text x={I.x + 8} y={I.y + 5} fill="#8B5CF6" fontSize="12" fontWeight="bold">I</text>
        
        {/* Chords */}
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#EF4444" strokeWidth="2" />
        <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#10B981" strokeWidth="2" />
        {/* Lines from P */}
        <line x1={P.x} y1={P.y} x2={A.x} y2={A.y} stroke="#3B82F6" strokeWidth="1.5" />
        <line x1={P.x} y1={P.y} x2={I.x} y2={I.y} stroke="#3B82F6" strokeWidth="1.5" />
        
        {/* Angle labels */}
        <text x={P.x + 15} y={P.y + 15} fill="#3B82F6" fontSize="12" fontWeight="bold">∠API = 45°</text>
        <text x={A.x - 30} y={A.y - 15} fill="#DC2626" fontSize="12" fontWeight="bold">∠CAD = 60°</text>
        <text x={I.x + 15} y={I.y - 15} fill="#8B5CF6" fontSize="12" fontWeight="bold">∠AIC = ?</text>
      </svg>
    );
  };

  // Question 4 Diagram: Converse Construction Challenge
  const Question4Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Given chord PQ
    const angleP = Math.PI * 0.7;
    const angleQ = Math.PI * 0.2;
    const P = { x: cx + r * Math.cos(angleP), y: cy + r * Math.sin(angleP) };
    const Q = { x: cx + r * Math.cos(angleQ), y: cy + r * Math.sin(angleQ) };
    
    // External point E
    const E = { x: cx + 120, y: cy + 60 };
    
    // Possible construction lines
    const possiblePoints = [
      { angle: angleP + 0.8, color: "#3B82F6", label: "R₁" },
      { angle: angleP + 1.2, color: "#10B981", label: "R₂" },
      { angle: angleP - 0.8, color: "#8B5CF6", label: "R₃" }
    ];
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Chord PQ */}
        <line x1={P.x} y1={P.y} x2={Q.x} y2={Q.y} stroke="#DC2626" strokeWidth="3" />
        <circle cx={P.x} cy={P.y} r={4} fill="#DC2626" />
        <circle cx={Q.x} cy={Q.y} r={4} fill="#DC2626" />
        <text x={P.x - 15} y={P.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">P</text>
        <text x={Q.x + 10} y={Q.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">Q</text>
        
        {/* External point E */}
        <circle cx={E.x} cy={E.y} r={4} fill="#F59E0B" />
        <text x={E.x + 10} y={E.y + 5} fill="#F59E0B" fontSize="14" fontWeight="bold">E</text>
        
        {/* Possible points R */}
        {possiblePoints.map((point, i) => {
          const R = { x: cx + r * Math.cos(point.angle), y: cy + r * Math.sin(point.angle) };
          return (
            <g key={i}>
              <circle cx={R.x} cy={R.y} r={3} fill={point.color} />
              <text x={R.x + 10} y={R.y - 5} fill={point.color} fontSize="12" fontWeight="bold">{point.label}</text>
              <line x1={E.x} y1={E.y} x2={R.x} y2={R.y} stroke={point.color} strokeWidth="1" strokeDasharray="3,3" />
              <line x1={R.x} y1={R.y} x2={P.x} y2={P.y} stroke={point.color} strokeWidth="1" strokeDasharray="2,2" />
              <line x1={R.x} y1={R.y} x2={Q.x} y2={Q.y} stroke={point.color} strokeWidth="1" strokeDasharray="2,2" />
            </g>
          );
        })}
        
        <text x={E.x - 50} y={E.y + 25} fill="#F59E0B" fontSize="12" fontWeight="bold">∠PEQ = 40°</text>
        <text x={cx - 60} y={cy + 110} fill="#64748B" fontSize="11">Which R gives ∠PRQ = 40°?</text>
      </svg>
    );
  };

  // Question 5 Diagram: Advanced Optimization Problem
  const Question5Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Fixed chord AB
    const angleA = Math.PI * 0.8;
    const angleB = Math.PI * 0.3;
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    
    // Variable point M on major arc
    const angleM = Math.PI * 1.1;
    const M = { x: cx + r * Math.cos(angleM), y: cy + r * Math.sin(angleM) };
    
    // Point N on minor arc
    const angleN = (angleA + angleB) / 2;
    const N = { x: cx + r * Math.cos(angleN), y: cy + r * Math.sin(angleN) };
    
    // Perpendicular from M to AB
    const perpFoot = {
      x: (A.x + B.x) / 2 + 20, // Approximate
      y: (A.y + B.y) / 2 - 15
    };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Chord AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="3" />
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <text x={A.x - 15} y={A.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 10} y={B.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        
        {/* Points M and N */}
        <circle cx={M.x} cy={M.y} r={4} fill="#3B82F6" />
        <circle cx={N.x} cy={N.y} r={4} fill="#10B981" />
        <text x={M.x - 15} y={M.y - 10} fill="#3B82F6" fontSize="14" fontWeight="bold">M</text>
        <text x={N.x + 10} y={N.y + 15} fill="#10B981" fontSize="14" fontWeight="bold">N</text>
        
        {/* Lines */}
        <line x1={M.x} y1={M.y} x2={A.x} y2={A.y} stroke="#3B82F6" strokeWidth="1.5" />
        <line x1={M.x} y1={M.y} x2={B.x} y2={B.y} stroke="#3B82F6" strokeWidth="1.5" />
        <line x1={N.x} y1={N.y} x2={A.x} y2={A.y} stroke="#10B981" strokeWidth="1.5" />
        <line x1={N.x} y1={N.y} x2={B.x} y2={B.y} stroke="#10B981" strokeWidth="1.5" />
        
        {/* Triangle AMB */}
        <path d={`M ${A.x} ${A.y} L ${M.x} ${M.y} L ${B.x} ${B.y}`} 
              fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1" />
        
        {/* Perpendicular from M */}
        <line x1={M.x} y1={M.y} x2={perpFoot.x} y2={perpFoot.y} 
              stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4,4" />
        
        {/* Labels */}
        <text x={M.x + 15} y={M.y + 15} fill="#3B82F6" fontSize="12" fontWeight="bold">∠AMB = α</text>
        <text x={N.x - 35} y={N.y - 15} fill="#10B981" fontSize="12" fontWeight="bold">∠ANB = β</text>
        <text x={cx - 50} y={cy + 110} fill="#64748B" fontSize="11">Find relationship between</text>
        <text x={cx - 50} y={cy + 125} fill="#64748B" fontSize="11">α, β, and area of △AMB</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Challenging problems requiring advanced reasoning and multiple theorem applications
          </p>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 dark:bg-amber-900/40 dark:border-amber-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            ⚠️ Advanced Challenge Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• These problems require multi-step reasoning and proof construction</li>
            <li>• Combine same segment theorem with other circle theorems</li>
            <li>• Show detailed mathematical reasoning and justify each step</li>
            <li>• Include clear diagrams with all construction steps</li>
            <li>• Consider edge cases and alternative approaches</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Locus Construction Challenge
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Given a fixed chord AB, construct the complete locus of all points P such that ∠APB = 30°. 
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Prove that this locus consists of exactly two circular arcs. Draw the arcs.</li>
                <li>Explain why no points inside the circlular arcs can satisfy the condition.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 2: Tangent-Chord Optimization
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question2Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A tangent at point T and a chord AB form a system where point P on the major arc AB subtends ∠APB = 35°.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Determine the position of T that maximizes the area of triangle ATB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-same-segment-theorem-assessment"
      slideTitle="Advanced Same Segment Theorem Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="same-segment-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 