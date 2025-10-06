import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function ProblemSolvingSlide3() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  const quizProblem = "A ball is dropped from a 45m tall cliff. What is its velocity just before it hits the ground? (Use g ≈ 10 m/s²)";
  const questions = [
    {
      id: 'psk-ex2-q1',
      question: `For the problem "${quizProblem}", what are the values of the givens u, s, and a?`,
      options: ['u=0, s=45, a=10', 'u=10, s=45, a=0', 'u=0, s=10, a=45', 'u=45, s=0, a=10'],
      correctAnswer: 'u=0, s=45, a=10',
      explanation: '"Dropped" means initial velocity u=0. "45m tall" is the displacement s=45m. The acceleration due to gravity is given as a=10 m/s².'
    },
    {
      id: 'psk-ex2-q2',
      question: 'For the same problem, which equation is the best choice to solve for the final velocity v?',
      options: ['s = ut + ½at²', 'v = u + at', 'v² = u² + 2as'],
      correctAnswer: 'v² = u² + 2as',
      explanation: 'We are given u, s, and a, and want to find v. We don\'t know the time (t), so the "timeless" equation is the perfect choice.'
    },
    {
      id: 'psk-ex2-q3',
      question: 'What is the correct final answer to the cliff problem?',
      options: ['900 m/s', '30 m/s', '4.5 m/s', '450 m/s'],
      correctAnswer: '30 m/s',
      explanation: 'v² = u² + 2as → v² = 0² + 2(10)(45) → v² = 900 → v = √900 → v = 30 m/s.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-purple-500">Worked Example 2</h3>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                    A speedboat moving at 20 m/s slows down to 10 m/s with a constant acceleration of -2 m/s². What displacement does it cover?
                </p>
            </div>
            <div className="mt-6 space-y-4">
                <div>
                    <h4 className="font-bold text-lg"><span className="text-purple-500">Givens (G):</span></h4>
                    <ul className="list-disc list-inside ml-4 font-mono">
                        <li>"moving at" → <InlineMath math="u = 20 \, \text{m/s}" /></li>
                        <li>"slows down to" → <InlineMath math="v = 10 \, \text{m/s}" /></li>
                        <li>"acceleration of" → <InlineMath math="a = -2 \, \text{m/s}^2" /></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg"><span className="text-purple-500">Unknown (U):</span></h4>
                    <p className="ml-4 font-mono">"displacement" → <InlineMath math="s = ?" /></p>
                </div>
                <div>
                    <h4 className="font-bold text-lg"><span className="text-purple-500">Equation (E):</span></h4>
                    <p className="ml-4">We need an equation with <InlineMath math="u, v, a, s" />. Time is not involved. The choice is:</p>
                    <div className="text-center my-2"><BlockMath math="v^2 = u^2 + 2as" /></div>
                </div>
                 <div>
                    <h4 className="font-bold text-lg"><span className="text-purple-500">Substitute (S):</span></h4>
                    <div className="text-center my-2"><BlockMath math="(10)^2 = (20)^2 + 2(-2)s" /></div>
                </div>
                <div>
                    <h4 className="font-bold text-lg"><span className="text-purple-500">Solve (S):</span></h4>
                    <div className="font-mono text-center my-2 space-y-1">
                        <p><InlineMath math="100 = 400 - 4s" /></p>
                        <p><InlineMath math="100 - 400 = -4s" /></p>
                        <p><InlineMath math="-300 = -4s" /></p>
                        <p><InlineMath math="s = \frac{-300}{-4}" /></p>
                    </div>
                    <div className="p-3 bg-purple-200 dark:bg-purple-800 rounded-lg text-center font-bold text-xl"><BlockMath math="s = 75 \, \text{m}" /></div>
                </div>
            </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Your Turn to Analyze</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-purple-500' : questionsAnswered[index] ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Excellent!' : 'Check the given info.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">👍</div><div className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">Problem Solved!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="psk-example-2"
      slideTitle="Worked Example 2: Finding Displacement with Deceleration"
      moduleId="motion"
      submoduleId="problem-solving-kinematics"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}