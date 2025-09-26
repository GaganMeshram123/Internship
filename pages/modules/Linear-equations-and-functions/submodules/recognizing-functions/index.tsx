import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule (assuming they will be created)
import RecognizingFunctionsSlide1 from './Slide1';
import RecognizingFunctionsSlide2 from './Slide2';
import RecognizingFunctionsSlide3 from './Slide3';
import RecognizingFunctionsSlide4 from './Slide4';
import RecognizingFunctionsAssessment from './Slide5';

// Define and export the slide array for this submodule
export const recognizingFunctionsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The Core Rule of a Function',
    component: RecognizingFunctionsSlide1,
    id: 'the-function-rule-recap'
  },
  {
    type: 'interactive',
    title: 'Recognizing Functions from Tables',
    component: RecognizingFunctionsSlide2,
    id: 'functions-from-tables'
  },
  {
    type: 'interactive',
    title: 'Recognizing Functions from Ordered Pairs',
    component: RecognizingFunctionsSlide3,
    id: 'functions-from-ordered-pairs'
  },
  {
    type: 'interactive',
    title: 'Recognizing Functions from Mapping Diagrams',
    component: RecognizingFunctionsSlide4,
    id: 'functions-from-mapping-diagrams'
  },
  {
    type: 'question',
    title: 'Assessment: Recognizing Functions',
    component: RecognizingFunctionsAssessment,
    id: 'recognizing-functions-assessment',
    questions: [
      {
        id: 'recognize-from-points-q',
        questionText: 'Does the set of points {(1, 5), (2, 7), (1, 9)} represent a function? Why or why not?',
        inputType: 'text',
        required: true
      },
      {
        id: 'recognize-from-table-q',
        questionText: 'A table shows x-values {1, 2, 3} and y-values {10, 20, 30}. Does this table represent a function?',
        inputType: 'text',
        required: true
      },
      {
        id: 'recognize-from-mapping-q',
        questionText: 'A mapping diagram shows the input \'A\' pointing to both outputs \'X\' and \'Y\'. Is this a function?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component
function RecognizingFunctionsComponent() {
  return <div>This is a submodule data file, not a page.</div>;
}

export default RecognizingFunctionsComponent;