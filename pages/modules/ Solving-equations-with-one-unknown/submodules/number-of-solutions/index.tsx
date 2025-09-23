import { Slide } from '../../../common-components/concept';

// Import your slide components for this submodule
import OneSolutionSlide from './Slide1';
import NoSolutionSlide from './Slide2';
import InfiniteSolutionsSlide from './Slide3';
import SummaryAndPracticeSlide from './Slide4';

export const numberOfSolutionsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Case 1: One Solution',
    component: OneSolutionSlide,
    id: 'one-solution'
  },
  {
    type: 'interactive',
    title: 'Case 2: No Solution (Contradiction)',
    component: NoSolutionSlide,
    id: 'no-solution'
  },
  {
    type: 'interactive',
    title: 'Case 3: Infinite Solutions (Identity)',
    component: InfiniteSolutionsSlide,
    id: 'infinite-solutions'
  },
  {
    type: 'interactive',
    title: 'Summary and Practice',
    component: SummaryAndPracticeSlide,
    id: 'solutions-summary'
  }
];

function NumberOfSolutionsSubmodule() { return (<div>Number of solutions to equations</div>); }
export default NumberOfSolutionsSubmodule;