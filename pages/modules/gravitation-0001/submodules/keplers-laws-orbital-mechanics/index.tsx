import React from 'react';
import { Slide } from '../../../common-components/concept';
import KeplersLawsSlide1 from './Slide1';
import KeplersLawsSlide2 from './Slide2';
import KeplersLawsSlide3 from './Slide3';
import KeplersLawsSlide4 from './Slide4';
import KeplersLawsSlide5 from './Slide5';
import KeplersLawsSlide6 from './Slide6';

export const keplersLawsOrbitalMechanicsSlides: Slide[] = [
  { type: 'interactive', title: 'Kepler\'s Laws: Historical Discovery', content: '', component: KeplersLawsSlide1, id: 'keplers-laws-historical-discovery' },
  { type: 'interactive', title: 'Law of Orbits: Elliptical Paths', content: '', component: KeplersLawsSlide2, id: 'law-of-orbits-elliptical-paths' },
  { type: 'interactive', title: 'Law of Areas: Angular Momentum Conservation', content: '', component: KeplersLawsSlide3, id: 'law-of-areas-angular-momentum' },
  { type: 'interactive', title: 'Law of Periods: The T²∝a³ Relationship', content: '', component: KeplersLawsSlide4, id: 'law-of-periods-relationship' },
  { type: 'interactive', title: 'Satellite Orbital Energy', content: '', component: KeplersLawsSlide5, id: 'satellite-orbital-energy' },
  { type: 'interactive', title: 'Orbital Mechanics Applications', content: '', component: KeplersLawsSlide6, id: 'orbital-mechanics-applications' }
];

function KeplersLawsOrbitalMechanicsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default KeplersLawsOrbitalMechanicsComponent; 