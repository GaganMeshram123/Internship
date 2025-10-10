import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components for this submodule
import NewtonsThirdLawSlide1 from './Slide1';
import NewtonsThirdLawSlide2 from './Slide2';
import NewtonsThirdLawSlide3 from './Slide3';
import NewtonsThirdLawAssessment from './Slide4';

// Define the array of slides for Newton's Third Law
export const newtonsThirdLawSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Action-Reaction Pairs',
    content: '',
    component: NewtonsThirdLawSlide1,
    id: 'n3-action-reaction'
  },
  {
    type: 'interactive',
    title: 'Forces on Different Objects',
    content: '',
    component: NewtonsThirdLawSlide2,
    id: 'n3-objects'
  },
  {
    type: 'interactive',
    title: 'The Third Law in Action',
    content: '',
    component: NewtonsThirdLawSlide3,
    id: 'n3-examples'
  },
  {
    type: 'question',
    title: 'Third Law Assessment',
    content: React.createElement(() => <NewtonsThirdLawAssessment />),
    persistResponse: true,
    component: NewtonsThirdLawAssessment,
    id: 'n3-assessment',
    questions: [
      {
        id: 'n3-q1',
        questionText: 'A rocket expels gas downwards to move up. Identify the action-reaction force pair in this scenario.',
        inputType: 'image',
        required: true
      },
      {
        id: 'n3-q2',
        questionText: 'When you jump, you push down on the Earth. Explain why you are the one who accelerates significantly and not the Earth.',
        inputType: 'image',
        required: true
      },
      {
        id: 'n3-q3',
        questionText: "A book is resting on a table. The action force is Earth's gravity pulling the book down. What is the corresponding reaction force?",
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component for the submodule
function NewtonsThirdLawComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default NewtonsThirdLawComponent;