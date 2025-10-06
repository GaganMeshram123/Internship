import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components for this submodule
import DistanceDisplacementSlide1 from './Slide1';
import DistanceDisplacementSlide2 from './Slide2';
import DistanceDisplacementSlide3 from './Slide3';
import DistanceDisplacementSlide4 from './Slide4';
import DistanceDisplacementSlide5 from './Slide5';
import DistanceDisplacementAssessment from './Slide6';

// Define the array of slides for the "Distance and Displacement" submodule
export const distanceDisplacementSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is Position and Motion?',
    content: '',
    component: DistanceDisplacementSlide1,
    id: 'dd-position-motion'
  },
  {
    type: 'interactive',
    title: 'Understanding Distance (A Scalar Quantity)',
    content: '',
    component: DistanceDisplacementSlide2,
    id: 'dd-what-is-distance'
  },
  {
    type: 'interactive',
    title: 'Understanding Displacement (A Vector Quantity)',
    content: '',
    component: DistanceDisplacementSlide3,
    id: 'dd-what-is-displacement'
  },
  {
    type: 'interactive',
    title: 'Comparing Distance and Displacement',
    content: '',
    component: DistanceDisplacementSlide4,
    id: 'dd-comparison'
  },
  {
    type: 'interactive',
    title: 'Interactive Example: Tracing a Path',
    content: '',
    component: DistanceDisplacementSlide5,
    id: 'dd-interactive-example'
  },
  {
    type: 'question',
    title: 'Distance & Displacement Assessment',
    content: React.createElement(() => <DistanceDisplacementAssessment />),
    persistResponse: true,
    component: DistanceDisplacementAssessment,
    id: 'dd-assessment',
    questions: [
      {
        id: 'dd-problem-1',
        questionText: 'A person walks 8 meters east and then 6 meters north. Calculate the total distance traveled and the magnitude of the displacement. Show your work.',
        inputType: 'image', // Assuming students will upload an image of their work
        required: true
      },
      {
        id: 'dd-problem-2',
        questionText: 'An athlete runs exactly one lap around a circular track with a radius of 50 meters. What is the distance covered, and what is her displacement? Explain your reasoning.',
        inputType: 'image',
        required: true
      },
      {
        id: 'dd-problem-3',
        questionText: 'A car travels from point A to point B, which is 10 km away. It then returns to point A. The entire trip takes 30 minutes. What is the car\'s total distance and final displacement for the entire trip?',
        inputType: 'image',
        required: true
      },
      {
        id: 'dd-conceptual-q',
        questionText: 'Is it possible for the displacement of an object to be greater than the distance it traveled? Explain why or why not.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component that is exported by default to satisfy module requirements
function DistanceDisplacementComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default DistanceDisplacementComponent;