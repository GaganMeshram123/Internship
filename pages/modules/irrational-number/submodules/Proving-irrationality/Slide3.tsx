import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function ProvingIrrationalitySlide3Simple() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [{
        id: 'proof-sqrt3-simple',
        conceptId: 'proof-of-sqrt3',
        conceptName: 'Proof for Square Root of 3',
        type: 'learning',
        description: 'Understanding the proof for the irrationality of the square root of 3.'
    }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Outer Container: Left Panel */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Proving the Square Root of 3 is Irrational</h2>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Method</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            The proof for the square root of 3 uses the same "proof by contradiction" method as the one for the square root of 2. The only difference is we now look for multiples of 3.
                        </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 1: Assume the Opposite</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                           We start by assuming the square root of 3 is rational. This means it can be written as a simplified fraction.
                        </p>
                        <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                            <strong>Example:</strong> "The square root of 3 equals p divided by q."
                        </div>
                    </div>
                </div>
                
                {/* Outer Container: Right Panel */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 2: Show the Contradiction</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                           Through algebra, we first prove that 'p' must be a multiple of 3. Then, using that fact, we prove that 'q' must also be a multiple of 3.
                        </p>
                        <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center space-y-1">
                            <div>This shows 'p' is a multiple of 3: "p-squared equals 3 times q-squared"</div>
                            <div>This shows 'q' is a multiple of 3: "q-squared equals 3 times k-squared"</div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 3: Conclude</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                           This is the contradiction! If 'p' and 'q' are both multiples of 3, our fraction was not simplified. This means our initial assumption was wrong.
                        </p>
                         <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                            <strong>Conclusion:</strong> The square root of 3 must be irrational.
                         </div>
                    </div>
                </div>
                
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="irrationality-proof-sqrt3-simple"
            slideTitle="Proving Other Irrationals: √3"
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