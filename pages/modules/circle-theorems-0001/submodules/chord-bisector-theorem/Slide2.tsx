import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function ChordBisectorTheoremSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: triangles, 3: congruence, 4: conclusion

  const slideInteractions: Interaction[] = [
    { id: 'ct-chord-bisector-proof-setup', conceptId: 'ct-chord-bisector-proof-setup', conceptName: 'Proof Setup', type: 'learning', description: 'Setting up the chord bisector theorem proof' },
    { id: 'ct-chord-bisector-congruent-triangles', conceptId: 'ct-chord-bisector-congruent-triangles', conceptName: 'Congruent Triangles', type: 'learning', description: 'Showing triangle congruence' },
    { id: 'ct-chord-bisector-conclusion', conceptId: 'ct-chord-bisector-conclusion', conceptName: 'Conclusion', type: 'learning', description: 'Concluding the proof' }
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

  // Diagram component
  const ProofDiagram = () => (
    <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
      <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
        {/* Circle and center */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        <circle cx={cx} cy={cy} r="4" fill="#3B82F6" />
        <text x={cx + 10} y={cy - 2} fill="#3B82F6" fontSize="14" fontWeight="bold">O</text>
        {/* Chord AB */}
        <circle cx={Ax} cy={Ay} r="4" fill="#3B82F6" />
        <circle cx={Bx} cy={By} r="4" fill="#3B82F6" />
        <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">A</text>
        <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">B</text>
        <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#3B82F6" strokeWidth="3" />
        {/* Midpoint M */}
        <circle cx={Mx} cy={My} r="5" fill="#F59E0B" />
        <text x={Mx + 10} y={My - 10} fill="#F59E0B" fontSize="16" fontWeight="bold">M</text>
        {/* Perpendicular OM */}
        <line x1={cx} y1={cy} x2={Mx} y2={My} stroke="#10B981" strokeWidth="3" />
        <text x={(cx + Mx) / 2 - 22} y={(cy + My) / 2 - 20} fill="#10B981" fontSize="12" fontWeight="bold">OM ⊥ AB</text>
        {/* Right angle at M */}
        <rect x={Mx - 7} y={My - 7} width="12" height="12" fill="none" stroke="#F59E0B" strokeWidth="2" transform={`rotate(${Math.atan2(cy-My, cx-Mx)*180/Math.PI},${Mx},${My})`} />
        {/* Congruent triangles highlight */}
        {step >= 2 && (
          <>
            {/* △OAM */}
            <polygon points={`${cx},${cy} ${Ax},${Ay} ${Mx},${My}`} fill="#3B82F6" fillOpacity="0.13" stroke="#3B82F6" strokeWidth="2" />
            {/* △OBM */}
            <polygon points={`${cx},${cy} ${Bx},${By} ${Mx},${My}`} fill="#10B981" fillOpacity="0.13" stroke="#10B981" strokeWidth="2" />
            {/* Triangle labels */}
            <text x={(cx + Ax + Mx) / 3 - 10} y={(cy + Ay + My) / 3 - 10} fill="#3B82F6" fontSize="13" fontWeight="bold">△OAM</text>
            <text x={(cx + Bx + Mx) / 3 + 10} y={(cy + By + My) / 3 + 10} fill="#10B981" fontSize="13" fontWeight="bold">△OBM</text>
          </>
        )}
        {/* Equal segments */}
        {step >= 3 && (
          <>
            {/* Tick marks for AM and MB */}
            <line x1={Ax} y1={Ay} x2={Mx} y2={My} stroke="#8B5CF6" strokeWidth="4" strokeDasharray="6 4" />
            <line x1={Bx} y1={By} x2={Mx} y2={My} stroke="#8B5CF6" strokeWidth="4" strokeDasharray="6 4" />
            <text x={(Ax + Mx) / 2 - 18} y={(Ay + My) / 2 - 8} fill="#8B5CF6" fontSize="13" fontWeight="bold">AM</text>
            <text x={(Bx + Mx) / 2 + 18} y={(By + My) / 2 + 8} fill="#8B5CF6" fontSize="13" fontWeight="bold">MB</text>
            <text x={Mx - 30} y={My + 40} fill="#8B5CF6" fontSize="14" fontWeight="bold">AM = MB</text>
          </>
        )}
        {/* Conclusion box */}
        {step >= 4 && (
          <g>
            <rect x="50" y="50" width="300" height="40" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" rx="10" />
            <text x="200" y="75" textAnchor="middle" fill="#1E40AF" fontSize="15" fontWeight="bold">OM ⊥ AB ⇒ AM = MB ✓</text>
          </g>
        )}
      </svg>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium border border-blue-300 dark:border-blue-700 disabled:opacity-50"
          onClick={() => setStep(s => Math.max(0, step - 1))}
          disabled={step === 0}
        >Previous</button>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white font-medium border border-blue-700 disabled:opacity-50"
          onClick={() => setStep(s => Math.min(4, step + 1))}
          disabled={step === 4}
        >Next</button>
      </div>
    </div>
  );

  // Slide content
  const slideContent = (
    <div className="w-full h-full bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Proof Steps */}
        <div className="space-y-6">
          {/* Setup */}
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Proof Setup</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <ul className="space-y-2">
                    <li>• Circle with center O</li>
                    <li>• Chord AB</li>
                    <li>• OM ⊥ AB, with M on AB</li>
                  </ul>
                  <div className="mt-2 text-blue-700 dark:text-blue-300 text-sm">We want to prove that M is the midpoint of AB (AM = MB).</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          {/* Congruent Triangles */}
          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Congruent Triangles</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Why Congruent?</h3>
                  <ul className="space-y-2">
                    <li>• OA = OB (radii of the circle)</li>
                    <li>• OM is common to both triangles</li>
                    <li>• ∠OMA = ∠OMB = 90° (by construction)</li>
                  </ul>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">Triangles △OAM and △OBM are congruent by the RHS (Right angle-Hypotenuse-Side) criterion.</div>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">Congruence means all corresponding sides are equal, so AM = MB.</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          {/* Conclusion */}
          <TrackedInteraction interaction={slideInteractions[2]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Conclusion</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Result:</h3>
                  <p className="font-bold">OM ⊥ AB ⇒ AM = MB ✓</p>
                  <p className="text-sm mt-2 italic">A perpendicular from the center to a chord always bisects the chord.</p>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">This geometric property is fundamental for constructions and proofs involving circles and chords.</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>
        {/* Right column - Diagram */}
        <div className="space-y-6">
          <ProofDiagram />
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-chord-bisector-theorem-proof"
      slideTitle="Chord Bisector Theorem Proof"
      moduleId="circle-theorems-0001"
      submoduleId="chord-bisector-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 