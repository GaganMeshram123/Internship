import React from 'react';

interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: any[];
  thumbnail?: string;
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

interface SimpleSubmoduleListProps {
  submodules: Submodule[];
  onSubmoduleSelect: (submodule: Submodule) => void;
  onBack: () => void;
  moduleTitle: string;
}

const SimpleSubmoduleList: React.FC<SimpleSubmoduleListProps> = ({
  submodules,
  onSubmoduleSelect,
  onBack,
  moduleTitle
}) => {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-center">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition flex items-center mr-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Modules</span>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{moduleTitle}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{submodules.length} lessons available</p>
        </div>
      </div>

      {/* Submodules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submodules.map((submodule, index) => (
          <div
            key={submodule.id}
            onClick={() => onSubmoduleSelect(submodule)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:border-indigo-300 dark:hover:border-indigo-600"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-lg mr-3">
                  {index + 1}
                </div>
                <div className="flex flex-col">
                  {submodule.difficulty && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(submodule.difficulty)} mb-1`}>
                      {submodule.difficulty}
                    </span>
                  )}
                </div>
              </div>
              {submodule.estimatedTime && (
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {submodule.estimatedTime}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
                {submodule.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {submodule.description}
              </p>
            </div>

            {/* Topics */}
            {submodule.topics && submodule.topics.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {submodule.topics.slice(0, 3).map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                  {submodule.topics.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{submodule.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {submodule.slides.length} slides
              </div>
              <div className="flex items-center text-indigo-600 dark:text-indigo-300">
                <span className="text-sm font-medium">Start →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleSubmoduleList;