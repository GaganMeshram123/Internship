import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function SummaryAndPracticeSlide() {
    const slideInteractions: Interaction[] = [{ id: 'solutions-summary-concept', conceptId: 'solutions-summary', conceptName: 'Summary of Solutions', type: 'learning' }];

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Summary: How Many Solutions?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">One Solution</h3>
                <p>The variables simplify to a single answer (e.g., `x = 5`).</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">No Solution</h3>
                <p>The variables disappear, leaving a false statement (e.g., `3 = 5`).</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Infinite Solutions</h3>
                <p>The variables disappear, leaving a true statement (e.g., `7 = 7`).</p>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="solutions-summary" slideTitle="Summary and Practice" moduleId="solving-equations-one-unknown" submoduleId="number-of-solutions">
            <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}