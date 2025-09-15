import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- Type Definitions ---
interface DraggableItem {
  id: string;
  text: string;
  type: 'rational' | 'irrational';
  zone?: 'rational' | 'irrational' | null;
  isCorrect?: boolean;
}
type TabKey = 'definitions' | 'operations' | 'advanced';

// --- Child Component for the Left Theory Panel ---
const LeftTheoryPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('definitions');
    
    const tabs = [
        { key: 'definitions', label: 'Definitions' },
        { key: 'operations', label: 'Operations' },
        { key: 'advanced', label: 'Advanced' },
    ] as const;

    const contentMap = {
        definitions: (
            <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                <h4 className="font-bold text-xl text-slate-800 dark:text-slate-200">The Decimal Property</h4>
                <p>The most defining feature of an irrational number is its decimal form: it goes on forever <strong className="text-purple-600 dark:text-purple-400">without ever repeating</strong>. This chaotic, unpredictable nature is why they cannot be written as simple fractions.</p>
                <ul className="list-disc pl-5 text-base space-y-1">
                    <li><strong className="text-blue-600 dark:text-blue-400">Rational:</strong> <InlineMath>1/3 = 0.333...</InlineMath> (Predictable repeating pattern)</li>
                    <li><strong className="text-purple-600 dark:text-purple-400">Irrational:</strong> <InlineMath>\pi = 3.14159...</InlineMath> (No repeating pattern)</li>
                </ul>
            </div>
        ),
        operations: (
            <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>
    <h4 className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-2">Mixing Numbers</h4>
    <p className="mb-2">
        <strong className="text-blue-600 dark:text-blue-400">Rational + Irrational:</strong> 
        The result is <strong className="text-purple-600 dark:text-purple-400">always irrational</strong> 
        (e.g., 5 + √2). The irrational number "wins."
    </p>
    <p>
        <strong className="text-purple-600 dark:text-purple-400">Irrational + Irrational:</strong> 
        The result is a wild card. It <strong className="text-amber-600">can be rational</strong> 
        (e.g., √2 + (−√2) = 0) or irrational (e.g., √2 + √3).
    </p>
</div>

            </div>
        ),
        advanced: (
  <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
    <div>
      <h4 className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-2">Density Property</h4>
      <p>
        Irrational numbers are <strong className="text-blue-600 dark:text-blue-400">dense</strong>. 
        This means that between any two numbers on the number line, no matter how close, you can always find an irrational number.
      </p>
    </div>
    <div>
      <h4 className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-2">Classification</h4>
      <p>
        Irrationals like the square root of 2 (√2) are <strong className="text-green-600">Algebraic</strong> (solutions to polynomial equations). 
        Others like pi (π) and e are <strong className="text-purple-600">Transcendental</strong>, meaning they cannot be solutions to such equations.
      </p>
    </div>
  </div>
)

    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <div className="border-b border-slate-200 dark:border-slate-700">
                <nav className="-mb-px flex space-x-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.key
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:hover:text-slate-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="pt-6 flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {contentMap[activeTab]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Main Component ---
export default function IrrationalPropertiesSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    
    // FIX: Re-introduced the handler function to correctly manage interaction state.
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideInteractions: Interaction[] = [
        { id: 'rational-vs-irrational-properties', conceptId: 'rational-vs-irrational', conceptName: 'Rational vs Irrational Properties', type: 'learning', description: 'Understanding the properties of rational and irrational numbers' },
        { id: 'numbers-matching-game', conceptId: 'numbers-matching', conceptName: 'Rational vs Irrational Matching', type: 'judging', description: 'Match each number to its correct category' }
    ];
    
    const [items, setItems] = useState<DraggableItem[]>([
        { id: 'item1', text: '1/2', type: 'rational' }, { id: 'item2', text: '\\pi', type: 'irrational' },
        { id: 'item3', text: '\\sqrt{9}', type: 'rational' }, { id: 'item4', text: '0.75', type: 'rational' },
        { id: 'item5', text: '\\sqrt{2}', type: 'irrational' }, { id: 'item6', text: '7', type: 'rational' },
        { id: 'item7', text: 'e', type: 'irrational' }, { id: 'item8', text: '0.333...', type: 'rational' }
    ]);
    
    const [showFeedback, setShowFeedback] = useState(false);
    const allPlaced = useMemo(() => items.every(it => it.zone), [items]);

    const handleDrop = (itemId: string, zone: 'rational' | 'irrational') => {
        if (showFeedback) return;
        setItems(prev => prev.map(it => (it.id === itemId ? { ...it, zone } : it)));
    };

    const checkAnswers = () => {
        if (!allPlaced) return;
        setItems(prev => prev.map(it => ({ ...it, isCorrect: it.zone === it.type })));
        setShowFeedback(true);
    };

    const RightMatchPanel = (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Challenge: Number Sorter</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Drag each number into its correct category.</p>
            <div className="grid grid-cols-2 gap-4 flex-grow mb-4">
                {(['rational', 'irrational'] as const).map(zoneType => (
                    <div
                        key={zoneType}
                        className={`rounded-lg p-3 flex flex-col gap-2 border-2 border-dashed ${zoneType === 'rational' ? 'border-blue-500/50 bg-blue-50/20 dark:bg-blue-900/20' : 'border-purple-500/50 bg-purple-50/20 dark:bg-purple-900/20'}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { e.preventDefault(); handleDrop(e.dataTransfer.getData('text/plain'), zoneType); }}
                    >
                        <h4 className={`text-center font-bold ${zoneType === 'rational' ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`}>{zoneType.charAt(0).toUpperCase() + zoneType.slice(1)}</h4>
                        <div className="flex flex-wrap gap-2 flex-1 justify-center content-start pt-2 min-h-[10rem]">
                            {items.filter(it => it.zone === zoneType).map(it => (
                                <div
                                    key={it.id}
                                    className={`px-3 py-1.5 rounded-lg text-lg shadow-sm ${showFeedback ? (it.isCorrect ? 'bg-green-100 dark:bg-green-600/40' : 'bg-red-100 dark:bg-red-600/40') : 'bg-slate-200 dark:bg-slate-700'} cursor-grab`}
                                    draggable={!showFeedback} onDragStart={(e) => e.dataTransfer.setData('text/plain', it.id)}>
                                    <InlineMath math={it.text} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-3 min-h-[5rem] mb-4 flex items-center justify-center">
                <div className="flex flex-wrap gap-2 justify-center">
                    {items.filter(it => !it.zone).map(it => (
                        <div key={it.id} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-600 rounded-lg text-lg cursor-grab shadow-md" draggable={!showFeedback} onDragStart={(e) => e.dataTransfer.setData('text/plain', it.id)}>
                            <InlineMath math={it.text} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={checkAnswers} disabled={!allPlaced || showFeedback} className="px-6 py-2 rounded-md font-medium text-white transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:cursor-not-allowed">Check Answers</button>
            </div>
        </div>
    );
    
    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 bg-slate-100 dark:bg-slate-900`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-stretch">
                {/* FIX: Passing the correct handler function to the prop. */}
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <LeftTheoryPanel />
                </TrackedInteraction>
                <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
                    {RightMatchPanel}
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper slideId="rational-vs-irrational-properties" slideTitle="Properties of Irrational Numbers" moduleId="irrational-numbers" submoduleId="introduction" interactions={localInteractions}>
            {slideContent}
        </SlideComponentWrapper>
    );
}