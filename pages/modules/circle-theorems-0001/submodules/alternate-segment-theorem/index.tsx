import React from 'react';
import { Slide } from '../../../common-components/concept';
import AlternateSegmentTheoremSlide1 from './Slide1';
import AlternateSegmentTheoremSlide2 from './Slide2';
import AlternateSegmentTheoremAssessment from './Slide3';

// Define slide array
export const alternateSegmentTheoremSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Alternate Segment Theorem',
    content: '',
    component: AlternateSegmentTheoremSlide1,
    id: 'ct-alternate-segment-theorem-statement'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: AlternateSegmentTheoremSlide2,
    id: 'ct-alternate-segment-theorem-proof'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <AlternateSegmentTheoremAssessment />),
    persistResponse: true,
    component: AlternateSegmentTheoremAssessment,
    id: 'ct-alternate-segment-theorem-assessment',
    questions: [
      {
        id: 'basic-alternate-segment-theorem',
        questionText: 'A tangent is drawn to a circle at point T. From T, a chord TA is drawn to another point A on the circle. Point B is on the circle such that angle ABT is in the alternate segment. Tasks: (a) If the angle between the tangent and chord TA is 35°, find angle ABT.',
        inputType: 'image',
        required: true
      },
      {
        id: 'multiple-chords-angles',
        questionText: 'A tangent is drawn at point P on a circle. Two chords PQ and PR are drawn from P. Points Q, R, and S are on the circle. Given: Angle between tangent and PQ = 40°, Angle between tangent and PR = 35°. Tasks: (a) Find angle PSQ using the alternate segment theorem (b) Calculate angle PSR in the alternate segment (c) Determine angle QPR at point P',
        inputType: 'image',
        required: true
      },
      {
        id: 'cyclic-quadrilateral-tangent',
        questionText: 'ABCD is a cyclic quadrilateral inscribed in a circle. A tangent is drawn at vertex A through point T. The angle ∠TAC between the tangent and diagonal AC is 50°. Tasks: (a) Find angle ∠ABC using the alternate segment theorem (b) Calculate angle ∠ADC using properties of cyclic quadrilaterals (c) Verify that ∠ABC + ∠ADC = 180° (opposite angles in cyclic quadrilateral)',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function AlternateSegmentTheoremComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default AlternateSegmentTheoremComponent; 
 