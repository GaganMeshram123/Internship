import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse, InteractionType } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Define the type for a single question object
type Question = {
    id: string;
    questionText: string;
    inputType: InteractionType;
    required: boolean;
};

// Define the type for the props the component receives
type Props = {
    questions?: Question[]; // Made optional to prevent errors in the index file
};

// This component now contains both the lesson and the assessment questions.
export default function CompleteSolutionsLessonAndAssessment({ questions }: Props) {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = questions ? questions.map((q: Question) => ({...q, conceptId: 'complete-solutions-lesson-and-assessment', conceptName: 'Complete Solutions Lesson & Assessment', type: q.inputType})) : [];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col overflow-y-auto">
      {/*   <h2 className="text-3xl font-bold text-center mb-6">Finding Complete Solutions & Practice</h2>
         */}
        {/* LESSON CONTENT STARTS HERE */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mb-6">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Lesson: Finding and Organizing Solutions</h3>
            <p className="mb-4">To graph an equation, you need to find several complete solutions. The best way to organize them is with a <strong>Solution Table</strong> using the "input-output" method.</p>
            
            <p className="font-semibold">Let's find three solutions for the equation: <InlineMath>{'y = 3x - 1'}</InlineMath></p>
            
            <div className="my-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th className="p-2 border border-slate-300 dark:border-slate-600">Input `x`</th>
                            <th className="p-2 border border-slate-300 dark:border-slate-600">Calculation `y = 3x - 1`</th>
                            <th className="p-2 border border-slate-300 dark:border-slate-600">Complete Solution `(x, y)`</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">-1</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y = 3(-1) - 1 = -4'}</InlineMath></td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-bold"><InlineMath>{'(-1, -4)'}</InlineMath></td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">0</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y = 3(0) - 1 = -1'}</InlineMath></td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-bold"><InlineMath>{'(0, -1)'}</InlineMath></td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">2</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y = 3(2) - 1 = 5'}</InlineMath></td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-bold"><InlineMath>{'(2, 5)'}</InlineMath></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-sm italic"><strong>Why is this useful?</strong> Each solution is a point on a graph. Finding three points helps you draw the line for the equation correctly and check for mistakes!</p>
        </div>
        {/* LESSON CONTENT ENDS HERE */}

        {/* ASSESSMENT CONTENT STARTS HERE */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Test Your Knowledge</h3>
          <div className="space-y-6">
            {questions && questions.map((question: Question, index: number) => (
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
            {!questions && <p>No questions provided for this assessment.</p>}
          </div>
        </div>
        {/* ASSESSMENT CONTENT ENDS HERE */}
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="complete-solutions-lesson-and-assessment" 
            slideTitle="Complete Solutions Lesson & Assessment" 
            moduleId="linear-equations-and-functions" 
            submoduleId="solutions-to-linear-equations"
            interactions={localInteractions}
        >
            {slideInteractions.length > 0 ? (
                <TrackedInteraction 
                    interaction={slideInteractions[0]}
                    onInteractionComplete={handleInteractionComplete}
                >
                    {slideContent}
                </TrackedInteraction>
            ) : (
                slideContent
            )}
        </SlideComponentWrapper>
    );
}