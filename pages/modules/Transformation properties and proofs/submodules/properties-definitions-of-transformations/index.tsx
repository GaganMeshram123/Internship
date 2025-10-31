import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

export const propertiesDefinitionsTransformationsSlides: Slide[] = [
  {
    type: 'interactive', // Or 'video'
    title: 'Sequences of transformations',
    component: Slide1,
    id: 'sequences-of-transformations'
  },
  {
    type: 'interactive', // Or 'video'
    title: 'Defining transformations',
    component: Slide2,
    id: 'defining-transformations'
  },
  {
    type: 'interactive', // Or 'article'
    title: 'Precisely defining rotations',
    component: Slide3,
    id: 'precisely-defining-rotations'
  },
  {
    type: 'interactive', // Or 'video'
    title: 'Identifying type of transformation',
    component: Slide4,
    id: 'identifying-type-of-transformation'
  }
];

function PropertiesDefinitionsTransformationsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default PropertiesDefinitionsTransformationsComponent;