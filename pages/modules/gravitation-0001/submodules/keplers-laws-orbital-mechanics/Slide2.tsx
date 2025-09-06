import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction, useJudgingInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function KeplersLawsSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showQuizResult, setShowQuizResult] = useState(false);

  const slideInteractions: Interaction[] = [
    {
      id: 'planetary-orbits',
      conceptId: 'law-of-orbits-elliptical-paths',
      conceptName: 'Planetary Orbital Elements',
      type: 'learning',
      description: 'Explore the elliptical orbits of planets in our solar system',
      conceptDescription: 'Understanding eccentricity, semimajor axis, and orbital geometry'
    },
    {
      id: 'orbital-elements',
      conceptId: 'law-of-orbits-elliptical-paths',
      conceptName: 'Orbital Element Definitions',
      type: 'learning',
      description: 'Learn about the key parameters that define elliptical orbits',
      conceptDescription: 'Exploring semimajor axis, eccentricity, perihelion, and aphelion'
    },
    {
      id: 'ellipse-quiz',
      conceptId: 'law-of-orbits-elliptical-paths',
      conceptName: 'Elliptical Orbit Understanding',
      type: 'judging',
      description: 'Test understanding of elliptical orbital geometry',
      conceptDescription: 'Evaluating comprehension of orbital elements and their relationships'
    }
  ];

  const handleJudgingInteraction = useJudgingInteraction();

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const planets = [
    {
      id: 'mercury',
      name: 'Mercury',
      semimajorAxis: '5.79 × 10¹⁰ m',
      eccentricity: '0.206',
      perihelion: '4.60 × 10¹⁰ m',
      aphelion: '6.98 × 10¹⁰ m',
      description: 'Most eccentric planetary orbit in our solar system',
      significance: 'Large eccentricity creates significant temperature variations'
    },
    {
      id: 'earth',
      name: 'Earth',
      semimajorAxis: '1.50 × 10¹¹ m',
      eccentricity: '0.0167',
      perihelion: '1.47 × 10¹¹ m',
      aphelion: '1.52 × 10¹¹ m',
      description: 'Nearly circular orbit with very low eccentricity',
      significance: 'Stable climate due to nearly constant distance from Sun'
    },
    {
      id: 'mars',
      name: 'Mars',
      semimajorAxis: '2.28 × 10¹¹ m',
      eccentricity: '0.0934',
      perihelion: '2.07 × 10¹¹ m',
      aphelion: '2.49 × 10¹¹ m',
      description: 'Moderately eccentric orbit that puzzled early astronomers',
      significance: 'Elliptical orbit was key to Kepler\'s discovery'
    },
    {
      id: 'pluto',
      name: 'Pluto',
      semimajorAxis: '5.90 × 10¹² m',
      eccentricity: '0.249',
      perihelion: '4.44 × 10¹² m',
      aphelion: '7.36 × 10¹² m',
      description: 'Highly eccentric orbit of the former ninth planet',
      significance: 'Sometimes closer to Sun than Neptune due to high eccentricity'
    }
  ];

  const orbitalElements = [
    {
      id: 'semimajor-axis',
      name: 'Semimajor Axis (a)',
      definition: 'Half the longest diameter of the ellipse',
      formula: 'a = \\frac{R_p + R_a}{2}',
      significance: 'Determines the size of the orbit and orbital period',
      explanation: 'The average distance between the planet and the Sun. Larger semimajor axis means longer orbital period.'
    },
    {
      id: 'eccentricity',
      name: 'Eccentricity (e)',
      definition: 'Measure of how elongated the ellipse is',
      formula: 'e = \\frac{ea}{a} = \\frac{a - R_p}{a}',
      significance: 'Determines orbit shape: e=0 (circle), e→1 (very elongated)',
      explanation: 'Values between 0 and 1. Most planetary orbits have low eccentricity (nearly circular).'
    },
    {
      id: 'perihelion',
      name: 'Perihelion (Rₚ)',
      definition: 'Closest approach distance to the Sun',
      formula: 'R_p = a(1 - e)',
      significance: 'Point of maximum orbital speed and minimum potential energy',
      explanation: 'Planet moves fastest at perihelion due to conservation of energy and angular momentum.'
    },
    {
      id: 'aphelion',
      name: 'Aphelion (Rₐ)',
      definition: 'Farthest distance from the Sun',
      formula: 'R_a = a(1 + e)',
      significance: 'Point of minimum orbital speed and maximum potential energy',
      explanation: 'Planet moves slowest at aphelion. For circular orbits, perihelion equals aphelion.'
    }
  ];

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
            Law of Orbits: Elliptical Paths
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Kepler's First Law - All planets move in elliptical orbits with the Sun at one focus
          </p>
        </div>

        {/* Kepler's First Law */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🌍 The Revolutionary Discovery
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Before Kepler</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                <li>• Planets were thought to move in perfect circles</li>
                <li>• Complex epicycle systems tried to explain observations</li>
                <li>• Circular motion was considered "divine" and perfect</li>
                <li>• Models couldn't accurately predict planetary positions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Kepler's Insight</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                <li>• Orbits are ellipses, not circles</li>
                <li>• Sun is located at one focus of each ellipse</li>
                <li>• Simple geometric shapes explain complex motion</li>
                <li>• Mathematical precision replaced philosophical assumptions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Orbital Elements */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            📐 Orbital Elements Explorer
          </h2>
          
          <TrackedInteraction
            interaction={slideInteractions[1]}
            onInteractionComplete={handleInteractionComplete}
            studentId="demo-student"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Element Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Orbital Elements
                </h3>
                <div className="space-y-3">
                  {orbitalElements.map((element) => (
                    <button
                      key={element.id}
                      onClick={() => setSelectedElement(element.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedElement === element.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {element.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {element.definition}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Element Details */}
              {selectedElement && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {orbitalElements.find(e => e.id === selectedElement)?.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Mathematical Formula:</h4>
                      <BlockMath math={orbitalElements.find(e => e.id === selectedElement)?.formula || ''} />
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Physical Significance:</h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        {orbitalElements.find(e => e.id === selectedElement)?.significance}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Explanation:</h4>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        {orbitalElements.find(e => e.id === selectedElement)?.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TrackedInteraction>
        </div>

        {/* Planetary Orbits Comparison */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            🪐 Solar System Orbits
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
                <div className="space-y-3">
                  {planets.map((planet) => (
                    <button
                      key={planet.id}
                      onClick={() => setSelectedPlanet(planet.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedPlanet === planet.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 dark:border-orange-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                            {planet.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            e = {planet.eccentricity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-orange-600 dark:text-orange-400">
                            Eccentricity
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Planet Details */}
              {selectedPlanet && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {planets.find(p => p.id === selectedPlanet)?.name} Orbital Data
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-500">Semimajor Axis</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                          {planets.find(p => p.id === selectedPlanet)?.semimajorAxis}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-500">Eccentricity</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                          {planets.find(p => p.id === selectedPlanet)?.eccentricity}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-500">Perihelion</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                          {planets.find(p => p.id === selectedPlanet)?.perihelion}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-500">Aphelion</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                          {planets.find(p => p.id === selectedPlanet)?.aphelion}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Characteristics:</h4>
                      <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
                        {planets.find(p => p.id === selectedPlanet)?.description}
                      </p>
                      <p className="text-orange-700 dark:text-orange-300 text-sm">
                        <strong>Impact:</strong> {planets.find(p => p.id === selectedPlanet)?.significance}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TrackedInteraction>
        </div>

        {/* Ellipse vs Circle Comparison */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            ⭕ Ellipse vs Circle: Key Differences
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Circle (e = 0)</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>• Center is equidistant from all points</li>
                <li>• Constant distance from central body</li>
                <li>• Constant orbital speed</li>
                <li>• Radius = semimajor axis = semiminor axis</li>
                <li>• Perihelion = Aphelion</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Ellipse (0 &lt; e &lt; 1)</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>• Two foci, central body at one focus</li>
                <li>• Distance varies from perihelion to aphelion</li>
                <li>• Speed varies (faster when closer)</li>
                <li>• Semimajor axis &gt; semiminor axis</li>
                <li>• Perihelion &lt; Aphelion</li>
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
              A planet has a semimajor axis of 2 AU and an eccentricity of 0.5. What is its aphelion distance?
            </p>
            <div className="space-y-2">
              {[
                { id: 'A', text: '1.0 AU' },
                { id: 'B', text: '2.0 AU' },
                { id: 'C', text: '3.0 AU' },
                { id: 'D', text: '4.0 AU' }
              ].map((option) => (
                <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="ellipse-quiz"
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
                  ? 'Correct! Using Ra = a(1 + e) = 2(1 + 0.5) = 3.0 AU. The aphelion is the farthest point from the Sun.'
                  : 'Incorrect. The correct answer is C. Aphelion distance = a(1 + e) = 2 × 1.5 = 3.0 AU.'}
              </div>
            )}
          </div>
        </div>

        {/* Key Formulas Summary */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            📝 Key Orbital Relationships
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Distance Relationships</h3>
              <div className="space-y-2">
                <BlockMath math="R_p = a(1 - e)" />
                <BlockMath math="R_a = a(1 + e)" />
                <BlockMath math="a = \frac{R_p + R_a}{2}" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Eccentricity</h3>
              <div className="space-y-2">
                <BlockMath math="e = \frac{R_a - R_p}{R_a + R_p}" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Range: 0 ≤ e &lt; 1 for bound orbits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="law-of-orbits-elliptical-paths"
      slideTitle="Law of Orbits: Elliptical Paths"
      moduleId="gravitation-0001"
      submoduleId="keplers-laws-orbital-mechanics"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 