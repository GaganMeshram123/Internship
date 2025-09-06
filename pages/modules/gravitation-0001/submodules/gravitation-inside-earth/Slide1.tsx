import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function InsideEarthSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedDepth, setSelectedDepth] = useState<number>(0); // 0 = surface, 1 = half depth, 2 = center
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'deep-earth-exploration',
      conceptId: 'deep-earth-exploration',
      conceptName: 'Deep Earth Gravity Exploration',
      type: 'learning',
      description: 'Exploring how gravity changes as you go deeper into Earth using Shell Theorem'
    },
    {
      id: 'depth-force-relationship',
      conceptId: 'depth-force-relationship',
      conceptName: 'Depth vs Force Relationship',
      type: 'learning',
      description: 'Understanding the relationship between depth and gravitational force'
    },
    {
      id: 'center-earth-quiz',
      conceptId: 'center-earth-quiz',
      conceptName: 'Center of Earth Quiz',
      type: 'judging',
      description: 'Testing understanding of gravity at Earth\'s center'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const depthScenarios = [
    {
      id: 0,
      title: 'Earth\'s Surface',
      depth: '0 km',
      description: 'Standard gravitational acceleration at sea level',
      force: 'g = 9.8 m/s²',
      explanation: 'All of Earth\'s mass contributes to gravitational force',
      relativeForce: 1.0,
      color: '#3B82F6'
    },
    {
      id: 1,
      title: 'Deep Mine (3.2 km)',
      depth: '3,200 m below surface',
      description: 'Very deep but still near surface',
      force: 'g ≈ 9.79 m/s²',
      explanation: 'Nearly all of Earth\'s mass still contributes - minimal reduction',
      relativeForce: 0.999,
      color: '#1D4ED8'
    },
    {
      id: 2,
      title: 'Earth\'s Center',
      depth: '6,400 km below surface',
      description: 'At the very center of Earth',
      force: 'g = 0 m/s²',
      explanation: 'No mass is \'below\' you - forces cancel perfectly',
      relativeForce: 0.0,
      color: '#1E3A8A'
    }
  ];

  const currentScenario = depthScenarios[selectedDepth];

  const handleDepthChange = (depth: number) => {
    setSelectedDepth(depth);
    
    const response: InteractionResponse = {
      interactionId: 'depth-force-relationship',
      value: depthScenarios[depth].title,
      timestamp: Date.now(),
      conceptId: 'depth-force-relationship',
      conceptName: 'Depth vs Force Relationship',
      conceptDescription: `Explored gravity at ${depthScenarios[depth].title}: ${depthScenarios[depth].explanation}`
    };
    handleInteractionComplete(response);
  };

  const handleQuizAnswer = (answerId: string) => {
    const isCorrect = answerId === 'zero_gravity';
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    const optionTextMap: Record<string, string> = {
      zero_gravity: 'Zero gravitational force - perfectly weightless',
      maximum_gravity: 'Maximum gravitational force - closest to all mass',
      surface_gravity: "Same as surface gravity - distance doesn't matter"
    };
    
    const response: InteractionResponse = {
      interactionId: 'center-earth-quiz',
      value: optionTextMap[answerId] || answerId,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'center-earth-quiz',
      conceptName: 'Center of Earth Quiz',
      conceptDescription: "Testing understanding of gravity at Earth's center",
      question: {
        type: 'mcq',
        question: "An astronaut at the exact center of Earth would experience what gravitational force?",
        options: [
          'Zero gravitational force - perfectly weightless',
          'Maximum gravitational force - closest to all mass',
          "Same as surface gravity - distance doesn't matter"
        ]
      }
    };
    
    handleInteractionComplete(response);
  };

  return (
    <SlideComponentWrapper
      slideId="shell-theorem-inside-earth"
      slideTitle="Journey to Earth's Center"
      moduleId="gravitation-0001"
      submoduleId="gravitation-inside-earth"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Introduction and Shell Theorem Connection */}
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <TrackedInteraction 
                interaction={slideInteractions[0]} 
                onInteractionComplete={handleInteractionComplete}
              >
              <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                      From Shell Theorem to Deep Earth
                    </h3>
                    <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      We discovered that for a point inside a solid sphere, only the mass within that point's radius contributes to the gravitational force. The outer shells contribute zero force.
                    </div>
                  </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Key Shell Theorem Result</h4>
                    <div className="text-center my-3">
                      <BlockMath math="F = G \frac{m \cdot M_{inner}}{r^2}" />
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-400 text-center">
                      Where <InlineMath math="M_{inner}" /> is only the mass within radius r
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                      The Intriguing Question
                    </h4>
                    <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      We know gravity at Earth's surface and above. But what happens when we journey deeper? 
                      Would gravity get stronger as we get closer to Earth's center, or does something unexpected occur?
                    </div>
                  </div>



                  {/* Current Scenario Details */}
                  <motion.div 
                    key={selectedDepth}
                    className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Current Location: {currentScenario.title}
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Gravity: </span>
                        <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">{currentScenario.force}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Why: </span>
                        <span className="text-gray-600 dark:text-gray-400 text-lg">{currentScenario.explanation}</span>
                      </div>
                      </div>
                  </motion.div>
                </div>
              </TrackedInteraction>
            </div>
          </div>
          
          {/* Right Column - Visualization and Quiz */}
          <div className="space-y-6">
            {/* Interactive Depth Explorer */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Depth Explorer
              </h3>
              <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Select different depths to see how gravity changes:
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {depthScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => handleDepthChange(scenario.id)}
                    className={`p-3 rounded-lg text-center transition-all duration-300 text-lg ${
                      selectedDepth === scenario.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-bold text-base">{scenario.title}</div>
                    <div className="opacity-90 text-sm">{scenario.depth}</div>
                  </button>
                ))}
              </div>
              
              <div className="aspect-square bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <svg width="100%" height="100%" viewBox="0 0 400 400" className="w-full h-full">
                  {/* Space background */}
                  <rect width="400" height="400" fill={isDarkMode ? "#1a202c" : "#f7fafc"} />
                  
                  {/* Stars */}
                  {[...Array(15)].map((_, i) => (
                    <motion.circle
                      key={i}
                      cx={50 + (i * 23) % 300}
                      cy={50 + (i * 17) % 300}
                      r="1"
                      fill={isDarkMode ? "#ffffff" : "#4a5568"}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2 + (i % 3), repeat: Infinity }}
                    />
                  ))}
                  
                  {/* Earth - outer shell */}
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="120"
                    fill="#4299e1"
                    stroke="#2b6cb0"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                  />
                  
                  {/* Earth gradient and layers */}
                  <defs>
                    <radialGradient id="earthGradient" cx="0.5" cy="0.5">
                      <stop offset="0%" stopColor="#f56565" />
                      <stop offset="40%" stopColor="#ed8936" />
                      <stop offset="70%" stopColor="#4299e1" />
                      <stop offset="100%" stopColor="#2b6cb0" />
                    </radialGradient>
                    
                    <marker
                      id="arrowhead-inside"
                      markerWidth="8"
                      markerHeight="6"
                      refX="7"
                      refY="3"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 8 3, 0 6"
                        fill="#ef4444"
                      />
                    </marker>
                  </defs>
                  
                  <circle cx="200" cy="200" r="118" fill="url(#earthGradient)" />
                  
                  {/* Earth center */}
                  <circle cx="200" cy="200" r="6" fill="#dc2626" />
                  
                  {/* Radius line to surface */}
                  <motion.line
                    x1="200"
                    y1="200"
                    x2="200"
                    y2="80"
                    stroke="#6b7280"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  
                  {/* Radius label */}
                  <motion.text
                    x="210"
                    y="140"
                    fill={isDarkMode ? "#ffffff" : "#000000"}
                    fontSize="10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    R = 6400 km
                  </motion.text>
                  
                  {/* Test mass at different depths */}
                  <motion.circle
                    cx="200"
                    cy={selectedDepth === 0 ? 70 : selectedDepth === 1 ? 85 : 200}
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
                    x="215"
                    y={selectedDepth === 0 ? 75 : selectedDepth === 1 ? 90 : 185}
                    fill="#e53e3e"
                    fontSize="10"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Test mass
                  </motion.text>
                  
                  {/* Force vector (only show if not at center) */}
                  {selectedDepth !== 2 && (
                    <motion.line
                      x1="200"
                      y1={selectedDepth === 0 ? 78 : 93}
                      x2="200"
                      y2={selectedDepth === 0 ? 110 : 115}
                      stroke="#ef4444"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead-inside)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 2 }}
                    />
                  )}
                  
                  {/* Force magnitude indicator */}
                  <motion.text
                    x="230"
                    y={45}
                    fill="#ef4444"
                    fontSize="12"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                  >
                    {currentScenario.force}
                  </motion.text>
                  
                  {/* Contributing mass visualization - show almost full Earth for shallow depth */}
                  {selectedDepth === 1 && (
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="115"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
                    />
                  )}
                  
                  {/* Inner mass label for shallow depth case */}
                  {selectedDepth === 1 && (
                    <motion.text
                      x="80"
                      y="350"
                      fill="#10b981"
                      fontSize="12"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      Nearly all of Earth's mass still contributes
                    </motion.text>
                  )}

                  {/* Inner mass label for center depth case */}
                  {selectedDepth === 2 && (
                    <motion.text
                      x="80"
                      y="350"
                      fill="#10b981"
                      fontSize="12"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      No mass is "below" you - forces cancel perfectly
                    </motion.text>
                  )}
                </svg>
              </div>
              
              <div className="text-lg text-gray-600 dark:text-gray-400">
                As you go deeper, less mass is "below" you to provide gravitational pull.
              </div>
            </div>

            {/* Quick Check Quiz */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Quick Check
              </h3>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  An astronaut at the exact center of Earth would experience what gravitational force?
                </p>
                
                <TrackedInteraction 
                  interaction={slideInteractions[2]} 
                  onInteractionComplete={handleInteractionComplete}
                >
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuizAnswer('zero_gravity')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'zero_gravity'
                          ? 'border-green-500 bg-green-100 dark:bg-green-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      Zero gravitational force - perfectly weightless
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('maximum_gravity')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'maximum_gravity'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      Maximum gravitational force - closest to all mass
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('surface_gravity')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'surface_gravity'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      Same as surface gravity - distance doesn't matter
                    </button>
              </div>
                  
                  {showFeedback && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      selectedAnswer === 'zero_gravity' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswer === 'zero_gravity' ? (
                        <p>Correct! At Earth's center, mass is distributed equally in all directions around you. All gravitational forces cancel out perfectly, resulting in zero net force. You would float weightlessly!</p>
                      ) : (
                        <p>Not quite. At Earth's center, you're surrounded by mass in all directions. The Shell Theorem tells us these forces cancel out completely, resulting in zero gravitational force.</p>
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