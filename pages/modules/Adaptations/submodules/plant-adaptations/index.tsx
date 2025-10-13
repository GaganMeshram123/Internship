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
    content: 'Plants have physical adaptations like thorns for protection [cite: 117] [cite_start]and large leaves to capture more sun for photosynthesis[cite: 118, 119].',
    component: PlantAdaptationsSlide1,
    id: 'structural-plant-adaptations'
  },
  {
    type: 'interactive',
    title: 'Seed Dispersal',
    content: 'Seeds have adaptations to travel by wind, water, or animals to ensure they can grow away from the parent plant[cite: 127, 128, 129].',
    component: PlantAdaptationsSlide2,
    id: 'seed-dispersal'
  },
  {
    type: 'interactive',
    title: 'Behavioral: Tropism',
    content: 'Tropism is a plant\'s movement in response to a stimulus[cite: 164]. [cite_start]Phototropism is movement toward light [cite: 165][cite_start], and gravitropism is a response to gravity[cite: 172].',
    component: PlantAdaptationsSlide3,
    id: 'behavioral-tropism'
  },
  {
    type: 'interactive',
    title: 'Behavioral: Dormancy',
    content: 'Dormancy is a state of rest or inactivity that allows plants to survive unfavorable conditions, like winter[cite: 184, 186, 187].',
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