import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction, useJudgingInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SuperpositionSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [demonstrationMode, setDemonstrationMode] = useState<string>('shell-forces');
  const [showCenterMass, setShowCenterMass] = useState<boolean>(false);
  const [showForceVectors, setShowForceVectors] = useState<boolean>(true);
  const [animateProof, setAnimateProof] = useState<boolean>(false);
  const testParticlePosition = 0; // Fixed position - percentage from center
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  const [showPredictionResult, setShowPredictionResult] = useState<boolean>(false);
  const [highlightedMassPoint, setHighlightedMassPoint] = useState<number | null>(null);
  const { isDarkMode } = useThemeContext();

  const handleJudgingInteraction = useJudgingInteraction();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'shell-theorem-demonstration',
      conceptId: 'shell-theorem-concept',
      conceptName: 'Shell Theorem Demonstration',
      type: 'learning',
      description: 'Interactive demonstration of how spherical shell acts as point mass at center'
    },
    {
      id: 'force-equivalence-exploration',
      conceptId: 'force-equivalence-concept',
      conceptName: 'Force Equivalence Exploration',
      type: 'learning',
      description: 'Exploring the equivalence between distributed shell forces and center point mass'
    },
    {
      id: 'shell-vs-point-comparison',
      conceptId: 'shell-vs-point-concept',
      conceptName: 'Shell vs Point Mass Comparison',
      type: 'learning',
      description: 'Comparing gravitational effects of shell vs equivalent point mass'
    },
    {
      id: 'shell-theorem-prediction',
      conceptId: 'shell-theorem-prediction-concept',
      conceptName: 'Shell Theorem Prediction',
      type: 'judging',
      description: 'Testing understanding of Shell Theorem implications'
    }
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Shell configuration
  const shellCenter = { x: 30, y: 50 }; // Percentage coordinates
  const shellInnerRadius = 55; // Inner radius of shell
  const shellOuterRadius = 60; // Outer radius of shell  
  const shellMass = 100; // Total mass of shell
  const testMass = 1; // Mass of test particle
  const numShellPoints = 16; // For force calculations (hidden points)

  // Generate points on the visible shell surface for force vectors
  const generateShellPoints = () => {
    const points = [];
    const massPerPoint = shellMass / numShellPoints;
    
    // With square container, we can use percentage coordinates directly
    const radiusPercent = shellOuterRadius * 0.25; // Match the visual shell radius
    
    for (let i = 0; i < numShellPoints; i++) {
      const angle = (i / numShellPoints) * 2 * Math.PI;
      
      // Calculate position directly in percentage (perfect circle in square container)
      const x = shellCenter.x + radiusPercent * Math.cos(angle);
      const y = shellCenter.y + radiusPercent * Math.sin(angle);
      
      points.push({ 
        x, 
        y, 
        mass: massPerPoint,
        id: i
      });
    }
    return points;
  };

  const shellPoints = generateShellPoints();

  // Calculate test particle position
  const getTestParticlePosition = () => {
    const distance = shellOuterRadius + (testParticlePosition / 100) * 40; // Scale distance
    return {
      x: shellCenter.x + distance,
      y: shellCenter.y
    };
  };

  const testParticle = getTestParticlePosition();

  // Calculate gravitational force from shell point to test particle
  const calculateForceFromPoint = (shellPoint: any, testPos: any) => {
    const dx = testPos.x - shellPoint.x;
    const dy = testPos.y - shellPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const G = 6.674e-11; // Not used in visualization, just for reference
    
    // Simplified force for visualization
    const forceMagnitude = shellPoint.mass * testMass / (distance * distance);
    const forceDirection = { x: dx / distance, y: dy / distance };
    
    return {
      magnitude: forceMagnitude,
      direction: forceDirection,
      components: {
        x: forceMagnitude * forceDirection.x,
        y: forceMagnitude * forceDirection.y
      }
    };
  };

  // Calculate net force from all shell points
  const calculateNetForceFromShell = () => {
    let netForceX = 0;
    let netForceY = 0;
    
    shellPoints.forEach(point => {
      const force = calculateForceFromPoint(point, testParticle);
      netForceX += force.components.x;
      netForceY += force.components.y;
    });
    
    const netMagnitude = Math.sqrt(netForceX * netForceX + netForceY * netForceY);
    const netDirection = { 
      x: netForceX / netMagnitude, 
      y: netForceY / netMagnitude 
    };
    
    return {
      magnitude: netMagnitude,
      direction: netDirection,
      components: { x: netForceX, y: netForceY }
    };
  };

  // Calculate force from equivalent point mass at center
  const calculateForceFromCenter = () => {
    const dx = testParticle.x - shellCenter.x;
    const dy = testParticle.y - shellCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const forceMagnitude = shellMass * testMass / (distance * distance);
    const forceDirection = { x: -dx / distance, y: -dy / distance }; // Toward center
    
    return {
      magnitude: forceMagnitude,
      direction: forceDirection,
      components: {
        x: forceMagnitude * forceDirection.x,
        y: forceMagnitude * forceDirection.y
      }
    };
  };

  const netShellForce = calculateNetForceFromShell();
  const centerForce = calculateForceFromCenter();

  // Handle demonstration mode change
  const handleModeChange = (mode: string) => {
    setDemonstrationMode(mode);
    setAnimateProof(true);
    setTimeout(() => setAnimateProof(false), 2000);

    if (mode === 'shell-forces') {
      setShowCenterMass(false);
    } else {
      setShowCenterMass(true);
    }
    
    const response: InteractionResponse = {
      interactionId: mode === 'shell-forces' ? 'shell-theorem-demonstration' : 'force-equivalence-exploration',
      value: mode,
      timestamp: Date.now(),
      conceptId: mode === 'shell-forces' ? 'shell-theorem-concept' : 'force-equivalence-concept',
      conceptName: mode === 'shell-forces' ? 'Shell Theorem Demonstration' : 'Force Equivalence Exploration',
      conceptDescription: `Demonstrated ${mode} scenario showing gravitational force calculation`
    };
    handleInteractionComplete(response);
  };

  // Handle prediction
  const handlePrediction = (prediction: string) => {
    setUserPrediction(prediction);
    setShowPredictionResult(true);
    
    const isCorrect = prediction === 'A';
    const optionTextMap: Record<string, string> = {
      A: 'It decreases as 1/r², exactly like a point mass would',
      B: 'It decreases faster than 1/r² because the shell is extended',
      C: 'It decreases slower than 1/r² because mass is distributed',
      D: 'It remains constant regardless of distance'
    };
    const response: InteractionResponse = {
      interactionId: 'shell-theorem-prediction',
      value: optionTextMap[prediction] || prediction,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'shell-theorem-prediction-concept',
      conceptName: 'Shell Theorem Prediction',
      conceptDescription: `Predicted ${optionTextMap[prediction] || prediction}. ${isCorrect ? 'Correct!' : 'Incorrect.'} Shell Theorem shows both forces are identical.`,
      question: {
        type: 'mcq',
        question: 'According to the Shell Theorem, what happens to the gravitational force as you move the test particle farther from the shell?',
        options: [
          'It decreases as 1/r², exactly like a point mass would',
          'It decreases faster than 1/r² because the shell is extended',
          'It decreases slower than 1/r² because mass is distributed',
          'It remains constant regardless of distance'
        ]
      }
    };
    handleInteractionComplete(response);
  };

  return (
    <SlideComponentWrapper
      slideId="shell-theorem-external"
      slideTitle="The Shell Theorem"
      moduleId="gravitation-0001"
      submoduleId="shell-theorems"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-2rem)]">
          {/* Left column - Theory and Controls */}
          <div className="space-y-6">
            {/* Shell Theorem Statement */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                The Shell Theorem
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-lg text-blue-800 dark:text-blue-300 font-medium mb-3">
                    For a particle outside a spherically symmetric shell of mass M, the shell acts gravitationally as if all its mass 
                    were concentrated at the center.
                    </div>
                  <div className="text-center">
                    <BlockMath math="F_{\text{shell}} = G \frac{mM_{\text{shell}}}{r^2}" />
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300 text-center mt-2">
                    where r is the distance from the shell's center
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">What This Means</h4>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Complex → Simple</li>
                      <li>• Distributed → Point</li>
                      <li>• Many forces → One force</li>
                    </ul>
            </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">Why Amazing</h4>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Perfect equivalence</li>
                      <li>• All external points</li>
                      <li>• Any shell thickness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>   

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
               <div className="space-y-4">
                 <div className="bg-amber-100 dark:bg-amber-800/30 p-4 rounded-lg">
                   <div className="text-lg text-amber-800 dark:text-amber-300 font-medium">
                     This is only true for particles OUTSIDE the spherical shell.
                   </div>
                 </div>
                 
                 <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-amber-500">
                   <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                     Think About This:
                   </div>
                   <div className="text-lg text-gray-600 dark:text-gray-400">
                     What do you think happens to the gravitational force if a particle is placed 
                     <span className="font-bold text-amber-600 dark:text-amber-400"> inside </span> 
                     the spherical shell? Would it still behave as if all the mass were at the center?
                   </div>
                 </div>
                 
                 <div className="text-lg text-gray-600 dark:text-gray-400 italic text-center">
                   Consider the symmetry and how forces from different parts of the shell would combine...
                 </div>
               </div>
             </div>
          </div>
          
          {/* Right column - Visualization and Quiz */}
          <div className="space-y-6">

            {/* Demonstration Controls */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
                Shell Theorem Visualization
            </h3>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Choose View:
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'shell-forces', name: 'Shell Forces', description: 'Forces from each piece of shell' },
                      { id: 'net-result', name: 'Net Result', description: 'Net force from all pieces' }
                    ].map((mode) => (
                      <motion.button
                        key={mode.id}
                        className={`p-3 rounded-lg text-left transition-all duration-300 ${
                          demonstrationMode === mode.id
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
              </div>
              
              {/* Visualization Area */}
              <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-900 rounded-lg mb-6 overflow-hidden">
                {/* Spherical Shell - Outer Circle */}
                <div
                  className="absolute border-4 border-blue-500 rounded-full"
                  style={{
                    left: `${shellCenter.x}%`,
                    top: `${shellCenter.y}%`,
                    width: `${shellOuterRadius * 2 * 1.6}px`, // Use px for perfect circles
                    height: `${shellOuterRadius * 2 * 1.6}px`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(59, 130, 246, 0.3)'
                  }}
                />

                {/* Spherical Shell - Inner Circle (to create hollow effect) */}
                <div
                  className="absolute rounded-full bg-gray-50 dark:bg-gray-900"
                  style={{
                    left: `${shellCenter.x}%`,
                    top: `${shellCenter.y}%`,
                    width: `${shellInnerRadius * 2 * 1.6}px`,
                    height: `${shellInnerRadius * 2 * 1.6}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />

                {/* Center Point Mass (when enabled) */}
                {showCenterMass && (
                  <div
                    className="absolute bg-green-500 rounded-full border-4 border-green-300 flex items-center justify-center font-bold text-white"
                    style={{
                      left: `${shellCenter.x}%`,
                      top: `${shellCenter.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '32px',
                      height: '32px'
                    }}
                  >
                    M
                  </div>
                )}

                {/* Test Particle */}
                <motion.div
                  className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-red-300 flex items-center justify-center font-bold text-white text-sm"
                  style={{
                    left: `${testParticle.x}%`,
                    top: `${testParticle.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    boxShadow: showForceVectors ? '0 0 15px #EF4444' : '0 0 0px #EF4444'
                  }}
                >
                  m
                </motion.div>

                {/* Force Vectors */}
                {showForceVectors && (
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <marker
                        id="arrowhead-shell"
                        markerWidth="8"
                        markerHeight="6"
                        refX="7"
                        refY="3"
                        orient="auto"
                      >
                        <polygon points="0 0, 8 3, 0 6" fill="#F59E0B" />
                      </marker>
                      <marker
                        id="arrowhead-net"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#DC2626" />
                      </marker>
                      <marker
                        id="arrowhead-center"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                      </marker>
                    </defs>
                    
                    {demonstrationMode === 'shell-forces' ? (
                      // Individual force vectors from each shell point
                      shellPoints.map((point, index) => {
                        const force = calculateForceFromPoint(point, testParticle);
                        const opacity = highlightedMassPoint === null || highlightedMassPoint === index ? 0.8 : 0.2;
                        // Force vectors should point FROM test particle TO shell points (attractive)
                        const startX = testParticle.x - 1;
                        const startY = testParticle.y;
                        
                        return (
                          <motion.line
                            key={index}
                            x1={`${startX}%`}
                            y1={`${startY}%`}
                            x2={`${point.x}%`}
                            y2={`${point.y}%`}
                            stroke="#F59E0B"
                            strokeWidth="1.5"
                            markerEnd="url(#arrowhead-shell)"
                            opacity={opacity}
                            initial={{ pathLength: 0 }}
                            animate={{ 
                              pathLength: animateProof ? 1 : 1,
                              opacity: opacity
                            }}
                            transition={{ 
                              duration: 1.2, 
                              delay: animateProof ? index * 0.05 : 0,
                              ease: "easeOut" 
                            }}
                          />
                        );
                      })
                    ) : (
                      // Net force vector - pointing toward shell center (attractive)
                      <motion.line
                        x1={`${testParticle.x}%`}
                        y1={`${testParticle.y}%`}
                        x2={`${shellCenter.x + 5}%`}
                        y2={`${shellCenter.y}%`}
                        stroke="#DC2626"
                        strokeWidth="4"
                        markerEnd="url(#arrowhead-net)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                      />
                    )}

                    {/* Force labels */}
                    {demonstrationMode === 'net-result' && (
                      <>
                        <text x={`${testParticle.x - 20}%`} y={`${testParticle.y - 3}%`} 
                              fill="#DC2626" className="text-lg font-bold">
                          F<tspan baselineShift="sub">shell</tspan>
                        </text>
                      </>
                    )}
                  </svg>
                )}

                {/* Status Display */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg text-base">
                  <div className="font-medium">
                    {demonstrationMode === 'shell-forces' ? 
                      'Individual Shell Forces' : 
                      'Net Force Result'}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Distance: {((testParticle.x - shellCenter.x) / shellOuterRadius).toFixed(1)}R
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg text-base">
                  <div className="space-y-1 grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full opacity-60"></div>
                      <span>Spherical Shell</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span>Test Particle</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Analysis */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <h5 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                  Current Analysis
                </h5>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  {demonstrationMode === 'shell-forces' ? (
                    <>
                      <strong>Individual Forces:</strong> Each tiny piece of the spherical shell 
                      exerts its own gravitational force on the test particle. The vectors have different 
                      magnitudes and directions.
                    </>
                  ) : (
                    <>
                      <strong>Net Result:</strong> When we add all individual force vectors from the shell, 
                      we get a single net force pointing toward the shell's center.
                      {showCenterMass && (
                        <> This net force is <strong>identical</strong> to the force from an equivalent 
                        point mass at the center!</>
                      )}
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
                  According to the Shell Theorem, what happens to the gravitational force as you move the test particle farther from the shell?
                </p>
                
            <div className="space-y-2">
              {[
                    { id: 'A', text: 'It decreases as 1/r², exactly like a point mass would' },
                    { id: 'B', text: 'It decreases faster than 1/r² because the shell is extended' },
                    { id: 'C', text: 'It decreases slower than 1/r² because mass is distributed' },
                    { id: 'D', text: 'It remains constant regardless of distance' }
              ].map((option) => (
                    <motion.button
                      key={option.id}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-lg ${
                        userPrediction === option.id
                          ? userPrediction === 'A'
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
                      userPrediction === 'A'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {userPrediction === 'A' ? (
                      <div>
                        <div className="font-bold mb-2">Correct!</div>
                        <div>
                          The Shell Theorem tells us that the spherical shell acts exactly like a point mass at its center. 
                          Therefore, the force follows the same 1/r² law as any point mass. This is the amazing power of the Shell Theorem!
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold mb-2">Not quite right</div>
                        <div>
                          The correct answer is A. The Shell Theorem proves that a spherical shell acts exactly like a point mass 
                          at its center. This means the force decreases as 1/r², just like Newton's law for point particles!
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