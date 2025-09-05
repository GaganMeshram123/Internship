import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeContext } from '@/lib/ThemeContext';

interface CompletionSlideProps {
  userData?: {
    studentId?: string;
    classId?: string;
    moduleId?: string;
    submoduleId?: string;
  };
}

const CompletionSlide: React.FC<CompletionSlideProps> = ({ userData }) => {
  const [animate, setAnimate] = useState(false);
  const [completionMarked, setCompletionMarked] = useState(false);
  const [apiCompleted, setApiCompleted] = useState(false);
  const [userInitiatedReturn, setUserInitiatedReturn] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  // Start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mark completion as ready (no API call here, let dashboard handle it)
  useEffect(() => {
    if (!userData?.studentId || !userData?.submoduleId || completionMarked) {
      return;
    }
    
    console.log('Marking completion as ready:', userData.submoduleId);
    setCompletionMarked(true);
    setApiCompleted(true);
  }, [userData, completionMarked]);
  
  // Set up auto-return after a delay
  useEffect(() => {
    // Only proceed if we completed the API call and animations have played
    if (apiCompleted && animate) {
      // Wait for animations to complete plus a comfortable viewing time
      const autoReturnDelay = setTimeout(() => {
        if (!userInitiatedReturn) {
          console.log('Auto-returning to module list after delay');
          notifyParentOfCompletion();
        }
      }, 5000); // 5 seconds after API completion and animations
      
      return () => clearTimeout(autoReturnDelay);
    }
  }, [apiCompleted, animate, userInitiatedReturn]);
  
  // Function to notify parent of completion
  const notifyParentOfCompletion = () => {
    if (window.parent && userData) {
      // First notify about completion for analytics/state updates
      window.parent.postMessage({
        type: 'SUBMODULE_COMPLETED',
        payload: {
          studentId: userData.studentId,
          submoduleId: userData.submoduleId,
          moduleId: userData.moduleId,
          classId: userData.classId,
          timestamp: new Date().toISOString()
        }
      }, '*');
    }
  };
  
  // Handle return to modules
  const handleReturnToModules = () => {
    setUserInitiatedReturn(true);
    
    // First ensure we notify about the completion
    notifyParentOfCompletion();
    
    // Then send message to return to submodule list
    if (window.parent) {
      window.parent.postMessage({
        type: 'SHOW_SUBMODULES'
      }, '*');
    }
  };
  
  // Notify parent that this is a completion slide to hide close button
  useEffect(() => {
    if (window.parent) {
      window.parent.postMessage({
        type: 'IS_COMPLETION_SLIDE',
        payload: true
      }, '*');
    }
    
    return () => {
      // Reset when component unmounts
      if (window.parent) {
        window.parent.postMessage({
          type: 'IS_COMPLETION_SLIDE',
          payload: false
        }, '*');
      }
    };
  }, []);
  
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center py-auto">
        {/* Circle animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={animate ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center"
        >
          {/* Checkmark animation */}
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="w-16 h-16 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path d="M5 13l4 4L19 7" />
          </motion.svg>
        </motion.div>
      
        {/* "Completed" text animation */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={animate ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mt-8 mb-4`}
        >
          Completed!
        </motion.h2>
        
        {/* Congratulation message animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center max-w-md`}
        >
          Great job! You&apos;ve completed this lesson.
          <br />
          <span className="text-indigo-500">
            Your progress has been saved.
          </span>
        </motion.p>
        
        {/* API status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-6 flex items-center"
        >
          {apiCompleted ? (
            <div className="flex items-center text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Progress synced successfully</span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-500">
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm">Syncing progress...</span>
            </div>
          )}
        </motion.div>
        
        {/* Return to modules button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={animate && apiCompleted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.5 }}
          onClick={handleReturnToModules}
          disabled={!apiCompleted}
          className={`mt-12 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
                    transition-colors duration-200 flex items-center gap-2 ${!apiCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span>Return to Modules</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default CompletionSlide; 