import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- NEW COMPONENT: An illustrative SVG Velocity-Time graph ---
const SimpleVelocityTimeGraph = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#64748b' : '#94a3b8';
    const highlightColor = '#3b82f6'; // Blue
    const areaColor = isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)';
  
    return (
      <div className="mt-6">
        <svg viewBox="0 0 300 200" className="w-full h-auto" aria-labelledby="graphTitle">
          <title id="graphTitle">A velocity-time graph showing constant positive acceleration.</title>
          {/* Axis Lines */}
          <line x1="30" y1="170" x2="280" y2="170" stroke={lineColor} strokeWidth="2" markerEnd="url(#vtg-arrow)" />
          <line x1="30" y1="170" x2="30" y2="20" stroke={lineColor} strokeWidth="2" markerEnd="url(#vtg-arrow)" />
  
          {/* Arrowhead Definition */}
          <defs>
            <marker id="vtg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={lineColor} />
            </marker>
          </defs>
  
          {/* Axis Labels */}
          <text x="155" y="195" textAnchor="middle" fill={textColor} fontSize="14">Time (t) in seconds</text>
          <text x="10" y="100" textAnchor="middle" transform="rotate(-90 10 100)" fill={textColor} fontSize="14">Velocity (v) in m/s</text>

          {/* Ticks */}
          <g fontSize="10" fill={textColor} textAnchor="middle">
             <text x="30" y="185">0</text>
          </g>
          <g fontSize="10" fill={textColor} textAnchor="end">
             <text x="25" y="175">0</text>
          </g>
          
          {/* Annotation: Area is Displacement */}
          <polygon points="30,170 230,170 230,65 30,155" fill={areaColor} stroke={highlightColor} strokeDasharray="2 2" />
          <text x="130" y="140" textAnchor="middle" fill={highlightColor} fontSize="12" fontWeight="bold">Area = Displacement (Δx)</text>

          {/* The motion graph line */}
          <line x1="30" y1="155" x2="280" y2="30" stroke={highlightColor} strokeWidth="2.5" />
          
          {/* Annotation: Slope is Acceleration */}
          <path d="M 205 170 L 205 80 L 30 80" stroke={highlightColor} strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <text x="117.5" y="70" textAnchor="middle" fill={highlightColor} fontSize="12" fontWeight="bold">Slope = Acceleration (a)</text>
          <text x="210" y="125" fill={highlightColor} fontSize="10">Δv (rise)</text>
          <text x="117.5" y="165" textAnchor="middle" fill={highlightColor} fontSize="10">Δt (run)</text>

          {/* Annotation: Instantaneous Velocity */}
          <circle cx="105" y="110" r="4" fill={highlightColor} />
          <text x="110" y="105" fill={highlightColor} fontSize="10" fontWeight="bold">(4s, 8m/s)</text>
        </svg>
      </div>
    );
};


export default function VelocityTimeGraphsSlide1() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  
  const questions = [
    {
      id: 'vtg-intro-q1',
      question: 'On a velocity-time graph, the vertical (Y) axis represents the object\'s...',
      options: ['Position', 'Acceleration', 'Instantaneous Velocity', 'Total Distance'],
      correctAnswer: 'Instantaneous Velocity',
      explanation: 'The Y-axis value at any point in time tells you how fast and in what direction the object is moving at that specific moment.'
    },
    {
      id: 'vtg-intro-q2',
      question: 'A horizontal line on a V-T graph at a position of v = 10 m/s means the object is...',
      options: ['Stopped', 'Accelerating', 'Moving at a constant velocity of 10 m/s', 'Returning to the origin'],
      correctAnswer: 'Moving at a constant velocity of 10 m/s',
      explanation: 'This is a key difference from P-T graphs. A horizontal line means the velocity is not changing, so it is constant.'
    },
    {
      id: 'vtg-intro-q3',
      question: 'If the line on a V-T graph is on the horizontal axis (where v=0) for 5 seconds, what is the object doing?',
      options: ['Moving at a constant speed', 'Accelerating', 'Stationary (stopped)', 'Moving backwards'],
      correctAnswer: 'Stationary (stopped)',
      explanation: 'A velocity of zero means the object is not moving. A line along the horizontal axis represents an object at rest.'
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
            <h3 className="text-2xl font-bold mb-4 text-blue-500">A New Perspective: Velocity-Time Graphs</h3>
            <p className="text-lg leading-relaxed mb-4">
              While Position-Time graphs show *where* an object is, <strong>Velocity-Time (V-T) graphs</strong> show *how fast* an object is moving.
            </p>
            <p className="text-lg leading-relaxed">
              These graphs give us direct insight into an object's velocity and allow us to easily determine its acceleration and displacement.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Reading the Axes</h3>
            <p className="text-lg leading-relaxed mb-4">
              The setup is slightly different from what we've seen before:
            </p>
            <ul className="list-disc list-inside space-y-3 text-lg">
                <li><strong>Vertical Axis (Y-Axis):</strong> This shows the object's <strong>Velocity (v)</strong>.</li>
                <li><strong>Horizontal Axis (X-Axis):</strong> This still shows the elapsed <strong>Time (t)</strong>.</li>
            </ul>

            {/* --- GRAPH ADDED HERE --- */}
            <SimpleVelocityTimeGraph isDarkMode={isDarkMode} />

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 mt-6 rounded-lg border-l-4 border-blue-400">
             <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
               <strong>Key Idea:</strong> The y-value of any point on the graph tells you the object's instantaneous velocity at that time.
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
              <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Exactly!' : 'A key distinction!'}</div>
              <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
              <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
            </motion.div>
          )}</AnimatePresence></> ) : ( 
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-4xl mb-4">📈</div>
            <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Graph Basics Set!</div>
            <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
          </motion.div> 
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="vtg-intro"
      slideTitle="Deeper Insights: Velocity-Time Graphs"
      moduleId="motion"
      submoduleId="velocity-time-graphs"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}