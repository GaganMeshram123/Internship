import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Reusable Block Components ---
const OnesBlock = ({ layoutId, className }: { layoutId: string, className?: string }) => (
    <motion.div layoutId={layoutId} className={`w-4 h-4 bg-black dark:bg-white rounded ${className}`} />
);
const TensBlock = ({ layoutId, className }: { layoutId: string, className?: string }) => (
    <motion.div layoutId={layoutId} className={`w-4 h-12 bg-blue-500 rounded ${className}`} />
);
const HundredsBlock = ({ layoutId, className }: { layoutId: string, className?: string }) => (
    <motion.div layoutId={layoutId} className={`w-12 h-12 bg-blue-300 dark:bg-blue-800 rounded ${className}`} />
);

// --- Main Slide Component ---
export default function AddingWithThreeDigitsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [problem, setProblem] = useState({ a: 368, b: 276 });
    const [step, setStep] = useState(0); // 0: initial, 1: add ones, 2: carry ten, 3: add tens, 4: carry hundred, 5: add hundreds, 6: done

    const generateNewProblem = () => {
        setStep(0);
        let a = 0;
        let b = 0;
        // Ensure problems require carrying in both ones and tens place
        do {
            a = Math.floor(Math.random() * 400) + 100; // 100-499
            b = Math.floor(Math.random() * 400) + 100; // 100-499
        } while ((a % 10) + (b % 10) < 10 || (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) + 1 < 10); // +1 for potential carry from ones

        setProblem({ a, b });
    };

    useEffect(() => { generateNewProblem(); }, []);

    const slideInteractions: Interaction[] = [{ id: 'add-within-1000-concept', conceptId: 'add-within-1000', conceptName: 'Adding within 1000', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Adding Bigger Numbers!</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Step-by-Step Method</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                        <li><strong>Start with the Ones:</strong> Add the ones. If the sum is 10 or more, carry the new ten to the Tens house.</li>
                        <li><strong>Add the Tens:</strong> Add all the tens, including the one you carried. If the sum is 10 or more, carry the new hundred.</li>
                        <li><strong>Add the Hundreds:</strong> Add all the hundreds, including any you carried over.</li>
                    </ol>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const partsA = { hundreds: Math.floor(problem.a / 100), tens: Math.floor(problem.a / 10) % 10, ones: problem.a % 10 };
        const partsB = { hundreds: Math.floor(problem.b / 100), tens: Math.floor(problem.b / 10) % 10, ones: problem.b % 10 };
        const result = problem.a + problem.b;

        // Calculate counts for each step
        const initialOnes = partsA.ones + partsB.ones;
        const finalOnes = initialOnes % 10;
        const carryTen = Math.floor(initialOnes / 10);

        const initialTens = partsA.tens + partsB.tens + (step >= 3 ? carryTen : 0);
        const finalTens = initialTens % 10;
        const carryHundred = Math.floor(initialTens / 10);

        const initialHundreds = partsA.hundreds + partsB.hundreds + (step >= 5 ? carryHundred : 0);
        const finalHundreds = initialHundreds;
        
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Place Value Addition</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Let's solve {problem.a} + {problem.b}</p>

                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col items-center justify-between text-center relative overflow-hidden">
                    <div className="flex w-full justify-around mb-4">
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-slate-500">Hundreds</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-slate-500">Tens</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-slate-500">Ones</p>
                        </div>
                    </div>

                    {/* Problem Display */}
                    <div className="relative w-full text-4xl font-bold text-slate-700 dark:text-slate-300 flex justify-around">
                        <span className="w-1/3 text-center">{partsA.hundreds}</span>
                        <span className="w-1/3 text-center">{partsA.tens}</span>
                        <span className="w-1/3 text-center">{partsA.ones}</span>
                    </div>
                    <div className="relative w-full text-4xl font-bold text-slate-700 dark:text-slate-300 flex justify-around mb-4 border-b-2 border-slate-300 dark:border-slate-700 pb-2">
                        <span className="w-1/3 text-center">+ {partsB.hundreds}</span>
                        <span className="w-1/3 text-center">{partsB.tens}</span>
                        <span className="w-1/3 text-center">{partsB.ones}</span>
                    </div>

                    {/* Result Display */}
                    <div className="relative w-full text-4xl font-bold text-blue-600 dark:text-blue-400 flex justify-around mt-2">
                        <span className="w-1/3 text-center">{step >= 5 ? finalHundreds : ''}</span>
                        <span className="w-1/3 text-center">{step >= 3 ? finalTens : ''}</span>
                        <span className="w-1/3 text-center">{step >= 1 ? finalOnes : ''}</span>
                    </div>

                    {/* Dynamic Base-10 Block Animation Area */}
                    <div className="absolute top-[180px] left-0 right-0 h-[200px] flex justify-around items-end">
                        {/* Hundreds Blocks */}
                        <div className="flex flex-wrap justify-center w-1/3 h-full items-end content-end gap-1">
                            <AnimatePresence>
                                {Array.from({ length: partsA.hundreds }).map((_, i) => (
                                    <motion.div key={`ah-${i}`} initial={{y: -50, opacity: 0}} animate={{y:0, opacity:1}} exit={{opacity:0, scale:0.5}} transition={{delay: i * 0.1}}>
                                        <HundredsBlock layoutId={`a-hundred-${i}`} />
                                    </motion.div>
                                ))}
                                {Array.from({ length: partsB.hundreds }).map((_, i) => (
                                    <motion.div key={`bh-${i}`} initial={{y: -50, opacity: 0}} animate={{y:0, opacity:1}} exit={{opacity:0, scale:0.5}} transition={{delay: (partsA.hundreds + i) * 0.1}}>
                                        <HundredsBlock layoutId={`b-hundred-${i}`} />
                                    </motion.div>
                                ))}
                                {/* Carried Hundred */}
                                {step >= 4 && carryHundred > 0 && (
                                     <motion.div 
                                        key="carry-h" 
                                        initial={{x: -100, y: -100, opacity:0, scale:0.5}} 
                                        animate={{x:0, y:0, opacity:1, scale:1}} 
                                        exit={{opacity:0, scale:0.5}}
                                        transition={{delay: 0.5}}
                                    >
                                        <HundredsBlock className="border-2 border-green-500" layoutId="carry-hundred" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {/* Tens Blocks */}
                        <div className="flex flex-wrap justify-center w-1/3 h-full items-end content-end gap-1">
                            <AnimatePresence>
                                {Array.from({ length: partsA.tens }).map((_, i) => (
                                    <motion.div key={`at-${i}`} initial={{y: -50, opacity: 0}} animate={{y:0, opacity:1}} exit={{opacity:0, scale:0.5}} transition={{delay: i * 0.1}}>
                                        <TensBlock layoutId={`a-ten-${i}`} />
                                    </motion.div>
                                ))}
                                {Array.from({ length: partsB.tens }).map((_, i) => (
                                    <motion.div key={`bt-${i}`} initial={{y: -50, opacity: 0}} animate={{y:0, opacity:1}} exit={{opacity:0, scale:0.5}} transition={{delay: (partsA.tens + i) * 0.1}}>
                                        <TensBlock layoutId={`b-ten-${i}`} />
                                    </motion.div>
                                ))}
                                {/* Carried Ten */}
                                {step >= 2 && carryTen > 0 && (
                                    <motion.div 
                                        key="carry-t" 
                                        initial={{x: 100, y: -100, opacity:0, scale:0.5}} 
                                        animate={{x:0, y:0, opacity:1, scale:1}} 
                                        exit={{opacity:0, scale:0.5}}
                                        transition={{delay: 0.5}}
                                    >
                                        <TensBlock className="border-2 border-green-500" layoutId="carry-ten" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {/* Ones Blocks */}
                        <div className="flex flex-wrap justify-center w-1/3 h-full items-end content-end gap-1">
                            <AnimatePresence>
                                {Array.from({ length: partsA.ones }).map((_, i) => (
                                    <motion.div key={`ao-${i}`} initial={{y: -50, opacity: 0}} animate={{y:0, opacity:1}} exit={{opacity:0, scale:0.5}} transition={{delay: i * 0.05}}>
                                        <OnesBlock layoutId={`a-one-${i}`} />
                                    </motion.div>
                                ))}
                                {Array.from({ length: partsB.ones }).map((_, i) => (
                                    <motion.div key={`bo-${i}`} initial={{y: -50, opacity: 0}} animate={{y:0, opacity:1}} exit={{opacity:0, scale:0.5}} transition={{delay: (partsA.ones + i) * 0.05}}>
                                        <OnesBlock layoutId={`b-one-${i}`} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <button onClick={() => step === 6 ? generateNewProblem() : setStep(s => s + 1)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                        {step === 0 && 'Step 1: Add Ones'}
                        {step === 1 && 'Step 2: Carry the Ten'}
                        {step === 2 && 'Step 3: Add Tens'}
                        {step === 3 && 'Step 4: Carry the Hundred'}
                        {step === 4 && 'Step 5: Add Hundreds'}
                        {step === 5 && 'Show Final Answer'}
                        {step === 6 && 'Try Another!'}
                    </button>
                </div>
            </div>
        );
    };

    const slideContent = (
         <div className="min-h-screen p-4 sm:p-8"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><LeftTheoryPanel /></TrackedInteraction>
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><RightInteractionPanel /></TrackedInteraction>
        </div></div>
    );

    return ( <SlideComponentWrapper slideId="add-within-1000" slideTitle="Adding within 1000" moduleId="grade-2-math-operations" submoduleId="add-subtract-within-1000" interactions={localInteractions}>{slideContent}</SlideComponentWrapper> );
}