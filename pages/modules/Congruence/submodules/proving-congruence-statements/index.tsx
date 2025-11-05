import React from 'react';
import { Slide } from '../../../common-components/concept';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';
import Slide7 from './Slide7';

export const provingSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to Proofs',
    component: Slide1,
    id: 'proving-introduction'
  },
  {
    type: 'interactive',
    title: 'Proving Congruence Statements',
    component: Slide2,
    id: 'proving-statements'
  },
  {
    type: 'interactive',
    title: 'Stating the Full Proof Using the Two-Column Format',
    component: Slide3,
    id: 'proving-two-column'
  },
  {
    type: 'interactive',
    title: 'CPCTC',
    component: Slide4,
    id: 'proving-cpctc'
  },
  {
    type: 'interactive',
    title: 'Proving Congruence Using the SSS and SAS Criteria',
    component: Slide5,
    id: 'proving-sss-sas'
  },
  {
    type: 'interactive',
    title: 'Proving Congruence Using the ASA, AAS, and HL Criteria',
    component: Slide6,
    id: 'proving-asa-aas-hl'
  },
  {
    type: 'interactive',
    title: 'Constructing Complete Proofs of Congruence Statements',
    component: Slide7,
    id: 'proving-constructing-complete'
  }
];

function ProvingStatementsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default ProvingStatementsComponent;