import React from 'react';
import { Slide } from '../../../common-components/concept';
import PlantLifeCycleSlide1 from './Slide1';
import PlantLifeCycleSlide2 from './Slide2';
import PlantLifeCycleSlide3 from './Slide3';

export const plantLifeCycleSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Life Cycle of a Plant',
    content: 'Reproduction is the process by which a plant produces seeds to create a new plant, following a distinct life cycle[cite: 202].',
    component: PlantLifeCycleSlide1,
    id: 'plant-life-cycle-intro'
  },
  {
    type: 'interactive',
    title: 'Key Stages: Pollination & Fertilization',
     content: 'The life cycle includes pollination, where pollen is carried to the stigma [cite: 210][cite_start], and fertilization, where sex cells fuse to develop seeds[cite: 212, 213].',
    component: PlantLifeCycleSlide2,
    id: 'plant-life-cycle-stages'
  },
  {
    type: 'interactive',
    title: 'Final Stages: Germination & Dispersal',
    content: 'The cycle concludes with seed dispersal to spread them out, followed by germination, where the seeds start to grow in a suitable place.',
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