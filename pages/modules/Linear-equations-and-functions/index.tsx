import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content (assuming these files will be created)
import { graphingProportionalSlides } from './submodules/graphing-proportional-relationships/index';
import { solutionsToLinearSlides } from './submodules/solutions-to-linear-equations/index';
import { interceptsSlides } from './submodules/intercepts/index';
import { slopeSlides } from './submodules/slope/index';
import { introToSlopeInterceptSlides } from './submodules/intro-to-slope-intercept-form/index';
import { graphingSlopeInterceptSlides } from './submodules/graphing-slope-intercept-form/index';
import { writingSlopeInterceptSlides } from './submodules/writing-slope-intercept-equations/index';
import { functionsSlides } from './submodules/functions/index';
// Added imports for the new submodules
import { linearModelsSlides } from './submodules/linear-models/index';
import { comparingLinearFunctionsSlides } from './submodules/comparing-linear-functions/index';
import { constructingLinearModelsSlides } from './submodules/constructing-linear-models/index';
import { recognizingFunctionsSlides } from './submodules/recognizing-functions/index';
import { linearAndNonlinearFunctionsSlides } from './submodules/linear-and-nonlinear-functions/index';


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
  },
  {
    id: 'intro-to-slope-intercept-form',
    title: 'Intro to Slope-Intercept Form',
    description: 'Unlock the most common form of a linear equation, y = mx + b, and understand what \'m\' and \'b\' truly represent.',
    slides: introToSlopeInterceptSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['y = mx + b', 'Slope (m)', 'y-intercept (b)', 'Identifying Parts']
  },
  {
    id: 'graphing-slope-intercept-form',
    title: 'Graphing Slope-Intercept Form',
    description: 'Learn a powerful shortcut to graph any linear equation by using its slope and y-intercept. No table of values needed!',
    slides: graphingSlopeInterceptSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Plotting the y-intercept', 'Using Rise over Run', 'Step-by-Step Graphing', 'From Equation to Graph']
  },
  {
    id: 'writing-slope-intercept-equations',
    title: 'Writing Slope-Intercept Equations',
    description: 'Become a master of linear equations! Learn how to write the equation of a line using its graph, its slope, and a point.',
    slides: writingSlopeInterceptSlides,
    estimatedTime: '30 min',
    difficulty: 'Advanced',
    topics: ['From Graph to Equation', 'Given Slope and y-intercept', 'Given a Point and Slope', 'Real-world Models']
  },
  {
    id: 'functions',
    title: 'Introduction to Functions',
    description: 'Explore the fundamental concept of a function, where every input has a unique output. Understand the foundation of higher-level algebra.',
    slides: functionsSlides,
    estimatedTime: '25 min',
    difficulty: 'Advanced',
    topics: ['Input/Output', 'Function Notation f(x)', 'Vertical Line Test', 'Domain and Range']
  },
    // ----- NEW SUBMODULES ADDED BELOW -----
  {
    id: 'linear-models',
    title: 'Linear Models',
    description: 'Learn how to use linear equations to model real-world situations, make predictions, and understand trends in data.',
    slides: linearModelsSlides,
    estimatedTime: '30 min',
    difficulty: 'Advanced',
    topics: ['Scatter Plots', 'Line of Best Fit', 'Making Predictions', 'Interpreting Slope and Intercept']
  },
  {
    id: 'comparing-linear-functions',
    title: 'Comparing Linear Functions',
    description: 'Analyze and compare different linear functions, whether they are presented as equations, graphs, or tables of values.',
    slides: comparingLinearFunctionsSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Comparing Slopes', 'Comparing y-intercepts', 'Functions in Different Formats', 'Real-world Comparisons']
  },
  {
    id: 'constructing-linear-models',
    title: 'Constructing Real-World Linear Models',
    description: 'Move from a real-world scenario to a mathematical equation. Learn to build linear models from word problems and data.',
    slides: constructingLinearModelsSlides,
    estimatedTime: '35 min',
    difficulty: 'Advanced',
    topics: ['From Word Problems to Equations', 'Identifying Variables', 'Finding Rate of Change', 'Initial Value']
  },
  {
    id: 'recognizing-functions',
    title: 'Recognizing Functions',
    description: 'Develop a keen eye for identifying functions, whether they are represented as tables, graphs, or sets of ordered pairs.',
    slides: recognizingFunctionsSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Definition of a Function', 'Tables', 'Mapping Diagrams', 'Ordered Pairs']
  },
  {
    id: 'linear-and-nonlinear-functions',
    title: 'Linear and Nonlinear Functions',
    description: 'Learn to distinguish between linear functions (which form straight lines) and nonlinear functions (which form curves).',
    slides: linearAndNonlinearFunctionsSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Constant Rate of Change', 'Graphs of Nonlinear Functions', 'Equations of Nonlinear Functions', 'Identifying Patterns']
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