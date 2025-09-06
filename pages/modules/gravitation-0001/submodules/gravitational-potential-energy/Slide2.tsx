import React, { useState } from 'react';
import { Interaction, InteractionResponse, TrackedInteraction, useJudgingInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function PotentialEnergySlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'multiple-particles',
      conceptId: 'multiple-particles-path-independence',
      conceptName: 'Multiple Particle Systems',
      type: 'learning',
      description: 'Explore gravitational potential energy in systems with multiple particles',
      conceptDescription: 'Understanding how to calculate total potential energy for multiple mass systems'
    },
    {
      id: 'path-independence-quiz',
      conceptId: 'multiple-particles-path-independence',
      conceptName: 'Path Independence',
      type: 'judging',
      description: 'Test understanding of path independence in gravitational fields',
      conceptDescription: 'Evaluating comprehension of conservative force properties'
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
      id: 'three-particles',
      title: 'Three Particle System',
      description: 'Calculate total potential energy for three masses at fixed positions',
      setup: 'Three masses: m₁, m₂, m₃ at distances r₁₂, r₁₃, r₂₃',
      formula: 'U = -G(\\frac{m_1m_2}{r_{12}} + \\frac{m_1m_3}{r_{13}} + \\frac{m_2m_3}{r_{23}})',
      insight: 'Sum of all pairwise interactions',
      details: 'Each pair of masses contributes independently to the total potential energy. No triple interactions exist in gravity.'
    },
    {
      id: 'earth-moon-sun',
      title: 'Earth-Moon-Sun System',
      description: 'Real astronomical system with three major bodies',
      setup: 'Simplified model treating each as point masses',
      formula: 'U = U_{EM} + U_{ES} + U_{MS}',
      insight: 'Each pair contributes independently',
      details: 'This system determines the stability of the Moon\'s orbit around Earth as it moves around the Sun.'
    },
    {
      id: 'hierarchical-system',
      title: 'Hierarchical Systems',
      description: 'Systems where some pairs dominate (like planetary systems)',
      setup: 'Planet-moon pair orbiting a star',
      formula: 'U ≈ U_{star-planet} + U_{planet-moon}',
      insight: 'Some interactions may be negligible',
      details: 'In many systems, distant interactions are much weaker and can often be ignored in first approximations.'
    }
  ];

  const handleQuizSubmit = (answer: string) => {
    const correct = answer === 'A';
    setShowQuizResult(true);
    handleJudgingInteraction(answer, correct);
  };

  return (
    <SlideComponentWrapper
      slideId="multiple-particles-path-independence"
      slideTitle="Multiple Particle Systems and Path Independence"
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
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Multiple Particle Systems</h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-lg">
                    For a system with multiple particles, we calculate the potential energy between each pair and sum them all. 
                    The gravitational interaction is purely pairwise - no triple or higher-order interactions exist.
                  </p>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-600">
                    <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2 text-center">General Formula</h4>
                    <div className="flex justify-center text-gray-800 dark:text-white mb-2">
                      <BlockMath math="U_{total} = \sum_{i<j} U_{ij} = -G\sum_{i<j} \frac{m_i m_j}{r_{ij}}" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
                      Sum over all unique pairs (i &lt; j)
                    </p>
                  </div>
                </div>
                
                {/* Key Principles */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Key Principles</h3>
                  
                  <ul className="grid grid-cols-1 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">Pairwise interactions:</span>{' '}
                        Each pair contributes independently
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">No triple interactions:</span>{' '}
                        Gravity only acts between pairs of masses
                      </div>
                    </li>
                    <li className="flex items-start p-2 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <div className="mr-2 mt-0.5 text-blue-400">•</div>
                      <div className="text-lg">
                        <span className="text-blue-400 dark:text-blue-300 font-medium">System property:</span>{' '}
                        Total energy belongs to the entire system
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Path Independence */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">Path Independence</h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-lg">
                    Gravitational force is conservative, meaning the work done depends only on initial and final positions, 
                    not the path taken. This is a fundamental property that allows us to define potential energy.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">Conservative Force</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">Work = U₁ - U₂ regardless of path</p>
                    </div>
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">Closed Loop</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">Net work around closed path = 0</p>
                    </div>
                    <div className="p-3 bg-gray-100/40 dark:bg-gray-800/40 rounded-md">
                      <h4 className="text-blue-400 dark:text-blue-300 font-medium text-lg mb-1">Energy Conservation</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">Total mechanical energy is conserved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Interactive Elements */}
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4">System Examples</h3>
              
              {/* Example selection */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4 border border-gray-300 dark:border-gray-700">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-2">Explore Different Systems:</h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                  Click on different examples to see how multiple particles interact
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  {examples.map((example) => (
                    <button
                      key={example.id}
                      className={`p-3 rounded-md text-left transition-all duration-300 ${
                        selectedExample === example.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedExample(example.id);
                        const response: InteractionResponse = {
                          interactionId: 'multiple-particles',
                          value: example.title,
                          timestamp: Date.now(),
                          conceptId: 'multiple-particles-path-independence',
                          conceptName: 'Multiple Particle Systems',
                          conceptDescription: `Explored ${example.title}: ${example.description}`
                        };
                        handleInteractionComplete(response);
                      }}
                    >
                      <div className="font-medium text-lg mb-1">{example.title}</div>
                      <div className="text-lg opacity-90">{example.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Example details */}
              {selectedExample && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700 mb-4">
                  <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">System Details</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">System: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                        {examples.find(e => e.id === selectedExample)?.title}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Setup: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {examples.find(e => e.id === selectedExample)?.setup}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Formula: </span>
                      <div className="text-gray-700 dark:text-gray-300 text-lg mt-1">
                        <InlineMath math={examples.find(e => e.id === selectedExample)?.formula || ''} />
                      </div>
                    </div>
                    <div className="p-3 bg-blue-100/40 dark:bg-blue-900/40 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Key Insight: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {examples.find(e => e.id === selectedExample)?.insight}
                      </span>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400 text-lg">Details: </span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {examples.find(e => e.id === selectedExample)?.details}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quiz */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                <h4 className="text-lg font-medium text-blue-400 dark:text-blue-300 mb-3">Test Your Understanding</h4>
                
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-3 text-lg">
                    If you move a mass from point A to point B in a gravitational field, what determines the work done?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'A', text: 'Only the initial and final positions' },
                      { id: 'B', text: 'The path taken between A and B' },
                      { id: 'C', text: 'The speed of the movement' },
                      { id: 'D', text: 'The time taken to move' }
                    ].map((option) => (
                      <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="path-independence-quiz"
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
                    <div className={`mt-4 p-4 rounded-lg ${quizAnswer === 'A' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                      <span className="text-lg">
                        {quizAnswer === 'A' 
                          ? 'Correct! Gravitational force is conservative, so work depends only on initial and final positions, not the path taken.' 
                          : 'Incorrect. The correct answer is A. Since gravity is a conservative force, only the start and end points matter for work calculation.'}
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