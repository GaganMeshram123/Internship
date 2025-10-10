import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components for this submodule
import MomentumForceSlide1 from './Slide1';
import MomentumForceSlide2 from './Slide2';
import MomentumForceSlide3 from './Slide3';
import MomentumForceSlide4 from './Slide4';
import MomentumForceAssessment from './Slide5';

// Define the array of slides for Momentum and Force
export const momentumForceSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is Momentum? (Mass in Motion)',
    content: '',
    component: MomentumForceSlide1,
    id: 'mf-momentum-intro'
  },
  {
    type: 'interactive',
    title: 'Calculating Momentum (p=mv)',
    content: '',
    component: MomentumForceSlide2,
    id: 'mf-momentum-calc'
  },
  {
    type: 'interactive',
    title: 'Impulse: The Change in Momentum',
    content: '',
    component: MomentumForceSlide3,
    id: 'mf-impulse'
  },
  {
    type: 'interactive',
    title: 'Force as the Rate of Change of Momentum',
    content: '',
    component: MomentumForceSlide4,
    id: 'mf-force-rate'
  },
  {
    type: 'question',
    title: 'Momentum & Impulse Assessment',
    content: React.createElement(() => <MomentumForceAssessment />),
    persistResponse: true,
    component: MomentumForceAssessment,
    id: 'mf-assessment',
    questions: [
      {
        id: 'mf-q1',
        questionText: 'A 1200 kg car is moving at 20 m/s. What is its momentum?',
        inputType: 'image',
        required: true
      },
      {
        id: 'mf-q2',
        questionText: "Why does a boxer 'ride the punch' (move their head back) when they get hit? Explain in terms of impulse, force, and time.",
        inputType: 'image',
        required: true
      },
      {
        id: 'mf-q3',
        questionText: 'A 0.5 kg ball hits a wall with a velocity of 10 m/s and bounces back with a velocity of -8 m/s. What is the impulse delivered to the ball?',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component for the submodule
function MomentumForceComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default MomentumForceComponent;