import React, { createContext, useState, useContext, ReactNode } from 'react';
import { StudentDetails } from '../pages/components/types';

interface StudentContextType {
  studentDetails: StudentDetails | null;
  setStudentDetails: React.Dispatch<React.SetStateAction<StudentDetails | null>>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);

  return (
    <StudentContext.Provider value={{ studentDetails, setStudentDetails }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}; 