import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- Main Slide Component ---
export default function PythagoreanConnectionSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [view, setView] = useState<'classic' | 'unitCircle'>('classic');

    const slideInteractions: Interaction[] = [
        { id: 'pythagorean-connection-concept', conceptId: 'pythagorean-identity', conceptName: 'The Pythagorean Connection', type: 'learning', description: 'Understanding the Pythagorean Identity through the Unit Circle.' }
    ];
    
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Panel: Theory (Unchanged) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Pythagorean Connection</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <p>The most important trigonometric identity is not a new rule to memorize—it's a concept you already know!</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
               <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 1: The Pythagorean Theorem</h3>
               <p>For any right-angled triangle, the relationship between the sides is always <InlineMath>{'a^2 + b^2 = c^2'}</InlineMath>.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
               <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step 2: The Unit Circle Connection</h3>
                <p>On the Unit Circle, the sides are simply the x-coordinate (<InlineMath>\cos\theta</InlineMath>), the y-coordinate (<InlineMath>\sin\theta</InlineMath>), and the radius (1). When we substitute these into the Pythagorean theorem, we get the final identity.</p>
            </div>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <p className="text-xl font-bold text-center text-slate-800 dark:text-slate-200">
                <BlockMath>{'\\sin^2\\theta + \\cos^2\\theta = 1'}</BlockMath>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: NEW Animated Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Visual Morpher</h3>
    <div className="flex-grow flex flex-col justify-center items-center relative h-80">
        {/* Circle */}
        <AnimatePresence>
        {view === 'unitCircle' && (
            <motion.div 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute w-64 h-64 border-2 border-slate-300 dark:border-slate-700 rounded-full"
            />
        )}
        </AnimatePresence>

        {/* Triangle */}
        <div className="relative w-48 h-24 origin-bottom-left" style={{ transform: 'scale(1.2)' }}>
            {/* Adjacent side (horizontal) */}
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5 }}
            />
            {/* Opposite side (vertical) */}
            <motion.div
                className="absolute bottom-0 left-0 w-1 bg-blue-500"
                initial={{ height: '0%' }}
                animate={{ height: '100%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
            />
            {/* Hypotenuse */}
            <motion.svg 
                className="absolute top-0 left-0 w-full h-full" 
                viewBox="0 0 100 50" 
                preserveAspectRatio="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <line x1="0" y1="50" x2="100" y2="0" stroke="#2563eb" strokeWidth="2" /> {/* blue-500 */}
            </motion.svg>
            
            {/* Labels */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={view} 
                    initial={{opacity:0, y: 10}} 
                    animate={{opacity:1, y: 0}} 
                    exit={{opacity:0, y: -10}} 
                    transition={{duration: 0.3}}
                >
                    {/* These labels will now show and hide based on the view */}
                    <p className="absolute bottom-[-1.5rem] left-[40%] font-bold text-xl text-blue-500">
                        {view === 'classic' ? <><InlineMath>a</InlineMath><span className="text-sm font-normal block">Adjacent</span></> : <InlineMath>\cos\theta</InlineMath>}
                    </p>
                    <p className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 font-bold text-xl text-blue-500">
                        {view === 'classic' ? <><InlineMath>b</InlineMath><span className="text-sm font-normal block">Opposite</span></> : <InlineMath>\sin\theta</InlineMath>}
                    </p>
                    <p className="absolute top-[0.5rem] left-[55%] font-bold text-xl text-blue-500">
                        {view === 'classic' ? <><InlineMath>c</InlineMath><span className="text-sm font-normal block">Hypotenuse</span></> : <InlineMath>1</InlineMath>}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    </div>

     <div className="text-center bg-slate-100 dark:bg-slate-900/50 rounded-lg p-4 h-20 flex items-center justify-center text-2xl">
        <AnimatePresence mode="wait">
            <motion.div key={view} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 0.5}}>
                {view === 'classic' ? <BlockMath>a^2 + b^2 = c^2</BlockMath> : <BlockMath>\sin^2\theta + \cos^2\theta = 1</BlockMath>}
            </motion.div>
        </AnimatePresence>
    </div>

    <div className="mt-6 flex justify-center gap-4">
        <button onClick={() => setView('classic')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'classic' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Show Classic Triangle</button>
        <button onClick={() => setView('unitCircle')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'unitCircle' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Show on Unit Circle</button>
    </div>
</div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="trig-intro-pythagorean-animated"
      slideTitle="The Pythagorean Connection"
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