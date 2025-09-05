import React from 'react';
import { ClassDetails } from './types';
import ClassCard from './ClassCard';

interface ClassListProps {
  classes: ClassDetails[];
  onClassSelect: (classItem: ClassDetails) => void;
}

const ClassList = ({ classes, onClassSelect }: ClassListProps) => {
  if (classes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">You don&apos;t have any classes yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((classItem) => (
        <ClassCard 
          key={classItem.id} 
          classItem={classItem} 
          onClassSelect={onClassSelect}
        />
      ))}
    </div>
  );
};

export default ClassList; 