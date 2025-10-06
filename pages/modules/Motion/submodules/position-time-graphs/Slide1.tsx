import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- NEW COMPONENT: An illustrative SVG graph ---
const SimplePositionTimeGraph = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const textColor = isDarkMode ? '#cbd5e1' : '#475569';
  const lineColor = isDarkMode ? '#64748b' : '#94a3b8';
  const highlightColor = '#3b82f6'; // Blue for annotations

  return (
    <div className="mt-6">
      <svg viewBox="0 0 300 200" className="w-full h-auto" aria-labelledby="graphTitle">
        <title id="graphTitle">A simple position-time graph showing constant positive velocity.</title>
        {/* Axis Lines */}
        <line x1="30" y1="170" x2="280" y2="170" stroke={lineColor} strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="30" y1="170" x2="30" y2="20" stroke={lineColor} strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Arrowhead Definition */}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={lineColor} />
          </marker>
        </defs>

        {/* Axis Labels */}
        <text x="155" y="195" textAnchor="middle" fill={textColor} fontSize="14">Time (t) in seconds</text>
        <text x="15" y="100" textAnchor="middle" transform="rotate(-90 15 100)" fill={textColor} fontSize="14">Position (x) in meters</text>

        {/* Ticks and Gridlines */}
        <g fontSize="10" fill={textColor} textAnchor="middle">
          <text x="30" y="185">0</text>
          <text x="155" y="185">5s</text>
          <text x="280" y="185">10s</text>
        </g>
        <g fontSize="10" fill={textColor} textAnchor="end">
          <text x="25" y="175">0m</text>
          <text x="25" y="95">5m</text>
          <text x="25" y="20">10m</text>
        </g>
        
        {/* The motion graph line */}
        <line x1="30" y1="170" x2="280" y2="20" stroke={highlightColor} strokeWidth="2.5" />

        {/* Annotation: Highlight a point */}
        <circle cx="155" cy="95" r="4" fill={highlightColor} />
        <text x="160" y="90" fill={highlightColor} fontSize="12" fontWeight="bold">(5s, 5m)</text>
        <text x="160" y="105" fill={highlightColor} fontSize="10">At 5s, position is 5m.</text>

        {/* Annotation: Slope */}
        <path d="M 155 170 L 155 95 L 30 95" stroke={highlightColor} strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <text x="92.5" y="85" textAnchor="middle" fill={highlightColor} fontSize="12" fontWeight="bold">Slope = Velocity</text>
        <text x="160" y="132.5" fill={highlightColor} fontSize="10">Δx (rise)</text>
        <text x="92.5" y="165" textAnchor="middle" fill={highlightColor} fontSize="10">Δt (run)</text>

      </svg>
    </div>
  );
};


export default function PositionTimeGraphsSlide1() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  
  const questions = [
    {
      id: 'ptg-intro-q1',
      question: 'On a standard position-time graph, what physical quantity is represented on the vertical (Y) axis?',
      options: ['Time', 'Speed', 'Position', 'Acceleration'],
      correctAnswer: 'Position',
      explanation: 'The vertical axis shows the object\'s position, usually measured in meters, relative to an origin.'
    },
    {
      id: 'ptg-intro-q2',
      question: 'The horizontal (X) axis of a position-time graph always represents what quantity?',
      options: ['Distance', 'Displacement', 'Velocity', 'Time'],
      correctAnswer: 'Time',
      explanation: 'The horizontal axis shows the passage of time, usually measured in seconds, allowing us to see how position changes over time.'
    },
    {
      id: 'ptg-intro-q3',
      question: 'A single point, like (5 s, 10 m), on a position-time graph tells you...',
      options: [
        'The object\'s total distance traveled.',
        'The object\'s average speed.',
        'The object\'s exact position at a specific moment.',
        'How long the object was accelerating.'
      ],
      correctAnswer: 'The object\'s exact position at a specific moment.',
      explanation: 'Each point is a coordinate pair (time, position), giving a snapshot of where the object is at that instant.'
    }
  ];

  const isQuizComplete = currentQuestionIndex >= questions.length;

  const handleQuizAnswer = (answer: string) => { 
    setSelectedAnswer(answer); 
    setShowFeedback(true); 
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev: number) => prev + 1);
    }
  };

  const handleNextQuestion = () => { 
    const newAnsweredState = [...questionsAnswered]; 
    newAnsweredState[currentQuestionIndex] = true; 
    setQuestionsAnswered(newAnsweredState); 
    setSelectedAnswer(''); 
    setShowFeedback(false); 
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
    }
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">A Picture of a Journey</h3>
            <p className="text-lg leading-relaxed mb-4">
              A <strong>Position-Time Graph</strong> is one of the most powerful tools in physics. It tells the complete story of an object's motion in a single picture.
            </p>
            <p className="text-lg leading-relaxed">
              Instead of just calculating numbers, we can see the motion visually.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Axes</h3>
            <p className="text-lg leading-relaxed mb-4">
              The setup is always the same:
            </p>
            <ul className="list-disc list-inside space-y-3 text-lg">
                <li><strong>Vertical Axis (Y-Axis):</strong> This shows the object's <strong>Position (x)</strong>.</li>
                <li><strong>Horizontal Axis (X-Axis):</strong> This shows the elapsed <strong>Time (t)</strong>.</li>
            </ul>

            {/* --- GRAPH ADDED HERE --- */}
            <SimplePositionTimeGraph isDarkMode={isDarkMode} />

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 mt-6 rounded-lg border-l-4 border-blue-400">
             <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
               <strong>Key Idea:</strong> The graph shows *where* an object is at *any given time*.
             </p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Reading the Graph</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (
            <motion.button 
              key={option} 
              onClick={() => handleQuizAnswer(option)} 
              disabled={showFeedback}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${
                showFeedback && selectedAnswer === option
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
              } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              whileHover={!showFeedback ? { scale: 1.02 } : {}} 
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
            >
              {option}
            </motion.button>
          ))}</div><AnimatePresence>{showFeedback && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}>
              <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Let\'s check the axes again.'}</div>
              <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
              <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
            </motion.div>
          )}</AnimatePresence></> ) : ( 
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Basics Understood!</div>
            <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
          </motion.div> 
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="ptg-intro"
      slideTitle="Visualizing Motion: Position-Time Graphs"
      moduleId="motion"
      submoduleId="position-time-graphs"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}