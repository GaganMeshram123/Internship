import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content (assuming these files will be created)
import { graphingProportionalSlides } from './submodules/graphing-proportional-relationships/index';
import { solutionsToLinearSlides } from './submodules/solutions-to-linear-equations/index';
import { interceptsSlides } from './submodules/intercepts/index';
import { slopeSlides } from './submodules/slope/index';

// Define the interface for submodules, matching your existing structure
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

// Define submodules with their slides and metadata
export const submodules: Submodule[] = [
  {
    id: 'graphing-proportional-relationships',
    title: 'Graphing Proportional Relationships',
    description: 'Learn how to visualize direct proportions and understand the meaning of the constant of proportionality.',
    slides: graphingProportionalSlides,
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    topics: ['Proportionality', 'Constant of Proportionality', 'Graphing y=kx', 'Unit Rate']
  },
  {
    id: 'solutions-to-linear-equations',
    title: 'Solutions to Linear Equations',
    description: 'Discover what it means for a pair of (x, y) values to be a "solution" to a linear equation.',
    slides: solutionsToLinearSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Ordered Pairs', 'Substitution', 'Verifying Solutions', 'Graphing Solutions']
  },
  {
    id: 'intercepts',
    title: 'Intercepts',
    description: 'Find where a line crosses the x-axis and y-axis, and understand the importance of these key points.',
    slides: interceptsSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['x-intercept', 'y-intercept', 'Finding from Equations', 'Graphing using Intercepts']
  },
  {
    id: 'slope',
    title: 'Slope',
    description: 'Master the concept of slope as "rise over run" and learn how to calculate the steepness of a line.',
    slides: slopeSlides,
    estimatedTime: '30 min',
    difficulty: 'Intermediate',
    topics: ['Rise over Run', 'Slope Formula', 'Positive/Negative Slope', 'Horizontal/Vertical Lines']
  }
];

// Placeholder component for the module page (can be built out later)
function LinearEquationsFunctionsModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* This page will eventually display the submodules listed above */}
    </div>
  );
}

export default LinearEquationsFunctionsModule;