import React from 'react';
import { Slide } from '../../../common-components/concept';
import CircleFundamentalsSlide1 from './Slide1';
import CircleFundamentalsSlide2 from './Slide2';
import CircleFundamentalsAssessment from './Slide3';

// Define slide array
export const circleFundamentalsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Basic Circle Definitions',
    content: '',
    component: CircleFundamentalsSlide1,
    id: 'ct-circle-basic-definitions'
  },
  {
    type: 'interactive',
    title: 'Special Lines in Circles',
    content: '',
    component: CircleFundamentalsSlide2,
    id: 'ct-circle-special-lines'
  },
  {
    type: 'question',
    title: 'Circle Fundamentals Assessment',
    content: React.createElement(() => <CircleFundamentalsAssessment />),
    persistResponse: true,
    component: CircleFundamentalsAssessment,
    id: 'ct-circle-fundamentals-assessment',
    questions: [
      {
        id: 'arc-vs-segment',
        questionText: 'Draw a circle with center O and radius 5 cm. Mark two points A and B on the circle such that the central angle AOB = 120°. Identify and label: (a) the major arc AB, (b) the minor arc AB, (c) the chord AB, (d) the segment formed by chord AB and the minor arc.',
        inputType: 'image',
        required: true
      },
      {
        id: 'central-angle-ratio',
        questionText: 'In a circle with radius 8 cm, if the central angle is 60°, find the ratio of: (a) arc length to radius, (b) area of sector to area of circle, (c) area of segment to area of sector. Show all calculations.',
        inputType: 'image',
        required: true
      },
      {
        id: 'subtended-angle-properties',
        questionText: 'A circle has center O and points P, Q, R on its circumference. If arc PQ subtends an angle of 80° at the center O, what angle does the same arc PQ subtend at point R on the circumference? Draw the diagram and explain the relationship.',
        inputType: 'image',
        required: true
      },
      {
        id: 'arc-segment-calculation',
        questionText: 'A chord of length 24 cm is at a distance of 5 cm from the center of a circle. Calculate: (a) the radius of the circle, (b) the central angle subtended by the chord, (c) the area of the minor segment formed by the chord.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function CircleFundamentalsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default CircleFundamentalsComponent; 
 