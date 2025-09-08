import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function IntersectingChordsSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: similar triangles, 3: proportions, 4: conclusion

  const slideInteractions: Interaction[] = [
    { id: 'ct-intersecting-chords-proof', conceptId: 'ct-intersecting-chords-proof', conceptName: 'Intersecting Chords Proof', type: 'learning', description: 'Understanding the proof of intersecting chords theorem' },
    { id: 'ct-similar-triangles', conceptId: 'ct-similar-triangles', conceptName: 'Similar Triangles', type: 'learning', description: 'Using similar triangles in the proof' },
    { id: 'ct-intersecting-chords-conclusion', conceptId: 'ct-intersecting-chords-conclusion', conceptName: 'Intersecting Chords Conclusion', type: 'learning', description: 'Conclusion of intersecting chords proof' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Use well-spaced points for a clear intersection (same as Slide1)
  const angleA = 0.8, angleC = 3.6;
  const angleB = 2.1, angleD = 5.1;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Cx = cx + r * Math.cos(angleC), Cy = cy + r * Math.sin(angleC);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  const Dx = cx + r * Math.cos(angleD), Dy = cy + r * Math.sin(angleD);

  // Calculate actual intersection point E of chords AC and BD (same as Slide1)
  const dAC_x = Cx - Ax, dAC_y = Cy - Ay;
  const dBD_x = Dx - Bx, dBD_y = Dy - By;
  const det = dAC_x * dBD_y - dAC_y * dBD_x;
  const t = ((Bx - Ax) * dBD_y - (By - Ay) * dBD_x) / det;
  const Ex = Ax + t * dAC_x;
  const Ey = Ay + t * dAC_y;

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Strategy:</h3>
                  <p>Show that triangles △AED and △CEB are similar using angle-angle (AA) similarity.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Insight:</h3>
                  <p>Vertical angles and inscribed angles subtending the same arc are equal.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
    <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Angle Analysis</h2>
    
    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-4">
      <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Vertical Angles:</h3>
      <p>∠AED = ∠CEB (vertical angles at intersection E)</p>
    </div>
    
    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
      <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Inscribed Angles:</h3>
      <p>∠EAD = ∠ECB (both subtend arc BD)</p>
      <p>∠EDA = ∠EBC (both subtend arc AC)</p>
    </div>
  </div>
</TrackedInteraction>

          <TrackedInteraction interaction={slideInteractions[2]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Conclusion</h2>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Similar Triangles:</h3>
                <p>△AED ~ △CEB (AA similarity)</p>
                <p className="mt-2">Therefore: AE/CE = ED/EB</p>
                <p className="font-bold mt-2">Cross multiply: AE × EB = CE × ED</p>
              </div>
            </div>
          </TrackedInteraction>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
              {step >= 0 && (
                <g>
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
                  <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke="#3B82F6" strokeWidth="3" />
                  <line x1={Bx} y1={By} x2={Dx} y2={Dy} stroke="#10B981" strokeWidth="3" />
                  <circle cx={Ax} cy={Ay} r="4" fill="#3B82F6" />
                  <circle cx={Cx} cy={Cy} r="4" fill="#3B82F6" />
                  <circle cx={Bx} cy={By} r="4" fill="#10B981" />
                  <circle cx={Dx} cy={Dy} r="4" fill="#10B981" />
                  <circle cx={Ex} cy={Ey} r="4" fill="#F59E0B" />
                  <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">A</text>
                  <text x={Cx + (Cx > cx ? 10 : -20)} y={Cy + (Cy > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">C</text>
                  <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#10B981" fontSize="16" fontWeight="bold">B</text>
                  <text x={Dx + (Dx > cx ? 10 : -20)} y={Dy + (Dy > cy ? 18 : -8)} fill="#10B981" fontSize="16" fontWeight="bold">D</text>
                  <text x={Ex + 10} y={Ey - 10} fill="#F59E0B" fontSize="16" fontWeight="bold">E</text>
                </g>
              )}
              {step === 1 && (
                <g>
                  {/* Highlight triangles AED and CEB */}
                  <polygon points={`${Ax},${Ay} ${Ex},${Ey} ${Dx},${Dy}`} fill="rgba(139, 92, 246, 0.18)" stroke="#8B5CF6" strokeWidth="2" />
                  <polygon points={`${Cx},${Cy} ${Ex},${Ey} ${Bx},${By}`} fill="rgba(245, 158, 11, 0.18)" stroke="#F59E0B" strokeWidth="2" />
                  <text x={(Ax + Ex + Dx) / 3} y={(Ay + Ey + Dy) / 3} fill="#8B5CF6" fontSize="12" fontWeight="bold">△AED</text>
                  <text x={(Cx + Ex + Bx) / 3} y={(Cy + Ey + By) / 3} fill="#F59E0B" fontSize="12" fontWeight="bold">△CEB</text>
                </g>
              )}
              {step === 2 && (
                <g>
                  {/* Highlight vertical angles at E */}
                  <path d={`M ${Ex} ${Ey} L ${Ax} ${Ay}`} stroke="#DC2626" strokeWidth="3" />
                  <path d={`M ${Ex} ${Ey} L ${Dx} ${Dy}`} stroke="#DC2626" strokeWidth="3" />
                  <circle cx={Ex} cy={Ey} r="10" fill="none" stroke="#DC2626" strokeWidth="2" />
                  <text x={Ex + 12} y={Ey - 8} fill="#DC2626" fontSize="12" fontWeight="bold">Vertical</text>

                  {/* Highlight chord CD as dashed */}
                  <line x1={Cx} y1={Cy} x2={Dx} y2={Dy} stroke="#F59E0B" strokeWidth="4" opacity="0.7" strokeDasharray="8 6" />

                  {/* Highlight inscribed angle ∠CAD at A (arms AC, AD) */}
                  <path d={`M ${Ax} ${Ay} L ${Cx} ${Cy}`} stroke="#8B5CF6" strokeWidth="2" />
                  <path d={`M ${Ax} ${Ay} L ${Dx} ${Dy}`} stroke="#8B5CF6" strokeWidth="2" />
                  {/* Draw arc for ∠CAD at A */}
                  {(() => {
                    const arcRadius = 22;
                    const angleCA = Math.atan2(Cy - Ay, Cx - Ax);
                    const angleDA = Math.atan2(Dy - Ay, Dx - Ax);
                    let start = angleCA, end = angleDA;
                    if (end < start) end += 2 * Math.PI;
                    const largeArc = end - start > Math.PI ? 1 : 0;
                    const arcStartX = Ax + arcRadius * Math.cos(start);
                    const arcStartY = Ay + arcRadius * Math.sin(start);
                    const arcEndX = Ax + arcRadius * Math.cos(end);
                    const arcEndY = Ay + arcRadius * Math.sin(end);
                    return (
                      <>
                        <path d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 ${arcEndX} ${arcEndY}`} stroke="#8B5CF6" strokeWidth="2.5" fill="none" />
                        <text x={Ax + arcRadius * Math.cos((start + end) / 2) + 8} y={Ay + arcRadius * Math.sin((start + end) / 2) - 8} fill="#8B5CF6" fontSize="13" fontWeight="bold">∠CAD</text>
                      </>
                    );
                  })()}

                  {/* Highlight inscribed angle ∠CBD at B (arms BC, BD) */}
                  <path d={`M ${Bx} ${By} L ${Cx} ${Cy}`} stroke="#F59E0B" strokeWidth="2" />
                  <path d={`M ${Bx} ${By} L ${Dx} ${Dy}`} stroke="#F59E0B" strokeWidth="2" />
                  {/* Draw arc for ∠CBD at B */}
                  {(() => {
                    const arcRadius = 22;
                    const angleCB = Math.atan2(Cy - By, Cx - Bx);
                    const angleDB = Math.atan2(Dy - By, Dx - Bx);
                    let start = angleCB, end = angleDB;
                    if (end < start) end += 2 * Math.PI;
                    const largeArc = end - start > Math.PI ? 1 : 0;
                    const arcStartX = Bx + arcRadius * Math.cos(start);
                    const arcStartY = By + arcRadius * Math.sin(start);
                    const arcEndX = Bx + arcRadius * Math.cos(end);
                    const arcEndY = By + arcRadius * Math.sin(end);
                    return (
                      <>
                        <path d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 ${arcEndX} ${arcEndY}`} stroke="#F59E0B" strokeWidth="2.5" fill="none" />
                        <text x={Bx + arcRadius * Math.cos((start + end) / 2) + 8} y={By + arcRadius * Math.sin((start + end) / 2) - 8} fill="#F59E0B" fontSize="13" fontWeight="bold">∠CBD</text>
                      </>
                    );
                  })()}

                  {/* Highlight central angle ∠COD at O (arms OC, OD) */}
                  {(() => {
                    const Ox = cx, Oy = cy;
                    
                    return (
                      <>
                        {/* Draw radial lines OC and OD */}
                        <line x1={Ox} y1={Oy} x2={Cx} y2={Cy} stroke="#22D3EE" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1={Ox} y1={Oy} x2={Dx} y2={Dy} stroke="#22D3EE" strokeWidth="2" strokeDasharray="4 2" />
                        
                        {/* Draw angle arc */}
                        {(() => {
                          const arcRadius = 36;
                          const angleCO = Math.atan2(Cy - Oy, Cx - Ox);
                          const angleDO = Math.atan2(Dy - Oy, Dx - Ox);
                          
                          // Normalize angles to [0, 2π)
                          let start = angleCO < 0 ? angleCO + 2 * Math.PI : angleCO;
                          let end = angleDO < 0 ? angleDO + 2 * Math.PI : angleDO;
                          
                          // Choose the smaller arc (central angle should be smaller)
                          let angleDiff = Math.abs(end - start);
                          if (angleDiff > Math.PI) {
                            // Swap to get smaller arc
                            [start, end] = [end, start];
                            angleDiff = 2 * Math.PI - angleDiff;
                          }
                          
                          const largeArc = angleDiff > Math.PI ? 1 : 0;
                          const arcStartX = Ox + arcRadius * Math.cos(start);
                          const arcStartY = Oy + arcRadius * Math.sin(start);
                          const arcEndX = Ox + arcRadius * Math.cos(end);
                          const arcEndY = Oy + arcRadius * Math.sin(end);
                          
                          // Calculate midpoint angle for label positioning
                          let midAngle;
                          if (end > start) {
                            midAngle = (start + end) / 2;
                          } else {
                            midAngle = (start + end + 2 * Math.PI) / 2;
                            if (midAngle > 2 * Math.PI) midAngle -= 2 * Math.PI;
                          }
                          
                          return (
                            <>
                              <path d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 ${arcEndX} ${arcEndY}`} stroke="#22D3EE" strokeWidth="2.5" fill="none" />
                              <text x={Ox + (arcRadius + 12) * Math.cos(midAngle)} y={Oy + (arcRadius + 12) * Math.sin(midAngle) + 4} fill="#22D3EE" fontSize="13" fontWeight="bold" textAnchor="middle">∠COD</text>
                            </>
                          );
                        })()}
                        
                        {/* Mark center O */}
                        <circle cx={Ox} cy={Oy} r="3" fill="#22D3EE" />
                        <text x={Ox - 15} y={Oy - 8} fill="#22D3EE" fontSize="14" fontWeight="bold">O</text>
                      </>
                    );
                  })()}
                </g>
              )}
              {step === 3 && (
                <g>
                  {/* Show similarity statement visually */}
                  <rect x="30" y="0" width="340" height="50" fill="#E6F7FF" stroke="#1890FF" strokeWidth="2" rx="10" />
                  <text x="200" y="20" textAnchor="middle" fill="#002766" fontSize="14" fontWeight="bold">△AED ~ △CEB (AA Similarity)</text>
                  <text x="200" y="38" textAnchor="middle" fill="#002766" fontSize="12">Two angles equal → triangles similar</text>
                </g>
              )}
              {step === 4 && (
                <g>
                  {/* Show segment products visually */}
                  <rect x="30" y="340" width="340" height="50" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2" rx="10" />
                  <text x="200" y="360" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold">AE × EC = DE × EB</text>
                  <text x="200" y="378" textAnchor="middle" fill="#DC2626" fontSize="12" fontWeight="bold">(Intersecting Chords Theorem)</text>
                </g>
              )}
            </svg>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
              >Previous</button>
              <button
                className="px-4 py-2 rounded bg-indigo-600 text-white font-medium disabled:opacity-50"
                onClick={() => setStep(s => Math.min(4, s + 1))}
                disabled={step === 4}
              >Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper slideId="ct-intersecting-chords-theorem-proof" slideTitle="Proof by AA Similarity" moduleId="circle-theorems-0001" submoduleId="intersecting-chords" interactions={localInteractions}>
      {slideContent}
    </SlideComponentWrapper>
  );
} 