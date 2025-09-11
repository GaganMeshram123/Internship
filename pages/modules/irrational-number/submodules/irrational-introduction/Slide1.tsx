import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

export default function IrrationalIntroSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    // Define MCQ data for irrational numbers
    const mcqQuestion = {
        type: 'mcq' as const,
        question: "Which of these numbers is irrational?",
        options: [
            "$\sqrt{2}$",
            '1.5',
            '7',
            '1/3'
        ]
    };
    const mcqOptions = mcqQuestion.options;

    const slideInteractions: Interaction[] = [
        { id: 'irrational-intro', conceptId: 'irrational-numbers', conceptName: 'Irrational Numbers Introduction', type: 'learning', description: 'Understanding the definition of irrational numbers' },
        {
            id: 'irrational-what-is',
            conceptId: 'irrational-definition',
            conceptName: 'What is an irrational number?',
            type: 'judging',
            description: 'MCQ: Identifying an irrational number',
            question: mcqQuestion
        }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    // MCQ state
    const [mcqSelected, setMcqSelected] = useState<string | null>(null);
    const [mcqShown, setMcqShown] = useState(false);
    const handleMCQAnswer = (optionIndex: number) => {
        const correctIndex = 0;
        const isCorrect = optionIndex === correctIndex;
        setMcqSelected(mcqOptions[optionIndex]);
        setMcqShown(true);
        handleInteractionComplete({
            interactionId: 'irrational-what-is',
            value: mcqOptions[optionIndex],
            isCorrect,
            timestamp: Date.now(),
            conceptId: 'irrational-definition',
            conceptName: 'What is an irrational number?',
            question: mcqQuestion
        });
    };

    const slideContent = (
        <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-8 h-full">
                {/* Left column: Theory */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-4">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        An **irrational number** is any real number that cannot be expressed as a simple fraction, like `p/q`, where `p` and `q` are integers and `q` is not equal to zero. When written in decimal form, irrational numbers have an infinite number of non-repeating digits after the decimal point.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        This is in contrast to rational numbers, which can always be written as a fraction and whose decimal representations either terminate or repeat in a predictable pattern. The discovery of irrational numbers is often attributed to the ancient Greek mathematician Hippasus, a student of Pythagoras, and it challenged the prevailing belief that all numbers were rational.
                    </p>
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Key Properties of Irrational Numbers</div>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            <li>Cannot be written as a fraction.</li>
                            <li>Decimal form is infinite and non-repeating.</li>
                            <li>Examples: $\sqrt{2}$, $\pi$ (Pi), $e$ (Euler's number).</li>
                        </ul>
                    </div>
                </div>

                {/* Right column: MCQ */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-gray-900 dark:text-white font-medium mb-4">Recognizing Irrational Numbers</h3>
                    <div className="w-full overflow-hidden rounded-lg border border-blue-200 dark:border-blue-700 p-4 flex flex-col items-center justify-center text-center text-lg">
                        The ancient Greeks discovered that the diagonal of a unit square could not be measured by a rational number, leading to the first known irrational number, $\sqrt{2}$. This concept is fundamental in geometry and number theory.
                                            </div>

                    {/* MCQ: Which of these is irrational? */}
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-6 mt-6">
                        <h4 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Quick Check</h4>
                        <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">Which of these numbers is irrational?</p>
                        <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
                            <div className="space-y-2">
                                {mcqOptions.map((opt, idx) => {
                                    const isSelected = mcqSelected === opt;
                                    const correct = idx === 0;
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => handleMCQAnswer(idx)}
                                            disabled={mcqShown}
                                            className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                                                 isSelected
                                                     ? (correct ? 'border-green-500 bg-green-100 dark:bg-green-900' : 'border-red-500 bg-red-100 dark:bg-red-900')
                                                     : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                             }`}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                            {mcqShown && (
                                <div className={`mt-4 p-3 rounded-lg ${mcqSelected === mcqOptions[0] ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                                    <p className="text-lg">
                                        {mcqSelected === mcqOptions[0]
                                            ? 'Correct! $\sqrt{2}$ cannot be expressed as a simple fraction, whereas the other options can.'
                                            : 'Not quite. The correct answer is $\sqrt{2}$, which has an infinite, non-repeating decimal expansion. The other numbers are rational.'}
                                    </p>
                                </div>
                            )}
                        </TrackedInteraction>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="irrational-numbers-intro"
            slideTitle="Introduction to Irrational Numbers"
            moduleId="irrational-numbers"
            submoduleId="irrational-introduction"
            interactions={localInteractions}
        >
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}