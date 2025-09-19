import React from 'react';
import { Slide } from '../common-components/concept';

// Import the slides array from each of your two submodules
import { measurementSlides } from './submodules/measurements';
import { geometrySlides } from './submodules/geometry';

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

// Define the two submodules for the Grade 2 Math Geometry module
export const submodules: Submodule[] = [
  {
    id: 'measurements',
    title: 'Measurements',
    description: 'Learn how to measure length with rulers, tell time on a clock, and count money!',
    slides: measurementSlides,
    difficulty: 'Beginner',
    topics: ['Length', 'Time', 'Money', 'Data']
  },
  {
    id: 'geometry',
    title: 'Geometry',
    description: 'Explore the fun world of 2D and 3D shapes, and learn how to partition them into equal parts.',
    slides: geometrySlides,
    difficulty: 'Beginner',
    topics: ['2D Shapes', '3D Shapes', 'Partitioning', 'Area']
  }
];

// Main component for the module
function Grade2MathGeometryModule() {
  return (
    <div>
      {/* This is a placeholder for the module's main page. */}
    </div>
  );
}

export default Grade2MathGeometryModule;