import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';

export default function LinearModelsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'line-of-best-fit', conceptId: 'line-of-best-fit', conceptName: 'The Line of Best Fit', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">The Line of Best Fit</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Definition */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Finding the Trend Line</h3>
            <p>A **line of best fit** (or trend line) is a straight line drawn through the middle of the points on a scatter plot.</p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-grow flex flex-col justify-center">
                <p className="font-bold">The Goal:</p>
                <p>To summarize the trend by being as close as possible to all the data points.</p>
                <ul className="list-disc pl-5 mt-2 text-sm">
                    <li>It should follow the general direction of the points.</li>
                    <li>It should have roughly the same number of points above the line as below it.</li>
                </ul>
            </div>
          </div>

          {/* Right Column: Visual Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Which Line is Best?</h3>
             <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[A scatter plot with three lines. Line A is too low. Line B is too steep. Line C goes through the middle of the points.]</p>
            </div>
            <p className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center">
                <strong>Line C is the best fit.</strong> It represents the overall trend of the data most accurately.
            </p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="line-of-best-fit" 
            slideTitle="The Line of Best Fit" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-models"
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