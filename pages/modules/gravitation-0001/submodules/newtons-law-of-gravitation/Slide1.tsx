import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function NewtonsLawSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [earthMass, setEarthMass] = useState<number>(1.0); // Earth mass multiplier
  const [showThoughtExperiment, setShowThoughtExperiment] = useState<boolean>(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('normal');
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  const [showPredictionResult, setShowPredictionResult] = useState<boolean>(false);
  const [applePosition, setApplePosition] = useState<number>(10); // %
  const [moonPosition, setMoonPosition] = useState<number>(10); // %
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'newton-apple-thought-experiment',
      conceptId: 'newton-apple-concept',
      conceptName: 'Newton\'s Apple Thought Experiment',
      type: 'learning',
      description: 'Understanding Newton\'s insight connecting apple fall and Moon orbit'
    },
    {
      id: 'universal-gravity-simulation',
      conceptId: 'universal-gravity-concept',
      conceptName: 'Universal Gravity Simulation',
      type: 'learning',
      description: 'Exploring how gravity affects both terrestrial and celestial objects'
    },
    {
      id: 'mass-effect-exploration',
      conceptId: 'mass-effect-concept',
      conceptName: 'Effect of Earth\'s Mass on Gravity',
      type: 'learning',
      description: 'Investigating how Earth\'s mass affects gravitational acceleration'
    },
    {
      id: 'falling-rate-prediction',
      conceptId: 'falling-rate-concept',
      conceptName: 'Falling Rate Prediction',
      type: 'judging',
      description: 'Predicting whether apple and Moon fall at the same rate'
    }
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const scenarios = [
    {
      id: 'normal',
      name: 'Normal Earth',
      description: 'Earth at its current mass',
      massMultiplier: 1.0,
      color: '#3B82F6'
    },
    {
      id: 'heavy',
      name: 'Super Earth',
      description: 'Earth with 10x more mass',
      massMultiplier: 10.0,
      color: '#EF4444'
    },
    {
      id: 'light',
      name: 'Light Earth',
      description: 'Earth with 1/10th the mass',
      massMultiplier: 0.1,
      color: '#10B981'
    },
    {
      id: 'custom',
      name: 'Custom Earth',
      description: 'Adjust Earth\'s mass yourself',
      massMultiplier: 1.0,
      color: '#8B5CF6'
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  // Calculate gravitational acceleration based on Earth's mass
  const calculateAcceleration = () => {
    const baseg = 9.8; // m/s²
    return baseg * (selectedScenario === 'custom' ? earthMass : currentScenario.massMultiplier);
  };

  const currentAcceleration = calculateAcceleration();

  // Handle animation
  const handleAnimation = () => {
    setIsAnimating(true);
    setApplePosition(10);
    setMoonPosition(10);
    
    const response: InteractionResponse = {
      interactionId: 'newton-apple-thought-experiment',
      value: `Animation with ${currentScenario.name}`,
      timestamp: Date.now(),
      conceptId: 'newton-apple-concept',
      conceptName: 'Newton\'s Apple Thought Experiment',
      conceptDescription: `Demonstrated apple and Moon falling with Earth mass at ${selectedScenario === 'custom' ? earthMass.toFixed(1) : currentScenario.massMultiplier}x normal`
    };
    handleInteractionComplete(response);

    // Animate both objects falling
    const duration = Math.max(500, 2000 / Math.sqrt(currentAcceleration / 9.8)); // Duration based on acceleration
    const interval = setInterval(() => {
      setApplePosition(prev => {
        const newPos = prev + (currentAcceleration / 9.8) * 2;
        return Math.min(newPos, 85);
      });
      setMoonPosition(prev => {
        const newPos = prev + (currentAcceleration / 9.8) * 2;
        return Math.min(newPos, 85);
      });
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnimating(false);
    }, duration);
  };

  // Reset animation
  const resetAnimation = () => {
    setApplePosition(10);
    setMoonPosition(10);
    setIsAnimating(false);
  };

  // Handle scenario change
  const handleScenarioChange = (scenario: any) => {
    setSelectedScenario(scenario.id);
    if (scenario.id !== 'custom') {
      setEarthMass(scenario.massMultiplier);
    }
    resetAnimation();
  };

  // Handle prediction
  const handlePrediction = (prediction: string) => {
    setUserPrediction(prediction);
    setShowPredictionResult(true);
    
    const isCorrect = prediction === 'A';
    const optionMap: Record<string, string> = {
      A: "Both objects would appear motionless, revealing gravity's true universal nature",
      B: 'The hammer would pull away faster, showing mass determines gravitational response',
      C: 'Both would fall toward Earth at identical rates, demonstrating equivalence of gravitational and inertial mass',
      D: "The feather would drift unpredictably, proving air resistance is gravity's hidden partner"
    };
    const selectedText = optionMap[prediction] || prediction;
    const response: InteractionResponse = {
      interactionId: 'falling-rate-prediction',
      value: selectedText,
      isCorrect: isCorrect,
      timestamp: Date.now(),
      conceptId: 'falling-rate-concept',
      conceptName: 'Falling Rate Prediction',
      conceptDescription: `Predicted: ${selectedText}. ${isCorrect ? 'Correct!' : 'Incorrect.'} Both apple and Moon experience the same gravitational acceleration.`,
      question: {
        type: 'mcq',
        question: "In orbit, what principle would an Earth observer witness when a hammer and feather are released together?",
        options: Object.values(optionMap)
      }
    };
    handleInteractionComplete(response);
  };

  return (
    <SlideComponentWrapper
      slideId="newtons-law-insight"
      slideTitle="Newton's Apple Reimagined"
      moduleId="gravitation-0001"
      submoduleId="newtons-law-of-gravitation"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-2rem)]">
          {/* Left column - Controls and Information */}
          <div className="space-y-6">
            {/* Newton's Insight */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Newton's Revolutionary Insight (1665)
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    "What if the same force that makes an apple fall 
                    also keeps the Moon in orbit around Earth?"
                  </div>
                  <div className="text-lg text-blue-600 dark:text-blue-400 font-medium mt-2">
                    - Isaac Newton, age 23
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <h4 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Before Newton</h4>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Earthly forces ≠ celestial forces</li>
                      <li>• Objects fall "naturally"</li>
                      <li>• Moon's motion unexplained</li>
                      </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">Newton's Discovery</h4>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Universal gravitation</li>
                      <li>• Same force everywhere</li>
                      <li>• Unified terrestrial & celestial</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Earth Mass Controls */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Earth Mass Experiment
              </h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {scenarios.map((scenario) => (
                    <motion.button
                      key={scenario.id}
                      className={`p-3 rounded-lg text-left transition-all duration-300 ${
                        selectedScenario === scenario.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handleScenarioChange(scenario)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium text-lg">{scenario.name}</div>
                      <div className="text-lg opacity-90">{scenario.description}</div>
                    </motion.button>
                  ))}
                </div>

                {selectedScenario === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                      Earth Mass: {earthMass.toFixed(1)}x normal
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="20"
                      step="0.1"
                      value={earthMass}
                      onChange={(e) => setEarthMass(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </motion.div>
                )}

                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Gravitational Acceleration:
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {currentAcceleration.toFixed(1)} m/s²
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insight */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
              <h4 className="text-xl font-bold text-yellow-800 dark:text-yellow-400 mb-3">
                💡 Newton's Key Insight
              </h4>
              <div className="text-lg text-yellow-800 dark:text-yellow-300">
                Both the apple and Moon experience the <strong>same gravitational acceleration</strong> towards Earth. 
                The only difference is their initial motion—the Moon has enough sideways velocity to keep "missing" Earth!
              </div>
            </div>
          </div>
          
          {/* Right column - Visualization and Quiz */}
          <div className="space-y-6">
            {/* Thought Experiment Visualization */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
                Newton's Thought Experiment
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                  <motion.button
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
                    onClick={handleAnimation}
                    disabled={isAnimating}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isAnimating ? 'Falling...' : 'Drop Both'}
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium"
                    onClick={resetAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset
                  </motion.button>
                </div>
              
              {/* Visualization Area */}
              <div className="relative w-full h-64 bg-gradient-to-b from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg mb-6 overflow-hidden">
                {/* Ground */}
                <div className="absolute bottom-0 w-full h-8 bg-green-400 dark:bg-green-700"></div>
                
                {/* Apple Tree */}
                <div className="absolute bottom-8 left-[20%] w-4 h-16 bg-amber-600 dark:bg-amber-800"></div>
                <div className="absolute bottom-20 left-[15%] w-6 h-6 bg-green-500 dark:bg-green-600 rounded-full"></div>
                <div className="absolute bottom-20 left-[20%] w-6 h-6 bg-green-500 dark:bg-green-600 rounded-full"></div>
                <div className="absolute bottom-20 left-[25%] w-6 h-6 bg-green-500 dark:bg-green-600 rounded-full"></div>
                
                {/* Apple */}
                <motion.div
                  className="absolute w-4 h-4 bg-red-500 rounded-full"
                  style={{
                    left: '22%',
                    top: `${applePosition}%`
                  }}
                  animate={{
                    rotate: isAnimating ? 360 : 0
                  }}
                  transition={{
                    rotate: { duration: 1, repeat: isAnimating ? Infinity : 0, ease: "linear" }
                  }}
                />
                

                
                {/* Moon */}
                <motion.div
                  className="absolute w-6 h-6 bg-gray-300 rounded-full border-2 border-gray-500"
                  style={{
                    right: '22%',
                    top: `${moonPosition}%`
                  }}
                />
                
                {/* Force Arrows */}
                {isAnimating && (
                  <>
                    {/* Apple arrow */}
                    <motion.div
                      className="absolute"
                      style={{
                        left: '20%',
                        top: `${applePosition + 5}%`
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg width="20" height="30" className="text-red-600">
                        <defs>
                          <marker id="arrowhead-apple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                          </marker>
                        </defs>
                        <line x1="10" y1="5" x2="10" y2="25" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead-apple)" />
                      </svg>
                    </motion.div>
                    
                    {/* Moon arrow */}
                    <motion.div
                      className="absolute"
                      style={{
                        right: '20%',
                        top: `${moonPosition + 5}%`
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg width="20" height="30" className="text-gray-600">
                        <defs>
                          <marker id="arrowhead-moon" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                          </marker>
                        </defs>
                        <line x1="10" y1="5" x2="10" y2="25" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead-moon)" />
                      </svg>
                    </motion.div>
                  </>
                )}
                
                {/* Labels */}
                <div className="absolute bottom-2 left-[18%] text-lg font-medium text-gray-700 dark:text-gray-300">
                  Apple
                </div>
                <div className="absolute bottom-2 right-[18%] text-lg font-medium text-gray-700 dark:text-gray-300">
                  Moon
                </div>
                
                {/* Status display */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full text-lg font-medium">
                  {isAnimating ? `Falling at ${currentAcceleration.toFixed(1)} m/s²` : 'Ready to drop'}
                </div>
              </div>

              {/* Experiment Info */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <h5 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                  The Thought Experiment
                </h5>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  If we could remove the Moon's orbital motion and let it fall straight down to Earth, 
                  would it fall at the same rate as an apple? Newton said <strong>YES!</strong>
                </div>
              </div>
            </div>

            {/* Quick Check Quiz */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Quick Check
              </h4>
                  
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  Imagine you're on a space station orbiting Earth. You release a hammer and a feather simultaneously. In this environment, what fundamental principle would an observer on Earth witness about the nature of gravitational attraction?
                </p>
                
                <div className="space-y-2">
                  {[
                    { id: 'A', text: 'Both objects would appear motionless, revealing gravity\'s true universal nature' },
                    { id: 'B', text: 'The hammer would pull away faster, showing mass determines gravitational response' },
                    { id: 'C', text: 'Both would fall toward Earth at identical rates, demonstrating equivalence of gravitational and inertial mass' },
                    { id: 'D', text: 'The feather would drift unpredictably, proving air resistance is gravity\'s hidden partner' }
                  ].map((option) => (
                    <motion.button
                      key={option.id}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-lg ${
                        userPrediction === option.id
                          ? userPrediction === 'C'
                            ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                      }`}
                      onClick={() => handlePrediction(option.id)}
                      disabled={userPrediction !== null}
                      whileHover={{ scale: userPrediction === null ? 1.02 : 1 }}
                      whileTap={{ scale: userPrediction === null ? 0.98 : 1 }}
                    >
                      <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">
                        {option.id}.
                      </span>
                      {option.text}
                    </motion.button>
                  ))}
                </div>

                {showPredictionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-lg ${
                      userPrediction === 'C'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {userPrediction === 'C' ? (
                      <div>
                        <div className="font-bold mb-2">Excellent insight! 🎯</div>
                        <div>
                          You've grasped the profound equivalence principle! Even in the weightless environment of orbit, 
                          gravity still acts—both objects fall toward Earth at the same rate, revealing that gravitational 
                          mass equals inertial mass. This deep principle later inspired Einstein's theory of general relativity.
                        </div>
                      </div>
                    ) : userPrediction === 'A' ? (
                      <div>
                        <div className="font-bold mb-2">Interesting perspective!</div>
                        <div>
                          While the objects do appear to move together relative to the space station, they're actually both 
                          falling toward Earth at identical rates. This reveals the equivalence of gravitational and inertial mass—
                          the answer is C. This principle transcends the reference frame!
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold mb-2">Think deeper!</div>
                        <div>
                          The correct answer is C. In the vacuum of space, both hammer and feather fall toward Earth at identical 
                          rates, demonstrating that gravitational acceleration is independent of an object's mass. This equivalence 
                          of gravitational and inertial mass is one of physics' most profound insights.
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 