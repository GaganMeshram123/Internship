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

function LinearAndNonlinearFunctionsAssessment({ questions, interaction, onInteractionComplete }: Props) {
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Assessment: Linear vs. Nonlinear</h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow overflow-y-auto">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">Determine if each representation describes a linear or nonlinear function.</p>
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
                      placeholder="Type your answer (Linear or Nonlinear) and brief reasoning..."
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
        id: 'identify-from-graph-q',
        questionText: 'The graph of a function is a curve, not a straight line. Is the function linear or nonlinear?',
    },
    {
        id: 'identify-from-equation-q',
        questionText: <span>Is the equation <InlineMath>{'y = x^2 + 3'}</InlineMath> linear or nonlinear?</span>,
    },
    {
        id: 'identify-from-table-q',
        questionText: 'A table shows that as x increases by 1, y consistently increases by 5. Does this table represent a linear or nonlinear function?',
    },
    {
        id: 'identify-from-equation-2-q',
        questionText: <span>Is the equation <InlineMath>{'y = 7x - 2'}</InlineMath> linear or nonlinear?</span>,
    },
];

export default function LinearAndNonlinearFunctionsSlide5() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const assessmentInteraction: Interaction = {
        id: 'linear-vs-nonlinear-assessment',
        conceptId: 'linear-vs-nonlinear-assessment',
        conceptName: 'Assessment: Linear vs. Nonlinear',
        type: 'learning',
    };

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    return (
        <SlideComponentWrapper 
            slideId="linear-vs-nonlinear-assessment" 
            slideTitle="Assessment: Linear vs. Nonlinear" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-and-nonlinear-functions"
            interactions={localInteractions}
        >
            <LinearAndNonlinearFunctionsAssessment 
                questions={assessmentQuestions}
                interaction={assessmentInteraction}
                onInteractionComplete={handleInteractionComplete}
            />
        </SlideComponentWrapper>
    );
}