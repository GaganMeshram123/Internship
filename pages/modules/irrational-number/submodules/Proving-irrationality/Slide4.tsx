import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- Type Definitions for the Visualization ---
type NumberBlockState = {
    id: 'a' | 'b' | 'r' | 'combined';
    label: string;
    type: 'Rational' | 'Irrational';
    pan: 'left' | 'right';
};

type ProofStep = {
    title: string;
    explanation: string;
    blocks: NumberBlockState[];
    isContradiction: boolean;
};

// --- Data Structure for the Balancing Scale Visualization ---
const proofForSum: ProofStep[] = [
    {
        title: "Step 1: The Assumption",
        explanation: "We assume the opposite of what we want to prove. Let's place our assumption—that the sum 'a + b' is a rational number 'r'—onto a balanced scale.",
        blocks: [
            { id: 'a', label: 'a', type: 'Rational', pan: 'left' },
            { id: 'b', label: 'b', type: 'Irrational', pan: 'left' },
            { id: 'r', label: 'r', type: 'Rational', pan: 'right' },
        ],
        isContradiction: false
    },
    {
        title: "Step 2: Isolate the Irrational",
        explanation: "To analyze the irrational number 'b', we need to isolate it. We do this by removing 'a' from the left side and adding its opposite to the right to keep the scale balanced.",
        blocks: [
            { id: 'b', label: 'b', type: 'Irrational', pan: 'left' },
            { id: 'r', label: 'r', type: 'Rational', pan: 'right' },
            { id: 'a', label: '-a', type: 'Rational', pan: 'right' },
        ],
        isContradiction: false
    },
    {
        title: "Step 3: Combine the Rationals",
        explanation: "The difference of two rational numbers ('r' and 'a') is always another rational number. The two rational blocks on the right combine into a single rational block.",
        blocks: [
            { id: 'b', label: 'b', type: 'Irrational', pan: 'left' },
            { id: 'combined', label: 'r - a', type: 'Rational', pan: 'right' },
        ],
        isContradiction: false
    },
    {
        title: "Step 4: The Contradiction",
        explanation: "The scale now shows an irrational number perfectly balanced by a rational number. This is a mathematical impossibility! Our initial assumption must have been false.",
        blocks: [
            { id: 'b', label: 'b', type: 'Irrational', pan: 'left' },
            { id: 'combined', label: 'r - a', type: 'Rational', pan: 'right' },
        ],
        isContradiction: true
    }
];

// --- Child Components for the New Design ---

const ControlPanel: React.FC<{
    step: ProofStep;
    currentStepIndex: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
}> = ({ step, currentStepIndex, totalSteps, onNext, onPrev }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-md flex flex-col h-full">
        <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Proof: Rational + Irrational = Irrational</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">We can prove this property using the logic of a balancing scale.</p>
            <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-4 py-3 min-h-[160px]">
                <AnimatePresence mode="wait">
                    <motion.div key={currentStepIndex} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                        <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">{step.title}</h4>
                        <p className="text-slate-700 dark:text-slate-300">{step.explanation}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
        <div className="mt-auto pt-6">
            <div className="flex justify-between items-center">
                <button onClick={onPrev} disabled={currentStepIndex === 0} className="px-5 py-2 rounded-lg font-bold text-white bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">← Previous</button>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Step {currentStepIndex + 1} of {totalSteps}</span>
                <button onClick={onNext} disabled={currentStepIndex === totalSteps - 1} className="px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Next →</button>
            </div>
        </div>
    </div>
);

const NumberBlock: React.FC<{ block: NumberBlockState }> = ({ block }) => {
    const color = block.type === 'Rational' ? 'bg-blue-500' : 'bg-purple-500';
    return (
        <motion.div
            layoutId={block.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`w-24 h-16 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-lg ${color}`}
        >
            <span className="text-2xl"><InlineMath>{block.label}</InlineMath></span>
            <span className="text-xs opacity-80">{block.type}</span>
        </motion.div>
    );
};

const BalancingScale: React.FC<{ step: ProofStep }> = ({ step }) => (
    <div className="bg-slate-100 dark:bg-slate-900/70 rounded-xl p-6 shadow-inner relative min-h-[450px] flex flex-col items-center justify-center">
        <div className="w-full h-full relative">
            {/* Scale Base and Fulcrum */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-2 bg-slate-400 dark:bg-slate-600 rounded-t-md"></div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2 h-[45%] bg-slate-400 dark:bg-slate-600"></div>

            {/* Scale Beam */}
            <motion.div
                className="absolute top-1/2 left-0 w-full h-2 bg-slate-500 dark:bg-slate-700 rounded-full"
                animate={{ rotate: step.isContradiction ? -4 : 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            >
                {step.isContradiction && <motion.div className="absolute inset-0 bg-red-500 rounded-full" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 1 }} />}
            </motion.div>

            {/* Pan Hangers */}
            <div className="absolute top-1/2 left-[15%] w-0.5 h-[15%] bg-slate-400 dark:bg-slate-600 -translate-y-full"></div>
            <div className="absolute top-1/2 right-[15%] w-0.5 h-[15%] bg-slate-400 dark:bg-slate-600 -translate-y-full"></div>

            {/* Left Pan */}
            <div className="absolute top-[35%] left-[15%] -translate-x-1/2 w-1/3 h-24 bg-slate-200 dark:bg-slate-800 rounded-lg border-b-4 border-slate-400 dark:border-slate-600 flex items-center justify-center gap-2 p-2">
                <AnimatePresence>
                    {step.blocks.filter(b => b.pan === 'left').map(block => <NumberBlock key={block.id} block={block} />)}
                </AnimatePresence>
            </div>
            
            {/* Right Pan */}
            <div className="absolute top-[35%] right-[15%] translate-x-1/2 w-1/3 h-24 bg-slate-200 dark:bg-slate-800 rounded-lg border-b-4 border-slate-400 dark:border-slate-600 flex items-center justify-center gap-2 p-2">
                <AnimatePresence>
                    {step.blocks.filter(b => b.pan === 'right').map(block => <NumberBlock key={block.id} block={block} />)}
                </AnimatePresence>
            </div>
        </div>
    </div>
);

// --- Main Slide Component ---
export default function ProvingIrrationalitySlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentSumProofStep, setCurrentSumProofStep] = useState(0);
    const { isDarkMode } = useThemeContext();

    const handleNext = () => setCurrentSumProofStep(prev => Math.min(prev + 1, proofForSum.length - 1));
    const handlePrev = () => setCurrentSumProofStep(prev => Math.max(prev - 1, 0));

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideInteractions: Interaction[] = [{
        id: 'proof-sum-rational-irrational',
        conceptId: 'proof-of-sum-irrationality',
        conceptName: 'Proof for Rational + Irrational',
        type: 'learning',
        description: 'Following the step-by-step logic to prove that the sum of a rational and irrational number is irrational'
    }];

    const slideContent = (
        <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <ControlPanel
                    step={proofForSum[currentSumProofStep]}
                    currentStepIndex={currentSumProofStep}
                    totalSteps={proofForSum.length}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
                <BalancingScale
                    step={proofForSum[currentSumProofStep]}
                />
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
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}