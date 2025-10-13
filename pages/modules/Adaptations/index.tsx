import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
import { introductionToAdaptationsSlides } from './submodules/introduction-to-adaptations/index';
import { animalAdaptationsSlides } from './submodules/animal-adaptations/index';
import { plantAdaptationsSlides } from './submodules/plant-adaptations/index';
import { plantLifeCycleSlides } from './submodules/plant-life-cycle/index';

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

// Define submodules for a Biology Module on Adaptations
export const submodules: Submodule[] = [
  {
    id: 'introduction-to-adaptations',
    title: 'Introduction to Adaptations',
    description: 'Learn the fundamental concept of adaptation as an inherited characteristic that helps organisms survive and reproduce in their environment.',
    slides: introductionToAdaptationsSlides,
    estimatedTime: '10 min',
    difficulty: 'Beginner',
    topics: ['Adaptation', 'Survival', 'Reproduction', 'Inherited Characteristics', 'Structural vs. Behavioral']
  },
  {
    id: 'animal-adaptations',
    title: 'Animal Adaptations',
     description: 'Explore the two main types of animal adaptations: structural (physical body parts like camouflage) and behavioral (actions like migration or hibernation).',
    slides: animalAdaptationsSlides,
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    topics: ['Structural Adaptation', 'Behavioral Adaptation', 'Camouflage', 'Mimicry', 'Migration', 'Hibernation']
  },
  {
    id: 'plant-adaptations',
    title: 'Plant Adaptations',
    description: 'Discover how plants adapt with structures like thorns, behaviors like tropism (response to stimuli), and survival strategies like dormancy.',
    slides: plantAdaptationsSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Plant Structures', 'Seed Dispersal', 'Tropism', 'Phototropism', 'Gravitropism', 'Dormancy']
  },
  {
    id: 'plant-life-cycle',
    title: 'Plant Life Cycle & Reproduction',
    description: 'Understand the reproductive cycle of plants as a key process for species survival, covering stages from germination and pollination to fertilization and seed dispersal.',
    slides: plantLifeCycleSlides,
    estimatedTime: '10 min',
    difficulty: 'Beginner',
    topics: ['Reproduction', 'Germination', 'Pollination', 'Fertilization', 'Seed Dispersal']
  }
];

function OlympiadBioAdaptationsModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
    </div>
  );
}

export default OlympiadBioAdaptationsModule;