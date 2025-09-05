import React from 'react';

interface ModuleDetails {
  id: string;
  title: string;
  description?: string;
  module_slug: string;
  is_class_module: boolean;
  submodules?: boolean;
  ai_enabled: boolean;
  created_at: string;
  updated_at: string;
  module_mode?: { premium: boolean };
  completion?: {
    completedSubmodules: number;
    totalSubmodules: number;
    percentage: number;
  };
}

interface ModuleCardProps {
  module: ModuleDetails;
  hasAccess: boolean;
  onModuleSelect: (module: ModuleDetails) => void;
  onViewWorksheets: (module: ModuleDetails) => void;
  onPremiumClick: (e: React.MouseEvent, module: ModuleDetails) => void;
}

const ModuleCard = ({ module, hasAccess, onModuleSelect, onViewWorksheets, onPremiumClick }: ModuleCardProps) => {
  const isPremium = module.module_mode?.premium || false;
  
  const handleModuleClick = (e: React.MouseEvent) => {
    if (!hasAccess) {
      onPremiumClick(e, module);
    } else {
      onModuleSelect(module);
    }
  };
  
  // Debug log for modules with completion data
  if (module.completion) {
    console.log(`ModuleCard ${module.title}: width=${module.completion.percentage}%, completed=${module.completion.completedSubmodules}/${module.completion.totalSubmodules}`);
  }

  return (
    <div 
      key={module.id} 
      className={`relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg 
        ${hasAccess ? 'hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer' : 'opacity-75 cursor-not-allowed'}
        transition flex flex-col h-full overflow-hidden`}
      onClick={handleModuleClick}
    >
      {/* Progress indicator as bottom border */}
      {module.submodules && module.completion && (
        <div 
          className="absolute bottom-0 left-0 h-1.5 transition-all duration-500 rounded-r bg-green-500 dark:bg-green-400"
          style={{ width: `${module.completion.percentage}%` }}
          title={`${module.completion.completedSubmodules} of ${module.completion.totalSubmodules} lessons completed (${module.completion.percentage}%)`}
        />
      )}
      
      <div className="p-6 flex flex-col h-full">
        {/* Premium badge or lock icon */}
        {isPremium && (
          <div className="absolute top-3 right-3">
          {hasAccess ? (
            <div className="group relative">
              <span className="text-indigo-500 dark:text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </span>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-100 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                Premium Content
              </span>
            </div>
          ) : (
            <div className="group relative">
              <span className="text-gray-400 dark:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                Premium Required
              </span>
            </div>
          )}
          </div>
        )}
    
        <div className="flex justify-between items-start mb-4">
          <h4 className={`text-lg font-semibold ${hasAccess ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{module.title}</h4>
          {!module.is_class_module && (
            <span className="bg-indigo-100 dark:bg-indigo-900 text-xs px-2 py-1 rounded-full text-indigo-700 dark:text-indigo-200 ml-8">
              Custom
            </span>
          )}
        </div>
        
        <div className="min-h-[3rem] flex-grow">
          {module.description ? (
            <p className={`text-sm mb-4 line-clamp-2 ${hasAccess ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}>
              {module.description}
            </p>
          ) : (
            <div className="mb-4"></div>
          )}
        </div>
        
        {/* Show submodules and worksheets count */}
        {(module.submodules || module.completion) && (
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
              {module.completion && (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {module.completion.completedSubmodules}/{module.completion.totalSubmodules} lessons
                </span>
              )}
            </div>
            {hasAccess && (
              <span className="text-indigo-600 dark:text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard; 