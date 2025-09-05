import React, { useState, useEffect } from 'react';
import { ModuleDetails, WorksheetDetails, EnhancedModuleDetails } from './types';
import SubmoduleList from './SubmoduleList';
import WorksheetItem from './WorksheetItem';

interface ModuleDetailViewProps {
  module: ModuleDetails | EnhancedModuleDetails;
  moduleResponses?: any;
  worksheets: WorksheetDetails[];
  loadingWorksheets: boolean;
  studentDetails: any;
  onBack: () => void;
  onSubmoduleSelect: (submodule: any) => void;
  onAttemptWorksheet: (worksheet: WorksheetDetails) => void;
  onViewAnalysis: (analysis: any) => void;
  checkIfWorksheetAttempted: (worksheetId: string) => any;
  isLoadingModuleResponses?: boolean;
}

const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({
  module,
  moduleResponses,
  worksheets,
  loadingWorksheets,
  studentDetails,
  onBack,
  onSubmoduleSelect,
  onAttemptWorksheet,
  onViewAnalysis,
  checkIfWorksheetAttempted,
  isLoadingModuleResponses = false
}) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'practice'>('lessons');
  const enhancedModule = module as EnhancedModuleDetails;
  const hasSubmodules = Boolean(enhancedModule.hasSubmodules && enhancedModule.submodulesList);

  return (
    <div className="mt-6">
      {/* Header with back button */}
      <div className="mb-6 flex items-center">
        <button 
          onClick={onBack}
          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition flex items-center mr-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{module.title}</h2>
      </div>

      {/* Module Description */}
      {module.description && (
        <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
          <p className="text-gray-700 dark:text-gray-300">{module.description}</p>
        </div>
      )}

      {/* Simple Centered Tab UI */}
      <div className="mb-8 flex justify-center">
        <div className="relative bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {/* Animated Background */}
          <div
            className={`absolute top-1 bottom-1 bg-indigo-600 dark:bg-indigo-500 rounded-md shadow-sm transition-all duration-300 ease-in-out ${
              activeTab === 'lessons' ? 'left-1' : 'right-1'
            }`}
            style={{
              width: 'calc(50% - 2px)'
            }}
          />
          
          {/* Tab Buttons */}
          <div className="relative flex">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`relative px-6 py-2.5 font-medium text-sm transition-all duration-300 ease-in-out rounded-md min-w-[120px] flex items-center justify-center gap-2 ${
                activeTab === 'lessons'
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Lessons</span>
            </button>
            
            <button
              onClick={() => setActiveTab('practice')}
              className={`relative px-6 py-2.5 font-medium text-sm transition-all duration-300 ease-in-out rounded-md min-w-[120px] flex items-center justify-center gap-2 ${
                activeTab === 'practice'
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Practice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'lessons' ? (
          hasSubmodules && enhancedModule.submodulesList ? (
            <SubmoduleList
              module={enhancedModule}
              moduleResponses={moduleResponses || {}}
              onSubmoduleSelect={onSubmoduleSelect}
              onBack={onBack}
              isLoading={isLoadingModuleResponses}
              hideBackButton={true}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">This module doesn't have submodules.</p>
            </div>
          )
        ) : (
          // Practice tab content - lessons-like layout without progress bar
          <div>
            {loadingWorksheets ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md py-3 px-4 shadow hover:shadow-md transition cursor-pointer relative mb-2 animate-pulse">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0 mb-3 md:mb-0">
                        <div className="flex-shrink-0 bg-gray-300 dark:bg-gray-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3"></div>
                        <div className="truncate flex-1">
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-2"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center md:ml-4 space-y-3 md:space-y-0 md:space-x-2 flex-shrink-0">
                        <div className="flex items-center w-full md:w-48 lg:w-64 xl:w-80 flex-shrink-0 md:order-1 md:mr-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3"></div>
                        </div>
                        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded md:order-2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : worksheets.length > 0 ? (
              <div className="space-y-4">
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
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">No practice questions available</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">Practice questions will appear here when they're added to this module.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDetailView;