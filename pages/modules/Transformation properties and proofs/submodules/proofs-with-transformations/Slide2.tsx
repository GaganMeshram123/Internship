import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- NO ANIMATION FOR THIS ARTICLE-STYLE SLIDE ---

export default function Slide2() {
    // This slide is an article (FAQ), so it doesn't have an interactive quiz.
    // We just need the wrapper.
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-4xl mx-auto p-8 space-y-6">
                
                <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Unit 2 FAQ: Properties & Proofs</h2>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                        Here are answers to common questions about transformation properties. Use this as a review for the whole unit.
                    </p>
                </motion.div>

                {/* FAQ Item 1 */}
                <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
                        Q: What's the *one* big difference between rigid and non-rigid transformations?
                    </h3>
                    <p className="text-lg leading-relaxed">
                        <strong>Distance.</strong>
                    </p>
                    <p className="text-lg leading-relaxed mt-2">
                        **Rigid transformations** (translations, rotations, reflections) **preserve distance**. The image is congruent to the pre-image.
                    </p>
                    <p className="text-lg leading-relaxed mt-2">
                        **Non-rigid transformations** (like dilations) **do not preserve distance**. The image is similar, but not congruent.
                    </p>
                </motion.div>
                
                {/* FAQ Item 2 */}
                <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
                        Q: Which transformations "flip" the shape (reverse orientation)?
                    </h3>
                    <p className="text-lg leading-relaxed">
                        **Only reflections.**
                    </p>
                    <p className="text-lg leading-relaxed mt-2">
                        Translations, rotations, and dilations are all "direct" isometries/transformations, meaning they preserve orientation (the vertex order stays the same, e.g., "clockwise").
                    </p>
                     <p className="text-lg leading-relaxed mt-2">
                        A **reflection** (or a sequence with an odd number of reflections, like a glide reflection) is an "opposite" transformation. It reverses the orientation.
                    </p>
                </motion.div>

                {/* FAQ Item 3 */}
                <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
                        Q: How do I prove two triangles are congruent using transformations?
                    </h3>
                    <p className="text-lg leading-relaxed">
                        You must find a **sequence of rigid transformations** (translations, rotations, and/or reflections) that maps one triangle perfectly onto the other.
                    </p>
                    <p className="text-lg leading-relaxed mt-2">
                        For your proof, you must state the transformation (e.g., "Reflect over the y-axis") and use its properties to justify your claims (e.g., "Since reflections preserve distance, $AB = A'B'$").
                    </p>
                </motion.div>

                {/* FAQ Item 4 */}
                <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                >
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
                        Q: What's the difference between a rectangle's and a rhombus's symmetry?
                    </h3>
                    <p className="text-lg leading-relaxed">
                        This is a classic question! Both have **Order 2 rotational symmetry** (180°) and **2 lines of reflective symmetry**.
                    </p>
                    <p className="text-lg leading-relaxed mt-2">
                        The difference is *where* the lines are:
                    </p>
                     <ul className="text-lg list-disc list-inside mt-2 space-y-1">
                        <li>**Rectangle:** The 2 lines pass through the **midpoints** of opposite sides.</li>
                        <li>**Rhombus:** The 2 lines *are* the **diagonals**.</li>
                    </ul>
                </motion.div>

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