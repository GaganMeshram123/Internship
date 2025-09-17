import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import only the slides that belong in this submodule
import UnderstandFractionsSlide from './Slide11';
import AddSubtractFractionsSlide from './Slide12';
import MultiplyFractionsSlide from './Slide13';
import DecimalsSlide from './Slide14';
import AddSubtractDecimalsSlide from './Slide15';

// This array defines the order of the slides in this submodule.
export const fractionsAndDecimalsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Understand Fractions',
    component: UnderstandFractionsSlide,
    id: 'arithmetic-understand-fractions'
  },
  {
    type: 'interactive',
    title: 'Add and Subtract Fractions',
    component: AddSubtractFractionsSlide,
    id: 'arithmetic-add-subtract-fractions'
  },
  {
    type: 'interactive',
    title: 'Multiply Fractions',
    component: MultiplyFractionsSlide,
    id: 'arithmetic-multiply-fractions'
  },
  {
    type: 'interactive',
    title: 'All About Decimals',
    component: DecimalsSlide,
    id: 'arithmetic-decimals'
  },
  {
    type: 'interactive',
    title: 'Add and Subtract Decimals',
    component: AddSubtractDecimalsSlide,
    id: 'arithmetic-add-subtract-decimals'
  }
];

function FractionsAndDecimalsSubmodule() {
    return (
      <div>
        This is the <b>Fractions & Decimals</b> submodule.
      </div>
    );
  }
  
export default FractionsAndDecimalsSubmodule;