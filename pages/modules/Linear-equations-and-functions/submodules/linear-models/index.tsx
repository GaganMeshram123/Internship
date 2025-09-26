import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule (assuming they will be created)
import LinearModelsSlide1 from './Slide1';
import LinearModelsSlide2 from './Slide2';
import LinearModelsSlide3 from './Slide3';
import LinearModelsSlide4 from './Slide4';
import LinearModelsAssessment from './Slide5';

// Define and export the slide array for this submodule
export const linearModelsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What are Linear Models?',
    component: LinearModelsSlide1,
    id: 'what-are-linear-models'
  },
  {
    type: 'interactive',
    title: 'Scatter Plots and Trends',
    component: LinearModelsSlide2,
    id: 'scatter-plots-and-trends'
  },
  {
    type: 'interactive',
    title: 'The Line of Best Fit',
    component: LinearModelsSlide3,
    id: 'line-of-best-fit'
  },
  {
    type: 'interactive',
    title: 'Making Predictions',
    component: LinearModelsSlide4,
    id: 'making-predictions'
  },
  {
    type: 'question',
    title: 'Assessment: Linear Models',
    component: LinearModelsAssessment,
    id: 'linear-models-assessment',
    questions: [
      {
        id: 'line-of-best-fit-q',
        questionText: 'What does a "line of best fit" attempt to do on a scatter plot?',
        inputType: 'text',
        required: true
      },
      {
        id: 'interpret-slope-q',
        questionText: 'The slope of a linear model for a plant\'s height is m = 2 (cm/day). What does this slope represent in the real world?',
        inputType: 'text',
        required: true
      },
      {
        id: 'interpret-intercept-q',
        questionText: 'The y-intercept of a model for a phone\'s battery life is b = 100 (percent). What does this represent?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component
function LinearModelsComponent() {
  return <div>This is a submodule data file, not a page.</div>;
}

export default LinearModelsComponent;