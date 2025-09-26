import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function IntroToCoordinatePlaneSlide1() {
    const slideInteractions: Interaction[] = [{ id: 'intro-to-coordinate-plane-part1', conceptId: 'intro-to-coordinate-plane', conceptName: 'Introduction to the Coordinate Plane - Part 1', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Introduction to the Coordinate Plane: GPS for Math!</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Concept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Main Roads: The Axes</h3>
            <p>Imagine a map. To find a specific spot, you need a system. The coordinate plane is a map for math made of two main "roads" called <strong>axes</strong>.</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
                <li><strong>The x-axis:</strong> The road that runs horizontally (left and right).
                    <ul className="list-circle pl-5 text-sm mt-1">
                        <li>Going right is for positive numbers.</li>
                        <li>Going left is for negative numbers.</li>
                    </ul>
                </li>
                <li><strong>The y-axis:</strong> The road that runs vertically (up and down).
                    <ul className="list-circle pl-5 text-sm mt-1">
                        <li>Going up is for positive numbers.</li>
                        <li>Going down is for negative numbers.</li>
                    </ul>
                </li>
            </ul>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">The Center of the World: The Origin</h4>
                <p className="mt-2">The point where these two roads cross is our starting point for everything. It's called the <strong>Origin</strong>, and its address is <InlineMath>{'(0, 0)'}</InlineMath>.</p>
            </div>
          </div>

          {/* Right Column: The "How-To" */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">A Point's Address: Coordinates</h3>
            <p>Every point has an address called an <strong>ordered pair</strong>, like <InlineMath>{'(x, y)'}</InlineMath>. It tells you exactly where to go!</p>
            <p className="mt-2 text-sm italic"><strong>Remember the rule:</strong> "You have to walk along the corridor (x-axis) before you can go up or down the stairs (y-axis)."</p>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 mt-auto rounded-lg text-sm">
                <p className="font-semibold mb-2">How to plot the point <InlineMath>{'(4, 3)'}</InlineMath>:</p>
                <ol className="list-decimal pl-5">
                    <li>Always start at the <strong>Origin</strong> <InlineMath>{'(0, 0)'}</InlineMath>.</li>
                    <li>The x-coordinate is 4, so move <strong>4 steps to the right</strong> (positive x-direction).</li>
                    <li>The y-coordinate is 3, so move <strong>3 steps up</strong> (positive y-direction).</li>
                    <li>Mark your point!</li>
                </ol>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="intro-to-coordinate-plane-part1" 
            slideTitle="Introduction to the Coordinate Plane - Part 1" 
            moduleId="coordinate-geometry" 
            submoduleId="the-coordinate-plane"
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