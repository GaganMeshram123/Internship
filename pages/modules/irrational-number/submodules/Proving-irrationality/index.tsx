import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import all slide components for this submodule
import ProvingIrrationalitySlide1 from './Slide1';
import ProvingIrrationalitySlide2 from './Slide2';
import ProvingIrrationalitySlide3 from './Slide3';
import ProvingIrrationalitySlide4 from './Slide4';
import ProvingIrrationalitySlide5 from './Slide5';

export const provingIrrationalitySlides: Slide[] = [
  {
    id: 'irrationality-proof-sqrt2',
    title: 'Proof by Contradiction: √2',
    component: ProvingIrrationalitySlide1,
    type: 'learning',
    content: null, // Content is defined within the component itself
  },
  {
    id: 'irrationality-visualize-proof',
    title: 'Visualizing the Proof',
    component: ProvingIrrationalitySlide2,
    type: 'learning',
    content: null,
  },
  {
    id: 'irrationality-proof-sqrt3',
    title: 'Proving Other Irrationals: √3',
    component: ProvingIrrationalitySlide3,
    type: 'learning',
    content: null,
  },
  {
    id: 'irrationality-sum-proof',
    title: 'Proving Sums are Irrational',
    component: ProvingIrrationalitySlide4,
    type: 'learning',
    content: null,
  },
  {
    id: 'irrationality-challenge-quiz',
    title: 'Challenge Quiz',
    component: ProvingIrrationalitySlide5,
    type: 'judging',
    content: null,
  },
];

function ProvingIrrationalitySubmodule() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <h1>Proving Irrationality</h1>
      <p>This is the default component for the Proving Irrationality submodule.</p>
    </div>
  );
}

export default ProvingIrrationalitySubmodule;

 