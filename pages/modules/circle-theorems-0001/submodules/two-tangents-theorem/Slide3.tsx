import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function TwoTangentsTheoremAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Question 1 Diagram: Basic Two Tangents Equal Length
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 60;
    
    // External point P
    const P = { x: cx + 100, y: cy - 40 };
    
    // Calculate tangent points using correct geometry
    const d = Math.sqrt((P.x - cx) ** 2 + (P.y - cy) ** 2);
    const tangentLength = Math.sqrt(d * d - r * r);
    
    // Vector from O to P
    const OP = { x: P.x - cx, y: P.y - cy };
    
    // Angle that the tangent makes with the line OP
    const alpha = Math.acos(r / d);
    
    // Unit vector along OP
    const unitOP = { x: OP.x / d, y: OP.y / d };
    
    // Perpendicular vector to OP
    const perpOP = { x: -unitOP.y, y: unitOP.x };
    
    // Tangent points T1 and T2
    const cosAlpha = Math.cos(alpha);
    const sinAlpha = Math.sin(alpha);
    
    const T1 = {
      x: cx + r * (unitOP.x * cosAlpha + perpOP.x * sinAlpha),
      y: cy + r * (unitOP.y * cosAlpha + perpOP.y * sinAlpha)
    };
    const T2 = {
      x: cx + r * (unitOP.x * cosAlpha - perpOP.x * sinAlpha),
      y: cy + r * (unitOP.y * cosAlpha - perpOP.y * sinAlpha)
    };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx - 15} y={cy + 15} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* External point P */}
        <circle cx={P.x} cy={P.y} r={4} fill="#8B5CF6" />
        <text x={P.x + 10} y={P.y - 5} fill="#8B5CF6" fontSize="14" fontWeight="bold">P</text>
        
        {/* Tangent lines */}
        <line x1={P.x} y1={P.y} x2={T1.x} y2={T1.y} stroke="#3B82F6" strokeWidth="3" />
        <line x1={P.x} y1={P.y} x2={T2.x} y2={T2.y} stroke="#3B82F6" strokeWidth="3" />
        
        {/* Tangent points */}
        <circle cx={T1.x} cy={T1.y} r={3} fill="#DC2626" />
        <circle cx={T2.x} cy={T2.y} r={3} fill="#DC2626" />
        <text x={T1.x - 15} y={T1.y - 10} fill="#DC2626" fontSize="12" fontWeight="bold">A</text>
        <text x={T2.x - 15} y={T2.y + 20} fill="#DC2626" fontSize="12" fontWeight="bold">B</text>
        
        {/* Length labels */}
        <text x={(P.x + T1.x)/2 + 10} y={(P.y + T1.y)/2 - 5} fill="#3B82F6" fontSize="12" fontWeight="bold">PA</text>
        <text x={(P.x + T2.x)/2 + 10} y={(P.y + T2.y)/2 + 15} fill="#3B82F6" fontSize="12" fontWeight="bold">PB</text>
        
        {/* Equal marks */}
        <path d={`M ${(P.x + T1.x)/2 - 5} ${(P.y + T1.y)/2 + 5} L ${(P.x + T1.x)/2 + 5} ${(P.y + T1.y)/2 - 5}`} 
              stroke="#10B981" strokeWidth="2" />
        <path d={`M ${(P.x + T2.x)/2 - 5} ${(P.y + T2.y)/2 + 5} L ${(P.x + T2.x)/2 + 5} ${(P.y + T2.y)/2 - 5}`} 
              stroke="#10B981" strokeWidth="2" />
        
        <text x={cx - 50} y={cy + 90} fill="#10B981" fontSize="11" fontWeight="bold">PA = PB</text>
      </svg>
    );
  };

  // Question 2 Diagram: Quadrilateral with Tangent Circles
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 50;
    
    // Square vertices around the circle
    const sideLength = 140;
    const A = { x: cx - sideLength/2, y: cy - sideLength/2 };
    const B = { x: cx + sideLength/2, y: cy - sideLength/2 };
    const C = { x: cx + sideLength/2, y: cy + sideLength/2 };
    const D = { x: cx - sideLength/2, y: cy + sideLength/2 };
    
    // Tangent points on each side
    const TA = { x: cx, y: A.y };  // Top side
    const TB = { x: B.x, y: cy };  // Right side  
    const TC = { x: cx, y: C.y };  // Bottom side
    const TD = { x: A.x, y: cy };  // Left side
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Quadrilateral ABCD */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`} 
              fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Inscribed circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3B82F6" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={2} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="12">O</text>
        
        {/* Vertices */}
        <circle cx={A.x} cy={A.y} r={3} fill="#8B5CF6" />
        <circle cx={B.x} cy={B.y} r={3} fill="#8B5CF6" />
        <circle cx={C.x} cy={C.y} r={3} fill="#8B5CF6" />
        <circle cx={D.x} cy={D.y} r={3} fill="#8B5CF6" />
        
        <text x={A.x - 15} y={A.y - 5} fill="#8B5CF6" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 5} y={B.y - 5} fill="#8B5CF6" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x + 5} y={C.y + 15} fill="#8B5CF6" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x - 15} y={D.y + 15} fill="#8B5CF6" fontSize="14" fontWeight="bold">D</text>
        
        {/* Tangent points */}
        <circle cx={TA.x} cy={TA.y} r={2} fill="#DC2626" />
        <circle cx={TB.x} cy={TB.y} r={2} fill="#DC2626" />
        <circle cx={TC.x} cy={TC.y} r={2} fill="#DC2626" />
        <circle cx={TD.x} cy={TD.y} r={2} fill="#DC2626" />
        
        {/* Side length labels */}
        <text x={(A.x + TA.x)/2 - 5} y={A.y - 8} fill="#10B981" fontSize="11">a</text>
        <text x={TA.x + 5} y={(TA.y + B.y)/2} fill="#10B981" fontSize="11">b</text>
        <text x={B.x + 8} y={(B.y + TB.y)/2} fill="#10B981" fontSize="11">b</text>
        <text x={(TB.x + C.x)/2 + 5} y={C.y + 15} fill="#10B981" fontSize="11">c</text>
        
        <text x={cx - 70} y={cy + 80} fill="#DC2626" fontSize="10">Tangential quadrilateral</text>
        <text x={cx - 60} y={cy - 70} fill="#10B981" fontSize="10">AB + CD = BC + DA</text>
      </svg>
    );
  };

  // Question 3 Diagram: Belt Problem with Two Circles
  const Question3Diagram = () => {
    const c1 = { x: 120, y: 150, r: 40 };  // Circle 1
    const c2 = { x: 200, y: 150, r: 25 };  // Circle 2
    
    // Calculate external common tangent points
    const d = Math.sqrt((c2.x - c1.x) ** 2 + (c2.y - c1.y) ** 2);
    const angle = Math.asin((c1.r - c2.r) / d);
    
    // External tangent points
    const baseAngle = Math.atan2(c2.y - c1.y, c2.x - c1.x);
    const T1_1 = {
      x: c1.x + c1.r * Math.cos(baseAngle - angle + Math.PI/2),
      y: c1.y + c1.r * Math.sin(baseAngle - angle + Math.PI/2)
    };
    const T1_2 = {
      x: c2.x + c2.r * Math.cos(baseAngle - angle + Math.PI/2),
      y: c2.y + c2.r * Math.sin(baseAngle - angle + Math.PI/2)
    };
    const T2_1 = {
      x: c1.x + c1.r * Math.cos(baseAngle + angle - Math.PI/2),
      y: c1.y + c1.r * Math.sin(baseAngle + angle - Math.PI/2)
    };
    const T2_2 = {
      x: c2.x + c2.r * Math.cos(baseAngle + angle - Math.PI/2),
      y: c2.y + c2.r * Math.sin(baseAngle + angle - Math.PI/2)
    };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle 1 */}
        <circle cx={c1.x} cy={c1.y} r={c1.r} fill="none" stroke="#3B82F6" strokeWidth="2" />
        <circle cx={c1.x} cy={c1.y} r={2} fill="#374151" />
        <text x={c1.x - 20} y={c1.y + 5} fill="#3B82F6" fontSize="12" fontWeight="bold">O₁</text>
        
        {/* Circle 2 */}
        <circle cx={c2.x} cy={c2.y} r={c2.r} fill="none" stroke="#10B981" strokeWidth="2" />
        <circle cx={c2.x} cy={c2.y} r={2} fill="#374151" />
        <text x={c2.x + 8} y={c2.y + 5} fill="#10B981" fontSize="12" fontWeight="bold">O₂</text>
        
        {/* External common tangents */}
        <line x1={T1_1.x} y1={T1_1.y} x2={T1_2.x} y2={T1_2.y} stroke="#DC2626" strokeWidth="2" />
        <line x1={T2_1.x} y1={T2_1.y} x2={T2_2.x} y2={T2_2.y} stroke="#DC2626" strokeWidth="2" />
        
        {/* Tangent points */}
        <circle cx={T1_1.x} cy={T1_1.y} r={2} fill="#DC2626" />
        <circle cx={T1_2.x} cy={T1_2.y} r={2} fill="#DC2626" />
        <circle cx={T2_1.x} cy={T2_1.y} r={2} fill="#DC2626" />
        <circle cx={T2_2.x} cy={T2_2.y} r={2} fill="#DC2626" />
        
        {/* Distance line between centers */}
        <line x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} stroke="#64748B" strokeWidth="1" strokeDasharray="3,3" />
        
        {/* Labels */}
        <text x={c1.x - 5} y={c1.y + 60} fill="#3B82F6" fontSize="11">r₁ = 6cm</text>
        <text x={c2.x - 15} y={c2.y + 45} fill="#10B981" fontSize="11">r₂ = 4cm</text>
        <text x={(c1.x + c2.x)/2 - 10} y={c1.y - 20} fill="#64748B" fontSize="11">d = 10cm</text>
        
        <text x={110} y={280} fill="#DC2626" fontSize="10">External common tangents</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of the two tangents theorem with these challenging problems
          </p>
        </div>

        <div className="bg-green-50/60 border border-green-200 dark:bg-green-900/40 dark:border-green-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📐 Two Tangents Theorem Assessment Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the two tangents theorem: tangents drawn from an external point to a circle are equal in length</li>
            <li>• Show clear geometric reasoning and calculations</li>
            <li>• Include detailed diagrams with all relevant measurements</li>
            <li>• Use the equal tangent property to solve complex geometric problems</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Basic Two Tangents Equal Length
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                From external point P, two tangents PA and PB are drawn to a circle with center O and radius 8 cm. The distance OP = 10 cm.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Calculate the length of each tangent PA and PB</li>
                <li>Find the angle ∠APB between the two tangent lines</li>
                <li>Calculate the area of triangle PAB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 2: Two Circles
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question3Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Two circles with centers O₁ and O₂ have radii 6 cm and 4 cm respectively. The distance between their centers is 10 cm. External common tangents are drawn.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Calculate the length of each external common tangent</li>
                <li>Find the area of the quadrilateral formed by the 1 tangent line and the line joining the centers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-two-tangents-theorem-assessment"
      slideTitle="Two Tangents Theorem Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="two-tangents-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 