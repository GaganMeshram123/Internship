import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const introToRigidTransformationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Rigid Transformations Intro',
    component: Slide1,
    id: 'rigid-intro'
  },
  {
    type: 'interactive',
    title: 'Dilations Intro',
    component: Slide2,
    id: 'dilations-intro'
  },
  {
    type: 'interactive',
    title: 'Translations Intro',
    component: Slide3,
    id: 'translations-intro'
  },
  {
    type: 'interactive',
    title: 'Rotations Intro',
    component: Slide4,
    id: 'rotations-intro'
  },
  {
    type: 'interactive',
    title: 'Identifying Transformations',
    component: Slide5,
    id: 'identifying-transformations'
  }
];

function IntroToRigidTransformationsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default IntroToRigidTransformationsComponent;