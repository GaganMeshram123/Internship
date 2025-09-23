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

export default function NoSolutionSlide() {
    const slideInteractions: Interaction[] = [{ id: 'no-solution-concept', conceptId: 'no-solution', conceptName: 'Equations with No Solution', type: 'learning' }];

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
        <h2 className="text-2xl font-bold mb-4">Case 2: No Solution (A Contradiction)</h2>
        <div className="space-y-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <p>Sometimes when you try to solve an equation, the variables will cancel out completely, leaving you with a statement that is impossible, like `3 = 7`.</p>
                <p className="mt-2">This is called a **contradiction**. It means there is **no value** of 'x' that could ever make the equation true.</p>
                <div className="mt-4 p-4 bg-slate-200 dark:bg-slate-700 rounded text-center">
                    <BlockMath>{String.raw`x + 3 = x + 7 \implies 3 = 7`}</BlockMath>
                    <p className="mt-2 font-bold text-red-600">Impossible! This equation has no solution.</p>
                </div>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="no-solution" 
            slideTitle="Case 2: No Solution" 
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