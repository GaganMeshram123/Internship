import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function TrigAsPercentagesSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    { id: 'trig-as-percentages-concept', conceptId: 'trig-percentages', conceptName: 'Trigonometry as Percentages', type: 'learning', description: 'Understanding sine and cosine as percentages of a circle\'s radius.' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">A New Perspective: Trig as Percentages</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <p>The most intuitive way to understand trigonometry is to think about a circle. Imagine you are at the center of a dome.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p><strong>Cosine (cos)</strong> is the percentage of your <strong>horizontal distance (x-axis)</strong> from the center.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p><strong>Sine (sin)</strong> is the percentage of your <strong>vertical distance (y-axis)</strong> from the center.</p>
            </div>
            <p>This is why <InlineMath>{'\\cos(0^\\circ) = 1'}</InlineMath> (100% horizontal) and <InlineMath>{'\\sin(90^\\circ) = 1'}</InlineMath> (100% vertical).</p>
          </div>
        </div>
        
        {/* Right Panel: Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex items-center justify-center">
             <div className="relative w-64 h-64 border-2 border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center">
                <div className="absolute w-full h-px bg-slate-300 dark:bg-slate-700"></div>
                <div className="absolute h-full w-px bg-slate-300 dark:bg-slate-700"></div>
                {/* Angle line */}
                <div className="absolute w-1/2 h-0.5 bg-blue-500 top-1/2 left-1/2 origin-left transform -rotate-45"></div>
                {/* Dotted lines */}
                <div className="absolute top-[calc(50%+1.5rem)] left-[calc(50%-0.2rem)] w-[calc(35%+0.2rem)] border-t-2 border-dashed border-red-500"></div>
                <div className="absolute left-[calc(50%+1.5rem)] top-[calc(50%-0.2rem)] h-[calc(35%+0.2rem)] border-l-2 border-dashed border-green-500 transform -rotate-180"></div>
                <div className="absolute top-[86%] left-[70%] text-red-500 font-bold text-xl"><InlineMath>{'\\cos(\\theta)'}</InlineMath></div>
                <div className="absolute top-[70%] left-[86%] text-green-500 font-bold text-xl rotate-90"><InlineMath>{'\\sin(\\theta)'}</InlineMath></div>
             </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="trig-intro-percentages"
      slideTitle="Trig as Percentages"
      moduleId="intuitive-trigonometry"
      submoduleId="how-to-learn-trigonometry-intuitively"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}