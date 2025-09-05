import React from 'react';
import { WorksheetDetails, ModuleDetails } from './types';
import WorksheetItem from './WorksheetItem';
import { LoadingSpinner } from './UIComponents';

interface WorksheetListProps {
  worksheets: WorksheetDetails[];
  selectedModule: ModuleDetails | null;
  studentDetails: { id: string } | null;
  loading: boolean;
  onAttemptWorksheet: (worksheet: WorksheetDetails) => void;
  onViewAnalysis: (analysisResult: any) => void;
  checkIfWorksheetAttempted: (worksheetId: string) => Promise<any>;
  onClose: () => void;
}

const WorksheetList = ({
  worksheets,
  selectedModule,
  studentDetails,
  loading,
  onAttemptWorksheet,
  onViewAnalysis,
  checkIfWorksheetAttempted,
  onClose
}: WorksheetListProps) => {
  if (!selectedModule) return null;

  return (
    <div>
      <div className="mb-6 flex items-center">
        <button 
          onClick={onClose}
          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-200 transition flex items-center mr-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Back to Lessons</span>
        </button>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedModule.title}</h3>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center p-12">
          <LoadingSpinner size="large" message="Loading worksheets" />
        </div>
      ) : worksheets.length > 0 ? (
        <div className="space-y-2">
          {worksheets.map((worksheet, index) => (
            <WorksheetItem
              key={worksheet.id}
              worksheet={worksheet}
              studentDetails={studentDetails}
              handleAttemptWorksheet={onAttemptWorksheet}
              handleViewAnalysis={onViewAnalysis}
              checkIfWorksheetAttempted={checkIfWorksheetAttempted}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No questions available for this module.</p>
        </div>
      )}
    </div>
  );
};

export default WorksheetList; 