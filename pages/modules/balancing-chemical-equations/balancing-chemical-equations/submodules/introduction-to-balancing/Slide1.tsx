import React, { useState, useEffect } from 'react';
import { Interaction, InteractionResponse } from '../../../../common-components/concept';
import { TrackedInteraction } from '../../../../common-components/concept';
import SlideComponentWrapper from '../../../../common-components/SlideComponentWrapper';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function IntroductionToChemicalEquationsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [balanceActive, setBalanceActive] = useState(false);
  const [atomCounterActive, setAtomCounterActive] = useState(true);
  
  // Example equation for demonstration: H₂ + Cl₂ → 2HCl
  const [leftAtoms, setLeftAtoms] = useState({ H: 2, Cl: 2 });
  const [rightAtoms, setRightAtoms] = useState({ H: 2, Cl: 2 });
  const [massLeft, setMassLeft] = useState(73); // H₂ (2) + Cl₂ (71) = 73
  const [massRight, setMassRight] = useState(73); // 2HCl (2×36.5) = 73

  const slideInteractions: Interaction[] = [
    {
      id: 'chemical-equation-definition',
      conceptId: 'chemical-equation-concept',
      conceptName: 'Understanding Chemical Equations',
      type: 'learning',
      description: 'Learning what chemical equations represent'
    },
    {
      id: 'conservation-of-mass',
      conceptId: 'conservation-mass-concept',
      conceptName: 'Law of Conservation of Mass',
      type: 'learning',
      description: 'Understanding that matter cannot be created or destroyed'
    },
    {
      id: 'interactive-animation',
      conceptId: 'atom-rearrangement-concept',
      conceptName: 'Atom Rearrangement Animation',
      type: 'learning',
      description: 'Visualizing how atoms rearrange during reactions'
    },
    {
      id: 'digital-balance',
      conceptId: 'mass-conservation-demo',
      conceptName: 'Mass Conservation Demonstration',
      type: 'learning',
      description: 'Demonstrating conservation of mass with digital balance'
    },
    {
      id: 'atom-counter',
      conceptId: 'atom-counting-concept',
      conceptName: 'Atom Counting Exercise',
      type: 'learning',
      description: 'Counting atoms on both sides of equation'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const toggleBalance = () => {
    setBalanceActive(!balanceActive);
  };

  const toggleAtomCounter = () => {
    setAtomCounterActive(!atomCounterActive);
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* What is a Chemical Equation */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  A chemical equation is a symbolic representation of a chemical reaction using chemical formulas.
                </p>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-center text-lg">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">Reactants</span>
                    <span className="mx-4 text-2xl">→</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">Products</span>
                  </div>
                  <div className="text-center mt-3 text-xl">
                    <InlineMath math="H_2 + Cl_2 \rightarrow 2HCl" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-lg">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-blue-800 dark:text-blue-200">Reactants</div>
                    <div className="text-gray-700 dark:text-gray-300">Starting materials</div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-green-800 dark:text-green-200">Products</div>
                    <div className="text-gray-700 dark:text-gray-300">End results</div>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Conservation of Mass */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-6 border border-blue-300 dark:border-blue-700">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Law of Conservation of Mass
              </h2>
              
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Matter cannot be created or destroyed in a chemical reaction.
                </p>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-blue-400 dark:border-blue-600">
                  <div className="text-center text-lg font-semibold text-blue-700 dark:text-blue-300">
                    Key Principle
                  </div>
                  <div className="text-center mt-2 text-lg text-gray-700 dark:text-gray-300">
                    "The fundamental goal is to ensure equal numbers of each type of atom on both sides of the equation."
                  </div>
                </div>

                <div className="space-y-2 text-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Total mass before reaction = Total mass after reaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Atoms are rearranged, not created or destroyed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Same number of each atom type on both sides</span>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Interactive Animation */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-200 dark:bg-blue-800/30 rounded-lg p-6 border border-blue-300 dark:border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Atom Rearrangement Animation
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-8 mb-4">
                      {/* Reactants */}
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">
                          H
                        </div>
                        <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">
                          H
                        </div>
                      </div>
                      
                      <div className="text-2xl">+</div>
                      
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                          Cl
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                          Cl
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-2xl mb-4">→</div>
                    
                    {/* Products */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex gap-1">
                        <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">
                          H
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                          Cl
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">
                          H
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                          Cl
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Digital Balance */}
          <TrackedInteraction 
            interaction={slideInteractions[3]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-300 dark:bg-blue-700/30 rounded-lg p-6 border border-blue-400 dark:border-blue-600">     
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Digital Balance Demo
              </h2>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">Reactants</div>
                      <div className="text-xl">
                        <InlineMath math="H_2 + Cl_2" />
                      </div>
                      <div className={`text-2xl font-bold mt-2 ${balanceActive ? 'text-green-600' : 'text-gray-600'}`}>
                        {massLeft} amu
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-1 bg-gray-400 mb-2"></div>
                      <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                      <div className="text-lg font-bold mt-2">
                        {balanceActive && massLeft === massRight ? '⚖️ BALANCED' : '⚖️'}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600 dark:text-green-400">Products</div>
                      <div className="text-xl">
                        <InlineMath math="2HCl" />
                      </div>
                      <div className={`text-2xl font-bold mt-2 ${balanceActive ? 'text-green-600' : 'text-gray-600'}`}>
                        {massRight} amu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Atom Counter */}
          <TrackedInteraction 
            interaction={slideInteractions[4]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-400 dark:bg-blue-600/30 rounded-lg p-6 border border-blue-500 dark:border-blue-500">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Atom Counter
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  {atomCounterActive && (
                    <div className="space-y-4">
                      <div className="text-center text-xl">
                        <InlineMath math="H_2 + Cl_2 \rightarrow 2HCl" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Left Side</div>
                          <div className="space-y-1">
                            <div className="flex justify-between bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                              <span>H atoms:</span>
                              <span className="font-bold">{leftAtoms.H}</span>
                            </div>
                            <div className="flex justify-between bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                              <span>Cl atoms:</span>
                              <span className="font-bold">{leftAtoms.Cl}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">Right Side</div>
                          <div className="space-y-1">
                            <div className="flex justify-between bg-green-100 dark:bg-green-900/30 p-2 rounded">
                              <span>H atoms:</span>
                              <span className="font-bold">{rightAtoms.H}</span>
                            </div>
                            <div className="flex justify-between bg-green-100 dark:bg-green-900/30 p-2 rounded">
                              <span>Cl atoms:</span>
                              <span className="font-bold">{rightAtoms.Cl}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-lg font-bold ${leftAtoms.H === rightAtoms.H && leftAtoms.Cl === rightAtoms.Cl ? 'text-green-600' : 'text-red-600'}`}>
                          {leftAtoms.H === rightAtoms.H && leftAtoms.Cl === rightAtoms.Cl ? '✓ Atoms are equal!' : '✗ Atoms are not equal'}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!atomCounterActive && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      Click below to count atoms on both sides
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="introduction-to-chemical-equations"
      slideTitle="Introduction to Chemical Equations"
      moduleId="balancing-chemical-equations"
      submoduleId="introduction-to-balancing"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 