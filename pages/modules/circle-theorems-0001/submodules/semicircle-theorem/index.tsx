import React from 'react';
import { Slide } from '../../../common-components/concept';
import SemicircleTheoremSlide1 from './Slide1';
import SemicircleTheoremSlide2 from './Slide2';
import SemicircleTheoremAssessment from './Slide3';

// Define slide array
export const semicircleTheoremSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Semicircle Theorem',
    content: '',
    component: SemicircleTheoremSlide1,
    id: 'ct-semicircle-theorem-statement'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: SemicircleTheoremSlide2,
    id: 'ct-semicircle-theorem-proof'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <SemicircleTheoremAssessment />),
    persistResponse: true,
    component: SemicircleTheoremAssessment,
    id: 'ct-semicircle-theorem-assessment',
    questions: [
      {
        id: 'right-triangle-properties',
        questionText: 'In a circle with center O, AB is a diameter and P is any point on the circle. Tasks: (a) If AB = 10 cm and AP = 6 cm, find the length of BP (b) Find the maximum possible area of triangle APB and determine where P should be positioned',
        inputType: 'image',
        required: true
      },
      {
        id: 'rectangle-semicircle-application',
        questionText: 'ABCD is a rectangle, and AC is a diagonal. A semicircle is drawn with AC as diameter. Tasks: (a) Prove that points B and D lie exactly on this semicircle (b) Find the angles ∠ABC and ∠ADC using the semicircle theorem (c) If the rectangle has dimensions 6 cm × 8 cm, find the radius of the semicircle (d) Explain the relationship between the rectangle\'s properties and the semicircle theorem',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function SemicircleTheoremComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default SemicircleTheoremComponent; 
 