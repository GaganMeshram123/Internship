import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction, useJudgingInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function PotentialEnergySlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState({
    mass: '5.98e24',     // Earth mass
    radius: '6.37e6'     // Earth radius
  });
  const [calculatedEscape, setCalculatedEscape] = useState<number | null>(null);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'escape-speed-exploration',
      conceptId: 'escape-speed-energy-conservation',
      conceptName: 'Escape Speed Concepts',
      type: 'learning',
      description: 'Explore escape speed for different astronomical bodies',
      conceptDescription: 'Understanding minimum speed needed to escape gravitational influence'
    },
    {
      id: 'escape-speed-calculator',
      conceptId: 'escape-speed-energy-conservation',
      conceptName: 'Escape Speed Calculations',
      type: 'learning',
      description: 'Calculate escape speeds for various celestial objects',
      conceptDescription: 'Applying escape speed formula to real astronomical bodies'
    },
    {
      id: 'energy-conservation-quiz',
      conceptId: 'escape-speed-energy-conservation',
      conceptName: 'Energy Conservation',
      type: 'judging',
      description: 'Test understanding of energy conservation in escape scenarios',
      conceptDescription: 'Evaluating comprehension of mechanical energy conservation'
    }
  ];

  const handleJudgingInteraction = useJudgingInteraction();

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const celestialBodies = [
    {
      id: 'earth',
      name: 'Earth',
      mass: '5.98 × 10²⁴ kg',
      radius: '6.37 × 10⁶ m',
      escapeSpeed: '11.2 km/s',
      description: 'Our home planet - rockets need this speed to leave Earth completely',
      comparison: 'About 25,000 mph - faster than any car!',
      details: 'This is why space missions require such powerful rockets to escape Earth\'s gravitational well.'
    },
    {
      id: 'moon',
      name: 'Earth\'s Moon',
      mass: '7.36 × 10²² kg',
      radius: '1.74 × 10⁶ m',
      escapeSpeed: '2.38 km/s',
      description: 'Much lower escape speed made Apollo missions possible',
      comparison: '5× smaller than Earth - you could throw a baseball to escape!',
      details: 'The low escape velocity is why the Apollo lunar modules could launch from the Moon with minimal fuel.'
    },
    {
      id: 'sun',
      name: 'Sun',
      mass: '1.99 × 10³⁰ kg',
      radius: '6.96 × 10⁸ m',
      escapeSpeed: '618 km/s',
      description: 'Enormous escape speed due to Sun\'s immense mass',
      comparison: '55× Earth\'s escape speed - nothing escapes except solar wind!',
      details: 'Even light takes tremendous energy to escape the Sun\'s surface - this is why stars shine.'
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      mass: '1.90 × 10²⁷ kg',
      radius: '7.15 × 10⁷ m',
      escapeSpeed: '59.5 km/s',
      description: 'Gas giant with very high escape speed',
      comparison: '5× Earth\'s escape speed - difficult to escape!',
      details: 'Jupiter\'s high escape velocity helps it retain its massive atmosphere of hydrogen and helium.'
    },
    {
      id: 'neutron-star',
      name: 'Neutron Star',
      mass: '2 × 10³⁰ kg',
      radius: '1 × 10⁴ m',
      escapeSpeed: '200,000 km/s',
      description: 'Incredibly dense object with extreme escape speed',
      comparison: '67% the speed of light - approaching black hole territory!',
      details: 'At these extreme conditions, general relativity effects become important and classical mechanics breaks down.'
    }
  ];

  const calculateEscapeSpeed = () => {
    const G = 6.67e-11; // m³/kg·s²
    const M = parseFloat(calculatorValues.mass);
    const R = parseFloat(calculatorValues.radius);
    
    if (M && R) {
      const v_escape = Math.sqrt(2 * G * M / R);
      setCalculatedEscape(v_escape);
      
      const response: InteractionResponse = {
        interactionId: 'escape-speed-calculator',
        value: `Calculated escape speed = ${(v_escape/1000).toFixed(2)} km/s`,
        timestamp: Date.now(),
        conceptId: 'escape-speed-energy-conservation',
        conceptName: 'Escape Speed Calculations',
        conceptDescription: `Calculated escape speed for M=${M} kg, R=${R} m`
      };
      handleInteractionComplete(response);
    }
  };

  const handleQuizSubmit = (answer: string) => {
    const correct = answer === 'B';
    setShowQuizResult(true);
    handleJudgingInteraction(answer, correct);
  };

  return (
    <SlideComponentWrapper
      slideId="escape-speed-energy-conservation"
      slideTitle="Escape Speed and Energy Conservation"
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
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Escape Speed</h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-lg">
                    Escape speed is the minimum speed needed for an object to completely escape the gravitational 
                    influence of a celestial body. It's derived using energy conservation principles.
                  </p>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-600">
                    <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2 text-center">Escape Speed Formula</h4>
                    <div className="flex justify-center text-gray-800 dark:text-white mb-2">
                      <BlockMath math="v_{escape} = \sqrt{\frac{2GM}{R}}" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
                      Where G = gravitational constant, M = body mass, R = body radius
                    </p>
                  </div>
                </div>
                
                {/* Derivation */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Energy Conservation Derivation</h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">At Surface (r = R)</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">E = ½mv² - GMm/R</p>
                    </div>
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">At Infinity (r = ∞)</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">E = 0 + 0 = 0</p>
                    </div>
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">Energy Conservation</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">E_surface = E_infinity</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-3 bg-blue-100/40 dark:bg-blue-900/40 rounded-md">
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      Setting ½mv² - GMm/R = 0 and solving for v gives us the escape speed formula.
                    </p>
                  </div>
                </div>
                
                {/* Key Insights */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Key Properties</h3>
                  
                  <ul className="grid grid-cols-1 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Independent of mass:</span>{' '}
                        Escape speed doesn't depend on the escaping object's mass
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Direction independent:</span>{' '}
                        Any direction works as long as you reach escape speed
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Energy threshold:</span>{' '}
                        Represents minimum kinetic energy needed for escape
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
              <h3 className="text-xl font-bold text-blue-400 mb-4">Explore Celestial Bodies</h3>
              
              {/* Body selection */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4 border border-gray-300 dark:border-gray-700">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2">Compare Escape Speeds:</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                  Click on different celestial bodies to compare their escape velocities
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  {celestialBodies.map((body) => (
                    <button
                      key={body.id}
                      className={`p-3 rounded-md text-left transition-all duration-300 ${
                        selectedBody === body.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedBody(body.id);
                        const response: InteractionResponse = {
                          interactionId: 'escape-speed-exploration',
                          value: body.name,
                          timestamp: Date.now(),
                          conceptId: 'escape-speed-energy-conservation',
                          conceptName: 'Escape Speed Concepts',
                          conceptDescription: `Explored ${body.name}: ${body.description}`
                        };
                        handleInteractionComplete(response);
                      }}
                    >
                      <div className="font-medium text-lg mb-1">{body.name}</div>
                      <div className="text-lg opacity-90 mb-1">Escape Speed: {body.escapeSpeed}</div>
                      <div className="text-lg opacity-75">{body.comparison}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Body details */}
              {selectedBody && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700 mb-4">
                  <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">Detailed Properties</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Object: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                        {celestialBodies.find(b => b.id === selectedBody)?.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Mass: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {celestialBodies.find(b => b.id === selectedBody)?.mass}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Radius: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {celestialBodies.find(b => b.id === selectedBody)?.radius}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Escape Speed: </span>
                      <span className="text-blue-400 dark:text-blue-300 text-lg font-bold">
                        {celestialBodies.find(b => b.id === selectedBody)?.escapeSpeed}
                      </span>
                    </div>
                    <div className="p-3 bg-blue-100/40 dark:bg-blue-900/40 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Details: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {celestialBodies.find(b => b.id === selectedBody)?.details}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculator */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700 mb-4">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">Escape Speed Calculator</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 text-lg mb-1">Mass (kg):</label>
                    <input
                      type="text"
                      value={calculatorValues.mass}
                      onChange={(e) => setCalculatorValues({...calculatorValues, mass: e.target.value})}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 text-lg mb-1">Radius (m):</label>
                    <input
                      type="text"
                      value={calculatorValues.radius}
                      onChange={(e) => setCalculatorValues({...calculatorValues, radius: e.target.value})}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg"
                    />
                  </div>
                  <button
                    onClick={calculateEscapeSpeed}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                  >
                    Calculate Escape Speed
                  </button>
                  {calculatedEscape !== null && (
                    <div className="mt-3 p-3 bg-blue-100/40 dark:bg-blue-900/40 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Result: </span>
                      <span className="text-blue-600 dark:text-blue-400 text-lg font-bold">
                        v_escape = {(calculatedEscape/1000).toFixed(2)} km/s
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
                    Which of these affects the escape speed from a planet?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'A', text: 'The mass of the escaping object' },
                      { id: 'B', text: 'The planet\'s mass and radius' },
                      { id: 'C', text: 'The direction of launch' },
                      { id: 'D', text: 'The time of day' }
                    ].map((option) => (
                      <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="escape-speed-quiz"
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
                    <div className={`mt-4 p-4 rounded-lg ${quizAnswer === 'B' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                      <span className="text-lg">
                        {quizAnswer === 'B' 
                          ? 'Correct! Escape speed depends only on the planet\'s mass and radius, not on the escaping object or launch direction.' 
                          : 'Incorrect. The correct answer is B. Escape speed is determined by the gravitational body\'s mass and radius through the formula v = √(2GM/R).'}
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