import React from 'react';
import { Slide } from '../../../common-components/concept';
import IntroductionToChemicalEquationsSlide from './Slide1';
import GoldenRuleOfBalancingSlide from './Slide2';
import BasicStrategySlide from './Slide3';
import CombustionDemonstrationSlide from './Slide4';
import BalancingPracticeSlide from './Slide5';

// Define slide array
export const introductionToBalancingSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Chemical Equations',
    content: <div></div>,
    component: IntroductionToChemicalEquationsSlide,
    id: 'introduction-to-chemical-equations'
  },
  {
    type: 'interactive',
    title: 'The Golden Rule of Balancing',
    content: <div></div>,
    component: GoldenRuleOfBalancingSlide,
    id: 'golden-rule-of-balancing'
  },
  {
    type: 'interactive',
    title: 'Basic Strategy for Balancing',
    content: <div></div>,
    component: BasicStrategySlide,
    id: 'basic-strategy-for-balancing'
  },
  {
    type: 'interactive',
    title: 'Combustion Reactions - Method Demonstration',
    content: <div></div>,
    component: CombustionDemonstrationSlide,
    id: 'combustion-reactions-demonstration'
  },
  {
    type: 'question',
    title: 'Balancing Practice with Oxygen',
    content: React.createElement(() => <BalancingPracticeSlide />),
    persistResponse: true,
    id: 'balancing-practice-questions',
    questions: [
      {
        id: 'methane-combustion',
        questionText: 'Balance the combustion of methane: CH₄ + O₂ → CO₂ + H₂O',
        inputType: 'image',
        required: true
      },
      {
        id: 'aluminum-oxidation',
        questionText: 'Balance the oxidation of aluminum: Al + O₂ → Al₂O₃',
        inputType: 'image',
        required: true
      },
      {
        id: 'ethane-combustion',
        questionText: 'Balance the combustion of ethane: C₂H₆ + O₂ → CO₂ + H₂O',
        inputType: 'image',
        required: true
      },
      {
        id: 'balancing-strategy',
        questionText: 'When balancing equations with O₂, which element should you balance last?',
        inputType: 'radio',
        options: [
          'A. Carbon first, then oxygen',
          'B. Hydrogen first, then oxygen', 
          'C. Oxygen first, then others',
          'D. Oxygen last, after other elements'
        ],
        required: true
      },
      {
        id: 'ammonia-oxidation',
        questionText: 'Balance the oxidation of ammonia: NH₃ + O₂ → N₂ + H₂O',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function IntroductionToBalancingComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

// Export the dummy component as default while keeping the slides export
export default IntroductionToBalancingComponent; 