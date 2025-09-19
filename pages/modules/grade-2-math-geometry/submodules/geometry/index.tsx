import { Slide } from '../../../common-components/concept';

// You will need to create these slide component files
import Shapes2DSlide from './Slide1';
import Shapes3DSlide from './Slide2';
import PartitioningShapesSlide from './Slide3';

export const geometrySlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Recognizing 2D Shapes',
    component: Shapes2DSlide,
    id: 'geometry-2d-shapes'
  },
  {
    type: 'interactive',
    title: 'Exploring 3D Shapes',
    component: Shapes3DSlide,
    id: 'geometry-3d-shapes'
  },
  {
    type: 'interactive',
    title: 'Partitioning Shapes into Equal Parts',
    component: PartitioningShapesSlide,
    id: 'geometry-partitioning'
  }
];

function GeometrySubmodule() { return (<div>Geometry Submodule</div>); }
export default GeometrySubmodule;