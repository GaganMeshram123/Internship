import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SolidSphereAnalysisSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [collapsedShells, setCollapsedShells] = useState<number[]>([]);
  
  const slideInteractions: Interaction[] = [
    {
      id: 'solid-sphere-introduction',
      conceptId: 'solid-sphere-intro',
      conceptName: 'Solid Sphere Introduction',
      type: 'learning',
      description: 'Understanding how to analyze a solid sphere using shell theorem'
    },
    {
      id: 'shell-division',
      conceptId: 'shell-division-concept',
      conceptName: 'Shell Division Visualization',
      type: 'learning',
      description: 'Dividing solid sphere into concentric shells'
    },
    {
      id: 'shell-collapse-animation',
      conceptId: 'shell-collapse',
      conceptName: 'Shell Collapse Animation',
      type: 'learning',
      description: 'Animating shell mass collapse to center'
    },
    {
      id: 'solid-sphere-quiz',
      conceptId: 'solid-sphere-understanding',
      conceptName: 'Solid Sphere Force Quiz',
      type: 'judging',
      description: 'Testing understanding of solid sphere gravitational effects'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Handle quiz answer selection
  const handleQuizAnswer = (answerId: string) => {
    const isCorrect = answerId === 'point_mass_correct';
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    const optionTextMap: Record<string, string> = {
      point_mass_correct: "As a point mass with all Earth's mass at the center",
      distributed_wrong: 'As a distributed mass with complex calculations',
      surface_wrong: "Only consider mass at Earth's surface",
      depends_altitude_wrong: "It depends on the satellite's altitude"
    };
    
    const response: InteractionResponse = {
      interactionId: 'solid-sphere-quiz',
      value: optionTextMap[answerId] || answerId,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'solid-sphere-understanding',
      conceptName: 'Solid Sphere Force Quiz',
      conceptDescription: 'Testing understanding of solid sphere gravitational effects',
      question: {
        type: 'mcq',
        question: 'For gravitational calculations, how should we treat Earth when calculating the force on a satellite in orbit?',
        options: [
          "As a point mass with all Earth's mass at the center",
          'As a distributed mass with complex calculations',
          "Only consider mass at Earth's surface",
          "It depends on the satellite's altitude"
        ]
      }
    };
    
    handleInteractionComplete(response);
  };

  // Sphere configuration
  const sphereCenter = { x: 40, y: 50 }; // center of coordinate system (percentage)
  const sphereRadius = 30; // percentage
  const testPointDistance = 45; // distance from center to external test point
  const testPoint = { x: sphereCenter.x + testPointDistance, y: sphereCenter.y };

  // Generate concentric shells
  const generateShells = () => {
    const shells = [];
    const numShells = 10;
    
    for (let i = 0; i < numShells; i++) {
      const radius = ((i + 1) / numShells) * sphereRadius;
      const thickness = (sphereRadius / numShells);
      
      shells.push({
        id: i,
        radius: radius,
        thickness: thickness,
        mass: `m${i + 1}`,
        color: `hsl(${200 + i * 15}, 70%, ${65 - i * 8}%)`,
        isCollapsed: collapsedShells.includes(i)
      });
    }
    
    return shells;
  };

  // Auto-trigger shell collapse based on step
  useEffect(() => {
    if (currentStep === 2) {
      // Step 3: Collapse first shell
      setCollapsedShells([0]);
    } else if (currentStep === 3) {
      // Step 4: Collapse all shells one by one with animation
      const collapseSequentially = async () => {
        // Start with first shell already collapsed
        setCollapsedShells([0]);
        
        // Collapse remaining shells one by one
        for (let i = 1; i < 10; i++) {
          await new Promise(resolve => setTimeout(resolve, 800));
          setCollapsedShells(prev => [...prev, i]);
        }
      };
      
      collapseSequentially();
    } else if (currentStep < 2) {
      // Reset for earlier steps
      setCollapsedShells([]);
    }
  }, [currentStep]);

  const constructionSteps = [
    {
      title: "Solid Sphere Problem",
      description: "Consider a uniform solid sphere and a test mass outside it. How do we calculate the gravitational force? We can't directly apply the Shell Theorem since it's not a hollow shell.",
      elements: ['solidSphere', 'testPoint']
    },
    {
      title: "Divide into Concentric Shells",
      description: "The key insight: divide the solid sphere into many thin concentric spherical shells. Each shell can be analyzed using the Shell Theorem we just learned.",
      elements: ['solidSphere', 'testPoint', 'shells']
    },
    {
      title: "Apply Shell Theorem to Each Shell",
      description: "For the test point outside the sphere, each shell behaves as if all its mass were concentrated at the center. Let's see this shell by shell.",
      elements: ['solidSphere', 'testPoint', 'shells', 'centerMasses']
    },
    {
      title: "Animate Shell Collapse",
      description: "Watch as each shell's mass 'collapses' to the center. The Shell Theorem tells us this doesn't change the gravitational force on our external test point.",
      elements: ['solidSphere', 'testPoint', 'shells', 'collapseAnimation', 'centerMasses']
    },
    {
      title: "All Shells Collapsed",
      description: "When all shells have collapsed to the center, we have all the sphere's mass concentrated at a single point. The total force is the sum of forces from all the collapsed shell masses.",
      elements: ['testPoint', 'centerMasses', 'totalMass', 'forceVector']
    },
    {
      title: "Final Result",
      description: "Therefore, a uniform solid sphere behaves gravitationally as if all its mass were concentrated at its center - for any external point. This is why we can treat planets as point masses in orbital calculations!",
      elements: ['testPoint', 'totalMass', 'forceVector', 'conclusion']
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
                How do we analyze the gravitational force from a <span className="font-bold text-blue-600 dark:text-blue-400">solid sphere</span> on an external point?
              </div>
              
              <div className="text-center my-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-600">
                <div className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                  Key Strategy:
                </div>
                <div className="text-lg text-blue-800 dark:text-blue-200">
                  Divide the solid sphere into <span className="font-bold">concentric shells</span> and apply the Shell Theorem to each one.
                </div>
              </div>
              
              <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                This approach will show that a solid sphere behaves exactly like a point mass located at its center.
              </div>

              {/* Auto Shell Collapse Status */}
              {currentStep >= 2 && (
                <motion.div 
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">Shell Collapse</h3>
                  
                  <div className="space-y-3">
                    {currentStep >= 2 && (
                      <div className="text-lg text-blue-800 dark:text-blue-200">
                        We replace the innermost shell with a point mass at the center. Why can we do this?
                        <div className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                          Because the Shell Theorem tells us that the gravitational force for a point outside the sphere from a uniform spherical shell is the same as if all its mass were concentrated at the center.
                        </div>
                      </div>
                    )}
                    
                    {currentStep >= 3 && (
                      <div className="text-lg text-green-800 dark:text-green-200 bg-white dark:bg-gray-700 p-3 rounded">
                        Now we can collapse all the shells one by one and replace them with point masses at the center. By doing this, we keep on adding point masses at the center.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Mathematical Summary */}
              {currentStep >= 4 && (
                <motion.div 
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">Mathematical Result</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <div className="font-medium mb-1">Each Shell Contributes:</div>
                      <BlockMath math="F_i = G \frac{m \cdot m_i}{r^2}" />
                      <div className="text-lg text-gray-600 dark:text-gray-400">where r is distance from sphere center to test point</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <div className="font-medium mb-1">Total Force:</div>
                      <BlockMath math="F_{total} = \sum_{i=1}^{n} F_i = G \frac{m \cdot M_{total}}{r^2}" />
                      <div className="text-lg text-gray-600 dark:text-gray-400">Same as if all mass <InlineMath math="M_{total}" /> were at the center!</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column - Step-by-Step Visualization */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
          <h2 className="text-gray-900 dark:text-white font-medium mb-4">Solid Sphere Analysis</h2>
          
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
              {/* Solid Sphere (Step 1) - disappears when all shells collapsed */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('solidSphere') && collapsedShells.length < 6 && (
                  <motion.circle
                    cx={sphereCenter.x}
                    cy={sphereCenter.y}
                    r={sphereRadius}
                    fill="rgba(99, 102, 241, 0.3)"
                    stroke="#6366F1"
                    strokeWidth="0.5"
                    className="fill-indigo-300/30 stroke-indigo-600 dark:fill-indigo-600/30 dark:stroke-indigo-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </AnimatePresence>

              {/* Concentric Shells (Step 2+) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('shells') && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {generateShells().map((shell, index) => (
                      <AnimatePresence key={shell.id}>
                        {!shell.isCollapsed && (
                          <motion.circle
                            cx={sphereCenter.x}
                            cy={sphereCenter.y}
                            r={shell.radius}
                            fill="none"
                            stroke={shell.color}
                            strokeWidth="1"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.8, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </AnimatePresence>
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Center Masses - individual shell masses (Steps 3-4) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('centerMasses') && !constructionSteps[currentStep]?.elements.includes('totalMass') && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {collapsedShells.map((shellIndex, index) => {
                      const shell = generateShells()[shellIndex];
                      const offset = 0; // Small offset to show individual masses
                      return (
                        <motion.circle
                          key={`collapsed-${shellIndex}`}
                          cx={sphereCenter.x + Math.cos(index * Math.PI / 3) * offset}
                          cy={sphereCenter.y + Math.sin(index * Math.PI / 3) * offset}
                          r="1.2"
                          fill={shell.color}
                          stroke="#FFFFFF"
                          strokeWidth="0.2"
                          initial={{ 
                            scale: 0, 
                            x: Math.cos(index * Math.PI / 3) * shell.radius, 
                            y: Math.sin(index * Math.PI / 3) * shell.radius 
                          }}
                          animate={{ 
                            scale: shellIndex > 5 ? 0.2*(shellIndex+1) : 1, 
                            x: Math.cos(index * Math.PI / 3) * offset, 
                            y: Math.sin(index * Math.PI / 3) * offset 
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      );
                    })}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Single Total Mass at Center (Step 5+) - replaces individual shell masses */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('totalMass') && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <circle
                      cx={sphereCenter.x}
                      cy={sphereCenter.y}
                      r="2"
                      fill="#DC2626"
                      className="fill-red-600 dark:fill-red-400"
                    />
                    <text
                      x={sphereCenter.x}
                      y={sphereCenter.y - 6}
                      textAnchor="middle"
                      fontSize="2.5"
                      fontWeight="bold"
                      fill="#DC2626"
                      className="fill-red-600 dark:fill-red-400"
                    >
                      M<tspan baselineShift="sub">total</tspan>
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
                      r="1"
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

              {/* Force Vector (Step 5+) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('forceVector') && (
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
                          fill="#10B981"
                          className="fill-green-500 dark:fill-green-400"
                        />
                      </marker>
                    </defs>
                    
                    <line
                      x1={testPoint.x}
                      y1={testPoint.y}
                      x2={testPoint.x - 15}
                      y2={testPoint.y}
                      stroke="#10B981"
                      strokeWidth="1"
                      markerEnd="url(#arrowhead-force)"
                      className="stroke-green-500 dark:stroke-green-400"
                    />
                    
                    <text
                      x={testPoint.x}
                      y={testPoint.y - 5}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="#10B981"
                      className="fill-green-500 dark:fill-green-400"
                    >
                      F = GMm/r²
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Conclusion Text (Step 6) */}
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
                    Solid Sphere ≡ Point Mass at Center
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
              <p className="text-lg">For gravitational calculations, how should we treat Earth when calculating the force on a satellite in orbit?</p>
              <TrackedInteraction 
                interaction={slideInteractions[3]} 
                onInteractionComplete={handleInteractionComplete}
              >
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuizAnswer('point_mass_correct')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'point_mass_correct'
                        ? 'border-green-500 bg-green-100 dark:bg-green-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    As a point mass with all Earth's mass at the center
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('distributed_wrong')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'distributed_wrong'
                        ? 'border-red-500 bg-red-100 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    As a distributed mass with complex calculations
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('surface_wrong')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'surface_wrong'
                        ? 'border-red-500 bg-red-100 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    Only consider mass at Earth's surface
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('depends_altitude_wrong')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'depends_altitude_wrong'
                        ? 'border-red-500 bg-red-100 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    It depends on the satellite's altitude
                  </button>
                </div>
                
                {showFeedback && (
                  <div className={`mt-4 p-3 rounded-lg ${
                    selectedAnswer === 'point_mass_correct' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {selectedAnswer === 'point_mass_correct' ? (
                      <p>✅ Correct! The shell theorem analysis shows that any uniform solid sphere behaves gravitationally as if all its mass were concentrated at the center, making orbital calculations much simpler.</p>
                    ) : (
                      <p>❌ Not quite. The shell theorem proves that for any external point, we can treat Earth (or any uniform solid sphere) as a point mass located at its center.</p>
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
      slideId="solid-sphere-analysis"
      slideTitle="Solid Sphere Analysis"
      moduleId="gravitation-0001"
      submoduleId="shell-theorems"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 