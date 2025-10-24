import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';
import Slide7 from './Slide7';

export const translationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Translating Points',
    component: Slide1,
    id: 'translating-points'
  },
  {
    type: 'interactive',
    title: 'Determining Translations',
    component: Slide2,
    id: 'determining-translations-1'
  },
  {
    type: 'interactive',
    title: 'Determining Translations',
    component: Slide3,
    id: 'determining-translations-2'
  },
  {
    type: 'interactive',
    title: 'Translating Shapes',
    component: Slide4,
    id: 'translating-shapes-1'
  },
  {
    type: 'interactive',
    title: 'Translating Shapes',
    component: Slide5,
    id: 'translating-shapes-2'
  },
  {
    type: 'interactive',
    title: 'Translation Challenge Problem',
    component: Slide6,
    id: 'translation-challenge'
  },
  {
    type: 'interactive',
    title: 'Properties of Translations',
    component: Slide7,
    id: 'properties-of-translations'
  }
];

function TranslationsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default TranslationsComponent;