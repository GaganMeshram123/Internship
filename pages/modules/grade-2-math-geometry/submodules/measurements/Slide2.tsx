import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

export default function TellingTimeSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'telling-time-concept', conceptId: 'telling-time', conceptName: 'Telling Time', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Telling Time</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Two Hands</h3>
                    <p className="text-slate-600 dark:text-slate-400">An analog clock has two main hands. The **short hand** points to the hour, and the **long hand** points to the minutes.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Reading the Clock</h3>
                    <p className="text-slate-600 dark:text-slate-400">When the long minute hand points to the 12, it's a new hour! Just look at the short hour hand to see what time it is. For example, if the short hand is on the 3, it's 3 o'clock.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Clock Master</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Drag the hands to set the time!</p>
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center">
                <p className="text-5xl mb-8">🕒</p>
                <p className="text-slate-500">[Interactive Clock Animation Would Go Here]</p>
            </div>
        </div>
    );

    const slideContent = (
        <div className="min-h-screen p-4 sm:p-8"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><LeftTheoryPanel /></TrackedInteraction>
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><RightInteractionPanel /></TrackedInteraction>
        </div></div>
    );

    return (<SlideComponentWrapper slideId="measurements-time" slideTitle="Telling Time" moduleId="grade-2-math-geometry" submoduleId="measurements" interactions={localInteractions}>{slideContent}</SlideComponentWrapper>);
}