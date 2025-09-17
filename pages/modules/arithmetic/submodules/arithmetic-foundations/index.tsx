import React from 'react';
import { Slide } from '../../../common-components/concept';

// You will create these component files for each slide in this folder
import CountingSlide from './Slide1';  
import AdditionSlide from './Slide2';  
import SubtractionSlide from './Slide3'; /*
import MultiplicationSlide from './Slide4';
import DivisionSlide from './Slide5';   */

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
   /*{
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
  }  */
];

function ArithmeticFoundationsSubmodule() {
    return (
      <div>
        This is the <b>Arithmetic Foundations</b> submodule.
      </div>
    );
  }
  
export default ArithmeticFoundationsSubmodule;