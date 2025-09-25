import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule
import GraphingProportionalSlide1 from './Slide1';
import GraphingProportionalSlide2 from './Slide2';
import GraphingProportionalSlide3 from './Slide3';
import GraphingProportionalSlide4 from './Slide4';
import GraphingProportionalAssessment from './Slide5'; // Assessment is the 5th slide

// Define and export the slide array for this submodule
export const graphingProportionalSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is a Proportional Relationship?',
    content: 'Introduction to y=kx and the constant of proportionality.',
    component: GraphingProportionalSlide1,
    id: 'what-is-proportional'
  },
  {
    type: 'interactive',
    title: 'Graphing from a Table of Values',
    content: 'How to create a table of (x, y) pairs and plot them on a graph.',
    component: GraphingProportionalSlide2,
    id: 'graphing-from-table'
  },
  {
    type: 'interactive',
    title: 'Characteristics of a Proportional Graph',
    content: 'Understanding the two key features: a straight line and passing through the origin (0,0).',
    component: GraphingProportionalSlide3,
    id: 'graph-characteristics'
  },
  {
    type: 'interactive',
    title: 'Interpreting the Graph',
    content: 'Learning what a point (x, y) on the line means and how to find the unit rate.',
    component: GraphingProportionalSlide4,
    id: 'interpreting-the-graph'
  },
  {
    type: 'question',
    title: 'Proportional Relationships Assessment',
    content: React.createElement(() => <GraphingProportionalAssessment />),
    persistResponse: true,
    component: GraphingProportionalAssessment,
    id: 'graphing-proportional-assessment',
    questions: [
      {
        id: 'identify-proportional-equation',
        questionText: 'Which of the following equations represents a proportional relationship? a) y = 5x + 2, b) y = x/3, c) y = x² + 1',
        inputType: 'text', // Can be 'text', 'multiple-choice', etc.
        required: true
      },
      {
        id: 'identify-proportional-graph',
        questionText: 'A graph of a proportional relationship must always pass through which important point?',
        inputType: 'text',
        required: true
      },
      {
        id: 'calculate-unit-rate',
        questionText: 'A recipe calls for 2 cups of sugar for every 4 cups of flour. What is the constant of proportionality (k) for sugar in relation to flour? Write the equation in the form y=kx, where y is sugar and x is flour.',
        inputType: 'text',
        required: true
      },
      {
        id: 'interpret-point-on-graph',
        questionText: 'The graph for buying movie tickets shows the point (3, 36), where x is the number of tickets and y is the total cost in dollars. What does this point represent?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js/module requirements
function GraphingProportionalComponent() {
  return (
    <div>
      This is a submodule data file, not a page.
    </div>
  );
}

export default GraphingProportionalComponent;