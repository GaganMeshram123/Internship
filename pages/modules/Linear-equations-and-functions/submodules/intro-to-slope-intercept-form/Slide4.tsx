import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function IntroSlopeInterceptSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'identifying-m-and-b', conceptId: 'identifying-m-and-b', conceptName: 'Identifying m and b', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Identifying 'm' and 'b' in Equations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Simple Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Spotting 'm' and 'b'</h3>
            <div className="space-y-4">
                <p><strong>Equation:</strong> <InlineMath>{'y = 5x + 8'}</InlineMath><br/>➡️ <InlineMath>{'m = 5'}</InlineMath>, <InlineMath>{'b = 8'}</InlineMath></p>
                <hr/>
                <p><strong>Equation:</strong> <InlineMath>{'y = -2x - 3'}</InlineMath><br/>➡️ <InlineMath>{'m = -2'}</InlineMath>, <InlineMath>{'b = -3'}</InlineMath></p>
                 <hr/>
                <p><strong>Equation:</strong> <InlineMath>{'y = x + 6'}</InlineMath><br/><span className="text-xs italic">(Remember, x is the same as 1x)</span><br/>➡️ <InlineMath>{'m = 1'}</InlineMath>, <InlineMath>{'b = 6'}</InlineMath></p>
                 <hr/>
                <p><strong>Equation:</strong> <InlineMath>{'y = -x'}</InlineMath><br/><span className="text-xs italic">(This is y = -1x + 0)</span><br/>➡️ <InlineMath>{'m = -1'}</InlineMath>, <InlineMath>{'b = 0'}</InlineMath></p>
            </div>
          </div>

          {/* Right Column: Tricky Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Watch Out for These!</h3>
             <div className="space-y-4">
                <p><strong>Equation:</strong> <InlineMath>{'y = 7'}</InlineMath><br/><span className="text-xs italic">(This is y = 0x + 7)</span><br/>➡️ <InlineMath>{'m = 0'}</InlineMath> (a flat line), <InlineMath>{'b = 7'}</InlineMath></p>
                <hr/>
                <p><strong>Equation:</strong> <InlineMath>{'y = 4 + 3x'}</InlineMath><br/><span className="text-xs italic">(Rearrange to y = 3x + 4)</span><br/>➡️ <InlineMath>{'m = 3'}</InlineMath>, <InlineMath>{'b = 4'}</InlineMath></p>
                 <hr/>
                <p><strong>Equation:</strong> <InlineMath>{'2y = 8x + 10'}</InlineMath><br/><span className="text-xs italic">(Equation must start with 'y', so divide everything by 2)</span><br/>➡️ <InlineMath>{'y = 4x + 5'}</InlineMath><br/>➡️ <InlineMath>{'m = 4'}</InlineMath>, <InlineMath>{'b = 5'}</InlineMath></p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="identifying-m-and-b" 
            slideTitle="Identifying m and b in Equations" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intro-to-slope-intercept-form"
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