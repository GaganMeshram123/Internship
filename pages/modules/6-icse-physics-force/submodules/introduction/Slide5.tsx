import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { QuizRenderer, QuizConfig } from '../../../common-components/QuizRenderer';
import { useThemeContext } from '@/lib/ThemeContext';

// Object Components
const SpongeComponent = ({ size = 40 }: { size?: number }) => (
  <div
    className="rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-yellow-600"
    style={{ 
      width: size * 1.5, 
      height: size,
      // Add some 'pores'
      backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(0,0,0,0.1) 1px, transparent 1px), radial-gradient(circle at 30px 25px, rgba(0,0,0,0.1) 1px, transparent 1px), radial-gradient(circle at 50px 15px, rgba(0,0,0,0.1) 1px, transparent 1px)',
      backgroundSize: '100% 100%',
    }}
  />
);

const RubberBandComponent = ({ size = 40 }: { size?: number }) => (
  <div
    className="rounded-full bg-transparent border-4 border-red-500"
    style={{ width: size * 1.8, height: size * 0.8 }}
  />
);

const ClayComponent = ({ size = 40 }: { size?: number }) => (
  <div
    className="rounded-full bg-gradient-to-br from-orange-500 to-orange-700 border-2 border-orange-800"
    style={{ width: size, height: size }}
  />
);


