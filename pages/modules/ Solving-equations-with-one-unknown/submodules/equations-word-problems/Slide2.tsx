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

export default function SolvingAgeProblemsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'age-problems-concept', conceptId: 'solving-age-problems', conceptName: 'Solving Age Problems', type: 'learning' }];

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
        <SlideComponentWrapper 
            slideId="solving-age-problems" 
            slideTitle="Solving Age Problems" 
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