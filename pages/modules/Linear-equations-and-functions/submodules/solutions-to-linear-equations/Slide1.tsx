import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SolutionsToLinearEquationsSlide1() {
    const slideInteractions: Interaction[] = [{ id: 'what-is-a-solution', conceptId: 'what-is-a-solution', conceptName: 'What is a Solution to a Linear Equation?', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">What is a "Solution" to a Linear Equation?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Concept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Equations with Two Variables</h3>
            <p>So far, you've solved equations with just one variable, like 'x'. Linear equations often have **two variables**, usually 'x' and 'y'.</p>
            <p className="mt-2 text-sm">Think of it like an input/output machine. You put a value in for 'x', and the equation gives you a value out for 'y'.</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">What is a Solution?</h4>
                <p className="mt-2">A solution isn't just one number. It's a **pair of numbers**—an ordered pair <InlineMath>{'(x, y)'}</InlineMath>—that makes the equation a true statement.</p>
            </div>
          </div>

          {/* Right Column: The Visual */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">A Solution is a Point on the Line</h3>
            <p>The graph of a linear equation is a picture of ALL its possible solutions.</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of y = x + 1, showing points (1, 2) and (2, 3) on the line, and point (2, 1) off the line]</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 mt-4 rounded-lg text-sm">
                <ul className="list-disc pl-5">
                    <li>The point <InlineMath>{'(2, 3)'}</InlineMath> is **on the line**, so it **is a solution**.</li>
                    <li>The point <InlineMath>{'(2, 1)'}</InlineMath> is **not on the line**, so it **is not a solution**.</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-a-solution" 
            slideTitle="What is a Solution to a Linear Equation?" 
            moduleId="linear-equations-and-functions" 
            submoduleId="solutions-to-linear-equations"
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