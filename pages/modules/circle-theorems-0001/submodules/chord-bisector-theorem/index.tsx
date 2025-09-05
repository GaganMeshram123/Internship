import React from 'react';
import { Slide } from '../../../common-components/concept';
import ChordBisectorTheoremSlide1 from './Slide1';
import ChordBisectorTheoremSlide2 from './Slide2';
import ChordBisectorTheoremSlide3 from './Slide3';
import ChordBisectorTheoremAssessment from './Slide4';

// Define slide array
export const chordBisectorTheoremSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Chord Bisector Theorem',
    content: '',
    component: ChordBisectorTheoremSlide1,
    id: 'ct-chord-bisector-theorem-statement'
  },
  {
    type: 'interactive',
    title: 'Proof',
    content: '',
    component: ChordBisectorTheoremSlide2,
    id: 'ct-chord-bisector-theorem-proof'
  },
  {
    type: 'interactive',
    title: 'Center Construction Method',
    content: '',
    component: ChordBisectorTheoremSlide3,
    id: 'ct-center-construction-method'
  },
  {
    type: 'question',
    title: 'Assessment',
    content: React.createElement(() => <ChordBisectorTheoremAssessment />),
    persistResponse: true,
    component: ChordBisectorTheoremAssessment,
    id: 'ct-chord-bisector-theorem-assessment',
    questions: [
      {
        id: 'basic-chord-bisector-application',
        questionText: 'In a circle with center O, chord AB is bisected at point M. A line is drawn from the center O through M. Tasks: (a) Prove that OM is perpendicular to chord AB using the chord bisector theorem (b) If AB = 12 cm and the radius of the circle is 10 cm, calculate the distance OM',
        inputType: 'image',
        required: true
      },
      {
        id: 'multiple-chords-distances',
        questionText: 'A circle has center O and radius 5 cm. Two chords PQ and RS have lengths 8 cm and 6 cm respectively. M₁ and M₂ are the midpoints of the chords. Tasks: (a) Calculate the distance OM₁ from the center to the midpoint of chord PQ (b) Calculate the distance OM₂ from the center to the midpoint of chord RS (c) Which chord is closer to the center and why?',
        inputType: 'image',
        required: true
      }
    ]
  }
];

// Dummy React component to satisfy Next.js requirements
function ChordBisectorTheoremComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default ChordBisectorTheoremComponent; 