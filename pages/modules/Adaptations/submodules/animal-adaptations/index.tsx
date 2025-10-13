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
    content: 'Camouflage helps animals blend in with their environment [cite: 42][cite_start], while mimicry involves copying the appearance of another organism for protection[cite: 48, 49].',
    component: AnimalAdaptationsSlide1,
    id: 'structural-camouflage-mimicry'
  },
  {
    type: 'interactive',
    title: 'Structural: Body Parts',
    content: 'Physical features like sharp teeth for meat-eaters [cite: 62][cite_start], forward-facing eyes for predators [cite: 68][cite_start], and side-facing eyes for prey [cite: 66] are key adaptations.',
    component: AnimalAdaptationsSlide2,
    id: 'structural-body-parts'
  },
  {
    type: 'interactive',
    title: 'Behavioral: Survival Instincts',
    content: 'Behaviors include migration to find food or reproduce [cite: 81] [cite_start]and hibernation to survive winter by becoming inactive[cite: 88].',
    component: AnimalAdaptationsSlide3,
    id: 'behavioral-survival-instincts'
  },
  {
    type: 'interactive',
    title: 'Behavioral: Social & Tool Use',
    content: 'Other behavioral adaptations include living in groups for protection [cite: 91][cite_start], using tools [cite: 94][cite_start], and playing dead to escape predators[cite: 99].',
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