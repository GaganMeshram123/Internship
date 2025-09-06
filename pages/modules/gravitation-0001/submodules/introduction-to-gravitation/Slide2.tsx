import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function IntroGravitationSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedPeriod, setSelectedPeriod] = useState<string>('ancient');
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showAnswerResult, setShowAnswerResult] = useState<boolean>(false);
  const [currentDiscovery, setCurrentDiscovery] = useState<number>(0);
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'gravity-history-exploration',
      conceptId: 'gravity-history-concept',
      conceptName: 'History of Gravity Discovery',
      type: 'learning',
      description: 'Learning about the historical development of our understanding of gravity'
    },
    {
      id: 'scientist-contributions',
      conceptId: 'scientist-contributions-concept',
      conceptName: 'Scientist Contributions',
      type: 'learning',
      description: 'Understanding how different scientists contributed to gravity theory'
    },
    {
      id: 'timeline-exploration',
      conceptId: 'timeline-concept',
      conceptName: 'Historical Timeline',
      type: 'learning',
      description: 'Exploring the chronological development of gravity understanding'
    },
    {
      id: 'gravity-quiz',
      conceptId: 'gravity-quiz-concept',
      conceptName: 'Gravity History Quiz',
      type: 'judging',
      description: 'Testing knowledge about the history of gravity discoveries'
    }
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Historical periods and discoveries
  const historyPeriods = [
    {
      id: 'ancient',
      name: 'Ancient Times',
      period: '~400 BCE',
      title: 'Early Observations',
      description: 'Ancient philosophers like Aristotle believed heavy objects fell faster than light ones',
      keyFigure: 'Aristotle',
      discovery: 'Proposed that objects fall toward Earth because they "seek their natural place"',
      color: '#8B5CF6',
      icon: '🏛️'
    },
    {
      id: 'galileo',
      name: 'Scientific Revolution',
      period: '1590s',
      title: 'Galileo\'s Experiments',
      description: 'Galileo proved all objects fall at the same rate regardless of mass',
      keyFigure: 'Galileo Galilei',
      discovery: 'Demonstrated that acceleration due to gravity is constant for all objects',
      color: '#F59E0B',
      icon: '🔬'
    },
    {
      id: 'newton',
      name: 'Newton\'s Revolution',
      period: '1687',
      title: 'Universal Gravitation',
      description: 'Newton unified terrestrial and celestial mechanics with his law of universal gravitation',
      keyFigure: 'Sir Isaac Newton',
      discovery: 'Formulated that every particle attracts every other particle with a force proportional to their masses',
      color: '#EF4444',
      icon: '🍎'
    },
    {
      id: 'einstein',
      name: 'Modern Physics',
      period: '1915',
      title: 'Einstein\'s Relativity',
      description: 'Einstein revolutionized our understanding by describing gravity as curved spacetime',
      keyFigure: 'Albert Einstein',
      discovery: 'General Relativity: gravity is not a force but the curvature of spacetime caused by mass and energy',
      color: '#10B981',
      icon: '🌌'
    }
  ];

  const currentPeriod = historyPeriods.find(p => p.id === selectedPeriod) || historyPeriods[0];

  // Handle period change
  const handlePeriodChange = (period: any) => {
    setSelectedPeriod(period.id);
    
    const response: InteractionResponse = {
      interactionId: 'timeline-exploration',
      value: period.name,
      timestamp: Date.now(),
      conceptId: 'timeline-concept',
      conceptName: 'Historical Timeline',
      conceptDescription: `Explored ${period.name}: ${period.title}`
    };
    handleInteractionComplete(response);
  };

  // Handle quiz answer
  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowAnswerResult(true);
    
    const isCorrect = answer === 'C';
    const optionMap: Record<string, string> = {
      A: 'Aristotle',
      B: 'Galileo Galilei',
      C: 'Sir Isaac Newton',
      D: 'Albert Einstein'
    };
    const selectedText = optionMap[answer] || answer;

    const response: InteractionResponse = {
      interactionId: 'gravity-quiz',
      value: selectedText,
      isCorrect: isCorrect,
      timestamp: Date.now(),
      conceptId: 'gravity-quiz-concept',
      conceptName: 'Gravity History Quiz',
      conceptDescription: `Answered ${selectedText}. ${isCorrect ? 'Correct!' : 'Incorrect.'} Newton was the first to mathematically describe universal gravitation.`,
      question: {
        type: 'mcq',
        question: 'Who was the first scientist to mathematically describe universal gravitation?',
        options: ['Aristotle', 'Galileo Galilei', 'Sir Isaac Newton', 'Albert Einstein']
      }
    };
    handleInteractionComplete(response);
  };

  return (
    <SlideComponentWrapper
      slideId="gravitation-intro-history"
      slideTitle="History of Gravity Discovery"
      moduleId="gravitation-0001"
      submoduleId="introduction-to-gravitation"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-2rem)]">
          {/* Left column - Historical Timeline */}
          <div className="space-y-6">
            {/* Time Period Selection */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Timeline of Gravity Discovery
              </h3>
              
              <div className="space-y-3">
                {historyPeriods.map((period) => (
                  <motion.button
                    key={period.id}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                      selectedPeriod === period.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => handlePeriodChange(period)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{period.icon}</span>
                      <div>
                        <div className="font-bold text-lg">{period.name}</div>
                        <div className="text-lg opacity-90">{period.period}</div>
                      </div>
                    </div>
                    <div className="text-lg font-medium">{period.title}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Key Scientists */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Pioneer Scientists
              </h4>
              
              <div className="space-y-4">
                {historyPeriods.map((period, index) => (
                  <motion.div
                    key={period.id}
                    className="flex items-start p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-3 h-3 rounded-full mt-2 mr-3 flex-shrink-0" style={{backgroundColor: period.color}} />
                    <div>
                      <div className="text-lg font-bold" style={{color: period.color}}>
                        {period.keyFigure}
                      </div>
                      <div className="text-lg text-gray-600 dark:text-gray-400">
                        {period.period}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Detailed Information */}
          <div className="space-y-6">
            {/* Current Period Details */}
            <motion.div 
              className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6"
              key={currentPeriod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{currentPeriod.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {currentPeriod.title}
                  </h3>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    {currentPeriod.period}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Key Figure:
                  </div>
                  <div className="text-xl font-bold" style={{color: currentPeriod.color}}>
                    {currentPeriod.keyFigure}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Description:
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    {currentPeriod.description}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Major Discovery:
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    {currentPeriod.discovery}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Evolution of Understanding */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Evolution of Gravity Understanding
              </h4>
              
              <div className="space-y-3">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="text-lg font-medium text-purple-700 dark:text-purple-300">
                    🏛️ Ancient: "Natural motion toward Earth"
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="text-lg font-medium text-yellow-700 dark:text-yellow-300">
                    🔬 Renaissance: "All objects fall equally"
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="text-lg font-medium text-red-700 dark:text-red-300">
                    🍎 Classical: "Universal force between all masses"
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-lg font-medium text-green-700 dark:text-green-300">
                    🌌 Modern: "Curvature of spacetime"
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Quiz */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Historical Knowledge Check
              </h4>
              
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  Who was the first scientist to mathematically describe universal gravitation?
                </p>
                
                <div className="space-y-2">
                  {[
                    { id: 'A', text: 'Aristotle' },
                    { id: 'B', text: 'Galileo Galilei' },
                    { id: 'C', text: 'Sir Isaac Newton' },
                    { id: 'D', text: 'Albert Einstein' }
                  ].map((option) => (
                    <motion.button
                      key={option.id}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-lg ${
                        userAnswer === option.id
                          ? userAnswer === 'C'
                            ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                      }`}
                      onClick={() => handleAnswer(option.id)}
                      disabled={userAnswer !== null}
                      whileHover={{ scale: userAnswer === null ? 1.02 : 1 }}
                      whileTap={{ scale: userAnswer === null ? 0.98 : 1 }}
                    >
                      <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">
                        {option.id}.
                      </span>
                      {option.text}
                    </motion.button>
                  ))}
                </div>

                {showAnswerResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-lg ${
                      userAnswer === 'C'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {userAnswer === 'C' ? (
                      <div>
                        <div className="font-bold mb-2">Correct! 🎉</div>
                        <div>
                          Sir Isaac Newton was indeed the first to mathematically describe universal gravitation in 1687 
                          with his law: F = G(m₁m₂)/r². This unified terrestrial and celestial mechanics into one theory.
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold mb-2">Not quite right</div>
                        <div>
                          The correct answer is C. While Aristotle had theories about gravity, Galileo proved objects fall 
                          at the same rate, and Einstein revolutionized our understanding, Newton was the first to provide 
                          the mathematical description of universal gravitation.
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