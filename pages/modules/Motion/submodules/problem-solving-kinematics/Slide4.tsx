import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { InteractionResponse } from '../../../common-components/concept';

const assessmentQuestions = [
  {
    id: 'psk-problem-1',
    questionText: 'A train starts from rest and accelerates uniformly at 2 m/s² for 10 seconds. Calculate the final velocity of the train and the total distance it travels in this time.',
  },
  {
    id: 'psk-problem-2',
    questionText: 'A stone is dropped from the top of a tall building. It takes 4 seconds to reach the ground. How tall is the building? (Assume acceleration due to gravity, g = 9.8 m/s²).',
  },
  {
    id: 'psk-problem-3',
    questionText: 'A car travelling at 72 km/h applies brakes and comes to a stop over a distance of 50 meters. What was the car\'s acceleration?',
  }
];

export default function ProblemSolvingAssessment() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = React.useState<Record<string, InteractionResponse>>({});

  const slideContent = (
    <div className={`w-full min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`max-w-4xl w-full p-8 space-y-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg`}>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">Submodule Assessment</h2>
            <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Use the G.U.E.S.S. method to solve these problems.</p>
        </div>

        <div className="space-y-6">
            {assessmentQuestions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                    <p className="font-semibold text-lg">
                        <span className="text-cyan-500">Problem {index + 1}:</span> {q.questionText}
                    </p>
                    <div className="mt-4">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md cursor-not-allowed" disabled>
                            Upload Your Solution (Placeholder)
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
      slideId="psk-assessment"
      slideTitle="Kinematics Problem Solving Assessment"
      moduleId="motion"
      submoduleId="problem-solving-kinematics"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}