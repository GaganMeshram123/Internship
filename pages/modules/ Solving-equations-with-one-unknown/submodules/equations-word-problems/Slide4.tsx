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

export default function SolvingPerimeterProblemsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'perimeter-problems-concept', conceptId: 'solving-perimeter-problems', conceptName: 'Solving Perimeter Problems', type: 'learning' }];

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
          Solving Perimeter Problems: Algebra in Action 📏
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Basics */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Perimeter Power-Up</h3>
            
            <div className="mb-4">
                <h4 className="font-semibold">What is Perimeter?</h4>
                <p className="mt-1 text-sm">Perimeter is the total distance around the outside of a shape. Think of it as walking around the edge of a park or building a fence around a yard.</p>
            </div>
            
            <div className="flex-grow">
                <h4 className="font-semibold">Key Formulas</h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-2">
                    <p className="font-bold">Rectangle</p>
                    <p className="text-center text-lg mt-1"><InlineMath>{'P = 2l + 2w'}</InlineMath></p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-4">
                    <p className="font-bold">Square</p>
                    <p className="text-center text-lg mt-1"><InlineMath>{'P = 4s'}</InlineMath></p>
                </div>
            </div>
          </div>

          {/* Right Column: The Worked Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Solve a Problem</h3>
            <p className="font-semibold mb-2 text-sm italic">Problem: "The length of a rectangle is 5 cm more than its width. If the total perimeter is 50 cm, find the dimensions."</p>
            <div className="space-y-3 flex-grow flex flex-col justify-around">
              
              <div>
                <p className="font-semibold">Step 1: Define Your Variables</p>
                <ul className="list-disc pl-5 text-sm">
                    <li>Let the width be <InlineMath>{'w'}</InlineMath>.</li>
                    <li>The length is "5 more than the width," so the length is <InlineMath>{'w + 5'}</InlineMath>.</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Step 2: Set Up the Equation</p>
                <p className="text-sm">Use the formula <InlineMath>{'P = 2l + 2w'}</InlineMath> and substitute what we know.</p>
                <div className="text-center p-2 mt-1 bg-slate-100 dark:bg-slate-900 rounded-md font-bold text-sm"><InlineMath>{'50 = 2(w + 5) + 2w'}</InlineMath></div>
              </div>

              <div>
                <p className="font-semibold">Step 3: Solve the Equation</p>
                <ol className="list-decimal list-inside text-sm space-y-1 mt-1">
                  <li><strong>Distribute:</strong> <InlineMath>{'50 = 2w + 10 + 2w'}</InlineMath></li>
                  <li><strong>Combine terms:</strong> <InlineMath>{'50 = 4w + 10'}</InlineMath></li>
                  <li><strong>Subtract 10:</strong> <InlineMath>{'40 = 4w'}</InlineMath></li>
                  <li><strong>Divide by 4:</strong> <InlineMath>{'10 = w'}</InlineMath></li>
                </ol>
              </div>
              
              <div>
                 <p className="font-semibold">Step 4: Find All Dimensions & Answer</p>
                 <p className="text-sm">The width (<InlineMath>{'w'}</InlineMath>) is 10 cm. The length (<InlineMath>{'w+5'}</InlineMath>) is <InlineMath>{'10+5=15'}</InlineMath> cm.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-2 text-center font-bold">
                    <p>The dimensions are 10 cm by 15 cm.</p>
                    <p className="text-xs font-normal mt-1">(Check: <InlineMath>{'2(10) + 2(15) = 50'}</InlineMath>. It works!)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="solving-perimeter-problems" 
            slideTitle="Solving Perimeter Problems" 
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