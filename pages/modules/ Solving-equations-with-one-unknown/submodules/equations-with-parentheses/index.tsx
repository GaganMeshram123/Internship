import { Slide } from '../../../common-components/concept';

// Import your slide components for this submodule
import IntroDistributiveProperty from './Slide1';
import SolvingWithParentheses from './Slide2';
import ParenthesesOnBothSides from './Slide3';
import CommonMistakesPractice from './Slide4';

export const equationsWithParenthesesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Intro to the Distributive Property',
    component: IntroDistributiveProperty,
    id: 'intro-distributive-property'
  },
  {
    type: 'interactive',
    title: 'Solving Equations with Parentheses',
    component: SolvingWithParentheses,
    id: 'solving-with-parentheses'
  },
  {
    type: 'interactive',
    title: 'Parentheses and Variables on Both Sides',
    component: ParenthesesOnBothSides,
    id: 'parentheses-on-both-sides'
  },
  {
    type: 'interactive',
    title: 'Common Mistakes and Practice',
    component: CommonMistakesPractice,
    id: 'common-mistakes-parentheses'
  }
];

function EquationsWithParenthesesSubmodule() { return (<div>Equations with parentheses</div>); }
export default EquationsWithParenthesesSubmodule;