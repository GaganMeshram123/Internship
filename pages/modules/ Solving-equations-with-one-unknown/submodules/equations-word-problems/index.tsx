import { Slide } from '../../../common-components/concept';

// Import your slide components for this submodule
import TranslatingWordsToEquationsSlide from './Slide1';
import SolvingAgeProblemsSlide from './Slide2';
import SolvingConsecutiveIntegerProblemsSlide from './Slide3';
import SolvingPerimeterProblemsSlide from './Slide4';

export const equationsWordProblemsSlides: Slide[] = [
  {
    type: 'interactive',
    title: ' Number Detectives: Solving with Consecutive Integers',
    component: TranslatingWordsToEquationsSlide,
    id: 'translating-words-to-equations'
  },
  {
    type: 'interactive',
    title: ' Sum of Integers Challenge ',
    component: SolvingAgeProblemsSlide,
    id: 'solving-age-problems'
  },
  {
    type: 'interactive',
    title: 'A Guide to Solving Consecutive Integer Problems',
    component: SolvingConsecutiveIntegerProblemsSlide,
    id: 'solving-consecutive-integer-problems'
  },
  {
    type: 'interactive',
    title: 'Solving Perimeter Problems: Algebra in Action',
    component: SolvingPerimeterProblemsSlide,
    id: 'solving-perimeter-problems'
  }
];

function EquationsWordProblemsSubmodule() { return (<div>Equations word problems</div>); }
export default EquationsWordProblemsSubmodule;