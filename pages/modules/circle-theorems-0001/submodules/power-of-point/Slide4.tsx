import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function PowerOfPointAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  // Question 1 Diagram: Secant-Secant Power of Point
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 70;
    
    // External point P
    const P = { x: cx + 120, y: cy + 20 };
    
    // Calculate secant points for first secant
    const direction1 = { x: cx - P.x, y: cy - 10 - P.y };
    const length1 = Math.sqrt(direction1.x * direction1.x + direction1.y * direction1.y);
    const unit1 = { x: direction1.x / length1, y: direction1.y / length1 };
    
    // Find intersections with circle for first secant
    const toCenter1 = { x: cx - P.x, y: (cy - 10) - P.y };
    const projLength1 = toCenter1.x * unit1.x + toCenter1.y * unit1.y;
    const discriminant1 = r * r - (toCenter1.x * toCenter1.x + toCenter1.y * toCenter1.y - projLength1 * projLength1);
    const offset1 = Math.sqrt(discriminant1);
    
    const A = { x: P.x + (projLength1 - offset1) * unit1.x, y: P.y + (projLength1 - offset1) * unit1.y };
    const B = { x: P.x + (projLength1 + offset1) * unit1.x, y: P.y + (projLength1 + offset1) * unit1.y };
    
    // Calculate secant points for second secant
    const direction2 = { x: cx - P.x, y: cy + 30 - P.y };
    const length2 = Math.sqrt(direction2.x * direction2.x + direction2.y * direction2.y);
    const unit2 = { x: direction2.x / length2, y: direction2.y / length2 };
    
    // Find intersections with circle for second secant
    const toCenter2 = { x: cx - P.x, y: (cy + 30) - P.y };
    const projLength2 = toCenter2.x * unit2.x + toCenter2.y * unit2.y;
    const discriminant2 = r * r - (toCenter2.x * toCenter2.x + toCenter2.y * toCenter2.y - projLength2 * projLength2);
    const offset2 = Math.sqrt(discriminant2);
    
    const C = { x: P.x + (projLength2 - offset2) * unit2.x, y: P.y + (projLength2 - offset2) * unit2.y };
    const D = { x: P.x + (projLength2 + offset2) * unit2.x, y: P.y + (projLength2 + offset2) * unit2.y };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx - 15} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* External point P */}
        <circle cx={P.x} cy={P.y} r={4} fill="#8B5CF6" />
        <text x={P.x + 10} y={P.y + 5} fill="#8B5CF6" fontSize="14" fontWeight="bold">P</text>
        
        {/* Secant lines */}
        <line x1={P.x} y1={P.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="3" />
        <line x1={P.x} y1={P.y} x2={D.x} y2={D.y} stroke="#3B82F6" strokeWidth="3" />
        
        {/* Intersection points */}
        <circle cx={A.x} cy={A.y} r={3} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={3} fill="#DC2626" />
        <circle cx={C.x} cy={C.y} r={3} fill="#3B82F6" />
        <circle cx={D.x} cy={D.y} r={3} fill="#3B82F6" />
        
        <text x={A.x - 15} y={A.y - 5} fill="#DC2626" fontSize="12" fontWeight="bold">A</text>
        <text x={B.x - 15} y={B.y + 15} fill="#DC2626" fontSize="12" fontWeight="bold">B</text>
        <text x={C.x - 15} y={C.y + 15} fill="#3B82F6" fontSize="12" fontWeight="bold">C</text>
        <text x={D.x - 15} y={D.y - 5} fill="#3B82F6" fontSize="12" fontWeight="bold">D</text>
        
        {/* Distance labels */}
        <text x={(P.x + A.x)/2 + 10} y={(P.y + A.y)/2 - 5} fill="#DC2626" fontSize="10">PA = 4</text>
        <text x={(A.x + B.x)/2 - 15} y={(A.y + B.y)/2 + 15} fill="#DC2626" fontSize="10">AB = 8</text>
        <text x={(P.x + C.x)/2 + 10} y={(P.y + C.y)/2 + 15} fill="#3B82F6" fontSize="10">PC = 6</text>
        <text x={(C.x + D.x)/2 - 15} y={(C.y + D.y)/2 - 5} fill="#3B82F6" fontSize="10">CD = ?</text>
        
        <text x={cx - 80} y={cy + 100} fill="#8B5CF6" fontSize="11">PA × PB = PC × PD</text>
      </svg>
    );
  };

  // Question 2 Diagram: Tangent-Secant Power of Point (for proof)
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 70;
    
    // External point P
    const P = { x: cx + 110, y: cy };
    
         // Calculate tangent points
     const d = Math.sqrt((P.x - cx) * (P.x - cx) + (P.y - cy) * (P.y - cy));
    
    // Vector from O to P
    const OP = { x: P.x - cx, y: P.y - cy };
    
    // Angle for tangent
    const alpha = Math.acos(r / d);
    
    // Unit vector along OP
    const unitOP = { x: OP.x / d, y: OP.y / d };
    
    // Perpendicular vector to OP
    const perpOP = { x: -unitOP.y, y: unitOP.x };
    
    // Tangent point T
    const cosAlpha = Math.cos(alpha);
    const sinAlpha = Math.sin(alpha);
    
    const T = {
      x: cx + r * (unitOP.x * cosAlpha + perpOP.x * sinAlpha),
      y: cy + r * (unitOP.y * cosAlpha + perpOP.y * sinAlpha)
    };
    
    // Secant through P and center direction
    const secantDir = { x: cx - P.x, y: cy + 30 - P.y };
    const secantLength = Math.sqrt(secantDir.x * secantDir.x + secantDir.y * secantDir.y);
    const secantUnit = { x: secantDir.x / secantLength, y: secantDir.y / secantLength };
    
    // Find secant intersections
    const toCenter = { x: cx - P.x, y: (cy + 30) - P.y };
    const projLength = toCenter.x * secantUnit.x + toCenter.y * secantUnit.y;
    const discriminant = r * r - (toCenter.x * toCenter.x + toCenter.y * toCenter.y - projLength * projLength);
    const offset = Math.sqrt(discriminant);
    
    const A = { x: P.x + (projLength - offset) * secantUnit.x, y: P.y + (projLength - offset) * secantUnit.y };
    const B = { x: P.x + (projLength + offset) * secantUnit.x, y: P.y + (projLength + offset) * secantUnit.y };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx - 15} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* External point P */}
        <circle cx={P.x} cy={P.y} r={4} fill="#8B5CF6" />
        <text x={P.x + 10} y={P.y + 5} fill="#8B5CF6" fontSize="14" fontWeight="bold">P</text>
        
        {/* Tangent line */}
        <line x1={P.x} y1={P.y} x2={T.x} y2={T.y} stroke="#10B981" strokeWidth="3" />
        
        {/* Secant line */}
        <line x1={P.x} y1={P.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="3" />
        
        {/* Radius to tangent point */}
        <line x1={cx} y1={cy} x2={T.x} y2={T.y} stroke="#10B981" strokeWidth="1" strokeDasharray="3,3" />
        
        {/* Points */}
        <circle cx={T.x} cy={T.y} r={3} fill="#10B981" />
        <circle cx={A.x} cy={A.y} r={3} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={3} fill="#DC2626" />
        
        <text x={T.x + 8} y={T.y - 5} fill="#10B981" fontSize="12" fontWeight="bold">T</text>
        <text x={A.x - 15} y={A.y + 15} fill="#DC2626" fontSize="12" fontWeight="bold">A</text>
        <text x={B.x - 15} y={B.y - 5} fill="#DC2626" fontSize="12" fontWeight="bold">B</text>
        
        {/* Right angle indicator */}
        <path d={`M ${T.x - 8} ${T.y + 8} L ${T.x - 8} ${T.y} L ${T.x} ${T.y}`} 
              fill="none" stroke="#10B981" strokeWidth="2" />
        
        {/* Labels */}
        <text x={(P.x + T.x)/2 + 10} y={(P.y + T.y)/2 - 5} fill="#10B981" fontSize="11">PT = tangent</text>
        <text x={(P.x + A.x)/2 + 10} y={(P.y + A.y)/2 + 15} fill="#DC2626" fontSize="11">PA × PB</text>
        
        <text x={cx - 60} y={cy + 100} fill="#8B5CF6" fontSize="11">PT² = PA × PB</text>
      </svg>
    );
  };

  // Question 3 Diagram: Complex Power of Point Application
  const Question3Diagram = () => {
    const cx = 150, cy = 150, r = 60;
    
    // Two external points
    const P1 = { x: cx - 100, y: cy };
    const P2 = { x: cx + 100, y: cy + 40 };
    
    
    
    // Points on circle for secants from P2
    const E = { x: cx + r * Math.cos(Math.PI * 0.1), y: cy + r * Math.sin(Math.PI * 0.1) };
    const F = { x: cx + r * Math.cos(Math.PI * 0.4), y: cy + r * Math.sin(Math.PI * 0.4) };
    const G = { x: cx + r * Math.cos(Math.PI * 0.8), y: cy + r * Math.sin(Math.PI * 0.8) };
    const H = { x: cx + r * Math.cos(Math.PI * 1.2), y: cy + r * Math.sin(Math.PI * 1.2) };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="12" fontWeight="bold">O</text>
        
        {/* External points */}
        <circle cx={P1.x} cy={P1.y} r={3} fill="#8B5CF6" />
        <circle cx={P2.x} cy={P2.y} r={3} fill="#F59E0B" />
        <text x={P1.x - 15} y={P1.y + 15} fill="#8B5CF6" fontSize="12" fontWeight="bold">P₁</text>
        <text x={P2.x + 8} y={P2.y + 15} fill="#F59E0B" fontSize="12" fontWeight="bold">P₂</text>
        
        {/* Secant lines from P1 */}
        <line x1={P1.x} y1={P1.y} x2={E.x} y2={E.y} stroke="#DC2626" strokeWidth="2" />
        <line x1={E.x} y1={E.y} x2={F.x} y2={F.y} stroke="#DC2626" strokeWidth="2" strokeDasharray="2,2" />
        
        {/* Secant lines from P2 */}
        <line x1={P2.x} y1={P2.y} x2={G.x} y2={G.y} stroke="#3B82F6" strokeWidth="2" />
        <line x1={G.x} y1={G.y} x2={H.x} y2={H.y} stroke="#3B82F6" strokeWidth="2" strokeDasharray="2,2" />
        
        {/* Points on circle */}
        <circle cx={E.x} cy={E.y} r={2} fill="#DC2626" />
        <circle cx={F.x} cy={F.y} r={2} fill="#DC2626" />
        <circle cx={G.x} cy={G.y} r={2} fill="#3B82F6" />
        <circle cx={H.x} cy={H.y} r={2} fill="#3B82F6" />
        
        <text x={E.x + 5} y={E.y - 5} fill="#DC2626" fontSize="10">E</text>
        <text x={F.x + 5} y={F.y - 5} fill="#DC2626" fontSize="10">F</text>
        <text x={G.x - 15} y={G.y - 5} fill="#3B82F6" fontSize="10">G</text>
        <text x={H.x - 15} y={H.y + 15} fill="#3B82F6" fontSize="10">H</text>
        
        {/* Distance labels */}
        <text x={P1.x + 15} y={P1.y - 10} fill="#8B5CF6" fontSize="9">Power = 40</text>
        <text x={P2.x - 30} y={P2.y - 10} fill="#F59E0B" fontSize="9">Power = ?</text>
        <text x={(P1.x + E.x)/2 - 5} y={(P1.y + E.y)/2 + 15} fill="#DC2626" fontSize="9">P₁E = 5</text>
        <text x={(P2.x + G.x)/2 + 5} y={(P2.y + G.y)/2 - 5} fill="#3B82F6" fontSize="9">P₂G = 8</text>
        <text x={(G.x + H.x)/2 - 15} y={(G.y + H.y)/2 + 15} fill="#3B82F6" fontSize="9">GH = 6</text>
        
        <text x={cx - 80} y={cy + 85} fill="#64748B" fontSize="8">Multiple power relationships</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of the power of a point theorem with these challenging problems
          </p>
        </div>

       <div className="bg-orange-50/60 border border-orange-200 dark:bg-orange-900/40 dark:border-orange-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📐 Power of a Point Theorem Assessment Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the power of a point theorem: for an external point, the product of distances to intersection points is constant</li>
            <li>• For secant-secant: PA × PB = PC × PD (where P is external, A,B and C,D are intersection points)</li>
            <li>• For tangent-secant: PT² = PA × PB (where PT is tangent length)</li>
            <li>• Show clear geometric reasoning and use similar triangles for proofs</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Secant-Secant Power of Point
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                From external point P, two secants are drawn to a circle. One secant intersects the circle at points A and B, with PA = 4 cm and AB = 8 cm. The other secant intersects at points C and D, with PC = 6 cm.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Use the power of a point theorem to find the length CD</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 2: Prove Power of Point for Tangent-Secant Case
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question2Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                From external point P, a tangent PT and a secant PAB are drawn to a circle with center O. The tangent touches the circle at T, and the secant intersects at points A and B.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Prove that triangles PTA and PTB are similar to triangle PAT</li>
                <li>Use similar triangles to prove that PT² = PA × PB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-power-of-point-assessment"
      slideTitle="Power of a Point Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="power-of-point"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 