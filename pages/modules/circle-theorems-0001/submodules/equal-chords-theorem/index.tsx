import React from 'react';
import { Slide } from '../../../common-components/concept';
import EqualChordsTheoremSlide1 from './Slide1';
import EqualChordsTheoremSlide2 from './Slide2';
import EqualChordsTheoremAssessment from './Slide3';

// Define slide array
export const equalChordsTheoremSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Equal Chords Theorem',
    content: '',
    component: EqualChordsTheoremSlide1,
    id: 'ct-equal-chords-theorem-statement'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: EqualChordsTheoremSlide2,
    id: 'ct-equal-chords-theorem-proof'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <EqualChordsTheoremAssessment />),
    persistResponse: true,
    component: EqualChordsTheoremAssessment,
    id: 'ct-equal-chords-theorem-assessment',
    questions: [
      {
        id: 'basic-equal-chords-application',
        questionText: 'In a circle with center O, two chords AB and CD are both 6 cm long. M₁ and M₂ are the midpoints of the chords respectively. Tasks: (a) If the circle has radius 5 cm, calculate the distance from the center to each chord',
        inputType: 'image',
        required: true
      },
      {
        id: 'regular-hexagon-inscribed',
        questionText: 'A regular hexagon ABCDEF is inscribed in a circle with center O and radius 8 cm. All sides of the hexagon are chords of the circle. Tasks: (a) Calculate the length of each side using the equal chords theorem (b) Find the distance from the center O to each side of the hexagon',
        inputType: 'image',
        required: true
      },
      {
        id: 'parallel-chords-different-lengths',
        questionText: 'In a circle with radius 6 cm, three parallel chords PQ, RS, and TU are drawn. RS passes through the center, PQ is 3 cm from the center, and TU is 4 cm from the center. Tasks: (a) Find the length of chord PQ using the equal chords theorem relationship (b) Calculate the length of chord TU (c) Rank the chords from longest to shortest and explain the relationship between chord length and distance from center',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function EqualChordsTheoremComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default EqualChordsTheoremComponent; 