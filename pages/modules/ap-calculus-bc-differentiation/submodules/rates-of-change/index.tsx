import React from 'react';
import { Slide } from '../../../common-components/concept';
import RatesOfChangeSlide1 from './Slide1';
import RatesOfChangeSlide2 from './Slide2';
import RatesOfChangeSlide3 from './Slide3';
import RatesOfChangeSlide4 from './Slide4';

/**
 * Define the slides array for the "rates-of-change" submodule.
 * Each entry follows the same shape used by other submodules:
 * { type, title, content, component, id }
 */
export const ratesOfChangeSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Rates of Change',
    content: '',
    component: RatesOfChangeSlide1,
    id: 'rates-of-change-intro'
  },
  {
    type: 'interactive',
    title: 'Finding Average Velocity',
    content: '',
    component: RatesOfChangeSlide2,
    id: 'average-velocity'
  },
  {
    type: 'interactive',
    title: 'Velocity and the Derivative',
    content: '',
    component: RatesOfChangeSlide3,
    id: 'instantaneous-velocity'
  },
  {
    type: 'question',
    title: 'Rates of Change Assessment',
    content: React.createElement(() => <RatesOfChangeSlide4 />),
    persistResponse: true,
    component: RatesOfChangeSlide4,
    id: 'rates-of-change-assessment',
    questions: [
      {
        id: 'projectile-motion',
        questionText: 'Solve the rocket projectile motion problem: find velocities at t=5s and t=10s, and time to reach maximum height',
        inputType: 'image',
        required: true
      },
      {
        id: 'building-height',
        questionText: 'Calculate the height of the building from the falling wrench problem (5.6 seconds fall time)',
        inputType: 'image',
        required: true
      },
      {
        id: 'average-vs-instantaneous',
        questionText: 'Compare average velocities and find instantaneous velocity for the falling wrench',
        inputType: 'image',
        required: true
      },
      {
        id: 'upward-thrown-ball',
        questionText: 'Analyze the motion of a ball thrown upward from a building (optional challenge)',
        inputType: 'image',
        required: false
      }
    ]
  }
];

/**
 * Dummy React component to satisfy Next.js / module import expectations.
 * The tester app imports this file for metadata (ratesOfChangeSlides). This component
 * is not used as a full page; it's a small placeholder so Next/React tooling is happy.
 */
export default function RatesOfChangeSubmoduleComponent() {
  return (
    <div>
      This is the rates-of-change submodule for the AP Calculus BC Differentiation module. It exports an ordered list of slides (ratesOfChangeSlides).
    </div>
  );
}