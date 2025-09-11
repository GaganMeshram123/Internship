import React from 'react';
import { Slide } from '../../../common-components/concept';
import LCMMethodSlide from './Slide1';
import AdvancedLCMSlide from './Slide2';
import FractionalCoefficientsSlide from './Slide3';
import PolyatomicIonsSlide from './Slide4';
import AdvancedPracticeSlide from './Slide5';

export const advancedBalancingSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Using Least Common Multiples (LCM)',
    content: <div></div>,
    component: LCMMethodSlide,
    id: 'lcm-method'
  },
  {
    type: 'interactive',
    title: 'Advanced LCM Application',
    content: <div></div>,
    component: AdvancedLCMSlide,
    id: 'advanced-lcm'
  },
  {
    type: 'interactive',
    title: 'Fractional Coefficients Strategy',
    content: <div></div>,
    component: FractionalCoefficientsSlide,
    id: 'fractional-coefficients'
  },
  {
    type: 'interactive',
    title: 'Polyatomic Ions as Units',
    content: <div></div>,
    component: PolyatomicIonsSlide,
    id: 'polyatomic-ions'
  },
  {
    type: 'question',
    title: 'Advanced Balancing Practice',
    content: React.createElement(() => <AdvancedPracticeSlide />),
    persistResponse: true,
    id: 'advanced-balancing-questions',
    questions: [
      {
        id: 'lcm-practice',
        questionText: 'Balance using LCM method: Al + CuBr₂ → AlBr₃ + Cu',
        inputType: 'image',
        required: true
      },
      {
        id: 'fractional-practice',
        questionText: 'Balance using fractional coefficients first: C₂H₄ + O₂ → CO₂ + H₂O',
        inputType: 'image',
        required: true
      },
      {
        id: 'polyatomic-practice',
        questionText: 'Balance treating polyatomic ions as units: Ca(OH)₂ + H₃PO₄ → Ca₃(PO₄)₂ + H₂O',
        inputType: 'image',
        required: true
      },
      {
        id: 'method-selection',
        questionText: 'Which method is most efficient for: Fe + O₂ → Fe₂O₃?',
        inputType: 'radio',
        options: [
          'A. LCM method',
          'B. Fractional coefficients',
          'C. Polyatomic ions as units',
          'D. Standard balancing'
        ],
        required: true
      },
      {
        id: 'complex-equation',
        questionText: 'Balance this complex equation: NH₃ + O₂ → NO + H₂O',
        inputType: 'image',
        required: true
      }
    ]
  }
];

function AdvancedBalancingTechniquesComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default AdvancedBalancingTechniquesComponent; 