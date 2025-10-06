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

  // --- ADDED FOR FILE UPLOAD ---
  // State to hold the uploaded files, mapping question ID to the file object
  const [uploadedFiles, setUploadedFiles] = React.useState<Record<string, File>>({});
  // Ref for the hidden file input element
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  // State to track which question's upload button was clicked
  const [activeQuestionId, setActiveQuestionId] = React.useState<string | null>(null);

  // This function is triggered when an "Upload" button is clicked.
  // It sets the active question and programmatically clicks the hidden file input.
  const handleUploadClick = (questionId: string) => {
    setActiveQuestionId(questionId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // This function handles the file selection from the file dialog.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && activeQuestionId) {
      setUploadedFiles(prevFiles => ({
        ...prevFiles,
        [activeQuestionId]: file,
      }));
    }
    // Reset the input value to allow re-uploading the same file
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
          <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Explain the origin and use of the kinematic equations.</p>
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
            // --- ADDED VARIABLE FOR CHECKING UPLOADED FILE ---
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
                    {uploadedFile ? 'Change Explanation' : 'Upload Your Explanation'}
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