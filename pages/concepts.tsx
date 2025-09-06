// pages/concept.tsx

import Head from 'next/head';
import TheoremDiagram3D from '../modules/circle-theorems-0001/submodules/tangent-radius-perpendicularity/TheoremDiagram3D';

const ConceptPage = () => {
  return (
    <>
      <Head>
        <title>3D Geometry Concept</title>
      </Head>
      <main>
        <h1>Tangent-Radius Theorem</h1>
        <div style={{ height: '500px', width: '100%' }}>
          <TheoremDiagram3D />
        </div>
      </main>
    </>
  );
};

export default ConceptPage;