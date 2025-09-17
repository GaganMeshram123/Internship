import React from 'react';
import { Slide } from '../common-components/concept';

// Import the slides array from your single submodule
import { arithmeticFoundationsSlides } from './submodules/arithmetic-foundations';

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

// Define the single submodule for the Arithmetic module
export const submodules: Submodule[] = [
  {
    id: 'arithmetic-foundations',
    title: 'Arithmetic Foundations',
    description: 'Learn the basics of counting, adding, subtracting, multiplying, and dividing in a fun and visual way!',
    slides: arithmeticFoundationsSlides,
    estimatedTime: '45 min',
    difficulty: 'Beginner',
    topics: ['Counting', 'Addition', 'Subtraction', 'Multiplication', 'Division']
  }
];

// Main component for the module
function ArithmeticModule() {
  return (
    <div>
      {/* This is a placeholder for the Arithmetic module's main page. */}
    </div>
  );
}

export default ArithmeticModule;