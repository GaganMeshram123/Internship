import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
import { introductionSlides } from './submodules/introduction/index';
import { fibonacciSequencesSlides } from './submodules/fibonacci-sequences/index';
import { arithmeticSequencesSlides } from './submodules/arithmetic-sequences/index';
import { advancedArithmeticSlides } from './submodules/advanced-arithmetic/index';
import { geometricSequencesSlides } from './submodules/geometric-sequences/index';
import { advancedGeometricSlides } from './submodules/advanced-geometric/index';

// Define the interface for submodules
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  thumbnail?: string;
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

// Define submodules with their slides
export const submodules: Submodule[] = [
  {
    id: 'introduction',
    title: 'Introduction to Sequences',
    description: 'Basic concepts of sequences, function notation, sequence terminology, and recursive definitions.',
    slides: introductionSlides,
    estimatedTime: '35 min',
    difficulty: 'Beginner',
    topics: ['Sequence Definition', 'Function Notation', 'Sequence Notation', 'Recursive Sequences']
  },
  {
    id: 'fibonacci-sequences',
    title: 'Fibonacci-Type Sequences',
    description: 'Understanding Fibonacci sequences, variants, and their unique mathematical properties.',
    slides: fibonacciSequencesSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Fibonacci Definition', 'Two-Term Recursion', 'Sequence vs Function Notation', 'Golden Ratio']
  },
  {
    id: 'arithmetic-sequences',
    title: 'Arithmetic Sequences',
    description: 'Comprehensive study of arithmetic sequences including explicit formulas, recursive definitions, and real-world applications.',
    slides: arithmeticSequencesSlides,
    estimatedTime: '45 min',
    difficulty: 'Intermediate',
    topics: ['Common Difference', 'Explicit Formulas', 'Recursive Formulas', 'Real-world Modeling']
  },
  {
    id: 'advanced-arithmetic',
    title: 'Advanced Arithmetic Sequences',
    description: 'Advanced techniques for working with non-consecutive terms, complex constraints, and variable solving in arithmetic sequences.',
    slides: advancedArithmeticSlides,
    estimatedTime: '35 min',
    difficulty: 'Advanced',
    topics: ['Non-consecutive Terms', 'Formula Constraints', 'Variable Solving', 'System Analysis']
  },
  {
    id: 'geometric-sequences',
    title: 'Geometric Sequences',
    description: 'Understanding geometric sequences with common ratios, recursive formulas, and explicit nth term expressions.',
    slides: geometricSequencesSlides,
    estimatedTime: '40 min',
    difficulty: 'Intermediate',
    topics: ['Common Ratio', 'Exponential Growth', 'Recursive Formulas', 'Explicit Formulas']
  },
  {
    id: 'advanced-geometric',
    title: 'Advanced Geometric Sequences',
    description: 'Advanced techniques for finding ratios from non-consecutive terms and determining indices of specific term values.',
    slides: advancedGeometricSlides,
    estimatedTime: '30 min',
    difficulty: 'Advanced',
    topics: ['Non-consecutive Ratios', 'Index Finding', 'System Solving', 'Complex Constraints']
  }
];

function SequencesModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
    </div>
  );
}

export default SequencesModule;