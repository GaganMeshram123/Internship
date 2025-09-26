import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule (assuming they will be created)
import GraphingSlopeInterceptSlide1 from './Slide1';
import GraphingSlopeInterceptSlide2 from './Slide2';
import GraphingSlopeInterceptSlide3 from './Slide3';
import GraphingSlopeInterceptSlide4 from './Slide4';
import GraphingSlopeInterceptAssessment from './Slide5';

// Define and export the slide array for this submodule
export const graphingSlopeInterceptSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Two-Step Graphing Method',
    component: GraphingSlopeInterceptSlide1,
    id: 'graphing-two-steps'
  },
  {
    type: 'interactive',
    title: 'Step 1: Plotting the y-intercept (b)',
    component: GraphingSlopeInterceptSlide2,
    id: 'plotting-b'
  },
  {
    type: 'interactive',
    title: 'Step 2: Using Slope "Rise over Run"',
    component: GraphingSlopeInterceptSlide3,
    id: 'using-rise-over-run'
  },
  {
    type: 'interactive',
    title: 'Example: Graphing y = 2/3x - 1',
    component: GraphingSlopeInterceptSlide4,
    id: 'graphing-example'
  },
  {
    type: 'question',
    title: 'Assessment: Graphing with y = mx + b',
    component: GraphingSlopeInterceptAssessment,
    id: 'graphing-y-mx-b-assessment',
    questions: [
      {
        id: 'first-point-to-plot',
        questionText: 'When graphing the equation y = 4x + 5, what is the very first point you should plot on the graph? (Write as coordinates, e.g., (x, y))',
        inputType: 'text',
        required: true
      },
      {
        id: 'how-to-use-slope',
        questionText: 'For the equation y = -2x + 3, after plotting the intercept, how would you use the slope (-2 or -2/1) to find the next point?',
        inputType: 'text',
        required: true
      },
      {
        id: 'find-next-point',
        questionText: 'A line has a y-intercept at (0, -2) and a slope of 3. What are the coordinates of the next point you would find using "rise over run"?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component
function GraphingSlopeInterceptFormComponent() {
  return <div>This is a submodule data file, not a page.</div>;
}

export default GraphingSlopeInterceptFormComponent;