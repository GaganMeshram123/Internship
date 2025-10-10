import React from 'react';
import { Slide } from '../../../common-components/concept';
import DifferentiabilityContinuitySlide1 from './Slide1';
import DifferentiabilityContinuitySlide2 from './Slide2';
import DifferentiabilityContinuitySlide3 from './Slide3';
import DifferentiabilityContinuitySlide4 from './Slide4';
import DifferentiabilityContinuityAssessment from './Slide5';

/**
 * Define the slides array for the "differentiability-continuity" submodule.
 * Each entry follows the same shape used by other submodules:
 * { type, title, content, component, id }
 */
export const differentiabilityContinuitySlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Alternative Form of the Derivative',
    content: '',
    component: DifferentiabilityContinuitySlide1,
    id: 'alternative-derivative-form'
  },
  {
    type: 'interactive',
    title: 'A Graph with a Sharp Turn',
    content: '',
    component: DifferentiabilityContinuitySlide2,
    id: 'sharp-turn-differentiability'
  },
  {
    type: 'interactive',
    title: 'A Graph with a Vertical Tangent Line',
    content: '',
    component: DifferentiabilityContinuitySlide3,
    id: 'vertical-tangent-differentiability'
  },
  {
    type: 'interactive',
    title: 'Differentiability Implies Continuity',
    content: '',
    component: DifferentiabilityContinuitySlide4,
    id: 'differentiability-implies-continuity'
  },
  {
    type: 'question',
    title: 'Differentiability and Continuity Assessment',
    content: React.createElement(() => <DifferentiabilityContinuityAssessment />),
    persistResponse: true,
    component: DifferentiabilityContinuityAssessment,
    id: 'differentiability-continuity-assessment',
    questions: [
      {
        id: 'limit-process-linear',
        questionText: 'Find the derivative of f(x) = 3x + 2 using the limit definition',
        inputType: 'image',
        required: true
      },
      {
        id: 'limit-process-quadratic',
        questionText: 'Find the derivative of f(x) = x² - x + 3 using the limit definition',
        inputType: 'image',
        required: true
      },
      {
        id: 'limit-process-rational',
        questionText: 'Find the derivative of f(x) = 1/(x + 1) using the limit definition',
        inputType: 'image',
        required: true
      },
      {
        id: 'alternative-form-cubic',
        questionText: 'Use the alternative form to find f\'(2) where f(x) = x³ - 2x² + 1',
        inputType: 'image',
        required: true
      },
      {
        id: 'tangent-line-equation',
        questionText: 'Find the equation of the tangent line to f(x) = x² - 3 at (1, -2)',
        inputType: 'image',
        required: true
      }
    ]
  }
];

/**
 * Dummy React component to satisfy Next.js / module import expectations.
 * The tester app imports this file for metadata (differentiabilityContinuitySlides). This component
 * is not used as a full page; it's a small placeholder so Next/React tooling is happy.
 */
export default function DifferentiabilityContinuitySubmoduleComponent() {
  return (
    <div>
      This is the differentiability-continuity submodule for the AP Calculus BC Differentiation module. It exports an ordered list of slides (differentiabilityContinuitySlides).
    </div>
  );
}