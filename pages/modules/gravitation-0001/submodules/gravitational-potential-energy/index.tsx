import React from 'react';
import { Slide } from '../../../common-components/concept';
import PotentialEnergySlide1 from './Slide1';
import PotentialEnergySlide2 from './Slide2';
import PotentialEnergySlide3 from './Slide3';
import PotentialEnergySlide4 from './Slide4';

export const gravitationalPotentialEnergySlides: Slide[] = [
  { type: 'interactive', title: 'Gravitational Potential Energy Fundamentals', content: '', component: PotentialEnergySlide1, id: 'potential-energy-fundamentals' },
  { type: 'interactive', title: 'Multiple Particle Systems and Path Independence', content: '', component: PotentialEnergySlide2, id: 'multiple-particles-path-independence' },
  { type: 'interactive', title: 'Escape Speed and Energy Conservation', content: '', component: PotentialEnergySlide3, id: 'escape-speed-energy-conservation' },
  { type: 'interactive', title: 'Real-World Applications: Asteroids and Spacecraft', content: '', component: PotentialEnergySlide4, id: 'real-world-applications' }
];

function GravitationalPotentialEnergyComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default GravitationalPotentialEnergyComponent; 