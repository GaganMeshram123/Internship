import React from 'react';
import { Slide } from '../../../common-components/concept';

// You will create these component files for each slide in this folder
import CountingSlide from './Slide1'; 
import AdditionSlide from './Slide2'; 
import SubtractionSlide from './Slide3'; 
import MultiplicationSlide from './Slide4';
import DivisionSlide from './Slide5'; 
// NEW: Import for the new slide
/* import PlaceValueSlide from './Slide6';
import BigNumberOpsSlide from './Slide7';
import MultiDigitMultiplySlide from './Slide8';
import DivideWithRemaindersSlide from './Slide9';
import UnderstandFractionsSlide from './Slide10';
import AddSubtractFractionsSlide from './Slide11';
import MultiplyFractionsSlide from './Slide12';
import DecimalsSlide from './Slide13';
import AddSubtractDecimalsSlide from './Slide14';
import WordProblemsSlide from './Slide15';

 */



// This array defines the order of the slides in this submodule.
export const arithmeticFoundationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Getting Started: What Are Numbers?',
    component: CountingSlide,
    id: 'arithmetic-counting'
  },
  {
    type: 'interactive',
    title: 'Fun with Addition: Putting Things Together',
    component: AdditionSlide,
    id: 'arithmetic-addition'
  },
  {
    type: 'interactive',
    title: 'Super Subtraction: Taking Things Away',
    component: SubtractionSlide,
    id: 'arithmetic-subtraction'
  },
  {
    type: 'interactive',
    title: 'Amazing Multiplication: Adding in Groups',
    component: MultiplicationSlide,
    id: 'arithmetic-multiplication'
  },
  {
    type: 'interactive',
    title: 'Dazzling Division: Sharing Fairly',
    component: DivisionSlide,
    id: 'arithmetic-division'
  }
  // --- NEW SLIDE ADDED BELOW ---
  /* {
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
  },
  {
    type: 'interactive',
    title: 'Putting It All Together',
    component: WordProblemsSlide,
    id: 'arithmetic-word-problems'
  } */
];

function ArithmeticFoundationsSubmodule() {
    return (
      <div>
        This is the <b>Arithmetic Foundations</b> submodule.
      </div>
    );
  }
  
export default ArithmeticFoundationsSubmodule;