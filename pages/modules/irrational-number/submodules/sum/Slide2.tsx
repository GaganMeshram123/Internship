import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- Helper component to safely render text with markdown (bold) and LaTeX ($) ---
const RenderContent: React.FC<{ text: string }> = ({ text }) => {
    // This regex splits the string by **bold** or $math$ sections, keeping the delimiters
    const segments = text.split(/(\*\*.*?\*\*|\$.*?\$)/g).filter(Boolean);
    return (
        <>
            {segments.map((segment, index) => {
                if (segment.startsWith('**') && segment.endsWith('**')) {
                    return <strong key={index}>{segment.slice(2, -2)}</strong>;
                }
                if (segment.startsWith('$') && segment.endsWith('$')) {
                    // FIX: Added a wrapper with "whitespace-nowrap" to prevent line breaks in math expressions.
                    return (
                        <span key={index} className="whitespace-nowrap">
                            <InlineMath>{segment.slice(1, -1)}</InlineMath>
                        </span>
                    );
                }
                return segment;
            })}
        </>
    );
};

// --- Data for the slide ---
const sumExamples = [
    {
        title: "Case 1: Rational Result",
        explanation: "The irrational parts are opposites and cancel out.",
        equation: "(7 - \\sqrt{5}) + (1 + \\sqrt{5}) = 8"
    },
    {
        title: "Case 2: Irrational Result",
        explanation: "Adding the same irrational number to itself results in a new irrational number.",
        equation: "\\sqrt{2} + \\sqrt{2} = 2\\sqrt{2}"
    },
    {
        title: "Case 3: Irrational Result (Unlike Terms)",
        explanation: "'Unlike' irrationals cannot be combined into a simpler term.",
        equation: "\\pi + \\sqrt{2}"
    }
];

// --- Main Slide Component ---
export default function ExamplesOfIrrationalSumsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
    const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
    const [showQuizFeedback, setShowQuizFeedback] = useState(false);
    const { isDarkMode } = useThemeContext();

    const quizQuestion = {
        question: 'The sum of $(10 - \\pi)$ and $(\\pi - 2)$ is...',
        options: [
            { text: 'Rational', isCorrect: true },
            { text: 'Irrational', isCorrect: false },
            { text: 'Zero', isCorrect: false },
        ],
        explanation: 'The result is 8. The `+π` and `-π` cancel each other out, leaving a rational number.'
    };

    const handleQuizAnswer = (option: { text: string; isCorrect: boolean }) => {
        setSelectedQuizAnswer(option.text);
        setShowQuizFeedback(true);
    };

    const slideInteractions: Interaction[] = [
        { id: 'irrational-sum-examples', conceptId: 'irrational-sum-examples', conceptName: 'Examples of Irrational Sums', type: 'learning', description: 'Exploring specific examples of irrational sums.' },
        { id: 'irrational-sum-quick-check', conceptId: 'irrational-sum-understanding', conceptName: 'Irrational Sums Quick Check', type: 'judging', description: 'Quick check question on irrational sums.' },
        { id: 'irrational-sum-interactive-explainer', conceptId: 'irrational-sum-examples', conceptName: 'Interactive Sum Explainer', type: 'learning', description: 'Interactive visualization of sum examples.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col gap-6">
            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Recipe for a Rational Sum</h3>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <p className="text-slate-600 dark:text-slate-400">
                        <RenderContent text="To get a rational result, the irrational parts must be exact opposites. For example, to get '10', you can add $(10 + \pi)$ and $(-\pi)$. The irrational parts cancel out perfectly." />
                    </p>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">"Unlike" Irrationals</h3>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <p className="text-slate-600 dark:text-slate-400">
    You can't simplify the expression{' '}
    <span className="whitespace-nowrap">
        <InlineMath>{'\\sqrt{2} + \\sqrt{3}'}</InlineMath>
    </span>{' '}
    for the same reason you can't simplify{' '}
    <InlineMath>x + y</InlineMath> in algebra. They are considered{' '}
    <strong>'unlike terms.'</strong> Because their chaotic decimals
    don't align, their sum is just a new, unique irrational number.
</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Equation Explainer</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Click through to see different examples in action.</p>
            
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentExampleIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="font-semibold text-blue-600 dark:text-blue-400">{sumExamples[currentExampleIndex].title}</p>
                        <div className="text-3xl my-4"><BlockMath>{sumExamples[currentExampleIndex].equation}</BlockMath></div>
                        <p className="text-slate-600 dark:text-slate-400">{sumExamples[currentExampleIndex].explanation}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
                <button 
                    onClick={() => setCurrentExampleIndex(i => Math.max(0, i - 1))} 
                    disabled={currentExampleIndex === 0}
                    className="px-5 py-2 rounded-lg font-bold text-white bg-slate-500 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Example {currentExampleIndex + 1} of {sumExamples.length}
                </span>
                <button 
                    onClick={() => setCurrentExampleIndex(i => Math.min(sumExamples.length - 1, i + 1))} 
                    disabled={currentExampleIndex === sumExamples.length - 1}
                    className="px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
    
    const QuizPanel = () => (
         <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Quick Check</h3>
             <p className="text-slate-600 dark:text-slate-400 mb-3 text-lg"><RenderContent text={quizQuestion.question} /></p>
            <div className="space-y-2">
                {quizQuestion.options.map(option => {
                    let buttonStyle = "border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500";
                    if (showQuizFeedback) {
                        if(option.isCorrect) buttonStyle = "border-green-500 bg-green-50 dark:bg-green-900/30";
                        else if (selectedQuizAnswer === option.text) buttonStyle = "border-red-500 bg-red-50 dark:bg-red-900/30";
                    }
                    return (
                        <button key={option.text} onClick={() => handleQuizAnswer(option)} disabled={showQuizFeedback} className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${buttonStyle}`}>
                            <RenderContent text={option.text} />
                        </button>
                    );
                })}
            </div>
            <AnimatePresence>
                {showQuizFeedback && (
                    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="mt-3 p-3 rounded-lg text-sm bg-slate-100 dark:bg-slate-700">
                        {quizQuestion.explanation}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col gap-8">
                     <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                        <LeftTheoryPanel />
                     </TrackedInteraction>
                     <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
                        <QuizPanel />
                     </TrackedInteraction>
                </div>
                <TrackedInteraction interaction={slideInteractions[2]} onInteractionComplete={handleInteractionComplete}>
                    <RightInteractionPanel />
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="examples-of-irrational-sums"
            slideTitle="Examples of Irrational Sums"
            moduleId="irrational-numbers"
            submoduleId="operations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}