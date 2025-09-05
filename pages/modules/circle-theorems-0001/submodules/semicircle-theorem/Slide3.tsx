import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function SemicircleTheoremAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Question 1 Diagram: Right Triangle in Semicircle
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Diameter endpoints
    const A = { x: cx - r, y: cy };
    const B = { x: cx + r, y: cy };
    
    // Point on semicircle
    const angleP = Math.PI * 0.7;
    const P = { x: cx + r * Math.cos(angleP), y: cy + r * Math.sin(angleP) };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx + 8} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Diameter AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="4" />
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <text x={A.x - 15} y={A.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 10} y={B.y - 10} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        
        {/* Point P and triangle */}
        <circle cx={P.x} cy={P.y} r={4} fill="#3B82F6" />
        <text x={P.x + 10} y={P.y - 10} fill="#3B82F6" fontSize="14" fontWeight="bold">P</text>
        <line x1={A.x} y1={A.y} x2={P.x} y2={P.y} stroke="#3B82F6" strokeWidth="2" />
        <line x1={B.x} y1={B.y} x2={P.x} y2={P.y} stroke="#3B82F6" strokeWidth="2" />
        
        {/* Right angle indicator */}
        <path d={`M ${P.x - 12} ${P.y + 8} L ${P.x - 12} ${P.y - 4} L ${P.x} ${P.y - 4}`} 
              fill="none" stroke="#3B82F6" strokeWidth="2" />
        
        {/* Labels */}
        <text x={cx - 60} y={cy + 110} fill="#3B82F6" fontSize="12" fontWeight="bold">∠APB = 90°</text>
        <text x={cx + 20} y={cy + 25} fill="#DC2626" fontSize="12" fontWeight="bold">AB = diameter</text>
      </svg>
    );
  };

  // Question 2 Diagram: Thales Circle Construction
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 60;
    
    // Given line segment
    const A = { x: cx - 80, y: cy + 40 };
    const B = { x: cx + 80, y: cy + 40 };
    
    // Thales circle (semicircle on AB as diameter)
    const circleCx = (A.x + B.x) / 2;
    const circleCy = (A.y + B.y) / 2;
    const circleR = Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2) / 2;
    
    // Sample points on semicircle
    const points = [
      { angle: Math.PI * 0.2, label: "P₁" },
      { angle: Math.PI * 0.5, label: "P₂" },
      { angle: Math.PI * 0.8, label: "P₃" }
    ];
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Thales semicircle */}
        <path d={`M ${A.x} ${A.y} A ${circleR} ${circleR} 0 0 0 ${B.x} ${B.y}`} 
              fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Line segment AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="4" />
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <text x={A.x - 15} y={A.y + 20} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 10} y={B.y + 20} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        
        {/* Sample points showing right angles */}
        {points.map((point, i) => {
          const P = {
            x: circleCx + circleR * Math.cos(point.angle),
            y: circleCy + circleR * Math.sin(point.angle)
          };
          return (
            <g key={i}>
              <circle cx={P.x} cy={P.y} r={3} fill="#3B82F6" />
              <text x={P.x + 10} y={P.y - 5} fill="#3B82F6" fontSize="12" fontWeight="bold">{point.label}</text>
              <line x1={A.x} y1={A.y} x2={P.x} y2={P.y} stroke="#3B82F6" strokeWidth="1" strokeDasharray="2,2" />
              <line x1={B.x} y1={B.y} x2={P.x} y2={P.y} stroke="#3B82F6" strokeWidth="1" strokeDasharray="2,2" />
            </g>
          );
        })}
        
        <text x={cx - 80} y={cy - 60} fill="#64748B" fontSize="12" fontWeight="bold">Thales Circle</text>
        <text x={cx - 90} y={cy + 80} fill="#3B82F6" fontSize="11">All angles are 90°</text>
      </svg>
    );
  };

  // Question 3 Diagram: Semicircle in Rectangle
  const Question3Diagram = () => {
    const cx = 150, cy = 150;
    
    // Rectangle ABCD
    const rectWidth = 120;
    const rectHeight = 80;
    const A = { x: cx - rectWidth/2, y: cy - rectHeight/2 };
    const B = { x: cx + rectWidth/2, y: cy - rectHeight/2 };
    const C = { x: cx + rectWidth/2, y: cy + rectHeight/2 };
    const D = { x: cx - rectWidth/2, y: cy + rectHeight/2 };
    
    // Semicircle with AC as diameter
    const circleCx = (A.x + C.x) / 2;
    const circleCy = (A.y + C.y) / 2;
    const circleR = Math.sqrt((C.x - A.x) ** 2 + (C.y - A.y) ** 2) / 2;
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Rectangle */}
        <rect x={A.x} y={A.y} width={rectWidth} height={rectHeight} 
              fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Semicircle on diagonal AC */}
        <circle cx={circleCx} cy={circleCy} r={circleR} 
                fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,4" />
        
        {/* Rectangle vertices */}
        <circle cx={A.x} cy={A.y} r={4} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={4} fill="#DC2626" />
        <circle cx={C.x} cy={C.y} r={4} fill="#DC2626" />
        <circle cx={D.x} cy={D.y} r={4} fill="#DC2626" />
        
        <text x={A.x - 15} y={A.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 5} y={B.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x + 5} y={C.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x - 15} y={D.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">D</text>
        
        {/* Diagonal AC */}
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#DC2626" strokeWidth="3" />
        
        {/* Lines to show angles */}
        <line x1={B.x} y1={B.y} x2={A.x} y2={A.y} stroke="#3B82F6" strokeWidth="2" />
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#3B82F6" strokeWidth="2" />
        <line x1={D.x} y1={D.y} x2={A.x} y2={A.y} stroke="#10B981" strokeWidth="2" />
        <line x1={D.x} y1={D.y} x2={C.x} y2={C.y} stroke="#10B981" strokeWidth="2" />
        
        {/* Right angle indicators */}
        <path d={`M ${B.x - 8} ${B.y + 8} L ${B.x - 8} ${B.y + 16} L ${B.x} ${B.y + 16}`} 
              fill="none" stroke="#3B82F6" strokeWidth="2" />
        <path d={`M ${D.x + 8} ${D.y - 8} L ${D.x + 8} ${D.y - 16} L ${D.x} ${D.y - 16}`} 
              fill="none" stroke="#10B981" strokeWidth="2" />
        
        <text x={B.x + 10} y={B.y + 25} fill="#3B82F6" fontSize="12" fontWeight="bold">∠ABC = ?</text>
        <text x={D.x - 35} y={D.y - 20} fill="#10B981" fontSize="12" fontWeight="bold">∠ADC = ?</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of the semicircle theorem with these challenging problems
          </p>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 dark:bg-amber-900/40 dark:border-amber-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📐 Semicircle Theorem Assessment Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the semicircle theorem: angles subtended by a diameter are always 90°</li>
            <li>• Show clear geometric reasoning and construction steps</li>
            <li>• Include detailed diagrams with all relevant measurements</li>
            <li>• Justify each step using established circle theorems</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Right Triangle Properties
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                In a circle with center O, AB is a diameter and P is any point on the circle.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>If AB = 10 cm and AP = 6 cm, find the length of BP</li>
                <li>Find the maximum possible area of triangle APB and determine where P should be positioned</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 2: Rectangle and Semicircle Application
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question3Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                ABCD is a rectangle, and AC is a diagonal. A semicircle is drawn with AC as diameter.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Prove that points B and D lie exactly on this semicircle</li>
                <li>Find the angles ∠ABC and ∠ADC using the semicircle theorem</li>
                <li>If the rectangle has dimensions 6 cm × 8 cm, find the radius of the semicircle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-semicircle-theorem-assessment"
      slideTitle="Semicircle Theorem Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="semicircle-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 