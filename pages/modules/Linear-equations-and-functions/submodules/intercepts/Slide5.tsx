import React, { useState } from 'react';
import SlideComponentWrapper from '../../../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../../../common-components/concept';
import 'katex/dist/katex.min.css';

// This is a simplified assessment component. The questions are passed in via props from the index.tsx file.
export default function InterceptsAssessment({ questions }) {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = questions ? questions.map(q => ({...q, conceptId: 'intercepts-assessment', conceptName: 'Intercepts Assessment', type: 'question'})) : [];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Assessment: Intercepts</h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
          <p className="mb-4">Answer the following questions to test your knowledge.</p>
          <div className="space-y-6">
            {questions && questions.map((question, index) => (
              <div key={question.id}>
                <label htmlFor={question.id} className="block font-semibold text-lg">Question {index + 1}:</label>
                <p className="mt-1">{question.questionText}</p>
                <input
                  id={question.id}
                  type="text"
                  className="mt-2 p-2 w-full md:w-1/2 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                  placeholder="Type your answer here..."
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="intercepts-assessment" 
            slideTitle="Intercepts Assessment" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intercepts"
            interactions={localInteractions}
        >
            <TrackedInteraction 
                interaction={slideInteractions[0]} // This would need to be enhanced for multiple questions
                onInteractionComplete={handleInteractionComplete}
            >
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}