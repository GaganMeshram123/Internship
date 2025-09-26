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
    title: 'Introduction to the Coordinate Plane: GPS for Math!',
    component: SolutionsToLinearEquationsSlide1,
    id: 'what-is-a-solution'
  },
  {
    type: 'interactive',
    title: 'How to Check if a Pair is a Solution',
    component: SolutionsToLinearEquationsSlide2,
    id: 'verifying-a-solution'
  },
  {
    type: 'interactive',
    title: 'Worked Example: Finding a Solution',
    component: SolutionsToLinearEquationsSlide3,
    id: 'finding-a-solution'
  },
  {
    type: 'interactive',
    title: 'Completing the Pair: Finding the Missing Piece',
    component: SolutionsToLinearEquationsSlide4,
    id: 'infinite-solutions-graph'
  },
  {
    type: 'question',
    title: 'Finding Complete Solutions & Practice',
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