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

export default function ParenthesesOnBothSides() {
    const slideInteractions: Interaction[] = [{ id: 'parens-both-sides-concept', conceptId: 'parentheses-on-both-sides', conceptName: 'Parentheses on Both Sides', type: 'learning' }];

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
        <h2 className="text-2xl font-bold mb-4">Example: Variables on Both Sides</h2>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-center font-mono text-2xl mb-4">4(x - 1) = 2(x + 3)</p>
            <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Step 1: Distribute on both sides.</strong> This gives you `4x - 4 = 2x + 6`.</li>
                <li><strong>Step 2: Collect x-terms.</strong> Subtract 2x from both sides. This gives you `2x - 4 = 6`.</li>
                <li><strong>Step 3: Collect number terms.</strong> Add 4 to both sides. This gives you `2x = 10`.</li>
                <li><strong>Step 4: Solve for x.</strong> Divide by 2. The answer is `x = 5`.</li>
            </ol>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="parentheses-on-both-sides" 
            slideTitle="Parentheses and Variables on Both Sides" 
            moduleId="solving-equations-one-unknown" 
            submoduleId="equations-with-parentheses"
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