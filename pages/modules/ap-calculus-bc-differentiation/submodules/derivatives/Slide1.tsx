import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { QuizRenderer, QuizConfig } from '../../../common-components/QuizRenderer';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function TangentLineSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [showSecantDemo, setShowSecantDemo] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(2);
  
  // State for interactive demo
  const [intervalSize, setIntervalSize] = useState(2.0);
  const [centerTime, setCenterTime] = useState(2.0);
  const [showTangent, setShowTangent] = useState(false);
  
  const { isDarkMode } = useThemeContext();

  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'tangent-line-understanding',
      conceptId: 'tangent-definition',
      conceptName: 'Understanding Tangent Lines',
      type: 'learning',
      description: 'Understanding what it means for a line to be tangent to a curve'
    },
    {
      id: 'secant-line-exploration',
      conceptId: 'secant-approximation',
      conceptName: 'Secant Line Approximation',
      type: 'learning',
      description: 'Exploring how secant lines approximate tangent lines'
    },
    {
      id: 'tangent-quiz',
      conceptId: 'tangent-concepts',
      conceptName: 'Tangent Line Concepts Quiz',
      type: 'judging',
      description: 'Testing understanding of tangent line concepts'
    }
  ];

  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Quiz configuration
  const quizConfig: QuizConfig = {
    questions: [
      {
        id: 'tangent-definition',
        question: 'What is the key challenge in defining a tangent line to a general curve?',
        options: [
          'The curve might not be continuous',
          'A tangent line might touch the curve at multiple points or cross through it',
          'The curve might not be differentiable',
          'The tangent line might not exist'
        ],
        correctAnswer: 'A tangent line might touch the curve at multiple points or cross through it',
        explanation: 'Unlike circles where the tangent is perpendicular to the radius, general curves can have tangent lines that intersect the curve at multiple points or pass through the curve.'
      },
      {
        id: 'secant-approximation',
        question: 'How does a secant line help us find the tangent line?',
        options: [
          'A secant line is exactly the same as a tangent line',
          'As the second point approaches the point of tangency, the secant line approaches the tangent line',
          'Secant lines are always perpendicular to tangent lines',
          'Secant lines have no relationship to tangent lines'
        ],
        correctAnswer: 'As the second point approaches the point of tangency, the secant line approaches the tangent line',
        explanation: 'The brilliant insight is that we can approximate the tangent line slope by using secant lines with points progressively closer to the point of tangency.'
      },
      {
        id: 'difference-quotient',
        question: 'The slope of a secant line through points (c, f(c)) and (c+Δx, f(c+Δx)) is given by:',
        options: [
          '\\frac{f(c+Δx) - f(c)}{Δx}',
          '\\frac{f(c) - f(c+Δx)}{Δx}',
          'f(c+Δx) - f(c)',
          '\\frac{Δx}{f(c+Δx) - f(c)}'
        ],
        correctAnswer: '\\frac{f(c+Δx) - f(c)}{Δx}',
        explanation: 'This is the difference quotient formula: (change in y)/(change in x) = (f(c+Δx) - f(c))/Δx.'
      }
    ],
    title: 'Quick Check: Tangent Lines',
    conceptId: 'tangent-concepts',
    conceptName: 'Tangent Line Concepts',
    conceptDescription: 'Understanding tangent lines and their relationship to secant lines'
  };

  // Interactive Slope to Tangent Demo (adapted from physics slide)
  const renderSecantDemo = () => {

    // Sample function: f(x) = x^2 for simple demonstration
    const positionFunction = (x: number) => {
      return 0.5 * x * x + 1;
    };

    // Derivative function: f'(x) = 2x
    const derivativeFunction = (x: number) => {
      return x;
    };

    // Graph dimensions
    const graphWidth = 500;
    const graphHeight = 350;
    const padding = 50;
    const plotWidth = graphWidth - 2 * padding;
    const plotHeight = graphHeight - 2 * padding;

    // Scale ranges
    const xMin = 0;
    const xMax = 4;
    const yMin = 0;
    const yMax = 10;

    // Scale functions
    const scaleX = (x: number) => padding + (x / xMax) * plotWidth;
    const scaleY = (y: number) => graphHeight - padding - (y / yMax) * plotHeight;

    // Generate curve points
    const generateCurvePoints = () => {
      const points = [];
      for (let x = xMin; x <= xMax; x += 0.1) {
        const y = positionFunction(x);
        points.push({ x, y });
      }
      return points;
    };

    const curvePoints = generateCurvePoints();
    const pathData = curvePoints.map((point, index) => {
      const xPos = scaleX(point.x);
      const yPos = scaleY(point.y);
      return `${index === 0 ? 'M' : 'L'} ${xPos} ${yPos}`;
    }).join(' ');

    // Calculate interval endpoints
    const x1 = Math.max(xMin, centerTime - intervalSize);
    const x2 = Math.min(xMax, centerTime + intervalSize);
    const y1 = positionFunction(x1);
    const y2 = positionFunction(x2);
    const yCenter = positionFunction(centerTime);

    // Calculate average slope (secant slope)
    const averageSlope = (y2 - y1) / (x2 - x1);

    // Calculate instantaneous slope (tangent slope)
    const instantaneousSlope = derivativeFunction(centerTime);

    // Axis tick marks
    const xTicks = [0, 1, 2, 3, 4];
    const yTicks = [0, 2, 4, 6, 8, 10];

    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
          Interactive: Secant Line Approaching Tangent
        </h3>
        
        <div className="mb-4">
          <p className="text-lg mb-3">
            Adjust the interval size to see how the secant line approaches the tangent line:
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Interval Size Control */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Interval Size: ±{intervalSize.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.1"
              value={intervalSize}
              onChange={(e) => setIntervalSize(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
            <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-1">
              <span>0.1 (Small)</span>
              <span>1.5 (Large)</span>
            </div>
          </div>

          {/* Center Point Control */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Center Point: x = {centerTime.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="3.5"
              step="0.1"
              value={centerTime}
              onChange={(e) => setCenterTime(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
            <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-1">
              <span>0.5</span>
              <span>3.5</span>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg mb-4">
          <svg viewBox="0 0 500 350" className="w-full h-96">
            {/* Grid */}
            <defs>
              <pattern id="grid-tangent" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="500" height="350" fill="url(#grid-tangent)" />
            
            {/* Grid lines */}
            {xTicks.map(tick => (
              <line
                key={`x-grid-${tick}`}
                x1={scaleX(tick)}
                y1={padding}
                x2={scaleX(tick)}
                y2={graphHeight - padding}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            ))}
            {yTicks.map(tick => (
              <line
                key={`y-grid-${tick}`}
                x1={padding}
                y1={scaleY(tick)}
                x2={graphWidth - padding}
                y2={scaleY(tick)}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            ))}

            {/* Axes with arrows */}
            <defs>
              <marker id="arrowhead-tangent" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
              </marker>
            </defs>
            <line x1={padding} y1={padding} x2={padding} y2={graphHeight - padding} stroke="#374151" strokeWidth="2" />
            <line x1={padding} y1={graphHeight - padding} x2={graphWidth - padding} y2={graphHeight - padding} stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead-tangent)" />

            {/* Axis labels */}
            <text x={graphWidth / 2} y={graphHeight - 10} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold">
              x
            </text>
            <text x={20} y={graphHeight / 2} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold" transform={`rotate(-90, 20, ${graphHeight / 2})`}>
              f(x)
            </text>

            {/* Axis tick labels */}
            {xTicks.map(tick => (
              <text
                key={`x-label-${tick}`}
                x={scaleX(tick)}
                y={graphHeight - padding + 20}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="14"
              >
                {tick}
              </text>
            ))}
            {yTicks.filter(tick => tick % 2 === 0).map(tick => (
              <text
                key={`y-label-${tick}`}
                x={padding - 10}
                y={scaleY(tick) + 5}
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

            {/* Secant line with extensions */}
            {(() => {
              // Calculate secant line slope
              const secantSlope = (y2 - y1) / (x2 - x1);
              
              // Calculate extended endpoints for visual effect
              const extensionLength = 0.8;
              const x1Extended = x1 - extensionLength;
              const x2Extended = x2 + extensionLength;
              const y1Extended = y1 - extensionLength * secantSlope;
              const y2Extended = y2 + extensionLength * secantSlope;
              
              return (
                <g>
                  {/* Extended secant line (dotted) */}
                  <line
                    x1={scaleX(x1Extended)}
                    y1={scaleY(y1Extended)}
                    x2={scaleX(x2Extended)}
                    y2={scaleY(y2Extended)}
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.7"
                  />
                  
                  {/* Main secant line (solid) */}
                  <line
                    x1={scaleX(x1)}
                    y1={scaleY(y1)}
                    x2={scaleX(x2)}
                    y2={scaleY(y2)}
                    stroke="#ef4444"
                    strokeWidth="3"
                  />
                </g>
              );
            })()}

            {/* Tangent line (if enabled) */}
            {showTangent && (
              <line
                x1={scaleX(centerTime - 1)}
                y1={scaleY(yCenter - 1 * instantaneousSlope)}
                x2={scaleX(centerTime + 1)}
                y2={scaleY(yCenter + 1 * instantaneousSlope)}
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="8,4"
              />
            )}

            {/* Interval endpoints */}
            <circle
              cx={scaleX(x1)}
              cy={scaleY(y1)}
              r="6"
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <circle
              cx={scaleX(x2)}
              cy={scaleY(y2)}
              r="6"
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth="2"
            />

            {/* Center point */}
            <circle
              cx={scaleX(centerTime)}
              cy={scaleY(yCenter)}
              r="8"
              fill="#f59e0b"
              stroke="#ffffff"
              strokeWidth="2"
            />

            {/* Point labels */}
            <text
              x={scaleX(x1)}
              y={scaleY(y1) - 15}
              textAnchor="middle"
              fill="#ef4444"
              fontSize="12"
              fontWeight="bold"
            >
              ({x1.toFixed(1)}, {y1.toFixed(1)})
            </text>
            <text
              x={scaleX(x2)}
              y={scaleY(y2) - 15}
              textAnchor="middle"
              fill="#ef4444"
              fontSize="12"
              fontWeight="bold"
            >
              ({x2.toFixed(1)}, {y2.toFixed(1)})
            </text>
            <text
              x={scaleX(centerTime)}
              y={scaleY(yCenter) + 25}
              textAnchor="middle"
              fill="#f59e0b"
              fontSize="12"
              fontWeight="bold"
            >
              Center: ({centerTime.toFixed(1)}, {yCenter.toFixed(1)})
            </text>
          </svg>
        </div>

        {/* Toggle Tangent Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowTangent(!showTangent)}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            {showTangent ? 'Hide' : 'Show'} True Tangent Line
          </button>
        </div>

        {/* Calculations Display */}
        <div className="grid grid-cols-2 gap-4">
          {/* Secant Slope */}
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <h5 className="font-semibold text-red-700 dark:text-red-300 mb-3">
              Secant Line Slope
            </h5>
            <div className="space-y-2 text-gray-800 dark:text-gray-200">
              <div>Δy = {y2.toFixed(2)} - {y1.toFixed(2)} = {(y2 - y1).toFixed(2)}</div>
              <div>Δx = {x2.toFixed(1)} - {x1.toFixed(1)} = {(x2 - x1).toFixed(1)}</div>
              <div className="font-bold text-red-700 dark:text-red-300">
                Slope = {averageSlope.toFixed(3)}
              </div>
            </div>
          </div>

          {/* Tangent Slope */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 dark:text-green-300 mb-3">
              Tangent Line Slope
            </h5>
            <div className="space-y-2 text-gray-800 dark:text-gray-200">
              <div>At x = {centerTime.toFixed(1)}:</div>
              <div>True slope = {instantaneousSlope.toFixed(3)}</div>
              <div className="font-bold text-green-700 dark:text-green-300">
                Difference: {Math.abs(averageSlope - instantaneousSlope).toFixed(3)}
              </div>
            </div>
          </div>
        </div>

        {/* Observation Guide */}
        <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Key Observations:
          </h5>
          <ul className="text-gray-700 dark:text-gray-300 space-y-1">
            <li>• <span className="font-bold">Large interval</span>: Secant line differs significantly from tangent</li>
            <li>• <span className="font-bold">Small interval</span>: Secant line approaches the tangent line</li>
            <li>• <span className="font-bold">As interval → 0</span>: Secant slope → Tangent slope</li>
            <li>• <span className="font-bold">Key Insight</span>: This is the foundation of derivatives!</li>
          </ul>
        </div>
      </div>
    );
  };

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto p-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Theory and Concepts */}
          <div className="space-y-6">
            
            {/* Main Title */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  What does it mean to say that a line is <strong>tangent</strong> to a curve at a point? 
                  For a circle, the tangent line at a point P is the line that is perpendicular to the 
                  radial line at point P.
                </p>
                <p>
                  For a general curve, however, the problem is more difficult. You might say that a line is 
                  tangent to a curve at a point P if it <strong>touches, but does not cross</strong>, the curve at point P.
                </p>
                <p>
                  This definition would work for the first curve shown, but not for the 
                  second. Or you might say that a line is tangent to a curve if the line touches or 
                  intersects the curve at <strong>exactly one point</strong>. This definition would work for a circle but 
                  not for more general curves.
                </p>
              </div>
            </div>

            {/* The Problem */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Problem</h3>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Essentially, the problem of finding the tangent line at a point P 
                  boils down to the problem of finding the <strong>slope of the tangent line</strong> at point P.
                </p>
                
                <p>
                  You can approximate this slope using a <strong>secant line</strong> through the point of tangency 
                  and a second point on the curve.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">If f(c, f(c)) is the point of tangency and (c + Δx, f(c + Δx)) is a second point on the graph, the slope of the secant line through the two points is:</p>
                  
                  <div className="text-center my-4">
                    <BlockMath math="m_{sec} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{f(c + \Delta x) - f(c)}{(c + \Delta x) - c} = \frac{f(c + \Delta x) - f(c)}{\Delta x}" />
                  </div>
                  
                  <p className="text-center text-lg font-medium">
                    <span className="text-red-600 dark:text-red-400">Change in y</span> / <span className="text-blue-600 dark:text-blue-400">Change in x</span>
                  </p>
                </div>

                <p>
                  The right-hand side of this equation is a <strong>difference quotient</strong>. The denominator 
                  Δx is the change in x, and the numerator Δy = f(c + Δx) - f(c) is the change in y.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Examples and Interactive */}
          <div className="space-y-6">
            
            {/* Visual Examples */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                Examples of Tangent Line Challenges
              </h3>
              
              {/* Three visual examples */}
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-center">Circle: Clear Definition</h4>
                  <svg width="500" height="200" viewBox="0 0 500 200" className="mx-auto">
                    <circle cx="250" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="3"/>
                    {/* Point at 45 degrees: P = (250 + 80*cos(45°), 100 - 80*sin(45°)) = (250 + 56.56, 100 - 56.56) */}
                    <line x1="250" y1="100" x2="306.56" y2="43.44" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4"/>
                    {/* Tangent perpendicular to radius at 45° point */}
                    <line x1="262" y1="0" x2="362" y2="100" stroke="#10b981" strokeWidth="4"/>
                    <circle cx="306.56" cy="43.44" r="5" fill="#ef4444"/>
                    <text x="315" y="35" className="text-lg font-medium" fill="#1f2937">P</text>
                    <text x="280" y="25" className="text-sm" fill="#10b981">Tangent</text>
                    <text x="280" y="75" className="text-sm" fill="#ef4444">Radius</text>
                  </svg>
                  <p className="text-sm text-center mt-2">Tangent is perpendicular to radius</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-center">General Curve: Touches but Doesn't Cross</h4>
                  <svg width="500" height="200" viewBox="0 0 500 200" className="mx-auto">
                    {/* Curve: parabola-like shape with minimum at center */}
                    <path d="M 50 80 Q 150 140 250 150 Q 350 140 450 80" fill="none" stroke="#3b82f6" strokeWidth="4"/>
                    {/* Horizontal tangent at the minimum point */}
                    <line x1="150" y1="150" x2="350" y2="150" stroke="#10b981" strokeWidth="4"/>
                    <circle cx="250" cy="150" r="6" fill="#ef4444"/>
                    <text x="260" y="140" className="text-lg font-medium" fill="#1f2937">P</text>
                    <text x="200" y="165" className="text-sm" fill="#10b981">Tangent</text>
                  </svg>
                  <p className="text-sm text-center mt-2">Works for this curve</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-center">Challenge: Tangent Crosses Curve</h4>
                  <svg width="500" height="200" viewBox="0 0 500 200" className="mx-auto">
                    {/* Cubic-like curve with inflection point */}
                    <path d="M 50 150 Q 150 80 250 100 Q 350 120 450 50" fill="none" stroke="#3b82f6" strokeWidth="4"/>
                    {/* Tangent line with slope that crosses the curve */}
                    <line x1="150" y1="70" x2="350" y2="130" stroke="#10b981" strokeWidth="4"/>
                    <circle cx="250" cy="100" r="6" fill="#ef4444"/>
                    <text x="260" y="95" className="text-lg font-medium" fill="#1f2937">P</text>
                    <text x="280" y="145" className="text-sm" fill="#10b981">Tangent</text>
                    <text x="185" y="75" className="text-sm" fill="#f59e0b">Crosses!</text>
                  </svg>
                  <p className="text-sm text-center mt-2">Definition fails here!</p>
                </div>
              </div>
            </div>

            {/* Interactive Secant Demo */}
            {renderSecantDemo()}
          </div>

        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="finding-tangent"
      slideTitle="Finding the Tangent Line"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="derivatives"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}