import React from 'react';

// Stub component for DashboardContainer (not needed in module tester)
const DashboardContainer: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard Not Available</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is a module testing environment. Please go to the{' '}
          <a href="/" className="text-indigo-600 hover:text-indigo-500">
            modules page
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default DashboardContainer;