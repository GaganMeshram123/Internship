import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SolutionsToLinearEquationsSlide4() {
    const slideInteractions: Interaction[] = [{ id: 'infinite-solutions-graph', conceptId: 'infinite-solutions-graph', conceptName: 'Infinite Solutions and Their Graph', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Infinite Solutions and Their Graph</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Concept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">How Many Solutions Are There?</h3>
            <p>We've seen that you can pick *any* number for 'x' and find a 'y' that works. You could pick 0, 1, 10, -50, or even 0.25!</p>
            <p className="mt-3">Since you can keep picking numbers for 'x' forever, how many total solutions can there be?</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-auto text-center">
                <p className="font-semibold">There are an <strong className="text-xl">INFINITE</strong> number of solutions to a single linear equation with two variables.</p>
            </div>
          </div>

          {/* Right Column: The Visual Proof */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Graph Shows All of Them</h3>
            <p>How can we show an infinite number of solutions? We draw a line!</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of y = -x + 3, with points like (0,3), (1,2), and (3,0) marked]</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 rounded-lg p-3 mt-4 text-center">
                <p className="font-bold">A line is a picture of infinity!</p>
                <p className="text-sm mt-1">It's a collection of infinite points packed together, where each point is an (x, y) solution to the equation.</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="infinite-solutions-graph" 
            slideTitle="Infinite Solutions and Their Graph" 
            moduleId="linear-equations-and-functions" 
            submoduleId="solutions-to-linear-equations"
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