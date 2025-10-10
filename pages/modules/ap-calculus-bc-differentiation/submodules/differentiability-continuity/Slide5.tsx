import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function DifferentiabilityContinuitySlide5() {
  const { isDarkMode } = useThemeContext();
  
  const slideContent = (
    <div className={`w-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>          
          <div className="text-center text-lg text-slate-600 dark:text-slate-400">
            <p className="mb-4">
              This assessment will test your understanding of derivatives using the limit definition and alternative forms.
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
            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 1
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative by the limit process:
                </p>
                <BlockMath math="f(x) = 3x + 2" />
                <p className="text-slate-700 dark:text-slate-300">
                  Use the definition: <InlineMath math="f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}" />
                </p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 2
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative by the limit process:
                </p>
                <BlockMath math="f(x) = x^2 - x + 3" />
                <p className="text-slate-700 dark:text-slate-300">
                  Show all algebraic steps in evaluating the limit.
                </p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 3
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative by the limit process:
                </p>
                <BlockMath math="f(x) = \frac{1}{x + 1}" />
                <p className="text-slate-700 dark:text-slate-300">
                  Hint: You'll need to find a common denominator and simplify.
                </p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 4
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Use the alternative form of the derivative to find the derivative at the given point:
                </p>
                <BlockMath math="f(x) = x^3 - 2x^2 + 1, \quad c = 2" />
                <p className="text-slate-700 dark:text-slate-300">
                  Use: <InlineMath math="f'(c) = \lim_{x \to c} \frac{f(x) - f(c)}{x - c}" />
                </p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 5
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find an equation of the tangent line to the graph of f at the given point:
                </p>
                <BlockMath math="f(x) = x^2 - 3, \quad (1, -2)" />
                <p className="text-slate-700 dark:text-slate-300">
                  First find f'(x) using the limit definition, then find f'(1), and finally write the tangent line equation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="differentiability-continuity-assessment"
      slideTitle="Differentiability and Continuity Assessment"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiability-continuity"
      interactions={{}}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}