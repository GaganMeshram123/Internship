import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content based on new structure
import { introductionToGravitationSlides } from './submodules/introduction-to-gravitation/index';
import { newtonsLawOfGravitationSlides } from './submodules/newtons-law-of-gravitation/index';
import { gravitationAndSuperpositionSlides } from './submodules/shell-theorems/index';
import { gravitationNearEarthSurfaceSlides } from './submodules/gravitation-near-earth-surface/index';
import { gravitationInsideEarthSlides } from './submodules/gravitation-inside-earth/index';
import { gravitationalPotentialEnergySlides } from './submodules/gravitational-potential-energy/index';
import { keplersLawsOrbitalMechanicsSlides } from './submodules/keplers-laws-orbital-mechanics/index';

// Define the interface for submodules
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  thumbnail?: string;
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

// Define submodules with their slides based on the gravitation content
export const submodules: Submodule[] = [
  {
    id: 'introduction-to-gravitation',
    title: 'Introduction to Gravitation',
    description: 'Discover the cosmic reach of gravitational force from holding you to Earth to binding galaxies together across the universe',
    slides: introductionToGravitationSlides,
    estimatedTime: '25 min',
    difficulty: 'Beginner',
    topics: ['Cosmic Forces', 'Gravitational Reach', 'Black Holes', 'Universal Force']
  },
  {
    id: 'newtons-law-of-gravitation',
    title: 'Newton\'s Law of Gravitation',
    description: 'Master Newton\'s fundamental law describing gravitational attraction between masses and understand the gravitational constant',
    slides: newtonsLawOfGravitationSlides,
    estimatedTime: '30 min',
    difficulty: 'Intermediate',
    topics: ['Newton\'s Law', 'Gravitational Constant', 'Force Calculations', 'Third Law Force Pairs']
  },
  {
    id: 'shell-theorems',
    title: 'Shell Theorems',
    description: 'Shell Theorems are a powerful tool for calculating gravitational forces from complex objects',
    slides: gravitationAndSuperpositionSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Superposition Principle', 'Vector Addition', 'Multiple Particles', 'Net Forces']
  },
  {
    id: 'gravitation-near-earth-surface',
    title: 'Gravitation Near Earth\'s Surface',
    description: 'Understand gravitational acceleration, Earth\'s rotation effects, and the difference between weight and gravitational force',
    slides: gravitationNearEarthSurfaceSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Gravitational Acceleration', 'Earth Rotation', 'Weight vs Force', 'Tidal Effects']
  },
  {
    id: 'gravitation-inside-earth',
    title: 'Gravitation Inside Earth',
    description: 'Explore gravitational forces inside Earth using the shell theorem and discover how force varies with depth',
    slides: gravitationInsideEarthSlides,
    estimatedTime: '25 min',
    difficulty: 'Advanced',
    topics: ['Shell Theorem', 'Force Inside Earth', 'Pole-to-Pole Journey', 'Harmonic Motion']
  },
  // {
  //   id: 'gravitational-potential-energy',
  //   title: 'Gravitational Potential Energy',
  //   description: 'Master gravitational potential energy, escape velocity, and energy conservation in gravitational systems',
  //   slides: gravitationalPotentialEnergySlides,
  //   estimatedTime: '35 min',
  //   difficulty: 'Advanced',
  //   topics: ['Potential Energy', 'Escape Speed', 'Energy Conservation', 'Multi-particle Systems']
  // },
  // {
  //   id: 'keplers-laws-orbital-mechanics',
  //   title: 'Kepler\'s Laws and Orbital Mechanics',
  //   description: 'Discover the three laws that govern planetary motion and master the energy relationships in satellite orbits',
  //   slides: keplersLawsOrbitalMechanicsSlides,
  //   estimatedTime: '40 min',
  //   difficulty: 'Advanced',
  //   topics: ['Kepler\'s Laws', 'Elliptical Orbits', 'Angular Momentum', 'Orbital Energy', 'Satellite Mechanics']
  // }
];

function GravitationModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
    </div>
  );
}

export default GravitationModule; 