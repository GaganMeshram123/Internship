import React from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function RatesOfChangeSlide4() {
  const { isDarkMode } = useThemeContext();
  
  const slideContent = (
    <div className={`w-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>          
          <div className="text-center text-lg text-slate-600 dark:text-slate-400">
            <p className="mb-4">
              This assessment will test your understanding of rates of change and motion problems.
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
                Problem 1: Projectile Motion
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  A rocket is launched straight upward from Earth's surface with an initial velocity of 120 meters per second. 
                  The position function is given by:
                </p>
                <BlockMath math="s(t) = -4.9t^2 + 120t" />
                <p className="text-slate-700 dark:text-slate-300">
                  where s(t) is the height in meters and t is the time in seconds.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                    <strong>Find:</strong>
                  </p>
                  <ul className="text-yellow-800 dark:text-yellow-200 list-disc list-inside mt-2">
                    <li>The rocket's velocity after 5 seconds</li>
                    <li>The rocket's velocity after 10 seconds</li>
                    <li>At what time does the rocket reach its maximum height?</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 2: Building Height Estimation
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  To measure the height of a skyscraper, a construction worker drops a wrench from the top of the building. 
                  The wrench falls into a safety net at ground level. If the sound of the impact is heard 5.6 seconds 
                  after the wrench is released, what is the height of the building?
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border-l-4 border-blue-400">
                  <p className="text-blue-800 dark:text-blue-200 font-medium">
                    <strong>Use the position function for free fall:</strong>
                  </p>
                  <BlockMath math="s(t) = h_0 - 16t^2" />
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    where h₀ is the initial height in feet and t is time in seconds.
                  </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Note:</strong> Assume the wrench hits the ground exactly when t = 5.6 seconds (ignore air resistance and sound travel time).
                </p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 3: Average vs Instantaneous Velocity
              </h3>
              <div className="space-y-4 text-left">
                <p className="text-slate-700 dark:text-slate-300">
                  For the falling wrench in Problem 2, find:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <ul className="text-slate-700 dark:text-slate-300 list-disc list-inside space-y-2">
                    <li>The average velocity during the first 2 seconds of fall</li>
                    <li>The average velocity during the last 2 seconds of fall</li>
                    <li>The instantaneous velocity when the wrench hits the ground</li>
                  </ul>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Explain why the average velocities are different and relate this to the concept of acceleration.
                </p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Problem 4 (Optional - Challenge)
              </h3>
              <div className="space-y-4 text-left">
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border-l-4 border-yellow-400 mb-4">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium text-sm">
                    This problem is optional and more challenging. It combines multiple concepts.
                  </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  A ball is thrown upward from the top of a 200-foot building with an initial velocity of 48 ft/sec. 
                  The position function is:
                </p>
                <BlockMath math="s(t) = -16t^2 + 48t + 200" />
                <p className="text-slate-700 dark:text-slate-300">
                  Find the time intervals when the ball is moving upward vs. downward, and determine the maximum height reached.
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
      slideId="rates-of-change-assessment"
      slideTitle="Rates of Change Assessment"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="rates-of-change"
      interactions={{}}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}