import React, { useState } from 'react'; // NEW: Import useState
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
// NEW: Import necessary types
import { Interaction, TrackedInteraction, InteractionResponse, MatchingPair } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

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

export default function OneSolutionSlide() {
    const slideInteractions: Interaction[] = [{ id: 'one-solution-concept', conceptId: 'one-solution', conceptName: 'Equations with One Solution', type: 'learning' }];
    
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
        <h2 className="text-2xl font-bold mb-4">Case 1: One Solution</h2>
        <div className="space-y-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <p>Most of the time, when you solve an equation, you will find one specific value for 'x' that makes the equation true. This is called having **one solution**.</p>
                <div className="mt-4 p-4 bg-slate-200 dark:bg-slate-700 rounded text-center">
                    <BlockMath>{String.raw`2x + 4 = 10 \implies 2x = 6 \implies x = 3`}</BlockMath>
                    <p className="mt-2">Only the number 3 makes this equation true.</p>
                </div>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="one-solution" 
            slideTitle="Case 1: One Solution" 
            moduleId="solving-equations-one-unknown" 
            submoduleId="number-of-solutions"
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