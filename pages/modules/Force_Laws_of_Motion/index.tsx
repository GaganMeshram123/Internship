import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content for the Force & Laws of Motion module
import { newtonsFirstLawSlides } from './submodules/newtons-first-law/index';
import { newtonsSecondLawSlides } from './submodules/newtons-second-law/index';
import { newtonsThirdLawSlides } from './submodules/newtons-third-law/index';
import { momentumForceSlides } from './submodules/momentum-and-force/index';
import { conservationMomentumSlides } from './submodules/conservation-of-momentum/index';

// Define the interface for submodules (can be shared from a common types file)
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

// Define the submodules for the "Force & Laws of Motion" module
export const submodules: Submodule[] = [
  {
    id: 'newtons-first-law',
    title: "Newton's First Law & Unbalanced Forces",
    description: "Discover the Law of Inertia. Understand why objects at rest stay at rest, and objects in motion stay in motion unless acted upon by an external force.",
    slides: newtonsFirstLawSlides,
    estimatedTime: '25 min',
    difficulty: 'Beginner',
    topics: ['Inertia', 'Force', 'Balanced Forces', 'Unbalanced Forces', 'Net Force']
  },
  {
    id: 'newtons-second-law',
    title: "Newton's Second Law of Motion",
    description: "Explore the relationship between force, mass, and acceleration. Learn how to use the cornerstone formula F=ma to calculate the motion of objects.",
    slides: newtonsSecondLawSlides,
    estimatedTime: '30 min',
    difficulty: 'Beginner',
    topics: ['Acceleration', 'Mass', 'F=ma', 'Net Force', 'Newtons (N)']
  },
  {
    id: 'newtons-third-law',
    title: "Newton's Third Law of Motion",
    description: "For every action, there is an equal and opposite reaction. Unpack this famous law and see how it applies to everything from rockets to walking.",
    slides: newtonsThirdLawSlides,
    estimatedTime: '25 min',
    difficulty: 'Beginner',
    topics: ['Action-Reaction', 'Force Pairs', 'Interaction', 'Propulsion']
  },
  {
    id: 'momentum-and-force',
    title: "Momentum and Force",
    description: "Define momentum as 'mass in motion' and explore its relationship with force. Understand the concept of impulse and how it describes the change in momentum.",
    slides: momentumForceSlides,
    estimatedTime: '35 min',
    difficulty: 'Intermediate',
    topics: ['Momentum', 'Impulse', 'Velocity', 'Rate of Change', 'Collision']
  },
  {
    id: 'conservation-of-momentum',
    title: "Conservation of Momentum",
    description: "Learn one of the most fundamental principles in physics. Understand how the total momentum in an isolated system is always conserved before and after interactions.",
    slides: conservationMomentumSlides,
    estimatedTime: '40 min',
    difficulty: 'Intermediate',
    topics: ['Conservation Law', 'Collisions', 'Isolated System', 'Elastic Collision', 'Inelastic Collision', 'Recoil']
  }
];

function ForceAndLawsModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* The main component shell for the Force & Laws of Motion module */}
    </div>
  );
}

export default ForceAndLawsModule;