import React from 'react';
import { Slide } from '../../../common-components/concept';
import ArithmeticSlide1 from './Slide1';
import ArithmeticSlide2 from './Slide2';
import ArithmeticSlide3 from './Slide3';
import ArithmeticSlide4 from './Slide4';
import ArithmeticSlide5 from './Slide5';
import ArithmeticSequencesAssessment from './Slide6';

// Define slide array
export const arithmeticSequencesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Arithmetic Sequences',
    content: '',
    component: ArithmeticSlide1,
    id: 'arithmetic-introduction'
  },
  {
    type: 'interactive',
    title: 'Computing Terms in Arithmetic Sequences',
    content: '',
    component: ArithmeticSlide2,
    id: 'arithmetic-computation'
  },
  {
    type: 'interactive',
    title: 'Recursive and Explicit Formulas',
    content: '',
    component: ArithmeticSlide3,
    id: 'arithmetic-formulas'
  },
  {
    type: 'interactive',
    title: 'Finding the Nth Term Formula',
    content: '',
    component: ArithmeticSlide4,
    id: 'arithmetic-nth-term'
  },
  {
    type: 'interactive',
    title: 'Advanced Arithmetic Sequence Applications',
    content: '',
    component: ArithmeticSlide5,
    id: 'arithmetic-advanced'
  },
  {
    type: 'question',
    title: 'Arithmetic Sequences Assessment',
    content: React.createElement(() => <ArithmeticSequencesAssessment />),
    persistResponse: true,
    component: ArithmeticSequencesAssessment,
    id: 'arithmetic-sequences-assessment',
    questions: [
      {
        id: 'sum-product-system',
        questionText: 'In an arithmetic sequence, the sum of the 3rd and 7th terms is 32, and the product of the 2nd and 8th terms is 160. Find all possible arithmetic sequences satisfying these conditions.',
        inputType: 'image',
        required: true
      },
      {
        id: 'two-sequences-equality',
        questionText: 'Two arithmetic sequences {aₙ} and {bₙ} have first terms a₁ = 3, b₁ = 7 and common differences d₁ = 5, d₂ = 3 respectively. For which values of n do we have aₙ = bₘ for some positive integer m?',
        inputType: 'image',
        required: true
      },
      {
        id: 'coordinate-plane-sequence',
        questionText: 'Points on a coordinate plane have y-coordinates that form an arithmetic sequence: (1, 5), (2, 12), (3, 19), (4, 26), ... (a) Find the equation of the line passing through these points (b) The x-coordinates also form an arithmetic sequence starting at x₁ = 1. What\'s the relationship between the slope of this line and the common difference of the y-coordinates?',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function ArithmeticSequencesComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default ArithmeticSequencesComponent;