import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { QuizRenderer, QuizConfig } from '../../../common-components/QuizRenderer';
import { useThemeContext } from '@/lib/ThemeContext';

// Object Components
const BallComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="rounded-full border-4 border-white bg-gradient-to-br from-red-400 to-red-600 relative shadow-lg"
    style={{ width: size, height: size }}
  >
    <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-red-300 to-transparent opacity-50"></div>
  </div>
);

const HandComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg relative border-2 border-orange-600"
    style={{ width: size * 1.2, height: size }}
  >
    {/* Palm */}
    <div className="absolute inset-1 bg-gradient-to-br from-orange-200 to-orange-400 rounded"></div>
    {/* Fingers */}
    <div className="absolute -top-2 left-1 w-2 h-4 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t"></div>
    <div className="absolute -top-3 left-3 w-2 h-5 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t"></div>
    <div className="absolute -top-3 left-5 w-2 h-5 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t"></div>
    <div className="absolute -top-2 left-7 w-2 h-4 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t"></div>
  </div>
);

const BicycleComponent = ({ size = 40 }: { size?: number }) => (
  <div className="relative" style={{ width: size * 2, height: size }}>
    {/* Frame */}
    <div className="absolute top-1/2 left-2 right-2 h-1 bg-gray-600 transform -translate-y-1/2"></div>
    <div className="absolute top-1/4 left-1/3 w-1 h-1/2 bg-gray-600 transform rotate-45"></div>
    
    {/* Wheels */}
    <div 
      className="absolute top-1/2 left-0 rounded-full border-4 border-gray-800 bg-gray-300"
      style={{ width: size * 0.6, height: size * 0.6, transform: 'translate(0, -50%)' }}
    >
      <div className="absolute inset-2 rounded-full border-2 border-gray-600"></div>
    </div>
    <div 
      className="absolute top-1/2 right-0 rounded-full border-4 border-gray-800 bg-gray-300"
      style={{ width: size * 0.6, height: size * 0.6, transform: 'translate(0, -50%)' }}
    >
      <div className="absolute inset-2 rounded-full border-2 border-gray-600"></div>
    </div>
    
    {/* Seat */}
    <div className="absolute top-1/4 left-1/2 w-4 h-2 bg-black rounded transform -translate-x-1/2"></div>
  </div>
);

const BrakeComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="bg-gradient-to-br from-red-500 to-red-700 rounded relative border-2 border-red-800"
    style={{ width: size * 0.8, height: size }}
  >
    <div className="absolute inset-2 bg-gradient-to-br from-red-400 to-red-600 rounded"></div>
    <div className="absolute top-1/2 left-1/2 w-2 h-1 bg-white rounded transform -translate-x-1/2 -translate-y-1/2"></div>
  </div>
);

