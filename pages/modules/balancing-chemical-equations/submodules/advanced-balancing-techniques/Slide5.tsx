import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

const AdvancedPracticeSlide: React.FC = () => {
  // The slide content
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 text-center">
          Now practice these advanced balancing techniques! Use LCM, fractional coefficients, 
          and polyatomic ion methods as appropriate. Show your work step by step.
        </p>
        
        <div className="bg-amber-50/60 border border-amber-200 dark:bg-amber-900/40 dark:border-amber-700/50 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 rounded-full p-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Advanced Techniques Instructions</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>For each problem, choose the most appropriate method:</p>
            <ol className="list-decimal list-inside pl-4 space-y-2">
              <li><strong>LCM Method:</strong> When elements appear in different ratios</li>
              <li><strong>Fractional Coefficients:</strong> When it simplifies the initial balancing</li>
              <li><strong>Polyatomic Ions:</strong> When ion groups stay intact</li>
              <li>Show all steps clearly in your work</li>
              <li>Take a clear photo of your solution</li>
              <li>Upload one photo per problem</li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">🧮 LCM Method</h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
              <li>• Find LCM of unequal ratios</li>
              <li>• Apply to get equal atoms</li>
              <li>• Balance remaining elements</li>
              <li>• Best for: Al + CuBr₂ type problems</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">📐 Fractional Method</h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
              <li>• Use fractions temporarily</li>
              <li>• Multiply to eliminate fractions</li>
              <li>• Simplifies complex oxygen cases</li>
              <li>• Best for: C₂H₄ + O₂ type problems</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">⚗️ Polyatomic Method</h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
              <li>• Treat ions as single units</li>
              <li>• Balance ion groups first</li>
              <li>• Then balance other elements</li>
              <li>• Best for: double replacement reactions</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">🎯 Problem-Solving Strategy</h3>
          <ol className="text-gray-600 dark:text-gray-400 space-y-1">
            <li>1. <strong>Analyze the equation:</strong> What types of compounds are present?</li>
            <li>2. <strong>Choose your method:</strong> Which technique fits best?</li>
            <li>3. <strong>Apply systematically:</strong> Follow the method step-by-step</li>
            <li>4. <strong>Verify your answer:</strong> Count atoms on both sides</li>
            <li>5. <strong>Show your work:</strong> Include all steps for full credit</li>
          </ol>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="advanced-balancing-questions"
      slideTitle="Advanced Balancing Practice"
      moduleId="balancing-chemical-equations"
      submoduleId="advanced-balancing-techniques"
      interactions={{}}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
};

export default AdvancedPracticeSlide; 