import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { QuizRenderer, QuizConfig } from '../../../common-components/QuizRenderer';
import { useThemeContext } from '@/lib/ThemeContext';

// Object Components
const FootballComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="rounded-full border-4 border-white bg-gradient-to-br from-orange-400 to-orange-600 relative"
    style={{ width: size, height: size }}
  >
    <div className="absolute inset-2 border-2 border-white rounded-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-1 bg-white rounded"></div>
    </div>
  </div>
);

const DoorComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="bg-gradient-to-b from-amber-600 to-amber-800 rounded-sm relative border-2 border-amber-900"
    style={{ width: size * 0.8, height: size }}
  >
    <div className="absolute top-1/2 right-1 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600"></div>
    <div className="absolute top-2 left-1 right-1 h-px bg-amber-900"></div>
    <div className="absolute bottom-2 left-1 right-1 h-px bg-amber-900"></div>
  </div>
);

const BoxComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="bg-gradient-to-br from-amber-700 to-amber-900 relative border-2 border-amber-900"
    style={{ width: size, height: size }}
  >
    <div className="absolute top-1 left-1 right-1 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded"></div>
    <div className="absolute bottom-1 left-1 right-1 h-1 bg-gradient-to-r from-transparent via-amber-900 to-transparent rounded"></div>
    <div className="absolute top-1 bottom-1 left-1 w-1 bg-gradient-to-b from-amber-400 to-amber-900 rounded"></div>
    <div className="absolute top-1 bottom-1 right-1 w-1 bg-gradient-to-b from-transparent to-amber-900 rounded"></div>
  </div>
);

