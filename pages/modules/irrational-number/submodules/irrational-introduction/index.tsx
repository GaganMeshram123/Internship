import React from 'react';
import { Slide } from '../../../common-components/concept';
import IrrationalIntroSlide1 from './Slide1';
import IrrationalIntroSlide2 from './Slide2';
import IrrationalExamplesSlide from './Slide3';

export const irrationalIntroductionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What are Irrational Numbers?',
    content: '',
    component: IrrationalIntroSlide1,
    id: 'irrational-definition'
  },
  {
    type: 'interactive',
    title: 'Properties of Irrational Numbers',
    content: '',
    component: IrrationalIntroSlide2,
    id: 'irrational-properties'
  },
  {
    type: 'interactive',
    title: 'Examples of Irrational Numbers',
    content: '',
    component: IrrationalExamplesSlide,
    id: 'irrational-examples'
  }
];

function IrrationalIntroductionSubmodule() {
  return (
    <div>
      This is the <b>Introduction</b> submodule for Irrational Numbers.
    </div>
  );
}

export default IrrationalIntroductionSubmodule;
