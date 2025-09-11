import React from 'react';
import { Slide } from '../../../common-components/concept';
import VectorAdditionSlide from './Slide1';
import VectorSubtractionSlide from './Slide2';
import ScalarMultiplicationSlide from './Slide3';
import BasisVectorsSlide from './Slide4';
import VectorMagnitudeSlide from './Slide5';

export const vectorOperationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Vector Addition',
    content: '',
    component: VectorAdditionSlide,
    id: 'vector-addition'
  },
  {
    type: 'interactive',
    title: 'Vector Subtraction',
    content: '',
    component: VectorSubtractionSlide,
    id: 'vector-subtraction'
  },
  {
    type: 'interactive',
    title: 'Scalar Multiplication',
    content: '',
    component: ScalarMultiplicationSlide,
    id: 'scalar-multiplication'
  },
  {
    type: 'interactive',
    title: 'Basis Vectors',
    content: '',
    component: BasisVectorsSlide,
    id: 'basis-vectors'
  },
  {
    type: 'interactive',
    title: 'Vector Magnitude',
    content: '',
    component: VectorMagnitudeSlide,
    id: 'vector-magnitude'
  }
];

function VectorOperationsSubmodule() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default VectorOperationsSubmodule; 