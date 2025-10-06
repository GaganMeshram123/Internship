import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { InteractionResponse } from '../../../common-components/concept';

// The questions for this assessment are defined in the submodule's index.tsx.
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

  // --- ADDED FOR FILE UPLOAD ---
  const [uploadedFiles, setUploadedFiles] = React.useState<Record<string, File>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeQuestionId, setActiveQuestionId] = React.useState<string | null>(null);

  const handleUploadClick = (questionId: string) => {
    setActiveQuestionId(questionId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && activeQuestionId) {
      setUploadedFiles(prevFiles => ({
        ...prevFiles,
        [activeQuestionId]: file,
      }));
    }
    if (event.target) {
        event.target.value = '';
    }
  };
  // --- END OF ADDITIONS ---

  const slideContent = (
    <div className={`w-full min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`max-w-4xl w-full p-8 space-y-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-400">Submodule Assessment</h2>
          <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Use the G.U.E.S.S. method to solve these problems.</p>
        </div>

        {/* --- ADDED HIDDEN INPUT FOR FILE UPLOAD --- */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />

        <div className="space-y-6">
          {assessmentQuestions.map((q, index) => {
            const uploadedFile = uploadedFiles[q.id];
            return (
              <div key={q.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                <p className="font-semibold text-lg">
                  <span className="text-blue-600 dark:text-blue-400">Problem {index + 1}:</span> {q.questionText}
                </p>
                {/* --- UPDATED BUTTON AND ADDED FILE NAME DISPLAY --- */}
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleUploadClick(q.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {uploadedFile ? 'Change Solution' : 'Upload Your Solution'}
                  </button>
                  {uploadedFile && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
                      File: {uploadedFile.name}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <button className="px-8 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
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