import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { Interaction, InteractionResponse } from '../../../common-components/concept';

// --- Type Definitions for a Cleaner Codebase ---
type VisualItem = {
    id: number;
    label: string;
    color: string;
    position: string; // Using Tailwind classes for positioning is cleaner
};

type ProofStep = {
    title: string;
    text: string;
    visuals: VisualItem[];
};

// --- Updated Data with Clearer Labels ---
const proofVizSteps: ProofStep[] = [
    {
        title: "Start: The Assumption",
        text: "We assume $\\sqrt{2} = p/q$. The fraction is simplified, meaning $p$ and $q$ cannot both be even.",
        visuals: [
            { id: 1, label: "\\frac{p}{q}", color: "bg-blue-500", position: "top-1/3 left-1/2 -translate-x-1/2 text-2xl" },
            { id: 2, label: "Rule: Not both even", color: "bg-amber-500", position: "top-2/3 left-1/2 -translate-x-1/2" }
        ]
    },
    {
        title: "Clue #1: 'p' is Even",
        text: "After squaring, we get $p^2 = 2q^2$. This means $p^2$ must be even, which proves that $p$ is also even.",
        visuals: [
            { id: 1, label: "p^2 = 2q^2", color: "bg-purple-500", position: "top-1/3 left-1/2 -translate-x-1/2 text-xl" },
            { id: 2, label: "Finding: p is Even", color: "bg-sky-500", position: "top-2/3 left-1/2 -translate-x-1/2" },
        ]
    },
    {
        title: "Clue #2: 'q' is Even",
        text: "Substituting $p=2k$ back into the equation, we find that $q^2 = 2k^2$. This proves that $q$ must also be even.",
        visuals: [
            { id: 1, label: "q^2 = 2k^2", color: "bg-purple-500", position: "top-1/3 left-1/2 -translate-x-1/2 text-xl" },
            { id: 2, label: "Finding: q is Even", color: "bg-sky-500", position: "top-2/3 left-1/2 -translate-x-1/2" },
        ]
    },
    {
        title: "The Contradiction!",
        text: "Our findings show that both $p$ and $q$ are even. This directly breaks our initial rule.",
        visuals: [
            { id: 1, label: "p is Even", color: "bg-sky-500", position: "top-1/4 left-1/4" },
            { id: 2, label: "q is Even", color: "bg-sky-500", position: "top-1/4 right-1/4" },
            { id: 3, label: "Rule: Not both even", color: "bg-amber-500", position: "top-1/2 left-1/2 -translate-x-1/2" },
            { id: 4, label: "CONTRADICTION", color: "bg-red-600", position: "top-3/4 left-1/2 -translate-x-1/2 text-2xl shadow-lg" }
        ]
    }
];

// --- Child Components for better structure ---

const VisualizationCanvas: React.FC<{ visuals: VisualItem[] }> = ({ visuals }) => (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg relative min-h-[400px]">
        <AnimatePresence>
            {visuals.map(item => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`absolute p-3 rounded-lg font-bold text-white text-center ${item.color} ${item.position}`}
                >
                    {/* This is the fix for the un-rendered math bug */}
                    <InlineMath>{item.label}</InlineMath>
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
);

const ProofControlPanel: React.FC<{
    step: ProofStep;
    currentStepIndex: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
}> = ({ step, currentStepIndex, totalSteps, onNext, onPrev }) => {
    return (
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-white mb-3">
                    {/* This is the fix for the KaTeX title error */}
                    Visualizing the Proof for <InlineMath>\sqrt{2}</InlineMath>
                </h3>
                <p className="text-slate-400 mb-6">
                    This visualization walks through the key steps of the proof by contradiction.
                </p>
                <div className="p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded-lg">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStepIndex}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h4 className="font-bold text-lg text-blue-300 mb-2">
                                {step.title}
                            </h4>
                            {/* The text is wrapped in InlineMath to correctly parse LaTeX */}
                            <p className="text-slate-300">
                                <InlineMath>{step.text}</InlineMath>
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-700">
                <button onClick={onPrev} disabled={currentStepIndex === 0} className="px-5 py-2 rounded-lg font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-40">
                    ← Previous
                </button>
                <span className="text-sm font-semibold text-slate-500">Step {currentStepIndex + 1} / {totalSteps}</span>
                <button onClick={onNext} disabled={currentStepIndex === totalSteps - 1} className="px-5 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40">
                    Next →
                </button>
            </div>
        </div>
    );
};

// --- Main Component ---

export default function ProvingIrrationalitySlide2() {
    const [currentVizStep, setCurrentVizStep] = useState(0);
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleNext = () => setCurrentVizStep(prev => Math.min(prev + 1, proofVizSteps.length - 1));
    const handlePrev = () => setCurrentVizStep(prev => Math.max(0, prev - 1));
    
    const currentStepData = proofVizSteps[currentVizStep];

    return (
        <SlideComponentWrapper
            slideId="irrationality-visualize-proof"
            slideTitle="Visualizing Proofs"
            moduleId="irrational-numbers"
            submoduleId="proving-irrationality"
            interactions={localInteractions}
        >
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-8">
                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl w-full">
                    <ProofControlPanel
                        step={currentStepData}
                        currentStepIndex={currentVizStep}
                        totalSteps={proofVizSteps.length}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                    <VisualizationCanvas visuals={currentStepData.visuals} />
                </div>
            </div>
        </SlideComponentWrapper>
    );
}