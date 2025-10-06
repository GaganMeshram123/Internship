import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function DistanceDisplacementSlide3() {
  const { isDarkMode } = useThemeContext();

  // FIX 1: Declare the 'localInteractions' state variable.
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions = [
    {
      id: 'displacement-round-trip',
      question: 'A student walks 10 meters from their desk to the door, then walks 10 meters back to their desk. What is their final displacement?',
      options: ['0 m', '10 m', '20 m', 'Cannot be determined'],
      correctAnswer: '0 m',
      explanation: 'Displacement is the change in position from start to end. Since the student ended up in the exact same spot they started, their position did not change, so the displacement is zero.'
    },
    {
      id: 'displacement-vector',
      question: 'Displacement is a ______ quantity because it describes both magnitude and direction.',
      options: ['scalar', 'vector', 'fundamental', 'relative'],
      correctAnswer: 'vector',
      explanation: 'Vector quantities, like displacement and velocity, have both a magnitude and a direction. "5 meters East" is a displacement.'
    },
    {
      id: 'displacement-calculation',
      question: 'You start at position x = +2m and end at position x = +8m. What is your displacement?',
      options: ['+10 m', '-6 m', '+6 m', '+8 m'],
      correctAnswer: '+6 m',
      explanation: 'Displacement is calculated as final position minus initial position: Δx = x_final - x_initial = (+8m) - (+2m) = +6m.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-purple-500">What is Displacement?</h3>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Displacement</strong> is the change in an object's position. It is the straight-line distance and direction from the starting point to the ending point.
            </p>
            <p className="text-lg leading-relaxed">
              Think of it as the "shortcut" back to where you started. The actual path you took doesn't matter.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Displacement is a Vector</h3>
            <p className="text-lg leading-relaxed mb-4">
              Displacement is a <strong>vector quantity</strong>. This is super important! It means it has both a <strong>magnitude</strong> and a <strong>direction</strong>.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-400">
              <p className="text-lg font-medium text-purple-800 dark:text-purple-200">
                <strong>Formula:</strong> <InlineMath math="\Delta x = x_{final} - x_{initial}" />, where <InlineMath math="\Delta x" /> means "change in position".
              </p>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Path Doesn't Matter</h3>
            <p className="text-lg leading-relaxed">
               Let's use our 4m East, 3m North example. The distance was 7m. But the displacement is the straight line from start to finish.
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-mono text-center">Magnitude is the hypotenuse: <InlineMath math="\sqrt{4^2 + 3^2} = 5m" /></p>
                <p className="font-mono text-center text-xl mt-2">Displacement = 5m, Northeast</p>
            </div>
          </div>
        </div>

        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Check Your Understanding</h3>
            <div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div>
          </div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-purple-500' : questionsAnswered[index] ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? (
            <>
              <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p>
              <div className="space-y-3">{questions[currentQuestionIndex].options.map((option, index) => (<motion.button key={index} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div>
              <AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Exactly!' : 'Let\'s rethink that...'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence>
            </>
          ) : (<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🎯</div><div className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">Concept Mastered!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div>)}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="dd-what-is-displacement" 
      slideTitle="Understanding Displacement (A Vector Quantity)" 
      moduleId="motion" 
      submoduleId="distance-displacement"
      // FIX 2: Pass the 'localInteractions' state as a prop.
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}