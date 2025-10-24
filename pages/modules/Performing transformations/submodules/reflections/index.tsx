import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';

export const reflectionsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Reflecting Points',
    component: Slide1,
    id: 'reflecting-points'
  },
  {
    type: 'interactive',
    title: 'Determining Reflections',
    component: Slide2,
    id: 'determining-reflections'
  },
  {
    type: 'interactive',
    title: 'Determining Reflections (Advanced)',
    component: Slide3,
    id: 'determining-reflections-advanced'
  },
  {
    type: 'interactive',
    title: 'Reflecting Shapes',
    component: Slide4,
    id: 'reflecting-shapes'
  },
  {
    type: 'interactive',
    title: 'Reflecting Shapes: Diagonal Line',
    component: Slide5,
    id: 'reflecting-shapes-diagonal'
  },
  {
    type: 'interactive',
    title: 'Reflecting Shapes Summary',
    component: Slide6,
    id: 'reflecting-shapes-summary'
  }
];

function ReflectionsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default ReflectionsComponent;