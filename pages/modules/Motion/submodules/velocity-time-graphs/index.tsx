import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components
import VelocityTimeGraphsSlide1 from './Slide1';
import VelocityTimeGraphsSlide2 from './Slide2';
import VelocityTimeGraphsSlide3 from './Slide3';
import VelocityTimeGraphsSlide4 from './Slide4';
import VelocityTimeGraphsAssessment from './Slide5';

// Define the array of slides
export const velocityTimeGraphsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Deeper Insights: Velocity-Time Graphs',
    content: '',
    component: VelocityTimeGraphsSlide1,
    id: 'vtg-intro'
  },
  {
    type: 'interactive',
    title: 'Slope of a V-T Graph: Acceleration',
    content: '',
    component: VelocityTimeGraphsSlide2,
    id: 'vtg-slope'
  },
  {
    type: 'interactive',
    title: 'Area under a V-T Graph: Displacement',
    content: '',
    component: VelocityTimeGraphsSlide3,
    id: 'vtg-area'
  },
  {
    type: 'interactive',
    title: 'Analyzing Complex Motion with V-T Graphs',
    content: '',
    component: VelocityTimeGraphsSlide4,
    id: 'vtg-analysis'
  },
  {
    type: 'question',
    title: 'Velocity-Time Graphs Assessment',
    content: React.createElement(() => <VelocityTimeGraphsAssessment />),
    persistResponse: true,
    component: VelocityTimeGraphsAssessment,
    id: 'vtg-assessment',
    questions: [
      {
        id: 'vtg-problem-1',
        questionText: 'From a velocity-time graph where velocity changes from 0 m/s to 20 m/s in 5 seconds, calculate the object\'s acceleration.',
        inputType: 'image',
        required: true
      },
      {
        id: 'vtg-problem-2',
        questionText: 'An object moves at a constant velocity of 15 m/s for 10 seconds. Sketch the V-T graph and calculate the total displacement by finding the area under the graph.',
        inputType: 'image',
        required: true
      },
      {
        id: 'vtg-problem-3',
        questionText: 'What does a horizontal line on a Velocity-Time graph signify? What does a straight line passing through the origin signify?',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component
function VelocityTimeGraphsComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default VelocityTimeGraphsComponent;