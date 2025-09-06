import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction, useJudgingInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function KeplersLawsSlide6() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [missionCalculatorValues, setMissionCalculatorValues] = useState({
    initialRadius: '8.0e6',     // m (from spacecraft example)
    speedReduction: '0.96',     // factor (96% of original)
    mass: '4500'                // kg (from spacecraft example)
  });
  const [calculatedResults, setCalculatedResults] = useState<{newPeriod?: number, newSemimajor?: number} | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showQuizResult, setShowQuizResult] = useState(false);

  const slideInteractions: Interaction[] = [
    {
      id: 'orbital-applications',
      conceptId: 'orbital-mechanics-applications',
      conceptName: 'Orbital Mechanics Applications',
      type: 'learning',
      description: 'Explore practical applications of orbital mechanics',
      conceptDescription: 'Understanding how Kepler\'s laws apply to real spacecraft missions and orbital maneuvers'
    },
    {
      id: 'mission-calculator',
      conceptId: 'orbital-mechanics-applications',
      conceptName: 'Orbital Mission Calculator',
      type: 'learning',
      description: 'Calculate orbital changes from spacecraft maneuvers',
      conceptDescription: 'Applying energy and orbital mechanics to model spacecraft trajectory changes'
    },
    {
      id: 'applications-quiz',
      conceptId: 'orbital-mechanics-applications',
      conceptName: 'Orbital Mechanics Understanding',
      type: 'judging',
      description: 'Test understanding of orbital mechanics applications',
      conceptDescription: 'Evaluating comprehension of real-world orbital mechanics scenarios'
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
      id: 'orbit-transfer',
      title: 'Orbital Transfer Maneuvers',
      description: 'Changing satellite orbits using thruster burns',
      example: 'Moving a satellite from LEO to GEO using Hohmann transfer',
      physics: 'Apply ΔV at specific points to change orbital energy and angular momentum',
      realWorld: 'GPS satellites, communication satellites, space station resupply missions'
    },
    {
      id: 'rendezvous-docking',
      title: 'Spacecraft Rendezvous and Docking',
      description: 'Precise orbital mechanics for spacecraft to meet in space',
      example: 'SpaceX Dragon capsule docking with International Space Station',
      physics: 'Coordinate orbital phases and timing using Kepler\'s laws',
      realWorld: 'ISS crew rotation, cargo delivery, satellite servicing missions'
    },
    {
      id: 'planetary-missions',
      title: 'Interplanetary Mission Design',
      description: 'Using gravitational assists and transfer orbits',
      example: 'Voyager missions using gravity assists from outer planets',
      physics: 'Combine Kepler\'s laws with gravitational slingshot effects',
      realWorld: 'Mars rovers, Jupiter probe missions, asteroid sample returns'
    },
    {
      id: 'constellation-design',
      title: 'Satellite Constellation Design',
      description: 'Coordinating multiple satellites for global coverage',
      example: 'Starlink constellation with thousands of satellites',
      physics: 'Use period relationships to maintain precise spacing and coverage',
      realWorld: 'GPS, internet satellites, Earth observation networks'
    }
  ];

  const calculateOrbitChange = () => {
    const G = 6.67e-11; // m³/kg·s²
    const M_earth = 5.98e24; // kg
    const r = parseFloat(missionCalculatorValues.initialRadius);
    const speedFactor = parseFloat(missionCalculatorValues.speedReduction);
    const m = parseFloat(missionCalculatorValues.mass);
    
    if (r && speedFactor && m) {
      // Original circular orbit
      const v_original = Math.sqrt(G * M_earth / r);
      const v_new = speedFactor * v_original;
      
      // New energy after thruster firing
      const K_new = 0.5 * m * v_new * v_new;
      const U_at_firing = -G * M_earth * m / r;
      const E_new = K_new + U_at_firing;
      
      // New semimajor axis from energy
      const a_new = -G * M_earth * m / (2 * E_new);
      
      // New period from Kepler's third law
      const T_new_seconds = 2 * Math.PI * Math.sqrt(Math.pow(a_new, 3) / (G * M_earth));
      const T_new_minutes = T_new_seconds / 60;
      
      setCalculatedResults({
        newPeriod: T_new_minutes,
        newSemimajor: a_new
      });
    }
  };

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
            Orbital Mechanics Applications
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Real-world applications of Kepler's laws in space missions
          </p>
        </div>

        {/* Spacecraft Example */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🚀 Sample Problem: Spacecraft Orbit Change
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Problem Setup</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                A 4.50 × 10³ kg spaceship is in a circular Earth orbit with radius 8.00 × 10⁶ m and period 118.6 min. 
                A thruster fires forward, reducing speed to 96.0% of original speed.
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>• Initial radius: r = 8.00 × 10⁶ m</li>
                <li>• Initial period: T₀ = 118.6 min</li>
                <li>• Speed after thruster: 96.0% of original</li>
                <li>• Find: New orbital period</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Solution Process</h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Step 1: Find new kinetic energy</h4>
                  <BlockMath math="K = \frac{1}{2}m(0.96v_0)^2" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Step 2: Calculate total energy</h4>
                  <BlockMath math="E = K + U = K - \frac{GMm}{r}" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Step 3: Find new semimajor axis</h4>
                  <BlockMath math="a = -\frac{GMm}{2E}" />
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 text-sm mb-1">Result:</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">New period T = 106 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Applications */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            🛰️ Applications Explorer
          </h2>
          
          <TrackedInteraction
            interaction={slideInteractions[0]}
            onInteractionComplete={handleInteractionComplete}
            studentId="demo-student"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Application Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Select an Application
                </h3>
                <div className="space-y-3">
                  {applications.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setSelectedApplication(app.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedApplication === app.id
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {app.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {app.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Application Details */}
              {selectedApplication && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {applications.find(a => a.id === selectedApplication)?.title}
                  </h3>
                  
                  {(() => {
                    const app = applications.find(a => a.id === selectedApplication);
                    if (!app) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Example:</h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {app.example}
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Physics Involved:</h4>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            {app.physics}
                          </p>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Real-World Examples:</h4>
                          <p className="text-green-700 dark:text-green-300 text-sm">
                            {app.realWorld}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </TrackedInteraction>
        </div>

        {/* Interactive Mission Calculator */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            🧮 Orbital Mission Calculator
          </h2>
          
          <TrackedInteraction
            interaction={slideInteractions[1]}
            onInteractionComplete={handleInteractionComplete}
            studentId="demo-student"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Mission Parameters</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Initial Orbital Radius (m)
                      </label>
                      <input
                        type="text"
                        value={missionCalculatorValues.initialRadius}
                        onChange={(e) => setMissionCalculatorValues(prev => ({...prev, initialRadius: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        placeholder="8.0e6"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Speed Reduction Factor (e.g., 0.96 for 96%)
                      </label>
                      <input
                        type="text"
                        value={missionCalculatorValues.speedReduction}
                        onChange={(e) => setMissionCalculatorValues(prev => ({...prev, speedReduction: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        placeholder="0.96"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Spacecraft Mass (kg)
                      </label>
                      <input
                        type="text"
                        value={missionCalculatorValues.mass}
                        onChange={(e) => setMissionCalculatorValues(prev => ({...prev, mass: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        placeholder="4500"
                      />
                    </div>
                    <button
                      onClick={calculateOrbitChange}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Calculate New Orbit
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Mission Results</h3>
                  {calculatedResults && (
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">New Orbital Parameters</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">New Semimajor Axis:</span>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                              {(calculatedResults.newSemimajor! / 1e6).toFixed(2)} × 10⁶ m
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">New Orbital Period:</span>
                            <span className="font-semibold text-red-600 dark:text-red-400">
                              {calculatedResults.newPeriod!.toFixed(1)} minutes
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Period Change:</span>
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              {(calculatedResults.newPeriod! - 118.6).toFixed(1)} minutes
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Analysis</h4>
                        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                          The thruster firing decreased orbital energy, resulting in a smaller, faster orbit. 
                          This demonstrates how spacecraft can use propulsion to change their orbital characteristics.
                        </p>
                      </div>
                    </div>
                  )}
                  {!calculatedResults && (
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center text-gray-500 dark:text-gray-500">
                      Enter mission parameters and calculate to see orbital changes
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Mission Design Principles */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🎯 Mission Design Principles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Energy Considerations</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                <li>• Higher orbits require more energy to reach</li>
                <li>• Orbital transfers use minimum energy trajectories</li>
                <li>• Gravity assists can provide "free" energy</li>
                <li>• Atmospheric drag slowly decreases orbital energy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Timing and Phases</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                <li>• Launch windows depend on orbital mechanics</li>
                <li>• Rendezvous requires precise timing calculations</li>
                <li>• Planetary alignments affect interplanetary missions</li>
                <li>• Orbital debris avoidance is increasingly important</li>
              </ul>
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
              Why does firing a thruster in the forward direction (against the velocity) cause a spacecraft to end up in a faster orbit?
            </p>
            <div className="space-y-2">
              {[
                { id: 'A', text: 'Reducing speed lowers the orbit, and lower orbits have higher orbital speeds' },
                { id: 'B', text: 'The thruster directly increases the orbital speed' },
                { id: 'C', text: 'Forward thrust always makes spacecraft go faster' },
                { id: 'D', text: 'It doesn\'t - the spacecraft ends up slower' }
              ].map((option) => (
                <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="applications-quiz"
                    value={option.id}
                    checked={quizAnswer === option.id}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    className="text-red-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option.id}. {option.text}</span>
                </label>
              ))}
            </div>
            {!showQuizResult && (
              <button
                onClick={() => handleQuizSubmit(quizAnswer)}
                disabled={!quizAnswer}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
              >
                Submit Answer
              </button>
            )}
            {showQuizResult && (
              <div className={`mt-4 p-4 rounded-lg ${quizAnswer === 'A' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                {quizAnswer === 'A'
                  ? 'Correct! Reducing speed at one point creates an elliptical orbit with a lower perigee. The average orbital speed increases because the spacecraft spends more time at lower altitudes where orbital speeds are higher.'
                  : 'Incorrect. The correct answer is A. Counter-intuitively, slowing down lowers the orbit, and lower orbits have higher average speeds due to stronger gravitational acceleration.'}
              </div>
            )}
          </div>
        </div>

        {/* Future of Orbital Mechanics */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🚀 Future of Space Exploration
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Mega-Constellations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Thousands of satellites working together require precise orbital mechanics to avoid collisions and maintain coverage.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Deep Space Missions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Missions to asteroids, outer planets, and eventually other star systems rely on advanced orbital mechanics.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Space Traffic Management</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Growing space debris requires sophisticated tracking and orbital prediction to keep spacecraft safe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="orbital-mechanics-applications"
      slideTitle="Orbital Mechanics Applications"
      moduleId="gravitation-0001"
      submoduleId="keplers-laws-orbital-mechanics"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 