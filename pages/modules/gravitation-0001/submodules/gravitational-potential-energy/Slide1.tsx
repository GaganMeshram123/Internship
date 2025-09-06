import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function PotentialEnergySlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [calculatorValues, setCalculatorValues] = useState({
    mass1: '5.98e24', // Earth mass
    mass2: '1000',    // Satellite mass
    separation: '6.67e6' // Earth radius + 300km altitude
  });
  const [calculatedU, setCalculatedU] = useState<number | null>(null);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'potential-energy-concepts',
      conceptId: 'potential-energy-fundamentals',
      conceptName: 'Gravitational Potential Energy Basics',
      type: 'learning',
      description: 'Explore fundamental concepts of gravitational potential energy',
      conceptDescription: 'Understanding gravitational potential energy as stored energy in mass configurations'
    },
    {
      id: 'potential-energy-calculator',
      conceptId: 'potential-energy-fundamentals',
      conceptName: 'Gravitational Potential Energy Calculations',
      type: 'learning',
      description: 'Calculate gravitational potential energy for different mass systems',
      conceptDescription: 'Applying the gravitational potential energy formula to real scenarios'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const concepts = [
    {
      id: 'zero-reference',
      title: 'Zero Reference at Infinity',
      description: 'We set U = 0 when objects are infinitely far apart',
      explanation: 'This choice simplifies calculations and makes potential energy negative for bound systems',
      formula: 'U(∞) = 0',
      insight: 'This reference point makes bound systems have negative energy, which is physically meaningful.'
    },
    {
      id: 'negative-energy',
      title: 'Why Potential Energy is Negative',
      description: 'Bound systems have negative potential energy',
      explanation: 'Energy must be added to separate the masses to infinity, so bound energy is negative',
      formula: 'U < 0 \\text{ for bound systems}',
      insight: 'Negative energy indicates that work must be done to pull the objects apart.'
    },
    {
      id: 'work-energy',
      title: 'Work and Potential Energy',
      description: 'Potential energy equals negative work done by gravity',
      explanation: 'Work done against gravity increases potential energy',
      formula: '\\Delta U = -W_{gravity}',
      insight: 'When you lift an object, you do positive work and increase its potential energy.'
    },
    {
      id: 'conservative-force',
      title: 'Conservative Force Property',
      description: 'Gravitational force is conservative',
      explanation: 'Work depends only on initial and final positions, not the path taken',
      formula: 'W = U_i - U_f',
      insight: 'You get the same change in energy regardless of which path you take.'
    }
  ];

  const presetExamples = [
    {
      id: 'earth-satellite',
      name: 'Earth-Satellite System',
      mass1: '5.98e24',
      mass2: '1000',
      separation: '6.67e6',
      description: '1000 kg satellite at 300 km above Earth'
    },
    {
      id: 'earth-moon',
      name: 'Earth-Moon System',
      mass1: '5.98e24',
      mass2: '7.35e22',
      separation: '3.84e8',
      description: 'Earth and Moon at average distance'
    },
    {
      id: 'binary-star',
      name: 'Binary Star System',
      mass1: '2.0e30',
      mass2: '1.5e30',
      separation: '1.0e11',
      description: 'Two stars orbiting each other'
    }
  ];

  const calculatePotentialEnergy = () => {
    const G = 6.67e-11; // m³/kg·s²
    const m1 = parseFloat(calculatorValues.mass1);
    const m2 = parseFloat(calculatorValues.mass2);
    const r = parseFloat(calculatorValues.separation);
    
    if (m1 && m2 && r) {
      const U = -G * m1 * m2 / r;
      setCalculatedU(U);
      
      const response: InteractionResponse = {
        interactionId: 'potential-energy-calculator',
        value: `Calculated U = ${U.toExponential(3)} J`,
        timestamp: Date.now(),
        conceptId: 'potential-energy-fundamentals',
        conceptName: 'Gravitational Potential Energy Calculations',
        conceptDescription: `Calculated potential energy for m1=${m1} kg, m2=${m2} kg, r=${r} m`
      };
      handleInteractionComplete(response);
    }
  };

  const loadPresetExample = (example: any) => {
    setCalculatorValues({
      mass1: example.mass1,
      mass2: example.mass2,
      separation: example.separation
    });
    setCalculatedU(null);
  };

  return (
    <SlideComponentWrapper
      slideId="gravitational-potential-energy-fundamentals"
      slideTitle="Gravitational Potential Energy Fundamentals"
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
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Gravitational Potential Energy</h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-lg">
                    Gravitational potential energy represents the stored energy in a system of masses due to their gravitational interaction. 
                    It's the energy required to assemble the system from infinitely separated components.
                  </p>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-600">
                    <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2 text-center">Potential Energy Formula</h4>
                    <div className="flex justify-center text-gray-800 dark:text-white mb-2">
                      <BlockMath math="U = -\frac{GMm}{r}" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
                      Where G = gravitational constant, M & m = masses, r = separation distance
                    </p>
                  </div>
                </div>
                
                {/* Key Properties */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Key Properties</h3>
                  
                  <ul className="grid grid-cols-1 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Negative sign:</span>{' '}
                        Indicates bound systems have negative energy compared to separated masses
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">System property:</span>{' '}
                        Belongs to the two-mass system, not individual masses
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Reference point:</span>{' '}
                        Zero potential energy when masses are infinitely separated
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Energy vs Distance */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Energy vs Distance Relationship</h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">At r = ∞</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">U = 0 (reference point)</p>
                    </div>
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">As r decreases</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">U becomes more negative</p>
                    </div>
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">At r = 0</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">U → -∞ (unphysical)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Interactive Elements */}
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Explore Key Concepts</h3>
              
              {/* Concept selection */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4 border border-gray-300 dark:border-gray-700">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2">Understanding Potential Energy:</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                  Click on different concepts to deepen your understanding
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  {concepts.map((concept) => (
                    <button
                      key={concept.id}
                      className={`p-3 rounded-md text-left transition-all duration-300 ${
                        selectedConcept === concept.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedConcept(concept.id);
                        const response: InteractionResponse = {
                          interactionId: 'potential-energy-concepts',
                          value: concept.title,
                          timestamp: Date.now(),
                          conceptId: 'potential-energy-fundamentals',
                          conceptName: 'Gravitational Potential Energy Basics',
                          conceptDescription: `Explored ${concept.title}: ${concept.description}`
                        };
                        handleInteractionComplete(response);
                      }}
                    >
                      <div className="font-medium text-lg mb-1">{concept.title}</div>
                      <div className="text-lg opacity-90">{concept.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Concept details */}
              {selectedConcept && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700 mb-4">
                  <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">Concept Details</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Concept: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                        {concepts.find(c => c.id === selectedConcept)?.title}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Formula: </span>
                      <div className="text-gray-700 dark:text-gray-300 text-lg font-mono mt-1">
                        <InlineMath math={concepts.find(c => c.id === selectedConcept)?.formula || ''} />
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Explanation: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {concepts.find(c => c.id === selectedConcept)?.explanation}
                      </span>
                    </div>
                    <div className="p-3 bg-blue-100/40 dark:bg-blue-900/40 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Key Insight: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {concepts.find(c => c.id === selectedConcept)?.insight}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculator */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">Potential Energy Calculator</h4>
                
                {/* Preset examples */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Quick Examples:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {presetExamples.map((example) => (
                      <button
                        key={example.id}
                        onClick={() => loadPresetExample(example)}
                        className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-md text-left hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
                      >
                        <div className="font-medium text-gray-700 dark:text-gray-300 text-lg">{example.name}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-lg">{example.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 text-lg mb-1">Mass 1 (kg):</label>
                    <input
                      type="text"
                      value={calculatorValues.mass1}
                      onChange={(e) => setCalculatorValues({...calculatorValues, mass1: e.target.value})}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 text-lg mb-1">Mass 2 (kg):</label>
                    <input
                      type="text"
                      value={calculatorValues.mass2}
                      onChange={(e) => setCalculatorValues({...calculatorValues, mass2: e.target.value})}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 text-lg mb-1">Separation (m):</label>
                    <input
                      type="text"
                      value={calculatorValues.separation}
                      onChange={(e) => setCalculatorValues({...calculatorValues, separation: e.target.value})}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg"
                    />
                  </div>
                  <button
                    onClick={calculatePotentialEnergy}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                  >
                    Calculate Potential Energy
                  </button>
                  {calculatedU !== null && (
                    <div className="mt-3 p-3 bg-blue-100/40 dark:bg-blue-900/40 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Result: </span>
                      <span className="text-blue-600 dark:text-blue-400 text-lg font-bold">
                        U = {calculatedU.toExponential(3)} J
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