import React from 'react';
import { Slide } from '../../../common-components/concept';

// 1. Import all 7 slide components for this submodule
import MeasurementOfForcesSlide1 from './Slide1';
import MeasurementOfForcesSlide2 from './Slide2';
import MeasurementOfForcesSlide3 from './Slide3';
import MeasurementOfForcesSlide4 from './Slide4';
import MeasurementOfForcesSlide5 from './Slide5';
import MeasurementOfForcesSlide6 from './Slide6';
import MeasurementOfForcesSlide7 from './Slide7';

// 2. Define and export the slide array
export const measurementOfForcesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Force Has Magnitude and Direction',
    content: '',
    component: MeasurementOfForcesSlide1,
    id: 'force-magnitude-and-direction'
  },
  {
    type: 'interactive',
    title: 'Resultant Force',
    content: '',
    component: MeasurementOfForcesSlide2,
    id: 'resultant-force'
  },
  {
    type: 'interactive',
    title: 'Forces in the Same Direction',
    content: '',
    component: MeasurementOfForcesSlide3,
    id: 'forces-in-same-direction'
  },
  {
    type: 'interactive',
    title: 'Forces in Opposite Directions',
    content: '',
    component: MeasurementOfForcesSlide4,
    id: 'forces-in-opposite-directions'
  },
  {
    type: 'interactive',
    title: 'When Forces are Zero (Balanced Forces)',
    content: '',
    component: MeasurementOfForcesSlide5,
    id: 'balanced-forces'
  },
  {
    type: 'interactive',
    title: 'Unit of Force: The Newton (N)',
    content: '',
    component: MeasurementOfForcesSlide6,
    id: 'unit-of-force-newton'
  },
  {
    type: 'interactive',
    title: 'Measuring Force: The Spring Balance',
    content: '',
    component: MeasurementOfForcesSlide7,
    id: 'measuring-force-spring-balance'
  }
];

// 3. Dummy React component to satisfy Next.js requirements
function MeasurementOfForcesComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default MeasurementOfForcesComponent;