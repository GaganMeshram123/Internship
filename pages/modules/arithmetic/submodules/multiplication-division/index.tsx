import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import only the slides that belong in this submodule (Units 6-10)
import PlaceValueSlide from './Slide6';
import BigNumberOpsSlide from './Slide7';
import MultiDigitMultiplySlide from './Slide8';
import DivideWithRemaindersSlide from './Slide9';
import MultiDigitDivideSlide from './Slide10'; // Assuming this is the 5th slide in this submodule

// This array defines the order of the slides in this submodule.
export const multiplicationDivisionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Understanding Place Value',
    component: PlaceValueSlide,
    id: 'arithmetic-place-value'
  },
  {
    type: 'interactive',
    title: 'Add and Subtract Bigger Numbers',
    component: BigNumberOpsSlide,
    id: 'arithmetic-big-ops'
  },
  {
    type: 'interactive',
    title: 'Multiply 1- and 2-Digit Numbers',
    component: MultiDigitMultiplySlide,
    id: 'arithmetic-multi-digit-multiply'
  },
  {
    type: 'interactive',
    title: 'Divide with Remainders',
    component: DivideWithRemaindersSlide,
    id: 'arithmetic-divide-remainders'
  },
  {
    type: 'interactive',
    title: 'Multiply and Divide Multi-Digit Numbers',
    component: MultiDigitDivideSlide,
    id: 'arithmetic-multi-digit-divide'
  }
];

function MultiplicationDivisionSubmodule() {
    return (
      <div>
        This is the <b>Multiplication & Division</b> submodule.
      </div>
    );
  }
  
export default MultiplicationDivisionSubmodule;