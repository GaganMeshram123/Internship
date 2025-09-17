import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// Helper component for a single pizza slice
const PizzaSlice = ({ angle, sliceAngle, index, isSelected }: any) => {
    const startAngle = angle * (Math.PI / 180);
    const endAngle = (angle + sliceAngle) * (Math.PI / 180);
    
    const x1 = Math.cos(startAngle);
    const y1 = Math.sin(startAngle);
    const x2 = Math.cos(endAngle);
    const y2 = Math.sin(endAngle);

    const pathData = `M 0 0 L ${x1} ${y1} A 1 1 0 0 1 ${x2} ${y2} Z`;

    return (
        <motion.path
            d={pathData}
            fill={isSelected ? '#3b82f6' : '#ffffff'} // blue-500 or white
            stroke="#000000"
            strokeWidth="0.03"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        />
    );
};

// --- Main Slide Component ---
export default function UnderstandFractionsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();
    
    const [denominator, setDenominator] = useState(4);
    const [numerator, setNumerator] = useState(1);

    const slideInteractions: Interaction[] = [
        { id: 'understand-fractions-concept', conceptId: 'fractions-intro', conceptName: 'Understanding Fractions', type: 'learning', description: 'Learning the basic concept of fractions as parts of a whole.' },
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Understand Fractions</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">What is a Fraction? 🍕</h3>
                    <p className="text-slate-600 dark:text-slate-400">A fraction is a way to talk about a **piece of something**, instead of the whole thing. If you have a pizza, a fraction tells you how many slices you have.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Parts of a Fraction</h3>
                    <p className="text-slate-600 dark:text-slate-400">The **bottom number (Denominator)** tells you how many equal slices the whole pizza is cut into.</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">The **top number (Numerator)** tells you how many of those slices you actually have.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const sliceAngle = 360 / denominator;
        const slices = Array.from({ length: denominator });

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Pizza Party!</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Use the sliders to build a fraction.</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center">
                    <svg className="w-48 h-48" viewBox="-1.1 -1.1 2.2 2.2">
                        {slices.map((_, i) => (
                            <PizzaSlice key={i} index={i} angle={i * sliceAngle} sliceAngle={sliceAngle} isSelected={i < numerator} />
                        ))}
                    </svg>
                    <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mt-4">
                        <div className="inline-block text-center leading-none">
                            <span className="block border-b-4 border-slate-800 dark:border-slate-200 pb-1">{numerator}</span>
                            <span className="block pt-1">{denominator}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-4">
                    <div>
                        <label className="font-medium text-slate-700 dark:text-slate-300">Slices to Select (Numerator): {numerator}</label>
                        <input
                            type="range" min="0" max={denominator} value={numerator}
                            onChange={(e) => setNumerator(Number(e.target.value))}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 mt-1"
                        />
                    </div>
                    <div>
                        <label className="font-medium text-slate-700 dark:text-slate-300">Total Slices (Denominator): {denominator}</label>
                        <input
                            type="range" min="2" max="12" value={denominator}
                            onChange={(e) => {
                                const newDenom = Number(e.target.value);
                                setDenominator(newDenom);
                                if (numerator > newDenom) setNumerator(newDenom);
                            }}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 mt-1"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <LeftTheoryPanel />
                </TrackedInteraction>
                <TrackedInteraction interaction={slideInteractions[1]  || slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <RightInteractionPanel />
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="arithmetic-understand-fractions"
            slideTitle="Understand Fractions"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}