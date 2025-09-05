import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function CentralCircumferenceRatioAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Question 1 Diagram: Arc Angle Relationships
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Points on circle
    const angleA = Math.PI * 0.1;
    const angleB = Math.PI * 0.6;
    const angleC = Math.PI * 0.9;
    const angleD = Math.PI * 1.4;
    
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    const C = { x: cx + r * Math.cos(angleC), y: cy + r * Math.sin(angleC) };
    const D = { x: cx + r * Math.cos(angleD), y: cy + r * Math.sin(angleD) };

    // Helper for angle arc
    const angleArc = (x: number, y: number, ax: number, ay: number, bx: number, by: number, radius = 18) => {
      let angle1 = Math.atan2(ay - y, ax - x);
      let angle2 = Math.atan2(by - y, bx - x);
      
      if (angle1 < 0) angle1 += 2 * Math.PI;
      if (angle2 < 0) angle2 += 2 * Math.PI;
      
      let diff = angle2 - angle1;
      if (diff < 0) diff += 2 * Math.PI;
      if (diff > Math.PI) {
        [angle1, angle2] = [angle2, angle1];
        diff = 2 * Math.PI - diff;
      }
      
      const arcX1 = x + radius * Math.cos(angle1);
      const arcY1 = y + radius * Math.sin(angle1);
      const arcX2 = x + radius * Math.cos(angle2);
      const arcY2 = y + radius * Math.sin(angle2);
      
      return `M ${arcX1} ${arcY1} A ${radius} ${radius} 0 0 1 ${arcX2} ${arcY2}`;
    };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Points */}
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <circle cx={C.x} cy={C.y} r={4} fill="#3B82F6" />
        <circle cx={D.x} cy={D.y} r={4} fill="#3B82F6" />
        
        <text x={A.x + 10} y={A.y + 5} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 5} y={B.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x - 20} y={C.y + 5} fill="#3B82F6" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x + 5} y={D.y + 20} fill="#3B82F6" fontSize="14" fontWeight="bold">D</text>
        
        {/* Lines from center */}
        <line x1={cx} y1={cy} x2={A.x} y2={A.y} stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={C.x} y2={C.y} stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={D.x} y2={D.y} stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3" />
        
        {/* Inscribed angles */}
        <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke="#10B981" strokeWidth="2" />
        <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} stroke="#10B981" strokeWidth="2" />
        <line x1={D.x} y1={D.y} x2={A.x} y2={A.y} stroke="#8B5CF6" strokeWidth="2" />
        <line x1={D.x} y1={D.y} x2={B.x} y2={B.y} stroke="#8B5CF6" strokeWidth="2" />
        
        {/* Central angle */}
        <path d={angleArc(cx, cy, A.x, A.y, B.x, B.y, 35)} fill="none" stroke="#DC2626" strokeWidth="3" />
        
        {/* Inscribed angles */}
        <path d={angleArc(C.x, C.y, A.x, A.y, B.x, B.y, 20)} fill="none" stroke="#10B981" strokeWidth="2" />
        <path d={angleArc(D.x, D.y, A.x, A.y, B.x, B.y, 20)} fill="none" stroke="#8B5CF6" strokeWidth="2" />
        
        {/* Labels */}
        <text x={cx + 25} y={cy + 15} fill="#DC2626" fontSize="12" fontWeight="bold">∠AOB = 80°</text>
        <text x={C.x - 35} y={C.y - 25} fill="#10B981" fontSize="12" fontWeight="bold">∠ACB = ?</text>
        <text x={D.x + 15} y={D.y - 15} fill="#8B5CF6" fontSize="12" fontWeight="bold">∠ADB = ?</text>
        
        {/* Arc highlighting */}
        <path d={`M ${A.x} ${A.y} A ${r} ${r} 0 0 1 ${B.x} ${B.y}`} 
              fill="none" stroke="#F59E0B" strokeWidth="4" strokeOpacity="0.6" />
        <text x={cx + 60} y={cy - 60} fill="#F59E0B" fontSize="11" fontWeight="bold">Arc AB</text>
      </svg>
    );
  };

  // Question 2 Diagram: Optimization Problem
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Fixed chord AB
    const angleA = Math.PI * 0.25;
    const angleB = Math.PI * 0.75;
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    
    // Variable point P on major arc
    const angleP = Math.PI * 1.1;
    const P = { x: cx + r * Math.cos(angleP), y: cy + r * Math.sin(angleP) };
    
    // Another point Q on minor arc
    const angleQ = Math.PI * 0.5;
    const Q = { x: cx + r * Math.cos(angleQ), y: cy + r * Math.sin(angleQ) };
    
    // Perpendicular from P to AB
    const midAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    const perpX = P.x - 30;
    const perpY = midAB.y;
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy + 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Chord AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="3" />
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <text x={A.x + 10} y={A.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x - 20} y={B.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        
        {/* Points P and Q */}
        <circle cx={P.x} cy={P.y} r={4} fill="#3B82F6" />
        <circle cx={Q.x} cy={Q.y} r={4} fill="#10B981" />
        <text x={P.x - 15} y={P.y - 10} fill="#3B82F6" fontSize="14" fontWeight="bold">P</text>
        <text x={Q.x + 10} y={Q.y - 10} fill="#10B981" fontSize="14" fontWeight="bold">Q</text>
        
        {/* Triangle APB */}
        <line x1={P.x} y1={P.y} x2={A.x} y2={A.y} stroke="#3B82F6" strokeWidth="2" />
        <line x1={P.x} y1={P.y} x2={B.x} y2={B.y} stroke="#3B82F6" strokeWidth="2" />
        <path d={`M ${A.x} ${A.y} L ${P.x} ${P.y} L ${B.x} ${B.y}`} 
              fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1" />
        
        {/* Triangle AQB */}
        <line x1={Q.x} y1={Q.y} x2={A.x} y2={A.y} stroke="#10B981" strokeWidth="2" />
        <line x1={Q.x} y1={Q.y} x2={B.x} y2={B.y} stroke="#10B981" strokeWidth="2" />
        <path d={`M ${A.x} ${A.y} L ${Q.x} ${Q.y} L ${B.x} ${B.y}`} 
              fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1" />
        
        {/* Height from P to AB */}
        <line x1={P.x} y1={P.y} x2={perpX} y2={perpY} 
              stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4,4" />
        <circle cx={perpX} cy={perpY} r={2} fill="#8B5CF6" />
        <text x={perpX - 15} y={perpY + 15} fill="#8B5CF6" fontSize="12" fontWeight="bold">h₁</text>
        
        {/* Central angle */}
        <line x1={cx} y1={cy} x2={A.x} y2={A.y} stroke="#DC2626" strokeWidth="1" strokeDasharray="2,2" />
        <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="1" strokeDasharray="2,2" />
        
        {/* Labels */}
        <text x={P.x + 15} y={P.y + 15} fill="#3B82F6" fontSize="12" fontWeight="bold">∠APB = α</text>
        <text x={Q.x - 35} y={Q.y + 15} fill="#10B981" fontSize="12" fontWeight="bold">∠AQB = β</text>
        <text x={cx - 40} y={cy + 110} fill="#64748B" fontSize="11">Where is area of △APB maximum?</text>
      </svg>
    );
  };

  // Question 3 Diagram: Complex Construction Problem
  const Question3Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Three points forming a triangle
    const angleA = Math.PI * 0.1;
    const angleB = Math.PI * 0.6;
    const angleC = Math.PI * 1.1;
    
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    const C = { x: cx + r * Math.cos(angleC), y: cy + r * Math.sin(angleC) };
    
    // External point E
    const E = { x: cx + 120, y: cy - 80 };
    
    // Intersection point of lines EA and EB with circle (second intersections)
    const angleA2 = angleA + Math.PI * 0.8;
    const angleB2 = angleB + Math.PI * 0.7;
    const A2 = { x: cx + r * Math.cos(angleA2), y: cy + r * Math.sin(angleA2) };
    const B2 = { x: cx + r * Math.cos(angleB2), y: cy + r * Math.sin(angleB2) };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy + 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Triangle ABC */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="2" />
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#DC2626" strokeWidth="2" />
        <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke="#DC2626" strokeWidth="2" />
        
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <circle cx={C.x} cy={C.y} r={4} fill="#DC2626" />
        <text x={A.x + 10} y={A.y + 5} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 5} y={B.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x - 20} y={C.y + 5} fill="#DC2626" fontSize="14" fontWeight="bold">C</text>
        
        {/* External point E */}
        <circle cx={E.x} cy={E.y} r={4} fill="#F59E0B" />
        <text x={E.x + 10} y={E.y + 5} fill="#F59E0B" fontSize="14" fontWeight="bold">E</text>
        
        {/* Lines from E through A and B */}
        <line x1={E.x} y1={E.y} x2={A2.x} y2={A2.y} stroke="#3B82F6" strokeWidth="2" />
        <line x1={E.x} y1={E.y} x2={B2.x} y2={B2.y} stroke="#10B981" strokeWidth="2" />
        
        {/* Second intersection points */}
        <circle cx={A2.x} cy={A2.y} r={4} fill="#3B82F6" />
        <circle cx={B2.x} cy={B2.y} r={4} fill="#10B981" />
        <text x={A2.x - 20} y={A2.y + 15} fill="#3B82F6" fontSize="14" fontWeight="bold">A'</text>
        <text x={B2.x - 20} y={B2.y - 10} fill="#10B981" fontSize="14" fontWeight="bold">B'</text>
        
        {/* Line A'B' */}
        <line x1={A2.x} y1={A2.y} x2={B2.x} y2={B2.y} stroke="#8B5CF6" strokeWidth="3" strokeDasharray="5,5" />
        
        {/* Angle at E */}
        <path d={`M ${A.x} ${A.y} L ${E.x} ${E.y} L ${B.x} ${B.y}`} 
              fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" />
        
        {/* Central angles */}
        <line x1={cx} y1={cy} x2={A.x} y2={A.y} stroke="#DC2626" strokeWidth="1" strokeDasharray="1,1" />
        <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="1" strokeDasharray="1,1" />
        <line x1={cx} y1={cy} x2={C.x} y2={C.y} stroke="#DC2626" strokeWidth="1" strokeDasharray="1,1" />
        
        {/* Labels */}
        <text x={E.x - 40} y={E.y + 20} fill="#F59E0B" fontSize="12" fontWeight="bold">∠AEB = 50°</text>
        <text x={A.x + 20} y={A.y + 30} fill="#DC2626" fontSize="12" fontWeight="bold">∠ACB = 25°</text>
        <text x={cx - 60} y={cy + 110} fill="#64748B" fontSize="11">Prove: A'B' ∥ tangent at C</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Advanced problems involving the central-circumference angle ratio theorem
          </p>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 dark:bg-amber-900/40 dark:border-amber-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            ⚠️ Advanced Challenge Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the central angle = 2 × inscribed angle theorem in complex scenarios</li>
            <li>• Combine with other circle theorems for multi-step proofs</li>
            <li>• Show detailed geometric reasoning and algebraic calculations</li>
            <li>• Consider optimization problems involving areas and angles</li>
            <li>• Include construction steps and justify each geometric step</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">
            Question 1: Multiple Inscribed Angles
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Points C and D are on opposite sides of chord AB. The central angle ∠AOB = 80°.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Find ∠ACB and ∠ADB using the central-circumference ratio theorem</li>
                <li>If a point P moves along the major arc from A to B, describe how ∠APB changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-central-circumference-ratio-assessment"
      slideTitle="Advanced Central-Circumference Ratio Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="central-circumference-ratio"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 