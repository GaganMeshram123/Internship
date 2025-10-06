import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content for the Motion module
import { distanceDisplacementSlides } from './submodules/distance-displacement/index';
import { avgSpeedVelocitySlides } from './submodules/average-speed-velocity/index';
import { accelerationSlides } from './submodules/acceleration/index';
import { positionTimeGraphsSlides } from './submodules/position-time-graphs/index';
import { velocityTimeGraphsSlides } from './submodules/velocity-time-graphs/index';
import { derivingEquationsSlides } from './submodules/deriving-equations-motion/index';
import { problemSolvingSlides } from './submodules/problem-solving-kinematics/index';
import { uniformCircularMotionSlides } from './submodules/uniform-circular-motion/index';

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

// Define the submodules for the "Motion" module
export const submodules: Submodule[] = [
  {
    id: 'distance-displacement',
    title: 'Distance and Displacement',
    description: 'Learn the fundamental difference between distance (a scalar) and displacement (a vector). Understand how an object\'s path affects these two quantities.',
    slides: distanceDisplacementSlides,
    estimatedTime: '25 min',
    difficulty: 'Beginner',
    topics: ['Scalar', 'Vector', 'Path Length', 'Position', 'Magnitude']
  },
  {
    id: 'average-speed-velocity',
    title: 'Average Speed and Average Velocity',
    description: 'Explore how to calculate the rate of motion. Differentiate between speed, which depends on total distance, and velocity, which depends on displacement.',
    slides: avgSpeedVelocitySlides,
    estimatedTime: '30 min',
    difficulty: 'Beginner',
    topics: ['Rate of Motion', 'Speed Formula', 'Velocity Formula', 'Scalar vs Vector Rate']
  },
  {
    id: 'acceleration',
    title: 'Acceleration',
    description: 'Understand acceleration as the rate of change of velocity. Explore positive, negative (deceleration), and zero acceleration.',
    slides: accelerationSlides,
    estimatedTime: '25 min',
    difficulty: 'Beginner',
    topics: ['Change in Velocity', 'Acceleration Formula', 'Uniform Acceleration', 'Deceleration']
  },
  {
    id: 'position-time-graphs',
    title: 'Position-Time Graphs',
    description: 'Learn to interpret position-time graphs to describe an object\'s motion, including its position, direction, and velocity.',
    slides: positionTimeGraphsSlides,
    estimatedTime: '35 min',
    difficulty: 'Intermediate',
    topics: ['Graphical Analysis', 'Slope', 'Constant Velocity', 'Stationary Object', 'Interpreting Graphs']
  },
  {
    id: 'velocity-time-graphs',
    title: 'Velocity-Time Graphs',
    description: 'Analyze velocity-time graphs to determine velocity, acceleration (slope), and displacement (area under the curve).',
    slides: velocityTimeGraphsSlides,
    estimatedTime: '40 min',
    difficulty: 'Intermediate',
    topics: ['Graphical Representation', 'Slope as Acceleration', 'Area as Displacement', 'Uniform Motion']
  },
  {
    id: 'deriving-equations-motion',
    title: 'Deriving Equations of Motion',
    description: 'Understand how the three fundamental equations of motion are derived graphically from velocity-time graphs for uniformly accelerated motion.',
    slides: derivingEquationsSlides,
    estimatedTime: '35 min',
    difficulty: 'Advanced',
    topics: ['Kinematic Equations', 'Graphical Derivation', 'v = u + at', 's = ut + ½at²', 'v² = u² + 2as']
  },
  {
    id: 'problem-solving-kinematics',
    title: 'Problem Solving with Kinematic Equations',
    description: 'Apply the equations of motion to solve real-world numerical problems involving objects moving with constant acceleration.',
    slides: problemSolvingSlides,
    estimatedTime: '45 min',
    difficulty: 'Advanced',
    topics: ['Numerical Problems', 'Problem-solving Strategy', 'Applying Formulas', 'Unit Conversion']
  },
  {
    id: 'uniform-circular-motion',
    title: 'Uniform Circular Motion',
    description: 'An introduction to motion in a circle at a constant speed, exploring the concepts of changing velocity and centripetal acceleration.',
    slides: uniformCircularMotionSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Circular Path', 'Constant Speed', 'Changing Velocity', 'Centripetal Force', 'Acceleration']
  }
];

function MotionModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* The main component shell for the Motion module */}
    </div>
  );
}

export default MotionModule;