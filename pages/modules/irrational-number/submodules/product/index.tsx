import React from 'react';
import { Slide } from '../../../common-components/concept';
import IrrationalProductIntroSlide from './Slide1';
import IrrationalProductExamplesSlide from './Slide2';
import IrrationalProductPropertiesSlide from './Slide3';
import SlideFour from './Slide4';
import SlideFive from './Slide5';

export const irrationalProductSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Product of Irrational Numbers',
    content: '',
    component: IrrationalProductIntroSlide,
    id: 'irrational-product-intro'
  },
  {
    type: 'interactive',
    title: 'Examples of Products',
    content: '',
    component: IrrationalProductExamplesSlide,
    id: 'irrational-product-examples'
  },
  {
    type: 'interactive',
    title: 'Properties of Product',
    content: '',
    component: IrrationalProductPropertiesSlide,
    id: 'irrational-product-properties'
  },
  { // Add this new slide object for SlideFour
    type: 'interactive',
    title: 'When Irrationals Multiply: Rational or Irrational?',
    content: '',
    component: SlideFour,
    id: 'slide-four-id'
  },
  { // Add this new slide object for SlideFive
    type: 'interactive',
    title: 'Division of Irrational Numbers',
    content: '',
    component: SlideFive,
    id: 'slide-five-id'
  }
];

function IrrationalProductSubmodule() {
  return (
    <div>
      This is the <b>Product</b> submodule for Irrational Numbers.
    </div>
  );
}

export default IrrationalProductSubmodule;