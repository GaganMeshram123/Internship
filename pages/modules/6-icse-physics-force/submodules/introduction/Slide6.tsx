import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { QuizRenderer, QuizConfig } from '../../../common-components/QuizRenderer';
import { useThemeContext } from '@/lib/ThemeContext';

// Object Components
const CricketBallComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="rounded-full border-4 border-red-800 bg-gradient-to-br from-red-400 to-red-600 relative shadow-lg"
    style={{ width: size, height: size }}
  >
    <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-red-300 to-transparent opacity-50"></div>
    {/* Cricket ball seam */}
    <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-white rounded transform -translate-y-1/2"></div>
    <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-white rounded transform -translate-x-1/2 -translate-y-1/2"></div>
  </div>
);

const CricketBatComponent = ({ size = 40 }: { size?: number }) => (
  <div 
    className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg relative border-2 border-amber-900"
    style={{ width: size * 0.4, height: size }}
  >
    <div className="absolute inset-1 bg-gradient-to-br from-amber-500 to-amber-700 rounded"></div>
    {/* Handle */}
    <div className="absolute bottom-0 left-1/2 w-2 h-3 bg-amber-900 rounded-b transform -translate-x-1/2"></div>
    {/* Grip */}
    <div className="absolute bottom-1 left-1/2 w-3 h-1 bg-black rounded transform -translate-x-1/2"></div>
  </div>
);

