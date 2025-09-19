import { Slide } from '../../../common-components/concept';

// You will need to create these slide component files
import AdditionStrategiesSlide from './Slide1';
import SubtractionStrategiesSlide from './Slide2';
import WordProblemsSlide from './Slide3';

export const addSubtractWithin20Slides: Slide[] = [
  {
    type: 'interactive',
    title: 'Addition Strategies within 20',
    component: AdditionStrategiesSlide,
    id: 'add-within-20'
  },
  {
    type: 'interactive',
    title: 'Subtraction Strategies within 20',
    component: SubtractionStrategiesSlide,
    id: 'subtract-within-20'
  },
  {
    type: 'interactive',
    title: 'Word Problems within 20',
    component: WordProblemsSlide,
    id: 'word-problems-within-20'
  }
];

function AddSubtractWithin20() { return (<div>Add and Subtract within 20 Submodule</div>); }
export default AddSubtractWithin20;