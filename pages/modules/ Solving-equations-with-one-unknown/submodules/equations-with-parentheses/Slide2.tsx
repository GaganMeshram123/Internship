import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function SolvingWithParentheses() {
    const slideInteractions: Interaction[] = [{ id: 'solving-with-parens-concept', conceptId: 'solving-with-parentheses', conceptName: 'Solving with Parentheses', type: 'learning' }];

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Example: Solving a Basic Equation</h2>
         <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-center font-mono text-2xl mb-4">3(x + 2) = 12</p>
            <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Step 1: Distribute.</strong> Multiply the 3 by both the 'x' and the 2. This gives you `3x + 6 = 12`.</li>
                <li><strong>Step 2: Isolate the x-term.</strong> Subtract 6 from both sides. This gives you `3x = 6`.</li>
                <li><strong>Step 3: Solve for x.</strong> Divide both sides by 3. The answer is `x = 2`.</li>
            </ol>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="solving-with-parentheses" slideTitle="Solving Equations with Parentheses" moduleId="solving-equations-one-unknown" submoduleId="equations-with-parentheses">
             <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}