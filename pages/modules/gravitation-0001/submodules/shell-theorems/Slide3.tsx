import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ShellTheoremInsideSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const testPointPosition = { x: 12, y: 8 }; // fixed off-center position
  
  const slideInteractions: Interaction[] = [
    {
      id: 'shell-theorem-inside-introduction',
      conceptId: 'shell-inside-intro',
      conceptName: 'Shell Theorem Inside Introduction',
      type: 'learning',
      description: 'Understanding gravitational force inside a spherical shell'
    },
    {
      id: 'step-by-step-visualization',
      conceptId: 'step-visualization',
      conceptName: 'Step-by-Step Shell Analysis',
      type: 'learning',
      description: 'Interactive step-by-step analysis of forces inside shell'
    },
    {
      id: 'cone-analysis',
      conceptId: 'cone-mass-ratio',
      conceptName: 'Cone Mass Ratio Analysis',
      type: 'learning',
      description: 'Understanding how opposing cone masses balance'
    },
    {
      id: 'inside-shell-quiz',
      conceptId: 'inside-shell-understanding',
      conceptName: 'Inside Shell Force Quiz',
      type: 'judging',
      description: 'Testing understanding of force inside a shell'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Handle quiz answer selection
  const handleQuizAnswer = (answerId: string) => {
    const isCorrect = answerId === 'zero_force_correct';
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    const optionTextMap: Record<string, string> = {
      zero_force_correct: 'Zero - no gravitational force from the station',
      toward_center_wrong: "Toward the center of the station",
      toward_closest_wrong: "Toward the closest wall of the station",
      depends_position_wrong: "Depends on the astronaut's position inside"
    };
    const response: InteractionResponse = {
      interactionId: 'inside-shell-quiz',
      value: optionTextMap[answerId] || answerId,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'inside-shell-understanding',
      conceptName: 'Inside Shell Force Quiz',
      conceptDescription: 'Testing understanding of force inside a shell',
      question: {
        type: 'mcq',
        question: 'An astronaut floats inside a hollow spherical space station. What gravitational force does the station exert on the astronaut?',
        options: [
          'Zero - no gravitational force from the station',
          "Toward the center of the station",
          "Toward the closest wall of the station",
          "Depends on the astronaut's position inside"
        ]
      }
    };
    
    handleInteractionComplete(response);
  };

  // Shell configuration
  const shellCenter = { x: 50, y: 50 }; // center of coordinate system (percentage)
  const shellOuterRadius = 35; // percentage
  const shellInnerRadius = 33; // percentage
  const coneAngle = 8; // degrees for the narrow cone

  // Convert test point from relative coordinates to absolute
  const testPoint = {
    x: shellCenter.x + testPointPosition.x,
    y: shellCenter.y + testPointPosition.y
  };

  // Generate force vectors for center point (Step 1)
  const generateCenterForceVectors = () => {
    const vectors = [];
    const numVectors = 8;
    const vectorLength = 15;
    
    for (let i = 0; i < numVectors; i++) {
      const angle = (i * 360) / numVectors;
      const angleRad = (angle * Math.PI) / 180;
      
      vectors.push({
        id: i,
        startX: shellCenter.x,
        startY: shellCenter.y,
        endX: shellCenter.x + Math.cos(angleRad) * vectorLength,
        endY: shellCenter.y + Math.sin(angleRad) * vectorLength,
        angle: angle
      });
    }
    
    return vectors;
  };

  // Generate cone geometry for off-center analysis (Steps 4-6)
  const generateConeGeometry = () => {
    if (testPointPosition.x === 0 && testPointPosition.y === 0) return null;
    
    // Calculate cone direction (from test point through shell)
    const coneAngleRad = (coneAngle * Math.PI) / 180;
    const directionAngle = Math.atan2(testPointPosition.y, testPointPosition.x);
    
    // Calculate intersections with shell boundaries
    // Near side: intersection with inner shell boundary
    const nearDistance = Math.sqrt(
      Math.pow(shellOuterRadius, 2) - Math.pow(testPointPosition.x * Math.sin(directionAngle) - testPointPosition.y * Math.cos(directionAngle), 2)
    ) - (testPointPosition.x * Math.cos(directionAngle) + testPointPosition.y * Math.sin(directionAngle));
    
    // Far side: intersection with outer shell boundary
    const farDistance = Math.sqrt(
      Math.pow(shellOuterRadius, 2) - Math.pow(testPointPosition.x * Math.sin(directionAngle) - testPointPosition.y * Math.cos(directionAngle), 2)
    ) + (testPointPosition.x * Math.cos(directionAngle) + testPointPosition.y * Math.sin(directionAngle));
    
    // Calculate actual intersection points
    const nearConeX = testPoint.x + Math.cos(directionAngle) * nearDistance;
    const nearConeY = testPoint.y + Math.sin(directionAngle) * nearDistance;
    
    const farConeX = testPoint.x - Math.cos(directionAngle) * farDistance;
    const farConeY = testPoint.y - Math.sin(directionAngle) * farDistance;
    
    // Calculate cone boundaries
    const upperAngle = directionAngle + coneAngleRad;
    const lowerAngle = directionAngle - coneAngleRad;
    
    return {
      direction: directionAngle,
      nearIntersection: { x: nearConeX, y: nearConeY },
      farIntersection: { x: farConeX, y: farConeY },
      upperAngle,
      lowerAngle,
      nearDistance,
      farDistance
    };
  };

  const constructionSteps = [
    {
      title: "Point at Shell Center",
      description: "Consider a test mass placed at the exact center of a uniform spherical shell. Due to perfect symmetry, gravitational forces from all directions are equal and opposite.",
      elements: ['shell', 'centerPoint', 'centerVectors']
    },
    {
      title: "Forces Cancel at Center", 
      description: "At the center, every mass element on one side of the shell has a corresponding mass element on the exact opposite side. These opposing forces cancel perfectly, resulting in zero net force.",
      elements: ['shell', 'centerPoint', 'centerVectors', 'netForceZero']
    },
    {
      title: "Off-Center Point",
      description: "Now place the test mass at any other position inside the shell. The symmetry is broken, but the net force is still zero. Let's see why...",
      elements: ['shell', 'offCenterPoint']
    },
    {
      title: "Narrow Cone Analysis",
      description: "Draw a very narrow cone from the test point through the shell. This cone intersects the shell on both sides, creating two small circular caps.",
      elements: ['shell', 'offCenterPoint', 'cone', 'coneBoundaries']
    },
    {
      title: "Different Distances, Different Areas",
      description: "The near side of the cone is closer but subtends a smaller area. The far side is farther but subtends a larger area. Let's analyze the mass ratio.",
      elements: ['shell', 'offCenterPoint', 'cone', 'coneBoundaries', 'distanceLabels']
    },
    {
      title: "Mass Ratio Analysis",
      description: "Near mass ∝ (area) ∝ r₁². Far mass ∝ (area) ∝ r₂². But gravitational force ∝ mass/distance². The r² factors cancel exactly!",
      elements: ['shell', 'offCenterPoint', 'cone', 'coneBoundaries', 'distanceLabels', 'massRatio']
    },
    {
      title: "Perfect Cancellation",
      description: "For every narrow cone through the test point, the gravitational forces from both ends cancel exactly. Since this works for all possible cones, the total net force is zero.",
      elements: ['shell', 'offCenterPoint', 'cone', 'coneBoundaries', 'distanceLabels', 'massRatio', 'forceVectors', 'cancellation']
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
                What happens to gravitational force when a particle is placed <span className="font-bold text-blue-600 dark:text-blue-400">inside</span> a uniform spherical shell?
              </div>
              
              <div className="text-center my-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-600">
                <div className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">
                  Result:
                </div>
                <div className="text-lg text-green-800 dark:text-green-200">
                  The gravitational force is <span className="font-bold">zero everywhere</span> inside the shell!
                </div>
              </div>
              
              <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                This surprising result follows from the inverse square law and geometric properties of spheres. Let's see why through step-by-step analysis.
              </div>



              {/* Mathematical Analysis for Steps 5-7 */}
              {currentStep >= 4 && (
                <motion.div 
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h4 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">Mathematical Analysis</h4>
                  
                  <div className="space-y-3 text-lg">
                                     <div className="bg-white dark:bg-gray-700 p-3 rounded">
                         <div className="font-medium mb-1">Mass Ratio:</div>
                         <BlockMath math="\frac{M_1}{M_2} = \frac{r_1^2}{r_2^2}" />
                         <div className="text-lg text-blue-700 dark:text-blue-300 mb-2">Mass of each cap is proportional to its area</div>
                         <div className="text-lg text-gray-600 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                           Why <InlineMath math="M \propto \text{Area}" />? 
                           <br/>
                           Since we have a <em>uniform</em> spherical shell, the mass density is constant throughout. Therefore, mass is directly proportional to the surface area of each cap intercepted by the cone.
                         </div>
                       </div>
                    
                    {currentStep >= 5 && (
                      
                      <div>
                      <div className="bg-white dark:bg-gray-700 p-3 rounded">
                        <div className="font-medium mb-1">Near Side (distance r₁):</div>
                        <BlockMath math="F_1 = G \frac{m \cdot M_1}{r_1^2}" />
                        <div className="text-lg text-gray-600 dark:text-gray-200">where M₁ ∝ r₁² (area of cap)</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 p-3 rounded">
                        <div className="font-medium mb-1">Far Side (distance r₂):</div>
                        <BlockMath math="F_2 = G \frac{m \cdot M_2}{r_2^2}" />
                        <div className="text-lg text-gray-600 dark:text-gray-200">where M₂ ∝ r₂² (area of cap)</div>
                      </div>
                      </div>
                    )}
                    
                    {currentStep >= 6 && (
                      <div className="bg-green-100 dark:bg-green-800 p-3 rounded">
                        <div className="font-medium mb-1">Force Ratio:</div>
                        <BlockMath math="\frac{F_1}{F_2} = \frac{M_1/r_1^2}{M_2/r_2^2} = \frac{r_1^2/r_1^2}{r_2^2/r_2^2} = 1" />
                        <div className="text-lg text-green-700 dark:text-green-300">Forces are equal and opposite → Net force = 0</div>
                      </div>
                      
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column - Step-by-Step Visualization */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
          <h2 className="text-gray-900 dark:text-white font-medium mb-4">Why is the force zero inside the shell?</h2>
          
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
              {/* Shell - always visible */}
              <g>
                {/* Outer shell boundary */}
                <circle
                  cx={shellCenter.x}
                  cy={shellCenter.y}
                  r={shellOuterRadius}
                  fill="rgba(59, 130, 246, 0.3)"
                  stroke="#3B82F6"
                  strokeWidth="0.5"
                  className="fill-blue-300/30 stroke-blue-600 dark:fill-blue-600/30 dark:stroke-blue-400"
                />
                
                {/* Inner shell boundary */}
                <circle
                  cx={shellCenter.x}
                  cy={shellCenter.y}
                  r={shellInnerRadius}
                  fill="rgba(248, 250, 252, 1)"
                  stroke="#3B82F6"
                  strokeWidth="0.5"
                  className="fill-slate-50 dark:fill-slate-900 stroke-blue-600 dark:stroke-blue-400"
                />
              </g>

              {/* Center Point (Steps 1-2) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('centerPoint') && (
                  <motion.circle
                    cx={shellCenter.x}
                    cy={shellCenter.y}
                    r="1.5"
                    fill="#DC2626"
                    className="fill-red-600 dark:fill-red-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>

              {/* Center Force Vectors (Steps 1-2) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('centerVectors') && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {generateCenterForceVectors().map((vector, index) => (
                      <motion.line
                        key={vector.id}
                        x1={vector.startX}
                        y1={vector.startY}
                        x2={vector.endX}
                        y2={vector.endY}
                        stroke="#F59E0B"
                        strokeWidth="0.5"
                        markerEnd="url(#arrowhead)"
                        className="stroke-yellow-500 dark:stroke-yellow-400"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                      />
                    ))}
                    
                    {/* Arrow marker definition */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="4"
                        markerHeight="3"
                        refX="3.5"
                        refY="1.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 4 1.5, 0 3"
                          fill="#F59E0B"
                          className="fill-yellow-500 dark:fill-yellow-400"
                        />
                      </marker>
                    </defs>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Net Force Zero indication (Step 2) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('netForceZero') && (
                  <motion.text
                    x={shellCenter.x}
                    y={shellCenter.y - 25}
                    textAnchor="middle"
                    fontSize="4"
                    fontWeight="bold"
                    fill="#10B981"
                    className="fill-green-600 dark:fill-green-400"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    Net Force = 0
                  </motion.text>
                )}
              </AnimatePresence>

              {/* Off-Center Point (Steps 3+) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('offCenterPoint') && (
                  <motion.circle
                    cx={testPoint.x}
                    cy={testPoint.y}
                    r="1.5"
                    fill="#DC2626"
                    className="fill-red-600 dark:fill-red-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>

              {/* Cone visualization (Steps 4+) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('cone') && (() => {
                  const cone = generateConeGeometry();
                  if (!cone) return null;
                  
                  const coneAngleRad = (coneAngle * Math.PI) / 180;
                  
                  return (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      {/* Cone boundaries - properly limited to shell boundaries */}
                      <line
                        x1={testPoint.x + Math.cos(cone.upperAngle) * cone.nearDistance}
                        y1={testPoint.y + Math.sin(cone.upperAngle) * cone.nearDistance}
                        x2={testPoint.x - Math.cos(cone.upperAngle) * cone.farDistance}
                        y2={testPoint.y - Math.sin(cone.upperAngle) * cone.farDistance}
                        stroke="#8B5CF6"
                        strokeWidth="0.3"
                        strokeDasharray="1,1"
                        className="stroke-purple-600 dark:stroke-purple-400"
                      />
                      <line
                        x1={testPoint.x + Math.cos(cone.lowerAngle) * cone.nearDistance}
                        y1={testPoint.y + Math.sin(cone.lowerAngle) * cone.nearDistance}
                        x2={testPoint.x - Math.cos(cone.lowerAngle) * cone.farDistance}
                        y2={testPoint.y - Math.sin(cone.lowerAngle) * cone.farDistance}
                        stroke="#8B5CF6"
                        strokeWidth="0.3"
                        strokeDasharray="1,1"
                        className="stroke-purple-600 dark:stroke-purple-400"
                      />
                      
                      {/* Center line of cone - properly limited to shell boundaries */}
                      <line
                        x1={cone.nearIntersection.x}
                        y1={cone.nearIntersection.y}
                        x2={cone.farIntersection.x}
                        y2={cone.farIntersection.y}
                        stroke="#8B5CF6"
                        strokeWidth="0.5"
                        className="stroke-purple-600 dark:stroke-purple-400"
                      />
                    </motion.g>
                  );
                })()}
              </AnimatePresence>

              {/* Distance labels (Steps 5+) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('distanceLabels') && (() => {
                  const cone = generateConeGeometry();
                  if (!cone) return null;
                  
                  return (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                    >
                      {/* Near distance label */}
                      <text
                        x={testPoint.x + Math.cos(cone.direction) * cone.nearDistance * 0.5}
                        y={testPoint.y + Math.sin(cone.direction) * cone.nearDistance * 0.5 - 2}
                        textAnchor="middle"
                        fontSize="3"
                        fill="#F59E0B"
                        className="fill-yellow-600 dark:fill-yellow-400"
                      >
                        r₁
                      </text>
                      
                      {/* Far distance label */}
                      <text
                        x={testPoint.x - Math.cos(cone.direction) * cone.farDistance * 0.5}
                        y={testPoint.y - Math.sin(cone.direction) * cone.farDistance * 0.5 - 2}
                        textAnchor="middle"
                        fontSize="3"
                        fill="#F59E0B"
                        className="fill-yellow-600 dark:fill-yellow-400"
                      >
                        r₂
                      </text>
                    </motion.g>
                  );
                })()}
              </AnimatePresence>

              {/* Mass ratio highlighting (Step 6) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('massRatio') && (() => {
                  const cone = generateConeGeometry();
                  if (!cone) return null;
                  
                  const coneAngleRad = (coneAngle * Math.PI) / 180;
                  
                  // Calculate arc paths for the cone caps on shell boundaries
                  const nearCapAngle = Math.asin((coneAngle * Math.PI / 180) * cone.nearDistance / shellOuterRadius) * 180 / Math.PI;
                  const farCapAngle = Math.asin((coneAngle * Math.PI / 180) * cone.farDistance / shellOuterRadius) * 180 / Math.PI;
                  
                  return (
                                         <motion.g
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 1, delay: 1.2 }}
                     >
                       {/* Connecting lines from shell to area representations */}
                       <line
                         x1={cone.nearIntersection.x}
                         y1={cone.nearIntersection.y}
                         x2={cone.nearIntersection.x + Math.cos(cone.direction) * 8}
                         y2={cone.nearIntersection.y + Math.sin(cone.direction) * 8}
                         stroke="#DC2626"
                         strokeWidth="0.3"
                         strokeDasharray="1,1"
                         className="stroke-red-600 dark:stroke-red-400"
                       />
                       
                       <line
                         x1={cone.farIntersection.x}
                         y1={cone.farIntersection.y}
                         x2={cone.farIntersection.x - Math.cos(cone.direction) * 8}
                         y2={cone.farIntersection.y - Math.sin(cone.direction) * 8}
                         stroke="#1D4ED8"
                         strokeWidth="0.3"
                         strokeDasharray="1,1"
                         className="stroke-blue-600 dark:stroke-blue-400"
                       />
                       
                       {/* Near side cap area (smaller, closer) - moved outside sphere */}
                       <circle
                         cx={cone.nearIntersection.x + Math.cos(cone.direction) * 8}
                         cy={cone.nearIntersection.y + Math.sin(cone.direction) * 8}
                         r="2.5"
                         fill="rgba(239, 68, 68, 0.7)"
                         stroke="#EF4444"
                         strokeWidth="0.5"
                         className="fill-red-500/70 stroke-red-500 dark:fill-red-400/70 dark:stroke-red-400"
                       />
                       
                       {/* Far side cap area (larger, farther) - moved outside sphere */}
                       <circle
                         cx={cone.farIntersection.x - Math.cos(cone.direction) * 8}
                         cy={cone.farIntersection.y - Math.sin(cone.direction) * 8}
                         r="4"
                         fill="rgba(59, 130, 246, 0.7)"
                         stroke="#3B82F6"
                         strokeWidth="0.5"
                         className="fill-blue-500/70 stroke-blue-500 dark:fill-blue-400/70 dark:stroke-blue-400"
                       />
                      
                                             {/* Area labels */}
                       <text
                         x={cone.nearIntersection.x + Math.cos(cone.direction) * 8}
                         y={cone.nearIntersection.y + Math.sin(cone.direction) * 8 + 5}
                         textAnchor="middle"
                         fontSize="2.5"
                         fontWeight="bold"
                         fill="#DC2626"
                         className="fill-red-600 dark:fill-red-400"
                       >
                         Area ∝ r₁²
                       </text>
                       
                       <text
                         x={cone.farIntersection.x - Math.cos(cone.direction) * 8}
                         y={cone.farIntersection.y - Math.sin(cone.direction) * 8 - 7}
                         textAnchor="middle"
                         fontSize="2.5"
                         fontWeight="bold"
                         fill="#1D4ED8"
                         className="fill-blue-600 dark:fill-blue-400"
                       >
                         Area ∝ r₂²
                       </text>
                       
                       {/* Mass labels */}
                       <text
                         x={cone.nearIntersection.x + Math.cos(cone.direction) * 8 + 6}
                         y={cone.nearIntersection.y + Math.sin(cone.direction) * 8 - 2}
                         textAnchor="middle"
                         fontSize="2.5"
                         fontWeight="bold"
                         fill="#DC2626"
                         className="fill-red-600 dark:fill-red-400"
                       >
                         M₁
                       </text>
                       
                       <text
                         x={cone.farIntersection.x - Math.cos(cone.direction) * 8 - 6}
                         y={cone.farIntersection.y - Math.sin(cone.direction) * 8 - 2}
                         textAnchor="middle"
                         fontSize="2.5"
                         fontWeight="bold"
                         fill="#1D4ED8"
                         className="fill-blue-600 dark:fill-blue-400"
                       >
                         M₂
                       </text>
                    </motion.g>
                  );
                })()}
              </AnimatePresence>

              {/* Force vectors and cancellation (Steps 6-7) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('forceVectors') && (() => {
                  const cone = generateConeGeometry();
                  if (!cone) return null;
                  
                  return (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.2 }}
                    >
                      {/* Force from near side */}
                      <line
                        x1={testPoint.x}
                        y1={testPoint.y}
                        x2={testPoint.x + Math.cos(cone.direction) * 10}
                        y2={testPoint.y + Math.sin(cone.direction) * 10}
                        stroke="#10B981"
                        strokeWidth="1"
                        markerEnd="url(#arrowhead-green)"
                        className="stroke-green-500 dark:stroke-green-400"
                      />
                      
                      {/* Force from far side */}
                      <line
                        x1={testPoint.x}
                        y1={testPoint.y}
                        x2={testPoint.x - Math.cos(cone.direction) * 10}
                        y2={testPoint.y - Math.sin(cone.direction) * 10}
                        stroke="#10B981"
                        strokeWidth="1"
                        markerEnd="url(#arrowhead-green)"
                        className="stroke-green-500 dark:stroke-green-400"
                      />
                      
                      {/* Arrow marker for forces */}
                      <defs>
                        <marker
                          id="arrowhead-green"
                          markerWidth="4"
                          markerHeight="3"
                          refX="3.5"
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
                    </motion.g>
                  );
                })()}
              </AnimatePresence>

              {/* Cancellation indication (Step 7) */}
              <AnimatePresence>
                {constructionSteps[currentStep]?.elements.includes('cancellation') && (
                  <motion.text
                    x={testPoint.x - 8}
                    y={testPoint.y + 10}
                    textAnchor="middle"
                    fontSize="3"
                    fontWeight="bold"
                    fill="#10B981"
                    className="fill-green-600 dark:fill-green-400"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                  >
                    Forces Cancel!
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
              <p className="text-lg">An astronaut floats inside a hollow spherical space station. What gravitational force does the station exert on the astronaut?</p>
              <TrackedInteraction 
                interaction={slideInteractions[3]} 
                onInteractionComplete={handleInteractionComplete}
              >
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuizAnswer('zero_force_correct')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'zero_force_correct'
                        ? 'border-green-500 bg-green-100 dark:bg-green-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    Zero - no gravitational force from the station
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('toward_center_wrong')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'toward_center_wrong'
                        ? 'border-red-500 bg-red-100 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    Toward the center of the station
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('toward_closest_wrong')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'toward_closest_wrong'
                        ? 'border-red-500 bg-red-100 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    Toward the closest wall of the station
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('depends_position_wrong')}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      selectedAnswer === 'depends_position_wrong'
                        ? 'border-red-500 bg-red-100 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    Depends on the astronaut's position inside
                  </button>
                </div>
                
                {showFeedback && (
                  <div className={`mt-4 p-3 rounded-lg ${
                    selectedAnswer === 'zero_force_correct' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {selectedAnswer === 'zero_force_correct' ? (
                      <p>✅ Correct! The Shell Theorem proves that the gravitational force anywhere inside a uniform spherical shell is exactly zero. This is independent of the astronaut's position inside.</p>
                    ) : (
                      <p>❌ Not quite. The Shell Theorem shows that gravitational forces from all parts of the spherical shell cancel exactly, resulting in zero net force everywhere inside the shell.</p>
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
      slideId="shell-theorem-internal"
      slideTitle="Shell Theorem: Inside the Shell"
      moduleId="gravitation-0001"
      submoduleId="shell-theorems"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 