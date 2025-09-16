import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function UnitCircleRadiansSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [radianValue, setRadianValue] = useState(1); // Controls the arc length, up to 2*PI

    const slideInteractions: Interaction[] = [
        { id: 'unit-circle-radians-concept', conceptId: 'unit-circle-radians', conceptName: 'The Unit Circle and Radians', type: 'learning', description: 'Understanding the Unit Circle and the concept of radians.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const angleInDegrees = radianValue * (180 / Math.PI);

    const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Unit Circle & Radians</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p>The <strong>Unit Circle</strong> is a circle with a radius of exactly <strong>1</strong>. It's the ultimate trig tool because the coordinates of any point on the circle are simply <InlineMath>{'(\\cos\\theta, \\sin\\theta)'}</InlineMath>.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
               <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">A Better Measurement: Radians</h3>
               <p>A <strong>radian</strong> is the angle created when you travel a distance of **one radius** along the circle's edge. A full circle is <InlineMath>2\pi</InlineMath> radians.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
               <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Key Conversions</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li><InlineMath>90^\circ = \pi/2</InlineMath> radians (Quarter Circle)</li>
                    <li><InlineMath>180^\circ = \pi</InlineMath> radians (Half Circle)</li>
                    <li><InlineMath>360^\circ = 2\pi</InlineMath> radians (Full Circle)</li>
                </ul>
                {/* NEW: Added example */}
                <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700/50">
                    <p className="text-sm">This pattern makes other angles easy to find. For example:</p>
                    <p className="text-center font-semibold mt-1 text-slate-700 dark:text-slate-300">
                        <InlineMath>{'45^\\circ = \\frac{\\pi}{4}'}</InlineMath> radians
                    </p>
                </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Radian Explorer</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Drag the slider to see the relationship between radians and degrees.</p>

            <div className="flex justify-center items-center h-64 my-4">
                <svg className="w-64 h-64" viewBox="-1.2 -1.2 2.4 2.4">
                    <circle cx="0" cy="0" r="1" strokeWidth="0.05" className="stroke-slate-200 dark:stroke-slate-700" fill="transparent" />
                    <motion.path
                        d="M 1 0 A 1 1 0 1 1 -1 0 A 1 1 0 1 1 1 0" // Full circle path
                        stroke="#3b82f6" strokeWidth="0.05" fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: radianValue / (2 * Math.PI) }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.line 
                        x1="0" y1="0" x2="1" y2="0"
                        stroke="black" strokeWidth="0.03"
                        className="dark:stroke-white"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: angleInDegrees }}
                        transition={{ duration: 0.5 }}
                        style={{ transformOrigin: 'center' }}
                    />
                </svg>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center mb-6">
                <div>
                    <p className="text-sm font-medium text-slate-500">Radians</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{radianValue.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Degrees</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{angleInDegrees.toFixed(1)}°</p>
                </div>
            </div>

            <input
                id="radian-slider"
                type="range"
                min="0"
                max={2 * Math.PI}
                step="0.01"
                value={radianValue}
                onChange={(e) => setRadianValue(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="trig-intro-unit-circle"
      slideTitle="The Unit Circle & Radians"
      moduleId="intuitive-trigonometry"
      submoduleId="how-to-learn-trigonometry-intuitively"
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