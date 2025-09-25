import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule
import SolutionsToLinearEquationsSlide1 from './Slide1';
import SolutionsToLinearEquationsSlide2 from './Slide2';
import SolutionsToLinearEquationsSlide3 from './Slide3';
import SolutionsToLinearEquationsSlide4 from './Slide4';
import SolutionsToLinearEquationsAssessment from './Slide5'; // Assessment is the 5th slide

// Define and export the slide array for this submodule
export const solutionsToLinearSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is a Solution to a Linear Equation?',
    content: 'Defining a solution as an ordered pair (x, y) that makes the equation true.',
    component: SolutionsToLinearEquationsSlide1,
    id: 'what-is-a-solution'
  },
  {
    type: 'interactive',
    title: 'Verifying a Solution',
    content: 'How to check if a given point (x, y) is a solution by substituting its values into the equation.',
    component: SolutionsToLinearEquationsSlide2,
    id: 'verifying-a-solution'
  },
  {
    type: 'interactive',
    title: 'Finding a Solution',
    content: 'How to find a valid solution by choosing a value for one variable and solving for the other.',
    component: SolutionsToLinearEquationsSlide3,
    id: 'finding-a-solution'
  },
  {
    type: 'interactive',
    title: 'Infinite Solutions and Their Graph',
    content: 'Understanding that a line on a graph represents all possible solutions to its equation.',
    component: SolutionsToLinearEquationsSlide4,
    id: 'infinite-solutions-graph'
  },
  {
    type: 'question',
    title: 'Solutions to Linear Equations Assessment',
    content: React.createElement(() => <SolutionsToLinearEquationsAssessment />),
    persistResponse: true,
    component: SolutionsToLinearEquationsAssessment,
    id: 'solutions-to-linear-equations-assessment',
    questions: [
      {
        id: 'verify-solution-true',
        questionText: 'Is the point (3, 7) a solution to the equation y = 2x + 1? (Answer Yes or No)',
        inputType: 'text',
        required: true
      },
      {
        id: 'verify-solution-false',
        questionText: 'Is the point (1, 5) a solution to the equation y = 4x - 1? (Answer Yes or No)',
        inputType: 'text',
        required: true
      },
      {
        id: 'find-y-for-x',
        questionText: 'For the equation y = -3x + 10, what is the value of y when x = 2?',
        inputType: 'text',
        required: true
      },
      {
        id: 'concept-check-infinite-solutions',
        questionText: 'In a single linear equation with two variables (like y = 2x + 3), how many possible (x, y) solutions are there?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js/module requirements
function SolutionsToLinearEquationsComponent() {
  return (
    <div>
      This is a submodule data file, not a page.
    </div>
  );
}

export default SolutionsToLinearEquationsComponent;