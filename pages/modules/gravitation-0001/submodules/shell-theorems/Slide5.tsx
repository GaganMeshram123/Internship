import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function InsideSolidSphereSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [collapsedInnerShells, setCollapsedInnerShells] = useState<number[]>([]);
  const [removedOuterShells, setRemovedOuterShells] = useState<number[]>([]);
  
  const slideInteractions: Interaction[] = [
    {
      id: 'inside-solid-sphere-introduction',
      conceptId: 'inside-solid-intro',
      conceptName: 'Inside Solid Sphere Introduction',
      type: 'learning',
      description: 'Understanding gravitational force for a point inside a solid sphere'
    },
    {
      id: 'shell-categorization',
      conceptId: 'shell-categories',
      conceptName: 'Shell Categorization',
      type: 'learning',
      description: 'Dividing shells into inner and outer categories'
    },
    {
      id: 'outer-shell-elimination',
      conceptId: 'outer-shell-elimination',
      conceptName: 'Outer Shell Elimination',
      type: 'learning',
      description: 'Understanding why outer shells contribute zero force'
    },
    {
      id: 'inside-solid-sphere-quiz',
      conceptId: 'inside-sphere-understanding',
      conceptName: 'Inside Sphere Force Quiz',
      type: 'judging',
      description: 'Testing understanding of force inside a solid sphere'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Handle quiz answer selection
  const handleQuizAnswer = (answerId: string) => {
    const isCorrect = answerId === 'inner_mass_only_correct';
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    const optionTextMap: Record<string, string> = {
      inner_mass_only_correct: "Only the mass within the astronaut's radius",
      all_mass_wrong: "The entire mass of the planet",
      half_mass_wrong: "Half the planet's mass",
      outer_mass_wrong: "Only the mass outside the astronaut's radius"
    };
    
    const response: InteractionResponse = {
      interactionId: 'inside-solid-sphere-quiz',
      value: optionTextMap[answerId] || answerId,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'inside-sphere-understanding',
      conceptName: 'Inside Sphere Force Quiz',
      conceptDescription: 'Testing understanding of force inside a solid sphere',
      question: {
        type: 'mcq',
        question: "An astronaut is inside a planet at half the planet's radius. What mass contributes to the gravitational force on the astronaut?",
        options: [
          "Only the mass within the astronaut's radius",
          "The entire mass of the planet",
          "Half the planet's mass",
          "Only the mass outside the astronaut's radius"
        ]
      }
    };
    
    handleInteractionComplete(response);
  };

  // Sphere configuration
  const sphereCenter = { x: 40, y: 50 }; // center of coordinate system (percentage)
  const sphereRadius = 30; // percentage
  const testPointDistance = 18; // distance from center to internal test point
  const testPoint = { x: sphereCenter.x + testPointDistance, y: sphereCenter.y };

  // Generate concentric shells
  const generateShells = () => {
    const shells = [];
    const numShells = 12;
    
    for (let i = 0; i < numShells; i++) {
      const radius = ((i + 1) / numShells) * sphereRadius;
      const thickness = (sphereRadius / numShells);
      const isInner = radius <= testPointDistance; // shells within test point radius
      
      shells.push({
        id: i,
        radius: radius,
        thickness: thickness,
        mass: `m${i + 1}`,
        color: isInner ? `hsl(${120 + i * 10}, 70%, ${65 - i * 3}%)` : `hsl(${220 + i * 10}, 70%, ${65 - i * 3}%)`,
        isInner: isInner,
        isCollapsed: collapsedInnerShells.includes(i),
        isRemoved: removedOuterShells.includes(i)
      });
    }
    
    return shells;
  };

  // Auto-trigger shell animations based on step
  useEffect(() => {
    if (currentStep === 4) {
      // Step 5: Remove outer shells one by one
      const removeOuterShells = async () => {
        const shells = generateShells();
        const outerShellIds = shells.filter(shell => !shell.isInner).map(shell => shell.id);
        
        setRemovedOuterShells([]);
        setCollapsedInnerShells([]);
        
        for (let i = 0; i < outerShellIds.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 600));
          setRemovedOuterShells(prev => [...prev, outerShellIds[i]]);
        }
      };
      
      removeOuterShells();
    } else if (currentStep === 5) {
      // Step 6: Collapse inner shells one by one
      const collapseInnerShells = async () => {
        const shells = generateShells();
        const innerShellIds = shells.filter(shell => shell.isInner).map(shell => shell.id);
        
        setCollapsedInnerShells([]);
        
        for (let i = 0; i < innerShellIds.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 600));
          setCollapsedInnerShells(prev => [...prev, innerShellIds[i]]);
        }
      };
      
      collapseInnerShells();
    } else if (currentStep < 4) {
      // Reset for earlier steps
      setCollapsedInnerShells([]);
      setRemovedOuterShells([]);
    }
  }, [currentStep]);

  const constructionSteps = [
    {
      title: "Test Point Inside Solid Sphere",
      description: "Consider a test mass placed inside a uniform solid sphere. What gravitational force does it experience? We can't use our previous results directly since the test point is neither at the center nor outside the sphere.",
      elements: ['solidSphere', 'testPoint']
    },
    {
      title: "Divide into Concentric Shells",
      description: "As before, we divide the solid sphere into many thin concentric spherical shells. Each shell can be analyzed using the Shell Theorem.",
      elements: ['solidSphere', 'testPoint', 'categorizedShells']
    },
    {
      title: "Categorize the Shells",
      description: "Now here's the key insight: we separate the shells into two categories based on the test point's position. Shells inside the test point's radius (green) and shells outside the test point's radius (blue).",
      elements: ['solidSphere', 'testPoint', 'categorizedShells', 'testSphere', 'radiusMarker']
    },
    {
      title: "Apply Shell Theorem to Outer Shells",
      description: "For all shells outside the test point's radius, the test point is INSIDE those shells. From our Shell Theorem (Slide 3), we know that the gravitational force from any shell on a point inside it is zero!",
      elements: ['solidSphere', 'testPoint', 'categorizedShells', 'testSphere', 'outerShellsHighlight']
    },
    {
      title: "Remove Outer Shells",
      description: "Since the outer shells contribute zero force, we can effectively ignore them. Watch as they expand outward and fade away - they don't affect the gravitational force on our test point at all!",
      elements: ['testPoint', 'categorizedShells', 'testSphere', 'removeOuterShells']
    },
    {
      title: "Collapse Inner Shells",
      description: "For the remaining inner shells, the test point is OUTSIDE these shells. From our Shell Theorem, each shell behaves as if all its mass were concentrated at the center.",
      elements: ['testPoint', 'innerShellsOnly', 'testSphere', 'collapseInnerShells', 'centerMasses']
    },
    {
      title: "Final Result",
      description: "Only the mass within the test point's radius contributes to the gravitational force. The force is exactly what we'd get from a point mass at the center containing only this inner mass!",
      elements: ['testPoint', 'testSphere', 'finalMass', 'forceVector', 'conclusion']
    }
  ];

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left Column - Theory and Controls */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-6">
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div>
              <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                What happens when a test mass is placed <span className="font-bold text-blue-600 dark:text-blue-400">inside</span> a uniform solid sphere?
              </div>
              
              <div className="text-center my-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-600">
                <div className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                  Key Result:
                </div>
                <div className="text-lg text-blue-800 dark:text-blue-200">
                  Only the mass <span className="font-bold">within the test point's radius</span> contributes to the gravitational force!
                </div>
              </div>
              
              <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                This surprising result comes from combining our Shell Theorem insights for both interior and exterior points.
              </div>

              {/* Shell categorization explanation */}
              {currentStep >= 2 && (
                <motion.div 
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">Shell Categorization</h3>
                  
                  <div className="space-y-3">
                                          <div className="bg-green-100 dark:bg-green-800 p-3 rounded">
                        <div className="font-medium text-green-800 dark:text-green-200 mb-1">Inner Shells (Green):</div>
                        <div className="text-lg text-green-700 dark:text-green-300">
                          Radius <InlineMath math="\leq r_{test}" />. Test point is <em>outside</em> these shells.
                        </div>
                      </div>
                      
                      <div className="bg-red-100 dark:bg-red-800 p-3 rounded">
                        <div className="font-medium text-red-800 dark:text-red-200 mb-1">Outer Shells (Red):</div>
                        <div className="text-lg text-red-700 dark:text-red-300">
                          Radius <InlineMath math="> r_{test}" />. Test point is <em>inside</em> these shells.
                        </div>
                      </div>
                  </div>
                </motion.div>
              )}

              {/* Outer shell elimination explanation */}
              {currentStep >= 3 && (
                <motion.div 
                  className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-yellow-700 dark:text-yellow-300 font-medium text-lg mb-3">Why Outer Shells Don't Matter</h3>
                  
                  <div className="text-lg text-yellow-800 dark:text-yellow-200">
                    From Slide 3, we learned that the gravitational force inside any spherical shell is zero. 
                    Since our test point is inside all the outer shells, they contribute nothing to the total force!
                  </div>
                </motion.div>
              )}

              {/* Mathematical Summary */}
              {currentStep >= 5 && (
                <motion.div 
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">Mathematical Result</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <div className="font-medium mb-1">Mass within test point radius:</div>
                      <BlockMath math="M_{inner} = M_{total} \cdot \left(\frac{r_{test}}{R_{sphere}}\right)^3" />
                      <div className="text-lg text-gray-600 dark:text-gray-400">For a uniform sphere, mass scales with volume</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <div className="font-medium mb-1">Gravitational Force:</div>
                      <BlockMath math="F = G \frac{m \cdot M_{inner}}{r_{test}^2}" />
                      <div className="text-lg text-gray-600 dark:text-gray-400">Same as if only the inner mass existed at the center!</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column - Step-by-Step Visualization */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
          <h2 className="text-gray-900 dark:text-white font-medium mb-4">Inside Solid Sphere Analysis</h2>
          
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
                  {currentStep + 1}. {constructionSteps[currentStep]?.title}
                </h4>
                
                <button
                  onClick={() => setCurrentStep(Math.min(constructionSteps.length - 1, currentStep + 1))}
                  disabled={currentStep === constructionSteps.length - 1}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {constructionSteps[currentStep]?.description}
                </p>
              </div>
            </div>
          </TrackedInteraction>
          
          {/* Visualization */}
          <div className="relative w-full aspect-square bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
              {/* Solid Sphere (Steps 1-3) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('solidSphere') && (
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

              {/* Categorized Shells (Steps 2+) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('categorizedShells') && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {generateShells().map((shell, index) => (
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
                              scale: shell.isInner ? 0.8 : 2.5,  // Outer shells expand outward
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

              {/* Test Point Sphere (Steps 3+) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('testSphere') && (
                  <motion.circle
                    cx={sphereCenter.x}
                    cy={sphereCenter.y}
                    r={testPointDistance}
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                    className="stroke-red-600 dark:stroke-red-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  />
                )}
              </AnimatePresence>

              {/* Radius Marker (Step 3 only) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('radiusMarker') && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    {/* Radius line - vertical from center upward */}
                    <line
                      x1={sphereCenter.x}
                      y1={sphereCenter.y}
                      x2={sphereCenter.x}
                      y2={sphereCenter.y - testPointDistance}
                      stroke="#DC2626"
                      strokeWidth="0.5"
                      className="stroke-red-600 dark:stroke-red-400"
                    />
                    
                    {/* Radius label - positioned to the side of vertical line */}
                    <text
                      x={sphereCenter.x + 4}
                      y={sphereCenter.y - testPointDistance * 0.5}
                      textAnchor="start"
                      fontSize="2"
                      fontWeight="bold"
                      fill="#DC2626"
                      className="fill-red-600 dark:fill-red-400"
                    >
                      r<tspan baselineShift="sub">test</tspan>
                    </text>
                    
                    {/* Arrow marker for radius line */}
                    <defs>
                      <marker
                        id="arrowhead-radius"
                        markerWidth="4"
                        markerHeight="3"
                        refX="2.5"
                        refY="1.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 4 1.5, 0 3"
                          fill="#DC2626"
                          className="fill-red-600 dark:fill-red-400"
                        />
                      </marker>
                    </defs>
                    
                    {/* Add arrowhead to radius line */}
                    <line
                      x1={sphereCenter.x}
                      y1={sphereCenter.y}
                      x2={sphereCenter.x}
                      y2={sphereCenter.y - testPointDistance}
                      stroke="#DC2626"
                      strokeWidth="0.5"
                      markerEnd="url(#arrowhead-radius)"
                      className="stroke-red-600 dark:stroke-red-400"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Inner Shells Only (Steps 6+) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('innerShellsOnly') && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {generateShells().filter(shell => shell.isInner && !shell.isCollapsed).map((shell, index) => (
                      <motion.circle
                        key={shell.id}
                        cx={sphereCenter.x}
                        cy={sphereCenter.y}
                        r={shell.radius}
                        fill="none"
                        stroke={shell.color}
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ duration: 0.5 }}
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Center Masses from collapsed inner shells */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('centerMasses') && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {collapsedInnerShells.map((shellIndex, index) => {
                      const shell = generateShells()[shellIndex];
                      return (
                        <motion.circle
                          key={`collapsed-${shellIndex}`}
                          cx={sphereCenter.x}
                          cy={sphereCenter.y}
                          r="2"
                          fill={shell.color}
                          stroke="#FFFFFF"
                          strokeWidth="0.2"
                          initial={{ 
                            scale: 0, 
                            x: Math.cos(index * Math.PI / 4) * shell.radius, 
                            y: Math.sin(index * Math.PI / 4) * shell.radius 
                          }}
                          animate={{ 
                            scale: 1, 
                            x: 0, 
                            y: 0 
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      );
                    })}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Final combined mass at center */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('finalMass') && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <circle
                      cx={sphereCenter.x}
                      cy={sphereCenter.y}
                      r="2.5"
                      fill="#10B981"
                      className="fill-green-600 dark:fill-green-400"
                    />
                    <text
                      x={sphereCenter.x}
                      y={sphereCenter.y - 6}
                      textAnchor="middle"
                      fontSize="2.5"
                      fontWeight="bold"
                      fill="#10B981"
                      className="fill-green-600 dark:fill-green-400"
                    >
                      M<tspan baselineShift="sub">inner</tspan>
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Test Point */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('testPoint') && (
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
                      Test Point
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Force Vector */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('forceVector') && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <defs>
                      <marker
                        id="arrowhead-force-inside"
                        markerWidth="4"
                        markerHeight="3"
                        refX="2.5"
                        refY="1.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 4 1.5, 0 3"
                          fill="#10B981"
                          className="fill-green-500 dark:fill-green-400"
                        />
                      </marker>
                    </defs>
                    
                    <line
                      x1={testPoint.x}
                      y1={testPoint.y}
                      x2={testPoint.x - 12}
                      y2={testPoint.y}
                      stroke="#10B981"
                      strokeWidth="1.5"
                      markerEnd="url(#arrowhead-force-inside)"
                      className="stroke-green-500 dark:stroke-green-400"
                    />
                    
                    <text
                      x={testPoint.x + 20}
                      y={testPoint.y - 4}
                      textAnchor="middle"
                      fontWeight="bold"
                      fontSize="3"
                      fill="#10B981"
                      className="fill-green-500 dark:fill-green-400"
                    >
                      F = G M<tspan baselineShift="sub">inner</tspan>/r²
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Conclusion Text */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('conclusion') && (
                  <motion.text
                    x="50"
                    y="15"
                    textAnchor="middle"
                    fontSize="3"
                    fontWeight="bold"
                    fill="#7C3AED"
                    className="fill-violet-600 dark:fill-violet-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 15 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    Only Inner Mass Matters!
                  </motion.text>
                )}
              </AnimatePresence>
            </svg>
          </div>

          {/* Quick Check Quiz */}
          <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
              Quick Check
            </h3>
            <div className="space-y-3">
              <p className="text-lg">An astronaut is inside a planet at half the planet's radius. What mass contributes to the gravitational force on the astronaut?</p>
              <TrackedInteraction 
                interaction={slideInteractions[3]} 
                onInteractionComplete={handleInteractionComplete}
              >
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuizAnswer('inner_mass_only_correct')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'inner_mass_only_correct'
                        ? 'border-green-500 bg-green-100 dark:bg-green-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    Only the mass within the astronaut's radius
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('all_mass_wrong')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'all_mass_wrong'
                        ? 'border-red-500 bg-red-100 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    The entire mass of the planet
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('half_mass_wrong')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'half_mass_wrong'
                        ? 'border-red-500 bg-red-100 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    Half the planet's mass
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('outer_mass_wrong')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'outer_mass_wrong'
                        ? 'border-red-500 bg-red-100 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    Only the mass outside the astronaut's radius
                  </button>
                </div>
                
                {showFeedback && (
                  <div className={`mt-4 p-3 rounded-lg ${
                    selectedAnswer === 'inner_mass_only_correct' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {selectedAnswer === 'inner_mass_only_correct' ? (
                      <p>✅ Correct! Only the mass within the astronaut's radius contributes to the gravitational force. Since mass scales with volume (r³), half the radius means 1/8 the mass contributes.</p>
                    ) : (
                      <p>❌ Not quite. The shell theorem tells us that all mass outside the astronaut's radius contributes zero force (the astronaut is inside those shells), while mass inside acts as if concentrated at the center.</p>
                    )}
                  </div>
                )}
              </TrackedInteraction>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="inside-solid-sphere"
      slideTitle="Inside Solid Sphere Analysis"
      moduleId="gravitation-0001"
      submoduleId="shell-theorems"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 