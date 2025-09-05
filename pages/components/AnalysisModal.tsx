import React from 'react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisData: any;
}

const AnalysisModal = ({ isOpen, onClose, analysisData }: AnalysisModalProps) => {
  if (!isOpen || !analysisData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black/80 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl leading-6 font-bold text-gray-800 dark:text-white" id="modal-title">
                    Performance Analysis
                  </h3>
                  <button 
                    onClick={onClose}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-4 space-y-6">
                  {/* Analysis Section */}
                  {analysisData[0]?.analysis && (
                    <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-5 border-l-4 border-blue-500">
                      <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Analysis
                      </h4>
                      <ul className="space-y-3">
                        {analysisData[0].analysis.map((point: string, index: number) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300 text-lg flex">
                            <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Suggestions Section */}
                  {analysisData[0]?.suggestions && (
                    <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-5 border-l-4 border-green-500">
                      <h4 className="text-lg font-semibold text-green-600 dark:text-green-300 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Suggestions for Improvement
                      </h4>
                      <ul className="space-y-3">
                        {analysisData[0].suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300 text-lg flex">
                            <span className="mr-2 text-green-500 dark:text-green-400">→</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Closing Note */}
                  {analysisData[0]?.closing_note && (
                    <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-5 border-l-4 border-purple-500">
                      <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-300 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Summary
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg italic">
                        {analysisData[0].closing_note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal; 