import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Main Slide Component ---
export default function Shapes2DSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: '2d-shapes-concept', conceptId: '2d-shapes', conceptName: 'Recognizing 2D Shapes', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Recognizing 2D Shapes</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Flat Shapes</h3>
                    <p className="text-slate-600 dark:text-slate-400">2D shapes are flat, like drawings on a piece of paper. The most common ones are circles, squares, triangles, and rectangles.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        // Simple shape sorting game logic can be added here
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Shape Sorter</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Can you name the shape?</p>
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center">
                    <p className="text-8xl mb-8">△</p>
                    <p className="text-slate-500">[Shape Sorting Game Would Go Here]</p>
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

    return (<SlideComponentWrapper slideId="geometry-2d-shapes" slideTitle="Recognizing 2D Shapes" moduleId="grade-2-math-geometry" submoduleId="geometry" interactions={localInteractions}>{slideContent}</SlideComponentWrapper>);
}