import { Slide } from '../../../common-components/concept';
import IrrationalSumIntroSlide from './Slide1';
import IrrationalSumExamplesSlide from './Slide2';

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
  }
];

export const irrationalSumSubmodule = {
  id: 'irrational-sum',
  title: 'Sum',
  description: 'Learn how to add irrational numbers and understand their properties.',
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
