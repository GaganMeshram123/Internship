import { Slide } from '../../../common-components/concept';

// You will need to create these slide component files
import AddingWithRegroupingSlide from './Slide1';
import SubtractingWithRegroupingSlide from './Slide2';
import WordProblemsSlide100 from './Slide3';

export const addSubtractWithin100Slides: Slide[] = [
  {
    type: 'interactive',
    title: 'Adding within 100 with Regrouping',
    component: AddingWithRegroupingSlide,
    id: 'add-within-100'
  },
  {
    type: 'interactive',
    title: 'Subtracting within 100 with Regrouping',
    component: SubtractingWithRegroupingSlide,
    id: 'subtract-within-100'
  },
  {
    type: 'interactive',
    title: 'Word Problems within 100',
    component: WordProblemsSlide100,
    id: 'word-problems-within-100'
  }
];

function AddSubtractWithin100() { return (<div>Add and Subtract within 100 Submodule</div>); }
export default AddSubtractWithin100;