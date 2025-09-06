import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function NewtonsLawSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedExample, setSelectedExample] = useState<string>('person-earth');
  const [calculatorInput, setCalculatorInput] = useState({
    m1: '70',
    m2: '5.98e24',
    r: '6.37e6'
  });
  const [calculatedForce, setCalculatedForce] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState<boolean>(true);
  const [animateBar, setAnimateBar] = useState<boolean>(false);
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  const [showPredictionResult, setShowPredictionResult] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'gravitational-constant-exploration',
      conceptId: 'gravitational-constant-concept',
      conceptName: 'Gravitational Constant Exploration',
      type: 'learning',
      description: 'Understanding G and why gravity appears weak in everyday life'
    },
    {
      id: 'force-magnitude-comparison',
      conceptId: 'force-magnitude-concept',
      conceptName: 'Force Magnitude Comparison',
      type: 'learning',
      description: 'Comparing gravitational forces across different scales'
    },
    {
      id: 'interactive-force-calculator',
      conceptId: 'force-calculator-concept',
      conceptName: 'Interactive Force Calculator',
      type: 'learning',
      description: 'Real-time calculation of gravitational forces'
    },
    {
      id: 'gravity-strength-prediction',
      conceptId: 'gravity-strength-concept',
      conceptName: 'Gravity Strength Prediction',
      type: 'judging',
      description: 'Testing understanding of relative gravitational force strengths'
    }
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const examples = [
    {
      id: 'person-earth',
      title: 'Person & Earth',
      m1: 70,
      m2: 5.98e24,
      r: 6.37e6,
      m1Display: '70 kg',
      m2Display: '5.98 × 10²⁴ kg',
      rDisplay: '6.37 × 10⁶ m',
      force: 686,
      forceDisplay: '686 N',
      description: 'A 70 kg person at Earth\'s surface',
      insight: 'This is your weight! The force you feel due to Earth\'s gravity.',
      color: '#3B82F6',
      category: 'everyday'
    },
    {
      id: 'apple-earth',
      title: 'Apple & Earth',
      m1: 0.1,
      m2: 5.98e24,
      r: 6.37e6,
      m1Display: '0.1 kg',
      m2Display: '5.98 × 10²⁴ kg',
      rDisplay: '6.37 × 10⁶ m',
      force: 0.98,
      forceDisplay: '0.98 N',
      description: 'A 100-gram apple falling to Earth',
      insight: 'Close to 1 Newton - the classic reference for gravitational force.',
      color: '#EF4444',
      category: 'everyday'
    },
    {
      id: 'two-people',
      title: 'Two People',
      m1: 70,
      m2: 70,
      r: 1,
      m1Display: '70 kg',
      m2Display: '70 kg',
      rDisplay: '1 m',
      force: 3.3e-7,
      forceDisplay: '3.3 × 10⁻⁷ N',
      description: 'Two 70 kg people standing 1 meter apart',
      insight: 'Incredibly tiny! Less than 1 millionth of a Newton - completely imperceptible.',
      color: '#10B981',
      category: 'tiny'
    },
    {
      id: 'earth-moon',
      title: 'Earth & Moon',
      m1: 5.98e24,
      m2: 7.35e22,
      r: 3.84e8,
      m1Display: '5.98 × 10²⁴ kg',
      m2Display: '7.35 × 10²² kg',
      rDisplay: '3.84 × 10⁸ m',
      force: 1.98e20,
      forceDisplay: '1.98 × 10²⁰ N',
      description: 'Gravitational force between Earth and Moon',
      insight: 'Enormous force - this keeps the Moon in orbit around Earth!',
      color: '#F59E0B',
      category: 'astronomical'
    },
    {
      id: 'binary-stars',
      title: 'Binary Stars',
      m1: 3.98e30,
      m2: 1.99e30,
      r: 1.5e11,
      m1Display: '3.98 × 10³⁰ kg',
      m2Display: '1.99 × 10³⁰ kg',
      rDisplay: '1.5 × 10¹¹ m',
      force: 3.54e25,
      forceDisplay: '3.54 × 10²⁵ N',
      description: 'Two massive stars orbiting each other',
      insight: 'Astronomical forces - millions of times stronger than Earth-Moon!',
      color: '#8B5CF6',
      category: 'astronomical'
    }
  ];

  const currentExample = examples.find(ex => ex.id === selectedExample) || examples[0];

  // Calculate force magnitude for visualization (logarithmic scale)
  const getLogScale = (force: number) => {
    const minLog = -10; // 10^-10 N
    const maxLog = 26;  // 10^26 N
    const forceLog = Math.log10(Math.max(force, 1e-10));
    return Math.max(0, Math.min(100, ((forceLog - minLog) / (maxLog - minLog)) * 100));
  };

  // Calculate gravitational force
  const calculateForce = () => {
    try {
      const m1 = parseFloat(calculatorInput.m1);
      const m2 = parseFloat(calculatorInput.m2);
      const r = parseFloat(calculatorInput.r);
      const G = 6.67e-11;
      
      if (isNaN(m1) || isNaN(m2) || isNaN(r) || r === 0) {
        return null;
      }
      
      const force = G * m1 * m2 / (r * r);
      setCalculatedForce(force);
      
      const response: InteractionResponse = {
        interactionId: 'interactive-force-calculator',
        value: `${force.toExponential(2)} N`,
        timestamp: Date.now(),
        conceptId: 'force-calculator-concept',
        conceptName: 'Interactive Force Calculator',
        conceptDescription: `Calculated force between ${m1} kg and ${m2} kg at ${r} m distance: ${force.toExponential(2)} N`
      };
      handleInteractionComplete(response);
      
      return force;
    } catch (error) {
      return null;
    }
  };

  // Format force for display
  const formatForce = (force: number) => {
    if (force >= 1e20) {
      return `${(force / 1e20).toFixed(2)} × 10²⁰ N`;
    } else if (force >= 1e15) {
      return `${(force / 1e15).toFixed(2)} × 10¹⁵ N`;
    } else if (force >= 1e10) {
      return `${(force / 1e10).toFixed(2)} × 10¹⁰ N`;
    } else if (force >= 1e5) {
      return `${(force / 1e5).toFixed(2)} × 10⁵ N`;
    } else if (force >= 1) {
      return `${force.toFixed(2)} N`;
    } else {
      return `${force.toExponential(2)} N`;
    }
  };

  // Handle example selection
  const handleExampleSelect = (example: any) => {
    setSelectedExample(example.id);
    setAnimateBar(true);
    setTimeout(() => setAnimateBar(false), 1000);
    
    const response: InteractionResponse = {
      interactionId: 'force-magnitude-comparison',
      value: example.title,
      timestamp: Date.now(),
      conceptId: 'force-magnitude-concept',
      conceptName: 'Force Magnitude Comparison',
      conceptDescription: `Explored ${example.title}: ${example.description}. Force: ${example.forceDisplay}`
    };
    handleInteractionComplete(response);
  };

  // Handle prediction
  const handlePrediction = (prediction: string) => {
    setUserPrediction(prediction);
    setShowPredictionResult(true);
    
    const isCorrect = prediction === 'A';
    const optionMap: Record<string, string> = {
      A: 'The gravitational constant G is extremely small, making forces between human-sized masses negligible',
      B: 'Gravity only works on objects touching the Earth',
      C: 'People are too small to have gravitational fields',
      D: 'Air resistance cancels out gravitational attraction between people'
    };
    const selectedText = optionMap[prediction] || prediction;
    const response: InteractionResponse = {
      interactionId: 'gravity-strength-prediction',
      value: selectedText,
      isCorrect: isCorrect,
      timestamp: Date.now(),
      conceptId: 'gravity-strength-concept',
      conceptName: 'Gravity Strength Prediction',
      conceptDescription: `Predicted: ${selectedText}. ${isCorrect ? 'Correct!' : 'Incorrect.'} Gravity is indeed the weakest fundamental force.`,
      question: {
        type: 'mcq',
        question: "Why don't you feel gravitational attraction to other people around you?",
        options: Object.values(optionMap)
      }
    };
    handleInteractionComplete(response);
  };

  useEffect(() => {
    calculateForce();
  }, [calculatorInput]);

  return (
    <SlideComponentWrapper
      slideId="gravitational-constant-examples"
      slideTitle="Gravitational Force Strength Explorer"
      moduleId="gravitation-0001"
      submoduleId="newtons-law-of-gravitation"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-2rem)]">
          {/* Left column - Gravitational Constant & Controls */}
          <div className="space-y-6">
            {/* Gravitational Constant */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                The Gravitational Constant G
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-center mb-3">
                    <BlockMath math="G = 6.67 \times 10^{-11} \text{ N⋅m}^2/\text{kg}^2" />
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300 text-center">
                    Universal constant - same everywhere in the universe
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">Why G is Incredibly Small</h4>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Gravity is the weakest fundamental force</li>
                      <li>• Makes everyday gravitational forces tiny</li>
                      <li>• Only noticeable with massive objects like Earth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Force Examples Selection */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Force Examples
              </h4>
              
              <div className="space-y-2">
                {examples.map((example) => (
                  <motion.button
                    key={example.id}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                      selectedExample === example.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => handleExampleSelect(example)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-lg">{example.title}</div>
                        <div className="text-lg opacity-90">{example.description}</div>
                      </div>
                      <div className="text-lg font-bold">
                        {example.forceDisplay}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Visualization and Quiz */}
          <div className="space-y-6">
            {/* Force Magnitude Visualization */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
                Force Magnitude Comparison
              </h3>
              
              {/* Current Example Details */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mb-6">
                <h4 className="text-xl font-bold text-center mb-3" style={{ color: currentExample.color }}>
                  {currentExample.title}
                </h4>
                
                <div className="grid grid-cols-1 gap-2 text-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Mass 1:</span>
                    <span className="text-gray-700 dark:text-gray-300 font-mono">{currentExample.m1Display}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Mass 2:</span>
                    <span className="text-gray-700 dark:text-gray-300 font-mono">{currentExample.m2Display}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                    <span className="text-gray-700 dark:text-gray-300 font-mono">{currentExample.rDisplay}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Force:</span>
                    <span className="font-bold text-xl" style={{ color: currentExample.color }}>
                      {currentExample.forceDisplay}
                    </span>
                  </div>
                </div>
              </div>

              {/* Force Magnitude Bar Chart */}
              <div className="space-y-3">
                <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 text-center">
                  Relative Force Strengths (Log Scale)
                </h5>
                
                {examples.map((example) => (
                  <div key={example.id} className="space-y-1">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-700 dark:text-gray-300">{example.title}</span>
                      <span className="text-gray-600 dark:text-gray-400 font-mono text-base">
                        {example.forceDisplay}
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <motion.div
                        className="absolute left-0 top-0 h-full rounded-lg"
                        style={{ backgroundColor: example.color }}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${getLogScale(example.force)}%`,
                          boxShadow: selectedExample === example.id ? `0 0 10px ${example.color}` : 'none'
                        }}
                        transition={{ 
                          duration: animateBar && selectedExample === example.id ? 1.5 : 0.8,
                          ease: "easeOut"
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-medium text-lg mix-blend-difference">
                          {selectedExample === example.id ? 'SELECTED' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between text-gray-500 dark:text-gray-400 text-base mt-2">
                  <span>10⁻¹⁰ N</span>
                  <span>10⁰ N</span>
                  <span>10¹⁰ N</span>
                  <span>10²⁰ N</span>
                </div>
              </div>

              {/* Insight */}
              <motion.div 
                className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4"
                key={currentExample.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-lg text-yellow-800 dark:text-yellow-300">
                  <strong>Insight:</strong> {currentExample.insight}
                </div>
              </motion.div>
            </div>

            {/* Quick Check Quiz */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Quick Check
              </h4>
              
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  Why don't you feel gravitational attraction to other people around you?
                </p>
                
                <div className="space-y-2">
                  {[
                    { id: 'A', text: 'The gravitational constant G is extremely small, making forces between human-sized masses negligible' },
                    { id: 'B', text: 'Gravity only works on objects touching the Earth' },
                    { id: 'C', text: 'People are too small to have gravitational fields' },
                    { id: 'D', text: 'Air resistance cancels out gravitational attraction between people' }
                  ].map((option) => (
                    <motion.button
                      key={option.id}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-lg ${
                        userPrediction === option.id
                          ? userPrediction === 'A'
                            ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                      }`}
                      onClick={() => handlePrediction(option.id)}
                      disabled={userPrediction !== null}
                      whileHover={{ scale: userPrediction === null ? 1.02 : 1 }}
                      whileTap={{ scale: userPrediction === null ? 0.98 : 1 }}
                    >
                      <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">
                        {option.id}.
                      </span>
                      {option.text}
                    </motion.button>
                  ))}
                </div>

                {showPredictionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-lg ${
                      userPrediction === 'A'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {userPrediction === 'A' ? (
                      <div>
                        <div className="font-bold mb-2">Correct!</div>
                        <div>
                          G = 6.67 × 10⁻¹¹ is incredibly small, making gravitational forces between everyday objects 
                          like people completely negligible (around 10⁻⁷ N). Only when one object has enormous mass 
                          like Earth does gravity become noticeable.
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold mb-2">Not quite right</div>
                        <div>
                          The correct answer is A. Gravity acts between all objects with mass, but the gravitational 
                          constant G is so small that forces between human-sized masses are about a millionth of a Newton - 
                          far too weak to feel!
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 