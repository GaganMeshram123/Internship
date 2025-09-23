import { Slide } from '../../../common-components/concept';

// Import your slide components for this submodule
import IntroVariablesOnBothSides from './Slide1';
import SolvingClassicProblem from './Slide2';
import EquationsWithFractions from './Slide3';
import VariableInDenominator from './Slide4';

export const variablesOnBothSidesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Intro to Equations with Variables on Both Sides',
    component: IntroVariablesOnBothSides,
    id: 'intro-vars-both-sides'
  },
  {
    type: 'interactive',
    title: 'Solving a Classic Problem',
    component: SolvingClassicProblem,
    id: 'solving-classic-problem'
  },
  {
    type: 'interactive',
    title: 'Tackling Equations with Fractions',
    component: EquationsWithFractions,
    id: 'equations-with-fractions'
  },
  {
    type: 'interactive',
    title: 'Variables in the Denominator',
    component: VariableInDenominator,
    id: 'variable-in-denominator'
  }
];

function VariablesOnBothSidesSubmodule() { return (<div>Equations with variables on both sides</div>); }
export default VariablesOnBothSidesSubmodule;