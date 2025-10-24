import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const rotationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Rotating Points',
    component: Slide1,
    id: 'rotating-points'
  },
  {
    type: 'interactive',
    title: 'Determining Rotations',
    component: Slide2,
    id: 'determining-rotations-1'
  },
  {
    type: 'interactive',
    title: 'Determining Rotations',
    component: Slide3,
    id: 'determining-rotations-2'
  },
  {
    type: 'interactive',
    title: 'Rotating Shapes',
    component: Slide4,
    id: 'rotating-shapes'
  },
  {
    type: 'interactive',
    title: 'Rotating Shapes: 90° Multiples',
    component: Slide5,
    id: 'rotating-shapes-90-multiples'
  }
];

function RotationsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default RotationsComponent;