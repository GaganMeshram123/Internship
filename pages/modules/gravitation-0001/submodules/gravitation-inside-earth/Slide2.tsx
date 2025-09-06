import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function InsideEarthSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [removedOuterShells, setRemovedOuterShells] = useState<number[]>([]);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'uniform-sphere-derivation',
      conceptId: 'uniform-sphere-derivation',
      conceptName: 'Uniform Sphere Force Derivation',
      type: 'learning',
      description: 'Step-by-step derivation of gravitational force inside a uniform sphere'
    },
    {
      id: 'density-calculation',
      conceptId: 'density-calculation',
      conceptName: 'Density Calculation',
      type: 'learning',
      description: 'Understanding how to calculate uniform density from mass and radius'
    },
    {
      id: 'shell-removal-visualization',
      conceptId: 'shell-removal-visualization',
      conceptName: 'Shell Removal Visualization',
      type: 'learning',
      description: 'Visualizing the removal of outer shells using Shell Theorem'
    },
    {
      id: 'force-proportionality-quiz',
      conceptId: 'force-proportionality-quiz',
      conceptName: 'Force Proportionality Quiz',
      type: 'judging',
      description: 'Testing understanding of force proportionality inside uniform sphere'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerId: string) => {
    const isCorrect = answerId === 'proportional_r';
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    const optionTextMap: Record<string, string> = {
      proportional_r: 'F ∝ r (force proportional to distance)',
      inverse_square: 'F ∝ 1/r² (inverse square law)',
      constant_force: 'F = constant (force independent of distance)'
    };
    
    const response: InteractionResponse = {
      interactionId: 'force-proportionality-quiz',
      value: optionTextMap[answerId] || answerId,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'force-proportionality-quiz',
      conceptName: 'Force Proportionality Quiz',
      conceptDescription: 'Testing understanding of force proportionality inside uniform sphere',
      question: {
        type: 'mcq',
        question: 'Inside a uniform sphere, how does gravitational force vary with distance from the center?',
        options: [
          'F ∝ r (force proportional to distance)',
          'F ∝ 1/r² (inverse square law)',
          'F = constant (force independent of distance)'
        ]
      }
    };
    
    handleInteractionComplete(response);
  };

  // Sphere configuration for visualization
  const sphereCenter = { x: 40, y: 50 };
  const sphereRadius = 25;
  const testPointDistance = 15;
  const testPoint = { x: sphereCenter.x + testPointDistance, y: sphereCenter.y };

  // Generate concentric shells
  const generateShells = () => {
    const shells = [];
    const numShells = 10;
    
    for (let i = 0; i < numShells; i++) {
      const radius = ((i + 1) / numShells) * sphereRadius;
      const isInner = radius <= testPointDistance;
      
      shells.push({
        id: i,
        radius: radius,
        isInner: isInner,
        color: isInner ? `hsl(${120 + i * 10}, 70%, ${65 - i * 3}%)` : `hsl(${220 + i * 10}, 70%, ${65 - i * 3}%)`,
        isRemoved: removedOuterShells.includes(i)
      });
    }
    
    return shells;
  };

  // Auto-trigger shell removal animation at step 3
  useEffect(() => {
    if (currentStep === 3) {
      const removeShells = async () => {
        const shells = generateShells();
        const outerShellIds = shells.filter(shell => !shell.isInner).map(shell => shell.id);
        
        setRemovedOuterShells([]);
        
        for (let i = 0; i < outerShellIds.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 400));
          setRemovedOuterShells(prev => [...prev, outerShellIds[i]]);
        }
      };
      
      removeShells();
    } else if (currentStep < 3) {
      setRemovedOuterShells([]);
    }
  }, [currentStep]);

  const derivationSteps = [
    {
      title: "Start with Uniform Earth",
      description: "Consider Earth as a uniform sphere with total mass M and radius R. We want to find the gravitational force on a test mass m at distance r from the center (where r < R).",
      formula: "\\text{Earth: Mass } M, \\text{ Radius } R",
      explanation: "We assume uniform density throughout Earth for mathematical simplicity.",
      elements: ['solidSphere', 'testPoint']
    },
    {
      title: "Calculate Earth's Density",
      description: "Since Earth is uniform, we can find its density by dividing total mass by total volume.",
      formula: "\\rho = \\frac{M}{V} = \\frac{M}{\\frac{4}{3}\\pi R^3}",
      explanation: "This density ρ is constant throughout the entire sphere.",
      elements: ['solidSphere', 'testPoint', 'densityLabel']
    },
    {
      title: "Apply Shell Theorem",
      description: "Divide Earth into concentric shells. The Shell Theorem tells us that outer shells (beyond distance r) contribute zero force to our test point.",
      formula: "F_{outer} = 0 \\text{ (Shell Theorem)}",
      explanation: "Only the inner sphere of radius r contributes to the gravitational force.",
      elements: ['solidSphere', 'testPoint', 'categorizedShells', 'innerSphere']
    },
    {
      title: "Remove Outer Shells",
      description: "Since outer shells contribute nothing, we can ignore them completely. Watch them disappear from our calculation!",
      formula: "\\text{Only inner sphere matters}",
      explanation: "The test point effectively sees only the mass within radius r.",
      elements: ['testPoint', 'categorizedShells', 'innerSphere', 'removeOuterShells']
    },
    {
      title: "Calculate Inner Mass from Density",
      description: "Use the uniform density to find the mass within radius r.",
      formula: "M_{inner} = \\rho \\times V_{inner} = \\frac{M}{\\frac{4}{3}\\pi R^3} \\times \\frac{4}{3}\\pi r^3",
      explanation: "The volume of the inner sphere is (4/3)πr³.",
      elements: ['testPoint', 'innerSphere', 'innerMassLabel', 'densityCalculation', 'volumeHighlight']
    },
    {
      title: "Simplify Inner Mass",
      description: "Simplify the expression for inner mass.",
      formula: "M_{inner} = M \\times \\frac{r^3}{R^3}",
      explanation: "The inner mass is proportional to the cube of the radius ratio.",
      elements: ['testPoint', 'innerSphere', 'innerMassLabel', 'massRatio', 'cubeRelationship']
    },
    {
      title: "Apply Newton's Law",
      description: "Use Newton's law of gravitation with the inner mass acting at the center.",
      formula: "F = \\frac{G m M_{inner}}{r^2} = \\frac{G m M r^3}{R^3 r^2}",
      explanation: "The inner mass acts as if concentrated at Earth's center.",
      elements: ['testPoint', 'innerSphere', 'forceVector', 'centerMass']
    },
    {
      title: "Final Result",
      description: "Simplify to get the remarkable linear relationship.",
      formula: "F = \\frac{G m M}{R^3} \\cdot r = mg \\cdot \\frac{r}{R}",
      explanation: "Inside a uniform sphere, gravitational force is proportional to distance from center! This can also be written as surface gravity times the fractional radius.",
      elements: ['testPoint', 'innerSphere', 'forceVector', 'centerMass', 'finalFormula', 'surfaceGravityFormula']
    }
  ];

  return (
    <SlideComponentWrapper
      slideId="force-inside-uniform-sphere"
      slideTitle="Deriving Force Inside Uniform Earth"
      moduleId="gravitation-0001"
      submoduleId="gravitation-inside-earth"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Theory and Mathematical Results */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg space-y-6">
            <TrackedInteraction 
              interaction={slideInteractions[0]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div>
                <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  Let's derive the exact formula for gravitational force inside a uniform sphere using fundamental principles.
                </div>
                
                <div className="text-center my-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-600">
                  <div className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                    Final Result:
                  </div>
                  <BlockMath math="F = \frac{GmM}{R^3} \cdot r" />
                  <div className="text-lg text-blue-800 dark:text-blue-200">
                    Force inside uniform sphere is proportional to distance from center!
                  </div>
                </div>
                
                <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  This remarkable linear relationship comes from the Shell Theorem and uniform density assumption.
                </div>

                  {/* Density Explanation */}
                  {currentStep >= 1 && (
                    <motion.div 
                      className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h3 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">
                        Uniform Density Assumption
                      </h3>
                      <div className="text-lg text-blue-800 dark:text-blue-200">
                        Real Earth has variable density (denser core), but uniform density gives us the mathematical foundation for understanding gravitational variation with depth.
                      </div>
                    </motion.div>
                  )}


                                    {/* Key Insights */}
                                    {currentStep >= 5 && (
                    <motion.div 
                      className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h4 className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                        Key Insight: Mass Scaling
                      </h4>
                      <div className="text-lg text-yellow-700 dark:text-yellow-300">
                        In a uniform sphere, mass within radius r scales as r³, while gravitational force formula has r² in denominator. The result: F ∝ r³/r² = r.
                      </div>
                    </motion.div>
                  )}


                {/* Mathematical Summary */}
                {currentStep >= 6 && (
                  <motion.div 
                    className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">Step-by-Step Mathematical Result</h3>
                    
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-700 p-3 rounded">
                        <div className="font-medium mb-1">Density of uniform sphere:</div>
                        <BlockMath math="\rho = \frac{M}{\frac{4}{3}\pi R^3}" />
                        <div className="text-lg text-gray-600 dark:text-gray-400">Constant throughout the sphere</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 p-3 rounded">
                        <div className="font-medium mb-1">Mass within radius r:</div>
                        <BlockMath math="M_{inner} = M \cdot \frac{r^3}{R^3}" />
                        <div className="text-lg text-gray-600 dark:text-gray-400">Only this mass contributes to gravitational force</div>
                      </div>
                      
                                             <div className="bg-white dark:bg-gray-700 p-3 rounded">
                         <div className="font-medium mb-1">Final gravitational force:</div>
                         <BlockMath math="F = \frac{G m M_{inner}}{r^2} = \frac{G m M}{R^3} \cdot r" />
                         <div className="text-lg text-gray-600 dark:text-gray-400">Linear relationship: F ∝ r</div>
                       </div>
                       
                       <div className="bg-white dark:bg-gray-700 p-3 rounded">
                         <div className="font-medium mb-1">In terms of surface gravity:</div>
                         <BlockMath math="F = mg \cdot \frac{r}{R}" />
                         <div className="text-lg text-gray-600 dark:text-gray-400">Where g is surface gravity and r/R is the fractional depth</div>
                       </div>
                    </div>
                  </motion.div>
                )}

                  {/* Final Result Preview */}
                  {currentStep >= 7 && (
                    <motion.div 
                      className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                        Final Formula
                      </h4>
                      <div className="text-center my-3">
                        <BlockMath math="F = \frac{GmM}{R^3} \cdot r" />
                      </div>
                      <div className="text-lg text-green-700 dark:text-green-300">
                        Force inside uniform sphere is proportional to distance from center!
                      </div>
                    </motion.div>
                  )}



                
              </div>
            </TrackedInteraction>
          </div>

          {/* Right Column - Step-by-Step Visualization */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-gray-900 dark:text-white font-medium mb-4 text-lg">Uniform Sphere Force Derivation</h2>
            
            {/* Step Navigation Controls */}
            <TrackedInteraction 
              interaction={slideInteractions[1]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-600">
                <div className="flex justify-between items-center mb-3">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>
                  
                  <h4 className="text-blue-700 dark:text-blue-300 font-medium mb-2 text-lg">
                    {currentStep + 1}. {derivationSteps[currentStep]?.title}
                  </h4>
                  
                  <button
                    onClick={() => setCurrentStep(Math.min(derivationSteps.length - 1, currentStep + 1))}
                    disabled={currentStep === derivationSteps.length - 1}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {derivationSteps[currentStep]?.description}
                  </p>
                </div>
              </div>
            </TrackedInteraction>

            {/* Visualization */}
            <div className="relative w-full aspect-square bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                  {/* Solid Sphere (Steps 1-2) */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('solidSphere') && (
                      <motion.circle
                        cx={sphereCenter.x}
                        cy={sphereCenter.y}
                        r={sphereRadius}
                        fill="rgba(59, 130, 246, 0.2)"
                        stroke="#3B82F6"
                        strokeWidth="0.5"
                        className="fill-blue-300/20 stroke-blue-600 dark:fill-blue-600/20 dark:stroke-blue-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Categorized Shells (Steps 3+) */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('categorizedShells') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        {generateShells().map((shell) => (
                          <AnimatePresence key={shell.id}>
                            {!shell.isRemoved && (
                              <motion.circle
                                cx={sphereCenter.x}
                                cy={sphereCenter.y}
                                r={shell.radius}
                                fill="none"
                                stroke={shell.color}
                                strokeWidth={shell.isInner ? "1" : "0.8"}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: shell.isInner ? 0.9 : 0.6, scale: 1 }}
                                exit={{ 
                                  opacity: 0, 
                                  scale: shell.isInner ? 0.8 : 2.5,
                                  strokeWidth: 0
                                }}
                                transition={{ duration: 0.8 }}
                              />
                            )}
                          </AnimatePresence>
                        ))}
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Inner Sphere Highlight */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('innerSphere') && (
                      <motion.circle
                        cx={sphereCenter.x}
                        cy={sphereCenter.y}
                        r={testPointDistance}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        className="stroke-green-600 dark:stroke-green-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Test Point */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('testPoint') && (
                      <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <circle
                          cx={testPoint.x}
                          cy={testPoint.y}
                          r="1.2"
                          fill="#DC2626"
                          className="fill-red-600 dark:fill-red-400"
                        />
                        <text
                          x={testPoint.x}
                          y={testPoint.y + 5}
                          textAnchor="middle"
                          fontSize="2"
                          fontWeight="bold"
                          fill="#DC2626"
                          className="fill-red-600 dark:fill-red-400"
                        >
                          m
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Density Label */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('densityLabel') && (
                      <motion.text
                        x={sphereCenter.x}
                        y={sphereCenter.y - 10}
                        textAnchor="middle"
                        fontSize="2.5"
                        fontWeight="bold"
                        fill="#7C3AED"
                        className="fill-violet-600 dark:fill-violet-400"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: -10 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                      >
                        ρ = M/(4πR³/3)
                      </motion.text>
                    )}
                  </AnimatePresence>

                  {/* Center Mass */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('centerMass') && (
                      <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <circle
                          cx={sphereCenter.x}
                          cy={sphereCenter.y}
                          r="2"
                          fill="#10B981"
                          className="fill-green-600 dark:fill-green-400"
                        />
                        <text
                          x={sphereCenter.x}
                          y={sphereCenter.y - 5}
                          textAnchor="middle"
                          fontSize="2"
                          fontWeight="bold"
                          fill="#10B981"
                          className="fill-green-600 dark:fill-green-400"
                        >
                          M<tspan baselineShift="sub">inner</tspan>
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Force Vector */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('forceVector') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        <defs>
                          <marker
                            id="arrowhead-force"
                            markerWidth="4"
                            markerHeight="3"
                            refX="2.5"
                            refY="1.5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 4 1.5, 0 3"
                              fill="#EF4444"
                              className="fill-red-500 dark:fill-red-400"
                            />
                          </marker>
                        </defs>
                        
                        <line
                          x1={testPoint.x}
                          y1={testPoint.y}
                          x2={testPoint.x - 8}
                          y2={testPoint.y}
                          stroke="#EF4444"
                          strokeWidth="1"
                          markerEnd="url(#arrowhead-force)"
                          className="stroke-red-500 dark:stroke-red-400"
                        />
                        
                        <text
                          x={testPoint.x + 8}
                          y={testPoint.y - 2}
                          textAnchor="start"
                          fontWeight="bold"
                          fontSize="4"
                          fill="#EF4444"
                          className="fill-red-500 dark:fill-red-400"
                        >
                          F ∝ r
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Inner Mass Label */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('innerMassLabel') && (
                      <motion.text
                        x={sphereCenter.x}
                        y={sphereCenter.y + 35}
                        textAnchor="middle"
                        fontSize="2"
                        fontWeight="bold"
                        fill="#10B981"
                        className="fill-green-600 dark:fill-green-400"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 35 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                      >
                        Mass = ρ × Volume
                      </motion.text>
                    )}
                  </AnimatePresence>

                  {/* Density Calculation (Step 5) */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('densityCalculation') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <rect
                          x="65"
                          y="40"
                          width="30"
                          height="12"
                          fill="rgba(139, 69, 19, 0.1)"
                          stroke="#8B4513"
                          strokeWidth="0.5"
                          rx="2"
                          className="fill-amber-100/50 stroke-amber-600 dark:fill-amber-900/20 dark:stroke-amber-400"
                        />
                        <text
                          x="80"
                          y="45"
                          textAnchor="middle"
                          fontSize="2.5"
                          fontWeight="bold"
                          fill="#8B4513"
                          className="fill-amber-700 dark:fill-amber-300"
                        >
                          ρ = M/(4πR³/3)
                        </text>
                        <text
                          x="80"
                          y="50"
                          textAnchor="middle"
                          fontSize="2"
                          fill="#8B4513"
                          className="fill-amber-600 dark:fill-amber-400"
                        >
                          Uniform Density
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Volume Highlight (Step 5) */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('volumeHighlight') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.0 }}
                      >
                        {/* Animated volume fill */}
                        <motion.circle
                          cx={sphereCenter.x}
                          cy={sphereCenter.y}
                          r={testPointDistance}
                          fill="rgba(16, 185, 129, 0.3)"
                          className="fill-green-500/30 dark:fill-green-400/20"
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                        />
                        <text
                          x={sphereCenter.x - 12}
                          y={sphereCenter.y + 30}
                          textAnchor="middle"
                          fontSize="3"
                          fontWeight="bold"
                          fill="#10B981"
                          className="fill-green-600 dark:fill-green-400"
                        >
                          V = (4/3)πr³
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Mass Ratio (Step 6) */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('massRatio') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <rect
                          x="65"
                          y="40"
                          width="30"
                          height="12"
                          fill="rgba(168, 85, 247, 0.1)"
                          stroke="#A855F7"
                          strokeWidth="0.5"
                          rx="2"
                          className="fill-purple-100/50 stroke-purple-600 dark:fill-purple-900/20 dark:stroke-purple-400"
                        />
                        <text
                          x="80"
                          y="45"
                          textAnchor="middle"
                          fontSize="3"
                          fontWeight="bold"
                          fill="#A855F7"
                          className="fill-purple-700 dark:fill-purple-300"
                        >
                          M<tspan baselineShift="sub">inner</tspan>/M = r³/R³
                        </text>
                        <text
                          x="80"
                          y="50"
                          textAnchor="middle"
                          fontSize="2"
                          fill="#A855F7"
                          className="fill-purple-600 dark:fill-purple-400"
                        >
                          Mass Ratio
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Cube Relationship (Step 6) */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('cubeRelationship') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.0 }}
                      >
                        {/* Visual representation of r³ relationship */}
                        <motion.line
                          x1={sphereCenter.x}
                          y1={sphereCenter.y}
                          x2={testPoint.x}
                          y2={testPoint.y}
                          stroke="#7C3AED"
                          strokeWidth="0.5"
                          strokeDasharray="3,2"
                          className="stroke-violet-600 dark:stroke-violet-400"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                        <text
                          x={sphereCenter.x + 8}
                          y={sphereCenter.y - 3}
                          textAnchor="middle"
                          fontSize="3.5"
                          fontWeight="bold"
                          fill="#7C3AED"
                          className="fill-violet-600 dark:fill-violet-400"
                        >
                          r
                        </text>
                        <motion.text
                          x={sphereCenter.x}
                          y={sphereCenter.y + 30}
                          textAnchor="middle"
                          fontSize="3"
                          fontWeight="bold"
                          fill="#7C3AED"
                          className="fill-violet-600 dark:fill-violet-400"
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 1, delay: 1.5 }}
                        >
                          Mass ∝ r³
                        </motion.text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Final Formula Display */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('finalFormula') && (
                      <motion.text
                        x="50"
                        y="10"
                        textAnchor="middle"
                        fontSize="2.5"
                        fontWeight="bold"
                        fill="#7C3AED"
                        className="fill-violet-600 dark:fill-violet-400"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 10 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                      >
                        F = (GmM/R³)·r
                      </motion.text>
                    )}
                  </AnimatePresence>

                  {/* Surface Gravity Formula */}
                  <AnimatePresence>
                    {derivationSteps[currentStep]?.elements.includes('surfaceGravityFormula') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                      >
                        <rect
                          x="25"
                          y="18"
                          width="50"
                          height="15"
                          fill="rgba(34, 197, 94, 0.1)"
                          stroke="#22C55E"
                          strokeWidth="0.8"
                          rx="3"
                          className="fill-green-100/50 stroke-green-600 dark:fill-green-900/20 dark:stroke-green-400"
                        />
                        <text
                          x="50"
                          y="24"
                          textAnchor="middle"
                          fontSize="2.8"
                          fontWeight="bold"
                          fill="#22C55E"
                          className="fill-green-700 dark:fill-green-300"
                        >
                          F = mg × (r/R)
                        </text>
                        <text
                          x="50"
                          y="29"
                          textAnchor="middle"
                          fontSize="1.8"
                          fill="#22C55E"
                          className="fill-green-600 dark:fill-green-400"
                        >
                          Surface gravity × fractional radius
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>
                </svg>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 mt-8">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Quick Check
              </h3>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Inside a uniform sphere, how does gravitational force vary with distance from the center?
                </p>
                
                <TrackedInteraction 
                  interaction={slideInteractions[3]} 
                  onInteractionComplete={handleInteractionComplete}
                >
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuizAnswer('proportional_r')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'proportional_r'
                          ? 'border-green-500 bg-green-100 dark:bg-green-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      F ∝ r (force proportional to distance)
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('inverse_square')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'inverse_square'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      F ∝ 1/r² (inverse square law)
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('constant_force')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'constant_force'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      F = constant (force independent of distance)
                    </button>
                  </div>
                  
                  {showFeedback && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      selectedAnswer === 'proportional_r' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswer === 'proportional_r' ? (
                        <p>Correct! Inside a uniform sphere, F = (GmM/R³)·r, so force is directly proportional to distance from center. This is completely different from the 1/r² relationship outside the sphere!</p>
                      ) : (
                        <p>Not quite. Inside a uniform sphere, the force is proportional to r, not 1/r². This happens because only the mass within radius r contributes (∝ r³), but this mass acts at distance r, giving F ∝ r³/r² = r.</p>
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