import React from 'react';
import { Slide } from '../../../common-components/concept';

// 1. Import all 5 slide components for this submodule
import ForcesOfFrictionSlide1 from './Slide1';
import ForcesOfFrictionSlide2 from './Slide2';
import ForcesOfFrictionSlide3 from './Slide3';
import ForcesOfFrictionSlide4 from './Slide4';
import ForcesOfFrictionSlide5 from './Slide5';

// 2. Define and export the slide array
export const forcesOfFrictionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is Friction?',
    content: '',
    component: ForcesOfFrictionSlide1,
    id: 'what-is-friction'
  },
  {
    type: 'interactive',
    title: 'Types of Friction',
    content: '',
    component: ForcesOfFrictionSlide2,
    id: 'types-of-friction'
  },
  {
    type: 'interactive',
    title: 'Effects & Factors of Friction',
    content: '',
    component: ForcesOfFrictionSlide3,
    id: 'effects-and-factors-of-friction'
  },
  {
    type: 'interactive',
    title: 'Controlling Friction',
    content: '',
    component: ForcesOfFrictionSlide4,
    id: 'controlling-friction'
  },
  {
    type: 'interactive',
    title: 'Advantages and Disadvantages',
    content: '',
    component: ForcesOfFrictionSlide5,
    id: 'advantages-disadvantages-friction'
  }
];

// 3. Dummy React component to satisfy Next.js requirements
function ForcesOfFrictionComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default ForcesOfFrictionComponent;