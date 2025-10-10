import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from './concept';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Quiz Question Interface - flexible to handle different question types
export interface QuizQuestion {
  id: string;
  question: string | React.ReactNode;
  options: string[];
  correctAnswer: string;
  explanation: string | React.ReactNode;
  // Optional fields for specific use cases
  sequence?: number[]; // For sequence-related questions
  questionText?: string; // Plain text version for interaction tracking
}

// Quiz Configuration Interface
export interface QuizConfig {
  questions: QuizQuestion[];
  title?: string;
  conceptId?: string;
  conceptName?: string;
  conceptDescription?: string;
  showProgress?: boolean;
  showSequence?: boolean; // Whether to show sequence display for each question
  mathRendering?: 'latex' | 'plain'; // How to render mathematical expressions
  onComplete?: (score: number, total: number) => void;
}

// Quiz Renderer Props
export interface QuizRendererProps {
  config: QuizConfig;
  onInteractionComplete: (response: InteractionResponse) => void;
  className?: string;
}

// Sequence Display Component (for sequence-specific quizzes)
const SequenceDisplay: React.FC<{ sequence: number[]; title?: string }> = ({ 
  sequence, 
  title = "Sequence" 
}) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm mb-4">
    <h4 className="text-base font-semibold mb-3 text-blue-600 dark:text-blue-400 text-center">
      {title}
    </h4>
    <div className="flex justify-center items-center space-x-3 text-lg font-mono">
      {sequence.map((term, index) => (
        <React.Fragment key={index}>
          <span className="bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-lg border-2 border-blue-200 dark:border-blue-700">
            {term}
          </span>
          {index < sequence.length - 1 && (
            <span className="text-blue-600 dark:text-blue-400">,</span>
          )}
        </React.Fragment>
      ))}
      <span className="text-blue-600 dark:text-blue-400 ml-2">...</span>
    </div>
  </div>
);

// Main Quiz Renderer Component
export const QuizRenderer: React.FC<QuizRendererProps> = ({
  config,
  onInteractionComplete,
  className = ""
}) => {
  const {
    questions,
    title = "Quick Check",
    conceptId = "quiz",
    conceptName = "Quiz",
    conceptDescription = "Quiz questions",
    showProgress = true,
    showSequence = false,
    mathRendering = 'latex',
    onComplete
  } = config;

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle quiz answer
  const handleAnswer = (answerText: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerText);
    setShowFeedback(true);
    
    const isCorrect = answerText === currentQuestion.correctAnswer;
    
    // Update score for new answers
    const newQuestionsAnswered = [...questionsAnswered];
    if (!newQuestionsAnswered[currentQuestionIndex]) {
      newQuestionsAnswered[currentQuestionIndex] = true;
      setQuestionsAnswered(newQuestionsAnswered);
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
    }

    // Track interaction
    onInteractionComplete({
      interactionId: `quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId,
      conceptName,
      conceptDescription: `${conceptDescription} - Question ${currentQuestionIndex + 1}`,
      question: {
        type: 'mcq' as const,
        question: currentQuestion.questionText || (typeof currentQuestion.question === 'string' ? currentQuestion.question : `Question ${currentQuestionIndex + 1}`),
        options: currentQuestion.options
      }
    });
  };

  // Move to next question
  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };

  // Render mathematical content
  const renderMathContent = (content: string) => {
    if (mathRendering === 'latex' && (content.includes('\\') || content.includes('^'))) {
      // Clean up LaTeX syntax for proper rendering
      const cleanLatex = content.replace(/\\\\\\\\/g, '\\\\').replace(/\\\\/g, '\\');
      return <InlineMath math={cleanLatex} />;
    }
    return content;
  };

  // Render question content
  const renderQuestion = (question: string | React.ReactNode) => {
    if (typeof question === 'string') {
      return renderMathContent(question);
    }
    return question;
  };

  // Render explanation content  
  const renderExplanation = (explanation: string | React.ReactNode) => {
    if (typeof explanation === 'string') {
      return renderMathContent(explanation);
    }
    return explanation;
  };

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{title}</h3>
        <div className="text-lg text-slate-600 dark:text-slate-400">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="flex space-x-2 mb-6">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded ${
                index === currentQuestionIndex
                  ? 'bg-blue-500'
                  : questionsAnswered[index]
                  ? 'bg-green-500'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
          ))}
        </div>
      )}

      {!isQuizComplete ? (
        <>
          {/* Question */}
          <div className="text-lg mb-4 font-medium">
            {renderQuestion(currentQuestion.question)}
          </div>

          {/* Sequence Display (if enabled and sequence exists) */}
          {showSequence && currentQuestion.sequence && (
            <SequenceDisplay 
              sequence={currentQuestion.sequence} 
              title="Sequence"
            />
          )}

          {/* Answer Options */}
          <div className="space-y-2 mb-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const btnClass = isSelected
                ? showFeedback
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                  : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-slate-300 dark:border-slate-600 hover:border-blue-300';

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${btnClass} ${
                    showFeedback ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                >
                  {renderMathContent(option)}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-lg ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                    : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                }`}
              >
                <div className={`font-semibold mb-2 ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite right.'}
                </div>
                
                {selectedAnswer !== currentQuestion.correctAnswer && (
                  <div className="text-red-600 dark:text-red-400 mb-2">
                    The correct answer is: <strong>{renderMathContent(currentQuestion.correctAnswer)}</strong>
                  </div>
                )}
                
                <div className="text-slate-600 dark:text-slate-400 mb-4">
                  {renderExplanation(currentQuestion.explanation)}
                </div>
                
                <motion.button
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Quiz Complete */
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="text-3xl mb-4">🎉</div>
          <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
            Quiz Complete!
          </div>
          <div className="text-lg text-slate-600 dark:text-slate-400">
            You scored {score} out of {questions.length}
          </div>
          <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
            {score === questions.length ? 'Perfect score! 🌟' :
              score >= questions.length * 0.8 ? 'Excellent work! 👏' :
                score >= questions.length * 0.6 ? 'Good job! 👍' :
                  'Keep practicing! 💪'}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizRenderer;