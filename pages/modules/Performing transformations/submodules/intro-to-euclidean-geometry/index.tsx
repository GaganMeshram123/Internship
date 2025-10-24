import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

export const introToEuclideanGeometrySlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Getting Ready for Transformations',
    component: Slide1,
    id: 'getting-ready'
  },
  {
    type: 'interactive',
    title: 'Euclid as the Father of Geometry',
    component: Slide2,
    id: 'euclid-history'
  },
  {
    type: 'interactive',
    title: 'Terms & Labels in Geometry',
    component: Slide3,
    id: 'terms-and-labels'
  },
  {
    type: 'interactive',
    title: 'Geometric Definitions Example',
    component: Slide4,
    id: 'geometric-definitions'
  }
];

function IntroToEuclideanGeometryComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default IntroToEuclideanGeometryComponent;