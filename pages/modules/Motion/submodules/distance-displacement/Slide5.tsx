import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function DistanceDisplacementSlide5() {
  const { isDarkMode } = useThemeContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions = [
    {
      id: 'interactive-distance',
      question: 'Based on the robot\'s path from the Origin to Point B, what is the total distance it traveled?',
      options: ['8 units', '6 units', '10 units', '14 units'],
      correctAnswer: '14 units',
      explanation: 'The robot traveled 8 units East and then 6 units North. The total distance is the sum of these paths: 8 + 6 = 14 units.'
    },
    {
      id: 'interactive-displacement',
      question: 'What is the magnitude of the robot\'s displacement from the Origin to Point B? (Hint: a² + b² = c²)',
      options: ['8 units', '14 units', '10 units', '6 units'],
      correctAnswer: '10 units',
      explanation: 'Displacement is the straight line from start to finish. This forms a right-angled triangle. Using Pythagoras: √(8² + 6²) = √(64 + 36) = √100 = 10 units.'
    },
    {
      id: 'interactive-round-trip',
      question: 'If the robot returns from Point B directly to the Origin (0,0), what is its displacement for the ENTIRE trip?',
      options: ['10 units', '0 units', '24 units', '14 units'],
      correctAnswer: '0 units',
      explanation: 'For the entire round trip, the robot starts at the origin and ends at the origin. Since the starting and ending points are the same, the final displacement is zero.'
    }
  ];

  // handleQuizAnswer and handleNextQuestion logic is the same
  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg space-y-6`}>
            <h3 className="text-2xl font-bold mb-4 text-cyan-500">Putting It All Together</h3>
            <p className="text-lg leading-relaxed">
              Let's analyze the journey of a small robot on a grid. This will test your understanding of all the concepts we've covered.
            </p>

            <div className="bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg border-l-4 border-cyan-400">
              <h4 className="text-xl font-semibold text-cyan-800 dark:text-cyan-200 mb-2">The Robot's Path</h4>
              <ul className="list-decimal list-inside space-y-2 text-lg">
                <li>The robot starts at the <strong>Origin (0, 0)</strong>.</li>
                <li>It moves <strong>8 units East</strong> to Point A (8, 0).</li>
                <li>Then, it moves <strong>6 units North</strong> to Point B (8, 6).</li>
              </ul>
            </div>
            
            {/* Simple Visual Representation */}
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <svg viewBox="0 0 100 80" className="w-full">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill={isDarkMode ? '#e2e8f0' : '#334155'} />
                  </marker>
                </defs>
                {/* Grid lines */}
                <path d="M 10 0 L 10 75 M 20 0 L 20 75 M 30 0 L 30 75 M 40 0 L 40 75 M 50 0 L 50 75 M 60 0 L 60 75 M 70 0 L 70 75 M 80 0 L 80 75 M 90 0 L 90 75" stroke={isDarkMode ? '#475569' : '#e2e8f0'} strokeWidth="0.5"/>
                <path d="M 5 10 L 95 10 M 5 20 L 95 20 M 5 30 L 95 30 M 5 40 L 95 40 M 5 50 L 95 50 M 5 60 L 95 60 M 5 70 L 95 70" stroke={isDarkMode ? '#475569' : '#e2e8f0'} strokeWidth="0.5"/>
                
                {/* Path */}
                <path d="M 10 70 L 90 70 L 90 10" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                {/* Displacement */}
                <path d="M 10 70 L 90 10" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4" fill="none" markerEnd="url(#arrowhead)"/>
                
                <text x="5" y="75" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="5">Origin</text>
                <text x="88" y="75" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="5">A</text>
                <text x="93" y="12" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="5">B</text>
                
                <text x="45" y="65" fill="#f59e0b" fontSize="5">Distance (8+6=14)</text>
                <text x="40" y="45" fill="#06b6d4" fontSize="5">Displacement (10)</text>
              </svg>
            </div>
            
            <p className="text-lg leading-relaxed">Now, use this information to answer the questions on the right.</p>
        </div>

        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          {/* Quiz UI here, same structure */}
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">Analyze the Journey</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-cyan-500' : questionsAnswered[index] ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
           {!isQuizComplete ? (
            <>
              <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p>
              <div className="space-y-3">{questions[currentQuestionIndex].options.map((option, index) => (<motion.button key={index} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div>
              <AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Great analysis!' : 'Let\'s check the path again.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence>
            </>
          ) : (<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🤖</div><div className="text-2xl font-bold mb-2 text-cyan-600 dark:text-cyan-400">Analysis Complete!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div>)}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper slideId="dd-interactive-example" slideTitle="Interactive Example: Tracing a Path" moduleId="motion" submoduleId="distance-displacement">
      {slideContent}
    </SlideComponentWrapper>
  );
}