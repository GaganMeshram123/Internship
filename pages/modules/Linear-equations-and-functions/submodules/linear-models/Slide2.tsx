import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';

export default function LinearModelsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'scatter-plots-and-trends', conceptId: 'scatter-plots-and-trends', conceptName: 'Scatter Plots and Trends', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Visualizing Data with Scatter Plots</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">A **scatter plot** uses dots to represent data. It's the first step to see if there's a linear trend.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          
          {/* Positive Trend */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 text-center">Positive Trend</h3>
             <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-2 rounded-lg flex items-center justify-center p-2 border">
                <p className="text-slate-500 text-sm">[Scatter plot where dots generally go UPHILL]</p>
            </div>
            <p className="text-xs text-center">As one value increases, the other also tends to increase (e.g., Temperature vs. Ice Cream Sales).</p>
          </div>

          {/* Negative Trend */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 text-center">Negative Trend</h3>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-2 rounded-lg flex items-center justify-center p-2 border">
                <p className="text-slate-500 text-sm">[Scatter plot where dots generally go DOWNHILL]</p>
            </div>
            <p className="text-xs text-center">As one value increases, the other tends to decrease (e.g., Kilometers Driven vs. Petrol in Tank).</p>
          </div>
          
          {/* No Trend */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-lg font-semibold text-center">No Trend</h3>
             <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-2 rounded-lg flex items-center justify-center p-2 border">
                <p className="text-slate-500 text-sm">[Scatter plot where dots are randomly scattered with no pattern]</p>
            </div>
            <p className="text-xs text-center">There is no clear relationship between the two values (e.g., Student's Shoe Size vs. Exam Marks).</p>
          </div>

        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="scatter-plots-and-trends" 
            slideTitle="Scatter Plots and Trends" 
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