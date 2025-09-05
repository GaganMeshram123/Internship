import React from 'react';
import { Slide } from '../../../common-components/concept';
import AdvancedGeometricSlide1 from './Slide1';
import AdvancedGeometricSlide2 from './Slide2';
import AdvancedGeometricSlide3 from './Slide3';
import AdvancedGeometricAssessment from './Slide4';

// Define slide array
export const advancedGeometricSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Finding Ratios from Non-Consecutive Terms',
    content: '',
    component: AdvancedGeometricSlide1,
    id: 'advanced-geometric-ratios'
  },
  {
    type: 'interactive',
    title: 'Finding Index and Position of Terms',
    content: '',
    component: AdvancedGeometricSlide2,
    id: 'advanced-geometric-indices'
  },
  {
    type: 'interactive',
    title: 'Transforming Sequences to Geometric Progressions',
    content: '',
    component: AdvancedGeometricSlide3,
    id: 'advanced-geometric-transformation'
  },
  {
    type: 'question',
    title: 'Advanced Geometric Sequences Assessment',
    content: React.createElement(() => <AdvancedGeometricAssessment />),
    persistResponse: true,
    component: AdvancedGeometricAssessment,
    id: 'advanced-geometric-assessment',
    questions: [
      {
        id: 'non-consecutive-ratio',
        questionText: 'In a geometric sequence, the 3rd term is 12 and the 7th term is 192. Find the common ratio and determine the 10th term.',
        inputType: 'image',
        required: true
      },
      {
        id: 'sequence-transformation',
        questionText: 'Given the recurrence relation aₙ₊₁ = 3aₙ + 6 with a₁ = 4, transform this into a geometric sequence. Find the first 5 terms of both the original and transformed sequences.',
        inputType: 'image',
        required: true
      },
      {
        id: 'geometric-index-problem',
        questionText: 'In a geometric sequence where a₄ = 54 and a₆ = 486, find the position (index) of the term with value 4374.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function AdvancedGeometricComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default AdvancedGeometricComponent;