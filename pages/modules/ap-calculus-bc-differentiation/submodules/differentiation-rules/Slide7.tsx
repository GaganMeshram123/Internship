import React from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiationRulesSlide7() {

  const slideContent = (
    <div className="w-full bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">          
          <div className="text-center text-lg text-slate-600 dark:text-slate-400">
            <p className="mb-4">
              This assessment will test your understanding of differentiation rules and tangent line problems.
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
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 1
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative of the function:
                </p>
                <BlockMath math="f(x) = x^6 - 3x" />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 2
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative of the function:
                </p>
                <BlockMath math="f(x) = 3x - 5x^2" />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 3
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative of the function:
                </p>
                <BlockMath math="h(s) = s^4 - 5s^2 + 3" />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 4
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative of the function:
                </p>
                <BlockMath math="f(t) = t^2 + 3t^{1/3} - 4\sqrt{t}" />
                <p className="text-slate-700 dark:text-slate-300">
                  Hint: Rewrite using fractional exponents before differentiating.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 5
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative of the function:
                </p>
                <BlockMath math="f(x) = 6\sqrt{x} - 5\cos x" />
                <p className="text-slate-700 dark:text-slate-300">
                  Use both the Power Rule and trigonometric derivatives.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 6
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the derivative of the function:
                </p>
                <BlockMath math="f(x) = \frac{3}{x^2}" />
                <p className="text-slate-700 dark:text-slate-300">
                  Rewrite using negative exponents first.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
                Problem 7
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the value of k such that the line is tangent to the function:
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Function:</span>
                    <BlockMath math="f(x) = x^2 - kx" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Line:</span>
                    <BlockMath math="y = 5x - 4" />
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Use the fact that at the point of tangency, both the function value and slope must match the line.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
                Problem 8
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  Find the value of k such that the line is tangent to the function:
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Function:</span>
                    <BlockMath math="f(x) = kx^2" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Line:</span>
                    <BlockMath math="y = 6x - 1" />
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Set up equations for both the function value and derivative at the point of tangency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="differentiation-practice"
      slideTitle="Practice Problems"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiation-rules"
      interactions={{}}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}