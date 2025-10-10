import React from 'react';
import { Slide } from '../../../common-components/concept';
import DifferentiationRulesSlide1 from './Slide1';
import DifferentiationRulesSlide2 from './Slide2';
import DifferentiationRulesSlide3 from './Slide3';
import DifferentiationRulesSlide4 from './Slide4';
import DifferentiationRulesSlide5 from './Slide5';
import DifferentiationRulesSlide6 from './Slide6';
import DifferentiationRulesSlide7 from './Slide7';

/**
 * Define the slides array for the "differentiation-rules" submodule.
 * Each entry follows the same shape used by other submodules:
 * { type, title, content, component, id }
 */
export const differentiationRulesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Constant Rule',
    content: '',
    component: DifferentiationRulesSlide1,
    id: 'constant-rule'
  },
  {
    type: 'interactive',
    title: 'The Power Rule',
    content: '',
    component: DifferentiationRulesSlide2,
    id: 'power-rule'
  },
  {
    type: 'interactive',
    title: 'The Constant Multiple Rule',
    content: '',
    component: DifferentiationRulesSlide3,
    id: 'constant-multiple-rule'
  },
  {
    type: 'interactive',
    title: 'The Sum and Difference Rules',
    content: '',
    component: DifferentiationRulesSlide4,
    id: 'sum-difference-rules'
  },
  {
    type: 'interactive',
    title: 'Applying the Rules',
    content: '',
    component: DifferentiationRulesSlide5,
    id: 'power-rule-examples'
  },
  {
    type: 'interactive',
    title: 'Derivatives of the Sine and Cosine Functions',
    content: '',
    component: DifferentiationRulesSlide6,
    id: 'trig-derivatives'
  },
  {
    type: 'question',
    title: 'Practice Problems',
    content: React.createElement(() => <DifferentiationRulesSlide7 />),
    persistResponse: true,
    component: DifferentiationRulesSlide7,
    id: 'differentiation-practice',
    questions: [
      {
        id: 'derivative-x6-3x',
        questionText: 'Find the derivative of f(x) = x⁶ - 3x',
        inputType: 'image',
        required: true
      },
      {
        id: 'derivative-3x-5x2',
        questionText: 'Find the derivative of f(x) = 3x - 5x²',
        inputType: 'image',
        required: true
      },
      {
        id: 'derivative-s4-5s2-3',
        questionText: 'Find the derivative of h(s) = s⁴ - 5s² + 3',
        inputType: 'image',
        required: true
      },
      {
        id: 'derivative-t2-3t13-4sqrt',
        questionText: 'Find the derivative of f(t) = t² + 3t^(1/3) - 4√t',
        inputType: 'image',
        required: true
      },
      {
        id: 'derivative-6sqrt-5cos',
        questionText: 'Find the derivative of f(x) = 6√x - 5cos x',
        inputType: 'image',
        required: true
      },
      {
        id: 'derivative-3-over-x2',
        questionText: 'Find the derivative of f(x) = 3/x²',
        inputType: 'image',
        required: true
      },
      {
        id: 'tangent-k-x2-kx',
        questionText: 'Find k such that y = 5x - 4 is tangent to f(x) = x² - kx',
        inputType: 'image',
        required: true
      },
      {
        id: 'tangent-k-kx2',
        questionText: 'Find k such that y = 6x - 1 is tangent to f(x) = kx²',
        inputType: 'image',
        required: true
      }
    ]
  }
];

/**
 * Dummy React component to satisfy Next.js / module import expectations.
 * The tester app imports this file for metadata (differentiationRulesSlides). This component
 * is not used as a full page; it's a small placeholder so Next/React tooling is happy.
 */
export default function DifferentiationRulesSubmoduleComponent() {
  return (
    <div>
      This is the differentiation-rules submodule for the AP Calculus BC Differentiation module. It exports an ordered list of slides (differentiationRulesSlides).
    </div>
  );
}