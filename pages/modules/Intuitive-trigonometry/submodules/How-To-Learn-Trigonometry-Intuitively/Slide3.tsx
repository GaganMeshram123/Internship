import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

export default function GraphingWavesSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideInteractions: Interaction[] = [
        { id: 'graphing-waves-concept', conceptId: 'trig-graphs', conceptName: 'Graphing Sine and Cosine', type: 'learning', description: 'Understanding how circular motion creates wave graphs.' }
    ];
    
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Making Waves: Graphing Functions</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <p>Trigonometric graphs are just a way to visualize the journey of a point around the Unit Circle.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p>The **sine wave** is a picture of the **height (y-value)** of a point as it travels around the circle. It starts at 0, rises to 1, falls to -1, and repeats.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
               <p>This wave pattern is the fundamental rhythm of the universe, describing everything from **sound waves** to **light waves**.</p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex items-center justify-center">
            <div className="w-full">
                <p className="font-bold text-center text-lg mb-2">"Unrolling" the Circle</p>
                
                <p className="mt-2 text-center text-slate-600 dark:text-slate-400">Tracking the height of the point over time creates the sine wave.</p>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="trig-intro-graphs"
      slideTitle="Making Waves: Graphing Sine & Cosine"
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