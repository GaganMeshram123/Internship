import React from 'react';
import { Slide } from '../common-components/concept';

// Import the slides array from each of your three submodules
import { addSubtractWithin20Slides } from './submodules/add-subtract-within-20';
import { addSubtractWithin100Slides } from './submodules/add-subtract-within-100';
import { addSubtractWithin1000Slides } from './submodules/add-subtract-within-1000';

// Define the interface for a submodule
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

// Define the three submodules for the Grade 2 Math Operations module
export const submodules: Submodule[] = [
  {
    id: 'add-subtract-within-20',
    title: 'Add and Subtract within 20',
    description: 'Master basic addition and subtraction facts up to 20 using number lines and visual aids.',
    slides: addSubtractWithin20Slides,
    difficulty: 'Beginner',
    topics: ['Addition', 'Subtraction', 'Number Line', 'Fact Families']
  },
  {
    id: 'add-subtract-within-100',
    title: 'Add and Subtract within 100',
    description: 'Work with two-digit numbers, including the important concepts of regrouping (carrying and borrowing).',
    slides: addSubtractWithin100Slides,
    difficulty: 'Beginner',
    topics: ['Two-Digit Numbers', 'Place Value', 'Carrying', 'Borrowing']
  },
  {
    id: 'add-subtract-within-1000',
    title: 'Add and Subtract within 1000',
    description: 'Expand your skills to three-digit numbers and solve multi-step word problems.',
    slides: addSubtractWithin1000Slides,
    difficulty: 'Intermediate',
    topics: ['Three-Digit Numbers', 'Advanced Regrouping', 'Word Problems']
  }
];

// Main component for the module
function Grade2MathOperationsModule() {
  return (
    <div>
      {/* This is a placeholder for the module's main page. */}
    </div>
  );
}

export default Grade2MathOperationsModule;