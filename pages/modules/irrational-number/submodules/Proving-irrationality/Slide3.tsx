import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ProvingIrrationalitySlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentProofStep, setCurrentProofStep] = useState(0);
    const { isDarkMode } = useThemeContext();

    const proofForSqrt3 = [
        {
            title: "Step 1: Assumption",
            text: "Let's assume $\\sqrt{3}$ is rational, so $\\sqrt{3} = p/q$ where $p, q$ are integers with no common factors.",
            math: "\sqrt{3} = \\frac{p}{q}",
            result: null
        },
        {
            title: "Step 2: Is $p$ a multiple of 3?",
            text: "Squaring both sides gives $3 = p^2/q^2$, or $3q^2 = p^2$. This means $p^2$ is a multiple of 3. Therefore, $p$ must also be a multiple of 3.",
            math: "p^2 = 3q^2 \\implies p=3k",
            result: null
        },
        {
            title: "Step 3: Is $q$ a multiple of 3?",
            text: "Substitute $p=3k$ back into the equation: $3q^2 = (3k)^2 = 9k^2$. Dividing by 3 gives $q^2 = 3k^2$. This means $q^2$ is a multiple of 3, so $q$ must also be a multiple of 3.",
            math: "q^2 = 3k^2 \\implies q=3m",
            result: null
        },
        {
            title: "Step 4: The Contradiction",
            text: "We have shown that both $p$ and $q$ are multiples of 3. This means they have a common factor of 3, which contradicts our initial assumption that $p/q$ was simplified.",
            math: "\\text{p is a multiple of 3 and q is a multiple of 3}",
            result: "The assumption is false. Therefore, $\\sqrt{3}$ is irrational."
        }
    ];

    const currentProofContent = proofForSqrt3[currentProofStep];

    const slideInteractions: Interaction[] = [
        {
            id: 'proof-sqrt3',
            conceptId: 'proof-of-sqrt3',
            conceptName: 'Proof for Square Root of 3',
            type: 'learning',
            description: 'Following the step-by-step logic to prove the irrationality of sqrt(3)'
        }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
                <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">
                        Proving the Irrationality of $\sqrt{3}$
                    </h3>
                    <div className="space-y-4 text-lg">
                        <p className="leading-relaxed">
                            The method of proof by contradiction isn't limited to just $\sqrt{2}$. We can apply the exact same logical structure to prove that other numbers, like $\sqrt{3}$, are also irrational.
                        </p>
                        <p className="leading-relaxed">
                            Walk through the steps below to see how the same pattern of reasoning leads to the same conclusion.
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-2 text-center">
                            {currentProofContent.title}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                            {currentProofContent.text}
                        </p>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setCurrentProofStep(Math.max(0, currentProofStep - 1))}
                            disabled={currentProofStep === 0}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                isDarkMode
                                    ? 'bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50'
                            }`}
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={() => setCurrentProofStep(Math.min(proofForSqrt3.length - 1, currentProofStep + 1))}
                            disabled={currentProofStep === proofForSqrt3.length - 1}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                isDarkMode
                                    ? 'bg-blue-700 hover:bg-blue-600 text-white disabled:opacity-50'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
                            }`}
                        >
                            Next →
                        </button>
                    </div>
                </div>

                <div className={`rounded-lg p-6 shadow-lg relative min-h-[400px] flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProofStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <BlockMath math={currentProofContent.math} />
                            {currentProofContent.result && (
                                <p className="mt-4 text-lg">
                                    {currentProofContent.result}
                                </p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="irrationality-proof-sqrt3"
            slideTitle="Proving Other Irrationals: √3"
            moduleId="irrational-numbers"
            submoduleId="proving-irrationality"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}