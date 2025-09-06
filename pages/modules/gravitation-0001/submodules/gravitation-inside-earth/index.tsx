import React from 'react';
import { Slide } from '../../../common-components/concept';
import InsideEarthSlide1 from './Slide1';
import InsideEarthSlide2 from './Slide2';
import InsideEarthSlide3 from './Slide3';
import InsideEarthPracticeSlide from './Slide4';

export const gravitationInsideEarthSlides: Slide[] = [
  { 
    type: 'interactive', 
    title: 'Shell Theorem Applications Inside Earth', 
    content: '', 
    component: InsideEarthSlide1, 
    id: 'shell-theorem-inside-earth' 
  },
  { 
    type: 'interactive', 
    title: 'Gravitational Force Inside a Uniform Sphere', 
    content: '', 
    component: InsideEarthSlide2, 
    id: 'force-inside-uniform-sphere' 
  },
  { 
    type: 'interactive', 
    title: 'Complete Force vs Distance Picture', 
    content: '', 
    component: InsideEarthSlide3, 
    id: 'complete-force-distance-picture' 
  },
  {
    type: 'question',
    title: 'Practice Problems',
    content: React.createElement(() => <InsideEarthPracticeSlide />),
    persistResponse: true,
    id: 'inside-earth-practice-problems',
    questions: [
      {
        id: 'inside-earth-practice-1',
        questionText: 'Height vs Depth Gravitational Equivalence: (A) Show d = 2h relationship, (B) Calculate ISS equivalent depth, (C) Explain 2:1 ratio physics, (D) Analyze half-gravity depth scenario.',
        inputType: 'image',
        required: true
      },
      {
        id: 'inside-earth-practice-2',
        questionText: 'Journey to Earth\'s Core: (A) Calculate weight percentages at various depths, (B) Consider real Earth density effects.',
        inputType: 'image',
        required: true
      },
      {
        id: 'inside-earth-practice-3',
        questionText: 'Seismic Analysis and Earth Structure: (A) Calculate uniform density vs observed, (B) Modify force graph for real density, (C) Connect seismic waves to gravity changes, (D) Analyze inner core boundary gravity.',
        inputType: 'image',
        required: true
      }
    ]
  }
];

function GravitationInsideEarthComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default GravitationInsideEarthComponent; 