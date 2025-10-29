import React from 'react';
import { Slide } from '../../../common-components/concept';
import IntroductionSlide1 from './Slide1';
import IntroductionSlide2 from './Slide2';
import IntroductionSlide3 from './Slide3';
import IntroductionSlide4 from './Slide4';
import IntroductionSlide5 from './Slide5';
import IntroductionSlide6 from './Slide6';

// Define slide array for introduction submodule
export const introductionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'History of Force',
    content: '',
    component: IntroductionSlide1,
    id: 'history-of-force'
  },
  {
    type: 'interactive',
    title: 'Force can move Stationary Objects',
    content: '',
    component: IntroductionSlide2,
    id: 'force-can-move-objects'
  },
  {
    type: 'interactive',
    title: 'Force can stop a moving object',
    content: '',
    component: IntroductionSlide3,
    id: 'force-can-stop-objects'
  },
  {
    type: 'interactive',
    title: 'Force can change the speed',
    content: '',
    component: IntroductionSlide4,
    id: 'force-can-change-speed'
  },
  {
    type: 'interactive',
    title: 'Force can change the size and shape',
    content: '',
    component: IntroductionSlide5,
    id: 'force-can-change-shape'
  },
  {
    type: 'interactive',
    title: 'Force can change the direction of Motion',
    content: '',
    component: IntroductionSlide6,
    id: 'force-can-change-direction'
  }
];

// Dummy React component to satisfy Next.js requirements
function IntroductionToForceComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default IntroductionToForceComponent;