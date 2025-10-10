import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components for this submodule
import NewtonsSecondLawSlide1 from './Slide1';
import NewtonsSecondLawSlide2 from './Slide2';
import NewtonsSecondLawSlide3 from './Slide3';
import NewtonsSecondLawSlide4 from './Slide4';
import NewtonsSecondLawAssessment from './Slide5';

// Define the array of slides for Newton's Second Law
export const newtonsSecondLawSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Relationship: Force, Mass, Acceleration',
    content: '',
    component: NewtonsSecondLawSlide1,
    id: 'n2-fma'
  },
  {
    type: 'interactive',
    title: 'How to Calculate Net Force',
    content: '',
    component: NewtonsSecondLawSlide2,
    id: 'n2-netforce'
  },
  {
    type: 'interactive',
    title: 'Proportionality in the Second Law',
    content: '',
    component: NewtonsSecondLawSlide3,
    id: 'n2-proportionality'
  },
  {
    type: 'interactive',
    title: 'Problem-Solving with F=ma',
    content: '',
    component: NewtonsSecondLawSlide4,
    id: 'n2-problems'
  },
  {
    type: 'question',
    title: 'Second Law Assessment',
    content: React.createElement(() => <NewtonsSecondLawAssessment />),
    persistResponse: true,
    component: NewtonsSecondLawAssessment,
    id: 'n2-assessment',
    questions: [
      {
        id: 'n2-q1',
        questionText: 'A net force of 50 N is applied to a 10 kg box. What is the acceleration of the box?',
        inputType: 'image',
        required: true
      },
      {
        id: 'n2-q2',
        questionText: "If you push a car and a bicycle with the exact same force, which one will accelerate more? Explain using Newton's Second Law.",
        inputType: 'image',
        required: true
      },
      {
        id: 'n2-q3',
        questionText: 'An object is accelerating at 2 m/s². If the net force is doubled and the mass is halved, what is the new acceleration?',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component for the submodule
function NewtonsSecondLawComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default NewtonsSecondLawComponent;