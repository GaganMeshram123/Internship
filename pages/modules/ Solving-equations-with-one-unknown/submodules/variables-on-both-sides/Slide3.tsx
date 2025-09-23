import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function EquationsWithFractions() {
    const slideInteractions: Interaction[] = [{ id: 'fractions-concept', conceptId: 'equations-with-fractions', conceptName: 'Tackling Equations with Fractions', type: 'learning' }];

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Tackling Equations with Fractions</h2>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">The Clearing Fractions Trick</h3>
            <p>The easiest way to solve equations with fractions is to get rid of them first! To do this, find the Least Common Denominator (LCD) of all the fractions, and multiply every single term in the equation by it.</p>
             <div className="mt-4 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                <p>This "clears" the fractions, leaving you with a simpler equation with only whole numbers.</p>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="equations-with-fractions" slideTitle="Tackling Equations with Fractions" moduleId="solving-equations-one-unknown" submoduleId="variables-on-both-sides">
            <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}