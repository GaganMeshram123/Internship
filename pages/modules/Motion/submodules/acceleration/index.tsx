import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components
import AccelerationSlide1 from './Slide1';
import AccelerationSlide2 from './Slide2';
import AccelerationSlide3 from './Slide3';
import AccelerationSlide4 from './Slide4';
import AccelerationAssessment from './Slide5';

// Define the array of slides
export const accelerationSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is Acceleration?',
    content: '',
    component: AccelerationSlide1,
    id: 'accel-intro'
  },
  {
    type: 'interactive',
    title: 'Calculating Acceleration',
    content: '',
    component: AccelerationSlide2,
    id: 'accel-calculation'
  },
  {
    type: 'interactive',
    title: 'Positive, Negative, and Zero Acceleration',
    content: '',
    component: AccelerationSlide3,
    id: 'accel-types'
  },
  {
    type: 'interactive',
    title: 'Real-World Examples of Acceleration',
    content: '',
    component: AccelerationSlide4,
    id: 'accel-examples'
  },
  {
    type: 'question',
    title: 'Acceleration Assessment',
    content: React.createElement(() => <AccelerationAssessment />),
    persistResponse: true,
    component: AccelerationAssessment,
    id: 'accel-assessment',
    questions: [
      {
        id: 'accel-problem-1',
        questionText: 'A sports car accelerates from rest to 90 km/h in 5 seconds. What is its average acceleration in m/s²?',
        inputType: 'image',
        required: true
      },
      {
        id: 'accel-problem-2',
        questionText: 'A ball is thrown upwards. It slows down as it rises. Is the acceleration of the ball positive, negative, or zero while it is going up? Explain your answer.',
        inputType: 'image',
        required: true
      },
      {
        id: 'accel-problem-3',
        questionText: 'A train moving at 20 m/s applies its brakes and comes to a stop in 10 seconds. Calculate the train\'s acceleration.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component
function AccelerationComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default AccelerationComponent;