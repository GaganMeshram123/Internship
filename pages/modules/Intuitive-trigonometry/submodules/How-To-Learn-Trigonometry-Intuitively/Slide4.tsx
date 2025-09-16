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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Pythagorean Connection</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <p>The most important trigonometric identity is not a new rule to memorize—it's a concept you already know!</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
               <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 1: The Pythagorean Theorem</h3>
               <p>For any right-angled triangle, the relationship between the sides is always <InlineMath>{'a^2 + b^2 = c^2'}</InlineMath>.</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
               <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 2: The Unit Circle Connection</h3>
                <p>On the Unit Circle, the sides are simply the x-coordinate (<InlineMath>\cos\theta</InlineMath>), the y-coordinate (<InlineMath>\sin\theta</InlineMath>), and the radius (1). When we substitute these into the Pythagorean theorem, we get the final identity.</p>
            </div>

             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p className="text-xl font-bold text-center text-slate-800 dark:text-slate-200">
                <BlockMath>{'\\sin^2\\theta + \\cos^2\\theta = 1'}</BlockMath>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full space-y-6">
            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The Classic Triangle</h3>
                {/* Placeholder for the image you provided */}
                <div className="flex justify-center p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                                    </div>
            </div>
             <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The Triangle on the Unit Circle</h3>
                 <div className="flex justify-center p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                                      </div>
                 <p className="mt-2 text-center text-slate-600 dark:text-slate-400">Notice the sides are now labeled as <InlineMath>\cos\theta</InlineMath>, <InlineMath>\sin\theta</InlineMath>, and 1.</p>
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