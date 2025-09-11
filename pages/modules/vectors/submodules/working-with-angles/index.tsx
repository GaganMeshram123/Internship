import { Slide } from '../../../common-components/concept';
import WorkingWithAnglesSlide1 from './Slide1';
import VectorSumMagnitudeSlide from './Slide2';

export const workingWithAnglesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Vector Direction and Angles',
    content: '',
    component: WorkingWithAnglesSlide1,
    id: 'vector-direction-angles'
  },
  {
    type: 'interactive',
    title: 'Magnitude of Vector Sum',
    content: '',
    component: VectorSumMagnitudeSlide,
    id: 'vector-sum-magnitude'
  }
];

export const workingWithAnglesSubmodule = {
  id: 'working-with-angles',
  title: 'Working with Angles',
  description: 'Understanding vector direction through angles and trigonometry',
  slides: workingWithAnglesSlides
}; 


function WorkingWithAnglesSubmodule() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default WorkingWithAnglesSubmodule; 