import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Renamed component to reflect its new definitional purpose
export default function InterceptsDefinitionSlide() {
    const slideInteractions: Interaction[] = [{ id: 'what-are-intercepts', conceptId: 'what-are-intercepts', conceptName: 'What Are Intercepts? (Definition, Example, Symbol)', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Understanding Intercepts: A Step-by-Step Guide</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Y-Intercept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The y-intercept</h3>
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold">1. Definition:</h4>
                    <p>The <strong>y-intercept</strong> is the single point where the graph of a line crosses the vertical <strong>y-axis</strong>.</p>
                </div>
                <div>
                    <h4 className="font-bold">2. Example with Numbers:</h4>
                    <p>A line might cross the y-axis at <InlineMath>{'(0, 5)'}</InlineMath> or <InlineMath>{'(0, -2)'}</InlineMath>. Notice the first number is always 0.</p>
                </div>
                <div>
                    <h4 className="font-bold">3. Example with Symbols:</h4>
                    <p>Because the x-value is always 0, the general form for any y-intercept is <strong><InlineMath>{'(0, y)'}</InlineMath></strong>.</p>
                </div>
            </div>
          </div>

          {/* Right Column: The X-Intercept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The x-intercept</h3>
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold">1. Definition:</h4>
                    <p>The <strong>x-intercept</strong> is the single point where the graph of a line crosses the horizontal <strong>x-axis</strong>.</p>
                </div>
                <div>
                    <h4 className="font-bold">2. Example with Numbers:</h4>
                    <p>A line might cross the x-axis at <InlineMath>{'(4, 0)'}</InlineMath> or <InlineMath>{'(-7, 0)'}</InlineMath>. Notice the second number is always 0.</p>
                </div>
                <div>
                    <h4 className="font-bold">3. Example with Symbols:</h4>
                    <p>Because the y-value is always 0, the general form for any x-intercept is <strong><InlineMath>{'(x, 0)'}</InlineMath></strong>.</p>
                </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-blue-50 dark:bg-slate-800 rounded-xl p-4 mt-6 border border-blue-300 dark:border-blue-700 shadow-md">
            <h3 className="text-xl font-semibold text-center text-blue-800 dark:text-blue-300">The Golden Rule of Intercepts</h3>
            <p className="text-center mt-2">For any intercept, the <strong>other</strong> letter's value is always 0.</p>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-are-intercepts-structured" 
            slideTitle="What Are Intercepts? (Structured)" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intercepts"
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