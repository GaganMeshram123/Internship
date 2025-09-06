import React from 'react';
import { Slide } from '../../../common-components/concept';
import IntroGravitationSlide1 from './Slide1';
import IntroGravitationSlide2 from './Slide2';

// Define slide array
export const introductionToGravitationSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What Is Physics? The Cosmic Reach of Gravity',
    content: '',
    component: IntroGravitationSlide1,
    id: 'gravitation-intro-cosmic-reach'
  },
  {
    type: 'interactive',
    title: 'History of Gravity Discovery',
    content: '',
    component: IntroGravitationSlide2,
    id: 'gravitation-intro-universal-force'
  }
];

// Dummy React component to satisfy Next.js requirements
function IntroductionToGravitationComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default IntroductionToGravitationComponent; 