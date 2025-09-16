import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- Data for the special angles with fractional values ---
const specialAngles: { [key: number]: { cos: string; sin: string } } = {
    0: { cos: '1', sin: '0' },
    30: { cos: '\\frac{\\sqrt{3}}{2}', sin: '\\frac{1}{2}' },
    45: { cos: '\\frac{\\sqrt{2}}{2}', sin: '\\frac{\\sqrt{2}}{2}' },
    60: { cos: '\\frac{1}{2}', sin: '\\frac{\\sqrt{3}}{2}' },
    90: { cos: '0', sin: '1' },
    120: { cos: '-\\frac{1}{2}', sin: '\\frac{\\sqrt{3}}{2}' },
    135: { cos: '-\\frac{\\sqrt{2}}{2}', sin: '\\frac{\\sqrt{2}}{2}' },
    150: { cos: '-\\frac{\\sqrt{3}}{2}', sin: '\\frac{1}{2}' },
    180: { cos: '-1', sin: '0' },
};

export default function SineCosineDomeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [angle, setAngle] = useState(45); // Angle in degrees

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { id: 'trig-as-percentages-concept', conceptId: 'trig-percentages', conceptName: 'Trigonometry as Percentages', type: 'learning', description: 'Understanding sine and cosine as percentages of a circle\'s radius.' }
  ];

  const cosineDecimal = Math.cos(angle * (Math.PI / 180));
  const sineDecimal = Math.sin(angle * (Math.PI / 180));
  
  const specialValue = specialAngles[angle];

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Sine/Cosine: The Dome Analogy</h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p><strong>Sine (sin):</strong> This is the <strong>screen height</strong>, measured from the floor up.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p><strong>Cosine (cos):</strong> This is the <strong>distance to the screen</strong> along the ground.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">Putting Numbers to Percentages</h4>
              <p>At 45°, the height and distance are equal: about 70.7% of the maximum. The exact value is <InlineMath>{'\\sin(45^\\circ) = \\cos(45^\\circ) = \\frac{\\sqrt{2}}{2}'}</InlineMath>.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">The "Aha!" Moment: Connecting to SOH CAH TOA</h4>
              <p>The <strong>Sine (height)</strong> is the side Opposite the angle, and the Cosine (distance) is the side Adjacent to the angle. The dome's radius is the Hypotenuse (with a value of 1).</p>
            </div>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">Beyond the Dome: Negative Values</h4>
              <p>Pointing "West" (more than 90°) makes your horizontal distance negative (Cosine becomes negative). This is how trigonometry describes a full 360° rotation.</p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Dome Explorer</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Drag the slider to change the angle.</p>
            
            <div className="grid grid-cols-2 gap-4 text-center mb-4 p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg min-h-[90px]">
                <div>
                    <p className="text-sm font-medium text-slate-500">Cosine Value</p>
                    <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                      {specialValue ? <InlineMath>{specialValue.cos}</InlineMath> : cosineDecimal.toFixed(3)}
                    </p>
                </div>
                 <div>
                    <p className="text-sm font-medium text-slate-500">Sine Value</p>
                    <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                      {specialValue ? <InlineMath>{specialValue.sin}</InlineMath> : sineDecimal.toFixed(3)}
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-center h-64 relative">
                <div className="w-64 h-32 border-2 border-slate-300 dark:border-slate-700 rounded-t-full absolute bottom-0"></div>
                <div className="w-64 h-px bg-slate-300 dark:border-slate-700 absolute bottom-0"></div>
                <motion.div 
                    className="absolute bottom-0 left-1/2 w-32 h-0.5 bg-slate-500 dark:bg-slate-400 origin-left"
                    animate={{ rotate: -angle }}
                />
                <motion.div
                    className="absolute bottom-0 left-1/2 h-2 bg-blue-500 rounded-full"
                    animate={{ width: `${Math.abs(cosineDecimal * 128)}px`, x: `${(cosineDecimal * 128) / 2}px` }}
                />
                <motion.p className="absolute bottom-4 font-bold text-blue-500" animate={{ x: `${(cosineDecimal * 128) / 2}px` }}>
                    <InlineMath>{"\\cos(\\theta)"}</InlineMath>
                </motion.p>
                <motion.div
                    className="absolute bottom-0 w-2 bg-blue-500 rounded-full"
                    style={{ originY: 1 }}
                    animate={{ height: `${sineDecimal * 128}px`, x: `${cosineDecimal * 128}px` }}
                />
                 <motion.p className="absolute left-1/2 font-bold text-blue-500" animate={{ x: `${cosineDecimal * 128 + 10}px`, bottom: `${(sineDecimal * 128)/2}px` }}>
                    <InlineMath>{"\\sin(\\theta)"}</InlineMath>
                </motion.p>
            </div>
            
            <div className="mt-6">
                <label htmlFor="angle-slider" className="font-medium text-slate-700 dark:text-slate-300">
                    Angle: {angle}°
                </label>
                <input
                    id="angle-slider"
                    type="range"
                    min="0"
                    max="180"
                    step="1"
                    value={angle}
                    onChange={(e) => setAngle(Math.round(Number(e.target.value)))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 mt-2"
                />
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="trig-intro-dome"
      slideTitle="Sine/Cosine: The Dome"
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