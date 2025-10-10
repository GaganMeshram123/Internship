import React from 'react';
import { Slide } from '../../../common-components/concept';
import ProductRuleSlide1 from './Slide1';
import QuotientRuleSlide2 from './Slide2';
import ProductQuotientPracticeSlide3 from './Slide3';
import TrigDerivativesSlide4 from './Slide4';
import ProductQuotientAssessmentSlide5 from './Slide5';

/**
 * Define the slides array for the "product-quotient-rules" submodule.
 * Each entry follows the same shape used by other submodules:
 * { type, title, content, component, id }
 */
export const productQuotientRulesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Product Rule',
    content: '',
    component: ProductRuleSlide1,
    id: 'product-rule-intro'
  },
  {
    type: 'interactive',
    title: 'The Quotient Rule',
    content: '',
    component: QuotientRuleSlide2,
    id: 'quotient-rule-intro'
  },
  {
    type: 'interactive',
    title: 'Product and Quotient Rule Practice',
    content: '',
    component: ProductQuotientPracticeSlide3,
    id: 'product-quotient-practice'
  },
  {
    type: 'interactive',
    title: 'Derivatives of Trigonometric Functions',
    content: '',
    component: TrigDerivativesSlide4,
    id: 'trig-derivatives'
  },
  {
    type: 'question',
    title: 'Product and Quotient Rule Assessment',
    content: React.createElement(() => <ProductQuotientAssessmentSlide5 />),
    persistResponse: true,
    component: ProductQuotientAssessmentSlide5,
    id: 'product-quotient-assessment',
    questions: [
      {
        id: 'product-rule-basic',
        questionText: 'Find the derivative of f(x) = x³ sin x using the Product Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'product-rule-exponential',
        questionText: 'Find the derivative of g(x) = eˣ tan x using the Product Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'product-rule-polynomial',
        questionText: 'Find the derivative of h(x) = (2x² + 1) cos x using the Product Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'product-rule-secant',
        questionText: 'Find the derivative of k(t) = t² sec t using the Product Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'quotient-rule-polynomial',
        questionText: 'Find the derivative of f(x) = x/(x² + 1) using the Quotient Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'quotient-rule-linear',
        questionText: 'Find the derivative of g(t) = (t² + 4)/(5t + 3) using the Quotient Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'quotient-rule-cubic',
        questionText: 'Find the derivative of h(x) = x/(x³ + 1) using the Quotient Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'quotient-rule-simple',
        questionText: 'Find the derivative of h(s) = s/(s + 1) using the Quotient Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'trig-quotient-sine',
        questionText: 'Find the derivative of g(x) = sin x / x² using the Quotient Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'trig-quotient-cosine',
        questionText: 'Find the derivative of f(t) = cos t / t³ using the Quotient Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'cotangent-proof',
        questionText: 'Prove that d/dx(cot x) = -csc² x using the Quotient Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'cosecant-proof',
        questionText: 'Prove that d/dx(csc x) = -csc x cot x using the Quotient Rule',
        inputType: 'image',
        required: true
      },
      {
        id: 'mixed-application',
        questionText: 'Find the derivative of f(x) = x² sin x + 3x/cos x using both Product and Quotient Rules',
        inputType: 'image',
        required: true
      },
      {
        id: 'challenge-problem',
        questionText: 'Find the derivative of g(x) = (x² tan x)/(sin x + cos x) using Product and Quotient Rules',
        inputType: 'image',
        required: false
      }
    ]
  }
];

/**
 * Dummy React component to satisfy Next.js / module import expectations.
 * The tester app imports this file for metadata (productQuotientRulesSlides). This component
 * is not used as a full page; it's a small placeholder so Next/React tooling is happy.
 */
export default function ProductQuotientRulesSubmoduleComponent() {
  return (
    <div>
      This is the product-quotient-rules submodule for the AP Calculus BC Differentiation module. It exports an ordered list of slides (productQuotientRulesSlides).
    </div>
  );
}