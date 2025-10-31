import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
import { rigidTransformationsOverviewSlides } from './submodules/rigid-transformations-overview/index';
import { dilationPreservedPropertiesSlides } from './submodules/dilation-preserved-properties/index';
import { propertiesDefinitionsTransformationsSlides } from './submodules/properties-definitions-of-transformations/index';
import { symmetrySlides } from './submodules/symmetry/index';
import { proofsWithTransformationsSlides } from './submodules/proofs-with-transformations/index';

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

// Define submodules for the Transformation Properties and Proofs Module
export const submodules: Submodule[] = [
  {
    id: 'rigid-transformations-overview',
    title: 'Rigid transformations overview',
    description: "Review the properties of rigid transformations and how they preserve distance and angle measure.",
    slides: rigidTransformationsOverviewSlides, // 4 slides
    estimatedTime: '15 min',
    difficulty: 'Intermediate',
    topics: ['Rigid Transformation', 'Preserved Properties', 'Isometry', 'Mapping', 'Congruence']
  },
  {
    id: 'dilation-preserved-properties',
    title: 'Dilation preserved properties',
    description: "Understand what properties are preserved (and not preserved) when a figure is dilated.",
    slides: dilationPreservedPropertiesSlides, // 1 slide
    estimatedTime: '5 min',
    difficulty: 'Intermediate',
    topics: ['Dilation', 'Properties', 'Similarity', 'Scale Factor', 'Angle Measure']
  },
  {
    id: 'properties-definitions-of-transformations',
    title: 'Properties & definitions of transformations',
    description: "Take a deeper look at the precise definitions of translations, rotations, and reflections.",
    slides: propertiesDefinitionsTransformationsSlides, // 4 slides
    estimatedTime: '15 min',
    difficulty: 'Intermediate',
    topics: ['Sequence', 'Definitions', 'Rotation', 'Reflection', 'Translation', 'Identify Transformation']
  },
  {
    id: 'rotations',
    title: 'Symmetry',
    description: "Explore reflective and rotational symmetry in 2D shapes and quadrilaterals.",
    slides: symmetrySlides, // 4 slides
    estimatedTime: '15 min',
    difficulty: 'Intermediate',
    topics: ['Symmetry', 'Reflective Symmetry', 'Rotational Symmetry', 'Line of Symmetry', 'Quadrilaterals']
  },
  {
    id: 'proofs-with-transformations',
    title: 'Proofs with transformations',
    description: "Learn how to use the properties of transformations to prove geometric theorems.",
    slides: proofsWithTransformationsSlides, // 2 slides
    estimatedTime: '10 min',
    difficulty: 'Advanced',
    topics: ['Proofs', 'Geometric Proofs', 'Transformation Proofs', 'Congruence Proofs', 'Properties']
  }
];

function TransformationPropertiesProofsModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Your module's main page layout will go here */}
    </div>
  );
}

export default TransformationPropertiesProofsModule;