import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';

export const proofsWithTransformationsSlides: Slide[] = [
  {
    type: 'interactive', // Or 'video'
    title: 'Proofs with transformations',
    component: Slide1,
    id: 'proofs-with-transformations'
  },
  {
    type: 'interactive', // Or 'article'
    title: 'Transformation properties and proofs FAQ',
    component: Slide2,
    id: 'transformation-proofs-faq'
  }
];

function ProofsWithTransformationsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default ProofsWithTransformationsComponent;