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

function ConstructingLinearModelsAssessment({ questions, interaction, onInteractionComplete }: Props) {
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Assessment: Constructing Models</h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow overflow-y-auto">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">Read the scenarios and answer the questions.</p>
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
        id: 'construct-equation-q',
        questionText: <span>A taxi charges a ₹25 starting fee and ₹18 per kilometer. Write the linear equation that models the total cost (<InlineMath>{'y'}</InlineMath>) for (<InlineMath>{'x'}</InlineMath>) kilometers.</span>,
    },
    {
        id: 'find-b-from-word-problem-q',
        questionText: 'You have ₹5000 in your bank account and you deposit ₹400 every week. What is the initial value (b) in this scenario?',
    },
    {
        id: 'find-m-from-word-problem-q',
        questionText: 'In the bank account scenario from the previous question, what is the rate of change (m)?',
    },
];

export default function ConstructingLinearModelsSlide5() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const assessmentInteraction: Interaction = {
        id: 'constructing-models-assessment',
        conceptId: 'constructing-models-assessment',
        conceptName: 'Assessment: Constructing Models',
        type: 'learning',
    };

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    return (
        <SlideComponentWrapper 
            slideId="constructing-models-assessment" 
            slideTitle="Assessment: Constructing Models" 
            moduleId="linear-equations-and-functions" 
            submoduleId="constructing-linear-models"
            interactions={localInteractions}
        >
            <ConstructingLinearModelsAssessment 
                questions={assessmentQuestions}
                interaction={assessmentInteraction}
                onInteractionComplete={handleInteractionComplete}
            />
        </SlideComponentWrapper>
    );
}