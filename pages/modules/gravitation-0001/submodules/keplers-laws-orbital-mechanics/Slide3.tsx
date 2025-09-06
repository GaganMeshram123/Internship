import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction, useJudgingInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function KeplersLawsSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [animationStep, setAnimationStep] = useState<number>(0);

  const slideInteractions: Interaction[] = [
    {
      id: 'area-sweeping',
      conceptId: 'law-of-areas-angular-momentum',
      conceptName: 'Area Sweeping Examples',
      type: 'learning',
      description: 'Explore how equal areas are swept in equal times',
      conceptDescription: 'Understanding the relationship between orbital position and speed'
    },
    {
      id: 'angular-momentum-derivation',
      conceptId: 'law-of-areas-angular-momentum',
      conceptName: 'Angular Momentum Conservation',
      type: 'learning',
      description: 'Step through the mathematical connection to angular momentum',
      conceptDescription: 'Deriving the relationship between Kepler\'s second law and conservation laws'
    },
    {
      id: 'areas-quiz',
      conceptId: 'law-of-areas-angular-momentum',
      conceptName: 'Law of Areas Understanding',
      type: 'judging',
      description: 'Test understanding of the area-speed relationship',
      conceptDescription: 'Evaluating comprehension of Kepler\'s second law implications'
    }
  ];

  const handleJudgingInteraction = useJudgingInteraction();

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const examples = [
    {
      id: 'earth-seasons',
      title: 'Earth\'s Seasonal Speed Changes',
      setup: 'Earth is closest to the Sun in January (perihelion) and farthest in July (aphelion)',
      nearSun: 'January: 30.3 km/s (perihelion)',
      farSun: 'July: 29.3 km/s (aphelion)',
      explanation: 'Earth moves ~1 km/s faster in January than July, but areas swept are equal',
      significance: 'Small eccentricity means small speed variation - good for stable climate!'
    },
    {
      id: 'halleys-comet',
      title: 'Halley\'s Comet Extreme Variation',
      setup: 'Highly eccentric orbit with e = 0.97 creates dramatic speed changes',
      nearSun: 'Perihelion: ~54 km/s (near Venus orbit)',
      farSun: 'Aphelion: ~1 km/s (beyond Neptune)',
      explanation: 'Speed varies by factor of 54! But areas swept in equal times remain equal',
      significance: 'Extreme eccentricity demonstrates Kepler\'s second law powerfully'
    },
    {
      id: 'mars-observations',
      title: 'Mars: The Key to Kepler\'s Discovery',
      setup: 'Mars\' moderate eccentricity (e = 0.093) made speed variations observable',
      nearSun: 'Perihelion: 26.5 km/s (faster motion)',
      farSun: 'Aphelion: 21.9 km/s (slower motion)',
      explanation: 'Visible speed changes allowed Kepler to discover the area law',
      significance: 'Perfect case study - eccentric enough to see, circular enough to analyze'
    }
  ];

  const derivationSteps = [
    {
      step: 1,
      title: 'Area Swept by Radius Vector',
      content: 'In time Δt, the radius vector sweeps out a triangular area',
      math: '\\Delta A \\approx \\frac{1}{2}r^2 \\Delta\\theta',
      explanation: 'For small angles, the swept area is approximately triangular'
    },
    {
      step: 2,
      title: 'Rate of Area Sweeping',
      content: 'Taking the limit as Δt approaches zero',
      math: '\\frac{dA}{dt} = \\frac{1}{2}r^2\\frac{d\\theta}{dt} = \\frac{1}{2}r^2\\omega',
      explanation: 'ω is the angular velocity of the radius vector'
    },
    {
      step: 3,
      title: 'Angular Momentum Definition',
      content: 'For a planet of mass m with perpendicular velocity component v⊥',
      math: 'L = rp_\\perp = rmv_\\perp = mr^2\\omega',
      explanation: 'Angular momentum depends on mass, distance, and rotational speed'
    },
    {
      step: 4,
      title: 'Connecting Area and Angular Momentum',
      content: 'Substituting the angular momentum expression',
      math: '\\frac{dA}{dt} = \\frac{L}{2m}',
      explanation: 'Area sweeping rate is proportional to angular momentum'
    },
    {
      step: 5,
      title: 'Conservation Principle',
      content: 'Since no external torques act on the planet',
      math: 'L = \\text{constant} \\Rightarrow \\frac{dA}{dt} = \\text{constant}',
      explanation: 'Constant angular momentum means constant area sweeping rate'
    }
  ];

  const handleQuizSubmit = (answer: string) => {
    const correct = answer === 'A';
    setShowQuizResult(true);
    handleJudgingInteraction(answer, correct);
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Law of Areas: Angular Momentum Conservation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Kepler's Second Law - Equal areas swept in equal times
          </p>
        </div>

        {/* Core Concept */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            📐 The Law of Areas
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Statement</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                A line that connects a planet to the Sun sweeps out equal areas in the plane of the planet's orbit in equal time intervals.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <BlockMath math="\frac{dA}{dt} = \text{constant}" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Rate of area sweeping is constant
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Physical Meaning</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                <li>• Planets move faster when closer to the Sun</li>
                <li>• Planets move slower when farther from the Sun</li>
                <li>• Speed changes compensate for distance changes</li>
                <li>• Equivalent to conservation of angular momentum</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            🌍 Real-World Examples
          </h2>
          
          <TrackedInteraction
            interaction={slideInteractions[0]}
            onInteractionComplete={handleInteractionComplete}
            studentId="demo-student"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Example Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Select an Example
                </h3>
                <div className="space-y-3">
                  {examples.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => setSelectedExample(example.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedExample === example.id
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {example.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {example.setup}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Example Details */}
              {selectedExample && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {examples.find(e => e.id === selectedExample)?.title}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">Near Sun (Perihelion)</h4>
                        <p className="text-red-700 dark:text-red-300 text-sm">
                          {examples.find(e => e.id === selectedExample)?.nearSun}
                        </p>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Far from Sun (Aphelion)</h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                          {examples.find(e => e.id === selectedExample)?.farSun}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Explanation:</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {examples.find(e => e.id === selectedExample)?.explanation}
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Significance:</h4>
                      <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                        {examples.find(e => e.id === selectedExample)?.significance}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TrackedInteraction>
        </div>

        {/* Mathematical Derivation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            🧮 Connection to Angular Momentum
          </h2>
          
          <TrackedInteraction
            interaction={slideInteractions[1]}
            onInteractionComplete={handleInteractionComplete}
            studentId="demo-student"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Step Navigation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Derivation Steps
                </h3>
                <div className="space-y-2">
                  {derivationSteps.map((step) => (
                    <button
                      key={step.step}
                      onClick={() => setAnimationStep(step.step)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${
                        animationStep === step.step
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Step {step.step}: {step.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              {animationStep > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {derivationSteps[animationStep - 1]?.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {derivationSteps[animationStep - 1]?.content}
                  </p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                    <BlockMath math={derivationSteps[animationStep - 1]?.math || ''} />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    {derivationSteps[animationStep - 1]?.explanation}
                  </p>
                </div>
              )}
            </div>
          </TrackedInteraction>
        </div>

        {/* Physical Implications */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            ⚡ Physical Implications
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Speed Variation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Orbital speed inversely related to distance from central body
              </p>
              <BlockMath math="v \propto \frac{1}{r}" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Angular Momentum</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Conserved quantity in central force systems
              </p>
              <BlockMath math="L = mrv_\perp = \text{constant}" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Area Rate</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Constant area sweeping independent of orbit shape
              </p>
              <BlockMath math="\frac{dA}{dt} = \frac{L}{2m}" />
            </div>
          </div>
        </div>

        {/* Interactive Quiz */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Test Your Understanding
          </h3>
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              A comet is 4 times farther from the Sun at aphelion than at perihelion. How does its speed at aphelion compare to its speed at perihelion?
            </p>
            <div className="space-y-2">
              {[
                { id: 'A', text: '1/4 the speed (4 times slower)' },
                { id: 'B', text: '1/2 the speed (2 times slower)' },
                { id: 'C', text: '2 times the speed (2 times faster)' },
                { id: 'D', text: '4 times the speed (4 times faster)' }
              ].map((option) => (
                <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="areas-quiz"
                    value={option.id}
                    checked={quizAnswer === option.id}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    className="text-green-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option.id}. {option.text}</span>
                </label>
              ))}
            </div>
            {!showQuizResult && (
              <button
                onClick={() => handleQuizSubmit(quizAnswer)}
                disabled={!quizAnswer}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
              >
                Submit Answer
              </button>
            )}
            {showQuizResult && (
              <div className={`mt-4 p-4 rounded-lg ${quizAnswer === 'A' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                {quizAnswer === 'A'
                  ? 'Correct! From conservation of angular momentum: L = rmv = constant. If r increases by 4×, then v must decrease by 4× to keep L constant.'
                  : 'Incorrect. The correct answer is A. Angular momentum conservation means r₁v₁ = r₂v₂, so if distance increases 4×, speed decreases 4×.'}
              </div>
            )}
          </div>
        </div>

        {/* Modern Applications */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🚀 Modern Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Satellite Timing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Predicting when satellites will be at specific positions for communication windows.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Planetary Protection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calculating asteroid approach speeds and impact timing for defense planning.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Exoplanet Detection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Using transit timing variations to detect planets around other stars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="law-of-areas-angular-momentum"
      slideTitle="Law of Areas: Angular Momentum Conservation"
      moduleId="gravitation-0001"
      submoduleId="keplers-laws-orbital-mechanics"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 