import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ThirdLawForcePairsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedExample, setSelectedExample] = useState<string>('apple-earth');
  const [selectedConcept, setSelectedConcept] = useState<string>('force-pairs');
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'third-law-concept',
      conceptId: 'third-law-understanding',
      conceptName: 'Newton\'s Third Law in Gravitation',
      type: 'learning',
      description: 'Understanding equal and opposite gravitational forces'
    },
    {
      id: 'force-pairs-examples',
      conceptId: 'force-pairs-examples',
      conceptName: 'Gravitational Force Pair Examples',
      type: 'learning',
      description: 'Exploring different gravitational force pair scenarios'
    },
    {
      id: 'acceleration-differences',
      conceptId: 'acceleration-differences',
      conceptName: 'Different Accelerations from Equal Forces',
      type: 'learning',
      description: 'Understanding why equal forces produce different accelerations'
    }
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Force pair examples
  const examples = [
    {
      id: 'apple-earth',
      title: 'Apple-Earth System',
      object1: 'Apple (0.1 kg)',
      object2: 'Earth (5.97 × 10²⁴ kg)',
      force: '0.98 N',
      acceleration1: '9.8 m/s²',
      acceleration2: '1.6 × 10⁻²⁵ m/s²',
      description: 'When an apple falls, it pulls up on Earth with the same force that Earth pulls down on it',
      insight: 'We only notice the apple\'s motion because Earth\'s mass is so enormous'
    },
    {
      id: 'student-earth',
      title: 'Student-Earth System',
      object1: 'Student (70 kg)',
      object2: 'Earth (5.97 × 10²⁴ kg)',
      force: '686 N',
      acceleration1: '9.8 m/s²',
      acceleration2: '1.1 × 10⁻²³ m/s²',
      description: 'You pull up on Earth with your weight force while Earth pulls down on you',
      insight: 'Your gravitational effect on Earth is real but immeasurably small'
    },
    {
      id: 'moon-earth',
      title: 'Moon-Earth System',
      object1: 'Moon (7.35 × 10²² kg)',
      object2: 'Earth (5.97 × 10²⁴ kg)',
      force: '1.98 × 10²⁰ N',
      acceleration1: '2.7 × 10⁻³ m/s²',
      acceleration2: '3.3 × 10⁻⁵ m/s²',
      description: 'The Moon and Earth pull on each other with equal force, causing orbital motion',
      insight: 'Both objects orbit around their common center of mass (barycenter)'
    },
    {
      id: 'binary-stars',
      title: 'Binary Star System',
      object1: 'Star A (2 × 10³⁰ kg)',
      object2: 'Star B (1 × 10³⁰ kg)',
      force: '6.7 × 10²⁵ N',
      acceleration1: '3.4 × 10⁻⁵ m/s²',
      acceleration2: '6.7 × 10⁻⁵ m/s²',
      description: 'Two stars in a binary system exert equal gravitational forces on each other',
      insight: 'The less massive star has a larger orbital radius and higher acceleration'
    }
  ];

  // Key concepts about third law
  const concepts = [
    {
      id: 'force-pairs',
      title: 'Equal and Opposite Forces',
      description: 'Every gravitational force has an equal and opposite reaction force',
      details: [
        'Forces always come in pairs (action-reaction)',
        'Both forces have exactly the same magnitude',
        'Forces act on different objects',
        'Forces point in opposite directions'
      ]
    },
    {
      id: 'same-force-different-acceleration',
      title: 'Same Force, Different Acceleration',
      description: 'Equal forces produce different accelerations on different masses',
      details: [
        'Newton\'s second law: F = ma',
        'Same force F, different mass m → different acceleration a',
        'Smaller mass experiences larger acceleration',
        'This explains why we see the apple fall, not Earth move'
      ]
    },
    {
      id: 'mutual-attraction',
      title: 'Mutual Attraction',
      description: 'All objects with mass attract each other mutually',
      details: [
        'There is no "active" vs "passive" mass',
        'Every mass creates a gravitational field',
        'Every mass responds to gravitational fields',
        'The interaction is truly mutual and simultaneous'
      ]
    }
  ];

  const currentExample = examples.find(ex => ex.id === selectedExample) || examples[0];
  const currentConcept = concepts.find(c => c.id === selectedConcept) || concepts[0];

  return (
    <SlideComponentWrapper
      slideId="third-law-force-pairs"
      slideTitle="Newton's Third Law and Gravitational Force Pairs"
      moduleId="gravitation-0001"
      submoduleId="newtons-law-of-gravitation"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-2rem)]">
          
          {/* Left column - Theory and Concepts */}
          <div className="space-y-6">
            {/* Newton's Third Law Introduction */}
            <TrackedInteraction 
              interaction={slideInteractions[0]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Newton's Third Law in Gravitation
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">The Law</h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                      "For every action, there is an equal and opposite reaction"
                    </p>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="text-lg font-medium text-yellow-700 dark:text-yellow-300 mb-2">In Gravitation</h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      When object A gravitationally attracts object B, object B simultaneously attracts object A with an equal force in the opposite direction.
                    </p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <BlockMath math="|\vec{F}_{AB}| = |\vec{F}_{BA}|" />
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                      Forces are equal in magnitude, opposite in direction
                    </p>
                  </div>
                </div>
              </div>
            </TrackedInteraction>

            {/* Key Concepts */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Key Concepts
              </h4>
              
              <div className="space-y-3">
                {concepts.map((concept) => (
                  <motion.button
                    key={concept.id}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                      selectedConcept === concept.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => {
                      setSelectedConcept(concept.id);
                      const response: InteractionResponse = {
                        interactionId: 'third-law-concept',
                        value: concept.title,
                        timestamp: Date.now(),
                        conceptId: 'third-law-understanding',
                        conceptName: 'Newton\'s Third Law in Gravitation',
                        conceptDescription: `Explored concept: ${concept.title}`
                      };
                      handleInteractionComplete(response);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-medium text-lg">{concept.title}</div>
                    <div className="text-sm opacity-90">{concept.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Selected Concept Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedConcept}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800"
              >
                <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  {currentConcept.title}
                </h4>
                
                <div className="space-y-3">
                  {currentConcept.details.map((detail, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">{detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right column - Examples */}
          <div className="space-y-6">
            {/* Example Selection */}
            <TrackedInteraction 
              interaction={slideInteractions[1]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Force Pair Examples
                </h4>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {examples.map((example) => (
                    <motion.button
                      key={example.id}
                      className={`p-3 rounded-lg text-left transition-all duration-300 ${
                        selectedExample === example.id
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedExample(example.id);
                        const response: InteractionResponse = {
                          interactionId: 'force-pairs-examples',
                          value: example.title,
                          timestamp: Date.now(),
                          conceptId: 'force-pairs-examples',
                          conceptName: 'Gravitational Force Pair Examples',
                          conceptDescription: `Explored example: ${example.title}`
                        };
                        handleInteractionComplete(response);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium text-lg">{example.title}</div>
                    </motion.button>
                  ))}
                </div>

                {/* Current Example Details */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedExample}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800"
                  >
                    <h5 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                      {currentExample.title}
                    </h5>
                    
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        {currentExample.description}
                      </p>

                      <div className="grid grid-cols-1 gap-4">
                        {/* Force Information */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                          <h6 className="font-medium text-green-600 dark:text-green-400 mb-2">Force Pair</h6>
                          <div className="text-lg text-gray-700 dark:text-gray-300">
                            <div className="flex justify-between items-center mb-2">
                              <span>{currentExample.object1}</span>
                              <span className="font-bold text-blue-600">←{currentExample.force}→</span>
                              <span>{currentExample.object2}</span>
                            </div>
                            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                              Equal forces in opposite directions
                            </div>
                          </div>
                        </div>

                        {/* Acceleration Information */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                          <h6 className="font-medium text-green-600 dark:text-green-400 mb-2">Resulting Accelerations</h6>
                          <div className="text-lg text-gray-700 dark:text-gray-300 space-y-2">
                            <div className="flex justify-between">
                              <span>{currentExample.object1.split(' ')[0]}:</span>
                              <span className="font-mono">{currentExample.acceleration1}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{currentExample.object2.split(' ')[0]}:</span>
                              <span className="font-mono">{currentExample.acceleration2}</span>
                            </div>
                          </div>
                        </div>

                        {/* Insight */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <h6 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">Key Insight</h6>
                          <p className="text-lg text-gray-700 dark:text-gray-300">
                            {currentExample.insight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </TrackedInteraction>

            {/* Why We Don't Notice Earth's Motion */}
            <TrackedInteraction 
              interaction={slideInteractions[2]} 
              onInteractionComplete={handleInteractionComplete}
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Why Don't We Notice Earth's Motion?
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h5 className="font-medium text-red-600 dark:text-red-400 mb-2">Newton's Second Law</h5>
                    <div className="text-center">
                      <BlockMath math="a = \frac{F}{m}" />
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 text-center mt-2">
                      Same force, different mass → different acceleration
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Mass Ratio Example (Apple-Earth)</h5>
                    <div className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Apple mass:</span>
                        <span className="font-mono">0.1 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Earth mass:</span>
                        <span className="font-mono">5.97 × 10²⁴ kg</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Mass ratio:</span>
                        <span className="font-mono">6 × 10²⁵ : 1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acceleration ratio:</span>
                        <span className="font-mono">6 × 10²⁵ : 1</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      <strong>Result:</strong> Earth's acceleration is so tiny compared to the apple's that we can't measure it. 
                      The apple falls at 9.8 m/s² while Earth "falls" toward the apple at only 1.6 × 10⁻²⁵ m/s²!
                    </p>
                  </div>
                </div>
              </div>
            </TrackedInteraction>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 