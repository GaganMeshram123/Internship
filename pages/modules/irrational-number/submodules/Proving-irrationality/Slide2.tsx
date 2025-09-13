import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Type Definitions for the Logic Circuit ---
type Node = {
    id: string;
    label: string;
    content: string;
    color: string;
    position: string; // e.g., "top-1/4 left-1/4"
};

type Wire = {
    id: string;
    position: string; // Tailwind classes for position, size, and rotation
};

type ProofStep = {
    title: string;
    text: string;
    nodes: Node[];
    wires: Wire[];
};

// --- Data Structure for the "Logic Circuit" Visualization ---
const proofVizSteps: ProofStep[] = [
    {
        title: "Powering On: The Assumption",
        text: "We feed our main assumption into the logic circuit. We assume √2 is a rational number (p/q) in its simplest form. This is our starting signal.",
        nodes: [
            { id: "input", label: "Input Signal", content: "\\sqrt{2} = \\frac{p}{q}", color: "bg-blue-600", position: "top-1/2 -translate-y-1/2 left-8" },
        ],
        wires: []
    },
    {
        title: "First Gate: Processing 'p'",
        text: "The input signal travels to the first logic gate. The laws of mathematics force the output: 'p' must be an even number. The first result is locked in.",
        nodes: [
            { id: "input", label: "Input Signal", content: "\\sqrt{2} = \\frac{p}{q}", color: "bg-blue-600", position: "top-1/2 -translate-y-1/2 left-8" },
            { id: "p-gate", label: "Result #1", content: "\\text{p is Even}", color: "bg-green-500", position: "top-1/4 left-1/2 -translate-x-1/2" }
        ],
        wires: [
            { id: "wire-to-p", position: "top-[38%] left-[28%] w-[25%] h-0.5 bg-slate-600 rotate-[25deg]" }
        ]
    },
    {
        title: "Second Gate: Processing 'q'",
        text: "The signal continues. The fact that 'p' is even triggers the next gate, which in turn proves that 'q' must also be an even number. A second result appears.",
        nodes: [
            { id: "input", label: "Input Signal", content: "\\sqrt{2} = \\frac{p}{q}", color: "bg-blue-600", position: "top-1/2 -translate-y-1/2 left-8" },
            { id: "p-gate", label: "Result #1", content: "\\text{p is Even}", color: "bg-green-500", position: "top-1/4 left-1/2 -translate-x-1/2" },
            { id: "q-gate", label: "Result #2", content: "\\text{q is Even}", color: "bg-green-500", position: "top-3/4 left-1/2 -translate-x-1/2" }
        ],
        wires: [
            { id: "wire-to-p", position: "top-[38%] left-[28%] w-[25%] h-0.5 bg-slate-600 rotate-[25deg]" },
            { id: "wire-to-q", position: "top-[62%] left-[28%] w-[25%] h-0.5 bg-slate-600 -rotate-[25deg]" }
        ]
    },
    {
        title: "System Crash: The Paradox",
        text: "Both results—'p' is even and 'q' is even—flow into the final processor. But this creates a paradox! A simplified fraction cannot have both parts be even. The circuit crashes, proving our initial input was invalid.",
        nodes: [
            { id: "p-gate", label: "Result #1", content: "\\text{p is Even}", color: "bg-green-500", position: "top-1/4 left-1/2 -translate-x-1/2" },
            { id: "q-gate", label: "Result #2", content: "\\text{q is Even}", color: "bg-green-500", position: "top-3/4 left-1/2 -translate-x-1/2" },
            { id: "paradox", label: "System Error", content: "\\text{PARADOX}", color: "bg-red-600 animate-pulse shadow-lg shadow-red-500/50", position: "top-1/2 -translate-y-1/2 right-8 text-xl" }
        ],
        wires: [
            { id: "wire-p-to-crash", position: "top-[38%] right-[26%] w-[25%] h-0.5 bg-slate-600 -rotate-[25deg]" },
            { id: "wire-q-to-crash", position: "top-[62%] right-[26%] w-[25%] h-0.5 bg-slate-600 rotate-[25deg]" }
        ]
    }
];

// --- Child Components for the New Design ---

const CircuitNode: React.FC<{ node: Node }> = ({ node }) => (
    <motion.div
        layoutId={node.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`absolute rounded-lg font-semibold text-white text-center p-3 shadow-md ${node.color} ${node.position}`}
    >
        <div className="text-[10px] uppercase opacity-70 tracking-wider">{node.label}</div>
        <div className="text-base"><InlineMath>{node.content}</InlineMath></div>
    </motion.div>
);

const CircuitWire: React.FC<{ wire: Wire }> = ({ wire }) => (
     <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        exit={{ opacity: 0 }}
        className={`absolute ${wire.position}`}
    />
);

const LogicCircuit: React.FC<{ step: ProofStep }> = ({ step }) => (
    <div className="bg-slate-100 dark:bg-slate-900/70 rounded-xl p-4 shadow-inner relative min-h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1),transparent_70%),linear-gradient(to_right,rgba(100,116,139,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.1)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
        <AnimatePresence>
            {step.wires.map(wire => <CircuitWire key={wire.id} wire={wire} />)}
            {step.nodes.map(node => <CircuitNode key={node.id} node={node} />)}
        </AnimatePresence>
    </div>
);


const ControlPanel: React.FC<{
    step: ProofStep;
    currentStepIndex: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
}> = ({ step, currentStepIndex, totalSteps, onNext, onPrev }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-md flex flex-col h-full">
        <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Visualizing the Proof for <InlineMath>\sqrt{2}</InlineMath></h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">A logic circuit test to prove irrationality by contradiction.</p>
            
            <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-4 py-3 min-h-[150px]">
                <AnimatePresence mode="wait">
                    <motion.div key={currentStepIndex} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                        <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">{step.title}</h4>
                        <p className="text-slate-700 dark:text-slate-300">{step.text}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
        <div className="mt-auto pt-6">
             <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
                <motion.div 
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                />
            </div>
            <div className="flex justify-between items-center">
                <button onClick={onPrev} disabled={currentStepIndex === 0} className="px-5 py-2 rounded-lg font-bold text-white bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">← Previous</button>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Step {currentStepIndex + 1} of {totalSteps}</span>
                <button onClick={onNext} disabled={currentStepIndex === totalSteps - 1} className="px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Next →</button>
            </div>
        </div>
    </div>
);

// --- Main Slide Component ---
export default function VisualizingProofSlide() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const handleNext = () => setCurrentStepIndex(prev => Math.min(prev + 1, proofVizSteps.length - 1));
    const handlePrev = () => setCurrentStepIndex(prev => Math.max(prev - 1, 0));
    
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const currentStep = proofVizSteps[currentStepIndex];

    const slideInteractions: Interaction[] = [{
        id: 'visualizing-sqrt2-proof',
        conceptId: 'proof-of-sqrt2-viz',
        conceptName: 'Visual Proof of Sqrt(2) Irrationality',
        type: 'learning',
        description: 'Interactively stepping through the visual evidence of the proof by contradiction.'
    }];

    const slideContent = (
        <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <ControlPanel
                    step={currentStep}
                    currentStepIndex={currentStepIndex}
                    totalSteps={proofVizSteps.length}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
                <LogicCircuit step={currentStep} />
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="visualizing-irrationality-proof"
            slideTitle="Visualizing the Proof for √2"
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