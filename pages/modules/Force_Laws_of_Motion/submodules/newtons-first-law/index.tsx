import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components for this submodule
import NewtonsFirstLawSlide1 from './Slide1';
import NewtonsFirstLawSlide2 from './Slide2';
import NewtonsFirstLawSlide3 from './Slide3';
import NewtonsFirstLawSlide4 from './Slide4';
import NewtonsFirstLawAssessment from './Slide5';

// Define the array of slides for Newton's First Law
export const newtonsFirstLawSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Concept of Inertia',
    content: '',
    component: NewtonsFirstLawSlide1,
    id: 'n1-inertia'
  },
  {
    type: 'interactive',
    title: 'State of Rest and Uniform Motion',
    content: '',
    component: NewtonsFirstLawSlide2,
    id: 'n1-states'
  },
  {
    type: 'interactive',
    title: 'Balanced vs. Unbalanced Forces',
    content: '',
    component: NewtonsFirstLawSlide3,
    id: 'n1-forces'
  },
  {
    type: 'interactive',
    title: 'Inertia in Everyday Life',
    content: '',
    component: NewtonsFirstLawSlide4,
    id: 'n1-examples'
  },
  {
    type: 'question',
    title: 'First Law Assessment',
    content: React.createElement(() => <NewtonsFirstLawAssessment />),
    persistResponse: true,
    component: NewtonsFirstLawAssessment,
    id: 'n1-assessment',
    questions: [
      {
        id: 'n1-q1',
        questionText: 'Why do you lurch forward in a car when the driver suddenly applies the brakes? Explain using the concept of inertia.',
        inputType: 'image',
        required: true
      },
      {
        id: 'n1-q2',
        questionText: 'A hockey puck slides on frictionless ice at a constant velocity. Is there a net force acting on the puck? Why or why not?',
        inputType: 'image',
        required: true
      },
      {
        id: 'n1-q3',
        questionText: "If you kick a ball in deep space, what will happen to its motion according to Newton's First Law?",
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component for the submodule
function NewtonsFirstLawComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default NewtonsFirstLawComponent;