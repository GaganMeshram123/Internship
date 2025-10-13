import React from 'react';
import { Slide } from '../../../common-components/concept';
import NervousSystemSlide1 from './Slide1';
import NervousSystemSlide2 from './Slide2';
import NervousSystemSlide3 from './Slide3';
import NervousSystemSlide4 from './Slide4';

export const nervousSystemSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Nervous System',
    content: '',
    component: NervousSystemSlide1,
    id: 'nervous-system-introduction'
  },
  {
    type: 'interactive',
    title: 'Stimulus–Response Pathway',
    content: '',
    component: NervousSystemSlide2,
    id: 'stimulus-response-pathway'
  },
  {
    type: 'interactive',
    title: 'Reflex Arc',
    content: '',
    component: NervousSystemSlide3,
    id: 'reflex-arc'
  },
  {
    type: 'interactive',
    title: 'Divisions of the Nervous System',
    content: '',
    component: NervousSystemSlide4,
    id: 'nervous-system-divisions'
  }
];

function NervousSystemComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default NervousSystemComponent;