import { Slide } from '../../../common-components/concept';

// Import your slide components for this submodule
import OneSolutionSlide from './Slide1';
import NoSolutionSlide from './Slide2';
import InfiniteSolutionsSlide from './Slide3';
import SummaryAndPracticeSlide from './Slide4';

export const numberOfSolutionsSlides: Slide[] = [
  {
    type: 'interactive',
    title: ' How Many Answers? Exploring the Number of Solutions',
    component: OneSolutionSlide,
    id: 'one-solution'
  },
  {
    type: 'interactive',
    title: 'Worked Examples: One, None, or Infinite?',
    component: NoSolutionSlide,
    id: 'no-solution'
  },
  {
    type: 'interactive',
    title: 'Equation Architect: How to Build a "No Solution" Problem',
    component: InfiniteSolutionsSlide,
    id: 'infinite-solutions'
  },
  {
    type: 'interactive',
    title: 'Equation Architect: Building an "Infinite Solutions" Problem',
    component: SummaryAndPracticeSlide,
    id: 'solutions-summary'
  }
];

function NumberOfSolutionsSubmodule() { return (<div>Number of solutions to equations</div>); }
export default NumberOfSolutionsSubmodule;