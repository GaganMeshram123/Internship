import React from 'react';
import { Slide } from '../../../common-components/concept';
import TangentRadiusPerpendicularitySlide1 from './Slide1';
import TangentRadiusPerpendicularitySlide2 from './Slide2';
import TangentRadiusPerpendicularityAssessment from './Slide3';

// Define slide array
export const tangentRadiusPerpendicularitySlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Tangent-Radius Perpendicularity',
    content: '',
    component: TangentRadiusPerpendicularitySlide1,
    id: 'ct-tangent-radius-perpendicularity-theorem'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: TangentRadiusPerpendicularitySlide2,
    id: 'ct-tangent-radius-perpendicularity-proof'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <TangentRadiusPerpendicularityAssessment />),
    persistResponse: true,
    component: TangentRadiusPerpendicularityAssessment,
    id: 'ct-tangent-radius-perpendicularity-assessment',
    questions: [
      {
        id: 'basic-tangent-radius-perpendicularity',
        questionText: 'A circle has center O and radius 8 cm. A tangent line touches the circle at point T. Tasks: (a) If a point P on the tangent is 6 cm away from T, calculate the distance OP (b) Explain why this is the shortest distance from O to the tangent line',
        inputType: 'image',
        required: true
      },
      {
        id: 'external-point-tangent-construction',
        questionText: 'From an external point P, two tangent lines are drawn to a circle with center O and radius 5 cm. The distance OP = 13 cm. Tasks: (a) Calculate the length of each tangent from P to the circle (b) Prove that the two tangent lengths are equal (c) Find the angle between the two tangent lines at point P',
        inputType: 'image',
        required: true
      },
      {
        id: 'circle-inscribed-in-square',
        questionText: 'A circle is inscribed in square ABCD with side length 12 cm. The circle touches all four sides of the square. Tasks: (a) Find the radius of the inscribed circle (b) Prove that each radius to a point of tangency is perpendicular to the corresponding side (c) Calculate the area of the region between the square and the circle',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function TangentRadiusPerpendicularityComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default TangentRadiusPerpendicularityComponent; 
 