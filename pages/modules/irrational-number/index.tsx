import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
import { irrationalIntroductionSlides } from './submodules/irrational-introduction/index';
import { irrationalSumSlides } from './submodules/sum/index';
import { irrationalProductSlides } from './submodules/product/index';

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
    id: 'irrational-introduction',
    title: 'Introduction',
    description: 'Learn what irrational numbers are and how they differ from rational numbers.',
    slides: irrationalIntroductionSlides,
    estimatedTime: '10 min',
    difficulty: 'Beginner',
    topics: ['Definition', 'Examples (π, √2, e)', 'Non-repeating Decimals']
  },
  {
    id: 'irrational-sum',
    title: 'Sum',
    description: 'Understand how to add irrational numbers and their properties.',
    slides: irrationalSumSlides,
    estimatedTime: '12 min',
    difficulty: 'Beginner',
    topics: ['Addition Rules', 'Examples', 'Properties of Sum']
  },
  {
    id: 'irrational-product',
    title: 'Product',
    description: 'Learn how multiplication works with irrational numbers.',
    slides: irrationalProductSlides,
    estimatedTime: '12 min',
    difficulty: 'Beginner',
    topics: ['Multiplication Rules', 'Examples', 'Properties of Product']
  }
];

function IrrationalNumbersModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Content will render here */}
    </div>
  );
}

export default IrrationalNumbersModule;
