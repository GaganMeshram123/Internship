import { Slide } from '../../../common-components/concept';

// You will need to create these slide component files
import MeasuringLengthSlide from './Slide1';
import TellingTimeSlide from './Slide2';
import CountingMoneySlide from './Slide3';

export const measurementSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Measuring Length',
    component: MeasuringLengthSlide,
    id: 'measurements-length'
  },
  {
    type: 'interactive',
    title: 'Telling Time',
    component: TellingTimeSlide,
    id: 'measurements-time'
  },
  {
    type: 'interactive',
    title: 'Counting Money',
    component: CountingMoneySlide,
    id: 'measurements-money'
  }
];

function MeasurementsSubmodule() { return (<div>Measurements Submodule</div>); }
export default MeasurementsSubmodule;