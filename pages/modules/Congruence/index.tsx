import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
// Note: You will need to create these files in your submodules directory
import { asaSlides } from './submodules/asa-congruence-criterion/index';
import { aasSlides } from './submodules/aas-congruence-criterion/index';
import { sasSlides } from './submodules/sas-congruence-criterion/index';
import { sssSlides } from './submodules/sss-congruence-criterion/index';
import { hlSlides } from './submodules/hl-congruence-criterion/index';
import { combiningSlides } from './submodules/combining-congruence-criteria/index';
import { rigidMotionsSlides } from './submodules/rigid-motions-and-congruence/index';
import { propertiesSlides } from './submodules/properties-of-congruence/index';
import { provingSlides } from './submodules/proving-congruence-statements/index';

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

// Define submodules for the Geometry Module on Congruence
export const submodules: Submodule[] = [
  {
    id: 'asa-congruence-criterion',
    title: 'The ASA Congruence Criterion',
    description: 'Learn to prove triangles are congruent using two angles and the included side (Angle-Side-Angle).',
    slides: asaSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['ASA', 'Identifying Congruent Triangles', 'Finding Measure of an Angle', 'Calculating Length of a Line Segment']
  },
  {
    id: 'aas-congruence-criterion',
    title: 'The AAS Congruence Criterion',
    description: 'Prove triangles congruent using two angles and a non-included side (Angle-Angle-Side).',
    slides: aasSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['AAS', 'Identifying Congruent Triangles', 'Finding Value of an Unknown', 'Finding Measure of an Angle', 'Calculating Length']
  },
  {
    id: 'sas-congruence-criterion',
    title: 'The SAS Congruence Criterion',
    description: 'Prove triangles congruent using two sides and the included angle (Side-Angle-Side).',
    slides: sasSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['SAS', 'Identifying Congruent Triangles', 'Finding Measure of an Angle', 'Calculating Length of a Line Segment']
  },
  {
    id: 'sss-congruence-criterion',
    title: 'The SSS Congruence Criterion',
    description: 'The most intuitive criterion: prove triangles congruent using all three corresponding sides (Side-Side-Side).',
    slides: sssSlides,
    estimatedTime: '10 min',
    difficulty: 'Beginner',
    topics: ['SSS', 'Identifying Congruent Triangles', 'Isosceles Triangles', 'Parallelograms', 'Applying SSS']
  },
  {
    id: 'hl-congruence-criterion',
    title: 'The HL Congruence Criterion',
    description: 'Learn the special case for right-angled triangles: Hypotenuse-Leg (HL) congruence.',
    slides: hlSlides,
    estimatedTime: '10 min',
    difficulty: 'Beginner',
    topics: ['HL', 'Right Triangles', 'Hypotenuse', 'Leg', 'Identifying Congruent Triangles', 'Calculating Measures']
  },
  {
    id: 'combining-congruence-criteria',
    title: 'Combining Congruence Criteria for Triangles',
    description: 'Develop strategies to identify the correct criterion and learn why "SSA" and "AAA" do not work for congruence.',
    slides: combiningSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Problem Solving', 'Identifying Triangles', 'Vertical Angles', 'Common Sides', 'Why No SSA']
  },
  {
    id: 'rigid-motions-and-congruence',
    title: 'Rigid Motions and Congruence',
    description: 'Understand the formal definition of congruence through translations, rotations, and reflections.',
    slides: rigidMotionsSlides,
    estimatedTime: '15 min',
    difficulty: 'Intermediate',
    topics: ['Rigid Motion', 'Properties of Rigid Motions', 'Mapping Polygons', 'Function Notation', 'Identifying True Statements']
  },
  {
    id: 'properties-of-congruence',
    title: 'Properties of Congruence',
    description: 'Learn the formal properties that govern congruence: Reflexive, Symmetric, and Transitive.',
    slides: propertiesSlides,
    estimatedTime: '10 min',
    difficulty: 'Intermediate',
    topics: ['Equivalence Relation', 'Reflexivity', 'Symmetry', 'Transitivity', 'Segment Congruence', 'Angle Congruence']
  },
  {
    id: 'proving-congruence-statements',
    title: 'Proving Congruence Statements',
    description: 'Apply all congruence criteria to write formal proofs and use the powerful CPCTC principle.',
    slides: provingSlides,
    estimatedTime: '25 min',
    difficulty: 'Advanced',
    topics: ['Two-Column Proof', 'CPCTC', 'Proving with SSS/SAS', 'Proving with ASA/AAS/HL', 'Constructing Proofs']
  }
];

// Main component for the Congruence Module
function CongruenceModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Your module's main page layout will go here.
        This component will likely map over the 'submodules' array 
        to display a card for each one.
      */}
    </div>
  );
}

export default CongruenceModule;