import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule (assuming they will be created)
import ConstructingLinearModelsSlide1 from './Slide1';
import ConstructingLinearModelsSlide2 from './Slide2';
import ConstructingLinearModelsSlide3 from './Slide3';
import ConstructingLinearModelsSlide4 from './Slide4';
import ConstructingLinearModelsAssessment from './Slide5';

// Define and export the slide array for this submodule
export const constructingLinearModelsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'From Words to Equations',
    component: ConstructingLinearModelsSlide1,
    id: 'words-to-equations'
  },
  {
    type: 'interactive',
    title: 'Identifying Variables (x and y)',
    component: ConstructingLinearModelsSlide2,
    id: 'identifying-variables'
  },
  {
    type: 'interactive',
    title: 'Finding the Rate of Change (m)',
    component: ConstructingLinearModelsSlide3,
    id: 'finding-m-from-problem'
  },
  {
    type: 'interactive',
    title: 'Finding the Initial Value (b)',
    component: ConstructingLinearModelsSlide4,
    id: 'finding-b-from-problem'
  },
  {
    type: 'question',
    title: 'Assessment: Constructing Models',
    component: ConstructingLinearModelsAssessment,
    id: 'constructing-models-assessment',
    questions: [
      {
        id: 'construct-equation-q',
        questionText: 'A taxi charges a ₹25 starting fee and ₹18 per kilometer. Write the linear equation that models the total cost (y) for (x) kilometers.',
        inputType: 'text',
        required: true
      },
      {
        id: 'find-b-from-word-problem-q',
        questionText: 'You have ₹5000 in your bank account and you deposit ₹400 every week. What is the initial value (b) in this scenario?',
        inputType: 'text',
        required: true
      },
      {
        id: 'find-m-from-word-problem-q',
        questionText: 'In the bank account scenario from the previous question, what is the rate of change (m)?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component
function ConstructingLinearModelsComponent() {
  return <div>This is a submodule data file, not a page.</div>;
}

export default ConstructingLinearModelsComponent;