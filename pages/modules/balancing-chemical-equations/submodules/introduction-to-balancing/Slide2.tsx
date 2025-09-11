import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function GoldenRuleOfBalancingSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentExample, setCurrentExample] = useState(0);
  const [showAtomTracker, setShowAtomTracker] = useState(true);

  // Examples of unbalanced vs balanced equations
  const examples = [
    {
      unbalanced: "H_2 + O_2 \\rightarrow H_2O",
      balanced: "2H_2 + O_2 \\rightarrow 2H_2O",
      leftAtoms: { unbalanced: { H: 2, O: 2 }, balanced: { H: 4, O: 2 } },
      rightAtoms: { unbalanced: { H: 2, O: 1 }, balanced: { H: 4, O: 2 } },
      name: "Water Formation"
    },
    {
      unbalanced: "Na + Cl_2 \\rightarrow NaCl",
      balanced: "2Na + Cl_2 \\rightarrow 2NaCl",
      leftAtoms: { unbalanced: { Na: 1, Cl: 2 }, balanced: { Na: 2, Cl: 2 } },
      rightAtoms: { unbalanced: { Na: 1, Cl: 1 }, balanced: { Na: 2, Cl: 2 } },
      name: "Salt Formation"
    },
    {
      unbalanced: "Fe + O_2 \\rightarrow Fe_2O_3",
      balanced: "4Fe + 3O_2 \\rightarrow 2Fe_2O_3",
      leftAtoms: { unbalanced: { Fe: 1, O: 2 }, balanced: { Fe: 4, O: 6 } },
      rightAtoms: { unbalanced: { Fe: 2, O: 3 }, balanced: { Fe: 4, O: 6 } },
      name: "Iron Oxidation"
    }
  ];

  const slideInteractions: Interaction[] = [
    {
      id: 'fundamental-principle',
      conceptId: 'balancing-principle-concept',
      conceptName: 'Fundamental Balancing Principle',
      type: 'learning',
      description: 'Understanding the core principle of equation balancing'
    },
    {
      id: 'why-balance-equations',
      conceptId: 'importance-balancing-concept',
      conceptName: 'Why Balance Equations',
      type: 'learning',
      description: 'Learning the importance of balancing chemical equations'
    },
    {
      id: 'before-after-comparison',
      conceptId: 'equation-comparison-concept',
      conceptName: 'Unbalanced vs Balanced Comparison',
      type: 'learning',
      description: 'Comparing unbalanced and balanced equations'
    },
    {
      id: 'atom-tracker-interaction',
      conceptId: 'atom-tracking-concept',
      conceptName: 'Atom Tracking Visualization',
      type: 'learning',
      description: 'Tracking atoms in chemical equations'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % examples.length);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length);
  };

  const getBalanceStatus = (leftAtoms: any, rightAtoms: any) => {
    const atoms = Object.keys({ ...leftAtoms, ...rightAtoms });
    return atoms.every(atom => leftAtoms[atom] === rightAtoms[atom]);
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Fundamental Principle */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 text-center">
                  <div className="text-xl font-bold mb-2">🎯 GOLDEN RULE</div>
                  <div className="text-lg">
                    "Make sure that the atoms are equal on both sides of the reaction"
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">This means:</h3>
                  <div className="space-y-2 text-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Same number of each type of atom on both sides</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>No atoms are gained or lost</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Only rearrangement, not creation or destruction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Why Balance Equations */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
           <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">

              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Why Balance Equations?
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">⚖️</span>
                      <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Law of Conservation of Mass</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Matter cannot be created or destroyed in chemical reactions</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🧮</span>
                      <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Stoichiometric Calculations</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Determine exact quantities needed for reactions</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🔮</span>
                      <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Predicting Outcomes</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Accurately predict reaction products and yields</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🔬</span>
                      <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Understanding Mechanisms</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Gain insight into how reactions actually occur</p>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Before/After Comparison */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">

              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Before/After Comparison
              </h2>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2">{examples[currentExample].name}</div>
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={prevExample} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      ←
                    </button>
                    <span className="text-gray-600 dark:text-gray-400">
                      {currentExample + 1} of {examples.length}
                    </span>
                    <button onClick={nextExample} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      →
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Unbalanced */}
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border border-red-300 dark:border-red-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-600 font-bold">❌ UNBALANCED</span>
                    </div>
                    <div className="text-center text-xl">
                      <InlineMath math={examples[currentExample].unbalanced} />
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center text-3xl text-gray-400">↓</div>
                  
                  {/* Balanced */}
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 border border-green-300 dark:border-green-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600 font-bold">✅ BALANCED</span>
                    </div>
                    <div className="text-center text-xl">
                      <InlineMath math={examples[currentExample].balanced} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Atom Tracker */}
          <TrackedInteraction 
            interaction={slideInteractions[3]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">

              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Atom Tracker
              </h2>
              
              <div className="space-y-4">
                {showAtomTracker && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <div className="text-center text-lg font-semibold">
                        {examples[currentExample].name}
                      </div>
                      
                      {/* Unbalanced tracking */}
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                        <div className="text-center font-semibold text-red-700 dark:text-red-300 mb-2">
                          Unbalanced Equation
                        </div>
                        <div className="text-center mb-3">
                          <InlineMath math={examples[currentExample].unbalanced} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-lg">
                          <div>
                            <div className="font-semibold mb-1">Left Side:</div>
                            {Object.entries(examples[currentExample].leftAtoms.unbalanced).map(([atom, count]) => (
                              <div key={atom} className="flex justify-between bg-blue-100 dark:bg-blue-900/30 p-1 rounded mb-1">
                                <span>{atom}:</span>
                                <span className="font-bold">{count as number}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="font-semibold mb-1">Right Side:</div>
                            {Object.entries(examples[currentExample].rightAtoms.unbalanced).map(([atom, count]) => (
                              <div key={atom} className="flex justify-between bg-green-100 dark:bg-green-900/30 p-1 rounded mb-1">
                                <span>{atom}:</span>
                                <span className="font-bold">{count as number}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-center mt-2 text-red-600 font-bold">
                          ❌ Not Equal!
                        </div>
                      </div>
                      
                      {/* Balanced tracking */}
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <div className="text-center font-semibold text-green-700 dark:text-green-300 mb-2">
                          Balanced Equation
                        </div>
                        <div className="text-center mb-3">
                          <InlineMath math={examples[currentExample].balanced} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-lg">
                          <div>
                            <div className="font-semibold mb-1">Left Side:</div>
                            {Object.entries(examples[currentExample].leftAtoms.balanced).map(([atom, count]) => (
                              <div key={atom} className="flex justify-between bg-blue-100 dark:bg-blue-900/30 p-1 rounded mb-1">
                                <span>{atom}:</span>
                                <span className="font-bold">{count as number}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="font-semibold mb-1">Right Side:</div>
                            {Object.entries(examples[currentExample].rightAtoms.balanced).map(([atom, count]) => (
                              <div key={atom} className="flex justify-between bg-green-100 dark:bg-green-900/30 p-1 rounded mb-1">
                                <span>{atom}:</span>
                                <span className="font-bold">{count as number}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-center mt-2 text-green-600 font-bold">
                          ✅ Equal!
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TrackedInteraction>


        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="golden-rule-of-balancing"
      slideTitle="The Golden Rule of Balancing"
      moduleId="balancing-chemical-equations"
      submoduleId="introduction-to-balancing"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 