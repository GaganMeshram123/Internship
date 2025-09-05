import React from 'react';
import { ClassDetails, WorksheetDetails } from './types';
import WorksheetItem from './WorksheetItem';
import { LoadingSpinner } from './UIComponents';

interface ClassWorksheetListProps {
  worksheets: WorksheetDetails[];
  studentDetails: { id: string } | null;
  loading: boolean;
  selectedClass: ClassDetails;
  onAttemptWorksheet: (worksheet: WorksheetDetails) => void;
  onViewAnalysis: (analysisResult: any) => void;
  checkIfWorksheetAttempted: (worksheetId: string) => Promise<any>;
  onBack: () => void;
  onCreateTest: () => void;
}

const ClassWorksheetList = ({
  worksheets,
  studentDetails,
  loading,
  selectedClass,
  onAttemptWorksheet,
  onViewAnalysis,
  checkIfWorksheetAttempted,
  onBack,
  onCreateTest
}: ClassWorksheetListProps) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-200 transition flex items-center mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Back to Class</span>
          </button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Class Practice</h2>
        </div>
        
        <button 
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-md transition flex items-center"
          onClick={onCreateTest}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Test
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center p-12">
          <LoadingSpinner size="large" message="Loading class worksheets" />
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
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No practice worksheets available for this class.</p>
        </div>
      )}
    </div>
  );
};

export default ClassWorksheetList; 