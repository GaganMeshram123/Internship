import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { QuizRenderer, QuizConfig } from '../../../common-components/QuizRenderer';
import { useThemeContext } from '@/lib/ThemeContext';

// Object Components
const SpongeComponent = ({ size = 40, compressed = false }: { size?: number; compressed?: boolean }) => (
  <motion.div 
    className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg relative border-2 border-yellow-600"
    style={{ 
      width: compressed ? size * 0.7 : size, 
      height: size 
    }}
    animate={{ 
      width: compressed ? size * 0.7 : size,
      scaleY: compressed ? 0.8 : 1
    }}
    transition={{ duration: 0.5 }}
  >
    {/* Sponge holes */}
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-yellow-100 rounded-full"
        style={{
          width: compressed ? 3 : 4,
          height: compressed ? 3 : 4,
          top: `${20 + (i % 2) * 30}%`,
          left: `${15 + Math.floor(i / 2) * 25}%`
        }}
      />
    ))}
  </motion.div>
);

const RubberBandComponent = ({ size = 40, stretched = false }: { size?: number; stretched?: boolean }) => (
  <motion.div 
    className="bg-gradient-to-r from-red-400 to-red-600 rounded-full border-2 border-red-700"
    style={{ 
      width: stretched ? size * 1.5 : size, 
      height: size * 0.3 
    }}
    animate={{ 
      width: stretched ? size * 1.5 : size
    }}
    transition={{ duration: 0.5 }}
  >
    <div className="absolute inset-1 bg-gradient-to-r from-red-300 to-red-500 rounded-full"></div>
  </motion.div>
);

const ClayComponent = ({ size = 40, deformed = false }: { size?: number; deformed?: boolean }) => (
  <motion.div 
    className="bg-gradient-to-br from-orange-600 to-orange-800 relative border-2 border-orange-900"
    style={{ 
      width: size, 
      height: size,
      borderRadius: deformed ? '20% 80% 60% 40%' : '10px'
    }}
    animate={{ 
      borderRadius: deformed ? '20% 80% 60% 40%' : '10px',
      scaleX: deformed ? 1.2 : 1,
      scaleY: deformed ? 0.8 : 1
    }}
    transition={{ duration: 0.5 }}
  >
    <div className="absolute inset-2 bg-gradient-to-br from-orange-500 to-orange-700 rounded"></div>
  </motion.div>
);

const HandPressComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg relative border-2 border-orange-600"
    style={{ width: size, height: size * 0.8 }}
  >
    <div className="absolute inset-1 bg-gradient-to-br from-orange-200 to-orange-400 rounded"></div>
    {/* Fingers */}
    <div className="absolute -top-2 left-1 w-1.5 h-3 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t"></div>
    <div className="absolute -top-2.5 left-2.5 w-1.5 h-4 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t"></div>
    <div className="absolute -top-2.5 left-4 w-1.5 h-4 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t"></div>
    <div className="absolute -top-2 left-5.5 w-1.5 h-3 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t"></div>
  </div>
);

