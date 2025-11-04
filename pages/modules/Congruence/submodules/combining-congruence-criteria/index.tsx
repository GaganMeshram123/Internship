import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const combiningSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Combining Criteria',
    component: Slide1,
    id: 'combining-introduction'
  },
  {
    type: 'interactive',
    title: 'Identifying Congruent Triangles',
    component: Slide2,
    id: 'combining-identifying'
  },
  {
    type: 'interactive',
    title: 'Cases With Vertical Angles',
    component: Slide3,
    id: 'combining-vertical-angles'
  },
  {
    type: 'interactive',
    title: 'Cases With Common Sides',
    component: Slide4,
    id: 'combining-common-sides'
  },
  {
    type: 'interactive',
    title: 'Why Is There No SSA Criterion?',
    component: Slide5,
    id: 'combining-no-ssa'
  }
];

function CombiningCriteriaComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default CombiningCriteriaComponent;