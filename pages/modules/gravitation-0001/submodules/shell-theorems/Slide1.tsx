import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SuperpositionSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedMode, setSelectedMode] = useState<string>('point-particles');
  const [showForceVectors, setShowForceVectors] = useState<boolean>(true);
  const [animateVectors, setAnimateVectors] = useState<boolean>(false);
  const [highlightedPoint, setHighlightedPoint] = useState<number | null>(null);
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  const [showPredictionResult, setShowPredictionResult] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'point-vs-extended-objects',
      conceptId: 'point-vs-extended-concept',
      conceptName: 'Point Particles vs Extended Objects',
      type: 'learning',
      description: 'Understanding the difference between point particles and extended objects in gravity'
    },
    {
      id: 'extended-object-complexity',
      conceptId: 'extended-object-complexity-concept',
      conceptName: 'Extended Object Complexity',
      type: 'learning',
      description: 'Exploring the complexity of calculating forces from extended objects'
    },
    {
      id: 'force-vector-visualization',
      conceptId: 'force-vector-concept',
      conceptName: 'Force Vector Visualization',
      type: 'learning',
      description: 'Interactive exploration of force vectors from multiple mass points'
    },
    {
      id: 'shell-theorem-motivation',
      conceptId: 'shell-theorem-motivation-concept',
      conceptName: 'Shell Theorem Motivation',
      type: 'judging',
      description: 'Understanding why we need the Shell Theorem for extended objects'
    }
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Extended object simulation - circular object with multiple mass points
  const extendedObjectCenter = { x: 25, y: 50 }; // Percentage coordinates
  const objectRadius = 12; // Percentage
  const numMassPoints = 12;
  const pointParticle = { x: 75, y: 50 }; // Test particle position

  // Generate mass points around the extended object
  const generateMassPoints = () => {
    const points = [];
    for (let i = 0; i < numMassPoints; i++) {
      const angle = (i / numMassPoints) * 2 * Math.PI;
      const x = extendedObjectCenter.x + objectRadius * Math.cos(angle);
      const y = extendedObjectCenter.y + objectRadius * Math.sin(angle);
      points.push({ x, y, mass: 1 + Math.random() * 0.5 }); // Random masses between 1 and 1.5
    }
    return points;
  };

  const massPoints = generateMassPoints();

  // Calculate force vector for visualization
  const calculateForceVector = (massPoint: any, target: any) => {
    const dx = target.x - massPoint.x;
    const dy = target.y - massPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const magnitude = massPoint.mass / (distance * distance); // Simplified for visualization
    
    return {
      magnitude,
      direction: { x: dx / distance, y: dy / distance },
      start: massPoint,
      end: target
    };
  };

  // Handle mode change
  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
    setAnimateVectors(true);
    setTimeout(() => setAnimateVectors(false), 1500);
    
    const response: InteractionResponse = {
      interactionId: mode === 'point-particles' ? 'point-vs-extended-objects' : 'extended-object-complexity',
      value: mode,
      timestamp: Date.now(),
      conceptId: mode === 'point-particles' ? 'point-vs-extended-concept' : 'extended-object-complexity-concept',
      conceptName: mode === 'point-particles' ? 'Point Particles vs Extended Objects' : 'Extended Object Complexity',
      conceptDescription: `Explored ${mode} scenario for gravitational force calculation`
    };
    handleInteractionComplete(response);
  };

  // Handle force vector toggle
  const handleVectorToggle = () => {
    setShowForceVectors(!showForceVectors);
    
    const response: InteractionResponse = {
      interactionId: 'force-vector-visualization',
      value: showForceVectors ? 'hide-vectors' : 'show-vectors',
      timestamp: Date.now(),
      conceptId: 'force-vector-concept',
      conceptName: 'Force Vector Visualization',
      conceptDescription: `${showForceVectors ? 'Hid' : 'Showed'} force vectors between mass points and test particle`
    };
    handleInteractionComplete(response);
  };

  // Handle prediction
  const handlePrediction = (prediction: string) => {
    setUserPrediction(prediction);
    setShowPredictionResult(true);
    
    const isCorrect = prediction === 'C';
    const optionTextMap: Record<string, string> = {
      A: 'Treat the planet as a single point mass at its center',
      B: "Ignore the planet's internal structure completely",
      C: 'Sum the forces from every tiny piece of the planet',
      D: 'Use a different physics law for extended objects'
    };
    const response: InteractionResponse = {
      interactionId: 'shell-theorem-motivation',
      value: optionTextMap[prediction] || prediction,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'shell-theorem-motivation-concept',
      conceptName: 'Shell Theorem Motivation',
      conceptDescription: `Predicted ${optionTextMap[prediction] || prediction}. ${isCorrect ? 'Correct!' : 'Incorrect.'} Extended objects require summing many individual point forces.`,
      question: {
        type: 'mcq',
        question: 'How would you calculate the gravitational force from an imaginary planet of the shape of a doughnut on a small test mass?',
        options: [
          'Treat the planet as a single point mass at its center',
          "Ignore the planet's internal structure completely",
          'Sum the forces from every tiny piece of the planet',
          'Use a different physics law for extended objects'
        ]
      }
    };
    handleInteractionComplete(response);
  };

  return (
    <SlideComponentWrapper
      slideId="superposition-principle"
      slideTitle="From Point Particles to Extended Objects"
      moduleId="gravitation-0001"
      submoduleId="shell-theorems"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-2rem)]">
          {/* Left column - Concept */}
          <div className="space-y-6">
            {/* The Fundamental Question */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                The Fundamental Question
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="text-lg text-gray-800 dark:text-gray-300 font-medium">
                    Newton's Law works perfectly for point particles...
                  </div>
                  <div className="text-center my-3">
                    <BlockMath math="F = G \frac{m_1 m_2}{r^2}" />
                  </div>
                  <div className="text-lg text-gray-800 dark:text-gray-300 font-medium">
                    But what happens when objects have size and shape?
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">Point Particles</h4>
                    <ul className="text-lg text-green-700 dark:text-green-300 space-y-1">
                      <li>• Infinite density</li>
                      <li>• Single distance r</li>
                      <li>• Simple calculation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Extended Objects</h4>
                    <ul className="text-lg text-red-700 dark:text-red-300 space-y-1">
                      <li>• Distributed mass</li>
                      <li>• Many distances</li>
                      <li>• Complex calculation?</li>
                    </ul>
                  </div>
                </div>
                      </div>
                      </div>


                  
            {/* The Problem */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                The Challenge
              </h4>
              
              <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <strong>Real objects</strong> like planets, stars, and people are not point particles.
                  They have size, shape, and distributed mass.
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <strong>Each tiny piece</strong> of an extended object exerts its own gravitational force.
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <strong>The total force</strong> is the vector sum of ALL these individual forces.
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                  <strong className="text-orange-600 dark:text-orange-400">Question:</strong> Does this make gravity 
                  calculations impossibly complex for real objects?
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Interactive Controls and Visualization */}
          <div className="space-y-6">
            {/* Interactive Controls */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Interactive Exploration
              </h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Choose Scenario:
                  </h5>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'point-particles', name: 'Two Point Particles', description: 'Simple case - single force calculation' },
                      { id: 'extended-object', name: 'Extended Object + Point', description: 'Complex case - multiple force calculations' }
                    ].map((mode) => (
                      <motion.button
                        key={mode.id}
                        className={`p-3 rounded-lg text-left transition-all duration-300 ${
                          selectedMode === mode.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handleModeChange(mode.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium text-lg">{mode.name}</div>
                        <div className="text-lg opacity-90">{mode.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                    Current Scenario Analysis
                  </h5>
                  {selectedMode === 'point-particles' ? (
                    <div className="text-lg text-gray-700 dark:text-gray-300">
                      <strong>Simple:</strong> Just one force calculation between two point masses.
                      Newton's law applies directly.
                    </div>
                  ) : (
                    <div className="text-lg text-gray-700 dark:text-gray-300">
                      <strong>Complex:</strong> Must calculate {numMassPoints} separate forces from each 
                      mass point in the extended object, then add them vectorially!
                    </div>
                  )}
                </div>
              </div>
              
              {/* Visualization Area */}
              <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-900 rounded-lg mb-6 overflow-hidden">
                {selectedMode === 'point-particles' ? (
                  // Simple point particle scenario
                  <>
                    {/* Point Particle 1 */}
                    <div
                      className="absolute bg-blue-500 rounded-full border-4 border-blue-300 flex items-center justify-center font-bold text-white"
                      style={{
                        left: `${extendedObjectCenter.x}%`,
                        top: `${extendedObjectCenter.y}%`,
                        width: '32px',
                        height: '32px',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      m₁
                    </div>

                    {/* Point Particle 2 */}
                    <motion.div
                      className="absolute bg-red-500 rounded-full border-4 border-red-300 flex items-center justify-center font-bold text-white"
                      style={{
                        left: `${pointParticle.x}%`,
                        top: `${pointParticle.y}%`,
                        width: '32px',
                        height: '32px',
                        transform: 'translate(-50%, -50%)'
                      }}
                      animate={{
                        boxShadow: showForceVectors ? '0 0 20px #EF4444' : '0 0 0px #EF4444'
                      }}
                    >
                      m₂
                    </motion.div>

                    {/* Single Force Vector */}
                    {showForceVectors && (
                      <svg className="absolute inset-0 w-full h-full">
                        <defs>
                          <marker
                            id="arrowhead-simple"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                          </marker>
                        </defs>
                        
                        <motion.line
                          x2={`${extendedObjectCenter.x + 5}%`}
                          y2={`${extendedObjectCenter.y}%`}
                          x1={`${pointParticle.x - 5}%`}
                          y1={`${pointParticle.y}%`}
                          stroke="#10B981"
                          strokeWidth="4"
                          markerEnd="url(#arrowhead-simple)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: animateVectors ? 1 : 1 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                        
                        <text x={`${(extendedObjectCenter.x + pointParticle.x) / 2}%`} y={`${extendedObjectCenter.y - 8}%`} 
                              fill="#10B981" className="text-lg font-bold">
                          F
                        </text>
                      </svg>
                    )}
                  </>
                ) : (
                  // Extended object scenario
                  <>
                    {/* Extended Object - Outer Circle */}
                    <div
                      className="absolute border-4 border-blue-500 rounded-full"
                      style={{
                        left: `${extendedObjectCenter.x}%`,
                        top: `${extendedObjectCenter.y}%`,
                        width: `${objectRadius * 2 * 6}px`,
                        height: `${objectRadius * 2 * 6}px`,
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(59, 130, 246, 0.3)'
                      }}
                    />

                    {/* Mass Points */}
                    {massPoints.map((point, index) => (
                      <div
                        key={index}
                        className="absolute w-3 h-3 bg-blue-600 rounded-full cursor-pointer"
                        style={{
                          left: `${point.x}%`,
                          top: `${point.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    ))}

                    {/* Test Particle */}
                    <motion.div
                      className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-red-300 flex items-center justify-center font-bold text-white text-sm"
                      style={{
                        left: `${pointParticle.x}%`,
                        top: `${pointParticle.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      animate={{
                        boxShadow: showForceVectors ? '0 0 15px #EF4444' : '0 0 0px #EF4444'
                      }}
                    >
                      m
                    </motion.div>

                    {/* Multiple Force Vectors */}
                    {showForceVectors && (
                      <svg className="absolute inset-0 w-full h-full">
                        <defs>
                          <marker
                            id="arrowhead-multi"
                            markerWidth="8"
                            markerHeight="6"
                            refX="7"
                            refY="3"
                            orient="auto"
                          >
                            <polygon points="0 0, 8 3, 0 6" fill="#F59E0B" />
                          </marker>
                        </defs>
                        
                        {massPoints.map((point, index) => {
                          const vector = calculateForceVector(point, pointParticle);
                          const opacity = highlightedPoint === null || highlightedPoint === index ? 1 : 0.3;
                          
                          return (
                            <motion.line
                              key={index}
                              x2={`${point.x}%`}
                              y2={`${point.y}%`}
                              x1={`${pointParticle.x - 2}%`}
                              y1={`${pointParticle.y}%`}
                              stroke="#F59E0B"
                              strokeWidth="2"
                              markerEnd="url(#arrowhead-multi)"
                              opacity={opacity}
                              initial={{ pathLength: 0 }}
                              animate={{ 
                                pathLength: animateVectors ? 1 : 1,
                                opacity: opacity
                              }}
                              transition={{ 
                                duration: 1.2, 
                                delay: animateVectors ? index * 0.1 : 0,
                                ease: "easeOut" 
                              }}
                            />
                          );
                        })}
                      </svg>
                    )}
                  </>
                )}

                {/* Status Display */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg text-base">
                  <div className="font-medium">
                    {selectedMode === 'point-particles' ? 
                      'Simple Point-Point Force' : 
                      'Multiple Force Calculations'}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {selectedMode === 'point-particles' ? 
                      '1 force vector' : 
                      `Many force vectors`}
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg text-base">
                  <div className="space-y-1 grid grid-cols-2 gap-2">
                    {selectedMode === 'point-particles' ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          <span>Point Mass 1</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                          <span>Point Mass 2</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-500 rounded-full opacity-60"></div>
                          <span>Extended Object</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                          <span>Test Particle</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Analysis */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <h5 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                  Complexity Analysis
                </h5>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  {selectedMode === 'point-particles' ? (
                    <>
                      <strong>Point Particles:</strong> Simple! One force calculation using Newton's law.
                      Distance is clear, masses are defined.
                    </>
                  ) : (
                    <>
                      <strong>Extended Object:</strong> Complex! Need to calculate many separate forces, 
                      each with different distances and directions, then add vectorially. Imagine if this was a 
                      planet with 10²³ atoms!
                    </>
                  )}
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
                  How would you calculate the gravitational force from an imaginary planet of the shape of a doughnut on a small test mass?
                </p>
                
                <div className="space-y-2">
                  {[
                    { id: 'A', text: 'Treat the planet as a single point mass at its center' },
                    { id: 'B', text: 'Ignore the planet\'s internal structure completely' },
                    { id: 'C', text: 'Sum the forces from every tiny piece of the planet' },
                    { id: 'D', text: 'Use a different physics law for extended objects' }
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
                        <div className="font-bold mb-2">Correct!</div>
                    <div>
                          Mathematically, you must sum forces from every tiny piece. But this seems impossibly 
                          complex for real objects! Fortunately, the Shell Theorem shows us that for spherically 
                          symmetric objects, option A is actually correct too.
                        </div>
                    </div>
                    ) : userPrediction === 'A' ? (
                      <div>
                        <div className="font-bold mb-2">Interesting choice!</div>
                        <div>
                          This turns out to be correct for spherically symmetric objects due to the Shell Theorem! 
                          But fundamentally, the answer is C - we must sum all individual forces. The Shell Theorem 
                          proves these are equivalent.
                    </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold mb-2">Not quite right</div>
                        <div>
                          The correct answer is C. Fundamentally, gravity from an extended object is the vector sum 
                          of forces from all its constituent parts. This seems incredibly complex, which is exactly 
                          why we need the Shell Theorem!
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