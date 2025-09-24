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
    const [quizChoice, setQuizChoice] = useState('');

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };
    
    const quizAnswer: string = 'B';
    const isQuizAttempted = quizChoice !== '';

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">
          A Guide to Solving Consecutive Integer Problems 📝
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Setup */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Algebraic Setup</h3>
                <p>Before solving, know the "secret codes" to represent the numbers.</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4">
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
              <p className="text-xs mb-2">Even/odd numbers in a row (e.g., 8, 10, 12)</p>
              <ul className="list-none space-y-1">
                  <li>First Number: <InlineMath>{'x'}</InlineMath></li>
                  <li>Second Number: <InlineMath>{'x + 2'}</InlineMath></li>
                  <li>Third Number: <InlineMath>{'x + 4'}</InlineMath></li>
              </ul>
              <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-xs">
                <strong>Why is the setup the same?</strong> To get from one odd (or even) number to the next, you always add 2!
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">Test Your Skills!</h4>
                <p className="text-sm my-2">"The sum of two consecutive ODD integers is 24." Which is the correct equation?</p>
                <div className="space-y-2 text-sm">
                    <button onClick={() => setQuizChoice('A')} className={`w-full p-2 rounded text-left ${isQuizAttempted && quizAnswer !== 'A' ? 'bg-slate-200 dark:bg-slate-700 opacity-50' : 'bg-slate-200 dark:bg-slate-700'}`}>A) <InlineMath>{'x + (x+1) = 24'}</InlineMath></button>
                    <button onClick={() => setQuizChoice('B')} className={`w-full p-2 rounded text-left ${isQuizAttempted && quizAnswer !== 'B' ? 'bg-slate-200 dark:bg-slate-700 opacity-50' : 'bg-slate-200 dark:bg-slate-700'}`}>B) <InlineMath>{'x + (x+2) = 24'}</InlineMath></button>
                    <button onClick={() => setQuizChoice('C')} className={`w-full p-2 rounded text-left ${isQuizAttempted && quizAnswer !== 'C' ? 'bg-slate-200 dark:bg-slate-700 opacity-50' : 'bg-slate-200 dark:bg-slate-700'}`}>C) <InlineMath>{'x + 2x = 24'}</InlineMath></button>
                </div>
                {isQuizAttempted && (
                    quizChoice === quizAnswer 
                    ? <p className="text-xs font-bold text-blue-600 dark:text-blue-400 text-center mt-2">Correct! Odd integers are 2 apart.</p>
                    : <p className="text-xs font-bold text-slate-500 text-center mt-2">Not quite. Remember, consecutive odd integers are 2 apart, so we use x and x+2.</p>
                )}
            </div>
          </div>

          {/* Right Column: The Process */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The 5-Step Game Plan</h3>
            <div className="space-y-2">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg shadow-sm"><p><strong>1. Identify:</strong> What kind of integers are needed?</p></div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg shadow-sm"><p><strong>2. Translate:</strong> Use the "secret codes" to write an equation.</p></div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg shadow-sm"><p><strong>3. Solve:</strong> Find the value of <InlineMath>{'x'}</InlineMath>.</p></div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg shadow-sm border border-blue-500"><p><strong>4. Answer: ❗️</strong> Use <InlineMath>{'x'}</InlineMath> to find **all** numbers.</p></div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg shadow-sm"><p><strong>5. Check:</strong> Check if your final numbers work.</p></div>
            </div>

            <hr className="my-4 border-slate-300 dark:border-slate-600" />

            <div className="flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Apply the Plan: Worked Example</h3>
                <p className="text-sm italic mb-2">Problem: "The sum of three consecutive even integers is 66. Find the integers."</p>
                <div className="space-y-2 text-sm">
                    <p><strong>1. Identify:</strong> We need three consecutive <strong>even</strong> integers.</p>
                    <p><strong>2. Translate:</strong> The numbers are <InlineMath>{'x, x+2, \\text{ and } x+4'}</InlineMath>. The equation is <InlineMath>{'(x) + (x+2) + (x+4) = 66'}</InlineMath>.</p>
                    <p><strong>3. Solve:</strong> 
                        <span className="block pl-4">
                           <InlineMath>{'3x + 6 = 66 \\implies 3x = 60 \\implies x = 20'}</InlineMath>
                        </span>
                    </p>
                    <p><strong>4. Answer:</strong> The first number (<InlineMath>{'x'}</InlineMath>) is 20. The others are <InlineMath>{'20+2=22'}</InlineMath> and <InlineMath>{'20+4=24'}</InlineMath>.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-center mt-auto">
                    <p className="font-bold">The integers are 20, 22, and 24.</p>
                    <p className="text-xs mt-1"><strong>5. Check:</strong> <InlineMath>{'20 + 22 + 24 = 66'}</InlineMath>. It works!</p>
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