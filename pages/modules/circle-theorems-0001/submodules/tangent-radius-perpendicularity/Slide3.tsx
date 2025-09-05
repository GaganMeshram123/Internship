import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function TangentRadiusPerpendicularityAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Question 1 Diagram: Basic Tangent-Radius Perpendicularity
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Point on circle
    const angleT = Math.PI * 0.3;
    const T = { x: cx + r * Math.cos(angleT), y: cy + r * Math.sin(angleT) };
    
    // Tangent line direction (perpendicular to radius)
    const tangentAngle = angleT + Math.PI/2;
    const tangentLength = 60;
    const tangentStart = { 
      x: T.x - tangentLength * Math.cos(tangentAngle), 
      y: T.y - tangentLength * Math.sin(tangentAngle) 
    };
    const tangentEnd = { 
      x: T.x + tangentLength * Math.cos(tangentAngle), 
      y: T.y + tangentLength * Math.sin(tangentAngle) 
    };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Radius OT */}
        <line x1={cx} y1={cy} x2={T.x} y2={T.y} stroke="#DC2626" strokeWidth="3" />
        
        {/* Tangent line */}
        <line x1={tangentStart.x} y1={tangentStart.y} x2={tangentEnd.x} y2={tangentEnd.y} 
              stroke="#3B82F6" strokeWidth="3" />
        
        {/* Point T */}
        <circle cx={T.x} cy={T.y} r={4} fill="#DC2626" />
        <text x={T.x + 10} y={T.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">T</text>
        
        {/* Right angle indicator */}
        <path d={`M ${T.x - 10} ${T.y + 5} L ${T.x - 10} ${T.y - 5} L ${T.x} ${T.y - 5}`} 
              fill="none" stroke="#10B981" strokeWidth="2" />
        
        {/* Labels */}
        <text x={cx + 30} y={cy + 30} fill="#DC2626" fontSize="12" fontWeight="bold">radius OT</text>
        <text x={T.x - 40} y={T.y + 30} fill="#3B82F6" fontSize="12" fontWeight="bold">tangent</text>
        <text x={T.x - 30} y={T.y - 20} fill="#10B981" fontSize="12" fontWeight="bold">90°</text>
      </svg>
    );
  };

  // Question 2 Diagram: External Point Tangents
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 60;
    
    // External point P
    const P = { x: cx + 120, y: cy };
    
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
        <text x={cx - 15} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* External point P */}
        <circle cx={P.x} cy={P.y} r={4} fill="#8B5CF6" />
        <text x={P.x + 10} y={P.y + 5} fill="#8B5CF6" fontSize="14" fontWeight="bold">P</text>
        
        {/* Tangent lines */}
        <line x1={P.x} y1={P.y} x2={T1.x} y2={T1.y} stroke="#3B82F6" strokeWidth="2" />
        <line x1={P.x} y1={P.y} x2={T2.x} y2={T2.y} stroke="#3B82F6" strokeWidth="2" />
        
        {/* Radii to tangent points */}
        <line x1={cx} y1={cy} x2={T1.x} y2={T1.y} stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={T2.x} y2={T2.y} stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
        
        {/* Tangent points */}
        <circle cx={T1.x} cy={T1.y} r={3} fill="#DC2626" />
        <circle cx={T2.x} cy={T2.y} r={3} fill="#DC2626" />
        <text x={T1.x - 15} y={T1.y - 10} fill="#DC2626" fontSize="12" fontWeight="bold">T₁</text>
        <text x={T2.x - 15} y={T2.y + 20} fill="#DC2626" fontSize="12" fontWeight="bold">T₂</text>
        
        {/* Right angle indicators */}
        <path d={`M ${T1.x - 8} ${T1.y + 8} L ${T1.x - 8} ${T1.y} L ${T1.x} ${T1.y}`} 
              fill="none" stroke="#10B981" strokeWidth="1.5" />
        <path d={`M ${T2.x - 8} ${T2.y - 8} L ${T2.x - 8} ${T2.y} L ${T2.x} ${T2.y}`} 
              fill="none" stroke="#10B981" strokeWidth="1.5" />
        
        <text x={cx - 40} y={cy + 80} fill="#3B82F6" fontSize="11">Equal tangent lengths</text>
      </svg>
    );
  };

  // Question 3 Diagram: Circle and Square
  const Question3Diagram = () => {
    const cx = 150, cy = 150;
    const squareSize = 100;
    const r = squareSize / 2;
    
    // Square vertices
    const A = { x: cx - squareSize/2, y: cy - squareSize/2 };
    const B = { x: cx + squareSize/2, y: cy - squareSize/2 };
    const C = { x: cx + squareSize/2, y: cy + squareSize/2 };
    const D = { x: cx - squareSize/2, y: cy + squareSize/2 };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Inscribed circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3B82F6" strokeWidth="2" />
        
        {/* Square */}
        <rect x={A.x} y={A.y} width={squareSize} height={squareSize} 
              fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Square vertices */}
        <circle cx={A.x} cy={A.y} r={3} fill="#64748B" />
        <circle cx={B.x} cy={B.y} r={3} fill="#64748B" />
        <circle cx={C.x} cy={C.y} r={3} fill="#64748B" />
        <circle cx={D.x} cy={D.y} r={3} fill="#64748B" />
        
        <text x={A.x - 15} y={A.y - 5} fill="#64748B" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 5} y={B.y - 5} fill="#64748B" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x + 5} y={C.y + 15} fill="#64748B" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x - 15} y={D.y + 15} fill="#64748B" fontSize="14" fontWeight="bold">D</text>
        
        {/* Radii to tangent points (midpoints of sides) */}
        <line x1={cx} y1={cy} x2={cx} y2={A.y} stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={B.x} y2={cy} stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={cx} y2={C.y} stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy} x2={A.x} y2={cy} stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
        
        {/* Tangent points */}
        <circle cx={cx} cy={A.y} r={3} fill="#DC2626" />
        <circle cx={B.x} cy={cy} r={3} fill="#DC2626" />
        <circle cx={cx} cy={C.y} r={3} fill="#DC2626" />
        <circle cx={A.x} cy={cy} r={3} fill="#DC2626" />
        
        {/* Right angle indicators */}
        <path d={`M ${cx - 8} ${A.y - 8} L ${cx - 8} ${A.y} L ${cx} ${A.y}`} 
              fill="none" stroke="#10B981" strokeWidth="1.5" />
        <path d={`M ${B.x - 8} ${cy - 8} L ${B.x - 8} ${cy} L ${B.x} ${cy}`} 
              fill="none" stroke="#10B981" strokeWidth="1.5" />
        
        <text x={cx - 60} y={cy + 80} fill="#3B82F6" fontSize="11">Inscribed circle</text>
        <text x={cx - 50} y={cy - 70} fill="#DC2626" fontSize="11">All radii ⊥ to sides</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of the tangent-radius perpendicularity theorem with these challenging problems
          </p>
        </div>

        <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📐 Tangent-Radius Perpendicularity Assessment Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the tangent-radius theorem: a tangent to a circle is always perpendicular to the radius at the point of tangency</li>
            <li>• Show clear geometric reasoning and construction steps</li>
            <li>• Include detailed diagrams with all relevant measurements and angle markings</li>
            <li>• Use the perpendicularity property to solve for unknown lengths and angles</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Basic Tangent-Radius Perpendicularity
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A circle has center O and radius 8 cm. A tangent line touches the circle at point T.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>If a point P on the tangent is 6 cm away from T, calculate the distance OP</li>
                <li>Explain why this is the shortest distance from O to the tangent line</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 2: External Point Tangent Construction
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question2Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                From an external point P, two tangent lines are drawn to a circle with center O and radius 5 cm. The distance OP = 13 cm.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Calculate the length of each tangent from P to the circle</li>
                <li>Prove that the two tangent lengths are equal</li>
                <li>Find the angle between the two tangent lines at point P</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 3: Circle Inscribed in Square
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question3Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A circle is inscribed in square ABCD with side length 12 cm. The circle touches all four sides of the square.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Find the radius of the inscribed circle</li>
                <li>Prove that each radius to a point of tangency is perpendicular to the corresponding side</li>
                <li>Calculate the area of the region between the square and the circle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-tangent-radius-perpendicularity-assessment"
      slideTitle="Tangent-Radius Perpendicularity Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="tangent-radius-perpendicularity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 