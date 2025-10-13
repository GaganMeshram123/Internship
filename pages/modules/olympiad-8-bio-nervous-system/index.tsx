import React from 'react';
import { Slide } from '../common-components/concept';

// Import submodule content
import { nervousSystemSlides } from './submodules/nervous-system/index';
import { neuronsSlides } from './submodules/neurons/index';
import { humanBrainSlides } from './submodules/human-brain/index';

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

// Define submodules for Olympiad 8 Biology - Nervous System
export const submodules: Submodule[] = [
  {
    id: 'nervous-system',
    title: 'Nervous System',
    description: 'Explore the body\'s main control and communication network. Learn how the nervous system gathers information, processes it, and coordinates responses to maintain homeostasis.',
    slides: nervousSystemSlides,
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    topics: ['Nervous System Functions', 'Homeostasis', 'Neural Communication', 'System Integration']
  },
  {
    id: 'neurons',
    title: 'Neurons',
    description: 'Discover the basic unit of the nervous system. Learn about neuron structure, function, and the unique properties that make neural communication possible.',
    slides: neuronsSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Neuron Structure', 'Neural Function', 'Excitability', 'Conductivity', 'Synaptic Transmission']
  },
  {
    id: 'human-brain',
    title: 'Human Brain',
    description: 'Explore the central organ of the nervous system. Learn about brain structure, protection, and the three main divisions that control all aspects of human function.',
    slides: humanBrainSlides,
    estimatedTime: '10 min',
    difficulty: 'Beginner',
    topics: ['Brain Structure', 'Brain Protection', 'Brain Divisions', 'Neural Control']
  }
];

function Olympiad8BioNervousSystemModule() {
  return (
    <div className="bg-gray-900 min-h-screen">
    </div>
  );
}

export default Olympiad8BioNervousSystemModule;