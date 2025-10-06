import React, { useState, useRef } from 'react'; // Changed from 'React, { useState }'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { InteractionResponse } from '../../../common-components/concept';

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
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  // --- ADDED FOR FILE UPLOAD ---
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

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
          <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Answer the following questions to complete the module.</p>
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
                    {uploadedFile ? 'Change Work' : 'Upload Your Work'}
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
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}