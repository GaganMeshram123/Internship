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

export default function VectorSubtractionSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  // Matching question state
  const [matchingItems, setMatchingItems] = useState<DraggableItem[]>([
    { id: 'op1', text: 'V + W', correctMatch: 'A', zone: null },
    { id: 'op2', text: 'V - W', correctMatch: 'B', zone: null },
    { id: 'op3', text: '-V + W', correctMatch: 'C', zone: null },
    { id: 'op4', text: '-V - W', correctMatch: 'D', zone: null }
  ]);
  
  const [showMatchingFeedback, setShowMatchingFeedback] = useState(false);
  const [isMatchingChecking, setIsMatchingChecking] = useState(false);

  const slideInteractions: Interaction[] = [
    {
      id: 'vector-subtraction-concept',
      conceptId: 'vector-subtraction',
      conceptName: 'Vector Subtraction Understanding',
      type: 'learning',
      description: 'Understanding vector negation and subtraction as addition of negative vectors'
    },
    {
      id: 'vector-operations-matching',
      conceptId: 'vector-operations-matching',
      conceptName: 'Vector Operations Matching',
      type: 'judging',
      description: 'Match vector operations with their geometric representations',
      question: {
        type: 'matching',
        question: 'Match each vector operation to its corresponding resultant in the diagram',
        matching: {
          left: ['V⃗ + W⃗', 'V⃗ - W⃗', '-V⃗ + W⃗', '-V⃗ - W⃗'],
          right: ['A', 'B', 'C', 'D']
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
    
    // Track the interaction
    const matchingPairs = updatedItems.map(item => ({
      key: item.text,
      value: item.zone || 'unmatched'
    }));
    
    handleInteractionComplete({
      interactionId: 'vector-operations-matching',
      value: matchingPairs,
      isCorrect: updatedItems.every(item => item.isCorrect),
      timestamp: Date.now(),
      question: {
        type: 'matching',
        question: 'Match each vector operation to its corresponding resultant in the diagram',
        matching: {
          left: ['V + W', 'V - W', '-V + W', '-V - W'],
          right: ['A', 'B', 'C', 'D']
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
                <span className="font-semibold text-blue-700 dark:text-blue-300">Vector Subtraction:</span> What happens when we subtract one vector from another?
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">The Question</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  A person moves with displacement <InlineMath math="\vec{A} = 12\hat{i} + 8\hat{j}" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  But a person B moves with displacement <InlineMath math="\vec{B} = 5\hat{i} + 6\hat{j}" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">How will B have to move to reach the same point as A?</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold text-blue-600 dark:text-blue-400">
                  What is the result of <InlineMath math="\vec{A} - \vec{B}" />?
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Step 1: Geometric Method</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  Draw both vectors from origin
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  Draw an arrow from the head of B to the head of A
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Note:</span> The order matters here!
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                <div className="text-red-700 dark:text-red-300 font-medium mb-2">Step 2: Negation Method</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  We first note that the negative of a vector is a vector of the same magnitude but directed in the opposite direction.
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  This is because, by definition, we must have <InlineMath math="\vec{A} + (-\vec{A}) = 0" />.
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  One can view subtraction simply as the addition of a negative.
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                  <InlineMath math="\vec{A} - \vec{B} = \vec{A} + (-\vec{B})" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="text-green-700 dark:text-green-300 font-medium mb-2">Physical Meaning</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The result <InlineMath math="\vec{A} - \vec{B} = 7\hat{i} + 2\hat{j}" /> tells us the displacement B needs to move to reach A's final position.
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Animation and Matching */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col space-y-4">
          {/* Animation */}
          <div className="flex-1">
            <svg width="100%" height="500" viewBox="30 50 450 300" className="border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
              {/* Grid */}
              <defs>
                <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                </pattern>
                <marker id="vectorArrowA" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                </marker>
                <marker id="vectorArrowB" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                </marker>
                <marker id="vectorArrowNegB" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                </marker>
                <marker id="vectorArrowFinal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                </marker>
              </defs>
              
              <rect width="500" height="500" fill="url(#grid)" />
              
              {/* Axes */}
              <line x1="75" y1="350" x2="75" y2="50" stroke="#6b7280" strokeWidth="2" markerEnd="url(#vectorArrowA)"/>
              <line x1="50" y1="325" x2="450" y2="325" stroke="#6b7280" strokeWidth="2" markerEnd="url(#vectorArrowA)"/>
              <text x="85" y="65" className="fill-gray-600 text-lg font-bold">ĵ</text>
              <text x="440" y="340" className="fill-gray-600 text-lg font-bold">î</text>

              {/* Moving dot animation - now shows both methods */}
              <circle r="8" fill="#dc2626" stroke="#b91c1c" strokeWidth="2">
                <animate attributeName="cx" values="75;75;375;375;250;250;75;75;375;375;250;250;75" dur="12s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="325;325;125;125;275;275;325;325;125;125;275;275;325" dur="12s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;1;0;0;0;0;1;1;1;1;0;0" dur="12s" repeatCount="indefinite"/>
              </circle>
              
              {/* Step 1: Geometric Method - Both vectors from origin */}
              <g>
                {/* Vector A from origin */}
                <line x1="75" y1="325" x2="375" y2="125" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#vectorArrowA)">
                  <animate attributeName="opacity" values="0;1;1;1;1;0;0;0;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="210" y="210" className="fill-blue-600 text-lg font-bold">A
                  <animate attributeName="opacity" values="0;1;1;1;1;0;0;0;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </text>
                
                {/* Vector B from origin */}
                <line x1="75" y1="325" x2="200" y2="175" stroke="#EF4444" strokeWidth="3" markerEnd="url(#vectorArrowNegB)">
                  <animate attributeName="opacity" values="0;0;1;1;1;0;0;0;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="120" y="240" className="fill-red-600 text-lg font-bold">B
                  <animate attributeName="opacity" values="0;0;1;1;1;0;0;0;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </text>
                
                {/* Subtraction vector from head of B to head of A */}
                <line x1="200" y1="175" x2="375" y2="125" stroke="#10B981" strokeWidth="4" markerEnd="url(#vectorArrowFinal)">
                  <animate attributeName="opacity" values="0;0;0;1;1;0;0;0;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="270" y="145" className="fill-green-600 text-xl font-bold">A - B
                  <animate attributeName="opacity" values="0;0;0;1;1;0;0;0;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </text>
              </g>
              
              {/* Step 2: Negation Method - Component-wise addition */}
              <g>
                {/* x-component of A */}
                <line x1="75" y1="325" x2="375" y2="325" stroke="#3B82F6" strokeWidth="4" strokeDasharray="6,6">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0;0;0;0;0;0;1;0;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="210" y="315" className="fill-blue-600 text-lg font-bold">12î
                  <animate attributeName="opacity" values="0;0;0;0;0;0;1;0;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </text>
                
                {/* y-component of A */}
                <line x1="375" y1="325" x2="375" y2="125" stroke="#3B82F6" strokeWidth="4" strokeDasharray="6,6">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;1;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="385" y="220" className="fill-blue-600 text-lg font-bold">8ĵ
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;1;0;0;0;0;0" dur="12s" repeatCount="indefinite"/>
                </text>
                
                {/* Vector A */}
                <line x1="75" y1="325" x2="375" y2="125" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#vectorArrowA)">
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;1;1;1;1;1" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="210" y="210" className="fill-blue-600 text-lg font-bold">A
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;1;1;1;1;1" dur="12s" repeatCount="indefinite"/>
                </text>
                
                {/* x-component of -B */}
                <line x1="375" y1="125" x2="250" y2="125" stroke="#EF4444" strokeWidth="4" strokeDasharray="6,6">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;1;0;0;0" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="305" y="115" className="fill-red-600 text-lg font-bold">-5î
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;1;0;0;0" dur="12s" repeatCount="indefinite"/>
                </text>
                
                {/* y-component of -B */}
                <line x1="250" y1="125" x2="250" y2="275" stroke="#EF4444" strokeWidth="4" strokeDasharray="6,6">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;1;0;0" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="260" y="200" className="fill-red-600 text-lg font-bold">-6ĵ
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;1;0;0" dur="12s" repeatCount="indefinite"/>
                </text>
                
                {/* Vector -B */}
                <line x1="375" y1="125" x2="250" y2="275" stroke="#EF4444" strokeWidth="3" markerEnd="url(#vectorArrowNegB)">
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;1;1;1" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="300" y="190" className="fill-red-600 text-lg font-bold">-B
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;1;1;1" dur="12s" repeatCount="indefinite"/>
                </text>
                
                {/* Final resultant vector A - B */}
                <line x1="75" y1="325" x2="250" y2="275" stroke="#10B981" strokeWidth="4" markerEnd="url(#vectorArrowFinal)">
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;0;1;1" dur="12s" repeatCount="indefinite"/>
                </line>
                <text x="140" y="295" className="fill-green-600 text-xl font-bold">A - B = 7î + 2ĵ
                  <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;0;1;1" dur="12s" repeatCount="indefinite"/>
                </text>
              </g>
              
              {/* Origin marker */}
              <circle cx="75" cy="325" r="4" fill="#374151" />
              <text x="55" y="345" className="fill-gray-600 text-lg font-bold">O</text>
            </svg>
          </div>

          {/* Matching Question */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Quick Check: Match the Operations
            </div>
            
            {/* Parallelogram Diagram */}
            <div className="mb-4">
              <svg width="100%" height="200" viewBox="0 0 300 200" className="border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900">
                <defs>
                  <marker id="arrowV" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#3B82F6" />
                  </marker>
                  <marker id="arrowW" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#EF4444" />
                  </marker>
                  <marker id="arrowResult" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#10B981" />
                  </marker>
                </defs>
                
                {/* Center point */}
                <circle cx="150" cy="100" r="3" fill="#374151" />
                
                {/* Vector V (horizontal right) */}
                <line x1="150" y1="100" x2="220" y2="100" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrowV)"/>
                <text x="230" y="100" className="fill-blue-600 text-lg font-bold">V</text>
                
                {/* Vector W (diagonal up-right) */}
                <line x1="150" y1="100" x2="200" y2="60" stroke="#EF4444" strokeWidth="3" markerEnd="url(#arrowW)"/>
                <text x="170" y="50" className="fill-red-600 text-lg font-bold">W</text>
                
                {/* Resultant A: V + W (diagonal far right) */}
                <line x1="150" y1="100" x2="270" y2="60" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowResult)"/>
                <text x="275" y="65" className="fill-green-600 text-lg font-bold">A</text>
                
                {/* Resultant B: V - W (diagonal down-right) */}
                <line x1="150" y1="100" x2="170" y2="140" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowResult)"/>
                <text x="165" y="165" className="fill-green-600 text-lg font-bold">B</text>
                
                {/* Resultant C: -V + W (diagonal up-left) */}
                <line x1="150" y1="100" x2="130" y2="60" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowResult)"/>
                <text x="110" y="55" className="fill-green-600 text-lg font-bold">C</text>
                
                {/* Resultant D: -V - W (diagonal far left) */}
                <line x1="150" y1="100" x2="30" y2="140" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowResult)"/>
                <text x="10" y="145" className="fill-green-600 text-lg font-bold">D</text>
              </svg>
            </div>

            {/* Drop Zones */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {['A', 'B', 'C', 'D'].map(zone => (
                <div
                  key={zone}
                  className={`h-16 border-2 border-dashed rounded-lg flex items-center justify-center text-lg font-semibold
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

            {/* Draggable Items */}
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
                  <InlineMath math={item.text.replace('⃗', '')} />
                </div>
              ))}
            </div>

            {/* Check Button */}
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
      slideId="vector-subtraction"
      slideTitle="Vector Subtraction"
      moduleId="vectors"
      submoduleId="vector-operations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 