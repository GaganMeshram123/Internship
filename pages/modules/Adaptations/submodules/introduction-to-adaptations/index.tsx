import React from 'react';
import { Slide } from '../../../common-components/concept';
import IntroAdaptationsSlide1 from './Slide1';
import IntroAdaptationsSlide2 from './Slide2';

export const introductionToAdaptationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What Are Adaptations?',
   /*  content: 'An adaptation is an inherited characteristic that helps an organism survive and reproduce in its environment.',
    */ component: IntroAdaptationsSlide1,
    id: 'what-are-adaptations'
  },
  {
    type: 'interactive',
    title: 'Types of Adaptations',
    /* content: 'Adaptations can be either structural (physical body parts) or behavioral (the way an organism acts).',
     */component: IntroAdaptationsSlide2,
    id: 'types-of-adaptations'
  }
];

function IntroductionToAdaptationsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default IntroductionToAdaptationsComponent;