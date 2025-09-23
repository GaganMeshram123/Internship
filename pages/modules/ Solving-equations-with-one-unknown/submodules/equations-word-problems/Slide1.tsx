import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function TranslatingWordsToEquationsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'translating-words-concept', conceptId: 'translating-words-to-equations', conceptName: 'Translating Words to Equations', type: 'learning' }];
    
    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Translating Words to Equations</h2>
        <div className="space-y-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">The First Step: Be a Detective!</h3>
                <p>The hardest part of any word problem is turning the story into a mathematical equation. Look for "clue words" that tell you which operation to use.</p>
            </div>
             <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Common Clue Words</h3>
                <ul className="list-disc pl-5">
                    <li>"Sum," "more than," "increased by" usually mean **addition (+)**.</li>
                    <li>"Difference," "less than," "decreased by" usually mean **subtraction (-)**.</li>
                    <li>"Product," "times," "of" usually mean **multiplication (×)**.</li>
                    <li>"Quotient," "per," "divided by" usually mean **division (÷)**.</li>
                    <li>"Is," "equals," "gives" usually mean the **equals sign (=)**.</li>
                </ul>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="translating-words-to-equations" slideTitle="Translating Words to Equations" moduleId="solving-equations-one-unknown" submoduleId="equations-word-problems">
            <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}