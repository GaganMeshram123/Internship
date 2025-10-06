import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components
import DerivingEquationsSlide1 from './Slide1';
import DerivingEquationsSlide2 from './Slide2';
import DerivingEquationsSlide3 from './Slide3';
import DerivingEquationsSlide4 from './Slide4';
import DerivingEquationsAssessment from './Slide5';

// Define the array of slides
export const derivingEquationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Power of Prediction: Equations of Motion',
    content: '',
    component: DerivingEquationsSlide1,
    id: 'de-intro'
  },
  {
    type: 'interactive',
    title: 'Deriving the First Equation: v = u + at',
    content: '',
    component: DerivingEquationsSlide2,
    id: 'de-first-eq'
  },
  {
    type: 'interactive',
    title: 'Deriving the Second Equation: s = ut + ½at²',
    content: '',
    component: DerivingEquationsSlide3,
    id: 'de-second-eq'
  },
  {
    type: 'interactive',
    title: 'Deriving the Third Equation: v² = u² + 2as',
    content: '',
    component: DerivingEquationsSlide4,
    id: 'de-third-eq'
  },
  {
    type: 'question',
    title: 'Deriving Equations Assessment',
    content: React.createElement(() => <DerivingEquationsAssessment />),
    persistResponse: true,
    component: DerivingEquationsAssessment,
    id: 'de-assessment',
    questions: [
      {
        id: 'de-problem-1',
        questionText: 'Explain how the formula for acceleration, a = (v-u)/t, can be rearranged to give the first equation of motion, v = u + at. What does each term represent?',
        inputType: 'image',
        required: true
      },
      {
        id: 'de-problem-2',
        questionText: 'The second equation of motion is derived from the area under a velocity-time graph. Sketch a graph for an object with initial velocity \'u\' and constant acceleration \'a\', and show the shapes (rectangle and triangle) that are combined to find the total displacement.',
        inputType: 'image',
        required: true
      },
      {
        id: 'de-problem-3',
        questionText: 'If you need to find the final velocity (v) of an object but you do not know the time (t), which of the three equations of motion would be the most direct one to use? Write down the equation.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component
function DerivingEquationsComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default DerivingEquationsComponent;