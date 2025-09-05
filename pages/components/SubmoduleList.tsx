import React from 'react';
import { EnhancedModuleDetails, Submodule } from './types';
import SubmoduleItem from './SubmoduleItem';
import { LoadingSpinner } from './UIComponents';

interface SubmoduleListProps {
  module: EnhancedModuleDetails;
  moduleResponses: {[submoduleId: string]: any};
  onSubmoduleSelect: (submodule: Submodule) => void;
  onBack: () => void;
  isLoading?: boolean;
  hideBackButton?: boolean;
}

const SubmoduleList = ({ 
  module, 
  moduleResponses, 
  onSubmoduleSelect, 
  onBack,
  isLoading = false,
  hideBackButton = false
}: SubmoduleListProps) => {
  // Function to calculate progress
  const calculateProgress = () => {
    const totalSubmodules = module.submodulesList?.length || 0;
    const completedSubmodules = module.submodulesList?.filter(
      submodule => Boolean(moduleResponses[submodule.id]?.slides?.completion)
    ).length || 0;
    
    return {
      completedCount: completedSubmodules,
      totalCount: totalSubmodules,
      percent: totalSubmodules > 0 
        ? Math.round((completedSubmodules / totalSubmodules) * 100) 
        : 0
    };
  };

  const progress = calculateProgress();

  return (
    <div>
      {!hideBackButton && (
        <div className="mb-6 flex items-center">
          <button 
            onClick={onBack}
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-200 transition flex items-center mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Back to Lessons</span>
          </button>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{module.title}</h3>
          </div>
        </div>
      )}
      
      
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Lessons</h4>
        
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <LoadingSpinner size="default" message="Loading submodules..." />
          </div>
        ) : (
          module.submodulesList && (
            <div className="relative">
              {module.submodulesList.map((submodule, index) => {
                // Check if this submodule is completed
                const submoduleData = moduleResponses[submodule.id];
                const hasCompletionSlide = submoduleData?.slides?.completion;
                const isCompleted = Boolean(hasCompletionSlide);
                
                // Find the first incomplete module index
                const firstIncompleteIndex = module.submodulesList?.findIndex(
                  (s) => !moduleResponses[s.id]?.slides?.completion
                ) ?? 0;
                
                // Determine if this submodule should be accessible
                // A submodule is accessible if:
                // 1. It's already completed OR
                // 2. It's the first incomplete submodule
                const isAccessible = isCompleted || index === firstIncompleteIndex;
                
                // Determine if the connecting line should be green (progress up to this point)
                const lineCompleted = index < firstIncompleteIndex || (index === firstIncompleteIndex && isCompleted);
                
                return (
                  <div key={submodule.id} className="relative flex items-center mb-2 last:mb-0">
                    {/* Vertical progress indicator */}
                    <div className="relative flex items-center mr-4">
                      {/* Circle indicator - positioned at center of row */}
                      <div 
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 z-10 flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-green-600 border-green-600 text-white' 
                            : index === firstIncompleteIndex 
                              ? 'bg-white dark:bg-gray-800 border-green-600 border-2 text-green-600' 
                              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {isCompleted ? (
                          // Tick mark for completed lessons
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          // Lesson number for incomplete lessons
                          <span className="text-xs font-semibold">{index + 1}</span>
                        )}
                      </div>
                      
                      {/* Connecting line to next circle */}
                      {index < module.submodulesList!.length - 1 && (
                        <div 
                          className={`absolute w-0.5 transition-all duration-300 ${
                            lineCompleted 
                              ? 'bg-green-600' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          style={{
                            top: '16px', // Start from bottom of larger circle (circle height/2)
                            left: '15px', // Center of the larger circle
                            height: '4rem', // Increased to properly reach next circle with mb-2 spacing
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Submodule content */}
                    <div className="flex-1">
                      <SubmoduleItem
                        submodule={submodule}
                        index={index}
                        isCompleted={isCompleted}
                        isAccessible={isAccessible}
                        onSelect={onSubmoduleSelect}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SubmoduleList; 
 