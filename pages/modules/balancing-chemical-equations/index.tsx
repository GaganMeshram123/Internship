import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
import { introductionToBalancingSlides } from './submodules/introduction-to-balancing/index';
import { advancedBalancingSlides } from './submodules/advanced-balancing-techniques/index';

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
    id: 'introduction-to-balancing',
    title: 'Introduction to Balancing Chemical Equations',
    description: 'Learn the fundamental principles and systematic approaches to balancing chemical equations',
    slides: introductionToBalancingSlides,
    estimatedTime: '45 min',
    difficulty: 'Beginner',
    topics: ['Chemical Equations', 'Conservation of Mass', 'Balancing Strategy', 'Combustion Reactions']
  },
  {
    id: 'advanced-balancing-techniques',
    title: 'Advanced Balancing Techniques',
    description: 'Master advanced methods including LCM, fractional coefficients, and polyatomic ion strategies',
    slides: advancedBalancingSlides,
    estimatedTime: '60 min',
    difficulty: 'Intermediate',
    topics: ['LCM Method', 'Fractional Coefficients', 'Polyatomic Ions', 'Complex Equations']
  }
];

// Dummy React component to satisfy Next.js requirements
function BalancingChemicalEquationsComponent() {
  return (
    <div>
      This is a module component, not a page.
    </div>
  );
}

// Export the dummy component as default while keeping the submodules export
export default BalancingChemicalEquationsComponent; 