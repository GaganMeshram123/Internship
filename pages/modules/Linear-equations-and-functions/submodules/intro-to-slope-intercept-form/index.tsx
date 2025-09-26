import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule (assuming they will be created)
import IntroSlopeInterceptSlide1 from './Slide1';
import IntroSlopeInterceptSlide2 from './Slide2';
import IntroSlopeInterceptSlide3 from './Slide3';
import IntroSlopeInterceptSlide4 from './Slide4';
import IntroSlopeInterceptAssessment from './Slide5';

// Define and export the slide array for this submodule
export const introToSlopeInterceptSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The y = mx + b Formula',
    component: IntroSlopeInterceptSlide1,
    id: 'what-is-y-mx-b'
  },
  {
    type: 'interactive',
    title: 'Understanding Slope (m)',
    component: IntroSlopeInterceptSlide2,
    id: 'understanding-m'
  },
  {
    type: 'interactive',
    title: 'Understanding the y-intercept (b)',
    component: IntroSlopeInterceptSlide3,
    id: 'understanding-b'
  },
  {
    type: 'interactive',
    title: 'Identifying m and b in Equations',
    component: IntroSlopeInterceptSlide4,
    id: 'identifying-m-and-b'
  },
  {
    type: 'question',
    title: 'Assessment: Slope-Intercept Basics',
    component: IntroSlopeInterceptAssessment,
    id: 'slope-intercept-basics-assessment',
    questions: [
      {
        id: 'what-is-m',
        questionText: 'In the equation y = mx + b, what does the variable "m" represent?',
        inputType: 'text',
        required: true
      },
      {
        id: 'what-is-b',
        questionText: 'In the equation y = mx + b, what does the variable "b" represent?',
        inputType: 'text',
        required: true
      },
      {
        id: 'identify-from-equation',
        questionText: 'For the linear equation y = -3x + 7, what is the slope and what is the y-intercept?',
        inputType: 'text',
        required: true
      },
      {
        id: 'create-equation',
        questionText: 'A line has a slope of 1/2 and a y-intercept of -4. What is its equation in slope-intercept form?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component
function IntroToSlopeInterceptFormComponent() {
  return <div>This is a submodule data file, not a page.</div>;
}

export default IntroToSlopeInterceptFormComponent;