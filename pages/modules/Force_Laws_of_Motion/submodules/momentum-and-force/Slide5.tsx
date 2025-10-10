import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// This component acts as a container or title card for the assessment.
// The actual question rendering and logic are handled by the
// parent component that consumes the 'questions' array from the index file.

export default function MomentumForceAssessment() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    // A static layout to introduce the final quiz for the submodule.
    const slideContent = (
        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="max-w-3xl text-center p-8">

                <div className={`mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                    {/* Impulse Graph Icon */}
                    <svg className="w-12 h-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-blue-500 mb-4">
                    Momentum & Impulse Assessment
                </h1>

                <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 mb-8">
                    Let's check your understanding of how forces change an object's momentum.
                </p>

                <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-md text-left`}>
                    <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Concepts Covered:</h3>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li>Calculating momentum using the formula <InlineMath>{'p=mv'}</InlineMath>.</li>
                        <li>The definition of Impulse as a change in momentum (<InlineMath>{'J = \\Delta p'}</InlineMath>).</li>
                        <li>The relationship between Impulse, Force, and Time (<InlineMath>{'F \\cdot \\Delta t = \\Delta p'}</InlineMath>).</li>
                        <li>Understanding Force as the rate of change of momentum.</li>
                    </ul>
                </div>
                
                <p className="mt-8 text-slate-500 dark:text-slate-400">
                    The assessment for this final submodule will begin next.
                </p>

            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="mf-assessment"
            slideTitle="Momentum & Impulse Assessment"
            moduleId="force-and-laws"
            submoduleId="momentum-and-force"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}