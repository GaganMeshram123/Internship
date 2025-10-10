import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function RatesOfChangeSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about rates of change
  const questions: QuizQuestion[] = [
    {
      id: 'rate-of-change-definition',
      question: <>What does the derivative represent in terms of rates of change?</>,
      options: ['The total change', 'The rate of change', 'The average value', 'The maximum value'],
      correctAnswer: 'The rate of change',
      explanation: <>The derivative gives us the instantaneous rate of change of one variable with respect to another.</>,
      questionText: 'What does derivative represent?'
    },
    {
      id: 'velocity-direction',
      question: <>When is velocity considered positive in motion problems?</>,
      options: ['When moving left or downward', 'When moving right or upward', 'When speed is increasing', 'When acceleration is positive'],
      correctAnswer: 'When moving right or upward',
      explanation: <>By convention, movement to the right (horizontal) or upward (vertical) is considered positive direction.</>,
      questionText: 'When is velocity positive?'
    },
    {
      id: 'average-velocity-formula',
      question: <>What is the formula for average velocity?</>,
      options: ['Δs/Δt', 'Δt/Δs', 's(t)', 'ds/dt'],
      correctAnswer: 'Δs/Δt',
      explanation: <>Average velocity equals change in position divided by change in time: Δs/Δt.</>,
      questionText: 'Formula for average velocity'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "rates-of-change-intro",
    conceptName: "Introduction to Rates of Change",
    conceptDescription: "Understanding derivatives as rates of change",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                Rates of Change
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                The derivative can be used to determine the rate of change of one variable with respect to another. 
                This powerful concept applies to many real-world situations.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                Real-World Applications
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium">Population Growth</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rate of population change</p>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium">Production Rates</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manufacturing efficiency</p>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium">Water Flow</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fluid dynamics</p>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium">Motion</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Velocity & acceleration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Motion in a Straight Line */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Motion in a Straight Line
            </h3>
            
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                For objects moving in a straight line, we use a coordinate system where:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  <svg width="400" height="60" viewBox="0 0 400 60">
                    {/* Coordinate line */}
                    <line x1="20" y1="30" x2="380" y2="30" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    {/* Origin */}
                    <circle cx="200" cy="30" r="3" fill="currentColor"/>
                    <text x="200" y="50" textAnchor="middle" className="text-sm fill-current">Origin</text>
                    
                    {/* Positive direction */}
                    <text x="320" y="20" textAnchor="middle" className="text-sm fill-current">Positive</text>
                    <text x="320" y="50" textAnchor="middle" className="text-sm fill-current">(Right/Up)</text>
                    
                    {/* Negative direction */}
                    <text x="80" y="20" textAnchor="middle" className="text-sm fill-current">Negative</text>
                    <text x="80" y="50" textAnchor="middle" className="text-sm fill-current">(Left/Down)</text>
                    
                    {/* Arrow marker */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor"/>
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                  <p className="text-blue-800 dark:text-blue-200">
                    <strong>Positive Direction:</strong> Movement to the right (horizontal) or upward (vertical)
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-gray-400">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Negative Direction:</strong> Movement to the left (horizontal) or downward (vertical)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Position Function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Position Function
            </h3>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 dark:text-yellow-200 mb-3">
                  <strong>Definition:</strong> The function s(t) that gives the position of an object relative to the origin as a function of time t.
                </p>
                <BlockMath math="s(t) = \text{position at time } t" />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  <strong>Average Velocity Formula:</strong>
                </p>
                <BlockMath math="\text{Average velocity} = \frac{\text{Change in distance}}{\text{Change in time}} = \frac{\Delta s}{\Delta t}" />
                <p className="text-blue-800 dark:text-blue-200 mt-2">
                  If position changes from s(t) to s(t + Δt), then:
                </p>
                <BlockMath math="\text{Average velocity} = \frac{s(t + \Delta t) - s(t)}{\Delta t}" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Examples and Practice */}
        <div className="space-y-6">
          
          {/* Example with Visualization */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Falling Object Example
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-lg mb-3">
                  A ball is dropped from 100 feet. Its height is given by:
                </p>
                <BlockMath math="s(t) = -16t^2 + 100" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  where s is height in feet and t is time in seconds
                </p>
                <p className="text-lg text-blue-600 dark:text-blue-400 mt-1">
                  (Remember: <InlineMath math="\frac{1}{2}gt^2" /> from acceleration due to gravity, where g ≈ 32 ft/s²)
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  <svg width="300" height="200" viewBox="0 0 300 200">
                    {/* Building - 100ft tall */}
                    <rect x="50" y="50" width="30" height="140" fill="#8B5CF6" stroke="currentColor"/>
                    <rect x="45" y="45" width="40" height="10" fill="#6366F1"/>
                    
                    {/* Height markers */}
                    <line x1="30" y1="50" x2="35" y2="50" stroke="currentColor"/>
                    <text x="25" y="55" textAnchor="end" className="text-xs fill-current">100 ft</text>
                    
                    <line x1="30" y1="190" x2="35" y2="190" stroke="currentColor"/>
                    <text x="25" y="195" textAnchor="end" className="text-xs fill-current">0 ft</text>
                    
                    {/* Ball positions at different times */}
                    <circle cx="150" cy="50" r="4" fill="currentColor"/>
                    <text x="160" y="55" className="text-xs fill-current">t = 0</text>
                    
                    <circle cx="150" cy="100" r="4" fill="currentColor"/>
                    <text x="160" y="105" className="text-xs fill-current">t = 1</text>
                    
                    <circle cx="150" cy="160" r="4" fill="currentColor"/>
                    <text x="160" y="175" className="text-xs fill-current">t = 2</text>
                    
                    {/* Trajectory line */}
                    <line x1="150" y1="50" x2="150" y2="160" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5"/>
                    
                    {/* Ground */}
                    <line x1="30" y1="190" x2="270" y2="190" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm"><strong>At t = 0:</strong> s(0) = 100 feet</p>
                  <p className="text-sm"><strong>At t = 1:</strong> s(1) = -16(1)² + 100 = 84 feet</p>
                  <p className="text-sm"><strong>At t = 2:</strong> s(2) = -16(2)² + 100 = 36 feet</p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 mb-2">
                  <strong>Average velocity from t = 1 to t = 2:</strong>
                </p>
                <BlockMath math="\frac{s(2) - s(1)}{2 - 1} = \frac{36 - 84}{1} = -48 \text{ ft/sec}" />
                <p className="text-blue-800 dark:text-blue-200 mt-2 text-sm">
                  Negative because the ball is falling (moving downward)
                </p>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Concepts
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Average Rate of Change:</strong> Calculated over an interval using difference quotient
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-gray-400">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Instantaneous Rate:</strong> Found by taking the limit as the interval approaches zero
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-gray-400">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Sign Convention:</strong> Positive = right/up, Negative = left/down
                </p>
              </div>
            </div>
          </div>

          {/* Quick Check Quiz */}
          <QuizRenderer 
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="rates-of-change-intro"
      slideTitle="Rates of Change"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="rates-of-change"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}