import React from 'react';
import { Slide } from '../../../common-components/concept';
import ChainRuleSlide1 from './Slide1';
import ChainRuleSlide2 from './Slide2';
import ChainRuleSlide3 from './Slide3';
import ChainRuleSlide4 from './Slide4';
import ChainRuleSlide5 from './Slide5';
import ChainRuleSlide6 from './Slide6';

/**
 * Define the slides array for the "chain-rule" submodule.
 * Each entry follows the same shape used by other submodules:
 * { type, title, content, component, id }
 */
export const chainRuleSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to the Chain Rule',
    content: '',
    component: ChainRuleSlide1,
    id: 'chain-rule-intro'
  },
  {
    type: 'interactive',
    title: 'The Chain Rule Formula',
    content: '',
    component: ChainRuleSlide2,
    id: 'chain-rule-formula'
  },
  {
    type: 'interactive',
    title: 'Chain Rule Applications',
    content: '',
    component: ChainRuleSlide3,
    id: 'general-power-rule'
  },
  {
    type: 'interactive',
    title: 'Chain Rule Practice Problems',
    content: '',
    component: ChainRuleSlide4,
    id: 'chain-rule-practice'
  },
  {
    type: 'interactive',
    title: 'Trigonometric Functions and the Chain Rule',
    content: '',
    component: ChainRuleSlide5,
    id: 'trig-chain-rule'
  },
  {
    type: 'question',
    title: 'Chain Rule Practice Assessment',
    content: React.createElement(() => <ChainRuleSlide6 />),
    persistResponse: true,
    component: ChainRuleSlide6,
    id: 'chain-rule-practice-assessment',
    questions: [
      {
        id: 'trig-chain-cos',
        questionText: 'Find the derivative of y = cos(4x)',
        inputType: 'image',
        required: true
      },
      {
        id: 'trig-chain-sec',
        questionText: 'Find the derivative of h(x) = sec(x²)',
        inputType: 'image',
        required: true
      },
      {
        id: 'trig-chain-tan',
        questionText: 'Find the derivative of g(x) = 5tan(3x)',
        inputType: 'image',
        required: true
      },
      {
        id: 'trig-chain-cos-complex',
        questionText: 'Find the derivative of y = cos(1 - 2x²)',
        inputType: 'image',
        required: true
      },
      {
        id: 'trig-chain-sin',
        questionText: 'Find the derivative of y = sin(x²)',
        inputType: 'image',
        required: true
      },
      {
        id: 'complex-chain-quotient',
        questionText: 'Find the derivative of f(x) = cot x / cos x',
        inputType: 'image',
        required: true
      },
      {
        id: 'complex-chain-sec-squared',
        questionText: 'Find the derivative of y = 4sec²(x)',
        inputType: 'image',
        required: true
      },
      {
        id: 'complex-chain-cos-squared',
        questionText: 'Find the derivative of g(t) = 5cos²(t)',
        inputType: 'image',
        required: true
      },
      {
        id: 'complex-chain-sin-squared',
        questionText: 'Find the derivative of f(θ) = (1/4)sin²(2θ)',
        inputType: 'image',
        required: true
      },
      {
        id: 'complex-chain-cot-squared',
        questionText: 'Find the derivative of h(t) = 2cot²(t - 2)',
        inputType: 'image',
        required: true
      },
      {
        id: 'mixed-polynomial-at-point',
        questionText: 'Find the derivative of s(t) = t² - 6t + 2 at t = 3',
        inputType: 'image',
        required: true
      },
      {
        id: 'mixed-polynomial-cubic',
        questionText: 'Find the derivative of y = 5 + 3x³ - 4x at x = 5',
        inputType: 'image',
        required: true
      },
      {
        id: 'mixed-radical-at-point',
        questionText: 'Find the derivative of f(x) = √(x³ + 2) at x = 2',
        inputType: 'image',
        required: true
      },
      {
        id: 'mixed-quotient-at-point',
        questionText: 'Find the derivative of f(t) = (3t + 2)/(t + 1) at t = 4',
        inputType: 'image',
        required: true
      },
      {
        id: 'mixed-rational-at-point',
        questionText: 'Find the derivative of f(x) = (2x + 3)/(x + 1) at x = 0',
        inputType: 'image',
        required: true
      }
    ]
  }
];

/**
 * Dummy React component to satisfy Next.js / module import expectations.
 * The tester app imports this file for metadata (chainRuleSlides). This component
 * is not used as a full page; it's a small placeholder so Next/React tooling is happy.
 */
export default function ChainRuleSubmoduleComponent() {
  return (
    <div>
      This is the chain-rule submodule for the AP Calculus BC Differentiation module. It exports an ordered list of slides (chainRuleSlides).
    </div>
  );
}