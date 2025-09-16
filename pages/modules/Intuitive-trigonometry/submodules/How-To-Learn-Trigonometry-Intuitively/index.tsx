import { Slide } from '../../../common-components/concept';

// These files need to be created in the same folder.
import TrigAsPercentagesSlide from './Slide1';
import UnitCircleRadiansSlide from './Slide2';
import GraphingWavesSlide from './Slide3';
import PythagoreanConnectionSlide from './Slide4';
import EulersFormulaSlide from './Slide5';

export const howToLearnTrigSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'A New Perspective: Trig as Percentages',
    content: '',
    component: TrigAsPercentagesSlide,
    id: 'trig-intro-percentages'
  },
  {
    type: 'interactive',
    title: 'The Unit Circle & Radians',
    content: '',
    component: UnitCircleRadiansSlide,
    id: 'trig-intro-unit-circle'
  },
  {
    type: 'interactive',
    title: 'Making Waves: Graphing Sine & Cosine',
    content: '',
    component: GraphingWavesSlide,
    id: 'trig-intro-graphs'
  },
  {
    type: 'interactive',
    title: 'The Pythagorean Connection',
    content: '',
    component: PythagoreanConnectionSlide,
    id: 'trig-intro-pythagorean'
  },
  {
    type: 'interactive',
    title: "Euler's Formula: The Big Picture",
    content: '',
    component: EulersFormulaSlide,
    id: 'trig-intro-eulers'
  }
];

export const howToLearnTrigSubmodule = {
  id: 'how-to-learn-trigonometry-intuitively',
  title: 'How To Learn Trigonometry Intuitively',
  description: 'Building a deep, lasting understanding of trigonometry from the core concepts.',
  slides: howToLearnTrigSlides
};

function HowToLearnTrigonometryIntuitively() {
  return (
    <div>
      This is the main entry point for the <b>How To Learn Trigonometry Intuitively</b> submodule.
    </div>
  );
}

export default HowToLearnTrigonometryIntuitively;