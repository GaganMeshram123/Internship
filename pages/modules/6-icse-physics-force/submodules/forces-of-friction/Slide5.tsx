import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // Using icons for feedback

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
    // Stores which box each item is in. 'unplaced' is the starting box.
    const [itemPlacement, setItemPlacement] = useState<Record<string, 'unplaced' | 'adv' | 'disadv'>>(
        () => Object.fromEntries(ALL_ITEMS.map(item => [item.id, 'unplaced']))
    );
    // Stores feedback for each item (correct/incorrect)
    const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>(
        () => Object.fromEntries(ALL_ITEMS.map(item => [item.id, null]))
    );
    // Score and completion tracking
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    // Interaction log (from your reference)
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    // --- REFS ---
    // Refs for the two drop zones
    const advDropRef = useRef<HTMLDivElement>(null);
    const disadvDropRef = useRef<HTMLDivElement>(null);

    // --- MEMOIZED LISTS ---
    // Filters the items based on their current placement
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

        // Check if dropped in Advantages box
        if (advRect && point.x >= advRect.left && point.x <= advRect.right && point.y >= advRect.top && point.y <= advRect.bottom) {
            placedIn = 'adv';
            isCorrect = item.category === 'adv';
        } 
        // Check if dropped in Disadvantages box
        else if (disadvRect && point.x >= disadvRect.left && point.x <= disadvRect.right && point.y >= disadvRect.top && point.y <= disadvRect.bottom) {
            placedIn = 'disadv';
            isCorrect = item.category === 'disadv';
        }

        if (placedIn) {
            // Update placement
            setItemPlacement(prev => ({ ...prev, [item.id]: placedIn! }));
            
            // Update feedback
            const feedbackValue = isCorrect ? 'correct' : 'incorrect';
            setFeedback(prev => ({ ...prev, [item.id]: feedbackValue }));

            // Update score
            if (isCorrect) {
                setScore(prev => prev + 1);
            }

            // Log the interaction
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
    const DraggableItem: React.FC<{ item: FrictionItem, isPlaced: boolean }> = ({ item, isPlaced }) => {
        const itemFeedback = feedback[item.id];
        let bgColor = "bg-white dark:bg-slate-700";
        if (isPlaced) {
            bgColor = itemFeedback === 'correct' ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50";
        }
        
        return (
            <motion.div
                layoutId={item.id} // This makes it animate between columns
                drag={!isPlaced} // Only allow dragging if unplaced
                onDragEnd={(e, info) => handleDragEnd(info, item)}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // Snap back if not dropped
                dragElastic={0.2}
                whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                className={`p-3 rounded-lg shadow cursor-grab active:cursor-grabbing flex justify-between items-center ${bgColor}`}
            >
                <span className="text-slate-800 dark:text-slate-200">{item.content}</span>
                {isPlaced && itemFeedback === 'correct' && <CheckCircle className="text-green-500" size={20} />}
                {isPlaced && itemFeedback === 'incorrect' && <XCircle className="text-red-500" size={20} />}
            </motion.div>
        );
    };

    // --- SLIDE JSX ---
    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300 p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
                Advantages and Disadvantages of Friction
            </h2>
            
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {/* Col 1: Advantages Drop Zone */}
                <div 
                    ref={advDropRef} 
                    className="bg-green-100/50 dark:bg-green-900/30 p-4 rounded-xl min-h-[400px] border-2 border-dashed border-green-500"
                >
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4 text-center">
                        Advantages (Good Friction)
                    </h3>
                    <div className="space-y-3">
                        {advItems.map(item => <DraggableItem key={item.id} item={item} isPlaced={true} />)}
                    </div>
                </div>

                {/* Col 2: Unplaced Items */}
                <div 
                    className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl min-h-[400px]"
                >
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">
                        Drag from here:
                    </h3>
                    <div className="space-y-3">
                        {unplacedItems.map(item => <DraggableItem key={item.id} item={item} isPlaced={false} />)}
                    </div>
                </div>

                {/* Col 3: Disadvantages Drop Zone */}
                <div 
                    ref={disadvDropRef} 
                    className="bg-red-100/50 dark:bg-red-900/30 p-4 rounded-xl min-h-[400px] border-2 border-dashed border-red-500"
                >
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4 text-center">
                        Disadvantages (Bad Friction)
                    </h3>
                    <div className="space-y-3">
                        {disadvItems.map(item => <DraggableItem key={item.id} item={item} isPlaced={true} />)}
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