import React, { useState } from 'react'; // NEW: Import useState
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
// NEW: Import necessary types
import { Interaction, TrackedInteraction, InteractionResponse, MatchingPair } from '../../../common-components/concept';

// NEW: Helper function to create the initial state object
const createInitialInteractions = (interactions: Interaction[]): Record<string, InteractionResponse> => {
    return interactions.reduce((acc, interaction) => {
        acc[interaction.id] = {
            interactionId: interaction.id,
            value: '',
            timestamp: 0,
        };
        return acc;
    }, {} as Record<string, InteractionResponse>);
};

export default function SolvingConsecutiveIntegerProblemsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'consecutive-integer-concept', conceptId: 'solving-consecutive-integer-problems', conceptName: 'Solving Consecutive Integer Problems', type: 'learning' }];

    // NEW: Create state to manage interactions
    const [localInteractions, setLocalInteractions] = useState(() => createInitialInteractions(slideInteractions));

    // NEW: Define the required handler function
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Example: Consecutive Integers</h2>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="mb-4"><strong>Problem:</strong> "The sum of three consecutive integers is 48. What are the integers?"</p>
            <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Define variables:</strong> Let the first integer be 'x'. Since they are consecutive, the next is 'x + 1', and the third is 'x + 2'.</li>
                <li><strong>Set up the equation:</strong> The sum is 48, so: `x + (x + 1) + (x + 2) = 48`.</li>
                <li><strong>Solve the equation:</strong>
                    <ul className="list-disc pl-5">
                        <li>Combine like terms: `3x + 3 = 48`</li>
                        <li>Subtract 3: `3x = 45`</li>
                        <li>Divide by 3: `x = 15`</li>
                    </ul>
                </li>
                <li><strong>Answer:</strong> The integers are 15, 16, and 17.</li>
            </ol>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="solving-consecutive-integer-problems" 
            slideTitle="Solving Consecutive Integer Problems" 
            moduleId="solving-equations-one-unknown" 
            submoduleId="equations-word-problems"
            // FIX: Pass the interactions state object
            interactions={localInteractions}
        >
            <TrackedInteraction 
                interaction={slideInteractions[0]}
                // FIX: Pass the interaction complete handler
                onInteractionComplete={handleInteractionComplete}
            >
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}