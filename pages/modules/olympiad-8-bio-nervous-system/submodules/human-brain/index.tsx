import React from 'react';
import { Slide } from '../../../common-components/concept';
import HumanBrainSlide1 from './Slide1';
import HumanBrainSlide2 from './Slide2';
import HumanBrainSlide3 from './Slide3';
import HumanBrainSlide4 from './Slide4';
import HumanBrainSlide5 from './Slide5';
import HumanBrainSlide6 from './Slide6';
import HumanBrainSlide7 from './Slide7';
import HumanBrainSlide8 from './Slide8';

export const humanBrainSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to the Human Brain',
    content: '',
    component: HumanBrainSlide1,
    id: 'brain-introduction'
  },
  {
    type: 'interactive',
    title: 'Forebrain: Overview',
    content: '',
    component: HumanBrainSlide2,
    id: 'forebrain-overview'
  },
  {
    type: 'interactive',
    title: 'Cerebrum',
    content: '',
    component: HumanBrainSlide3,
    id: 'cerebrum'
  },
  {
    type: 'interactive',
    title: 'The Diencephalon',
    content: '',
    component: HumanBrainSlide4,
    id: 'diencephalon'
  },
  {
    type: 'interactive',
    title: 'Limbic System',
    content: '',
    component: HumanBrainSlide5,
    id: 'limbic-system'
  },
  {
    type: 'interactive',
    title: 'Midbrain',
    content: '',
    component: HumanBrainSlide6,
    id: 'midbrain'
  },
  {
    type: 'interactive',
    title: 'Hindbrain',
    content: '',
    component: HumanBrainSlide7,
    id: 'hindbrain'
  },
  {
    type: 'interactive',
    title: 'Meninges',
    content: '',
    component: HumanBrainSlide8,
    id: 'meninges'
  }
];

function HumanBrainComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default HumanBrainComponent;