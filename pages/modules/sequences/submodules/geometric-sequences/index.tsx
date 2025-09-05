import React from 'react';
import { Slide } from '../../../common-components/concept';
import GeometricSequencesSlide1 from './Slide1';
import GeometricSequencesSlide2 from './Slide2';
import GeometricSequencesSlide3 from './Slide3';
import GeometricSequencesSlide4 from './Slide4';
import GeometricSequencesAssessment from './Slide5';

// Define slide array
export const geometricSequencesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Geometric Sequences',
    content: '',
    component: GeometricSequencesSlide1,
    id: 'geometric-introduction'
  },
  {
    type: 'interactive',
    title: 'Finding Common Ratios',
    content: '',
    component: GeometricSequencesSlide2,
    id: 'geometric-common-ratio'
  },
  {
    type: 'interactive',
    title: 'Recursive Formulas for Geometric Sequences',
    content: '',
    component: GeometricSequencesSlide3,
    id: 'geometric-recursive-formulas'
  },
  {
    type: 'interactive',
    title: 'Explicit Formulas and Nth Terms',
    content: '',
    component: GeometricSequencesSlide4,
    id: 'geometric-nth-terms'
  },
  {
    type: 'question',
    title: 'Geometric Sequences Assessment',
    content: React.createElement(() => <GeometricSequencesAssessment />),
    persistResponse: true,
    component: GeometricSequencesAssessment,
    id: 'geometric-sequences-assessment',
    questions: [
      {
        id: 'arithmetic-transformation',
        questionText: 'In a geometric sequence, every term is positive. The 4th term is 24, and when you add 6 to the 2nd term, 30 to the 3rd term, and 54 to the 4th term, the resulting three numbers form an arithmetic sequence. Find the first term and common ratio.',
        inputType: 'image',
        required: true
      },
      {
        id: 'sum-pairs-system',
        questionText: 'A geometric sequence has the property that a₃ + a₅ = 90 and a₄ + a₆ = 180. Find the first term and common ratio, then determine which term equals 1458.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function GeometricSequencesComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default GeometricSequencesComponent;