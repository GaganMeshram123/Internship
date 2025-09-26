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

function RecognizingFunctionsAssessment({ questions, interaction, onInteractionComplete }: Props) {
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Assessment: Recognizing Functions</h2>
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
                      rows={3}
                      className="p-2 w-full md:w-3/4 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                      placeholder="Type your answer and reasoning here..."
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
        id: 'recognize-from-points-q',
        questionText: <span>Does the set of points <InlineMath>{'\\{ (1, 5), (2, 7), (1, 9) \\}'}</InlineMath> represent a function? Why or why not?</span>,
    },
    {
        id: 'recognize-from-table-q',
        questionText: 'A table shows x-values {1, 2, 3} and corresponding y-values {10, 20, 30}. Does this table represent a function?',
    },
    {
        id: 'recognize-from-mapping-q',
        questionText: "A mapping diagram shows the input 'A' pointing to both outputs 'X' and 'Y'. Is this a function?",
    },
];

export default function RecognizingFunctionsSlide5() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const assessmentInteraction: Interaction = {
        id: 'recognizing-functions-assessment',
        conceptId: 'recognizing-functions-assessment',
        conceptName: 'Assessment: Recognizing Functions',
        type: 'learning',
    };

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    return (
        <SlideComponentWrapper 
            slideId="recognizing-functions-assessment" 
            slideTitle="Assessment: Recognizing Functions" 
            moduleId="linear-equations-and-functions" 
            submoduleId="recognizing-functions"
            interactions={localInteractions}
        >
            <RecognizingFunctionsAssessment 
                questions={assessmentQuestions}
                interaction={assessmentInteraction}
                onInteractionComplete={handleInteractionComplete}
            />
        </SlideComponentWrapper>
    );
}