import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- Type Definitions for the Visualization ---
type NumberState = {
    id: 'p' | 'q';
    isAnalyzed: boolean; // Has it been proven to be a multiple of 3?
};

type RuleState = {
    isViolated: boolean;
};

type ProofStep = {
    title: string;
    explanation: string;
    equation: string;
    numberStates: { p: NumberState, q: NumberState };
    ruleState: RuleState;
};

// --- Data Structure Focused on the Mathematical Concept ---
const proofSteps: ProofStep[] = [
    {
        title: "Step 1: The Assumption and The Rule",
        explanation: "We assume √3 is a simplified fraction p/q. This sets our fundamental rule: 'p' and 'q' cannot both be divisible by 3. They start in the 'Untested' area.",
        equation: "\\sqrt{3} = \\frac{p}{q}",
        numberStates: { p: { id: 'p', isAnalyzed: false }, q: { id: 'q', isAnalyzed: false } },
        ruleState: { isViolated: false }
    },
    {
        title: "Step 2: Analyzing 'p'",
        explanation: "The logic forces p² to be a multiple of 3, meaning 'p' itself must be divisible by 3. We move 'p' into the 'Divisible by 3' zone.",
        equation: "p^2 = 3q^2",
        numberStates: { p: { id: 'p', isAnalyzed: true }, q: { id: 'q', isAnalyzed: false } },
        ruleState: { isViolated: false }
    },
    {
        title: "Step 3: Analyzing 'q'",
        explanation: "Following the same logic, we now find that 'q' must also be divisible by 3. We move 'q' into the 'Divisible by 3' zone as well.",
        equation: "q^2 = 3k^2",
        numberStates: { p: { id: 'p', isAnalyzed: true }, q: { id: 'q', isAnalyzed: true } },
        ruleState: { isViolated: false }
    },
    {
        title: "Step 4: The Contradiction",
        explanation: "Our analysis proves both 'p' and 'q' are divisible by 3. This directly violates our fundamental rule. The assumption must be false.",
        equation: "\\text{Contradiction!}",
        numberStates: { p: { id: 'p', isAnalyzed: true }, q: { id: 'q', isAnalyzed: true } },
        ruleState: { isViolated: true }
    }
];

// --- Child Components for the New Design ---

const ProofPanel: React.FC<{
    step: ProofStep;
    currentStepIndex: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
}> = ({ step, currentStepIndex, totalSteps, onNext, onPrev }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-md flex flex-col h-full">
        <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Proving the Irrationality of <InlineMath>\sqrt{3}</InlineMath></h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">A step-by-step analysis of the proof by contradiction.</p>
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

const NumberBubble: React.FC<{ label: string, color: string }> = ({ label, color }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg ${color}`}
    >
        {label}
    </motion.div>
);

const NumberAnalyzer: React.FC<{ step: ProofStep }> = ({ step }) => {
    const { p, q } = step.numberStates;

    const pBubble = <NumberBubble label="p" color="bg-indigo-500" />;
    const qBubble = <NumberBubble label="q" color="bg-purple-500" />;

    return (
        <div className="bg-slate-100 dark:bg-slate-900/70 rounded-xl p-6 shadow-inner relative min-h-[450px] flex flex-col">
            <div className="w-full text-center h-16">
                <AnimatePresence mode="wait">
                    <motion.div key={step.equation} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                        <BlockMath>{step.equation}</BlockMath>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative w-full flex-grow flex flex-col">
                {/* Divisible by 3 Zone */}
                <div className="flex-1 bg-sky-500/10 dark:bg-sky-500/20 rounded-t-lg border-2 border-b-0 border-dashed border-sky-500/50 flex items-center justify-center gap-4 p-4">
                    <span className="absolute top-2 font-bold text-sky-700 dark:text-sky-400">Zone: Divisible by 3</span>
                    {p.isAnalyzed && pBubble}
                    {q.isAnalyzed && qBubble}
                </div>
                
                {/* Untested Area */}
                <div className="flex-1 bg-slate-500/10 dark:bg-slate-500/20 rounded-b-lg border-2 border-t-0 border-dashed border-slate-500/50 flex items-center justify-center gap-4 p-4">
                     <span className="absolute bottom-2 font-bold text-slate-500/80 dark:text-slate-400/80">Untested Area</span>
                    {!p.isAnalyzed && pBubble}
                    {!q.isAnalyzed && qBubble}
                </div>

                {/* Rule Banner */}
                <motion.div
                    animate={{ backgroundColor: step.ruleState.isViolated ? '#DC2626' : '#16A34A' }}
                    transition={{ duration: 0.5 }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-5/6 p-3 rounded-lg text-center text-white font-bold shadow-lg"
                >
                    RULE: `p` & `q` Cannot Both Be Divisible By 3
                </motion.div>
            </div>
        </div>
    );
};

// --- Main Slide Component ---
export default function ProvingIrrationalitySlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentProofStep, setCurrentProofStep] = useState(0);
    const { isDarkMode } = useThemeContext();

    const handleNext = () => setCurrentProofStep(prev => Math.min(prev + 1, proofSteps.length - 1));
    const handlePrev = () => setCurrentProofStep(prev => Math.max(prev - 1, 0));

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideInteractions: Interaction[] = [{
        id: 'proof-sqrt3-analyzer',
        conceptId: 'proof-of-sqrt3',
        conceptName: 'Proof for Square Root of 3',
        type: 'learning',
        description: 'Visualizing the proof for sqrt(3) by analyzing number properties.'
    }];

    const slideContent = (
        <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <ProofPanel
                    step={proofSteps[currentProofStep]}
                    currentStepIndex={currentProofStep}
                    totalSteps={proofSteps.length}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
                <NumberAnalyzer
                    step={proofSteps[currentProofStep]}
                />
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
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}