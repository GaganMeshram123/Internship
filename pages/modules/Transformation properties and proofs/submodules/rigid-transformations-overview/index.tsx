import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

export const rigidTransformationsOverviewSlides: Slide[] = [
  {
    type: 'interactive', // Or 'article' if you have a specific type
    title: 'Getting ready for transformation properties',
    component: Slide1,
    id: 'getting-ready-for-properties'
  },
  {
    type: 'interactive', // Or 'video' if you have a specific type
    title: 'Finding measures using rigid transformations',
    component: Slide2,
    id: 'finding-measures'
  },
  {
    type: 'interactive', // Or 'video'
    title: 'Rigid transformations: preserved properties',
    component: Slide3,
    id: 'preserved-properties'
  },
  {
    type: 'interactive', // Or 'video'
    title: 'Mapping shapes',
    component: Slide4,
    id: 'mapping-shapes'
  }
];

function RigidTransformationsOverviewComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default RigidTransformationsOverviewComponent;