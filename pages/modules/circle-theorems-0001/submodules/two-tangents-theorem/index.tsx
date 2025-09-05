import React from 'react';
import { Slide } from '../../../common-components/concept';
import TwoTangentsTheoremSlide1 from './Slide1';
import TwoTangentsTheoremSlide2 from './Slide2';
import TwoTangentsTheoremAssessment from './Slide3';

// Define slide array
export const twoTangentsTheoremSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Two Tangents Theorem',
    content: '',
    component: TwoTangentsTheoremSlide1,
    id: 'ct-two-tangents-theorem-statement'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: TwoTangentsTheoremSlide2,
    id: 'ct-two-tangents-theorem-proof'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <TwoTangentsTheoremAssessment />),
    persistResponse: true,
    component: TwoTangentsTheoremAssessment,
    id: 'ct-two-tangents-theorem-assessment',
    questions: [
      {
        id: 'basic-two-tangents-equal-length',
        questionText: 'From external point P, two tangents PA and PB are drawn to a circle with center O and radius 8 cm. The distance OP = 10 cm. Tasks: (a) Calculate the length of each tangent PA and PB (b) Calculate the area of triangle PAB',
        inputType: 'image',
        required: true
      },
      {
        id: 'two-circles',
        questionText: 'Two circles with centers O₁ and O₂ have radii 6 cm and 4 cm respectively. The distance between their centers is 10 cm. External common tangents are drawn. Tasks: (a) Calculate the length of each external common tangent (b) Find the area of the quadrilateral formed by the two tangent lines and the line joining the centers',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function TwoTangentsTheoremComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default TwoTangentsTheoremComponent; 
 