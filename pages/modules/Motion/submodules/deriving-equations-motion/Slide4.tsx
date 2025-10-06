import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function DerivingEquationsSlide4() {
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
      id: 'de-eq3-q1',
      question: 'The third equation, v² = u² + 2as, is most useful when you don\'t know or don\'t need which variable?',
      options: ['Displacement (s)', 'Acceleration (a)', 'Final Velocity (v)', 'Time (t)'],
      correctAnswer: 'Time (t)',
      explanation: 'It\'s often called the "timeless" equation because it relates the other four variables without needing to know the time taken.'
    },
    {
      id: 'de-eq3-q2',
      question: 'How is this third equation derived?',
      options: [
        'By finding the area under a new type of graph.',
        'By combining the first and second equations to eliminate time.',
        'From the definition of displacement.',
        'It is an experimental result and cannot be derived.'
      ],
      correctAnswer: 'By combining the first and second equations to eliminate time.',
      explanation: 'The derivation is purely algebraic. We rearrange the first equation to solve for "t" and then substitute that into the second equation.'
    },
    {
      id: 'de-eq3-q3',
      question: 'If a car accelerates from an initial velocity `u` over a displacement `s`, this equation allows you to directly calculate its...',
      options: ['Time taken', 'Final velocity', 'Average speed', 'Path traveled'],
      correctAnswer: 'Final velocity',
      explanation: 'If you know u, a, and s, you can directly solve for v without having to find the time first.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">Equation 3: The "Timeless" Equation</h3>
            <p className="text-lg leading-relaxed mb-4">
              Sometimes, we want to find the final velocity or displacement without knowing how long the motion took. The third equation is perfect for this, as it eliminates the time variable <InlineMath math="t" />.
            </p>
            <p className="text-lg leading-relaxed">It is derived algebraically by combining the first two equations.</p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Derivation (Algebra)</h3>
            <p className="text-lg"><strong>Step 1:</strong> Isolate <InlineMath math="t" /> from the first equation.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 my-2 rounded-lg"><BlockMath math="v = u + at \implies t = \frac{v-u}{a}" /></div>
            <p className="text-lg"><strong>Step 2:</strong> Substitute this expression for <InlineMath math="t" /> into the second equation <InlineMath math="s = ut + \frac{1}{2}at^2" />.</p>
            <p className="text-lg mt-2"><strong>Step 3:</strong> Perform the algebra (this gets a bit complex, but the result is simple!).</p>
             <div className="bg-slate-100 dark:bg-slate-700 p-2 mt-2 rounded-lg text-sm text-center">
                <InlineMath math="s = u(\frac{v-u}{a}) + \frac{1}{2}a(\frac{v-u}{a})^2 \implies 2as = 2uv - 2u^2 + v^2 - 2uv + u^2 \implies 2as = v^2 - u^2" />
            </div>
          </div>
          
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
             <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg">
                <p className="text-center text-lg font-semibold">The Third Equation of Motion:</p>
                <BlockMath math="v^2 = u^2 + 2as" />
            </div>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Understanding</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-blue-500' : questionsAnswered[index] ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Precisely!' : 'Let\'s review the purpose.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">✅</div><div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Third Equation Derived!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="de-third-eq"
      slideTitle="Deriving the Third Equation: v² = u² + 2as"
      moduleId="motion"
      submoduleId="deriving-equations-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}