import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';
import Slide7 from './Slide7';

export const rigidMotionsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Rigid Motions',
    component: Slide1,
    id: 'rigid-motions-introduction'
  },
  {
    type: 'interactive',
    title: 'Properties of Rigid Motions',
    component: Slide2,
    id: 'rigid-motions-properties'
  },
  {
    type: 'interactive',
    title: 'Identifying Polygons That Map to Each Other',
    component: Slide3,
    id: 'rigid-motions-mapping'
  },
  {
    type: 'interactive',
    title: 'Identifying Why Polygons Are Congruent Using Rigid Motions',
    component: Slide4,
    id: 'rigid-motions-why-congruent'
  },
  {
    type: 'interactive',
    title: 'Identifying Maps in Function Notation',
    component: Slide5,
    id: 'rigid-motions-function-notation'
  },
  {
    type: 'interactive',
    title: 'Further Properties of Rigid Motions',
    component: Slide6,
    id: 'rigid-motions-further-properties'
  },
  {
    type: 'interactive',
    title: 'Identifying True Statements About Rigid Motions',
    component: Slide7,
    id: 'rigid-motions-true-statements'
  }
];

function RigidMotionsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default RigidMotionsComponent;