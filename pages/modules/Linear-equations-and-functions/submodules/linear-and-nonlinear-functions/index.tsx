import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule (assuming they will be created)
import LinearAndNonlinearFunctionsSlide1 from './Slide1';
import LinearAndNonlinearFunctionsSlide2 from './Slide2';
import LinearAndNonlinearFunctionsSlide3 from './Slide3';
import LinearAndNonlinearFunctionsSlide4 from './Slide4';
import LinearAndNonlinearFunctionsAssessment from './Slide5';

// Define and export the slide array for this submodule
export const linearAndNonlinearFunctionsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What Makes a Function Linear?',
    component: LinearAndNonlinearFunctionsSlide1,
    id: 'what-is-linear'
  },
  {
    type: 'interactive',
    title: 'Identifying from a Graph',
    component: LinearAndNonlinearFunctionsSlide2,
    id: 'linear-vs-nonlinear-graphs'
  },
  {
    type: 'interactive',
    title: 'Identifying from an Equation',
    component: LinearAndNonlinearFunctionsSlide3,
    id: 'linear-vs-nonlinear-equations'
  },
  {
    type: 'interactive',
    title: 'Identifying from a Table',
    component: LinearAndNonlinearFunctionsSlide4,
    id: 'linear-vs-nonlinear-tables'
  },
  {
    type: 'question',
    title: 'Assessment: Linear vs. Nonlinear',
    component: LinearAndNonlinearFunctionsAssessment,
    id: 'linear-vs-nonlinear-assessment',
    questions: [
      {
        id: 'identify-from-graph-q',
        questionText: 'The graph of a function is a curve, not a straight line. Is the function linear or nonlinear?',
        inputType: 'text',
        required: true
      },
      {
        id: 'identify-from-equation-q',
        questionText: 'Is the equation y = x² + 3 linear or nonlinear?',
        inputType: 'text',
        required: true
      },
      {
        id: 'identify-from-table-q',
        questionText: 'A table shows that as x increases by 1, y consistently increases by 5. Does this table represent a linear or nonlinear function?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component
function LinearAndNonlinearFunctionsComponent() {
  return <div>This is a submodule data file, not a page.</div>;
}

export default LinearAndNonlinearFunctionsComponent;