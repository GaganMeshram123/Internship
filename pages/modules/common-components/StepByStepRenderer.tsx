import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from './concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Step Option Interface - flexible to handle different answer types
export interface StepOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// Step Interface - comprehensive to handle all use cases
export interface Step {
  id: string;
  question: string | React.ReactNode;
  options: StepOption[];
  correctAnswer: string; // The text of the correct option
  explanation: string | React.ReactNode;
  // Optional fields for specific use cases
  questionText?: string; // Plain text version for interaction tracking
  nextStep?: string; // Description of what comes next
  formula?: string; // LaTeX formula to display
  partialEquation?: string; // For building equations step by step
}

// Step Configuration Interface
export interface StepConfig {
  steps: Step[];
  title?: string;
  conceptId?: string;
  conceptName?: string;
  conceptDescription?: string;
  showProgress?: boolean;
  showFormulas?: boolean; // Whether to show formula displays
  mathRendering?: 'latex' | 'plain'; // How to render mathematical expressions
  completionMessage?: string | React.ReactNode;
  onComplete?: (totalSteps: number, correctAnswers: number) => void;
  // Problem statement section (like in squeeze theorem slide)
  problemStatement?: {
    text?: string;
    formula?: string | React.ReactNode;
    hint?: string | React.ReactNode;
  };
}

// Step Renderer Props
export interface StepByStepRendererProps {
  config: StepConfig;
  onInteractionComplete: (response: InteractionResponse) => void;
  className?: string;
}

// Main Step-by-Step Renderer Component
export const StepByStepRenderer: React.FC<StepByStepRendererProps> = ({
  config,
  onInteractionComplete,
  className = ""
}) => {
  const {
    steps,
    title = "Step-by-Step Guide",
    conceptId = "step-by-step",
    conceptName = "Step-by-Step Process",
    conceptDescription = "Interactive step-by-step learning",
    showProgress = true,
    showFormulas = false,
    mathRendering = 'latex',
    completionMessage = "Great work! You've completed all steps.",
    onComplete
  } = config;

  // Step state
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentStepData = steps[currentStep];

  // Handle step answer
  const handleAnswer = (answerText: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerText);
    setShowFeedback(true);
    
    const isCorrect = answerText === currentStepData.correctAnswer;
    
    // Update completed steps and correct answers
    if (!completedSteps[currentStep]) {
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[currentStep] = true;
      setCompletedSteps(newCompletedSteps);
      
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }
    }

    // Track interaction
    onInteractionComplete({
      interactionId: `step-${currentStep + 1}-${currentStepData.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId,
      conceptName,
      conceptDescription: `${conceptDescription} - Step ${currentStep + 1}`,
      question: {
        type: 'mcq' as const,
        question: currentStepData.questionText || (typeof currentStepData.question === 'string' ? currentStepData.question : `Step ${currentStep + 1}`),
        options: currentStepData.options.map(opt => opt.text)
      }
    });
  };

  // Move to next step
  const handleNextStep = () => {
    setSelectedAnswer('');
    setShowFeedback(false);

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
      if (onComplete) {
        onComplete(steps.length, correctAnswers + (selectedAnswer === currentStepData.correctAnswer ? 1 : 0));
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
      {/* Header - matches squeeze theorem pattern */}
      <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
        {title}
      </h3>

      {!isComplete ? (
        <>
          {/* Problem Statement - like in squeeze theorem slide */}
          {config.problemStatement && (
            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              {config.problemStatement.text && (
                <p className="text-lg font-medium mb-2">{config.problemStatement.text}</p>
              )}
              {config.problemStatement.formula && (
                <div className="mb-2">
                  {typeof config.problemStatement.formula === 'string' ? 
                    <BlockMath math={config.problemStatement.formula} /> : 
                    config.problemStatement.formula
                  }
                </div>
              )}
              {config.problemStatement.hint && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
                  {typeof config.problemStatement.hint === 'string' ? 
                    <p className="text-lg text-blue-700 dark:text-blue-300 font-medium">{config.problemStatement.hint}</p> :
                    config.problemStatement.hint
                  }
                </div>
              )}
            </div>
          )}

          {/* Formula Display (if enabled and formula exists) */}
          {showFormulas && currentStepData.formula && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <div className="text-center">
                <div className="text-lg mb-2">Current Formula:</div>
                <BlockMath math={currentStepData.formula} />
              </div>
            </div>
          )}

          {/* Partial Equation Display (for equation building) */}
          {currentStepData.partialEquation && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <div className="text-center">
                <InlineMath math={currentStepData.partialEquation} />
              </div>
            </div>
          )}

          {/* Step indicator - matches squeeze theorem pattern */}
          <div className="mb-4 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
            <p className="text-lg font-medium">Step {currentStep + 1} of {steps.length}</p>
          </div>

          {/* Question */}
          <p className="text-lg mb-4 font-medium">
            {renderQuestion(currentStepData.question)}
          </p>

          {/* Answer Options */}
          <div className="space-y-2 mb-4">
            {currentStepData.options.map((option, index) => {
              const isSelected = selectedAnswer === option.text;
              const btnClass = isSelected
                ? showFeedback
                  ? option.isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                  : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-slate-300 dark:border-slate-600 hover:border-blue-300';

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option.text)}
                  disabled={showFeedback}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${btnClass} ${
                    showFeedback ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                >
                  {mathRendering === 'latex' && (option.text.includes('\\') || option.text.includes('^')) ? 
                    renderMathContent(option.text) : option.text}
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
                  selectedAnswer === currentStepData.correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                    : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                }`}
              >
                <div className={`font-semibold mb-2 ${
                  selectedAnswer === currentStepData.correctAnswer
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {selectedAnswer === currentStepData.correctAnswer ? 'Correct!' : 'Not quite right.'}
                </div>
                
                {selectedAnswer !== currentStepData.correctAnswer && (
                  <div className="text-red-600 dark:text-red-400 mb-2">
                    The correct answer is: <strong>{renderMathContent(currentStepData.correctAnswer)}</strong>
                  </div>
                )}
                
                <div className="text-slate-600 dark:text-slate-400 mb-4">
                  {renderExplanation(currentStepData.explanation)}
                </div>

                {currentStep < steps.length - 1 && (
                  <>
                    {currentStepData.nextStep && (
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-3">
                        {currentStepData.nextStep}
                      </div>
                    )}
                    <motion.button
                      onClick={handleNextStep}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next Step →
                    </motion.button>
                  </>
                )}
                {currentStep === steps.length - 1 && (
                  <div className="text-lg font-medium text-green-600 dark:text-green-400">
                    ✓ {completionMessage || 'Solution Complete!'}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress indicator - positioned at bottom like original */}
          {showProgress && (
            <div className="mt-4 flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    completedSteps[index]
                      ? 'bg-blue-600'
                      : index === currentStep
                      ? 'bg-blue-400'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        /* Completion Message */
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="text-3xl mb-4">🎉</div>
          <div className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Steps Complete!
          </div>
          <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
            You completed {steps.length} steps with {correctAnswers}/{steps.length} correct answers.
          </div>
          <div className="text-lg">
            {typeof completionMessage === 'string' ? renderMathContent(completionMessage) : completionMessage}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StepByStepRenderer;