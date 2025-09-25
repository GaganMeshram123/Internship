import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule
import SlopeSlide1 from './Slide1';
import SlopeSlide2 from './Slide2';
import SlopeSlide3 from './Slide3';
import SlopeSlide4 from './Slide4';
import SlopeAssessment from './Slide5'; // Assessment is the 5th slide

// Define and export the slide array for this submodule
export const slopeSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is Slope?',
    content: 'Introducing slope as a measure of steepness and the concept of "rise over run".',
    component: SlopeSlide1,
    id: 'what-is-slope'
  },
  {
    type: 'interactive',
    title: 'Finding Slope from a Graph',
    content: 'How to visually count the rise (vertical change) and run (horizontal change) between two points on a line.',
    component: SlopeSlide2,
    id: 'finding-slope-from-graph'
  },
  {
    type: 'interactive',
    title: 'The Slope Formula',
    content: 'Using the formula m = (y₂ - y₁) / (x₂ - x₁) to calculate slope given the coordinates of two points.',
    component: SlopeSlide3,
    id: 'slope-formula'
  },
  {
    type: 'interactive',
    title: 'Special Cases: Horizontal and Vertical Lines',
    content: 'Understanding the slope of horizontal lines (slope = 0) and vertical lines (slope is undefined).',
    component: SlopeSlide4,
    id: 'special-slope-cases'
  },
  {
    type: 'question',
    title: 'Slope Assessment',
    content: React.createElement(() => <SlopeAssessment />),
    persistResponse: true,
    component: SlopeAssessment,
    id: 'slope-assessment',
    questions: [
      {
        id: 'slope-from-two-points',
        questionText: 'Find the slope of the line that passes through the points (1, 2) and (3, 10).',
        inputType: 'text',
        required: true
      },
      {
        id: 'slope-from-rise-run',
        questionText: 'A line on a graph rises 9 units for every 3 units it runs to the right. What is the slope of the line?',
        inputType: 'text',
        required: true
      },
      {
        id: 'horizontal-line-slope',
        questionText: 'What is the slope of any horizontal line, such as y = 4?',
        inputType: 'text',
        required: true
      },
      {
        id: 'vertical-line-slope',
        questionText: 'What is the slope of any vertical line, such as x = -2?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js/module requirements
function SlopeComponent() {
  return (
    <div>
      This is a submodule data file, not a page.
    </div>
  );
}

export default SlopeComponent;