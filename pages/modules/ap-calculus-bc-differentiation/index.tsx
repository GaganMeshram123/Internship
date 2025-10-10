// modules/ap-calculus-bc-differentiation/index.tsx
import React from 'react'
import { Slide } from '../common-components/concept'

// Import submodule content
import { derivativesSlides } from './submodules/derivatives/index'
import { differentiabilityContinuitySlides } from './submodules/differentiability-continuity/index'
import { differentiationRulesSlides } from './submodules/differentiation-rules/index'
import { ratesOfChangeSlides } from './submodules/rates-of-change/index'
import { productQuotientRulesSlides } from './submodules/product-quotient-rules/index'
import { chainRuleSlides } from './submodules/chain-rule/index'

// Define the interface for submodules (same as limits)
export interface Submodule {
  id: string
  title: string
  description: string
  slides: Slide[]
  thumbnail?: string
  estimatedTime?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  topics?: string[]
}

// Export submodules array
export const submodules: Submodule[] = [
  {
    id: 'derivatives',
    title: 'Derivatives',
    description: 'Introduction to derivatives, tangent lines, and the concept of instantaneous rate of change.',
    slides: derivativesSlides,
    estimatedTime: '35 min',
    difficulty: 'Intermediate',
    topics: ['Tangent lines', 'Secant lines', 'Difference quotient', 'Instantaneous rate of change']
  },
  {
    id: 'differentiability-continuity',
    title: 'Differentiability and Continuity',
    description: 'Exploring the relationship between differentiability and continuity using alternative derivative forms.',
    slides: differentiabilityContinuitySlides,
    estimatedTime: '25 min',
    difficulty: 'Advanced',
    topics: ['Alternative derivative form', 'One-sided derivatives', 'Discontinuity', 'Greatest integer function']
  },
  {
    id: 'differentiation-rules',
    title: 'Differentiation Rules',
    description: 'Learn the fundamental rules for differentiation including the Constant Rule and Power Rule.',
    slides: differentiationRulesSlides,
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    topics: ['Constant Rule', 'Power Rule', 'Binomial expansion', 'Basic differentiation']
  },
  {
    id: 'rates-of-change',
    title: 'Rates of Change',
    description: 'Apply derivatives to real-world motion problems, calculating average and instantaneous velocity.',
    slides: ratesOfChangeSlides,
    estimatedTime: '30 min',
    difficulty: 'Intermediate',
    topics: ['Average velocity', 'Instantaneous velocity', 'Position function', 'Free fall motion', 'Speed vs velocity']
  },
  {
    id: 'product-quotient-rules',
    title: 'Product Rule and Quotient Rule',
    description: 'Learn essential differentiation rules for products and quotients of functions.',
    slides: productQuotientRulesSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Product Rule', 'Quotient Rule', 'Differentiation techniques', 'Function products', 'Function quotients']
  },
  {
    id: 'chain-rule',
    title: 'The Chain Rule',
    description: 'Master the most powerful differentiation rule for composite functions and nested expressions.',
    slides: chainRuleSlides,
    estimatedTime: '30 min',
    difficulty: 'Intermediate',
    topics: ['Chain Rule', 'Composite functions', 'Nested functions', 'Rate relationships', 'Function composition']
  }
]

// Minimal React component to satisfy Next/React import expectations.
// The application primarily imports the exported `submodules` array.
export default function DifferentiationModule(): JSX.Element {
  return <div className="bg-gray-900 min-h-screen" />
}