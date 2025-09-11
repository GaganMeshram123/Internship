import React, { useEffect, useMemo, useRef, useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface DraggableItem {
  id: string;
  text: string;
  type: 'scalar' | 'vector';
  zone?: 'scalar' | 'vector' | null;
  isCorrect?: boolean;
}

export default function VectorsIntroSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'vectors-vs-scalars-content',
      conceptId: 'vectors-vs-scalars',
      conceptName: 'Vectors vs Scalars Concept',
      type: 'learning',
      description: 'Understanding which quantities are vectors and which are scalars'
    },
    {
      id: 'vectors-matching',
      conceptId: 'vectors-matching',
      conceptName: 'Vectors vs Scalars Matching',
      type: 'judging',
      description: 'Match each quantity to Scalar or Vector',
      question: {
        type: 'matching',
        question: 'Match each quantity to Scalar or Vector',
        matching: {
          left: ['5 meters','5 m/s East','10 seconds','25 degrees Celsius','30 N downward','2 kg','15 m/s² upward','position (3,4)'],
          right: ['scalar','vector']
        }
      }
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Items for matching activity (mirrors the referenced slide's question set)
  const [items, setItems] = useState<DraggableItem[]>([
    { id: 'item1', text: '5 meters', type: 'scalar', zone: null },
    { id: 'item2', text: '5 m/s East', type: 'vector', zone: null },
    { id: 'item3', text: '10 seconds', type: 'scalar', zone: null },
    { id: 'item4', text: '25 degrees Celsius', type: 'scalar', zone: null },
    { id: 'item5', text: '30 N downward', type: 'vector', zone: null },
    { id: 'item6', text: '2 kg', type: 'scalar', zone: null },
    { id: 'item7', text: '15 m/s² upward', type: 'vector', zone: null },
    { id: 'item8', text: 'position (3,4)', type: 'vector', zone: null }
  ]);

  const [showFeedback, setShowFeedback] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const allPlaced = useMemo(() => items.every(it => it.zone !== null), [items]);

  const handleDrop = (itemId: string, zone: 'scalar' | 'vector') => {
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
      interactionId: 'vectors-matching',
      value: results.map(r => ({ key: r.text, value: (r.zone ?? '') as string })),
      isCorrect: accuracy >= 75,
      timestamp: Date.now(),
      conceptId: 'vectors-matching',
      conceptName: 'Vectors vs Scalars Matching',
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
            Quantities which need us to specify a magnitude and a direction to make sense are called <span className="font-semibold text-blue-700 dark:text-blue-300">vectors</span>. Quantities that need just a magnitude to make sense are called <span className="font-semibold text-blue-700 dark:text-blue-300">scalars</span>.
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            In one dimension, the direction could be simply specified by a sign, say positive for right and negative for left. But in two dimensions, we need to address this carefully.
          </div>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Examples</div>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Position, Velocity, Acceleration: need a magnitude and a direction; represented by an arrow. The arrow direction gives the direction; the arrow length is proportional to magnitude.</li>
              <li className="flex items-center gap-2">
                <span>Vector notation:</span>
                <span className="font-semibold text-blue-700 dark:text-blue-300"><InlineMath math="\vec{V}" /></span>
              </li>
              <li>Scalars can be specified by just a magnitude (a number and units).</li>
            </ul>
          </div>
        </div>
      </TrackedInteraction>
    </div>
  );

  const RightMatch = (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
      <h3 className="text-gray-900 dark:text-white font-medium mb-4">Match: Scalars vs Vectors</h3>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Drag each quantity into the correct category.</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Scalar zone */}
        <div
          className="bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-blue-500/50 dark:border-blue-500/30 rounded-lg p-4 min-h-48 flex flex-col gap-2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            handleDrop(itemId, 'scalar');
          }}
        >
          <h4 className="text-center text-blue-600 dark:text-blue-400 font-medium">Scalar</h4>
          <div className="flex flex-wrap gap-2 flex-1 justify-center content-start pt-2">
            {items.filter(it => it.zone === 'scalar').map(it => (
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

        {/* Vector zone */}
        <div
          className="bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-blue-500/50 dark:border-blue-500/30 rounded-lg p-4 min-h-48 flex flex-col gap-2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            handleDrop(itemId, 'vector');
          }}
        >
          <h4 className="text-center text-blue-600 dark:text-blue-400 font-medium">Vector</h4>
          <div className="flex flex-wrap gap-2 flex-1 justify-center content-start pt-2">
            {items.filter(it => it.zone === 'vector').map(it => (
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
      slideId="vectors-scalars-matching"
      slideTitle="Scalars and Vectors"
      moduleId="vectors"
      submoduleId="vector-introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 