import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function DerivingEquationsSlide2() {
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
      id: 'de-eq1-q1',
      question: 'The first equation of motion is derived directly from the definition of which quantity?',
      options: ['Velocity', 'Displacement', 'Acceleration', 'Time'],
      correctAnswer: 'Acceleration',
      explanation: 'The equation a = (v-u)/t is the definition of acceleration. Rearranging it gives v = u + at.'
    },
    {
      id: 'de-eq1-q2',
      question: 'In the equation v = u + at, what does the term "at" represent?',
      options: ['The total velocity', 'The initial velocity', 'The total displacement', 'The change in velocity'],
      correctAnswer: 'The change in velocity',
      explanation: 'Acceleration (a) multiplied by time (t) gives the total change in velocity (Δv) over that period.'
    },
    {
      id: 'de-eq1-q3',
      question: 'How does the V-T graph for this equation look?',
      options: ['A curve', 'A horizontal line', 'A straight, sloped line', 'A vertical line'],
      correctAnswer: 'A straight, sloped line',
      explanation: 'The equation is in the form y = mx + c. The slope (m) is the constant acceleration (a), which produces a straight line.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-green-500">Equation 1: From the Definition of Acceleration</h3>
            <p className="text-lg leading-relaxed mb-4">
              The first equation is the simplest. It comes directly from the definition of acceleration that we learned from V-T graphs.
            </p>
            <div className="text-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <p className="text-lg">Recall that acceleration is the slope of the V-T graph:</p>
              <BlockMath math="a = \frac{\text{Change in Velocity}}{\text{Time}} = \frac{v - u}{t}" />
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Rearranging the Formula</h3>
            <p className="text-lg leading-relaxed mb-4">
              Now, we just need to rearrange this definition to solve for the final velocity, <InlineMath math="v" />.
            </p>
            <ol className="list-decimal list-inside space-y-4 text-lg bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <li>Multiply both sides by <InlineMath math="t" />: <BlockMath math="at = v - u" /></li>
                <li>Add <InlineMath math="u" /> to both sides: <BlockMath math="u + at = v" /></li>
                <li>Write it in the standard form:</li>
            </ol>
          </div>
          
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
             <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg">
                <p className="text-center text-lg font-semibold">The First Equation of Motion:</p>
                <BlockMath math="v = u + at" />
                <p className="text-center text-sm">(Final Velocity = Initial Velocity + (Acceleration × Time))</p>
            </div>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Check the Logic</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-green-500' : questionsAnswered[index] ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'That\'s it!' : 'Let\'s trace it back.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">✅</div><div className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">First Equation Derived!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="de-first-eq"
      slideTitle="Deriving the First Equation: v = u + at"
      moduleId="motion"
      submoduleId="deriving-equations-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}