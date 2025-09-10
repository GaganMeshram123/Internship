import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../../common-components/concept';
import { TrackedInteraction } from '../../../../common-components/concept';
import SlideComponentWrapper from '../../../../common-components/SlideComponentWrapper';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function BasicStrategySlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedStrategy, setSelectedStrategy] = useState('standard');
  
  // Standard balancing order steps
  const balancingSteps = [
    {
      title: "Step 1: Metals First",
      description: "Balance metal atoms first (if present)",
      color: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700",
      icon: "🔗",
      example: "In Fe + O₂ → Fe₂O₃, start with Fe atoms"
    },
    {
      title: "Step 2: Non-metals (except H, O)",
      description: "Balance other non-metal atoms second",
      color: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700",
      icon: "⚛️",
      example: "Balance C, N, P, S atoms before H and O"
    },
    {
      title: "Step 3: Hydrogen Third",
      description: "Balance hydrogen atoms third",
      color: "bg-blue-200 dark:bg-blue-800/30 border-blue-400 dark:border-blue-600",
      icon: "🎈",
      example: "H atoms are often in multiple compounds"
    },
    {
      title: "Step 4: Oxygen Last",
      description: "Save oxygen for the final step",
      color: "bg-blue-300 dark:bg-blue-700/30 border-blue-500 dark:border-blue-500",
      icon: "💨",
      example: "O appears in many compounds, easier to adjust last"
    }
  ];

  // Different balancing strategies
  const strategies = {
    standard: {
      name: "Standard Order",
      description: "Metals → Non-metals → H → O",
      steps: ["Metals", "Non-metals (except H, O)", "Hydrogen", "Oxygen"],
      color: "blue"
    },
    reverse: {
      name: "Reverse Order",
      description: "O → H → Non-metals → Metals",
      steps: ["Oxygen", "Hydrogen", "Non-metals", "Metals"],
      color: "red"
    },
    complex: {
      name: "Complex First",
      description: "Most complex compound first",
      steps: ["Largest formula", "Connected compounds", "Simple molecules", "Elements"],
      color: "blue"
    }
  };

  // Example equation with priority highlighting
  const exampleEquation = "C_3H_8 + O_2 \\rightarrow CO_2 + H_2O";
  const atomPriorities = {
    C: { priority: 1, color: "bg-blue-200 dark:bg-blue-800/40", label: "1st - Metal-like" },
    H: { priority: 3, color: "bg-blue-300 dark:bg-blue-700/40", label: "3rd - Hydrogen" },
    O: { priority: 4, color: "bg-blue-400 dark:bg-blue-600/40", label: "4th - Oxygen" }
  };

  const slideInteractions: Interaction[] = [
    {
      id: 'standard-balancing-order',
      conceptId: 'balancing-order-concept',
      conceptName: 'Standard Balancing Order',
      type: 'learning',
      description: 'Learning the systematic order for balancing equations'
    },
    {
      id: 'why-this-order',
      conceptId: 'order-reasoning-concept',
      conceptName: 'Why This Order Works',
      type: 'learning',
      description: 'Understanding the reasoning behind the balancing order'
    },
    {
      id: 'strategy-selector',
      conceptId: 'strategy-comparison-concept',
      conceptName: 'Strategy Comparison',
      type: 'learning',
      description: 'Comparing different balancing strategies'
    },
    {
      id: 'priority-highlighter',
      conceptId: 'priority-visualization-concept',
      conceptName: 'Priority Visualization',
      type: 'learning',
      description: 'Visualizing element balancing priorities'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };



  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Standard Order */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Standard Order of Balancing
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg p-4 text-center">
                  <div className="text-lg font-bold">📝 Remember: M-N-H-O</div>
                  <div className="text-lg">Metals → Non-metals → Hydrogen → Oxygen</div>
                </div>
                
                <div className="space-y-3">
                  {balancingSteps.map((step, index) => (
                    <div key={index} className={`rounded-lg p-4 border ${step.color}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <span className="text-lg font-semibold">{step.title}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{step.description}</p>
                      <p className="text-gray-600 dark:text-gray-400 italic">{step.example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Why This Order */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-6 border border-blue-300 dark:border-blue-700">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Why This Order?
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💨</span>
                    <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Oxygen Often in Multiple Compounds</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Oxygen frequently appears in several compounds on both sides, making it complex to balance early
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🎯</span>
                    <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Easier to Adjust at End</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    By the time we reach oxygen, other elements are balanced, making O adjustments straightforward
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📊</span>
                    <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Systematic Approach</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Following a consistent order reduces errors and makes the process more predictable
                  </p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Strategy Selector */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-300 dark:bg-blue-700/30 rounded-lg p-6 border border-blue-400 dark:border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Strategy Selector
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  {Object.entries(strategies).map(([key, strategy]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedStrategy(key)}
                      className={`w-full p-3 rounded-lg border transition-colors text-left ${
                        selectedStrategy === key
                          ? `bg-${strategy.color}-100 dark:bg-${strategy.color}-900/30 border-${strategy.color}-300 dark:border-${strategy.color}-700`
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-lg">{strategy.name}</div>
                      <div className="text-gray-600 dark:text-gray-400">{strategy.description}</div>
                    </button>
                  ))}
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-lg font-semibold mb-3">
                    {strategies[selectedStrategy as keyof typeof strategies].name} Steps:
                  </div>
                  <div className="space-y-2">
                    {strategies[selectedStrategy as keyof typeof strategies].steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold">
                          {index + 1}
                        </span>
                        <span className="text-lg">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Priority Highlighter */}
          <TrackedInteraction 
            interaction={slideInteractions[3]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-400 dark:bg-blue-600/30 rounded-lg p-6 border border-blue-500 dark:border-blue-500">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Priority Order
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-center text-xl mb-4">
                    <InlineMath math={exampleEquation} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-lg font-semibold text-center mb-3">
                      Balancing Priority Order:
                    </div>
                    
                    {Object.entries(atomPriorities).map(([atom, info]) => (
                      <div key={atom} className={`rounded-lg p-3 border ${info.color}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold">{atom}</span>
                            <span className="text-lg">{info.label}</span>
                          </div>
                          <span className="text-lg font-bold">Priority {info.priority}</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mt-4">
                      <div className="text-lg font-semibold mb-2">Why this order for C₃H₈ + O₂ → CO₂ + H₂O?</div>
                      <div className="space-y-1 text-gray-700 dark:text-gray-300">
                        <div>• C comes first (carbon acts like a "metal" in organic compounds)</div>
                        <div>• H comes third (hydrogen balancing rule)</div>
                        <div>• O comes last (oxygen in multiple compounds)</div>
                      </div>
                    </div>
                  </div>
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
      slideId="basic-strategy-for-balancing"
      slideTitle="Basic Strategy for Balancing"
      moduleId="balancing-chemical-equations"
      submoduleId="introduction-to-balancing"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 