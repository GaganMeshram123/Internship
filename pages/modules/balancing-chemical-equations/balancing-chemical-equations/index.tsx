import { Slide } from '../../common-components/concept';

// Import submodule content
import { introductionToBalancingSlides } from './submodules/introduction-to-balancing/index';
import { advancedBalancingSlides } from './submodules/advanced-balancing-techniques/index';

// Define the interface for submodules
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  thumbnail?: string;
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

// Define submodules with their slides
export const submodules: Submodule[] = [
  {
    id: 'introduction-to-balancing',
    title: 'Introduction to Balancing Chemical Equations',
    description:
      'Learn the fundamental principles and systematic approaches to balancing chemical equations',
    slides: introductionToBalancingSlides,
    estimatedTime: '45 min',
    difficulty: 'Beginner',
    topics: [
      'Chemical Equations',
      'Conservation of Mass',
      'Balancing Strategy',
      'Combustion Reactions',
    ],
  },
  {
    id: 'advanced-balancing-techniques',
    title: 'Advanced Balancing Techniques',
    description:
      'Master advanced methods including LCM, fractional coefficients, and polyatomic ion strategies',
    slides: advancedBalancingSlides,
    estimatedTime: '60 min',
    difficulty: 'Intermediate',
    topics: ['LCM Method', 'Fractional Coefficients', 'Polyatomic Ions', 'Complex Equations'],
  },
];

// 👇 Module config that Quazar Tester will detect
const moduleConfig = {
  id: 'balancing-chemical-equations',
  title: 'Balancing Chemical Equations',
  description: 'Interactive module on balancing chemical equations',
  submodules,
};

export default moduleConfig;
