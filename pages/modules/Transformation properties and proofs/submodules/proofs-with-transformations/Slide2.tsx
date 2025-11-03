import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- NEW: Accordion Item Component ---
interface FaqItemProps {
    i: number;
    question: string;
    children: React.ReactNode;
    expanded: number | false;
    setExpanded: (i: number | false) => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ i, question, children, expanded, setExpanded }) => {
    const isOpen = i === expanded;

    return (
        <motion.div 
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }} // Staggered fade-in
        >
            <motion.header
                initial={false}
                onClick={() => setExpanded(isOpen ? false : i)}
                className="flex justify-between items-center p-6 cursor-pointer"
            >
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {question}
                </h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-blue-600 dark:text-blue-400"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.div>
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="border-t border-slate-200 dark:border-slate-700"
                    >
                        <div className="p-6 space-y-3">
                            {children}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
// --- END of Accordion Item ---


export default function Slide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();
    // State to manage which accordion item is open. Start with none (false)
    const [expanded, setExpanded] = useState<number | false>(false);

    const faqItems = [
        {
            question: "Q: What's the *one* big difference between rigid and non-rigid transformations?",
            answer: (
                <>
                    <p className="text-lg leading-relaxed"><strong>Distance.</strong></p>
                    <p className="text-lg leading-relaxed">
                        **Rigid transformations** (translations, rotations, reflections) **preserve distance**. The image is congruent to the pre-image.
                    </p>
                    <p className="text-lg leading-relaxed">
                        **Non-rigid transformations** (like dilations) **do not preserve distance**. The image is similar, but not congruent.
                    </p>
                </>
            )
        },
        {
            question: "Q: What's the difference between Congruent (≅) and Similar (~)?",
            answer: (
                <>
                    <p className="text-lg leading-relaxed">
                        **Congruent (≅)** figures are mapped by **rigid transformations**. They preserve **size and shape**.
                    </p>
                    <p className="text-lg leading-relaxed">
                        **Similar (~)** figures are mapped by **non-rigid transformations** (like dilation). They preserve **shape only**, not size.
                    </p>
                </>
            )
        },
        {
            question: "Q: Which transformations 'flip' the shape (reverse orientation)?",
            answer: (
                <>
                    <p className="text-lg leading-relaxed"><strong>Only reflections.</strong></p>
                    <p className="text-lg leading-relaxed">
                        Translations, rotations, and dilations are all "direct" transformations, meaning they preserve orientation (the vertex order stays the same).
                    </p>
                    <p className="text-lg leading-relaxed">
                        A **reflection** is an "opposite" transformation. It reverses the orientation (e.g., from clockwise to counter-clockwise).
                    </p>
                </>
            )
        },
        {
            question: "Q: How do I prove two triangles are congruent using transformations?",
            answer: (
                <>
                    <p className="text-lg leading-relaxed">
                        You must find a **sequence of rigid transformations** (translations, rotations, and/or reflections) that maps one triangle perfectly onto the other.
                    </p>
                    <p className="text-lg leading-relaxed">
                        For your proof, you must state the transformation (e.g., "Reflect over the y-axis") and use its properties to justify your claims (e.g., "Since reflections preserve distance, AB = A'B'").
                    </p>
                </>
            )
        },
    ];

    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-4xl mx-auto p-8 space-y-6">
                
                <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Unit 2 FAQ: Properties & Proofs</h2>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                        Here are answers to common questions about transformation properties. Click a question to reveal the answer.
                    </p>
                </motion.div>

                {/* --- NEW: Mapped Accordion Items --- */}
                {faqItems.map((item, i) => (
                    <FaqItem
                        key={i}
                        i={i}
                        question={item.question}
                        expanded={expanded}
                        setExpanded={setExpanded}
                    >
                        {item.answer}
                    </FaqItem>
                ))}

            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="transformation-proofs-faq"
            slideTitle="Transformation properties and proofs FAQ"
            moduleId="transformation-properties-proofs"
            submoduleId="proofs-with-transformations"
            interactions={localInteractions} // Pass empty object for article slides
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}