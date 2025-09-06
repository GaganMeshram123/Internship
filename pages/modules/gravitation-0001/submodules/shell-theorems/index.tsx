import React from 'react';
import { Slide } from '../../../common-components/concept';
import SuperpositionSlide1 from './Slide1';
import SuperpositionSlide2 from './Slide2';
import SuperpositionSlide3 from './Slide3';
import SuperpositionSlide4 from './Slide4';
import SuperpositionSlide5 from './Slide5';
import SuperpositionPracticeSlide from './Slide6';

// Define slide array
export const gravitationAndSuperpositionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Principle of Superposition',
    content: '',
    component: SuperpositionSlide1,
    id: 'superposition-principle'
  },
  {
    type: 'interactive',
    title: 'Shell Theorem: External Points',
    content: '',
    component: SuperpositionSlide2,
    id: 'shell-theorem-external'
  },
  {
    type: 'interactive',
    title: 'Shell Theorem: Internal Points',
    content: '',
    component: SuperpositionSlide3,
    id: 'shell-theorem-internal'
  },
  {
    type: 'interactive',
    title: 'Solid Sphere Analysis',
    content: '',
    component: SuperpositionSlide4,
    id: 'solid-sphere-analysis'
  },
  {
    type: 'interactive',
    title: 'Inside a Solid Sphere',
    content: '',
    component: SuperpositionSlide5,
    id: 'inside-solid-sphere'
  },
  {
    type: 'question',
    title: 'Practice Problems',
    content: React.createElement(() => <SuperpositionPracticeSlide />),
    persistResponse: true,
    id: 'superposition-practice-problems',
    questions: [
      {
        id: 'superposition-practice-1',
        questionText: 'Analyze the hollow Earth theory using shell theorem: (A) Determine gravitational force inside hollow shell, (B) Explain why people couldn\'t walk on inner surface, (C) Describe motion through drilled hole, (D) Effect of central sun.',
        inputType: 'image',
        required: true
      },
      {
        id: 'superposition-practice-2',
        questionText: 'Journey to Earth\'s center: (A) Derive force formula vs depth, (B) Find depth for half surface gravity, (C) Explain zero force at center, (D) Analyze oscillatory motion and period.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function GravitationAndSuperpositionComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default GravitationAndSuperpositionComponent; 