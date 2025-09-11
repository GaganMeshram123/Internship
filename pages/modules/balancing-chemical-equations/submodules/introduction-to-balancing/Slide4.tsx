import React, { useState, useEffect } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function CombustionDemonstrationSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [coefficients, setCoefficients] = useState([1, 1, 1, 1]); // C₃H₈, O₂, CO₂, H₂O
  const [showVerification, setShowVerification] = useState(false);
  const [userCoefficients, setUserCoefficients] = useState([1, 1, 1, 1]);

  // Steps for balancing C₃H₈ + O₂ → CO₂ + H₂O
  const balancingSteps = [
    {
      title: "Step 1: Carbon Atoms First",
      description: "Balance carbon atoms. We have 3 C on left, so we need 3 CO₂ on right.",
      equation: "C_3H_8 + O_2 \\rightarrow 3CO_2 + H_2O",
      coeffs: [1, 1, 3, 1],
      focus: "C",
      explanation: "3 carbons left → need 3 CO₂",
      atomCount: { left: { C: 3, H: 8, O: 2 }, right: { C: 3, H: 2, O: 7 } }
    },
    {
      title: "Step 2: Hydrogen Atoms",
      description: "Balance hydrogen atoms. We have 8 H on left, so we need 4 H₂O on right.",
      equation: "C_3H_8 + O_2 \\rightarrow 3CO_2 + 4H_2O",
      coeffs: [1, 1, 3, 4],
      focus: "H",
      explanation: "8 hydrogens left → need 4 H₂O (8÷2=4)",
      atomCount: { left: { C: 3, H: 8, O: 2 }, right: { C: 3, H: 8, O: 10 } }
    },
    {
      title: "Step 3: Oxygen Atoms Last",
      description: "Count oxygen on right side: 6 (from CO₂) + 4 (from H₂O) = 10. Need 5 O₂.",
      equation: "C_3H_8 + 5O_2 \\rightarrow 3CO_2 + 4H_2O",
      coeffs: [1, 5, 3, 4],
      focus: "O",
      explanation: "Count right side = 6+4=10 → need 5 O₂",
      atomCount: { left: { C: 3, H: 8, O: 10 }, right: { C: 3, H: 8, O: 10 } }
    },
    {
      title: "Final: Balanced Equation",
      description: "The equation is now balanced with equal atoms on both sides!",
      equation: "C_3H_8 + 5O_2 \\rightarrow 3CO_2 + 4H_2O",
      coeffs: [1, 5, 3, 4],
      focus: "All",
      explanation: "All atoms are now equal on both sides",
      atomCount: { left: { C: 3, H: 8, O: 10 }, right: { C: 3, H: 8, O: 10 } }
    }
  ];

  const slideInteractions: Interaction[] = [
    {
      id: 'propane-combustion-example',
      conceptId: 'combustion-example-concept',
      conceptName: 'Propane Combustion Example',
      type: 'learning',
      description: 'Learning to balance combustion reactions using propane example'
    },
    {
      id: 'step-by-step-builder',
      conceptId: 'step-builder-concept',
      conceptName: 'Step-by-Step Equation Builder',
      type: 'learning',
      description: 'Building balanced equation step by step'
    },
    {
      id: 'visual-equation-builder',
      conceptId: 'visual-builder-concept',
      conceptName: 'Visual Equation Builder',
      type: 'learning',
      description: 'Interactive visual representation of balancing process'
    },
    {
      id: 'verification-tool',
      conceptId: 'verification-concept',
      conceptName: 'Verification Tool',
      type: 'learning',
      description: 'Verifying the final balanced equation'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const nextStep = () => {
    if (currentStep < balancingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setCoefficients(balancingSteps[currentStep + 1].coeffs);
      
      const response: InteractionResponse = {
        interactionId: 'step-by-step-builder',
        value: `step-${currentStep + 1}`,
        timestamp: Date.now(),
        conceptId: 'step-builder-concept',
        conceptName: 'Step-by-Step Equation Builder',
        conceptDescription: `Completed step ${currentStep + 1}: ${balancingSteps[currentStep + 1].title}`
      };
      
      handleInteractionComplete(response);
    }
  };

  const calculateAtoms = (coeffs: number[]) => {
    const left = {
      C: coeffs[0] * 3, // C₃H₈
      H: coeffs[0] * 8,
      O: coeffs[1] * 2  // O₂
    };
    const right = {
      C: coeffs[2] * 1, // CO₂
      H: coeffs[3] * 2, // H₂O
      O: coeffs[2] * 2 + coeffs[3] * 1 // CO₂ + H₂O
    };
    return { left, right };
  };

  const isBalanced = (coeffs: number[]) => {
    const { left, right } = calculateAtoms(coeffs);
    return left.C === right.C && left.H === right.H && left.O === right.O;
  };

  const handleCoefficientChange = (index: number, value: string) => {
    const newCoeffs = [...userCoefficients];
    newCoeffs[index] = parseInt(value) || 1;
    setUserCoefficients(newCoeffs);
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Propane Combustion Example */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Example: Propane Combustion
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-center text-xl mb-4">
                    <InlineMath math="C_3H_8 + O_2 \rightarrow CO_2 + H_2O" />
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300 text-center">
                    Propane + Oxygen → Carbon Dioxide + Water
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg p-4">
                  <div className="text-lg font-bold mb-2">Combustion Reaction</div>
                  <div className="text-lg">
                    A hydrocarbon reacts with oxygen to produce CO₂ and H₂O
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Step-by-Step Builder */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
           <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Step-by-Step Builder
              </h2>
              
              <div className="space-y-4">
                {balancingSteps.slice(0, currentStep + 1).map((step, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      index === currentStep 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                        : 'border-gray-300 bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      {step.title}
                    </h4>
                    <div className="text-center text-xl mb-3">
                      <InlineMath math={step.equation} />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                      Focus: {step.focus}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                      {step.description}
                    </p>
                    <div className="text-lg text-gray-700 dark:text-gray-300">
                      {step.explanation}
                    </div>
                  </div>
                ))}
                
                {currentStep < balancingSteps.length - 1 && (
                  <button
                    onClick={nextStep}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Next Step
                  </button>
                )}
                
                {currentStep === balancingSteps.length - 1 && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-300 dark:border-green-700">
                    <h4 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                      Balancing Complete!
                    </h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      You've successfully learned the step-by-step process for balancing combustion reactions. 
                      Try the interactive equation builder below to practice!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Visual Equation Builder */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
           <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Equation Balancer
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-lg font-semibold mb-3">Try balancing the equation yourself:</div>
                  
                  <div className="flex items-center justify-center gap-2 text-xl mb-4 flex-wrap">
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={userCoefficients[0]}
                      onChange={(e) => handleCoefficientChange(0, e.target.value)}
                      className="w-12 h-10 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    />
                    <span>C₃H₈ +</span>
                    
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={userCoefficients[1]}
                      onChange={(e) => handleCoefficientChange(1, e.target.value)}
                      className="w-12 h-10 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    />
                    <span>O₂ →</span>
                    
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={userCoefficients[2]}
                      onChange={(e) => handleCoefficientChange(2, e.target.value)}
                      className="w-12 h-10 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    />
                    <span>CO₂ +</span>
                    
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={userCoefficients[3]}
                      onChange={(e) => handleCoefficientChange(3, e.target.value)}
                      className="w-12 h-10 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    />
                    <span>H₂O</span>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-lg font-bold ${
                      isBalanced(userCoefficients) ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isBalanced(userCoefficients) ? 'Balanced!' : 'Not balanced yet'}
                    </div>
                  </div>
                  
                  {!isBalanced(userCoefficients) && (
                    <div className="mt-3">
                      {(() => {
                        const { left, right } = calculateAtoms(userCoefficients);
                        return (
                          <div className="grid grid-cols-3 gap-2 text-lg">
                            <div className="text-center">
                              <div className="font-semibold">C</div>
                              <div className={left.C === right.C ? 'text-green-600' : 'text-red-600'}>
                                {left.C} = {right.C}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold">H</div>
                              <div className={left.H === right.H ? 'text-green-600' : 'text-red-600'}>
                                {left.H} = {right.H}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold">O</div>
                              <div className={left.O === right.O ? 'text-green-600' : 'text-red-600'}>
                                {left.O} = {right.O}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Verification Tool */}
          <TrackedInteraction 
            interaction={slideInteractions[3]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <div className="space-y-4">
                {showVerification && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="text-center text-xl mb-4">
                      <InlineMath math="C_3H_8 + 5O_2 \rightarrow 3CO_2 + 4H_2O" />
                    </div>
                    
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
                      <div className="text-lg font-bold text-green-700 dark:text-green-300 mb-3">
                        Final Verification
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Carbon (C):</span>
                          <span className="font-bold">3 = 3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hydrogen (H):</span>
                          <span className="font-bold">8 = 8</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Oxygen (O):</span>
                          <span className="font-bold">10 = 10</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
                        <div className="text-lg font-semibold mb-2">Mass Conservation Check:</div>
                        <div className="space-y-1 text-gray-700 dark:text-gray-300">
                          <div>Reactants: 1(44) + 5(32) = 204 amu</div>
                          <div>Products: 3(44) + 4(18) = 204 amu</div>
                          <div className="font-bold text-green-600">Mass is conserved!</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                { !showVerification && <button 
                  onClick={() => setShowVerification(!showVerification)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {showVerification ? 'Hide Verification' : 'Verify Final Answer'}
                </button>}
              </div>
            </div>
          </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="combustion-reactions-demonstration"
      slideTitle="Combustion Reactions - Method Demonstration"
      moduleId="balancing-chemical-equations"
      submoduleId="introduction-to-balancing"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 