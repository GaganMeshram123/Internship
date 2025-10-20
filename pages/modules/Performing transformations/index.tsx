import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
import { introToEuclideanGeometrySlides } from './submodules/intro-to-euclidean-geometry/index';
import { introToRigidTransformationsSlides } from './submodules/introduction-to-rigid-transformations/index';
import { translationsSlides } from './submodules/translations/index';
import { rotationsSlides } from './submodules/rotations/index';
import { reflectionsSlides } from './submodules/reflections/index';
import { dilationsSlides } from './submodules/dilations/index';

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

// Define submodules for a Geometry Module on Transformations
export const submodules: Submodule[] = [
  {
    id: 'intro-to-euclidean-geometry',
    title: 'Intro to Euclidean Geometry',
    description: "Learn the basic terms, labels, and definitions of geometry, the 'world' where transformations happen.",
    slides: introToEuclideanGeometrySlides,
    estimatedTime: '10 min',
    difficulty: 'Beginner',
    topics: ['Euclid', 'Point', 'Line', 'Segment', 'Ray', 'Plane', 'Angle', 'Definitions']
  },
  {
    id: 'introduction-to-rigid-transformations',
    title: 'Introduction to Rigid Transformations',
    description: "Understand what a transformation is and discover the three 'rigid' moves that preserve size and shape.",
    slides: introToRigidTransformationsSlides,
    estimatedTime: '10 min',
    difficulty: 'Beginner',
    topics: ['Transformation', 'Rigid Transformation', 'Isometry', 'Pre-image', 'Image', 'Congruence']
  },
  {
    id: 'translations',
    title: 'Translations',
    description: "Master the 'slide' transformation. Learn to translate points and shapes using coordinate rules and vectors.",
    slides: translationsSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Translation', 'Slide', 'Vector', 'Coordinate Rule', 'Properties of Translations']
  },
  {
    id: 'rotations',
    title: 'Rotations',
    description: "Master the 'turn' transformation. Learn to rotate figures about the origin by 90, 180, and 270 degrees.",
    slides: rotationsSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Rotation', 'Turn', 'Center of Rotation', 'Angle of Rotation', 'Rotation Rules', 'Origin']
  },
  {
    id: 'reflections',
    title: 'Reflections',
    description: "Master the 'flip' transformation. Learn to reflect figures across the x-axis, y-axis, and diagonal lines.",
    slides: reflectionsSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Reflection', 'Flip', 'Line of Reflection', 'Mirror Image', 'x-axis', 'y-axis', 'y=x']
  },
  {
    id: 'dilations',
    title: 'Dilations',
    description: "Explore the 'resize' transformation. Learn how scale factors and a center of dilation create similar figures.",
    slides: dilationsSlides,
    estimatedTime: '15 min',
    difficulty: 'Intermediate',
    topics: ['Dilation', 'Resize', 'Scale Factor', 'Center of Dilation', 'Enlargement', 'Reduction', 'Similarity']
  }
];

function PerformingTransformationsModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Your module's main page layout will go here */}
    </div>
  );
}

export default PerformingTransformationsModule;