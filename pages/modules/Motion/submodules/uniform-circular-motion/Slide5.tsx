import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { InteractionResponse } from '../../../common-components/concept';

const assessmentQuestions = [
  {
    id: 'ucm-problem-1',
    questionText: 'Explain why a car moving at a constant speed of 50 km/h around a circular track is considered to be accelerating.',
  },
  {
    id: 'ucm-problem-2',
    questionText: 'Draw a diagram of the Earth orbiting the Sun. At two different points in the orbit, draw and label the vectors for the Earth\'s instantaneous velocity and its centripetal acceleration.',
  },
  {
    id: 'ucm-problem-3',
    questionText: 'When you swing a ball on a string in a circle, the string provides the centripetal force. What happens to the ball if the string suddenly breaks? Describe its path.',
  }
];

export default function UCMotionAssessment() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = React.useState<Record<string, InteractionResponse>>({});

  const slideContent = (
    <div className={`w-full min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`max-w-4xl w-full p-8 space-y-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg`}>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Submodule Assessment</h2>
            <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Apply your conceptual understanding of circular motion.</p>
        </div>

        <div className="space-y-6">
            {assessmentQuestions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                    <p className="font-semibold text-lg">
                        <span className="text-indigo-500">Question {index + 1}:</span> {q.questionText}
                    </p>
                    <div className="mt-4">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md cursor-not-allowed" disabled>
                            Upload Your Explanation/Sketch (Placeholder)
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
      slideId="ucm-assessment"
      slideTitle="Uniform Circular Motion Assessment"
      moduleId="motion"
      submoduleId="uniform-circular-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}