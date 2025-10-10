import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ChainRulePracticeSlide6() {
  const { isDarkMode } = useThemeContext();
  
  const slideContent = (
    <div className={`w-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>          
          <div className="text-center text-lg text-slate-600 dark:text-slate-400">
            <p className="mb-4">
              This assessment will test your understanding of the Chain Rule with various types of functions.
            </p>
            <p className="mb-6">
              Please solve the problems below by writing your solutions clearly and showing all work.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                Upload your handwritten solutions as images using the response areas provided.
              </p>
            </div>
          </div>

          {/* Assessment Questions */}
          <div className="mt-8 space-y-6">
            
            {/* Trigonometric Chain Rule Problems */}
            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Trigonometric Chain Rule Problems
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 1:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="y = \cos(4x)" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 3:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="g(x) = 5\tan(3x)" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 5:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="y = \sin(x^2)" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 2:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="h(x) = \sec(x^2)" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 4:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="y = \cos(1 - 2x^2)" />
                  </div>
                </div>
              </div>
            </div>

            {/* Complex Chain Rule Problems */}
            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Complex Chain Rule Applications
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 6:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="f(x) = \frac{\cot x}{\cos x}" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 8:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="g(t) = 5\cos^2(t)" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 10:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="h(t) = 2\cot^2(t - 2)" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 7:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="y = 4\sec^2(x)" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 9:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="f(\theta) = \frac{1}{4}\sin^2(2\theta)" />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Derivative Problems */}
            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Mixed Derivative Problems
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <p className="font-medium mb-2">Problem 11:</p>
                      <p className="text-slate-700 dark:text-slate-300 mb-2">
                        Find the derivative of:
                      </p>
                      <BlockMath math="s(t) = t^2 - 6t + 2 \text{ at } t = 3" />
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <p className="font-medium mb-2">Problem 13:</p>
                      <p className="text-slate-700 dark:text-slate-300 mb-2">
                        Find the derivative of:
                      </p>
                      <BlockMath math="f(x) = \sqrt{x^3 + 2} \text{ at } x = 2" />
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <p className="font-medium mb-2">Problem 15:</p>
                      <p className="text-slate-700 dark:text-slate-300 mb-2">
                        Find the derivative of:
                      </p>
                      <BlockMath math="f(x) = \frac{2x + 3}{x + 1} \text{ at } x = 0" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <p className="font-medium mb-2">Problem 12:</p>
                      <p className="text-slate-700 dark:text-slate-300 mb-2">
                        Find the derivative of:
                      </p>
                      <BlockMath math="y = 5 + 3x^3 - 4x \text{ at } x = 5" />
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <p className="font-medium mb-2">Problem 14:</p>
                      <p className="text-slate-700 dark:text-slate-300 mb-2">
                        Find the derivative of:
                      </p>
                      <BlockMath math="f(t) = \frac{3t + 2}{t + 1} \text{ at } t = 4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="chain-rule-practice-assessment"
      slideTitle="Chain Rule Practice Assessment"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="chain-rule"
      interactions={{}}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}