import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function PythagoreanConnectionSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideInteractions: Interaction[] = [
        { id: 'pythagorean-connection-concept', conceptId: 'pythagorean-identity', conceptName: 'The Pythagorean Connection', type: 'learning', description: 'Understanding the Pythagorean Identity through the Unit Circle.' }
    ];
    
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Pythagorean Connection</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <p>The most important trigonometric identity is not a new rule to memorize—it's a concept you already know!</p>
            <ol className="list-decimal list-inside space-y-2">
                <li>Start with the Pythagorean Theorem: <InlineMath>{'a^2 + b^2 = c^2'}</InlineMath>.</li>
                <li>On the Unit Circle, the sides are the x and y coordinates, and the hypotenuse is the radius (which is 1). So, <InlineMath>{'x^2 + y^2 = 1^2'}</InlineMath>.</li>
                <li>Since we know <InlineMath>{'x = \\cos\\theta'}</InlineMath> and <InlineMath>{'y = \\sin\\theta'}</InlineMath>, we just substitute them in.</li>
            </ol>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p className="text-xl font-bold text-center text-slate-800 dark:text-slate-200">
                <BlockMath>{'\\sin^2\\theta + \\cos^2\\theta = 1'}</BlockMath>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex items-center justify-center">
            <div className="w-full">
                 
                 <p className="mt-2 text-center text-slate-600 dark:text-slate-400">The sides of the triangle are cosθ, sinθ, and 1.</p>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="trig-intro-pythagorean"
      slideTitle="The Pythagorean Connection"
      moduleId="intuitive-trigonometry"
      submoduleId="how-to-learn-trigonometry-intuitively"
      interactions={localInteractions}
    >
       <TrackedInteraction 
        interaction={slideInteractions[0]}
        onInteractionComplete={handleInteractionComplete}
       >
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}