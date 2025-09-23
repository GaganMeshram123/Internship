import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function IntroDistributiveProperty() {
    const slideInteractions: Interaction[] = [{ id: 'distributive-property-intro', conceptId: 'distributive-property', conceptName: 'Intro to Distributive Property', type: 'learning' }];
    
    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">The Distributive Property</h2>
        <div className="space-y-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">The Rule for Parentheses</h3>
                <p>The distributive property is the key to solving equations with parentheses. It says that you must multiply the number outside the parentheses by **every single term** inside.</p>
                <p className="text-center font-mono text-xl mt-4 p-2 bg-slate-200 dark:bg-slate-700 rounded">a(b + c) = ab + ac</p>
            </div>
             <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Analogy: Handing out Snacks</h3>
                <p>If you have 3 bags, and each bag contains 2 cookies and 1 apple, you have a total of 3x2=6 cookies and 3x1=3 apples.</p>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="intro-distributive-property" slideTitle="Intro to the Distributive Property" moduleId="solving-equations-one-unknown" submoduleId="equations-with-parentheses">
            <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}