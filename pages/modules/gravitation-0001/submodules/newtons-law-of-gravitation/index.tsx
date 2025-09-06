import React from 'react';
import { Slide } from '../../../common-components/concept';
import NewtonsLawSlide1 from './Slide1';
import NewtonsLawSlide2 from './Slide2';
import NewtonsLawSlide3 from './Slide3';
import NewtonsLawSlide4 from './Slide4';
import GravitationPracticeSlide from './Slide5';

// Define slide array
export const newtonsLawOfGravitationSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Newton\'s Insight: Universal Gravitation',
    content: '',
    component: NewtonsLawSlide1,
    id: 'newtons-law-insight'
  },
  {
    type: 'interactive',
    title: 'Nature of Gravitational Force',
    content: '',
    component: NewtonsLawSlide2,
    id: 'gravitational-nature'
  },
  {
    type: 'interactive',
    title: 'The Gravitational Constant and Force Calculations',
    content: '',
    component: NewtonsLawSlide3,
    id: 'gravitational-constant-calculations'
  },
  {
    type: 'interactive',
    title: 'Newton\'s Third Law and Force Pairs',
    content: '',
    component: NewtonsLawSlide4,
    id: 'third-law-force-pairs'
  },
  {
    type: 'question',
    title: 'Practice Problems',
    content: React.createElement(() => <GravitationPracticeSlide />),
    persistResponse: true,
    id: 'gravitation-practice-problems',
    questions: [
      {
        id: 'gravitation-practice-1',
        questionText: 'Calculate the gravitational force between Earth and Moon, and explain why this force doesn\'t cause the Moon to crash into Earth.',
        inputType: 'image',
        required: true
      },
      {
        id: 'gravitation-practice-2',
        questionText: 'For a 70 kg astronaut and 100,000 kg space station 10 m apart: (A) Calculate gravitational force, (B) Find accelerations using Newton\'s third law, (C) Determine time to meet from rest.',
        inputType: 'image',
        required: true
      },
      {
        id: 'gravitation-practice-3',
        questionText: 'Analyze gravitational field lines: If 100 lines pass through radius 2m, how many through radius 6m? Prove that field line density follows the same 1/r^2 law as gravitational force.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function NewtonsLawOfGravitationComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default NewtonsLawOfGravitationComponent; 