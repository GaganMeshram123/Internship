import { useEffect, useRef, useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

interface Point {
  x: number;
  y: number;
}

interface Vector {
  start: Point;
  end: Point;
}

export default function VectorMagnitudeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 350 });
  const centerX = canvasSize.width / 2;
  const centerY = canvasSize.height / 2;

  const [vector, setVector] = useState<Vector>({
    start: { x: centerX, y: centerY },
    end: { x: centerX + 80, y: centerY - 60 }
  });

  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState<boolean>(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'vector-magnitude-content',
      conceptId: 'vector-magnitude-concept',
      conceptName: 'Vector Magnitude Understanding',
      type: 'learning',
      description: 'Understanding how to calculate vector magnitude using Pythagoras theorem'
    },
    {
      id: 'vector-magnitude-interaction',
      conceptId: 'vector-magnitude-interactive',
      conceptName: 'Vector Magnitude Interactive',
      type: 'learning',
      description: 'Interactive exploration of vector magnitude calculation'
    },
    {
      id: 'unit-vector-quiz',
      conceptId: 'unit-vector-identification',
      conceptName: 'Unit Vector Identification',
      type: 'judging',
      description: 'Identifying unit vectors by calculating magnitude',
      question: {
        type: 'mcq',
        question: 'Which of the following is a unit vector (has magnitude = 1)?',
        options: ['3î + 4ĵ', '0.6î + 0.8ĵ', '1î + 1ĵ', '2î + 0ĵ']
      }
    },
    {
      id: 'vector-operations-quiz',
      conceptId: 'vector-operations-calculation',
      conceptName: 'Vector Operations Calculation',
      type: 'judging',
      description: 'Calculating vector operations with given components',
      question: {
        type: 'mcq',
        question: 'Given A = 2î + 3ĵ and B = 1î + 4ĵ, what is 2A + B?',
        options: ['5î + 10ĵ', '3î + 7ĵ', '4î + 6ĵ', '5î + 7ĵ']
      }
    }
  ];

  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Fixed canvas size - no need for resize listener since SVG has fixed viewBox
  useEffect(() => {
    // Initialize vector position for fixed canvas size
    const newCenterX = 200; // 400/2
    const newCenterY = 175; // 350/2
    setVector({
      start: { x: newCenterX, y: newCenterY },
      end: { x: newCenterX + 80, y: newCenterY - 60 }
    });
  }, []);

  // Calculate vector components and magnitude
  const dx = vector.end.x - vector.start.x;
  const dy = vector.start.y - vector.end.y; // Flip y for mathematical coordinates
  const magnitude = Math.sqrt(dx * dx + dy * dy);
  const scale = 20; // Scale factor for display units

  // Quiz questions
  const questions = [
    {
      id: 'unit-vector-identification',
      question: 'Which of the following is a unit vector (has magnitude = 1)?',
      options: [
        { id: '3i4j', text: '3î + 4ĵ', isCorrect: false },
        { id: '0.6i0.8j', text: '0.6î + 0.8ĵ', isCorrect: true },
        { id: '1i1j', text: '1î + 1ĵ', isCorrect: false },
        { id: '2i0j', text: '2î + 0ĵ', isCorrect: false }
      ],
      explanation: '0.6î + 0.8ĵ has magnitude √(0.6² + 0.8²) = √(0.36 + 0.64) = 1'
    },
    {
      id: 'vector-operations-calculation',
      question: 'Given A = 2î + 3ĵ and B = 1î + 4ĵ, what is 2A + B?',
      options: [
        { id: '5i10j', text: '5î + 10ĵ', isCorrect: true },
        { id: '3i7j', text: '3î + 7ĵ', isCorrect: false },
        { id: '4i6j', text: '4î + 6ĵ', isCorrect: false },
        { id: '5i7j', text: '5î + 7ĵ', isCorrect: false }
      ],
      explanation: '2A + B = 2(2î + 3ĵ) + (1î + 4ĵ) = 4î + 6ĵ + 1î + 4ĵ = 5î + 10ĵ'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const svgRect = canvasRef.current.querySelector('svg')?.getBoundingClientRect();
    
    if (svgRect) {
      // Calculate position within the SVG viewBox (400x350)
      const x = ((e.clientX - svgRect.left) / svgRect.width) * 400;
      const y = ((e.clientY - svgRect.top) / svgRect.height) * 350;
      
      // Clamp to viewBox boundaries
      const clampedX = Math.max(10, Math.min(390, x));
      const clampedY = Math.max(10, Math.min(340, y));
      
      setVector(prev => ({
        ...prev,
        end: { x: clampedX, y: clampedY }
      }));

      // Track interaction
      handleInteractionComplete({
        interactionId: 'vector-magnitude-interaction',
        value: `magnitude-${magnitude.toFixed(2)}`,
        timestamp: Date.now()
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const svgRect = canvasRef.current.querySelector('svg')?.getBoundingClientRect();
    
    if (svgRect) {
      // Calculate position within the SVG viewBox (400x350)
      const x = ((e.clientX - svgRect.left) / svgRect.width) * 400;
      const y = ((e.clientY - svgRect.top) / svgRect.height) * 350;
      
      // Clamp to viewBox boundaries
      const clampedX = Math.max(10, Math.min(390, x));
      const clampedY = Math.max(10, Math.min(340, y));
      
      setVector(prev => ({
        ...prev,
        end: { x: clampedX, y: clampedY }
      }));

      // Track interaction
      handleInteractionComplete({
        interactionId: 'vector-magnitude-interaction',
        value: `magnitude-${magnitude.toFixed(2)}`,
        timestamp: Date.now()
      });
    }
  };

  // Handle quiz answer
  const handleQuizAnswer = (answerText: string) => {
    setSelectedQuizAnswer(answerText);
    setShowQuizFeedback(true);
    
    const correctOption = currentQuestion.options.find(o => o.isCorrect);
    const isCorrect = answerText === correctOption?.text;
    
    // Update score if this question hasn't been answered before
    if (!questionsAnswered[currentQuestionIndex]) {
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      // Mark this question as answered
      setQuestionsAnswered(prev => {
        const newAnswered = [...prev];
        newAnswered[currentQuestionIndex] = true;
        return newAnswered;
      });
    }
    
    handleInteractionComplete({
      interactionId: `vector-magnitude-quiz-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: currentQuestion.id,
      conceptName: currentQuestion.id === 'unit-vector-identification' ? 'Unit Vector Identification' : 'Vector Operations Calculation',
      conceptDescription: `Testing understanding of vector concepts - Question ${currentQuestionIndex + 1}: ${currentQuestion.question.substring(0, 50)}...`,
      question: {
        type: 'mcq',
        question: currentQuestion.question,
        options: currentQuestion.options.map(opt => opt.text)
      }
    });
  };

  // Handle next question
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      setIsQuizComplete(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
      setSelectedQuizAnswer(null);
      setShowQuizFeedback(false);
    }
  };

  return (
    <SlideComponentWrapper
      slideId="vector-magnitude"
      slideTitle="Vector Magnitude"
      moduleId="vectors"
      submoduleId="vector-operations"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-slate-50 dark:bg-slate-900/20 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Explanation */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="space-y-6">
                {/* Main concept */}

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Vectors have a magnitude and a direction. Sometimes, just the magnitude is of importance.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    For example, the magnitude of the velocity vector is called "speed". It tells us how fast an 
                    object is travelling but not the direction.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Using Pythagoras' theorem, we can obtain the magnitude of a vector from its components.
                  </p>

                {/* Formula */}
                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                  <h4 className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-3">
                    Magnitude Formula
                  </h4>
                  <div className="text-center">
                    <BlockMath math="|V| = \sqrt{V_x^2 + V_y^2}" />
                  </div>
                </div>

                {/* Real-time calculation */}
                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                  <h4 className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-3">
                    Current Vector
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300">
                        <InlineMath math="V_x" />:
                      </span>
                      <span className="text-blue-700 dark:text-blue-300 font-mono">
                        {(dx / scale).toFixed(1)} units
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300">
                        <InlineMath math="V_y" />:
                      </span>
                      <span className="text-blue-700 dark:text-blue-300 font-mono">
                        {(dy / scale).toFixed(1)} units
                      </span>
                    </div>
                    <hr className="border-blue-300 dark:border-blue-600" />
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300 font-medium">
                        <InlineMath math="|V|" />:
                      </span>
                      <span className="text-blue-700 dark:text-blue-300 font-mono font-bold">
                        {(magnitude / scale).toFixed(1)} units
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Interactive visualization */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Interactive Vector
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Drag the white dot to change the vector and see how the magnitude changes. You can also click anywhere on the canvas to move the vector there.
              </p>

              {/* Interactive canvas */}
              <div 
                ref={canvasRef}
                className="relative w-full h-132 bg-blue-100 dark:bg-gray-900 rounded-lg cursor-crosshair border-2 border-blue-200 dark:border-blue-700"
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onClick={handleCanvasClick}
              >
                <svg width="100%" height="500" viewBox="0 0 400 350" className="mx-auto">
                  {/* Grid lines */}
                  <defs>
                    {/* Arrow markers */}
                    <marker id="vectorArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                      <polygon points="0 0, 6 2, 0 4" fill="#8B5CF6" />
                    </marker>
                  </defs>
                  
                  {/* Grid lines aligned with scale */}
                  {Array.from({ length: Math.ceil(canvasSize.width / scale) + 1 }).map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={centerX + (i - Math.floor(canvasSize.width / (2 * scale))) * scale}
                      y1={0}
                      x2={centerX + (i - Math.floor(canvasSize.width / (2 * scale))) * scale}
                      y2={canvasSize.height}
                      stroke="#3B82F6"
                      strokeWidth={i === Math.floor(canvasSize.width / (2 * scale)) ? "2" : "0.5"}
                      opacity={i === Math.floor(canvasSize.width / (2 * scale)) ? "0.8" : "0.3"}
                    />
                  ))}
                  
                  {Array.from({ length: Math.ceil(canvasSize.height / scale) + 1 }).map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1={0}
                      y1={centerY + (i - Math.floor(canvasSize.height / (2 * scale))) * scale}
                      x2={canvasSize.width}
                      y2={centerY + (i - Math.floor(canvasSize.height / (2 * scale))) * scale}
                      stroke="#3B82F6"
                      strokeWidth={i === Math.floor(canvasSize.height / (2 * scale)) ? "2" : "0.5"}
                      opacity={i === Math.floor(canvasSize.height / (2 * scale)) ? "0.8" : "0.3"}
                    />
                  ))}
                  
                  {/* Grid unit labels */}
                  {Array.from({ length: Math.ceil(canvasSize.width / scale) + 1 }).map((_, i) => {
                    const gridX = centerX + (i - Math.floor(canvasSize.width / (2 * scale))) * scale;
                    const unitValue = i - Math.floor(canvasSize.width / (2 * scale));
                    if (unitValue !== 0 && gridX > 10 && gridX < canvasSize.width - 10) {
                      return (
                        <text
                          key={`x-label-${i}`}
                          x={gridX}
                          y={centerY + 15}
                          className="fill-blue-600 text-xs"
                          textAnchor="middle"
                        >
                          {unitValue}
                        </text>
                      );
                    }
                    return null;
                  })}
                  
                  {Array.from({ length: Math.ceil(canvasSize.height / scale) + 1 }).map((_, i) => {
                    const gridY = centerY + (i - Math.floor(canvasSize.height / (2 * scale))) * scale;
                    const unitValue = -(i - Math.floor(canvasSize.height / (2 * scale))); // Negative for mathematical y-axis
                    if (unitValue !== 0 && gridY > 15 && gridY < canvasSize.height - 5) {
                      return (
                        <text
                          key={`y-label-${i}`}
                          x={centerX - 15}
                          y={gridY + 3}
                          className="fill-blue-600 text-xs"
                          textAnchor="middle"
                        >
                          {unitValue}
                        </text>
                      );
                    }
                    return null;
                  })}
                  
                  {/* Origin label */}
                  <text
                    x={centerX - 15}
                    y={centerY + 15}
                    className="fill-blue-600 text-xs"
                    textAnchor="middle"
                  >
                    0
                  </text>
                  
                  {/* Vector components (dashed lines) */}
                  <line 
                    x1={vector.start.x} 
                    y1={vector.start.y} 
                    x2={vector.end.x} 
                    y2={vector.start.y} 
                    stroke="#EF4444" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text 
                    x={(vector.start.x + vector.end.x) / 2} 
                    y={vector.start.y - 10} 
                    className="fill-red-600 text-sm font-bold" 
                    textAnchor="middle"
                  >
                    V<tspan baselineShift="sub">x</tspan>
                  </text>
                  
                  <line 
                    x1={vector.end.x} 
                    y1={vector.start.y} 
                    x2={vector.end.x} 
                    y2={vector.end.y} 
                    stroke="#10B981" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text 
                    x={vector.end.x + 15} 
                    y={(vector.start.y + vector.end.y) / 2} 
                    className="fill-green-600 text-sm font-bold" 
                    textAnchor="start"
                  >
                    V<tspan baselineShift="sub">y</tspan>
                  </text>
                  
                  {/* Main vector */}
                  <line 
                    x1={vector.start.x} 
                    y1={vector.start.y} 
                    x2={vector.end.x} 
                    y2={vector.end.y} 
                    stroke="#8B5CF6" 
                    strokeWidth="4"
                    markerEnd="url(#vectorArrow)"
                  />
                  <text 
                    x={(vector.start.x + vector.end.x) / 2 - 20} 
                    y={(vector.start.y + vector.end.y) / 2 - 10} 
                    className="fill-purple-600 text-lg font-bold" 
                    textAnchor="middle"
                  >
                    V
                  </text>
                  
                  {/* Draggable endpoint */}
                  <circle
                    cx={vector.end.x}
                    cy={vector.end.y}
                    r="8"
                    fill="#FFFFFF"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    cursor="pointer"
                    onMouseDown={() => setIsDragging(true)}
                  />
                  
                  {/* Origin point */}
                  <circle
                    cx={vector.start.x}
                    cy={vector.start.y}
                    r="4"
                    fill="#3B82F6"
                  />
                </svg>
              </div>

              {/* Step-by-step calculation */}
              <div className="mt-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                <div className="space-y-2 text-slate-700 dark:text-slate-300 text-center">
                  <div>
                    <InlineMath math={`|V| = \\sqrt{V_x^2 + V_y^2}`} />
                  </div>
                  <div>
                    <InlineMath math={`|V| = \\sqrt{(${(dx/scale).toFixed(1)})^2 + (${(dy/scale).toFixed(1)})^2}`} />
                  </div>
                  <div>
                    <InlineMath math={`|V| = \\sqrt{${((dx/scale)**2).toFixed(1)} + ${((dy/scale)**2).toFixed(1)}}`} />
                  </div>
                  <div className="font-bold">
                    <InlineMath math={`|V| = ${(magnitude/scale).toFixed(1)} \\text{ units}`} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            {isQuizComplete ? (
              // Quiz Complete Screen
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Quiz Complete!</h3>
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">
                    {score === questions.length ? '🏆' : score >= questions.length * 0.75 ? '🎉' : score >= questions.length * 0.5 ? '👍' : '📚'}
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    Score: {score}/{questions.length}
                  </div>
                  <div className="text-lg">
                    <span className={`${score >= questions.length * 0.75 ? 'text-green-600 dark:text-green-400' : score >= questions.length * 0.5 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                      {Math.round((score / questions.length) * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-center text-lg">
                  {score === questions.length 
                    ? "Perfect! You understand vector magnitude and operations!" 
                    : score >= questions.length * 0.75 
                    ? "Excellent! You have a solid grasp of vector concepts." 
                    : score >= questions.length * 0.5
                    ? "Good work! Review vector calculations and unit vectors."
                    : "Keep studying! Focus on magnitude calculations and vector operations."}
                </p>
              </div>
            ) : (
              // Active Quiz
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Quick Check</h3>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                
                <p className="text-lg mb-4">
                  {currentQuestion.question}
                </p>
                
                <div className="space-y-2">
                  {currentQuestion.options.map((option) => {
                    const wasSelected = selectedQuizAnswer === option.text;
                    const isOptionCorrect = option.isCorrect;
                    
                    let buttonClass = "w-full p-3 rounded-lg border-2 text-left transition-all ";
                    
                    if (showQuizFeedback) {
                      if (wasSelected) {
                        if (isOptionCorrect) {
                          buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200";
                        } else {
                          buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200";
                        }
                      } else if (isOptionCorrect) {
                        buttonClass += "border-green-400 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                      } else {
                        buttonClass += "border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400";
                      }
                    } else {
                      buttonClass += "border-slate-300 dark:border-slate-600 hover:border-blue-300 cursor-pointer";
                    }
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleQuizAnswer(option.text)}
                        disabled={showQuizFeedback}
                        className={buttonClass}
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            <InlineMath math={option.text} />
                          </span>
                          {showQuizFeedback && (
                            <span className="ml-2">
                              {wasSelected && isOptionCorrect && "✅"}
                              {wasSelected && !isOptionCorrect && "❌"}
                              {!wasSelected && isOptionCorrect && "✓"}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showQuizFeedback && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    currentQuestion.options.find(o => o.text === selectedQuizAnswer)?.isCorrect
                      ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                      : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                  }`}>
                    <div className={`font-semibold mb-2 ${
                      currentQuestion.options.find(o => o.text === selectedQuizAnswer)?.isCorrect
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {currentQuestion.options.find(o => o.text === selectedQuizAnswer)?.isCorrect ? 'Correct!' : 'Not quite right.'}
                    </div>
                    <div className={`text-sm mb-3 ${
                      currentQuestion.options.find(o => o.text === selectedQuizAnswer)?.isCorrect
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {currentQuestion.explanation}
                    </div>
                    
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {currentQuestionIndex + 1 >= questions.length ? 'Finish Quiz' : 'Next Question'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          </div>          
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 