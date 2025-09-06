import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function EarthSurfaceSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'universal-law-introduction',
      conceptId: 'universal-law-intro',
      conceptName: 'Universal Law of Gravity Introduction',
      type: 'learning',
      description: 'Understanding Newton\'s universal law of gravitation as starting point'
    },
    {
      id: 'derivation-steps',
      conceptId: 'g-derivation-steps',
      conceptName: 'Step-by-step Derivation of g',
      type: 'learning',
      description: 'Interactive exploration of deriving g from universal law'
    },
    {
      id: 'physical-meaning-quiz',
      conceptId: 'g-physical-meaning',
      conceptName: 'Physical Meaning of g Quiz',
      type: 'judging',
      description: 'Testing understanding of what g represents physically'
    }
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Handle quiz answer selection
  const handleQuizAnswer = (answerId: string) => {
    const isCorrect = answerId === 'independent_mass';
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    const optionTextMap: Record<string, string> = {
      independent_mass: "Because gravitational acceleration is independent of the object's mass",
      air_resistance: 'Because air resistance is the same for all objects',
      heavy_objects: 'Because heavier objects experience stronger gravitational force'
    };
    
    const response: InteractionResponse = {
      interactionId: 'physical-meaning-quiz',
      value: optionTextMap[answerId] || answerId,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'g-physical-meaning',
      conceptName: 'Physical Meaning of g Quiz',
      conceptDescription: 'Testing understanding of what g represents physically',
      question: {
        type: 'mcq',
        question: "Why do all objects fall at the same rate near Earth's surface?",
        options: [
          "Because gravitational acceleration is independent of the object's mass",
          'Because air resistance is the same for all objects',
          'Because heavier objects experience stronger gravitational force'
        ]
      }
    };
    
    handleInteractionComplete(response);
  };

  const derivationSteps = [
    {
      title: "Newton's Universal Law of Gravitation",
      description: "Start with the fundamental law that describes gravitational force between any two masses",
      formula: "F = G\\frac{M m}{r^2}",
      explanation: "F is gravitational force, G is gravitational constant, M is Earth's mass, m is test mass, r is distance between centers"
    },
    {
      title: "Apply Newton's Second Law",
      description: "Connect gravitational force to acceleration using F = ma",
      formula: "G\\frac{M m}{r^2} = m a",
      explanation: "The gravitational force on mass m equals mass times acceleration (Newton's second law)"
    },
    {
      title: "Cancel Mass m",
      description: "Notice that the test mass m appears on both sides and cancels out",
      formula: "G\\frac{M \\cancel{m}}{r^2} = \\cancel{m} a",
      explanation: "This shows that gravitational acceleration is independent of the falling object's mass!"
    },
    {
      title: "Solve for Acceleration",
      description: "Rearrange to get the acceleration due to gravity",
      formula: "a = G\\frac{M}{r^2}",
      explanation: "This acceleration depends only on the gravitating body (Earth) and distance from its center"
    },
    {
      title: "At Earth's Surface",
      description: "For objects at Earth's surface, r = R (Earth's radius)",
      formula: "g = G\\frac{M}{R^2}",
      explanation: "We call this special case 'g' - the acceleration due to gravity at Earth's surface"
    },
    {
      title: "Numerical Result",
      description: "Substituting known values for Earth gives us the familiar result",
      formula: "g \\approx 9.8 \\text{ m/s}^2",
      explanation: "Using G = 6.67×10⁻¹¹ m³/kg·s², M = 5.97×10²⁴ kg, R = 6.37×10⁶ m"
    }
  ];

  return (
    <SlideComponentWrapper
      slideId="gravitational-acceleration-earth"
      slideTitle="Deriving g from Universal Gravitation"
      moduleId="gravitation-0001"
      submoduleId="gravitation-near-earth-surface"
      interactions={localInteractions}
    >
      <div className="w-full h-auto bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Derivation Steps */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-6">
            <TrackedInteraction 
              interaction={slideInteractions[0]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div>
                <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                  Let's derive the acceleration due to gravity (g) starting from Newton's universal law of gravitation.
                </div>
                
                <div className="text-center my-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-2">Our Goal</div>
                  <BlockMath math="g = ?" />
                </div>
              </div>
            </TrackedInteraction>

            {/* Step Navigation */}
            <TrackedInteraction 
              interaction={slideInteractions[1]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-blue-600">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>
                  
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Step {currentStep + 1} of {derivationSteps.length}
                  </span>
                  
                  <button
                    onClick={() => setCurrentStep(Math.min(derivationSteps.length - 1, currentStep + 1))}
                    disabled={currentStep === derivationSteps.length - 1}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <h4 className="text-blue-700 dark:text-blue-300 font-medium mb-3 text-lg">
                      {derivationSteps[currentStep]?.title}
                    </h4>
                    
                    <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <BlockMath math={derivationSteps[currentStep]?.formula} />
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-3">
                      {derivationSteps[currentStep]?.description}
                    </p>
                    
                    <div className="text-gray-600 dark:text-gray-400 text-lg bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      {derivationSteps[currentStep]?.explanation}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </TrackedInteraction>

            {/* Key Insight - appears after step 3 */}
            {currentStep >= 2 && (
              <motion.div 
                className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="text-green-700 dark:text-green-300 font-medium text-lg mb-2">Key Insight</h4>
                <div className="text-green-800 dark:text-green-200 text-lg">
                  The test mass <InlineMath math="m" /> cancels out! This means gravitational acceleration is independent of the falling object's mass - all objects fall at the same rate in a gravitational field.
                    </div>
              </motion.div>
            )}

            {/* Final Summary - appears after last step */}
            {currentStep >= 5 && (
              <motion.div 
                className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-2">Complete Derivation</h4>
                <div className="text-center space-y-2">
                  <BlockMath math="F = G\frac{Mm}{r^2} \rightarrow F = ma \rightarrow a = G\frac{M}{r^2}" />
                  <div className="text-blue-800 dark:text-blue-200 text-lg">
                    At Earth's surface (r = R): <InlineMath math="g = G\frac{M}{R^2} \approx 9.8 \text{ m/s}^2" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right Column - Visualization */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-900 dark:text-white font-medium mb-4 text-lg">Visual Representation</h3>
            
            {/* Earth and test mass visualization */}
            <div className="aspect-square bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
              <svg width="100%" height="100%" viewBox="0 0 400 400" className="w-full h-full">
                {/* Space background with stars */}
                <rect width="400" height="400" fill={isDarkMode ? "#1a202c" : "#f7fafc"} />
                
                {/* Stars */}
                {[...Array(20)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={50 + (i * 17) % 300}
                    cy={50 + (i * 23) % 300}
                    r="1"
                    fill={isDarkMode ? "#ffffff" : "#4a5568"}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2 + (i % 3), repeat: Infinity }}
                  />
                ))}
                
                {/* Earth */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="80"
                  fill="#4299e1"
                  stroke="#2b6cb0"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                />
                
                {/* Earth surface details */}
                <circle cx="200" cy="200" r="78" fill="url(#earthGradient)" />
                
                {/* Earth gradient definition */}
                <defs>
                  <radialGradient id="earthGradient" cx="0.3" cy="0.3">
                    <stop offset="0%" stopColor="#68d391" />
                    <stop offset="30%" stopColor="#4299e1" />
                    <stop offset="100%" stopColor="#2b6cb0" />
                  </radialGradient>
                  
                  {/* Arrow marker */}
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="#ef4444"
                    />
                  </marker>
                </defs>
                
                {/* Earth center */}
                <circle cx="200" cy="200" r="3" fill="#1a202c" />
                
                {/* Radius line */}
                <motion.line
                  x1="200"
                  y1="200"
                  x2="200"
                  y2="120"
                  stroke="#6b7280"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                
                {/* Radius label */}
                <motion.text
                  x="210"
                  y="160"
                  fill="#000000"
                  fontSize="12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  R<tspan baselineShift="sub">Earth</tspan>
                </motion.text>
                
                {/* Test mass */}
                <motion.circle
                  cx="200"
                  cy="100"
                  r="8"
                  fill="#f56565"
                  stroke="#e53e3e"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
                
                {/* Test mass label */}
                <motion.text
                  x="195"
                  y="85"
                  fill="#e53e3e"
                  fontSize="12"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  m
                </motion.text>
                
                {/* Force vector - appears after step 0 */}
                {currentStep >= 0 && (
                  <motion.line
                    x1="200"
                    y1="108"
                    x2="200"
                    y2="140"
                    stroke="#ef4444"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 2 }}
                  />
                )}
                
                {/* Force label */}
                {currentStep >= 0 && (
                  <motion.text
                    x="220"
                    y="110"
                    fill="#ef4444"
                    fontSize="12"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8 }}
                  >
                    F = mg
                  </motion.text>
                )}
                
                {/* Earth mass label */}
                <motion.text
                  x="190"
                  y="225"
                  fill="#000000"
                  fontSize="14"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  M<tspan baselineShift="sub">Earth</tspan>
                </motion.text>
              </svg>
            </div>

            {/* Quick Check Quiz */}
            <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                Quick Check
              </h3>
              <div className="space-y-3">
                <p className="text-lg">Why do all objects fall at the same rate near Earth's surface?</p>
                <TrackedInteraction 
                  interaction={slideInteractions[2]} 
                  onInteractionComplete={handleInteractionComplete}
                >
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuizAnswer('independent_mass')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'independent_mass'
                          ? 'border-green-500 bg-green-100 dark:bg-green-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      Because gravitational acceleration is independent of the object's mass
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('air_resistance')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'air_resistance'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      Because air resistance is the same for all objects
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('heavy_objects')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'heavy_objects'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      Because heavier objects experience stronger gravitational force
                    </button>
              </div>
                  
                  {showFeedback && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      selectedAnswer === 'independent_mass' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswer === 'independent_mass' ? (
                        <p>✅ Correct! Our derivation showed that the mass m cancels out, making g = GM/R² independent of the falling object's mass.</p>
                      ) : (
                        <p>❌ Not quite. Look at our derivation - the key insight is that the test mass m cancels out from both sides of the equation.</p>
                      )}
                      </div>
                    )}
                </TrackedInteraction>
                </div>
            </div>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 