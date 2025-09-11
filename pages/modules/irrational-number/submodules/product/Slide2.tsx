import React, { useState, useMemo } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction, MatchingPair } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface DraggableItem {
  id: string;
  text: string;
  correctMatch: string;
  zone: string | null;
  isCorrect?: boolean;
}

export default function IrrationalSubtractionSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  // Matching question state
  const [matchingItems, setMatchingItems] = useState<DraggableItem[]>([
    { id: 'op1', text: '$\sqrt{2} - \sqrt{2}$', correctMatch: 'Rational', zone: null },
    { id: 'op2', text: '$(\sqrt{3} + 1) - \sqrt{3}$', correctMatch: 'Rational', zone: null },
    { id: 'op3', text: '$\pi - 3$', correctMatch: 'Irrational', zone: null },
    { id: 'op4', text: '$\sqrt{8} - \sqrt{2}$', correctMatch: 'Irrational', zone: null }
  ]);

  const [showMatchingFeedback, setShowMatchingFeedback] = useState(false);
  const [isMatchingChecking, setIsMatchingChecking] = useState(false);

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-subtraction-concept',
      conceptId: 'irrational-subtraction',
      conceptName: 'Irrational Subtraction Understanding',
      type: 'learning',
      description: 'Understanding that subtracting two irrationals can result in a rational or an irrational number'
    },
    {
      id: 'irrational-subtraction-matching',
      conceptId: 'irrational-subtraction-matching',
      conceptName: 'Irrational Subtraction Matching',
      type: 'judging',
      description: 'Match irrational number subtractions with their result type',
      question: {
        type: 'matching',
        question: 'Match each subtraction problem to the type of number it results in.',
        matching: {
          left: ['$\sqrt{2} - \sqrt{2}$', '$(\sqrt{3} + 1) - \sqrt{3}$', '$\pi - 3$', '$\sqrt{8} - \sqrt{2}$'],
          right: ['Rational', 'Irrational']
        }
      }
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Matching question functions
  const allMatchingPlaced = useMemo(() => matchingItems.every(item => item.zone !== null), [matchingItems]);

  const handleMatchingDrop = (e: React.DragEvent, zone: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');

    setMatchingItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, zone };
      }
      // Remove any other item from this zone
      if (item.zone === zone) {
        return { ...item, zone: null };
      }
      return item;
    }));
  };

  const checkMatchingAnswers = () => {
    setIsMatchingChecking(true);

    const updatedItems = matchingItems.map(item => ({
      ...item,
      isCorrect: item.zone === item.correctMatch
    }));

    setMatchingItems(updatedItems);
    setShowMatchingFeedback(true);

    const matchingPairs = updatedItems.map(item => ({
      key: item.text,
      value: item.zone || 'unmatched'
    }));

    handleInteractionComplete({
      interactionId: 'irrational-subtraction-matching',
      value: matchingPairs,
      isCorrect: updatedItems.every(item => item.isCorrect),
      timestamp: Date.now(),
      question: {
        type: 'matching',
        question: 'Match each subtraction problem to the type of number it results in.',
        matching: {
          left: ['$\sqrt{2} - \sqrt{2}$', '$(\sqrt{3} + 1) - \sqrt{3}$', '$\pi - 3$', '$\sqrt{8} - \sqrt{2}$'],
          right: ['Rational', 'Irrational']
        }
      }
    });

    setTimeout(() => setIsMatchingChecking(false), 500);
  };

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left column - Explanation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-5">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="space-y-4">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-blue-700 dark:text-blue-300">Subtraction of Irrational Numbers:</span> A key question in number theory is what kind of number results from subtracting two irrational numbers. The answer might surprise you!
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">The Rule</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  The difference between two irrational numbers can be either **rational** or **irrational**.
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Example 1: Difference is **Rational**</li>
                  <li>Example 2: Difference is **Irrational**</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800">
                <div className="text-blue-700 dark:text-blue-300 font-medium">Example 1: A Rational Result</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  Consider the expression <InlineMath math="\sqrt{2} - \sqrt{2}" />. Both <InlineMath math="\sqrt{2}" /> and <InlineMath math="\sqrt{2}" /> are irrational numbers.
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  When we subtract them, we get:
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="\sqrt{2} - \sqrt{2} = 0" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The result, `0`, is a **rational number** since it can be written as `0/1`.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-slate-700 dark:text-slate-300 font-medium mb-2">Example 2: An Irrational Result</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  Consider the expression <InlineMath math="\pi - 3" />. Both <InlineMath math="\pi" /> and `3` are real numbers, but <InlineMath math="\pi" /> is irrational.
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="\pi - 3 = 0.14159... - 0 = 0.14159..." />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The result is still an **irrational number**, because its decimal expansion remains infinite and non-repeating.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="text-green-700 dark:text-green-300 font-medium mb-2">Key Takeaway</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The set of irrational numbers is not "closed" under subtraction. This means that subtracting two irrational numbers does not guarantee an irrational result.
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Visual and Matching */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col space-y-4">
          <h3 className="text-gray-900 dark:text-white font-medium mb-4">Visualizing Subtraction Results</h3>

          <div className="w-full flex justify-center items-center h-48 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                $\sqrt{2} - \sqrt{2}$
              </div>
              <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                $1.414... - 1.414...$
              </div>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400">
                $0$
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center h-48 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                $\pi - 3$
              </div>
              <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                $3.14159... - 3$
              </div>
              <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                $0.14159...$
              </div>
            </div>
          </div>

          {/* Matching Question */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Quick Check: Match the Results
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['Rational', 'Irrational'].map(zone => (
                <div
                  key={zone}
                  className={`h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-lg font-semibold
                    ${showMatchingFeedback 
                      ? matchingItems.find(item => item.zone === zone)?.isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : matchingItems.find(item => item.zone === zone)
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        : 'border-gray-300 dark:border-gray-600 text-gray-500'
                      : 'border-gray-300 dark:border-gray-600 text-gray-500 hover:border-blue-400'
                    }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleMatchingDrop(e, zone)}
                >
                  {matchingItems.find(item => item.zone === zone)?.text || zone}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {matchingItems.filter(item => item.zone === null).map(item => (
                <div
                  key={item.id}
                  className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg text-lg cursor-grab border border-blue-300 dark:border-blue-600"
                  draggable={!showMatchingFeedback}
                  onDragStart={(e) => {
                    if (showMatchingFeedback) return;
                    e.dataTransfer.setData('text/plain', item.id);
                  }}
                >
                  <InlineMath math={item.text} />
                </div>
              ))}
            </div>

            <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
              <div className="flex justify-center">
                <button
                  onClick={checkMatchingAnswers}
                  disabled={!allMatchingPlaced || showMatchingFeedback}
                  className={`px-4 py-2 rounded-md font-medium ${
                    !allMatchingPlaced || showMatchingFeedback
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white'
                  }`}
                >
                  {isMatchingChecking ? 'Checking...' : 'Check Answers'}
                </button>
              </div>
            </TrackedInteraction>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="irrational-subtraction"
      slideTitle="Subtraction of Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="product"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}