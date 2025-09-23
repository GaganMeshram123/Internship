import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function IntroDistributiveProperty() {
    // FIX: Added state for interactions
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideInteractions: Interaction[] = [{ id: 'distributive-property-intro', conceptId: 'distributive-property', conceptName: 'Intro to Distributive Property', type: 'learning' }];

    // FIX: Added the handler function
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">The Distributive Property</h2>
        <div className="space-y-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">The Rule for Parentheses</h3>
                <p>The distributive property is the key to solving equations with parentheses. It says that you must multiply the number outside the parentheses by <strong>every single term</strong> inside.</p>
                <p className="text-center font-mono text-xl mt-4 p-2 bg-slate-200 dark:bg-slate-700 rounded"><InlineMath>{'a(b + c) = ab + ac'}</InlineMath></p>
            </div>
             <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Analogy: Handing out Snacks</h3>
                <p>If you have 3 bags, and each bag contains 2 cookies and 1 apple, you have a total of 3×2=6 cookies and 3×1=3 apples.</p>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="intro-distributive-property" 
            slideTitle="Intro to the Distributive Property" 
            moduleId="solving-equations-one-unknown" 
            submoduleId="equations-with-parentheses"
            // FIX: Added the missing interactions prop
            interactions={localInteractions}
        >
            <TrackedInteraction 
                interaction={slideInteractions[0]}
                onInteractionComplete={handleInteractionComplete}
            >
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}