import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction, useJudgingInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function KeplersLawsSlide4() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [calculatorValues, setCalculatorValues] = useState({
    mass: '1.99e30',    // Sun mass
    semimajorAxis: '1.5e11'  // Earth's orbit
  });
  const [calculatedPeriod, setCalculatedPeriod] = useState<number | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showQuizResult, setShowQuizResult] = useState(false);

  const slideInteractions: Interaction[] = [
    {
      id: 'planetary-periods',
      conceptId: 'law-of-periods-relationship',
      conceptName: 'Planetary Period Analysis',
      type: 'learning',
      description: 'Explore the relationship between orbital periods and distances in our solar system',
      conceptDescription: 'Understanding how Kepler\'s third law applies to real planetary data'
    },
    {
      id: 'period-calculator',
      conceptId: 'law-of-periods-relationship',
      conceptName: 'Orbital Period Calculator',
      type: 'learning',
      description: 'Calculate orbital periods using Kepler\'s third law',
      conceptDescription: 'Applying the T²∝a³ relationship to determine orbital characteristics'
    },
    {
      id: 'periods-quiz',
      conceptId: 'law-of-periods-relationship',
      conceptName: 'Law of Periods Understanding',
      type: 'judging',
      description: 'Test understanding of the period-distance relationship',
      conceptDescription: 'Evaluating comprehension of Kepler\'s third law applications'
    }
  ];

  const handleJudgingInteraction = useJudgingInteraction();

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Data from the provided content
  const solarSystemData = [
    {
      planet: 'Mercury',
      semimajorAxis: 5.79,  // 10^10 m
      period: 0.241,        // years
      t2OverA3: 2.99        // 10^-34 y²/m³
    },
    {
      planet: 'Venus',
      semimajorAxis: 10.8,
      period: 0.615,
      t2OverA3: 3.00
    },
    {
      planet: 'Earth',
      semimajorAxis: 15.0,
      period: 1.00,
      t2OverA3: 2.96
    },
    {
      planet: 'Mars',
      semimajorAxis: 22.8,
      period: 1.88,
      t2OverA3: 2.98
    },
    {
      planet: 'Jupiter',
      semimajorAxis: 77.8,
      period: 11.9,
      t2OverA3: 3.01
    },
    {
      planet: 'Saturn',
      semimajorAxis: 143,
      period: 29.5,
      t2OverA3: 2.98
    },
    {
      planet: 'Uranus',
      semimajorAxis: 287,
      period: 84.0,
      t2OverA3: 2.98
    },
    {
      planet: 'Neptune',
      semimajorAxis: 450,
      period: 165,
      t2OverA3: 2.99
    }
  ];

  const calculatePeriod = () => {
    const G = 6.67e-11; // m³/kg·s²
    const M = parseFloat(calculatorValues.mass);
    const a = parseFloat(calculatorValues.semimajorAxis);
    
    if (M && a) {
      // T² = (4π²/GM) × a³
      const T_squared = (4 * Math.PI * Math.PI / (G * M)) * Math.pow(a, 3);
      const T_seconds = Math.sqrt(T_squared);
      const T_years = T_seconds / (365.25 * 24 * 3600); // Convert to years
      setCalculatedPeriod(T_years);
    }
  };

  const handleQuizSubmit = (answer: string) => {
    const correct = answer === 'B';
    setShowQuizResult(true);
    handleJudgingInteraction(answer, correct);
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Law of Periods: The T²∝a³ Relationship
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Kepler's Third Law - Connecting orbital size to orbital time
          </p>
        </div>

        {/* Core Formula */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🔢 Kepler's Third Law
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Mathematical Statement</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                <BlockMath math="T^2 = \frac{4\pi^2}{GM} a^3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  T = orbital period, a = semimajor axis, M = central mass
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <BlockMath math="T^2 \propto a^3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Proportional relationship for same central body
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Physical Meaning</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                <li>• Larger orbits take longer to complete</li>
                <li>• Period increases faster than distance (T² vs a³)</li>
                <li>• Relationship depends only on central mass</li>
                <li>• Universal law - works for any orbital system</li>
                <li>• Allows calculation of periods from distances</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Solar System Data */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            🌌 Solar System Verification
          </h2>
          
          <TrackedInteraction
            interaction={slideInteractions[0]}
            onInteractionComplete={handleInteractionComplete}
            studentId="demo-student"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Planet Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Select a Planet
                </h3>
                <div className="space-y-2">
                  {solarSystemData.map((data) => (
                    <button
                      key={data.planet}
                      onClick={() => setSelectedPlanet(data.planet)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${
                        selectedPlanet === data.planet
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {data.planet}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            a = {data.semimajorAxis} × 10¹⁰ m
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-purple-600 dark:text-purple-400 font-semibold">
                            T = {data.period} yr
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            T²/a³ = {data.t2OverA3}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Planet Analysis */}
              {selectedPlanet && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {selectedPlanet} Analysis
                  </h3>
                  
                  {(() => {
                    const planetData = solarSystemData.find(p => p.planet === selectedPlanet);
                    if (!planetData) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-500">Semimajor Axis</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {planetData.semimajorAxis} × 10¹⁰ m
                            </p>
                          </div>
                          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-500">Period</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {planetData.period} years
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Kepler's Constant</h4>
                          <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
                            T²/a³ = {planetData.t2OverA3} × 10⁻³⁴ y²/m³
                          </p>
                          <p className="text-purple-700 dark:text-purple-300 text-xs">
                            Notice how this ratio is nearly constant for all planets!
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Comparison to Earth</h4>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            Distance: {(planetData.semimajorAxis / 15.0).toFixed(2)}× Earth's distance
                          </p>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            Period: {planetData.period.toFixed(2)}× Earth's period
                          </p>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            Expected from T²∝a³: {Math.pow(planetData.semimajorAxis / 15.0, 1.5).toFixed(2)}×
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

        {/* Interactive Calculator */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            🧮 Orbital Period Calculator
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
                        Central Mass (kg) - e.g., Sun: 1.99×10³⁰
                      </label>
                      <input
                        type="text"
                        value={calculatorValues.mass}
                        onChange={(e) => setCalculatorValues(prev => ({...prev, mass: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        placeholder="1.99e30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Semimajor Axis (m) - e.g., Earth: 1.5×10¹¹
                      </label>
                      <input
                        type="text"
                        value={calculatorValues.semimajorAxis}
                        onChange={(e) => setCalculatorValues(prev => ({...prev, semimajorAxis: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        placeholder="1.5e11"
                      />
                    </div>
                    <button
                      onClick={calculatePeriod}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Calculate Orbital Period
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Results</h3>
                  {calculatedPeriod !== null && (
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        <strong>Orbital Period:</strong>
                      </p>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                        T = {calculatedPeriod.toFixed(2)} years
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>• In days: {(calculatedPeriod * 365.25).toFixed(0)} days</p>
                        <p>• In seconds: {(calculatedPeriod * 365.25 * 24 * 3600).toExponential(2)} s</p>
                        <p>• Compared to Earth: {calculatedPeriod.toFixed(1)}× Earth's period</p>
                      </div>
                    </div>
                  )}
                  {calculatedPeriod === null && (
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center text-gray-500 dark:text-gray-500">
                      Enter values and calculate to see results
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Comet Halley Example */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            ☄️ Comet Halley Example
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Given Information</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                <li>• Period: T = 76 years</li>
                <li>• Perihelion: Rₚ = 8.9 × 10¹⁰ m</li>
                <li>• Find: Aphelion distance Rₐ</li>
              </ul>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Solution Steps:</h4>
                <div className="space-y-2">
                  <BlockMath math="a = \left(\frac{GMT^2}{4\pi^2}\right)^{1/3}" />
                  <BlockMath math="R_a = 2a - R_p" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Calculated Results</h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Semimajor Axis</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">a = 2.7 × 10¹² m</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Aphelion Distance</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Rₐ = 5.3 × 10¹² m</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Eccentricity</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">e = 0.97 (very elongated!)</p>
                </div>
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
              If an asteroid has 4 times the semimajor axis of Earth's orbit, what is its orbital period?
            </p>
            <div className="space-y-2">
              {[
                { id: 'A', text: '4 years' },
                { id: 'B', text: '8 years' },
                { id: 'C', text: '16 years' },
                { id: 'D', text: '64 years' }
              ].map((option) => (
                <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="periods-quiz"
                    value={option.id}
                    checked={quizAnswer === option.id}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    className="text-purple-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option.id}. {option.text}</span>
                </label>
              ))}
            </div>
            {!showQuizResult && (
              <button
                onClick={() => handleQuizSubmit(quizAnswer)}
                disabled={!quizAnswer}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
              >
                Submit Answer
              </button>
            )}
            {showQuizResult && (
              <div className={`mt-4 p-4 rounded-lg ${quizAnswer === 'B' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                {quizAnswer === 'B'
                  ? 'Correct! From T²∝a³: If a increases by 4×, then T² increases by 4³ = 64×, so T increases by √64 = 8×. Period = 8 years.'
                  : 'Incorrect. The correct answer is B. Using T²∝a³: if semimajor axis increases 4×, period increases by 4^(3/2) = 8×.'}
              </div>
            )}
          </div>
        </div>

        {/* Applications */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🌟 Modern Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Exoplanet Discovery</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Using transit timing and radial velocity data to determine orbital periods and distances of planets around other stars.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Satellite Design</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Engineers use Kepler's laws to design satellite constellations with specific orbital periods for GPS and communication.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Asteroid Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Predicting when potentially hazardous asteroids will return and calculating their orbital characteristics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="law-of-periods-relationship"
      slideTitle="Law of Periods: The T²∝a³ Relationship"
      moduleId="gravitation-0001"
      submoduleId="keplers-laws-orbital-mechanics"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 