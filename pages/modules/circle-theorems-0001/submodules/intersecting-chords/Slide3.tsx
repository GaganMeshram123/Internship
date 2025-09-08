import React, { useState } from 'react';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function IntersectingChordsAssessment() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  // Question 1 Diagram: Basic Intersecting Chords
  const Question1Diagram = () => {
    const cx = 150, cy = 150, r = 80;
    
    // Two intersecting chords
    // Chord AB (from top-right to bottom-left)
    const A = { x: cx + r * Math.cos(Math.PI * 0.15), y: cy + r * Math.sin(Math.PI * 0.15) };
    const B = { x: cx + r * Math.cos(Math.PI * 1.1), y: cy + r * Math.sin(Math.PI * 1.1) };
    
    // Chord CD (from top-left to bottom-right)
    const C = { x: cx + r * Math.cos(Math.PI * 0.7), y: cy + r * Math.sin(Math.PI * 0.7) };
    const D = { x: cx + r * Math.cos(Math.PI * 1.6), y: cy + r * Math.sin(Math.PI * 1.6) };
    
    // Calculate actual intersection point P of lines AB and CD
    const denom = (A.x - B.x) * (C.y - D.y) - (A.y - B.y) * (C.x - D.x);
    const t = ((A.x - C.x) * (C.y - D.y) - (A.y - C.y) * (C.x - D.x)) / denom;
    const P = { 
      x: A.x + t * (B.x - A.x), 
      y: A.y + t * (B.y - A.y) 
    };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx - 15} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Intersecting chords */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="3" />
        <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="#3B82F6" strokeWidth="3" />
        
        {/* Intersection point */}
        <circle cx={P.x} cy={P.y} r={4} fill="#8B5CF6" />
        <text x={P.x + 10} y={P.y - 5} fill="#8B5CF6" fontSize="14" fontWeight="bold">P</text>
        
        {/* Chord endpoints */}
        <circle cx={A.x} cy={A.y} r={3} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={3} fill="#DC2626" />
        <circle cx={C.x} cy={C.y} r={3} fill="#3B82F6" />
        <circle cx={D.x} cy={D.y} r={3} fill="#3B82F6" />
        
        <text x={A.x + 8} y={A.y - 5} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x - 15} y={B.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x - 15} y={C.y - 5} fill="#3B82F6" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x + 5} y={D.y + 15} fill="#3B82F6" fontSize="14" fontWeight="bold">D</text>
        
        {/* Segment labels */}
        <text x={(A.x + P.x)/2 + 5} y={(A.y + P.y)/2 - 5} fill="#DC2626" fontSize="11">AP = 6</text>
        <text x={(P.x + B.x)/2 - 15} y={(P.y + B.y)/2 + 15} fill="#DC2626" fontSize="11">PB = 4</text>
        <text x={(C.x + P.x)/2 - 15} y={(C.y + P.y)/2 - 5} fill="#3B82F6" fontSize="11">CP = 8</text>
        <text x={(P.x + D.x)/2 + 5} y={(P.y + D.y)/2 + 15} fill="#3B82F6" fontSize="11">PD = ?</text>
        
        <text x={cx - 70} y={cy + 110} fill="#8B5CF6" fontSize="11">AP × PB = CP × PD</text>
      </svg>
    );
  };


  // Question 3 Diagram: Chord through Center
  const Question2Diagram = () => {
    const cx = 150, cy = 150, r = 75;
    
    // Diameter (chord through center)
    const A = { x: cx - r, y: cy };
    const B = { x: cx + r, y: cy };
    
    // Another chord intersecting the diameter
    const C = { x: cx + r * Math.cos(Math.PI * 0.4), y: cy + r * Math.sin(Math.PI * 0.4) };
    const D = { x: cx + r * Math.cos(Math.PI * 1.4), y: cy + r * Math.sin(Math.PI * 1.4) };
    
    // Calculate actual intersection point P of diameter AB and chord CD
    const denom = (A.x - B.x) * (C.y - D.y) - (A.y - B.y) * (C.x - D.x);
    const t = ((A.x - C.x) * (C.y - D.y) - (A.y - C.y) * (C.x - D.x)) / denom;
    const P = { 
      x: A.x + t * (B.x - A.x), 
      y: A.y + t * (B.y - A.y) 
    };
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r={3} fill="#374151" />
        <text x={cx - 8} y={cy - 8} fill="#374151" fontSize="14" fontWeight="bold">O</text>
        
        {/* Diameter AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#DC2626" strokeWidth="4" />
        
        {/* Chord CD */}
        <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="#3B82F6" strokeWidth="3" />
        
        {/* Intersection point */}
        <circle cx={P.x} cy={P.y} r={4} fill="#8B5CF6" />
        <text x={P.x + 10} y={P.y + 15} fill="#8B5CF6" fontSize="14" fontWeight="bold">P</text>
        
        {/* Endpoints */}
        <circle cx={A.x} cy={A.y} r={3} fill="#DC2626" />
        <circle cx={B.x} cy={B.y} r={3} fill="#DC2626" />
        <circle cx={C.x} cy={C.y} r={3} fill="#3B82F6" />
        <circle cx={D.x} cy={D.y} r={3} fill="#3B82F6" />
        
        <text x={A.x - 15} y={A.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">A</text>
        <text x={B.x + 8} y={B.y + 15} fill="#DC2626" fontSize="14" fontWeight="bold">B</text>
        <text x={C.x + 8} y={C.y - 5} fill="#3B82F6" fontSize="14" fontWeight="bold">C</text>
        <text x={D.x - 15} y={D.y + 15} fill="#3B82F6" fontSize="14" fontWeight="bold">D</text>
        
        {/* Segment labels */}
        <text x={(A.x + P.x)/2} y={A.y - 15} fill="#DC2626" fontSize="11">AP = 50</text>
        <text x={(P.x + B.x)/2} y={B.y - 15} fill="#DC2626" fontSize="11">PB = 100</text>
        <text x={(C.x + P.x)/2 + 15} y={(C.y + P.y)/2 - 5} fill="#3B82F6" fontSize="11">CP = ?</text>
        <text x={(P.x + D.x)/2 - 15} y={(P.y + D.y)/2 + 15} fill="#3B82F6" fontSize="11">PD = ?</text>
        
        <text x={A.x + 20} y={A.y - 35} fill="#DC2626" fontSize="11">Diameter = 150</text>
        <text x={cx - 60} y={cy + 105} fill="#8B5CF6" fontSize="11">AP × PB = CP × PD</text>
      </svg>
    );
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your understanding of the intersecting chords theorem with these challenging problems
          </p>
        </div>

        <div className="bg-orange-50/60 border border-orange-200 dark:bg-orange-900/40 dark:border-orange-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📐 Intersecting Chords Theorem Assessment Instructions
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Apply the intersecting chords theorem: when two chords intersect inside a circle, AP × PB = CP × PD</li>
            <li>• P is the intersection point, A and B are endpoints of one chord, C and D are endpoints of the other chord</li>
            <li>• Use the theorem to find unknown segment lengths</li>
            <li>• Show clear calculations and geometric reasoning</li>
          </ul>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 1: Basic Intersecting Chords Application
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question1Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Two chords AB and CD intersect at point P inside a circle. Given: AP = 6 cm, PB = 4 cm, and CP = 8 cm.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Calculate the total lengths of chords AB and CD</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question 3: Diameter and Chord Intersection
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Question2Diagram />
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                A diameter AB of length 150 cm intersects chord CD at point P. The diameter is divided by P such that AP = 50 cm and PB = 100 cm.
              </p>
              <p className="mb-4 font-medium">
                Tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>If CP = 30 cm, find PD using the intersecting chords theorem</li>
                <li>Determine the total length of chord CD</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-intersecting-chords-assessment"
      slideTitle="Intersecting Chords Assessment"
      moduleId="circle-theorems-0001"
      submoduleId="intersecting-chords"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 