// Interactive Animation Component for Force Stopping Objects
function ForceStoppingDemo() {
  const [activeDemo, setActiveDemo] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();

  const demos = [
    {
      id: 'ball',
      name: 'Catching a Ball',
      object: 'ball',
      force: 'hands',
      action: 'Catch',
      description: 'When you catch a ball, your hands apply a force opposite to its motion and make it stop.'
    },
    {
      id: 'bicycle',
      name: 'Bicycle Brakes',
      object: 'bicycle',
      force: 'brakes',
      action: 'Brake',
      description: 'Pressing the brakes on a bicycle stops the wheels from turning.'
    }
  ];

  const startAnimation = (demoId: string) => {
    setActiveDemo(demoId);
    setIsAnimating(true);
    
    // Reset animation after 4 seconds
    setTimeout(() => {
      setIsAnimating(false);
      setActiveDemo('');
    }, 4000);
  };

  const getObjectPosition = () => {
    if (!isAnimating) return 150; // Start from right side
    return 80; // Move to left side (stopped)
  };

  const renderObject = (objectType: string, size: number = 50) => {
    switch (objectType) {
      case 'ball':
        return <BallComponent size={size} />;
      case 'hands':
        return <HandComponent size={size} />;
      case 'bicycle':
        return <BicycleComponent size={size} />;
      case 'brakes':
        return <BrakeComponent size={size} />;
      default:
        return <div className="w-12 h-12 bg-gray-400 rounded"></div>;
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Interactive Force Stopping Demonstrations</h3>
      <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">Click on any example to see force stopping motion!</p>
      
      {/* Demo Buttons */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => startAnimation(demo.id)}
            disabled={isAnimating}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              activeDemo === demo.id
                ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                : 'border-slate-300 dark:border-slate-600 hover:border-red-300'
            } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12">
                {renderObject(demo.object, 32)}
              </div>
              <div>
                <div className="font-medium">{demo.name}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{demo.action} to stop</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Animation Area */}
      <div className="h-32 bg-slate-50 dark:bg-slate-700 rounded-lg relative overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600">
        {activeDemo ? (
          <div className="h-full flex items-center">
            {/* Moving Object */}
            <motion.div
              className="absolute flex items-center justify-center"
              initial={{ x: 150 }}
              animate={{ 
                x: isAnimating ? getObjectPosition() : 150
              }}
              transition={{ 
                duration: isAnimating ? 2 : 0,
                ease: "easeOut"
              }}
            >
              {activeDemo && renderObject(demos.find(d => d.id === activeDemo)?.object || '', 60)}
            </motion.div>

            {/* Stopping Force */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute left-4 flex items-center z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <div className="flex items-center">
                    {renderObject(demos.find(d => d.id === activeDemo)?.force || '', 40)}
                    <span className="text-lg font-semibold text-red-600 dark:text-red-400 ml-2">STOP!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Force Arrow (opposite direction) */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute left-20 flex items-center z-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 }}
                >
                  <div className="flex items-center">
                    <svg width="60" height="20">
                      <defs>
                        <marker
                          id="arrowhead-stop"
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
                        x1="50"
                        y1="10"
                        x2="5"
                        y2="10"
                        stroke="#dc2626"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead-stop)"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400 ml-1">OPPOSING FORCE</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Motion Lines (fading out) */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute right-20 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                >
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-8 bg-blue-400 rounded"
                        animate={{ 
                          scaleY: [1, 0],
                          opacity: [1, 0]
                        }}
                        transition={{ 
                          duration: 1.5,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* "STOPPED" indicator */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute left-1/2 top-4 transform -translate-x-1/2 bg-red-100 dark:bg-red-900/50 px-3 py-1 rounded-full border-2 border-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                >
                  <span className="text-red-700 dark:text-red-300 font-bold text-sm">STOPPED!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
            <p>Click an example above to see the stopping animation!</p>
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
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-400"
          >
            <p className="text-red-800 dark:text-red-200 font-medium">
              {demos.find(d => d.id === activeDemo)?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnimating && (
        <div className="mt-4 text-center">
          <motion.p
            className="text-red-600 dark:text-red-400 font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Watch how opposing force stops motion!
          </motion.p>
        </div>
      )}
    </div>
  );
}

export default function ForceCanStopObjectsSlide() {
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
        id: 'stopping-force-direction',
        question: 'When you catch a moving ball, in which direction must your hands apply force to stop it?',
        options: [
          'In the same direction as the ball\'s motion',
          'Opposite to the ball\'s motion',
          'Perpendicular to the ball\'s motion',
          'It doesn\'t matter which direction'
        ],
        correctAnswer: 'Opposite to the ball\'s motion',
        explanation: 'To stop a moving object, you must apply a force in the opposite direction to its motion. This opposing force counteracts the object\'s momentum and brings it to rest.'
      },
      {
        id: 'bicycle-brakes',
        question: 'How do bicycle brakes stop the wheels from turning?',
        options: [
          'They make the wheels heavier',
          'They apply a force that opposes the wheel\'s rotation',
          'They cool down the wheels',
          'They change the wheel\'s shape'
        ],
        correctAnswer: 'They apply a force that opposes the wheel\'s rotation',
        explanation: 'Bicycle brakes work by applying friction force that opposes the rotation of the wheels. This opposing force gradually slows down and eventually stops the wheel\'s motion.'
      },
      {
        id: 'force-stops-motion',
        question: 'What happens when a force is applied opposite to an object\'s motion?',
        options: [
          'The object speeds up',
          'The object changes direction',
          'The object slows down or stops',
          'Nothing happens to the object'
        ],
        correctAnswer: 'The object slows down or stops',
        explanation: 'When a force is applied opposite to an object\'s direction of motion, it opposes the motion and causes the object to slow down. If the opposing force is strong enough, it can bring the object to a complete stop.'
      },
      {
        id: 'real-world-stopping',
        question: 'Which of these is an example of force stopping motion?',
        options: [
          'Pushing a door to open it',
          'Kicking a football to make it roll',
          'Using car brakes to stop at a red light',
          'Throwing a ball to a friend'
        ],
        correctAnswer: 'Using car brakes to stop at a red light',
        explanation: 'Using car brakes is a perfect example of applying force to stop motion. The brakes create friction that opposes the car\'s forward motion, gradually bringing it to a stop.'
      }
    ],
    title: 'Quick Check',
    conceptId: 'force-stopping-understanding',
    conceptName: 'Force Stopping Motion Quick Check',
    conceptDescription: 'Testing understanding of how forces can stop moving objects',
    showProgress: true
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content and Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Force can stop a moving object</h3>
            
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border-l-4 border-red-400">
                <p className="text-red-800 dark:text-red-200 font-medium text-lg">
                  A force can oppose motion and bring moving objects to rest.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-orange-600 dark:text-orange-400">Examples of Force Stopping Objects:</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <BallComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Catching a Ball</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        When you catch a ball, your hands apply a force opposite to its motion and make it stop.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <BicycleComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Bicycle Brakes</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Pressing the brakes on a bicycle stops the wheels from turning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Understanding:</h4>
                <p className="text-blue-700 dark:text-blue-300">
                  To stop a moving object, you need to apply a force in the <strong>opposite direction</strong> to its motion. This opposing force counteracts the object's momentum and brings it to rest.
                </p>
              </div>
            </div>
          </div>

          {/* Force Direction Visualization */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h4 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">Before and After Stopping Force</h4>
            
            <div className="space-y-6">
              <div className="text-center">
                <h5 className="font-medium mb-2 text-slate-700 dark:text-slate-300">BEFORE (Moving)</h5>
                <div className="flex items-center justify-center gap-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <BallComponent size={50} />
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-6 bg-green-500 rounded"
                        animate={{ 
                          scaleY: [1, 0.5, 1],
                          opacity: [1, 0.5, 1]
                        }}
                        transition={{ 
                          duration: 0.8,
                          delay: i * 0.1,
                          repeat: Infinity
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-lg text-green-600 dark:text-green-400 font-medium">Moving</span>
                </div>
              </div>

              <div className="text-center">
                <h5 className="font-medium mb-2 text-slate-700 dark:text-slate-300">OPPOSING FORCE APPLIED</h5>
                <div className="flex items-center justify-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                  <HandComponent size={40} />
                  <span className="text-red-600 dark:text-red-400 font-semibold">CATCH!</span>
                  <BallComponent size={50} />
                  <svg width="40" height="20">
                    <defs>
                      <marker
                        id="arrowhead-oppose"
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
                      x1="35"
                      y1="10"
                      x2="5"
                      y2="10"
                      stroke="#dc2626"
                      strokeWidth="3"
                      markerEnd="url(#arrowhead-oppose)"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <h5 className="font-medium mb-2 text-slate-700 dark:text-slate-300">AFTER (Stopped)</h5>
                <div className="flex items-center justify-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <BallComponent size={50} />
                  <span className="text-lg text-slate-600 dark:text-slate-400 font-medium">No motion</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Animation and Quiz */}
        <div className="space-y-6">
          <ForceStoppingDemo />
          
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
      slideId="force-can-stop-objects"
      slideTitle="Force can stop a moving object"
      moduleId="6-icse-physics-force"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}