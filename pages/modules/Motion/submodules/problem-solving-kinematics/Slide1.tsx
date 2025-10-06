import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ProblemSolvingSlide1() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  const questions = [
    {
      id: 'psk-strategy-q1',
      question: 'What is the very first and most important step in solving a kinematics word problem?',
      options: ['Guess the answer', 'Choose an equation immediately', 'List all the given variables and what you need to find', 'Draw a picture'],
      correctAnswer: 'List all the given variables and what you need to find',
      explanation: 'Organizing your information by listing the Givens and the Unknown is the crucial first step that guides all the others.'
    },
    {
      id: 'psk-strategy-q2',
      question: 'You are given `u`, `a`, and `s`, and asked to find `v`. Which step of the G.U.E.S.S. method does this represent?',
      options: ['The "Givens" and "Unknown" steps', 'The "Equation" step', 'The "Solve" step', 'The "Substitute" step'],
      correctAnswer: 'The "Givens" and "Unknown" steps',
      explanation: 'Identifying what you have (Givens: u, a, s) and what you need (Unknown: v) is the foundation of the strategy.'
    },
    {
      id: 'psk-strategy-q3',
      question: 'How do you choose the correct equation in the "E" step?',
      options: [
        'Pick the shortest one.',
        'Pick the one that looks the most difficult.',
        'Pick the one that contains all your Givens and your one Unknown.',
        'Always use v = u + at.'
      ],
      correctAnswer: 'Pick the one that contains all your Givens and your one Unknown.',
      explanation: 'The correct equation is the one that directly connects the variables you know to the single variable you want to find.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-cyan-500">From Knowledge to Action</h3>
            <p className="text-lg leading-relaxed mb-4">
              You've learned about displacement, velocity, acceleration, and the equations that connect them. Now it's time to use that knowledge to solve real-world problems.
            </p>
            <p className="text-lg leading-relaxed">
              Word problems can seem confusing, but a clear strategy turns them into simple puzzles.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">The G.U.E.S.S. Method</h3>
            <p className="text-lg leading-relaxed mb-4">
              Follow these five steps every time, and you'll become an expert problem-solver.
            </p>
            <ul className="space-y-3 text-lg">
                <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"><strong className="text-cyan-500">G</strong> - <strong>Givens:</strong> List every piece of information and its variable (<InlineMath math="u, v, a, s, t"/>).</li>
                <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"><strong className="text-cyan-500">U</strong> - <strong>Unknown:</strong> Identify the one variable you need to find.</li>
                <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"><strong className="text-cyan-500">E</strong> - <strong>Equation:</strong> Choose the kinematic equation that connects your givens and unknown.</li>
                <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"><strong className="text-cyan-500">S</strong> - <strong>Substitute:</strong> Plug your given values into the equation.</li>
                <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"><strong className="text-cyan-500">S</strong> - <strong>Solve:</strong> Calculate the final answer and include units!</li>
            </ul>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">Master the Strategy</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-cyan-500' : questionsAnswered[index] ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'That\'s the key!' : 'Think about the first step.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">📝</div><div className="text-2xl font-bold mb-2 text-cyan-600 dark:text-cyan-400">Strategy Learned!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="psk-strategy"
      slideTitle="A Strategy for Solving Motion Problems"
      moduleId="motion"
      submoduleId="problem-solving-kinematics"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}