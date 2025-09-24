import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Helper function to create the initial state object
const createInitialInteractions = (interactions: Interaction[]): Record<string, InteractionResponse> => {
    return interactions.reduce((acc, interaction) => {
        acc[interaction.id] = {
            interactionId: interaction.id,
            value: '',
            timestamp: 0,
        };
        return acc;
    }, {} as Record<string, InteractionResponse>);
};

export default function ConsecutiveIntegers() {
    const slideInteractions: Interaction[] = [{ id: 'consecutive-integers-concept', conceptId: 'consecutive-integers', conceptName: 'Sum of Consecutive Integers', type: 'learning' }];
    
    const [localInteractions, setLocalInteractions] = useState(() => createInitialInteractions(slideInteractions));

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">
          Number Detectives: Solving with Consecutive Integers 🕵️‍♂️
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Setup */}
          <div className="space-y-6 flex flex-col">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">What Does 'Consecutive' Mean?</h3>
              <p>
                Consecutive integers are numbers that follow each other in order, like steps on a staircase. Each number is one more than the last.
              </p>
              <p className="mt-2 text-sm">e.g., 5, 6, 7 or -2, -1, 0, 1</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Algebraic Secret Code</h3>
              <p>To solve these problems, we use variables. Here's the code:</p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-2">
                <h4 className="font-semibold">Consecutive Integers</h4>
                <ul className="list-disc pl-5 text-sm">
                    <li>First Number: <InlineMath>{'x'}</InlineMath></li>
                    <li>Second Number: <InlineMath>{'x + 1'}</InlineMath></li>
                    <li>Third Number: <InlineMath>{'x + 2'}</InlineMath></li>
                </ul>
              </div>
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-4">
                <h4 className="font-semibold">Consecutive EVEN or ODD Integers</h4>
                <ul className="list-disc pl-5 text-sm">
                    <li>First Number: <InlineMath>{'x'}</InlineMath></li>
                    <li>Second Number: <InlineMath>{'x + 2'}</InlineMath></li>
                    <li>Third Number: <InlineMath>{'x + 4'}</InlineMath></li>
                </ul>
              </div>
            </div>
            
          </div>

          {/* Right Column: The Worked Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Worked Example</h3>
            <p className="font-semibold mb-2">Problem: The sum of three consecutive integers is 33. What are the numbers?</p>
            <div className="space-y-3 flex-grow flex flex-col justify-around">
              
              <div>
                <p className="font-semibold">Step 1: Set Up the Equation</p>
                <p className="text-sm">The numbers are <InlineMath>{'x, x+1, \\text{ and } x+2'}</InlineMath>. "Sum" means we add them.</p>
                <div className="text-center p-2 mt-1 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'(x) + (x + 1) + (x + 2) = 33'}</InlineMath></div>
              </div>

              <div>
                <p className="font-semibold">Step 2: Simplify the Equation</p>
                <p className="text-sm">Combine all the 'x' terms and all the number terms.</p>
                <div className="text-center p-2 mt-1 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'3x + 3 = 33'}</InlineMath></div>
              </div>

              <div>
                <p className="font-semibold">Step 3: Solve for 'x'</p>
                <p className="text-sm">Now it's a simple two-step equation.</p>
                <div className="text-center p-2 mt-1 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'3x = 30 \\implies x = 10'}</InlineMath></div>
              </div>

              <div>
                <p className="font-semibold">Step 4: Find All the Integers</p>
                <p className="text-sm">Remember, 'x' is only the first number. Find the others.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-1 text-center font-bold">
                  <p>The numbers are 10, 11, and 12.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="consecutive-integers" 
            slideTitle="Sum of Consecutive Integers" 
            moduleId="solving-equations-one-unknown" 
            submoduleId="equations-word-problems"
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