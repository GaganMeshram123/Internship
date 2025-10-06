import React, { useState } from 'react'; // Changed from 'React' to 'React, { useState }'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { InteractionResponse } from '../../../common-components/concept'; // Added missing import

// FIX 1: Removed the import for CheckCircleIcon as the library is not available.
// import { CheckCircleIcon } from '@heroicons/react/24/solid';

const assessmentQuestions = [
  {
    id: 'dd-problem-1',
    questionText: 'A person walks 8 meters east and then 6 meters north. Calculate the total distance traveled and the magnitude of the displacement. Show your work.',
  },
  {
    id: 'dd-problem-2',
    questionText: 'An athlete runs exactly one lap around a circular track with a radius of 50 meters. What is the distance covered, and what is her displacement? Explain your reasoning.',
  },
  {
    id: 'dd-problem-3',
    questionText: 'A car travels from point A to point B, which is 10 km away. It then returns to point A. The entire trip takes 30 minutes. What is the car\'s total distance and final displacement for the entire trip?',
  },
  {
    id: 'dd-conceptual-q',
    questionText: 'Is it possible for the displacement of an object to be greater than the distance it traveled? Explain why or why not.',
  }
];


export default function DistanceDisplacementAssessment() {
  const { isDarkMode } = useThemeContext();
  
  // FIX 2a: Declare the 'localInteractions' state variable.
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideContent = (
    <div className={`w-full min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`max-w-4xl w-full p-8 space-y-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg`}>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Submodule Assessment</h2>
            <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Answer the following questions to complete the module.</p>
        </div>

        <div className="space-y-6">
            {assessmentQuestions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                    <p className="font-semibold text-lg">
                        <span className="text-blue-500">Question {index + 1}:</span> {q.questionText}
                    </p>
                    <div className="mt-4">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md cursor-not-allowed" disabled>
                            Upload Your Work (UI Placeholder)
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="text-center mt-8">
            <button className="px-8 py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                Submit Final Assessment
            </button>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="dd-assessment" 
      slideTitle="Distance & Displacement Assessment" 
      moduleId="motion" 
      submoduleId="distance-displacement"
      // FIX 2b: Pass the 'localInteractions' state as a prop.
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}