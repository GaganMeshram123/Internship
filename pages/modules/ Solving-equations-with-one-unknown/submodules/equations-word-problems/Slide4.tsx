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

export default function SolvingPerimeterProblemsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'perimeter-problems-concept', conceptId: 'solving-perimeter-problems', conceptName: 'Solving Perimeter Problems', type: 'learning' }];

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
        <h2 className="text-2xl font-bold mb-4">Example: Perimeter Problems</h2>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="mb-4"><strong>Problem:</strong> "The length of a rectangle is 5 cm more than its width. If the perimeter is 50 cm, what are the dimensions?"</p>
            <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Define variables:</strong> Let the width be 'w'. The length is 'w + 5'.</li>
                <li><strong>Set up the equation:</strong> The formula for perimeter is P = 2l + 2w. So: `50 = 2(w + 5) + 2w`.</li>
                <li><strong>Solve the equation:</strong>
                    <ul className="list-disc pl-5">
                        <li>Distribute: `50 = 2w + 10 + 2w`</li>
                        <li>Combine like terms: `50 = 4w + 10`</li>
                        <li>Subtract 10: `40 = 4w`</li>
                        <li>Divide by 4: `10 = w`</li>
                    </ul>
                </li>
                <li><strong>Answer:</strong> The width is 10 cm, and the length is 10 + 5 = 15 cm.</li>
            </ol>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="solving-perimeter-problems" 
            slideTitle="Solving Perimeter Problems" 
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