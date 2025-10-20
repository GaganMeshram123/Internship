import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';
import Slide7 from './Slide7';

export const dilationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Dilating Points',
    component: Slide1,
    id: 'dilating-points'
  },
  {
    type: 'interactive',
    title: 'Dilations: Scale Factor',
    component: Slide2,
    id: 'dilations-scale-factor'
  },
  {
    type: 'interactive',
    title: 'Dilations: Center',
    component: Slide3,
    id: 'dilations-center'
  },
  {
    type: 'interactive',
    title: 'Dilating Shapes: Expanding',
    component: Slide4,
    id: 'dilating-shapes-expanding'
  },
  {
    type: 'interactive',
    title: 'Dilating Shapes: Shrinking',
    component: Slide5,
    id: 'dilating-shapes-shrinking'
  },
  {
    type: 'interactive',
    title: 'Dilating Triangles: Find the Error',
    component: Slide6,
    id: 'dilations-find-error'
  },
  {
    type:A: 'interactive',
    title: 'Performing Transformations FAQ',
    component: Slide7,
    id: 'transformations-faq'
  }
];

function DilationsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default DilationsComponent;