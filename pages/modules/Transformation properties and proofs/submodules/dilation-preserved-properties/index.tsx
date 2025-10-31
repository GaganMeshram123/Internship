import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';

export const dilationPreservedPropertiesSlides: Slide[] = [
  {
    type: 'interactive', // Or 'video'
    title: 'Dilations and properties',
    component: Slide1,
    id: 'dilations-and-properties'
  }
];

function DilationPreservedPropertiesComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default DilationPreservedPropertiesComponent;