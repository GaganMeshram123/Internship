import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function ChordBisectorTheoremSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: circle, 2: chord, 3: perpendicular, 4: midpoint, 5: equal segments, 6: converse

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-chord-bisector-concept',
      conceptId: 'ct-chord-bisector',
      conceptName: 'Chord Bisector Concept',
      type: 'learning',
      description: 'Understanding the relationship between perpendiculars from center and chord bisection'
    },
    {
      id: 'ct-perpendicular-properties',
      conceptId: 'ct-perpendicular-properties',
      conceptName: 'Perpendicular Properties',
      type: 'learning',
      description: 'Understanding properties of perpendiculars from center to chords'
    },
    {
      id: 'ct-converse-theorem',
      conceptId: 'ct-converse-theorem',
      conceptName: 'Converse Theorem',
      type: 'learning',
      description: 'Understanding the converse of the chord bisector theorem'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Chord AB
  const angleA = Math.PI * 0.7, angleB = Math.PI * 0.3;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  // Midpoint M of chord AB
  const Mx = (Ax + Bx) / 2, My = (Ay + By) / 2;
  // Perpendicular from center to chord
  const perpX = Mx, perpY = My;

  // Helper for angle arc at a vertex (always draws minor angle)
  function angleArc(x: number, y: number, ax: number, ay: number, bx: number, by: number, radius = 18) {
    let angle1 = Math.atan2(ay - y, ax - x);
    let angle2 = Math.atan2(by - y, bx - x);
    
    if (angle1 < 0) angle1 += 2 * Math.PI;
    if (angle2 < 0) angle2 += 2 * Math.PI;
    
    let diff = angle2 - angle1;
    if (diff < 0) diff += 2 * Math.PI;
    if (diff > Math.PI) {
      [angle1, angle2] = [angle2, angle1];
      diff = 2 * Math.PI - diff;
    }
    
    const arcX1 = x + radius * Math.cos(angle1);
    const arcY1 = y + radius * Math.sin(angle1);
    const arcX2 = x + radius * Math.cos(angle2);
    const arcY2 = y + radius * Math.sin(angle2);
    
    const mid = angle1 + diff / 2;
    const labelX = x + (radius + 15) * Math.cos(mid);
    const labelY = y + (radius + 15) * Math.sin(mid);
    
    return { 
      arc: `M ${arcX1} ${arcY1} A ${radius} ${radius} 0 0 1 ${arcX2} ${arcY2}`, 
      labelX, 
      labelY 
    };
  }

const TheoremDiagram = () => {
    // State to manage the current step
    const [step, setStep] = useState(0);

    // Coordinate constants for the diagram
    const cx = 200;
    const cy = 175;
    const r = 120;
    const chordAngle = Math.PI * 0.7;
    const Ax = cx + r * Math.cos(chordAngle);
    const Ay = cy - r * Math.sin(chordAngle);
    const Bx = cx + r * Math.cos(Math.PI - chordAngle);
    const By = cy - r * Math.sin(Math.PI - chordAngle);
    const Mx = (Ax + Bx) / 2;
    const My = (Ay + By) / 2;

    const steps = [
        { title: "Draw Circle", description: "Draw a circle with center O." },
        { title: "Draw Chord AB", description: "Mark points A and B on the circle and draw chord AB." },
        { title: "Draw Perpendicular OM", description: "Draw perpendicular from center O to chord AB; mark foot as M." },
        { title: "Mark Midpoint", description: "Highlight M as the midpoint of AB." },
        { title: "Show Equal Segments", description: "Demonstrate that AM = MB." },
        { title: "Theorem Statement", description: "Perpendicular from center bisects the chord." },
        { title: "Converse & Explanation", description: "Both statements of Chord Bisector Theorem are equivalent." },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* 1. Headline */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">The Chord Bisector Theorem</h1>
            
            {/* 2. Step Text with Indicator */}
            <div className="mb-6">
                {/* Step Indicator */}
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg">Step {step + 1}</span>
                    <span className="font-light">of {steps.length}</span>
                    <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 ease-out"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>
                {/* Step Description */}
                <div className="p-4 bg-blue-50 dark:bg-slate-700 rounded-xl shadow-inner border border-blue-100 dark:border-slate-600">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300 text-lg">{steps[step].title}</h4>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">{steps[step].description}</p>
                </div>
            </div>

            {/* 3. Buttons */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                >
                    ← Previous
                </button>
                <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                    disabled={step === steps.length - 1}
                >
                    Next →
                </button>
            </div>

  {/* Diagram SVG */}
            <div className="mt-6">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Visualizing the Theorem
        </h3>
        <svg width="420" height="500" viewBox="0 0 400 500" className="mx-auto">
            {/* Circle */}
            {step >= 1 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />}

            {/* Center O */}
            {step >= 1 && (
                <>
                    <circle cx={cx} cy={cy} r="4" fill="#DC2626" />
                    <text x={cx + 10} y={cy - 2} fill="#DC2626" fontSize="14" fontWeight="bold">O</text>
                </>
            )}

            {/* Chord AB */}
            {step >= 2 && (
                <>
                    <circle cx={Ax} cy={Ay} r="4" fill="#3B82F6" />
                    <circle cx={Bx} cy={By} r="4" fill="#3B82F6" />
                    <text x={Ax - 20} y={Ay - 5} fill="#3B82F6" fontSize="16" fontWeight="bold">A</text>
                    <text x={Bx + 10} y={By - 5} fill="#3B82F6" fontSize="16" fontWeight="bold">B</text>
                    <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#3B82F6" strokeWidth="3" />
                    {/* Position Chord AB label clearly above the chord */}
                    <text x={cx} y={Ay - 30} fill="#3B82F6" fontSize="16" fontWeight="bold" textAnchor="middle">Chord AB</text>
                </>
            )}

            {/* Perpendicular OM */}
            {step >= 3 && (
                <>
                    <circle cx={Mx} cy={My} r="4" fill="#10B981" />
                    <text x={Mx + 10} y={My + 5} fill="#10B981" fontSize="16" fontWeight="bold">M</text>
                    <line x1={cx} y1={cy} x2={Mx} y2={My} stroke="#10B981" strokeWidth="3" />
                    
                    {/* Right Angle Marker and 90° Text */}
                    <rect x={Mx - 10} y={My - 10} width="10" height="10" stroke="#F59E0B" strokeWidth="2" fill="none" />
                    <text x={Mx - 25} y={My - 15} fill="#F59E0B" fontSize="12" fontWeight="bold">90°</text>
                    
                    {/* OM ⊥ AB Label - Positioned clearly beside OM */}
                    <text x={Mx + 20} y={(cy + My) / 2 - 10} fill="#10B981" fontSize="14" fontWeight="bold">OM ⊥ AB</text>
                </>
            )}

            {/* Midpoint & Equal Segments */}
            {step >= 4 && (
                <>
                    {/* Midpoint label - clear position below M */}
                    <text x={Mx} y={My + 25} fill="#F59E0B" fontSize="14" fontWeight="bold" textAnchor="middle">Midpoint</text>
                    
                    {/* Equal segment tick marks - Adjusted for better visibility and angle */}
                    {/* Tick mark 1 for AM - centered on AM segment */}
                    <line x1={Ax + (Mx - Ax) * 0.5 - 5 * ((My - Ay) / Math.hypot(Mx - Ax, My - Ay))} y1={Ay + (My - Ay) * 0.5 + 5 * ((Mx - Ax) / Math.hypot(Mx - Ax, My - Ay))} 
                          x2={Ax + (Mx - Ax) * 0.5 + 5 * ((My - Ay) / Math.hypot(Mx - Ax, My - Ay))} y2={Ay + (My - Ay) * 0.5 - 5 * ((Mx - Ax) / Math.hypot(Mx - Ax, My - Ay))} 
                          stroke="#8B5CF6" strokeWidth="2" />
                    {/* Tick mark 2 for MB - centered on MB segment */}
                    <line x1={Mx + (Bx - Mx) * 0.5 - 5 * ((By - My) / Math.hypot(Bx - Mx, By - My))} y1={My + (By - My) * 0.5 + 5 * ((Bx - Mx) / Math.hypot(Bx - Mx, By - My))} 
                          x2={Mx + (Bx - Mx) * 0.5 + 5 * ((By - My) / Math.hypot(Bx - Mx, By - My))} y2={My + (By - My) * 0.5 - 5 * ((Bx - Mx) / Math.hypot(Bx - Mx, By - My))} 
                          stroke="#8B5CF6" strokeWidth="2" />

                    {/* AM = MB and M bisects AB labels - Grouped nicely below the circle */}
                    <text x={cx} y={cy + r + 30} fill="#8B5CF6" fontSize="16" fontWeight="bold" textAnchor="middle">AM = MB</text>
                    <text x={cx} y={cy + r + 50} fill="#8B5CF6" fontSize="14" textAnchor="middle">M bisects AB</text>
                </>
            )}

            {/* Theorem Statement / Converse */}
            {step >= 5 && (
                <>
                    {/* Adjusted position of the box and text for better vertical spacing */}
                    <rect x="0" y="380" width="400" height="110" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" rx="10" />
                    <text x="200" y="400" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold">
                        Chord Bisector Theorem (Both Directions)
                    </text>
                    <text x="200" y="418" textAnchor="middle" fill="#0C4A6E" fontSize="12">
                        1. Perpendicular from center to chord bisects the chord
                    </text>
                    <text x="200" y="434" textAnchor="middle" fill="#0C4A6E" fontSize="12">
                        2. Line from center through midpoint of chord is perpendicular to chord
                    </text>
                    <text x="200" y="452" textAnchor="middle" fill="#DC2626" fontSize="12" fontWeight="bold">
                        Both statements are equivalent and always true!
                    </text>
                </>
            )}
        </svg>
                </div>
            </div>
        </div>
    );
};



  // The slide content
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Theorem Statement */}
        <div className="space-y-6">
          {/* Main Theorem */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p className="font-medium">
                    A <strong>perpendicular</strong> drawn from the center of a circle to a chord <strong>bisects</strong> the chord.
                  </p>
                </div>
                
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Mathematical Form:</h3>
                  <p>If OM ⊥ chord AB, where O is the center and M is on AB, then:</p>
                  <p className="font-bold text-center mt-2">AM = MB</p>
                  <p className="text-center text-sm">M is the midpoint of AB</p>
                </div>
                
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Conditions:</h3>
                  <ul className="space-y-2">
                    <li>• O is the center of the circle</li>
                    <li>• AB is any chord of the circle</li>
                    <li>• OM is perpendicular to chord AB</li>
                    <li>• M is the intersection point</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Perpendicular Properties */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold dark:text-blue-400 mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Why Does This Work?
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Symmetry Principle:</h3>
                  <p>The perpendicular from the center creates perfect symmetry, making the two segments equal.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Congruent Triangles:</h3>
                  <p>Triangles OAM and OBM are congruent (by RHS), making AM = BM.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Shortest Distance:</h3>
                  <p className="text-sm">The perpendicular represents the shortest distance from center to chord, naturally occurring at the midpoint.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Converse and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Converse Theorem */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold dark:text-blue-400 mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Converse Theorem
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Converse Statement:</h3>
                  <p>If a line from the center of a circle passes through the midpoint of a chord, then it is perpendicular to that chord.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Practical Meaning:</h3>
                  <p>Both directions are true - bisecting implies perpendicularity, and perpendicularity implies bisecting.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-chord-bisector-theorem-statement"
      slideTitle="Chord Bisector Theorem"
      moduleId="circle-theorems-0001"
      submoduleId="chord-bisector-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 