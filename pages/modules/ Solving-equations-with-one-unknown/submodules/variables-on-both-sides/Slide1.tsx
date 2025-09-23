import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction } from '../../../common-components/concept';

export default function IntroVariablesOnBothSides() {
    const slideInteractions: Interaction[] = [{ id: 'intro-vars-concept', conceptId: 'vars-both-sides-intro', conceptName: 'Intro to Variables on Both Sides', type: 'learning' }];
    
    // Placeholder for state and handlers if this becomes interactive
    // const [localInteractions, setLocalInteractions] = useState({});
    // const handleInteractionComplete = () => {};

    const slideContent = (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Intro: Variables on Both Sides</h2>
        <div className="space-y-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">The Goal: Isolate the Variable</h3>
                <p>When you see an equation with the variable (like 'x') on both sides, your main goal is to get all the 'x' terms on one side and all the plain numbers on the other.</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">The Golden Rule: Keep it Balanced!</h3>
                <p>Think of an equation as a balancing scale. Whatever you do to one side (like add 5, or subtract 2x), you MUST do the exact same thing to the other side to keep it balanced.</p>
                <div className="text-6xl text-center mt-4">⚖️</div>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper slideId="intro-vars-both-sides" slideTitle="Intro to Equations with Variables on Both Sides" moduleId="solving-equations-one-unknown" submoduleId="variables-on-both-sides">
            <TrackedInteraction interaction={slideInteractions[0]}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}