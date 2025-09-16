import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function TrigAsPercentagesSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [angle, setAngle] = useState(45); // Angle in degrees

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { id: 'trig-as-percentages-concept', conceptId: 'trig-percentages', conceptName: 'Trigonometry as Percentages', type: 'learning', description: 'Understanding sine and cosine as percentages of a circle\'s radius.' }
  ];

  // Calculate sine and cosine
  const cosine = Math.cos(angle * (Math.PI / 180));
  const sine = Math.sin(angle * (Math.PI / 180));

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Trigonometry as a GPS for a Circle 🌐</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <p>Trigonometry gives you the exact coordinates for any angle on a circle, expressed as a percentage of the circle's radius.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p><strong>Cosine (cos)</strong> is your <strong>horizontal (East/West)</strong> position.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p><strong>Sine (sin)</strong> is your <strong>vertical (North/South)</strong> position.</p>
            </div>
            {/* NEW: Added another example for clarity */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
               <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Example: Looking West</h4>
               <p>If you point straight behind you (180°), you are at your maximum distance West. Your horizontal position is -100% (<InlineMath>{'\\cos(180^\\circ) = -1'}</InlineMath>), and your vertical height is 0% (<InlineMath>{'\\sin(180^\\circ) = 0'}</InlineMath>).</p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive Circle</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Drag the slider to change the angle.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {/* Circle Viz */}
                <div className="relative w-48 h-48 flex-shrink-0">
                    <div className="w-full h-full border-2 border-slate-300 dark:border-slate-700 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-300 dark:bg-slate-700"></div>
                    <div className="absolute left-1/2 top-0 h-full w-px bg-slate-300 dark:bg-slate-700"></div>
                    <motion.div 
                        className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-blue-500 origin-left"
                        animate={{ rotate: -angle }}
                    />
                    <motion.div 
                        className="absolute top-1/2 left-1/2 w-4 h-4 -m-2 bg-slate-900 dark:bg-white rounded-full border-2 border-blue-500"
                        animate={{ rotate: -angle, x: '2400%' }}
                    />
                </div>

                {/* Bars and Readouts */}
                <div className="w-full sm:w-48 space-y-4">
                    <div>
                        <div className="flex justify-between font-mono text-sm">
                            <span>Cosine (x)</span>
                            <span>{cosine.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mt-1">
                            <motion.div 
                                className="bg-blue-500 h-4 rounded-full"
                                animate={{ width: `${(cosine + 1) / 2 * 100}%` }}
                            />
                        </div>
                    </div>
                     <div>
                        <div className="flex justify-between font-mono text-sm">
                            <span>Sine (y)</span>
                            <span>{sine.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mt-1">
                            <motion.div 
                                className="bg-blue-500 h-4 rounded-full"
                                animate={{ width: `${sine * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="angle-slider" className="font-medium text-slate-700 dark:text-slate-300">
                    Angle: {angle}°
                </label>
                <input
                    id="angle-slider"
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 mt-2"
                />
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="trig-intro-percentages"
      slideTitle="Trig as Percentages"
      moduleId="intuitive-trigonometry"
      submoduleId="how-to-learn-trigonometry-intuitively"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}