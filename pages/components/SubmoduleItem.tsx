import React from 'react';

interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: any[];
  thumbnail?: string;
  practice?: boolean;
}

interface SubmoduleItemProps {
  submodule: Submodule;
  index: number;
  isCompleted: boolean;
  isAccessible: boolean;
  onSelect: (submodule: Submodule) => void;
}

const SubmoduleItem = ({ 
  submodule, 
  index, 
  isCompleted, 
  isAccessible, 
  onSelect 
}: SubmoduleItemProps) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 border ${isAccessible ? 'border-gray-200 dark:border-gray-700' : 'border-gray-100 dark:border-gray-800'} rounded-md py-3 px-4 shadow hover:shadow-md ${isAccessible ? 'hover:border-gray-300 dark:hover:border-gray-600' : ''} transition ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}
      onClick={() => isAccessible ? onSelect(submodule) : null}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          <div className="truncate">
            <h5 className={`font-medium truncate ${isAccessible ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{submodule.title}</h5>
            <p className={`text-xs truncate ${isAccessible ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}>{submodule.description}</p>
          </div>
        </div>
        <div className="flex items-center ml-4 flex-shrink-0">
          <div className="relative group">
            <button 
              className={`text-xs px-3 py-1 rounded whitespace-nowrap transition lg:w-20 ${
                !isAccessible 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                  : isCompleted 
                    ? 'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white' 
                    : submodule.practice 
                      ? 'bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-600 text-white' 
                      : 'bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (isAccessible) {
                  onSelect(submodule);
                }
              }}
              disabled={!isAccessible}
            >
              {isCompleted ? 'Review' : submodule.practice ? 'Practice' : 'Learn'}
            </button>
            {!isAccessible && (
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-44 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white text-xs rounded py-1 px-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
                Complete previous lessons first
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmoduleItem; 