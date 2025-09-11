import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
import { vectorIntroductionSlides } from './submodules/vector-introduction/index';
import { vectorOperationsSlides } from './submodules/vector-operations/index';
import { workingWithAnglesSlides } from './submodules/working-with-angles/index';

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
    id: 'vector-introduction',
    title: 'Vector Introduction',
    description: 'Understand the need for vectors to represent both magnitude and direction in two dimensions',
    slides: vectorIntroductionSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Position Vector', 'Magnitude', 'Direction', '2D Coordinates']
  },
  {
    id: 'vector-operations',
    title: 'Vector Operations',
    description: 'Learn how to add vectors and perform other vector operations',
    slides: vectorOperationsSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Vector Addition', 'Displacement', 'Resultant Vector']
  },
  {
    id: 'working-with-angles',
    title: 'Working with Angles',
    description: 'Understanding vector direction through angles and trigonometry',
    slides: workingWithAnglesSlides,
    estimatedTime: '12 min',
    difficulty: 'Intermediate',
    topics: ['Vector Angles', 'Trigonometry', 'Direction', 'sin cos tan']
  }
];

function VectorsModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
    </div>
  );
}

export default VectorsModule; 