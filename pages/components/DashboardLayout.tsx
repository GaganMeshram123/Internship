import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import { Toast, CompletedModuleToast } from './UIComponents';
import ThemeToggle from '@/lib/ThemeToggle';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  studentName?: string;
  onSignOut: () => void;
  joinSuccess?: string | null;
  joinError?: string | null;
  toastType?: 'success' | 'error' | 'warning' | null;
  completedModuleInfo?: { title: string, id: string } | null;
  onDismissToast: () => void;
}

const DashboardLayout = ({
  children,
  title = 'Quazar - Student Dashboard',
  studentName,
  onSignOut,
  joinSuccess,
  joinError,
  toastType,
  completedModuleInfo,
  onDismissToast
}: DashboardLayoutProps) => {
  // Add effect to ensure body has scrolling enabled
  useEffect(() => {
    // Fix for mobile scrolling
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.height = '100%';
    document.documentElement.style.height = '100%';
    document.body.style.position = 'relative';
    
    return () => {
      // Cleanup
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
      document.body.style.position = '';
    };
  }, []);

  return (
    <div className="bg-gray-900 dark:bg-gray-900 bg-white" style={{ minHeight: '100vh', width: '100%', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <style jsx global>{`
          html, body {
            height: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            position: relative;
          }
        `}</style>
      </Head>
      
      <main style={{ height: 'auto', minHeight: '100vh', width: '100%', position: 'relative' }} className="text-gray-900 dark:text-gray-100">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-30 bg-gray-100 dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">Quazar</h1>
              </div>
              {studentName && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {studentName}
                  </span>
                  <ThemeToggle />
                  <button 
                    onClick={onSignOut} 
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12" style={{ paddingTop: '60px', position: 'relative' }}>
          {children}
        </div>
        
        {/* Toast Messages */}
        <div className="fixed bottom-4 right-4 max-w-xs md:max-w-md flex flex-col space-y-2 z-20 pointer-events-none">
          {joinSuccess && (
            <div className="pointer-events-auto">
              <Toast 
                message={joinSuccess} 
                type="success" 
                onDismiss={onDismissToast} 
              />
            </div>
          )}
          
          {completedModuleInfo && (
            <div className="pointer-events-auto">
              <CompletedModuleToast title={completedModuleInfo.title} />
            </div>
          )}
          
          {joinError && toastType && (
            <div className="pointer-events-auto">
              <Toast 
                message={joinError} 
                type={toastType} 
                onDismiss={onDismissToast} 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 