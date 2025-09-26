import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule (assuming they will be created)
import ComparingLinearFunctionsSlide1 from './Slide1';
import ComparingLinearFunctionsSlide2 from './Slide2';
import ComparingLinearFunctionsSlide3 from './Slide3';
import ComparingLinearFunctionsSlide4 from './Slide4';
import ComparingLinearFunctionsAssessment from './Slide5';

// Define and export the slide array for this submodule
export const comparingLinearFunctionsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Functions in Different Forms',
    component: ComparingLinearFunctionsSlide1,
    id: 'functions-in-different-forms'
  },
  {
    type: 'interactive',
    title: 'Comparing Slopes (Rates of Change)',
    component: ComparingLinearFunctionsSlide2,
    id: 'comparing-slopes'
  },
  {
    type: 'interactive',
    title: 'Comparing y-intercepts (Initial Values)',
    component: ComparingLinearFunctionsSlide3,
    id: 'comparing-y-intercepts'
  },
  {
    type: 'interactive',
    title: 'Real-World Comparisons',
    component: ComparingLinearFunctionsSlide4,
    id: 'real-world-comparisons'
  },
  {
    type: 'question',
    title: 'Assessment: Comparing Functions',
    component: ComparingLinearFunctionsAssessment,
    id: 'comparing-functions-assessment',
    questions: [
      {
        id: 'compare-initial-value-q',
        questionText: 'Mobile Plan A is modeled by y = 50x + 199. Plan B has a starting fee of ₹249. Which plan has a higher starting fee?',
        inputType: 'text',
        required: true
      },
      {
        id: 'compare-graph-slope-q',
        questionText: 'The graph for Car A\'s journey is steeper than the graph for Car B\'s journey. What does this tell you about their speeds?',
        inputType: 'text',
        required: true
      },
      {
        id: 'compare-equation-table-q',
        questionText: 'Function 1 is y = 3x + 5. Function 2 is a table with points (0, 6), (1, 8), (2, 10). Which function has a greater rate of change (slope)?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component
function ComparingLinearFunctionsComponent() {
  return <div>This is a submodule data file, not a page.</div>;
}

export default ComparingLinearFunctionsComponent;