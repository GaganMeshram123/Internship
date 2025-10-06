import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { InteractionResponse } from '../../../common-components/concept';

// The questions for this assessment are defined in the submodule's index.tsx.
// This component presents them to the student.
const assessmentQuestions = [
  {
    id: 'accel-problem-1',
    questionText: 'A sports car accelerates from rest to 90 km/h in 5 seconds. What is its average acceleration in m/s²?',
  },
  {
    id: 'accel-problem-2',
    questionText: 'A ball is thrown upwards. It slows down as it rises. Is the acceleration of the ball positive, negative, or zero while it is going up? Explain your answer.',
  },
  {
    id: 'accel-problem-3',
    questionText: 'A train moving at 20 m/s applies its brakes and comes to a stop in 10 seconds. Calculate the train\'s acceleration.',
  }
];

export default function AccelerationAssessment() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = React.useState<Record<string, InteractionResponse>>({});

  const slideContent = (
    <div className={`w-full min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`max-w-4xl w-full p-8 space-y-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg`}>
        <div className="text-center">
            {/* STYLE UPDATE: Main heading style applied */}
            <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-400">Submodule Assessment</h2>
            <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Apply your knowledge of acceleration to solve these problems.</p>
        </div>

        <div className="space-y-6">
            {assessmentQuestions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                    <p className="font-semibold text-lg">
                        {/* STYLE UPDATE: Span color changed to blue */}
                        <span className="text-blue-600 dark:text-blue-400">Problem {index + 1}:</span> {q.questionText}
                    </p>
                    <div className="mt-4">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md cursor-not-allowed" disabled>
                            Upload Your Written Solution (Placeholder)
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="text-center mt-8">
            {/* STYLE UPDATE: Button color changed to blue */}
            <button className="px-8 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Submit Assessment
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="accel-assessment"
      slideTitle="Acceleration Assessment"
      moduleId="motion"
      submoduleId="acceleration"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}