import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

interface Point {
  t: number;
  s: number;
}

// Interactive Average Velocity Graph Component
function AverageVelocityGraph() {
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);

  // Position function: s(t) = -16t² + 100
  const sFunction = (t: number) => {
    return -16 * t * t + 100;
  };

  // Graph dimensions
  const graphWidth = 500;
  const graphHeight = 350;
  const padding = 50;
  const plotWidth = graphWidth - 2 * padding;
  const plotHeight = graphHeight - 2 * padding;

  // Scale ranges
  const tMin = 0;
  const tMax = 3;
  const sMin = 0;
  const sMax = 100;

  // Scale functions
  const scaleT = (t: number) => padding + (t / tMax) * plotWidth;
  const scaleS = (s: number) => graphHeight - padding - (s / sMax) * plotHeight;

  // Inverse scale functions
  const invScaleT = (screenX: number) => ((screenX - padding) / plotWidth) * tMax;
  const invScaleS = (screenY: number) => ((graphHeight - padding - screenY) / plotHeight) * sMax;

  // Generate smooth curve points
  const generateCurvePoints = () => {
    const points = [];
    for (let t = tMin; t <= tMax; t += 0.1) {
      const s = sFunction(t);
      if (s >= sMin && s <= sMax) {
        points.push({ t, s });
      }
    }
    return points;
  };

  const curvePoints = generateCurvePoints();
  const pathData = curvePoints.map((point, index) => {
    const tPos = scaleT(point.t);
    const sPos = scaleS(point.s);
    return `${index === 0 ? 'M' : 'L'} ${tPos} ${sPos}`;
  }).join(' ');

  // Handle graph click
  const handleGraphClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const t = invScaleT(x);
    const actualS = sFunction(t);
    
    // Only allow clicks within valid range
    if (t >= tMin && t <= tMax && actualS >= sMin && actualS <= sMax) {
      const newPoint = { t: parseFloat(t.toFixed(1)), s: parseFloat(actualS.toFixed(1)) };
      
      if (selectedPoints.length < 2) {
        setSelectedPoints(prev => [...prev, newPoint]);
      } else {
        // Replace points - start new selection
        setSelectedPoints([newPoint]);
      }
    }
  };

  // Handle mouse move for hover effect
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    
    const t = invScaleT(x);
    const actualS = sFunction(t);
    
    if (t >= tMin && t <= tMax && actualS >= sMin && actualS <= sMax) {
      setHoveredPoint({ t: parseFloat(t.toFixed(1)), s: parseFloat(actualS.toFixed(1)) });
    } else {
      setHoveredPoint(null);
    }
  };

  // Calculate average velocity
  const calculateAverageVelocity = () => {
    if (selectedPoints.length === 2) {
      const [p1, p2] = selectedPoints;
      const deltaS = p2.s - p1.s;
      const deltaT = p2.t - p1.t;
      return deltaT !== 0 ? deltaS / deltaT : 0;
    }
    return null;
  };

  const averageVelocity = calculateAverageVelocity();

  // Axis tick marks
  const tTicks = [0, 0.5, 1, 1.5, 2, 2.5, 3];
  const sTicks = [0, 20, 40, 60, 80, 100];

  // Clear selection
  const clearSelection = () => {
    setSelectedPoints([]);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
          Average Velocity Calculator
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          Click on two points on the curve to calculate average velocity
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
        <div className="text-center text-gray-700 dark:text-gray-300">
          {selectedPoints.length === 0 && "Click on the curve to select your first point"}
          {selectedPoints.length === 1 && "Click on the curve to select your second point"}
          {selectedPoints.length === 2 && "Two points selected! See the calculation below"}
        </div>
      </div>

      {/* Graph */}
      <div className="flex justify-center mb-4">
        <svg 
          width={graphWidth} 
          height={graphHeight} 
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 cursor-crosshair"
          onClick={handleGraphClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Grid lines */}
          {tTicks.map(tick => (
            <line
              key={`t-grid-${tick}`}
              x1={scaleT(tick)}
              y1={padding}
              x2={scaleT(tick)}
              y2={graphHeight - padding}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}
          {sTicks.map(tick => (
            <line
              key={`s-grid-${tick}`}
              x1={padding}
              y1={scaleS(tick)}
              x2={graphWidth - padding}
              y2={scaleS(tick)}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Axes */}
          <line x1={padding} y1={padding} x2={padding} y2={graphHeight - padding} stroke="#374151" strokeWidth="3" />
          <line x1={padding} y1={graphHeight - padding} x2={graphWidth - padding} y2={graphHeight - padding} stroke="#374151" strokeWidth="3" />

          {/* Axis labels */}
          <text x={graphWidth / 2} y={graphHeight - 10} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold">
            Time (s)
          </text>
          <text x={20} y={graphHeight / 2} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold" transform={`rotate(-90, 20, ${graphHeight / 2})`}>
            Height (ft)
          </text>

          {/* Axis tick labels */}
          {tTicks.map(tick => (
            <text
              key={`t-label-${tick}`}
              x={scaleT(tick)}
              y={graphHeight - padding + 20}
              textAnchor="middle"
              fill="#6b7280"
              fontSize="14"
            >
              {tick}
            </text>
          ))}
          {sTicks.map(tick => (
            <text
              key={`s-label-${tick}`}
              x={padding - 10}
              y={scaleS(tick) + 5}
              textAnchor="end"
              fill="#6b7280"
              fontSize="14"
            >
              {tick}
            </text>
          ))}

          {/* Function curve */}
          <path
            d={pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Secant line between selected points */}
          {selectedPoints.length === 2 && (
            <line
              x1={scaleT(selectedPoints[0].t)}
              y1={scaleS(selectedPoints[0].s)}
              x2={scaleT(selectedPoints[1].t)}
              y2={scaleS(selectedPoints[1].s)}
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}

          {/* Selected points */}
          {selectedPoints.map((point, index) => (
            <g key={index}>
              <circle
                cx={scaleT(point.t)}
                cy={scaleS(point.s)}
                r="6"
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                x={scaleT(point.t)}
                y={scaleS(point.s) - 15}
                textAnchor="middle"
                fill="#ef4444"
                fontSize="12"
                fontWeight="bold"
              >
                ({point.t}, {point.s})
              </text>
            </g>
          ))}

          {/* Hover point */}
          {hoveredPoint && selectedPoints.length < 2 && (
            <circle
              cx={scaleT(hoveredPoint.t)}
              cy={scaleS(hoveredPoint.s)}
              r="4"
              fill="#6b7280"
              opacity="0.6"
            />
          )}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={clearSelection}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          Clear Selection
        </button>
        {selectedPoints.length === 2 && (
          <button
            onClick={() => setSelectedPoints([])}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            New Calculation
          </button>
        )}
      </div>

      {/* Selected Points Info */}
      {selectedPoints.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Selected Points:
          </h5>
          {selectedPoints.map((point, index) => (
            <div key={index} className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-bold">Point {index + 1}:</span> At time t = {point.t}s, Height s(t) = {point.s}ft
            </div>
          ))}
          
          {/* Average Velocity Calculation */}
          {selectedPoints.length === 2 && averageVelocity !== null && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h6 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">
                Average Velocity Calculation:
              </h6>
              <div className="space-y-2 text-gray-800 dark:text-gray-200">
                <div>Δs = s(t₂) - s(t₁) = {selectedPoints[1].s} - {selectedPoints[0].s} = {(selectedPoints[1].s - selectedPoints[0].s).toFixed(1)} ft</div>
                <div>Δt = t₂ - t₁ = {selectedPoints[1].t} - {selectedPoints[0].t} = {(selectedPoints[1].t - selectedPoints[0].t).toFixed(1)} s</div>
                <div className="text-lg font-bold text-green-700 dark:text-green-300 mt-3">
                  <BlockMath>
                    {`v_{avg} = \\frac{\\Delta s}{\\Delta t} = \\frac{${(selectedPoints[1].s - selectedPoints[0].s).toFixed(1)}}{${(selectedPoints[1].t - selectedPoints[0].t).toFixed(1)}} = ${averageVelocity.toFixed(2)} \\text{ ft/s}`}
                  </BlockMath>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function RatesOfChangeSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Step-by-step example: Finding average velocity
  const averageVelocitySteps: Step[] = [
    {
      id: 'identify-position-function',
      question: <>A ball is dropped from 100 feet. What is the position function?</>,
      options: [
        { id: 'correct', text: 's(t) = -16t² + 100', isCorrect: true },
        { id: 'wrong1', text: 's(t) = 16t² + 100', isCorrect: false },
        { id: 'wrong2', text: 's(t) = -16t + 100', isCorrect: false },
        { id: 'wrong3', text: 's(t) = -16t² - 100', isCorrect: false }
      ],
      correctAnswer: 's(t) = -16t² + 100',
      explanation: <>The negative coefficient of t² indicates the ball is falling due to gravity, starting from 100 feet.</>,
      questionText: 'Identify the position function',
      nextStep: 'Calculate position at t = 1'
    },
    {
      id: 'calculate-s1',
      question: <>Calculate s(1) by substituting t = 1 into the position function</>,
      options: [
        { id: 'wrong1', text: '116 feet', isCorrect: false },
        { id: 'correct', text: '84 feet', isCorrect: true },
        { id: 'wrong2', text: '100 feet', isCorrect: false },
        { id: 'wrong3', text: '68 feet', isCorrect: false }
      ],
      correctAnswer: '84 feet',
      explanation: <>s(1) = -16(1)² + 100 = -16 + 100 = 84 feet</>,
      questionText: 'Calculate s(1)',
      nextStep: 'Calculate position at t = 1.5'
    },
    {
      id: 'calculate-s1-5',
      question: <>Calculate s(1.5) by substituting t = 1.5 into the position function</>,
      options: [
        { id: 'wrong1', text: '80 feet', isCorrect: false },
        { id: 'wrong2', text: '72 feet', isCorrect: false },
        { id: 'correct', text: '64 feet', isCorrect: true },
        { id: 'wrong3', text: '56 feet', isCorrect: false }
      ],
      correctAnswer: '64 feet',
      explanation: <>s(1.5) = -16(1.5)² + 100 = -16(2.25) + 100 = -36 + 100 = 64 feet</>,
      questionText: 'Calculate s(1.5)',
      nextStep: 'Apply average velocity formula'
    },
    {
      id: 'apply-formula',
      question: <>Apply the average velocity formula for the interval [1, 1.5]</>,
      options: [
        { id: 'wrong1', text: '(84 - 64)/(1.5 - 1)', isCorrect: false },
        { id: 'correct', text: '(64 - 84)/(1.5 - 1)', isCorrect: true },
        { id: 'wrong2', text: '(1.5 - 1)/(64 - 84)', isCorrect: false },
        { id: 'wrong3', text: '(84 + 64)/(1.5 + 1)', isCorrect: false }
      ],
      correctAnswer: '(64 - 84)/(1.5 - 1)',
      explanation: <>Average velocity = Δs/Δt = [s(1.5) - s(1)]/[1.5 - 1] = (64 - 84)/(0.5)</>,
      questionText: 'Apply the average velocity formula',
      nextStep: 'Calculate final result'
    },
    {
      id: 'final-calculation',
      question: <>Complete the calculation: (64 - 84)/(0.5)</>,
      options: [
        { id: 'wrong1', text: '40 ft/sec', isCorrect: false },
        { id: 'correct', text: '-40 ft/sec', isCorrect: true },
        { id: 'wrong2', text: '-20 ft/sec', isCorrect: false },
        { id: 'wrong3', text: '20 ft/sec', isCorrect: false }
      ],
      correctAnswer: '-40 ft/sec',
      explanation: <>(64 - 84)/(0.5) = (-20)/(0.5) = -40 ft/sec. Negative indicates downward motion.</>,
      questionText: 'Calculate the final result'
    }
  ]

  const stepConfig: StepConfig = {
    steps: averageVelocitySteps,
    title: "Calculating Average Velocity",
    conceptId: "average-velocity-calculation",
    conceptName: "Finding Average Velocity",
    conceptDescription: "Step-by-step calculation of average velocity over an interval",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the average velocity of a falling ball over the interval [1, 1.5] seconds:",
    },
    completionMessage: <>Complete! The average velocity is -40 ft/sec, indicating downward motion.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect average velocity calculation!")
      }
    }
  }

  // Quiz questions for quick check
  const questions: QuizQuestion[] = [
    {
      id: 'problem-1',
      question: <>For s(t) = -16t² + 100, what is the average velocity over [0, 1]?</>,
      options: ['-16 ft/sec', '-32 ft/sec', '16 ft/sec', '-84 ft/sec'],
      correctAnswer: '-16 ft/sec',
      explanation: <>s(0) = 100, s(1) = 84. Average velocity = (84 - 100)/(1 - 0) = -16 ft/sec</>,
      questionText: 'Average velocity over [0, 1]'
    },
    {
      id: 'problem-2', 
      question: <>For s(t) = t² + 3t, what is the average velocity over [2, 5]?</>,
      options: ['10 units/sec', '5 units/sec', '15 units/sec', '30 units/sec'],
      correctAnswer: '10 units/sec',
      explanation: <>s(2) = 4 + 6 = 10, s(5) = 25 + 15 = 40. Average velocity = (40 - 10)/(5 - 2) = 30/3 = 10 units/sec</>,
      questionText: 'Average velocity for quadratic function'
    },
    {
      id: 'problem-3',
      question: <>For s(t) = 2t³ - t, what is the approximate average velocity over [1, 1.01]?</>,
      options: ['5.1 units/sec', '2.0 units/sec', '1.0 units/sec', '0.05 units/sec'],
      correctAnswer: '5.1 units/sec', 
      explanation: <>s(1) = 2 - 1 = 1, s(1.01) ≈ 1.051006. Average velocity ≈ (1.051006 - 1)/(0.01) ≈ 5.1 units/sec</>,
      questionText: 'Average velocity for cubic function'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "average-velocity-practice",
    conceptName: "Average Velocity Practice",
    conceptDescription: "Practice calculating average velocity for different functions",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory and Examples */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
              <BlockMath math="\text{Average velocity} = \frac{\text{Change in position}}{\text{Change in time}} = \frac{s(t_2) - s(t_1)}{t_2 - t_1}" />
            </div>
            
            <p className="text-lg leading-relaxed mb-4">
              This formula calculates how fast an object moves on average over a time interval. 
              The result can be positive (moving in positive direction) or negative (moving in negative direction).
            </p>
          </div>

          {/* Multiple Interval Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Comparing Different Time Intervals
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-2">Position function: s(t) = -16t² + 100</p>
                <p className="text-lg text-gray-600 dark:text-gray-400">Ball dropped from 100 feet</p>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Interval [1, 2]:</p>
                  <p className="text-lg">s(1) = 84 ft, s(2) = 36 ft</p>
                  <p className="text-lg">Average velocity = (36 - 84)/(2 - 1) = -48 ft/sec</p>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold">Interval [1, 1.5]:</p>
                  <p className="text-lg">s(1) = 84 ft, s(1.5) = 64 ft</p>
                  <p className="text-lg">Average velocity = (64 - 84)/(1.5 - 1) = -40 ft/sec</p>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold">Interval [1, 1.1]:</p>
                  <p className="text-lg">s(1) = 84 ft, s(1.1) = 80.64 ft</p>
                  <p className="text-lg">Average velocity = (80.64 - 84)/(1.1 - 1) = -33.6 ft/sec</p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Observation:</strong> As the time interval gets smaller, we get a better approximation 
                  of the instantaneous velocity at t = 1.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Average Velocity Graph Component */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <AverageVelocityGraph />
          </div>
        </div>

        {/* Right Column - Interactive Practice */}
        <div className="space-y-6">
          
          {/* Step-by-Step Calculation */}
          <StepByStepRenderer 
            config={stepConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Quick Check Quiz */}
          <QuizRenderer 
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Key Insights */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              Key Insights
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>1.</strong> Smaller time intervals give better approximations of instantaneous velocity
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>2.</strong> Average velocity can be positive, negative, or zero depending on direction
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>3.</strong> The secant line slope represents average rate of change
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>4.</strong> Taking the limit leads us to instantaneous velocity (the derivative)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="average-velocity"
      slideTitle="Finding Average Velocity"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="rates-of-change"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}