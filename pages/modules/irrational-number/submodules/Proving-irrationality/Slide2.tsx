import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const proofVizSteps = [
    {
        title: "Start: Assumption",
        text: "We assume $\\sqrt{2} = p/q$. We can simplify the fraction, meaning $p$ and $q$ can't both be even.",
        visual: [
            { id: 1, label: "$p/q$", color: "bg-blue-500", style: { top: "50%", left: "10%" } },
            { id: 2, label: "Not both even", color: "bg-red-500", style: { top: "60%", left: "20%" } }
        ]
    },
    {
        title: "After Squaring",
        text: "We get $p^2 = 2q^2$. This means $p^2$ is even, so $p$ must be even. So we know $p = 2k$.",
        visual: [
            { id: 1, label: "$p^2 = 2q^2$", color: "bg-purple-500", style: { top: "20%", left: "50%" } },
            { id: 2, label: "$p$ is even", color: "bg-purple-500", style: { top: "30%", left: "55%" } },
        ]
    },
    {
        title: "The Second Implication",
        text: "Substitute $p = 2k$ into the equation. We get $q^2 = 2k^2$, meaning $q^2$ is even. Therefore, $q$ is also even.",
        visual: [
            { id: 1, label: "$q^2 = 2k^2$", color: "bg-purple-500", style: { top: "70%", left: "50%" } },
            { id: 2, label: "$q$ is even", color: "bg-purple-500", style: { top: "80%", left: "55%" } },
        ]
    },
    {
        title: "The Contradiction",
        text: "Our result shows that both $p$ and $q$ are even. This directly contradicts our first assumption that the fraction $p/q$ was simplified. Thus, our initial assumption was false.",
        visual: [
            { id: 1, label: "$p$ is even", color: "bg-purple-500", style: { top: "20%", left: "10%" } },
            { id: 2, label: "$q$ is even", color: "bg-purple-500", style: { top: "80%", left: "10%" } },
            { id: 3, label: "CONTRACTION", color: "bg-red-600", style: { top: "50%", left: "50%" } }
        ]
    }
];

export default function ProvingIrrationalitySlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentVizStep, setCurrentVizStep] = useState(0);
    const { isDarkMode } = useThemeContext();

    const currentVizContent = proofVizSteps[currentVizStep];

    const slideInteractions: Interaction[] = [
        {
            id: 'proof-visualization-intro',
            conceptId: 'proof-visualization',
            conceptName: 'Proof of √2 Visualization',
            type: 'learning',
            description: 'A visual walkthrough of the proof for the irrationality of √2'
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
                        Visualizing the Proof for $\sqrt{2}$
                    </h3>
                    <div className="space-y-4 text-lg">
                        <p className="leading-relaxed">
                            Sometimes, seeing the logical flow visually can make an abstract proof easier to grasp. This visualization walks through the key steps of the proof by contradiction.
                        </p>
                        <p className="leading-relaxed">
                            Each step highlights a new logical conclusion that moves us closer to the final contradiction.
                        </p>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-2 text-center">
                            {currentVizContent.title}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                            {currentVizContent.text}
                        </p>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setCurrentVizStep(Math.max(0, currentVizStep - 1))}
                            disabled={currentVizStep === 0}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                isDarkMode
                                    ? 'bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50'
                            }`}
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={() => setCurrentVizStep(Math.min(proofVizSteps.length - 1, currentVizStep + 1))}
                            disabled={currentVizStep === proofVizSteps.length - 1}
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

                <div className={`rounded-lg p-6 shadow-lg relative min-h-[400px] ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <AnimatePresence>
                        {currentVizContent.visual.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                className={`absolute p-2 rounded-md font-semibold text-white ${item.color}`}
                                style={item.style}
                            >
                                {item.label}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="irrationality-visualize-proof"
            slideTitle="Visualizing Proofs"
            moduleId="irrational-numbers"
            submoduleId="proving-irrationality"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}