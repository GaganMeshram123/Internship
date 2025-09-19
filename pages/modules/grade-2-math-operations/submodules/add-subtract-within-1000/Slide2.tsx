import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

export default function SubtractingWithThreeDigitsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'subtract-within-1000-concept', conceptId: 'subtract-within-1000', conceptName: 'Subtracting within 1000', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const slideContent = (
        <div className="p-8">
            <h2 className="text-2xl font-bold">Subtracting within 1000</h2>
            {/* Your slide content and layout will go here */}
        </div>
    );

    return (
        <SlideComponentWrapper slideId="subtract-within-1000" slideTitle="Subtracting within 1000" moduleId="grade-2-math-operations" submoduleId="add-subtract-within-1000" interactions={localInteractions}>
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}