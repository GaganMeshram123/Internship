import React from 'react';
import { Slide } from '../../../common-components/concept';
import AdvancedArithmeticSlide1 from './Slide1';
import AdvancedArithmeticSlide2 from './Slide2';
import AdvancedArithmeticSlide3 from './Slide3';
import AdvancedArithmeticSlide4 from './Slide4';
import AdvancedArithmeticSlide5 from './Slide5';
import AdvancedArithmeticAssessment from './Slide6';

// Define slide array
export const advancedArithmeticSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Finding Common Difference from Non-Consecutive Terms',
    content: '',
    component: AdvancedArithmeticSlide1,
    id: 'advanced-common-difference'
  },
  {
    type: 'interactive',
    title: 'Working with Arbitrary Terms',
    content: '',
    component: AdvancedArithmeticSlide2,
    id: 'advanced-arbitrary-terms'
  },
  {
    type: 'interactive',
    title: 'Finding Formulas from Complex Constraints',
    content: '',
    component: AdvancedArithmeticSlide3,
    id: 'advanced-formula-constraints'
  },
  {
    type: 'interactive',
    title: 'Solving for Variables in Arithmetic Sequences',
    content: '',
    component: AdvancedArithmeticSlide4,
    id: 'advanced-variable-solving'
  },
  {
    type: 'interactive',
    title: 'Symmetric Form of Arithmetic Progressions',
    content: '',
    component: AdvancedArithmeticSlide5,
    id: 'advanced-symmetric-form'
  },
  {
    type: 'question',
    title: 'Advanced Arithmetic Sequences Assessment',
    content: React.createElement(() => <AdvancedArithmeticAssessment />),
    persistResponse: true,
    component: AdvancedArithmeticAssessment,
    id: 'advanced-arithmetic-assessment',
    questions: [
      {
        id: 'symmetric-form-problem',
        questionText: 'Three numbers are in arithmetic progression. Their sum is 21 and the sum of their squares is 155. Find the three numbers using the symmetric form method (a-d, a, a+d).',
        inputType: 'image',
        required: true
      },
      {
        id: 'complex-variable-system',
        questionText: 'In an arithmetic sequence, the 4th term is 2x + 3, the 7th term is 3x - 1, and the 10th term is 4x - 5. Find the value of x and determine if a consistent arithmetic sequence exists.',
        inputType: 'image',
        required: true
      },
      {
        id: 'formula-from-constraints',
        questionText: 'An arithmetic sequence has its first term as a₁ = -8. The sum of the 3rd and 8th terms equals twice the 6th term. Find the common difference and write the general term formula.',
        inputType: 'image',
        required: true
      },
      {
        id: 'arithmetic-geometric-transformation',
        questionText: 'Three numbers x, y, z form an arithmetic sequence with common difference d. The numbers x², y², z² form a geometric sequence. If x + y + z = 15, find all possible values of x, y, and z.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function AdvancedArithmeticComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default AdvancedArithmeticComponent;