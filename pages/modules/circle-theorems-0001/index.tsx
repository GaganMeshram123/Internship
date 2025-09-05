import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content based on new structure
import { circleFundamentalsSlides } from './submodules/circle-fundamentals/index';
import { chordBisectorTheoremSlides } from './submodules/chord-bisector-theorem/index';
import { equalChordsTheoremSlides } from './submodules/equal-chords-theorem/index';
import { tangentRadiusPerpendicularitySlides } from './submodules/tangent-radius-perpendicularity/index';
import { twoTangentsTheoremSlides } from './submodules/two-tangents-theorem/index';
import { centralCircumferenceRatioSlides } from './submodules/central-circumference-ratio/index';
import { semicircleTheoremSlides } from './submodules/semicircle-theorem/index';
import { sameSegmentTheoremSlides } from './submodules/same-segment-theorem/index';
import { cyclicQuadrilateralsSlides } from './submodules/cyclic-quadrilaterals/index';
import { alternateSegmentTheoremSlides } from './submodules/alternate-segment-theorem/index';
import { intersectingChordsSlides } from './submodules/intersecting-chords/index';
import { powerOfPointSlides } from './submodules/power-of-point/index';

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

// Define submodules with their slides based on the new, optimized structure
export const submodules: Submodule[] = [
  {
    id: 'circle-fundamentals',
    title: 'Circle Fundamentals',
    description: 'Basic definitions of circles including center, radius, diameter, chord, arc, sector, and special lines',
    slides: circleFundamentalsSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Circle', 'Radius', 'Diameter', 'Chord', 'Arc', 'Tangent', 'Secant']
  },
  {
    id: 'chord-bisector-theorem',
    title: 'Chord Bisector Theorem',
    description: 'The perpendicular from the center of a circle to a chord bisects the chord',
    slides: chordBisectorTheoremSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Chord', 'Perpendicular Bisector', 'Center Construction']
  },
  {
    id: 'equal-chords-theorem',
    title: 'Equal Chords Theorem',
    description: 'Properties and relationships of equal chords in circles',
    slides: equalChordsTheoremSlides,
    estimatedTime: '15 min',
    difficulty: 'Intermediate',
    topics: ['Equal Chords', 'Central Angles', 'Arc Lengths']
  },
  {
    id: 'tangent-radius-perpendicularity',
    title: 'Tangent-Radius Perpendicularity',
    description: 'The perpendicular relationship between tangent lines and radii at the point of contact',
    slides: tangentRadiusPerpendicularitySlides,
    estimatedTime: '15 min',
    difficulty: 'Intermediate',
    topics: ['Tangent', 'Radius', 'Perpendicular', 'Point of Contact']
  },
  {
    id: 'two-tangents-theorem',
    title: 'Two Tangents Theorem',
    description: 'Properties of two tangent lines drawn from an external point to a circle',
    slides: twoTangentsTheoremSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Tangent Lines', 'External Point', 'Equal Lengths']
  },
  {
    id: 'same-segment-theorem',
    title: 'Same Segment Theorem',
    description: 'Angles subtended by the same arc on the same side of a chord are equal',
    slides: sameSegmentTheoremSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Angles in Circle', 'Arc Segments', 'Inscribed Angles']
  },
  {
    id: 'central-circumference-ratio',
    title: 'Central-Circumference Ratio',
    description: 'The relationship between central angles and circumference angles subtended by the same arc',
    slides: centralCircumferenceRatioSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Central Angles', 'Inscribed Angles', 'Angle Relationships']
  },
  {
    id: 'semicircle-theorem',
    title: 'Semicircle Theorem',
    description: 'Angles subtended by a diameter from any point on the circle are right angles',
    slides: semicircleTheoremSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Diameter', 'Right Angles', 'Semicircle']
  },
  {
    id: 'cyclic-quadrilaterals',
    title: 'Cyclic Quadrilaterals',
    description: 'Properties of quadrilaterals inscribed in circles, particularly opposite angles',
    slides: cyclicQuadrilateralsSlides,
    estimatedTime: '25 min',
    difficulty: 'Advanced',
    topics: ['Quadrilaterals', 'Opposite Angles', 'Cyclic Properties']
  },
  {
    id: 'alternate-segment-theorem',
    title: 'Alternate Segment Theorem',
    description: 'The relationship between tangent-chord angles and angles in the alternate segment',
    slides: alternateSegmentTheoremSlides,
    estimatedTime: '25 min',
    difficulty: 'Advanced',
    topics: ['Tangent-Chord Angle', 'Alternate Segment', 'Angle Relationships']
  },
  {
    id: 'intersecting-chords',
    title: 'Intersecting Chords',
    description: 'The relationship between segments when two chords intersect inside a circle',
    slides: intersectingChordsSlides,
    estimatedTime: '20 min',
    difficulty: 'Advanced',
    topics: ['Intersecting Chords', 'Chord Segments', 'Products of Segments']
  },
  {
    id: 'power-of-point',
    title: 'Power of a Point',
    description: 'The power of a point theorem for secants and tangents from external points',
    slides: powerOfPointSlides,
    estimatedTime: '25 min',
    difficulty: 'Advanced',
    topics: ['Power of Point', 'Secants', 'Tangent-Secant', 'Products']
  }
];

function CircleTheoremsModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
    </div>
  );
}

export default CircleTheoremsModule;