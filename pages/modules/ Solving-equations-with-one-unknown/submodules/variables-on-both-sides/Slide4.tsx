import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function VariableInDenominator() {
    const slideInteractions: Interaction[] = [{ id: 'denominator-concept', conceptId: 'variable-in-denominator', conceptName: 'Variables in the Denominator', type: 'learning' }];

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Variables in the Denominator</h2>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">What to do when 'x' is on the bottom?</h3>
            <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Identify Restrictions:</strong> First, figure out what values 'x' cannot be (because the denominator can never be zero).</li>
                <li><strong>Multiply to Clear:</strong> Multiply both sides of the equation by the expression in the denominator. This will cancel it out and move the variable to the top.</li>
                <li><strong>Solve Normally:</strong> Solve the remaining equation as usual.</li>
            </ol>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="variable-in-denominator" slideTitle="Variables in the Denominator" moduleId="solving-equations-one-unknown" submoduleId="variables-on-both-sides">
             <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}