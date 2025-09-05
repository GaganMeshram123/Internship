import React from 'react';
import { Slide } from '../../../common-components/concept';
import IntroductionSlide1 from './Slide1';
import IntroductionSlide2 from './Slide2';
import IntroductionSlide3 from './Slide3';
import IntroductionSlide4 from './Slide4';
import IntroductionSlide5 from './Slide5';

// Define slide array
export const introductionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is a Sequence?',
    content: '',
    component: IntroductionSlide1,
    id: 'introduction-basics'
  },
  {
    type: 'interactive',
    title: 'Sequences as Functions',
    content: '',
    component: IntroductionSlide2,
    id: 'sequences-as-functions'
  },
  {
    type: 'interactive',
    title: 'Sequence Notation and Terminology',
    content: '',
    component: IntroductionSlide3,
    id: 'notation-and-terminology'
  },
  {
    type: 'interactive',
    title: 'Recursive Sequences',
    content: '',
    component: IntroductionSlide4,
    id: 'recursive-sequences'
  },
  {
    type: 'interactive',
    title: 'Recursive Sequences in Function Notation',
    content: '',
    component: IntroductionSlide5,
    id: 'recursive-function-notation'
  }
];

// Dummy React component to satisfy Next.js requirements
function IntroductionToSequencesComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default IntroductionToSequencesComponent;