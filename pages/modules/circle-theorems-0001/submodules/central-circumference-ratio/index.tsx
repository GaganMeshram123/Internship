import React from 'react';
import { Slide } from '../../../common-components/concept';
import CentralCircumferenceRatioSlide1 from './Slide1';
import CentralCircumferenceRatioSlide2 from './Slide2';
import CentralCircumferenceRatioSlide3 from './Slide3';

// Define slide array
export const centralCircumferenceRatioSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Central-Circumference Ratio',
    content: '',
    component: CentralCircumferenceRatioSlide1,
    id: 'ct-central-circumference-ratio-theorem'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: CentralCircumferenceRatioSlide2,
    id: 'ct-central-circumference-ratio-proof'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <CentralCircumferenceRatioSlide3 />),
    persistResponse: true,
    component: CentralCircumferenceRatioSlide3,
    id: 'ct-central-circumference-ratio-assessment',
    questions: [
      {
        id: 'multiple-inscribed-angles',
        questionText: 'Points C and D are on opposite sides of chord AB. The central angle ∠AOB = 80°. Tasks: (a) Find ∠ACB and ∠ADB using the central-circumference ratio theorem. (b) If a point P moves along the major arc from A to B, describe how ∠APB changes.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function CentralCircumferenceRatioComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default CentralCircumferenceRatioComponent; 
 