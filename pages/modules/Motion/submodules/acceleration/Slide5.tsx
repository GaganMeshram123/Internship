import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

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

  const slideContent = (
    <div className={`w-full min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`max-w-4xl w-full p-8 space-y-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-400">Submodule Assessment</h2>
          <p className="text-lg mt-2 text-slate-600 dark:text-slate-300">Apply your knowledge of acceleration to solve these problems.</p>
        </div>

        {/* Hidden file input that will be triggered programmatically */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx" // Specify acceptable file types
        />

        <div className="space-y-6">
          {assessmentQuestions.map((q, index) => {
            const uploadedFile = uploadedFiles[q.id];
            return (
              <div key={q.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                <p className="font-semibold text-lg">
                  <span className="text-blue-600 dark:text-blue-400">Problem {index + 1}:</span> {q.questionText}
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  {/* The button is now active and styled with a blue color scheme */}
                  <button
                    onClick={() => handleUploadClick(q.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {uploadedFile ? 'Change Solution' : 'Upload Solution'}
                  </button>
                  {/* Display the name of the uploaded file */}
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
      slideId="accel-assessment"
      slideTitle="Acceleration Assessment"
      moduleId="motion"
      submoduleId="acceleration"
      interactions={{}} // This was previously localInteractions, keeping it simple
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}
