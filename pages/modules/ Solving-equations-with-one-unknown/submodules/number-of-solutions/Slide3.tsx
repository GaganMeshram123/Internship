import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function InfiniteSolutionsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'infinite-solutions-concept', conceptId: 'infinite-solutions', conceptName: 'Equations with Infinite Solutions', type: 'learning' }];

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Case 3: Infinite Solutions (An Identity)</h2>
        <div className="space-y-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <p>Occasionally, the variables will cancel out and leave you with a statement that is *always* true, like `5 = 5`.</p>
                 <p className="mt-2">This is called an **identity**. It means that **any number** you choose for 'x' will make the equation true.</p>
                <div className="mt-4 p-4 bg-slate-200 dark:bg-slate-700 rounded text-center">
                    <BlockMath>2(x + 1) = 2x + 2 \implies 2x + 2 = 2x + 2 \implies 2 = 2</BlockMath>
                    <p className="mt-2 font-bold text-green-600">Always true! This equation has infinite solutions.</p>
                </div>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="infinite-solutions" slideTitle="Case 3: Infinite Solutions" moduleId="solving-equations-one-unknown" submoduleId="number-of-solutions">
            <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}