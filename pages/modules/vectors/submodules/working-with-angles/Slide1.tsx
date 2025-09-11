import { useEffect, useRef, useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

interface Point {
  x: number;
  y: number;
}

interface Vector {
  start: Point;
  end: Point;
}

export default function WorkingWithAnglesSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 350 });
  const centerX = canvasSize.width / 2;
  const centerY = canvasSize.height / 2;

  const [vector, setVector] = useState<Vector>({
    start: { x: centerX, y: centerY },
    end: { x: centerX + 120, y: centerY - 80 }
  });

  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'vector-angles-content',
      conceptId: 'vector-angles-concept',
      conceptName: 'Vector Angles Understanding',
      type: 'learning',
      description: 'Understanding how to measure and calculate vector angles using trigonometry'
    },
    {
      id: 'vector-angles-interaction',
      conceptId: 'vector-angles-interactive',
      conceptName: 'Vector Angles Interactive',
      type: 'learning',
      description: 'Interactive exploration of vector angles and trigonometric relationships'
    }
  ];

  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Fixed canvas size - no need for resize listener since SVG has fixed viewBox
  useEffect(() => {
    // Initialize vector position for fixed canvas size
    const newCenterX = 200; // 400/2
    const newCenterY = 175; // 350/2
    setVector({
      start: { x: newCenterX, y: newCenterY },
      end: { x: newCenterX + 120, y: newCenterY - 80 }
    });
  }, []);

  // Calculate vector components, magnitude, and angle
  const dx = vector.end.x - vector.start.x;
  const dy = vector.start.y - vector.end.y; // Flip y for mathematical coordinates
  const magnitude = Math.sqrt(dx * dx + dy * dy);
  const scale = 20; // Scale factor for display units

  // Calculate angle in radians and degrees
  const angleRad = Math.atan2(dy, dx);
  const angleDeg = (angleRad * 180) / Math.PI;

  // Trigonometric values
  const sinTheta = dy / magnitude;
  const cosTheta = dx / magnitude;
  const tanTheta = dy / dx;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    
    const svgRect = canvasRef.current.querySelector('svg')?.getBoundingClientRect();
    
    if (svgRect) {
      // Calculate position within the SVG viewBox (400x350)
      const x = ((e.clientX - svgRect.left) / svgRect.width) * 400;
      const y = ((e.clientY - svgRect.top) / svgRect.height) * 350;
      
      // Clamp to viewBox boundaries
      const clampedX = Math.max(10, Math.min(390, x));
      const clampedY = Math.max(10, Math.min(340, y));
      
      setVector(prev => ({
        ...prev,
        end: { x: clampedX, y: clampedY }
      }));

      // Track interaction
      handleInteractionComplete({
        interactionId: 'vector-angles-interaction',
        value: `angle-${angleDeg.toFixed(1)}`,
        timestamp: Date.now()
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const svgRect = canvasRef.current.querySelector('svg')?.getBoundingClientRect();
    
    if (svgRect) {
      // Calculate position within the SVG viewBox (400x350)
      const x = ((e.clientX - svgRect.left) / svgRect.width) * 400;
      const y = ((e.clientY - svgRect.top) / svgRect.height) * 350;
      
      // Clamp to viewBox boundaries
      const clampedX = Math.max(10, Math.min(390, x));
      const clampedY = Math.max(10, Math.min(340, y));
      
      setVector(prev => ({
        ...prev,
        end: { x: clampedX, y: clampedY }
      }));

      // Track interaction
      handleInteractionComplete({
        interactionId: 'vector-angles-interaction',
        value: `angle-${angleDeg.toFixed(1)}`,
        timestamp: Date.now()
      });
    }
  };

  return (
    <SlideComponentWrapper
      slideId="vector-angles-intro"
      slideTitle="Working with Angles"
      moduleId="vectors"
      submoduleId="working-with-angles"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-slate-50 dark:bg-slate-900/20 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Explanation */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="space-y-6">
                {/* Main concept */}
                <div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Sometimes, it is just the <span className="font-semibold text-blue-600 dark:text-blue-400">direction of the vector</span> that is 
                    of importance.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    In such cases, it is customary to specify the direction by stating the angle it makes with the 
                    predefined <InlineMath math="\hat{i}" /> and <InlineMath math="\hat{j}" /> directions.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg mb-4">
                    <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                      <span className="font-semibold">Example:</span> "The sun rose 20 degrees north of east."
                    </p>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Trigonometry helps with this!</span>
                  </p>
                </div>

                {/* Angle definition */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h2 className="text-blue-600 dark:text-blue-400 text-xl font-medium mb-3">
                    Angle Convention
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    Let <InlineMath math="\theta" /> be the angle as measured from <InlineMath math="\hat{i}" /> direction going 
                    towards the <InlineMath math="\hat{j}" /> direction.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    (Angles measured going oppositely will be negative.)
                  </p>
                </div>

                {/* Trigonometric relationships */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h2 className="text-blue-600 dark:text-blue-400 text-xl font-medium mb-3">
                    Trigonometry
                  </h2>
                  <div className="space-y-3 justify-center items-center">
                    <div className="flex items-center justify-center">
                      <span className="text-slate-700 dark:text-slate-300 text-center items-center">
                        <BlockMath math="\sin \theta = \frac{V_y}{|V|}" />
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-slate-700 dark:text-slate-300 text-center items-center">
                        <BlockMath math="\cos \theta = \frac{V_x}{|V|}" />
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-slate-700 dark:text-slate-300 text-center items-center">
                        <BlockMath math="\tan \theta = \frac{V_y}{V_x}" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Interactive visualization */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Vector Angle
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Drag the white dot or click anywhere to change the vector and see how the angle θ changes.
              </p>

              {/* Interactive canvas */}
              <div 
                ref={canvasRef}
                className="relative w-full h-132 bg-slate-100 dark:bg-gray-900 rounded-lg cursor-crosshair border-2 border-slate-200 dark:border-slate-700"
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onClick={handleCanvasClick}
              >
                <svg width="100%" height="500" viewBox="0 0 400 350" className="mx-auto">
                  {/* Grid lines */}
                  <defs>
                    {/* Arrow markers */}
                    <marker id="vectorArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                      <polygon points="0 0, 6 2, 0 4" fill="#8B5CF6" />
                    </marker>
                    <marker id="iArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                      <polygon points="0 0, 6 2, 0 4" fill="#EF4444" />
                    </marker>
                    <marker id="jArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                      <polygon points="0 0, 6 2, 0 4" fill="#10B981" />
                    </marker>
                  </defs>
                  
                  {/* Grid lines aligned with scale */}
                  {Array.from({ length: Math.ceil(canvasSize.width / scale) + 1 }).map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={centerX + (i - Math.floor(canvasSize.width / (2 * scale))) * scale}
                      y1={0}
                      x2={centerX + (i - Math.floor(canvasSize.width / (2 * scale))) * scale}
                      y2={canvasSize.height}
                      stroke="#3B82F6"
                      strokeWidth={i === Math.floor(canvasSize.width / (2 * scale)) ? "2" : "0.5"}
                      opacity={i === Math.floor(canvasSize.width / (2 * scale)) ? "0.8" : "0.3"}
                    />
                  ))}
                  
                  {Array.from({ length: Math.ceil(canvasSize.height / scale) + 1 }).map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1={0}
                      y1={centerY + (i - Math.floor(canvasSize.height / (2 * scale))) * scale}
                      x2={canvasSize.width}
                      y2={centerY + (i - Math.floor(canvasSize.height / (2 * scale))) * scale}
                      stroke="#3B82F6"
                      strokeWidth={i === Math.floor(canvasSize.height / (2 * scale)) ? "2" : "0.5"}
                      opacity={i === Math.floor(canvasSize.height / (2 * scale)) ? "0.8" : "0.3"}
                    />
                  ))}
                  
                  {/* Basis vectors */}
                  <line 
                    x1={centerX} 
                    y1={centerY} 
                    x2={centerX + 60} 
                    y2={centerY} 
                    stroke="#EF4444" 
                    strokeWidth="3" 
                    markerEnd="url(#iArrow)"
                  />
                  <text 
                    x={centerX + 70} 
                    y={centerY - 5} 
                    className="fill-red-600 text-lg font-bold" 
                    textAnchor="middle"
                  >
                    î
                  </text>
                  
                  <line 
                    x1={centerX} 
                    y1={centerY} 
                    x2={centerX} 
                    y2={centerY - 60} 
                    stroke="#10B981" 
                    strokeWidth="3" 
                    markerEnd="url(#jArrow)"
                  />
                  <text 
                    x={centerX + 15} 
                    y={centerY - 65} 
                    className="fill-green-600 text-lg font-bold" 
                    textAnchor="middle"
                  >
                    ĵ
                  </text>
                  
                  {/* Vector components (dashed lines) */}
                  <line 
                    x1={vector.start.x} 
                    y1={vector.start.y} 
                    x2={vector.end.x} 
                    y2={vector.start.y} 
                    stroke="#EF4444" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.7"
                  />
                  <text 
                    x={(vector.start.x + vector.end.x) / 2} 
                    y={vector.start.y + 15} 
                    className="fill-red-600 text-lg font-bold" 
                    textAnchor="middle"
                  >
                    V<tspan baselineShift="sub">x</tspan>
                  </text>
                  
                  <line 
                    x1={vector.end.x} 
                    y1={vector.start.y} 
                    x2={vector.end.x} 
                    y2={vector.end.y} 
                    stroke="#10B981" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.7"
                  />
                  <text 
                    x={vector.end.x + 15} 
                    y={(vector.start.y + vector.end.y) / 2} 
                    className="fill-green-600 text-lg font-bold" 
                    textAnchor="start"
                  >
                    V<tspan baselineShift="sub">y</tspan>
                  </text>
                  
                  {/* Angle arc */}
                  {magnitude > 0 && (
                    <>
                      {(() => {
                        const arcRadius = 40;
                        const startX = vector.start.x + arcRadius;
                        const startY = vector.start.y;
                        const endX = vector.start.x + arcRadius * Math.cos(angleRad);
                        const endY = vector.start.y - arcRadius * Math.sin(angleRad);
                        
                        // Determine if we need the large arc flag (for angles > 180°)
                        const largeArcFlag = Math.abs(angleRad) > Math.PI ? 1 : 0;
                        
                        // Determine sweep direction (1 for positive angles, 0 for negative)
                        const sweepFlag = angleRad >= 0 ? 0 : 1;
                        
                        return (
                          <path
                            d={`M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`}
                            fill="none"
                            stroke="#9333EA"
                            strokeWidth="2"
                          />
                        );
                      })()}
                      <text 
                        x={vector.start.x + 50 * Math.cos(angleRad / 2)} 
                        y={vector.start.y - 50 * Math.sin(angleRad / 2) + 5} 
                        className="fill-purple-600 text-lg font-bold" 
                        textAnchor="middle"
                      >
                        θ
                      </text>
                    </>
                  )}
                  
                  {/* Main vector */}
                  <line 
                    x1={vector.start.x} 
                    y1={vector.start.y} 
                    x2={vector.end.x} 
                    y2={vector.end.y} 
                    stroke="#8B5CF6" 
                    strokeWidth="4"
                    markerEnd="url(#vectorArrow)"
                  />
                  <text 
                    x={(vector.start.x + vector.end.x) / 2 - 20} 
                    y={(vector.start.y + vector.end.y) / 2 - 10} 
                    className="fill-purple-600 text-lg font-bold" 
                    textAnchor="middle"
                  >
                    V
                  </text>
                  
                  {/* Draggable endpoint */}
                  <circle
                    cx={vector.end.x}
                    cy={vector.end.y}
                    r="8"
                    fill="#FFFFFF"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    cursor="pointer"
                    onMouseDown={() => setIsDragging(true)}
                  />
                  
                  {/* Origin point */}
                  <circle
                    cx={vector.start.x}
                    cy={vector.start.y}
                    r="4"
                    fill="#3B82F6"
                  />
                </svg>
              </div>

              {/* Current values */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h2 className="text-blue-600 dark:text-blue-400 text-xl font-medium mb-3">
                    Current Vector
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-12">
                      <span className="text-slate-700 dark:text-slate-300">
                        <InlineMath math="V_x" />:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-mono">
                        {(dx / scale).toFixed(1)} units
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-12">
                      <span className="text-slate-700 dark:text-slate-300">
                        <InlineMath math="V_y" />:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-mono">
                        {(dy / scale).toFixed(1)} units
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-12">
                      <span className="text-slate-700 dark:text-slate-300">
                        <InlineMath math="|V|" />:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-mono">
                        {(magnitude / scale).toFixed(1)} units
                      </span>
                    </div>
                    <hr className="border-slate-300 dark:border-slate-600" />
                    <div className="flex justify-between items-center px-12">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        <InlineMath math="\theta" />:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-mono font-bold">
                        {angleDeg.toFixed(1)}°
                      </span>
                    </div>
                  </div>
                </div>

              {/* Trigonometric calculations */}
              <div className="mt-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                <h2 className="text-blue-600 dark:text-blue-400 text-xl font-medium mb-3">
                  Trigonometric Values
                </h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg text-slate-600 dark:text-slate-400 mb-1">sin θ</div>
                    <div className="text-lg font-mono text-slate-700 dark:text-slate-300">
                      {sinTheta.toFixed(3)}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg text-slate-600 dark:text-slate-400 mb-1">cos θ</div>
                    <div className="text-lg font-mono text-slate-700 dark:text-slate-300">
                      {cosTheta.toFixed(3)}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg text-slate-600 dark:text-slate-400 mb-1">tan θ</div>
                    <div className="text-lg font-mono text-slate-700 dark:text-slate-300">
                      {Math.abs(dx) > 0.001 ? tanTheta.toFixed(3) : '∞'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
} 