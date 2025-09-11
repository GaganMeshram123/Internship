import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ProvingIrrationalitySlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentSumProofStep, setCurrentSumProofStep] = useState(0);
    const { isDarkMode } = useThemeContext();

    const proofForSum = [
        {
            title: "Step 1: Assumption",
            text: "Let's prove that if $a$ is a rational number and $b$ is an irrational number, then $a+b$ is always irrational. We assume the opposite: let's assume $a+b$ is rational.",
            math: "\\text{Let } a = \\frac{p}{q} \\text{ (rational), } b = \\text{irrational}. \\text{ Assume } a+b = r = \\frac{m}{n} \\text{ (rational).}",
            result: null
        },
        {
            title: "Step 2: Isolate the Irrational",
            text: "Our goal is to show that this leads to a contradiction. We can rearrange the equation to isolate the irrational number $b$.",
            math: "b = r - a",
            result: null
        },
        {
            title: "Step 3: Express as a Fraction",
            text: "Since $r$ and $a$ are both rational, they can be written as fractions. We can subtract these fractions.",
            math: "b = \\frac{m}{n} - \\frac{p}{q} = \\frac{mq - np}{nq}",
            result: "Since $m, n, p, q$ are integers, the numerator $mq-np$ and the denominator $nq$ are also integers. This means $b$ is a rational number."
        },
        {
            title: "Step 4: The Contradiction",
            text: "Our result states that $b$ is a rational number. This directly contradicts our initial given information that $b$ is an irrational number. Therefore, our assumption must be false.",
            math: "\\text{b is rational} \\implies \\text{Contradiction!}",
            result: "The assumption is false. Therefore, the sum of a rational and an irrational number must be irrational."
        }
    ];

    const currentSumProofContent = proofForSum[currentSumProofStep];

    const slideInteractions: Interaction[] = [
        {
            id: 'proof-sum-rational-irrational',
            conceptId: 'proof-of-sum-irrationality',
            conceptName: 'Proof for Rational + Irrational',
            type: 'learning',
            description: 'Following the step-by-step logic to prove that the sum of a rational and irrational number is irrational'
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
                        Proving that a Sum is Irrational
                    </h3>
                    <div className="space-y-4 text-lg">
                        <p className="leading-relaxed">
                            We've seen that the sum of two irrationals can be either rational or irrational. But what if we add a rational number to an irrational one? Let's use proof by contradiction to show that this sum is **always irrational**.
                        </p>
                        <p className="leading-relaxed">
                            This proof is different from the $\sqrt{2}$ proof, but uses the same fundamental logic.
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-2 text-center">
                            {currentSumProofContent.title}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                            {currentSumProofContent.text}
                        </p>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setCurrentSumProofStep(Math.max(0, currentSumProofStep - 1))}
                            disabled={currentSumProofStep === 0}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                isDarkMode
                                    ? 'bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50'
                            }`}
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={() => setCurrentSumProofStep(Math.min(proofForSum.length - 1, currentSumProofStep + 1))}
                            disabled={currentSumProofStep === proofForSum.length - 1}
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
                            key={currentSumProofStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <BlockMath math={currentSumProofContent.math} />
                            {currentSumProofContent.result && (
                                <p className="mt-4 text-lg">
                                    {currentSumProofContent.result}
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
            slideId="irrationality-sum-proof"
            slideTitle="Proving Sums are Irrational"
            moduleId="irrational-numbers"
            submoduleId="proving-irrationality"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}