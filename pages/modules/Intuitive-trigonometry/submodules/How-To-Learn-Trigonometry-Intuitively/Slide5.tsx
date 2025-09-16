import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function EulersFormulaSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [angle, setAngle] = useState(90); // Angle in degrees

    const slideInteractions: Interaction[] = [
        { id: 'eulers-formula-concept', conceptId: 'eulers-formula', conceptName: 'Euler\'s Formula', type: 'learning', description: 'Understanding the connection between e, i, and trigonometry.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const angleInRadians = angle * (Math.PI / 180);
    const cosine = Math.cos(angleInRadians);
    const sine = Math.sin(angleInRadians);

    const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Euler's Formula: The Big Picture</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <p>How do we connect <InlineMath>e</InlineMath> (the number for growth) with circles? The answer is the imaginary number, <InlineMath>i</InlineMath>.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Intuition: Growth that Rotates</h3>
              <p>Growth in a normal direction (<InlineMath>{'e^x'}</InlineMath>) moves you along a straight line. But growth in an **imaginary direction** (<InlineMath>{'e^{ix}'}</InlineMath>) doesn't make you bigger—it **rotates** you around a circle.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Euler's Formula</h3>
              <p className="text-xl font-bold text-center text-slate-800 dark:text-slate-200">
                <BlockMath>{'e^{ix} = \\cos(x) + i \\sin(x)'}</BlockMath>
              </p>
            </div>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The "Most Beautiful Equation"</h3>
              <p>When you rotate by <InlineMath>\pi</InlineMath> radians (180°), you land at -1. This gives us the famous equation: <InlineMath>{'e^{i\\pi} + 1 = 0'}</InlineMath>, connecting the five most important constants in math.</p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Euler's Formula Explorer</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Drag the slider to rotate around the Unit Circle.</p>

            <div className="flex justify-center items-center h-64 my-4">
                <svg className="w-64 h-64" viewBox="-1.2 -1.2 2.4 2.4">
                    <circle cx="0" cy="0" r="1" strokeWidth="0.05" className="stroke-black/20 dark:stroke-white/20" fill="transparent" />
                    <line x1="-1.1" y1="0" x2="1.1" y2="0" stroke="black" strokeWidth="0.02" opacity="0.2" className="dark:stroke-white" />
                    <line x1="0" y1="-1.1" x2="0" y2="1.1" stroke="black" strokeWidth="0.02" opacity="0.2" className="dark:stroke-white" />
                    <text x="1.05" y="0.05" fontSize="0.12" className="fill-black dark:fill-white">1 (Real)</text>
                    <text x="-0.05" y="-1.05" fontSize="0.12" className="fill-black dark:fill-white">i (Imaginary)</text>
                    
                    <motion.line 
                        x1="0" y1="0" x2="1" y2="0"
                        stroke="#2563eb" strokeWidth="0.04"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: -angle }}
                        transition={{ duration: 0.5 }}
                        style={{ transformOrigin: 'center' }}
                    />
                     <motion.circle 
                        cx="1" cy="0" r="0.08"
                        fill="white" stroke="#2563eb" strokeWidth="0.04"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: -angle }}
                        transition={{ duration: 0.5 }}
                        style={{ transformOrigin: 'center' }}
                    />
                </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mb-6 p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                <div>
                    <p className="text-sm font-medium text-slate-500">Angle (x)</p>
                    <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">{angle}°</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500"><InlineMath>\cos(x)</InlineMath></p>
                    <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">{cosine.toFixed(2)}</p>
                </div>
                 <div>
                    <p className="text-sm font-medium text-slate-500"><InlineMath>\sin(x)</InlineMath></p>
                    <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">{sine.toFixed(2)}</p>
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
      slideId="trig-intro-eulers"
      slideTitle="Euler's Formula: The Big Picture"
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