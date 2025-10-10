import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ProductQuotientAssessmentSlide5() {
  const { isDarkMode } = useThemeContext();
  
  const slideContent = (
    <div className={`w-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>          
          <div className="text-center text-lg text-slate-600 dark:text-slate-400">
            <p className="mb-4">
              This assessment will test your understanding of Product Rule, Quotient Rule, and trigonometric derivatives.
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
            
            {/* Product Rule Problems */}
            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Product Rule Problems
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 1:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="f(x) = x^3 \sin x" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 3:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="h(x) = (2x^2 + 1)\cos x" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 2:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="g(x) = e^x \tan x" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 4:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="k(t) = t^2 \sec t" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quotient Rule Problems */}
            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Quotient Rule Problems
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 5:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="f(x) = \frac{x}{x^2 + 1}" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 7:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="h(x) = \frac{x}{x^3 + 1}" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 6:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="g(t) = \frac{t^2 + 4}{5t + 3}" />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 8:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="h(s) = \frac{s}{s + 1}" />
                  </div>
                </div>
              </div>
            </div>

            {/* Trigonometric Quotient Problems */}
            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Trigonometric Quotient Problems
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 9:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="g(x) = \frac{\sin x}{x^2}" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-medium mb-2">Problem 10:</p>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                      Find the derivative of:
                    </p>
                    <BlockMath math="f(t) = \frac{\cos t}{t^3}" />
                  </div>
                </div>
              </div>
            </div>

            {/* Trigonometric Derivative Proofs */}
            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Trigonometric Derivative Proofs
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                  <p className="text-blue-800 dark:text-blue-200 mb-2">
                    <strong>Problem 11: Prove that <InlineMath math="\frac{d}{dx}(\cot x) = -\csc^2 x" /></strong>
                  </p>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    Express <InlineMath math="\cot x = \frac{\cos x}{\sin x}" /> and apply the Quotient Rule. 
                    Show all steps including the use of the Pythagorean identity.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-gray-400">
                  <p className="text-gray-800 dark:text-gray-200 mb-2">
                    <strong>Problem 12: Prove that <InlineMath math="\frac{d}{dx}(\csc x) = -\csc x \cot x" /></strong>
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    Express <InlineMath math="\csc x = \frac{1}{\sin x}" /> and apply the Quotient Rule. 
                    Show how to express the final result in terms of <InlineMath math="\csc x" /> and <InlineMath math="\cot x" />.
                  </p>
                </div>
              </div>
            </div>

            {/* Mixed Applications */}
            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Mixed Applications
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                  <p className="text-blue-800 dark:text-blue-200 mb-2">
                    <strong>Problem 13: Combined Rules</strong>
                  </p>
                  <p className="text-blue-800 dark:text-blue-200 mb-2">
                    Find the derivative of:
                  </p>
                  <BlockMath math="f(x) = x^2 \sin x + \frac{3x}{\cos x}" />
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    Identify which rule(s) to use for each term and show all work.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-gray-400">
                  <p className="text-gray-800 dark:text-gray-200 mb-2">
                    <strong>Problem 14: Challenge Problem</strong>
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 mb-2">
                    Find the derivative of:
                  </p>
                  <BlockMath math="g(x) = \frac{x^2 \tan x}{\sin x + \cos x}" />
                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    This problem requires careful application of both Product and Quotient Rules.
                  </p>
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
      slideId="product-quotient-assessment"
      slideTitle="Product and Quotient Rule Assessment"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="product-quotient-rules"
      interactions={{}}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}