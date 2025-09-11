import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

const BalancingPracticeSlide: React.FC = () => {
  // The slide content
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 text-center">
          Now it's time to practice! Try balancing these chemical equations involving oxygen gas (O₂). 
          Show your work step by step and upload a photo of your solution.
        </p>
        
        <div className="bg-amber-50/60 border border-amber-200 dark:bg-amber-900/40 dark:border-amber-700/50 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 rounded-full p-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Instructions</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>For each chemical equation:</p>
            <ol className="list-decimal list-inside pl-4 space-y-2">
              <li>Write the unbalanced equation</li>
              <li>Follow the M-N-H-O strategy (Metals → Non-metals → Hydrogen → Oxygen)</li>
              <li>Show each step clearly</li>
              <li>Verify your answer by counting atoms on both sides</li>
              <li>Take a clear photo of your work</li>
              <li>Upload one photo per problem</li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 Helpful Tips</h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Start with the most complex molecule</li>
              <li>• Balance oxygen (O₂) last</li>
              <li>• Use whole number coefficients only</li>
              <li>• Check your work by counting atoms</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">🔬 Types of Reactions</h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Combustion: Fuel + O₂ → CO₂ + H₂O</li>
              <li>• Oxidation: Metal + O₂ → Metal Oxide</li>
              <li>• Synthesis: Elements + O₂ → Compound</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="balancing-practice-questions"
      slideTitle="Balancing Practice with Oxygen"
      moduleId="balancing-chemical-equations"
      submoduleId="introduction-to-balancing"
      interactions={{}}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
};

export default BalancingPracticeSlide; 