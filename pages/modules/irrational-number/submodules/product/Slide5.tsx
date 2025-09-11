import { useEffect, useRef, useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

interface Point {
  x: number;
  y: number;
}

interface TriangleSides {
  a: number;
  b: number;
  c: number;
}

export default function IrrationalPythagoreanSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 350 });
  const centerX = canvasSize.width / 2;
  const centerY = canvasSize.height / 2;

  const [hypotenuseEnd, setHypotenuseEnd] = useState<Point>({
    x: centerX + 80,
    y: centerY - 60
  });

  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState<boolean>(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-pythagorean-content',
      conceptId: 'irrational-pythagorean-concept',
      conceptName: 'Irrational Numbers and the Pythagorean Theorem',
      type: 'learning',
      description: 'Understanding how irrational numbers arise from geometric shapes like right triangles'
    },
    {
      id: 'pythagorean-interactive',
      conceptId: 'pythagorean-interactive-demo',
      conceptName: 'Pythagorean Theorem Interactive',
      type: 'learning',
      description: 'Interactive exploration of the Pythagorean theorem and irrational results'
    },
    {
      id: 'geometric-origins-quiz',
      conceptId: 'geometric-origins-identification',
      conceptName: 'Geometric Origins of Irrationals Quiz',
      type: 'judging',
      description: 'Identifying irrational results from geometric problems',
      question: {
        type: 'mcq',
        question: 'Which of the following describes the hypotenuse of a right triangle with legs of length 1 and 1?',
        options: ['Rational, length = 1', 'Rational, length = 2', 'Irrational, length = √2', 'Irrational, length = √3']
      }
    },
    {
      id: 'pythagorean-property-quiz',
      conceptId: 'pythagorean-property-understanding',
      conceptName: 'Pythagorean Property Quiz',
      type: 'judging',
      description: 'Testing understanding of the results of the Pythagorean theorem',
      question: {
        type: 'mcq',
        question: 'If a and b are integers, is the hypotenuse c always an irrational number?',
        options: ['Yes', 'No']
      }
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  useEffect(() => {
    const newCenterX = 200;
    const newCenterY = 175;
    setHypotenuseEnd({
      x: newCenterX + 80,
      y: newCenterY - 60
    });
  }, []);

  const a = (hypotenuseEnd.x - centerX);
  const b = (centerY - hypotenuseEnd.y);
  const c = Math.sqrt(a * a + b * b);
  const scale = 20;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    const svgRect = canvasRef.current.querySelector('svg')?.getBoundingClientRect();
    if (svgRect) {
      const x = ((e.clientX - svgRect.left) / svgRect.width) * 400;
      const y = ((e.clientY - svgRect.top) / svgRect.height) * 350;
      const clampedX = Math.max(10, Math.min(390, x));
      const clampedY = Math.max(10, Math.min(340, y));
      setHypotenuseEnd({ x: clampedX, y: clampedY });
      handleInteractionComplete({
        interactionId: 'pythagorean-interactive',
        value: `hypotenuse-${(c / scale).toFixed(2)}`,
        timestamp: Date.now()
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const svgRect = canvasRef.current.querySelector('svg')?.getBoundingClientRect();
    if (svgRect) {
      const x = ((e.clientX - svgRect.left) / svgRect.width) * 400;
      const y = ((e.clientY - svgRect.top) / svgRect.height) * 350;
      const clampedX = Math.max(10, Math.min(390, x));
      const clampedY = Math.max(10, Math.min(340, y));
      setHypotenuseEnd({ x: clampedX, y: clampedY });
      handleInteractionComplete({
        interactionId: 'pythagorean-interactive',
        value: `hypotenuse-${(c / scale).toFixed(2)}`,
        timestamp: Date.now()
      });
    }
  };

  const questions = [
    {
      id: 'geometric-origins-quiz',
      question: 'Which of the following is the length of the hypotenuse of a right triangle with legs of length 1 and 1?',
      options: [
        { id: 'hypot-1-1-rational-1', text: 'Rational, length = 1', isCorrect: false },
        { id: 'hypot-1-1-rational-2', text: 'Rational, length = 2', isCorrect: false },
        { id: 'hypot-1-1-irrational-sqrt2', text: 'Irrational, length = √2', isCorrect: true },
        { id: 'hypot-1-1-irrational-sqrt3', text: 'Irrational, length = √3', isCorrect: false }
      ],
      explanation: 'Using the Pythagorean theorem, c² = 1² + 1² = 2, so the hypotenuse is c = √2, which is an irrational number.'
    },
    {
      id: 'pythagorean-property-quiz',
      question: 'If a and b are integers, is the hypotenuse c always an irrational number?',
      options: [
        { id: 'always-irrational-yes', text: 'Yes', isCorrect: false },
        { id: 'always-irrational-no', text: 'No', isCorrect: true }
      ],
      explanation: 'No. For example, a right triangle with legs of length 3 and 4 has a hypotenuse of length 5 (since 3² + 4² = 9 + 16 = 25, and √25 = 5), which is a rational number.'
    },
    {
      id: 'hypotenuse-2-2',
      question: 'A right triangle has legs with lengths a = 2 and b = 2. What is the length of the hypotenuse?',
      options: [
        { id: 'h-2-2-a', text: '2', isCorrect: false },
        { id: 'h-2-2-b', text: '4', isCorrect: false },
        { id: 'h-2-2-c', text: '√8', isCorrect: true },
        { id: 'h-2-2-d', text: '√2', isCorrect: false }
      ],
      explanation: 'According to the Pythagorean theorem, c² = 2² + 2² = 4 + 4 = 8. Therefore, the hypotenuse c = √8.'
    },
    {
      id: 'missing-leg-sqrt13',
      question: 'The hypotenuse of a right triangle is √13. If one leg has a length of 2, what is the length of the other leg?',
      options: [
        { id: 'ml-sqrt13-a', text: '3', isCorrect: true },
        { id: 'ml-sqrt13-b', text: '4', isCorrect: false },
        { id: 'ml-sqrt13-c', text: '√9', isCorrect: false },
        { id: 'ml-sqrt13-d', text: '√11', isCorrect: false }
      ],
      explanation: 'Using the theorem: 2² + b² = (√13)². This simplifies to 4 + b² = 13, so b² = 9, and b = 3.'
    },
    {
      id: 'diagonal-square-area-7',
      question: 'A square has an area of 7 square units. What is the length of its diagonal?',
      options: [
        { id: 'ds-7-a', text: '√7', isCorrect: false },
        { id: 'ds-7-b', text: '√14', isCorrect: true },
        { id: 'ds-7-c', text: '7', isCorrect: false },
        { id: 'ds-7-d', text: '14', isCorrect: false }
      ],
      explanation: 'The side length of the square is √7. The diagonal is the hypotenuse of a right triangle with legs of length √7. Therefore, d² = (√7)² + (√7)² = 7 + 7 = 14, so d = √14.'
    },
    {
      id: 'converse-pythagorean-theorem',
      question: 'True or False: The sum of the squares of the two shorter sides of a triangle is always equal to the square of the longest side.',
      options: [
        { id: 'converse-true', text: 'True', isCorrect: false },
        { id: 'converse-false', text: 'False', isCorrect: true }
      ],
      explanation: 'False. This is only true for right triangles, a fact known as the converse of the Pythagorean theorem. It is not true for all triangles.'
    },
    {
      id: 'is-right-triangle-5-12-13',
      question: 'A triangle has side lengths of 5, 12, and 13. Is this a right triangle?',
      options: [
        { id: 'is-right-yes', text: 'Yes', isCorrect: true },
        { id: 'is-right-no', text: 'No', isCorrect: false }
      ],
      explanation: 'Yes. Checking the Pythagorean theorem: 5² + 12² = 25 + 144 = 169. Since 13² = 169, the theorem holds true.'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleQuizAnswer = (answerText: string) => {
    setSelectedQuizAnswer(answerText);
    setShowQuizFeedback(true);
    const correctOption = currentQuestion.options.find(o => o.isCorrect);
    const isCorrect = answerText === correctOption?.text;
    if (!questionsAnswered[currentQuestionIndex]) {
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      setQuestionsAnswered(prev => {
        const newAnswered = [...prev];
        newAnswered[currentQuestionIndex] = true;
        return newAnswered;
      });
    }
    handleInteractionComplete({
      interactionId: `irrational-pythagorean-quiz-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: currentQuestion.id,
      conceptName: currentQuestion.id,
      conceptDescription: `Testing understanding of geometric origins of irrationals - Question ${currentQuestionIndex + 1}: ${currentQuestion.question.substring(0, 50)}...`,
      question: {
        type: 'mcq',
        question: currentQuestion.question,
        options: currentQuestion.options.map(opt => opt.text)
      }
    });
  };

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
      slideId="irrational-pythagorean-slide"
      slideTitle="Irrational Numbers & Geometry"
      moduleId="irrational-numbers"
      submoduleId="sum"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-slate-50 dark:bg-slate-900/20 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="space-y-6">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Irrational numbers don't just appear in abstract calculations; they are deeply rooted in geometry. The ancient Greeks first discovered these numbers when trying to measure the hypotenuse of a right-angled triangle.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  The **Pythagorean theorem** is the formula that links these geometric shapes to numbers. It states that for any right-angled triangle, the square of the hypotenuse (the longest side) is equal to the sum of the squares of the other two sides.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Using the theorem, we can prove that some lengths, like the diagonal of a unit square, are inherently irrational.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                  <h4 className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-3">
                    The Pythagorean Theorem
                  </h4>
                  <div className="text-center">
                    <BlockMath math="a^2 + b^2 = c^2" />
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                  <h4 className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-3">
                    Current Triangle
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300">
                        <InlineMath math="a" /> (x-side):
                      </span>
                      <span className="text-blue-700 dark:text-blue-300 font-mono">
                        {(a / scale).toFixed(1)} units
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300">
                        <InlineMath math="b" /> (y-side):
                      </span>
                      <span className="text-blue-700 dark:text-blue-300 font-mono">
                        {(b / scale).toFixed(1)} units
                      </span>
                    </div>
                    <hr className="border-blue-300 dark:border-blue-600" />
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300 font-medium">
                        <InlineMath math="c" /> (hypotenuse):
                      </span>
                      <span className="text-blue-700 dark:text-blue-300 font-mono font-bold">
                        {(c / scale).toFixed(2)} units
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Interactive Geometry
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Drag the white dot to change the triangle's shape and see the hypotenuse length update in real-time.
              </p>
              <div
                ref={canvasRef}
                className="relative w-full h-132 bg-blue-100 dark:bg-gray-900 rounded-lg cursor-crosshair border-2 border-blue-200 dark:border-blue-700"
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onClick={handleCanvasClick}
              >
                <svg width="100%" height="500" viewBox="0 0 400 350" className="mx-auto">
                  <defs>
                    <marker id="hypotenuseArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                      <polygon points="0 0, 6 2, 0 4" fill="#8B5CF6" />
                    </marker>
                  </defs>
                  
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
                  
                  <text
                    x={centerX - 15}
                    y={centerY + 15}
                    className="fill-blue-600 text-xs"
                    textAnchor="middle"
                  >
                    0
                  </text>

                  {/* Pythogorean Theorem Formula */}
                  <text
                    x={centerX + 15}
                    y={centerY - 10}
                    className="fill-blue-600 text-lg font-bold"
                    textAnchor="start"
                  >
                    <tspan>a²+b²=c²</tspan>
                  </text>
                  
                  {/* side a */}
                  <line 
                    x1={centerX} 
                    y1={centerY} 
                    x2={hypotenuseEnd.x} 
                    y2={centerY} 
                    stroke="#EF4444" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text 
                    x={(centerX + hypotenuseEnd.x) / 2} 
                    y={centerY - 10} 
                    className="fill-red-600 text-sm font-bold" 
                    textAnchor="middle"
                  >
                    a
                  </text>
                  
                  {/* side b */}
                  <line 
                    x1={hypotenuseEnd.x} 
                    y1={centerY} 
                    x2={hypotenuseEnd.x} 
                    y2={hypotenuseEnd.y} 
                    stroke="#10B981" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text 
                    x={hypotenuseEnd.x + 15} 
                    y={(centerY + hypotenuseEnd.y) / 2} 
                    className="fill-green-600 text-sm font-bold" 
                    textAnchor="start"
                  >
                    b
                  </text>
                  
                  {/* hypotenuse c */}
                  <line 
                    x1={centerX} 
                    y1={centerY} 
                    x2={hypotenuseEnd.x} 
                    y2={hypotenuseEnd.y} 
                    stroke="#8B5CF6" 
                    strokeWidth="4"
                    markerEnd="url(#hypotenuseArrow)"
                  />
                  <text 
                    x={(centerX + hypotenuseEnd.x) / 2 - 20} 
                    y={(centerY + hypotenuseEnd.y) / 2 - 10} 
                    className="fill-purple-600 text-lg font-bold" 
                    textAnchor="middle"
                  >
                    c
                  </text>
                  
                  <circle
                    cx={hypotenuseEnd.x}
                    cy={hypotenuseEnd.y}
                    r="8"
                    fill="#FFFFFF"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    cursor="pointer"
                    onMouseDown={() => setIsDragging(true)}
                  />
                  
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r="4"
                    fill="#3B82F6"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              {isQuizComplete ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Quiz Complete!</h3>
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-4">
                      {score === questions.length ? '🏆' : '📚'}
                    </div>
                    <div className="text-2xl font-bold mb-2">
                      Score: {score}/{questions.length}
                    </div>
                  </div>
                  <p className="text-center text-lg">
                    {score === questions.length ? "Perfect! You understand how irrational numbers are born from geometry!" : "Review the Pythagorean theorem and how it relates to irrational numbers."}
                  </p>
                </div>
              ) : (
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
                            <span>{option.text}</span>
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