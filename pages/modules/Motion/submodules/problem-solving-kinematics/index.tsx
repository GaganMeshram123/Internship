import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components
import ProblemSolvingSlide1 from './Slide1';
import ProblemSolvingSlide2 from './Slide2';
import ProblemSolvingSlide3 from './Slide3';
import ProblemSolvingAssessment from './Slide4';

// Define the array of slides
export const problemSolvingSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'A Strategy for Solving Motion Problems',
    content: '',
    component: ProblemSolvingSlide1,
    id: 'psk-strategy'
  },
  {
    type: 'interactive',
    title: 'Worked Example 1: Finding Final Velocity',
    content: '',
    component: ProblemSolvingSlide2,
    id: 'psk-example-1'
  },
  {
    type: 'interactive',
    title: 'Worked Example 2: Finding Displacement with Deceleration',
    content: '',
    component: ProblemSolvingSlide3,
    id: 'psk-example-2'
  },
  {
    type: 'question',
    title: 'Kinematics Problem Solving Assessment',
    content: React.createElement(() => <ProblemSolvingAssessment />),
    persistResponse: true,
    component: ProblemSolvingAssessment,
    id: 'psk-assessment',
    questions: [
      {
        id: 'psk-problem-1',
        questionText: 'A train starts from rest and accelerates uniformly at 2 m/s² for 10 seconds. Calculate the final velocity of the train and the total distance it travels in this time.',
        inputType: 'image',
        required: true
      },
      {
        id: 'psk-problem-2',
        questionText: 'A stone is dropped from the top of a tall building. It takes 4 seconds to reach the ground. How tall is the building? (Assume acceleration due to gravity, g = 9.8 m/s²).',
        inputType: 'image',
        required: true
      },
      {
        id: 'psk-problem-3',
        questionText: 'A car travelling at 72 km/h applies brakes and comes to a stop over a distance of 50 meters. What was the car\'s acceleration?',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component
function ProblemSolvingComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default ProblemSolvingComponent;