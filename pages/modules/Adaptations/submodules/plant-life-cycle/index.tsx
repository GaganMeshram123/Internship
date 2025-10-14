import React from 'react';
import { Slide } from '../../../common-components/concept';
import PlantLifeCycleSlide1 from './Slide1';
import PlantLifeCycleSlide2 from './Slide2';
import PlantLifeCycleSlide3 from './Slide3';

export const plantLifeCycleSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Life Cycle of a Plant',
      component: PlantLifeCycleSlide1,
    id: 'plant-life-cycle-intro'
  },
  {
    type: 'interactive',
    title: 'Key Stages: Pollination & Fertilization',
     component: PlantLifeCycleSlide2,
    id: 'plant-life-cycle-stages'
  },
  {
    type: 'interactive',
    title: 'Final Stages: Germination & Dispersal',
     component: PlantLifeCycleSlide3,
    id: 'plant-life-cycle-final-stages'
  }
];

function PlantLifeCycleComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default PlantLifeCycleComponent;