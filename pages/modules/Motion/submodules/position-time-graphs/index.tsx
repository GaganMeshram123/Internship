import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components
import PositionTimeGraphsSlide1 from './Slide1';
import PositionTimeGraphsSlide2 from './Slide2';
import PositionTimeGraphsSlide3 from './Slide3';
import PositionTimeGraphsSlide4 from './Slide4';
import PositionTimeGraphsAssessment from './Slide5';

// Define the array of slides
export const positionTimeGraphsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Visualizing Motion: Position-Time Graphs',
    content: '',
    component: PositionTimeGraphsSlide1,
    id: 'ptg-intro'
  },
  {
    type: 'interactive',
    title: 'Interpreting the Slope: Velocity',
    content: '',
    component: PositionTimeGraphsSlide2,
    id: 'ptg-slope'
  },
  {
    type: 'interactive',
    title: 'Graph Shapes: Constant, Positive, and Negative Velocity',
    content: '',
    component: PositionTimeGraphsSlide3,
    id: 'ptg-shapes'
  },
  {
    type: 'interactive',
    title: 'Interpreting Curved Lines: Acceleration',
    content: '',
    component: PositionTimeGraphsSlide4,
    id: 'ptg-curves'
  },
  {
    type: 'question',
    title: 'Position-Time Graphs Assessment',
    content: React.createElement(() => <PositionTimeGraphsAssessment />),
    persistResponse: true,
    component: PositionTimeGraphsAssessment,
    id: 'ptg-assessment',
    questions: [
      {
        id: 'ptg-problem-1',
        questionText: 'You are given a position-time graph with a straight horizontal line. What does this indicate about the object\'s motion? Calculate its velocity.',
        inputType: 'image',
        required: true
      },
      {
        id: 'ptg-problem-2',
        questionText: 'The slope of a position-time graph represents an object\'s velocity. From a given graph (imagine one), calculate the velocity of an object that moves from a position of 2m to 10m in 4 seconds.',
        inputType: 'image',
        required: true
      },
      {
        id: 'ptg-problem-3',
        questionText: 'Sketch a position-time graph for a person who walks 50m away from their home in 25s, stands still for 10s, and then walks back home in 50s.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component
function PositionTimeGraphsComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default PositionTimeGraphsComponent;