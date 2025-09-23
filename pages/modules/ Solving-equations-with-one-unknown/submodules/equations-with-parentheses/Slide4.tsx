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

export default function CommonMistakesPractice() {
    const slideInteractions: Interaction[] = [{ id: 'common-mistakes-parens', conceptId: 'common-mistakes-parentheses', conceptName: 'Common Mistakes with Parentheses', type: 'learning' }];

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
        <SlideComponentWrapper 
            slideId="common-mistakes-parentheses" 
            slideTitle="Common Mistakes and Practice" 
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