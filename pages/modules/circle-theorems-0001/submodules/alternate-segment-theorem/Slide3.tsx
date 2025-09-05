import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function AlternateSegmentTheoremAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Question 1 Diagram: Basic Alternate Segment Theorem
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Point of tangency T
    const angleT = Math.PI * 0.25;
    const T = { x: cx + r * Math.cos(angleT), y: cy + r * Math.sin(angleT) };
    
    // Chord from T to another point A on the circle
    const angleA = Math.PI * 0.75;
    const A = { x: cx + r * Math.cos(angleA), y: cy + r * Math.sin(angleA) };
    
    // Point B in the alternate segment
    const angleB = Math.PI * 1.5;
    const B = { x: cx + r * Math.cos(angleB), y: cy + r * Math.sin(angleB) };
    
    // Tangent line (perpendicular to radius OT)
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
        <text x={cx - 15} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Tangent line */}
        <line x1={tangentStart.x} y1={tangentStart.y} x2={tangentEnd.x} y2={tangentEnd.y} 
              stroke="#3B82F6" strokeWidth="3" />
        
        {/* Chord TA */}
        <line x1={T.x} y1={T.y} x2={A.x} y2={A.y} stroke="#DC2626" strokeWidth="3" />
        
        {/* Chord AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
        
        {/* Points */}
        <circle cx={T.x} cy={T.y} r={4} fill="#3B82F6" />
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#10B981" />
        
        <text x={T.x + 10} y={T.y - 10} fill="#3B82F6" fontSize="14" fontWeight="bold">T</text>
        <text x={A.x - 15} y={A.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x - 15} y={B.y + 20} fill="#10B981" fontSize="14" fontWeight="bold">B</text>
        
        {/* Angle markings */}
        <path d={`M ${T.x - 15} ${T.y - 8} A 10 10 0 0 1 ${T.x - 8} ${T.y - 15}`} 
              fill="none" stroke="#8B5CF6" strokeWidth="2" />
        <path d={`M ${A.x + 12} ${A.y + 8} A 10 10 0 0 1 ${A.x + 8} ${A.y + 12}`} 
              fill="none" stroke="#8B5CF6" strokeWidth="2" />
        
        {/* Labels */}
        <text x={T.x - 30} y={T.y + 15} fill="#8B5CF6" fontSize="12" fontWeight="bold">α</text>
        <text x={A.x + 15} y={A.y + 20} fill="#8B5CF6" fontSize="12" fontWeight="bold">α</text>
        <text x={cx - 60} y={cy + 110} fill="#8B5CF6" fontSize="11">Equal angles</text>
        <text x={T.x - 40} y={T.y - 30} fill="#3B82F6" fontSize="11">tangent</text>
        <text x={(T.x + A.x)/2 - 10} y={(T.y + A.y)/2 + 15} fill="#DC2626" fontSize="11">chord</text>
      </svg>
    );
  };

  // Question 2 Diagram: Multiple Chords and Angles
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 70;
    
    // Point of tangency P
    const P = { x: cx + r, y: cy };
    
    // Points on circle
    const Q = { x: cx + r * Math.cos(Math.PI * 0.3), y: cy + r * Math.sin(Math.PI * 0.3) };
    const R = { x: cx + r * Math.cos(Math.PI * 0.7), y: cy + r * Math.sin(Math.PI * 0.7) };
    const S = { x: cx + r * Math.cos(Math.PI * 1.3), y: cy + r * Math.sin(Math.PI * 1.3) };
    
    // Tangent line at P (vertical)
    const tangentStart = { x: P.x, y: P.y - 50 };
    const tangentEnd = { x: P.x, y: P.y + 50 };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx - 15} y={cy + 15} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Tangent line at P */}
        <line x1={tangentStart.x} y1={tangentStart.y} x2={tangentEnd.x} y2={tangentEnd.y} 
              stroke="#3B82F6" strokeWidth="3" />
        
        {/* Chords */}
        <line x1={P.x} y1={P.y} x2={Q.x} y2={Q.y} stroke="#DC2626" strokeWidth="2" />
        <line x1={P.x} y1={P.y} x2={R.x} y2={R.y} stroke="#10B981" strokeWidth="2" />
        <line x1={Q.x} y1={Q.y} x2={S.x} y2={S.y} stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={R.x} y1={R.y} x2={S.x} y2={S.y} stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
        
        {/* Points */}
        <circle cx={P.x} cy={P.y} r={3} fill="#3B82F6" />
        <circle cx={Q.x} cy={Q.y} r={3} fill="#DC2626" />
        <circle cx={R.x} cy={R.y} r={3} fill="#10B981" />
        <circle cx={S.x} cy={S.y} r={3} fill="#8B5CF6" />
        
        <text x={P.x + 8} y={P.y + 5} fill="#3B82F6" fontSize="14" fontWeight="bold">P</text>
        <text x={Q.x + 8} y={Q.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">Q</text>
        <text x={R.x - 15} y={R.y - 5} fill="#10B981" fontSize="14" fontWeight="bold">R</text>
        <text x={S.x - 15} y={S.y + 15} fill="#8B5CF6" fontSize="14" fontWeight="bold">S</text>
        
        {/* Angle labels */}
        <text x={P.x + 15} y={P.y - 15} fill="#DC2626" fontSize="12" fontWeight="bold">40°</text>
        <text x={P.x + 15} y={P.y + 25} fill="#10B981" fontSize="12" fontWeight="bold">35°</text>
        <text x={Q.x - 25} y={Q.y + 25} fill="#8B5CF6" fontSize="12" fontWeight="bold">?</text>
        <text x={R.x + 10} y={R.y + 25} fill="#F59E0B" fontSize="12" fontWeight="bold">?</text>
        
        <text x={cx - 50} y={cy + 100} fill="#64748B" fontSize="10">Find missing angles</text>
      </svg>
    );
  };

  // Question 3 Diagram: Cyclic Quadrilateral with Tangent
  const Question3Diagram = () => {
    const cx = 150, cy = 150, r = 65;
    
    // Vertices of cyclic quadrilateral
    const A = { x: cx + r * Math.cos(0), y: cy + r * Math.sin(0) };
    const B = { x: cx + r * Math.cos(Math.PI * 0.4), y: cy + r * Math.sin(Math.PI * 0.4) };
    const C = { x: cx + r * Math.cos(Math.PI * 0.9), y: cy + r * Math.sin(Math.PI * 0.9) };
    const D = { x: cx + r * Math.cos(Math.PI * 1.4), y: cy + r * Math.sin(Math.PI * 1.4) };
    
    // Tangent at A
    const tangentAngle = Math.PI/2;
    const tangentLength = 50;
    const tangentStart = { 
      x: A.x - tangentLength * Math.cos(tangentAngle), 
      y: A.y - tangentLength * Math.sin(tangentAngle) 
    };
    const tangentEnd = { 
      x: A.x + tangentLength * Math.cos(tangentAngle), 
      y: A.y + tangentLength * Math.sin(tangentAngle) 
    };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Cyclic quadrilateral */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`} 
              fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="2,2" />
        
        {/* Tangent at A */}
        <line x1={tangentStart.x} y1={tangentStart.y} x2={tangentEnd.x} y2={tangentEnd.y} 
              stroke="#3B82F6" strokeWidth="3" />
        
        {/* Point T on tangent for reference */}
        <circle cx={tangentStart.x + 15} cy={tangentStart.y} r={2} fill="#3B82F6" />
        <text x={tangentStart.x + 5} y={tangentStart.y - 5} fill="#3B82F6" fontSize="12" fontWeight="bold">T</text>
        
        {/* Diagonals */}
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
        
        {/* Vertices */}
        <circle cx={A.x} cy={A.y} r={3} fill="#3B82F6" />
        <circle cx={B.x} cy={B.y} r={3} fill="#8B5CF6" />
        <circle cx={C.x} cy={C.y} r={3} fill="#8B5CF6" />
        <circle cx={D.x} cy={D.y} r={3} fill="#8B5CF6" />
        
        <text x={A.x + 8} y={A.y + 5} fill="#3B82F6" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 8} y={B.y - 5} fill="#8B5CF6" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x - 15} y={C.y - 5} fill="#8B5CF6" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x - 15} y={D.y + 15} fill="#8B5CF6" fontSize="14" fontWeight="bold">D</text>
        
        {/* Angle arc for tangent-chord angle at A */}
        <path d={`M ${A.x + 20} ${A.y - 10} A 15 15 0 0 0 ${A.x + 10} ${A.y - 20}`} 
              fill="none" stroke="#DC2626" strokeWidth="2" />
        
        {/* Angle arc for alternate segment angle at B */}
        <path d={`M ${B.x - 15} ${B.y + 10} A 12 12 0 0 1 ${B.x - 10} ${B.y + 15}`} 
              fill="none" stroke="#10B981" strokeWidth="2" />
        
        {/* Angle arc for opposite angle at D */}
        <path d={`M ${D.x + 15} ${D.y - 10} A 12 12 0 0 0 ${D.x + 10} ${D.y - 15}`} 
              fill="none" stroke="#F59E0B" strokeWidth="2" />
        
        {/* Angle labels */}
        <text x={A.x + 25} y={A.y - 5} fill="#DC2626" fontSize="11" fontWeight="bold">∠TAC = 50°</text>
        <text x={B.x - 35} y={B.y + 65} fill="#10B981" fontSize="11" fontWeight="bold">∠ABC = ?</text>
        <text x={D.x + 20} y={D.y - 20} fill="#F59E0B" fontSize="11" fontWeight="bold">∠ADC = ?</text>
        
        <text x={cx - 70} y={cy + 90} fill="#64748B" fontSize="10">Cyclic quadrilateral ABCD</text>
        <text x={A.x - 40} y={A.y - 30} fill="#3B82F6" fontSize="10">tangent</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of the alternate segment theorem with these challenging problems
          </p>
        </div>

        <div className="bg-purple-50/60 border border-purple-200 dark:bg-purple-900/40 dark:border-purple-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📐 Alternate Segment Theorem Assessment Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the alternate segment theorem: the angle between a tangent and chord equals the angle in the alternate segment</li>
            <li>• Identify the tangent-chord angle and its corresponding alternate segment angle</li>
            <li>• Show clear geometric reasoning and angle calculations</li>
            <li>• Use the theorem to solve complex angle problems in circles</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Basic Alternate Segment Theorem
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A tangent is drawn to a circle at point T. From T, a chord TA is drawn to another point A on the circle. Point B is on the circle such that angle ABT is in the alternate segment.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>If the angle between the tangent and chord TA is 35°, find angle ABT</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 2: Multiple Chords and Angles
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question2Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A tangent is drawn at point P on a circle. Two chords PQ and PR are drawn from P. Points Q, R, and S are on the circle.
              </p>
              <p className="mb-4 font-medium">
                Given: Angle between tangent and PQ = 40°, Angle between tangent and PR = 35°
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Find angle PSQ using the alternate segment theorem</li>
                <li>Calculate angle PSR in the alternate segment</li>
                <li>Determine angle QPR at point P</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 3: Cyclic Quadrilateral with Tangent
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question3Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                ABCD is a cyclic quadrilateral inscribed in a circle. A tangent is drawn at vertex A through point T. The angle ∠TAC between the tangent and diagonal AC is 50°.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Find angle ∠ABC using the alternate segment theorem</li>
                <li>Calculate angle ∠ADC using properties of cyclic quadrilaterals</li>
                <li>Verify that ∠ABC + ∠ADC = 180° (opposite angles in cyclic quadrilateral)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-alternate-segment-theorem-assessment"
      slideTitle="Alternate Segment Theorem Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="alternate-segment-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 