import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction, useJudgingInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function PotentialEnergySlide4() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState({
    initialSpeed: '12000',    // 12 km/s
    initialDistance: '6.67e7', // 10 Earth radii
    finalDistance: '6.37e6'   // Earth radius
  });
  const [calculatedSpeed, setCalculatedSpeed] = useState<number | null>(null);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'real-world-applications',
      conceptId: 'real-world-applications',
      conceptName: 'Gravitational Potential Energy Applications',
      type: 'learning',
      description: 'Explore real-world applications of gravitational potential energy',
      conceptDescription: 'Understanding how potential energy concepts apply to spacecraft, asteroids, and astronomical phenomena'
    },
    {
      id: 'asteroid-calculator',
      conceptId: 'real-world-applications',
      conceptName: 'Asteroid Impact Calculator',
      type: 'learning',
      description: 'Calculate how asteroid speeds change as they approach Earth',
      conceptDescription: 'Applying energy conservation to model incoming asteroids'
    },
    {
      id: 'applications-quiz',
      conceptId: 'real-world-applications',
      conceptName: 'Applications Understanding',
      type: 'judging',
      description: 'Test understanding of potential energy applications',
      conceptDescription: 'Evaluating comprehension of energy conservation in astronomical scenarios'
    }
  ];

  const handleJudgingInteraction = useJudgingInteraction();

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const applications = [
    {
      id: 'asteroid-impact',
      title: 'Asteroid Impact Analysis',
      description: 'Calculate how asteroid speeds increase as they approach Earth',
      scenario: 'An asteroid starts at 10 Earth radii with 12 km/s speed. What\'s its impact speed?',
      solution: 'Use energy conservation: ½mv₁² - GMm/r₁ = ½mv₂² - GMm/r₂',
      result: 'Impact speed ≈ 16 km/s - devastating potential!',
      realWorld: 'In 1994, an asteroid exploded above the South Pacific with nuclear-explosion energy',
      details: 'Asteroids gain tremendous speed as they fall into Earth\'s gravitational well, making even small objects extremely dangerous.'
    },
    {
      id: 'spacecraft-missions',
      title: 'Spacecraft Mission Planning',
      description: 'Determine fuel requirements for interplanetary travel',
      scenario: 'How much energy to send a 1000 kg probe from Earth to Mars?',
      solution: 'Calculate ΔU = U_final - U_initial for Earth-probe system',
      result: 'Requires ~60 GJ of energy - equivalent to 16 MWh of electricity',
      realWorld: 'NASA\'s Perseverance rover required similar energy calculations for Mars landing',
      details: 'Mission planners must calculate precise energy requirements to determine fuel loads and trajectory paths.'
    },
    {
      id: 'satellite-orbits',
      title: 'Satellite Orbital Mechanics',
      description: 'Understand energy requirements for different orbit altitudes',
      scenario: 'Compare energy to reach Low Earth Orbit vs Geostationary orbit',
      solution: 'Higher orbits have less negative (higher) potential energy',
      result: 'GEO satellites need ~6× more energy than LEO satellites',
      realWorld: 'Communication satellites use this principle for orbit selection',
      details: 'The energy difference between orbital altitudes determines satellite deployment costs and mission architecture.'
    },
    {
      id: 'planetary-formation',
      title: 'Planetary Formation',
      description: 'How gravitational binding energy shapes solar systems',
      scenario: 'Why do gas giants exist beyond the "frost line" in solar systems?',
      solution: 'Gravitational potential energy determines accretion efficiency',
      result: 'Stronger gravity in outer regions allows gas capture',
      realWorld: 'Explains the architecture of our solar system and exoplanets',
      details: 'The distribution of planetary types in solar systems is fundamentally governed by gravitational potential energy.'
    }
  ];

  const calculateImpactSpeed = () => {
    const G = 6.67e-11; // m³/kg·s²
    const M_earth = 5.98e24; // kg
    const v_i = parseFloat(calculatorValues.initialSpeed) * 1000; // convert km/s to m/s
    const r_i = parseFloat(calculatorValues.initialDistance);
    const r_f = parseFloat(calculatorValues.finalDistance);
    
    if (v_i && r_i && r_f) {
      // Energy conservation: ½mv₁² - GMm/r₁ = ½mv₂² - GMm/r₂
      // Solving for v₂: v₂² = v₁² + 2GM(1/r₂ - 1/r₁)
      const v_f_squared = Math.pow(v_i, 2) + 2 * G * M_earth * (1/r_f - 1/r_i);
      const v_f = Math.sqrt(v_f_squared);
      setCalculatedSpeed(v_f / 1000); // convert back to km/s
      
      const response: InteractionResponse = {
        interactionId: 'asteroid-calculator',
        value: `Calculated final speed = ${(v_f/1000).toFixed(2)} km/s`,
        timestamp: Date.now(),
        conceptId: 'real-world-applications',
        conceptName: 'Asteroid Impact Calculator',
        conceptDescription: `Calculated asteroid impact speed from ${r_i} m to ${r_f} m with initial speed ${v_i/1000} km/s`
      };
      handleInteractionComplete(response);
    }
  };

  const handleQuizSubmit = (answer: string) => {
    const correct = answer === 'C';
    setShowQuizResult(true);
    handleJudgingInteraction(answer, correct);
  };

  return (
    <SlideComponentWrapper
      slideId="real-world-applications"
      slideTitle="Real-World Applications: Asteroids and Spacecraft"
      moduleId="gravitation-0001"
      submoduleId="gravitational-potential-energy"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Explanation */}
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <div className="space-y-4">
                {/* Introduction */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Real-World Applications</h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-lg">
                    Gravitational potential energy principles are essential for understanding asteroid impacts, 
                    spacecraft missions, satellite deployment, and even the formation of planetary systems. 
                    Energy conservation allows us to predict speeds, trajectories, and energy requirements.
                  </p>
                </div>
                
                {/* Sample Problem */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Sample Problem: Asteroid Approach</h3>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-600 mb-3">
                    <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2">Problem Setup</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                      An asteroid heading toward Earth has a speed of 12 km/s when it's 10 Earth radii from Earth's center. 
                      What's its speed when it reaches Earth's surface?
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md">
                      <p className="text-gray-700 dark:text-gray-300 text-lg font-mono">
                        Given: v₁ = 12 km/s, r₁ = 10R_E, r₂ = R_E
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-600">
                    <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2">Energy Conservation Solution</h4>
                    <div className="text-center text-gray-800 dark:text-white mb-2">
                      <BlockMath math="\frac{1}{2}mv_1^2 - \frac{GMm}{r_1} = \frac{1}{2}mv_2^2 - \frac{GMm}{r_2}" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
                      Solving for v₂ gives impact speed ≈ 16 km/s
                    </p>
                  </div>
                </div>
                
                {/* Key Applications */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Key Application Areas</h3>
                  
                  <ul className="grid grid-cols-1 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Space missions:</span>{' '}
                        Calculating fuel requirements and trajectory planning
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Asteroid defense:</span>{' '}
                        Predicting impact energies and deflection strategies
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Satellite deployment:</span>{' '}
                        Understanding energy costs for different orbits
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Planetary science:</span>{' '}
                        Explaining solar system architecture and formation
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Interactive Elements */}
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Explore Applications</h3>
              
              {/* Application selection */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4 border border-gray-300 dark:border-gray-700">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2">Real-World Examples:</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                  Click on different applications to see how potential energy is used
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  {applications.map((app) => (
                    <button
                      key={app.id}
                      className={`p-3 rounded-md text-left transition-all duration-300 ${
                        selectedExample === app.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedExample(app.id);
                        const response: InteractionResponse = {
                          interactionId: 'real-world-applications',
                          value: app.title,
                          timestamp: Date.now(),
                          conceptId: 'real-world-applications',
                          conceptName: 'Gravitational Potential Energy Applications',
                          conceptDescription: `Explored ${app.title}: ${app.description}`
                        };
                        handleInteractionComplete(response);
                      }}
                    >
                      <div className="font-medium text-lg mb-1">{app.title}</div>
                      <div className="text-lg opacity-90">{app.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Application details */}
              {selectedExample && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700 mb-4">
                  <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">Application Details</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Application: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                        {applications.find(a => a.id === selectedExample)?.title}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Scenario: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {applications.find(a => a.id === selectedExample)?.scenario}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Solution Approach: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {applications.find(a => a.id === selectedExample)?.solution}
                      </span>
                    </div>
                    <div className="p-3 bg-blue-100/40 dark:bg-blue-900/40 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Result: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {applications.find(a => a.id === selectedExample)?.result}
                      </span>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Real Example: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {applications.find(a => a.id === selectedExample)?.realWorld}
                      </span>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Why It Matters: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {applications.find(a => a.id === selectedExample)?.details}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculator */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700 mb-4">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">Asteroid Impact Calculator</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 text-lg mb-1">Initial Speed (m/s):</label>
                    <input
                      type="text"
                      value={calculatorValues.initialSpeed}
                      onChange={(e) => setCalculatorValues({...calculatorValues, initialSpeed: e.target.value})}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 text-lg mb-1">Initial Distance (m):</label>
                    <input
                      type="text"
                      value={calculatorValues.initialDistance}
                      onChange={(e) => setCalculatorValues({...calculatorValues, initialDistance: e.target.value})}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 text-lg mb-1">Final Distance (m):</label>
                    <input
                      type="text"
                      value={calculatorValues.finalDistance}
                      onChange={(e) => setCalculatorValues({...calculatorValues, finalDistance: e.target.value})}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg"
                    />
                  </div>
                  <button
                    onClick={calculateImpactSpeed}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                  >
                    Calculate Final Speed
                  </button>
                  {calculatedSpeed !== null && (
                    <div className="mt-3 p-3 bg-blue-100/40 dark:bg-blue-900/40 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Final Speed: </span>
                      <span className="text-blue-600 dark:text-blue-400 text-lg font-bold">
                        {calculatedSpeed.toFixed(2)} km/s
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quiz */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">Test Your Understanding</h4>
                
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-3 text-lg">
                    Why do asteroids become more dangerous as they approach Earth?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'A', text: 'They heat up due to atmospheric friction' },
                      { id: 'B', text: 'Earth\'s magnetic field affects them' },
                      { id: 'C', text: 'They gain speed falling into Earth\'s gravitational well' },
                      { id: 'D', text: 'They break apart due to tidal forces' }
                    ].map((option) => (
                      <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="applications-quiz"
                          value={option.id}
                          checked={quizAnswer === option.id}
                          onChange={(e) => setQuizAnswer(e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-gray-700 dark:text-gray-300 text-lg">{option.id}. {option.text}</span>
                      </label>
                    ))}
                  </div>
                  {!showQuizResult && (
                    <button
                      onClick={() => handleQuizSubmit(quizAnswer)}
                      disabled={!quizAnswer}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors text-lg"
                    >
                      Submit Answer
                    </button>
                  )}
                  {showQuizResult && (
                    <div className={`mt-4 p-4 rounded-lg ${quizAnswer === 'C' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                      <span className="text-lg">
                        {quizAnswer === 'C' 
                          ? 'Correct! Asteroids convert gravitational potential energy to kinetic energy as they fall toward Earth, dramatically increasing their speed and impact energy.' 
                          : 'Incorrect. The correct answer is C. Energy conservation explains how asteroids gain tremendous speed as they fall into Earth\'s gravitational well.'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 