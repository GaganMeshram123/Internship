import React from 'react';
import { Slide } from '../../../common-components/concept';
import CyclicQuadrilateralsSlide1 from './Slide1';
import CyclicQuadrilateralsSlide2 from './Slide2';
import CyclicQuadrilateralsAssessment from './Slide3';

// Define slide array
export const cyclicQuadrilateralsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Cyclic Quadrilaterals',
    content: '',
    component: CyclicQuadrilateralsSlide1,
    id: 'ct-cyclic-quadrilaterals-theorem'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: CyclicQuadrilateralsSlide2,
    id: 'ct-cyclic-quadrilaterals-proof'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <CyclicQuadrilateralsAssessment />),
    persistResponse: true,
    component: CyclicQuadrilateralsAssessment,
    id: 'ct-cyclic-quadrilaterals-assessment',
    questions: [
      {
        id: 'finding-unknown-angles',
        questionText: 'ABCD is a cyclic quadrilateral inscribed in a circle with center O. Given: ∠A = 85°, ∠B = 110°, ∠C = 95°. Find ∠D using the cyclic quadrilateral theorem',
        inputType: 'image',
        required: true
      },
      {
        id: 'proving-cyclic-quadrilateral',
        questionText: 'Quadrilateral ABCD has angles: ∠A = 72°, ∠B = 105°, ∠C = 108°, ∠D = 75°. Tasks: (a) Use the converse theorem to prove ABCD is cyclic (b) Explain what would happen if ∠D was 80° instead of 75°',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function CyclicQuadrilateralsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default CyclicQuadrilateralsComponent; 
 