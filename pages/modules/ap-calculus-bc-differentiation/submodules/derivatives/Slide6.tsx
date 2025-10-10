import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function DerivativesSlide6() {
  const { isDarkMode } = useThemeContext();
  
  const slideContent = (
    <div className={`w-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>          
          <div className="text-center text-lg text-slate-600 dark:text-slate-400">
            <p className="mb-4">
              This assessment will test your understanding of derivative concepts using the limit definition.
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
                  Find the derivative of f(x) = x² using the limit definition:
                </p>
                <BlockMath math="f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}" />
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 2
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative of f(x) = √x using the limit definition. Use rationalization technique:
                </p>
                <BlockMath math="f'(x) = \lim_{h \to 0} \frac{\sqrt{x + h} - \sqrt{x}}{h}" />
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 3
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative of f(x) = 1/x using the limit definition:
                </p>
                <BlockMath math="f'(x) = \lim_{h \to 0} \frac{\frac{1}{x + h} - \frac{1}{x}}{h}" />
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 4
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative of f(x) = x³ using the limit definition. Show all algebraic steps:
                </p>
                <BlockMath math="f'(x) = \lim_{h \to 0} \frac{(x + h)^3 - x^3}{h}" />
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 5
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the equation of the tangent line to f(x) = x² + 3x at the point (2, 10):
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  First find f'(x) using the limit definition, then find f'(2), and finally write the tangent line equation.
                </p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 6 (Optional - Challenging)
              </h3>
              <div className="space-y-4 text-left">
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border-l-4 border-yellow-400 mb-4">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium text-sm">
                    This problem is optional and more challenging. Think about what rationalization factor to use.
                    <br />
                    <strong>Hint:</strong> You can use the fact that <InlineMath math="a^3 - b^3 = (a - b)(a^2 + ab + b^2)" />.
                  </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Find the slope of the tangent line to <InlineMath math="f(x) = \sqrt[3]{x}" /> at x = 2 using the limit definition.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Show all steps in evaluating the limit of the difference quotient.
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
      slideId="derivatives-assessment"
      slideTitle="Derivatives Assessment"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="derivatives"
      interactions={{}}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}