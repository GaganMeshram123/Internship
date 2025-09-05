# Multi-Question Quiz Implementation Guide

This guide demonstrates how to implement multiple MCQ questions within a single Knowledge Check section, complete with progress indicators, scoring, and navigation.

## Features

- **Progress indicator** with visual bars showing current/completed questions
- **Question counter** displaying "Question X of Y" 
- **Score tracking** throughout the quiz
- **Next Question navigation** with smooth transitions
- **Quiz completion screen** with final score and retry functionality
- **Detailed explanations** for each question with context-specific feedback

## Implementation Steps

### 1. State Management

Add the following state variables to your component:

```tsx
const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([]);
const [score, setScore] = useState<number>(0);
const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
const [showQuizFeedback, setShowQuizFeedback] = useState<boolean>(false);
```

### 2. Questions Array Structure

Define your questions with the following structure:

```tsx
const questions = [
  {
    id: 'unique-question-id-1',
    question: 'Your first question text here?',
    options: [
      'Option A',
      'Option B', 
      'Option C',
      'Option D'
    ],
    correctAnswer: 'Option B',
    explanation: 'Detailed explanation of why this is correct and why other options are wrong.'
  },
  {
    id: 'unique-question-id-2', 
    question: 'Your second question text here?',
    options: [
      'Different Option A',
      'Different Option B',
      'Different Option C', 
      'Different Option D'
    ],
    correctAnswer: 'Different Option C',
    explanation: 'Another detailed explanation for the second question.'
  }
  // Add more questions as needed
];
```

### 3. Handler Functions

Implement these three key handler functions:

```tsx
// Handle quiz answer selection
const handleQuizAnswer = (answerText: string) => {
  setSelectedQuizAnswer(answerText);
  setShowQuizFeedback(true);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = answerText === currentQuestion.correctAnswer;
  
  if (isCorrect) {
    setScore(prev => prev + 1);
  }
  
  // Optional: Track interaction for analytics
  handleInteractionComplete({
    interactionId: 'your-quiz-id',
    value: answerText,
    isCorrect,
    timestamp: Date.now(),
    conceptId: 'your-concept-id',
    conceptName: 'Your Quiz Name',
    conceptDescription: `Question ${currentQuestionIndex + 1} of ${questions.length}`,
    question: {
      type: 'mcq',
      question: currentQuestion.question,
      options: currentQuestion.options
    }
  });
};

// Handle navigation to next question
const handleNextQuestion = () => {
  const newAnswered = [...questionsAnswered];
  newAnswered[currentQuestionIndex] = true;
  setQuestionsAnswered(newAnswered);
  
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedQuizAnswer(null);
    setShowQuizFeedback(false);
  } else {
    setIsQuizComplete(true);
  }
};

// Handle quiz retry
const handleRetryQuiz = () => {
  setCurrentQuestionIndex(0);
  setQuestionsAnswered([]);
  setScore(0);
  setIsQuizComplete(false);
  setSelectedQuizAnswer(null);
  setShowQuizFeedback(false);
};
```

### 4. UI Implementation

#### Header with Progress
```tsx
<div className="flex justify-between items-center mb-4">
  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
  <div className="text-lg text-slate-600 dark:text-slate-400">
    Question {currentQuestionIndex + 1} of {questions.length}
  </div>
</div>

{/* Progress indicator */}
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
```

#### Question Display
```tsx
{!isQuizComplete ? (
  <>
    <p className="text-lg mb-4">
      {questions[currentQuestionIndex].question}
    </p>
    
    <div className="space-y-2">
      {questions[currentQuestionIndex].options.map((option, index) => (
        <motion.button
          key={index}
          onClick={() => handleQuizAnswer(option)}
          disabled={showQuizFeedback}
          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
            selectedQuizAnswer === option
              ? showQuizFeedback
                ? option === questions[currentQuestionIndex].correctAnswer
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
              : 'border-slate-300 dark:border-slate-600 hover:border-blue-300'
          } ${showQuizFeedback ? 'cursor-default' : 'cursor-pointer'}`}
          whileHover={!showQuizFeedback ? { scale: 1.02 } : {}}
          whileTap={!showQuizFeedback ? { scale: 0.98 } : {}}
        >
          {option}
        </motion.button>
      ))}
    </div>
    
    {/* Feedback and Next Button */}
    <AnimatePresence>
      {showQuizFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`mt-4 p-4 rounded-lg ${
            selectedQuizAnswer === questions[currentQuestionIndex].correctAnswer
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
          }`}
        >
          {selectedQuizAnswer === questions[currentQuestionIndex].correctAnswer ? (
            <div>
              <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Correct!</div>
              <div className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                {questions[currentQuestionIndex].explanation}
              </div>
            </div>
          ) : (
            <div>
              <div className="font-semibold text-red-700 dark:text-red-300 mb-2">Not quite right.</div>
              <div className="text-lg text-red-600 dark:text-red-400 mb-4">
                {questions[currentQuestionIndex].explanation}
              </div>
            </div>
          )}
          
          <motion.button
            onClick={handleNextQuestion}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  </>
) : (
  // Quiz completion screen
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-8"
  >
    <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
      Quiz Complete! 🎉
    </h4>
    <div className="text-xl mb-6">
      Score: {score} out of {questions.length}
    </div>
    <div className="text-lg text-slate-600 dark:text-slate-400 mb-6">
      {score === questions.length
        ? "Perfect! You have excellent understanding!"
        : score >= questions.length / 2
        ? "Good job! You understand the key concepts."
        : "Keep studying! Review the concepts and try again."}
    </div>
    <motion.button
      onClick={handleRetryQuiz}
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Retry Quiz
    </motion.button>
  </motion.div>
)}
```

## Best Practices

### Question Design
- **Variety**: Mix different types of questions (conceptual, calculation-based, application)
- **Difficulty progression**: Start with easier questions, build to more challenging ones
- **Distractors**: Include plausible wrong answers that address common misconceptions
- **Clear language**: Use precise, unambiguous wording

### Tricky Options Strategy
- **Common mistakes**: Include options that result from typical student errors
- **Mathematical traps**: For calculation questions, include answers from partial calculations
- **Conceptual confusion**: Add options that test related but distinct concepts

### Explanations
- **Why correct**: Explain the reasoning behind the correct answer
- **Why incorrect**: Address why other options are wrong
- **Learning reinforcement**: Connect back to key concepts and principles
- **Step-by-step**: For calculations, show the complete solution process

## Example Implementation

See `avogadro-law/Slide2.tsx` for a complete working example with:
- Question 1: Conceptual understanding of equal volumes → equal particles
- Question 2: Calculation with tricky distractors (moles of atoms in diatomic molecules)

## Integration with Interaction Tracking

The quiz system integrates with the existing interaction tracking system:
- Each question answered generates an interaction event
- Correct/incorrect responses are tracked
- Question progression is monitored
- Quiz completion is recorded

This provides valuable analytics on student understanding and common misconceptions.