// Interactive Animation Component for Force Moving Stationary Objects
function ForceAnimationDemo() {
  const [activeDemo, setActiveDemo] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();

  const demos = [
    {
      id: 'football',
      name: 'Football Kick',
      object: 'football',
      force: 'Foot',
      action: 'Kick',
      description: 'When you kick a football, it starts rolling — your foot\'s push gives it motion.'
    },
    {
      id: 'door',
      name: 'Door Push',
      object: 'door',
      force: 'Hand',
      action: 'Push',
      description: 'When you push a door, it opens.'
    },
    {
      id: 'box',
      name: 'Box Push',
      object: 'box',
      force: 'Hand',
      action: 'Push',
      description: 'When you push a box, it moves across the floor.'
    }
  ];

  const startAnimation = (demoId: string) => {
    setActiveDemo(demoId);
    setIsAnimating(true);
    
    // Reset animation after 3 seconds
    setTimeout(() => {
      setIsAnimating(false);
      setActiveDemo('');
    }, 3000);
  };

  const getObjectPosition = () => {
    if (!isAnimating) return 0;
    return 200; // Move 200px to the right
  };

  const renderObject = (objectType: string, size: number = 50) => {
    switch (objectType) {
      case 'football':
        return <FootballComponent size={size} />;
      case 'door':
        return <DoorComponent size={size} />;
      case 'box':
        return <BoxComponent size={size} />;
      default:
        return <div className="w-12 h-12 bg-gray-400 rounded"></div>;
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Interactive Force Demonstrations</h3>
      <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">Click on any example to see force in action!</p>
      
      {/* Demo Buttons */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => startAnimation(demo.id)}
            disabled={isAnimating}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              activeDemo === demo.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-slate-300 dark:border-slate-600 hover:border-blue-300'
            } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12">
                {renderObject(demo.object, 32)}
              </div>
              <div>
                <div className="font-medium">{demo.name}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{demo.action} to move</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Animation Area */}
      <div className="h-32 bg-slate-50 dark:bg-slate-700 rounded-lg relative overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600">
        {activeDemo ? (
          <div className="h-full flex items-center">
            {/* Force Arrow */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute left-4 flex items-center z-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-red-600 dark:text-red-400 mr-2">FORCE</span>
                    <svg width="60" height="20">
                      <defs>
                        <marker
                          id="arrowhead-force"
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="3"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
                        </marker>
                      </defs>
                      <line
                        x1="5"
                        y1="10"
                        x2="50"
                        y2="10"
                        stroke="#dc2626"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead-force)"
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Moving Object */}
            <motion.div
              className="absolute flex items-center justify-center"
              initial={{ x: 80 }}
              animate={{ 
                x: isAnimating ? getObjectPosition() + 80 : 80,
                rotate: activeDemo === 'football' ? [0, 360, 720] : 0
              }}
              transition={{ 
                duration: isAnimating ? 2.5 : 0,
                ease: activeDemo === 'football' ? "easeOut" : "easeInOut"
              }}
            >
              {activeDemo && renderObject(demos.find(d => d.id === activeDemo)?.object || '', 60)}
            </motion.div>

            {/* Motion Lines */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute left-20 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-8 bg-yellow-400 rounded"
                        animate={{ 
                          scaleY: [1, 0.5, 1],
                          x: [0, 40, 80, 120]
                        }}
                        transition={{ 
                          duration: 1,
                          delay: i * 0.1,
                          repeat: 1
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
            <p>Click an example above to see the animation!</p>
          </div>
        )}
      </div>

      {/* Description for active demo */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-400"
          >
            <p className="text-green-800 dark:text-green-200 font-medium">
              {demos.find(d => d.id === activeDemo)?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnimating && (
        <div className="mt-4 text-center">
          <motion.p
            className="text-blue-600 dark:text-blue-400 font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Watch how force causes motion!
          </motion.p>
        </div>
      )}
    </div>
  );
}

export default function ForceCanMoveObjectsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'force-motion-exploration',
      conceptId: 'force-motion',
      conceptName: 'Force and Motion Exploration',
      type: 'learning',
      description: 'Understanding how forces can move stationary objects'
    },
  ];
  
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
        id: 'stationary-object-force',
        question: 'What happens when you apply a force to a stationary object?',
        options: [
          'Nothing happens, it stays still',
          'It can start moving',
          'It becomes heavier',
          'It changes color'
        ],
        correctAnswer: 'It can start moving',
        explanation: 'When you apply a force to a stationary object, it can overcome the object\'s inertia and cause it to start moving. This is exactly what happens when you kick a football or push a door.'
      },
      {
        id: 'football-motion',
        question: 'A football is lying still on the ground. After you kick it, it rolls forward. What caused this motion?',
        options: [
          'The football wanted to move',
          'The force from your foot pushing it',
          'The wind blowing it',
          'Gravity pulling it forward'
        ],
        correctAnswer: 'The force from your foot pushing it',
        explanation: 'The force from your foot hitting the football is what causes it to start moving. Before the kick, the football was stationary. The push from your foot gives it the energy to roll forward.'
      },
      {
        id: 'door-opening',
        question: 'Why does a door open when you push it?',
        options: [
          'Doors automatically open',
          'The force you apply overcomes the door\'s resistance',
          'Air pressure opens the door',
          'The door handle pulls it open'
        ],
        correctAnswer: 'The force you apply overcomes the door\'s resistance',
        explanation: 'When you push a door, the force from your hand overcomes the door\'s inertia (tendency to stay still) and any friction in the hinges, causing it to rotate and open.'
      },
      {
        id: 'force-motion-principle',
        question: 'Complete this statement: "A stationary object can start moving when..."',
        options: [
          'it gets tired of being still',
          'a force is applied to it',
          'it reaches a certain age',
          'the temperature changes'
        ],
        correctAnswer: 'a force is applied to it',
        explanation: 'This is a fundamental principle in physics: a stationary object will remain stationary unless acted upon by an external force. When a force is applied, it can overcome the object\'s inertia and cause motion.'
      }
    ],
    title: 'Quick Check',
    conceptId: 'force-motion-understanding',
    conceptName: 'Force and Motion Quick Check',
    conceptDescription: 'Testing understanding of how forces cause motion in stationary objects',
    showProgress: true
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content and Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Force can move Stationary Objects</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200 font-medium text-lg">
                  A stationary (still) object can start moving when a force is applied to it.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-orange-600 dark:text-orange-400">Examples of Force Moving Objects:</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <FootballComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Kicking a Football</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        When you kick a football, it starts rolling — your foot's push gives it motion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <DoorComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Pushing a Door</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        When you push a door, it opens.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <BoxComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Moving a Box</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        When you push a heavy box, it slides across the floor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Understanding:</h4>
                <p className="text-blue-700 dark:text-blue-300">
                  Objects at rest tend to stay at rest until a force acts on them. This is why you need to apply force to move stationary objects like balls, doors, or boxes.
                </p>
              </div>
            </div>
          </div>

          {/* Force Direction Visualization */}
          
        </div>

        {/* Right Column - Interactive Animation and Quiz */}
        <div className="space-y-6">
          <ForceAnimationDemo />
          
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
      slideId="force-can-move-objects"
      slideTitle="Force can move Stationary Objects"
      moduleId="6-icse-physics-force"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}