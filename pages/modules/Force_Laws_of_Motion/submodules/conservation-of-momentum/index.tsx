import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components for this submodule
import ConservationMomentumSlide1 from './Slide1';
import ConservationMomentumSlide2 from './Slide2';
import ConservationMomentumSlide3 from './Slide3';
import ConservationMomentumSlide4 from './Slide4';
import ConservationMomentumAssessment from './Slide5';

// Define the array of slides for Conservation of Momentum
export const conservationMomentumSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Principle of Conservation of Momentum',
    content: '',
    component: ConservationMomentumSlide1,
    id: 'cm-principle'
  },
  {
    type: 'interactive',
    title: 'What is an Isolated System?',
    content: '',
    component: ConservationMomentumSlide2,
    id: 'cm-isolated'
  },
  {
    type: 'interactive',
    title: 'Types of Collisions (Elastic & Inelastic)',
    content: '',
    component: ConservationMomentumSlide3,
    id: 'cm-collisions'
  },
  {
    type: 'interactive',
    title: 'Solving Problems with Conservation of Momentum',
    content: '',
    component: ConservationMomentumSlide4,
    id: 'cm-problems'
  },
  {
    type: 'question',
    title: 'Conservation of Momentum Assessment',
    content: React.createElement(() => <ConservationMomentumAssessment />),
    persistResponse: true,
    component: ConservationMomentumAssessment,
    id: 'cm-assessment',
    questions: [
      {
        id: 'cm-q1',
        questionText: 'A 2 kg cart moving at 5 m/s collides with a stationary 3 kg cart. They stick together. What is their final velocity?',
        inputType: 'image',
        required: true
      },
      {
        id: 'cm-q2',
        questionText: 'Explain the recoil of a cannon when it fires a cannonball using the principle of conservation of momentum.',
        inputType: 'image',
        required: true
      },
      {
        id: 'cm-q3',
        questionText: 'Two billiard balls collide. Before the collision, their total momentum is 15 kg·m/s. What is the total momentum of the two-ball system after the collision?',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component for the submodule
function ConservationMomentumComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default ConservationMomentumComponent;