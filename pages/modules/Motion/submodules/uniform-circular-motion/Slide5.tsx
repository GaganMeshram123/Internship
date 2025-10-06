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
  // FIX: Corrected the typo from 'useTheme-context()' to 'useThemeContext()'.
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
          <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Apply your conceptual understanding of circular motion.</p>
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
                  <span className="text-blue-600 dark:text-blue-400">Question {index + 1}:</span> {q.questionText}
                </p>
                {/* --- UPDATED BUTTON AND ADDED FILE NAME DISPLAY --- */}
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleUploadClick(q.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {uploadedFile ? 'Change Explanation/Sketch' : 'Upload Your Explanation/Sketch'}
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