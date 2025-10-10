import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function RatesOfChangeSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Step-by-step example: Finding velocity using derivative
  const velocitySteps: Step[] = [
    {
      id: 'position-function',
      question: <>A diver jumps from a 32-foot platform. What is the position function?</>,
      options: [
        { id: 'correct', text: 's(t) = -16t² + 16t + 32', isCorrect: true },
        { id: 'wrong1', text: 's(t) = 16t² + 16t + 32', isCorrect: false },
        { id: 'wrong2', text: 's(t) = -16t² - 16t + 32', isCorrect: false },
        { id: 'wrong3', text: 's(t) = -16t² + 16t - 32', isCorrect: false }
      ],
      correctAnswer: 's(t) = -16t² + 16t + 32',
      explanation: <>The diver starts at 32 feet, has initial upward velocity (+16t), and gravity pulls down (-16t²).</>,
      questionText: 'Identify the position function',
      nextStep: 'Find the derivative'
    },
    {
      id: 'find-derivative',
      question: <>Find the velocity function v(t) = s'(t)</>,
      options: [
        { id: 'wrong1', text: 'v(t) = -16t + 16', isCorrect: false },
        { id: 'correct', text: 'v(t) = -32t + 16', isCorrect: true },
        { id: 'wrong2', text: 'v(t) = -32t - 16', isCorrect: false },
        { id: 'wrong3', text: 'v(t) = -16t² + 16t', isCorrect: false }
      ],
      correctAnswer: 'v(t) = -32t + 16',
      explanation: <>Using the Power Rule: d/dt[-16t²] = -32t, d/dt[16t] = 16, d/dt[32] = 0</>,
      questionText: 'Find the velocity function',
      nextStep: 'Find when diver hits water'
    },
    {
      id: 'find-impact-time',
      question: <>When does the diver hit the water? (Set s(t) = 0)</>,
      options: [
        { id: 'wrong1', text: 't = 1 second', isCorrect: false },
        { id: 'correct', text: 't = 2 seconds', isCorrect: true },
        { id: 'wrong2', text: 't = 3 seconds', isCorrect: false },
        { id: 'wrong3', text: 't = 4 seconds', isCorrect: false }
      ],
      correctAnswer: 't = 2 seconds',
      explanation: <>-16t² + 16t + 32 = 0 → -16(t² - t - 2) = 0 → -16(t - 2)(t + 1) = 0 → t = 2 (positive solution)</>,
      questionText: 'Find when diver hits water',
      nextStep: 'Calculate velocity at impact'
    },
    {
      id: 'velocity-at-impact',
      question: <>What is the diver's velocity at impact (t = 2)?</>,
      options: [
        { id: 'wrong1', text: '-32 ft/sec', isCorrect: false },
        { id: 'correct', text: '-48 ft/sec', isCorrect: true },
        { id: 'wrong2', text: '48 ft/sec', isCorrect: false },
        { id: 'wrong3', text: '-16 ft/sec', isCorrect: false }
      ],
      correctAnswer: '-48 ft/sec',
      explanation: <>v(2) = -32(2) + 16 = -64 + 16 = -48 ft/sec. Negative indicates downward motion.</>,
      questionText: 'Calculate velocity at impact'
    }
  ]

  const stepConfig: StepConfig = {
    steps: velocitySteps,
    title: "Diver Velocity Problem",
    conceptId: "instantaneous-velocity",
    conceptName: "Finding Instantaneous Velocity",
    conceptDescription: "Using derivatives to find velocity at specific times",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "A diver jumps from a 32-foot platform with initial velocity 16 ft/sec upward:",
    },
    completionMessage: <>Complete! The diver hits the water at t = 2 seconds with velocity -48 ft/sec.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect velocity calculation!")
      }
    }
  }

  // Quiz questions
  const questions: QuizQuestion[] = [
    {
      id: 'velocity-derivative',
      question: <>If s(t) is the position function, what gives us the velocity?</>,
      options: ['s(t)', "s'(t)", 's(t + h)', '∫s(t)dt'],
      correctAnswer: "s'(t)",
      explanation: <>Velocity is the derivative of position: v(t) = s'(t)</>,
      questionText: 'What gives us velocity?'
    },
    {
      id: 'speed-vs-velocity',
      question: <>What is the relationship between speed and velocity?</>,
      options: ['Speed = velocity', 'Speed = |velocity|', 'Velocity = |speed|', 'They are unrelated'],
      correctAnswer: 'Speed = |velocity|',
      explanation: <>Speed is the absolute value of velocity. Speed cannot be negative, but velocity can be.</>,
      questionText: 'Speed vs velocity relationship'
    },
    {
      id: 'gravity-equation',
      question: <>In the free-fall equation s(t) = -½gt² + v₀t + s₀, what does g represent?</>,
      options: ['Initial velocity', 'Initial height', 'Acceleration due to gravity', 'Final position'],
      correctAnswer: 'Acceleration due to gravity',
      explanation: <>g is the acceleration due to gravity (≈32 ft/s² or 9.8 m/s²)</>,
      questionText: 'What does g represent?'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Velocity & Motion",
    conceptId: "velocity-motion-quiz",
    conceptName: "Velocity and Motion Concepts",
    conceptDescription: "Understanding velocity, speed, and motion",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              From Average to Instantaneous Velocity
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  <strong>Instantaneous Velocity:</strong> The velocity at a specific instant in time
                </p>
                <BlockMath math="v(t) = \lim_{\Delta t \to 0} \frac{s(t + \Delta t) - s(t)}{\Delta t} = s'(t)" />
              </div>
              
              <p className="text-lg leading-relaxed">
                By taking the limit of average velocity as the time interval approaches zero, 
                we get the instantaneous velocity, which is simply the derivative of the position function.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Key Relationships:</h4>
                <div className="space-y-2">
                  <p>• <strong>Position:</strong> s(t)</p>
                  <p>• <strong>Velocity:</strong> v(t) = s'(t)</p>
                  <p>• <strong>Speed:</strong> |v(t)| = |s'(t)|</p>
                  <p>• <strong>Acceleration:</strong> a(t) = v'(t) = s''(t)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Free Fall Equation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Free Fall Motion
            </h3>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 dark:text-yellow-200 mb-3">
                  <strong>General Free Fall Equation:</strong>
                </p>
                <BlockMath math="s(t) = -\frac{1}{2}gt^2 + v_0t + s_0" />
                <div className="mt-3 text-lg space-y-1">
                  <p>• s₀ = initial height</p>
                  <p>• v₀ = initial velocity</p>
                  <p>• g = acceleration due to gravity</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="font-medium text-blue-700 dark:text-blue-300">Earth</p>
                  <p className="text-lg">g ≈ 32 ft/s²</p>
                  <p className="text-lg">g ≈ 9.8 m/s²</p>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium">Sign Convention</p>
                  <p className="text-lg">+ : upward</p>
                  <p className="text-lg">- : downward</p>
                </div>
              </div>
            </div>
          </div>

          {/* Velocity vs Speed */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Velocity vs Speed
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Velocity</h4>
                  <ul className="text-lg space-y-1">
                    <li>• Can be positive or negative</li>
                    <li>• Indicates direction</li>
                    <li>• v(t) = s'(t)</li>
                    <li>• Units: ft/sec, m/sec</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-gray-400">
                  <h4 className="font-semibold mb-2">Speed</h4>
                  <ul className="text-lg space-y-1">
                    <li>• Always non-negative</li>
                    <li>• Magnitude only</li>
                    <li>• Speed = |v(t)|</li>
                    <li>• Units: ft/sec, m/sec</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-lg">
                  <strong>Example:</strong> If v(t) = -30 ft/sec, then speed = |-30| = 30 ft/sec
                </p>
              </div>
            </div>
          </div>

          {/* Motion Analysis */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Motion Analysis
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>v(t) &gt; 0:</strong> Object moving in positive direction (right/up)
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-gray-400">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>v(t) &lt; 0:</strong> Object moving in negative direction (left/down)
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-gray-400">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>v(t) = 0:</strong> Object momentarily at rest (turning point)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Examples and Practice */}
        <div className="space-y-6">
          
          {/* Step-by-Step Example */}
          <StepByStepRenderer 
            config={stepConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Visual Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Diver Motion Visualization
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <svg width="350" height="200" viewBox="0 0 350 200">
                  {/* Platform */}
                  <rect x="50" y="160" width="40" height="8" fill="#8B5CF6"/>
                  <rect x="45" y="155" width="50" height="5" fill="#6366F1"/>
                  
                  {/* Water */}
                  <rect x="0" y="190" width="350" height="10" fill="#3B82F6" opacity="0.5"/>
                  
                  {/* Trajectory */}
                  <path d="M 70 160 Q 150 120 230 190" stroke="#3B82F6" strokeWidth="2" fill="none"/>
                  
                  {/* Diver positions */}
                  <circle cx="70" cy="160" r="3" fill="currentColor"/>
                  <text x="75" y="155" className="text-xs fill-current">t=0, v=16</text>
                  
                  <circle cx="120" cy="140" r="3" fill="currentColor"/>
                  <text x="125" y="135" className="text-xs fill-current">t=0.5, v=0</text>
                  
                  <circle cx="170" cy="140" r="3" fill="currentColor"/>
                  <text x="175" y="135" className="text-xs fill-current">t=1, v=-16</text>
                  
                  <circle cx="230" cy="190" r="3" fill="currentColor"/>
                  <text x="235" y="185" className="text-xs fill-current">t=2, v=-48</text>
                  
                  {/* Height markers */}
                  <text x="10" y="165" className="text-xs fill-current">32 ft</text>
                  <text x="10" y="195" className="text-xs fill-current">0 ft</text>
                </svg>
              </div>
              
              <div className="space-y-2 text-lg">
                <p><strong>t = 0:</strong> Diver leaves platform, v = 16 ft/sec (upward)</p>
                <p><strong>t = 0.5:</strong> Maximum height, v = 0 ft/sec (turning point)</p>
                <p><strong>t = 1:</strong> Back to platform level, v = -16 ft/sec (downward)</p>
                <p><strong>t = 2:</strong> Hits water, v = -48 ft/sec (downward)</p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <QuizRenderer 
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Additional Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              More Examples
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-1">Ball thrown upward:</p>
                <p className="text-lg">s(t) = -16t² + 64t</p>
                <p className="text-lg">v(t) = -32t + 64</p>
                <p className="text-lg">Hits ground when s(t) = 0 at t = 4 sec</p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-semibold mb-1">Object on number line:</p>
                <p className="text-lg">s(t) = t³ - 6t² + 9t</p>
                <p className="text-lg">v(t) = 3t² - 12t + 9</p>
                <p className="text-lg">At rest when v(t) = 0: t = 1, 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="instantaneous-velocity"
      slideTitle="Velocity and the Derivative"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="rates-of-change"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}