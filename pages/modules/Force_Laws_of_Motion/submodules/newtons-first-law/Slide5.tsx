import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// This component acts as a container or title card for the assessment.
// The actual question rendering and logic are typically handled by the
// parent component that consumes the 'questions' array from the index file.

export default function NewtonsFirstLawAssessment() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    // Since this component doesn't manage the quiz flow itself, we create a static layout.
    const slideContent = (
        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="max-w-3xl text-center p-8">

                <div className={`mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                    {/* Checkmark Icon */}
                    <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-blue-500 mb-4">
                    First Law Assessment
                </h1>

                <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 mb-8">
                    It's time to check your understanding of Newton's First Law of Motion.
                </p>

                <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-md text-left`}>
                    <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">You will be tested on:</h3>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li>The concept of Inertia and its relation to mass.</li>
                        <li>Identifying states of Rest and Uniform Motion.</li>
                        <li>Distinguishing between Balanced and Unbalanced forces.</li>
                    </ul>
                </div>
                
                <p className="mt-8 text-slate-500 dark:text-slate-400">
                    Your assessment will begin on the next screen. Good luck!
                </p>

            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n1-assessment"
            slideTitle="First Law Assessment"
            moduleId="force-and-laws"
            submoduleId="newtons-first-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}