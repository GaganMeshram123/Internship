import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type Category = 'adv' | 'disadv';

interface FrictionItem {
    id: string;
    content: string;
    category: Category;
}

// --- CONSTANTS ---
const ALL_ITEMS: FrictionItem[] = [
    { id: 'item-1', content: 'Helps us walk or run without slipping.', category: 'adv' },
    { id: 'item-2', content: 'Wastes energy as heat.', category: 'disadv' },
    { id: 'item-3', content: 'Slows down or stops moving vehicles.', category: 'adv' },
    { id: 'item-4', content: 'Keeps knots and screws in place.', category: 'adv' },
    { id: 'item-5', content: 'Causes wear and tear in parts of machines.', category: 'disadv' },
    { id: 'item-6', content: 'Enables us to hold things, write, and tie knots.', category: 'adv' },
    { id: 'item-7', content: 'Helps cars move and stop safely.', category: 'adv' },
];


export default function ForcesOfFrictionSlide5() {
    const { isDarkMode } = useThemeContext();

    // --- STATE ---
    const [itemPlacement, setItemPlacement] = useState<Record<string, 'unplaced' | 'adv' | 'disadv'>>(
        () => Object.fromEntries(ALL_ITEMS.map(item => [item.id, 'unplaced']))
    );
    const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>(
        () => Object.fromEntries(ALL_ITEMS.map(item => [item.id, null]))
    );
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    // --- REFS ---
    const advDropRef = useRef<HTMLDivElement>(null);
    const disadvDropRef = useRef<HTMLDivElement>(null);

    // --- MEMOIZED LISTS ---
    const unplacedItems = useMemo(() => ALL_ITEMS.filter(item => itemPlacement[item.id] === 'unplaced'), [itemPlacement]);
    const advItems = useMemo(() => ALL_ITEMS.filter(item => itemPlacement[item.id] === 'adv'), [itemPlacement]);
    const disadvItems = useMemo(() => ALL_ITEMS.filter(item => itemPlacement[item.id] === 'disadv'), [itemPlacement]);

    // --- INTERACTION HANDLERS ---
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({
            ...prev,
            [response.interactionId]: response
        }));
    };

    const handleDragEnd = (info: any, item: FrictionItem) => {
        if (isComplete) return;

        const { point } = info;
        const advRect = advDropRef.current?.getBoundingClientRect();
        const disadvRect = disadvDropRef.current?.getBoundingClientRect();

        let placedIn: 'adv' | 'disadv' | null = null;
        let isCorrect = false;

        if (advRect && point.x >= advRect.left && point.x <= advRect.right && point.y >= advRect.top && point.y <= advRect.bottom) {
            placedIn = 'adv';
            isCorrect = item.category === 'adv';
        } 
        else if (disadvRect && point.x >= disadvRect.left && point.x <= disadvRect.right && point.y >= disadvRect.top && point.y <= disadvRect.bottom) {
            placedIn = 'disadv';
            isCorrect = item.category === 'disadv';
        }

        if (placedIn) {
            setItemPlacement(prev => ({ ...prev, [item.id]: placedIn! }));
            
            const feedbackValue = isCorrect ? 'correct' : 'incorrect';
            setFeedback(prev => ({ ...prev, [item.id]: feedbackValue }));

            if (isCorrect) {
                setScore(prev => prev + 1);
            }

            handleInteractionComplete({
                interactionId: `friction-drag-drop-${item.id}`,
                value: `Placed '${item.content}' in '${placedIn}'`,
                isCorrect: isCorrect,
                timestamp: Date.now(),
                conceptId: 'friction-advantages-disadvantages',
                conceptName: 'Friction Advantages/Disadvantages',
                conceptDescription: 'Sorting examples of friction',
            });

            // Check for completion
            if (unplacedItems.length - 1 === 0) {
                setIsComplete(true);
            }
        }
    };

    // --- ITEM COMPONENT ---
   // --- ITEM COMPONENT (Updated dragConstraints) ---
    const DraggableItem: React.FC<{ item: FrictionItem, isPlaced: boolean }> = ({ item, isPlaced }) => {
        const itemFeedback = feedback[item.id];
        let bgColor = "bg-white dark:bg-slate-700";
        if (isPlaced) {
            bgColor = itemFeedback === 'correct' ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50";
        }
        
        return (
            <motion.div
                layoutId={item.id}
                drag={!isPlaced}
                onDragEnd={(e, info) => handleDragEnd(info, item)}
                // --- REMOVED dragConstraints --- 
                dragElastic={0.2} // You can increase this slightly (e.g., 0.5) if it still feels too stiff
                whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                className={`p-3 rounded-lg shadow cursor-grab active:cursor-grabbing flex justify-between items-center ${bgColor}`}
            >
                <span className="text-slate-800 dark:text-slate-200">{item.content}</span>
                {isPlaced && itemFeedback === 'correct' && <CheckCircle className="text-green-500" size={20} />}
                {isPlaced && itemFeedback === 'incorrect' && <XCircle className="text-red-500" size={20} />}
            </motion.div>
        );
    };
    
    // --- QUIZ COMPONENT ---
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
    const [quizScore, setQuizScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    interface QuizQuestion {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }

    // --- FIXED QUESTIONS ARRAY (Removed "Correct!", "Right!", etc. from explanations) ---
    const questions: QuizQuestion[] = [
        {
            id: 'q1-adv',
            question: "Which of these is a major ADVANTAGE of friction?",
            options: ['It wastes energy as heat.', 'It lets us grip a pencil to write.', 'It wears out our shoes.'],
            correctAnswer: 'It lets us grip a pencil to write.',
            explanation: 'Without friction, the pencil would just slip through our fingers.'
        },
        {
            id: 'q2-disadv',
            question: "Which of these is a major DISADVANTAGE of friction?",
            options: ['It allows car brakes to work.', 'It causes engine parts to wear out.', 'It helps us walk without slipping.'],
            correctAnswer: 'It causes engine parts to wear out.',
            explanation: 'The rubbing of metal parts causes wear and tear, which is why we use oil (a lubricant) to reduce it.'
        },
        {
            id: 'q3-concept',
            question: "If friction suddenly disappeared, what would happen?",
            options: ['Everything would stop moving.', 'We couldn\'t pick anything up.', 'It would become very hot.'],
            correctAnswer: 'We couldn\'t pick anything up.',
            explanation: 'We rely on friction to hold objects. Without it, everything would be perfectly slippery.'
        }
    ];

    const handleQuizAnswer = (answerText: string) => {
        if (showFeedback || isQuizComplete) return;

        setSelectedAnswer(answerText);
        setShowFeedback(true);

        const current = questions[currentQuestionIndex];
        const isCorrect = answerText === current.correctAnswer;
        if (isCorrect) {
          setQuizScore(prev => prev + 1);
        }

        handleInteractionComplete({
          interactionId: `friction-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'friction-advantages-disadvantages',
          conceptName: 'Friction Adv/Disadv Quiz',
          conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
          question: {
            type: 'mcq',
            question: current.question,
            options: current.options
          }
        });
    };

    const handleNextQuestion = () => {
        const newAnswered = [...questionsAnswered];
        newAnswered[currentQuestionIndex] = true;
        setQuestionsAnswered(newAnswered);

        setSelectedAnswer('');
        setShowFeedback(false);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsQuizComplete(true);
        }
    };

    // --- SLIDE JSX ---
    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300 p-8">
          {/*   <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
                Advantages and Disadvantages of Friction
            </h2>
             */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 mb-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-center"
                    >
                        <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">Activity Complete!</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            You scored {score} out of {ALL_ITEMS.length}!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- NEW 2-COLUMN LAYOUT --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                
                {/* --- LEFT COLUMN --- */}
                <div className="space-y-6 flex flex-col">
                    {/* Col 2: Unplaced Items */}
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">
                            Drag from here:
                        </h3>
                        <div className="space-y-3">
                            {unplacedItems.map(item => <DraggableItem key={item.id} item={item} isPlaced={false} />)}
                        </div>
                    </div>

                    {/* --- "ETC" CARD ADDED --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                            Friction: A Necessary "Evil"?
                        </h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            This activity shows that friction is a bit of both! We can't live without it, but we also spend a lot of time and energy trying to reduce it.
                        </p>
                        <ul className="mt-4 space-y-2 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li><strong>Without it:</strong> We couldn't walk, hold things, or stop our cars.</li>
                            <li><strong>With it:</strong> Machines wear out, and we waste fuel (energy) just to overcome it.</li>
                        </ul>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="space-y-6 flex flex-col">
                    {/* Col 1: Advantages Drop Zone */}
                    <div 
                        ref={advDropRef} 
                        className="bg-green-100/50 dark:bg-green-900/30 p-4 rounded-xl min-h-[300px] border-2 border-dashed border-green-500"
                    >
                        <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4 text-center">
                            Advantages (Good Friction)
                        </h3>
                        <div className="space-y-3">
                            {advItems.map(item => <DraggableItem key={item.id} item={item} isPlaced={true} />)}
                        </div>
                    </div>

                    {/* Col 3: Disadvantages Drop Zone */}
                    <div 
                        ref={disadvDropRef} 
                        className="bg-red-100/50 dark:bg-red-900/30 p-4 rounded-xl min-h-[300px] border-2 border-dashed border-red-500"
                    >
                        <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4 text-center">
                            Disadvantages (Bad Friction)
                        </h3>
                        <div className="space-y-3">
                            {disadvItems.map(item => <DraggableItem key={item.id} item={item} isPlaced={true} />)}
                        </div>
                    </div>

                    {/* --- QUIZ CARD ADDED HERE --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="flex space-x-2 mb-6">
                            {questions.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 flex-1 rounded ${
                                        index === currentQuestionIndex
                                            ? 'bg-blue-500' // Active
                                            : questionsAnswered[index]
                                            ? 'bg-blue-300 dark:bg-blue-800' // Answered
                                            : 'bg-slate-300 dark:bg-slate-600' // Unanswered
                                    }`}
                                />
                            ))}
                        </div>
                        
                        {!isQuizComplete ? (
                            <>
                                <div className="text-lg mb-4 text-slate-800 dark:text-slate-200 min-h-[4rem]">{questions[currentQuestionIndex].question}</div>
                                <div className="space-y-3">
                                    {questions[currentQuestionIndex].options.map((option, idx) => {
                                        const disabled = showFeedback;
                                        const selected = selectedAnswer === option;
                                        const correct = option === questions[currentQuestionIndex].correctAnswer;
                                        
                                        // --- THIS IS THE FIXED LOGIC ---
                                        let buttonClass = 'border-slate-300 dark:border-slate-600 hover:border-blue-400';
                                        if (showFeedback) {
                                            if (selected && correct) {
                                                // User's correct choice
                                                buttonClass = 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200';
                                            } else if (selected && !correct) {
                                                // User's incorrect choice
                                                buttonClass = 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200';
                                            } else {
                                                // Other options
                                                buttonClass = 'border-slate-300 dark:border-slate-600 opacity-50';
                                            }
                                        }
                                        // --- END OF FIX ---
                                        
                                        return (
                                            <motion.button
                                                key={idx}
                                                onClick={() => handleQuizAnswer(option)}
                                                disabled={disabled}
                                                className={`w-full p-3 rounded-lg text-left transition-all border-2 ${buttonClass} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
                                                whileHover={!disabled ? { scale: 1.02 } : {}}
                                                whileTap={!disabled ? { scale: 0.98 } : {}}
                                            >
                                                {option}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                                
                                <AnimatePresence>
                                    {showFeedback && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700"
                                        >
                                            {/* --- THIS IS THE FIXED FEEDBACK TEXT --- */}
                                            <div className="flex items-start">
                                                {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? (
                                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                                                ) : (
                                                    <XCircle className="text-red-500 mr-2 flex-shrink-0" />
                                                )}
                                                <div>
                                                    <p className={`text-lg font-semibold ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                                        {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Not quite!'}
                                                    </p>
                                                    <div className="text-lg text-slate-700 dark:text-slate-300 mt-1">
                                                        {questions[currentQuestionIndex].explanation}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* --- END OF FIX --- */}
                                            <motion.button
                                                onClick={handleNextQuestion}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mt-4 w-full"
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
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                                <div className="text-3xl mb-4">🎉</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {quizScore} out of {questions.length}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="advantages-disadvantages-friction" // From index.tsx
            slideTitle="Advantages and Disadvantages" // From index.tsx
            moduleId="physics-force"
            submoduleId="forces-of-friction"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}