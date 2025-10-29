import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { QuizRenderer, QuizConfig } from '../../../common-components/QuizRenderer';
import { useThemeContext } from '@/lib/ThemeContext';

// Force demonstration components
const MuscularForceDemo = ({ isActive }: { isActive: boolean }) => (
  <div className="relative h-48 bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden mx-auto">
    {/* Person */}
    <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
      <div className="w-12 h-16 bg-gradient-to-b from-orange-300 to-orange-500 rounded-t-full"></div>
      <div className="w-10 h-12 bg-blue-600 rounded mx-1"></div>
      <div className="flex gap-1 justify-center">
        <div className="w-3 h-8 bg-orange-400 rounded"></div>
        <div className="w-3 h-8 bg-orange-400 rounded"></div>
      </div>
    </div>
    
    {/* Box being pushed */}
    <motion.div
      className="absolute top-1/2 transform -translate-y-1/2 w-12 h-12 bg-amber-700 border-2 border-amber-900 rounded"
      initial={{ x: 90 }}
      animate={{ x: isActive ? 180 : 90 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
    
    {/* Force arrow */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute top-1/2 left-24 transform -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg width="60" height="30">
            <defs>
              <marker id="arrowhead-muscular" markerWidth="12" markerHeight="12" refX="11" refY="4" orient="auto">
                <polygon points="0 0, 12 4, 0 8" fill="#dc2626" />
              </marker>
            </defs>
            <line x1="8" y1="15" x2="52" y2="15" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrowhead-muscular)" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
    
    <div className="absolute bottom-2 left-2 text-xs font-medium text-slate-600 dark:text-slate-400">
      Direct Contact Required
    </div>
  </div>
);

const FrictionalForceDemo = ({ isActive }: { isActive: boolean }) => (
  <div className="relative h-48 bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden mx-auto">
    {/* Surface */}
    <div className="absolute bottom-12 left-0 right-0 h-3 bg-gray-600"></div>
    
    {/* Sliding object */}
    <motion.div
      className="absolute bottom-15 w-16 h-10 bg-blue-600 rounded"
      initial={{ x: 30 }}
      animate={{ x: isActive ? 150 : 30 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />
    
    {/* Friction force arrow */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute bottom-20 left-36 transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg width="60" height="30">
            <defs>
              <marker id="arrowhead-friction" markerWidth="12" markerHeight="12" refX="11" refY="4" orient="auto">
                <polygon points="0 0, 12 4, 0 8" fill="#dc2626" />
              </marker>
            </defs>
            <line x1="52" y1="15" x2="8" y2="15" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrowhead-friction)" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
    
    <div className="absolute bottom-2 left-2 text-xs font-medium text-slate-600 dark:text-slate-400">
      Surfaces in Contact
    </div>
  </div>
);

const GravitationalForceDemo = ({ isActive }: { isActive: boolean }) => (
  <div className="relative h-48 bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden mx-auto">
    {/* Earth */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-t from-green-600 to-blue-400 rounded-t-full"></div>
    
    {/* Falling object */}
    <motion.div
      className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full"
      initial={{ y: 30 }}
      animate={{ y: isActive ? 130 : 30 }}
      transition={{ duration: 1.5, ease: "easeIn" }}
    />
    
    {/* Gravitational field lines */}
    <AnimatePresence>
      {isActive && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${35 + i * 15}%`, top: '30px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <svg width="3" height="80">
                <line x1="1.5" y1="0" x2="1.5" y2="80" stroke="#10b981" strokeWidth="3" strokeDasharray="4,4" />
                <polygon points="0 72, 3 72, 1.5 80" fill="#10b981" />
              </svg>
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
    
    <div className="absolute bottom-2 left-2 text-xs font-medium text-slate-600 dark:text-slate-400">
      No Contact Required
    </div>
  </div>
);

const MagneticForceDemo = ({ isActive }: { isActive: boolean }) => (
  <div className="relative h-48 bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden mx-auto">
    {/* Magnet */}
    <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
      <div className="w-10 h-20 bg-red-600 rounded-l border-3 border-gray-800"></div>
      <div className="absolute top-0 left-10 w-10 h-20 bg-blue-600 rounded-r border-3 border-gray-800"></div>
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-sm font-bold text-white">N</div>
      <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-sm font-bold text-white">S</div>
    </div>
    
    {/* Iron object */}
    <motion.div
      className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-600 border-3 border-gray-800 rounded"
      initial={{ x: 180 }}
      animate={{ x: isActive ? 120 : 180 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
    
    {/* Magnetic field lines */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute top-1/2 left-32 transform -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg width="80" height="60">
            <path d="M 15 30 Q 40 15 65 30" stroke="#8b5cf6" strokeWidth="3" fill="none" strokeDasharray="3,3" />
            <path d="M 15 30 Q 40 45 65 30" stroke="#8b5cf6" strokeWidth="3" fill="none" strokeDasharray="3,3" />
            <path d="M 15 30 Q 40 8 65 30" stroke="#8b5cf6" strokeWidth="3" fill="none" strokeDasharray="3,3" />
            <path d="M 15 30 Q 40 52 65 30" stroke="#8b5cf6" strokeWidth="3" fill="none" strokeDasharray="3,3" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
    
    <div className="absolute bottom-2 left-2 text-xs font-medium text-slate-600 dark:text-slate-400">
      Acts Through Space
    </div>
  </div>
);

const ElectrostaticForceDemo = ({ isActive }: { isActive: boolean }) => (
  <div className="relative h-48 bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden mx-auto">
    {/* Charged objects */}
    <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full border-3 border-yellow-600 flex items-center justify-center">
      <span className="text-lg font-bold">+</span>
    </div>
    
    <motion.div
      className="absolute top-1/2 transform -translate-y-1/2 w-12 h-12 bg-blue-400 rounded-full border-3 border-blue-600 flex items-center justify-center"
      initial={{ x: 180 }}
      animate={{ x: isActive ? 90 : 180 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <span className="text-lg font-bold text-white">-</span>
    </motion.div>
    
    {/* Electric field lines */}
    <AnimatePresence>
      {isActive && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-24 transform -translate-y-1/2"
              style={{ top: `${35 + i * 20}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <svg width="60" height="30">
                <line x1="8" y1="15" x2="52" y2="15" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3,3" />
                <polygon points="44 12, 52 15, 44 18" fill="#f59e0b" />
              </svg>
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
    
    <div className="absolute bottom-2 left-2 text-xs font-medium text-slate-600 dark:text-slate-400">
      Electric Fields
    </div>
  </div>
);

export default function TypesOfForcesSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const { isDarkMode } = useThemeContext();
  const [selectedForceType, setSelectedForceType] = useState<string>('');
  const [activeDemo, setActiveDemo] = useState<string>('');

  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'force-types-exploration',
      conceptId: 'force-types',
      conceptName: 'Force Types Exploration',
      type: 'learning',
      description: 'Understanding different types of forces through interactive examples'
    },
    {
      id: 'contact-vs-noncontact',
      conceptId: 'contact-forces',
      conceptName: 'Contact vs Non-Contact Forces',
      type: 'learning',
      description: 'Distinguishing between contact and non-contact forces'
    }
  ];

  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const contactForces = [
    {
      id: 'muscular',
      name: 'Muscular Force',
      description: 'Force applied by muscles of humans or animals.',
      component: MuscularForceDemo,
      color: 'bg-red-50 dark:bg-red-900/30 border-red-400'
    },
    {
      id: 'frictional',
      name: 'Frictional Force',
      description: 'Force that opposes motion between two surfaces in contact.',
      component: FrictionalForceDemo,
      color: 'bg-orange-50 dark:bg-orange-900/30 border-orange-400'
    }
  ];

  const nonContactForces = [
    {
      id: 'gravitational',
      name: 'Gravitational Force',
      description: 'Attractive force between objects with mass.',
      component: GravitationalForceDemo,
      color: 'bg-green-50 dark:bg-green-900/30 border-green-400'
    },
    {
      id: 'magnetic',
      name: 'Magnetic Force',
      description: 'Force of attraction or repulsion between magnets or magnetic materials.',
      component: MagneticForceDemo,
      color: 'bg-purple-50 dark:bg-purple-900/30 border-purple-400'
    },
    {
      id: 'electrostatic',
      name: 'Electrostatic Force',
      description: 'Force between electrically charged objects.',
      component: ElectrostaticForceDemo,
      color: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-400'
    }
  ];

  const handleForceSelection = (forceId: string) => {
    setActiveDemo(forceId);
    setSelectedForceType(forceId);
    
    handleInteractionComplete({
      interactionId: 'force-types-exploration',
      value: forceId,
      timestamp: Date.now(),
      conceptId: 'force-types',
      conceptName: 'Force Types Exploration',
      conceptDescription: `Explored ${forceId} force demonstration`
    });

    // Auto-stop demo after 3 seconds
    setTimeout(() => {
      setActiveDemo('');
    }, 3000);
  };

  // Quiz configuration
  const quizConfig: QuizConfig = {
    questions: [
      {
        id: 'contact-force-definition',
        question: 'What is the main characteristic of contact forces?',
        options: [
          'They act over long distances',
          'They require direct physical contact between objects',
          'They only work in space',
          'They are always stronger than non-contact forces'
        ],
        correctAnswer: 'They require direct physical contact between objects',
        explanation: 'Contact forces result from direct physical contact between objects. The objects must be touching for the force to be applied.'
      },
      {
        id: 'non-contact-force-example',
        question: 'Which of these is an example of a non-contact force?',
        options: [
          'Pushing a door',
          'Gravity pulling an apple down',
          'Friction stopping a car',
          'Lifting a heavy box'
        ],
        correctAnswer: 'Gravity pulling an apple down',
        explanation: 'Gravity is a non-contact force that acts across distance without requiring physical touch. It can pull objects towards Earth even when they are not in contact with the ground.'
      },
      {
        id: 'force-classification',
        question: 'How are forces classified in the main categorization?',
        options: [
          'Strong and weak forces',
          'Fast and slow forces',
          'Contact and non-contact forces',
          'Big and small forces'
        ],
        correctAnswer: 'Contact and non-contact forces',
        explanation: 'Forces are primarily classified into two main types: contact forces (requiring direct physical contact) and non-contact forces (acting across distance without contact).'
      },
      {
        id: 'electromagnetic-basis',
        question: 'According to the lesson, what are contact forces ultimately due to?',
        options: [
          'Gravitational interactions',
          'Electromagnetic interactions at the atomic level',
          'Nuclear forces',
          'Mechanical energy'
        ],
        correctAnswer: 'Electromagnetic interactions at the atomic level',
        explanation: 'Contact forces result from direct physical contact between objects, which is ultimately due to electromagnetic interactions at the atomic level between the atoms of the touching objects.'
      }
    ],
    title: 'Quick Check',
    conceptId: 'force-types-understanding',
    conceptName: 'Types of Forces Quick Check',
    conceptDescription: 'Testing understanding of contact and non-contact forces',
    showProgress: true
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content and Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                Forces can be divided into two main types based on whether the objects are touching or not touching each other.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Contact Force Vs Non-Contact Force</h4>
                <p className="text-blue-700 dark:text-blue-300">
                  The key difference is whether physical contact is required for the force to act.
                </p>
              </div>

              {/* Contact Forces Section */}
              <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-lg text-red-700 dark:text-red-300 mb-3">Contact Forces</h4>
                <p className="text-red-600 dark:text-red-400 mb-4">
                  Result from direct physical contact between objects (ultimately due to electromagnetic interactions at the atomic level).
                </p>
                
                <div className="space-y-3">
                  {contactForces.map((force) => (
                    <div key={force.id} className="bg-white dark:bg-slate-700 p-3 rounded border-l-4 border-red-400">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {contactForces.indexOf(force) + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-700 dark:text-red-300">{force.name}</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{force.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Contact Forces Section */}
              <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-lg text-green-700 dark:text-green-300 mb-3">Non-Contact Forces</h4>
                <p className="text-green-600 dark:text-green-400 mb-4">
                  Forces that act across a distance without requiring physical contact.
                </p>
                
                <div className="space-y-3">
                  {nonContactForces.map((force) => (
                    <div key={force.id} className="bg-white dark:bg-slate-700 p-3 rounded border-l-4 border-green-400">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {nonContactForces.indexOf(force) + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-green-700 dark:text-green-300">{force.name}</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{force.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Demonstrations and Quiz */}
        <div className="space-y-6">
          
          {/* Interactive Force Demonstrations */}
          <TrackedInteraction
            interaction={slideInteractions[0]}
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Interactive Force Demonstrations</h3>
              <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">Click on any force type to see it in action!</p>
              
              {/* Contact Forces Demos */}
              <div className="mb-6">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3">Contact Forces</h4>
                <div className="space-y-3">
                  {contactForces.map((force) => (
                    <div key={force.id}>
                      <button
                        onClick={() => handleForceSelection(force.id)}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          selectedForceType === force.id
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                            : 'border-slate-300 dark:border-slate-600 hover:border-red-300'
                        }`}
                      >
                        <div className="font-medium text-red-700 dark:text-red-300">{force.name}</div>
                      </button>
                      {selectedForceType === force.id && (
                        <div className="mt-4 flex justify-center">
                          <div className="w-full max-w-md">
                            <force.component isActive={activeDemo === force.id} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Contact Forces Demos */}
              <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">Non-Contact Forces</h4>
                <div className="space-y-3">
                  {nonContactForces.map((force) => (
                    <div key={force.id}>
                      <button
                        onClick={() => handleForceSelection(force.id)}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          selectedForceType === force.id
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                            : 'border-slate-300 dark:border-slate-600 hover:border-green-300'
                        }`}
                      >
                        <div className="font-medium text-green-700 dark:text-green-300">{force.name}</div>
                      </button>
                      {selectedForceType === force.id && (
                        <div className="mt-4 flex justify-center">
                          <div className="w-full max-w-md">
                            <force.component isActive={activeDemo === force.id} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TrackedInteraction>

          <QuizRenderer
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="types-of-forces"
      slideTitle="Types of Forces"
      moduleId="6-icse-physics-force"
      submoduleId="types-of-forces"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}