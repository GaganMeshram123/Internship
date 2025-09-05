import React from 'react';
import { Slide } from '../../../common-components/concept';
import IntersectingChordsSlide1 from './Slide1';
import IntersectingChordsSlide2 from './Slide2';
import IntersectingChordsAssessment from './Slide3';

// Define slide array
export const intersectingChordsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Intersecting Chords Theorem',
    content: '',
    component: IntersectingChordsSlide1,
    id: 'ct-intersecting-chords-theorem-statement'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: IntersectingChordsSlide2,
    id: 'ct-intersecting-chords-theorem-proof'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <IntersectingChordsAssessment />),
    persistResponse: true,
    component: IntersectingChordsAssessment,
    id: 'ct-intersecting-chords-assessment',
    questions: [
      {
        id: 'basic-intersecting-chords-application',
        questionText: 'Two chords AB and CD intersect at point P inside a circle. Given: AP = 6 cm, PB = 4 cm, and CP = 8 cm. Tasks: (a) Calculate the total lengths of chords AB and CD',
        inputType: 'image',
        required: true
      },
      {
        id: 'diameter-chord-intersection',
        questionText: 'A diameter AB of length 150 cm intersects chord CD at point P. The diameter is divided by P such that AP = 50 cm and PB = 100 cm. Tasks: (a) If CP = 30 cm, find PD using the intersecting chords theorem (b) Determine the total length of chord CD',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function IntersectingChordsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default IntersectingChordsComponent; 