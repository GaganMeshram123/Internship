import React from 'react';
import { Slide } from '../../../common-components/concept';
import FibonacciSlide1 from './Slide1';
import FibonacciSlide2 from './Slide2';
import FibonacciSlide3 from './Slide3';
import FibonacciSequencesAssessment from './Slide4';

// Define slide array
export const fibonacciSequencesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Fibonacci-Type Sequences',
    content: '',
    component: FibonacciSlide1,
    id: 'fibonacci-introduction'
  },
  {
    type: 'interactive',
    title: 'Computing Fibonacci Terms with Sequence Notation',
    content: '',
    component: FibonacciSlide2,
    id: 'fibonacci-sequence-notation'
  },
  {
    type: 'interactive',
    title: 'Fibonacci Sequences in Function Notation',
    content: '',
    component: FibonacciSlide3,
    id: 'fibonacci-function-notation'
  },
  {
    type: 'question',
    title: 'Fibonacci Sequences Assessment',
    content: React.createElement(() => <FibonacciSequencesAssessment />),
    persistResponse: true,
    component: FibonacciSequencesAssessment,
    id: 'fibonacci-sequences-assessment',
    questions: [
      {
        id: 'modified-fibonacci-constant',
        questionText: 'Consider a modified Fibonacci sequence where: aₙ₊₂ = aₙ₊₁ + aₙ + k (where k is a constant), a₁ = 2, a₂ = 5, and the 6th term equals 47. Find the value of constant k.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function FibonacciSequencesComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default FibonacciSequencesComponent;