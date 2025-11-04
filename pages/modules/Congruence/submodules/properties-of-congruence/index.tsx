import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';
import Slide7 from './Slide7';
import Slide8 from './Slide8';
import Slide9 from './Slide9';

export const propertiesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Properties of Congruence',
    component: Slide1,
    id: 'properties-introduction'
  },
  {
    type: 'interactive',
    title: 'Reflexivity, Symmetry, and Transitivity of Equality',
    component: Slide2,
    id: 'properties-equality'
  },
  {
    type: 'interactive',
    title: 'Equality of Numbers',
    component: Slide3,
    id: 'properties-equality-numbers'
  },
  {
    type: 'interactive',
    title: 'Congruence of Segments',
    component: Slide4,
    id: 'properties-segment-congruence'
  },
  {
    type: 'interactive',
    title: 'Reflexivity, Symmetry, and Transitivity of Congruence',
    component: Slide5,
    id: 'properties-congruence-rst'
  },
  {
    type: 'interactive',
    title: 'Segment Congruence (Applications)',
    component: Slide6,
    id: 'properties-segment-applications'
  },
  {
    type: 'interactive',
    title: 'Congruence of Angles',
    component: Slide7,
    id: 'properties-angle-congruence'
  },
  {
    type: 'interactive',
    title: 'Angle Congruence (Applications)',
    component: Slide8,
    id: 'properties-angle-applications'
  },
  {
    type: 'interactive',
    title: 'Omitting the Symmetric Property',
    component: Slide9,
    id: 'properties-omitting-symmetric'
  }
];

function PropertiesOfCongruenceComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default PropertiesOfCongruenceComponent;