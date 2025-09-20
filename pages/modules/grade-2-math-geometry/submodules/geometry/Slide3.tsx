import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Data and Visual Components for Partitions ---
const PARTITIONS = [
    { name: 'Halves', count: 2, fraction: '1/2', component: () => <svg viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" className="fill-purple-400" /><line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="4" /></svg> },
    { name: 'Thirds', count: 3, fraction: '1/3', component: () => <svg viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" className="fill-purple-400" /><line x1="38" y1="5" x2="38" y2="95" stroke="white" strokeWidth="4" /><line x1="66" y1="5" x2="66" y2="95" stroke="white" strokeWidth="4" /></svg> },
    { name: 'Fourths', count: 4, fraction: '1/4', component: () => <svg viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" className="fill-purple-400" /><line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="4" /><line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="4" /></svg> },
];

export default function PartitioningShapesSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'partitioning-shapes-concept', conceptId: 'partitioning-shapes', conceptName: 'Partitioning Shapes', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col gap-6">
            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Halves, Thirds, and Fourths</h3>
                <div className="space-y-4">
                    {PARTITIONS.map(p => (
                        <div key={p.name} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">{p.component()}</div>
                            <div>
                                <p className="font-bold text-slate-700 dark:text-slate-200">{p.name} ({p.count} pieces)</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">One piece is written as <strong className="font-mono text-base">{p.fraction}</strong>.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-t-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Fair Shares Only! ✅</h3>
                <p className="text-slate-600 dark:text-slate-400">For fractions, the pieces must be <strong>equal</strong>. Sharing has to be fair, so everyone gets the same size piece!</p>
            </div>
        </div>
    );
    
    // --- REWRITTEN INTERACTIVE COMPONENTS ---
    const CuttableShape = ({ shapeType, cuts }: { shapeType: 'circle' | 'square', cuts: number }) => {
        // This is a debugging message. Check your browser's console (F12).
        console.log(`Rendering CuttableShape with shape: ${shapeType}, cuts: ${cuts}`);

        const shapeFill = "fill-purple-400 dark:fill-purple-600";
        const strokeStyle = "stroke-white dark:stroke-slate-900";

        const lines = () => {
            if (shapeType === 'square') {
                switch (cuts) {
                    case 2: return <motion.line key="sq2" x1="50" y1="0" x2="50" y2="100" className={strokeStyle} strokeWidth="4" />;
                    case 3: return <motion.g key="sq3"><line x1="33.3" y1="0" x2="33.3" y2="100" className={strokeStyle} strokeWidth="4" /><line x1="66.6" y1="0" x2="66.6" y2="100" className={strokeStyle} strokeWidth="4" /></motion.g>;
                    case 4: return <motion.g key="sq4"><line x1="50" y1="0" x2="50" y2="100" className={strokeStyle} strokeWidth="4" /><line x1="0" y1="50" x2="100" y2="50" className={strokeStyle} strokeWidth="4" /></motion.g>;
                    default: return null;
                }
            } else { // Circle
                switch (cuts) {
                    case 2: return <motion.line key="circ2" x1="50" y1="0" x2="50" y2="100" className={strokeStyle} strokeWidth="4" />;
                    case 3: return <motion.g key="circ3">
                        <line x1="50" y1="50" x2="50" y2="0" className={strokeStyle} strokeWidth="4" />
                        <line x1="50" y1="50" x2={50 - 50 * Math.sin(2 * Math.PI / 3)} y2={50 - 50 * Math.cos(2 * Math.PI / 3)} className={strokeStyle} strokeWidth="4" />
                        <line x1="50" y1="50" x2={50 + 50 * Math.sin(2 * Math.PI / 3)} y2={50 - 50 * Math.cos(2 * Math.PI / 3)} className={strokeStyle} strokeWidth="4" />
                    </motion.g>;
                    case 4: return <motion.g key="circ4"><line x1="50" y1="0" x2="50" y2="100" className={strokeStyle} strokeWidth="4" /><line x1="0" y1="50" x2="100" y2="50" className={strokeStyle} strokeWidth="4" /></motion.g>;
                    default: return null;
                }
            }
        };

        return (
            <svg viewBox="-10 -10 120 120" className="w-48 h-48">
                {shapeType === 'circle' ? <circle cx="50" cy="50" r="50" className={shapeFill} /> : <rect x="0" y="0" width="100" height="100" rx="10" className={shapeFill} />}
                <AnimatePresence>
                    {cuts > 0 && (
                        <motion.g
                            key={cuts + shapeType}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.4 }}
                        >
                            {lines()}
                        </motion.g>
                    )}
                </AnimatePresence>
            </svg>
        );
    };

    const RightInteractionPanel = () => {
        const [cuts, setCuts] = useState(0);
        const [shapeType, setShapeType] = useState<'circle' | 'square'>('circle');

        const handleCut = (num: number) => {
            // This is a debugging message. Check your browser's console (F12).
            console.log(`Button clicked! Setting cuts to: ${num}`);
            setCuts(num);
        };

        const toggleShape = () => {
            console.log('Toggling shape');
            setCuts(0);
            setShapeType(prev => prev === 'circle' ? 'square' : 'circle');
        };

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Shape Cutter</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">How should we cut the {shapeType}?</p>
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center relative">
                    <div className="w-full flex-grow flex flex-col justify-center items-center">
                        <CuttableShape shapeType={shapeType} cuts={cuts} />
                    </div>
                    <div className="w-full grid grid-cols-2 gap-3 pt-4">
                        <button onClick={() => handleCut(2)} className="p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">Cut into Halves</button>
                        <button onClick={() => handleCut(3)} className="p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">Cut into Thirds</button>
                        <button onClick={() => handleCut(4)} className="p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">Cut into Fourths</button>
                        <button onClick={toggleShape} className="p-3 bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors">Try a {shapeType === 'circle' ? 'Square' : 'Circle'}</button>
                    </div>
                </div>
            </div>
        );
    };

    const slideContent = (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><LeftTheoryPanel /></TrackedInteraction>
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><RightInteractionPanel /></TrackedInteraction>
            </div>
        </div>
    );
    
    return (
        <SlideComponentWrapper slideId="geometry-partitioning" slideTitle="Partitioning Shapes" moduleId="grade-2-math-geometry" submoduleId="fractions" interactions={localInteractions}>
            {slideContent}
        </SlideComponentWrapper>
    );
}