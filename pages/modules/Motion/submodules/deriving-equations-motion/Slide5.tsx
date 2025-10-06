import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { InteractionResponse } from '../../../common-components/concept';

const assessmentQuestions = [
  {
    id: 'de-problem-1',
    questionText: 'Explain how the slope of a V-T graph leads to the first equation of motion, v = u + at. What does each term in the slope calculation (rise, run) represent?',
  },
  {
    id: 'de-problem-2',
    questionText: 'Show the shapes (rectangle, triangle) on a V-T graph that are used to derive the second equation. Write down the area calculation for each shape in terms of the variables u, a, and t.',
  },
  {
    id: 'de-problem-3',
    questionText: 'If you know an object\'s initial velocity (u), its acceleration (a), and the displacement (s) it traveled, which of the three equations would be the most direct one to use to find its final velocity (v)? Write down the equation.',
  }
];

export default function DerivingEquationsAssessment() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = React.useState<Record<string, InteractionResponse>>({});

  const slideContent = (
    <div className={`w-full min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`max-w-4xl w-full p-8 space-y-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg`}>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">Submodule Assessment</h2>
            <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Explain the origin and use of the kinematic equations.</p>
        </div>

        <div className="space-y-6">
            {assessmentQuestions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                    <p className="font-semibold text-lg">
                        <span className="text-yellow-500">Question {index + 1}:</span> {q.questionText}
                    </p>
                    <div className="mt-4">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md cursor-not-allowed" disabled>
                            Upload Your Explanation (Placeholder)
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="text-center mt-8">
            <button className="px-8 py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                Submit Assessment
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="de-assessment"
      slideTitle="Deriving Equations Assessment"
      moduleId="motion"
      submoduleId="deriving-equations-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}