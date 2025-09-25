import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingProportionalSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'rates-proportional-relationships-overview', conceptId: 'rates-proportional-relationships-overview', conceptName: 'Rates & Proportional Relationships Overview', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Rates & Proportional Relationships</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Core Concepts */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            
            {/* Section 1: What is a Rate? */}
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Understanding Rates</h3>
              <p>A rate compares two different quantities. The key word is often "<strong>per</strong>". A <strong>unit rate</strong> is the rate for exactly <strong>one</strong> of an item.</p>
              <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
                <li><strong>Price:</strong> Onions at <InlineMath>{'₹40'}</InlineMath> per kg</li>
                <li><strong>Speed:</strong> A train at <InlineMath>{'80'}</InlineMath> km/hr</li>
                <li><strong>Unit Rate Example:</strong> 5 pens cost <InlineMath>{'₹50'}</InlineMath>, so the unit rate is <InlineMath>{'₹10'}</InlineMath> per pen.</li>
              </ul>
            </div>

            {/* Section 2: Proportional Relationships */}
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Identifying Proportionality</h3>
              <p>A relationship is proportional when the <strong>unit rate is always constant</strong>. Let's say one Vada Pav costs <InlineMath>{'₹15'}</InlineMath>.</p>
              {/* Table */}
              <div className="my-3 border rounded-lg overflow-hidden border-slate-300 dark:border-slate-600 text-sm">
                  <div className="flex bg-slate-100 dark:bg-slate-700 font-bold"><div className="w-1/3 text-center p-2 border-r">Vada Pav (x)</div><div className="w-1/3 text-center p-2 border-r">Cost (y)</div><div className="w-1/3 text-center p-2">Ratio (y/x)</div></div>
                  <div className="flex border-t"><div className="w-1/3 text-center p-2 border-r">1</div><div className="w-1/3 text-center p-2 border-r"><InlineMath>{'₹15'}</InlineMath></div><div className="w-1/3 text-center p-2">15</div></div>
                  <div className="flex border-t"><div className="w-1/3 text-center p-2 border-r">4</div><div className="w-1/3 text-center p-2 border-r"><InlineMath>{'₹60'}</InlineMath></div><div className="w-1/3 text-center p-2">15</div></div>
              </div>
              <p>This constant value (15) is the <strong>Constant of Proportionality (k)</strong>. This gives us the equation: <InlineMath>{'y = kx'}</InlineMath>, or <InlineMath>{'y = 15x'}</InlineMath>.</p>
            </div>
          </div>

          {/* Right Column: Application & Problem Solving */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">

            {/* Section 3: Proportional vs Non-Proportional */}
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Non-Proportional Test</h3>
              <p>An auto-rickshaw fare is <strong>non-proportional</strong>. It has a minimum starting fare (e.g., <InlineMath>{'₹23'}</InlineMath>) plus a cost per km.</p>
              <p className="mt-2">It fails the test because the cost for 0 km is not <InlineMath>{'₹0'}</InlineMath>, so the ratio of cost-to-distance isn't constant.</p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded-lg p-3 mt-3">A proportional relationship <strong>must</strong> start at the origin (0, 0).</div>
            </div>

            {/* Section 4: Solving a Problem */}
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Putting It to Use</h3>
              <p className="italic">A worker earns <InlineMath>{'₹2,400'}</InlineMath> for <InlineMath>{'8'}</InlineMath> days of work. How much will they earn in <InlineMath>{'11'}</InlineMath> days?</p>
              <ol className="list-decimal pl-5 mt-2 space-y-2 text-sm">
                  <li><strong>Find the unit rate (k):</strong><br/>
                      <InlineMath>{'k = \\frac{₹2400}{8 \\text{ days}} = ₹300 \\text{ per day}'}</InlineMath>
                  </li>
                  <li><strong>Write the equation:</strong> <InlineMath>{'y = 300x'}</InlineMath></li>
                  <li><strong>Solve for 11 days (<InlineMath>{'x = 11'}</InlineMath>):</strong><br/>
                      <InlineMath>{'y = 300(11) = 3300'}</InlineMath>
                  </li>
              </ol>
              <p className="mt-3 font-bold text-center bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">Answer: The worker will earn <InlineMath>{'₹3,300'}</InlineMath>.</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="rates-proportional-relationships-overview" 
            slideTitle="Rates & Proportional Relationships Overview" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-proportional-relationships"
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