import { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { TrackedInteraction } from '../../../common-components/concept';

export default function IrrationalDivisionGeometrySlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [sideLength, setSideLength] = useState(5); // Controls the size of the square

  const diagonalLength = sideLength * Math.sqrt(2);
  const ratio = Math.sqrt(2);

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-division-geometry-content',
      conceptId: 'irrational-division-geometry',
      conceptName: 'Irrational Ratios in Geometry',
      type: 'learning',
      description: 'Discovering constant irrational ratios through geometric shapes.'
    },
    {
      id: 'square-diagonal-interactive',
      conceptId: 'square-diagonal-interactive',
      conceptName: 'Square Diagonal Ratio Explorer',
      type: 'learning',
      description: 'Interactive exploration of the diagonal-to-side ratio of a square.'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions((prev: Record<string, InteractionResponse>) => ({
      ...prev,
      [response.interactionId]: response
    }));
  };
  
  const handleSliderChange = (value: number) => {
    setSideLength(value);
    handleInteractionComplete({
        interactionId: 'square-diagonal-interactive',
        value: `side-length-${value}`,
        timestamp: Date.now()
    });
  }

  return (
    <SlideComponentWrapper
      slideId="irrational-division-geometry-slide"
      slideTitle="Division of Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="division"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-slate-50 dark:bg-slate-900/20 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Explanation and Key Discovery */}
          <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6">
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Irrational numbers are deeply rooted in geometry. The ancient Greeks first discovered them when relating the sides of simple shapes, like a square's side to its diagonal.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Using the Pythagorean theorem (<InlineMath math="a^2 + b^2 = c^2" />), we can explore these geometric ratios and see how division leads to an irrational result.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h4 className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-3">
                    The Key Discovery 💡
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Notice that no matter how you change the side length of the square, the **ratio** of the diagonal to the side is **always** <InlineMath math="\sqrt{2}" />.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    This constant, irrational ratio proved that not all numbers could be written as simple fractions.
                  </p>
                </div>
              </div>
            </TrackedInteraction>
          </div>

          {/* Right Column: Interactive Visualization */}
          <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6">
            <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
              <div>
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Interactive Geometry
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Use the slider to change the square's side length and observe the calculations.
                </p>
              </div>

              {/* Slider Control */}
              <div className="space-y-2">
                  <label htmlFor="side-length-slider" className="font-medium text-slate-700 dark:text-slate-300">
                      Side Length (a): {sideLength.toFixed(1)} units
                  </label>
                  <input
                      id="side-length-slider"
                      type="range"
                      min="1"
                      max="10"
                      step="0.1"
                      value={sideLength}
                      onChange={(e) => handleSliderChange(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
                  />
              </div>

              {/* Square Visualization */}
              <div className="flex justify-center items-center h-48 my-4">
                <div 
                  className="relative bg-teal-100 dark:bg-teal-900/30 border-2 border-teal-500"
                  style={{ width: `${sideLength * 15}px`, height: `${sideLength * 15}px` }}
                >
                  <div 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        background: 'linear-gradient(to top right, transparent 49.5%, #8B5CF6 49.5%, #8B5CF6 50.5%, transparent 50.5%)'
                    }}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-teal-700 dark:text-teal-300">a</span>
                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-teal-700 dark:text-teal-300">a</span>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-purple-700 dark:text-purple-300">c</span>
                </div>
              </div>
              
              {/* Live Calculation Panel */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm space-y-3">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-slate-700 dark:text-slate-300">Diagonal (<InlineMath math="c" />):</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{diagonalLength.toFixed(2)} units</span>
                </div>
                <div className="flex justify-between items-center font-mono">
                  <span className="text-slate-700 dark:text-slate-300">Formula:</span>
                  <span className="text-blue-600 dark:text-blue-400"><InlineMath math="c = a\sqrt{2}" /></span>
                </div>
                <hr className="border-blue-200 dark:border-blue-700" />
                <div className="flex justify-between items-center font-mono text-lg">
                  <span className="text-slate-800 dark:text-slate-100 font-semibold">Ratio (Division):</span>
                  <span className="font-bold text-green-600 dark:text-green-400"><InlineMath math="\frac{c}{a} = \sqrt{2}" /></span>
                </div>
              </div>
            </TrackedInteraction>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
}