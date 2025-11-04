import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const aasSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to the AAS Criterion',
    component: Slide1,
    id: 'aas-introduction'
  },
  {
    type: 'interactive',
    title: 'Finding the Value of an Unknown Using AAS',
    component: Slide2,
    id: 'aas-finding-unknowns'
  },
  {
    type: 'interactive',
    title: 'Finding the Measure of an Angle Using AAS',
    component: Slide3,
    id: 'aas-finding-angles'
  },
  {
    type: 'interactive',
    title: 'Calculating the Length of a Line Segment Using AAS',
    component: Slide4,
    id: 'aas-finding-lengths'
  },
  {
    type: 'interactive',
    title: 'Identifying Correct Statements Using the AAS Criterion',
    component: Slide5,
    id: 'aas-correct-statements'
  }
];

function AasCriterionComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default AasCriterionComponent;