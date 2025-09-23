import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function SolvingAgeProblemsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'age-problems-concept', conceptId: 'solving-age-problems', conceptName: 'Solving Age Problems', type: 'learning' }];

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Example: Solving Age Problems</h2>
         <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="mb-4"><strong>Problem:</strong> "A father is 3 times as old as his son. In 10 years, the father will be twice as old as his son. How old are they now?"</p>
            <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Define variables:</strong> Let the son's age be 'x'. Then the father's age is '3x'.</li>
                <li><strong>Set up the future equation:</strong> In 10 years, the son will be 'x + 10' and the father will be '3x + 10'. The problem says the father will be twice as old, so: `3x + 10 = 2(x + 10)`.</li>
                <li><strong>Solve the equation:</strong>
                    <ul className="list-disc pl-5">
                        <li>Distribute: `3x + 10 = 2x + 20`</li>
                        <li>Subtract 2x: `x + 10 = 20`</li>
                        <li>Subtract 10: `x = 10`</li>
                    </ul>
                </li>
                <li><strong>Answer:</strong> The son is 10 years old, and the father is 3 * 10 = 30 years old.</li>
            </ol>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="solving-age-problems" slideTitle="Solving Age Problems" moduleId="solving-equations-one-unknown" submoduleId="equations-word-problems">
             <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}