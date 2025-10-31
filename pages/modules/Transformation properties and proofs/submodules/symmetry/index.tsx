import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

export const symmetrySlides: Slide[] = [
  {
    type: 'interactive', // Or 'video'
    title: 'Intro to reflective symmetry',
    component: Slide1,
    id: 'intro-to-reflective-symmetry'
  },
  {
    type: 'interactive', // Or 'video'
    title: 'Intro to rotational symmetry',
    component: Slide2,
    id: 'intro-to-rotational-symmetry'
  },
  {
    type: 'interactive', // Or 'video'
    title: 'Finding a quadrilateral from its symmetries',
    component: Slide3,
    id: 'finding-quadrilateral-symmetries-1'
  },
  {
    type: 'interactive', // Or 'video'
    title: 'Finding a quadrilateral from its symmetries (example 2)',
    component: Slide4,
    id: 'finding-quadrilateral-symmetries-2'
  }
];

function SymmetryComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default SymmetryComponent;