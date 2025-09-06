import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction, useJudgingInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function KeplersLawsSlide5() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedOrbit, setSelectedOrbit] = useState<string | null>(null);
  const [energyCalculatorValues, setEnergyCalculatorValues] = useState({
    mass: '7.2',          // kg (bowling ball from example)
    altitude: '350000'    // m (350 km from example)
  });
  const [calculatedEnergies, setCalculatedEnergies] = useState<{K?: number, U?: number, E?: number} | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showQuizResult, setShowQuizResult] = useState(false);

  const slideInteractions: Interaction[] = [
    {
      id: 'orbital-energy-types',
      conceptId: 'satellite-orbital-energy',
      conceptName: 'Orbital Energy Components',
      type: 'learning',
      description: 'Explore the different energy components in satellite orbits',
      conceptDescription: 'Understanding kinetic, potential, and total energy in orbital mechanics'
    },
    {
      id: 'energy-calculator',
      conceptId: 'satellite-orbital-energy',
      conceptName: 'Orbital Energy Calculator',
      type: 'learning',
      description: 'Calculate orbital energies for satellites at different altitudes',
      conceptDescription: 'Applying energy formulas to real satellite scenarios'
    },
    {
      id: 'energy-quiz',
      conceptId: 'satellite-orbital-energy',
      conceptName: 'Orbital Energy Understanding',
      type: 'judging',
      description: 'Test understanding of energy relationships in orbits',
      conceptDescription: 'Evaluating comprehension of orbital energy conservation'
    }
  ];

  const handleJudgingInteraction = useJudgingInteraction();

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const orbitTypes = [
    {
      id: 'circular',
      name: 'Circular Orbit',
      description: 'Constant distance from central body, constant speed',
      energyRelations: {
        kinetic: 'K = \\frac{GMm}{2r}',
        potential: 'U = -\\frac{GMm}{r}',
        total: 'E = -\\frac{GMm}{2r}',
        relationship: 'E = -K = \\frac{U}{2}'
      },
      characteristics: [
        'Constant orbital speed',
        'Constant distance from center',
        'Kinetic energy = -½ × Potential energy',
        'Total energy = -Kinetic energy'
      ]
    },
    {
      id: 'elliptical',
      name: 'Elliptical Orbit',
      description: 'Varying distance and speed, but constant total energy',
      energyRelations: {
        kinetic: 'K = \\frac{1}{2}mv^2 \\text{ (varies)}',
        potential: 'U = -\\frac{GMm}{r} \\text{ (varies)}',
        total: 'E = -\\frac{GMm}{2a} \\text{ (constant)}',
        relationship: 'E \\text{ depends only on } a'
      },
      characteristics: [
        'Speed varies with position',
        'Faster at periapsis, slower at apoapsis',
        'Total energy depends only on semimajor axis',
        'Same energy for all orbits with same a'
      ]
    }
  ];

  const calculateEnergies = () => {
    const G = 6.67e-11; // m³/kg·s²
    const M_earth = 5.98e24; // kg
    const R_earth = 6.37e6; // m
    const m = parseFloat(energyCalculatorValues.mass);
    const h = parseFloat(energyCalculatorValues.altitude);
    const r = R_earth + h; // orbital radius
    
    if (m && h >= 0) {
      // For circular orbit
      const K = G * M_earth * m / (2 * r); // Kinetic energy
      const U = -G * M_earth * m / r;       // Potential energy
      const E = -G * M_earth * m / (2 * r); // Total energy
      
      setCalculatedEnergies({ K, U, E });
    }
  };

  const handleQuizSubmit = (answer: string) => {
    const correct = answer === 'C';
    setShowQuizResult(true);
    handleJudgingInteraction(answer, correct);
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Satellite Orbital Energy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Understanding energy relationships in gravitational orbits
          </p>
        </div>

        {/* Energy Fundamentals */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            ⚡ Energy Components in Orbits
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Kinetic Energy (K)</h3>
              <BlockMath math="K = \frac{1}{2}mv^2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Energy of motion - always positive
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Potential Energy (U)</h3>
              <BlockMath math="U = -\frac{GMm}{r}" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Gravitational binding energy - always negative
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Total Energy (E)</h3>
              <BlockMath math="E = K + U" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Mechanical energy - conserved in orbit
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Orbit Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            🛰️ Orbit Types and Energy Relationships
          </h2>
          
          <TrackedInteraction
            interaction={slideInteractions[0]}
            onInteractionComplete={handleInteractionComplete}
            studentId="demo-student"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Orbit Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Select Orbit Type
                </h3>
                <div className="space-y-3">
                  {orbitTypes.map((orbit) => (
                    <button
                      key={orbit.id}
                      onClick={() => setSelectedOrbit(orbit.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedOrbit === orbit.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {orbit.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {orbit.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Orbit Details */}
              {selectedOrbit && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {orbitTypes.find(o => o.id === selectedOrbit)?.name}
                  </h3>
                  
                  {(() => {
                    const orbit = orbitTypes.find(o => o.id === selectedOrbit);
                    if (!orbit) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Kinetic Energy</h4>
                            <BlockMath math={orbit.energyRelations.kinetic} />
                          </div>
                          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Potential Energy</h4>
                            <BlockMath math={orbit.energyRelations.potential} />
                          </div>
                          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Total Energy</h4>
                            <BlockMath math={orbit.energyRelations.total} />
                          </div>
                          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Key Relationship</h4>
                            <BlockMath math={orbit.energyRelations.relationship} />
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Characteristics</h4>
                          <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
                            {orbit.characteristics.map((char, index) => (
                              <li key={index}>• {char}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </TrackedInteraction>
        </div>

        {/* Bowling Ball Example */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🎳 Example: Bowling Ball in Orbit
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Problem Setup</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                An astronaut releases a 7.20 kg bowling ball into circular orbit about Earth at an altitude of 350 km.
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>• Mass: m = 7.20 kg</li>
                <li>• Altitude: h = 350 km</li>
                <li>• Orbital radius: r = 6.72 × 10⁶ m</li>
                <li>• Earth mass: M = 5.98 × 10²⁴ kg</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Calculated Results</h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Mechanical Energy</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">E = -214 MJ</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Energy to Reach Orbit</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">ΔE = 237 MJ</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>Note:</strong> The high cost of space access isn't due to energy requirements - it's engineering complexity!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Energy Calculator */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            🧮 Orbital Energy Calculator
          </h2>
          
          <TrackedInteraction
            interaction={slideInteractions[1]}
            onInteractionComplete={handleInteractionComplete}
            studentId="demo-student"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Input Parameters</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Satellite Mass (kg)
                      </label>
                      <input
                        type="text"
                        value={energyCalculatorValues.mass}
                        onChange={(e) => setEnergyCalculatorValues(prev => ({...prev, mass: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        placeholder="7.2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Altitude above Earth (m)
                      </label>
                      <input
                        type="text"
                        value={energyCalculatorValues.altitude}
                        onChange={(e) => setEnergyCalculatorValues(prev => ({...prev, altitude: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        placeholder="350000"
                      />
                    </div>
                    <button
                      onClick={calculateEnergies}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Calculate Orbital Energies
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Energy Results</h3>
                  {calculatedEnergies && (
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Energy Components</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Kinetic Energy (K):</span>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                              {(calculatedEnergies.K! / 1e6).toFixed(1)} MJ
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Potential Energy (U):</span>
                            <span className="font-semibold text-red-600 dark:text-red-400">
                              {(calculatedEnergies.U! / 1e6).toFixed(1)} MJ
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-700 dark:text-gray-300">Total Energy (E):</span>
                            <span className="font-semibold text-purple-600 dark:text-purple-400">
                              {(calculatedEnergies.E! / 1e6).toFixed(1)} MJ
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Verification</h4>
                        <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
                          <p>E = -K: {(calculatedEnergies.E! / 1e6).toFixed(1)} = -{(calculatedEnergies.K! / 1e6).toFixed(1)} ✓</p>
                          <p>K = -U/2: {(calculatedEnergies.K! / 1e6).toFixed(1)} = -{(calculatedEnergies.U! / 2e6).toFixed(1)} ✓</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {!calculatedEnergies && (
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center text-gray-500 dark:text-gray-500">
                      Enter values and calculate to see energy breakdown
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Energy Relationships */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            📊 Key Energy Relationships
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Circular Orbits</h3>
              <div className="space-y-2">
                <BlockMath math="K = \frac{GMm}{2r}" />
                <BlockMath math="U = -\frac{GMm}{r}" />
                <BlockMath math="E = -\frac{GMm}{2r}" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Notice: E = -K and K = -U/2
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Elliptical Orbits</h3>
              <div className="space-y-2">
                <BlockMath math="E = -\frac{GMm}{2a}" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total energy depends only on semimajor axis a, not eccentricity e
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  K and U vary with position, but E remains constant
                </p>
              </div>
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
              For a satellite in circular orbit, if the orbital radius is doubled, how does the total energy change?
            </p>
            <div className="space-y-2">
              {[
                { id: 'A', text: 'Total energy doubles' },
                { id: 'B', text: 'Total energy quadruples' },
                { id: 'C', text: 'Total energy is halved (becomes less negative)' },
                { id: 'D', text: 'Total energy remains the same' }
              ].map((option) => (
                <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="energy-quiz"
                    value={option.id}
                    checked={quizAnswer === option.id}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option.id}. {option.text}</span>
                </label>
              ))}
            </div>
            {!showQuizResult && (
              <button
                onClick={() => handleQuizSubmit(quizAnswer)}
                disabled={!quizAnswer}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Submit Answer
              </button>
            )}
            {showQuizResult && (
              <div className={`mt-4 p-4 rounded-lg ${quizAnswer === 'C' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                {quizAnswer === 'C'
                  ? 'Correct! Since E = -GMm/(2r), doubling r makes the total energy half as negative (closer to zero). The satellite is less tightly bound.'
                  : 'Incorrect. The correct answer is C. E = -GMm/(2r), so doubling r halves the magnitude of the negative energy.'}
              </div>
            )}
          </div>
        </div>

        {/* Applications */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🚀 Practical Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Launch Energy Requirements</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calculate the minimum energy needed to place satellites in specific orbits for mission planning.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Orbital Maneuvering</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Determine fuel requirements for changing satellite orbits and maintaining orbital positions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Space Debris Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monitor orbital decay and predict when space debris will reenter Earth's atmosphere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="satellite-orbital-energy"
      slideTitle="Satellite Orbital Energy"
      moduleId="gravitation-0001"
      submoduleId="keplers-laws-orbital-mechanics"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 