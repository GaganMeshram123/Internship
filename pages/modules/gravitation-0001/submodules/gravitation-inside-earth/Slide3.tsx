import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function InsideEarthSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedRegion, setSelectedRegion] = useState<string>('inside');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'force-graph-exploration',
      conceptId: 'force-radius-relationship',
      conceptName: 'Force vs Radius Graph',
      type: 'learning',
      description: 'Exploring gravitational force as a function of distance from Earth\'s center'
    },
    {
      id: 'region-comparison',
      conceptId: 'inside-outside-comparison',
      conceptName: 'Inside vs Outside Earth',
      type: 'learning',
      description: 'Comparing gravitational behavior inside and outside Earth'
    },
    {
      id: 'force-relationship-quiz',
      conceptId: 'force-maximum-quiz',
      conceptName: 'Maximum Force Location Quiz',
      type: 'judging',
      description: 'Testing understanding of where gravitational force is maximum'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerId: string) => {
    const isCorrect = answerId === 'surface';
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    const optionTextMap: Record<string, string> = {
      surface: "At Earth's surface",
      center: "At Earth's center",
      altitude: 'At high altitude'
    };
    
    const response: InteractionResponse = {
      interactionId: 'force-relationship-quiz',
      value: optionTextMap[answerId] || answerId,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'force-maximum-quiz',
      conceptName: 'Maximum Force Location Quiz',
      conceptDescription: 'Testing understanding of where gravitational force is maximum',
      question: {
        type: 'mcq',
        question: 'Where is the gravitational force on a test mass maximum?',
        options: [
          "At Earth's surface",
          "At Earth's center",
          'At high altitude'
        ]
      }
    };
    
    handleInteractionComplete(response);
  };

  const regions = [
    {
      id: 'inside',
      title: 'Inside Earth',
      description: '(r ≤ R)',
      color: '#10B981'
    },
    {
      id: 'outside',
      title: 'Above Surface',
      description: '(r > R)',
      color: '#F59E0B'
    },
    {
      id: 'complete',
      title: 'Complete View',
      description: '0 ≤ r ≤ ∞',
      color: '#3B82F6'
    }
  ];

  // Constants for the graph
  const R = 6400; // Earth radius in km
  const maxRadius = 20000; // Maximum radius to show (km)
  const graphWidth = 400;
  const graphHeight = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  
  // Function to calculate force at any radius
  const calculateForce = (r: number) => {
    if (r <= R) {
      // Inside Earth: F = mg × (r/R)
      return r / R;
    } else {
      // Outside Earth: F = mg × (R/(r))²
      return Math.pow(R / r, 2);
    }
  };

  // Generate data points for the graph
  const generateGraphData = () => {
    const points = [];
    
    // Inside Earth points (0 to R)
    for (let r = 0; r <= R; r += R/50) {
      points.push({
        r: r,
        force: calculateForce(r),
        region: 'inside'
      });
    }
    
    // Outside Earth points (R to maxRadius)
    for (let r = R; r <= maxRadius; r += (maxRadius - R)/100) {
      points.push({
        r: r,
        force: calculateForce(r),
        region: 'outside'
      });
    }
    
    return points;
  };

  const graphData = generateGraphData();

  // Convert data coordinates to SVG coordinates
  const xScale = (r: number) => margin.left + ((r / maxRadius) * (graphWidth - margin.left - margin.right));
  const yScale = (force: number) => graphHeight - margin.bottom - (force * (graphHeight - margin.top - margin.bottom));

  return (
    <SlideComponentWrapper
      slideId="complete-force-distance-picture"
      slideTitle="Gravitational Force vs Distance: Complete Picture"
      moduleId="gravitation-0001"
      submoduleId="gravitation-inside-earth"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Theory and Explanations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg space-y-6">
            <TrackedInteraction 
              interaction={slideInteractions[0]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div>
                <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  Let's combine our understanding of gravitational force inside Earth and at altitude to see the complete picture.
                </div>
                
                <div className="text-center my-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-600">
                  <div className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                    Complete Force Relationship
                  </div>
                  <div className="text-lg text-blue-800 dark:text-blue-200">
                    From Earth's center to far above its surface
                  </div>
                </div>
                
                <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  This graph reveals fascinating insights about how gravity changes with position relative to Earth.
                </div>
              </div>
            </TrackedInteraction>

            {/* Mathematical Summary */}
            <motion.div 
              className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-blue-700 dark:text-blue-300 font-medium text-lg mb-3">Mathematical Summary</h3>
              
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-700 p-3 rounded">
                  <div className="font-medium mb-1">Inside Earth (0 ≤ r ≤ R):</div>
                  <BlockMath math="F(r) = \frac{GMm}{R^2} \left(\frac{r}{R}\right)" />
                </div>
                
                                 <div className="bg-white dark:bg-gray-700 p-3 rounded">
                   <div className="font-medium mb-1">Above Earth (r &gt; R):</div>
                   <BlockMath math="F(r) = \frac{GMm}{r^2}" />
                 </div>
                
                <div className="bg-white dark:bg-gray-700 p-3 rounded">
                  <div className="font-medium mb-1">At Earth's surface (r = R):</div>
                  <BlockMath math="F(R) = \frac{GMm}{R^2}" />
                  <div className="text-lg text-gray-600 dark:text-gray-400">Both formulas give the same result!</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactive Graph */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">

            {/* Region Selection */}
            <TrackedInteraction 
              interaction={slideInteractions[1]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  Explore Different Regions
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => {
                        setSelectedRegion(region.id);
                        const response: InteractionResponse = {
                          interactionId: 'region-comparison',
                          value: region.title,
                          timestamp: Date.now(),
                          conceptId: 'inside-outside-comparison',
                          conceptName: 'Inside vs Outside Earth',
                          conceptDescription: `Explored ${region.title}: ${region.description}`
                        };
                        handleInteractionComplete(response);
                      }}
                      className={`p-4 rounded-lg text-left transition-all duration-300 text-lg ${
                        selectedRegion === region.id
                          ? 'bg-blue-600 text-white border-2 border-blue-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent'
                      }`}
                    >
                      <div className="font-bold mb-2">{region.title}</div>
                      <div className="opacity-90 mb-2">{region.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </TrackedInteraction>
            <h2 className="text-gray-900 dark:text-white font-medium mb-4 text-lg mt-6">Force vs Distance Graph</h2>
            
            {/* Graph */}
            <div className="relative w-full aspect-[4/3] bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <svg width="100%" height="100%" viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-full">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#E5E7EB" strokeWidth="0.5" className="stroke-gray-300 dark:stroke-gray-600"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Axes */}
                <line 
                  x1={margin.left} 
                  y1={graphHeight - margin.bottom} 
                  x2={graphWidth - margin.right} 
                  y2={graphHeight - margin.bottom} 
                  stroke="#374151" 
                  strokeWidth="2"
                  className="stroke-gray-700 dark:stroke-gray-300"
                />
                <line 
                  x1={margin.left} 
                  y1={margin.top} 
                  x2={margin.left} 
                  y2={graphHeight - margin.bottom} 
                  stroke="#374151" 
                  strokeWidth="2"
                  className="stroke-gray-700 dark:stroke-gray-300"
                />
                
                {/* Earth's surface line */}
                <line 
                  x1={xScale(R)} 
                  y1={margin.top} 
                  x2={xScale(R)} 
                  y2={graphHeight - margin.bottom} 
                  stroke="#DC2626" 
                  strokeWidth="2" 
                  strokeDasharray="5,5"
                  className="stroke-red-600 dark:stroke-red-400"
                />
                <text 
                  x={xScale(R) + 5} 
                  y={margin.top + 200} 
                  fontSize="12" 
                  fill="#DC2626"
                  className="fill-red-600 dark:fill-red-400"
                >
                  Earth's Surface
                </text>
                
                {/* Inside Earth curve */}
                <AnimatePresence>
                  {(selectedRegion === 'complete' || selectedRegion === 'inside') && (
                    <motion.path
                      d={`M ${xScale(0)} ${yScale(0)} ${graphData
                        .filter(d => d.region === 'inside')
                        .map(d => `L ${xScale(d.r)} ${yScale(d.force)}`)
                        .join(' ')}`}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      className="stroke-green-600 dark:stroke-green-400"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2 }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Outside Earth curve */}
                <AnimatePresence>
                  {(selectedRegion === 'complete' || selectedRegion === 'outside') && (
                    <motion.path
                      d={`M ${xScale(R)} ${yScale(1)} ${graphData
                        .filter(d => d.region === 'outside')
                        .map(d => `L ${xScale(d.r)} ${yScale(d.force)}`)
                        .join(' ')}`}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3"
                      className="stroke-amber-600 dark:stroke-amber-400"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Maximum point at surface */}
                <motion.circle
                  cx={xScale(R)}
                  cy={yScale(1)}
                  r="4"
                  fill="#DC2626"
                  className="fill-red-600 dark:fill-red-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                
                {/* Axis labels */}
                <text 
                  x={graphWidth / 2} 
                  y={graphHeight - 5} 
                  textAnchor="middle" 
                  fontSize="14" 
                  className="fill-gray-700 dark:fill-gray-300"
                >
                  Distance from Earth's Center (km)
                </text>
                <text 
                  x={15} 
                  y={graphHeight / 2} 
                  textAnchor="middle" 
                  fontSize="14" 
                  transform={`rotate(-90, 15, ${graphHeight / 2})`}
                  className="fill-gray-700 dark:fill-gray-300"
                >
                  Force (mg)
                </text>
                
                {/* X-axis ticks */}
                {[0, R, 2*R, 3*R].map(value => (
                  <g key={value}>
                    <line 
                      x1={xScale(value)} 
                      y1={graphHeight - margin.bottom} 
                      x2={xScale(value)} 
                      y2={graphHeight - margin.bottom + 5} 
                      stroke="#374151"
                      className="stroke-gray-700 dark:stroke-gray-300"
                    />
                    <text 
                      x={xScale(value)} 
                      y={graphHeight - margin.bottom + 18} 
                      textAnchor="middle" 
                      fontSize="10"
                      className="fill-gray-600 dark:fill-gray-400"
                    >
                      {value === 0 ? '0' : value === R ? 'R' : `${value/1000}R`}
                    </text>
                  </g>
                ))}
                
                {/* Y-axis ticks */}
                {[0, 0.5, 1.0].map(value => (
                  <g key={value}>
                    <line 
                      x1={margin.left - 5} 
                      y1={yScale(value)} 
                      x2={margin.left} 
                      y2={yScale(value)} 
                      stroke="#374151"
                      className="stroke-gray-700 dark:stroke-gray-300"
                    />
                    <text 
                      x={margin.left - 10} 
                      y={yScale(value) + 3} 
                      textAnchor="end" 
                      fontSize="10"
                      className="fill-gray-600 dark:fill-gray-400"
                    >
                      {value === 1 ? 'mg' : `${value}mg`}
                    </text>
                  </g>
                ))}
                
                {/* Legend */}
                <g transform="translate(250, 60)">
                  <rect width="130" height="70" fill="white" stroke="#9CA3AF" strokeWidth="1" rx="4" className="fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-500"/>
                  <line x1="10" y1="20" x2="30" y2="20" stroke="#10B981" strokeWidth="3" className="stroke-green-600 dark:stroke-green-400"/>
                  <text x="35" y="24" fontSize="10" className="fill-gray-700 dark:fill-gray-300">Inside Earth</text>
                  <line x1="10" y1="40" x2="30" y2="40" stroke="#F59E0B" strokeWidth="3" className="stroke-amber-600 dark:stroke-amber-400"/>
                  <text x="35" y="44" fontSize="10" className="fill-gray-700 dark:fill-gray-300">Above Earth</text>
                  <circle cx="20" cy="60" r="3" fill="#DC2626" className="fill-red-600 dark:fill-red-400"/>
                  <text x="35" y="64" fontSize="10" className="fill-gray-700 dark:fill-gray-300">Maximum</text>
                </g>
              </svg>
            </div>

            {/* Quick Check Quiz */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 mt-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Quick Check
              </h3>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Where is the gravitational force on a test mass maximum?
                </p>
                
                <TrackedInteraction 
                  interaction={slideInteractions[2]} 
                  onInteractionComplete={handleInteractionComplete}
                >
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuizAnswer('surface')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'surface'
                          ? 'border-green-500 bg-green-100 dark:bg-green-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      At Earth's surface
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('center')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'center'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      At Earth's center
                    </button>
                    <button
                      onClick={() => handleQuizAnswer('altitude')}
                      disabled={showFeedback}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                        selectedAnswer === 'altitude'
                          ? 'border-red-500 bg-red-100 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      At high altitude
                    </button>
                  </div>
                  
                  {showFeedback && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      selectedAnswer === 'surface' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswer === 'surface' ? (
                        <p>Correct! The graph shows that gravitational force reaches its maximum value of mg exactly at Earth's surface (r = R). Inside Earth, force increases linearly from zero at the center, while outside Earth, force decreases as 1/r².</p>
                      ) : (
                        <p>Not quite. The graph reveals that gravitational force is maximum at Earth's surface. At the center, force is zero due to symmetry, and at altitude, force decreases according to the inverse square law.</p>
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