import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const asaSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to the ASA Criterion',
    component: Slide1,
    id: 'asa-introduction'
  },
  {
    type: 'interactive',
    title: 'Identifying Congruent Triangles Using ASA',
    component: Slide2,
    id: 'asa-identifying-triangles'
  },
  {
    type: 'interactive',
    title: 'Finding the Measure of an Angle Using ASA',
    component: Slide3,
    id: 'asa-finding-angles'
  },
  {
    type: 'interactive',
    title: 'Calculating the Length of a Line Segment Using ASA',
    component: Slide4,
    id: 'asa-finding-lengths'
  },
  {
    type: 'interactive',
    title: 'Identifying True Statements Using the ASA Criterion',
    component: Slide5,
    id: 'asa-true-statements'
  }
];

function AsaCriterionComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default AsaCriterionComponent;