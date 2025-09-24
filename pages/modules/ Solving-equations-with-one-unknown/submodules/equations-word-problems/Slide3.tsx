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

export default function SolvingConsecutiveIntegerProblemsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'consecutive-integer-concept', conceptId: 'solving-consecutive-integer-problems', conceptName: 'Solving Consecutive Integer Problems', type: 'learning' }];

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
          A Guide to Solving Consecutive Integer Problems 📝
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Setup */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Algebraic Setup</h3>
            <p className="mb-4">Before solving, you need to know the "secret codes" to represent the numbers you're looking for.</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mb-4">
              <h4 className="font-semibold">Consecutive Integers</h4>
              <p className="text-xs mb-2">Numbers in a row (e.g., 4, 5, 6)</p>
              <ul className="list-none space-y-1">
                  <li>First Number: <InlineMath>{'x'}</InlineMath></li>
                  <li>Second Number: <InlineMath>{'x + 1'}</InlineMath></li>
                  <li>Third Number: <InlineMath>{'x + 2'}</InlineMath></li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4">
              <h4 className="font-semibold">Consecutive EVEN or ODD Integers</h4>
              <p className="text-xs mb-2">Even/odd numbers in a row (e.g., 8, 10, 12 or 7, 9, 11)</p>
              <ul className="list-none space-y-1">
                  <li>First Number: <InlineMath>{'x'}</InlineMath></li>
                  <li>Second Number: <InlineMath>{'x + 2'}</InlineMath></li>
                  <li>Third Number: <InlineMath>{'x + 4'}</InlineMath></li>
              </ul>
            </div>
          </div>

          {/* Right Column: The Process */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The 5-Step Game Plan</h3>
            <p className="mb-4">Follow these steps in order for any consecutive integer word problem.</p>
            
            <div className="space-y-4 flex-grow flex flex-col justify-center">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg shadow-sm">
                <p><strong className="text-lg">1. Identify:</strong> What kind of integers are you looking for? (Consecutive, Even, or Odd?)</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg shadow-sm">
                <p><strong className="text-lg">2. Translate:</strong> Use the "secret codes" to turn the word problem into an algebraic equation.</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg shadow-sm">
                <p><strong className="text-lg">3. Solve:</strong> Find the value of <InlineMath>{'x'}</InlineMath>.</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg shadow-sm">
                <p><strong className="text-lg">4. Answer:</strong> Use <InlineMath>{'x'}</InlineMath> to find **all** the numbers the question asks for. (Don't just stop at <InlineMath>{'x'}</InlineMath>!)</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg shadow-sm">
                <p><strong className="text-lg">5. Check:</strong> Reread the problem and check if your final numbers work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="solving-consecutive-integer-problems" 
            slideTitle="Solving Consecutive Integer Problems" 
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