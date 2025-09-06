import React from 'react';
import { Slide } from '../../../common-components/concept';
import EarthSurfaceSlide1 from './Slide1';
import EarthSurfaceSlide2 from './Slide2';
import EarthSurfacePracticeSlide from './Slide3';

// Define slide array
export const gravitationNearEarthSurfaceSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Deriving g from Universal Gravitation',
    content: '',
    component: EarthSurfaceSlide1,
    id: 'gravitational-acceleration-earth'
  },
  {
    type: 'interactive',
    title: 'Gravity Variation with Height',
    content: '',
    component: EarthSurfaceSlide2,
    id: 'gravity-at-height'
  },
  {
    type: 'question',
    title: 'Practice Problems',
    content: React.createElement(() => <EarthSurfacePracticeSlide />),
    persistResponse: true,
    id: 'earth-surface-practice-problems',
    questions: [
      {
        id: 'earth-surface-practice-1',
        questionText: 'Derive why gravitational acceleration is independent of mass and explain the historical significance of this result. Include the Moon hammer-feather experiment analysis.',
        inputType: 'image',
        required: true
      },
      {
        id: 'earth-surface-practice-2',
        questionText: 'Calculate gravity at 39 km altitude using exact and approximate formulas. Analyze the percentage error and determine when the binomial approximation becomes unreliable.',
        inputType: 'image',
        required: true
      },
      {
        id: 'earth-surface-practice-3',
        questionText: 'Derive Earth\'s mass from pendulum measurements: (A) Express g in terms of pendulum period, (B) Derive mass formula, (C) Calculate using given data and compare to accepted value.',
        inputType: 'image',
        required: true
      },
      {
        id: 'earth-surface-practice-4',
        questionText: 'Analyze gravity anomaly detection: Calculate gravity difference above underground cavern, assess detectability with modern instruments, explain why shallow structures are more detectable.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function GravitationNearEarthSurfaceComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default GravitationNearEarthSurfaceComponent; 