import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const sssSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to the SSS Criterion',
    component: Slide1,
    id: 'sss-introduction'
  },
  {
    type: 'interactive',
    title: 'Identifying Congruent Triangles Using SSS',
    component: Slide2,
    id: 'sss-identifying-triangles'
  },
  {
    type: 'interactive',
    title: 'Identifying Congruent Triangles Within a Polygon Using SSS',
    component: Slide3,
    id: 'sss-identifying-polygons'
  },
  {
    type: 'interactive',
    title: 'Applying SSS to Find Measures of Angles',
    component: Slide4,
    id: 'sss-finding-angles'
  },
  {
    type: 'interactive',
    title: 'Applying SSS in Isosceles Triangles and Parallelograms',
    component: Slide5,
    id: 'sss-applications'
  }
];

function SssCriterionComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default SssCriterionComponent;