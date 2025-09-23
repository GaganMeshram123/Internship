import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function SolvingClassicProblem() {
    const slideInteractions: Interaction[] = [{ id: 'classic-problem-concept', conceptId: 'solving-vars-both-sides', conceptName: 'Solving a Classic Problem', type: 'learning' }];

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Example: Solving a Classic Problem</h2>
         <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-center font-mono text-2xl mb-4">5x + 2 = 3x + 10</p>
            <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Move the x-terms:</strong> Subtract 3x from both sides. This gives you `2x + 2 = 10`.</li>
                <li><strong>Move the numbers:</strong> Subtract 2 from both sides. This gives you `2x = 8`.</li>
                <li><strong>Solve for x:</strong> Divide both sides by 2. The answer is `x = 4`.</li>
            </ol>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="solving-classic-problem" slideTitle="Solving a Classic Problem" moduleId="solving-equations-one-unknown" submoduleId="variables-on-both-sides">
             <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}