import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const sasSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to the SAS Criterion',
    component: Slide1,
    id: 'sas-introduction'
  },
  {
    type: 'interactive',
    title: 'Identifying Congruent Triangles Using SAS',
    component: Slide2,
    id: 'sas-identifying-triangles'
  },
  {
    type: 'interactive',
    title: 'Finding the Measure of an Angle Using SAS',
    component: Slide3,
    id: 'sas-finding-angles'
  },
  {
    type: 'interactive',
    title: 'Calculating the Length of a Line Segment Using SAS',
    component: Slide4,
    id: 'sas-finding-lengths'
  },
  {
    type: 'interactive',
    title: 'Identifying True Statements Using the SAS Criterion',
    component: Slide5,
    id: 'sas-true-statements'
  }
];

function SasCriterionComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default SasCriterionComponent;