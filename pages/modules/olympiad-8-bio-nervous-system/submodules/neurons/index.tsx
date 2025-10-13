import React from 'react';
import { Slide } from '../../../common-components/concept';
import NeuronsSlide1 from './Slide1';
import NeuronsSlide2 from './Slide2';
import NeuronsSlide3 from './Slide3';
import NeuronsSlide4 from './Slide4';
import NeuronsSlide5 from './Slide5';
import NeuronsSlide6 from './Slide6';
import NeuronsSlide7 from './Slide7';

export const neuronsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Basic Unit of the Nervous System',
    content: '',
    component: NeuronsSlide1,
    id: 'neurons-basics'
  },
  {
    type: 'interactive',
    title: 'Structure of a Neuron',
    content: '',
    component: NeuronsSlide2,
    id: 'neuron-structure'
  },
  {
    type: 'interactive',
    title: 'Synaptic Transmission',
    content: '',
    component: NeuronsSlide3,
    id: 'synaptic-transmission'
  },
  {
    type: 'interactive',
    title: 'Membrane Potential',
    content: '',
    component: NeuronsSlide4,
    id: 'membrane-potential'
  },
  {
    type: 'interactive',
    title: 'Types of Neurons (Based on Myelination)',
    content: '',
    component: NeuronsSlide5,
    id: 'neuron-types-myelination'
  },
  {
    type: 'interactive',
    title: 'Types of Neurons (Based on Structure)',
    content: '',
    component: NeuronsSlide6,
    id: 'neuron-types-structure'
  },
  {
    type: 'interactive',
    title: 'Types of Neurons (Based on Function)',
    content: '',
    component: NeuronsSlide7,
    id: 'neuron-types-function'
  }
];

function NeuronsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default NeuronsComponent;