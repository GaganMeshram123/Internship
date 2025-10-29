import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { QuizRenderer, QuizConfig } from '../../../common-components/QuizRenderer';
import { useThemeContext } from '@/lib/ThemeContext';

export default function HistoryOfForceSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedScientist, setSelectedScientist] = useState<string>('');
  const { isDarkMode } = useThemeContext();
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'scientist-exploration',
      conceptId: 'force-history',
      conceptName: 'Scientist Exploration',
      type: 'learning',
      description: 'Understanding force through the work of great scientists'
    },
  ];
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Scientists and their contributions
  const scientists = [
    {
      id: 'aristotle',
      name: 'Aristotle',
      period: 'about 2,300 years ago',
      quote: '"Objects move only when a force is acting on them."',
      belief: 'He believed that as soon as you stop pushing or pulling, the object stops moving.',
      color: '#8B4513',
      avatar: '🏛️'
    },
    {
      id: 'galileo',
      name: 'Galileo Galilei',
      period: 'about 400 years ago',
      quote: '"Objects keep moving unless something like friction or air slows them down."',
      belief: 'He showed that once an object starts moving, it will keep moving if no other force acts on it.',
      color: '#4682B4',
      avatar: '🔭'
    },
    {
      id: 'newton',
      name: 'Isaac Newton',
      period: 'about 350 years ago',
      quote: 'The true "Father of Forces."',
      belief: 'He connected all these ideas and wrote three laws of motion — the rules that still explain how everything moves, from a football to a planet!',
      color: '#8B0000',
      avatar: '🍎'
    }
  ];

  // Handle scientist selection
  const handleScientistSelection = (scientistId: string) => {
    setSelectedScientist(scientistId);
    
    handleInteractionComplete({
      interactionId: 'scientist-exploration',
      value: scientistId,
      timestamp: Date.now(),
      conceptId: 'force-history',
      conceptName: 'Scientist Exploration',
      conceptDescription: `Explored ${scientists.find(s => s.id === scientistId)?.name}'s contribution to understanding force`
    });
  };

  // Force examples
  const forceExamples = [
    {
      id: 'swing',
      action: 'Pushing a swing',
      description: 'to make it move',
      icon: '🧒'
    },
    {
      id: 'door',
      action: 'Pulling a door',
      description: 'to open it',
      icon: '🚪'
    },
    {
      id: 'football',
      action: 'Kicking a football',
      description: 'to move it forward',
      icon: '⚽'
    }
  ];

  // Quiz configuration
  const quizConfig: QuizConfig = {
    questions: [
      {
        id: 'toy-car-friction',
        question: 'Ravi gives his toy car a gentle push. It moves forward for some time and then stops. He says, "The car stopped because I stopped pushing it." What is the correct explanation for why the car stopped?',
        options: [
          'The car needs a continuous push to keep moving',
          'The car stopped because there was no force acting on it',
          'The car stopped because friction opposed its motion',
          'The car\'s mass was too small to keep moving'
        ],
        correctAnswer: 'The car stopped because friction opposed its motion',
        explanation: 'Galileo discovered that objects in motion tend to stay in motion unless acted upon by another force. The toy car stopped because friction (between the wheels and ground, and air resistance) opposed its motion, gradually slowing it down until it stopped.'
      },
      {
        id: 'scientist-beliefs',
        question: 'Which scientist correctly explained that objects keep moving unless something stops them?',
        options: [
          'Aristotle',
          'Galileo Galilei',
          'Isaac Newton',
          'All three scientists agreed on this'
        ],
        correctAnswer: 'Galileo Galilei',
        explanation: 'Galileo Galilei was the first to correctly understand that objects in motion will continue moving unless acted upon by forces like friction or air resistance. This was revolutionary thinking that contradicted Aristotle\'s earlier beliefs.'
      },
      {
        id: 'force-definition',
        question: 'According to the lesson, what is a force?',
        options: [
          'Something that only makes objects move faster',
          'A push or pull that can make an object move, stop, change direction, or change shape',
          'Only the energy inside moving objects',
          'Something that only works on heavy objects'
        ],
        correctAnswer: 'A push or pull that can make an object move, stop, change direction, or change shape',
        explanation: 'A force is defined as a push or pull that can affect an object in multiple ways: it can make it start moving, stop moving, change direction, or even change its shape. This comprehensive definition covers all the ways forces can act on objects.'
      }
    ],
    title: 'Quick Check',
    conceptId: 'force-understanding',
    conceptName: 'Force and Motion Quick Check',
    conceptDescription: 'Testing understanding of force history and basic concepts',
    showProgress: true
  };

  const selectedScientistData = scientists.find(s => s.id === selectedScientist);

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content and Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">History of Force</h3>
            
            {/* Scientists Timeline */}
            <div className="space-y-6">
              {scientists.map((scientist, index) => (
                <motion.div
                  key={scientist.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedScientist === scientist.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-slate-300 dark:border-slate-600 hover:border-blue-300'
                  }`}
                  onClick={() => handleScientistSelection(scientist.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{scientist.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg" style={{ color: scientist.color }}>
                          {scientist.name}
                        </h4>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          ({scientist.period})
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 italic mb-2">
                        {scientist.quote}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {scientist.belief}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What is Force Section */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">What is Force?</h3>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg mb-4">
              <p className="text-green-800 dark:text-green-200 font-medium text-lg">
                A force is a push or pull that can make an object move, stop, change direction, or change its shape.
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Whenever you push, pull, lift, throw, twist, or hit something — you are applying a force!
            </p>
            
            {/* Examples of Force */}
            <h4 className="font-semibold mb-3 text-orange-600 dark:text-orange-400">Examples of Force:</h4>
            <div className="space-y-3">
              {forceExamples.map((example) => (
                <div key={example.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-2xl">{example.icon}</span>
                  <div>
                    <span className="font-medium">{example.action}</span>
                    <span className="text-slate-600 dark:text-slate-400"> {example.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Elements */}
        <div className="space-y-6">
          
          {/* Scientist Detail View */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Scientist Spotlight</h3>
            {selectedScientistData ? (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-2">{selectedScientistData.avatar}</div>
                    <h4 className="text-2xl font-bold" style={{ color: selectedScientistData.color }}>
                      {selectedScientistData.name}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400">{selectedScientistData.period}</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Key Contribution:</h5>
                    <p className="text-slate-700 dark:text-slate-300 italic mb-3">
                      {selectedScientistData.quote}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {selectedScientistData.belief}
                    </p>
                  </div>
                  
                  {selectedScientistData.id === 'newton' && (
                    <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border-l-4 border-red-400">
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        Newton's three laws of motion are still used today to explain how rockets launch into space!
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <p>Click on any scientist above to learn more about their contributions to understanding force!</p>
              </div>
            )}
          </div>

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
      slideId="history-of-force"
      slideTitle="History of Force"
      moduleId="6-icse-physics-force"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}