// Interactive Animation Component for Force Changing Shape
function ForceShapeChangeDemo() {
  const [activeDemo, setActiveDemo] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();

  const demos = [
    {
      id: 'sponge',
      name: 'Squeeze Sponge',
      object: 'sponge',
      force: 'Hands',
      action: 'Squeeze',
      description: "When you squeeze a sponge, the force from your hands compresses it, making it thinner."
    },
    {
      id: 'band',
      name: 'Stretch Rubber Band',
      object: 'band',
      force: 'Fingers',
      action: 'Stretch',
      description: "When you pull a rubber band, the force stretches it, making it longer."
    },
    {
      id: 'clay',
      name: 'Press Clay',
      object: 'clay',
      force: 'Hand',
      action: 'Press',
      description: "When you press on clay, the force deforms it, changing its shape."
    }
  ];

  const startAnimation = (demoId: string) => {
    setActiveDemo(demoId);
    setIsAnimating(true);
    
    // Reset animation after 3 seconds
    setTimeout(() => {
      setIsAnimating(false);
      // Keep activeDemo set to show the description
    }, 3000);
  };

  const renderObject = (objectType: string, size: number = 50) => {
    switch (objectType) {
      case 'sponge':
        return <SpongeComponent size={size} />;
      case 'band':
        return <RubberBandComponent size={size} />;
      case 'clay':
        return <ClayComponent size={size} />;
      default:
        return <div className="w-12 h-12 bg-gray-400 rounded"></div>;
    }
  };

  // Determine animation properties based on active demo
  const getAnimationProps = () => {
    const baseProps = { x: 120 }; // Keep it centered
    if (!isAnimating) return baseProps;

    switch (activeDemo) {
      case 'sponge':
        return { ...baseProps, scaleY: 0.5, scaleX: 1.2, transition: { duration: 1.5, ease: "easeInOut" } };
      case 'band':
        return { ...baseProps, width: 250, transition: { duration: 1.5, ease: "easeInOut" } };
      case 'clay':
        return { ...baseProps, height: 40, scaleX: 1.5, borderRadius: '30%', transition: { duration: 1.5, ease: "easeInOut" } };
      default:
        return baseProps;
    }
  };

  const getObjectInitialProps = () => {
    switch (activeDemo) {
      case 'sponge':
        return { x: 120, scaleY: 1, scaleX: 1 };
      case 'band':
        return { x: 120, width: 100 };
      case 'clay':
        return { x: 120, height: 60, scaleX: 1, borderRadius: '50%' };
      default:
        return { x: 120 };
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Interactive Shape Change</h3>
      <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">Click on an example to see force change its shape!</p>
      
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
                <div className="text-sm text-slate-600 dark:text-slate-400">{demo.action} to change shape</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Animation Area */}
      <div className="h-32 bg-slate-50 dark:bg-slate-700 rounded-lg relative overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600">
        {activeDemo ? (
          <div className="h-full flex items-center justify-center">
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
                        <marker id="arrowhead-force-shape" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                          <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
                        </marker>
                      </defs>
                      <line x1="5" y1="10" x2="50" y2="10" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead-force-shape)" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Deforming Object */}
            <motion.div
              className="absolute flex items-center justify-center"
              initial={getObjectInitialProps()}
              animate={getAnimationProps()}
              transition={{ duration: isAnimating ? 1.5 : 0.5, ease: "easeInOut" }}
            >
              {renderObject(demos.find(d => d.id === activeDemo)?.object || '', 60)}
            </motion.div>
            
            {/* Additional force arrow for squeeze/stretch */}
            <AnimatePresence>
              {isAnimating && (activeDemo === 'sponge' || activeDemo === 'band') && (
                <motion.div
                  className="absolute right-4 flex items-center z-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <svg width="60" height="20">
                      <defs>
                        <marker id="arrowhead-force-shape-left" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto" markerUnits="strokeWidth">
                          <polygon points="10 0, 0 3, 10 6" fill="#dc2626" />
                        </marker>
                      </defs>
                      <line x1="10" y1="10" x2="55" y2="10" stroke="#dc2626" strokeWidth="3" /* markerSstart="url(#arrowhead-force-shape-left)" */ />
                    </svg>
                    <span className="text-lg font-semibold text-red-600 dark:text-red-400 ml-2">FORCE</span>
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
    </div>
  );
}

export default function ForceCanChangeShapeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'force-shape-exploration',
      conceptId: 'force-shape',
      conceptName: 'Force and Shape Exploration',
      type: 'learning',
      description: 'Understanding how forces can change the size and shape of objects'
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
        id: 'shape-change-sponge',
        question: 'What happens to a sponge when you squeeze it?',
        options: [
          'It gets heavier',
          'It changes shape and gets thinner',
          'It starts moving',
          'It changes color'
        ],
        correctAnswer: 'It changes shape and gets thinner',
        explanation: 'Squeezing is a compression force. This force pushes the parts of the soft sponge closer together, changing its shape and making it thinner.'
      },
      {
        id: 'shape-change-band',
        question: "Stretching a rubber band is an example of force changing an object's...?",
        options: [
          '...color',
          '...weight',
          '...size (length)',
          '...temperature'
        ],
        correctAnswer: '...size (length)',
        explanation: 'The pulling force (tension) causes the rubber band to stretch, which is a change in its size (specifically, its length).'
      },
      {
        id: 'shape-change-clay',
        question: 'Why can force easily change the shape of clay or dough?',
        options: [
          'Because it is hard',
          'Because it is flexible or soft',
          'Because it is heavy',
          'Because it is hot'
        ],
        correctAnswer: 'Because it is flexible or soft',
        explanation: 'Materials like clay and dough are soft (malleable). This means the bonds between their particles can be easily moved and reformed, allowing force to change their shape permanently.'
      },
      {
        id: 'shape-vs-motion',
        question: 'Which of these is an example of force causing MOTION, not just changing shape?',
        options: [
          'Pressing clay',
          'Squeezing a sponge',
          'Kicking a football',
          'Stretching a band'
        ],
        correctAnswer: 'Kicking a football',
        explanation: 'While pressing, squeezing, and stretching are examples of force changing shape, kicking a football is a clear example of force causing a stationary object to start moving.'
      }
    ],
    title: 'Quick Check',
    conceptId: 'force-shape-change-understanding',
    conceptName: 'Force and Shape Change Quick Check',
    conceptDescription: 'Testing understanding of how forces change shape and size',
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
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200 font-medium text-lg">
                  👉 Some materials are flexible or soft, so force can easily change their shape or size.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-orange-600 dark:text-orange-400">Examples of Changing Shape and Size:</h4>
                
                <div className="space-y-4">
                  
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1 flex-shrink-0">
                      <SpongeComponent size={36} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Squeezing a sponge</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Squeezing a sponge makes it thinner.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1 flex-shrink-0">
                      <RubberBandComponent size={36} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Stretching a rubber band</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Stretching a rubber band makes it longer.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 mt-1 flex-shrink-0">
                      <ClayComponent size={36} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Pressing clay or dough</p>
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
                  Force doesn't just move things; it can also **deform** them. Applying force can compress (squeeze), stretch (pull), or bend an object, changing its dimensions or form.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Animation and Quiz */}
        <div className="space-y-6">
          <ForceShapeChangeDemo />
          
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
      slideTitle="Force can change size and shape"
      moduleId="6-icse-physics-force"
      submoduleId="effects-of-force"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}