import React, { useMemo, useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface DraggableItem {
  id: string;
  text: string;
  type: 'rational' | 'irrational';
  zone?: 'rational' | 'irrational' | null;
  isCorrect?: boolean;
}

export default function IrrationalIntroSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'rational-vs-irrational-content',
      conceptId: 'rational-vs-irrational',
      conceptName: 'Rational vs Irrational Concept',
      type: 'learning',
      description: 'Understanding which numbers are rational and which are irrational'
    },
    {
      id: 'numbers-matching',
      conceptId: 'numbers-matching',
      conceptName: 'Rational vs Irrational Matching',
      type: 'judging',
      description: 'Match each number to Rational or Irrational',
      question: {
        type: 'matching',
        question: 'Match each number to Rational or Irrational',
        matching: {
          left: ['1/2', '$\pi$', '$\sqrt{9}$', '0.75', '$\sqrt{2}$', '7', '$e$', '$0.333...$'],
          right: ['rational', 'irrational']
        }
      }
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Items for matching activity
  const [items, setItems] = useState<DraggableItem[]>([
    { id: 'item1', text: '1/2', type: 'rational', zone: null },
    { id: 'item2', text: '$\pi$', type: 'irrational', zone: null },
    { id: 'item3', text: '$\sqrt{9}$', type: 'rational', zone: null },
    { id: 'item4', text: '0.75', type: 'rational', zone: null },
    { id: 'item5', text: '$\sqrt{2}$', type: 'irrational', zone: null },
    { id: 'item6', text: '7', type: 'rational', zone: null },
    { id: 'item7', text: '$e$', type: 'irrational', zone: null },
    { id: 'item8', text: '$0.333...$', type: 'rational', zone: null }
  ]);

  const [showFeedback, setShowFeedback] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const allPlaced = useMemo(() => items.every(it => it.zone !== null), [items]);

  const handleDrop = (itemId: string, zone: 'rational' | 'irrational') => {
    if (showFeedback) return;
    setItems(prev => prev.map(it => (it.id === itemId ? { ...it, zone } : it)));
  };

  const checkAnswers = () => {
    if (!allPlaced) return;
    setIsChecking(true);

    const results = items.map(it => ({ ...it, isCorrect: it.zone === it.type }));
    const totalItems = results.length;
    const correctItems = results.filter(r => r.isCorrect).length;
    const accuracy = (correctItems / totalItems) * 100;

    // Track judging interaction
    handleInteractionComplete({
      interactionId: 'numbers-matching',
      value: results.map(r => ({ key: r.text, value: (r.zone ?? '') as string })),
      isCorrect: accuracy >= 75,
      timestamp: Date.now(),
      conceptId: 'numbers-matching',
      conceptName: 'Rational vs Irrational Matching',
      conceptDescription: `${accuracy.toFixed(1)}% accuracy (${correctItems}/${totalItems})`,
      question: slideInteractions[1].question
    });

    setItems(results);
    setShowFeedback(true);
    setIsChecking(false);
  };

  const LeftTheory = (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-5">
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        <div className="space-y-4">
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Numbers that can be expressed as a simple fraction, where the numerator and denominator are integers (and the denominator is not zero), are called <span className="font-semibold text-blue-700 dark:text-blue-300">rational numbers</span>. Their decimal representation either terminates or repeats.
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Numbers that cannot be written as a simple fraction are called <span className="font-semibold text-blue-700 dark:text-blue-300">irrational numbers</span>. Their decimal representation goes on forever without repeating.
          </div>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Examples</div>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>**Rational:** Integers ($5$), fractions ($1/2$), and terminating or repeating decimals ($0.5$, $0.333...$).</li>
              <li>**Irrational:** $\sqrt{2}$, $\pi$, and $e$. These numbers cannot be written as a fraction.</li>
            </ul>
          </div>
        </div>
      </TrackedInteraction>
    </div>
  );

  const RightMatch = (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
      <h3 className="text-gray-900 dark:text-white font-medium mb-4">Match: Rational vs Irrational</h3>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Drag each number into the correct category.</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Rational zone */}
        <div
          className="bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-blue-500/50 dark:border-blue-500/30 rounded-lg p-4 min-h-48 flex flex-col gap-2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            handleDrop(itemId, 'rational');
          }}
        >
          <h4 className="text-center text-blue-600 dark:text-blue-400 font-medium">Rational</h4>
          <div className="flex flex-wrap gap-2 flex-1 justify-center content-start pt-2">
            {items.filter(it => it.zone === 'rational').map(it => (
              <div
                key={it.id}
                className={`px-3 py-2 rounded-lg text-lg ${
                  showFeedback
                    ? it.isCorrect
                      ? 'bg-green-100 dark:bg-green-600/40 text-green-700 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-600/40 text-red-700 dark:text-red-200'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                } cursor-grab`}
                draggable={!showFeedback}
                onDragStart={(e) => {
                  if (showFeedback) return;
                  e.dataTransfer.setData('text/plain', it.id);
                }}
              >
                {it.text}
              </div>
            ))}
          </div>
        </div>

        {/* Irrational zone */}
        <div
          className="bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-blue-500/50 dark:border-blue-500/30 rounded-lg p-4 min-h-48 flex flex-col gap-2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            handleDrop(itemId, 'irrational');
          }}
        >
          <h4 className="text-center text-blue-600 dark:text-blue-400 font-medium">Irrational</h4>
          <div className="flex flex-wrap gap-2 flex-1 justify-center content-start pt-2">
            {items.filter(it => it.zone === 'irrational').map(it => (
              <div
                key={it.id}
                className={`px-3 py-2 rounded-lg text-lg ${
                  showFeedback
                    ? it.isCorrect
                      ? 'bg-green-100 dark:bg-green-600/40 text-green-700 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-600/40 text-red-700 dark:text-red-200'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                } cursor-grab`}
                draggable={!showFeedback}
                onDragStart={(e) => {
                  if (showFeedback) return;
                  e.dataTransfer.setData('text/plain', it.id);
                }}
              >
                {it.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remaining items */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <h4 className="text-center text-gray-700 dark:text-gray-300 font-medium mb-3">Available Items</h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {items.filter(it => it.zone === null).map(it => (
            <div
              key={it.id}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg text-lg cursor-grab"
              draggable={!showFeedback}
              onDragStart={(e) => {
                if (showFeedback) return;
                e.dataTransfer.setData('text/plain', it.id);
              }}
            >
              {it.text}
            </div>
          ))}
        </div>
      </div>

      <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
        <div className="flex justify-center">
          <button
            onClick={checkAnswers}
            disabled={!allPlaced || showFeedback}
            className={`px-4 py-2 rounded-md font-medium ${
              !allPlaced || showFeedback
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white'
            }`}
          >
            Check Answers
          </button>
        </div>
      </TrackedInteraction>
    </div>
  );

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        {LeftTheory}
        {RightMatch}
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="rational-vs-irrational-matching"
      slideTitle="Rational and Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="irrational-introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}