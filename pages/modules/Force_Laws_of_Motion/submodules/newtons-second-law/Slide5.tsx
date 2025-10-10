import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// This component acts as a container or title card for the assessment.
// The actual question rendering and logic are handled by the
// parent component that consumes the 'questions' array from the index file.

export default function NewtonsSecondLawAssessment() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    // A static layout to introduce the final quiz for the submodule.
    const slideContent = (
        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="max-w-3xl text-center p-8">

                <div className={`mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                    {/* Target Icon */}
                    <svg className="w-12 h-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M5.636 18.364l-1.414 1.414M12 18a6 6 0 100-12 6 6 0 000 12z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-blue-500 mb-4">
                    Second Law Assessment
                </h1>

                <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 mb-8">
                    Let's test your ability to apply Newton's Second Law.
                </p>

                <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-md text-left`}>
                    <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Topics Covered:</h3>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li>The relationship between Force, Mass, and Acceleration.</li>
                        <li>The concept of Net Force in calculations.</li>
                        <li>Solving for F, m, or a using the formula <span className="font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">F=ma</span>.</li>
                    </ul>
                </div>
                
                <p className="mt-8 text-slate-500 dark:text-slate-400">
                    The assessment will begin on the next screen. You've got this!
                </p>

            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n2-assessment"
            slideTitle="Second Law Assessment"
            moduleId="force-and-laws"
            submoduleId="newtons-second-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}