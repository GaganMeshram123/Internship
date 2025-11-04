import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const hlSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to the HL Criterion',
    component: Slide1,
    id: 'hl-introduction'
  },
  {
    type: 'interactive',
    title: 'Identifying Congruent Triangles Using the HL Criterion',
    component: Slide2,
    id: 'hl-identifying-triangles'
  },
  {
    type: 'interactive',
    title: 'Calculating the Measure of an Angle Using HL',
    component: Slide3,
    id: 'hl-finding-angles'
  },
  {
    type: 'interactive',
    title: 'Calculating the Measure of a Side Using HL',
    component: Slide4,
    id: 'hl-finding-sides'
  },
  {
    type: 'interactive',
    title: 'Identifying True Statements Using the HL Criterion',
    component: Slide5,
    id: 'hl-true-statements'
  }
];

function HlCriterionComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default HlCriterionComponent;