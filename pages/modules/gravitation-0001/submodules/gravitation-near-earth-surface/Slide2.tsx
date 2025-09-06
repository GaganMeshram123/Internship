import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function EarthSurfaceSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [height, setHeight] = useState(1000); // Height in km
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'height-formula-derivation',
      conceptId: 'height-formula-derivation',
      conceptName: 'Deriving g(h) Formula',
      type: 'learning',
      description: 'Understanding how gravitational acceleration changes with height above Earth\'s surface'
    },
    {
      id: 'approximation-exploration',
      conceptId: 'approximation-exploration',
      conceptName: 'Binomial Approximation Application',
      type: 'learning',
      description: 'Applying binomial approximation for small heights'
    },
    {
      id: 'height-calculator',
      conceptId: 'height-calculator',
      conceptName: 'Interactive Height Calculator',
      type: 'learning',
      description: 'Exploring gravity at different heights using exact and approximate formulas'
    },
    {
      id: 'gravity-comparison-quiz',
      conceptId: 'gravity-comparison',
      conceptName: 'Gravity Comparison Quiz',
      type: 'judging',
      description: 'Testing understanding of where gravity is stronger on Earth'
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
    const isCorrect = answerId === 'poles';
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    const optionTextMap: Record<string, string> = {
      poles: 'At the poles',
      equator: 'At the equator',
      same: 'Same everywhere'
    };
    
    const response: InteractionResponse = {
      interactionId: 'gravity-comparison-quiz',
      value: optionTextMap[answerId] || answerId,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'gravity-comparison',
      conceptName: 'Gravity Comparison Quiz',
      conceptDescription: 'Testing understanding of where gravity is stronger on Earth',
      question: {
        type: 'mcq',
        question: 'Where is gravity expected to be stronger on Earth?',
        options: ['At the poles', 'At the equator', 'Same everywhere']
      }
    };
    
    handleInteractionComplete(response);
  };

  // Constants
  const R = 6.37; // Earth radius in thousands of km
  const g_surface = 9.8; // Surface gravity in m/s²

  // Calculate gravity at height h
  const calculateGravity = (h: number) => {
    const h_km = h / 1000; // Convert to thousands of km to match R
    const exact = g_surface * Math.pow(R / (R + h_km), 2);
    const approximate = g_surface * (1 - 2 * h_km / R);
    return { exact, approximate };
  };

  const derivationSteps = [
    {
      title: "Start with Universal Law at Surface",
      description: "At Earth's surface (r = R), we have the familiar g",
      formula: "g = G\\frac{M}{R^2}",
      explanation: "This is our reference point - gravitational acceleration at Earth's surface"
    },
    {
      title: "Universal Law at Height h",
      description: "At height h above surface, distance from center is (R + h)",
      formula: "g(h) = G\\frac{M}{(R+h)^2}",
      explanation: "The only difference is that r = R + h instead of just R"
    },
    {
      title: "Express in Terms of Surface g",
      description: "Substitute the expression for GM from surface gravity",
      formula: "g(h) = g \\cdot \\frac{R^2}{(R+h)^2}",
      explanation: "Since g = GM/R², we can write GM = gR² and substitute"
    },
    {
      title: "Factor Out R² from Denominator",
      description: "Prepare for approximation by factoring",
      formula: "g(h) = g \\cdot \\frac{R^2}{R^2(1+h/R)^2} = g \\cdot \\frac{1}{(1+h/R)^2}",
      explanation: "This form makes it easier to apply approximations for small h/R"
    },
    {
      title: "Apply Binomial Approximation",
      description: "For small h/R, use (1 + x)ⁿ ≈ 1 + nx when |x| << 1",
      formula: "(1+h/R)^{-2} \\approx 1 - 2\\frac{h}{R}",
      explanation: "This approximation is valid when h << R (height much smaller than Earth's radius)"
    },
    {
      title: "Final Approximate Formula",
      description: "Substitute the approximation back into our expression",
      formula: "g(h) \\approx g\\left(1 - 2\\frac{h}{R}\\right)",
      explanation: "This shows gravity decreases linearly with height for small heights"
    }
  ];

  const currentGravity = calculateGravity(height);
  const percentageDecrease = ((g_surface - currentGravity.exact) / g_surface) * 100;

  return (
    <SlideComponentWrapper
      slideId="gravity-at-height"
      slideTitle="Gravitational Acceleration at Height h"
      moduleId="gravitation-0001"
      submoduleId="gravitation-near-earth-surface"
      interactions={localInteractions}
    >
      <div className="w-full h-auto bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Derivation */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-6">
            <TrackedInteraction 
              interaction={slideInteractions[0]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div>
                <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                  How does gravitational acceleration change when we move to height h above Earth's surface?
                </div>
                
                <div className="text-center my-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-2">Derive</div>
                  <BlockMath math="g(h) = ?" />
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

            {/* Approximation insight - appears after step 4 */}
            {currentStep >= 4 && (
              <motion.div 
                className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="text-green-700 dark:text-green-300 font-medium text-lg mb-2">Approximation Insight</h4>
                <div className="text-green-800 dark:text-green-200 text-lg">
                  For small heights (h &lt;&lt; R), gravity decreases approximately linearly with height. The decrease is about 2h/R of the surface value.
                </div>
              </motion.div>
            )}

            {/* Final formulas - appears after last step */}
            {currentStep >= 5 && (
              <motion.div 
                className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="text-purple-700 dark:text-purple-300 font-medium text-lg mb-2">Final Results</h4>
                <div className="text-center space-y-2">
                  <div className="text-purple-800 dark:text-purple-200 text-lg">
                    <strong>Exact:</strong> <InlineMath math="g(h) = g \cdot \frac{R^2}{(R+h)^2}" />
                  </div>
                  <div className="text-purple-800 dark:text-purple-200 text-lg">
                    <strong>Approximate:</strong> <InlineMath math="g(h) \approx g\left(1 - 2\frac{h}{R}\right)" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right Column - Interactive Calculator and Visualization */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-6">
            <h3 className="text-gray-900 dark:text-white font-medium mb-4 text-lg">Height Calculator</h3>
              
            {/* Height slider */}
            <TrackedInteraction 
              interaction={slideInteractions[2]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">Explore Different Heights</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">
                      Height above surface: {height.toLocaleString()} km
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                    />
                    <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-1">
                      <span>0 km</span>
                      <span>100 km</span>
                </div>
              </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                      <div className="text-blue-700 dark:text-blue-300 font-medium text-lg">Exact Formula</div>
                      <div className="text-blue-800 dark:text-blue-200 text-lg font-mono">
                        {currentGravity.exact.toFixed(3)} m/s²
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                      <div className="text-green-700 dark:text-green-300 font-medium text-lg">Approximate</div>
                      <div className="text-green-800 dark:text-green-200 text-lg font-mono">
                        {currentGravity.approximate.toFixed(3)} m/s²
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <div className="text-gray-700 dark:text-gray-300 text-lg">
                      Gravity decreased by: <span className="font-bold text-red-600 dark:text-red-400">{percentageDecrease.toFixed(3)}%</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-lg">
                      Error in approximation: <span className="font-mono">{Math.abs(currentGravity.exact - currentGravity.approximate).toFixed(4)} m/s²</span>
                    </div>
                  </div>
                </div>
              </div>
            </TrackedInteraction>

            {/* Visualization */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">Visual Representation</h4>
              
              <svg width="100%" height="300" viewBox="0 80 400 250" className="bg-gray-50 dark:bg-gray-900 rounded">
                {/* Earth */}
                <circle cx="200" cy="650" r="50" fill="#4299e1" stroke="#2b6cb0" strokeWidth="2" />
                
                {/* Earth surface */}
                <circle cx="200" cy="650" r="450" fill="url(#earthGradient)" />
                
                {/* Earth gradient definition */}
                <defs>
                  <radialGradient id="earthGradient" cx="0.3" cy="0.3">
                    <stop offset="0%" stopColor="#68d391" />
                    <stop offset="30%" stopColor="#4299e1" />
                    <stop offset="100%" stopColor="#2b6cb0" />
                  </radialGradient>
                </defs>
                
                {/* Earth center */}
                <circle cx="200" cy="650" r="2" fill="#1a202c" />
                
                {/* Surface level line */}
                <line x1="130" y1="200" x2="270" y2="200" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
                <text x="275" y="205" fill="#6b7280" fontSize="10">Surface</text>
                
                {/* Height h */}
                <motion.line
                  x1="200"
                  y1="200"
                  x2="200"
                  y2={200 - (height)}
                  stroke="#ef4444"
                  strokeWidth="2"
                  animate={{ y2: 200 - (height) }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Height label */}
                <motion.text
                  x="280"
                  y="150"
                  fill="#ef4444"
                  fontSize="15"
                  fontWeight="bold"
                >
                  h = {(height).toFixed(1)} km
                </motion.text>
                
                {/* Object at height */}
                <motion.circle
                  cx="200"
                  cy={200 - (height)}
                  r="6"
                  fill="#f56565"
                  stroke="#e53e3e"
                  strokeWidth="2"
                  animate={{ cy: 200 - (height) }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Gravity arrow */}
                <motion.line
                  x1="200"
                  y1={200 - (height) + 8}
                  x2="200"
                  y2={200 - (height) + 25}
                  stroke="#10b981"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                  animate={{ 
                    y1: 200 - (height) + 8,
                    y2: 200 - (height) + 25
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Arrow marker */}
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                  </marker>
                </defs>
                
                {/* Gravity value */}
                <motion.text
                  x="50"
                  y="50"
                  fill="#10b981"
                  fontSize="15"
                  fontWeight="bold"
                  transition={{ duration: 0.3 }}
                >
                  g = {currentGravity.exact.toFixed(2)} m/s²
                </motion.text>
                
                {/* Earth radius */}
                <line x1="200" y1="450" x2="200" y2="200" stroke="#090909" strokeWidth="1" strokeDasharray="2,2" />
                <text x="205" y="285" fill="#000000" fontSize="20">R</text>
              </svg>
            </div>

            {/* Quick Check Quiz */}
            <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                Quick Check
              </h3>
              <div className="space-y-3">
                <p className="text-lg">Where is gravity expected to be stronger on Earth?</p>
                <TrackedInteraction 
                  interaction={slideInteractions[3]} 
                  onInteractionComplete={handleInteractionComplete}
                >
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuizAnswer('poles')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'poles'
                          ? 'border-green-500 bg-green-100 dark:bg-green-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      At the poles
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('equator')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'equator'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      At the equator
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('same')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'same'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      Same everywhere
                    </button>
                  </div>
                  
                  {showFeedback && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      selectedAnswer === 'poles' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswer === 'poles' ? (
                        <p>✅ Correct! At the poles, you're closer to Earth's center (Earth is oblate) and there are no rotational effects, so gravity is strongest there.</p>
                      ) : (
                        <p>❌ Not quite. At the poles, you're closer to Earth's center and there are no centrifugal effects from Earth's rotation, making gravity stronger there.</p>
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