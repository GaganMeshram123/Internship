import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components
import AvgSpeedVelocitySlide1 from './Slide1';
import AvgSpeedVelocitySlide2 from './Slide2';
import AvgSpeedVelocitySlide3 from './Slide3';
import AvgSpeedVelocitySlide4 from './Slide4';
import AvgSpeedVelocityAssessment from './Slide5';

// Define the array of slides
export const avgSpeedVelocitySlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introducing Rate of Motion: How Fast?',
    content: '',
    component: AvgSpeedVelocitySlide1,
    id: 'asv-intro'
  },
  {
    type: 'interactive',
    title: 'Calculating Average Speed',
    content: '',
    component: AvgSpeedVelocitySlide2,
    id: 'asv-average-speed'
  },
  {
    type: 'interactive',
    title: 'Calculating Average Velocity',
    content: '',
    component: AvgSpeedVelocitySlide3,
    id: 'asv-average-velocity'
  },
  {
    type: 'interactive',
    title: 'Key Differences: Speed vs. Velocity',
    content: '',
    component: AvgSpeedVelocitySlide4,
    id: 'asv-comparison'
  },
  {
    type: 'question',
    title: 'Speed & Velocity Assessment',
    content: React.createElement(() => <AvgSpeedVelocityAssessment />),
    persistResponse: true,
    component: AvgSpeedVelocityAssessment,
    id: 'asv-assessment',
    questions: [
      {
        id: 'asv-problem-1',
        questionText: 'A cyclist travels 10 km east in 30 minutes, then turns around and travels 4 km west in 15 minutes. Calculate the cyclist\'s average speed and average velocity for the entire trip in km/h.',
        inputType: 'image',
        required: true
      },
      {
        id: 'asv-problem-2',
        questionText: 'On a trip, a car travels the first 100 km at a speed of 50 km/h and the next 100 km at a speed of 100 km/h. What is the average speed of the car for the entire 200 km trip?',
        inputType: 'image',
        required: true
      },
      {
        id: 'asv-conceptual-q',
        questionText: 'Describe a situation where an object has a non-zero average speed but a zero average velocity. Explain your reasoning.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component
function AvgSpeedVelocityComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default AvgSpeedVelocityComponent;