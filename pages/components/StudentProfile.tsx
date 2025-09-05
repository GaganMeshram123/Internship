import React, { useState, useEffect } from 'react';
import { StudentDetails } from './types';
import ClassCodeInput from './ClassCodeInput';
import ActivityChart from './ActivityChart';

interface StudentProfileProps {
  studentDetails: StudentDetails;
  joiningClass: boolean;
  onJoinClass: (code: string) => void;
  joinSuccess?: boolean;
}

const StudentProfile = ({ 
  studentDetails, 
  joiningClass, 
  onJoinClass,
  joinSuccess = false
}: StudentProfileProps) => {
  const [resetInput, setResetInput] = useState(false);
  
  // Watch for join success and trigger input reset
  useEffect(() => {
    if (joinSuccess) {
      setResetInput(true);
      // Reset the flag after the effect runs
      return () => {
        setResetInput(false);
      };
    }
  }, [joinSuccess]);
  
  return (
    <div className="mb-6 grid grid-cols-12 gap-6 mt-6">
      <div className="col-span-12 md:col-span-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-4 shadow-lg">
        <div className="space-y-2 text-sm">
          {/* Add activity chart */}
          <div className="min-h-[320px]">
            <ActivityChart studentId={studentDetails.id} />
          </div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Join a Class</h2>
        <ClassCodeInput 
          onSubmit={onJoinClass}
          isLoading={joiningClass}
          resetAfterSubmit={resetInput}
        />
      </div>
    </div>
  );
};

export default StudentProfile; 