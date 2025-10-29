import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
import { introductionSlides } from './submodules/introduction/index';
import { typesOfForcesSlides } from './submodules/types-of-forces/index';
// --- NEW ---
// 1. Import the slides for your two new submodules
import { measurementOfForcesSlides } from './submodules/measurement-of-forces/index';
import { forcesOfFrictionSlides } from './submodules/forces-of-friction/index';


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

// Define submodules with their slides
export const submodules: Submodule[] = [
  {
    // --- ITEM 1 (Original) ---
    id: 'introduction',
    title: 'Introduction to Force',
    description: 'Discover the history of force through great scientists like Aristotle, Galileo, and Newton. Learn what force is and see examples of forces in everyday life.',
    slides: introductionSlides,
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    topics: ['Force History', 'Aristotle', 'Galileo', 'Newton', 'Push and Pull', 'Motion', 'Friction']
  },
  {
    // --- ITEM 2 (Original) ---
    id: 'types-of-forces',
    title: 'Types of Forces',
    description: 'Learn about contact and non-contact forces. Explore muscular and frictional forces that require touch, and gravitational, magnetic, and electrostatic forces that act at a distance.',
    slides: typesOfForcesSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Contact Forces', 'Non-Contact Forces', 'Muscular Force', 'Friction', 'Gravity', 'Magnetism', 'Electrostatic']
  },
  // --- NEW ---
  // 3. Add the 'measurement-of-forces' submodule
  {
    id: 'measurement-of-forces',
    title: 'Measurement of Force',
    description: 'Learn how to measure force using a spring balance. Understand the units of force, such as the newton (N) and kilogram-force (kgf), and their relationship.',
    slides: measurementOfForcesSlides,
    estimatedTime: '10 min',
    difficulty: 'Beginner',
    topics: ['Spring Balance', 'Units of Force', 'Newton (N)', 'Kilogram-force (kgf)', 'Measurement']
  },
  // --- NEW ---
  // 4. Add the 'forces-of-friction' submodule
  {
    id: 'forces-of-friction',
    title: 'Forces of Friction',
    description: 'A deep dive into friction. Learn its types (static, sliding, rolling), factors affecting it, and its advantages and disadvantages.',
    slides: forcesOfFrictionSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Friction', 'Static Friction', 'Sliding Friction', 'Rolling Friction', 'Advantages', 'Disadvantages']
  }
];

function PhysicsForceModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Your module UI will go here */}
    </div>
  );
}

export default PhysicsForceModule;