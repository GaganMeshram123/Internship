import React from 'react';
import { Slide } from '../common-components/concept';
 

// Corrected imports based on your folder structure
import { howToLearnTrigSlides } from './submodules/How-To-Learn-Trigonometry-Intuitively';/* 
import { foundationsSlides } from './submodules/Foundations-Right-Triangles-and-Ratios';
import { unitCircleSlides } from './submodules/The-Unit-Circle-Visualizing-All-Angles';
import { graphingWavesSlides } from './submodules/Graphs-The-Waves-of-Trigonometry';
import { identitiesSlides } from './submodules/Identities-The-Rules-and-Tools-of-Trig';
import { applicationsSlides } from './submodules/Applications-From-Gaming-to-GPS'; */

// Define the interface for a submodule
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

// Define all the submodules for the Intuitive Trigonometry module
export const submodules: Submodule[] = [
  {
    id: 'how-to-learn-trigonometry-intuitively',
    title: 'How To Learn Trigonometry Intuitively',
    description: 'Build a deep, lasting understanding of trigonometry by focusing on the core concepts behind the formulas.',
    slides: howToLearnTrigSlides,
    estimatedTime: '25 min',
    difficulty: 'Beginner',
    topics: ['Intuition', 'Circles', 'Percentages', 'Sine', 'Cosine']
  },
 /*  {
    id: 'foundations-right-triangles-and-ratios',
    title: 'Foundations: Right Triangles and Ratios',
    description: 'Discover the "why" behind trigonometry by exploring the constant ratios in right-angled triangles.',
    slides: foundationsSlides,
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    topics: ['SOH CAH TOA', 'Right Triangles', 'Ratios', 'Tangent']
  },
  {
    id: 'the-unit-circle-visualizing-all-angles',
    title: 'The Unit Circle: Visualizing All Angles',
    description: 'Master the ultimate trigonometry tool to understand all angles, including those beyond 90 degrees and negative angles.',
    slides: unitCircleSlides,
    estimatedTime: '30 min',
    difficulty: 'Intermediate',
    topics: ['Unit Circle', 'Radians', 'Coordinates', 'Special Angles']
  },
  {
    id: 'graphs-the-waves-of-trigonometry',
    title: 'Graphs: The Waves of Trigonometry',
    description: 'Visualize how circular motion "unrolls" into the sine and cosine waves that describe the natural world.',
    slides: graphingWavesSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Graphing', 'Sine Wave', 'Cosine Wave', 'Amplitude', 'Period']
  },
  {
    id: 'identities-the-rules-and-tools-of-trig',
    title: 'Identities: The Rules and Tools of Trig',
    description: 'Learn how the most important trig identities are derived from concepts you already know, like the Pythagorean Theorem.',
    slides: identitiesSlides,
    estimatedTime: '30 min',
    difficulty: 'Advanced',
    topics: ['Pythagorean Identity', 'Formulas', 'Simplification', 'Solving Equations']
  },
  {
    id: 'applications-from-gaming-to-gps',
    title: 'Applications: From Gaming to GPS',
    description: 'Explore how trigonometry is used in modern technology, including video games, computer graphics, and navigation.',
    slides: applicationsSlides,
    estimatedTime: '20 min',
    difficulty: 'Advanced',
    topics: ['Applications', 'Computer Graphics', 'Navigation', 'Physics', 'Engineering']
  } */
];

// Main component for the module
function IntuitiveTrigonometryModule() {
  return (
    <div>
      {/* This is a placeholder; your framework will likely render the submodules based on the export above. */}
    </div>
  );
}

export default IntuitiveTrigonometryModule;