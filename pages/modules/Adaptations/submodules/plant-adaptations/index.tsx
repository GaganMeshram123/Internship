import React from 'react';
import { Slide } from '../../../common-components/concept';
import PlantAdaptationsSlide1 from './Slide1';
import PlantAdaptationsSlide2 from './Slide2';
import PlantAdaptationsSlide3 from './Slide3';
import PlantAdaptationsSlide4 from './Slide4';

export const plantAdaptationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Structural Plant Adaptations',
     component: PlantAdaptationsSlide1,
    id: 'structural-plant-adaptations'
  },
  {
    type: 'interactive',
    title: 'Seed Dispersal',
     component: PlantAdaptationsSlide2,
    id: 'seed-dispersal'
  },
  {
    type: 'interactive',
    title: 'Behavioral: Tropism',
      component: PlantAdaptationsSlide3,
    id: 'behavioral-tropism'
  },
  {
    type: 'interactive',
    title: 'Behavioral: Dormancy',
     component: PlantAdaptationsSlide4,
    id: 'behavioral-dormancy'
  }
];

function PlantAdaptationsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default PlantAdaptationsComponent;