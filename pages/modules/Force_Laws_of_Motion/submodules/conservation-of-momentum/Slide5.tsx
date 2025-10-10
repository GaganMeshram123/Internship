import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/Themed';
import 'katex/dist/katex.min.css';

// This component acts as a container or title card for the assessment.
// The actual question rendering and logic are handled by the
// parent component that consumes the 'questions' array from the index file.

export default function ConservationMomentumAssessment() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    // A static layout to introduce the final quiz for the submodule.
    const slideContent = (
        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="max-w-3xl text-center p-8">

                <div className={`mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                    {/* Collision Icon */}
                    <svg className="w-12 h-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 12.728A9 9 0 0118.364 5.636z" opacity="0.4" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-blue-500 mb-4">
                    Conservation of Momentum Assessment
                </h1>

                <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 mb-8">
                    Let's put your knowledge of collisions and momentum to the test.
                </p>

                <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-md text-left`}>
                    <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">You will be tested on:</h3>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li>The principle of momentum conservation in isolated systems.</li>
                        <li>The difference between elastic and inelastic collisions.</li>
                        <li>Solving for final velocity in perfectly inelastic collisions.</li>
                    </ul>
                </div>
                
                <p className="mt-8 text-slate-500 dark:text-slate-400">
                    The assessment for this submodule starts next. Good luck!
                </p>

            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="cm-assessment"
            slideTitle="Conservation of Momentum Assessment"
            moduleId="force-and-laws"
            submoduleId="conservation-of-momentum"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}