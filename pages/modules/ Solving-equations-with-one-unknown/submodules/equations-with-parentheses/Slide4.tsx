import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function CommonMistakesPractice() {
    const slideInteractions: Interaction[] = [{ id: 'common-mistakes-parens', conceptId: 'common-mistakes-parentheses', conceptName: 'Common Mistakes with Parentheses', type: 'learning' }];

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Watch Out! Common Mistakes</h2>
        <div className="space-y-4">
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Mistake #1: Forgetting to distribute to the second term.</h3>
                <p>When you see `3(x + 2)`, it's easy to mistakenly write `3x + 2`. Remember to multiply the 3 by **both** terms inside!</p>
            </div>
             <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Mistake #2: Sign errors with negatives.</h3>
                <p>When you distribute a negative, like `-2(x - 5)`, remember that a negative times a negative is a positive. The correct result is `-2x + 10`.</p>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="common-mistakes-parentheses" slideTitle="Common Mistakes and Practice" moduleId="solving-equations-one-unknown" submoduleId="equations-with-parentheses">
            <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}