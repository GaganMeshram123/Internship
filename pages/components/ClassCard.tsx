import React from 'react';

interface ClassDetails {
  id: string;
  name: string;
  description?: string;
  class_code: string;
  created_at: string;
  updated_at: string;
  studentsCount?: number;
  student_mode?: { premium: boolean };
  class_practice?: boolean;
}

interface ClassCardProps {
  classItem: ClassDetails;
  onClassSelect: (classItem: ClassDetails) => void;
}

const ClassCard = ({ classItem, onClassSelect }: ClassCardProps) => {
  return (
    <div 
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transition cursor-pointer flex flex-col h-full"
      onClick={() => onClassSelect(classItem)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition">{classItem.name}</h3>
        <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded font-mono text-indigo-600 dark:text-indigo-300">
          {classItem.class_code}
        </span>
      </div>
      
      <div className="min-h-[3rem] flex-grow">
        {classItem.description ? (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{classItem.description}</p>
        ) : (
          <div className="mb-4"></div>
        )}
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          Created: {new Date(classItem.created_at).toLocaleDateString()}
        </p>
        <button 
          className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition"
          onClick={(e) => {
            e.stopPropagation();
            onClassSelect(classItem);
          }}
        >
          View Class
        </button>
      </div>
    </div>
  );
};

export default ClassCard; 