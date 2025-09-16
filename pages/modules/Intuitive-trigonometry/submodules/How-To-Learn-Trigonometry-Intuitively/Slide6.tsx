import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function TangentSecantSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [angle, setAngle] = useState(45); // Initial angle in degrees

    const slideInteractions: Interaction[] = [
        { id: 'tangent-secant-concept', conceptId: 'tangent-secant', conceptName: 'Tangent and Secant', type: 'learning', description: 'Understanding Tangent and Secant intuitively.' }
    ];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const angleInRadians = angle * (Math.PI / 180);
    let tanValue = Math.tan(angleInRadians);
    let secValue = 1 / Math.cos(angleInRadians);

    const isAsymptote = Math.abs(Math.cos(angleInRadians)) < 0.001;
    if (isAsymptote) {
        tanValue = NaN;
        secValue = NaN;
    }

    const unitCircleX = Math.cos(angleInRadians);
    const unitCircleY = Math.sin(angleInRadians);
    const wallX = 1;
    const wallY = tanValue;

    const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Tangent/Secant: The Wall</h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The "Wall" Analogy</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Imagine a Unit Circle and a vertical "wall" touching it at the far right edge (where x=1).</li>
                    <li><strong>Tangent (<InlineMath>\tan\theta</InlineMath>):</strong> This is the <strong>height</strong> of the point on the wall you're looking at.</li>
                    <li><strong>Secant (<InlineMath>\sec\theta</InlineMath>):</strong> This is the <strong>length of the "ladder"</strong> from the center to that point on the wall.</li>
                </ul>
            </div>

            {/* NEW: Added example with formulas */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Formulas</h3>
              <div className="space-y-3">
                  <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-300">Tangent Formula</p>
                      <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded text-center my-1">
                          <InlineMath>{'\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}'}</InlineMath>
                      </div>
                      <p className="text-sm">This is the slope of the ladder (rise over run).</p>
                  </div>
                   <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-300">Secant Formula</p>
                      <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded text-center my-1">
                          <InlineMath>{'\\sec(\\theta) = \\frac{1}{\\cos(\\theta)}'}</InlineMath>
                      </div>
                      <p className="text-sm">This is the reciprocal of the cosine.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization (Unchanged) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col items-center">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Interactive: The Wall Explorer</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Adjust the angle to see Tangent and Secant.</p>
            <div className="flex justify-center items-center h-80 w-full relative">
                <svg className="w-full h-full" viewBox="-1.5 -1.5 3 3">
                    <circle cx="0" cy="0" r="1" strokeWidth="0.03" className="stroke-black/20 dark:stroke-white/20" fill="transparent" />
                    <line x1="-1.4" y1="0" x2="1.4" y2="0" stroke="black" strokeWidth="0.02" opacity="0.3" className="dark:stroke-white" />
                    <line x1="0" y1="-1.4" x2="0" y2="1.4" stroke="black" strokeWidth="0.02" opacity="0.3" className="dark:stroke-white" />
                    <line x1="1" y1="-1.4" x2="1" y2="1.4" stroke="black" strokeWidth="0.05" className="dark:stroke-white" />
                    <text x="1.05" y="1.2" fontSize="0.12" className="fill-black dark:fill-white">The Wall</text>
                    <motion.circle cx={unitCircleX} cy={unitCircleY} r="0.08" fill="blue" transition={{ duration: 0.1 }} />
                    <motion.line x1="0" y1="0" x2={unitCircleX} y2={unitCircleY} stroke="#2563eb" strokeWidth="0.04" transition={{ duration: 0.1 }} />
                    {!isAsymptote && (
                        <>
                            <motion.line x1="0" y1="0" x2={wallX} y2={wallY} stroke="#2563eb" strokeWidth="0.04" strokeDasharray="0.1 0.1" transition={{ duration: 0.1 }} />
                            <motion.circle cx={wallX} cy={wallY} r="0.08" fill="white" stroke="blue" strokeWidth="0.04" transition={{ duration: 0.1 }} />
                            <motion.line x1="1" y1="0" x2="1" y2={wallY} stroke="blue" strokeWidth="0.06" transition={{ duration: 0.1 }} />
                        </>
                    )}
                    <text x="0.2" y="-0.05" fontSize="0.12" className="fill-black dark:fill-white"><InlineMath>\theta</InlineMath></text>
                    {!isAsymptote && (
                        <>
                            <text x="1.05" y={wallY / 2} fontSize="0.12" textAnchor="start" className="fill-blue-600 dark:fill-blue-400"><InlineMath>\tan\theta</InlineMath></text>
                            <text x={wallX/2 + wallX/4} y={wallY/2 + 0.1} fontSize="0.12" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400"><InlineMath>\sec\theta</InlineMath></text>
                        </>
                    )}
                </svg>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mb-6 p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg w-full">
                <div>
                    <p className="text-sm font-medium text-slate-500"><InlineMath>\theta</InlineMath></p>
                    <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">{angle}°</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500"><InlineMath>\tan\theta</InlineMath></p>
                    <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">{isAsymptote ? 'Undefined' : tanValue.toFixed(2)}</p>
                </div>
                 <div>
                    <p className="text-sm font-medium text-slate-500"><InlineMath>\sec\theta</InlineMath></p>
                    <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">{isAsymptote ? 'Undefined' : secValue.toFixed(2)}</p>
                </div>
            </div>
            <input
                id="angle-slider"
                type="range"
                min="0"
                max="360"
                step="1"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="trig-intro-tangent-secant" 
      slideTitle="Tangent/Secant: The Wall" 
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