// Interactive Animation Component for Force Changing Shape
function ForceShapeDemo() {
  const [activeDemo, setActiveDemo] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [objectState, setObjectState] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();

  const demos = [
    {
      id: 'sponge',
      name: 'Squeeze Sponge',
      object: 'sponge',
      action: 'Squeeze',
      description: 'Squeezing a sponge makes it thinner.',
      component: SpongeComponent
    },
    {
      id: 'rubber',
      name: 'Stretch Rubber Band',
      object: 'rubber',
      action: 'Stretch',
      description: 'Stretching a rubber band makes it longer.',
      component: RubberBandComponent
    },
    {
      id: 'clay',
      name: 'Press Clay',
      object: 'clay',
      action: 'Press',
      description: 'Pressing clay or dough changes its shape.',
      component: ClayComponent
    }
  ];

  const startAnimation = (demoId: string) => {
    setActiveDemo(demoId);
    setIsAnimating(true);
    setObjectState(false);
    
    // Change shape after 1 second
    setTimeout(() => setObjectState(true), 1000);
    
    // Reset animation after 4 seconds
    setTimeout(() => {
      setIsAnimating(false);
      setActiveDemo('');
      setObjectState(false);
    }, 4000);
  };

  const renderObject = (demo: any, isChanged: boolean) => {
    const Component = demo.component;
    switch (demo.id) {
      case 'sponge':
        return <Component size={60} compressed={isChanged} />;
      case 'rubber':
        return <Component size={60} stretched={isChanged} />;
      case 'clay':
        return <Component size={60} deformed={isChanged} />;
      default:
        return <div className="w-12 h-12 bg-gray-400 rounded"></div>;
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Interactive Shape Change Demonstrations</h3>
      <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">Click on any material to see how force changes its shape!</p>
      
      {/* Demo Buttons */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => startAnimation(demo.id)}
            disabled={isAnimating}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              activeDemo === demo.id
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30'
                : 'border-slate-300 dark:border-slate-600 hover:border-orange-300'
            } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12">
                {demo.component && <demo.component size={32} />}
              </div>
              <div>
                <div className="font-medium">{demo.name}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{demo.action} to change shape</div>
              </div>
            </div>
          </button>
        ))}
      </div>

       {/* Animation Area */}
      {<div className="h-32 bg-slate-50 dark:bg-slate-700 rounded-lg relative overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600">
        {activeDemo ? (
          <div className="h-full flex items-center justify-center">
            {/* Object being changed */}
            <div className="flex items-center justify-center">
              {renderObject(demos.find(d => d.id === activeDemo)!, objectState)}
            </div>

            {/* Force Application */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute top-4 left-4 flex items-center z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <HandPressComponent size={32} />
                  <div className="ml-2">
                    <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                      {demos.find(d => d.id === activeDemo)?.action.toUpperCase()}!
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Force arrows */}
            <AnimatePresence>
              {isAnimating && objectState && (
                <>
                  {activeDemo === 'sponge' && (
                    <motion.div
                      className="absolute top-1/2 left-1/3 transform -translate-y-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <svg width="40" height="20">
                        <defs>
                          <marker
                            id="arrowhead-compress"
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                          >
                            <polygon points="0 0, 10 3, 0 6" fill="#ea580c" />
                          </marker>
                        </defs>
                        <line x1="5" y1="10" x2="30" y2="10" stroke="#ea580c" strokeWidth="3" markerEnd="url(#arrowhead-compress)" />
                        <line x1="35" y1="10" x2="10" y2="10" stroke="#ea580c" strokeWidth="3" markerEnd="url(#arrowhead-compress)" />
                      </svg>
                    </motion.div>
                  )}
                  
                  {activeDemo === 'rubber' && (
                    <motion.div
                      className="absolute top-1/2 left-1/4 right-1/4 transform -translate-y-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <svg width="100%" height="20">
                        <defs>
                          <marker
                            id="arrowhead-stretch"
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                          >
                            <polygon points="0 0, 10 3, 0 6" fill="#ea580c" />
                          </marker>
                        </defs>
                        <line x1="20%" y1="10" x2="5%" y2="10" stroke="#ea580c" strokeWidth="3" markerEnd="url(#arrowhead-stretch)" />
                        <line x1="80%" y1="10" x2="95%" y2="10" stroke="#ea580c" strokeWidth="3" markerEnd="url(#arrowhead-stretch)" />
                      </svg>
                    </motion.div>
                  )}
                  
                  {activeDemo === 'clay' && (
                    <motion.div
                      className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <svg width="40" height="40">
                        <defs>
                          <marker
                            id="arrowhead-press"
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                          >
                            <polygon points="0 0, 10 3, 0 6" fill="#ea580c" />
                          </marker>
                        </defs>
                        <line x1="20" y1="5" x2="20" y2="30" stroke="#ea580c" strokeWidth="3" markerEnd="url(#arrowhead-press)" />
                      </svg>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>

            {/* Shape change indicator */}
            <AnimatePresence>
              {isAnimating && objectState && (
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="px-4 py-2 rounded-full border-2 bg-orange-100 dark:bg-orange-900/50 border-orange-400 text-orange-700 dark:text-orange-300">
                    <span className="text-sm font-bold">SHAPE CHANGED!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
            <p>Click a material above to see the shape change animation!</p>
          </div>
        )}
      </div>
}
      {/* Description for active demo */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg border-l-4 border-orange-400"
          >
            <p className="text-orange-800 dark:text-orange-200 font-medium">
              {demos.find(d => d.id === activeDemo)?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnimating && (
        <div className="mt-4 text-center">
          <motion.p
            className="text-orange-600 dark:text-orange-400 font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Watch how force changes shape and size!
          </motion.p>
        </div>
      )}
    </div>
  );
} 

export default function ForceCanChangeShapeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const { isDarkMode } = useThemeContext();
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Quiz configuration
  const quizConfig: QuizConfig = {
    questions: [
      {
        id: 'flexible-materials',
        question: 'Which type of materials can easily change shape when force is applied?',
        options: [
          'Hard and rigid materials like rocks',
          'Flexible or soft materials like sponges and clay',
          'All materials change shape equally',
          'No materials can change shape'
        ],
        correctAnswer: 'Flexible or soft materials like sponges and clay',
        explanation: 'Flexible or soft materials like sponges, rubber bands, and clay can easily change their shape when force is applied because their particles can move and rearrange more easily than in rigid materials.'
      },
      {
        id: 'sponge-compression',
        question: 'What happens to a sponge when you squeeze it?',
        options: [
          'It becomes longer',
          'It becomes thinner and compressed',
          'It changes color',
          'Nothing happens'
        ],
        correctAnswer: 'It becomes thinner and compressed',
        explanation: 'When you squeeze a sponge, you apply force that compresses it, making it thinner and smaller. The sponge\'s flexible structure allows it to compress and then return to its original shape when released.'
      },
      {
        id: 'rubber-band-stretch',
        question: 'When you stretch a rubber band, what changes about it?',
        options: [
          'Its color changes',
          'It becomes longer',
          'It becomes heavier',
          'Its temperature increases'
        ],
        correctAnswer: 'It becomes longer',
        explanation: 'When you stretch a rubber band by applying force at both ends, it becomes longer. The elastic material allows it to extend and then return to its original length when the force is removed.'
      },
      {
        id: 'shape-change-examples',
        question: 'Which of these is an example of force changing shape?',
        options: [
          'A book sitting on a shelf',
          'Molding clay into a different shape',
          'A car driving at constant speed',
          'A light bulb glowing'
        ],
        correctAnswer: 'Molding clay into a different shape',
        explanation: 'Molding clay into a different shape is a perfect example of force changing the shape of an object. Clay is soft and malleable, so applying force can reshape it into various forms.'
      }
    ],
    title: 'Quick Check',
    conceptId: 'force-shape-understanding',
    conceptName: 'Force and Shape Change Quick Check',
    conceptDescription: 'Testing understanding of how forces can change the shape and size of objects',
    showProgress: true
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content and Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Force can change the size and shape</h3>
            
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-400">
                <p className="text-orange-800 dark:text-orange-200 font-medium text-lg">
                  Some materials are flexible or soft, so force can easily change their shape or size.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-amber-600 dark:text-amber-400">Examples of Force Changing Shape:</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <SpongeComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Squeezing a Sponge</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Squeezing a sponge makes it thinner.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <RubberBandComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Stretching a Rubber Band</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Stretching a rubber band makes it longer.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <ClayComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Pressing Clay or Dough</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Pressing clay or dough changes its shape.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Understanding:</h4>
                <p className="text-blue-700 dark:text-blue-300">
                  Different materials respond differently to force. <strong>Flexible materials</strong> like sponges, rubber, and clay can change shape easily, while <strong>rigid materials</strong> like rocks and metals resist shape changes.
                </p>
              </div>
            </div>
          </div>

          {/* Material Types Visualization */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h4 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">Types of Materials</h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <h5 className="font-semibold mb-2 text-green-800 dark:text-green-200">Flexible Materials</h5>
                <p className="text-green-700 dark:text-green-300 mb-2">
                  <strong>Easy to change shape:</strong>
                </p>
                <div className="flex items-center gap-4">
                  <SpongeComponent size={30} />
                  <RubberBandComponent size={30} />
                  <ClayComponent size={30} />
                  <span className="text-sm">Sponge, Rubber, Clay</span>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <h5 className="font-semibold mb-2 text-red-800 dark:text-red-200">Rigid Materials</h5>
                <p className="text-red-700 dark:text-red-300 mb-2">
                  <strong>Resist shape changes:</strong>
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-600 rounded border-2 border-gray-800"></div>
                  <div className="w-8 h-8 bg-amber-800 rounded border-2 border-amber-900"></div>
                  <div className="w-8 h-8 bg-blue-800 rounded border-2 border-blue-900"></div>
                  <span className="text-sm">Metal, Wood, Plastic</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Animation and Quiz */}
        <div className="space-y-6">
          <ForceShapeDemo />
          
          <QuizRenderer
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="force-can-change-shape"
      slideTitle="Force can change the size and shape"
      moduleId="6-icse-physics-force"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}