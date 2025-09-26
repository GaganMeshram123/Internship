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

function GraphingSlopeInterceptAssessment({ questions, interaction, onInteractionComplete }: Props) {
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Assessment: Graphing with y = mx + b</h2>
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
        id: 'first-point-to-plot',
        questionText: <span>When graphing the equation <InlineMath>{'y = 4x + 5'}</InlineMath>, what is the very first point you should plot on the graph? (Write as coordinates, e.g., (x, y))</span>,
    },
    {
        id: 'how-to-use-slope',
        questionText: <span>For the equation <InlineMath>{'y = -2x + 3'}</InlineMath>, after plotting the intercept, how would you use the slope (-2 or -2/1) to find the next point?</span>,
    },
    {
        id: 'find-next-point',
        questionText: <span>A line has a y-intercept at <InlineMath>{'(0, -2)'}</InlineMath> and a slope of 3. What are the coordinates of the next point you would find using "rise over run"?</span>,
    },
];

export default function GraphingSlopeInterceptSlide5() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const assessmentInteraction: Interaction = {
        id: 'graphing-y-mx-b-assessment',
        conceptId: 'graphing-y-mx-b-assessment',
        conceptName: 'Assessment: Graphing with y = mx + b',
        type: 'learning',
    };

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    return (
        <SlideComponentWrapper 
            slideId="graphing-y-mx-b-assessment" 
            slideTitle="Assessment: Graphing with y = mx + b" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-slope-intercept-form"
            interactions={localInteractions}
        >
            <GraphingSlopeInterceptAssessment 
                questions={assessmentQuestions}
                interaction={assessmentInteraction}
                onInteractionComplete={handleInteractionComplete}
            />
        </SlideComponentWrapper>
    );
}