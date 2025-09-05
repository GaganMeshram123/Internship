import React from 'react';
import { ClassDetails } from './types';

interface ClassDetailProps {
  selectedClass: ClassDetails;
  onBack: () => void;
  onClassPracticeClick?: () => void;
  isWorksheetView?: boolean;
}

const ClassDetail = ({ 
  selectedClass, 
  onBack,
  onClassPracticeClick,
  isWorksheetView = false
}: ClassDetailProps) => {
  return (
    <div>
      {!isWorksheetView && (
        <>
          <div className="mt-6 mb-4 flex flex-wrap items-center">
            <button 
              onClick={onBack}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-200 transition flex items-center mr-4 mb-2 sm:mb-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Back to Classes</span>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex-1 mb-2 sm:mb-0">{selectedClass.name}</h2>
            <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded font-mono text-indigo-700 dark:text-indigo-300 mt-1 sm:mt-0">
              {selectedClass.class_code}
            </span>
          </div>
        </>
      )}
      
      {!isWorksheetView && selectedClass.description && (
        <div className="mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
          <p className="text-gray-700 dark:text-gray-300">{selectedClass.description}</p>
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">{isWorksheetView ? "Practice Questions" : "Class Lessons"}</h3>
        {selectedClass.class_practice && onClassPracticeClick && !isWorksheetView && (
          <button 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-md transition flex items-center"
            onClick={onClassPracticeClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Class Practice
          </button>
        )}
      </div>
    </div>
  );
};

export default ClassDetail; 