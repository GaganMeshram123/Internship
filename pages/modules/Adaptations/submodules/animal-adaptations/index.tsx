import React from 'react';
import { Slide } from '../../../common-components/concept';
import AnimalAdaptationsSlide1 from './Slide1';
import AnimalAdaptationsSlide2 from './Slide2';
import AnimalAdaptationsSlide3 from './Slide3';
import AnimalAdaptationsSlide4 from './Slide4';

export const animalAdaptationsSlides: Slide[] = [
  
  {
    type: 'interactive',
    title: 'Structural: Camouflage & Mimicry',
     component: AnimalAdaptationsSlide1,
    id: 'structural-camouflage-mimicry'
  },
  {
    type: 'interactive',
    title: 'Structural: Body Parts',
    component: AnimalAdaptationsSlide2,
    id: 'structural-body-parts'
  },
  {
    type: 'interactive',
    title: 'Behavioral: Survival Instincts',
     component: AnimalAdaptationsSlide3,
    id: 'behavioral-survival-instincts'
  },
  {
    type: 'interactive',
    title: 'Behavioral: Social & Tool Use',
    component: AnimalAdaptationsSlide4,
    id: 'behavioral-social-tool-use'
  }
];

function AnimalAdaptationsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default AnimalAdaptationsComponent;