import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function DerivingEquationsSlide3() {
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
      id: 'de-eq2-q1',
      question: 'The second equation of motion is derived from which property of a velocity-time graph?',
      options: ['The slope of the line', 'The y-intercept', 'The area under the line', 'The length of the line'],
      correctAnswer: 'The area under the line',
      explanation: 'The area under a V-T graph represents displacement. We calculate this area to find the equation.'
    },
    {
      id: 'de-eq2-q2',
      question: 'The area under the V-T graph for an accelerating object is split into a rectangle and a triangle. What does the area of the rectangle (ut) represent?',
      options: [
        'The displacement due to acceleration.',
        'The total displacement.',
        'The displacement the object would have had with no acceleration (just its initial velocity).',
        'The change in velocity.'
      ],
      correctAnswer: 'The displacement the object would have had with no acceleration (just its initial velocity).',
      explanation: 'The rectangular portion represents the "base" travel from the initial velocity u over time t.'
    },
    {
      id: 'de-eq2-q3',
      question: 'The area of the triangle (½at²) represents what?',
      options: [
        'The velocity at the start.',
        'The additional displacement gained because of the acceleration.',
        'The average velocity.',
        'The time taken.'
      ],
      correctAnswer: 'The additional displacement gained because of the acceleration.',
      explanation: 'This triangular area is the "extra" displacement covered because the object was speeding up.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-purple-500">Equation 2: From the Area of a V-T Graph</h3>
            <p className="text-lg leading-relaxed mb-4">
              The second equation allows us to calculate <strong>displacement (s)</strong>. We derive it using our knowledge that <strong>displacement is the area under a V-T graph</strong>.
            </p>
            <p className="text-lg leading-relaxed">The area under a sloped line (constant acceleration) forms a trapezoid, which we can split into a rectangle and a triangle.</p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Step 1: Area of the Rectangle</h3>
             <p className="text-lg">The bottom rectangle has a height of the initial velocity (<InlineMath math="u" />) and a width of time (<InlineMath math="t" />).</p>
             <div className="bg-purple-50 dark:bg-purple-900/30 p-2 mt-2 rounded-lg"><BlockMath math="\text{Area}_1 = \text{height} \times \text{width} = u \times t" /></div>
          </div>
          
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">Step 2: Area of the Triangle</h3>
            <p className="text-lg">The top triangle has a base of time (<InlineMath math="t" />) and a height equal to the change in velocity (<InlineMath math="v - u" />).</p>
            <p className="text-lg mt-2">From the first equation, we know <InlineMath math="v-u = at" />. So the height is <InlineMath math="at" />.</p>
             <div className="bg-purple-50 dark:bg-purple-900/30 p-2 mt-2 rounded-lg"><BlockMath math="\text{Area}_2 = \frac{1}{2} \times \text{base} \times \text{height} = \frac{1}{2} \times t \times (at) = \frac{1}{2}at^2" /></div>
          </div>
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
             <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-lg">
                <p className="text-center text-lg font-semibold">The Second Equation of Motion:</p>
                <p className="text-center text-sm">Total Displacement = Area 1 + Area 2</p>
                <BlockMath math="s = ut + \frac{1}{2}at^2" />
            </div>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Check the Areas</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-purple-500' : questionsAnswered[index] ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Let\'s check the graph again.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">✅</div><div className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">Second Equation Derived!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="de-second-eq"
      slideTitle="Deriving the Second Equation: s = ut + ½at²"
      moduleId="motion"
      submoduleId="deriving-equations-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}