import React, { useEffect, useMemo, useRef, useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function IrrationalRepresentationsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  // Quick check question constant for irrational numbers
  const qcQuestion = {
    type: 'mcq' as const,
    question: 'How is the decimal representation of an irrational number different from a rational number?',
    options: [
      'It is finite and repeating.',
      'It is infinite and repeating.',
      'It is infinite and non-repeating.',
      'It is finite and non-repeating.'
    ]
  };

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-representation-forms',
      conceptId: 'irrational-representations',
      conceptName: 'Irrational Number Representations',
      type: 'learning',
      description: 'Understanding that irrational numbers have infinite, non-repeating decimal expansions'
    },
    {
      id: 'irrational-representations-quickcheck',
      conceptId: 'irrational-representations',
      conceptName: 'Irrational Decimal Properties',
      type: 'judging',
      description: 'Quick check on the properties of irrational decimals',
      question: qcQuestion
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // State for the interactive number line visualization
  const [zoomLevel, setZoomLevel] = useState(0);
  const [number, setNumber] = useState('1.41421356237...');
  const irrationalNumbers = useMemo(() => ([
    { name: '$\sqrt{2}$', value: '1.41421356237309504880...' },
    { name: '$\pi$', value: '3.14159265358979323846...' },
    { name: '$e$', value: '2.71828182845904523536...' }
  ]), []);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 5));
  };
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 0));
  };

  const formatNumberForDisplay = () => {
    const formatted = number.substring(0, 2 + zoomLevel + 1); // 2 for "X." + zoomLevel + 1 for current decimal place
    return formatted.replace('...', '');
  };

  // Quick check state
  const [qcSelected, setQcSelected] = useState<string | null>(null);
  const [qcShown, setQcShown] = useState(false);
  const handleQuickCheck = (idx: number) => {
    const value = qcQuestion.options[idx];
    const isCorrect = idx === 2; // infinite and non-repeating
    setQcSelected(value);
    setQcShown(true);
    handleInteractionComplete({
      interactionId: 'irrational-representations-quickcheck',
      value,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'irrational-representations',
      conceptName: 'Irrational Decimal Properties',
      question: qcQuestion
    });
  };

  const InteractiveFigure = () => {
    return (
      <div className="w-full rounded-lg border border-blue-200 dark:border-blue-700 p-4">
        <h4 className="text-xl font-semibold mb-2">Visualizing the Infinite Decimal</h4>
        <div className="flex justify-center items-center gap-4 mb-4">
          {irrationalNumbers.map((num) => (
            <button
              key={num.name}
              onClick={() => {
                setNumber(num.value);
                setZoomLevel(0);
              }}
              className={`p-2 rounded-lg transition-colors text-lg ${number === num.value ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <InlineMath math={num.name} />
            </button>
          ))}
        </div>
        <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden flex items-center justify-center">
          <div className="text-xl font-mono text-gray-900 dark:text-white">
            <span className="text-4xl font-bold">{formatNumberForDisplay().slice(0, 2)}</span>
            <span className="text-4xl font-bold text-red-500">.</span>
            {formatNumberForDisplay().slice(2).split('').map((digit, idx) => (
              <span key={idx} className={`text-3xl transition-transform duration-300 transform ${idx < zoomLevel ? 'scale-125 font-semibold text-blue-600' : ''}`}>
                {digit}
              </span>
            ))}
            {zoomLevel < 5 && <span className="text-3xl font-bold opacity-50">...</span>}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={handleZoomOut} disabled={zoomLevel === 0} className={`px-4 py-2 rounded-md ${zoomLevel === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white'}`}>
            Zoom Out
          </button>
          <button onClick={handleZoomIn} disabled={zoomLevel === 5} className={`px-4 py-2 rounded-md ${zoomLevel === 5 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white'}`}>
            Zoom In
          </button>
        </div>
      </div>
    );
  };

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left column - Explanation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-5">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="space-y-4">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-blue-700 dark:text-blue-300">Irrational numbers</span> are real numbers that cannot be represented as a simple fraction, like `p/q`. This is because their decimal expansions are both **infinite and non-repeating**. They cannot be fully written down, only approximated.
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Key Representations</div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>**Symbolic form**: Using special symbols like $\pi$ or $\sqrt{2}$. This is the most common way to represent them exactly.</li>
                  <li>**Decimal approximation**: A truncated decimal form like $3.14$ for $\pi$, used in calculations.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Interact and Explore</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  Select one of the irrational numbers on the right and **zoom in** to see more of its decimal places. Notice how the sequence of digits never settles into a repeating pattern, no matter how far you go.
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Interactive figure and quick check */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-gray-900 dark:text-white font-medium mb-4">The Nature of Irrational Numbers</h3>
          <div className="flex flex-col gap-4">
            {InteractiveFigure()}
          </div>
          {/* Quick Check */}
          <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-6 mt-6">
            <h4 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Quick Check</h4>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">How is the decimal representation of an irrational number different from a rational number?</p>
            <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
              <div className="space-y-2">
                {qcQuestion.options.map((opt, idx) => (
                  <button
                    key={opt}
                    onClick={() => handleQuickCheck(idx)}
                    disabled={qcShown}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      qcSelected === opt
                        ? (idx === 2 ? 'border-green-500 bg-green-100 dark:bg-green-900' : 'border-red-500 bg-red-100 dark:bg-red-900')
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {qcShown && (
                <div className={`mt-4 p-3 rounded-lg ${qcSelected === qcQuestion.options[2] ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                  <p className="text-lg">
                    {qcSelected === qcQuestion.options[2]
                      ? 'Correct: This is the key defining property. The digits never repeat in a block or pattern.'
                      : 'Not quite. The decimal expansion of an irrational number is infinite and never repeats.'}
                  </p>
                </div>
              )}
            </TrackedInteraction>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="irrational-representations"
      slideTitle="Representing Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="irrational-introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}