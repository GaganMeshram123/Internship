import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the individual slide components
import UCMotionSlide1 from './Slide1';
import UCMotionSlide2 from './Slide2';
import UCMotionSlide3 from './Slide3';
import UCMotionSlide4 from './Slide4';
import UCMotionAssessment from './Slide5';

// Define the array of slides
export const uniformCircularMotionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Motion in a Circle: An Introduction',
    content: '',
    component: UCMotionSlide1,
    id: 'ucm-intro'
  },
  {
    type: 'interactive',
    title: 'Constant Speed but Changing Velocity',
    content: '',
    component: UCMotionSlide2,
    id: 'ucm-velocity'
  },
  {
    type: 'interactive',
    title: 'Centripetal Acceleration: The Center-Seeking Change',
    content: '',
    component: UCMotionSlide3,
    id: 'ucm-acceleration'
  },
  {
    type: 'interactive',
    title: 'Real-World Examples of Circular Motion',
    content: '',
    component: UCMotionSlide4,
    id: 'ucm-examples'
  },
  {
    type: 'question',
    title: 'Uniform Circular Motion Assessment',
    content: React.createElement(() => <UCMotionAssessment />),
    persistResponse: true,
    component: UCMotionAssessment,
    id: 'ucm-assessment',
    questions: [
      {
        id: 'ucm-problem-1',
        questionText: 'Explain why a car moving at a constant speed of 50 km/h around a circular track is considered to be accelerating.',
        inputType: 'image',
        required: true
      },
      {
        id: 'ucm-problem-2',
        questionText: 'Draw a diagram of the Earth orbiting the Sun. At two different points in the orbit, draw and label the vectors for the Earth\'s instantaneous velocity and its centripetal acceleration.',
        inputType: 'image',
        required: true
      },
      {
        id: 'ucm-problem-3',
        questionText: 'When you swing a ball on a string in a circle, the string provides the centripetal force. What happens to the ball if the string suddenly breaks? Describe its path.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component
function UCMotionComponent() {
  return <div>This is a submodule component, not a page.</div>;
}

export default UCMotionComponent;