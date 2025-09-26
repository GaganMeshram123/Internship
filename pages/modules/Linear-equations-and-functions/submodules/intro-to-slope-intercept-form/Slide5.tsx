import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- TYPES AND DATA ---
type Question = {
    id: string;
    questionText: React.ReactNode;
};

// --- ASSESSMENT DISPLAY COMPONENT ---
type Props = {
    questions: Question[];
    interaction: Interaction;
    onInteractionComplete: (response: InteractionResponse) => void;
};

function IntroSlopeInterceptAssessment({ questions, interaction, onInteractionComplete }: Props) {
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Assessment: Slope-Intercept Basics</h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow overflow-y-auto">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">Answer the following questions to test your knowledge.</p>
          <div className="space-y-8">
            {questions.map((question, index) => (
              <div key={question.id}>
                <label htmlFor={question.id} className="block font-semibold text-lg">Question {index + 1}:</label>
                <div className="mt-1">{question.questionText}</div>
                <div className="mt-3">
                    <textarea
                      id={question.id}
                      rows={2}
                      className="p-2 w-full md:w-3/4 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                      placeholder="Type your answer here..."
                    />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return (
        <TrackedInteraction 
            interaction={interaction}
            onInteractionComplete={onInteractionComplete}
        >
            {slideContent}
        </TrackedInteraction>
    );
}

// --- PARENT COMPONENT & QUESTION DEFINITIONS ---
const assessmentQuestions: Question[] = [
    {
        id: 'what-is-m',
        questionText: <span>In the equation <InlineMath>{'y = mx + b'}</InlineMath>, what does the variable "m" represent?</span>,
    },
    {
        id: 'what-is-b',
        questionText: <span>In the equation <InlineMath>{'y = mx + b'}</InlineMath>, what does the variable "b" represent?</span>,
    },
    {
        id: 'identify-from-equation',
        questionText: <span>For the linear equation <InlineMath>{'y = -3x + 7'}</InlineMath>, what is the slope and what is the y-intercept?</span>,
    },
    {
        id: 'create-equation',
        questionText: <span>A line has a slope of <InlineMath>{'1/2'}</InlineMath> and a y-intercept of -4. What is its equation in slope-intercept form?</span>,
    },
];

export default function IntroSlopeInterceptSlide5() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const assessmentInteraction: Interaction = {
        id: 'slope-intercept-basics-assessment',
        conceptId: 'slope-intercept-basics-assessment',
        conceptName: 'Assessment: Slope-Intercept Basics',
        type: 'learning',
    };

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    return (
        <SlideComponentWrapper 
            slideId="slope-intercept-basics-assessment" 
            slideTitle="Assessment: Slope-Intercept Basics" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intro-to-slope-intercept-form"
            interactions={localInteractions}
        >
            <IntroSlopeInterceptAssessment 
                questions={assessmentQuestions}
                interaction={assessmentInteraction}
                onInteractionComplete={handleInteractionComplete}
            />
        </SlideComponentWrapper>
    );
}