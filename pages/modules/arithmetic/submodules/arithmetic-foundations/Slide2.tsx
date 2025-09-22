import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideComponentWrapper from "../../../common-components/SlideComponentWrapper";
import {
  Interaction,
  InteractionResponse,
  TrackedInteraction,
} from "../../../common-components/concept";
import { useThemeContext } from "@/lib/ThemeContext";

// --- Main Slide Component ---
export default function AdditionSlide() {
  const [localInteractions, setLocalInteractions] = useState<
    Record<string, InteractionResponse>
  >({});
  const { isDarkMode } = useThemeContext();

  // --- State for the interactive animation ---
  const [problem, setProblem] = useState({ a: 2, b: 3 });
  const [animationStep, setAnimationStep] = useState(0); // 0: initial, 1: combining, 2: combined
  const [selectedEmojis, setSelectedEmojis] = useState<number[]>([]);

  const generateNewProblem = () => {
    const newA = Math.floor(Math.random() * 4) + 1; // Random number from 1 to 4
    const newB = Math.floor(Math.random() * 3) + 2; // Random number from 2 to 4
    setProblem({ a: newA, b: newB });
    setAnimationStep(0); // Reset animation
    setSelectedEmojis([]);
  };

  useEffect(() => {
    generateNewProblem(); // Initialize on mount
  }, []);

  const slideInteractions: Interaction[] = [
    {
      id: "addition-intro-concept",
      conceptId: "addition",
      conceptName: "Introduction to Addition",
      type: "learning",
      description: "Learning the basic concept of addition as combining groups.",
    },
    {
      id: "addition-playground-game",
      conceptId: "addition",
      conceptName: "Addition Playground",
      type: "learning",
      description: "Interactive game to visualize addition.",
    },
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions((prev) => ({
      ...prev,
      [response.interactionId]: response,
    }));
  };

  const LeftTheoryPanel = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Fun with Addition (+)
      </h2>
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
            Putting Things Together
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Addition is simply putting groups of things together to see how many
            you have in total. If you have 2 apples and get 3 more, you add them
            to find the total.
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">
            Number Line Hops
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            On the number line, adding is like taking hops forward. To solve "2
            + 3", you start at 2 and take 3 big hops forward to land on 5!
          </p>
        </div>
      </div>
    </div>
  );

  const RightInteractionPanel = () => {
  const total = problem.a + problem.b;

  const toggleEmoji = (index: number) => {
    setSelectedEmojis((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Addition Playground
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        Click the emojis to count and add!
      </p>

      <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-6 flex-grow flex flex-col justify-center items-center min-h-[250px] relative">
        {/* Step 0: Show emojis */}
        <AnimatePresence>
          {animationStep === 0 && (
            <motion.div
              key="emoji-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Emoji Row */}
              <div className="flex gap-4 flex-wrap justify-center mt-4 mb-6">
                {Array.from({ length: problem.a }, (_, i) => (
                  <motion.button
                    key={`a-${i}`}
                    className={`text-5xl ${
                      selectedEmojis.includes(i) ? "opacity-100" : "opacity-50"
                    }`}
                    onClick={() => toggleEmoji(i)}
                    whileTap={{ scale: 0.8 }}
                    animate={{
                      scale: selectedEmojis.includes(i) ? 1.2 : 1,
                    }}
                  >
                    🍎
                  </motion.button>
                ))}
                {Array.from({ length: problem.b }, (_, i) => (
                  <motion.button
                    key={`b-${i + problem.a}`}
                    className={`text-5xl ${
                      selectedEmojis.includes(i + problem.a)
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                    onClick={() => toggleEmoji(i + problem.a)}
                    whileTap={{ scale: 0.8 }}
                    animate={{
                      scale: selectedEmojis.includes(i + problem.a) ? 1.2 : 1,
                    }}
                  >
                    🎈
                  </motion.button>
                ))}
              </div>

              {/* Button */}
              <button
                onClick={() => setAnimationStep(2)}
                className="mt-2 px-8 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700"
              >
                Combine!
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Show total */}
        <AnimatePresence>
          {animationStep === 2 && (
            <motion.div
              key="result-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col justify-center items-center gap-6"
            >
              <div className="flex flex-wrap justify-center gap-3 p-4 border-2 border-dashed border-slate-400 rounded-lg">
                {selectedEmojis.map((idx) => (
                  <motion.span
                    key={idx}
                    className="text-5xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {idx < problem.a ? "🍎" : "🎈"}
                  </motion.span>
                ))}
              </div>
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                {selectedEmojis.length}
              </p>
              <button
                onClick={generateNewProblem}
                className="px-8 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700"
              >
                Try Another!
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


  const slideContent = (
    <div className={`min-h-screen p-4 sm:p-8`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <TrackedInteraction
          interaction={slideInteractions[0]}
          onInteractionComplete={handleInteractionComplete}
        >
          <LeftTheoryPanel />
        </TrackedInteraction>
        <TrackedInteraction
          interaction={slideInteractions[1]}
          onInteractionComplete={handleInteractionComplete}
        >
          <RightInteractionPanel />
        </TrackedInteraction>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="arithmetic-addition"
      slideTitle="Fun with Addition: Putting Things Together"
      moduleId="arithmetic"
      submoduleId="arithmetic-foundations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}
