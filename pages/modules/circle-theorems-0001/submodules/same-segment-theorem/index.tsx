import React from 'react';
import { Slide } from '../../../common-components/concept';
import SameSegmentTheoremSlide1 from './Slide1';
import SameSegmentTheoremSlide2 from './Slide2';
import SameSegmentTheoremAssessment from './Slide3';

// Define slide array
export const sameSegmentTheoremSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Same Segment Theorem',
    content: '',
    component: SameSegmentTheoremSlide1,
    id: 'ct-same-segment-theorem-statement'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: SameSegmentTheoremSlide2,
    id: 'ct-same-segment-theorem-proof'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <SameSegmentTheoremAssessment />),
    persistResponse: true,
    component: SameSegmentTheoremAssessment,
    id: 'ct-same-segment-theorem-assessment',
    questions: [
      {
        id: 'locus-construction',
        questionText: 'Given a fixed chord AB, construct the complete locus of all points P such that ∠APB = 30°. Tasks: (a) Prove that this locus consists of exactly two circular arcs. Draw the arcs. (b) Explain why no points inside the circular arcs can satisfy the condition.',
        inputType: 'image',
        required: true
      },
      {
        id: 'tangent-chord-optimization',
        questionText: 'A tangent at point T and a chord AB form a system where point P on the major arc AB subtends ∠APB = 35°. Determine the position of T that maximizes the area of triangle ATB.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function SameSegmentTheoremComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default SameSegmentTheoremComponent; 
 