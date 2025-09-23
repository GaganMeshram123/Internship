import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function ParenthesesOnBothSides() {
    const slideInteractions: Interaction[] = [{ id: 'parens-both-sides-concept', conceptId: 'parentheses-on-both-sides', conceptName: 'Parentheses on Both Sides', type: 'learning' }];

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Example: Variables on Both Sides</h2>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-center font-mono text-2xl mb-4">4(x - 1) = 2(x + 3)</p>
            <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Step 1: Distribute on both sides.</strong> This gives you `4x - 4 = 2x + 6`.</li>
                <li><strong>Step 2: Collect x-terms.</strong> Subtract 2x from both sides. This gives you `2x - 4 = 6`.</li>
                <li><strong>Step 3: Collect number terms.</strong> Add 4 to both sides. This gives you `2x = 10`.</li>
                <li><strong>Step 4: Solve for x.</strong> Divide by 2. The answer is `x = 5`.</li>
            </ol>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="parentheses-on-both-sides" slideTitle="Parentheses and Variables on Both Sides" moduleId="solving-equations-one-unknown" submoduleId="equations-with-parentheses">
            <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}