import React from 'react';
import { Slide } from '../common-components/concept';

// Import the slides array from each of your three submodules
import { arithmeticFoundationsSlides } from './submodules/arithmetic-foundations';
import { multiplicationDivisionSlides } from './submodules/multiplication-division';
import { fractionsAndDecimalsSlides } from './submodules/fractions-and-decimals';

// Define the interface for a submodule
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  estimatedTime?: string;
  // FIX: Removed the hyphen from 'Begin-ner'
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

// Define the three submodules for the Arithmetic module
export const submodules: Submodule[] = [
  {
    id: 'core-concepts',
    title: 'The Number World (Units 1-5)',
    description: 'Learn the basics of counting, place value, addition, and subtraction.',
    slides: arithmeticFoundationsSlides, // Note: This should be coreConceptsSlides
    estimatedTime: '40 min',
    difficulty: 'Beginner',
    topics: ['Counting', 'Place Value', 'Addition', 'Subtraction']
  },
  {
    id: 'multiplication-division',
    title: 'Math Superpowers (Units 6-10)',
    description: 'Master multiplication and division, including multi-digit problems and remainders.',
    slides: multiplicationDivisionSlides,
    estimatedTime: '50 min',
    difficulty: 'Beginner',
    topics: ['Multiplication', 'Division', 'Arrays', 'Remainders']
  },
  {
    id: 'fractions-and-decimals',
    title: 'Fun with Parts of Numbers (Units 11-15)',
    description: 'Explore fractions and decimals and learn how to perform operations with them.',
    slides: fractionsAndDecimalsSlides,
    estimatedTime: '60 min',
    difficulty: 'Intermediate',
    topics: ['Fractions', 'Decimals', 'Add Fractions', 'Multiply Fractions']
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