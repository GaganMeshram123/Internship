import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { QuizRenderer, QuizConfig } from '../../../common-components/QuizRenderer';
import { useThemeContext } from '@/lib/ThemeContext';

// Object Components
const BicycleAdvancedComponent = ({ size = 40, speed = 1 }: { size?: number; speed?: number }) => (
  <div className="relative" style={{ width: size * 2, height: size }}>
    {/* Frame */}
    <div className="absolute top-1/2 left-2 right-2 h-1 bg-blue-600 transform -translate-y-1/2"></div>
    <div className="absolute top-1/4 left-1/3 w-1 h-1/2 bg-blue-600 transform rotate-45"></div>
    
    {/* Wheels with rotation based on speed */}
    <motion.div 
      className="absolute top-1/2 left-0 rounded-full border-4 border-gray-800 bg-gray-300"
      style={{ width: size * 0.6, height: size * 0.6, transform: 'translate(0, -50%)' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2 / speed, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-2 rounded-full border-2 border-gray-600"></div>
      <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2"></div>
    </motion.div>
    <motion.div 
      className="absolute top-1/2 right-0 rounded-full border-4 border-gray-800 bg-gray-300"
      style={{ width: size * 0.6, height: size * 0.6, transform: 'translate(0, -50%)' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2 / speed, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-2 rounded-full border-2 border-gray-600"></div>
      <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2"></div>
    </motion.div>
    
    {/* Seat */}
    <div className="absolute top-1/4 left-1/2 w-4 h-2 bg-black rounded transform -translate-x-1/2"></div>
    
    {/* Handlebars */}
    <div className="absolute top-1/3 left-2/3 w-3 h-1 bg-gray-700 rounded"></div>
  </div>
);

const PedalComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg relative border-2 border-yellow-700"
    style={{ width: size * 0.8, height: size * 0.6 }}
  >
    <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded"></div>
    <div className="absolute top-1/2 left-1/2 w-2 h-1 bg-yellow-800 rounded transform -translate-x-1/2 -translate-y-1/2"></div>
  </div>
);

const SpeedometerComponent = ({ speed, size = 60 }: { speed: number; size?: number }) => (
  <div 
    className="relative bg-white dark:bg-gray-800 rounded-full border-4 border-gray-600"
    style={{ width: size, height: size }}
  >
    {/* Speed dial background */}
    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900">
      {/* Speed markings */}
      {[0, 1, 2, 3].map((mark) => (
        <div
          key={mark}
          className="absolute w-0.5 h-3 bg-gray-600 dark:bg-gray-400"
          style={{
            top: '10%',
            left: '50%',
            transformOrigin: '50% 40px',
            transform: `translateX(-50%) rotate(${mark * 45 - 90}deg)`
          }}
        />
      ))}
      
      {/* Speed numbers */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">3</div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">0</div>
      <div className="absolute top-1/2 left-1 transform -translate-y-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">1</div>
      <div className="absolute top-1/2 right-1 transform -translate-y-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">2</div>
      
      {/* Speed needle */}
      <div
        className="absolute w-0.5 h-6 bg-red-600 rounded-full"
        style={{
          top: '50%',
          left: '50%',
          transformOrigin: '50% 100%',
          transform: `translateX(-50%) rotate(${speed * 45 - 90}deg)`
        }}
      />
      
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
    
    {/* Speed label */}
    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">
      SPEED
    </div>
  </div>
);

// Interactive Animation Component for Force Changing Speed
function ForceSpeedDemo() {
  const [activeDemo, setActiveDemo] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentSpeed, setCurrentSpeed] = useState<number>(1);
  const { isDarkMode } = useThemeContext();

  const demos = [
    {
      id: 'pedal',
      name: 'Pedal Harder',
      action: 'Speed Up',
      description: 'Pedal a bicycle harder, and it speeds up!',
      speedChange: 'increase'
    },
    {
      id: 'brake',
      name: 'Apply Brakes',
      action: 'Slow Down',
      description: 'Press the brakes, and it slows down.',
      speedChange: 'decrease'
    }
  ];

  const startAnimation = (demoId: string) => {
    setActiveDemo(demoId);
    setIsAnimating(true);
    
    const demo = demos.find(d => d.id === demoId);
    if (demo?.speedChange === 'increase') {
      // Speed up animation
      setCurrentSpeed(1);
      setTimeout(() => setCurrentSpeed(2), 1000);
      setTimeout(() => setCurrentSpeed(3), 2000);
    } else {
      // Slow down animation
      setCurrentSpeed(3);
      setTimeout(() => setCurrentSpeed(2), 1000);
      setTimeout(() => setCurrentSpeed(1), 2000);
    }
    
    // Reset animation after 4 seconds
    setTimeout(() => {
      setIsAnimating(false);
      setActiveDemo('');
      setCurrentSpeed(1);
    }, 4000);
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Interactive Speed Change Demonstrations</h3>
      <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">Click on any action to see how force changes speed!</p>
      
      {/* Demo Buttons */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => startAnimation(demo.id)}
            disabled={isAnimating}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              activeDemo === demo.id
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                : 'border-slate-300 dark:border-slate-600 hover:border-green-300'
            } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12">
                {demo.id === 'pedal' ? <PedalComponent size={32} /> : <div className="w-8 h-8 bg-red-600 rounded border-2 border-red-800"></div>}
              </div>
              <div>
                <div className="font-medium">{demo.name}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{demo.action}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Animation Area */}
      <div className="h-40 bg-slate-50 dark:bg-slate-700 rounded-lg relative overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 p-4">
        <div className="h-full flex items-center justify-between">
          {/* Bicycle */}
          <div className="flex-1 flex justify-center">
            <BicycleAdvancedComponent size={60} speed={currentSpeed} />
          </div>
          
          {/* Speedometer */}
          <div className="flex flex-col items-center gap-2">
            <SpeedometerComponent speed={currentSpeed} size={80} />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Speed: {currentSpeed}
            </div>
          </div>
        </div>

        {/* Force Indicators */}
        <AnimatePresence>
          {isAnimating && activeDemo === 'pedal' && (
            <motion.div
              className="absolute top-4 left-4 flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PedalComponent size={32} />
              <div className="ml-2">
                <svg width="60" height="20">
                  <defs>
                    <marker
                      id="arrowhead-speed-up"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="#16a34a" />
                    </marker>
                  </defs>
                  <line
                    x1="5"
                    y1="10"
                    x2="50"
                    y2="10"
                    stroke="#16a34a"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead-speed-up)"
                  />
                </svg>
                <div className="text-xs font-semibold text-green-600 dark:text-green-400">SPEED UP!</div>
              </div>
            </motion.div>
          )}
          
          {isAnimating && activeDemo === 'brake' && (
            <motion.div
              className="absolute top-4 right-4 flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mr-2">
                <svg width="60" height="20">
                  <defs>
                    <marker
                      id="arrowhead-slow-down"
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
                    markerEnd="url(#arrowhead-slow-down)"
                  />
                </svg>
                <div className="text-xs font-semibold text-red-600 dark:text-red-400">SLOW DOWN!</div>
              </div>
              <div className="w-8 h-8 bg-red-600 rounded border-2 border-red-800"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Speed change indicator */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`px-4 py-2 rounded-full border-2 ${
                activeDemo === 'pedal' 
                  ? 'bg-green-100 dark:bg-green-900/50 border-green-400 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/50 border-red-400 text-red-700 dark:text-red-300'
              }`}>
                <span className="text-sm font-bold">
                  {activeDemo === 'pedal' ? 'SPEEDING UP!' : 'SLOWING DOWN!'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Description for active demo */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-4 p-4 rounded-lg border-l-4 ${
              activeDemo === 'pedal'
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-red-50 dark:bg-red-900/30 border-red-400'
            }`}
          >
            <p className={`font-medium ${
              activeDemo === 'pedal'
                ? 'text-green-800 dark:text-green-200'
                : 'text-red-800 dark:text-red-200'
            }`}>
              {demos.find(d => d.id === activeDemo)?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnimating && (
        <div className="mt-4 text-center">
          <motion.p
            className="text-purple-600 dark:text-purple-400 font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Watch how force changes the speed!
          </motion.p>
        </div>
      )}
    </div>
  );
}

export default function ForceCanChangeSpeedSlide() {
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
        id: 'force-direction-speed',
        question: 'What happens when you apply force in the same direction as an object\'s motion?',
        options: [
          'The object slows down',
          'The object stops',
          'The object speeds up',
          'Nothing happens'
        ],
        correctAnswer: 'The object speeds up',
        explanation: 'When force is applied in the same direction as motion, it adds to the object\'s momentum and increases its speed. This is like pedaling harder on a bicycle to go faster.'
      },
      {
        id: 'force-opposite-speed',
        question: 'What happens when you apply force opposite to an object\'s motion?',
        options: [
          'The object speeds up',
          'The object slows down or stops',
          'The object changes direction immediately',
          'The object maintains the same speed'
        ],
        correctAnswer: 'The object slows down or stops',
        explanation: 'When force is applied opposite to the direction of motion, it opposes the object\'s momentum and reduces its speed. This is how brakes work on a bicycle.'
      },
      {
        id: 'bicycle-pedaling',
        question: 'When you pedal a bicycle harder, what are you doing to change its speed?',
        options: [
          'Applying force opposite to motion',
          'Applying force in the same direction as motion',
          'Applying force perpendicular to motion',
          'Not applying any force'
        ],
        correctAnswer: 'Applying force in the same direction as motion',
        explanation: 'When you pedal harder, you apply more force in the direction the bicycle is moving. This additional force in the same direction increases the bicycle\'s speed.'
      },
      {
        id: 'speed-change-examples',
        question: 'Which of these is an example of force changing speed?',
        options: [
          'A book sitting on a table',
          'Pushing a shopping cart to make it go faster',
          'A picture hanging on a wall',
          'A ball rolling at constant speed on a smooth surface'
        ],
        correctAnswer: 'Pushing a shopping cart to make it go faster',
        explanation: 'Pushing a shopping cart harder applies additional force in the direction of motion, causing it to speed up. This is a perfect example of force changing an object\'s speed.'
      }
    ],
    title: 'Quick Check',
    conceptId: 'force-speed-understanding',
    conceptName: 'Force and Speed Change Quick Check',
    conceptDescription: 'Testing understanding of how forces can change the speed of moving objects',
    showProgress: true
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content and Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Force can change the speed</h3>
            
            <div className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="text-purple-800 dark:text-purple-200 font-medium text-lg">
                  Force can increase or decrease the speed of moving objects depending on its direction.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-orange-600 dark:text-orange-400">Examples of Force Changing Speed:</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <PedalComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Pedal Harder</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Pedal a bicycle harder, and it speeds up!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <div className="w-10 h-8 bg-red-600 rounded border-2 border-red-800"></div>
                    </div>
                    <div>
                      <p className="font-medium text-lg">Press the Brakes</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Press the brakes, and it slows down.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Force in Same Direction:</h4>
                  <p className="text-green-700 dark:text-green-300">
                    When a force is applied in the <strong>same direction</strong> as motion, it increases speed.
                  </p>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Force in Opposite Direction:</h4>
                  <p className="text-red-700 dark:text-red-300">
                    When applied in the <strong>opposite direction</strong>, it reduces speed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Force Direction Visualization */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h4 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">Force Direction and Speed Change</h4>
            
            <div className="space-y-6">
              <div className="text-center">
                <h5 className="font-medium mb-2 text-slate-700 dark:text-slate-300">SPEEDING UP</h5>
                <div className="flex items-center justify-center gap-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <BicycleAdvancedComponent size={40} speed={2} />
                  <svg width="40" height="20">
                    <defs>
                      <marker
                        id="arrowhead-same"
                        markerWidth="10"
                        markerHeight="10"
                        refX="9"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
                      >
                        <polygon points="0 0, 10 3, 0 6" fill="#16a34a" />
                      </marker>
                    </defs>
                    <line
                      x1="5"
                      y1="10"
                      x2="35"
                      y2="10"
                      stroke="#16a34a"
                      strokeWidth="3"
                      markerEnd="url(#arrowhead-same)"
                    />
                  </svg>
                  <span className="text-lg text-green-600 dark:text-green-400 font-medium">Same Direction</span>
                </div>
              </div>

              <div className="text-center">
                <h5 className="font-medium mb-2 text-slate-700 dark:text-slate-300">SLOWING DOWN</h5>
                <div className="flex items-center justify-center gap-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                  <BicycleAdvancedComponent size={40} speed={0.5} />
                  <svg width="40" height="20">
                    <defs>
                      <marker
                        id="arrowhead-opposite"
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
                      markerEnd="url(#arrowhead-opposite)"
                    />
                  </svg>
                  <span className="text-lg text-red-600 dark:text-red-400 font-medium">Opposite Direction</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Animation and Quiz */}
        <div className="space-y-6">
          <ForceSpeedDemo />
          
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
      slideId="force-can-change-speed"
      slideTitle="Force can change the speed"
      moduleId="6-icse-physics-force"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}