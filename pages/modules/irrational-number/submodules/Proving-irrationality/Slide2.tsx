import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
// Import KaTeX for rendering math symbols
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- Main Slide Component ---
export default function VisualizingProofWithSymbolsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
        {
            id: 'visualizing-proof-symbols',
            conceptId: 'proof-of-sqrt2-viz',
            conceptName: 'Visualizing the Proof for Sqrt(2) with Symbols',
            type: 'learning',
            description: 'Understanding the steps of the proof by contradiction for the square root of 2.'
        }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Outer Container: Left Panel */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Visualizing the Proof</h2>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 1: The Assumption</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            We start by assuming that the square root of 2 is rational. This means we can write it as a simplified fraction where 'p' and 'q' have no common factors.
                        </p>
                        <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                           <strong>Example:</strong> <InlineMath>{'\\sqrt{2} = \\frac{p}{q}'}</InlineMath>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 2: The First Clue</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Following the logic, we find that 'p' squared must be an even number, which means 'p' itself must also be even.
                        </p>
                        <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                           <strong>Example:</strong> <InlineMath>{'p^2 = 2q^2'}</InlineMath>
                        </div>
                    </div>
                </div>
                
                {/* Outer Container: Right Panel */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 3: The Second Clue</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Since 'p' is even, further logic shows that 'q' squared must also be an even number, which means 'q' must also be even.
                        </p>
                        <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                           <strong>Example:</strong> <InlineMath>{'q^2 = 2k^2'}</InlineMath>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 4: The Paradox! 💥</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                           Here is the contradiction. If both 'p' and 'q' are even, the fraction was not simplified. Our initial assumption must be wrong.
                        </p>
                         <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                            <strong>Conclusion:</strong> The square root of 2 is irrational.
                         </div>
                    </div>
                </div>
                
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="visualizing-proof-symbols"
            slideTitle="Visualizing the Proof"
            moduleId="irrational-numbers"
            submoduleId="proofs"
            interactions={localInteractions}
        >
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}