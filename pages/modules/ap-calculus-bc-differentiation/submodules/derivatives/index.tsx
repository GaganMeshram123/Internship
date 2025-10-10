import React from 'react';
import { Slide } from '../../../common-components/concept';
import TangentLineSlide1 from './Slide1';
import TangentLineSlide2 from './Slide2';
import TangentLineSlide3 from './Slide3';
import TangentLineSlide4 from './Slide4';
import TangentLineSlide5 from './Slide5';
import DerivativesAssessment from './Slide6';

/**
 * Define the slides array for the "derivatives" submodule.
 * Each entry follows the same shape used by the Limits submodules:
 * { type, title, content, component, id }
 */
export const derivativesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Finding the Tangent',
    content: '',
    component: TangentLineSlide1,
    id: 'finding-tangent'
  },
  {
    type: 'interactive',
    title: 'The Definition of Tangent Line',
    content: '',
    component: TangentLineSlide2,
    id: 'tangent-definition'
  },
  {
    type: 'interactive',
    title: 'Vertical Tangent Lines',
    content: '',
    component: TangentLineSlide3,
    id: 'vertical-tangent-lines'
  },
  {
    type: 'interactive',
    title: 'The Derivative of a Function',
    content: '',
    component: TangentLineSlide4,
    id: 'derivative-definition'
  },
  {
    type: 'interactive',
    title: 'Finding Derivatives Using the Definition',
    content: '',
    component: TangentLineSlide5,
    id: 'derivative-examples'
  },
  {
    type: 'question',
    title: 'Derivatives Assessment',
    content: React.createElement(() => <DerivativesAssessment />),
    persistResponse: true,
    component: DerivativesAssessment,
    id: 'derivatives-assessment',
    questions: [
      {
        id: 'derivative-x-squared',
        questionText: 'Find the derivative of f(x) = x² using the limit definition',
        inputType: 'image',
        required: true
      },
      {
        id: 'derivative-sqrt-x',
        questionText: 'Find the derivative of f(x) = √x using the limit definition with rationalization',
        inputType: 'image',
        required: true
      },
      {
        id: 'derivative-one-over-x',
        questionText: 'Find the derivative of f(x) = 1/x using the limit definition',
        inputType: 'image',
        required: true
      },
      {
        id: 'derivative-x-cubed',
        questionText: 'Find the derivative of f(x) = x³ using the limit definition',
        inputType: 'image',
        required: true
      },
      {
        id: 'tangent-line-equation',
        questionText: 'Find the equation of the tangent line to f(x) = x² + 3x at the point (2, 10)',
        inputType: 'image',
        required: true
      },
      {
        id: 'cube-root-slope',
        questionText: 'Find the slope of the tangent line to f(x) = ∛x at x = 2 using the limit definition',
        inputType: 'image',
        required: false
      }
    ]
  }
];

/**
 * Dummy React component to satisfy Next.js / module import expectations.
 * The tester app imports this file for metadata (derivativesSlides). This component
 * is not used as a full page; it's a small placeholder so Next/React tooling is happy.
 */
export default function DerivativesSubmoduleComponent() {
  return (
    <div>
      This is the derivatives submodule for the AP Calculus BC Differentiation module. It exports an ordered list of slides (derivativesSlides).
    </div>
  );
}