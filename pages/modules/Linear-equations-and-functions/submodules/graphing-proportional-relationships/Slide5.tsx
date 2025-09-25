import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction, InteractionType } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- TYPES AND DATA ---

// Define an expanded type for a single question object to handle different formats
type Question = {
    id: string;
    questionText: React.ReactNode; // Allow JSX for formulas
    description?: React.ReactNode; // For extra info like tables or graph descriptions
    options?: string[]; // For multiple choice options
    required: boolean;
};

// --- ASSESSMENT COMPONENT (Modified to accept interaction props) ---

type Props = {
    questions?: Question[];
    interaction: Interaction; // Expect a single interaction object for the whole assessment
    onInteractionComplete: (response: InteractionResponse) => void;
};

function GraphingProportionalAssessment({ questions, interaction, onInteractionComplete }: Props) {
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Assessment: Proportional Relationships</h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow overflow-y-auto">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">Instructions: Answer all questions to the best of your ability. Show your work where required.</p>
          <div className="space-y-8">
            {questions && questions.map((question: Question, index: number) => (
              <div key={question.id}>
                <label htmlFor={question.id} className="block font-semibold text-lg">Question {index + 1}:</label>
                <div className="mt-1">{question.questionText}</div>
                {question.description && <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md">{question.description}</div>}
                
                {/* Render different input types based on question format */}
                <div className="mt-3">
                  {question.options ? (
                    // Render Radio Buttons for Multiple Choice
                    <div id={question.id} className="space-y-2">
                      {question.options.map(option => (
                        <label key={option} className="flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
                          <input type="radio" name={question.id} value={option} className="mr-3" />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    // Render Textarea for Short Answers
                    <textarea
                      id={question.id}
                      rows={3}
                      className="p-2 w-full md:w-3/4 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                      placeholder="Type your answer and reasoning here..."
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // Wrap the entire content in a single TrackedInteraction
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

// Define your assessment questions here
const assessmentQuestions: Question[] = [
    {
        id: 'q1-proportional-table',
        questionText: 'Which of the following tables shows a proportional relationship between the number of notebooks (x) and the total cost (y)?',
        description: (
            <div className='text-xs sm:text-sm grid grid-cols-3 gap-2 text-center'>
                <div><strong>A)</strong><table className='w-full mt-1 border'><thead><tr><th className='border-r'>x</th><th>y</th></tr></thead><tbody><tr><td className='border-r'>1</td><td>₹30</td></tr><tr><td className='border-r'>2</td><td>₹60</td></tr><tr><td className='border-r'>5</td><td>₹150</td></tr></tbody></table></div>
                <div><strong>B)</strong><table className='w-full mt-1 border'><thead><tr><th className='border-r'>x</th><th>y</th></tr></thead><tbody><tr><td className='border-r'>1</td><td>₹35</td></tr><tr><td className='border-r'>2</td><td>₹65</td></tr><tr><td className='border-r'>5</td><td>₹155</td></tr></tbody></table></div>
                <div><strong>C)</strong><table className='w-full mt-1 border'><thead><tr><th className='border-r'>x</th><th>y</th></tr></thead><tbody><tr><td className='border-r'>1</td><td>₹30</td></tr><tr><td className='border-r'>2</td><td>₹55</td></tr><tr><td className='border-r'>5</td><td>₹120</td></tr></tbody></table></div>
            </div>
        ),
        options: ['A', 'B', 'C'],
        required: true,
    },
    {
        id: 'q2-find-k-equation',
        questionText: <span>A scooter travels 135 kilometers using 3 litres of petrol. The relationship is proportional. <br/> <strong>(a)</strong> What is the constant of proportionality (k) in km/l? <br/> <strong>(b)</strong> Write the equation that relates distance (y) to petrol used (x).</span>,
        required: true,
    },
    {
        id: 'q3-graph-interpretation',
        questionText: 'What is the unit rate at which the tank is being filled, in litres per minute?',
        description: <span>The graph shows the amount of water filling a tank over time. A straight line starts at (0,0) and passes through the point (1, 50) and (4, 200).</span>,
        required: true,
    },
    {
        id: 'q4-true-false',
        questionText: <span>A library charges a one-time membership fee of <InlineMath>{'₹500'}</InlineMath> and then <InlineMath>{'₹10'}</InlineMath> for every book borrowed. Is the statement "The relationship between the number of books borrowed and the total cost is proportional" True or False? Explain your reasoning.</span>,
        required: true,
    },
    {
        id: 'q5-word-problem',
        questionText: <span>A recipe to make masala chai for 4 people requires 2 spoons of tea leaves. How many spoons of tea leaves are needed to make chai for a group of 10 people? (Show your steps).</span>,
        required: true,
    },
];

// This is the final component you will use in your application.
// It manages the state and interaction tracking, passing props down to the display component.
export default function AssessmentSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    // Define a SINGLE interaction for the entire assessment slide to match the expected structure
    const assessmentInteraction: Interaction = {
        id: 'proportional-relationships-assessment',
        conceptId: 'graphing-proportional-assessment',
        conceptName: 'Proportional Relationships Assessment',
        type: 'learning', // Use a valid InteractionType
    };

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    return (
        <SlideComponentWrapper 
            slideId="graphing-proportional-assessment" 
            slideTitle="Proportional Relationships Assessment" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-proportional-relationships"
            interactions={localInteractions} // Pass the state to the wrapper
        >
            <GraphingProportionalAssessment 
                questions={assessmentQuestions}
                interaction={assessmentInteraction}
                onInteractionComplete={handleInteractionComplete}
            />
        </SlideComponentWrapper>
    );
}