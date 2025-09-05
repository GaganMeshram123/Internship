import React from 'react';
import { Slide } from '../../../common-components/concept';
import PowerOfPointSlide1 from './Slide1';
import PowerOfPointSlide2 from './Slide2';
import PowerOfPointSlide3 from './Slide3';
import PowerOfPointAssessment from './Slide4';

// Define slide array
export const powerOfPointSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Power of a Point - Secant-Secant',
    content: '',
    component: PowerOfPointSlide1,
    id: 'ct-power-of-point-secant-secant'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: PowerOfPointSlide2,
    id: 'ct-power-of-point-secant-secant-proof'
  },
  {
    type: 'interactive',
    title: 'Tangent-Secant Case',
    content: '',
    component: PowerOfPointSlide3,
    id: 'ct-power-of-point-tangent-secant'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <PowerOfPointAssessment />),
    persistResponse: true,
    component: PowerOfPointAssessment,
    id: 'ct-power-of-point-assessment',
    questions: [
      {
        id: 'secant-secant-power-calculation',
        questionText: 'From external point P, two secants are drawn to a circle. One secant intersects the circle at points A and B, with PA = 4 cm and AB = 8 cm. The other secant intersects at points C and D, with PC = 6 cm. Tasks: (a) Use the power of a point theorem to find the length CD',
        inputType: 'image',
        required: true
      },
      {
        id: 'tangent-secant-proof',
        questionText: 'From external point P, a tangent PT and a secant PAB are drawn to a circle with center O. The tangent touches the circle at T, and the secant intersects at points A and B. Tasks: (a) Prove that triangles PTA and PTB are similar to triangle PAT (b) Use similar triangles to prove that PT² = PA × PB',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function PowerOfPointComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default PowerOfPointComponent; 