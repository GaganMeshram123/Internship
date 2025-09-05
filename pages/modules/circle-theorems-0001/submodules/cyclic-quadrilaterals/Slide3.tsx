import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function CyclicQuadrilateralsAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Question 1 Diagram: Finding Unknown Angles
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Use non-evenly spaced points for realistic quadrilateral
    const angleA = 0.2;
    const angleB = 1.4;
    const angleC = 2.8;
    const angleD = 4.8;
    const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
    const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
    const Cx = cx + r * Math.cos(angleC), Cy = cy + r * Math.sin(angleC);
    const Dx = cx + r * Math.cos(angleD), Dy = cy + r * Math.sin(angleD);
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Quadrilateral ABCD */}
        <path d={`M ${Ax} ${Ay} L ${Bx} ${By} L ${Cx} ${Cy} L ${Dx} ${Dy} Z`} 
              fill="none" stroke="#6B7280" strokeWidth="2" />
        
        {/* Vertices */}
        <circle cx={Ax} cy={Ay} r={4} fill="#DC2626" />
        <circle cx={Bx} cy={By} r={4} fill="#3B82F6" />
        <circle cx={Cx} cy={Cy} r={4} fill="#10B981" />
        <circle cx={Dx} cy={Dy} r={4} fill="#8B5CF6" />
        
        {/* Labels */}
        <text x={Ax + 15} y={Ay - 10} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={Bx + 10} y={By - 15} fill="#3B82F6" fontSize="14" fontWeight="bold">B</text>
        <text x={Cx - 20} y={Cy + 20} fill="#10B981" fontSize="14" fontWeight="bold">C</text>
        <text x={Dx - 15} y={Dy + 15} fill="#8B5CF6" fontSize="14" fontWeight="bold">D</text>
        
        {/* Angle labels */}
        <text x={Ax + 25} y={Ay + 15} fill="#DC2626" fontSize="12" fontWeight="bold">85°</text>
        <text x={Bx - 15} y={By + 25} fill="#3B82F6" fontSize="12" fontWeight="bold">110°</text>
        <text x={Cx - 25} y={Cy - 15} fill="#10B981" fontSize="12" fontWeight="bold">95°</text>
        <text x={Dx + 10} y={Dy - 20} fill="#8B5CF6" fontSize="12" fontWeight="bold">?</text>
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="12" fontWeight="bold">O</text>
      </svg>
    );
  };

  // Question 2 Diagram: Proving Quadrilateral is Cyclic
  const Question2Diagram = () => {
    const cx = 150, cy = 150;
    
    // Quadrilateral with specific angle properties
    const A = { x: cx - 60, y: cy - 40 };
    const B = { x: cx + 70, y: cy - 50 };
    const C = { x: cx + 50, y: cy + 60 };
    const D = { x: cx - 80, y: cy + 30 };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Quadrilateral ABCD */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`} 
              fill="rgba(59, 130, 246, 0.1)" stroke="#6B7280" strokeWidth="2" />
        
        {/* Vertices */}
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#3B82F6" />
        <circle cx={C.x} cy={C.y} r={4} fill="#10B981" />
        <circle cx={D.x} cy={D.y} r={4} fill="#8B5CF6" />
        
        {/* Labels */}
        <text x={A.x - 15} y={A.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 10} y={B.y - 10} fill="#3B82F6" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x + 10} y={C.y + 15} fill="#10B981" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x - 15} y={D.y + 15} fill="#8B5CF6" fontSize="14" fontWeight="bold">D</text>
        
        {/* Angle labels */}
        <text x={A.x + 15} y={A.y + 15} fill="#DC2626" fontSize="12" fontWeight="bold">72°</text>
        <text x={B.x - 25} y={B.y + 20} fill="#3B82F6" fontSize="12" fontWeight="bold">105°</text>
        <text x={C.x - 25} y={C.y - 15} fill="#10B981" fontSize="12" fontWeight="bold">108°</text>
        <text x={D.x + 15} y={D.y - 15} fill="#8B5CF6" fontSize="12" fontWeight="bold">75°</text>
        
        {/* Dashed circle to show it should be circumscribed */}
        <circle cx={cx} cy={cy} r={85} fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
        <text x={cx - 30} y={cy - 100} fill="#3B82F6" fontSize="12" fontWeight="bold">Circumcircle?</text>
      </svg>
    );
  };

  // Question 3 Diagram: Intersection of Circles
  const Question3Diagram = () => {
    const cx1 = 120, cy1 = 150, r1 = 60;
    const cx2 = 180, cy2 = 150, r2 = 60;
    
    // Intersection points
    const intersectionY1 = cy1 - 40;
    const intersectionY2 = cy1 + 40;
    const intersectionX = (cx1 + cx2) / 2;
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Two intersecting circles */}
        <circle cx={cx1} cy={cy1} r={r1} fill="none" stroke="#DC2626" strokeWidth="2" />
        <circle cx={cx2} cy={cy2} r={r2} fill="none" stroke="#3B82F6" strokeWidth="2" />
        
        {/* Centers */}
        <circle cx={cx1} cy={cy1} r={3} fill="#DC2626" />
        <circle cx={cx2} cy={cy2} r={3} fill="#3B82F6" />
        <text x={cx1 - 15} y={cy1 + 20} fill="#DC2626" fontSize="12" fontWeight="bold">O₁</text>
        <text x={cx2 + 10} y={cy2 + 20} fill="#3B82F6" fontSize="12" fontWeight="bold">O₂</text>
        
        {/* Intersection points */}
        <circle cx={intersectionX} cy={intersectionY1} r={4} fill="#10B981" />
        <circle cx={intersectionX} cy={intersectionY2} r={4} fill="#10B981" />
        <text x={intersectionX + 10} y={intersectionY1 - 10} fill="#10B981" fontSize="14" fontWeight="bold">P</text>
        <text x={intersectionX + 10} y={intersectionY2 + 20} fill="#10B981" fontSize="14" fontWeight="bold">Q</text>
        
        {/* Additional points on circles */}
        <circle cx={cx1 - 50} cy={cy1 - 20} r={3} fill="#8B5CF6" />
        <circle cx={cx2 + 50} cy={cy2 + 20} r={3} fill="#F59E0B" />
        <text x={cx1 - 60} y={cy1 - 25} fill="#8B5CF6" fontSize="14" fontWeight="bold">A</text>
        <text x={cx2 + 55} y={cy2 + 25} fill="#F59E0B" fontSize="14" fontWeight="bold">B</text>
        
        {/* Lines forming quadrilateral APBQ */}
        <line x1={cx1 - 50} y1={cy1 - 20} x2={intersectionX} y2={intersectionY1} stroke="#6B7280" strokeWidth="1" />
        <line x1={intersectionX} y1={intersectionY1} x2={cx2 + 50} y2={cy2 + 20} stroke="#6B7280" strokeWidth="1" />
        <line x1={cx2 + 50} y1={cy2 + 20} x2={intersectionX} y2={intersectionY2} stroke="#6B7280" strokeWidth="1" />
        <line x1={intersectionX} y1={intersectionY2} x2={cx1 - 50} y2={cy1 - 20} stroke="#6B7280" strokeWidth="1" />
        
        <text x={150} y={280} textAnchor="middle" fill="#64748B" fontSize="12" fontWeight="bold">Quadrilateral APBQ</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of cyclic quadrilaterals with these challenging problems
          </p>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 dark:bg-amber-900/40 dark:border-amber-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📐 Cyclic Quadrilaterals Assessment Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the cyclic quadrilateral theorem: opposite angles sum to 180°</li>
            <li>• Use the converse theorem to prove quadrilaterals are cyclic</li>
            <li>• Show clear geometric reasoning and construction steps</li>
            <li>• Include detailed diagrams with all relevant measurements and angles</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Finding Unknown Angles
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                ABCD is a cyclic quadrilateral inscribed in a circle with center O.
              </p>
              <p className="mb-4 font-medium">
                Given: ∠A = 85°, ∠B = 110°, ∠C = 95°
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Find ∠D using the cyclic quadrilateral theorem</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 2: Proving a Quadrilateral is Cyclic
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question2Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Quadrilateral ABCD has the following angles:
              </p>
              <p className="mb-4 font-medium">
                ∠A = 72°, ∠B = 105°, ∠C = 108°, ∠D = 75°
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Use the converse theorem to prove ABCD is cyclic</li>
                <li>Explain what would happen if ∠D was 80° instead of 75°</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-cyclic-quadrilaterals-assessment"
      slideTitle="Cyclic Quadrilaterals Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="cyclic-quadrilaterals"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 