const BicycleSteeringComponent = ({ size = 40, turned = false }: { size?: number; turned?: boolean }) => (
  <div className="relative" style={{ width: size * 2, height: size }}>
    {/* Frame */}
    <div className="absolute top-1/2 left-2 right-2 h-1 bg-green-600 transform -translate-y-1/2"></div>
    <div className="absolute top-1/4 left-1/3 w-1 h-1/2 bg-green-600 transform rotate-45"></div>
    
    {/* Wheels */}
    <div 
      className="absolute top-1/2 left-0 rounded-full border-4 border-gray-800 bg-gray-300"
      style={{ width: size * 0.6, height: size * 0.6, transform: 'translate(0, -50%)' }}
    >
      <div className="absolute inset-2 rounded-full border-2 border-gray-600"></div>
    </div>
    <motion.div 
      className="absolute top-1/2 right-0 rounded-full border-4 border-gray-800 bg-gray-300"
      style={{ width: size * 0.6, height: size * 0.6, transform: 'translate(0, -50%)' }}
      animate={{ rotate: turned ? 30 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-2 rounded-full border-2 border-gray-600"></div>
    </motion.div>
    
    {/* Handlebars */}
    <motion.div 
      className="absolute top-1/3 left-2/3 w-4 h-1 bg-gray-700 rounded"
      animate={{ rotate: turned ? 15 : 0 }}
      transition={{ duration: 0.5 }}
    />
    
    {/* Seat */}
    <div className="absolute top-1/4 left-1/2 w-4 h-2 bg-black rounded transform -translate-x-1/2"></div>
  </div>
);

// Path visualization component
const PathComponent = ({ pathType, isAnimating }: { pathType: string; isAnimating: boolean }) => {
  if (!isAnimating) return null;

  const pathVariants = {
    straight: "M 20 60 L 180 60",
    curve: "M 20 60 Q 100 20 180 60", 
    bounce: "M 20 60 L 80 60 L 120 40 L 160 60 L 200 60"
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <motion.path
        d={pathVariants[pathType as keyof typeof pathVariants]}
        stroke="#10b981"
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
};

// Interactive Animation Component for Force Changing Direction
function ForceDirectionDemo() {
  const [activeDemo, setActiveDemo] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [ballPosition, setBallPosition] = useState({ x: 20, y: 60 });
  const [showPath, setShowPath] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();

  const demos = [
    {
      id: 'cricket',
      name: 'Cricket Hit',
      action: 'Hit Ball',
      description: 'When a cricketer hits a moving ball, the ball changes direction.',
      pathType: 'curve'
    },
    {
      id: 'bicycle',
      name: 'Bicycle Turn',
      action: 'Turn Handle',
      description: 'Turning your bicycle handle applies a force that changes your direction.',
      pathType: 'curve'
    },
    {
      id: 'bounce',
      name: 'Ball Bounce',
      action: 'Bounce',
      description: 'Force can make an object turn, curve, or bounce instead of going straight.',
      pathType: 'bounce'
    }
  ];

  const startAnimation = (demoId: string) => {
    setActiveDemo(demoId);
    setIsAnimating(true);
    setBallPosition({ x: 20, y: 60 });
    setShowPath(true);
    
    const demo = demos.find(d => d.id === demoId);
    
    // Animate ball movement based on demo type
    if (demo?.pathType === 'curve') {
      // Curved path animation
      const steps = 50;
      let currentStep = 0;
      
      const animateStep = () => {
        if (currentStep <= steps) {
          const progress = currentStep / steps;
          const x = 20 + progress * 160;
          const y = 60 + Math.sin(progress * Math.PI) * -30; // Curve upward then down
          setBallPosition({ x, y });
          currentStep++;
          setTimeout(animateStep, 40);
        }
      };
      
      setTimeout(animateStep, 500);
    } else if (demo?.pathType === 'bounce') {
      // Bouncing path animation
      const bouncePoints = [
        { x: 20, y: 60 },
        { x: 80, y: 60 },
        { x: 120, y: 40 },
        { x: 160, y: 60 },
        { x: 200, y: 60 }
      ];
      
      let pointIndex = 0;
      const animateBounce = () => {
        if (pointIndex < bouncePoints.length) {
          setBallPosition(bouncePoints[pointIndex]);
          pointIndex++;
          setTimeout(animateBounce, 500);
        }
      };
      
      setTimeout(animateBounce, 500);
    }
    
    // Reset animation after 4 seconds
    setTimeout(() => {
      setIsAnimating(false);
      setActiveDemo('');
      setBallPosition({ x: 20, y: 60 });
      setShowPath(false);
    }, 4000);
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Interactive Direction Change Demonstrations</h3>
      <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">Click on any scenario to see how force changes direction!</p>
      
      {/* Demo Buttons */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => startAnimation(demo.id)}
            disabled={isAnimating}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              activeDemo === demo.id
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30'
                : 'border-slate-300 dark:border-slate-600 hover:border-teal-300'
            } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12">
                {demo.id === 'cricket' && <CricketBallComponent size={32} />}
                {demo.id === 'bicycle' && <BicycleSteeringComponent size={32} />}
                {demo.id === 'bounce' && <CricketBallComponent size={32} />}
              </div>
              <div>
                <div className="font-medium">{demo.name}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{demo.action} to change direction</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Animation Area */}
      <div className="h-32 bg-slate-50 dark:bg-slate-700 rounded-lg relative overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600">
        {/* Path visualization */}
        {showPath && (
          <PathComponent 
            pathType={demos.find(d => d.id === activeDemo)?.pathType || 'straight'} 
            isAnimating={isAnimating}
          />
        )}
        
        {activeDemo ? (
          <div className="h-full relative">
            {/* Moving object */}
            <motion.div
              className="absolute flex items-center justify-center"
              style={{ 
                left: `${ballPosition.x}px`, 
                top: `${ballPosition.y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
              transition={{ duration: 0.1 }}
            >
              {activeDemo === 'bicycle' ? (
                <BicycleSteeringComponent size={40} turned={isAnimating} />
              ) : (
                <CricketBallComponent size={40} />
              )}
            </motion.div>

            {/* Force application indicator */}
            <AnimatePresence>
              {isAnimating && activeDemo === 'cricket' && (
                <motion.div
                  className="absolute left-16 top-1/2 transform -translate-y-1/2 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center">
                    <CricketBatComponent size={32} />
                    <span className="text-lg font-semibold text-teal-600 dark:text-teal-400 ml-2">HIT!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direction change indicator */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div className="px-4 py-2 rounded-full border-2 bg-teal-100 dark:bg-teal-900/50 border-teal-400 text-teal-700 dark:text-teal-300">
                    <span className="text-sm font-bold">DIRECTION CHANGED!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
            <p>Click a scenario above to see the direction change animation!</p>
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
            className="mt-4 p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg border-l-4 border-teal-400"
          >
            <p className="text-teal-800 dark:text-teal-200 font-medium">
              {demos.find(d => d.id === activeDemo)?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnimating && (
        <div className="mt-4 text-center">
          <motion.p
            className="text-teal-600 dark:text-teal-400 font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Watch how force changes direction!
          </motion.p>
        </div>
      )}
    </div>
  );
}

export default function ForceCanChangeDirectionSlide() {
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
        id: 'direction-change-cause',
        question: 'What causes a moving object to change its direction?',
        options: [
          'The object decides to change direction',
          'A force applied to the object',
          'The object gets tired of moving straight',
          'Temperature changes in the environment'
        ],
        correctAnswer: 'A force applied to the object',
        explanation: 'A moving object will continue moving in a straight line unless a force acts on it. When a force is applied, it can change the object\'s direction of motion.'
      },
      {
        id: 'cricket-ball-direction',
        question: 'When a cricketer hits a moving ball with a bat, what happens to the ball\'s direction?',
        options: [
          'It continues in the same direction',
          'It stops completely',
          'It changes direction',
          'It moves backwards only'
        ],
        correctAnswer: 'It changes direction',
        explanation: 'When the bat hits the ball, it applies a force that changes the ball\'s direction. The ball moves in a new direction determined by the force from the bat.'
      },
      {
        id: 'bicycle-steering',
        question: 'How does turning the bicycle handlebars change your direction?',
        options: [
          'It changes the color of the bicycle',
          'It applies force to change the front wheel direction',
          'It makes the bicycle go faster',
          'It has no effect on direction'
        ],
        correctAnswer: 'It applies force to change the front wheel direction',
        explanation: 'When you turn the handlebars, you apply a force that changes the direction of the front wheel. This causes the entire bicycle to change direction.'
      },
      {
        id: 'force-mass-relationship',
        question: 'According to the note in the lesson, what does force NOT change about an object?',
        options: [
          'Its speed',
          'Its direction',
          'Its shape',
          'Its mass'
        ],
        correctAnswer: 'Its mass',
        explanation: 'Force does not change the mass of an object. No matter how hard you push or pull, the amount of matter (mass) in the object stays exactly the same. Force can change motion, shape, and direction, but never mass.'
      }
    ],
    title: 'Quick Check',
    conceptId: 'force-direction-understanding',
    conceptName: 'Force and Direction Change Quick Check',
    conceptDescription: 'Testing understanding of how forces can change the direction of motion',
    showProgress: true
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content and Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Force can change the direction of Motion</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg border-l-4 border-teal-400">
                <p className="text-teal-800 dark:text-teal-200 font-medium text-lg">
                  Force can make an object turn, curve, or bounce instead of going straight.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-emerald-600 dark:text-emerald-400">Examples of Force Changing Direction:</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <CricketBallComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Cricket Ball Hit</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        When a cricketer hits a moving ball, the ball changes direction.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <BicycleSteeringComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Bicycle Steering</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Turning your bicycle handle applies a force that changes your direction.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1">
                      <CricketBallComponent size={40} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Ball Bouncing</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        When a ball hits the ground, the force from the ground changes its direction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Understanding:</h4>
                <p className="text-blue-700 dark:text-blue-300">
                  Objects moving in a straight line will continue in that direction unless a force acts on them. When a force is applied at an angle to the motion, it changes the object's direction.
                </p>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg border-l-4 border-yellow-400`}>
            <h4 className="text-lg font-semibold mb-4 text-yellow-600 dark:text-yellow-400">Important Note:</h4>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium text-lg">
                A force does <strong>not</strong> change the mass of an object — no matter how hard you push or pull, its mass stays the same.
              </p>
            </div>
            
            <div className="mt-4 space-y-2">
              <h5 className="font-semibold text-slate-700 dark:text-slate-300">What Force CAN Change:</h5>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                <li>• Motion (start, stop, speed up, slow down)</li>
                <li>• Direction (turn, curve, bounce)</li>
                <li>• Shape (in flexible materials)</li>
              </ul>
              
              <h5 className="font-semibold text-slate-700 dark:text-slate-300 mt-3">What Force CANNOT Change:</h5>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                <li>• Mass (amount of matter stays constant)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Animation and Quiz */}
        <div className="space-y-6">
          <ForceDirectionDemo />
          
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
      slideId="force-can-change-direction"
      slideTitle="Force can change the direction of Motion"
      moduleId="6-icse-physics-force"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}