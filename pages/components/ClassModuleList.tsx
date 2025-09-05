import React from 'react';
import { ModuleDetails, StudentDetails } from './types';
import ModuleCard from './ModuleCard';
import { SkeletonCard } from './UIComponents';

interface ClassModuleListProps {
  modules: ModuleDetails[];
  loading: boolean;
  studentDetails: StudentDetails | null;
  onModuleSelect: (module: ModuleDetails) => void;
  onViewWorksheets: (module: ModuleDetails) => void;
  onPremiumClick: (e: React.MouseEvent, module: ModuleDetails) => void;
  hasAccessToModule: (module: ModuleDetails) => boolean;
}

const ClassModuleList = ({
  modules,
  loading,
  studentDetails,
  onModuleSelect,
  onViewWorksheets,
  onPremiumClick,
  hasAccessToModule
}: ClassModuleListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">This class doesn&apos;t have any modules yet.</p>
      </div>
    );
  }

  // Sort modules by creation date in ascending order
  const sortedModules = [...modules].sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedModules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          hasAccess={hasAccessToModule(module)}
          onModuleSelect={onModuleSelect}
          onViewWorksheets={onViewWorksheets}
          onPremiumClick={onPremiumClick}
        />
      ))}
    </div>
  );
};

export default ClassModuleList; 