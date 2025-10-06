import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { InteractionResponse } from '../../../common-components/concept';

const assessmentQuestions = [
  {
    id: 'vtg-problem-1',
    questionText: 'From a velocity-time graph where velocity changes from 0 m/s to 20 m/s in 5 seconds in a straight line, calculate the object\'s acceleration.',
  },
  {
    id: 'vtg-problem-2',
    questionText: 'An object moves at a constant velocity of 15 m/s for 10 seconds. Sketch the V-T graph and calculate the total displacement by finding the area under the graph.',
  },
  {
    id: 'vtg-problem-3',
    questionText: 'What does a horizontal line on a Velocity-Time graph signify? What does a straight, sloped line passing through the origin signify?',
  }
];

export default function VelocityTimeGraphsAssessment() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = React.useState<Record<string, InteractionResponse>>({});

  const slideContent = (
    <div className={`w-full min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`max-w-4xl w-full p-8 space-y-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg`}>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Submodule Assessment</h2>
            <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Apply your knowledge of V-T graphs to solve these problems.</p>
        </div>

        <div className="space-y-6">
            {assessmentQuestions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                    <p className="font-semibold text-lg">
                        <span className="text-blue-500">Problem {index + 1}:</span> {q.questionText}
                    </p>
                    <div className="mt-4">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md cursor-not-allowed" disabled>
                            Upload Your Sketch/Solution (Placeholder)
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
      slideId="vtg-assessment"
      slideTitle="Velocity-Time Graphs Assessment"
      moduleId="motion"
      submoduleId="velocity-time-graphs"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}