import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Main Slide Component ---
export default function TellingTimeSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'telling-time-concept', conceptId: 'telling-time', conceptName: 'Telling Time', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    // --- Left Panel: Theory and Rules ---
    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Telling Time</h2>
            <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-600 rounded-r-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Two Hands</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        An analog clock has two main hands. The <strong>short hand</strong> points to the hour, and the <strong>long hand</strong> points to the minutes.
                    </p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900/40 border-l-4 border-slate-400 dark:border-slate-600 rounded-r-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Reading the Clock</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        When the long minute hand points to the 12, it's a new hour! Just look at the short hour hand to see what time it is. For example, if the short hand is on the 3, it's 3 o'clock.
                    </p>
                </div>
            </div>
        </div>
    );

    // --- Right Panel: Interactive Clock Master ---
    const RightInteractionPanel = () => {
        const [time, setTime] = useState({ hour: 3, minute: 0 });
        const clockRef = useRef<HTMLDivElement>(null); // Ref for the clock element

        const minuteAngle = time.minute * 6;
        const hourAngle = (time.hour % 12) * 30 + time.minute * 0.5;

        const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            const clockNode = clockRef.current;
            if (!clockNode) return; // Guard clause to ensure the element exists

            const clock = clockNode.getBoundingClientRect();
            const clockCenter = { x: clock.width / 2, y: clock.height / 2 };
            
            const angle = Math.atan2(
                info.point.y - clock.top - clockCenter.y,
                info.point.x - clock.left - clockCenter.x
            ) * 180 / Math.PI + 90;
            
            const positiveAngle = (angle + 360) % 360;
            const distFromCenter = Math.sqrt(Math.pow(info.point.x - clock.left - clockCenter.x, 2) + Math.pow(info.point.y - clock.top - clockCenter.y, 2));

            if (distFromCenter > 40) { // Dragging outer part moves minute hand
                const newMinute = Math.round(positiveAngle / 6) % 60;
                setTime(prev => ({ ...prev, minute: newMinute }));
            } else { // Dragging inner part moves hour hand
                const newHour = Math.round(positiveAngle / 30);
                setTime(prev => ({...prev, hour: newHour === 0 ? 12 : newHour }));
            }
        };

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Clock Master</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Drag the hands to set the time!</p>
                
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center select-none">
                    <motion.div
                        ref={clockRef}
                        onPan={handlePan}
                        className="w-56 h-56 bg-white dark:bg-slate-800 rounded-full border-4 border-slate-300 dark:border-slate-700 relative shadow-lg cursor-pointer"
                    >
                        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-slate-900 dark:bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
                        <motion.div 
                            className="absolute top-1/2 left-1/2 w-1.5 h-16 bg-slate-900 dark:bg-white rounded-full origin-top z-10 pointer-events-none"
                            style={{ transform: `translateX(-50%) rotate(${hourAngle}deg)` }}
                        ></motion.div>
                        <motion.div 
                            className="absolute top-1/2 left-1/2 w-1 h-24 bg-slate-900 dark:bg-white rounded-full origin-top z-10 pointer-events-none"
                            style={{ transform: `translateX(-50%) rotate(${minuteAngle}deg)` }}
                        ></motion.div>
                    </motion.div>

                    <div className="mt-6 font-mono text-3xl bg-slate-200 dark:bg-slate-900 px-4 py-2 rounded-lg text-slate-800 dark:text-slate-200">
                        {String(time.hour).padStart(2, '0')}:{String(time.minute).padStart(2, '0')}
                    </div>
                </div>
            </div>
        );
    };

    // --- Slide Layout ---
    const slideContent = (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <LeftTheoryPanel />
                </TrackedInteraction>
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <RightInteractionPanel />
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="measurements-time" 
            slideTitle="Telling Time" 
            moduleId="grade-2-math-measurement"
            submoduleId="time"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}