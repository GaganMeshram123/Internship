import React from 'react';
import { Slide } from '../../../common-components/concept';
import TypesOfForcesSlide1 from './Slide1';
import TypesOfForcesSlide2 from './Slide2';
import TypesOfForcesSlide3 from './Slide3';
import TypesOfForcesSlide4 from './Slide4';

// Define slide array for types of forces submodule
export const typesOfForcesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Types of Forces',
    content: '',
    component: TypesOfForcesSlide1,
    id: 'types-of-forces'
  },
  {
    type: 'interactive',
    title: 'Gravitational Force',
    content: '',
    component: TypesOfForcesSlide2,
    id: 'gravitational-force'
  },
  {
    type: 'interactive',
    title: 'Magnetic Force',
    content: '',
    component: TypesOfForcesSlide3,
    id: 'magnetic-force'
  },
  {
    type: 'interactive',
    title: 'Electrostatic Force',
    content: '',
    component: TypesOfForcesSlide4,
    id: 'electrostatic-force'
  }
];

// Dummy React component to satisfy Next.js requirements
function TypesOfForcesComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default TypesOfForcesComponent;