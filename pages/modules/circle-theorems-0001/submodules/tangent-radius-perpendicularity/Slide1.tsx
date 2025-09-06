import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import TheoremDiagram from "./TheoremDiagram3D";


export default function TangentRadiusPerpendicularitySlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: circle, 2: tangent, 3: radius, 4: right angle, 5: rotate tangent, 6: multiple positions

    const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    setStep(prev => Math.min(6, prev + 1)); // optional: auto-progress diagram
    console.log("Interaction completed:", response);
  };
  const slideInteractions: Interaction[] = [
    {
      id: 'ct-tangent-radius-concept',
      conceptId: 'ct-tangent-radius',
      conceptName: 'Tangent-Radius Relationship',
      type: 'learning',
      description: 'Understanding the perpendicular relationship between tangents and radii'
    },
    {
      id: 'ct-tangent-properties',
      conceptId: 'ct-tangent-properties',
      conceptName: 'Tangent Properties',
      type: 'learning',
      description: 'Understanding the unique properties of tangent lines'
    },
    {
      id: 'ct-universal-perpendicularity',
      conceptId: 'ct-universal-perpendicularity',
      conceptName: 'Universal Perpendicularity',
      type: 'learning',
      description: 'Understanding that this property holds for all tangent points'
    }
  ];

  // The slide content
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Theorem Statement */}
        <div className="space-y-6">
          {/* Main Theorem */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p className="font-medium">
                    A tangent to a circle is <strong>perpendicular</strong> to the radius drawn to the point of tangency.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Mathematical Form:</h3>
                  <p>If line L is tangent to circle at point T, and OT is the radius to T, then:</p>
                  <p className="font-bold text-center mt-2">L ⊥ OT</p>
                  <p className="text-center mt-1">∠OTL = 90°</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Points:</h3>
                  <ul className="space-y-2">
                    <li>• Tangent touches circle at exactly one point</li>
                    <li>• Radius connects center to tangent point</li>
                    <li>• Angle between them is always 90°</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Tangent Properties */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Why Perpendicular?
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Geometric Necessity:</h3>
                  <p>The tangent line represents the shortest distance from an external point to the circle, which must be perpendicular to the radius.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Unique Contact:</h3>
                  <p>Since the tangent touches at exactly one point, any other direction would either miss the circle or intersect it at two points.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Mathematical Proof:</h3>
                  <p className="text-lg">This can be proven using the fact that the radius to the tangent point gives the shortest distance from the center to the tangent line.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Universal Property and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Universal Property */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Universal Property
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Always True:</h3>
                  <p>This perpendicular relationship holds for <strong>every</strong> tangent to any circle, regardless of:</p>
                  <ul className="mt-2 space-y-1 text-lg">
                    <li>• Circle size or radius</li>
                    <li>• Position of tangent point</li>
                    <li>• Orientation of the tangent line</li>
                  </ul>
                </div>
                
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Applications:</h3>
                  <ul className="space-y-1 text-lg">
                    <li>• Constructing tangent lines</li>
                    <li>• Solving tangent-related problems</li>
                    <li>• Engineering and design calculations</li>
                    <li>• Architecture and construction</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Converse is True:</h3>
                  <p className="text-lg">If a line through a point on a circle is perpendicular to the radius at that point, then the line is tangent to the circle.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-tangent-radius-perpendicularity-theorem"
      slideTitle="Tangent-Radius Perpendicularity"
      moduleId="circle-theorems-0001"
      submoduleId="tangent-radius-perpendicularity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 