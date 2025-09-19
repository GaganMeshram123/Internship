import { Slide } from '../../../common-components/concept';

// You will need to create these slide component files
import AddingWithThreeDigitsSlide from './Slide1';
import SubtractingWithThreeDigitsSlide from './Slide2';
import MultiStepWordProblemsSlide from './Slide3';

export const addSubtractWithin1000Slides: Slide[] = [
  {
    type: 'interactive',
    title: 'Adding within 1000',
    component: AddingWithThreeDigitsSlide,
    id: 'add-within-1000'
  },
  {
    type: 'interactive',
    title: 'Subtracting within 1000',
    component: SubtractingWithThreeDigitsSlide,
    id: 'subtract-within-1000'
  },
  {
    type: 'interactive',
    title: 'Multi-Step Word Problems',
    component: MultiStepWordProblemsSlide,
    id: 'word-problems-within-1000'
  }
];

function AddSubtractWithin1000() { return (<div>Add and Subtract within 1000 Submodule</div>); }
export default AddSubtractWithin1000;