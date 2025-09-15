import { Slide } from '../../../common-components/concept';
import IrrationalSumIntroSlide from './Slide1';
import IrrationalSumExamplesSlide from './Slide2';
// Add imports for your new slide components
import IrrationalSubtractionIntroSlide from './Slide3';
import IrrationalSubtractionExamplesSlide from './Slide4';

export const irrationalSumSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Sum of Irrational Numbers',
    content: '',
    component: IrrationalSumIntroSlide,
    id: 'irrational-sum-intro'
  },
  {
    type: 'interactive',
    title: 'Examples of Irrational Sums',
    content: '',
    component: IrrationalSumExamplesSlide,
    id: 'irrational-sum-examples'
  },
  // --- NEW SLIDES ADDED BELOW ---
  {
    type: 'interactive',
    title: 'Introduction to Subtraction of Irrational Numbers',
    content: '',
    component: IrrationalSubtractionIntroSlide,
    id: 'irrational-subtraction-intro'
  },
  {
    type: 'interactive',
    title: 'Examples of Irrational Subtraction',
    content: '',
    component: IrrationalSubtractionExamplesSlide,
    id: 'irrational-subtraction-examples'
  }
];

export const irrationalSumSubmodule = {
  id: 'irrational-sum', // Consider changing to 'sum-and-subtraction'
  title: 'Sum', // Consider changing to 'Sum & Subtraction'
  description: 'Learn how to add and subtract irrational numbers and understand their properties.',
  slides: irrationalSumSlides
};

function IrrationalSumSubmodule() {
  return (
    <div>
      This is the <b>Sum</b> submodule for Irrational Numbers.
    </div>
  );
}

export default IrrationalSumSubmodule;