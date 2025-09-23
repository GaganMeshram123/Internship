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

export default function TranslatingWordsToEquationsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'translating-words-concept', conceptId: 'translating-words-to-equations', conceptName: 'Translating Words to Equations', type: 'learning' }];
    
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
        <SlideComponentWrapper 
            slideId="translating-words-to-equations" 
            slideTitle="Translating Words to Equations" 
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