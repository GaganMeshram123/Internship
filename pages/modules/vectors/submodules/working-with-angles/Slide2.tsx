import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function VectorSumMagnitudeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [vectorA, setVectorA] = useState({ magnitude: 120, angle: 30 }); // A at 30 degrees initially
  const [vectorB, setVectorB] = useState({ magnitude: 80, angle: 90 }); // B at 90 degrees initially
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState<boolean>(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'vector-sum-introduction',
      conceptId: 'vector-sum-intro',
      conceptName: 'Vector Sum Magnitude Introduction',
      type: 'learning',
      description: 'Understanding that vector sum magnitude is not simply the sum of individual magnitudes'
    },
    {
      id: 'step-visualization',
      conceptId: 'cosine-rule-derivation',
      conceptName: 'Step-by-Step Cosine Rule Derivation',
      type: 'learning',
      description: 'Interactive visualization of deriving the cosine rule for vector addition'
    },
    {
      id: 'triangle-inequality-quiz',
      conceptId: 'triangle-inequality-understanding',
      conceptName: 'Triangle Inequality Quiz',
      type: 'judging',
      description: 'Testing understanding of triangle inequality in vector addition'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Quiz questions
  const questions = [
    {
      id: 'special-cases-equality',
      question: 'When is |A + B| = |A| + |B|?',
      options: [
        { text: 'When A and B are in the same direction', isCorrect: true },
        { text: 'When A and B are in opposite directions', isCorrect: false },
        { text: 'When A and B are perpendicular', isCorrect: false },
        { text: 'Always, regardless of direction', isCorrect: false }
      ],
      explanation: 'The magnitude of the sum equals the sum of magnitudes only when vectors point in the same direction, making θ = 0° and cos θ = 1.'
    },
    {
      id: 'triangle-inequality',
      question: 'Which statement correctly represents the triangle inequality for vector addition?',
      options: [
        { text: '||A| - |B|| ≤ |A + B| ≤ |A| + |B|', isCorrect: true },
        { text: '|A + B| = |A| + |B| always', isCorrect: false },
        { text: '|A + B| ≥ |A| + |B| always', isCorrect: false },
        { text: '|A + B| = ||A| - |B|| always', isCorrect: false }
      ],
      explanation: 'The triangle inequality shows that the magnitude of the sum is bounded between the difference and sum of individual magnitudes.'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // Handle quiz answer selection
  const handleQuizAnswer = (answerText: string) => {
    setSelectedQuizAnswer(answerText);
    setShowQuizFeedback(true);
    
    const correctOption = currentQuestion.options.find(o => o.isCorrect);
    const isCorrect = answerText === correctOption?.text;
    
    // Update score and answered status
    if (!questionsAnswered[currentQuestionIndex]) {
      const newQuestionsAnswered = [...questionsAnswered];
      newQuestionsAnswered[currentQuestionIndex] = true;
      setQuestionsAnswered(newQuestionsAnswered);
      
      if (isCorrect) {
        setScore(score + 1);
      }
    }
    
    const response: InteractionResponse = {
      interactionId: `quiz-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: currentQuestion.id,
      conceptName: 'Vector Sum Magnitude Quiz',
      conceptDescription: 'Testing understanding of vector sum magnitude concepts',
      question: {
        type: 'mcq',
        question: currentQuestion.question,
        options: currentQuestion.options.map(o => o.text)
      }
    };
    
    handleInteractionComplete(response);
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    setSelectedQuizAnswer(null);
    setShowQuizFeedback(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  // Convert degrees to radians
  const angleARad = (vectorA.angle * Math.PI) / 180;
  const angleBRad = (vectorB.angle * Math.PI) / 180;
  const angleBetween = Math.abs(angleBRad - angleARad);
  
  // In step 3+, we show the rotated configuration where A is horizontal
  // The rotation angle needed to make A horizontal is -vectorA.angle
  const rotationAngle = -vectorA.angle;
  const rotationRad = (rotationAngle * Math.PI) / 180;
  
  // Calculate positions for both configurations
  const originalAngleA = angleARad;
  const originalAngleB = angleBRad;
  const rotatedAngleA = 0; // A becomes horizontal
  const rotatedAngleB = angleBRad + rotationRad; // B rotates by the same amount
  
  // Use original angles for steps 1-2, rotated angles for steps 3+
  const effectiveAngleA = currentStep >= 2 ? rotatedAngleA : originalAngleA;
  const effectiveAngleB = currentStep >= 2 ? rotatedAngleB : originalAngleB;
  
  // Scale factor for the diagram
  const scale = 1.5;
  
  // Center point for the diagram
  const centerX = 300;
  const centerY = 200;
  
  // Calculate vector endpoints
  const points = {
    // Vector A
    vectorAEnd: { 
      x: centerX + vectorA.magnitude * scale * Math.cos(effectiveAngleA), 
      y: centerY - vectorA.magnitude * scale * Math.sin(effectiveAngleA) 
    },
    // Vector B 
    vectorBEnd: { 
      x: centerX + vectorB.magnitude * scale * Math.cos(effectiveAngleB), 
      y: centerY - vectorB.magnitude * scale * Math.sin(effectiveAngleB) 
    },
    // Vector B from tip of A (for vector addition)
    vectorBFromA: {
      x: centerX + vectorA.magnitude * scale * Math.cos(effectiveAngleA) + vectorB.magnitude * scale * Math.cos(effectiveAngleB),
      y: centerY - vectorA.magnitude * scale * Math.sin(effectiveAngleA) - vectorB.magnitude * scale * Math.sin(effectiveAngleB)
    },
    // Component of B along A (only relevant after rotation)
    bComponentAlongA: {
      x: centerX + vectorA.magnitude * scale * Math.cos(effectiveAngleA) + vectorB.magnitude * scale * Math.cos(angleBetween) * Math.cos(effectiveAngleA),
      y: centerY - vectorA.magnitude * scale * Math.sin(effectiveAngleA) - vectorB.magnitude * scale * Math.cos(angleBetween) * Math.sin(effectiveAngleA)
    }
  };

  // Calculate magnitudes for display
  const magnitudeA = vectorA.magnitude / scale;
  const magnitudeB = vectorB.magnitude / scale;
  const bComponentAlongAMag = magnitudeB * Math.cos(angleBetween);
  const bComponentPerpAMag = magnitudeB * Math.sin(angleBetween);
  const resultantMagnitude = Math.sqrt(
    Math.pow(magnitudeA + bComponentAlongAMag, 2) + Math.pow(bComponentPerpAMag, 2)
  );

  const constructionSteps = [
    {
      title: "Two Vectors A and B",
      description: "We start with two vectors A and B in arbitrary directions with an angle θ between them. We want to find the magnitude of their sum |A + B|.",
      elements: ['vectorA', 'vectorB', 'angle']
    },
    {
      title: "Vector Addition Setup",
      description: "To add vectors, we place B at the tip of A. The resultant vector goes from the tail of A to the tip of B.",
      elements: ['vectorA', 'vectorB', 'vectorBFromA', 'resultant', 'angle']
    },
    {
      title: "Rotate to Convenient Axis",
      description: "We rotate the entire setup so that vector A lies along the x-axis. This rotation doesn't change any magnitudes or angles between vectors, but simplifies our analysis.",
      elements: ['vectorA', 'vectorBFromA', 'resultant', 'coordinates']
    },
    {
      title: "Resolve B into Components",
      description: "Now with A along the x-axis, we resolve vector B into components: B cos θ along A's direction, and B sin θ perpendicular to A.",
      elements: ['vectorA', 'vectorBFromA', 'resultant', 'coordinates', 'bComponentAlong', 'bComponentPerp']
    },
    {
      title: "Apply Pythagorean Theorem",
      description: "The resultant has components: (A + B cos θ) along x-axis and (B sin θ) along y-axis. Using Pythagoras: |A + B|² = (A + B cos θ)² + (B sin θ)²",
      elements: ['vectorA', 'vectorBFromA', 'resultant', 'coordinates', 'bComponentAlong', 'bComponentPerp', 'rightTriangle', 'calculation']
    }
  ];

  const slideContent = (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-slate-50 text-slate-800'
    }`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory and Controls */}
        <div className="space-y-6">
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              <div className="space-y-4 text-lg">
                <p className="leading-relaxed">
                  When two vectors add, the magnitude of the resultant vector is 
                  <span className="font-semibold text-blue-600 dark:text-blue-400"> not generally equal</span> to 
                  the sum of the magnitudes of the two vectors.
                </p>
                
                <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
                  isDarkMode 
                    ? 'bg-slate-700' 
                    : 'bg-green-50'
                }`}>
                  <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">General Formula (Cosine Rule)</h5>
                  <div className="text-center">
                    <BlockMath math="|A + B| = \sqrt{|A|^2 + |B|^2 + 2|A||B|\cos\theta}" />
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
                  isDarkMode 
                    ? 'bg-slate-700' 
                    : 'bg-purple-50'
                }`}>
                  <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Triangle Inequality</h5>
                  <div className="text-center">
                    <BlockMath math="||A| - |B|| \leq |A + B| \leq |A| + |B|" />
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Quiz */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              <h4 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">Quick Check</h4>
              
              <div className="space-y-4">
                {isQuizComplete ? (
                  <div className="text-center">
                    <h5 className="text-lg font-medium mb-4">Quiz Complete!</h5>
                    <p className="text-lg mb-4">
                      You scored {score} out of {questions.length} questions correctly.
                    </p>
                    <button
                      onClick={() => {
                        setCurrentQuestionIndex(0);
                        setSelectedQuizAnswer(null);
                        setShowQuizFeedback(false);
                        setQuestionsAnswered([]);
                        setScore(0);
                        setIsQuizComplete(false);
                      }}
                      className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Restart Quiz
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Score: {score}/{questionsAnswered.filter(Boolean).length}
                      </p>
                    </div>
                    
                    <p className="text-lg">
                      {currentQuestion.question}
                    </p>
                    
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(option.text)}
                          disabled={showQuizFeedback}
                          className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                            selectedQuizAnswer === option.text
                              ? option.isCorrect
                                ? 'border-green-500 bg-green-100 dark:bg-green-900'
                                : 'border-red-500 bg-red-100 dark:bg-red-900'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600'
                          }`}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                    
                    {showQuizFeedback && (
                      <div className={`mt-4 p-3 rounded-lg ${
                        selectedQuizAnswer === currentQuestion.options.find(o => o.isCorrect)?.text
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {selectedQuizAnswer === currentQuestion.options.find(o => o.isCorrect)?.text ? (
                          <p>✅ Correct! {currentQuestion.explanation}</p>
                        ) : (
                          <p>❌ Not quite. {currentQuestion.explanation}</p>
                        )}
                        <button
                          onClick={handleNextQuestion}
                          className="mt-3 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                          {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Complete Quiz'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column - Step-by-step Visualization */}
        <div className="space-y-6">
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">Step-by-Step Derivation</h3>
              
              {/* Step Navigation */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50'
                    }`}
                  >
                    ← Previous
                  </button>
                  
                  <h4 className="text-blue-700 dark:text-blue-300 font-medium mb-2">
                    {currentStep + 1}. {constructionSteps[currentStep]?.title}
                  </h4>
                  
                  <button
                    onClick={() => setCurrentStep(Math.min(constructionSteps.length - 1, currentStep + 1))}
                    disabled={currentStep === constructionSteps.length - 1}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-blue-700 hover:bg-blue-600 text-white disabled:opacity-50'
                        : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
                    }`}
                  >
                    Next →
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {constructionSteps[currentStep]?.description}
                  </p>
                </div>
              </div>

              {/* Main Diagram */}
              <div className={`rounded-lg p-4 ${
                isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
              }`}>
                <svg width="100%" height="450" viewBox="200 0 400 300" className="mx-auto">
                  {/* Grid */}
                  {Array.from({ length: 25 }, (_, i) => (
                    <React.Fragment key={i}>
                      <line
                        x1={i * 25}
                        y1="0"
                        x2={i * 25}
                        y2="400"
                        stroke="#E5E7EB"
                        strokeWidth="0.5"
                        className="stroke-gray-300 dark:stroke-gray-600"
                      />
                      <line
                        x1="0"
                        y1={i * 25}
                        x2="600"
                        y2={i * 25}
                        stroke="#E5E7EB"
                        strokeWidth="0.5"
                        className="stroke-gray-300 dark:stroke-gray-600"
                      />
                    </React.Fragment>
                  ))}

                  {/* Vector A */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('vectorA') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        <defs>
                          <marker id="arrowhead-A" markerWidth="10" markerHeight="7" 
                                  refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                          </marker>
                        </defs>
                        <motion.line
                          x1={centerX}
                          y1={centerY}
                          animate={{
                            x2: points.vectorAEnd.x,
                            y2: points.vectorAEnd.y
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          stroke="#EF4444"
                          strokeWidth="4"
                          markerEnd="url(#arrowhead-A)"
                          className="stroke-red-500 dark:stroke-red-400"
                        />
                        <motion.text
                          animate={{
                            x: (centerX + points.vectorAEnd.x) / 2,
                            y: (centerY + points.vectorAEnd.y) / 2 - 15
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          fill="#EF4444"
                          fontSize="16"
                          className="fill-red-500 dark:fill-red-400"
                          fontWeight="bold"
                        >
                          A
                        </motion.text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Vector B (from origin) */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('vectorB') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <defs>
                          <marker id="arrowhead-B" markerWidth="10" markerHeight="7" 
                                  refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                          </marker>
                        </defs>
                        <motion.line
                          x1={centerX}
                          y1={centerY}
                          animate={{
                            x2: points.vectorBEnd.x,
                            y2: points.vectorBEnd.y
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          stroke="#10B981"
                          strokeWidth="4"
                          markerEnd="url(#arrowhead-B)"
                          className="stroke-green-500 dark:stroke-green-400"
                        />
                        <motion.text
                          animate={{
                            x: (centerX + points.vectorBEnd.x) / 2 + 15,
                            y: (centerY + points.vectorBEnd.y) / 2
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          fill="#10B981"
                          fontSize="16"
                          className="fill-green-500 dark:fill-green-400"
                          fontWeight="bold"
                        >
                          B
                        </motion.text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Angle between vectors */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('angle') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                      >
                        {(() => {
                          const arcRadius = 40;
                          const startAngle = Math.min(effectiveAngleA, effectiveAngleB);
                          const endAngle = Math.max(effectiveAngleA, effectiveAngleB);
                          const startX = centerX + arcRadius * Math.cos(startAngle);
                          const startY = centerY - arcRadius * Math.sin(startAngle);
                          const endX = centerX + arcRadius * Math.cos(endAngle);
                          const endY = centerY - arcRadius * Math.sin(endAngle);
                          
                          const largeArcFlag = (endAngle - startAngle) > Math.PI ? 1 : 0;
                          
                          return (
                            <motion.path
                              animate={{
                                d: `M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${endX} ${endY}`
                              }}
                              transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                              fill="none"
                              stroke="#9333EA"
                              strokeWidth="2"
                              className="stroke-purple-600 dark:stroke-purple-400"
                            />
                          );
                        })()}
                        <motion.text
                          animate={{
                            x: centerX + 50 * Math.cos((effectiveAngleA + effectiveAngleB) / 2),
                            y: centerY - 50 * Math.sin((effectiveAngleA + effectiveAngleB) / 2) + 5
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          fill="#9333EA"
                          fontSize="14"
                          className="fill-purple-600 dark:fill-purple-400"
                        >
                          θ
                        </motion.text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Vector B from tip of A */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('vectorBFromA') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                      >
                        <motion.line
                          animate={{
                            x1: points.vectorAEnd.x,
                            y1: points.vectorAEnd.y,
                            x2: points.vectorBFromA.x,
                            y2: points.vectorBFromA.y
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          stroke="#10B981"
                          strokeWidth="4"
                          markerEnd="url(#arrowhead-B)"
                          className="stroke-green-500 dark:stroke-green-400"
                        />
                        <motion.text
                          animate={{
                            x: (points.vectorAEnd.x + points.vectorBFromA.x) / 2 + 15,
                            y: (points.vectorAEnd.y + points.vectorBFromA.y) / 2
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          fill="#10B981"
                          fontSize="16"
                          className="fill-green-500 dark:fill-green-400"
                          fontWeight="bold"
                        >
                          B
                        </motion.text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Resultant vector */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('resultant') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                      >
                        <defs>
                          <marker id="arrowhead-R" markerWidth="10" markerHeight="7" 
                                  refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#8B5CF6" />
                          </marker>
                        </defs>
                        <motion.line
                          x1={centerX}
                          y1={centerY}
                          animate={{
                            x2: points.vectorBFromA.x,
                            y2: points.vectorBFromA.y
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          stroke="#8B5CF6"
                          strokeWidth="4"
                          markerEnd="url(#arrowhead-R)"
                          className="stroke-purple-500 dark:stroke-purple-400"
                        />
                        <motion.text
                          animate={{
                            x: (centerX + points.vectorBFromA.x) / 2 - 20,
                            y: (centerY + points.vectorBFromA.y) / 2 - 15
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          fill="#8B5CF6"
                          fontSize="16"
                          className="fill-purple-500 dark:fill-purple-400"
                          fontWeight="bold"
                        >
                          A + B
                        </motion.text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Coordinate System */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('coordinates') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                      >
                        <defs>
                          <marker id="arrowhead-coord" markerWidth="8" markerHeight="6" 
                                  refX="8" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#6B7280" />
                          </marker>
                        </defs>
                        {/* x-axis (initially along A, then horizontal after rotation) */}
                        <motion.line
                          x1={centerX}
                          y1={centerY}
                          animate={{
                            x2: centerX + 100 * Math.cos(effectiveAngleA),
                            y2: centerY - 100 * Math.sin(effectiveAngleA)
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          markerEnd="url(#arrowhead-coord)"
                          className="stroke-gray-500 dark:stroke-gray-400"
                        />
                        {/* y-axis (perpendicular to x-axis) */}
                        <motion.line
                          x1={centerX}
                          y1={centerY}
                          animate={{
                            x2: centerX - 80 * Math.sin(effectiveAngleA),
                            y2: centerY - 80 * Math.cos(effectiveAngleA)
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          markerEnd="url(#arrowhead-coord)"
                          className="stroke-gray-500 dark:stroke-gray-400"
                        />
                        <motion.text
                          animate={{
                            x: centerX + 105 * Math.cos(effectiveAngleA),
                            y: centerY - 105 * Math.sin(effectiveAngleA) + 5
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          fill="#6B7280"
                          fontSize="12"
                          className="fill-gray-500 dark:fill-gray-400"
                        >
                          x
                        </motion.text>
                        <motion.text
                          animate={{
                            x: centerX - 85 * Math.sin(effectiveAngleA) - 10,
                            y: centerY - 85 * Math.cos(effectiveAngleA)
                          }}
                          transition={{ duration: 1.2, delay: currentStep >= 2 ? 0.5 : 0 }}
                          fill="#6B7280"
                          fontSize="12"
                          className="fill-gray-500 dark:fill-gray-400"
                        >
                          y
                        </motion.text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* B component along A */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('bComponentAlong') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                      >
                        <line
                          x1={points.vectorAEnd.x}
                          y1={points.vectorAEnd.y}
                          x2={points.vectorAEnd.x + vectorB.magnitude * scale * Math.cos(angleBetween)}
                          y2={points.vectorAEnd.y}
                          stroke="#F59E0B"
                          strokeWidth="3"
                          strokeDasharray="5,5"
                          className="stroke-yellow-500 dark:stroke-yellow-400"
                        />
                        <text
                          x={points.vectorAEnd.x + (vectorB.magnitude * scale * Math.cos(angleBetween)) / 2}
                          y={points.vectorAEnd.y + 20}
                          fill="#F59E0B"
                          fontSize="12"
                          className="fill-yellow-500 dark:fill-yellow-400"
                          textAnchor="middle"
                        >
                          B cos θ
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* B component perpendicular to A */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('bComponentPerp') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                      >
                        <line
                          x1={points.vectorAEnd.x + vectorB.magnitude * scale * Math.cos(angleBetween)}
                          y1={points.vectorAEnd.y}
                          x2={points.vectorBFromA.x}
                          y2={points.vectorBFromA.y}
                          stroke="#F97316"
                          strokeWidth="3"
                          strokeDasharray="5,5"
                          className="stroke-orange-500 dark:stroke-orange-400"
                        />
                        <text
                          x={points.vectorAEnd.x + vectorB.magnitude * scale * Math.cos(angleBetween) + 15}
                          y={(points.vectorAEnd.y + points.vectorBFromA.y) / 2}
                          fill="#F97316"
                          fontSize="12"
                          className="fill-orange-500 dark:fill-orange-400"
                        >
                          B sin θ
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Right triangle for Pythagorean theorem */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('rightTriangle') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                      >
                        {/* Right angle marker */}
                        <path
                          d={`M ${points.vectorAEnd.x + vectorB.magnitude * scale * Math.cos(angleBetween) - 15} ${points.vectorAEnd.y} 
                              L ${points.vectorAEnd.x + vectorB.magnitude * scale * Math.cos(angleBetween) - 15} ${points.vectorAEnd.y - 15} 
                              L ${points.vectorAEnd.x + vectorB.magnitude * scale * Math.cos(angleBetween)} ${points.vectorAEnd.y - 15}`}
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth="2"
                          className="stroke-gray-400 dark:stroke-gray-500"
                        />
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Calculation display */}
                  <AnimatePresence>
                    {constructionSteps[currentStep]?.elements.includes('calculation') && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                      >
                        <rect
                          x="120"
                          y="320"
                          width="280"
                          height="70"
                          fill={isDarkMode ? "#1E293B" : "#F8FAFC"}
                          stroke={isDarkMode ? "#475569" : "#CBD5E1"}
                          strokeWidth="2"
                          rx="8"
                        />
                        <text
                          x="130"
                          y="340"
                          fill={isDarkMode ? "#E2E8F0" : "#1E293B"}
                          fontSize="12"
                          fontWeight="bold"
                        >
                          Pythagorean Theorem:
                        </text>
                        <text
                          x="130"
                          y="355"
                          fill={isDarkMode ? "#94A3B8" : "#475569"}
                          fontSize="11"
                        >
                          |A + B|² = (A + B cos θ)² + (B sin θ)²
                        </text>
                        <text
                          x="130"
                          y="370"
                          fill={isDarkMode ? "#94A3B8" : "#475569"}
                          fontSize="11"
                        >
                          |A + B|² = A² + 2AB cos θ + B²
                        </text>
                        <text
                          x="130"
                          y="385"
                          fill={isDarkMode ? "#94A3B8" : "#475569"}
                          fontSize="11"
                          fontWeight="bold"
                        >
                          ∴ |A + B| = √(A² + B² + 2AB cos θ)
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Origin point */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r="4"
                    fill="#3B82F6"
                    className="fill-blue-600 dark:fill-blue-500"
                  />
                </svg>
              </div>
            </div>
          </TrackedInteraction>

          {/* Mathematical Derivation */}
          <div className={`rounded-lg p-6 shadow-lg ${
            isDarkMode 
              ? 'bg-slate-800' 
              : 'bg-white'
          }`}>
            <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">Derivation</h3>
            
            <div className="space-y-4 text-lg">
              <p className="leading-relaxed">
                From the geometric construction, we can apply the Pythagorean theorem to find the magnitude of the resultant vector.
              </p>
              
              <div className="space-y-3">
                <p>The resultant vector has components:</p>
                <div className="ml-4">
                  <BlockMath math="x\text{-component} = A + B \cos \theta" />
                  <BlockMath math="y\text{-component} = B \sin \theta" />
                </div>
              </div>
              
              <div className="space-y-3">
                <p>Using the Pythagorean theorem:</p>
                <BlockMath math="|A + B|^2 = (A + B \cos \theta)^2 + (B \sin \theta)^2" />
              </div>
              
              <div className="space-y-3">
                <p>Expanding the equation:</p>
                <BlockMath math="|A + B|^2 = A^2 + 2AB \cos \theta + B^2 \cos^2 \theta + B^2 \sin^2 \theta" />
              </div>
              
              <div className="space-y-3">
                <p>Since <InlineMath math="\cos^2 \theta + \sin^2 \theta = 1" />:</p>
                <BlockMath math="|A + B|^2 = A^2 + 2AB \cos \theta + B^2" />
              </div>
              
              <div className="space-y-3">
                <p>Therefore, the magnitude of the vector sum is:</p>
                <BlockMath math="|A + B| = \sqrt{A^2 + B^2 + 2AB \cos \theta}" />
              </div>
              
              <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                isDarkMode 
                  ? 'bg-slate-700' 
                  : 'bg-blue-50'
              }`}>
                <p className="font-medium text-blue-600 dark:text-blue-400 mb-2">Cosine Rule</p>
                <p className="text-gray-700 dark:text-gray-300">
                  This is the famous cosine rule for vector addition, which generalizes the Pythagorean theorem for non-perpendicular vectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="vector-sum-magnitude"
      slideTitle="Magnitude of Vector Sum"
      moduleId="vectors"
      submoduleId="working-with-angles"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 