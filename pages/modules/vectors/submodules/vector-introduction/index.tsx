import React from 'react';
import { Slide } from '../../../common-components/concept';
import VectorIntroSlide1 from './Slide1';
import VectorIntroSlide2 from './Slide2';
import VectorRepresentationsSlide from './Slide3';

export const vectorIntroductionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Vectors: Position in 2D',
    content: '',
    component: VectorIntroSlide1,
    id: 'vectors-position-2d'
  },
  {
    type: 'interactive',
    title: 'Scalars and Vectors',
    content: '',
    component: VectorIntroSlide2,
    id: 'vectors-scalars-matching'
  },
  {
    type: 'interactive',
    title: 'Vector Representations',
    content: '',
    component: VectorRepresentationsSlide,
    id: 'vector-representations'
  }
];

function VectorIntroductionSubmodule() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default VectorIntroductionSubmodule; 