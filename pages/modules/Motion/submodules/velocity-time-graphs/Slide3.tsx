import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- INTERACTIVE COMPONENT TO VISUALIZE ACCELERATION VECTORS ---
// This component now manages 4 animation states to cover all linear acceleration scenarios.

const scenarios = [
  { 
    id: 'positive_v_positive_a', 
    vDirection: 'right', 
    aDirection: 'right', 
    title: 'Positive Acceleration',
    description: 'Speeding up in the positive direction.' 
  },
  { 
    id: 'positive_v_negative_a', 
    vDirection: 'right', 
    aDirection: 'left', 
    title: 'Negative Acceleration',
    description: 'Slowing down in the positive direction.' 
  },
  { 
    id: 'negative_v_negative_a', 
    vDirection: 'left', 
    aDirection: 'left', 
    title: 'Negative Acceleration',
    description: 'Speeding up in the negative direction.' 
  },
  { 
    id: 'negative_v_positive_a', 
    vDirection: 'left', 
    aDirection: 'right', 
    title: 'Positive Acceleration',
    description: 'Slowing down in the negative direction.' 
  },
];

const AccelerationVectorAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentScenario = scenarios[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % scenarios.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };
  
  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-4">
      <svg viewBox="0 0 300 100" className="w-full h-auto" aria-labelledby="animationTitle">
        <title id="animationTitle">Animation of a truck with velocity and acceleration vectors.</title>
        
        <motion.g 
          id="truck-group"
          animate={{ scaleX: currentScenario.vDirection === 'right' ? 1 : -1 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: 'center' }}
        >
          <g id="truck">
            <path d="M 140 60 L 140 40 L 160 40 L 170 50 L 170 60 z" fill="#d1d5db" />
            <rect x="145" y="60" width="40" height="10" fill="#9ca3af" />
            <circle cx="152" cy="70" r="5" fill="#4b5563" />
            <circle cx="178" cy="70" r="5" fill="#4b5563" />
          </g>
        </motion.g>

        <AnimatePresence mode="wait">
          {/* Velocity Vector */}
          {currentScenario.vDirection === 'right' ? (
            <motion.g key="v-right" variants={arrowVariants} initial="hidden" animate="visible" exit="exit" fill="#3b82f6">
              <line x1="155" y1="55" x2="220" y2="55" stroke="#3b82f6" strokeWidth="4" />
              <path d="M 215 50 L 225 55 L 215 60 z" />
              <text x="230" y="58" fontSize="10" fill="#3b82f6">v</text>
            </motion.g>
          ) : (
            <motion.g key="v-left" variants={arrowVariants} initial="hidden" animate="visible" exit="exit" fill="#3b82f6">
              <line x1="145" y1="55" x2="80" y2="55" stroke="#3b82f6" strokeWidth="4" />
              <path d="M 85 50 L 75 55 L 85 60 z" />
              <text x="65" y="58" fontSize="10" fill="#3b82f6">v</text>
            </motion.g>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
           {/* Acceleration Vector */}
           {currentScenario.aDirection === 'right' ? (
            <motion.g key="a-right" variants={arrowVariants} initial="hidden" animate="visible" exit="exit" fill="#ef4444">
              <line x1="155" y1="45" x2="210" y2="45" stroke="#ef4444" strokeWidth="2" />
              <path d="M 205 40 L 215 45 L 205 50 z" />
              <text x="220" y="48" fontSize="10" fill="#ef4444">a</text>
            </motion.g>
          ) : (
            <motion.g key="a-left" variants={arrowVariants} initial="hidden" animate="visible" exit="exit" fill="#ef4444">
              <line x1="145" y1="45" x2="90" y2="45" stroke="#ef4444" strokeWidth="2" />
              <path d="M 95 40 L 85 45 L 95 50 z" />
              <text x="75" y="48" fontSize="10" fill="#ef4444">a</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
      
      <div className="w-full text-center mt-4">
        <div className="h-16">
          <AnimatePresence mode="wait">
              <motion.div
                  key={currentScenario.id}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
              >
                  <h4 className="text-lg font-semibold text-blue-500">{currentScenario.title}</h4>
                  <p className="text-sm text-slate-400">{currentScenario.description}</p>
              </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg transition-colors">Next Example</button>
          <button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-5 py-2 rounded-lg transition-colors">Reset</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN SLIDE COMPONENT ---
export default function VelocityTimeGraphsSlide2() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Meaning of the Sign</h3>
            <p className="text-lg leading-relaxed">
              Since acceleration is a vector, its sign (+ or -) is very important. It tells us about the direction of the change in velocity.
            </p>
          </div>
          
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Positive Acceleration</h3>
            <p className="text-lg leading-relaxed">
              This can mean the object is <strong>speeding up</strong> in the positive direction (v →, a →) OR <strong>slowing down</strong> in the negative direction (v ←, a →).
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Negative Acceleration</h3>
            <p className="text-lg leading-relaxed">
             This can mean the object is <strong>slowing down</strong> in the positive direction (v →, a ←) OR <strong>speeding up</strong> in the negative direction (v ←, a ←).
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Visualizing Acceleration Vectors</h3>
            <AccelerationVectorAnimation />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="vtg-acceleration-sign"
      slideTitle="Positive, Negative, and Zero Acceleration"
      moduleId="motion"
      submoduleId="velocity-time-graphs"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}