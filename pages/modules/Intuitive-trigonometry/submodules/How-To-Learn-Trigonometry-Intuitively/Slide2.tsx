import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function UnitCircleRadiansSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideInteractions: Interaction[] = [
        { id: 'unit-circle-radians-concept', conceptId: 'unit-circle-radians', conceptName: 'The Unit Circle and Radians', type: 'learning', description: 'Understanding the Unit Circle and the concept of radians.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Unit Circle & Radians</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p>The <strong>Unit Circle</strong> is a circle with a radius of exactly <strong>1</strong>. It's the ultimate trig tool because the coordinates of any point on the circle are simply <InlineMath>{'(\\cos\\theta, \\sin\\theta)'}</InlineMath>.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
               <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">A Better Measurement: Radians</h3>
               <p>A <strong>radian</strong> is the angle created when you travel a distance of **one radius** along the circle's edge. It's the natural way to measure angles. A full circle is <InlineMath>2\pi</InlineMath> radians.</p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex items-center justify-center">
             <div className="text-center">
                <p className="font-bold text-lg mb-2">One Radian</p>
                
                <p className="mt-4 text-slate-600 dark:text-slate-400">The angle where the arc length equals the radius.</p>
             </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="trig-intro-unit-circle"
      slideTitle="The Unit Circle & Radians"
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