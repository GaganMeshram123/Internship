import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';

export default function RecognizingFunctionsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'functions-from-mapping-diagrams', conceptId: 'functions-from-mapping-diagrams', conceptName: 'Recognizing Functions from Mapping Diagrams', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Recognizing Functions from Mapping Diagrams</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">The rule is simple: **An input can only have ONE arrow coming out of it.**</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: IS a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">✅ IS a Function</h3>
            <p className="text-sm">Each input in the Domain has only one arrow leaving it.</p>
            <div className="flex-grow my-4 flex items-center justify-around">
                <div className="text-center"><div className="font-bold mb-2">Domain</div><div className="border-2 rounded-xl p-4 space-y-3"><div>A</div><div>B</div><div>C</div></div></div>
                <div className="text-2xl flex flex-col space-y-3"><span>→</span><span>→</span><span>→</span></div>
                <div className="text-center"><div className="font-bold mb-2">Range</div><div className="border-2 rounded-xl p-4 space-y-3"><div>1</div><div>2</div><div>3</div></div></div>
            </div>
             <p className="mt-auto p-3 bg-green-50 dark:bg-green-900/30 rounded-md">It's okay for two inputs (like B and C) to point to the same output. The main rule isn't broken.</p>
          </div>

          {/* Right Column: IS NOT a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">❌ IS NOT a Function</h3>
            <p className="text-sm">The input "Student 2" has two arrows coming out of it.</p>
            <div className="flex-grow my-4 flex items-center justify-around">
                <div className="text-center"><div className="font-bold mb-2">Students</div><div className="border-2 rounded-xl p-4 space-y-3"><div>Student 1</div><div className="font-bold text-red-500">Student 2</div></div></div>
                <div className="text-2xl flex flex-col space-y-3"><span>→</span><span className="font-bold text-red-500">→</span><span className="font-bold text-red-500">→</span></div>
                <div className="text-center"><div className="font-bold mb-2">Sports</div><div className="border-2 rounded-xl p-4 space-y-3"><div>Cricket</div><div>Football</div><div>Hockey</div></div></div>
            </div>
            <p className="mt-auto p-3 bg-red-50 dark:bg-red-900/30 rounded-md">This is not a function because one input ('Student 2') is mapped to two different outputs.</p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="functions-from-mapping-diagrams" 
            slideTitle="Recognizing Functions from Mapping Diagrams" 
            moduleId="linear-equations-and-functions" 
            submoduleId="recognizing-functions"
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