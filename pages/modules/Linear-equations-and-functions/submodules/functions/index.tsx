import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule (assuming they will be created)
import FunctionsSlide1 from './Slide1';
import FunctionsSlide2 from './Slide2';
import FunctionsSlide3 from './Slide3';
import FunctionsSlide4 from './Slide4';
import FunctionsAssessment from './Slide5';

// Define and export the slide array for this submodule
export const functionsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is a Function?',
    component: FunctionsSlide1,
    id: 'what-is-a-function'
  },
  {
    type: 'interactive',
    title: 'Inputs and Outputs',
    component: FunctionsSlide2,
    id: 'inputs-and-outputs'
  },
  {
    type: 'interactive',
    title: 'Function Notation: f(x)',
    component: FunctionsSlide3,
    id: 'function-notation'
  },
  {
    type: 'interactive',
    title: 'The Vertical Line Test',
    component: FunctionsSlide4,
    id: 'vertical-line-test'
  },
  {
    type: 'question',
    title: 'Assessment: Introduction to Functions',
    component: FunctionsAssessment,
    id: 'functions-assessment',
    questions: [
      {
        id: 'function-rule',
        questionText: 'What is the main rule for a relationship to be a function? (Hint: It relates to the inputs).',
        inputType: 'text',
        required: true
      },
      {
        id: 'evaluate-function',
        questionText: 'If f(x) = 3x + 2, what is the value of f(4)?',
        inputType: 'text',
        required: true
      },
      {
        id: 'vertical-line-test-q',
        questionText: 'Does a circle drawn on a graph represent a function? Explain why or why not, using the Vertical Line Test.',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component
function FunctionsComponent() {
  return <div>This is a submodule data file, not a page.</div>;
}

export default FunctionsComponent;