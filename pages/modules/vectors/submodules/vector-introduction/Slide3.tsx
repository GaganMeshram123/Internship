import React, { useEffect, useMemo, useRef, useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function VectorRepresentationsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  // Quick check question constant to avoid optional access
  const qcQuestion = {
    type: 'mcq' as const,
    question: 'If two Cartesian coordinates are (x, y) and (−x, −y), how do their polar forms compare?',
    options: [
      'r is the same; θ differs by 180°',
      'r flips sign; θ stays the same',
      'r is the same; θ differs by 90°',
      'Both r and θ change arbitrarily'
    ]
  };

  const slideInteractions: Interaction[] = [
    {
      id: 'vector-representation-forms',
      conceptId: 'vector-representations',
      conceptName: 'Vector Representations (Cartesian and Polar)',
      type: 'learning',
      description: 'Understanding that one number is insufficient; two coordinates are needed: (x, y) or (r, \\theta)'
    },
    {
      id: 'vector-representations-quickcheck',
      conceptId: 'vector-representations',
      conceptName: 'Vector Opposites in Polar',
      type: 'judging',
      description: 'If two Cartesian vectors are (x, y) and (−x, −y), what happens to r and θ in polar?',
      question: qcQuestion
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Shared vector state in Cartesian components (x to the right, y up), in arbitrary units
  const width = 680;
  const height = 500;
  const padding = 24;
  const origin = { x: width / 2, y: height / 2 };

  const [cart, setCart] = useState<{ x: number; y: number }>({ x: 3, y: 2 }); // components (units), not pixels

  // Derived polar
  const r = Math.sqrt(cart.x * cart.x + cart.y * cart.y);
  const theta = Math.atan2(cart.y, cart.x); // radians
  const thetaDeg = (theta * 180) / Math.PI;

  // Convenience conversions
  const polarToCart = (radius: number, angleRad: number) => ({ x: radius * Math.cos(angleRad), y: radius * Math.sin(angleRad) });

  // Scale between component units and pixels: 1 unit = 40 px
  const scale = 40;
  const compToPx = (c: { x: number; y: number }) => ({ x: origin.x + c.x * scale, y: origin.y - c.y * scale });
  const pxToComp = (p: { x: number; y: number }) => ({ x: (p.x - origin.x) / scale, y: (origin.y - p.y) / scale });

  // Drag handling (which panel initiated drag)
  const [dragSource, setDragSource] = useState<'cart' | 'polar' | null>(null);
  const cartSvgRef = useRef<SVGSVGElement | null>(null);
  const polarSvgRef = useRef<SVGSVGElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const beginDrag = (source: 'cart' | 'polar', e: React.PointerEvent, ref: React.MutableRefObject<SVGSVGElement | null>) => {
    setDragSource(source);
    setIsDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromEvent(source, e, ref);
  };

  const updateFromEvent = (source: 'cart' | 'polar', e: React.PointerEvent, ref: React.MutableRefObject<SVGSVGElement | null>) => {
    const svg = ref.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = { x: Math.max(padding, Math.min(e.clientX - rect.left, width - padding)), y: Math.max(padding, Math.min(e.clientY - rect.top, height - padding)) };

    if (source === 'cart') {
      const newComp = pxToComp(px);
      setCart(newComp);
    } else {
      // Polar panel: set by angle and radius from origin
      const comp = pxToComp(px);
      const newR = Math.sqrt(comp.x * comp.x + comp.y * comp.y);
      const newTheta = Math.atan2(comp.y, comp.x);
      setCart(polarToCart(newR, newTheta));
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    setIsDragging(false);
    setDragSource(null);
    (e.target as Element).releasePointerCapture(e.pointerId);
    handleInteractionComplete({
      interactionId: 'vector-representation-forms',
      value: `x=${cart.x.toFixed(1)}, y=${cart.y.toFixed(1)} | r=${r.toFixed(1)}, theta=${thetaDeg.toFixed(1)}°`,
      isCorrect: true,
      timestamp: Date.now(),
      conceptId: 'vector-representations',
      conceptName: 'Vector Representations (Cartesian and Polar)'
    });
  };

  // Quick check state
  const [qcSelected, setQcSelected] = useState<string | null>(null);
  const [qcShown, setQcShown] = useState(false);
  const handleQuickCheck = (idx: number) => {
    const value = qcQuestion.options[idx];
    const isCorrect = idx === 0; // r same, theta +180°
    setQcSelected(value);
    setQcShown(true);
    handleInteractionComplete({
      interactionId: 'vector-representations-quickcheck',
      value,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'vector-representations',
      conceptName: 'Vector Opposites in Polar',
      question: qcQuestion
    });
  };

  const CartFigure = (
    <div className="w-full rounded-lg border border-blue-200 dark:border-blue-700 overflow-hidden">
      <svg
        ref={cartSvgRef}
        width={width}
        height={height}
        className="block"
        style={{ touchAction: 'none' }}
        onPointerDown={(e) => beginDrag('cart', e, cartSvgRef)}
        onPointerMove={(e) => isDragging && dragSource === 'cart' && updateFromEvent('cart', e, cartSvgRef)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(e) => isDragging && dragSource === 'cart' && endDrag(e)}
      >
        {/* Background */}
        <rect x={0} y={0} width={width} height={height} fill="#EFF6FF" className="block dark:hidden" />
        <rect x={0} y={0} width={width} height={height} fill="#0B1220" className="hidden dark:block" />
        {/* Grid centered at origin */}
        {Array.from({ length: Math.floor(width / (2 * scale)) * 2 + 1 }).map((_, i) => {
          const offset = (i - Math.floor(width / (2 * scale))) * scale;
          const x = origin.x + offset;
          return (
            <line key={`gx${i}`} x1={x} y1={0} x2={x} y2={height} strokeWidth={1.5} className="stroke-[#DBEAFE] dark:stroke-[#122041]" />
          );
        })}
        {Array.from({ length: Math.floor(height / (2 * scale)) * 2 + 1 }).map((_, i) => {
          const offset = (i - Math.floor(height / (2 * scale))) * scale;
          const y = origin.y + offset;
          return (
            <line key={`gy${i}`} x1={0} y1={y} x2={width} y2={y} strokeWidth={1.5} className="stroke-[#DBEAFE] dark:stroke-[#122041]" />
          );
        })}
        {/* Axes */}
        <line x1={0} y1={origin.y} x2={width} y2={origin.y} strokeWidth={2} className="stroke-[#2563EB] dark:stroke-[#3B82F6]" />
        <line x1={origin.x} y1={0} x2={origin.x} y2={height} strokeWidth={2} className="stroke-[#2563EB] dark:stroke-[#3B82F6]" />
        {/* Origin */}
        <circle cx={origin.x} cy={origin.y} r={3} className="fill-[#1D4ED8] dark:fill-[#60A5FA]" />
        <text x={origin.x + 6} y={origin.y - 6} fontSize={12} className="fill-[#1D4ED8] dark:fill-[#93C5FD]">O</text>
        {/* Perpendicular dashed guides to axes */}
        <line x1={compToPx(cart).x} y1={compToPx(cart).y} x2={compToPx(cart).x} y2={origin.y} strokeDasharray="6,6" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth={1} />
        <line x1={compToPx(cart).x} y1={compToPx(cart).y} x2={origin.x} y2={compToPx(cart).y} strokeDasharray="6,6" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth={1} />
        {/* x, y labels near components */}
        <text x={(origin.x + compToPx({ x: cart.x, y: 0 }).x) / 2} y={compToPx(cart).y - 8} fontSize={20} textAnchor="middle" className="fill-[#2563EB] dark:fill-[#93C5FD]">x</text>
        <text x={compToPx({ x: cart.x, y: 0 }).x + 8} y={(origin.y + compToPx(cart).y) / 2} fontSize={20} className="fill-[#10B981]">y</text>
        {/* Angle arc at origin */}
        {r > 0.1 && (
          <path d={`M ${origin.x + 30} ${origin.y} A 30 30 0 ${Math.abs(theta) > Math.PI ? 1 : 0} ${theta < 0 ? 1 : 0} ${origin.x + 30 * Math.cos(theta)} ${origin.y - 30 * Math.sin(theta)}`} fill="none" strokeWidth={1} className="stroke-gray-500 dark:stroke-gray-200" />
        )}
        {/* θ label moved to polar figure */}
        {/* Vector */}
        <defs>
          <marker id="arrowhead-cart" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
          </marker>
        </defs>
        <line x1={origin.x} y1={origin.y} x2={compToPx(cart).x} y2={compToPx(cart).y} stroke="#10B981" strokeWidth={2.5} markerEnd="url(#arrowhead-cart)" />
        {/* Draggable handle */}
        <circle cx={compToPx(cart).x} cy={compToPx(cart).y} r={7} className="fill-[#3B82F6] dark:fill-[#F9FAFB]" />
      </svg>
      <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-gray-200 text-lg">
        <span className="font-semibold text-blue-700 dark:text-blue-300">Cartesian:</span>
        <span className="ml-2">(<InlineMath math={`x = ${cart.x.toFixed(1)}`} />, <InlineMath math={`y = ${cart.y.toFixed(1)}`} />)</span>
      </div>
    </div>
  );

  const PolarFigure = (
    <div className="w-full rounded-lg border border-blue-200 dark:border-blue-700 overflow-hidden">
      <svg
        ref={polarSvgRef}
        width={width}
        height={height}
        className="block"
        style={{ touchAction: 'none' }}
        onPointerDown={(e) => beginDrag('polar', e, polarSvgRef)}
        onPointerMove={(e) => isDragging && dragSource === 'polar' && updateFromEvent('polar', e, polarSvgRef)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(e) => isDragging && dragSource === 'polar' && endDrag(e)}
      >
        {/* Background */}
        <rect x={0} y={0} width={width} height={height} fill="#EFF6FF" className="block dark:hidden" />
        <rect x={0} y={0} width={width} height={height} fill="#0B1220" className="hidden dark:block" />
        {/* Polar rings */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => (
          <circle key={k} cx={origin.x} cy={origin.y} r={k * scale} fill="none" strokeWidth={1.5} className="stroke-[#DBEAFE] dark:stroke-[#122041]" />
        ))}
        {/* Angle spokes */}
        {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const end = { x: origin.x + 10 * scale * Math.cos(rad), y: origin.y - 10 * scale * Math.sin(rad) };
          return <line key={deg} x1={origin.x} y1={origin.y} x2={end.x} y2={end.y} strokeWidth={1.5} className="stroke-[#93C5FD] dark:stroke-[#1E3A8A]" />;
        })}
        {/* Axes */}
        <line x1={0} y1={origin.y} x2={width} y2={origin.y} strokeWidth={2} className="stroke-[#2563EB] dark:stroke-[#3B82F6]" />
        <line x1={origin.x} y1={0} x2={origin.x} y2={height} strokeWidth={2} className="stroke-[#2563EB] dark:stroke-[#3B82F6]" />
        {/* Origin */}
        <circle cx={origin.x} cy={origin.y} r={3} className="fill-[#1D4ED8] dark:fill-[#60A5FA]" />
        <text x={origin.x + 6} y={origin.y - 6} fontSize={12} className="fill-[#1D4ED8] dark:fill-[#93C5FD]">O</text>
        {/* Angle arc at origin */}
        {r > 0.1 && (
          <path d={`M ${origin.x + 30} ${origin.y} A 30 30 0 ${Math.abs(theta) > Math.PI ? 1 : 0} ${theta < 0 ? 1 : 0} ${origin.x + 30 * Math.cos(theta)} ${origin.y - 30 * Math.sin(theta)}`} fill="none" strokeWidth={1} className="stroke-gray-500 dark:stroke-gray-200" />
        )}
        {/* θ value near arc in polar figure */}
        <text x={origin.x + 42} y={origin.y - 28} fontSize={20} className="fill-gray-600 dark:fill-gray-200">θ = {thetaDeg.toFixed(1)}°</text>
        {/* r label along vector in polar figure */}
        {(() => {
          const midX = origin.x + 0.6 * (compToPx(cart).x - origin.x);
          const midY = origin.y + 0.6 * (compToPx(cart).y - origin.y);
          return <text x={midX + 8} y={midY - 8} fontSize={20} className="fill-[#10B981]">r</text>;
        })()}
        {/* Vector */}
        <defs>
          <marker id="arrowhead-polar" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
          </marker>
        </defs>
        <line x1={origin.x} y1={origin.y} x2={compToPx(cart).x} y2={compToPx(cart).y} stroke="#10B981" strokeWidth={2.5} markerEnd="url(#arrowhead-polar)" />
        {/* Draggable handle */}
        <circle cx={compToPx(cart).x} cy={compToPx(cart).y} r={7} className="fill-[#3B82F6] dark:fill-[#F9FAFB]" />
      </svg>
      <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-gray-200 text-lg">
        <span className="font-semibold text-blue-700 dark:text-blue-300">Polar:</span>
        <span className="ml-2">(<InlineMath math={`r, \\theta) \\rightarrow (${r.toFixed(1)}, ${thetaDeg.toFixed(1)}°)`} /></span>
      </div>
    </div>
  );

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left column - Explanation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-5">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="space-y-4">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                One number is insufficient to specify a position in two dimensions. We must provide <span className="font-semibold text-blue-700 dark:text-blue-300">two independent pieces of information</span> to uniquely locate a point.
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Two equivalent forms</div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Cartesian form: <InlineMath math="\\vec{v} = (x, y)" /> — components along the x and y axes</li>
                  <li>Polar form: <InlineMath math="\\vec{v} = (r, \\theta)" /> — magnitude and direction (angle from +x)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Link between forms</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  <BlockMath math="x = r \cos \theta, \quad y = r \sin \theta" />
                  <BlockMath math="r = \sqrt{x^2 + y^2}, \quad \theta = \tan^{-1}\!\left(\frac{y}{x}\right)" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Interact</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  Drag the vector endpoint in <span className="font-semibold">either</span> figure. The other updates instantly, showing the same vector in the alternate form.
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Another Form</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  We can also write <InlineMath math="(x, y)" /> using <InlineMath math="\hat{i}" /> and <InlineMath math="\hat{j}" />:
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="(x, y) = x \hat{i} + y \hat{j}" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Think of <InlineMath math="\hat{i}" /> as steps taken in the x-direction and <InlineMath math="\hat{j}" /> as steps taken in the y-direction.
                </div>
                
                {/* Animation showing steps */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <svg width="100%" height="280" viewBox="0 0 400 280" className="mx-auto">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="400" height="280" fill="url(#grid)" />
                    
                    {/* Axes - aligned with grid */}
                    <line x1="75" y1="225" x2="375" y2="225" stroke="#374151" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                    <line x1="75" y1="225" x2="75" y2="75" stroke="#374151" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                    
                    {/* Arrow marker */}
                    <defs>
                      <marker id="arrowhead" markerWidth="12" markerHeight="9" refX="10" refY="4.5" orient="auto">
                        <polygon points="0 0, 12 4.5, 0 9" fill="#374151" />
                      </marker>
                    </defs>
                    
                    {/* Axis labels */}
                    <text x="385" y="230" className="fill-gray-600 dark:fill-gray-400 text-lg font-medium">x</text>
                    <text x="65" y="65" className="fill-gray-600 dark:fill-gray-400 text-lg font-medium">y</text>
                    
                    {/* Animated steps for one vector */}
                    <g>
                      {/* Moving dot that follows the step path */}
                      <circle r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="2">
                        <animate attributeName="cx" values="75;75;225;225;75" dur="4s" repeatCount="indefinite"/>
                        <animate attributeName="cy" values="225;225;225;150;225" dur="4s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0;1;1;0;0" dur="4s" repeatCount="indefinite"/>
                      </circle>
                      
                      {/* x-steps (i cap) */}
                      <line x1="75" y1="225" x2="225" y2="225" stroke="#3B82F6" strokeWidth="5" strokeDasharray="8,8">
                        <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="1;1;0;0;1" dur="4s" repeatCount="indefinite"/>
                      </line>
                      <text x="150" y="210" className="fill-blue-600 text-lg font-bold">6î
                        <animate attributeName="opacity" values="1;1;0;0;1" dur="4s" repeatCount="indefinite"/>
                      </text>
                      
                      {/* y-steps (j cap) */}
                      <line x1="225" y1="225" x2="225" y2="150" stroke="#10B981" strokeWidth="5" strokeDasharray="8,8">
                        <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0;1;1;0;0" dur="4s" repeatCount="indefinite"/>
                      </line>
                      <text x="235" y="187" className="fill-green-600 text-lg font-bold">3ĵ
                        <animate attributeName="opacity" values="0;1;1;0;0" dur="4s" repeatCount="indefinite"/>
                      </text>
                      
                      {/* Final vector */}
                      <line x1="75" y1="225" x2="225" y2="150" stroke="#10B981" strokeWidth="4" markerEnd="url(#vectorArrow)">
                        <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite"/>
                      </line>
                      <text x="135" y="177" className="fill-green-600 text-lg font-bold">(6,3)
                        <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite"/>
                      </text>
                    </g>
                    
                    {/* Vector arrow marker */}
                    <defs>
                      <marker id="vectorArrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                        <polygon points="0 0, 10 4, 0 8" fill="#10B981" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Two synchronized figures */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-gray-900 dark:text-white font-medium mb-4">Vector in Two Coordinate Systems</h3>
          <div className="flex flex-col gap-4">
            {CartFigure}
            {PolarFigure}
          </div>
          {/* Quick Check */}
          <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-6 mt-6">
            <h4 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Quick Check</h4>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">If two Cartesian coordinates are (x, y) and (−x, −y), how do their polar forms compare?</p>
            <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
              <div className="space-y-2">
                {qcQuestion.options.map((opt, idx) => (
                  <button
                    key={opt}
                    onClick={() => handleQuickCheck(idx)}
                    disabled={qcShown}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                      qcSelected === opt
                        ? (idx === 0 ? 'border-green-500 bg-green-100 dark:bg-green-900' : 'border-red-500 bg-red-100 dark:bg-red-900')
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {qcShown && (
                <div className={`mt-4 p-3 rounded-lg ${qcSelected === qcQuestion.options[0] ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                  <p className="text-lg">
                    {qcSelected === qcQuestion.options[0]
                      ? 'Correct: Negating both components rotates the vector by 180° but does not change its magnitude.'
                      : 'Not quite. (−x, −y) corresponds to the same magnitude r and an angle shifted by 180°.'}
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
      slideId="vector-representations"
      slideTitle="Vector Representations"
      moduleId="vectors"
      submoduleId="vector-introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 