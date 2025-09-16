import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function CotangentCosecantSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [angle, setAngle] = useState(45); // Initial angle in degrees

    const slideInteractions: Interaction[] = [
        { id: 'cot-csc-concept', conceptId: 'cot-csc', conceptName: 'Cotangent and Cosecant', type: 'learning', description: 'Understanding Cotangent and Cosecant intuitively.' }
    ];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const angleInRadians = angle * (Math.PI / 180);
    let cotValue = 1 / Math.tan(angleInRadians);
    let cscValue = 1 / Math.sin(angleInRadians);

    // Handle asymptotes where sin(angle) is zero
    const isAsymptote = Math.abs(Math.sin(angleInRadians)) < 0.001;
    if (isAsymptote) {
        cotValue = NaN;
        cscValue = NaN;
    }
    
    // Coordinates for the point on "the ceiling" (y=1)
    const ceilingY = 1;
    const ceilingX = cotValue;

    const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Cotangent/Cosecant: The Ceiling</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <p>Now, imagine a ceiling touching the top of your dome. To reach it from the center, you need to build a ramp.</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The "Ceiling" Analogy</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>The "ceiling" is a horizontal line at <InlineMath>y = 1</InlineMath>.</li>
                <li><strong>Cotangent (<InlineMath>\cot\theta</InlineMath>):</strong> This is the <strong>horizontal width of the ramp's base</strong> on the floor.</li>
                <li><strong>Cosecant (<InlineMath>\csc\theta</InlineMath>):</strong> This is the <strong>full length of the ramp</strong> itself.</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Formulas</h3>
              <div className="space-y-3">
                  <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-300">Cotangent Formula</p>
                      <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded text-center my-1">
                          <InlineMath>{'\\cot(\\theta) = \\frac{\\cos(\\theta)}{\\sin(\\theta)}'}</InlineMath>
                      </div>
                      <p className="text-sm">This is the "run over rise" of the ramp.</p>
                  </div>
                   <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-300">Cosecant Formula</p>
                      <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded text-center my-1">
                          <InlineMath>{'\\csc(\\theta) = \\frac{1}{\\sin(\\theta)}'}</InlineMath>
                      </div>
                      <p className="text-sm">This is the reciprocal of the sine.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col items-center">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Interactive: The Ceiling Explorer</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Adjust the angle to see Cotangent and Cosecant.</p>

            <div className="flex justify-center items-center h-80 w-full relative">
                <svg className="w-full h-full" viewBox="-2.5 -1.5 5 3">
                    {/* Axes and Circle */}
                    <circle cx="0" cy="0" r="1" strokeWidth="0.03" className="stroke-black/20 dark:stroke-white/20" fill="transparent" />
                    <line x1="-2.4" y1="0" x2="2.4" y2="0" stroke="black" strokeWidth="0.02" opacity="0.3" className="dark:stroke-white" />
                    <line x1="0" y1="-1.4" x2="0" y2="1.4" stroke="black" strokeWidth="0.02" opacity="0.3" className="dark:stroke-white" />
                    
                    {/* The "Ceiling" line (y=1) */}
                    <line x1="-2.4" y1="1" x2="2.4" y2="1" stroke="black" strokeWidth="0.05" className="dark:stroke-white" />
                    <text x="-2.3" y="1.2" fontSize="0.12" className="fill-black dark:fill-white">The Ceiling</text>

                    {/* Animated Lines */}
                    {!isAsymptote && (
                        <>
                            {/* Cosecant Line (the ramp) */}
                            <motion.line x1="0" y1="0" x2={ceilingX} y2={ceilingY} stroke="#2563eb" strokeWidth="0.06" transition={{ duration: 0.1 }} />
                            {/* Cotangent Line (the ramp base) */}
                            <motion.line x1="0" y1="0" x2={ceilingX} y2="0" stroke="blue" strokeWidth="0.04" strokeDasharray="0.1, 0.1" transition={{ duration: 0.1 }} />
                            {/* Height line */}
                            <motion.line x1={ceilingX} y1="0" x2={ceilingX} y2={ceilingY} stroke="black" strokeWidth="0.03" className="dark:stroke-white" transition={{ duration: 0.1 }} />
                        </>
                    )}
                    
                    <text x="0.2" y="0.2" fontSize="0.12" className="fill-black dark:fill-white"><InlineMath>\theta</InlineMath></text>
                </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mb-6 p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg w-full">
                <div>
                    <p className="text-sm font-medium text-slate-500"><InlineMath>\theta</InlineMath></p>
                    <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">{angle}°</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500"><InlineMath>\cot\theta</InlineMath> (Ramp Width)</p>
                    <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
                        {isAsymptote ? 'Undefined' : cotValue.toFixed(2)}
                    </p>
                </div>
                 <div>
                    <p className="text-sm font-medium text-slate-500"><InlineMath>\csc\theta</InlineMath> (Ramp Length)</p>
                    <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
                        {isAsymptote ? 'Undefined' : cscValue.toFixed(2)}
                    </p>
                </div>
            </div>

            <input
                id="angle-slider"
                type="range"
                min="1" // Avoid 0
                max="179" // Avoid 180
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
      slideId="trig-intro-cotangent-cosecant" 
      slideTitle="Cotangent/Cosecant: The Ceiling" 
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