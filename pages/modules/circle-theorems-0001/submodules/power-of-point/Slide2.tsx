import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function PowerOfPointSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: auxiliary, 3: similarity, 4: proportion, 5: conclusion

  const slideInteractions: Interaction[] = [
    { id: 'ct-power-point-secant-proof-setup', conceptId: 'ct-power-point-secant-proof-setup', conceptName: 'Proof Setup', type: 'learning', description: 'Setting up the secant-secant power of a point proof' },
    { id: 'ct-power-point-secant-auxiliary', conceptId: 'ct-power-point-secant-auxiliary', conceptName: 'Auxiliary Lines', type: 'learning', description: 'Drawing auxiliary lines to form triangles' },
    { id: 'ct-power-point-secant-similarity', conceptId: 'ct-power-point-secant-similarity', conceptName: 'Similar Triangles', type: 'learning', description: 'Showing triangle similarity' },
    { id: 'ct-power-point-secant-proportion', conceptId: 'ct-power-point-secant-proportion', conceptName: 'Proportion', type: 'learning', description: 'Setting up the proportion and cross-multiplying' },
    { id: 'ct-power-point-secant-conclusion', conceptId: 'ct-power-point-secant-conclusion', conceptName: 'Conclusion', type: 'learning', description: 'Concluding the proof' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry (same as Slide1)
  const cx = 200, cy = 175, r = 120;
  // External point P
  const Px = cx + 180, Py = cy;
  // First secant from P through points A and B on the circle
  const secant1Angle = Math.PI * 0.7;
  const secant1X = cx + r * Math.cos(secant1Angle);
  const secant1Y = cy + r * Math.sin(secant1Angle);
  const dx1 = secant1X - Px;
  const dy1 = secant1Y - Py;
  const length1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  const unitX1 = dx1 / length1;
  const unitY1 = dy1 / length1;
  const discriminant1 = Math.pow(unitX1 * (Px - cx) + unitY1 * (Py - cy), 2) - ((Px - cx) * (Px - cx) + (Py - cy) * (Py - cy) - r * r);
  const t1 = -(unitX1 * (Px - cx) + unitY1 * (Py - cy));
  const sqrt1 = Math.sqrt(discriminant1);
  const Ax = Px + unitX1 * (t1 - sqrt1);
  const Ay = Py + unitY1 * (t1 - sqrt1);
  const Bx = Px + unitX1 * (t1 + sqrt1);
  const By = Py + unitY1 * (t1 + sqrt1);
  // Second secant from P through points C and D on the circle
  const secant2Angle = Math.PI * 1.3;
  const secant2X = cx + r * Math.cos(secant2Angle);
  const secant2Y = cy + r * Math.sin(secant2Angle);
  const dx2 = secant2X - Px;
  const dy2 = secant2Y - Py;
  const length2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  const unitX2 = dx2 / length2;
  const unitY2 = dy2 / length2;
  const discriminant2 = Math.pow(unitX2 * (Px - cx) + unitY2 * (Py - cy), 2) - ((Px - cx) * (Px - cx) + (Py - cy) * (Py - cy) - r * r);
  const t2 = -(unitX2 * (Px - cx) + unitY2 * (Py - cy));
  const sqrt2 = Math.sqrt(discriminant2);
  const Cx = Px + unitX2 * (t2 - sqrt2);
  const Cy = Py + unitY2 * (t2 - sqrt2);
  const Dx = Px + unitX2 * (t2 + sqrt2);
  const Dy = Py + unitY2 * (t2 + sqrt2);

  // Diagram component
  const ProofDiagram = () => (
    <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
      <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
        {/* Circle and center */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        <circle cx={cx} cy={cy} r="3" fill="#374151" />
        <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
        {/* External point P */}
        <circle cx={Px} cy={Py} r="4" fill="#DC2626" />
        <text x={Px + 10} y={Py - 2} fill="#DC2626" fontSize="16" fontWeight="bold">P</text>
        {/* Secants */}
        <line x1={Px} y1={Py} x2={Bx} y2={By} stroke="#3B82F6" strokeWidth={step >= 1 ? 3 : 2} opacity={step >= 1 ? 1 : 0.5} />
        <line x1={Px} y1={Py} x2={Dx} y2={Dy} stroke="#10B981" strokeWidth={step >= 1 ? 3 : 2} opacity={step >= 1 ? 1 : 0.5} />
        {/* Points A, B, C, D */}
        <circle cx={Ax} cy={Ay} r="3" fill="#3B82F6" />
        <circle cx={Bx} cy={By} r="3" fill="#3B82F6" />
        <circle cx={Cx} cy={Cy} r="3" fill="#10B981" />
        <circle cx={Dx} cy={Dy} r="3" fill="#10B981" />
        <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">A</text>
        <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">B</text>
        <text x={Cx + (Cx > cx ? 10 : -20)} y={Cy + (Cy > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">C</text>
        <text x={Dx + (Dx > cx ? 10 : -20)} y={Dy + (Dy > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">D</text>
        {/* Step 2: Draw auxiliary lines */}
        {step >= 2 && (
          <>
            <line x1={Ax} y1={Ay} x2={Dx} y2={Dy} stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="6 4" />
            <line x1={Bx} y1={By} x2={Cx} y2={Cy} stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="6 4" />
            {/* Labels for chords */}
            <text x={(Ax + Dx) / 2 - 10} y={(Ay + Dy) / 2 - 10} fill="#F59E0B" fontSize="13" fontWeight="bold">AD</text>
            <text x={(Bx + Cx) / 2 + 10} y={(By + Cy) / 2 + 10} fill="#8B5CF6" fontSize="13" fontWeight="bold">BC</text>
          </>
        )}
        {/* Step 3: Highlight triangles and angles */}
        {step >= 3 && (
          <>
            {/* Triangle PAD */}
            <polygon points={`${Px},${Py} ${Ax},${Ay} ${Dx},${Dy}`} fill="#F59E0B" fillOpacity="0.18" stroke="#F59E0B" strokeWidth="2" />
            {/* Triangle PCB */}
            <polygon points={`${Px},${Py} ${Cx},${Cy} ${Bx},${By}`} fill="#8B5CF6" fillOpacity="0.18" stroke="#8B5CF6" strokeWidth="2" />
            {/* Triangle labels */}
            <text x={(Px + Ax + Dx) / 3 - 10} y={(Py + Ay + Dy) / 3 - 10} fill="#F59E0B" fontSize="13" fontWeight="bold">△PAD</text>
            <text x={(Px + Cx + Bx) / 3 + 10} y={(Py + Cy + By) / 3 + 10} fill="#8B5CF6" fontSize="13" fontWeight="bold">△PCB</text>
            {/* Angle marks */}
            {/* ∠APD and ∠CPB (vertical angles) */}
            <text x={Px + 18} y={Py - 10} fill="#DC2626" fontSize="13" fontWeight="bold">∠APD</text>
            <text x={Px - 38} y={Py + 18} fill="#DC2626" fontSize="13" fontWeight="bold">∠CPB</text>
            {/* ∠PAD and ∠PCB (inscribed angles) */}
            <text x={Ax - 30} y={Ay - 18} fill="#F59E0B" fontSize="13" fontWeight="bold">∠PAD</text>
            <text x={Cx + 18} y={Cy - 18} fill="#8B5CF6" fontSize="13" fontWeight="bold">∠PCB</text>
            {/* Arrows or marks for equal angles could be added with paths if desired */}
          </>
        )}
        {/* Step 4: Proportion arrows/labels */}
        {step >= 4 && (
          <>
            {/* Sides for proportion */}
            <line x1={Px} y1={Py} x2={Ax} y2={Ay} stroke="#F59E0B" strokeWidth="4" />
            <line x1={Px} y1={Py} x2={Cx} y2={Cy} stroke="#8B5CF6" strokeWidth="4" />
            <line x1={Px} y1={Py} x2={Dx} y2={Dy} stroke="#F59E0B" strokeWidth="4" />
            <line x1={Px} y1={Py} x2={Bx} y2={By} stroke="#8B5CF6" strokeWidth="4" />
            {/* Labels */}
            <text x={(Px + Ax) / 2 - 10} y={(Py + Ay) / 2 - 10} fill="#F59E0B" fontSize="13" fontWeight="bold">PA</text>
            <text x={(Px + Dx) / 2 + 10} y={(Py + Dy) / 2 + 10} fill="#F59E0B" fontSize="13" fontWeight="bold">PD</text>
            <text x={(Px + Cx) / 2 - 10} y={(Py + Cy) / 2 - 10} fill="#8B5CF6" fontSize="13" fontWeight="bold">PC</text>
            <text x={(Px + Bx) / 2 + 10} y={(Py + By) / 2 + 10} fill="#8B5CF6" fontSize="13" fontWeight="bold">PB</text>
            {/* Proportion formula visually */}
            <text x={Px + 40} y={Py + 40} fill="#1E40AF" fontSize="15" fontWeight="bold">PA / PC = PD / PB</text>
            <text x={Px + 40} y={Py + 60} fill="#1E40AF" fontSize="15" fontWeight="bold">PA × PB = PC × PD</text>
          </>
        )}
        {/* Step 5: Conclusion box */}
        {step >= 5 && (
          <g>
            <rect x="50" y="320" width="300" height="40" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" rx="10" />
            <text x="200" y="345" textAnchor="middle" fill="#1E40AF" fontSize="15" fontWeight="bold">PA × PB = PC × PD ✓</text>
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
          onClick={() => setStep(s => Math.min(5, step + 1))}
          disabled={step === 5}
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
          {/* Step 1: Setup */}
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Proof Setup</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <ul className="space-y-2">
                    <li>• External point P</li>
                    <li>• Secants PAB and PCD intersecting the circle at A, B, C, D</li>
                    <li>• Want to prove: <span className="font-bold">PA × PB = PC × PD</span></li>
                  </ul>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">We will use similar triangles, focusing on the angles they share and subtend, to prove this relationship.</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          {/* Step 2: Auxiliary Lines */}
          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Draw Auxiliary Lines</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Construction:</h3>
                  <ul className="space-y-2">
                    <li>• Draw chord <span className="font-bold">AD</span></li>
                    <li>• Draw chord <span className="font-bold">BC</span></li>
                    <li>• This forms triangles <span className="font-bold">△PAD</span> and <span className="font-bold">△PCB</span></li>
                  </ul>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">By drawing these chords, we create two triangles that share the external point P and connect the endpoints of the secants.</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          {/* Step 3: Similar Triangles */}
          <TrackedInteraction interaction={slideInteractions[2]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Similar Triangles</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Why Similar?</h3>
                  <ul className="space-y-2">
                    <li>• <span className="font-bold">∠APD = ∠CPB</span> because they are vertical angles (formed by intersecting lines at P).</li>
                    <li>• <span className="font-bold">∠PAD = ∠PCB</span> because both subtend the same arc <span className="font-bold">BD</span> (by the inscribed angle theorem).</li>
                  </ul>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">Because two pairs of corresponding angles are equal, the triangles <span className="font-bold">△PAD</span> and <span className="font-bold">△PCB</span> are similar by the AA (Angle-Angle) criterion.</div>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">Similarity means their corresponding sides are in proportion, which is the foundation for the next step.</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          {/* Step 4: Proportion */}
          <TrackedInteraction interaction={slideInteractions[3]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Proportion from Similarity</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Set Up Proportion:</h3>
                  <ul className="space-y-2">
                    <li>• Because the triangles are similar, their corresponding sides are proportional:</li>
                    <li className="ml-4">PA / PC = PD / PB</li>
                    <li>• Cross-multiplying gives:</li>
                    <li className="ml-4">PA × PB = PC × PD</li>
                  </ul>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">This proportion directly relates the products of the segments from P to the points of intersection on the circle.</div>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">Cross-multiplication is valid because the ratios are equal (from similarity), so their cross-products must also be equal.</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          {/* Step 5: Conclusion */}
          <TrackedInteraction interaction={slideInteractions[4]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Conclusion</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Result:</h3>
                  <p className="font-bold">PA × PB = PC × PD ✓</p>
                  <p className="text-sm mt-2 italic">The power of a point theorem is proved using similar triangles.</p>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">This result is fundamental in circle geometry and has many applications, such as finding unknown lengths and solving geometric problems involving circles and secants.</div>
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
      slideId="ct-power-of-point-secant-secant-proof"
      slideTitle="Power of a Point: Secant-Secant Proof"
      moduleId="circle-theorems-0001"
      submoduleId="power-of-point"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 