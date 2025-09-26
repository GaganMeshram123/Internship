import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule
import InterceptsSlide1 from './Slide1';
import InterceptsSlide2 from './Slide2';
import InterceptsSlide3 from './Slide3';
import InterceptsSlide4 from './Slide4';
import InterceptsAssessment from './Slide5'; // Assessment is the 5th slide

// Define and export the slide array for this submodule
export const interceptsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Understanding Intercepts: A Step-by-Step Guide',
    component: InterceptsSlide1,
    id: 'what-are-intercepts'
  },
  {
    type: 'interactive',
    title: 'Finding Intercepts from a Graph',
     component: InterceptsSlide2,
    id: 'finding-from-graph'
  },
  {
    type: 'interactive',
    title: 'Finding Intercepts from an Equation',
    component: InterceptsSlide3,
    id: 'finding-from-equation'
  },
  {
    type: 'interactive',
    title: 'Graphing a Line Using Intercepts',
    component: InterceptsSlide4,
    id: 'graphing-using-intercepts'
  },
  {
    type: 'question',
    title: 'Intercepts Assessment',
    content: React.createElement(() => <InterceptsAssessment />),
    persistResponse: true,
    component: InterceptsAssessment,
    id: 'intercepts-assessment',
    questions: [
      {
        id: 'find-y-intercept-equation',
        questionText: 'Find the y-intercept of the equation y = 3x - 12. (Remember to set x=0)',
        inputType: 'text',
        required: true
      },
      {
        id: 'find-x-intercept-equation',
        questionText: 'Find the x-intercept of the equation 2x + 4y = 16. (Remember to set y=0)',
        inputType: 'text',
        required: true
      },
      {
        id: 'concept-check-y-intercept',
        questionText: 'The y-intercept is the point where a line crosses the y-axis. At this specific point, what is the value of x?',
        inputType: 'text',
        required: true
      },
      {
        id: 'concept-check-x-intercept',
        questionText: 'A graph shows a line passing through the point (-4, 0). Is this point the x-intercept or the y-intercept?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js/module requirements
function InterceptsComponent() {
  return (
    <div>
      This is a submodule data file, not a page.
    </div>
  );
}

export default InterceptsComponent;